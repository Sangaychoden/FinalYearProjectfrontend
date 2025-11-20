

// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import Sidebar from "../Components/Sidebar";
// // // import Header from "../Components/Header";
// // // import { Search, Calendar } from "lucide-react";
// // // import DatePicker from "react-datepicker";
// // // import "react-datepicker/dist/react-datepicker.css";

// // // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// // // const Booking = () => {
// // //   const tabs = ["AVAILABLE", "BOOKED", "CHECKED IN"];
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const initialTab = location.state?.activeTab || "AVAILABLE";
// // //   const [activeTab, setActiveTab] = useState(initialTab);
// // //   const [searchBooking, setSearchBooking] = useState("");
// // //   const [selectedDate, setSelectedDate] = useState(new Date());
// // //   const [showDatePicker, setShowDatePicker] = useState(false);
// // //   const [data, setData] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   const formatDate = (date) => {
// // //     if (!date) return "-";
// // //     return new Date(date).toLocaleDateString("en-GB", {
// // //       day: "2-digit",
// // //       month: "short",
// // //       year: "numeric",
// // //     });
// // //   };

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       setLoading(true);
// // //       try {
// // //         let response, data;

// // //         if (activeTab === "AVAILABLE") {
// // //           const dateStr = selectedDate.toISOString().split("T")[0];
// // //           response = await fetch(`${API_URL}/rooms/available?date=${dateStr}`, {
// // //             credentials: "include",
// // //           });
// // //           data = await response.json();

// // //           const availableRooms = data.availableRooms || [];
// // //           const formatted = availableRooms.map((r, i) => ({
// // //             id: i + 1,
// // //             type: r.roomType,
// // //             total: r.totalRooms,
// // //             booked: r.bookedRooms,
// // //             available: r.availableRooms,
// // //             status: "AVAILABLE",
// // //           }));
// // //           setData(formatted);
// // //         } else if (activeTab === "BOOKED") {
// // //           response = await fetch(`${API_URL}/bookings/confirmed`, {
// // //             credentials: "include",
// // //           });
// // //           data = await response.json();
// // //           const booked = data.bookings || [];

// // //           const formatted = booked.map((b, i) => ({
// // //             id: b._id || i,
// // //             bookingNo: b.bookingNumber || `BK${1000 + i}`,
// // //             type: b.rooms?.[0]?.roomType || "N/A",
// // //             firstName: b.firstName,
// // //             lastName: b.lastName,
// // //             email: b.email,
// // //             checkIn: b.checkIn,
// // //             checkOut: b.checkOut,
// // //             status: b.status?.toUpperCase() || "BOOKED",
// // //           }));
// // //           setData(formatted);
// // //         } else if (activeTab === "CHECKED IN") {
// // //           response = await fetch(`${API_URL}/bookings/checked-in`, {
// // //             credentials: "include",
// // //           });
// // //           data = await response.json();
// // //           const checked = data.bookings || [];

// // //           const formatted = checked.map((b, i) => ({
// // //             id: b._id || i,
// // //             bookingNo: b.bookingNumber || `BK${1000 + i}`,
// // //             type: b.rooms?.[0]?.roomType || "N/A",
// // //             firstName: b.firstName,
// // //             lastName: b.lastName,
// // //             email: b.email,
// // //             checkIn: b.checkIn,
// // //             checkOut: b.checkOut,
// // //             status: b.status?.toUpperCase() || "CHECKED IN",
// // //           }));
// // //           setData(formatted);
// // //         }
// // //       } catch (err) {
// // //         console.error("❌ Fetch error:", err);
// // //         setData([]);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [activeTab, selectedDate]);

// // //   const filteredData =
// // //     activeTab === "AVAILABLE"
// // //       ? data
// // //       : data.filter((b) =>
// // //           b.bookingNo?.toLowerCase().includes(searchBooking.toLowerCase())
// // //         );

// // //   return (
// // //     <div className="flex min-h-screen">
// // //       <Sidebar />
// // //       <div className="flex-1 flex flex-col relative">
// // //         <Header />

// // //         <main className="flex-1 overflow-y-auto bg-gray-50 px-2 relative">
// // //           <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking</h2>

// // //           {/* Tabs + Search/DatePicker */}
// // //           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
// // //             <div className="flex border shadow-sm bg-white">
// // //               {tabs.map((tab) => (
// // //                 <button
// // //                   key={tab}
// // //                   className={`px-6 py-2 font-small transition-colors duration-200 ${
// // //                     activeTab === tab
// // //                       ? "bg-[#006600] text-white shadow"
// // //                       : "bg-white text-gray-700 hover:bg-green-100"
// // //                   }`}
// // //                   onClick={() => {
// // //                     setActiveTab(tab);
// // //                     setSearchBooking("");
// // //                   }}
// // //                 >
// // //                   {tab}
// // //                 </button>
// // //               ))}
// // //             </div>

