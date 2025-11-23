
// import { BsArrowLeft, BsArrowRight, BsCheck2 } from "react-icons/bs";
// import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
// import { useState, useEffect } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { FaDollarSign, FaVectorSquare, FaUserFriends, FaBed, FaWater } from "react-icons/fa";
// import { BiChevronDown } from "react-icons/bi";
// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Swal from "sweetalert2";
// import "./RoomsDatepicker.css";

// const RoomDetails2 = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [roomData, setRoomData] = useState(location.state || null);
//   const [imageIndex, setImageIndex] = useState(0);

//   const [showAvailability, setShowAvailability] = useState(false);
//   const [checkIn, setCheckIn] = useState(null);
//   const [checkOut, setCheckOut] = useState(null);
//   const [room, setRoom] = useState(1);
//   const [adult, setAdult] = useState(1);
//   const [children, setChildren] = useState(0);
//   const [guestOpen, setGuestOpen] = useState(false);
//   const [roomOpen, setRoomOpen] = useState(false);

//   const [useDesktopPicker, setUseDesktopPicker] = useState(false);
//   const [showInOverlay, setShowInOverlay] = useState(false);
//   const [showOutOverlay, setShowOutOverlay] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);
// // Bhutan exchange rate (BTN per USD — 2024 reference)
// const BTN_PER_USD = 85.49;
// // Derived USD price
// const priceUSD = roomData?.price
//   ? (roomData.price / BTN_PER_USD).toFixed(2)
//   : null;

//   // ✅ Fetch Room Data from Backend
//   useEffect(() => {
//     if (!id) return;

//     const fetchRoom = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_API_URL}/rooms/rooms/${id}`);
//         const data = await res.json();
//         if (data.room) setRoomData(data.room);
//       } catch (e) {
//         console.log("Error fetching room", e);
//       }
//     };

//     if (!roomData) fetchRoom();
//   }, [id, roomData]);


//   // ✅ Media query for desktop picker
//   useEffect(() => {
//     const mq = window.matchMedia("(min-width: 768px)");
//     const update = () => setUseDesktopPicker(mq.matches);
//     update();
//     mq.addEventListener?.("change", update);
//     return () => mq.removeEventListener?.("change", update);
//   }, []);

// const fmt = (d) =>
//     d
//       ? d.toLocaleDateString(undefined, {
//           year: "numeric",
//           month: "short",
//           day: "2-digit",
//         })
//       : "";

//   const openInOverlay = () => {
//     setShowOutOverlay(false);
//     setIsClosing(false);
//     setShowInOverlay(true);
//   };

//   const openOutOverlay = () => {
//     setShowInOverlay(false);
//     setIsClosing(false);
//     setShowOutOverlay(true);
//   };

//   const closeOverlay = () => {
//     setIsClosing(true);
//     setTimeout(() => {
//       setShowInOverlay(false);
//       setShowOutOverlay(false);
//       setIsClosing(false);
//     }, 200);
//   };

//   const prevBtn = () =>
//     setImageIndex((prev) => (prev - 1 + images.length) % images.length);
//   const nextBtn = () => setImageIndex((prev) => (prev + 1) % images.length);
// // ======= ROOM AVAILABILITY ALERT =======
// //   const checkRoomAvailability = () => {
// //     // Replace this with real availability check
// //     const isAvailable = Math.random() > 0.5;

