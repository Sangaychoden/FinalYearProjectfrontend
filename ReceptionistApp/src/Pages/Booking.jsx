
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Search, Calendar, Eye } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Booking = () => {
  const tabs = ["AVAILABLE", "PENDING", "BOOKED", "CHECKED IN", "CANCELLED"];
  const navigate = useNavigate();
  const location = useLocation();

  const initialTab = location.state?.activeTab || "AVAILABLE";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchBooking, setSearchBooking] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab, selectedDate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = "";

      if (activeTab === "AVAILABLE") {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        url = `${API_URL}/rooms/available?date=${formattedDate}`;
      } else if (activeTab === "PENDING") {
        url = `${API_URL}/bookings/pending`;
      } else if (activeTab === "BOOKED") {
        url = `${API_URL}/bookings/confirmed-guaranteed-bookings`;
      } else if (activeTab === "CHECKED IN") {
        url = `${API_URL}/bookings/checked-in`;
      } else if (activeTab === "CANCELLED") {
        url = `${API_URL}/bookings/cancelled/all`;
      }

      const token = localStorage.getItem("authToken");

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch data");

      if (activeTab === "AVAILABLE") {
        setData(data.availableRooms || []);
      } else {
        setData(data.bookings || []);
      }
    } catch (err) {
      console.error("❌ Error fetching data:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredData =
    activeTab === "AVAILABLE"
      ? data
      : data.filter((b) =>
          b.bookingNumber?.toLowerCase().includes(searchBooking.toLowerCase())
        );

  const formatDate = (date) => {
    return new Date(date)
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(",", "");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <Header />

        <main className="flex-1 overflow-y-auto bg-gray-50 px-2 relative">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking</h2>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex border shadow-sm bg-white">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-2 text-sm transition-colors duration-200 ${
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

            {activeTab !== "AVAILABLE" ? (
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
                  className="w-full pl-9 pr-3 h-11 border border-gray-300 focus:border-[#006600] focus:ring-2 focus:ring-[#006600]/40 outline-none shadow-sm"
                />
              </div>
            ) : (
              <div className="relative w-full sm:w-64">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center justify-between w-full h-11 px-4 border border-gray-300 bg-white shadow-sm hover:bg-green-50"
                >
                  <span className="text-gray-700">{formatDate(selectedDate)}</span>
                  <Calendar size={18} className="text-gray-500" />
                </button>

                {showDatePicker && (
                  <div className="absolute top-12 right-0 bg-white border shadow-lg z-50">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setShowDatePicker(false);
                      }}
                      inline
                      minDate={new Date()}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ⭐ AUTO BALANCED TABLE */}
          <div className="overflow-x-auto bg-white border border-gray-300 shadow">
            <table className="table-auto w-full divide-y divide-gray-300">
              <thead className="bg-green-700 text-black">
                <tr>
                  {activeTab !== "AVAILABLE" && (
                    <th className="px-4 py-3 text-left font-semibold">
                      Booking No
                    </th>
                  )}
                  <th className="px-4 py-3 text-left font-semibold">Room Type</th>

                  {activeTab === "AVAILABLE" ? (
                    <>
                      <th className="px-4 py-3 text-left">Total</th>
                      <th className="px-4 py-3 text-left">Booked</th>
                      <th className="px-4 py-3 text-left ">Available</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Action</th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-3 text-left">Check-In</th>
                      <th className="px-4 py-3 text-left">Check-Out</th>
                      <th className="px-4 py-3 text-left">Status</th>

                      {(activeTab === "PENDING" ||
                        activeTab === "BOOKED" ||
                        activeTab === "CANCELLED" ||
                        activeTab === "CHECKED IN") && (
                        <th className="px-4 py-3 text-left">Action</th>
                      )}
                    </>
                  )}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-300">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-500">
                      No data found.
                    </td>
                  </tr>
                ) : activeTab === "AVAILABLE" ? (
                  filteredData.map((room, index) => (
                    <tr key={index} className="hover:bg-green-50">
                      <td className="px-4 py-3">{room.roomType}</td>
                      <td className="px-4 py-3 text-left">{room.totalRooms}</td>
                      <td className="px-4 py-3 text-left">{room.bookedRooms}</td>
                      <td className="px-4 py-3 text-left">{room.availableRooms}</td>
                      <td className="px-4 py-3 text-left text-[#006600]">
                        AVAILABLE
                      </td>

                      <td className="px-4 py-3 text-left">
                        <button
                          className="flex font-small font-semibold hover:underline"
                          onClick={() =>
                            navigate("/booking-form/AVAILABLE", {
                              state: {
                                status: "AVAILABLE",
                                roomType: room.roomType,
                                selectedDate: selectedDate,
                              },
                            })
                          }
                        >
                          BOOK
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  filteredData.map((booking, index) => (
                    <tr key={index} className="hover:bg-green-50">
                      <td className="px-4 py-3">{booking.bookingNumber}</td>
                      <td className="px-4 py-3">
                        {booking.rooms?.[0]?.roomType}
                      </td>
                      <td className="px-4 py-3 text-left">
                        {formatDate(booking.checkIn)}
                      </td>
                      <td className="px-4 py-3 text-left">
                        {formatDate(booking.checkOut)}
                      </td>

                      <td
                        className={`px-4 py-3 text-left ${
                          booking.status === "pending"
                            ? "text-[#F59E0B]"
                            : booking.status === "confirmed"
                            ? "text-[#1D4ED8]"
                            : booking.status === "guaranteed"
                            ? "text-[#8B008B]"
                            : booking.status === "checked_in"
                            ? "text-[#6A0DAD]"
                            : booking.status === "cancelled"
                            ? "text-[#CC0000]"
                            : "text-gray-600"
                        }`}
                      >
                        {booking.status.toUpperCase()}
                      </td>

                      {(activeTab === "PENDING" ||
                        activeTab === "BOOKED" ||
                        activeTab === "CANCELLED" ||
                        activeTab === "CHECKED IN") && (
                        <td className="px-4 py-3 text-left">
                          <button
                            onClick={() =>
                              navigate(`/booking-details/${booking._id}`)
                            }
                            className="font-small font-semibold hover:underline"
                          >
                             VIEW
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Booking;
