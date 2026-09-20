const Product = require("../Model/Product");

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      sort,
      q,
      page = 1,
      limit = 12,
    } = req.query;

    const filter = {};

    // Category
    if (category) {
      filter.category = category;
    }

    // Search
    if (q) {
      filter.$text = {
        $search: q,
      };
    }

    // Price filter
    if (minPrice || maxPrice) {
      filter["variants.price"] = {};

      if (minPrice) {
        filter["variants.price"].$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter["variants.price"].$lte = Number(maxPrice);
      }
    }

    // Sorting
    let sortOption = { createdAt: -1 };

    if (sort === "price_asc") {
      sortOption = { "variants.price": 1 };
    }

    if (sort === "price_desc") {
      sortOption = { "variants.price": -1 };
    }

    if (sort === "name_asc") {
      sortOption = { name: 1 };
    }

    if (sort === "name_desc") {
      sortOption = { name: -1 };
    }

    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.min(Number(limit), 50);

    const skip = (pageNumber - 1) * limitNumber;

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortOption).skip(skip).limit(limitNumber),

      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/products/:slug
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
};
