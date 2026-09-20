import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-16 bg-cyan-600 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold">
            MegaMart
          </h2>

          <p className="mt-4 text-sm leading-6 text-cyan-50">
            Your everyday shopping destination for
            electronics, fashion, groceries and more.
          </p>

          <p className="mt-5 text-sm">
            Contact Us
          </p>

          <p className="mt-2 text-xs text-cyan-100">
            support@megamart.com
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            Most Popular Categories
          </h3>

          <ul className="mt-4 space-y-2 text-sm text-cyan-50">
            <li>Mobile</li>
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Grocery</li>
            <li>Watches</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">
            Customer Services
          </h3>

          <ul className="mt-4 space-y-2 text-sm text-cyan-50">
            <li>About Us</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Return Policy</li>
            <li>Help Center</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">
            Quick Links
          </h3>

          <ul className="mt-4 space-y-2 text-sm text-cyan-50">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/products">Products</Link>
            </li>

            <li>
              <Link to="/cart">Cart</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cyan-500 py-5 text-center text-xs text-cyan-100">
        © 2026 MegaMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;