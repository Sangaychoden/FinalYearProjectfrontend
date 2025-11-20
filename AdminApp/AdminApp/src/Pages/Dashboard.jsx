import React, { useState } from "react";
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

const yearlyData = {
  2023: {
    stats: { total: 820, foreign: 420, local: 400 },
    chart: [
      { month: "Jan", foreign: 40, local: 60 },
      { month: "Feb", foreign: 35, local: 70 },
      { month: "Mar", foreign: 50, local: 80 },
      { month: "Apr", foreign: 55, local: 90 },
      { month: "May", foreign: 90, local: 60 },
      { month: "Jun", foreign: 100, local: 50 },
      { month: "Jul", foreign: 60, local: 30 },
      { month: "Aug", foreign: 70, local: 40 },
      { month: "Sep", foreign: 80, local: 60 },
      { month: "Oct", foreign: 110, local: 80 },
      { month: "Nov", foreign: 90, local: 50 },
      { month: "Dec", foreign: 40, local: 30 },
    ],
  },
  2024: {
    stats: { total: 950, foreign: 500, local: 450 },
    chart: [
      { month: "Jan", foreign: 50, local: 70 },
      { month: "Feb", foreign: 45, local: 60 },
      { month: "Mar", foreign: 60, local: 90 },
      { month: "Apr", foreign: 75, local: 100 },
      { month: "May", foreign: 90, local: 70 },
      { month: "Jun", foreign: 110, local: 80 },
      { month: "Jul", foreign: 70, local: 40 },
      { month: "Aug", foreign: 80, local: 60 },
      { month: "Sep", foreign: 90, local: 70 },
      { month: "Oct", foreign: 120, local: 90 },
      { month: "Nov", foreign: 100, local: 60 },
      { month: "Dec", foreign: 60, local: 50 },
    ],
  },
  2025: {
    stats: { total: 1002, foreign: 1502, local: 102 },
    chart: [
      { month: "Jan", foreign: 70, local: 160 },
      { month: "Feb", foreign: 65, local: 90 },
      { month: "Mar", foreign: 80, local: 110 },
      { month: "Apr", foreign: 60, local: 90 },
      { month: "May", foreign: 130, local: 85 },
      { month: "Jun", foreign: 120, local: 60 },
      { month: "Jul", foreign: 40, local: 30 },
      { month: "Aug", foreign: 80, local: 60 },
      { month: "Sep", foreign: 90, local: 70 },
      { month: "Oct", foreign: 160, local: 150 },
      { month: "Nov", foreign: 150, local: 100 },
      { month: "Dec", foreign: 100, local: 50 },
    ],
  },
};

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("2025");

  const { stats, chart } = yearlyData[selectedYear];

  return (
    <div className="space-y-6">
      {/* Header with year selector */}
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-[#9CA3AF] px-4 py-2 text-gray-700 focus:ring focus:ring-blue-200"
        >
          {Object.keys(yearlyData).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Stats boxes */}
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

      {/* Chart */}
      <div className="bg-white p-6  shadow border border-gray-200 mx-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">BOOKINGS STATISTICS</h3>
          <p className="text-sm text-gray-500">Year: {selectedYear}</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="foreign" stroke="#C55A11" strokeWidth={3} />
            <Line type="monotone" dataKey="local" stroke="#70AD47" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
