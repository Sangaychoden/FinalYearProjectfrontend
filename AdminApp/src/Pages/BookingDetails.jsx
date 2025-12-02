
// // // import React, { useState, useEffect } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import "react-datepicker/dist/react-datepicker.css";
// // // import Swal from "sweetalert2";

// // // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// // // const BookingDetailsPage = () => {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();

// // //   const [booking, setBooking] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedRoom, setSelectedRoom] = useState(null);

// // //   // ⭐ Fetch booking for ALL STATUSES
// // //   const fetchBookingData = async () => {
// // //     try {
// // //       let found = null;

// // //       // 1️⃣ Pending
// // //       const pending = await fetch(`${API_URL}/bookings/pending`, {
// // //         credentials: "include",
// // //       });
// // //       const pendingJSON = await pending.json();
// // //       if (pendingJSON.bookings)
// // //         found = pendingJSON.bookings.find((b) => b._id === id);

// // //       // 2️⃣ Confirmed + Guaranteed
// // //       if (!found) {
// // //         const booked = await fetch(
// // //           `${API_URL}/bookings/confirmed-guaranteed-bookings`,
// // //           { credentials: "include" }
// // //         );
// // //         const bookedJSON = await booked.json();
// // //         if (bookedJSON.bookings)
// // //           found = bookedJSON.bookings.find((b) => b._id === id);
// // //       }

// // //       // 3️⃣ Checked-in
// // //       if (!found) {
// // //         const checkedIn = await fetch(`${API_URL}/bookings/checked-in`, {
// // //           credentials: "include",
// // //         });
// // //         const checkedInJSON = await checkedIn.json();
// // //         if (checkedInJSON.bookings)
// // //           found = checkedInJSON.bookings.find((b) => b._id === id);
// // //       }

// // //       // 4️⃣ Cancelled
// // //       if (!found) {
// // //         const cancelled = await fetch(`${API_URL}/bookings/cancelled/all`, {
// // //           credentials: "include",
// // //         });
// // //         const cancelledJSON = await cancelled.json();
// // //         if (cancelledJSON.bookings)
// // //           found = cancelledJSON.bookings.find((b) => b._id === id);
// // //       }

// // //       setBooking(found || null);

// // //       // Load room details
// // //       if (found && found.status !== "cancelled") {
// // //         const date = new Date().toISOString().split("T")[0];
// // //         const roomRes = await fetch(`${API_URL}/rooms/available?date=${date}`);
// // //         const roomData = await roomRes.json();

// // //         if (roomData.availableRooms?.length > 0) {
// // //           const matched = roomData.availableRooms.find(
// // //             (r) => r.roomType === found.rooms?.[0]?.roomType
// // //           );
// // //           setSelectedRoom(matched);
// // //         }
// // //       }
// // //     } catch (err) {
// // //       console.error("❌ Error fetching booking:", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchBookingData();
// // //   }, [id]);

// // //   // NICE DATE FORMATTER
// // //   const formatNiceDate = (date) => {
// // //     const d = new Date(date);
// // //     return `${d.getDate()} ${d.toLocaleString("en-GB", { month: "short" })}, ${d.getFullYear()}`;
// // //   };

// // //   // =======================
// // //   // PAGE LOADING
// // //   // =======================
// // //   if (loading)
// // //     return (
// // //       <div className="flex justify-center items-center h-screen">
// // //         Loading booking details...
// // //       </div>
// // //     );

// // //   if (!booking)
// // //     return (
// // //       <div className="p-6 text-center">
// // //         <h2 className="text-2xl font-bold">Booking not found.</h2>
// // //         <button
// // //           className="mt-4 px-4 py-2 bg-green-600 text-white"
// // //           onClick={() => navigate("/booking")}
// // //         >
// // //           Go Back
// // //         </button>
// // //       </div>
// // //     );

// // //   // =======================
// // //   // UI RENDER (VIEW ONLY)
// // //   // =======================
// // //   return (
// // //     <div className="min-h-screen bg-gray-50 px-4 py-6">
// // //       <div className="flex justify-between mb-6">
// // //         <h1 className="text-2xl font-bold text-[#006600]">
// // //           Booking #{booking.bookingNumber}
// // //         </h1>

