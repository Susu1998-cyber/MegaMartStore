
const crypto = require("crypto");
const Payment = require("../Model/PaymentModel");
const Order = require("../Model/Order");
const razorpay = require("../config/razorpay");

// Create Razorpay order for an existing MongoDB order
const createOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Requires authentication middleware
    const userId = req.user._id;

    // Find the user's order
    const order = await Order.findOne({
      _id: orderId,
      user: userId,
      status: "placed",
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Calculate amount from trusted server-side order data.
    // Assumes Order.total is stored in rupees.
    const amountInPaise = Math.round(order.total * 100);

    if (!Number.isSafeInteger(amountInPaise) || amountInPaise <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order amount",
      });
    }

    // Create order with Razorpay
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${order._id}`,
    });

    // Save payment record in MongoDB.
    // Payment.amount is stored in paise in this implementation.
    const payment = await Payment.create({
      order: order._id,
      user: userId,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: "INR",
      status: "created",
    });

    return res.status(201).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
      paymentRecordId: payment._id,
    });
  } catch (error) {
    console.error("Create payment order error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create payment order",
    });
  }
};

// Verify Razorpay payment
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification details",
      });
    }

    const userId = req.user._id;

    // Find the matching payment belonging to this user
    const payment = await Payment.findOne({
      razorpayOrderId: razorpay_order_id,
      user: userId,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    // Verify the payment signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest();

    let receivedSignature;

    try {
      receivedSignature = Buffer.from(razorpay_signature, "hex");
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    if (
      receivedSignature.length !== expectedSignature.length ||
      !crypto.timingSafeEqual(expectedSignature, receivedSignature)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Confirm payment details directly with Razorpay
    const razorpayPayment = await razorpay.payments.fetch(
      razorpay_payment_id
    );

    if (
      razorpayPayment.order_id !== razorpay_order_id ||
      razorpayPayment.amount !== payment.amount ||
      razorpayPayment.currency !== payment.currency
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details do not match",
      });
    }

    // This example assumes automatic capture is enabled.
    if (razorpayPayment.status !== "captured") {
      return res.status(409).json({
        success: false,
        message: "Payment is not captured yet",
      });
    }

    // Make repeated successful verification requests safe
    if (payment.status === "completed") {
      if (payment.paymentId !== razorpay_payment_id) {
        return res.status(409).json({
          success: false,
          message: "Order already paid using another payment",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Payment already verified",
      });
    }

    // Only allow a valid initial payment state
    if (!["created", "pending"].includes(payment.status)) {
      return res.status(409).json({
        success: false,
        message: "Payment cannot be completed from its current status",
      });
    }

    payment.paymentId = razorpay_payment_id;
    payment.status = "completed";
    await payment.save();

    // Requires paymentStatus in your Order schema
    await Order.findByIdAndUpdate(payment.order, {
      $set: { paymentStatus: "paid" },
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Payment verification error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};
