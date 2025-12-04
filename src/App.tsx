import {  useState } from "react";

import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar.tsx";
import Footer from "./Components/Footer.tsx";
import Home from "./Components/pages/Home.tsx";
import About from "./Components/pages/About.tsx";
import History from "./Components/pages/History.tsx";

import Error404 from "./Components/pages/Error404.tsx";

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
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;