// // //         <button
// // //           onClick={() => navigate(-1)}
// // //           className="px-4 py-2 border text-gray-700"
// // //         >
// // //           Back
// // //         </button>
// // //       </div>

// // //       <div className="bg-white shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4 ">

// // //         <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
// // //         <p><strong>Email:</strong> {booking.email}</p>
// // //         <p><strong>Country:</strong> {booking.country}</p>
// // //         <p><strong>Phone:</strong> {booking.phoneNumber}</p>

// // //         <p><strong>Room Type:</strong> {booking.rooms?.[0]?.roomType}</p>
// // //         <p><strong>Quantity:</strong> {booking.rooms?.[0]?.quantity}</p>
// // //         <p><strong>Price/Night:</strong> Nu. {booking.rooms?.[0]?.pricePerNight}</p>

// // //         {selectedRoom && (
// // //           <>
// // //             <p><strong>Room Location:</strong> {selectedRoom.location}</p>
// // //             <p><strong>Occupancy:</strong> {selectedRoom.occupancy}</p>
// // //             <p><strong>Size:</strong> {selectedRoom.size} m²</p>
// // //           </>
// // //         )}

// // //         <p><strong>Check-In:</strong> {formatNiceDate(booking.checkIn)}</p>
// // //         <p><strong>Check-Out:</strong> {formatNiceDate(booking.checkOut)}</p>

// // //         <p><strong>Total Price:</strong> Nu. {booking.totalPrice}</p>
// // //         <p><strong>Status:</strong> {booking.status.toUpperCase()}</p>

// // //         {/* ASSIGNED ROOM VIEW ONLY */}
// // //         <div className="col-span-2 mt-2">
// // //           <p className="font-bold">Assigned Room(s):</p>
// // //           <p className="mt-1 text-gray-700">{booking.assignedRoom?.join(", ")}</p>
// // //         </div>

// // //         {booking.status === "cancelled" && (
// // //           <p className="text-red-600 col-span-2">
// // //             <strong>Cancel Reason:</strong> {booking.cancelReason}
// // //           </p>
// // //         )}

// // //         <div className="col-span-2">
// // //           <p><strong>Special Request:</strong> {booking.specialRequest}</p>
// // //         </div>

// // //         {/* ⭐ VIEW ONLY — ALL BUTTONS REMOVED */}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default BookingDetailsPage;
// // // BookingDetailsPage.jsx
// // import React, { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import "react-datepicker/dist/react-datepicker.css";
// // import Swal from "sweetalert2";

// // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// // const mealPlanDisplay = (code) => {
// //   if (!code) return "—";
// //   const map = {
// //     ep: "European Plan (EP)",
// //     cp: "Continental Plan (CP)",
// //     map: "Modified American Plan (MAP)",
// //     ap: "American Plan (AP)",
// //   };
// //   return map[code.toLowerCase()] ?? code;
// // };

// // const formatNiceDate = (date) => {
// //   try {
// //     const d = new Date(date);
// //     if (Number.isNaN(d.getTime())) return "Invalid date";
// //     return `${d.getDate()} ${d.toLocaleString("en-GB", {
// //       month: "short",
// //     })}, ${d.getFullYear()}`;
// //   } catch {
// //     return date;
// //   }
// // };

// // const calculateNights = (checkIn, checkOut) => {
// //   try {
// //     const inDate = new Date(checkIn);
// //     const outDate = new Date(checkOut);
// //     const ms = outDate - inDate;
// //     const nights = Math.round(ms / (1000 * 60 * 60 * 24));
// //     return nights > 0 ? nights : 0;
// //   } catch {
// //     return 0;
// //   }
// // };

// // const BookingDetailsPage = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   const [booking, setBooking] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedRoom, setSelectedRoom] = useState(null);

// //   useEffect(() => {
// //     const fetchBookingData = async () => {
// //       setLoading(true);
// //       try {
// //         let found = null;

// //         // Pending
// //         try {
// //           const pending = await fetch(`${API_URL}/bookings/pending`, { credentials: "include" });
// //           const p = await pending.json();
// //           if (p.bookings) found = p.bookings.find((b) => b._id === id) || found;
// //         } catch {}

