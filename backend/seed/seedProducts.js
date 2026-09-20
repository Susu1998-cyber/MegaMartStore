require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../Model/Product");

const products = [
  // 1
  {
    name: "Samsung Galaxy S22 Ultra",
    slug: "samsung-galaxy-s22-ultra",
    description:
      "Premium Samsung smartphone with powerful performance and camera.",
    category: "Mobile",
    brand: "Samsung",
    images: ["https://example.com/samsung-s22.jpg"],
    variants: [
      {
        size: "128GB",
        color: "Black",
        sku: "SAM-S22-BLK-128",
        price: 59999,
        stock: 10,
      },
      {
        size: "256GB",
        color: "Green",
        sku: "SAM-S22-GRN-256",
        price: 64999,
        stock: 5,
      },
    ],
  },

  // 2
  {
    name: "iPhone 15",
    slug: "iphone-15",
    description: "Apple iPhone 15 with advanced camera and powerful processor.",
    category: "Mobile",
    brand: "Apple",
    images: ["https://example.com/iphone15.jpg"],
    variants: [
      {
        size: "128GB",
        color: "Black",
        sku: "IPH15-BLK-128",
        price: 69999,
        stock: 8,
      },
      {
        size: "256GB",
        color: "Blue",
        sku: "IPH15-BLU-256",
        price: 79999,
        stock: 4,
      },
    ],
  },

  // 3
  {
    name: "Realme 13 Pro",
    slug: "realme-13-pro",
    description: "Stylish Realme smartphone with excellent performance.",
    category: "Mobile",
    brand: "Realme",
    images: ["https://example.com/realme13.jpg"],
    variants: [
      {
        size: "128GB",
        color: "Gold",
        sku: "REALME13-GLD-128",
        price: 24999,
        stock: 12,
      },
      {
        size: "256GB",
        color: "Green",
        sku: "REALME13-GRN-256",
        price: 27999,
        stock: 7,
      },
    ],
  },

  // 4
  {
    name: "OnePlus 12",
    slug: "oneplus-12",
    description: "High-performance OnePlus smartphone with premium display.",
    category: "Mobile",
    brand: "OnePlus",
    images: ["https://example.com/oneplus12.jpg"],
    variants: [
      {
        size: "256GB",
        color: "Black",
        sku: "OP12-BLK-256",
        price: 59999,
        stock: 9,
      },
      {
        size: "512GB",
        color: "Green",
        sku: "OP12-GRN-512",
        price: 64999,
        stock: 6,
      },
    ],
  },

  // 5
  {
    name: "Google Pixel 8",
    slug: "google-pixel-8",
    description: "Google Pixel smartphone with advanced AI camera features.",
    category: "Mobile",
    brand: "Google",
    images: ["https://example.com/pixel8.jpg"],
    variants: [
      {
        size: "128GB",
        color: "Black",
        sku: "PIX8-BLK-128",
        price: 59999,
        stock: 8,
      },
      {
        size: "256GB",
        color: "Blue",
        sku: "PIX8-BLU-256",
        price: 65999,
        stock: 4,
      },
    ],
  },

  // 6
  {
    name: "Xiaomi 14",
    slug: "xiaomi-14",
    description: "Premium Xiaomi smartphone with flagship specifications.",
    category: "Mobile",
    brand: "Xiaomi",
    images: ["https://example.com/xiaomi14.jpg"],
    variants: [
      {
        size: "256GB",
        color: "Black",
        sku: "XIA14-BLK-256",
        price: 49999,
        stock: 10,
      },
      {
        size: "512GB",
        color: "White",
        sku: "XIA14-WHT-512",
        price: 54999,
        stock: 5,
      },
    ],
  },

  // 7
  {
    name: "Vivo V30 Pro",
    slug: "vivo-v30-pro",
    description: "Elegant Vivo smartphone with a powerful camera setup.",
    category: "Mobile",
    brand: "Vivo",
    images: ["https://example.com/vivo-v30.jpg"],
    variants: [
      {
        size: "256GB",
        color: "Black",
        sku: "VIVO30-BLK-256",
        price: 41999,
        stock: 11,
      },
      {
        size: "512GB",
        color: "Blue",
        sku: "VIVO30-BLU-512",
        price: 46999,
        stock: 5,
      },
    ],
  },

  // 8
  {
    name: "Nothing Phone 2",
    slug: "nothing-phone-2",
    description: "Unique smartphone with a distinctive transparent design.",
    category: "Mobile",
    brand: "Nothing",
    images: ["https://example.com/nothing-phone2.jpg"],
    variants: [
      {
        size: "128GB",
        color: "Black",
        sku: "NOTHING2-BLK-128",
        price: 34999,
        stock: 10,
      },
      {
        size: "256GB",
        color: "White",
        sku: "NOTHING2-WHT-256",
        price: 39999,
        stock: 6,
      },
    ],
  },

  // 9
  {
    name: "Samsung Galaxy A55",
    slug: "samsung-galaxy-a55",
    description: "Mid-range Samsung smartphone with premium design.",
    category: "Mobile",
    brand: "Samsung",
    images: ["https://example.com/galaxy-a55.jpg"],
    variants: [
      {
        size: "128GB",
        color: "Blue",
        sku: "SAMA55-BLU-128",
        price: 29999,
        stock: 15,
      },
      {
        size: "256GB",
        color: "Black",
        sku: "SAMA55-BLK-256",
        price: 33999,
        stock: 8,
      },
    ],
  },

  // 10
  {
    name: "Redmi Note 13 Pro",
    slug: "redmi-note-13-pro",
    description: "Affordable smartphone with a high-resolution camera.",
    category: "Mobile",
    brand: "Redmi",
    images: ["https://example.com/redmi-note13.jpg"],
    variants: [
      {
        size: "128GB",
        color: "Black",
        sku: "RED13-BLK-128",
        price: 24999,
        stock: 18,
      },
      {
        size: "256GB",
        color: "Purple",
        sku: "RED13-PRP-256",
        price: 27999,
        stock: 10,
      },
    ],
  },

  // 11
  {
    name: "Nike Running Shoes",
    slug: "nike-running-shoes",
    description: "Comfortable running shoes designed for everyday training.",
    category: "Fashion",
    brand: "Nike",
    images: ["https://example.com/nike-shoes.jpg"],
    variants: [
      {
        size: "8",
        color: "Black",
        sku: "NIKE-RUN-BLK-8",
        price: 4999,
        stock: 10,
      },
      {
        size: "9",
        color: "Black",
        sku: "NIKE-RUN-BLK-9",
        price: 4999,
        stock: 5,
      },
      {
        size: "10",
        color: "White",
        sku: "NIKE-RUN-WHT-10",
        price: 5299,
        stock: 3,
      },
    ],
  },

  // 12
  {
    name: "Adidas Ultraboost",
    slug: "adidas-ultraboost",
    description: "Premium running shoes with comfortable cushioning.",
    category: "Fashion",
    brand: "Adidas",
    images: ["https://example.com/adidas-ultraboost.jpg"],
    variants: [
      {
        size: "8",
        color: "White",
        sku: "ADI-UB-WHT-8",
        price: 8999,
        stock: 8,
      },
      {
        size: "9",
        color: "Black",
        sku: "ADI-UB-BLK-9",
        price: 8999,
        stock: 6,
      },
      {
        size: "10",
        color: "Blue",
        sku: "ADI-UB-BLU-10",
        price: 9299,
        stock: 4,
      },
    ],
  },

  // 13
  {
    name: "Puma Sports Shoes",
    slug: "puma-sports-shoes",
    description: "Lightweight sports shoes suitable for workouts and running.",
    category: "Fashion",
    brand: "Puma",
    images: ["https://example.com/puma-shoes.jpg"],
    variants: [
      {
        size: "8",
        color: "Black",
        sku: "PUMA-SP-BLK-8",
        price: 3999,
        stock: 12,
      },
      {
        size: "9",
        color: "Grey",
        sku: "PUMA-SP-GRY-9",
        price: 3999,
        stock: 9,
      },
      {
        size: "10",
        color: "White",
        sku: "PUMA-SP-WHT-10",
        price: 4299,
        stock: 5,
      },
    ],
  },

  // 14
  {
    name: "Levis Slim Fit Jeans",
    slug: "levis-slim-fit-jeans",
    description: "Classic slim-fit denim jeans for everyday wear.",
    category: "Fashion",
    brand: "Levis",
    images: ["https://example.com/levis-jeans.jpg"],
    variants: [
      {
        size: "30",
        color: "Blue",
        sku: "LEVIS-SLIM-BLU-30",
        price: 2999,
        stock: 10,
      },
      {
        size: "32",
        color: "Blue",
        sku: "LEVIS-SLIM-BLU-32",
        price: 2999,
        stock: 8,
      },
      {
        size: "34",
        color: "Black",
        sku: "LEVIS-SLIM-BLK-34",
        price: 3199,
        stock: 6,
      },
    ],
  },

  // 15
  {
    name: "Roadster Casual Shirt",
    slug: "roadster-casual-shirt",
    description: "Comfortable casual shirt suitable for everyday use.",
    category: "Fashion",
    brand: "Roadster",
    images: ["https://example.com/roadster-shirt.jpg"],
    variants: [
      {
        size: "M",
        color: "Blue",
        sku: "ROAD-SHIRT-BLU-M",
        price: 1299,
        stock: 15,
      },
      {
        size: "L",
        color: "Black",
        sku: "ROAD-SHIRT-BLK-L",
        price: 1299,
        stock: 10,
      },
      {
        size: "XL",
        color: "White",
        sku: "ROAD-SHIRT-WHT-XL",
        price: 1399,
        stock: 7,
      },
    ],
  },

  // 16
  {
    name: "Peter England Formal Shirt",
    slug: "peter-england-formal-shirt",
    description: "Classic formal shirt for office and professional wear.",
    category: "Fashion",
    brand: "Peter England",
    images: ["https://example.com/peter-england-shirt.jpg"],
    variants: [
      {
        size: "M",
        color: "White",
        sku: "PE-FORMAL-WHT-M",
        price: 1799,
        stock: 12,
      },
      {
        size: "L",
        color: "Blue",
        sku: "PE-FORMAL-BLU-L",
        price: 1799,
        stock: 9,
      },
      {
        size: "XL",
        color: "Grey",
        sku: "PE-FORMAL-GRY-XL",
        price: 1899,
        stock: 5,
      },
    ],
  },

  // 17
  {
    name: "Smart Watch Pro",
    slug: "smart-watch-pro",
    description: "Modern smart watch with fitness and notification tracking.",
    category: "Watches",
    brand: "MegaTech",
    images: ["https://example.com/watch.jpg"],
    variants: [
      {
        size: "Standard",
        color: "Black",
        sku: "WATCH-BLK-STD",
        price: 2999,
        stock: 20,
      },
      {
        size: "Standard",
        color: "Blue",
        sku: "WATCH-BLU-STD",
        price: 3199,
        stock: 15,
      },
    ],
  },

  // 18
  {
    name: "Apple Watch Series 9",
    slug: "apple-watch-series-9",
    description: "Advanced Apple smartwatch with health and fitness features.",
    category: "Watches",
    brand: "Apple",
    images: ["https://example.com/apple-watch9.jpg"],
    variants: [
      {
        size: "41mm",
        color: "Black",
        sku: "AW9-BLK-41",
        price: 41999,
        stock: 6,
      },
      {
        size: "45mm",
        color: "Silver",
        sku: "AW9-SLV-45",
        price: 45999,
        stock: 4,
      },
    ],
  },

  // 19
  {
    name: "Samsung Galaxy Watch 6",
    slug: "samsung-galaxy-watch-6",
    description: "Samsung smartwatch with fitness tracking and AMOLED display.",
    category: "Watches",
    brand: "Samsung",
    images: ["https://example.com/galaxy-watch6.jpg"],
    variants: [
      {
        size: "40mm",
        color: "Black",
        sku: "SGW6-BLK-40",
        price: 24999,
        stock: 9,
      },
      {
        size: "44mm",
        color: "Silver",
        sku: "SGW6-SLV-44",
        price: 27999,
        stock: 6,
      },
    ],
  },

  // 20
  {
    name: "Noise ColorFit Ultra",
    slug: "noise-colorfit-ultra",
    description:
      "Affordable smartwatch with a large display and fitness tracking.",
    category: "Watches",
    brand: "Noise",
    images: ["https://example.com/noise-watch.jpg"],
    variants: [
      {
        size: "Standard",
        color: "Black",
        sku: "NOISE-BLK-STD",
        price: 2499,
        stock: 25,
      },
      {
        size: "Standard",
        color: "Blue",
        sku: "NOISE-BLU-STD",
        price: 2499,
        stock: 18,
      },
    ],
  },

  // 21
  {
    name: "Sony WH-1000XM5",
    slug: "sony-wh-1000xm5",
    description:
      "Premium wireless headphones with advanced noise cancellation.",
    category: "Audio",
    brand: "Sony",
    images: ["https://example.com/sony-xm5.jpg"],
    variants: [
      {
        size: "Standard",
        color: "Black",
        sku: "SONY-XM5-BLK",
        price: 29999,
        stock: 7,
      },
      {
        size: "Standard",
        color: "Silver",
        sku: "SONY-XM5-SLV",
        price: 29999,
        stock: 5,
      },
    ],
  },

  // 22
  {
    name: "Apple AirPods Pro 2",
    slug: "apple-airpods-pro-2",
    description: "Wireless earbuds with active noise cancellation.",
    category: "Audio",
    brand: "Apple",
    images: ["https://example.com/airpods-pro2.jpg"],
    variants: [
      {
        size: "Standard",
        color: "White",
        sku: "AIRPODS-PRO2-WHT",
        price: 24999,
        stock: 12,
      },
    ],
  },

  // 23
  {
    name: "JBL Tune 770NC",
    slug: "jbl-tune-770nc",
    description:
      "Wireless headphones with noise cancellation and long battery life.",
    category: "Audio",
    brand: "JBL",
    images: ["https://example.com/jbl-770nc.jpg"],
    variants: [
      {
        size: "Standard",
        color: "Black",
        sku: "JBL770-BLK",
        price: 5999,
        stock: 15,
      },
      {
        size: "Standard",
        color: "Blue",
        sku: "JBL770-BLU",
        price: 5999,
        stock: 10,
      },
    ],
  },

  // 24
  {
    name: "Dell Inspiron 15",
    slug: "dell-inspiron-15",
    description: "Reliable laptop for work, study and everyday productivity.",
    category: "Laptops",
    brand: "Dell",
    images: ["https://example.com/dell-inspiron.jpg"],
    variants: [
      {
        size: "8GB/512GB",
        color: "Silver",
        sku: "DELL-I15-SLV-8",
        price: 54999,
        stock: 7,
      },
      {
        size: "16GB/512GB",
        color: "Silver",
        sku: "DELL-I15-SLV-16",
        price: 62999,
        stock: 5,
      },
    ],
  },

  // 25
  {
    name: "HP Pavilion 14",
    slug: "hp-pavilion-14",
    description: "Slim and powerful laptop for work and entertainment.",
    category: "Laptops",
    brand: "HP",
    images: ["https://example.com/hp-pavilion.jpg"],
    variants: [
      {
        size: "8GB/512GB",
        color: "Silver",
        sku: "HP-PAV14-SLV-8",
        price: 57999,
        stock: 8,
      },
      {
        size: "16GB/512GB",
        color: "Blue",
        sku: "HP-PAV14-BLU-16",
        price: 64999,
        stock: 4,
      },
    ],
  },

  // 26
  {
    name: "Lenovo IdeaPad Slim 5",
    slug: "lenovo-ideapad-slim-5",
    description:
      "Slim laptop designed for productivity and everyday computing.",
    category: "Laptops",
    brand: "Lenovo",
    images: ["https://example.com/lenovo-ideapad.jpg"],
    variants: [
      {
        size: "8GB/512GB",
        color: "Grey",
        sku: "LEN-SLIM5-GRY-8",
        price: 52999,
        stock: 10,
      },
      {
        size: "16GB/512GB",
        color: "Grey",
        sku: "LEN-SLIM5-GRY-16",
        price: 59999,
        stock: 6,
      },
    ],
  },

  // 27
  {
    name: "Logitech MX Master 3S",
    slug: "logitech-mx-master-3s",
    description: "Premium wireless mouse designed for productivity.",
    category: "Accessories",
    brand: "Logitech",
    images: ["https://example.com/mx-master-3s.jpg"],
    variants: [
      {
        size: "Standard",
        color: "Black",
        sku: "LOG-MX3S-BLK",
        price: 8999,
        stock: 15,
      },
      {
        size: "Standard",
        color: "White",
        sku: "LOG-MX3S-WHT",
        price: 8999,
        stock: 8,
      },
    ],
  },

  // 28
  {
    name: "Keychron K2 Mechanical Keyboard",
    slug: "keychron-k2-mechanical-keyboard",
    description:
      "Compact wireless mechanical keyboard for developers and professionals.",
    category: "Accessories",
    brand: "Keychron",
    images: ["https://example.com/keychron-k2.jpg"],
    variants: [
      {
        size: "75%",
        color: "Black",
        sku: "KEY-K2-BLK-75",
        price: 7999,
        stock: 10,
      },
      {
        size: "75%",
        color: "White",
        sku: "KEY-K2-WHT-75",
        price: 7999,
        stock: 6,
      },
    ],
  },

  // 29
  {
    name: "Sony Bravia 55 4K TV",
    slug: "sony-bravia-55-4k-tv",
    description:
      "4K smart television with vivid picture quality and smart features.",
    category: "Television",
    brand: "Sony",
    images: ["https://example.com/sony-bravia.jpg"],
    variants: [
      {
        size: "55 inch",
        color: "Black",
        sku: "SONY-TV-55-BLK",
        price: 69999,
        stock: 5,
      },
      {
        size: "65 inch",
        color: "Black",
        sku: "SONY-TV-65-BLK",
        price: 89999,
        stock: 3,
      },
    ],
  },

  // 30
  {
    name: "Samsung 55 4K Smart TV",
    slug: "samsung-55-4k-smart-tv",
    description:
      "Samsung 4K smart television with modern design and smart features.",
    category: "Television",
    brand: "Samsung",
    images: ["https://example.com/samsung-tv.jpg"],
    variants: [
      {
        size: "55 inch",
        color: "Black",
        sku: "SAM-TV-55-BLK",
        price: 59999,
        stock: 7,
      },
      {
        size: "65 inch",
        color: "Black",
        sku: "SAM-TV-65-BLK",
        price: 79999,
        stock: 4,
      },
    ],
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("30 products seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