// //     if (isAvailable) {
// //   Swal.fire({
// //     html: `
// //       <p style="color:#d3ffd3; font-size:16px;">Do you want to proceed to booking details?</p>
// //     `,
// //     title: "Room is available!",
// //     icon: "success",
// //     showCancelButton: true,
// //     confirmButtonText: "Yes",
// //     cancelButtonText: "Cancel",
// //     confirmButtonColor: "#008000",
// //     cancelButtonColor: "#d33",
// //     background: "#006600",
// //     color: "#fff",
// //     iconColor: "#fff",
// //   }).then((result) => {
// //     if (result.isConfirmed) {
// //       navigate("/booking_details", {
// //         state: { checkIn, checkOut, adult, children, room, roomData },
// //       });
// //     }
// //   });
// // } else {
// //   Swal.fire({
// //     html: `
// //       <p style="color:#d3ffd3; font-size:16px;">Please select another date.</p>
// //     `,
// //     title: "Room Not Available",
// //     icon: "warning",
// //     confirmButtonText: "Ok",
// //     background: "#006600",
// //     color: "#fff",
// //     iconColor: "rgba(221, 193, 51, 1)",
// //     confirmButtonColor: "#008000",
// //   });
// // }
// // ======= ROOM AVAILABILITY ALERT =======
// const checkRoomAvailability = async () => {
//   if (!checkIn || !checkOut) {
//     Swal.fire("Please select check-in and check-out dates!", "", "warning");
//     return;
//   }

//   const roomType = roomData?.roomType;
//   const API_URL = import.meta.env.VITE_API_URL;

//   const url = `${API_URL}/rooms/${encodeURIComponent(roomType)}/availability?checkIn=${
//     checkIn.toISOString().split("T")[0]
//   }&checkOut=${checkOut.toISOString().split("T")[0]}&adults=${adult}&children=${children}&roomsRequested=${room}`;

//   try {
//     const res = await fetch(url);
//     const data = await res.json();

//     // ❌ If no rooms available
//     if (!data.roomsAvailable || data.roomsAvailable <= 0) {
//       Swal.fire({
//         html: `<p style="color:#d3ffd3; font-size:16px;">No rooms available for selected dates.</p>`,
//         title: "Room Not Available",
//         icon: "warning",
//         confirmButtonText: "Ok",
//         background: "#006600",
//         color: "#fff",
//         iconColor: "rgba(221, 193, 51, 1)",
//         confirmButtonColor: "#008000",
//       });
//       return;
//     }

//    // ✅ Rooms are available — show count only
// Swal.fire({
//   html: `
//     <p style="color:#d3ffd3; font-size:16px;">
//        ${data.roomsAvailable} rooms available.<br/><br/>
//       Do you want to proceed to booking?
//     </p>
//   `,
//   title: "Room Available!",
//   icon: "success",
//   showCancelButton: true,
//   confirmButtonText: "Yes, Continue",
//   cancelButtonText: "Cancel",
//   confirmButtonColor: "#008000",
//   cancelButtonColor: "#d33",
//   background: "#006600",
//   color: "#fff",
//   iconColor: "#fff",
// }).then((result) => {
//   if (result.isConfirmed) {
//     navigate("/booking_details", {
//       state: { checkIn, checkOut, adult, children, room, roomData },
//     });
//   }
// });

//   } catch (err) {
//     console.error("Availability check failed:", err);
//     Swal.fire("Server Error", "Unable to check room availability.", "error");
//   }
// };


//   return (
//     <section className="">
//       <BreadCrumb title="room details" />

//       <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
//         <div className="Container grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5">
//           {/* LEFT */}
//           <div className="col-span-6 md:col-span-4">
//             <div className="overflow-hidden relative group">
//               <img
//                 src={roomData.images?.[imageIndex]}
//                 alt={roomData.roomType}
//                 className="transition-all duration-500"
//               />
//               <span
//                 className="w-[40px] h-[40px] bg-white dark:bg-lightBlack hover:bg-[#006600] grid items-center justify-center absolute bottom-[45%] left-[-50px] group-hover:left-4 transition-all duration-300 cursor-pointer"
//                 onClick={prevBtn}
//               >
//                 <BsArrowLeft size={20} className="text-lightBlack dark:text-white hover:text-white" />
//               </span>
//               <span
//                 className="w-[40px] h-[40px] bg-white dark:bg-lightBlack hover:bg-[#006600] grid items-center justify-center absolute bottom-[45%] right-[-50px] group-hover:right-4 transition-all duration-300 cursor-pointer"
//                 onClick={nextBtn}
//               >
//                 <BsArrowRight size={20} className="text-lightBlack dark:text-white hover:text-white" />
//               </span>
//             </div>

