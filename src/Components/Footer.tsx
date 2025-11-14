import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

export default function Footer({ darkMode, setDarkMode }) {
  const toggleDarkMode = () => {
    setDarkMode(() => {
      localStorage.setItem("darkMode", !darkMode);
      return !darkMode;
    });
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white py-6">
      <div className="max-w-3xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-logo2 text-green-600">
          Shpnlst
        </Link>

        {/* Navigation */}
        <nav className="flex space-x-6 mt-4 md:mt-0">
          <NavLink
            to="/"
            className="hover:text-green-600 dark:hover:text-emerald-600"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-green-600 dark:hover:text-white"
          >
            About Us
          </NavLink>
        </nav>

        {/* Dark mode toggle */}
        <button onClick={toggleDarkMode} className="mt-4 md:mt-0 text-2xl">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Contact */}
      <div className="mt-4 text-center text-sm">
        <p>
          Contact me via{" "}
          <a
            target="_blank"
            href="https://wa.me/+254741780970"
            className="text-blue-600 dark:text-blue-400"
          >
            WhatsApp
          </a>{" "}
          for more information!
        </p>
      </div>
    </footer>
  );
}
