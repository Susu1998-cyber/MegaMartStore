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
    color: "bg-orange-200",
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

const dailyEssentials = [
  {
    name: "Daily Essentials",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Fruits",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Strawberry",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Mango",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Cherry",
    image:
      "data:image/jpeg;base64,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",
  },
];

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-5">
        <div className="relative rounded-xl bg-gray-900 overflow-visible">
          {/* Carousel Content */}
          <div className="overflow-hidden rounded-xl">
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
          </div>

          {/* Left Arrow */}
          <button
            className="
        absolute left-0 top-1/2
        flex -translate-x-1/2 -translate-y-1/2
        items-center justify-center
        rounded-full bg-white p-2
        shadow-md
      "
          >
            <ChevronLeft size={25} />
          </button>

          {/* Right Arrow */}
          <button
            className="
        absolute right-0 top-1/2
        flex translate-x-1/2 -translate-y-1/2
        items-center justify-center
        rounded-full bg-white p-2
        shadow-md
      "
          >
            <ChevronRight size={25} />
          </button>
        </div>
      </section>

      <ProductList />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-5 flex items-end justify-between">
          <div className=" inli ne-block">
            <h2 className="text-lg font-semibold">
              Shop From <span className="text-cyan-600">Top Categories</span>
            </h2>
            <div className="mt-2 h-1 w-full rounded-full bg-cyan-600" />
          </div>
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
          <div className=" inli ne-block">
            <h2 className="text-lg font-semibold">
              Top <span className="text-cyan-600">Electronics Brands</span>
            </h2>
            <div className="mt-2 h-1 w-full rounded-full bg-cyan-600" />
          </div>

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
        <div className="mt-5 flex gap-2 dispaly-flex justify-center">
          <span className="h-1 w-6 rounded bg-white" />
          <span className="h-1 w-6 rounded bg-gray-500" />
          <span className="h-1 w-6 rounded bg-gray-500" />
          <span className="h-1 w-6 rounded bg-gray-500" />
        </div>
      </section>

      {/* Daily Essentials */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-5 flex items-center justify-between">
          <div className=" inli ne-block">
            <h2 className="text-lg font-semibold">
              Daily <span className="text-cyan-600">Essentials Brands</span>
            </h2>
            <div className="mt-2 h-1 w-full rounded-full bg-cyan-600" />
          </div>

          <Link
            to="/products?category=Grocery"
            className="text-sm text-gray-500"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {dailyEssentials.map((item) => (
            <Link
              key={item.name}
              to="/products?category=Grocery"
              className="group text-center"
            >
              {/* Image */}
              <div className="h-45 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-2 transition group-hover:-translate-y-1 group-hover:border-cyan-500 group-hover:shadow-md">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <p className="mt-3 text-xs font-medium text-gray-700">
                {item.name}
              </p>

              <p className="mt-1 text-md text-black">UP TO 50% OFF</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
