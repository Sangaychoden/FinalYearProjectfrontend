
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ✅ API URL from .env
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Dashboard = () => {
  // Detect current year
  const currentYear = new Date().getFullYear().toString();

  // React states
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [availableYears, setAvailableYears] = useState([]);
  const [stats, setStats] = useState({ total: 0, foreign: 0, local: 0 });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch total stats (cards)
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings/dashboard/stats`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch stats");

      setStats({
        total: data.totalBookings || 0,
        foreign: data.foreignGuests || 0,
        local: data.localGuests || 0,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch monthly data (chart)
  const fetchChartData = async (year) => {
    try {
      const response = await fetch(
        `${API_URL}/bookings/dashboard/monthly?year=${year}`,
        { credentials: "include" }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch chart data");

      setChartData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Generate last 5 years for dropdown
  useEffect(() => {
    const current = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => (current - i).toString());
    setAvailableYears(years);
  }, []);

  // Fetch all data whenever the year changes
  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.all([fetchStats(), fetchChartData(selectedYear)]).finally(() =>
      setLoading(false)
    );
  }, [selectedYear]);

  return (
    <div className="space-y-8">
      {/* Header + Year Dropdown */}
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-[#9CA3AF] -md px-4 py-2 text-gray-700 focus:ring focus:ring-blue-200"
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Boxes */}
      {loading ? (
        <div className="text-center text-gray-600 py-10">Loading dashboard data...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-10">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-2">
          <div className="bg-[#3399FE] text-white p-6 shadow text-center">
            <h3 className="text-lg font-sm">TOTAL BOOKINGS</h3>
            <p className="text-3xl font-semibold mt-2">{stats.total}</p>
          </div>

          <div className="bg-[#C55A11] text-white p-6 shadow text-center">
            <h3 className="text-lg font-sm">FOREIGN GUESTS</h3>
            <p className="text-3xl font-semibold mt-2">{stats.foreign}</p>
          </div>

          <div className="bg-[#70AD47] text-white p-6 shadow text-center">
            <h3 className="text-lg font-sm">LOCAL GUESTS</h3>
            <p className="text-3xl font-semibold mt-2">{stats.local}</p>
          </div>
        </div>
      )}

      {/* Chart Section */}
      <div className="bg-white p-6 -lg shadow border border-gray-200 mx-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">BOOKINGS STATISTICS</h3>
          <p className="text-sm text-gray-500">Year: {selectedYear}</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading chart...</p>
        ) : chartData.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No booking data found for {selectedYear}.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="foreign"
                stroke="#C55A11"
                strokeWidth={3}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="local"
                stroke="#70AD47"
                strokeWidth={3}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
