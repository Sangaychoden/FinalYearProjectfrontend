
// // // import { useEffect, useState, useRef } from "react";
// // // import { Link, useLocation } from "react-router-dom";
// // // import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
// // // import { BiChevronDown } from "react-icons/bi";
// // // import { FaBed } from "react-icons/fa";
// // // import { BsArrowRight } from "react-icons/bs";
// // // import ReactDatePicker from "react-datepicker";
// // // import "react-datepicker/dist/react-datepicker.css";
// // // import "./RoomsDatepicker.css";

// // // const AvailableRooms = () => {
// // //   const location = useLocation();
// // //   const {
// // //     checkIn: initialCheckIn,
// // //     checkOut: initialCheckOut,
// // //     room: initialRoom,
// // //     adult: initialAdult,
// // //     children: initialChildren,
// // //   } = location.state || {};

// // //   const [checkIn, setCheckIn] = useState(initialCheckIn ? new Date(initialCheckIn) : null);
// // //   const [checkOut, setCheckOut] = useState(initialCheckOut ? new Date(initialCheckOut) : null);
// // //   const [roomCount, setRoomCount] = useState(initialRoom || 1);
// // //   const [adult, setAdult] = useState(initialAdult || 1);
// // //   const [children, setChildren] = useState(initialChildren || 0);
// // //   const [open, setOpen] = useState(false);
// // //   const [guestOpen, setGuestOpen] = useState(false);

// // //   const [useDesktopPicker, setUseDesktopPicker] = useState(false);
// // //   const [showInOverlay, setShowInOverlay] = useState(false);
// // //   const [showOutOverlay, setShowOutOverlay] = useState(false);
// // //   const [isClosing, setIsClosing] = useState(false);

// // //   const [availableRooms, setAvailableRooms] = useState([]);

// // //   const roomRef = useRef(null);
// // // const guestRef = useRef(null);


// // //   // ✅ Detect desktop screen
// // //   useEffect(() => {
// // //     const mq = window.matchMedia("(min-width: 768px)");
// // //     const update = () => setUseDesktopPicker(mq.matches);
// // //     update();
// // //     mq.addEventListener?.("change", update);
// // //     return () => mq.removeEventListener?.("change", update);
// // //   }, []);

// // //   // ✅ Format date to yyyy-mm-dd
// // //   const formatDate = (date) => (date ? date.toISOString().split("T")[0] : "");

// // //   // ✅ Overlay controls
// // //   const openInOverlay = () => {
// // //     setShowOutOverlay(false);
// // //     setIsClosing(false);
// // //     setShowInOverlay(true);
// // //   };
// // //   const openOutOverlay = () => {
// // //     setShowInOverlay(false);
// // //     setIsClosing(false);
// // //     setShowOutOverlay(true);
// // //   };
// // //   const closeOverlay = () => {
// // //     setIsClosing(true);
// // //     setTimeout(() => {
// // //       setShowInOverlay(false);
// // //       setShowOutOverlay(false);
// // //       setIsClosing(false);
// // //     }, 200);
// // //   };

// // //   // ✅ Fetch available rooms
// // //   useEffect(() => {
// // //     const fetchAvailableRooms = async () => {
// // //       try {
// // //         if (!checkIn || !checkOut) return;

// // //         const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
// // //         const url = `${API_URL}/rooms/available?checkIn=${formatDate(
// // //           checkIn
// // //         )}&checkOut=${formatDate(checkOut)}&adults=${adult}&children=${children}&roomsRequested=${roomCount}`;

// // //         const response = await fetch(url);
// // //         const data = await response.json();

// // //         if (data.availableRooms) {
// // //           setAvailableRooms(data.availableRooms);
// // //         } else {
// // //           setAvailableRooms([]);
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching available rooms:", error);
// // //       }
// // //     };

// // //     fetchAvailableRooms();
// // //   }, [checkIn, checkOut, adult, children, roomCount]);

// // //   useEffect(() => {
// // //   const handleClickOutside = (event) => {
// // //     if (roomRef.current && !roomRef.current.contains(event.target)) {
// // //       setOpen(false);
// // //     }
// // //     if (guestRef.current && !guestRef.current.contains(event.target)) {
// // //       setGuestOpen(false);
// // //     }
// // //   };

// // //   document.addEventListener("mousedown", handleClickOutside);
// // //   return () => document.removeEventListener("mousedown", handleClickOutside);
// // // }, []);

// // //   return (
// // //     <div className="bg-whiteSmoke dark:bg-white font-Inter">
// // //       <BreadCrumb title="AVAILABLE ROOMS" home="/" />

// // //       {/* ===== BOOKING FILTER BAR ===== */}
// // //       <div
// // //           className="Container-Hero bg-lightBlack dark:bg-normalBlack grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 items-center justify-center font-Arial py-3 lg:py-4 xl:py-5 2xl:py-6 border-t-[3px] border-t-khaki 
// // //                      mx-auto  shadow-xl relative z-20 -mt-20 px-4 sm:px-6 lg:px-10 z-[1]"
// // //       >
// // //         {/* Check In */}
// // //         <div className="p-3">
// // //           <p className="text-sm text-[#A9A9A9] ml-3">Check In</p>
// // //           {!useDesktopPicker ? (
// // // <input
// // //   type="date"
// // //   className="border-none bg-transparent text-white outline-none text-sm lg:text-base focus:ring-transparent"
// // //   required
// // //   min={new Date().toISOString().split("T")[0]} // restrict past dates
// // //   onChange={(e) =>
// // //     setCheckIn(e.target.value ? new Date(e.target.value) : null)
// // //   }
// // // />
// // //           ) : (
// // //             <button
// // //               type="button"
// // //               onClick={openInOverlay}
// // //               className="w-full text-left text-white text-sm lg:text-base border border-white/20 px-3 py-2 mt-[2px]"
// // //             >
// // //               {checkIn ? formatDate(checkIn) : "Select date"}
// // //             </button>
// // //           )}
// // //         </div>

// // //         {/* Check Out */}
// // //         <div className="p-3">
// // //           <p className="text-sm text-[#A9A9A9] ml-3">Check Out</p>
// // //           {!useDesktopPicker ? (
// // // <input
// // //   type="date"
// // //   className="border-none bg-transparent text-white outline-none text-sm lg:text-base focus:ring-transparent"
// // //   required
// // //   min={checkIn ? checkIn.toISOString().split("T")[0] : new Date().toISOString().split("T")[0]} // restrict before check-in
// // //   onChange={(e) =>
// // //     setCheckOut(e.target.value ? new Date(e.target.value) : null)
// // //   }
// // // />
// // //           ) : (
// // //             <button
// // //               type="button"
// // //               onClick={openOutOverlay}
// // //               className="w-full text-left text-white text-sm lg:text-base border border-white/20 px-3 py-2 mt-[2px]"
// // //             >
// // //               {checkOut ? formatDate(checkOut) : "Select date"}
// // //             </button>
// // //           )}
// // //         </div>

