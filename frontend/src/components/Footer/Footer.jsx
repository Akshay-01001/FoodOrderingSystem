import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div>
            <h2 className="text-2xl font-bold">Foodies</h2>
            <p className="mt-4 text-gray-400">
              The best place to order delicious meals from your favorite
              restaurants.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold">Useful Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/menu" className="hover:underline">
                  Menu
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:underline">
                  My Cart
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li>Phone: +1 234 567 890</li>
              <li>Email: support@foodies.com</li>
              <li>Location: 123 Food Street, City, Country</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <a href="https://facebook.com" className="hover:text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.67 0H1.33C.6 0 0 .6 0 1.33v21.33C0 23.4.6 24 1.33 24h11.5v-9.33H9.83v-3.67h3V8.5c0-3.03 1.85-4.67 4.55-4.67 1.3 0 2.42.1 2.75.14v3.2H17.9c-1.49 0-1.78.71-1.78 1.75v2.3h3.56l-.46 3.67h-3.1V24h6.06c.73 0 1.33-.6 1.33-1.34V1.33C24 .6 23.4 0 22.67 0z" />
                </svg>
              </a>
              <a href="https://twitter.com" className="hover:text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.32 4.64c-.83.37-1.73.62-2.68.73.97-.58 1.7-1.5 2.05-2.6-.9.53-1.9.91-2.96 1.12a4.63 4.63 0 0 0-7.88 4.22c-3.86-.2-7.29-2.06-9.59-4.88-.4.68-.63 1.47-.63 2.31 0 1.6.82 3.02 2.06 3.85-.76-.03-1.47-.23-2.09-.58v.06c0 2.24 1.59 4.11 3.7 4.53a4.65 4.65 0 0 1-2.09.08c.6 1.89 2.34 3.27 4.4 3.31a9.3 9.3 0 0 1-5.74 1.98c-.37 0-.74-.02-1.1-.06a13.13 13.13 0 0 0 7.1 2.08c8.52 0 13.17-7.06 13.17-13.17 0-.2 0-.4-.02-.59.91-.65 1.7-1.48 2.32-2.42z" />
                </svg>
              </a>
              <a href="https://instagram.com" className="hover:text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.16c3.19 0 3.56.01 4.81.07 1.24.06 2.09.26 2.58.44.62.23 1.06.51 1.53.98.47.47.75.91.98 1.53.18.49.38 1.34.44 2.58.06 1.25.07 1.62.07 4.81s-.01 3.56-.07 4.81c-.06 1.24-.26 2.09-.44 2.58-.23.62-.51 1.06-.98 1.53-.47.47-.91.75-1.53.98-.49.18-1.34.38-2.58.44-1.25.06-1.62.07-4.81.07s-3.56-.01-4.81-.07c-1.24-.06-2.09-.26-2.58-.44-.62-.23-1.06-.51-1.53-.98-.47-.47-.75-.91-.98-1.53-.18-.49-.38-1.34-.44-2.58C2.17 15.56 2.16 15.19 2.16 12s.01-3.56.07-4.81c.06-1.24.26-2.09.44-2.58.23-.62.51-1.06.98-1.53.47-.47.91-.75 1.53-.98.49-.18 1.34-.38 2.58-.44C8.44 2.17 8.81 2.16 12 2.16zm0-2.16C8.69 0 8.31 0 7.06.06 5.81.12 4.82.32 4.08.56c-.75.24-1.42.53-2.06 1.16a6.13 6.13 0 0 0-1.16 2.06C.32 4.82.12 5.81.06 7.06.01 8.31 0 8.69 0 12s.01 3.69.06 4.94c.06 1.25.26 2.24.56 3 .24.75.53 1.42 1.16 2.06.63.63 1.31.91 2.06 1.16.76.24 1.75.44 3 .56 1.25.06 1.63.06 4.94.06s3.69-.01 4.94-.06c1.25-.06 2.24-.26 3-.56.75-.24 1.42-.53 2.06-1.16.63-.63.91-1.31 1.16-2.06.24-.76.44-1.75.56-3 .06-1.25.06-1.63.06-4.94s-.01-3.69-.06-4.94c-.06-1.25-.26-2.24-.56-3-.24-.75-.53-1.42-1.16-2.06-.63-.63-1.31-.91-2.06-1.16-.76-.24-1.75-.44-3-.56C15.69.01 15.31 0 12 0z" />
                  <path d="M12 5.84A6.16 6.16 0 1 0 12 18.32 6.16 6.16 0 1 0 12 5.84zm0 10.32A4.16 4.16 0 1 1 12 7.84a4.16 4.16 0 1 1 0 8.32zM18.41 4.8a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 1 0 0-2.88z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Foodies. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
