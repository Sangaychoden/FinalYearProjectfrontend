
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
// // //         let response, json;

// // //         if (activeTab === "AVAILABLE") {
// // //           const dateStr = selectedDate.toISOString().split("T")[0];

// // //           response = await fetch(`${API_URL}/rooms/available?date=${dateStr}`, {
// // //             credentials: "include",
// // //           });

// // //           json = await response.json();
// // //           const availableRooms = json.availableRooms || [];

// // //           const formatted = availableRooms.map((r, i) => ({
// // //             id: i + 1,
// // //             type: r.roomType,
// // //             total: r.totalRooms,
// // //             booked: r.bookedRooms,
// // //             available: r.availableRooms,
// // //             status: "AVAILABLE",
// // //           }));

// // //           setData(formatted);
// // //         }

// // //         else if (activeTab === "BOOKED") {
// // //           response = await fetch(`${API_URL}/bookings/confirmed-guaranteed-bookings`, {
// // //             credentials: "include",
// // //           });

// // //           json = await response.json();
// // //           const booked = json.bookings || [];

// // //           const formatted = booked.map((b) => ({
// // //             id: b._id,
// // //             bookingNo: b.bookingNumber,
// // //             type: b.rooms?.[0]?.roomType || "N/A",
// // //             firstName: b.firstName,
// // //             lastName: b.lastName,
// // //             email: b.email,
// // //             checkIn: b.checkIn,
// // //             checkOut: b.checkOut,
// // //             status: b.status?.toUpperCase() || "BOOKED",
// // //           }));

// // //           setData(formatted);
// // //         }

// // //         else if (activeTab === "CHECKED IN") {
// // //           response = await fetch(`${API_URL}/bookings/checked-in`, {
// // //             credentials: "include",
// // //           });

// // //           json = await response.json();
// // //           const checked = json.bookings || [];

// // //           const formatted = checked.map((b) => ({
// // //             id: b._id,
// // //             bookingNo: b.bookingNumber,
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
// // //                     <td colSpan={8} className="px-4 py-6 text-center text-gray-400">
// // //                       Loading...
// // //                     </td>
// // //                   </tr>
// // //                 ) : filteredData.length > 0 ? (
// // //                   filteredData.map((booking) => (
// // //                     <tr key={booking.id} className="hover:bg-green-50 transition-colors">
// // //                       {activeTab !== "AVAILABLE" && (
// // //                         <td className="px-4 py-3 text-gray-600">{booking.bookingNo}</td>
// // //                       )}

// // //                       <td className="px-4 py-3 text-gray-600">{booking.type}</td>

// // //                       {activeTab === "AVAILABLE" && (
// // //                         <>
// // //                           <td className="px-4 py-3 text-gray-600">{booking.total}</td>
// // //                           <td className="px-4 py-3 text-gray-600">{booking.booked}</td>
// // //                           <td className="px-4 py-3 text-gray-600">{booking.available}</td>
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
// // //                           // <button
// // //                           //   className="bg-[#006600] text-white px-4 py-1 hover:bg-green-800 transition"
// // //                           //   onClick={() =>
// // //                           //     navigate("/booking-details", {
// // //                           //       state: {
// // //                           //         booking,
// // //                           //         activeTab,
// // //                           //         roomType: booking.type,       // ✅ FIX ADDED
// // //                           //         selectedDate: selectedDate,  // ✅ FIX ADDED
// // //                           //       },
// // //                           //     })
// // //                           //   }
// // //                           // >
// // //                           //   BOOK
// // //                           // </button>
// // //                           <button
// // //   className="bg-[#006600] text-white px-4 py-1 hover:bg-green-800 transition"
// // //   onClick={() =>
// // //     navigate("/booking-details", {
// // //       state: {
// // //         booking: {
// // //           roomType: booking.type,    // ✔ correct place
// // //           checkIn: selectedDate,     // ✔ pass check-in date
// // //           status: "AVAILABLE"        // ✔ needed for logic
// // //         },
// // //         activeTab,
// // //         selectedDate
// // //       }
// // //     })
// // //   }
// // // >
// // //   BOOK
// // // </button>

// // //                         ) : (
// // //                           <button
// // //                             className="text-green-700 font-small hover:underline"
// // //                             onClick={() =>
// // //                               navigate(`/booking-details/${booking.id}`, {
// // //                                 state: {
// // //                                   activeTab,
// // //                                 },
// // //                               })
// // //                             }
// // //                           >
// // //                             VIEW
// // //                           </button>
// // //                         )}
// // //                       </td>
// // //                     </tr>
// // //                   ))
// // //                 ) : (
// // //                   <tr>
// // //                     <td colSpan={8} className="px-4 py-6 text-center text-gray-400">
// // //                       No records found
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
 