//             <div className="pt-5 lg:pt-[35px] pr-3">
//               <h2 className="py-2 font-Arial text-2xl lg:text-4xl font-semibold text-lightBlack dark:text-white">
//                 {roomData.roomType}
//               </h2>

//               <p className="text-sm lg:text-base text-[#808080] dark:text-lightGray">
//                 {roomData.roomDetails}
//               </p>

//               {/* ⭐ Room Features */}
//                       <div
//               className="pt-10 2xl:pt-[60px]"
//               data-aos="zoom-in-up"
//               data-aos-duration="1000"
//             >
//               <h2
//                 className="pb-2 sm:pb-3 md:pb-4 lg:pb-[19px] 2xl:pb-6
//                 font-Arial text-[22px] sm:text-2xl md:text-3xl 2xl:text-[32px] leading-7 lg:leading-[26px] text-lightBlack dark:text-white font-semibold"
//               >
//                 Room Features
//               </h2>

//               <ul className="space-y-2 lg:space-y-3 ">
//                 {roomData?.roomFeatures?.split(",").map((item, idx) => (
//                   <li key={idx} className="flex items-center">
//                     <BsCheck2 size={16} className="text-[#006600] mr-2" />
//                     <span className="text-sm lg:text-base leading-[26px] text-[#808080] dark:text-lightGray font-normal font-Arial">
//                       {item.trim()}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>


//             <div
//               className="pt-10 2xl:pt-[60px]"
//               data-aos="zoom-in-up"
//               data-aos-duration="1000"
//             >
//               <h2
//                 className="pb-2 sm:pb-3 md:pb-4 lg:pb-[19px] 2xl:pb-6
//                 font-Arial text-[22px] sm:text-2xl md:text-3xl 2xl:text-[32px] leading-7 lg:leading-[26px] text-lightBlack dark:text-white font-semibold"
//               >
//                 Bathroom Amenities
//               </h2>

//               <ul className="space-y-2 lg:space-y-3 ">
//                 {roomData?.bathroomAmenities?.split(",").map((item, idx) => (
//                   <li key={idx} className="flex items-center">
//                     <BsCheck2 size={16} className="text-[#006600] mr-2" />
//                     <span className="text-sm lg:text-base leading-[26px] text-[#808080] dark:text-lightGray font-normal font-Arial">
//                       {item.trim()}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             </div>
//           </div>

//           {/* RIGHT SIDEBAR — uses backend fields */}
//           <div className="col-span-6 md:col-span-3 lg:col-span-2">
//             <div>
//               <div className="px-7 py-8">
//                 <h4 className="font-Arial text-xl md:text-2xl text-lightBlack dark:text-white font-semibold mb-2">
//                   Room Details
//                 </h4>

//                 <div className="grid items-center">
//                  <div className="flex items-center py-5 border-b border-[#D3D3D3] dark:border-gray">
//                     <FaDollarSign className="text-[#006600] w-5 h-5 mr-3" />
//                     <span className="text-sm lg:text-[15px] leading-[26px] text-[#808080] dark:text-lightGray font-normal font-Arial">
//                       Nu {roomData.price} (USD {priceUSD}++)
//                     </span>
//                   </div>

// {/* 
//                   <div className="flex items-center py-5 border-b border-[#D3D3D3]">
//                     <FaVectorSquare className="text-[#006600] mr-3" />
//                     <span className="text-[#808080]">{roomData.size} sqm</span>
//                   </div> */}
//                   <div className="flex items-center py-5 border-b border-[#D3D3D3]">
//                     <FaVectorSquare className="text-[#006600] mr-3" />
//                     <span className="text-[#808080]">{roomData.size} m²</span>
//                   </div>


//                   <div className="flex items-center py-5 border-b border-[#D3D3D3]">
//                     <FaUserFriends className="text-[#006600] mr-3" />
//                     <span className="text-[#808080]">{roomData.occupancy} max</span>
//                   </div>

//                   <div className="flex items-center py-5 border-b border-[#D3D3D3]">
//                     <FaBed className="text-[#006600] mr-3" />
//                     <span className="text-[#808080]">{roomData.beds} Beds</span>
//                   </div>

