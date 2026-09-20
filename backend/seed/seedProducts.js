 require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../Model/Product");

const products = [
  // ================= MOBILE (5) =================
  {
    name: "Samsung Galaxy S23 Ultra",
    slug: "samsung-galaxy-s23-ultra",
    description: "Premium Samsung smartphone with a powerful performance and incredible zoom camera.",
    category: "Mobile",
    brand: "Samsung",
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80"],
    variants: [
      { size: "256GB", color: "Phantom Black", sku: "SAM-S23U-BLK", price: 104999, oldPrice: 124999, stock: 15 },
      { size: "512GB", color: "Cream", sku: "SAM-S23U-CRM", price: 114999, oldPrice: 134999, stock: 8 },
    ],
  },
  {
    name: "Apple iPhone 15 Pro",
    slug: "apple-iphone-15-pro",
    description: "The latest Apple flagship with an aerospace-grade titanium design and A17 Pro chip.",
    category: "Mobile",
    brand: "Apple",
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80"],
    variants: [
      { size: "128GB", color: "Natural Titanium", sku: "IPH15P-NAT-128", price: 134900, oldPrice: 139900, stock: 20 },
      { size: "256GB", color: "Blue Titanium", sku: "IPH15P-BLU-256", price: 144900, oldPrice: 149900, stock: 12 },
    ],
  },
  {
    name: "Google Pixel 8 Pro",
    slug: "google-pixel-8-pro",
    description: "Google's AI-powered smartphone featuring the most advanced Pixel camera ever.",
    category: "Mobile",
    brand: "Google",
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351cb315?w=800&q=80"],
    variants: [
      { size: "128GB", color: "Obsidian", sku: "PIX8P-OBS-128", price: 106999, oldPrice: 109999, stock: 10 },
      { size: "256GB", color: "Porcelain", sku: "PIX8P-POR-256", price: 113999, oldPrice: 117999, stock: 5 },
    ],
  },
  {
    name: "OnePlus 12",
    slug: "oneplus-12",
    description: "Experience ultra-fast charging and a buttery smooth 120Hz AMOLED display.",
    category: "Mobile",
    brand: "OnePlus",
    images: ["https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=800&q=80"],
    variants: [
      { size: "256GB", color: "Flowy Emerald", sku: "OP12-EMR-256", price: 64999, oldPrice: 69999, stock: 25 },
      { size: "512GB", color: "Silky Black", sku: "OP12-BLK-512", price: 69999, oldPrice: 74999, stock: 15 },
    ],
  },
  {
    name: "Nothing Phone (2)",
    slug: "nothing-phone-2",
    description: "Unique transparent back design with a customizable Glyph Interface.",
    category: "Mobile",
    brand: "Nothing",
    images: ["https://images.unsplash.com/photo-1688537549886-bce384358a9e?w=800&q=80"],
    variants: [
      { size: "256GB", color: "White", sku: "NOTHING2-WHT-256", price: 44999, oldPrice: 49999, stock: 30 },
      { size: "512GB", color: "Dark Grey", sku: "NOTHING2-GRY-512", price: 49999, oldPrice: 54999, stock: 10 },
    ],
  },

  // ================= COSMETICS (5) =================
  {
    name: "Matte Liquid Lipstick",
    slug: "matte-liquid-lipstick",
    description: "Long-lasting, smudge-proof matte liquid lipstick available in vibrant shades.",
    category: "Cosmetics",
    brand: "MAC",
    images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80"],
    variants: [
      { size: "5ml", color: "Ruby Red", sku: "MAC-LIP-RED", price: 1950, oldPrice: 2200, stock: 50 },
      { size: "5ml", color: "Velvet Nude", sku: "MAC-LIP-NUD", price: 1950, oldPrice: 2200, stock: 45 },
    ],
  },
  {
    name: "Hydrating Face Serum",
    slug: "hydrating-face-serum",
    description: "Hyaluronic acid serum for intense hydration and glowing skin.",
    category: "Cosmetics",
    brand: "L'Oreal",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"],
    variants: [
      { size: "30ml", color: "Clear", sku: "LOR-SER-30", price: 899, oldPrice: 1199, stock: 100 },
      { size: "50ml", color: "Clear", sku: "LOR-SER-50", price: 1299, oldPrice: 1599, stock: 60 },
    ],
  },
  {
    name: "Flawless Finish Foundation",
    slug: "flawless-finish-foundation",
    description: "Medium to full coverage foundation with a lightweight, breathable feel.",
    category: "Cosmetics",
    brand: "Maybelline",
    images: ["https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=800&q=80"],
    variants: [
      { size: "30ml", color: "Ivory", sku: "MAY-FND-IVO", price: 799, oldPrice: 999, stock: 75 },
      { size: "30ml", color: "Beige", sku: "MAY-FND-BEI", price: 799, oldPrice: 999, stock: 80 },
    ],
  },
  {
    name: "Luxury Eau de Parfum",
    slug: "luxury-eau-de-parfum",
    description: "Elegant and sophisticated fragrance with notes of jasmine, vanilla, and amber.",
    category: "Cosmetics",
    brand: "Chanel",
    images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80"],
    variants: [
      { size: "50ml", color: "Gold", sku: "CHN-PRF-50", price: 8500, oldPrice: 9500, stock: 25 },
      { size: "100ml", color: "Gold", sku: "CHN-PRF-100", price: 12500, oldPrice: 14000, stock: 15 },
    ],
  },
  {
    name: "Volumizing Mascara",
    slug: "volumizing-mascara",
    description: "Waterproof mascara for instantly thicker, longer, and bolder lashes.",
    category: "Cosmetics",
    brand: "Clinique",
    images: ["https://images.unsplash.com/photo-1560012218-360d84a7e9df?w=800&q=80"],
    variants: [
      { size: "10ml", color: "Pitch Black", sku: "CLN-MSC-BLK", price: 1500, oldPrice: 1800, stock: 40 },
    ],
  },

  // ================= ELECTRONICS (5) =================
  {
    name: "Sony WH-1000XM5 Headphones",
    slug: "sony-wh-1000xm5-headphones",
    description: "Industry-leading noise-canceling wireless over-ear headphones.",
    category: "Electronics",
    brand: "Sony",
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80"],
    variants: [
      { size: "Standard", color: "Black", sku: "SONY-XM5-BLK", price: 29990, oldPrice: 34990, stock: 20 },
      { size: "Standard", color: "Silver", sku: "SONY-XM5-SLV", price: 29990, oldPrice: 34990, stock: 15 },
    ],
  },
  {
    name: "MacBook Air M2",
    slug: "macbook-air-m2",
    description: "Supercharged by the M2 chip, incredibly thin and light design.",
    category: "Electronics",
    brand: "Apple",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"],
    variants: [
      { size: "13-inch / 256GB", color: "Midnight", sku: "MAC-M2-MID-256", price: 104900, oldPrice: 114900, stock: 10 },
      { size: "13-inch / 512GB", color: "Starlight", sku: "MAC-M2-STR-512", price: 134900, oldPrice: 144900, stock: 6 },
    ],
  },
  {
    name: "Canon EOS R5 Mirrorless Camera",
    slug: "canon-eos-r5",
    description: "Professional full-frame mirrorless camera capturing 8K video and stunning photos.",
    category: "Electronics",
    brand: "Canon",
    images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"],
    variants: [
      { size: "Body Only", color: "Black", sku: "CAN-R5-BODY", price: 315990, oldPrice: 339990, stock: 4 },
      { size: "With 24-105mm Lens", color: "Black", sku: "CAN-R5-LENS", price: 399990, oldPrice: 429990, stock: 2 },
    ],
  },
  {
    name: "JBL Charge 5 Bluetooth Speaker",
    slug: "jbl-charge-5",
    description: "Portable waterproof speaker with a built-in powerbank.",
    category: "Electronics",
    brand: "JBL",
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80"],
    variants: [
      { size: "Standard", color: "Red", sku: "JBL-CH5-RED", price: 12999, oldPrice: 14999, stock: 35 },
      { size: "Standard", color: "Blue", sku: "JBL-CH5-BLU", price: 12999, oldPrice: 14999, stock: 30 },
    ],
  },
  {
    name: "LG 55-inch OLED 4K Smart TV",
    slug: "lg-55-oled-4k",
    description: "Self-lit pixels deliver perfect black, infinite contrast, and brilliant colors.",
    category: "Electronics",
    brand: "LG",
    images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80"],
    variants: [
      { size: "55-inch", color: "Black", sku: "LG-55OLED-BLK", price: 119999, oldPrice: 149999, stock: 8 },
    ],
  },

  // ================= FURNITURE (4) =================
  {
    name: "Mid-Century Modern Sofa",
    slug: "mid-century-modern-sofa",
    description: "Elegant 3-seater sofa with tufted cushions and tapered wooden legs.",
    category: "Furniture",
    brand: "UrbanHome",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"],
    variants: [
      { size: "80-inch", color: "Emerald Green", sku: "UH-SOFA-GRN", price: 35000, oldPrice: 42000, stock: 12 },
      { size: "80-inch", color: "Navy Blue", sku: "UH-SOFA-BLU", price: 35000, oldPrice: 42000, stock: 8 },
    ],
  },
  {
    name: "Ergonomic Office Chair",
    slug: "ergonomic-office-chair",
    description: "Fully adjustable mesh back office chair with lumbar support.",
    category: "Furniture",
    brand: "Herman Miller",
    images: ["https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80"],
    variants: [
      { size: "Standard", color: "Black", sku: "HM-CHR-BLK", price: 24000, oldPrice: 28000, stock: 25 },
      { size: "Standard", color: "Grey", sku: "HM-CHR-GRY", price: 24000, oldPrice: 28000, stock: 15 },
    ],
  },
  {
    name: "Solid Oak Dining Table",
    slug: "solid-oak-dining-table",
    description: "Minimalist 6-seater dining table crafted from sustainable solid oak wood.",
    category: "Furniture",
    brand: "IKEA",
    images: ["https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=800&q=80"],
    variants: [
      { size: "70x35-inch", color: "Natural Oak", sku: "IK-DTBL-NAT", price: 22000, oldPrice: 25000, stock: 10 },
    ],
  },
  {
    name: "Velvet Accent Armchair",
    slug: "velvet-accent-armchair",
    description: "Plush velvet armchair with gold-finished metallic legs for a luxurious feel.",
    category: "Furniture",
    brand: "West Elm",
    images: ["https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80"],
    variants: [
      { size: "Standard", color: "Mustard Yellow", sku: "WE-ARM-YEL", price: 18500, oldPrice: 21000, stock: 14 },
      { size: "Standard", color: "Blush Pink", sku: "WE-ARM-PNK", price: 18500, oldPrice: 21000, stock: 6 },
    ],
  },

  // ================= WATCHES (4) =================
  {
    name: "Apple Watch Series 9",
    slug: "apple-watch-series-9",
    description: "Advanced health tracking, double tap gesture, and a brighter display.",
    category: "Watches",
    brand: "Apple",
    images: ["https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80"],
    variants: [
      { size: "41mm", color: "Midnight", sku: "AW9-41-MID", price: 39900, oldPrice: 41900, stock: 25 },
      { size: "45mm", color: "Silver", sku: "AW9-45-SLV", price: 42900, oldPrice: 44900, stock: 20 },
    ],
  },
  {
    name: "Rolex Submariner Date",
    slug: "rolex-submariner-date",
    description: "The quintessential luxury divers' watch, featuring a ceramic bezel and steel case.",
    category: "Watches",
    brand: "Rolex",
    images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80"],
    variants: [
      { size: "41mm", color: "Steel/Black", sku: "RLX-SUB-BLK", price: 850000, oldPrice: 900000, stock: 2 },
    ],
  },
  {
    name: "Casio G-Shock Matte Black",
    slug: "casio-g-shock-matte-black",
    description: "Rugged and durable sports watch designed to resist mechanical shock and vibration.",
    category: "Watches",
    brand: "Casio",
    images: ["https://images.unsplash.com/photo-1549972574-8789cc647b0e?w=800&q=80"],
    variants: [
      { size: "Standard", color: "Matte Black", sku: "CAS-GSH-BLK", price: 8999, oldPrice: 9999, stock: 45 },
    ],
  },
  {
    name: "Fossil Gen 6 Smartwatch",
    slug: "fossil-gen-6",
    description: "Classic design meets modern tech. Powered by Wear OS by Google.",
    category: "Watches",
    brand: "Fossil",
    images: ["https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80"],
    variants: [
      { size: "44mm", color: "Brown Leather", sku: "FOS-G6-BRN", price: 18999, oldPrice: 22999, stock: 15 },
      { size: "44mm", color: "Stainless Steel", sku: "FOS-G6-STL", price: 19999, oldPrice: 23999, stock: 10 },
    ],
  },

  // ================= DECOR (4) =================
  {
    name: "Geometric Ceramic Vase",
    slug: "geometric-ceramic-vase",
    description: "Modern minimalist ceramic vase, perfect for dried flowers or Pampas grass.",
    category: "Decor",
    brand: "HomeVibe",
    images: ["https://images.unsplash.com/photo-1581783342308-f792db84d33a?w=800&q=80"],
    variants: [
      { size: "10-inch", color: "Matte White", sku: "HV-VAS-WHT", price: 1499, oldPrice: 1999, stock: 35 },
      { size: "12-inch", color: "Terracotta", sku: "HV-VAS-TER", price: 1799, oldPrice: 2299, stock: 20 },
    ],
  },
  {
    name: "Abstract Canvas Wall Art",
    slug: "abstract-canvas-wall-art",
    description: "Hand-painted abstract artwork in neutral tones, pre-stretched on a wooden frame.",
    category: "Decor",
    brand: "Artisan",
    images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80"],
    variants: [
      { size: "24x36-inch", color: "Neutral Mix", sku: "ART-CAN-2436", price: 3499, oldPrice: 4500, stock: 18 },
    ],
  },
  {
    name: "Scented Soy Wax Candle",
    slug: "scented-soy-wax-candle",
    description: "Hand-poured 100% soy wax candle with essential oil blends.",
    category: "Decor",
    brand: "Lumina",
    images: ["https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80"],
    variants: [
      { size: "8 oz", color: "Lavender & Sage", sku: "LUM-CND-LAV", price: 699, oldPrice: 899, stock: 60 },
      { size: "8 oz", color: "Sandalwood", sku: "LUM-CND-SAN", price: 699, oldPrice: 899, stock: 50 },
    ],
  },
  {
    name: "Macrame Wall Hanging",
    slug: "macrame-wall-hanging",
    description: "Boho chic handwoven macrame tapestry to add texture to any room.",
    category: "Decor",
    brand: "BohoStyle",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"],
    variants: [
      { size: "Medium", color: "Off-White", sku: "BOH-MAC-MED", price: 1299, oldPrice: 1599, stock: 25 },
    ],
  },

  // ================= ACCESSORIES (3) =================
  {
    name: "Polarized Aviator Sunglasses",
    slug: "polarized-aviator-sunglasses",
    description: "Classic metal frame aviator sunglasses providing 100% UV protection.",
    category: "Accessories",
    brand: "Ray-Ban",
    images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"],
    variants: [
      { size: "Standard", color: "Gold/Green", sku: "RB-AVI-GLD", price: 6500, oldPrice: 7500, stock: 40 },
      { size: "Standard", color: "Black/Grey", sku: "RB-AVI-BLK", price: 6500, oldPrice: 7500, stock: 35 },
    ],
  },
  {
    name: "Genuine Leather Wallet",
    slug: "genuine-leather-wallet",
    description: "Slim bi-fold men's wallet crafted from premium full-grain leather.",
    category: "Accessories",
    brand: "Tommy Hilfiger",
    images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"],
    variants: [
      { size: "Standard", color: "Tan Brown", sku: "TH-WAL-TAN", price: 2199, oldPrice: 2999, stock: 55 },
      { size: "Standard", color: "Classic Black", sku: "TH-WAL-BLK", price: 2199, oldPrice: 2999, stock: 50 },
    ],
  },
  {
    name: "Woven Canvas Backpack",
    slug: "woven-canvas-backpack",
    description: "Durable everyday backpack with a padded laptop sleeve and water-resistant fabric.",
    category: "Accessories",
    brand: "Fjallraven",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"],
    variants: [
      { size: "16L", color: "Mustard Yellow", sku: "FJ-BP-YEL", price: 7499, oldPrice: 8999, stock: 20 },
      { size: "16L", color: "Navy Blue", sku: "FJ-BP-NAV", price: 7499, oldPrice: 8999, stock: 22 },
    ],
  }
];

const seedProducts = async () => {
  try {
    // Attempting connection
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data
    await Product.deleteMany();

    // Insert new data
    await Product.insertMany(products);

    console.log("30 diverse products seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedProducts();