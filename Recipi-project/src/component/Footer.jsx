import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-50 to-red-50 border-t-2 border-orange-100 mt-16">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-black tracking-wide mb-2">
              MVRH
            </h2>
            <p className="text-gray-600 text-sm">
              Discover delicious recipes from around the world. Your culinary
              journey starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/filter"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Browse Recipes
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Breakfast
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Lunch
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Dinner
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Desserts
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Get in Touch
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Email:</span> info@mvrh.com
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Phone:</span> +1 (555) 123-4567
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Address:</span> 123 Recipe Lane
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-orange-200 py-8">
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="#"
              className="text-orange-600 hover:text-orange-700 text-2xl transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-orange-600 hover:text-orange-700 text-2xl transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-orange-600 hover:text-orange-700 text-2xl transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-orange-600 hover:text-orange-700 text-2xl transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>

          {/* Bottom Footer */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">
              © 2024 MVRH. All rights reserved.
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <a
                href="#"
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="#"
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                Terms of Service
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="#"
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