// // import React, { useState, useEffect } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import Sidebar from "../Components/Sidebar";
// // import Header from "../Components/Header";
// // import { Search, Calendar, Eye } from "lucide-react";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";

// // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// // const Booking = () => {
// //   const tabs = ["AVAILABLE", "PENDING", "BOOKED", "CHECKED IN", "CANCELLED"];
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const initialTab = location.state?.activeTab || "AVAILABLE";
// //   const [activeTab, setActiveTab] = useState(initialTab);
// //   const [searchBooking, setSearchBooking] = useState("");
// //   const [selectedDate, setSelectedDate] = useState(new Date());
// //   const [showDatePicker, setShowDatePicker] = useState(false);
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     fetchData();
// //   }, [activeTab, selectedDate]);

// //   const fetchData = async () => {
// //     try {
// //       setLoading(true);
// //       let url = "";

// //       if (activeTab === "AVAILABLE") {
// //         const formattedDate = selectedDate.toISOString().split("T")[0];
// //         url = `${API_URL}/rooms/available?date=${formattedDate}`;
// //       } else if (activeTab === "PENDING") {
// //         url = `${API_URL}/bookings/pending`;
// //       } else if (activeTab === "BOOKED") {
// //         url = `${API_URL}/bookings/confirmed-guaranteed-bookings`;
// //       } else if (activeTab === "CHECKED IN") {
// //         url = `${API_URL}/bookings/checked-in`;
// //       } else if (activeTab === "CANCELLED") {
// //         url = `${API_URL}/bookings/cancelled/all`;
// //       }

// //       const token = localStorage.getItem("authToken");

// //       const response = await fetch(url, {
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: token ? `Bearer ${token}` : "",
// //         },
// //         credentials: "include",
// //       });

// //       const data = await response.json();
// //       if (!response.ok) throw new Error(data.message || "Failed to fetch data");

// //       if (activeTab === "AVAILABLE") {
// //         setData(data.availableRooms || []);
// //       } else {
// //         setData(data.bookings || []);
// //       }
// //     } catch (err) {
// //       console.error("❌ Error fetching data:", err);
// //       setData([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filteredData =
// //     activeTab === "AVAILABLE"
// //       ? data
// //       : data.filter((b) =>
// //           b.bookingNumber?.toLowerCase().includes(searchBooking.toLowerCase())
// //         );

// //   const formatDate = (date) => {
// //     return new Date(date)
// //       .toLocaleDateString("en-GB", {
// //         day: "2-digit",
// //         month: "short",
// //         year: "numeric",
// //       })
// //       .replace(",", "");
// //   };

// //   return (
// //     <div className="flex min-h-screen">
// //       <Sidebar />
// //       <div className="flex-1 flex flex-col relative">
// //         <Header />

// //         <main className="flex-1 overflow-y-auto bg-gray-50 px-2 relative">
// //           <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking</h2>
// //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
// //               <div className="flex border shadow-sm bg-white">
// //                 {tabs.map((tab) => (
// //                   <button
// //                     key={tab}
// //                     className={`px-6 py-2 text-sm transition-colors duration-200 ${
// //                       activeTab === tab
// //                         ? "bg-[#006600] text-white shadow"
// //                         : "bg-white text-gray-700 hover:bg-green-100"
// //                     }`}
// //                     onClick={() => {
// //                       setActiveTab(tab);
// //                       setSearchBooking("");
// //                     }}
// //                   >
// //                     {tab}
// //                   </button>
// //                 ))}
// //               </div>


// //             {/* SEARCH OR DATE PICKER */}
// //             {activeTab !== "AVAILABLE" ? (
// //               <div className="relative w-full sm:w-64">
// //                 <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
// //                 <input
// //                   type="text"
// //                   placeholder="Search Booking No"
// //                   value={searchBooking}
// //                   onChange={(e) => setSearchBooking(e.target.value)}
// //                   className="w-full pl-9 pr-3 h-11 border border-gray-300 focus:border-[#006600] focus:ring-2 focus:ring-[#006600]/40 outline-none shadow-sm"
// //                 />
// //               </div>
// //             ) : (
// //               <div className="relative w-full sm:w-64">
// //                 <button
// //                   onClick={() => setShowDatePicker(!showDatePicker)}
// //                   className="flex items-center justify-between w-full h-11 px-4 border border-gray-300 bg-white shadow-sm hover:bg-green-50"
// //                 >
// //                   <span className="text-gray-700">{formatDate(selectedDate)}</span>
// //                   <Calendar size={18} className="text-gray-500" />
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

