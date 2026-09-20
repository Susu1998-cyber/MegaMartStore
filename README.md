# MegaMart — MERN Storefront

A focused e-commerce storefront built as a MERN stack machine-test project. The implementation covers the core storefront flow from product discovery to cart and checkout, with server-side search/filtering, JWT authentication, server-side cart storage, variant-level stock, stale-cart handling, and stock-safe order creation.

## Features

### Storefront

- Product listing with responsive product cards
- Server-side search
- Server-side category filtering
- Server-side minimum/maximum price filtering
- Server-side sorting
- Server-side pagination
- Product detail page
- Variant selection by size / colour
- Variant-level SKU, price, and stock
- Stock-aware Add to Cart
- Cart quantity updates and item removal
- Line totals and order total
- Responsive Tailwind CSS UI
- Loading, empty, and error states

### Authentication

- User registration
- User login
- JWT authentication
- Protected cart and order APIs
- Protected storefront routes when a user is not authenticated

### Cart and checkout

- Cart is stored on the server and associated with the logged-in user
- Current stock is checked when the cart is read and when checkout is attempted
- Stale-cart warnings are shown when stock has changed after an item was added
- Checkout re-validates stock on the server
- Order totals are calculated from current server-side product prices

## Overselling Prevention

### Problem

Consider this case:

```text
Stock = 1

User A → quantity 1 → checkout
User B → quantity 1 → checkout at approximately the same time
```

The stock must never become `-1`, and both users must not be allowed to create an order for the same single unit.

### Solution

Checkout uses a MongoDB transaction together with an atomic stock update.

The stock update only succeeds when the exact product variant still has enough stock:

```js
const stockUpdate = await Product.updateOne(
  {
    _id: product._id,
    variants: {
      $elemMatch: {
        _id: cartItem.variantId,
        stock: { $gte: cartItem.quantity },
      },
    },
  },
  {
    $inc: {
      "variants.$.stock": -cartItem.quantity,
    },
  },
  { session }
);
```

If the update does not modify exactly one document, checkout fails and the transaction is rolled back:

```js
if (stockUpdate.modifiedCount !== 1) {
  throw new Error("Insufficient stock");
}
```

This means that when one user consumes the final unit, another simultaneous checkout can no longer decrement that same stock below zero.

The complete checkout flow is:

```text
Read cart
   ↓
Validate current product and variant
   ↓
Atomically decrease stock only when enough stock exists
   ↓
Create order
   ↓
Clear cart
   ↓
Commit transaction
```

If any step fails:

```text
Rollback transaction
        ↓
No partial stock/order changes are kept
```

## Stale Cart Handling

A cart can become stale after an item has been added.

Example:

```text
Initial stock = 2

User A adds quantity 2 to cart

User B buys both units

Current stock = 0
```

User A's cart can still contain quantity `2`, so the cart page checks the latest product/variant stock and displays an out-of-stock or quantity warning before checkout.

Checkout performs the same stock validation again on the backend. The frontend warning is only a user experience improvement; the backend remains the final authority.

Typical behavior:

```text
Stock available
     ↓
Normal cart

Stock reduced below cart quantity
     ↓
Stale cart warning
     ↓
User must reduce/remove the item

Stock changes again between cart view and checkout
     ↓
Backend rejects checkout cleanly
```

## Tech Stack

### Frontend

- React
- React Router
- Redux Toolkit
- Axios
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Database

MongoDB Atlas is recommended for the deployed/shared environment because checkout uses MongoDB transactions.

## Project Structure

```text
MegaMart/
│
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductFilters.jsx
│   │   │   ├── QuantityControl.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── Pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── Redux/
│   │   │   └── CartSlice.js
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
└── server/
    ├── src/
    │   ├── config/
    │   │   └── db.js
    │   │
    │   ├── models/
    │   │   ├── User.js
    │   │   ├── Product.js
    │   │   ├── Cart.js
    │   │   └── Order.js
    │   │
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   ├── productController.js
    │   │   ├── cartController.js
    │   │   └── orderController.js
    │   │
    │   ├── routes/
    │   │   ├── authRoutes.js
    │   │   ├── productRoutes.js
    │   │   ├── cartRoutes.js
    │   │   └── orderRoutes.js
    │   │
    │   ├── middleware/
    │   │   └── authMiddleware.js
    │   │
    │   ├── seed/
    │   │   └── seedProducts.js
    │   │
    │   └── app.js
    │
    ├── server.js
    └── package.json
```

## Data Models

### User

```text
name
email
password
createdAt
updatedAt
```

### Product

```text
name
slug
category
brand
description
images[]
variants[]
```

Each variant contains:

```text
size
color
sku
price
stock
```

### Cart

