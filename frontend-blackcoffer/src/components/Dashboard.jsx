import React, { useState, useEffect } from "react";
import jsonData from "../data/jsondata.json";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Dashboard = ({ filters }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    const applyFilters = () => {
      let data = [...jsonData];
      for (let key in filters) {
        if (filters[key]) {
          data = data.filter((item) =>
            String(item[key] || "").toLowerCase() === filters[key].toLowerCase()
          );
        }
      }
      setFilteredData(data);
    };
    applyFilters();
  }, [filters]);

  const labels = filteredData.map((d, i) => d.topic || `Data ${i + 1}`);

  const barData = {
    labels,
    datasets: [
      {
        label: "Intensity",
        data: filteredData.map((d) => d.intensity || 0),
        backgroundColor: "#6366f1"
      },
      {
        label: "Likelihood",
        data: filteredData.map((d) => d.likelihood || 0),
        backgroundColor: "#10b981"
      },
      {
        label: "Relevance",
        data: filteredData.map((d) => d.relevance || 0),
        backgroundColor: "#f59e0b"
      }
    ]
  };

  const pieData = {
    labels,
    datasets: [
      {
        label: "Relevance",
        data: filteredData.map((d) => d.relevance || 0),
        backgroundColor: [
          "#ec4899",
          "#8b5cf6",
          "#22c55e",
          "#f97316",
          "#0ea5e9",
          "#facc15",
          "#a78bfa"
        ]
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff"
        }
      }
    }
  };

  const lineData = {
    labels: filteredData.map((d) => d.end_year || "N/A"),
    datasets: [
      {
        label: "Intensity Over Years",
        data: filteredData.map((d) => d.intensity || 0),
        fill: false,
        borderColor: "#f43f5e",
        tension: 0.3
      }
    ]
  };

  const renderChart = () => {
    switch (chartType) {
      case "pie":
        return (
          <div className="relative h-[500px]">
            <Pie data={pieData} options={pieOptions} />
          </div>
        );
      case "line":
        return <Line data={lineData} />;
      default:
        return <Bar data={barData} />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard Charts</h2>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="line">Line Chart</option>
        </select>
      </div>

      {filteredData.length > 0 ? (
        renderChart()
      ) : (
        <p className="text-gray-500 dark:text-gray-300">No data available.</p>
      )}
    </div>
  );
};

export default Dashboard;
