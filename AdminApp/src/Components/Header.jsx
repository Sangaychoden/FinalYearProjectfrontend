import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-56 right-0 h-16 flex justify-end items-center px-8 bg-white shadow-md z-40">
      <Link
        to="/admin-profile"
        className="border border-gray-400 px-6 py-1 text-center rounded-sm hover:bg-gray-100 transition cursor-pointer"
      >
        <div className="text-sm font-semibold text-gray-800 py-1">ADMIN</div>
      </Link>
    </header>
  );
};

export default Header;