// //         // Confirmed + guaranteed
// //         if (!found) {
// //           try {
// //             const booked = await fetch(`${API_URL}/bookings/confirmed-guaranteed-bookings`, { credentials: "include" });
// //             const b = await booked.json();
// //             if (b.bookings) found = b.bookings.find((b) => b._id === id) || found;
// //           } catch {}
// //         }

// //         // Checked-in
// //         if (!found) {
// //           try {
// //             const checkin = await fetch(`${API_URL}/bookings/checked-in`, { credentials: "include" });
// //             const c = await checkin.json();
// //             if (c.bookings) found = c.bookings.find((b) => b._id === id) || found;
// //           } catch {}
// //         }

// //         // Cancelled
// //         if (!found) {
// //           try {
// //             const cancel = await fetch(`${API_URL}/bookings/cancelled/all`, { credentials: "include" });
// //             const cc = await cancel.json();
// //             if (cc.bookings) found = cc.bookings.find((b) => b._id === id) || found;
// //           } catch {}
// //         }

// //         setBooking(found || null);

// //         if (found && found.status !== "cancelled") {
// //           try {
// //             const date = new Date().toISOString().split("T")[0];
// //             const room = await fetch(`${API_URL}/rooms/available?date=${date}`);
// //             const r = await room.json();
// //             if (r.availableRooms?.length) {
// //               const match = r.availableRooms.find((rm) => rm.roomType === found.rooms?.[0]?.roomType);
// //               setSelectedRoom(match ?? null);
// //             }
// //           } catch {}
// //         }
// //       } catch (err) {
// //         Swal.fire({ icon: "error", title: "Error", text: "Failed to load booking." });
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchBookingData();
// //   }, [API_URL, id]);

// //   // ========================= LOADING ===========================
// //   if (loading)
// //     return (
// //       <div className="flex justify-center items-center h-screen text-lg">
// //         Loading booking details...
// //       </div>
// //     );

// //   if (!booking)
// //     return (
// //       <div className="p-6 text-center">
// //         <h2 className="text-2xl font-semibold">Booking not found.</h2>
// //         <button
// //           className="mt-4 px-5 py-2 bg-green-600 text-white  shadow"
// //           onClick={() => navigate(-1)}
// //         >
// //           Go Back
// //         </button>
// //       </div>
// //     );

// //   // Derived
// //   const nights = calculateNights(booking.checkIn, booking.checkOut);
// //   const created = booking.createdAt ? formatNiceDate(booking.createdAt) : null;

// //   const computedTotal = (booking.rooms || []).reduce((acc, r) => {
// //     return acc + (r.quantity || 1) * (r.pricePerNight || 0) * nights;
// //   }, 0);

// //   return (
// //     <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
// //       <div className="w-full max-w-5xl bg-white shadow-xl -lg p-8">

// //         {/* HEADER */}
// //         <div className="flex justify-between pb-6 border-b">
// //           <div>
// //             <h1 className="text-3xl font-bold text-[#006600]">
// //               Booking #{booking.bookingNumber}
// //             </h1>
// //             <p className="text-sm text-gray-600 mt-1">Created on: {created ?? "—"}</p>
// //           </div>

// //           <div className="text-right">
// //             <p className="font-semibold text-gray-700">
// //               Status: <span className="text-[#006600]">{booking.status.toUpperCase()}</span>
// //             </p>
// //             {booking.transactionNumber && (
// //               <p className="text-gray-700 mt-1">Txn #: {booking.transactionNumber}</p>
// //             )}
// //           </div>
// //         </div>

// //         {/* DETAILS CARD */}
// //         <div className="mt-6 p-6 -lg bg-gray-50 border">

// //           <h2 className="text-lg font-semibold mb-4 text-[#006600]">Guest Details</h2>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
// //             <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
// //             <p><strong>Email:</strong> {booking.email}</p>
// //             <p><strong>Country:</strong> {booking.country}</p>
// //             <p><strong>Phone:</strong> {booking.phoneNumber}</p>

// //             <p><strong>Check-In:</strong> {formatNiceDate(booking.checkIn)}</p>
// //             <p><strong>Check-Out:</strong> {formatNiceDate(booking.checkOut)}</p>
// //             <p><strong>Nights:</strong> {nights}</p>

