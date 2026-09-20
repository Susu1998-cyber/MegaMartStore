import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  UserRound,
  // Menu,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key !== "Enter") return;

    const value = e.target.value.trim();

    if (!value) {
      navigate("/products");
      return;
    }

    navigate(`/products?q=${encodeURIComponent(value)}`);
  };
  return (
    <>
      {/* Top Bar */}
      <div className="hidden bg-slate-50 text-xs text-gray-500 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <span>Welcome to MegaMart!</span>

          <div className="flex gap-5">
            <span>Deliver to 425568</span>
            <span>Track your order</span>
            <span>All Offers</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
          <button>
            {/* <Menu size={22} />
             */}
            <button className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-600">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M3 12H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M3 18H13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </button>

          <Link to="/" className="text-xl font-bold text-cyan-600 md:text-2xl">
            MegaMart
          </Link>

          {/* Search */}
          <div className="hidden flex-1 md:block">
            <div className="mx-auto flex max-w-xl items-center rounded-md bg-gray-100 px-4">
              <Search size={18} className="text-blue-400" />

              <input
                type="text"
                placeholder="Search smart phones, groceries and more..."
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                onKeyDown={handleSearch}
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4">
            {token ? (
              <button
                onClick={logout}
                className="hidden items-center gap-1 text-sm md:flex"
              >
                <UserRound size={18} className="text-blue-400" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden items-center gap-1 text-sm md:flex"
              >
                <UserRound size={18} className="text-blue-400" />
                Sign In
              </Link>
            )}

            <Link
              to="/cart"
              className="relative flex items-center gap-1 text-sm"
            >
              <ShoppingCart size={20} className="text-blue-400" />
              <span className="hidden md:block">Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="px-4 pb-3 md:hidden">
          <div className="flex items-center rounded-md bg-gray-100 px-3">
            <Search size={18} className="text-gray-400" />

            <input
              placeholder="Search products..."
              className="w-full bg-transparent px-3 py-2 text-sm outline-none"
              onKeyDown={handleSearch}
            />
          </div>
        </div>
      </header>

      {/* Categories */}
      <nav className="hidden border-b border-gray-100  bg-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 overflow-x-auto px-4 py-3">
          {[
            "Grocery",
            "Premium Fruits",
            "Home & Kitchen",
            "Fashion",
            "Electronics",
            "Beauty",
            "Home Improvement",
            "Sports, Toys & Bags",
          ].map((category) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className="flex shrink-0 items-center gap-1 rounded-full bg-gray-50 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-600"
            >
              {category}
              <ChevronDown size={13} />
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