// // //         {/* Rooms Dropdown */}
// // //         <div className="p-3 relative" ref={roomRef}>
// // //           <div className="text-white px-3 py-2 cursor-pointer" onClick={() => setOpen(!open)}>
// // //             <span className="flex items-center justify-between text-sm text-[#A9A9A9]">
// // //               Rooms <BiChevronDown />
// // //             </span>
// // //             <div className="pt-[10px] text-sm sm:text-base">{roomCount} Room</div>
// // //           </div>
// // //           {open && (
// // //             <div className="absolute bg-white text-black w-60 mt-2 shadow-lg z-20 py-2">
// // //               <div className="px-5 py-2 flex justify-between items-center">
// // //                 <div>{roomCount} Room</div>
// // //                 <div className="flex gap-2">
// // //                   <button
// // //                     className="w-5 h-5 bg-khaki text-white"
// // //                     onClick={() => setRoomCount(roomCount + 1)}
// // //                   >
// // //                     +
// // //                   </button>
// // //                   <button
// // //                     className="w-5 h-5 bg-khaki text-white"
// // //                     onClick={() => setRoomCount((v) => Math.max(1, v - 1))}
// // //                   >
// // //                     -
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Guests Dropdown */}
// // //         <div className="p-3 relative" ref={guestRef}>
// // //           <div className="text-white px-3 py-2 cursor-pointer" onClick={() => setGuestOpen(!guestOpen)}>
// // //             <span className="flex items-center justify-between text-sm text-[#A9A9A9]">
// // //               Guests <BiChevronDown />
// // //             </span>
// // //             <div className="pt-[10px] text-sm sm:text-base">
// // //               {adult} Adult, {children} Child
// // //             </div>
// // //           </div>
// // //           {guestOpen && (
// // //             <div className="absolute bg-white text-black w-60 mt-2 shadow-lg z-20 py-2">
// // //               <div className="px-5 py-2 flex justify-between items-center">
// // //                 <div>{adult} Adult</div>
// // //                 <div className="flex gap-2">
// // //                   <button className="w-5 h-5 bg-khaki text-white" onClick={() => setAdult(adult + 1)}>
// // //                     +
// // //                   </button>
// // //                   <button
// // //                     className="w-5 h-5 bg-khaki text-white"
// // //                     onClick={() => setAdult((v) => Math.max(1, v - 1))}
// // //                   >
// // //                     -
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //               <div className="px-5 py-2 flex justify-between items-center">
// // //                 <div>{children} Child</div>
// // //                 <div className="flex gap-2">
// // //                   <button className="w-5 h-5 bg-khaki text-white" onClick={() => setChildren(children + 1)}>
// // //                     +
// // //                   </button>
// // //                   <button
// // //                     className="w-5 h-5 bg-khaki text-white"
// // //                     onClick={() => setChildren((v) => Math.max(0, v - 1))}
// // //                   >
// // //                     -
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Check Availability Button */}
// // //         <button
// // //           onClick={() => {
// // //             setCheckIn(checkIn);
// // //             setCheckOut(checkOut);
// // //           }}
// // //           className="col-span-2 md:col-span-1 w-full h-10 lg:h-[50px] text-[15px] bg-khaki border border-khaki text-white relative z-10 hover:bg-opacity-90 transition-all duration-300"
// // //         >
// // //           Check Availability
// // //         </button>
// // //       </div>

// // //       {/* ===== DESKTOP OVERLAY CALENDAR ===== */}
// // //       {useDesktopPicker && (showInOverlay || showOutOverlay) && (
// // //         <div
// // //           className="fixed inset-0 z-[9999] bg-black/20 flex items-center justify-center px-4"
// // //           onClick={closeOverlay}
// // //         >
// // //           <div
// // //             className="bg-white text-black shadow-2xl max-w-[560px] w-full overflow-visible"
// // //             onClick={(e) => e.stopPropagation()}
// // //           >
// // //             <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
// // //               <h3 className="text-lg font-semibold">
// // //                 {showInOverlay ? "Select Check-in" : "Select Check-out"}
// // //               </h3>
// // //               <button
// // //                 onClick={closeOverlay}
// // //                 className="px-3 py-1.5 border border-[#D1D5DB] hover:bg-gray-50 text-sm"
// // //               >
// // //                 Close
// // //               </button>
// // //             </div>
// // //             <div className="p-3 md:p-5">
// // // <ReactDatePicker
// // //   inline
// // //   monthsShown={1}
// // //   calendarClassName="rdp-pill"
// // //   selected={showInOverlay ? checkIn : checkOut}
// // //   minDate={showInOverlay ? new Date() : checkIn || new Date()} // same logic
// // //   onChange={(date) => {
// // //     if (showInOverlay) {
// // //       setCheckIn(date);
// // //       if (checkOut && date && checkOut < date) setCheckOut(null);
// // //       closeOverlay();
// // //     } else {
// // //       setCheckOut(date);
// // //       closeOverlay();
// // //     }
// // //   }}
// // //   showDisabledMonthNavigation              />
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* ===== AVAILABLE ROOMS ===== */}
// // //       <div
// // //         className="bg-cover bg-center bg-no-repeat py-20 2xl:py-[120px]"
// // //         style={{ backgroundImage: "url('/images/home/background.png')" }}
// // //       >
// // //         <div className="Container">
// // //           <div className="mt-7 grid items-center grid-cols-1 md:grid-cols-2 gap-8 md:gap-[40px]">
// // //             {availableRooms.length === 0 ? (
// // //               <div className="col-span-full text-center pt-10 pb-20 uppercase text-[#6B7280] text-lg sm:text-xl md:text-2xl lg:text-3xl">
// // //                 No Rooms Available
// // //               </div>
// // //             ) : (
// // //               availableRooms.map((r, index) => (
// // //                 <div
// // //                   key={index}
// // //                   className="overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white border border-gray-200"
// // //                 >
// // //                   <div className="relative overflow-hidden">
// // //                     <img
// // //                       src={r.images?.[0] || "/images/home/room1.jpeg"}
// // //                       alt={r.roomType}
// // //                       className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
// // //                     />
// // //                     <div className="px-5 py-2 inline-flex bg-khaki text-sm text-white absolute top-[10px] right-[10px] z-10">
// // //                       Nu {r.price.toLocaleString()}
// // //                     </div>