//                   <div className="flex items-center py-5 border-b border-[#D3D3D3]">
//                     <FaWater className="text-[#006600] mr-3" />
//                     <span className="text-[#808080]">{roomData.location}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="py-5">
//                 <button
//                   className="bg-[#006600] w-full h-10 text-white font-Arial font-semibold hover:animBg"
//                   onClick={() => setShowAvailability(true)}
//                 >
//                   Book This Room
//                 </button>
//               </div>
            


//               </div>

//             {/* Sliding Availability Panel */}
//             {showAvailability && (
//               <div>
//                 <div
//                   onClick={() => setShowAvailability(false)}
//                 ></div>

//                 <div
//                   className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-black dark:bg-lightBlack shadow-2xl z-50 transform transition-transform duration-500 ${
//                     showAvailability ? "translate-x-0" : "translate-x-full"
//                   }`}
//                 >
//                   <div className="p-6 flex flex-col h-full relative">
//                     {/* Close Button */}
//                     <button
//                       onClick={() => setShowAvailability(false)}
//                       className="absolute top-4 right-4 text-white dark:text-lightGray text-4xl font-light"
//                     >
//                       ×
//                     </button>
// <br />
// <br />


// {/* Check-in & Check-out Buttons */}
// <div className="mb-4 grid gap-4">
//   <div>
//     <label className="block mb-1 text-bg text-white dark:text-lightGray">
//       Check-in
//     </label>
//     {!useDesktopPicker ? (
//       <input
//         type="date"
//         value={checkIn ? checkIn.toISOString().split("T")[0] : ""}
//         onChange={(e) =>
//           setCheckIn(e.target.value ? new Date(e.target.value) : null)
//         }
//         className="w-full border border-white px-3 py-2 rounded text-white bg-black hover:bg-green-700 appearance-none placeholder-green-200 "
//       />
//     ) : (
//       <button
//         className="w-full text-left border border-gray-200 px-3 py-2 rounded text-white bg-black hover:bg-green-700"
//         onClick={openInOverlay}
//       >
//         {checkIn ? fmt(checkIn) : "Select date"}
//       </button>
//     )}
//   </div>
//                       <div>
//                         <label className="block mb-1 text-bg text-white dark:text-lightGray">
//                           Check-out
//                         </label>
//                         {!useDesktopPicker ? (
//                           <input
//                             type="date"
//                             value={checkOut ? checkOut.toISOString().split("T")[0] : ""}
//                             onChange={(e) =>
//                               setCheckOut(e.target.value ? new Date(e.target.value) : null)
//                             }
//                             className="w-full border border-white px-3 py-2 rounded text-white bg-black hover:bg-green-700 appearance-none placeholder-green-200 "
//                           />
//                         ) : (
//                           <button
//                             className="w-full text-left border border-white px-3 py-2 rounded text-white bg-black hover:bg-green-700"
//                             onClick={openOutOverlay}
//                           >
//                             {checkOut ? fmt(checkOut) : "Select date"}
//                           </button>
//                         )}
//                       </div>
//                     </div>

