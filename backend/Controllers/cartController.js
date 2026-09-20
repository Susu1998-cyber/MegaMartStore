const Cart = require("../Model/Cart");
const Product = require("../Model/Product");

// GET /api/cart
// GET /api/cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate({
      path: "items.product",
      select: "name slug category brand images variants",
    });

    if (!cart) {
      return res.json({
        success: true,
        data: {
          items: [],
        },
      });
    }

    // Check current stock for every cart item
    const items = cart.items.map((item) => {
      const product = item.product;

      // Product may have been deleted
      if (!product) {
        return {
          ...item.toObject(),
          isAvailable: false,
          availableStock: 0,
          availabilityMessage: "Product is no longer available",
        };
      }

      // Find the variant currently stored in the product
      const variant = product.variants.id(item.variantId);

      // Variant may have been deleted
      if (!variant) {
        return {
          ...item.toObject(),
          isAvailable: false,
          availableStock: 0,
          availabilityMessage: "Product variant is no longer available",
        };
      }

      const isAvailable = variant.stock >= item.quantity;

      return {
        ...item.toObject(),

        // Current stock information
        availableStock: variant.stock,

        // Whether cart quantity can currently be fulfilled
        isAvailable,

        // Useful message for frontend
        availabilityMessage: isAvailable
          ? "Available"
          : variant.stock === 0
            ? "Out of stock"
            : `Only ${variant.stock} item(s) available`,
      };
    });

    res.json({
      success: true,
      data: {
        ...cart.toObject(),
        items,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /api/cart/items
const addToCart = async (req, res) => {
  try {
    const { productId, variantId, quantity = 1 } = req.body;

    if (!productId || !variantId) {
      return res.status(400).json({
        success: false,
        message: "Product and variant are required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const variant = product.variants.id(variantId);

    if (!variant) {
      return res.status(404).json({
        success: false,
        message: "Variant not found",
      });
    }

    if (variant.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${variant.stock} item(s) available`,
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variantId.toString() === variantId,
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + Number(quantity);

      if (newQuantity > variant.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${variant.stock} item(s) available`,
        });
      }

      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({
        product: productId,
        variantId,
        quantity: Number(quantity),
      });
    }

    await cart.save();

    await cart.populate({
      path: "items.product",
      select: "name slug category brand images variants",
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PATCH /api/cart/items/:id
// const updateCartItem = async (req, res) => {
//   try {
//     const { quantity } = req.body;

//     if (!quantity || quantity < 1) {
//       return res.status(400).json({
//         success: false,
//         message: "Quantity must be at least 1",
//       });
//     }

//     const cart = await Cart.findOne({
//       user: req.user._id,
//     });

//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found",
//       });
//     }

//     const item = cart.items.id(req.params.id);

//     if (!item) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart item not found",
//       });
//     }

//     const product = await Product.findById(item.product);

//     const variant = product?.variants.id(item.variantId);

//     if (!variant) {
//       return res.status(404).json({
//         success: false,
//         message: "Product variant no longer exists",
//       });
//     }

//     if (quantity > variant.stock) {
//       return res.status(400).json({
//         success: false,
//         message: `Only ${variant.stock} item(s) available`,
//       });
//     }

//     item.quantity = quantity;

//     await cart.save();

//     res.json({
//       success: true,
//       message: "Cart updated",
//       data: cart,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    const qty = Number(quantity);

    if (!Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.id(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    const product = await Product.findById(item.product);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product no longer exists",
      });
    }

    const variant = product.variants.id(item.variantId);

    if (!variant) {
      return res.status(404).json({
        success: false,
        message: "Product variant no longer exists",
      });
    }

    // Check current stock
    if (qty > variant.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${variant.stock} item(s) currently available. Please update the quantity.`,
      });
    }

    item.quantity = qty;

    await cart.save();

    // IMPORTANT:
    // Populate product + variants before sending response
    await cart.populate({
      path: "items.product",
      select: "name slug category brand images variants",
    });

    return res.status(200).json({
      success: true,
      message: "Cart updated",
      data: cart,
    });
  } catch (error) {
    console.error("Update cart error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// DELETE /api/cart/items/:id
// const removeCartItem = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({
//       user: req.user._id,
//     });

//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found",
//       });
//     }

//     const item = cart.items.id(req.params.id);

//     if (!item) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart item not found",
//       });
//     }

//     item.deleteOne();

//     await cart.save();

//     res.json({
//       success: true,
//       message: "Item removed",
//       data: cart,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.id(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    item.deleteOne();

    await cart.save();

    // Populate before response
    await cart.populate({
      path: "items.product",
      select: "name slug category brand images variants",
    });

    return res.status(200).json({
      success: true,
      message: "Item removed",
      data: cart,
    });
  } catch (error) {
    console.error("Remove cart error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
};