// // //                  <Link
// // //   to={`/room_details/${r._id}`} // ✅ dynamic MongoDB ID
// // //   state={{
// // //     room: r, // pass full room object for instant access
// // //     selectedInDate: formatDate(checkIn),
// // //     selectedOutDate: formatDate(checkOut),
// // //     adult,
// // //     children,
// // //     roomCount,
// // //   }}
// // // >
// // //   <button className="view-details-btn flex items-center justify-center text-[15px] leading-[38px] bg-black bg-opacity-90 hover:bg-opacity-100 absolute bottom-0 -left-40 px-6 py-1 text-white group-hover:left-0 transition-all duration-500 z-10">
// // //     View Details <BsArrowRight className="w-4 h-4 ml-2 text-white" />
// // //   </button>
// // // </Link>

// // //                   </div>

// // //                   <div className="font-inter border-t border-gray-200">
// // //                     <div className="py-6 px-5 sm:px-6 md:px-8 lg:px-[30px]">
// // //                       <h4 className="text-sm text-khaki uppercase font-semibold">
// // //                         {r.location}
// // //                       </h4>
// // //                       <h2 className="text-2xl font-semibold text-black py-4 hover:text-khaki transition">
// // //                         {r.roomType}
// // //                       </h2>
// // //                       <p className="text-sm text-gray-800">
// // //                         {r.size} SQ.FT | {r.occupancy} Guests
// // //                       </p>
// // //                       <p className="mt-2 text-[14px] text-gray-600">
// // //                         <strong>{r.roomsAvailable}</strong> rooms available
// // //                       </p>
// // //                     </div>
// // //                     <div className="border-t border-gray-200 py-5 px-5 flex items-center justify-between">
// // //                       <span className="flex items-center text-gray-800">
// // //                         <FaBed className="text-gray-800 text-xl" />
// // //                         <span className="ml-[10px] font-medium">
// // //                           {r.beds} {r.beds > 1 ? "King Beds" : "King Bed"}
// // //                         </span>
// // //                       </span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AvailableRooms;
// // import { useEffect, useState, useRef } from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
// // import { BiChevronDown } from "react-icons/bi";
// // import { FaBed } from "react-icons/fa";
// // import { BsArrowRight } from "react-icons/bs";
// // import ReactDatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import "./RoomsDatepicker.css";
// // import { FiCalendar } from "react-icons/fi";

// // const AvailableRooms = () => {
// //   const location = useLocation();
// //   const {
// //     checkIn: initialCheckIn,
// //     checkOut: initialCheckOut,
// //     room: initialRoom,
// //     adult: initialAdult,
// //     children: initialChildren,
// //   } = location.state || {};

// //   const [checkIn, setCheckIn] = useState(initialCheckIn ? new Date(initialCheckIn) : null);
// //   const [checkOut, setCheckOut] = useState(initialCheckOut ? new Date(initialCheckOut) : null);
// //   const [roomCount, setRoomCount] = useState(initialRoom || 1);
// //   const [adult, setAdult] = useState(initialAdult || 1);
// //   const [children, setChildren] = useState(initialChildren || 0);
// //   const [open, setOpen] = useState(false);
// //   const [guestOpen, setGuestOpen] = useState(false);

// //   const [showInOverlay, setShowInOverlay] = useState(false);
// //   const [showOutOverlay, setShowOutOverlay] = useState(false);
// //   const [isClosing, setIsClosing] = useState(false);

// //   const [availableRooms, setAvailableRooms] = useState([]);

// //   const roomRef = useRef(null);
// //   const guestRef = useRef(null);

// //   // Format date to yyyy-mm-dd
// //   const formatDate = (date) => (date ? date.toISOString().split("T")[0] : "");

// //   // Overlay controls
// //   const openInOverlay = () => {
// //     setShowOutOverlay(false);
// //     setIsClosing(false);
// //     setShowInOverlay(true);
// //   };
// //   const openOutOverlay = () => {
// //     setShowInOverlay(false);
// //     setIsClosing(false);
// //     setShowOutOverlay(true);
// //   };
// //   const closeOverlay = () => {
// //     setIsClosing(true);
// //     setTimeout(() => {
// //       setShowInOverlay(false);
// //       setShowOutOverlay(false);
// //       setIsClosing(false);
// //     }, 200);
// //   };

// //   // Fetch available rooms
// //   useEffect(() => {
// //     const fetchAvailableRooms = async () => {
// //       try {
// //         if (!checkIn || !checkOut) return;

// //         const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
// //         const url = `${API_URL}/rooms/available?checkIn=${formatDate(
// //           checkIn
// //         )}&checkOut=${formatDate(checkOut)}&adults=${adult}&children=${children}&roomsRequested=${roomCount}`;

// //         const response = await fetch(url);
// //         const data = await response.json();

// //         if (data.availableRooms) {
// //           setAvailableRooms(data.availableRooms);
// //         } else {
// //           setAvailableRooms([]);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching available rooms:", error);
// //       }
// //     };

// //     fetchAvailableRooms();
// //   }, [checkIn, checkOut, adult, children, roomCount]);

// //   // Close dropdowns when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (roomRef.current && !roomRef.current.contains(event.target)) {
// //         setOpen(false);
// //       }
// //       if (guestRef.current && !guestRef.current.contains(event.target)) {
// //         setGuestOpen(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   return (
// //     <div className="bg-whiteSmoke dark:bg-white font-Inter">
// //       <BreadCrumb title="AVAILABLE ROOMS" home="/" />

// //       {/* ===== FILTER BAR ===== */}
// //       <div
// //         className="Container-Hero bg-lightBlack dark:bg-normalBlack grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 
// //                    items-center font-Arial py-3 lg:py-4 xl:py-5 border-t-[3px] border-t-khaki mx-auto shadow-xl 
// //                    relative z-20 -mt-20 px-4 sm:px-6 lg:px-10"
// //       >
// //         {/* Check In */}
// //         <div className="p-3">
// //           <p className="text-sm text-[#A9A9A9] ml-3">Check In</p>

// //           <button
// //             type="button"
// //             onClick={openInOverlay}
// //             className="w-full text-white text-sm lg:text-base border border-white/20 px-3 py-2 mt-[2px] 
// //                        flex items-center justify-between"
// //           >
// //             <span>{checkIn ? formatDate(checkIn) : "dd-mm-yyyy"}</span>
// //             <FiCalendar className="text-white opacity-80" size={18} />
// //           </button>
// //         </div>

