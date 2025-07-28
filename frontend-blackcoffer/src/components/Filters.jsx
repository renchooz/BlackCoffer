
import React, { useState, useEffect } from "react";
import jsonData from "../data/jsondata.json";

const Filters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    country: "",
    topic: "",
    sector: "",
    region: "",
    end_year: ""
  });

  const [options, setOptions] = useState({
    countries: [],
    topics: [],
    sectors: [],
    regions: [],
    years: []
  });

  useEffect(() => {
    const extractOptions = () => {
      const unique = (field) => [...new Set(jsonData.map((item) => item[field]).filter(Boolean))];
      setOptions({
        countries: unique("country"),
        topics: unique("topic"),
        sectors: unique("sector"),
        regions: unique("region"),
        years: unique("end_year").sort()
      });
    };
    extractOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      country: "",
      topic: "",
      sector: "",
      region: "",
      end_year: ""
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  const renderSelect = (label, name, values) => (
    <div>
      <label className="block mb-1 capitalize font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        name={name}
        value={filters[name]}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">All</option>
        {values.map((v, i) => (
          <option key={i} value={v}>{v}</option>
        ))}
      </select>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 p-6 rounded-xl shadow-xl space-y-4 transition-all"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        Filters
      </h2>

      {renderSelect("Country", "country", options.countries)}
      {renderSelect("Topic", "topic", options.topics)}
      {renderSelect("Sector", "sector", options.sectors)}
      {renderSelect("Region", "region", options.regions)}
      {renderSelect("End Year", "end_year", options.years)}

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 py-2 px-4 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-all"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 py-2 px-4 rounded border border-purple-500 text-purple-600 dark:text-purple-300 bg-transparent hover:bg-purple-100 dark:hover:bg-gray-700 transition-all"
        >
          Reset Filters
        </button>
      </div>
    </form>
  );
};

export default Filters;