// // //             {activeTab !== "AVAILABLE" ? (
// // //               <div className="relative w-full sm:w-64">
// // //                 <Search
// // //                   size={18}
// // //                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
// // //                 />
// // //                 <input
// // //                   type="text"
// // //                   placeholder="Search Booking No"
// // //                   value={searchBooking}
// // //                   onChange={(e) => setSearchBooking(e.target.value)}
// // //                   className="w-full pl-9 pr-3 h-11 border border-gray-300 focus:border-[#006600] focus:ring-2 focus:ring-[#006600]/40 outline-none shadow-sm transition-all"
// // //                 />
// // //               </div>
// // //             ) : (
// // //               <div className="relative w-full sm:w-64">
// // //                 <button
// // //                   onClick={() => setShowDatePicker(!showDatePicker)}
// // //                   className="flex items-center justify-between w-full h-11 px-4 border border-gray-300 bg-white shadow-sm hover:bg-green-50 transition-all"
// // //                 >
// // //                   <span className="text-gray-700">
// // //                     {selectedDate.toLocaleDateString("en-GB")}
// // //                   </span>
// // //                   <Calendar className="text-gray-500" size={18} />
// // //                 </button>

// // //                 {showDatePicker && (
// // //                   <div className="absolute top-12 right-0 bg-white border shadow-lg z-50">
// // //                     <DatePicker
// // //                       selected={selectedDate}
// // //                       onChange={(date) => {
// // //                         setSelectedDate(date);
// // //                         setShowDatePicker(false);
// // //                       }}
// // //                       inline
// // //                       minDate={new Date()}
// // //                     />
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Table */}
// // //           <div className="overflow-x-auto bg-white border border-[#9CA3AF] shadow relative z-0">
// // //             <table className="min-w-full divide-y divide-[#9CA3AF]">
// // //               <thead className="bg-green-700 text-black">
// // //                 <tr>
// // //                   {activeTab !== "AVAILABLE" && (
// // //                     <th className="px-4 py-3 text-left text-m font-semibold">
// // //                       Booking No
// // //                     </th>
// // //                   )}
// // //                   <th className="px-4 py-3 text-left text-m font-semibold">
// // //                     Room Type
// // //                   </th>
// // //                   {activeTab === "AVAILABLE" && (
// // //                     <>
// // //                       <th className="px-4 py-3 text-left text-m font-semibold">
// // //                         Total Rooms
// // //                       </th>
// // //                       <th className="px-4 py-3 text-left text-m font-semibold">
// // //                         Booked Rooms
// // //                       </th>
// // //                       <th className="px-4 py-3 text-left text-m font-semibold">
// // //                         Available Rooms
// // //                       </th>
// // //                     </>
// // //                   )}
// // //                   {activeTab !== "AVAILABLE" && (
// // //                     <>
// // //                       <th className="px-4 py-3 text-left text-m font-semibold">
// // //                         Check-In
// // //                       </th>
// // //                       <th className="px-4 py-3 text-left text-m font-semibold">
// // //                         Check-Out
// // //                       </th>
// // //                     </>
// // //                   )}
// // //                   <th className="px-4 py-3 text-left text-m font-semibold">
// // //                     Status
// // //                   </th>
// // //                   <th className="px-4 py-3 text-left text-m font-semibold">
// // //                     View
// // //                   </th>
// // //                 </tr>
// // //               </thead>

// // //               <tbody className="bg-white divide-y divide-[#9CA3AF]">
// // //                 {loading ? (
// // //                   <tr>
// // //                     <td
// // //                       colSpan={8}
// // //                       className="px-4 py-6 text-center text-gray-400"
// // //                     >
// // //                       Loading...
// // //                     </td>
// // //                   </tr>
// // //                 ) : filteredData.length > 0 ? (
// // //                   filteredData.map((booking) => (
// // //                     <tr
// // //                       key={booking.id}
// // //                       className="hover:bg-green-50 transition-colors"
// // //                     >
// // //                       {activeTab !== "AVAILABLE" && (
// // //                         <td className="px-4 py-3 text-gray-600">
// // //                           {booking.bookingNo}
// // //                         </td>
// // //                       )}
// // //                       <td className="px-4 py-3 text-gray-600">
// // //                         {booking.type}
// // //                       </td>

// // //                       {activeTab === "AVAILABLE" && (
// // //                         <>
// // //                           <td className="px-4 py-3 text-gray-600">
// // //                             {booking.total}
// // //                           </td>
// // //                           <td className="px-4 py-3 text-gray-600">
// // //                             {booking.booked}
// // //                           </td>
// // //                           <td className="px-4 py-3 text-gray-600">
// // //                             {booking.available}
// // //                           </td>
// // //                         </>
// // //                       )}

