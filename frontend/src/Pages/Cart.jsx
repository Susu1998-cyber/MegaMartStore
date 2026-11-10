import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCart, updateItem, removeItem } from "../Redux/CartSlice";
import QuantityControl from "../Components/QuantityControl";
import Loader from "../Components/Loader";
import { createOrder, createPayment, verifyPayment } from "../services/api";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );

    if (existingScript) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading, error } = useSelector((state) => state.cart);

  const [ordering, setOrdering] = useState(false);
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    dispatch(fetchCart());
  }, [dispatch, navigate]);

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const variant = item.product?.variants?.find(
        (v) => String(v._id) === String(item.variantId),
      );

      return sum + (variant?.price || 0) * item.quantity;
    }, 0);
  }, [items]);

  const hasStockIssue = items.some((item) => {
    const variant = item.product?.variants?.find(
      (v) => String(v._id) === String(item.variantId),
    );

    if (!variant) {
      return true;
    }

    return variant.stock < item.quantity;
  });

  // const handleCheckout = async () => {
  //   try {
  //     setOrdering(true);
  //     setOrderError("");

  //     const response = await createOrder();

  //     alert(`Order ${response.data._id} created successfully`);

  //     dispatch(fetchCart());
  //   } catch (err) {
  //     setOrderError(
  //       err.response?.data?.message || "Checkout failed. Please try again.",
  //     );

  //     // Refresh cart because stock may have changed
  //     dispatch(fetchCart());
  //   } finally {
  //     setOrdering(false);
  //   }
  // };

  const handleCheckout = async () => {
    try {
      setOrdering(true);
      setOrderError("");

      // Step 1: Load Razorpay Checkout script
      const isScriptLoaded = await loadRazorpayScript();

      if (!isScriptLoaded) {
        throw new Error("Unable to load Razorpay. Please try again.");
      }

      // Step 2: Create MongoDB order
      const orderResponse = await createOrder();

      const mongoOrderId = orderResponse.data._id;

      console.log("MongoDB Order ID:", mongoOrderId);

      // Step 3: Create Razorpay payment order
      const paymentResponse = await createPayment(mongoOrderId);

      console.log("Razorpay Order:", paymentResponse);

      // Step 4: Configure Razorpay Checkout
      const options = {
        key: paymentResponse.key,

        amount: paymentResponse.amount,

        currency: paymentResponse.currency,

        name: "Mega Mart",

        description: "Order Payment",

        order_id: paymentResponse.orderId,

        handler: async function (response) {
          try {
            console.log("Razorpay Response:", response);

            // Step 5: Verify payment on backend
            const verifyResponse = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.success) {
              alert("Payment successful!");

              // Refresh cart
              dispatch(fetchCart());

              // Navigate to order success page
              navigate("/orders/success");
            }
          } catch (error) {
            console.error("Payment verification error:", error);

            setOrderError(
              error.response?.data?.message ||
                "Payment verification failed. Please contact support.",
            );
          } finally {
            setOrdering(false);
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Payment window closed");
            setOrdering(false);
          },
        },

        theme: {
          color: "#3399cc",
        },
      };

      // Step 6: Open Razorpay payment window
      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);

        setOrderError(
          response.error.description || "Payment failed. Please try again.",
        );

        setOrdering(false);
      });

      razorpay.open();
    } catch (error) {
      console.error("Checkout error:", error);

      setOrderError(
        error.response?.data?.message ||
          error.message ||
          "Checkout failed. Please try again.",
      );

      setOrdering(false);
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));

    alert("Item removed from cart");
  };

  if (loading && items.length === 0) {
    return <Loader />;
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        {/* Left */}
        <div>
          <h1 className="text-2xl font-bold">Shopping Cart</h1>

          <p className="mt-1 text-sm text-gray-500">
            Review your selected products.
          </p>
        </div>

        {/* Right */}
        <button
          onClick={() => navigate(-2)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-600"
        >
          <ArrowLeft size={17} />
          Back
        </button>
      </div>

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {orderError && (
        <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {orderError}
        </div>
      )}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-16 text-center">
          <ShoppingBag size={45} className="mx-auto text-gray-300" />

          <h2 className="mt-4 text-lg font-semibold">Your cart is empty</h2>

          <p className="mt-2 text-sm text-gray-500">
            Add some products to your cart.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          {/* Items */}
          <div className="space-y-4">
            {items.map((item) => {
              const variant = item.product?.variants?.find(
                (v) => String(v._id) === String(item.variantId),
              );

              const price = variant?.price || 0;

              const availableStock = variant?.stock ?? 0;

              const stale = availableStock < item.quantity;

              return (
                <div key={item._id} className="rounded-xl border bg-white p-4">
                  <div className="flex gap-4">
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                      <img
                        src={item.product?.images?.[0]}
                        alt={item.product?.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-3">
                        <div>
                          <h3 className="font-semibold">
                            {item.product?.name}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            {variant?.size && `Size: ${variant.size}`}
                            {variant?.color && ` • ${variant.color}`}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            dispatch(
                              removeItem(item._id),
                              handleRemoveItem(item._id),
                            )
                          }
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Stale Cart */}
                      {stale && (
                        <div className="mt-3 rounded-lg bg-orange-50 p-3 text-xs text-orange-700">
                          Only <strong>{availableStock}</strong> item(s)
                          currently available. Please update the quantity.
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                        <QuantityControl
                          quantity={item.quantity}
                          disabled={availableStock === 0}
                          onDecrease={() =>
                            dispatch(
                              updateItem({
                                id: item._id,
                                quantity: item.quantity - 1,
                              }),
                            )
                          }
                          onIncrease={() =>
                            dispatch(
                              updateItem({
                                id: item._id,
                                quantity: item.quantity + 1,
                              }),
                            )
                          }
                        />

                        <p className="font-bold">
                          ₹{(price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-xl border bg-white p-6 lg:sticky lg:top-5">
            <h2 className="text-lg font-bold">Order Summary</h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>

                <span>₹{total.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>

                <span className="text-green-600">Free</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>

                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* <button
              disabled={ordering || hasStockIssue}
              onClick={handleCheckout}
              className="mt-7 w-full rounded-xl bg-cyan-600 py-3 font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-300"
            >
              {ordering
                ? "Processing..."
                : hasStockIssue
                  ? "Update Cart Before Checkout"
                  : "Checkout"}
            </button> */}

            <button
              onClick={handleCheckout}
              disabled={ordering || items.length === 0 || hasStockIssue}
              className="w-full bg-black text-white py-3 rounded-lg
             hover:bg-gray-800 disabled:opacity-50"
            >
              {ordering ? "Processing..." : "Proceed to Payment"}
            </button>

            {orderError && (
              <p className="text-red-500 text-sm mt-2">{orderError}</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