//                     {/* Guests */}
//                     <div className="mb-4 relative">
//                       <label className="block mb-1 text-bg text-white dark:text-lightGray">
//                         Guests
//                       </label>
//                       <div
//                         className="w-full border border-white px-3 py-2 rounded cursor-pointer text-white dark:text-white dark:bg-normalBlack flex justify-between items-center"
//                         onClick={() => setGuestOpen(!guestOpen)}
//                       >
//                         <span>
//                           {adult} Adult, {children} Child
//                         </span>
//                         <BiChevronDown
//                           className={`transition-transform ${guestOpen ? "rotate-180" : ""}`}
//                         />
//                       </div>
//                       {guestOpen && (
//                         <div className="absolute top-15 left-0 bg-white dark:bg-lightBlack border rounded w-full p-3 space-y-2 shadow-lg z-50 animate-slide-down">
//                           <div className="flex justify-between items-center">
//                             <span>Adults</span>
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => setAdult((v) => Math.max(1, v - 1))}
//                                 className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded -mt-1"
//                               >
//                                 -
//                               </button>
//                               <span>{adult}</span>
//                               <button
//                                 onClick={() => setAdult(adult + 1)}
//                                 className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded -mt-1"
//                               >
//                                 +
//                               </button>
//                             </div>
//                           </div>
//                           <div className="flex justify-between items-center">
//                             <span>Children</span>
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => setChildren((v) => Math.max(0, v - 1))}
//                                 className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded -mt-1"
//                               >
//                                 -
//                               </button>
//                               <span>{children}</span>
//                               <button
//                                 onClick={() => setChildren(children + 1)}
//                                 className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded -mt-1"
//                               >
//                                 +
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Rooms */}
//                     <div className="mb-4 relative">
//                       <label className="block mb-1 text-bg text-white dark:text-lightGray">
//                         Rooms
//                       </label>
//                       <div
//                         className="w-full border border-white px-3 py-2 rounded cursor-pointer text-white dark:text-white dark:bg-normalBlack flex justify-between items-center"
//                         onClick={() => setRoomOpen(!roomOpen)}
//                       >
//                         <span>{room} Room{room > 1 ? "s" : ""}</span>
//                         <BiChevronDown
//                           className={`transition-transform ${roomOpen ? "rotate-180" : ""}`}
//                         />
//                       </div>
//                       {roomOpen && (
//                         <div className="absolute top-15 left-0 bg-white dark:bg-lightBlack border rounded w-full p-3 space-y-2 shadow-lg z-50 animate-slide-down">
//                           <div className="flex justify-between items-center">
//                             <span>Rooms</span>
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => setRoom((v) => Math.max(1, v - 1))}
//                                 className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded -mt-1"
//                               >
//                                 -
//                               </button>
//                               <span>{room}</span>
//                               <button
//                                 onClick={() => setRoom(room + 1)}
//                                 className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded -mt-1"
//                               >
//                                 +
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Confirm Button */}
//                     <button
//                       onClick={checkRoomAvailability}
//                       className="mt-auto bg-[#006600] text-white font-semibold py-3 rounded hover:bg-[#004d00] transition"
//                     >
//                       Check Availability
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* ======= DESKTOP OVERLAY CALENDAR ======= */}
//             {useDesktopPicker && (showInOverlay || showOutOverlay) && (
//               <div
//                 className={`fixed inset-0 z-50 bg-black/20 flex items-center justify-center px-4 rdp-backdrop ${
//                   isClosing ? "is-closing" : ""
//                 }`}
//                 onClick={closeOverlay}
//               >
//                 <div
//                   className={`bg-white text-black rounded-2xl shadow-2xl max-w-[560px] w-full overflow-hidden rdp-card ${
//                     isClosing ? "is-closing" : ""
//                   }`}
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   {/* Header */}
//                   <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//                     <h3 className="text-lg font-semibold">
//                       {showInOverlay ? "Select Check-in" : "Select Check-out"}
//                     </h3>
//                     <button
//                       onClick={closeOverlay}
//                       className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 rounded-md text-sm"
//                     >
//                       Close
//                     </button>
//                   </div>

//                   {/* Calendar */}
//                   <div className="p-3 md:p-5">
//                     <ReactDatePicker
//                       inline
//                       monthsShown={1}
//                       calendarClassName="rdp-pill"
//                       renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
//                         <div className="rdp-pill__header">
//                           <div className="rdp-pill__title">
//                             {date.toLocaleDateString(undefined, {
//                               month: "long",
//                               year: "numeric",
//                             })}
//                           </div>
//                           <div className="rdp-pill__controls">
//                             <button
//                               type="button"
//                               className="rdp-pill__btn rdp-pill__btn--up"
//                               onClick={increaseMonth}
//                             >
//                               ▲
//                             </button>
//                             <span className="rdp-pill__divider" />
//                             <button
//                               type="button"
//                               className="rdp-pill__btn rdp-pill__btn--down"
//                               onClick={decreaseMonth}
//                             >
//                               ▼
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                       selected={showInOverlay ? checkIn : checkOut}
//                       minDate={showInOverlay ? new Date() : checkIn || new Date()}
//                       onChange={(date) => {
//                         if (showInOverlay) {
//                           setCheckIn(date);
//                           if (checkOut && date && checkOut < date) setCheckOut(null);
//                           closeOverlay();
//                         } else {
//                           setCheckOut(date);
//                           closeOverlay();
//                         }
//                       }}
//                       showDisabledMonthNavigation
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//             {/* ======= /DESKTOP OVERLAY CALENDAR ======= */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RoomDetails2;