// // //                       {activeTab !== "AVAILABLE" && (
// // //                         <>
// // //                           <td className="px-4 py-3 text-gray-600">
// // //                             {formatDate(booking.checkIn)}
// // //                           </td>
// // //                           <td className="px-4 py-3 text-gray-600">
// // //                             {formatDate(booking.checkOut)}
// // //                           </td>
// // //                         </>
// // //                       )}

// // //                       <td
// // //                         className={`px-4 py-3 ${
// // //                           booking.status === "AVAILABLE"
// // //                             ? "text-[#009519]"
// // //                             : booking.status === "BOOKED"
// // //                             ? "text-blue-700"
// // //                             : "text-[#009519]"
// // //                         }`}
// // //                       >
// // //                         {booking.status}
// // //                       </td>

// // //                       <td className="px-4 py-3">
// // //                         {activeTab === "AVAILABLE" ? (
// // //                           <button
// // //                             className="bg-[#006600] text-white px-4 py-1 hover:bg-green-800 transition"
// // //                             onClick={() =>
// // //                               navigate("/booking-details", {
// // //                                 state: { booking, activeTab },
// // //                               })
// // //                             }
// // //                           >
// // //                             BOOK
// // //                           </button>
// // //                         ) : (
// // //                           <button
// // //                             className="text-green-700 font-small hover:underline"
// // //                             // onClick={() =>
// // //                             //   navigate(`/booking-details/${booking.id}`, {
// // //                             //     state: { booking, activeTab },
// // //                             //   })
// // //                             // }
// // //                             onClick={() =>
// // //                         navigate(`/booking-details/${booking.id}`, {
// // //                           state: { activeTab },
// // //                         })
// // //                       }

// // //                           >
// // //                             VIEW
// // //                           </button>
// // //                         )}
// // //                       </td>
// // //                     </tr>
// // //                   ))
// // //                 ) : (
// // //                   <tr>
// // //                     <td
// // //                       colSpan={8}
// // //                       className="px-4 py-6 text-center text-gray-400"
// // //                     >
// // //                       No records found for selected date
// // //                     </td>
// // //                   </tr>
// // //                 )}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Booking;
// // // src/Pages/Booking.jsx
// // import React, { useState, useEffect } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import Sidebar from "../Components/Sidebar";
// // import Header from "../Components/Header";
// // import { Search, Calendar } from "lucide-react";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";

// // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// // const Booking = () => {
// //   const tabs = ["AVAILABLE", "BOOKED", "CHECKED IN"];
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const initialTab = location.state?.activeTab || "AVAILABLE";
// //   const [activeTab, setActiveTab] = useState(initialTab);
// //   const [searchBooking, setSearchBooking] = useState("");
// //   const [selectedDate, setSelectedDate] = useState(new Date());
// //   const [showDatePicker, setShowDatePicker] = useState(false);
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const formatDate = (date) => {
// //     if (!date) return "-";
// //     return new Date(date).toLocaleDateString("en-GB", {
// //       day: "2-digit",
// //       month: "short",
// //       year: "numeric",
// //     });
// //   };

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true);
// //       try {
// //         let response, json;

// //         if (activeTab === "AVAILABLE") {
// //           const dateStr = selectedDate.toISOString().split("T")[0];
// //           response = await fetch(`${API_URL}/rooms/available?date=${dateStr}`, {
// //             credentials: "include",
// //           });
// //           json = await response.json();

// //           const availableRooms = json.availableRooms || [];
// //           const formatted = availableRooms.map((r, i) => ({
// //             id: i + 1,
// //             type: r.roomType,
// //             total: r.totalRooms,
// //             booked: r.bookedRooms,
// //             available: r.availableRooms,
// //             status: "AVAILABLE",
// //           }));
// //           setData(formatted);

// //         } else if (activeTab === "BOOKED") {
// //           response = await fetch(`${API_URL}/bookings/confirmed`, {
// //             credentials: "include",
// //           });
// //           json = await response.json();

// //           const booked = json.bookings || [];
// //           const formatted = booked.map((b, i) => ({
// //             id: b._id,
// //             bookingNo: b.bookingNumber,
// //             type: b.rooms?.[0]?.roomType || "N/A",
// //             firstName: b.firstName,
// //             lastName: b.lastName,
// //             email: b.email,
// //             checkIn: b.checkIn,
// //             checkOut: b.checkOut,
// //             status: b.status?.toUpperCase() || "BOOKED",
// //           }));

// //           setData(formatted);

// //         } else if (activeTab === "CHECKED IN") {
// //           response = await fetch(`${API_URL}/bookings/checked-in`, {
// //             credentials: "include",
// //           });
// //           json = await response.json();