// //             <p>
// //               <strong>Assigned Room(s):</strong> {booking.assignedRoom?.length ? booking.assignedRoom.join(", ") : "—"}
// //             </p>
// //           </div>

// //           <div className="mt-4">
// //             <p className="font-semibold">Meals requested:</p>
// //             <p className="mt-1 text-gray-700">
// //               Breakfast: {booking.meals?.breakfast ? "Yes" : "No"} |  
// //               Lunch: {booking.meals?.lunch ? "Yes" : "No"} |  
// //               Dinner: {booking.meals?.dinner ? "Yes" : "No"}
// //             </p>
// //           </div>

// //           <div className="mt-4">
// //             <p><strong>Special Request:</strong> {booking.specialRequest || "—"}</p>
// //           </div>
// //         </div>

// //         {/* ROOMS TABLE */}
// //         <div className="mt-10 p-6 -lg bg-gray-50 border">
// //           <h2 className="text-xl font-semibold mb-5 text-[#006600]">Booked Rooms</h2>

// //           <div className="overflow-x-auto">
// //             <table className="w-full text-sm border border-gray-300 -lg overflow-hidden">
// //               <thead className="bg-[#006600] text-white text-left">
// //                 <tr>
// //                   <th className="px-4 py-3">Room Type</th>
// //                   <th className="px-4 py-3 text-right">Qty</th>
// //                   <th className="px-4 py-3">Occupancy</th>
// //                   <th className="px-4 py-3">Meal Plan</th>
// //                   <th className="px-4 py-3 text-right">Adults</th>
// //                   <th className="px-4 py-3">Children</th>
// //                   <th className="px-4 py-3 text-right">Extra Beds</th>
// //                   <th className="px-4 py-3 text-right">Price/Night</th>
// //                   <th className="px-4 py-3 text-right">Nights</th>
// //                   <th className="px-4 py-3 text-right">Total</th>
// //                 </tr>
// //               </thead>

// //               <tbody>
// //                 {booking.rooms.map((r, idx) => {
// //                   const qty = r.quantity || 1;
// //                   const roomTotal = qty * (r.pricePerNight || 0) * nights;

// //                   return (
// //                     <tr key={idx} className="border-t bg-white">
// //                       <td className="px-4 py-2">{r.roomType}</td>
// //                       <td className="px-4 py-2 text-right">{qty}</td>
// //                       <td className="px-4 py-2">{(r.occupancyType || []).join(", ")}</td>
// //                       <td className="px-4 py-2">{mealPlanDisplay(r.mealPlan)}</td>
// //                       <td className="px-4 py-2 text-right">{r.adults}</td>
// //                       <td className="px-4 py-2">
// //                         {(r.children || []).map((c) => c.age).join(", ") || "—"}
// //                       </td>
// //                       <td className="px-4 py-2 text-right">{r.extraBeds}</td>
// //                       <td className="px-4 py-2 text-right">Nu. {r.pricePerNight}</td>
// //                       <td className="px-4 py-2 text-right">{nights}</td>
// //                       <td className="px-4 py-2 text-right font-semibold">Nu. {roomTotal}</td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>

// //               <tfoot className="bg-gray-100">
// //                 <tr className="border-t">
// //                   <td colSpan={9} className="px-4 py-3 text-right font-semibold">
// //                     Computed Total
// //                   </td>
// //                   <td className="px-4 py-3 text-right font-semibold">
// //                     Nu. {computedTotal}
// //                   </td>
// //                 </tr>
// //                 <tr>
// //                   <td colSpan={9} className="px-4 py-3 text-right font-semibold">
// //                     Booking Total
// //                   </td>
// //                   <td className="px-4 py-3 text-right font-semibold text-[#006600]">
// //                     Nu. {booking.totalPrice ?? computedTotal}
// //                   </td>
// //                 </tr>
// //               </tfoot>
// //             </table>
// //           </div>