```text
user
items[]
```

Each cart item contains:

```text
product
variantId
quantity
```

### Order

```text
user
items[]
total
status
createdAt
updatedAt
```

Order items store the relevant product/variant information and price at the time of purchase.

## API Routes

### Authentication

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login and receive JWT |

### Products

| Method | Route | Description |
|---|---|---|
| GET | `/api/products` | Product listing with server-side search/filter/sort/pagination |
| GET | `/api/products/:slug` | Get a product by slug |

Example:

```text
GET /api/products?category=Mobile&minPrice=1000&maxPrice=50000&sort=price_asc&q=samsung&page=1&limit=12
```

### Cart

All cart routes require a valid JWT.

| Method | Route | Description |
|---|---|---|
| GET | `/api/cart` | Get current user's cart |
| POST | `/api/cart/items` | Add a product variant to cart |
| PATCH | `/api/cart/items/:id` | Update cart quantity |
| DELETE | `/api/cart/items/:id` | Remove a cart item |

### Orders

| Method | Route | Description |
|---|---|---|
| POST | `/api/orders` | Create an order after server-side stock validation |

## Environment Variables

Create a `.env` file inside `server/`:

```env
PORT=5000

MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/megamart

JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=1d
```

Never commit the real `.env` file to GitHub.

## Prerequisites

- Node.js installed
- MongoDB Atlas account/cluster
- A MongoDB database user
- Your development IP allowed in Atlas Network Access

## Installation

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd MegaMart
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Configure environment variables

Create `server/.env` using the variables shown above.

### 4. Seed products

```bash
npm run seed
```

The seed script should create around 30 products across multiple categories and price points.

### 5. Start backend

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

### 6. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 7. Start frontend

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Frontend Flow

```text
/login
   ↓
Authentication
   ↓
/
   ↓
Home
   ↓
/products
   ↓
/products/:slug
   ↓
/cart
   ↓
Checkout
   ↓
POST /api/orders
```

Unauthenticated users are redirected to `/login`.

Login and register pages intentionally do not show the storefront navbar/footer.

## Search and Filtering Design

Search is controlled from the navbar and passed through the URL using `q`.

Example:

```text
/products?q=iphone
```

Product filters are controlled from the product listing page:

```text
category
minPrice
maxPrice
sort
page
```

Example:

```text
/products?q=iphone&category=Mobile&sort=price_asc&page=1
```

The browser does not download all products and filter them locally. The API receives these parameters and MongoDB performs the corresponding server-side query.

## Stock and Order Correctness

Checkout never trusts stock or totals supplied by the browser.

The backend:

1. Loads the authenticated user's cart.
2. Reads the current product and variant from MongoDB.
3. Verifies that the variant still exists.
4. Atomically decrements stock only if enough stock remains.
5. Creates the order using server-side prices.
6. Clears the cart only after all required operations succeed.
7. Commits everything in one transaction.
8. Rolls everything back if any step fails.

This protects the database from negative stock and prevents partial checkout updates.

## Testing Scenarios

At minimum, the important scenarios to verify are:

### Test 1 — Order flow

```text
Register/Login
   ↓
Add product to cart
   ↓
Open cart
   ↓
Checkout
   ↓
Order is created
   ↓
Cart is cleared
   ↓
Stock is reduced
```

### Test 2 — Overselling / concurrent checkout

```text
Initial stock = 1

User A cart = 1
User B cart = 1

User A checkout → succeeds
User B checkout → rejected

Final stock = 0
Total orders for the unit = 1
```

Also verify the stale-cart case:

```text
User B has an item in cart
        ↓
User A buys the remaining stock
        ↓
User B refreshes cart
        ↓
Out-of-stock / quantity warning appears
        ↓
Checkout is rejected if the cart is still stale
```

## Error Handling

The API uses appropriate error responses for common conditions such as:

- `400` — invalid request or insufficient stock
- `401` — authentication required / invalid token
- `404` — resource not found
- `409` — checkout conflict such as stock becoming unavailable
- `500` — unexpected server error

## Design and Responsiveness

The frontend uses Tailwind CSS and is designed for desktop and mobile layouts. The storefront follows the provided design direction for:

- Header/navigation
- Search
- Product cards
- Product grids
- Categories
- Promotional sections
- Cart layout
- Responsive spacing and typography

Where a design does not explicitly define a state, the implementation provides practical loading, empty, error, and stale-stock states.

## Future Improvements

With additional development time, the project could be extended with:

- Dedicated checkout form and order confirmation page
- Order history page
- Payment integration
- Wishlist
- Product reviews and ratings
- More advanced filtering
- Better search relevance/autocomplete
- Automated integration and end-to-end tests
- Deployment with production environment variables

 
