const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  size: {
    type: String,
    default: "",
  },

  color: {
    type: String,
    default: "",
  },

  sku: {
    type: String,
    required: true,
    unique: true,
  },

  price: {
    type: Number,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    brand: {
      type: String,
      default: "",
    },

    images: [String],

    variants: [variantSchema],
  },
  {
    timestamps: true,
  },
);

// Text search index
productSchema.index({
  name: "text",
  description: "text",
  brand: "text",
  category: "text",
});

module.exports = mongoose.model("Product", productSchema);