// //         {/* Check Out */}
// //         <div className="p-3">
// //           <p className="text-sm text-[#A9A9A9] ml-3">Check Out</p>

// //           <button
// //             type="button"
// //             onClick={openOutOverlay}
// //             className="w-full text-white text-sm lg:text-base border border-white/20 px-3 py-2 mt-[2px] 
// //                        flex items-center justify-between"
// //           >
// //             <span>{checkOut ? formatDate(checkOut) : "dd-mm-yyyy"}</span>
// //             <FiCalendar className="text-white opacity-80" size={18} />
// //           </button>
// //         </div>

// //         {/* Rooms Dropdown */}
// //         <div className="p-3 relative" ref={roomRef}>
// //           <div
// //             className="text-white px-3 py-2 cursor-pointer"
// //             onClick={() => setOpen(!open)}
// //           >
// //             <span className="flex items-center justify-between text-sm text-[#A9A9A9]">
// //               Rooms <BiChevronDown />
// //             </span>
// //             <div className="pt-[10px] text-sm sm:text-base">
// //               {roomCount} Room
// //             </div>
// //           </div>

// //           {open && (
// //             <div className="absolute bg-white text-black w-60 mt-2 shadow-lg z-20 py-2">
// //               <div className="px-5 py-2 flex justify-between items-center">
// //                 <div>{roomCount} Room</div>
// //                 <div className="flex gap-2">
// //                   <button
// //                     className="w-5 h-5 bg-khaki text-white"
// //                     onClick={() => setRoomCount(roomCount + 1)}
// //                   >
// //                     +
// //                   </button>
// //                   <button
// //                     className="w-5 h-5 bg-khaki text-white"
// //                     onClick={() => setRoomCount((v) => Math.max(1, v - 1))}
// //                   >
// //                     -
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Guests Dropdown */}
// //         <div className="p-3 relative" ref={guestRef}>
// //           <div
// //             className="text-white px-3 py-2 cursor-pointer"
// //             onClick={() => setGuestOpen(!guestOpen)}
// //           >
// //             <span className="flex items-center justify-between text-sm text-[#A9A9A9]">
// //               Guests <BiChevronDown />
// //             </span>
// //             <div className="pt-[10px] text-sm sm:text-base">
// //               {adult} Adult, {children} Child
// //             </div>
// //           </div>

// //           {guestOpen && (
// //             <div className="absolute bg-white text-black w-60 mt-2 shadow-lg z-20 py-2">
// //               <div className="px-5 py-2 flex justify-between items-center">
// //                 <div>{adult} Adult</div>
// //                 <div className="flex gap-2">
// //                   <button
// //                     className="w-5 h-5 bg-khaki text-white"
// //                     onClick={() => setAdult(adult + 1)}
// //                   >
// //                     +
// //                   </button>
// //                   <button
// //                     className="w-5 h-5 bg-khaki text-white"
// //                     onClick={() => setAdult((v) => Math.max(1, v - 1))}
// //                   >
// //                     -
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="px-5 py-2 flex justify-between items-center">
// //                 <div>{children} Child</div>
// //                 <div className="flex gap-2">
// //                   <button
// //                     className="w-5 h-5 bg-khaki text-white"
// //                     onClick={() => setChildren(children + 1)}
// //                   >
// //                     +
// //                   </button>
// //                   <button
// //                     className="w-5 h-5 bg-khaki text-white"
// //                     onClick={() => setChildren((v) => Math.max(0, v - 1))}
// //                   >
// //                     -
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Check Availability */}
// //         <button
// //           onClick={() => {
// //             setCheckIn(checkIn);
// //             setCheckOut(checkOut);
// //           }}
// //           className="col-span-2 md:col-span-1 w-full h-10 lg:h-[50px] text-[15px] bg-khaki border border-khaki 
// //                      text-white hover:bg-opacity-90 transition-all duration-300"
// //         >
// //           Check Availability
// //         </button>
// //       </div>

// //       {/* ===== DATE OVERLAY ===== */}
// //       {(showInOverlay || showOutOverlay) && (
// //         <div
// //           className="fixed inset-0 z-[9999] bg-black/20 flex items-center justify-center px-4"
// //           onClick={closeOverlay}
// //         >
// //           <div
// //             className="bg-white text-black shadow-2xl max-w-[560px] w-full overflow-visible"
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
// //               <h3 className="text-lg font-semibold">
// //                 {showInOverlay ? "Select Check-in" : "Select Check-out"}
// //               </h3>
// //               <button
// //                 onClick={closeOverlay}
// //                 className="px-3 py-1.5 border border-[#D1D5DB] hover:bg-gray-50 text-sm"
// //               >
// //                 Close
// //               </button>
// //             </div>

// //             <div className="p-3 md:p-5">
// //               <ReactDatePicker
// //                 inline
// //                 monthsShown={1}
// //                 calendarClassName="rdp-pill"
// //                 selected={showInOverlay ? checkIn : checkOut}
// //                 minDate={showInOverlay ? new Date() : checkIn || new Date()}
// //                 onChange={(date) => {
// //                   if (showInOverlay) {
// //                     setCheckIn(date);
// //                     if (checkOut && date && checkOut < date) setCheckOut(null);
// //                     closeOverlay();
// //                   } else {
// //                     setCheckOut(date);
// //                     closeOverlay();
// //                   }
// //                 }}
// //                 showDisabledMonthNavigation
// //               />
// //             </div>
// //           </div>    
// //         </div>
// //       )}

// //       {/* ===== AVAILABLE ROOMS LIST ===== */}
// //       <div
// //         className="bg-cover bg-center bg-no-repeat py-20 2xl:py-[120px]"
// //         style={{ backgroundImage: "url('/images/home/background.png')" }}
// //       >
// //         <div className="Container">
// //           <div className="mt-7 grid items-center grid-cols-1 md:grid-cols-2 gap-8 md:gap-[40px]">

// //             {availableRooms.length === 0 ? (
// //               <div className="col-span-full text-center pt-10 pb-20 uppercase text-[#6B7280] text-lg sm:text-xl md:text-2xl lg:text-3xl">
// //                 No Rooms Available
// //               </div>
// //             ) : (
// //               availableRooms.map((r, index) => (
// //                 <div
// //                   key={index}
// //                   className="overflow-hidden group cursor-pointer transform transition-all duration-500 
// //                              hover:scale-105 hover:shadow-2xl bg-white border border-gray-200"
// //                 >
// //                   <div className="relative overflow-hidden">
// //                     <img
// //                       src={r.images?.[0] || "/images/home/room1.jpeg"}
// //                       alt={r.roomType}
// //                       className="w-full h-full object-cover transition-all duration-700 
// //                                  group-hover:scale-110 group-hover:opacity-80"
// //                     />

