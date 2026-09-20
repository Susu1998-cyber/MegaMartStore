import { MessageCircle, Phone } from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="mt-16 bg-cyan-600 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
          <div>
            {/* Logo / Brand */}
            <h2 className="text-xl font-bold text-white">MegaMart</h2>

            {/* Contact Us */}
            <p className="mt-3 text-12 font-medium text-white">Contact Us</p>

            {/* WhatsApp */}
            <div className="mt-2">
              <div className="flex items-center gap-1.5 text-sm text-white">
                <MessageCircle size={12} />
                <span>Whats App</span>
              </div>

              <p className="ml-4 mt-0.5 text-6 text-cyan-100">
                +1 202-918-2132
              </p>
            </div>

            {/* Call Us */}
            <div className="mt-2">
              <div className="flex items-center gap-1.5 text-sm text-white">
                <Phone size={12} />
                <span>Call Us</span>
              </div>

              <p className="ml-4 mt-0.5 text-6 text-cyan-100">
                +1 202-918-2132
              </p>
            </div>

            {/* Download App */}
            <p className="mt-3 text-12 font-medium text-white">Download App</p>

            {/* App Buttons */}
            <div className="mt-1.5 flex items-center gap-2">
              <img
                src="/images/Appstore.png"
                alt="Download on App Store"
                className="h-7 w-auto"
              />

              <img
                src="/images/App.png"
                alt="Get it on Google Play"
                className="h-7 w-auto"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Most Popular Categories</h3>

            <ul className="mt-4 space-y-2 text-sm text-cyan-50">
              <li>Mobile</li>
              <li>Electronics</li>
              <li>Fashion</li>
              <li>Grocery</li>
              <li>Watches</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Customer Services</h3>

            <ul className="mt-4 space-y-2 text-sm text-cyan-50">
              <li>About Us</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Return Policy</li>
              <li>Help Center</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cyan-500 py-5 text-center text-xs text-cyan-100">
          © 2026 MegaMart. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
