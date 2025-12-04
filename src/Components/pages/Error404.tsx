import  { useState, useEffect } from "react";
import {
  FaHome,
  FaRobot,
  FaSyncAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import techJokes from "../../assets/data/jokes.json";

export default function Error404() {
  const [funMessage, setFunMessage] = useState("Fetching a joke...");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await response.json();
      setFunMessage(data.value);
    } catch (error) {
      setError(true);
      const fallbackJoke =
        techJokes.techJokes[
          Math.floor(Math.random() * techJokes.techJokes.length)
        ];
      setFunMessage(fallbackJoke);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="p-4 min-h-s creen bg-gradient dark:from-gray-900 dark:to-fuchsia-950">
      <div className="max-w-4xl mx-auto flex flex-col justify-center items-center">
        <div className=" mb-8 ">
          <FaExclamationTriangle className="h-40 w-40 text-red-500 dark:text-red-400 animate-pulse" />
        </div>

        <h1 className="text-8xl font-bold text-center mb-4 bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 dark:text-white">
          Page Not Found
        </h2>

        <div className="w-full max-w-md mb-8">
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Search for the lost page..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pr-12 rounded-lg border-2 border-gray-300 focus:border-fuchsia-500 outline-none dark:bg-gray-800 dark:text-white"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div> */}
        </div>

        <div className="relative mb-8 w-full max-w-2xl">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border-2 border-red-200 dark:border-red-900">
            {loading ? (
              <p className="text-center text-gray-700 dark:text-gray-200 text-lg">
                Loading...
              </p>
            ) : (
              <>
                <p className="text-center text-gray-700 dark:text-gray-200 text-lg">
                  {funMessage}
                </p>
                {error && (
                  <p className="text-center text-red-500 text-sm mt-2">
                    ⚠️ Network error! Showing a fallback joke.
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/"
            className="flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <FaHome size={20} />
            Go Home
          </a>
          <button
            onClick={fetchJoke}
            className="flex items-center gap-2 dark:bg-green-600 dark:hover:bg-green-700 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <FaRobot size={20} />
            Chuck Now
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 border-2 border-gray-800 text-gray-800 font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg dark:text-white dark:border-white"
          >
            <FaSyncAlt size={20} />
            Reload
          </button>
        </div>
      </div>
    </div>
  );
}
