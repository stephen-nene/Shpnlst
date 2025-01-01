import React from "react";
import { FaMoon, FaSun } from "react-icons/fa"; // React Icons

import { NavLink, Link } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode }) {
  const toggleDarkMode = () => {
    setDarkMode(() => {
      localStorage.setItem("darkMode", !darkMode);
      return !darkMode;
    });
  };

  return (
    <div className="navbar sticky top-0 bg-white dark:bg-gray-950 dark:text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/" className="text-2xl md:text-3xl text-green-600 font-logo2">Shpnlst</Link>
        </div>
        <div className="text-lg font-bold">
          <NavLink to="/about">About Us</NavLink>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="text-2xl p-2 rounded">
            {darkMode ? <FaSun  /> : <FaMoon  />}
          </button>
        </div>
      </div>
    </div>
  );
}
