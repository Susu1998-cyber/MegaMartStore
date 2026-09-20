import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ProductList from "./ProductList";
 
const categories = [
  {
    name: "Mobile",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Cosmetics",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Furniture",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Watches",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Decor",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=200&q=80",
  },
];

const brands = [
  {
    name: "Apple",
    color: "bg-gray-900",
    text: "UP TO 80% OFF",
  },
  {
    name: "realme",
    color: "bg-yellow-100",
    text: "UP TO 80% OFF",
  },
  {
    name: "Xiaomi",
    color: "bg-orange-100",
    text: "UP TO 80% OFF",
  },
];

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-5">
        <div className="relative overflow-hidden rounded-xl bg-slate-900">
          <div className="grid min-h-56 items-center md:min-h-72 md:grid-cols-2">
            <div className="z-10 p-7 text-white md:p-12">
              <p className="text-sm">Best Deal Online on smart watches</p>

              <h1 className="mt-2 text-3xl font-bold md:text-5xl">
                SMART WEARABLE.
              </h1>

              <p className="mt-2 text-sm">UP TO 80% OFF</p>

              <div className="mt-5 flex gap-2">
                <span className="h-1 w-6 rounded bg-white" />
                <span className="h-1 w-6 rounded bg-gray-500" />
                <span className="h-1 w-6 rounded bg-gray-500" />
                <span className="h-1 w-6 rounded bg-gray-500" />
              </div>
            </div>

            <div className="absolute right-0 top-0 h-full w-1/2">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"
                alt="Smart Watch"
                className="h-full w-full object-cover opacity-70"
              />
            </div>
          </div>

          <button className="absolute left-2 top-1/2 flex -translate-y-1/2 rounded-full bg-white p-2 shadow">
            <ChevronLeft size={18} />
          </button>

          <button className="absolute right-2 top-1/2 flex -translate-y-1/2 rounded-full bg-white p-2 shadow">
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      <ProductList />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Shop From <span className="text-cyan-600">Top Categories</span>
          </h2>

          <Link
            to="/products"
            className="flex items-center gap-1 text-sm text-gray-500"
          >
            View All
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name}`}
              className="group flex min-w-20 flex-col items-center"
            >
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200 transition group-hover:ring-cyan-500 md:h-20 md:w-20">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <span className="mt-2 text-xs text-gray-600">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Top <span className="text-cyan-600">Electronics Brands</span>
          </h2>

          <Link
            to="/products?category=Electronics"
            className="text-sm text-gray-500"
          >
            View All →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              to="/products?category=Electronics"
              className={`${brand.color} flex min-h-32 items-center justify-between overflow-hidden rounded-xl p-5`}
            >
              <div>
                <p className="text-lg font-bold">{brand.name}</p>

                <p className="mt-3 text-xs font-medium">{brand.text}</p>
              </div>

              <div className="h-24 w-24 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=300&q=80"
                  alt={brand.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Daily Essentials */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Daily <span className="text-cyan-600">Essentials</span>
          </h2>

          <Link
            to="/products?category=Grocery"
            className="text-sm text-gray-500"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {[
            ["Fresh Fruits", "🍎"],
            ["Vegetables", "🥦"],
            ["Strawberry", "🍓"],
            ["Mango", "🥭"],
            ["Cherry", "🍒"],
            ["Groceries", "🛒"],
          ].map(([name, emoji]) => (
            <Link
              key={name}
              to="/products?category=Grocery"
              className="rounded-xl border bg-white p-4 text-center transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-24 items-center justify-center rounded-lg bg-gray-50 text-5xl">
                {emoji}
              </div>

              <p className="mt-3 text-xs font-medium text-gray-700">{name}</p>

              <p className="mt-1 text-[10px] text-green-600">UP TO 50% OFF</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