// //           {/* TABLE */}
// //           <div className="overflow-x-auto bg-white border border-gray-300 shadow">
// //             <table className="min-w-full divide-y divide-gray-300">
// //               <thead className="bg-green-700 text-black">
// //                 <tr>
// //                   {activeTab !== "AVAILABLE" && (
// //                     <th className="px-4 py-3 text-left font-semibold">
// //                       Booking No
// //                     </th>
// //                   )}
// //                   <th className="px-4 py-3 text-left font-semibold">Room Type</th>

// //                   {activeTab === "AVAILABLE" ? (
// //                     <>
// //                       <th className="px-4 py-3">Total</th>
// //                       <th className="px-4 py-3">Booked</th>
// //                       <th className="px-4 py-3">Available</th>
// //                       <th className="px-4 py-3">Status</th>
// //                     </>
// //                   ) : (
// //                     <>
// //                       <th className="px-4 py-3">Check-In</th>
// //                       <th className="px-4 py-3">Check-Out</th>
// //                       <th className="px-4 py-3">Status</th>

// //                       {/* ⭐ View button now added for CHECKED IN too */}
// //                       {(activeTab === "PENDING" ||
// //                         activeTab === "BOOKED" ||
// //                         activeTab === "CANCELLED" ||
// //                         activeTab === "CHECKED IN") && (
// //                         <th className="px-4 py-3 text-center">Action</th>
// //                       )}
// //                     </>
// //                   )}
// //                 </tr>
// //               </thead>

// //               <tbody className="bg-white divide-y divide-gray-300">
// //                 {loading ? (
// //                   <tr>
// //                     <td colSpan="7" className="text-center py-6 text-gray-500">
// //                       Loading...
// //                     </td>
// //                   </tr>
// //                 ) : filteredData.length === 0 ? (
// //                   <tr>
// //                     <td colSpan="7" className="text-center py-6 text-gray-500">
// //                       No data found.
// //                     </td>
// //                   </tr>
// //                 ) : activeTab === "AVAILABLE" ? (
// //                   filteredData.map((room, index) => (
// //                     <tr key={index} className="hover:bg-green-50">
// //                       <td className="px-4 py-3">{room.roomType}</td>
// //                       <td className="px-4 py-3">{room.totalRooms}</td>
// //                       <td className="px-4 py-3">{room.bookedRooms}</td>
// //                       <td className="px-4 py-3">{room.availableRooms}</td>
// //                       <td className="px-4 py-3 text-[#009519]">AVAILABLE</td>
// //                     </tr>
// //                   ))
// //                 ) : (
// //                   filteredData.map((booking, index) => (
// //                     <tr key={index} className="hover:bg-green-50">
// //                       <td className="px-4 py-3">{booking.bookingNumber}</td>

// //                       <td className="px-4 py-3">
// //                         {booking.rooms?.[0]?.roomType}
// //                       </td>

// //                       <td className="px-4 py-3">{formatDate(booking.checkIn)}</td>
// //                       <td className="px-4 py-3">{formatDate(booking.checkOut)}</td>

// //                       <td
// //                         className={`px-4 py-3 font-semibold ${
// //                           booking.status === "pending"
// //                             ? "text-yellow-600"
// //                             : booking.status === "confirmed"
// //                             ? "text-green-700"
// //                             : booking.status === "guaranteed"
// //                             ? "text-blue-700"
// //                             : booking.status === "checked_in"
// //                             ? "text-[#009519]"
// //                             : booking.status === "cancelled"
// //                             ? "text-red-600"
// //                             : "text-gray-600"
// //                         }`}
// //                       >
// //                         {booking.status.toUpperCase()}
// //                       </td>

// //                       {/* ⭐ NOW SHOWS VIEW BUTTON FOR CHECKED IN AS WELL */}
// //                       {(activeTab === "PENDING" ||
// //                         activeTab === "BOOKED" ||
// //                         activeTab === "CANCELLED" ||
// //                         activeTab === "CHECKED IN") && (
// //                         <td className="px-4 py-3 text-center">
// //                           <button
// //                             onClick={() =>
// //                               navigate(`/booking-details/${booking._id}`)
// //                             }
// //                             className="flex items-center justify-center gap-1 px-3 py-1 text-sm bg-[#006600] text-white  hover:bg-green-700"
// //                           >
// //                             <Eye size={16} /> View
// //                           </button>
// //                         </td>
// //                       )}
// //                     </tr>
// //                   ))
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
// import { Search, Calendar, Eye } from "lucide-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// const Booking = () => {
//   const tabs = ["AVAILABLE", "PENDING", "BOOKED", "CHECKED IN", "CANCELLED"];
//   const navigate = useNavigate();
//   const location = useLocation();

