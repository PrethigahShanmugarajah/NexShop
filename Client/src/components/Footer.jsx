import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src={assets.Logo} className="w-36" alt="Logo" />
          </Link>

          <p className="w-full md:w-2/3 text-gray-600 text-justify">
            NexShop is your one-stop online store for the latest trends,
            high-quality products, and unbeatable deals. Explore our wide range
            of collections, enjoy secure shopping, fast delivery, hassle-free
            returns, and exceptional customer support. Stay updated with our
            newest arrivals and exclusive offers, designed to make your shopping
            experience seamless and enjoyable.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 uppercase">Company</p>

          <ul className="flex flex-col gap-1 text-gray-600 uppercase">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 uppercase">Get in Touch</p>

          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+94 111 222 3333</li>
            <li>nexshop@nexshop.com</li>
          </ul>
        </div>
      </div>

      {/* ---------------- COPYRIGHT ---------------- */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          {" "}
          &copy; {new Date().getFullYear()} NexShop.com All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