// //                     <div className="px-5 py-2 inline-flex bg-khaki text-sm text-white absolute top-[10px] right-[10px] z-10">
// //                       Nu {r.price.toLocaleString()}
// //                     </div>

// //                     <Link
// //                       to={`/room_details/${r._id}`}
// //                       state={{
// //                         room: r,
// //                         selectedInDate: formatDate(checkIn),
// //                         selectedOutDate: formatDate(checkOut),
// //                         adult,
// //                         children,
// //                         roomCount,
// //                       }}
// //                     >
// //                       <button className="view-details-btn flex items-center justify-center text-[15px] 
// //                                          leading-[38px] bg-black bg-opacity-90 hover:bg-opacity-100 
// //                                          absolute bottom-0 -left-40 px-6 py-1 text-white group-hover:left-0 
// //                                          transition-all duration-500 z-10">
// //                         View Details <BsArrowRight className="w-4 h-4 ml-2 text-white" />
// //                       </button>
// //                     </Link>
// //                   </div>

// //                   <div className="font-inter border-t border-gray-200">
// //                     <div className="py-6 px-5 sm:px-6 md:px-8 lg:px-[30px]">
// //                       <h4 className="text-sm text-khaki uppercase font-semibold">
// //                         {r.location}
// //                       </h4>
// //                       <h2 className="text-2xl font-semibold text-black py-4 hover:text-khaki transition">
// //                         {r.roomType}
// //                       </h2>
// //                       <p className="text-sm text-gray-800">
// //                         {r.size} SQ.FT | {r.occupancy} Guests
// //                       </p>
// //                       <p className="mt-2 text-[14px] text-gray-600">
// //                         <strong>{r.roomsAvailable}</strong> rooms available
// //                       </p>
// //                     </div>

// //                     <div className="border-t border-gray-200 py-5 px-5 flex items-center justify-between">
// //                       <span className="flex items-center text-gray-800">
// //                         <FaBed className="text-gray-800 text-xl" />
// //                         <span className="ml-[10px] font-medium">
// //                           {r.beds} {r.beds > 1 ? "King Beds" : "King Bed"}
// //                         </span>
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))
// //             )}

// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AvailableRooms;
// import { useEffect, useState, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
// import { BiChevronDown } from "react-icons/bi";
// import { FaBed } from "react-icons/fa";
// import { BsArrowRight } from "react-icons/bs";
// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./RoomsDatepicker.css";
// import { FiCalendar } from "react-icons/fi";

// const AvailableRooms = () => {
//   const location = useLocation();
//   const {
//     checkIn: initialCheckIn,
//     checkOut: initialCheckOut,
//     room: initialRoom,
//     adult: initialAdult,
//     children: initialChildren,
//   } = location.state || {};

//   const [checkIn, setCheckIn] = useState(initialCheckIn ? new Date(initialCheckIn) : null);
//   const [checkOut, setCheckOut] = useState(initialCheckOut ? new Date(initialCheckOut) : null);
//   const [roomCount, setRoomCount] = useState(initialRoom || 1);
//   const [adult, setAdult] = useState(initialAdult || 1);
//   const [children, setChildren] = useState(initialChildren || 0);
//   const [open, setOpen] = useState(false);
//   const [guestOpen, setGuestOpen] = useState(false);

//   const [showInOverlay, setShowInOverlay] = useState(false);
//   const [showOutOverlay, setShowOutOverlay] = useState(false);

//   const [availableRooms, setAvailableRooms] = useState([]);

//   const roomRef = useRef(null);
//   const guestRef = useRef(null);

//   // Format date
//   const formatDate = (date) => (date ? date.toISOString().split("T")[0] : "");

//   // Overlay controls
//   const openInOverlay = () => {
//     setShowOutOverlay(false);
//     setShowInOverlay(true);
//   };

//   const openOutOverlay = () => {
//     setShowInOverlay(false);
//     setShowOutOverlay(true);
//   };

//   const closeOverlay = () => {
//     setShowInOverlay(false);
//     setShowOutOverlay(false);
//   };

//   // Fetch available rooms — with FIX
//   useEffect(() => {
//     const fetchAvailableRooms = async () => {
//       try {
//         if (!checkIn || !checkOut) return;

//         const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

//         const url = `${API_URL}/rooms/available?checkIn=${formatDate(
//           checkIn
//         )}&checkOut=${formatDate(checkOut)}&adults=${adult}&children=${children}&roomsRequested=${roomCount}`;

//         const response = await fetch(url);
//         const data = await response.json();

//         // FIX: allow backend single object OR array
//         if (Array.isArray(data.availableRooms)) {
//           setAvailableRooms(data.availableRooms);
//         } else if (data.roomType) {
//           setAvailableRooms([data]);
//         } else {
//           setAvailableRooms([]);
//         }
//       } catch (error) {
//         console.error("Error fetching available rooms:", error);
//       }
//     };

//     fetchAvailableRooms();
//   }, [checkIn, checkOut, adult, children, roomCount]);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (roomRef.current && !roomRef.current.contains(event.target)) setOpen(false);
//       if (guestRef.current && !guestRef.current.contains(event.target)) setGuestOpen(false);
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="bg-whiteSmoke dark:bg-white font-Inter">
//       <BreadCrumb title="AVAILABLE ROOMS" home="/" />

//       {/* FILTER BAR */}
//       <div
//         className="Container-Hero bg-lightBlack dark:bg-normalBlack grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 
//                    items-center font-Arial py-3 lg:py-4 xl:py-5 border-t-[3px] border-t-khaki mx-auto shadow-xl 
//                    relative z-20 -mt-20 px-4 sm:px-6 lg:px-10"
//       >
//         {/* Check In */}
//         <div className="p-3">
//           <p className="text-sm text-[#A9A9A9] ml-3">Check In</p>
//           <button
//             type="button"
//             onClick={openInOverlay}
//             className="w-full text-white text-sm lg:text-base border border-white/20 px-3 py-2 mt-[2px] 
//                        flex items-center justify-between"
//           >
//             <span>{checkIn ? formatDate(checkIn) : "dd-mm-yyyy"}</span>
//             <FiCalendar className="text-white opacity-80" size={18} />
//           </button>
//         </div>

//         {/* Check Out */}
//         <div className="p-3">
//           <p className="text-sm text-[#A9A9A9] ml-3">Check Out</p>
//           <button
//             type="button"
//             onClick={openOutOverlay}
//             className="w-full text-white text-sm lg:text-base border border-white/20 px-3 py-2 mt-[2px] 
//                        flex items-center justify-between"
//           >
//             <span>{checkOut ? formatDate(checkOut) : "dd-mm-yyyy"}</span>
//             <FiCalendar className="text-white opacity-80" size={18} />
//           </button>
//         </div>

