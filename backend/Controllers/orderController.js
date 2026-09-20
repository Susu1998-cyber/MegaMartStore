const mongoose = require("mongoose");

const Cart = require("../Model/Cart");
const Product = require("../Model/Product");
const Order = require("../Model/Order");

// POST /api/orders
const createOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    let createdOrder = null;

    await session.withTransaction(
      async () => {
        // Get current cart
        const cart = await Cart.findOne({
          user: req.user._id,
        }).session(session);

        if (!cart || cart.items.length === 0) {
          const error = new Error("Cart is empty");
          error.statusCode = 400;
          throw error;
        }

        const orderItems = [];
        let orderTotal = 0;

        for (const cartItem of cart.items) {
          const product = await Product.findById(cartItem.product).session(
            session,
          );

          if (!product) {
            const error = new Error("Product no longer exists");

            error.statusCode = 400;
            throw error;
          }

          const variant = product.variants.id(cartItem.variantId);

          if (!variant) {
            const error = new Error(
              `${product.name} variant is no longer available`,
            );

            error.statusCode = 400;
            throw error;
          }

          /*
           * IMPORTANT:
           *
           * Atomically reduce stock only when
           * THIS SAME VARIANT has enough stock.
           */
          const stockUpdate = await Product.updateOne(
            {
              _id: product._id,

              variants: {
                $elemMatch: {
                  _id: cartItem.variantId,
                  stock: {
                    $gte: cartItem.quantity,
                  },
                },
              },
            },
            {
              $inc: {
                "variants.$.stock": -cartItem.quantity,
              },
            },
            {
              session,
            },
          );

          /*
           * If another user already purchased the stock,
           * this update will match ZERO documents.
           */
          if (stockUpdate.modifiedCount !== 1) {
            const error = new Error(
              `${product.name} has only ${variant.stock} item(s) available`,
            );

            error.statusCode = 409;
            throw error;
          }

          const lineTotal = variant.price * cartItem.quantity;

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

        // Create order
        const orders = await Order.create(
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
          },
        );

        createdOrder = orders[0];

        // Clear cart only after all stock updates succeed
        cart.items = [];

        await cart.save({
          session,
        });
      },
      {
        readConcern: {
          level: "snapshot",
        },
        writeConcern: {
          w: "majority",
        },
      },
    );

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: createdOrder,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to create order",
    });
  } finally {
    await session.endSession();
  }
};

module.exports = {
  createOrder,
};