// //           const checked = json.bookings || [];
// //           const formatted = checked.map((b, i) => ({
// //             id: b._id,
// //             bookingNo: b.bookingNumber,
// //             type: b.rooms?.[0]?.roomType || "N/A",
// //             firstName: b.firstName,
// //             lastName: b.lastName,
// //             email: b.email,
// //             checkIn: b.checkIn,
// //             checkOut: b.checkOut,
// //             status: b.status?.toUpperCase() || "CHECKED IN",
// //           }));

// //           setData(formatted);
// //         }
// //       } catch (err) {
// //         console.error("❌ Fetch error:", err);
// //         setData([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [activeTab]); // ✅ FIXED: removed selectedDate to stop filtering booked list by date

// //   const filteredData =
// //     activeTab === "AVAILABLE"
// //       ? data
// //       : data.filter((b) =>
// //           b.bookingNo?.toLowerCase().includes(searchBooking.toLowerCase())
// //         );

// //   return (
// //     <div className="flex min-h-screen">
// //       <Sidebar />
// //       <div className="flex-1 flex flex-col relative">
// //         <Header />

// //         <main className="flex-1 overflow-y-auto bg-gray-50 px-2 relative">
// //           <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking</h2>

// //           {/* Tabs + Search/DatePicker */}
// //           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
// //             <div className="flex border shadow-sm bg-white">
// //               {tabs.map((tab) => (
// //                 <button
// //                   key={tab}
// //                   className={`px-6 py-2 font-small transition-colors duration-200 ${
// //                     activeTab === tab
// //                       ? "bg-[#006600] text-white shadow"
// //                       : "bg-white text-gray-700 hover:bg-green-100"
// //                   }`}
// //                   onClick={() => {
// //                     setActiveTab(tab);
// //                     setSearchBooking("");
// //                   }}
// //                 >
// //                   {tab}
// //                 </button>
// //               ))}
// //             </div>

// //             {activeTab !== "AVAILABLE" ? (
// //               <div className="relative w-full sm:w-64">
// //                 <Search
// //                   size={18}
// //                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
// //                 />
// //                 <input
// //                   type="text"
// //                   placeholder="Search Booking No"
// //                   value={searchBooking}
// //                   onChange={(e) => setSearchBooking(e.target.value)}
// //                   className="w-full pl-9 pr-3 h-11 border border-gray-300 focus:border-[#006600] focus:ring-2 focus:ring-[#006600]/40 outline-none shadow-sm transition-all"
// //                 />
// //               </div>
// //             ) : (
// //               <div className="relative w-full sm:w-64">
// //                 <button
// //                   onClick={() => setShowDatePicker(!showDatePicker)}
// //                   className="flex items-center justify-between w-full h-11 px-4 border border-gray-300 bg-white shadow-sm hover:bg-green-50 transition-all"
// //                 >
// //                   <span className="text-gray-700">
// //                     {selectedDate.toLocaleDateString("en-GB")}
// //                   </span>
// //                   <Calendar className="text-gray-500" size={18} />
// //                 </button>

// //                 {showDatePicker && (
// //                   <div className="absolute top-12 right-0 bg-white border shadow-lg z-50">
// //                     <DatePicker
// //                       selected={selectedDate}
// //                       onChange={(date) => {
// //                         setSelectedDate(date);
// //                         setShowDatePicker(false);
// //                       }}
// //                       inline
// //                       minDate={new Date()}
// //                     />
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           {/* Table */}
// //           <div className="overflow-x-auto bg-white border border-[#9CA3AF] shadow relative z-0">
// //             <table className="min-w-full divide-y divide-[#9CA3AF]">
// //               <thead className="bg-green-700 text-black">
// //                 <tr>
// //                   {activeTab !== "AVAILABLE" && (
// //                     <th className="px-4 py-3 text-left text-m font-semibold">
// //                       Booking No
// //                     </th>
// //                   )}
// //                   <th className="px-4 py-3 text-left text-m font-semibold">
// //                     Room Type
// //                   </th>

// //                   {activeTab === "AVAILABLE" && (
// //                     <>
// //                       <th className="px-4 py-3 text-left text-m font-semibold">
// //                         Total Rooms
// //                       </th>
// //                       <th className="px-4 py-3 text-left text-m font-semibold">
// //                         Booked Rooms
// //                       </th>
// //                       <th className="px-4 py-3 text-left text-m font-semibold">
// //                         Available Rooms
// //                       </th>
// //                     </>
// //                   )}

// //                   {activeTab !== "AVAILABLE" && (
// //                     <>
// //                       <th className="px-4 py-3 text-left text-m font-semibold">
// //                         Check-In
// //                       </th>
// //                       <th className="px-4 py-3 text-left text-m font-semibold">
// //                         Check-Out
// //                       </th>
// //                     </>
// //                   )}

