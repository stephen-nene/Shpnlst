import React from "react";
import { FaMoon, FaSun } from "react-icons/fa"; // React Icons

import { NavLink } from "react-router-dom";

interface Props {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ darkMode, setDarkMode }: Props) {
  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem("darkMode", JSON.stringify(newValue));
  };

  return (
    <div className="navbar sticky top-0 bg-white dark:bg-gray-950 dark:text-white p-4 shadow-md z-10">
      <div className="flex justify-between items-center">
        <div>
          <NavLink
            to="/"
            className="text-2xl md:text-3xl text-green-800 hover:text-eme rald-500 font-logo2"
          >
            Shpnlst
          </NavLink>
        </div>
        <div className="flex items-center space-x-6 text-lg hover:text-emerald-600 font-bold">
          <NavLink to="/history">History</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="text-2xl p-2 rounded">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </div>
  );
}
