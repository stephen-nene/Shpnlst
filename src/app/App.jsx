import React, { useEffect, useState } from "react";
import "../assets/styles/App.css"; // Assuming you have global CSS here

import { Route, Routes } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Home from "../Components/pages/Home";
import About from "../Components/pages/About";

function App() {
  // Check localStorage for darkMode preference on app start and default to false if not found
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? savedDarkMode === "true" : false;
  });



  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className=" bg-gray-200 min-h-screen dark:bg-gray-800 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;
