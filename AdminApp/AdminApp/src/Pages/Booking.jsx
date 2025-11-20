import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import {  Search } from "lucide-react";

const bookingsData = [
  { id: 1, type: "DELUXE DOUBLE", floor: "EAST WING F1", status: "AVAILABLE", price: 100 },
  { id: 2, type: "JUNIOR SUITE", floor: "EAST WING F1", status: "AVAILABLE", price: 150 },
  { id: 3, type: "DELUXE DOUBLE", floor: "WEST WING F2", status: "AVAILABLE", price: 100 },
  { id: 4, type: "EXECUTIVE SUITE", floor: "WEST WING F3", status: "AVAILABLE", price: 200 },
  { id: 5, type: "PRESIDENTIAL SUITE", floor: "EAST WING F4", status: "AVAILABLE", price: 300 },
  { id: 6, type: "JUNIOR SUITE", floor: "EAST WING F2", status: "AVAILABLE", price: 150 },
];

const Booking = () => {
  const tabs = ["AVAILABLE", "PENDING", "BOOKED", "CHECKED IN"];
  const navigate = useNavigate();
  const location = useLocation();

  // Preserve tab state when coming back from details
  const initialTab = location.state?.activeTab || "AVAILABLE";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchBooking, setSearchBooking] = useState("");

  // Enrich booking data for non-AVAILABLE tabs
  const enrichedData = bookingsData.map((b, i) => {
    if (activeTab === "AVAILABLE") return b;

    return {
      ...b,
      bookingNo: `BK${1000 + i}`,
      firstName: ["Pema", "Sonam", "Tashi", "Karma", "Thinley", "Ugyen"][i % 6],
      lastName: ["Sangay", "Dema", "Wangmo", "Dorji", "Lhamo", "Tenzin"][i % 6],
      name: ["Dorji Tshomo", "Sonam Dema", "Tashi Wangmo", "Karma Dorji", "Thinley Lhamo", "Ugyen Tenzin"][i % 6],
      email: ["dorji@gmail.com", "sonam@hotel.com", "tashi@hotel.com", "karma@hotel.com", "thinley@hotel.com", "ugyen@hotel.com"][i % 6],
      country: "Bhutan",
      phoneCode: "+975",
      phone: "17899888",
      checkIn: "2025-11-05",
      checkOut: "2025-11-07",
      lengthOfStay: "2 days",
      adults: 2,
      children: 0,
      specialRequest: "Allergic to peanuts, please avoid peanut oil.",
      roomNo: ["101", "102", "201", "301", "401", "202"][i % 6],
      journalNumber: "",
      price: b.price,
      status: activeTab,
    };
  });

const filteredData = enrichedData.filter((b) => {
  if (activeTab === "AVAILABLE") {
    return b.status === activeTab; // show all available bookings
  } else {
    return (
      b.status === activeTab &&
      b.bookingNo?.toLowerCase().includes(searchBooking.toLowerCase())
    );
  }
});


  return (
    <div className="flex min-h-screen">
      
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        
        <Header />

        <main className="flex-1 overflow-y-auto bg-gray-50 px-2 relative">
<h2 className="text-2xl font-bold text-gray-800 mb-6">Booking</h2>
          {/* Tabs + Search */}

<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
  {/* Tabs */}
  <div className="flex border shadow-sm bg-white">
    {tabs.map((tab) => (
      <button
        key={tab}
        className={`px-6 py-2 font-small transition-colors duration-200 ${
          activeTab === tab
            ? "bg-[#006600] text-white shadow"
            : "bg-white text-gray-700 hover:bg-green-100"
        }`}
        onClick={() => {
          setActiveTab(tab);
          setSearchBooking("");
        }}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Search Bar */}
  {activeTab !== "AVAILABLE" && (
    <div className="relative w-full sm:w-64">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <input
        type="text"
        placeholder="Search Booking No"
        value={searchBooking}
        onChange={(e) => setSearchBooking(e.target.value)}
        className="w-full pl-9 pr-3 h-11 border border-gray-300 focus:border-[#006600] focus:ring-2 focus:ring-[#006600]/40 outline-none shadow-sm transition-all"
      />
    </div>
  )}
</div>


          {/* Table */}
          <div className="overflow-x-auto bg-white border border-[#9CA3AF]  shadow relative z-0">
            <table className="min-w-full divide-y divide-[#9CA3AF]">
<thead className="bg-green-700 text-black">
  <tr>
    {activeTab !== "AVAILABLE" && (
      <th className="px-4 py-3 text-left text-m font-semibold">Booking No</th>
    )}
    <th className="px-4 py-3 text-left text-m font-semibold">Room Type</th>
    <th className="px-4 py-3 text-left text-m font-semibold">Room Floor</th>
    <th className="px-4 py-3 text-left text-m font-semibold">Status</th>
    {activeTab !== "AVAILABLE" && (
      <th className="px-4 py-3 text-left text-m font-semibold">Action</th>
    )}
  </tr>
</thead>
<tbody className="bg-white divide-y divide-[#9CA3AF]">
  {filteredData.map((booking) => (
    <tr key={booking.id} className="hover:bg-green-50 transition-colors">
      {activeTab !== "AVAILABLE" && (
        <td className="px-4 py-3 text-gray-600">{booking.bookingNo}</td>
      )}
      <td className="px-4 py-3 text-gray-600">{booking.type}</td>
      <td className="px-4 py-3 text-gray-600">{booking.floor}</td>
      <td
        className={`px-4 py-3 ${
          booking.status === "AVAILABLE"
            ? "text-[#009519]"
            : booking.status === "PENDING"
            ? "text-yellow-600"
            : booking.status === "BOOKED"
            ? "text-blue-700"
            : "text-[#009519]"
        }`}
      >
        {booking.status}
      </td>
      {activeTab !== "AVAILABLE" && (
        <td className="px-4 py-3">
          <button
            className="text-green-700 font-small hover:underline"
            onClick={() =>
              navigate("/booking-details", { state: { booking, activeTab } })
            }
          >
            VIEW
          </button>
        </td>
      )}
    </tr>
  ))}
</tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Booking;
