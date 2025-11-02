import React from "react";
import { assets } from "../assets/assets";
import { notify } from "./ToastProvider";

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    notify.success("Admin Logged out successfully");
  };

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img
        src={assets.AdminLogo}
        alt="Admin-Logo"
        className="w-[max(15%,80px)]"
      />

      <button
        onClick={handleLogout}
        className="bg-primary hover:bg-primary-dull text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