import {
  BsArrowLeft,
  BsArrowRight,
  BsCheck2,
} from "react-icons/bs";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  FaDollarSign,
  FaVectorSquare,
  FaUserFriends,
  FaBed,
  FaWater,
} from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import "./RoomsDatepicker.css";
import FloatingSocials from "../../Shared/FloatingSocials";
import GoToTop from "../../Shared/GoToTop";

const RoomDetails2 = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState(location.state || null);
  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState(!location.state);

  const [showAvailability, setShowAvailability] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [room, setRoom] = useState(1);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [guestOpen, setGuestOpen] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);
  const [useDesktopPicker, setUseDesktopPicker] = useState(false);
  const [showInOverlay, setShowInOverlay] = useState(false);
  const [showOutOverlay, setShowOutOverlay] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const BTN_PER_USD = 85.49;
  const priceUSD = roomData?.price
    ? (roomData.price / BTN_PER_USD).toFixed(2)
    : null;

  // ✅ Fetch room details from backend
  useEffect(() => {
    if (!id || roomData) return;

    const fetchRoom = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/rooms/rooms/${id}`
        );
        const data = await res.json();
        setRoomData(data.room || data);
      } catch (error) {
        console.error("Error fetching room details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id, roomData]);

  // ✅ Responsive calendar setup
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setUseDesktopPicker(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const images = roomData?.images || [];

  const prevBtn = () =>
    setImageIndex((prev) =>
      images.length ? (prev - 1 + images.length) % images.length : 0
    );
  const nextBtn = () =>
    setImageIndex((prev) =>
      images.length ? (prev + 1) % images.length : 0
    );

  const fmt = (d) =>
    d
      ? d.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })
      : "";

  const openInOverlay = () => {
    setShowOutOverlay(false);
    setIsClosing(false);
    setShowInOverlay(true);
  };
  const openOutOverlay = () => {
    setShowInOverlay(false);
    setIsClosing(false);
    setShowOutOverlay(true);
  };
  const closeOverlay = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowInOverlay(false);
      setShowOutOverlay(false);
      setIsClosing(false);
    }, 200);
  };

  // ✅ Availability check
  const checkRoomAvailability = async () => {
    if (!checkIn || !checkOut) {
      Swal.fire("Please select check-in and check-out dates!", "", "warning");
      return;
    }

    const roomType = roomData?.roomType;
    const API_URL = import.meta.env.VITE_API_URL;

    const url = `${API_URL}/rooms/${encodeURIComponent(
      roomType
    )}/availability?checkIn=${
      checkIn.toISOString().split("T")[0]
    }&checkOut=${checkOut.toISOString().split("T")[0]}&adults=${adult}&children=${children}&roomsRequested=${room}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.roomsAvailable || data.roomsAvailable <= 0) {
        Swal.fire({
          html: `<p style="color:#d3ffd3; font-size:16px;">No rooms available for selected dates.</p>`,
          title: "Room Not Available",
          icon: "warning",
          confirmButtonText: "Ok",
          background: "#006600",
          color: "#fff",
          iconColor: "rgba(221, 193, 51, 1)",
          confirmButtonColor: "#008000",
        });
        return;
      }

      Swal.fire({
        html: `
          <p style="color:#d3ffd3; font-size:16px;">
             ${data.roomsAvailable} rooms available.<br/><br/>
            Do you want to proceed to booking?
          </p>
        `,
        title: "Room Available!",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Yes, Continue",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#008000",
        cancelButtonColor: "#d33",
        background: "#006600",
        color: "#fff",
        iconColor: "#fff",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/booking_details", {
            state: { checkIn, checkOut, adult, children, room, roomData },
          });
        }
      });
    } catch (err) {
      console.error("Availability check failed:", err);
      Swal.fire("Server Error", "Unable to check room availability.", "error");
    }
  };

  // ✅ Show loading or error
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Loading room details...
      </div>
    );
  }

  if (!roomData) {
    return (
      <div className="text-center py-20 text-red-600 text-lg">
        Room not found.
      </div>
    );
  }

  // ✅ UI rendering
  return (
    <section>
      <BreadCrumb title="room details" />

      <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
        <div className="Container grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5">
          {/* LEFT SECTION */}
          <div className="col-span-6 md:col-span-4">
            <div className="overflow-hidden relative group">
              <img
                src={images[imageIndex] || "/images/home/room1.jpeg"}
                alt={roomData?.roomType || "Room"}
                className="transition-all duration-500"
              />
              <span
                className="w-[40px] h-[40px] bg-white dark:bg-lightBlack hover:bg-[#006600] grid items-center justify-center absolute bottom-[45%] left-[-50px] group-hover:left-4 transition-all duration-300 cursor-pointer"
                onClick={prevBtn}
              >
                <BsArrowLeft
                  size={20}
                  className="text-lightBlack dark:text-white hover:text-white"
                />
              </span>
              <span
                className="w-[40px] h-[40px] bg-white dark:bg-lightBlack hover:bg-[#006600] grid items-center justify-center absolute bottom-[45%] right-[-50px] group-hover:right-4 transition-all duration-300 cursor-pointer"
                onClick={nextBtn}
              >
                <BsArrowRight
                  size={20}
                  className="text-lightBlack dark:text-white hover:text-white"
                />
              </span>
            </div>

            {/* Room info */}
            <div className="pt-5 lg:pt-[35px] pr-3">
              <h2 className="py-2 font-Arial text-2xl lg:text-4xl font-semibold text-lightBlack dark:text-white">
                {roomData?.roomType}
              </h2>

              <p className="text-sm lg:text-base text-[#808080] dark:text-lightGray">
                {roomData?.roomDetails}
              </p>

              {/* Room Features */}
              <div className="pt-10" data-aos="zoom-in-up">
                <h2 className="pb-3 text-2xl font-semibold text-lightBlack dark:text-white">
                  Room Features
                </h2>
                <ul className="space-y-2">
                  {roomData?.roomFeatures
                    ?.split(",")
                    .map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <BsCheck2 className="text-[#006600] mr-2" />
                        <span className="text-sm text-[#808080] dark:text-lightGray">
                          {item.trim()}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Bathroom Amenities */}
              <div className="pt-10" data-aos="zoom-in-up">
                <h2 className="pb-3 text-2xl font-semibold text-lightBlack dark:text-white">
                  Bathroom Amenities
                </h2>
                <ul className="space-y-2">
                  {roomData?.bathroomAmenities
                    ?.split(",")
                    .map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <BsCheck2 className="text-[#006600] mr-2" />
                        <span className="text-sm text-[#808080] dark:text-lightGray">
                          {item.trim()}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <div className="px-7 py-8">
              <h4 className="font-Arial text-2xl text-lightBlack dark:text-white font-semibold mb-2">
                Room Details
              </h4>

              <div className="grid items-center">
                <div className="flex items-center py-5 border-b border-[#D3D3D3]">
                  <FaDollarSign className="text-[#006600] w-5 h-5 mr-3" />
                  <span className="text-sm text-[#808080]">
                    Nu {roomData?.price} (USD {priceUSD}++)
                  </span>
                </div>

                <div className="flex items-center py-5 border-b border-[#D3D3D3]">
                  <FaVectorSquare className="text-[#006600] mr-3" />
                  <span className="text-[#808080]">{roomData?.size} m²</span>
                </div>

                <div className="flex items-center py-5 border-b border-[#D3D3D3]">
                  <FaUserFriends className="text-[#006600] mr-3" />
                  <span className="text-[#808080]">{roomData?.occupancy} max</span>
                </div>

                <div className="flex items-center py-5 border-b border-[#D3D3D3]">
                  <FaBed className="text-[#006600] mr-3" />
                  <span className="text-[#808080]">{roomData?.beds} Beds</span>
                </div>

                <div className="flex items-center py-5 border-b border-[#D3D3D3]">
                  <FaWater className="text-[#006600] mr-3" />
                  <span className="text-[#808080]">{roomData?.location}</span>
                </div>
              </div>

              <div className="py-5">
                <button
                  className="bg-[#006600] w-full h-10 text-white font-semibold hover:opacity-90"
                  onClick={() => setShowAvailability(true)}
                >
                  Book This Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====== Sliding Availability Panel ====== */}
      {showAvailability && (
        <div>
          <div
            onClick={() => setShowAvailability(false)}
          ></div>

          <div
            className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-black dark:bg-lightBlack shadow-2xl z-50 transform transition-transform duration-500 ${
              showAvailability ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-6 flex flex-col h-full relative">
              <button
                onClick={() => setShowAvailability(false)}
                className="absolute top-4 right-4 text-white text-4xl font-light"
              >
                ×
              </button>

              {/* Check-in/out */}
              <div className="mb-4 grid gap-4">
                <div>
                  <label className="block mb-1 text-white">Check-in</label>
                  <input
                    type="date"
                    value={checkIn ? checkIn.toISOString().split("T")[0] : ""}
                    onChange={(e) =>
                      setCheckIn(e.target.value ? new Date(e.target.value) : null)
                    }
                    className="w-full border border-white px-3 py-2 rounded text-white bg-black hover:bg-green-700"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-white">Check-out</label>
                  <input
                    type="date"
                    value={checkOut ? checkOut.toISOString().split("T")[0] : ""}
                    onChange={(e) =>
                      setCheckOut(e.target.value ? new Date(e.target.value) : null)
                    }
                    className="w-full border border-white px-3 py-2 rounded text-white bg-black hover:bg-green-700"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="mb-4 relative">
                <label className="block mb-1 text-white">Guests</label>
                <div
                  className="w-full border border-white px-3 py-2 rounded cursor-pointer text-white flex justify-between items-center"
                  onClick={() => setGuestOpen(!guestOpen)}
                >
                  <span>
                    {adult} Adult, {children} Child
                  </span>
                  <BiChevronDown
                    className={`transition-transform ${
                      guestOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {guestOpen && (
                  <div className="absolute bg-white dark:bg-lightBlack border rounded w-full p-3 space-y-2 shadow-lg z-50">
                    <div className="flex justify-between items-center">
                      <span>Adults</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setAdult((v) => Math.max(1, v - 1))}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          -
                        </button>
                        <span>{adult}</span>
                        <button
                          onClick={() => setAdult(adult + 1)}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Children</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setChildren((v) => Math.max(0, v - 1))}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          -
                        </button>
                        <span>{children}</span>
                        <button
                          onClick={() => setChildren(children + 1)}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rooms */}
              <div className="mb-4 relative">
                <label className="block mb-1 text-white">Rooms</label>
                <div
                  className="w-full border border-white px-3 py-2 rounded cursor-pointer text-white flex justify-between items-center"
                  onClick={() => setRoomOpen(!roomOpen)}
                >
                  <span>{room} Room{room > 1 ? "s" : ""}</span>
                  <BiChevronDown
                    className={`transition-transform ${
                      roomOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {roomOpen && (
                  <div className="absolute bg-white dark:bg-lightBlack border rounded w-full p-3 space-y-2 shadow-lg z-50">
                    <div className="flex justify-between items-center">
                      <span>Rooms</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setRoom((v) => Math.max(1, v - 1))}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          -
                        </button>
                        <span>{room}</span>
                        <button
                          onClick={() => setRoom(room + 1)}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={checkRoomAvailability}
                className="mt-auto bg-[#006600] text-white font-semibold py-3 rounded hover:bg-[#004d00] transition"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Floating buttons */}
{!showAvailability && <FloatingSocials />}
{!showAvailability && <GoToTop />}

    </section>
  );
};

export default RoomDetails2;