//         {/* Rooms Dropdown */}
//         <div className="p-3 relative" ref={roomRef}>
//           <div className="text-white px-3 py-2 cursor-pointer" onClick={() => setOpen(!open)}>
//             <span className="flex items-center justify-between text-sm text-[#A9A9A9]">
//               Rooms <BiChevronDown />
//             </span>
//             <div className="pt-[10px] text-sm sm:text-base">{roomCount} Room</div>
//           </div>

//           {open && (
//             <div className="absolute bg-white text-black w-60 mt-2 shadow-lg z-20 py-2">
//               <div className="px-5 py-2 flex justify-between items-center">
//                 <div>{roomCount} Room</div>
//                 <div className="flex gap-2">
//                   <button className="w-5 h-5 bg-khaki text-white" onClick={() => setRoomCount(roomCount + 1)}>
//                     +
//                   </button>
//                   <button className="w-5 h-5 bg-khaki text-white" onClick={() => setRoomCount((v) => Math.max(1, v - 1))}>
//                     -
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Guests Dropdown */}
//         <div className="p-3 relative" ref={guestRef}>
//           <div className="text-white px-3 py-2 cursor-pointer" onClick={() => setGuestOpen(!guestOpen)}>
//             <span className="flex items-center justify-between text-sm text-[#A9A9A9]">
//               Guests <BiChevronDown />
//             </span>
//             <div className="pt-[10px] text-sm sm:text-base">
//               {adult} Adult, {children} Child
//             </div>
//           </div>

//           {guestOpen && (
//             <div className="absolute bg-white text-black w-60 mt-2 shadow-lg z-20 py-2">
//               <div className="px-5 py-2 flex justify-between items-center">
//                 <div>{adult} Adult</div>
//                 <div className="flex gap-2">
//                   <button className="w-5 h-5 bg-khaki text-white" onClick={() => setAdult(adult + 1)}>
//                     +
//                   </button>
//                   <button className="w-5 h-5 bg-khaki text-white" onClick={() => setAdult((v) => Math.max(1, v - 1))}>
//                     -
//                   </button>
//                 </div>
//               </div>

//               <div className="px-5 py-2 flex justify-between items-center">
//                 <div>{children} Child</div>
//                 <div className="flex gap-2">
//                   <button className="w-5 h-5 bg-khaki text-white" onClick={() => setChildren(children + 1)}>
//                     +
//                   </button>
//                   <button className="w-5 h-5 bg-khaki text-white" onClick={() => setChildren((v) => Math.max(0, v - 1))}>
//                     -
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Check Availability */}
//         <button
//           onClick={() => {
//             setCheckIn(checkIn);
//             setCheckOut(checkOut);
//           }}
//           className="col-span-2 md:col-span-1 w-full h-10 lg:h-[50px] text-[15px] bg-khaki border border-khaki 
//                      text-white hover:bg-opacity-90 transition-all duration-300"
//         >
//           Check Availability
//         </button>
//       </div>

//       {/* ===== DATE OVERLAY ===== */}
//       {(showInOverlay || showOutOverlay) && (
//         <div
//           className="fixed inset-0 z-[9999] bg-black/20 flex items-center justify-center px-4"
//           onClick={closeOverlay}
//         >
//           <div
//             className="bg-white text-black shadow-2xl max-w-[560px] w-full overflow-visible"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//               <h3 className="text-lg font-semibold">
//                 {showInOverlay ? "Select Check-in" : "Select Check-out"}
//               </h3>
//               <button className="px-3 py-1.5 border border-[#D1D5DB] hover:bg-gray-50 text-sm" onClick={closeOverlay}>
//                 Close
//               </button>
//             </div>

//             <div className="p-3 md:p-5">
//               <ReactDatePicker
//                 inline
//                 monthsShown={1}
//                 calendarClassName="rdp-pill"
//                 selected={showInOverlay ? checkIn : checkOut}
//                 minDate={showInOverlay ? new Date() : checkIn || new Date()}
//                 onChange={(date) => {
//                   if (showInOverlay) {
//                     setCheckIn(date);
//                     if (checkOut && date && checkOut < date) setCheckOut(null);
//                   } else {
//                     setCheckOut(date);
//                   }
//                   closeOverlay();
//                 }}
//                 showDisabledMonthNavigation
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ===== AVAILABLE ROOMS ===== */}
//       <div
//         className="bg-cover bg-center bg-no-repeat py-20 2xl:py-[120px]"
//         style={{ backgroundImage: "url('/images/home/background.png')" }}
//       >
//         <div className="Container">
//           <div className="mt-7 grid items-center grid-cols-1 md:grid-cols-2 gap-8 md:gap-[40px]">

//             {availableRooms.length === 0 ? (
//               <div className="col-span-full text-center pt-10 pb-20 uppercase text-[#6B7280] text-lg sm:text-xl md:text-2xl lg:text-3xl">
//                 No Rooms Available
//               </div>
//             ) : (
//               availableRooms.map((r, index) => (
//                 <div
//                   key={index}
//                   className="overflow-hidden group cursor-pointer transform transition-all duration-500 
//                              hover:scale-105 hover:shadow-2xl bg-white border border-gray-200"
//                 >
//                   <div className="relative overflow-hidden">
//                     <img
//                       src={r.images?.[0] || "/images/home/room1.jpeg"}
//                       alt={r.roomType}
//                       className="w-full h-full object-cover transition-all duration-700 
//                                  group-hover:scale-110 group-hover:opacity-80"
//                     />

//                     <div className="px-5 py-2 inline-flex bg-khaki text-sm text-white absolute top-[10px] right-[10px] z-10">
//                       Nu {r.price?.toLocaleString()}
//                     </div>

//                     <Link
//                       to={`/room_details/${r._id}`}
//                       state={{
//                         room: r,
//                         selectedInDate: formatDate(checkIn),
//                         selectedOutDate: formatDate(checkOut),
//                         adult,
//                         children,
//                         roomCount,
//                       }}
//                     >
//                       <button className="view-details-btn flex items-center justify-center text-[15px] 
//                                          leading-[38px] bg-black bg-opacity-90 hover:bg-opacity-100 
//                                          absolute bottom-0 -left-40 px-6 py-1 text-white group-hover:left-0 
//                                          transition-all duration-500 z-10">
//                         View Details <BsArrowRight className="w-4 h-4 ml-2 text-white" />
//                       </button>
//                     </Link>
//                   </div>