// //                   <th className="px-4 py-3 text-left text-m font-semibold">
// //                     Status
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-m font-semibold">
// //                     View
// //                   </th>
// //                 </tr>
// //               </thead>

// //               <tbody className="bg-white divide-y divide-[#9CA3AF]">
// //                 {loading ? (
// //                   <tr>
// //                     <td
// //                       colSpan={8}
// //                       className="px-4 py-6 text-center text-gray-400"
// //                     >
// //                       Loading...
// //                     </td>
// //                   </tr>
// //                 ) : filteredData.length > 0 ? (
// //                   filteredData.map((booking) => (
// //                     <tr
// //                       key={booking.id}
// //                       className="hover:bg-green-50 transition-colors"
// //                     >
// //                       {activeTab !== "AVAILABLE" && (
// //                         <td className="px-4 py-3 text-gray-600">
// //                           {booking.bookingNo}
// //                         </td>
// //                       )}

// //                       <td className="px-4 py-3 text-gray-600">
// //                         {booking.type}
// //                       </td>

// //                       {activeTab === "AVAILABLE" && (
// //                         <>
// //                           <td className="px-4 py-3 text-gray-600">
// //                             {booking.total}
// //                           </td>
// //                           <td className="px-4 py-3 text-gray-600">
// //                             {booking.booked}
// //                           </td>
// //                           <td className="px-4 py-3 text-gray-600">
// //                             {booking.available}
// //                           </td>
// //                         </>
// //                       )}

// //                       {activeTab !== "AVAILABLE" && (
// //                         <>
// //                           <td className="px-4 py-3 text-gray-600">
// //                             {formatDate(booking.checkIn)}
// //                           </td>
// //                           <td className="px-4 py-3 text-gray-600">
// //                             {formatDate(booking.checkOut)}
// //                           </td>
// //                         </>
// //                       )}

// //                       <td
// //                         className={`px-4 py-3 ${
// //                           booking.status === "AVAILABLE"
// //                             ? "text-[#009519]"
// //                             : booking.status === "BOOKED"
// //                             ? "text-blue-700"
// //                             : "text-[#009519]"
// //                         }`}
// //                       >
// //                         {booking.status}
// //                       </td>

// //                       <td className="px-4 py-3">
// //                         {activeTab === "AVAILABLE" ? (
// //                           <button
// //                             className="bg-[#006600] text-white px-4 py-1 hover:bg-green-800 transition"
// //                             onClick={() =>
// //                               navigate("/booking-details", {
// //                                 state: { booking, activeTab },
// //                               })
// //                             }
// //                           >
// //                             BOOK
// //                           </button>
// //                         ) : (
// //                           <button
// //                             className="text-green-700 font-small hover:underline"
// //                             onClick={() =>
// //                               navigate(`/booking-details/${booking.id}`, {
// //                                 state: { activeTab },
// //                               })
// //                             }
// //                           >
// //                             VIEW
// //                           </button>
// //                         )}
// //                       </td>
// //                     </tr>
// //                   ))
// //                 ) : (
// //                   <tr>
// //                     <td
// //                       colSpan={8}
// //                       className="px-4 py-6 text-center text-gray-400"
// //                     >
// //                       No records found
// //                     </td>
// //                   </tr>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Booking;
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Sidebar from "../Components/Sidebar";
// import Header from "../Components/Header";
// import { Search, Calendar } from "lucide-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// const Booking = () => {
//   const tabs = ["AVAILABLE", "BOOKED", "CHECKED IN"];
//   const navigate = useNavigate();
//   const location = useLocation();