// //           {selectedRoom && (
// //             <div className="mt-6 text-gray-700">
// //               <p className="font-semibold text-[#006600] mb-1">Matched Room (Context Only)</p>
// //               <p>Type: {selectedRoom.roomType}</p>
// //               {selectedRoom.location && <p>Location: {selectedRoom.location}</p>}
// //               {selectedRoom.size && <p>Size: {selectedRoom.size} m²</p>}
// //               {selectedRoom.occupancy && <p>Occupancy: {selectedRoom.occupancy}</p>}
// //             </div>
// //           )}

// //           {booking.status === "cancelled" && booking.cancelReason && (
// //             <div className="mt-6 p-4  bg-red-50 border border-red-300 text-red-700">
// //               <strong>Cancel Reason:</strong> {booking.cancelReason}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BookingDetailsPage;
// // BookingDetailsPage.jsx (ONE SINGLE CARD VERSION)
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "react-datepicker/dist/react-datepicker.css";
// import Swal from "sweetalert2";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// // Meal Plan Display
// const mealPlanDisplay = (code) => {
//   if (!code) return "—";
//   const map = {
//     ep: "European Plan (EP)",
//     cp: "Continental Plan (CP)",
//     map: "Modified American Plan (MAP)",
//     ap: "American Plan (AP)",
//   };
//   return map[code.toLowerCase()] ?? code;
// };

// // Date Formatter
// const formatNiceDate = (date) => {
//   try {
//     const d = new Date(date);
//     return `${d.getDate()} ${d.toLocaleString("en-GB", { month: "short" })}, ${d.getFullYear()}`;
//   } catch {
//     return date;
//   }
// };

// // Nights Calculator
// const calculateNights = (checkIn, checkOut) => {
//   try {
//     const inDate = new Date(checkIn);
//     const outDate = new Date(checkOut);
//     const nights = (outDate - inDate) / (1000 * 60 * 60 * 24);
//     return nights > 0 ? nights : 0;
//   } catch {
//     return 0;
//   }
// };

// const BookingDetailsPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedRoom, setSelectedRoom] = useState(null);

//   useEffect(() => {
//     const fetchBookingData = async () => {
//       setLoading(true);

//       try {
//         let found = null;

//         const endpoints = [
//           "/bookings/pending",
//           "/bookings/confirmed-guaranteed-bookings",
//           "/bookings/checked-in",
//           "/bookings/cancelled/all",
//         ];

//         for (const url of endpoints) {
//           try {
//             const res = await fetch(`${API_URL}${url}`, { credentials: "include" });
//             const json = await res.json();
//             if (json.bookings) {
//               const match = json.bookings.find((b) => b._id === id);
//               if (match) {
//                 found = match;
//                 break;
//               }
//             }
//           } catch {}
//         }

//         setBooking(found || null);

//         if (found && found.status !== "cancelled") {
//           try {
//             const today = new Date().toISOString().split("T")[0];
//             const roomRes = await fetch(`${API_URL}/rooms/available?date=${today}`);
//             const roomData = await roomRes.json();

//             if (roomData.availableRooms?.length) {
//               const type = found.rooms?.[0]?.roomType;
//               const matched = roomData.availableRooms.find((r) => r.roomType === type);
//               setSelectedRoom(matched || null);
//             }
//           } catch {}
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookingData();
//   }, [API_URL, id]);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen text-lg">
//         Loading booking details...
//       </div>
//     );

//   if (!booking)
//     return (
//       <div className="p-6 text-center">
//         <h2 className="text-xl font-semibold">Booking not found.</h2>
//         <button
//           className="mt-4 px-4 py-2 bg-green-600 text-white "
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </button>
//       </div>
//     );

//   const nights = calculateNights(booking.checkIn, booking.checkOut);
//   const created = booking.createdAt ? formatNiceDate(booking.createdAt) : "—";

//   const computedTotal = (booking.rooms || []).reduce(
//     (acc, r) => acc + (r.quantity || 1) * (r.pricePerNight || 0) * nights,
//     0
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
//       {/* ===================== SINGLE MAIN CARD ===================== */}
//       <div className="w-full max-w-5xl bg-white shadow-xl -xl p-10 border">

//         {/* Header */}
//         <div className="flex justify-between items-start pb-6 border-b">
//           <div>
//             <h1 className="text-3xl font-bold text-[#006600]">
//               Booking #{booking.bookingNumber}
//             </h1>
//             <p className="text-gray-500 mt-1">Created on: {created}</p>
//           </div>