//   const initialTab = location.state?.activeTab || "AVAILABLE";
//   const [activeTab, setActiveTab] = useState(initialTab);
//   const [searchBooking, setSearchBooking] = useState("");
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, [activeTab, selectedDate]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       let url = "";

//       if (activeTab === "AVAILABLE") {
//         const formattedDate = selectedDate.toISOString().split("T")[0];
//         url = `${API_URL}/rooms/available?date=${formattedDate}`;
//       } else if (activeTab === "PENDING") {
//         url = `${API_URL}/bookings/pending`;
//       } else if (activeTab === "BOOKED") {
//         url = `${API_URL}/bookings/confirmed-guaranteed-bookings`;
//       } else if (activeTab === "CHECKED IN") {
//         url = `${API_URL}/bookings/checked-in`;
//       } else if (activeTab === "CANCELLED") {
//         url = `${API_URL}/bookings/cancelled/all`;
//       }

//       const token = localStorage.getItem("authToken");

//       const response = await fetch(url, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//         credentials: "include",
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Failed to fetch data");

//       if (activeTab === "AVAILABLE") {
//         setData(data.availableRooms || []);
//       } else {
//         setData(data.bookings || []);
//       }
//     } catch (err) {
//       console.error("❌ Error fetching data:", err);
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredData =
//     activeTab === "AVAILABLE"
//       ? data
//       : data.filter((b) =>
//           b.bookingNumber?.toLowerCase().includes(searchBooking.toLowerCase())
//         );

//   const formatDate = (date) => {
//     return new Date(date)
//       .toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       })
//       .replace(",", "");
//   };

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <div className="flex-1 flex flex-col relative">
//         <Header />

//         <main className="flex-1 overflow-y-auto bg-gray-50 px-2 relative">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking</h2>

//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//             <div className="flex border shadow-sm bg-white">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab}
//                   className={`px-6 py-2 text-sm transition-colors duration-200 ${
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
//                   className="w-full pl-9 pr-3 h-11 border border-gray-300 focus:border-[#006600] focus:ring-2 focus:ring-[#006600]/40 outline-none shadow-sm"
//                 />
//               </div>
//             ) : (
//               <div className="relative w-full sm:w-64">
//                 <button
//                   onClick={() => setShowDatePicker(!showDatePicker)}
//                   className="flex items-center justify-between w-full h-11 px-4 border border-gray-300 bg-white shadow-sm hover:bg-green-50"
//                 >
//                   <span className="text-gray-700">{formatDate(selectedDate)}</span>
//                   <Calendar size={18} className="text-gray-500" />
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

//           <div className="overflow-x-auto bg-white border border-gray-300 shadow">
//             <table className="min-w-full divide-y divide-gray-300">
//               <thead className="bg-green-700 text-black">
//                 <tr>
//                   {activeTab !== "AVAILABLE" && (
//                     <th className="px-4 py-3 text-left font-semibold">
//                       Booking No
//                     </th>
//                   )}
//                   <th className="px-4 py-3 text-left font-semibold">Room Type</th>

//                   {activeTab === "AVAILABLE" ? (
//                     <>
//                       <th className="px-4 py-3">Total</th>
//                       <th className="px-4 py-3">Booked</th>
//                       <th className="px-4 py-3">Available</th>
//                       <th className="px-4 py-3">Status</th>
//                       <th className="px-4 py-3 text-center">Action</th>
//                     </>
//                   ) : (
//                     <>
//                       <th className="px-4 py-3">Check-In</th>
//                       <th className="px-4 py-3">Check-Out</th>
//                       <th className="px-4 py-3">Status</th>

//                       {(activeTab === "PENDING" ||
//                         activeTab === "BOOKED" ||
//                         activeTab === "CANCELLED" ||
//                         activeTab === "CHECKED IN") && (
//                         <th className="px-4 py-3 text-center">Action</th>
//                       )}
//                     </>
//                   )}
//                 </tr>
//               </thead>