//   const initialTab = location.state?.activeTab || "AVAILABLE";
//   const [activeTab, setActiveTab] = useState(initialTab);
//   const [searchBooking, setSearchBooking] = useState("");
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const formatDate = (date) => {
//     if (!date) return "-";
//     return new Date(date).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // ✅ FETCH DATA DEPENDING ON TAB + DATE
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         let response, json;

//         // --------------------------- AVAILABLE ROOMS -----------------------------
//         if (activeTab === "AVAILABLE") {
//           const dateStr = selectedDate.toISOString().split("T")[0];

//           response = await fetch(`${API_URL}/rooms/available?date=${dateStr}`, {
//             credentials: "include",
//           });

//           json = await response.json();

//           const availableRooms = json.availableRooms || [];

//           const formatted = availableRooms.map((r, i) => ({
//             id: i + 1,
//             type: r.roomType,
//             total: r.totalRooms,
//             booked: r.bookedRooms,
//             available: r.availableRooms,
//             status: "AVAILABLE",
//           }));

//           setData(formatted);

//           // --------------------------- BOOKED BOOKINGS -----------------------------
//         } else if (activeTab === "BOOKED") {
//           response = await fetch(`${API_URL}/bookings/confirmed`, {
//             credentials: "include",
//           });
//           json = await response.json();

//           const booked = json.bookings || [];

//           const formatted = booked.map((b) => ({
//             id: b._id,
//             bookingNo: b.bookingNumber,
//             type: b.rooms?.[0]?.roomType || "N/A",
//             firstName: b.firstName,
//             lastName: b.lastName,
//             email: b.email,
//             checkIn: b.checkIn,
//             checkOut: b.checkOut,
//             status: b.status?.toUpperCase() || "BOOKED",
//           }));

//           setData(formatted);

//           // --------------------------- CHECKED IN BOOKINGS -----------------------------
//         } else if (activeTab === "CHECKED IN") {
//           response = await fetch(`${API_URL}/bookings/checked-in`, {
//             credentials: "include",
//           });
//           json = await response.json();

//           const checked = json.bookings || [];

//           const formatted = checked.map((b) => ({
//             id: b._id,
//             bookingNo: b.bookingNumber,
//             type: b.rooms?.[0]?.roomType || "N/A",
//             firstName: b.firstName,
//             lastName: b.lastName,
//             email: b.email,
//             checkIn: b.checkIn,
//             checkOut: b.checkOut,
//             status: b.status?.toUpperCase() || "CHECKED IN",
//           }));

//           setData(formatted);
//         }
//       } catch (err) {
//         console.error("❌ Fetch error:", err);
//         setData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [activeTab, selectedDate]); // ✅ selectedDate added so AVAILABLE updates instantly

//   const filteredData =
//     activeTab === "AVAILABLE"
//       ? data
//       : data.filter((b) =>
//           b.bookingNo?.toLowerCase().includes(searchBooking.toLowerCase())
//         );

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <div className="flex-1 flex flex-col relative">
//         <Header />

//         <main className="flex-1 overflow-y-auto bg-gray-50 px-2 relative">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking</h2>

//           {/* Tabs + Search/DatePicker */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//             <div className="flex border shadow-sm bg-white">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab}
//                   className={`px-6 py-2 font-small transition-colors duration-200 ${
//                     activeTab === tab
//                       ? "bg-[#006600] text-white shadow"
//                       : "bg-white text-gray-700 hover:bg-green-100"
//                   }`}
//                   onClick={() => {
//                     setActiveTab(tab);
//                     setSearchBooking("");
//                   }}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             {/* Search for BOOKED / CHECKED-IN */}
//             {activeTab !== "AVAILABLE" ? (
//               <div className="relative w-full sm:w-64">
//                 <Search
//                   size={18}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search Booking No"
//                   value={searchBooking}
//                   onChange={(e) => setSearchBooking(e.target.value)}
//                   className="w-full pl-9 pr-3 h-11 border border-gray-300 focus:border-[#006600] focus:ring-2 focus:ring-[#006600]/40 outline-none shadow-sm transition-all"
//                 />
//               </div>
//             ) : (
//               // Date Picker for AVAILABLE
//               <div className="relative w-full sm:w-64">
//                 <button
//                   onClick={() => setShowDatePicker(!showDatePicker)}
//                   className="flex items-center justify-between w-full h-11 px-4 border border-gray-300 bg-white shadow-sm hover:bg-green-50 transition-all"
//                 >
//                   <span className="text-gray-700">
//                     {selectedDate.toLocaleDateString("en-GB")}
//                   </span>
//                   <Calendar className="text-gray-500" size={18} />
//                 </button>

//                 {showDatePicker && (
//                   <div className="absolute top-12 right-0 bg-white border shadow-lg z-50">
//                     <DatePicker
//                       selected={selectedDate}
//                       onChange={(date) => {
//                         setSelectedDate(date);
//                         setShowDatePicker(false);
//                       }}
//                       inline
//                       minDate={new Date()}
//                     />
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto bg-white border border-[#9CA3AF] shadow relative z-0">
//             <table className="min-w-full divide-y divide-[#9CA3AF]">
//               <thead className="bg-green-700 text-black">
//                 <tr>
//                   {activeTab !== "AVAILABLE" && (
//                     <th className="px-4 py-3 text-left text-m font-semibold">
//                       Booking No
//                     </th>
//                   )}
//                   <th className="px-4 py-3 text-left text-m font-semibold">
//                     Room Type
//                   </th>

//                   {activeTab === "AVAILABLE" && (
//                     <>
//                       <th className="px-4 py-3 text-left text-m font-semibold">
//                         Total Rooms
//                       </th>
//                       <th className="px-4 py-3 text-left text-m font-semibold">
//                         Booked Rooms
//                       </th>
//                       <th className="px-4 py-3 text-left text-m font-semibold">
//                         Available Rooms
//                       </th>
//                     </>
//                   )}

//                   {activeTab !== "AVAILABLE" && (
//                     <>
//                       <th className="px-4 py-3 text-left text-m font-semibold">
//                         Check-In
//                       </th>
//                       <th className="px-4 py-3 text-left text-m font-semibold">
//                         Check-Out
//                       </th>
//                     </>
//                   )}

//                   <th className="px-4 py-3 text-left text-m font-semibold">
//                     Status
//                   </th>
//                   <th className="px-4 py-3 text-left text-m font-semibold">
//                     View
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="bg-white divide-y divide-[#9CA3AF]">
//                 {loading ? (
//                   <tr>
//                     <td colSpan={8} className="px-4 py-6 text-center text-gray-400">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : filteredData.length > 0 ? (
//                   filteredData.map((booking) => (
//                     <tr key={booking.id} className="hover:bg-green-50 transition-colors">
//                       {activeTab !== "AVAILABLE" && (
//                         <td className="px-4 py-3 text-gray-600">{booking.bookingNo}</td>
//                       )}

//                       <td className="px-4 py-3 text-gray-600">{booking.type}</td>

//                       {activeTab === "AVAILABLE" && (
//                         <>
//                           <td className="px-4 py-3 text-gray-600">{booking.total}</td>
//                           <td className="px-4 py-3 text-gray-600">{booking.booked}</td>
//                           <td className="px-4 py-3 text-gray-600">{booking.available}</td>
//                         </>
//                       )}

//                       {activeTab !== "AVAILABLE" && (
//                         <>
//                           <td className="px-4 py-3 text-gray-600">
//                             {formatDate(booking.checkIn)}
//                           </td>
//                           <td className="px-4 py-3 text-gray-600">
//                             {formatDate(booking.checkOut)}
//                           </td>
//                         </>
//                       )}

//                       <td
//                         className={`px-4 py-3 ${
//                           booking.status === "AVAILABLE"
//                             ? "text-[#009519]"
//                             : booking.status === "BOOKED"
//                             ? "text-blue-700"
//                             : "text-[#009519]"
//                         }`}
//                       >
//                         {booking.status}
//                       </td>

//                       <td className="px-4 py-3">
//                         {activeTab === "AVAILABLE" ? (
//                           <button
//                             className="bg-[#006600] text-white px-4 py-1 hover:bg-green-800 transition"
//                             onClick={() =>
//                               navigate("/booking-details", {
//                                 state: { booking, activeTab },
//                               })
//                             }
//                           >
//                             BOOK
//                           </button>
//                         ) : (
//                           <button
//                             className="text-green-700 font-small hover:underline"
//                             onClick={() =>
//                               navigate(`/booking-details/${booking.id}`, {
//                                 state: { activeTab },
//                               })
//                             }
//                           >
//                             VIEW
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={8} className="px-4 py-6 text-center text-gray-400">
//                       No records found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Booking;
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Search, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Booking = () => {
  const tabs = ["AVAILABLE", "BOOKED", "CHECKED IN"];
  const navigate = useNavigate();
  const location = useLocation();

  const initialTab = location.state?.activeTab || "AVAILABLE";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchBooking, setSearchBooking] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response, json;

        if (activeTab === "AVAILABLE") {
          const dateStr = selectedDate.toISOString().split("T")[0];

          response = await fetch(`${API_URL}/rooms/available?date=${dateStr}`, {
            credentials: "include",
          });

          json = await response.json();
          const availableRooms = json.availableRooms || [];

          const formatted = availableRooms.map((r, i) => ({
            id: i + 1,
            type: r.roomType,
            total: r.totalRooms,
            booked: r.bookedRooms,
            available: r.availableRooms,
            status: "AVAILABLE",
          }));

          setData(formatted);
        }

        else if (activeTab === "BOOKED") {
          response = await fetch(`${API_URL}/bookings/confirmed-guaranteed-bookings`, {
            credentials: "include",
          });

          json = await response.json();
          const booked = json.bookings || [];

          const formatted = booked.map((b) => ({
            id: b._id,
            bookingNo: b.bookingNumber,
            type: b.rooms?.[0]?.roomType || "N/A",
            firstName: b.firstName,
            lastName: b.lastName,
            email: b.email,
            checkIn: b.checkIn,
            checkOut: b.checkOut,
            status: b.status?.toUpperCase() || "BOOKED",
          }));

          setData(formatted);
        }

        else if (activeTab === "CHECKED IN") {
          response = await fetch(`${API_URL}/bookings/checked-in`, {
            credentials: "include",
          });

          json = await response.json();
          const checked = json.bookings || [];

          const formatted = checked.map((b) => ({
            id: b._id,
            bookingNo: b.bookingNumber,
            type: b.rooms?.[0]?.roomType || "N/A",
            firstName: b.firstName,
            lastName: b.lastName,
            email: b.email,
            checkIn: b.checkIn,
            checkOut: b.checkOut,
            status: b.status?.toUpperCase() || "CHECKED IN",
          }));

          setData(formatted);
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, selectedDate]);

  const filteredData =
    activeTab === "AVAILABLE"
      ? data
      : data.filter((b) =>
          b.bookingNo?.toLowerCase().includes(searchBooking.toLowerCase())
        );

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
                  className="w-full pl-9 pr-3 h-11 border border-gray-300 focus:border-[#006600] focus:ring-2 focus:ring-[#006600]/40 outline-none shadow-sm transition-all"
                />
              </div>
            ) : (
              <div className="relative w-full sm:w-64">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center justify-between w-full h-11 px-4 border border-gray-300 bg-white shadow-sm hover:bg-green-50 transition-all"
                >
                  <span className="text-gray-700">
                    {selectedDate.toLocaleDateString("en-GB")}
                  </span>
                  <Calendar className="text-gray-500" size={18} />
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

          <div className="overflow-x-auto bg-white border border-[#9CA3AF] shadow relative z-0">
            <table className="min-w-full divide-y divide-[#9CA3AF]">
              <thead className="bg-green-700 text-black">
                <tr>
                  {activeTab !== "AVAILABLE" && (
                    <th className="px-4 py-3 text-left text-m font-semibold">
                      Booking No
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-m font-semibold">
                    Room Type
                  </th>

                  {activeTab === "AVAILABLE" && (
                    <>
                      <th className="px-4 py-3 text-left text-m font-semibold">
                        Total Rooms
                      </th>
                      <th className="px-4 py-3 text-left text-m font-semibold">
                        Booked Rooms
                      </th>
                      <th className="px-4 py-3 text-left text-m font-semibold">
                        Available Rooms
                      </th>
                    </>
                  )}

                  {activeTab !== "AVAILABLE" && (
                    <>
                      <th className="px-4 py-3 text-left text-m font-semibold">
                        Check-In
                      </th>
                      <th className="px-4 py-3 text-left text-m font-semibold">
                        Check-Out
                      </th>
                    </>
                  )}

                  <th className="px-4 py-3 text-left text-m font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-m font-semibold">
                    View
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-[#9CA3AF]">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-6 text-center text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((booking) => (
                    <tr key={booking.id} className="hover:bg-green-50 transition-colors">
                      {activeTab !== "AVAILABLE" && (
                        <td className="px-4 py-3 text-gray-600">{booking.bookingNo}</td>
                      )}

                      <td className="px-4 py-3 text-gray-600">{booking.type}</td>

                      {activeTab === "AVAILABLE" && (
                        <>
                          <td className="px-4 py-3 text-gray-600">{booking.total}</td>
                          <td className="px-4 py-3 text-gray-600">{booking.booked}</td>
                          <td className="px-4 py-3 text-gray-600">{booking.available}</td>
                        </>
                      )}

                      {activeTab !== "AVAILABLE" && (
                        <>
                          <td className="px-4 py-3 text-gray-600">
                            {formatDate(booking.checkIn)}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {formatDate(booking.checkOut)}
                          </td>
                        </>
                      )}

                      <td
                        className={`px-4 py-3 ${
                          booking.status === "AVAILABLE"
                            ? "text-[#009519]"
                            : booking.status === "BOOKED"
                            ? "text-blue-700"
                            : "text-[#009519]"
                        }`}
                      >
                        {booking.status}
                      </td>

                      <td className="px-4 py-3">
                        {activeTab === "AVAILABLE" ? (
                          // <button
                          //   className="bg-[#006600] text-white px-4 py-1 hover:bg-green-800 transition"
                          //   onClick={() =>
                          //     navigate("/booking-details", {
                          //       state: {
                          //         booking,
                          //         activeTab,
                          //         roomType: booking.type,       // ✅ FIX ADDED
                          //         selectedDate: selectedDate,  // ✅ FIX ADDED
                          //       },
                          //     })
                          //   }
                          // >
                          //   BOOK
                          // </button>
                          <button
  className="bg-[#006600] text-white px-4 py-1 hover:bg-green-800 transition"
  onClick={() =>
    navigate("/booking-details", {
      state: {
        booking: {
          roomType: booking.type,    // ✔ correct place
          checkIn: selectedDate,     // ✔ pass check-in date
          status: "AVAILABLE"        // ✔ needed for logic
        },
        activeTab,
        selectedDate
      }
    })
  }
>
  BOOK
</button>

                        ) : (
                          <button
                            className="text-green-700 font-small hover:underline"
                            onClick={() =>
                              navigate(`/booking-details/${booking.id}`, {
                                state: {
                                  activeTab,
                                },
                              })
                            }
                          >
                            VIEW
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-6 text-center text-gray-400">
                      No records found
                    </td>
                  </tr>
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
 