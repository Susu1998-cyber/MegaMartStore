const mongoose = require("mongoose");

const Cart = require("../Model/Cart");
const Product = require("../Model/Product");
const Order = require("../Model/Order");

// POST /api/orders
const createOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const cart = await Cart.findOne({
      user: req.user._id,
    }).session(session);

    if (!cart || cart.items.length === 0) {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const orderItems = [];
    let orderTotal = 0;

    for (const cartItem of cart.items) {
      const product = await Product.findById(
        cartItem.product
      ).session(session);

      if (!product) {
        throw new Error("Product no longer exists");
      }

      const variant = product.variants.id(
        cartItem.variantId
      );

      if (!variant) {
        throw new Error(
          `${product.name} variant is no longer available`
        );
      }

      /*
       * IMPORTANT:
       * Atomically decrease stock only when
       * enough stock is available.
       */
      const result = await Product.updateOne(
        {
          _id: product._id,
          "variants._id": cartItem.variantId,
          "variants.stock": {
            $gte: cartItem.quantity,
          },
        },
        {
          $inc: {
            "variants.$.stock": -cartItem.quantity,
          },
        },
        {
          session,
        }
      );

      if (result.modifiedCount !== 1) {
        throw new Error(
          `${product.name} is out of stock or insufficient stock`
        );
      }

      const lineTotal =
        variant.price * cartItem.quantity;

      orderTotal += lineTotal;

      orderItems.push({
        product: product._id,
        variantId: variant._id,
        name: product.name,
        sku: variant.sku,
        size: variant.size,
        color: variant.color,
        price: variant.price,
        quantity: cartItem.quantity,
        lineTotal,
      });
    }

    const [order] = await Order.create(
      [
        {
          user: req.user._id,
          items: orderItems,
          total: orderTotal,
          status: "placed",
        },
      ],
      {
        session,
      }
    );

    cart.items = [];

    await cart.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    await session.abortTransaction();

    res.status(400).json({
      success: false,
      message: error.message,
    });
  } finally {
    session.endSession();
  }
};

module.exports = {
  createOrder,
};