//               <tbody className="bg-white divide-y divide-gray-300">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="7" className="text-center py-6 text-gray-500">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : filteredData.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="text-center py-6 text-gray-500">
//                       No data found.
//                     </td>
//                   </tr>
//                 ) : activeTab === "AVAILABLE" ? (
//                   filteredData.map((room, index) => (
//                     <tr key={index} className="hover:bg-green-50">
//                       <td className="px-4 py-3">{room.roomType}</td>
//                       <td className="px-4 py-3">{room.totalRooms}</td>
//                       <td className="px-4 py-3">{room.bookedRooms}</td>
//                       <td className="px-4 py-3">{room.availableRooms}</td>
//                       <td className="px-4 py-3 text-[#009519]">AVAILABLE</td>

//                       {/* ⭐ BOOK BUTTON */}
//                       {/* <td className="px-4 py-3 text-center">
//                         <button
//                           onClick={() =>
//                             navigate("/booking-details/AVAILABLE", {
//                               state: {
//                                 booking: {
//                                   status: "AVAILABLE",
//                                   roomType: room.roomType,
//                                 },
//                                 selectedDate,
//                               },
//                             })
//                           }
//                           className="px-3 py-1 text-sm bg-[#006600] text-white  hover:bg-green-700"
//                         >
//                           BOOK
//                         </button>
//                       </td> */}
//                       {/* <td className="px-4 py-3 text-center">
//                         <button
//                           className="bg-[#006600] text-white px-4 py-1  hover:bg-green-800 transition"
//                           onClick={() =>
//                             navigate("/booking-details/AVAILABLE", {
//                               state: {
//                                 status: "AVAILABLE",
//                                 roomType: room.roomType,
//                                 selectedDate: selectedDate,
//                               },
//                             })
//                           }
//                         >
//                           BOOK
//                         </button>
//                       </td> */}
//                       <td className="px-4 py-3 text-center">
//                       <button
//                         className="bg-[#006600] text-white px-4 py-1  hover:bg-green-800 transition"
//                         onClick={() =>
//                           navigate("/booking-form/AVAILABLE", {
//                             state: {
//                               status: "AVAILABLE",
//                               roomType: room.roomType,
//                               selectedDate: selectedDate,
//                             },
//                           })
//                         }
//                       >
//                         BOOK
//                       </button>
//                     </td>


//                     </tr>
//                   ))
//                 ) : (
//                   filteredData.map((booking, index) => (
//                     <tr key={index} className="hover:bg-green-50">
//                       <td className="px-4 py-3">{booking.bookingNumber}</td>
//                       <td className="px-4 py-3">
//                         {booking.rooms?.[0]?.roomType}
//                       </td>
//                       <td className="px-4 py-3">{formatDate(booking.checkIn)}</td>
//                       <td className="px-4 py-3">
//                         {formatDate(booking.checkOut)}
//                       </td>

//                       <td
//                         className={`px-4 py-3 font-semibold ${
//                           booking.status === "pending"
//                             ? "text-yellow-600"
//                             : booking.status === "confirmed"
//                             ? "text-green-700"
//                             : booking.status === "guaranteed"
//                             ? "text-blue-700"
//                             : booking.status === "checked_in"
//                             ? "text-[#009519]"
//                             : booking.status === "cancelled"
//                             ? "text-red-600"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         {booking.status.toUpperCase()}
//                       </td>

//                       {(activeTab === "PENDING" ||
//                         activeTab === "BOOKED" ||
//                         activeTab === "CANCELLED" ||
//                         activeTab === "CHECKED IN") && (
//                         <td className="px-4 py-3 text-center">
//                           <button
//                             onClick={() =>
//                               navigate(`/booking-details/${booking._id}`)
//                             }
//                             className="flex items-center justify-center gap-1 px-3 py-1 text-sm bg-[#006600] text-white  hover:bg-green-700"
//                           >
//                             <Eye size={16} /> View
//                           </button>
//                         </td>
//                       )}
//                     </tr>
//                   ))
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
                      <th className="px-4 py-3 text-left">Available</th>
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
                      <td className="px-4 py-3 text-left text-[#009519]">
                        AVAILABLE
                      </td>

                      <td className="px-4 py-3 text-left">
                        <button
                          className="flex font-small hover:underline"
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
                        className={`px-4 py-3 text-left font-semibold ${
                          booking.status === "pending"
                            ? "text-yellow-600"
                            : booking.status === "confirmed"
                            ? "text-green-700"
                            : booking.status === "guaranteed"
                            ? "text-blue-700"
                            : booking.status === "checked_in"
                            ? "text-[#009519]"
                            : booking.status === "cancelled"
                            ? "text-red-600"
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
                            className="font-small hover:underline"
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
