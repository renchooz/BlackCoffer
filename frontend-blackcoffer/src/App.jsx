
import React, { useState } from "react";
import Filters from "./components/Filters";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [filters, setFilters] = useState({});
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300 p-6 font-sans">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-white">
            📊 Blackcoffer Dashboard
          </h1>
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded-full bg-gray-800 text-white dark:bg-white dark:text-black"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="col-span-1">
            <Filters onFilter={(f) => {
              const normalizedFilters = Object.entries(f).reduce((acc, [key, val]) => {
                acc[key] = val.trim().toLowerCase();
                return acc;
              }, {});
              setFilters(normalizedFilters);
            }} />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <Dashboard filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