//                   <div className="font-inter border-t border-gray-200">
//                     <div className="py-6 px-5 sm:px-6 md:px-8 lg:px-[30px]">
//                       <h4 className="text-sm text-khaki uppercase font-semibold">{r.location}</h4>
//                       <h2 className="text-2xl font-semibold text-black py-4 hover:text-khaki transition">{r.roomType}</h2>
//                       <p className="text-sm text-gray-800">
//                         {r.size} SQ.FT | {r.occupancy} Guests
//                       </p>
//                       <p className="mt-2 text-[14px] text-gray-600">
//                         <strong>{r.roomsAvailable ?? r.totalRooms ?? 0}</strong> rooms available
//                       </p>
//                     </div>

//                     <div className="border-t border-gray-200 py-5 px-5 flex items-center justify-between">
//                       <span className="flex items-center text-gray-800">
//                         <FaBed className="text-gray-800 text-xl" />
//                         <span className="ml-[10px] font-medium">
//                           {r.beds} {r.beds > 1 ? "King Beds" : "King Bed"}
//                         </span>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AvailableRooms;
import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import { BiChevronDown } from "react-icons/bi";
import { FaBed } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RoomsDatepicker.css";
import { FiCalendar } from "react-icons/fi";

const AvailableRooms = () => {
  const location = useLocation();
  const {
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
    room: initialRoom,
    adult: initialAdult,
    children: initialChildren,
  } = location.state || {};

  const [checkIn, setCheckIn] = useState(initialCheckIn ? new Date(initialCheckIn) : null);
  const [checkOut, setCheckOut] = useState(initialCheckOut ? new Date(initialCheckOut) : null);
  const [roomCount, setRoomCount] = useState(initialRoom || 1);
  const [adult, setAdult] = useState(initialAdult || 1);
  const [children, setChildren] = useState(initialChildren || 0);
  const [open, setOpen] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);

  const [showInOverlay, setShowInOverlay] = useState(false);
  const [showOutOverlay, setShowOutOverlay] = useState(false);

  const [availableRooms, setAvailableRooms] = useState([]);

  const roomRef = useRef(null);
  const guestRef = useRef(null);

  const formatDate = (date) => (date ? date.toISOString().split("T")[0] : "");

  const openInOverlay = () => {
    setShowOutOverlay(false);
    setShowInOverlay(true);
  };

  const openOutOverlay = () => {
    setShowInOverlay(false);
    setShowOutOverlay(true);
  };

  const closeOverlay = () => {
    setShowInOverlay(false);
    setShowOutOverlay(false);
  };

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        if (!checkIn || !checkOut) return;

        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

        const url = `${API_URL}/rooms/available?checkIn=${formatDate(
          checkIn
        )}&checkOut=${formatDate(checkOut)}&adults=${adult}&children=${children}&roomsRequested=${roomCount}`;

        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data.availableRooms)) {
          setAvailableRooms(data.availableRooms);
        } else if (data.roomType) {
          setAvailableRooms([data]);
        } else {
          setAvailableRooms([]);
        }
      } catch (error) {
        console.error("Error fetching available rooms:", error);
      }
    };

    fetchAvailableRooms();
  }, [checkIn, checkOut, adult, children, roomCount]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roomRef.current && !roomRef.current.contains(event.target)) setOpen(false);
      if (guestRef.current && !guestRef.current.contains(event.target)) setGuestOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white font-Inter">
      <BreadCrumb title="AVAILABLE ROOMS" home="/" />

      {/* FILTER BAR */}
      <div
          className="Container-Hero bg-lightBlack dark:bg-normalBlack grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 items-center justify-center font-Arial py-3 lg:py-4 xl:py-5 2xl:py-6 border-t-[3px] border-t-khaki 
                     mx-auto shadow-xl relative z-20 -mt-20 px-4 sm:px-6 lg:px-10 z-[1]"
      >
        {/* Check In */}
        <div className="p-3">
          <p className="text-sm text-[#A9A9A9] ml-3">Check In</p>
          <button
            type="button"
            onClick={openInOverlay}
            className="w-full text-white text-sm lg:text-base border border-white/20 px-3 py-2 mt-[2px] 
                       flex items-center justify-between"
          >
            <span>{checkIn ? formatDate(checkIn) : "dd-mm-yyyy"}</span>
            <FiCalendar className="text-white opacity-80" size={18} />
          </button>
        </div>

        {/* Check Out */}
        <div className="p-3">
          <p className="text-sm text-[#A9A9A9] ml-3">Check Out</p>
          <button
            type="button"
            onClick={openOutOverlay}
            className="w-full text-white text-sm lg:text-base border border-white/20 px-3 py-2 mt-[2px] 
                       flex items-center justify-between"
          >
            <span>{checkOut ? formatDate(checkOut) : "dd-mm-yyyy"}</span>
            <FiCalendar className="text-white opacity-80" size={18} />
          </button>
        </div>

        {/* Rooms Dropdown */}
        <div className="p-3 relative" ref={roomRef}>
          <div className="text-white px-3 py-2 cursor-pointer" onClick={() => setOpen(!open)}>
            <span className="flex items-center justify-between text-sm text-[#A9A9A9]">
              Rooms <BiChevronDown />
            </span>
            <div className="pt-[10px] text-sm sm:text-base">{roomCount} Room</div>
          </div>

          {open && (
    <div className="absolute bg-white text-black mt-2 shadow-lg py-2 z-20 w-40 sm:w-60">
              <div className="px-5 py-2 flex justify-between items-center">
                <div>{roomCount} Room</div>
                <div className="flex gap-2">
                  <button className="w-6 h-6 bg-khaki text-white" onClick={() => setRoomCount(roomCount + 1)}>
                    +
                  </button>
                  <button className="w-6 h-6 bg-khaki text-white" onClick={() => setRoomCount((v) => Math.max(1, v - 1))}>
                    -
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Guests Dropdown */}
        <div className="p-3 relative" ref={guestRef}>
          <div className="text-white px-3 py-2 cursor-pointer" onClick={() => setGuestOpen(!guestOpen)}>
            <span className="flex items-center justify-between text-sm text-[#A9A9A9]">
              Guests <BiChevronDown />
            </span>
            <div className="pt-[10px] text-sm sm:text-base">
              {adult} Adult, {children} Child
            </div>
          </div>

          {guestOpen && (
    <div className="absolute bg-white text-black mt-2 shadow-lg py-2 z-20 w-40 sm:w-60">
              <div className="px-5 py-2 flex justify-between items-center">
                <div>{adult} Adult</div>
                <div className="flex gap-2">
                  <button className="w-6 h-6 bg-khaki text-white" onClick={() => setAdult(adult + 1)}>
                    +
                  </button>
                  <button className="w-6 h-6 bg-khaki text-white" onClick={() => setAdult((v) => Math.max(1, v - 1))}>
                    -
                  </button>
                </div>
              </div>

              <div className="px-5 py-2 flex justify-between items-center">
                <div>{children} Child</div>
                <div className="flex gap-2">
                  <button className="w-6 h-6 bg-khaki text-white" onClick={() => setChildren(children + 1)}>
                    +
                  </button>
                  <button className="w-6 h-6 bg-khaki text-white" onClick={() => setChildren((v) => Math.max(0, v - 1))}>
                    -
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Check Availability */}
        <button
          onClick={() => {
            setCheckIn(checkIn);
            setCheckOut(checkOut);
          }}
          className="col-span-2 md:col-span-1 w-full h-10 lg:h-[50px] text-[15px] bg-khaki border border-khaki 
                     text-white hover:bg-opacity-90 transition-all duration-300"
        >
          Check Availability
        </button>
      </div>

      {/* DATE OVERLAY */}
      {(showInOverlay || showOutOverlay) && (
        <div
          className="fixed inset-0 z-[9999] bg-black/20 flex items-center justify-center px-4"
          onClick={closeOverlay}
        >
          <div
            className="bg-white text-black shadow-2xl max-w-[560px] w-full overflow-visible"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold">
                {showInOverlay ? "Select Check-in" : "Select Check-out"}
              </h3>
              <button className="px-3 py-1.5 border border-[#D1D5DB] hover:bg-gray-50 text-sm" onClick={closeOverlay}>
                Close
              </button>
            </div>

            <div className="p-3 md:p-5">
              <ReactDatePicker
                inline
                monthsShown={1}
                calendarClassName="rdp-pill"
                selected={showInOverlay ? checkIn : checkOut}
                minDate={showInOverlay ? new Date() : checkIn || new Date()}
                onChange={(date) => {
                  if (showInOverlay) {
                    setCheckIn(date);
                    if (checkOut && date && checkOut < date) setCheckOut(null);
                  } else {
                    setCheckOut(date);
                  }
                  closeOverlay();
                }}
                showDisabledMonthNavigation

                /* --- CUSTOM MONTH / YEAR HEADER (FULL SUPPORT) --- */
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className="flex items-center justify-between px-3 py-2">
                    {/* Month Dropdown */}
                    <div className="flex items-center space-x-2">
                      <select
                        value={date.getMonth()}
                        onChange={({ target: { value } }) => changeMonth(Number(value))}
                        className="border px-2 py-1 text-sm border-[#9CA3AF]"
                      >
                        {Array.from({ length: 12 }).map((_, i) => (
                          <option key={i} value={i}>
                            {new Date(0, i).toLocaleString("default", { month: "long" })}
                          </option>
                        ))}
                      </select>

                      {/* Year Dropdown */}
                      <select
                        value={date.getFullYear()}
                        onChange={({ target: { value } }) => changeYear(Number(value))}
                        className="border px-2 py-1 text-sm border-[#9CA3AF]"
                      >
                        {Array.from({ length: 11 }, (_, i) => {
                          const year = new Date().getFullYear() + i;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* Month Nav Buttons */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        className="px-2 py-1 border border-[#9CA3AF] text-[#1F1F1F]"
                      >
                        ▲
                      </button>
                      <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        className="px-2 py-1 border border-[#9CA3AF] text-[#1F1F1F]"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      )}

      {/* AVAILABLE ROOMS */}
      <div
        className="bg-cover bg-center bg-no-repeat -mt-20 py-20 2xl:py-[120px]"
        style={{ backgroundImage: "url('/images/home/background.png')" }}
      >
        <div className="Container">
          <div className="mt-20 grid items-center grid-cols-1 md:grid-cols-2 gap-8 md:gap-[40px]">

            {availableRooms.length === 0 ? (
              <div className="col-span-full text-center pt-10 pb-20 uppercase text-[#6B7280] text-lg sm:text-xl md:text-2xl lg:text-3xl">
                No Rooms Available
              </div>
            ) : (
              availableRooms.map((r, index) => (
                <div
                  key={index}
                  className="overflow-hidden group cursor-pointer transform transition-all duration-500 
                             hover:scale-105 hover:shadow-2xl bg-white border border-gray-200"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={r.images?.[0] || "/images/home/room1.jpeg"}
                      alt={r.roomType}
                      className="w-full h-full object-cover transition-all duration-700 
                                 group-hover:scale-110 group-hover:opacity-80"
                    />

                    <div className="px-5 py-2 inline-flex bg-khaki text-sm text-white absolute top-[10px] right-[10px] z-10">
                      Nu {r.price?.toLocaleString()}
                    </div>

                    <Link
                      to={`/room_details/${r._id}`}
                      state={{
                        room: r,
                        selectedInDate: formatDate(checkIn),
                        selectedOutDate: formatDate(checkOut),
                        adult,
                        children,
                        roomCount,
                      }}
                    >
                      <button className="view-details-btn flex items-center justify-center text-[15px] 
                                         leading-[38px] bg-black bg-opacity-90 hover:bg-opacity-100 
                                         absolute bottom-0 -left-40 px-6 py-1 text-white group-hover:left-0 
                                         transition-all duration-500 z-10">
                        View Details <BsArrowRight className="w-4 h-4 ml-2 text-white" />
                      </button>
                    </Link>
                  </div>

                  <div className="font-inter border-t border-gray-200">
                    <div className="py-6 px-5 sm:px-6 md:px-8 lg:px-[30px]">
                      <h4 className="text-sm text-khaki uppercase font-semibold">{r.location}</h4>
                      <h2 className="text-2xl font-semibold text-black py-4 hover:text-khaki transition">{r.roomType}</h2>
                      <p className="text-sm text-gray-800">
                        {r.size} SQ.FT | {r.occupancy} Guests
                      </p>
                      <p className="mt-2 text-[14px] text-gray-600">
                        <strong>{r.roomsAvailable ?? r.totalRooms ?? 0}</strong> rooms available
                      </p>
                    </div>

                    <div className="border-t border-gray-200 py-5 px-5 flex items-center justify-between">
                      <span className="flex items-center text-gray-800">
                        <FaBed className="text-gray-800 text-xl" />
                        <span className="ml-[10px] font-medium">
                          {r.beds} {r.beds > 1 ? "King Beds" : "King Bed"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableRooms;