//           <div className="text-right">
//             <p className="font-semibold">
//               Status:{" "}
//               <span className="text-[#006600]">{booking.status.toUpperCase()}</span>
//             </p>
//             {booking.transactionNumber && (
//               <p className="text-gray-600 mt-1">Txn #: {booking.transactionNumber}</p>
//             )}
//           </div>
//         </div>

//         {/* ===================== GUEST DETAILS ===================== */}
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold text-[#006600] mb-4">
//             Guest Details
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-800">
//             <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
//             <p><strong>Email:</strong> {booking.email}</p>

//             <p><strong>Country:</strong> {booking.country}</p>
//             <p><strong>Phone:</strong> {booking.phoneNumber}</p>

//             <p><strong>Check-In:</strong> {formatNiceDate(booking.checkIn)}</p>
//             <p><strong>Check-Out:</strong> {formatNiceDate(booking.checkOut)}</p>

//             <p><strong>Nights:</strong> {nights}</p>
//             <p>
//               <strong>Assigned Room(s):</strong>{" "}
//               {booking.assignedRoom?.length ? booking.assignedRoom.join(", ") : "—"}
//             </p>
//           </div>

//           <div className="mt-4">
//             <p className="font-semibold">Meals requested:</p>
//             <p className="mt-1 text-gray-700">
//               Breakfast: {booking.meals?.breakfast ? "Yes" : "No"} |{" "}
//               Lunch: {booking.meals?.lunch ? "Yes" : "No"} |{" "}
//               Dinner: {booking.meals?.dinner ? "Yes" : "No"}
//             </p>
//           </div>

//           <p className="mt-4">
//             <strong>Special Request:</strong> {booking.specialRequest || "—"}
//           </p>
//         </div>

//         {/* ===================== BOOKED ROOMS TABLE ===================== */}
//         <div className="mt-12">
//           <h2 className="text-xl font-semibold text-[#006600] mb-4">
//             Booked Rooms
//           </h2>

//           <div className="overflow-x-auto">
//             <table className="w-full text-sm border border-gray-300 -lg overflow-hidden">
//               <thead className="bg-[#006600] text-white">
//                 <tr>
//                   <th className="px-4 py-3">Room</th>
//                   <th className="px-4 py-3 text-right">Qty</th>
//                   <th className="px-4 py-3">Occupancy</th>
//                   <th className="px-4 py-3">Meal Plan</th>
//                   <th className="px-4 py-3 text-right">Adults</th>
//                   <th className="px-4 py-3">Children</th>
//                   <th className="px-4 py-3 text-right">Extra Beds</th>
//                   <th className="px-4 py-3 text-right">Price/Night</th>
//                   <th className="px-4 py-3 text-right">Nights</th>
               
//                 </tr>
//               </thead>

//               <tbody>
//                 {booking.rooms.map((r, idx) => {
//                   const qty = r.quantity || 1;
//                   const roomTotal = qty * (r.pricePerNight || 0) * nights;

//                   return (
//                     <tr key={idx} className="border-t bg-white">
//                       <td className="px-4 py-3">{r.roomType}</td>
//                       <td className="px-4 py-3 text-right">{qty}</td>
//                       <td className="px-4 py-3">{(r.occupancyType || []).join(", ")}</td>
//                       <td className="px-4 py-3">{mealPlanDisplay(r.mealPlan)}</td>
//                       <td className="px-4 py-3 text-right">{r.adults}</td>
//                       <td className="px-4 py-3">
//                         {(r.children || []).map((c) => c.age).join(", ") || "—"}
//                       </td>
//                       <td className="px-4 py-3 text-right">{r.extraBeds}</td>
//                       <td className="px-4 py-3 text-right">Nu. {r.pricePerNight}</td>
//                       <td className="px-4 py-3 text-right">{nights}</td>
//                       {/* <td className="px-4 py-3 text-right font-semibold">
//                         Nu. {roomTotal}
//                       </td> */}
//                     </tr>
//                   );
//                 })}
//               </tbody>

//               <tfoot className="bg-gray-100">
//                 <tr>
//                   <td colSpan={9} className="px-4 py-3 text-right font-semibold">Booking Total</td>
//                   <td className="px-4 py-3 text-right font-semibold text-[#006600]">
//                     Nu. {booking.totalPrice ?? computedTotal}
//                   </td>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>
//         </div>

//         {/* ===================== OPTIONAL ROOM MATCH ===================== */}
//         {selectedRoom && (
//           <div className="mt-8 p-5 border bg-gray-50 -lg">
//             <h3 className="font-semibold text-[#006600] mb-2">Room Details (Reference Only)</h3>
//             <p>Type: {selectedRoom.roomType}</p>
//             {selectedRoom.location && <p>Location: {selectedRoom.location}</p>}
//             {selectedRoom.size && <p>Size: {selectedRoom.size} m²</p>}
//             {selectedRoom.occupancy && <p>Occupancy: {selectedRoom.occupancy}</p>}
//           </div>
//         )}

//         {/* ===================== CANCEL REASON ===================== */}
//         {booking.status === "cancelled" && booking.cancelReason && (
//           <div className="mt-8 p-5 border bg-red-50 -lg text-red-700">
//             <strong>Cancel Reason:</strong> {booking.cancelReason}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingDetailsPage;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Meal Plan Display
const mealPlanDisplay = (code) => {
  if (!code) return "—";
  const map = {
    ep: "European Plan (EP)",
    cp: "Continental Plan (CP)",
    map: "Modified American Plan (MAP)",
    ap: "American Plan (AP)",
  };
  return map[code.toLowerCase()] ?? code;
};

// Date Formatter
const formatNiceDate = (date) => {
  try {
    const d = new Date(date);
    return `${d.getDate()} ${d.toLocaleString("en-GB", { month: "short" })}, ${d.getFullYear()}`;
  } catch {
    return date;
  }
};

// Nights Calculator
const calculateNights = (checkIn, checkOut) => {
  try {
    const i = new Date(checkIn);
    const o = new Date(checkOut);
    const n = (o - i) / (1000 * 60 * 60 * 24);
    return n > 0 ? n : 0;
  } catch {
    return 0;
  }
};

const BookingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Fetch booking + available room match
  useEffect(() => {
    const run = async () => {
      setLoading(true);

      try {
        let found = null;

        const endpoints = [
          "/bookings/pending",
          "/bookings/confirmed-guaranteed-bookings",
          "/bookings/checked-in",
          "/bookings/cancelled/all",
        ];

        for (const url of endpoints) {
          try {
            const res = await fetch(`${API_URL}${url}`, { credentials: "include" });
            const json = await res.json();
            if (json.bookings) {
              const match = json.bookings.find((b) => b._id === id);
              if (match) {
                found = match;
                break;
              }
            }
          } catch {}
        }

        setBooking(found || null);

        // Check room reference match
        if (found && found.status !== "cancelled") {
          try {
            const today = new Date().toISOString().split("T")[0];
            const roomRes = await fetch(`${API_URL}/rooms/available?date=${today}`);
            const roomData = await roomRes.json();

            if (roomData?.availableRooms?.length) {
              const type = found.rooms?.[0]?.roomType;
              const matched = roomData.availableRooms.find((r) => r.roomType === type);
              setSelectedRoom(matched || null);
            }
          } catch {}
        }
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [API_URL, id]);

  // Loading state
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading booking details...
      </div>
    );

  // No booking
  if (!booking)
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Booking not found.</h2>
        <button
          className="mt-4 px-4 py-2 bg-green-600 text-white "
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );

  // ---------------------------
  // Derived Values
  // ---------------------------
  const nights = calculateNights(booking.checkIn, booking.checkOut);
  const created = booking.createdAt ? formatNiceDate(booking.createdAt) : "—";

  return (
    <div className="min-h-screen bg-gray-100 px-4 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* BACK BUTTON - TOP RIGHT */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => navigate(-1)}
            className="border border-gray-400 text-gray-700 px-6 py-2  text-sm hover:bg-gray-50"
          >
            Back
          </button>
        </div>

        {/* MAIN CONTENT BOX */}
        <div className="bg-white shadow-xl -xl p-10 border">

          {/* HEADER */}
          <div className="flex justify-between items-start pb-6 border-b">
          <div>
            <h1 className="text-3xl font-bold text-[#006600]">
              Booking #{booking.bookingNumber}
            </h1>
            <p className="text-gray-500 mt-1">Created on: {created}</p>
          </div>

          <div className="text-right">
            <p className="font-semibold">
              Status:{" "}
              <span className="text-[#006600]">
                {booking.status.toUpperCase()}
              </span>
            </p>
            {booking.transactionNumber && (
              <p className="text-gray-600 mt-1">Txn #: {booking.transactionNumber}</p>
            )}
          </div>
        </div>

        {/* GUEST DETAILS */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-[#006600] mb-2">
            Guest Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-800">
            <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Country:</strong> {booking.country}</p>
            <p><strong>Phone:</strong> {booking.phoneNumber}</p>
            <p><strong>Check-In:</strong> {formatNiceDate(booking.checkIn)}</p>
            <p><strong>Check-Out:</strong> {formatNiceDate(booking.checkOut)}</p>
            <p><strong>Nights:</strong> {nights}</p>
            <p>
              <strong>Assigned Room(s):</strong>{" "}
              {booking.assignedRoom?.length ? booking.assignedRoom.join(", ") : "—"}
            </p>
          </div>

          {/* Meals */}
          <div className="mt-4">
            <p className="font-bold">Meals requested:</p>
            <p className="mt-1 text-gray-700">
              Breakfast: {booking.meals?.breakfast ? "Yes" : "No"} |{" "}
              Lunch: {booking.meals?.lunch ? "Yes" : "No"} |{" "}
              Dinner: {booking.meals?.dinner ? "Yes" : "No"}
            </p>
          </div>

          <p className="mt-4">
            <strong>Special Request:</strong> {booking.specialRequest || "—"}
          </p>
        </div>

        {/* ROOMS TABLE */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-[#006600] mb-2">
            Booked Rooms
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead className="bg-[#006600] text-white">
                <tr>
                  <th className="border border-black font-semibold px-4 py-3">Room</th>
                  <th className="border border-black font-semibold px-4 py-3 text-right">Qty</th>
                  <th className="border border-black font-semibold px-4 py-3">Occupancy</th>
                  <th className="border border-black font-semibold px-4 py-3">Meal Plan</th>
                  <th className="border border-black font-semibold px-4 py-3 text-right">Adults</th>
                  <th className="border border-black font-semibold px-4 py-3">Children</th>
                  <th className="border border-black font-semibold px-4 py-3 text-right">Extra Beds</th>
                  <th className="border border-black font-semibold px-4 py-3 text-right">Price/Night</th>
                  <th className="border border-black font-semibold px-4 py-3 text-right">Nights</th>
                </tr>
              </thead>

              <tbody>
                {booking.rooms.map((r, idx) => (
                  <tr key={idx} className="bg-white">
                    <td className="border border-gray-300 px-4 py-3">{r.roomType}</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">{r.quantity || 1}</td>
                    <td className="border border-gray-300 px-4 py-3">{(r.occupancyType || []).join(", ")}</td>
                    <td className="border border-gray-300 px-4 py-3">{mealPlanDisplay(r.mealPlan)}</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">{r.adults}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      {(r.children || []).map((c) => c.age).join(", ") || "—"}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-right">{r.extraBeds}</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">Nu. {r.pricePerNight}</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">{nights}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot className="bg-gray-100">
                <tr>
                  <td colSpan={8} className="px-4 py-3 text-right text-base font-semibold">
                    Total Amount:
                  </td>
                  <td className="px-4 py-3 text-right text-base font-semibold text-[#006600]">
                    Nu. {booking.totalPrice}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        {/* END ROOMS TABLE */}

          {/* CANCEL REASON */}
          {booking.status === "cancelled" && booking.cancelReason && (
            <div className="mt-8 p-5 border bg-red-50 -lg text-red-700">
              <strong>Cancellation Reason:</strong> {booking.cancelReason}
            </div>
          )}
        </div>
        {/* END MAIN CONTENT BOX */}
      </div>
      {/* END WRAPPER */}
    </div>
  );
};

export default BookingDetailsPage;
