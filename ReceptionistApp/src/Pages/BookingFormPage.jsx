
// // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // import { useNavigate, useLocation } from "react-router-dom";
// // // // // import DatePicker from "react-datepicker";
// // // // // import "react-datepicker/dist/react-datepicker.css";
// // // // // import Swal from "sweetalert2";
// // // // // import { Calendar } from "lucide-react";

// // // // // const API_URL = import.meta.env.VITE_API_URL;

// // // // // const countries = [
// // // // //   { name: "Afghanistan", code: "+93" },
// // // // //   { name: "Albania", code: "+355" },
// // // // //   { name: "Algeria", code: "+213" },
// // // // //   { name: "Andorra", code: "+376" },
// // // // //   { name: "Angola", code: "+244" },
// // // // //   { name: "Argentina", code: "+54" },
// // // // //   { name: "Armenia", code: "+374" },
// // // // //   { name: "Australia", code: "+61" },
// // // // //   { name: "Austria", code: "+43" },
// // // // //   { name: "Azerbaijan", code: "+994" },
// // // // //   { name: "Bahamas", code: "+1‑242" },
// // // // //   { name: "Bahrain", code: "+973" },
// // // // //   { name: "Bangladesh", code: "+880" },
// // // // //   { name: "Barbados", code: "+1‑246" },
// // // // //   { name: "Belarus", code: "+375" },
// // // // //   { name: "Belgium", code: "+32" },
// // // // //   { name: "Belize", code: "+501" },
// // // // //   { name: "Benin", code: "+229" },
// // // // //   { name: "Bhutan", code: "+975" },
// // // // //   { name: "Bolivia", code: "+591" },
// // // // //   { name: "Bosnia and Herzegovina", code: "+387" },
// // // // //   { name: "Botswana", code: "+267" },
// // // // //   { name: "Brazil", code: "+55" },
// // // // //   { name: "Brunei", code: "+673" },
// // // // //   { name: "Bulgaria", code: "+359" },
// // // // //   { name: "Burkina Faso", code: "+226" },
// // // // //   { name: "Burundi", code: "+257" },
// // // // //   { name: "Cambodia", code: "+855" },
// // // // //   { name: "Cameroon", code: "+237" },
// // // // //   { name: "Canada", code: "+1" },
// // // // //   { name: "Chad", code: "+235" },
// // // // //   { name: "Chile", code: "+56" },
// // // // //   { name: "China", code: "+86" },
// // // // //   { name: "Colombia", code: "+57" },
// // // // //   { name: "Costa Rica", code: "+506" },
// // // // //   { name: "Croatia", code: "+385" },
// // // // //   { name: "Cuba", code: "+53" },
// // // // //   { name: "Cyprus", code: "+357" },
// // // // //   { name: "Czech Republic", code: "+420" },
// // // // //   { name: "Denmark", code: "+45" },
// // // // //   { name: "Djibouti", code: "+253" },
// // // // //   { name: "Dominica", code: "+1‑767" },
// // // // //   { name: "Dominican Republic", code: "+1‑809" },
// // // // //   { name: "Ecuador", code: "+593" },
// // // // //   { name: "Egypt", code: "+20" },
// // // // //   { name: "Estonia", code: "+372" },
// // // // //   { name: "Ethiopia", code: "+251" },
// // // // //   { name: "Fiji", code: "+679" },
// // // // //   { name: "Finland", code: "+358" },
// // // // //   { name: "France", code: "+33" },
// // // // //   { name: "Gabon", code: "+241" },
// // // // //   { name: "Gambia", code: "+220" },
// // // // //   { name: "Georgia", code: "+995" },
// // // // //   { name: "Germany", code: "+49" },
// // // // //   { name: "Ghana", code: "+233" },
// // // // //   { name: "Greece", code: "+30" },
// // // // //   { name: "Guatemala", code: "+502" },
// // // // //   { name: "Haiti", code: "+509" },
// // // // //   { name: "Honduras", code: "+504" },
// // // // //   { name: "Hungary", code: "+36" },
// // // // //   { name: "Iceland", code: "+354" },
// // // // //   { name: "India", code: "+91" },
// // // // //   { name: "Indonesia", code: "+62" },
// // // // //   { name: "Iran", code: "+98" },
// // // // //   { name: "Iraq", code: "+964" },
// // // // //   { name: "Ireland", code: "+353" },
// // // // //   { name: "Israel", code: "+972" },
// // // // //   { name: "Italy", code: "+39" },
// // // // //   { name: "Jamaica", code: "+1‑876" },
// // // // //   { name: "Japan", code: "+81" },
// // // // //   { name: "Jordan", code: "+962" },
// // // // //   { name: "Kazakhstan", code: "+7" },
// // // // //   { name: "Kenya", code: "+254" },
// // // // //   { name: "Kuwait", code: "+965" },
// // // // //   { name: "Kyrgyzstan", code: "+996" },
// // // // //   { name: "Laos", code: "+856" },
// // // // //   { name: "Latvia", code: "+371" },
// // // // //   { name: "Lebanon", code: "+961" },
// // // // //   { name: "Lesotho", code: "+266" },
// // // // //   { name: "Liberia", code: "+231" },
// // // // //   { name: "Libya", code: "+218" },
// // // // //   { name: "Lithuania", code: "+370" },
// // // // //   { name: "Luxembourg", code: "+352" },
// // // // //   { name: "Madagascar", code: "+261" },
// // // // //   { name: "Malawi", code: "+265" },
// // // // //   { name: "Malaysia", code: "+60" },
// // // // //   { name: "Maldives", code: "+960" },
// // // // //   { name: "Mali", code: "+223" },
// // // // //   { name: "Malta", code: "+356" },
// // // // //   { name: "Mauritania", code: "+222" },
// // // // //   { name: "Mauritius", code: "+230" },
// // // // //   { name: "Mexico", code: "+52" },
// // // // //   { name: "Moldova", code: "+373" },
// // // // //   { name: "Monaco", code: "+377" },
// // // // //   { name: "Mongolia", code: "+976" },
// // // // //   { name: "Montenegro", code: "+382" },
// // // // //   { name: "Morocco", code: "+212" },
// // // // //   { name: "Mozambique", code: "+258" },
// // // // //   { name: "Myanmar", code: "+95" },
// // // // //   { name: "Namibia", code: "+264" },
// // // // //   { name: "Nepal", code: "+977" },
// // // // //   { name: "Netherlands", code: "+31" },
// // // // //   { name: "New Zealand", code: "+64" },
// // // // //   { name: "Nicaragua", code: "+505" },
// // // // //   { name: "Niger", code: "+227" },
// // // // //   { name: "Nigeria", code: "+234" },
// // // // //   { name: "North Korea", code: "+850" },
// // // // //   { name: "Norway", code: "+47" },
// // // // //   { name: "Oman", code: "+968" },
// // // // //   { name: "Pakistan", code: "+92" },
// // // // //   { name: "Palau", code: "+680" },
// // // // //   { name: "Panama", code: "+507" },
// // // // //   { name: "Papua New Guinea", code: "+675" },
// // // // //   { name: "Paraguay", code: "+595" },
// // // // //   { name: "Peru", code: "+51" },
// // // // //   { name: "Philippines", code: "+63" },
// // // // //   { name: "Poland", code: "+48" },
// // // // //   { name: "Portugal", code: "+351" },
// // // // //   { name: "Qatar", code: "+974" },
// // // // //   { name: "Romania", code: "+40" },
// // // // //   { name: "Russia", code: "+7" },
// // // // //   { name: "Rwanda", code: "+250" },
// // // // //   { name: "Samoa", code: "+685" },
// // // // //   { name: "San Marino", code: "+378" },
// // // // //   { name: "Saudi Arabia", code: "+966" },
// // // // //   { name: "Senegal", code: "+221" },
// // // // //   { name: "Serbia", code: "+381" },
// // // // //   { name: "Seychelles", code: "+248" },
// // // // //   { name: "Singapore", code: "+65" },
// // // // //   { name: "Slovakia", code: "+421" },
// // // // //   { name: "Slovenia", code: "+386" },
// // // // //   { name: "Somalia", code: "+252" },
// // // // //   { name: "South Africa", code: "+27" },
// // // // //   { name: "South Korea", code: "+82" },
// // // // //   { name: "Spain", code: "+34" },
// // // // //   { name: "Sri Lanka", code: "+94" },
// // // // //   { name: "Sudan", code: "+249" },
// // // // //   { name: "Sweden", code: "+46" },
// // // // //   { name: "Switzerland", code: "+41" },
// // // // //   { name: "Syria", code: "+963" },
// // // // //   { name: "Taiwan", code: "+886" },
// // // // //   { name: "Tajikistan", code: "+992" },
// // // // //   { name: "Tanzania", code: "+255" },
// // // // //   { name: "Thailand", code: "+66" },
// // // // //   { name: "Tunisia", code: "+216" },
// // // // //   { name: "Turkey", code: "+90" },
// // // // //   { name: "Turkmenistan", code: "+993" },
// // // // //   { name: "Uganda", code: "+256" },
// // // // //   { name: "Ukraine", code: "+380" },
// // // // //   { name: "United Arab Emirates", code: "+971" },
// // // // //   { name: "United Kingdom", code: "+44" },
// // // // //   { name: "United States", code: "+1" },
// // // // //   { name: "Uruguay", code: "+598" },
// // // // //   { name: "Uzbekistan", code: "+998" },
// // // // //   { name: "Vanuatu", code: "+678" },
// // // // //   { name: "Vatican City", code: "+379" },
// // // // //   { name: "Venezuela", code: "+58" },
// // // // //   { name: "Vietnam", code: "+84" },
// // // // //   { name: "Yemen", code: "+967" },
// // // // //   { name: "Zambia", code: "+260" },
// // // // //   { name: "Zimbabwe", code: "+263" },
// // // // // ];

// // // // // export default function BookingForm() {
// // // // //   const navigate = useNavigate();
// // // // //   const { state } = useLocation();

// // // // //   const initialSelectedDate = state?.selectedDate ? new Date(state.selectedDate) : null;
// // // // //   const selectedRoomTypeFromState = state?.roomType || "";

// // // // //   const [roomTypes, setRoomTypes] = useState([]);

// // // // //   const [isAgencyBooking, setIsAgencyBooking] = useState(false);

// // // // //   // Agency fields
// // // // //   const [agencyName, setAgencyName] = useState("");
// // // // //   const [agencyEmail, setAgencyEmail] = useState("");
// // // // //   const [agencyPhone, setAgencyPhone] = useState("");
// // // // //   const [agentName, setAgentName] = useState("");

// // // // //   // Guest fields
// // // // //   const [firstName, setFirstName] = useState("");
// // // // //   const [lastName, setLastName] = useState("");
// // // // //   const [email, setEmail] = useState("");
// // // // //   const [phone, setPhone] = useState("");

// // // // //   const [country, setCountry] = useState("Bhutan");
// // // // //   const [phoneCode, setPhoneCode] = useState("+975");

// // // // //   const [journalInput, setJournalInput] = useState("");
// // // // //   const [selectedRoomType, setSelectedRoomType] = useState(selectedRoomTypeFromState);
// // // // //   const [selectedRoomNo, setSelectedRoomNo] = useState("");

// // // // //   const [checkInDate, setCheckInDate] = useState(initialSelectedDate);
// // // // //   const [checkOutDate, setCheckOutDate] = useState(null);

// // // // //   const [roomsRequested, setRoomsRequested] = useState(1);
// // // // //   const [children, setChildren] = useState(0);

// // // // //   const [specialRequest, setSpecialRequest] = useState("");
// // // // //   const [meals, setMeals] = useState([]);

// // // // //   const [roomPrice, setRoomPrice] = useState(0);
// // // // //   const [totalPrice, setTotalPrice] = useState(0);

// // // // //   const [errors, setErrors] = useState({});
// // // // //   const [openDatePickerFor, setOpenDatePickerFor] = useState(null);

// // // // //   const datePickerRef = useRef();

// // // // //   const [availableRooms, setAvailableRooms] = useState([]);
// // // // //   const [loadingAvailableRooms, setLoadingAvailableRooms] = useState(false);

// // // // //   useEffect(() => {
// // // // //     const loadRoomTypes = async () => {
// // // // //       try {
// // // // //         const res = await fetch(`${API_URL}/rooms/room-types`, { credentials: "include" });
// // // // //         const json = await res.json();

// // // // //         if (res.ok && Array.isArray(json.roomTypes)) {
// // // // //           const list = json.roomTypes.map((r) => ({ name: r.roomType, price: r.price }));
// // // // //           setRoomTypes(list);
// // // // //         }
// // // // //       } catch (err) {
// // // // //         console.error("Failed to load room types:", err);
// // // // //       }
// // // // //     };

// // // // //     loadRoomTypes();
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     const room = roomTypes.find((r) => r.name === selectedRoomType);
// // // // //     const price = room ? room.price : 0;

// // // // //     setRoomPrice(price);

// // // // //     if (checkInDate && checkOutDate && price) {
// // // // //       const diff = Math.ceil((checkOutDate - checkInDate) / 86400000);
// // // // //       const nights = diff > 0 ? diff : 1;
// // // // //       setTotalPrice(nights * price * roomsRequested);
// // // // //     } else if (checkInDate && price && !checkOutDate) {
// // // // //       setTotalPrice(price * roomsRequested);
// // // // //     } else {
// // // // //       setTotalPrice(0);
// // // // //     }
// // // // //   }, [selectedRoomType, checkInDate, checkOutDate, roomsRequested, roomTypes]);

// // // // //   useEffect(() => {
// // // // //     const fetchAvailableRooms = async () => {
// // // // //       setAvailableRooms([]);

// // // // //       if (!selectedRoomType || !checkInDate || !checkOutDate) return;

// // // // //       const toYMD = (d) => {
// // // // //         const yyyy = d.getFullYear();
// // // // //         const mm = String(d.getMonth() + 1).padStart(2, "0");
// // // // //         const dd = String(d.getDate()).padStart(2, "0");
// // // // //         return `${yyyy}-${mm}-${dd}`;
// // // // //       };

// // // // //       const checkInStr = toYMD(checkInDate);
// // // // //       const checkOutStr = toYMD(checkOutDate);

// // // // //       setLoadingAvailableRooms(true);
// // // // //       try {
// // // // //         const url = `${API_URL}/rooms/available-numbers/${selectedRoomType}?checkIn=${checkInStr}&checkOut=${checkOutStr}`;
// // // // //         const res = await fetch(url, { credentials: "include" });
// // // // //         const data = await res.json();

// // // // //         let arr = null;

// // // // //         if (Array.isArray(data.availableRoomNumbers)) arr = data.availableRoomNumbers;
// // // // //         else if (Array.isArray(data.available)) arr = data.available;
// // // // //         else if (Array.isArray(data)) arr = data;

// // // // //         if (Array.isArray(arr)) {
// // // // //           setAvailableRooms(arr.map((x) => String(x)));
// // // // //         }
// // // // //       } catch (err) {
// // // // //         console.error("Error loading rooms:", err);
// // // // //       } finally {
// // // // //         setLoadingAvailableRooms(false);
// // // // //       }
// // // // //     };

// // // // //     fetchAvailableRooms();
// // // // //   }, [selectedRoomType, checkInDate, checkOutDate]);

// // // // //   const inputClass = (field) =>
// // // // //     `mt-1 border px-3 py-2 w-full focus:outline-none focus:ring-2 ${
// // // // //       errors[field] ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-green-300"
// // // // //     }`;

// // // // //   const validateField = (field, value) => {
// // // // //     let msg = "";

// // // // //     switch (field) {
// // // // //       case "agencyName":
// // // // //         if (isAgencyBooking && !value.trim()) msg = "Agency name is required.";
// // // // //         break;

// // // // //       case "agentName":
// // // // //         if (isAgencyBooking && !value.trim()) msg = "Agent name is required.";
// // // // //         break;

// // // // //       case "firstName":
// // // // //       case "lastName":
// // // // //       case "selectedRoomNo":
// // // // //       case "journalInput":
// // // // //         if (!isAgencyBooking && !value.trim()) msg = "This field is required.";
// // // // //         break;

// // // // //       case "email":
// // // // //         if (!isAgencyBooking) {
// // // // //           if (!value.trim()) msg = "Required.";
// // // // //           else if (!/^\S+@\S+\.\S+$/.test(value)) msg = "Invalid email.";
// // // // //         }
// // // // //         break;
// // // // //     }

// // // // //     setErrors((prev) => ({ ...prev, [field]: msg }));
// // // // //   };

// // // // //   const toggleMeal = (meal) => {
// // // // //     setMeals((prev) => (prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]));
// // // // //   };

// // // // //   // ✔ FIXED: always send YYYY-MM-DD
// // // // //   const toYMD = (d) => {
// // // // //     if (!d) return "";
// // // // //     const yyyy = d.getFullYear();
// // // // //     const mm = String(d.getMonth() + 1).padStart(2, "0");
// // // // //     const dd = String(d.getDate()).padStart(2, "0");
// // // // //     return `${yyyy}-${mm}-${dd}`;
// // // // //   };

// // // // //   const submitAdminBooking = async (status) => {
// // // // //     ["selectedRoomType", "selectedRoomNo", "checkInDate", "checkOutDate"].forEach((f) =>
// // // // //       validateField(f, eval(f))
// // // // //     );

// // // // //     const payload = {
// // // // //       isAgencyBooking,
// // // // //       agencyName: isAgencyBooking ? agencyName : undefined,
// // // // //       agencyEmail: isAgencyBooking ? agencyEmail : undefined,
// // // // //       agencyPhone: isAgencyBooking ? agencyPhone : undefined,
// // // // //       agentName: isAgencyBooking ? agentName : undefined,

// // // // //       country,
// // // // //       firstName: !isAgencyBooking ? firstName : undefined,
// // // // //       lastName: !isAgencyBooking ? lastName : undefined,
// // // // //       email: !isAgencyBooking ? email : undefined,
// // // // //       phone: !isAgencyBooking ? phone : undefined,

// // // // //       // ✔ FINAL FIX (YYYY-MM-DD)
// // // // //       checkIn: checkInDate ? toYMD(checkInDate) : undefined,
// // // // //       checkOut: checkOutDate ? toYMD(checkOutDate) : undefined,

// // // // //       roomSelection: [
// // // // //         { roomType: selectedRoomType, roomsRequested: roomsRequested || 1 },
// // // // //       ],

// // // // //       meals,
// // // // //       specialRequest,

// // // // //       assignedRoom: selectedRoomNo
// // // // //         ? selectedRoomNo.split(",").map((x) => x.trim())
// // // // //         : undefined,

// // // // //       transactionNumber: journalInput || undefined,
// // // // //       statusOverride: status,
// // // // //     };

// // // // //     try {
// // // // //       const res = await fetch(`${API_URL}/bookings/book-rooms`, {
// // // // //         method: "POST",
// // // // //         credentials: "include",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify(payload),
// // // // //       });

// // // // //       const data = await res.json();

// // // // //       if (!res.ok) throw new Error(data.message);

// // // // //       await Swal.fire({
// // // // //         title: "Success!",
// // // // //         text: `Booking created as ${status.toUpperCase()}`,
// // // // //         icon: "success",
// // // // //         background: "#006600",
// // // // //         color: "white",
// // // // //       });

// // // // //       navigate("/booking", { state: { activeTab: "BOOKED" } });
// // // // //     } catch (err) {
// // // // //       Swal.fire("Error", err.message, "error");
// // // // //     }
// // // // //   };

// // // // //   const formatDate = (d) =>
// // // // //     d
// // // // //       ? new Date(d).toLocaleDateString("en-GB", {
// // // // //           day: "2-digit",
// // // // //           month: "short",
// // // // //           year: "numeric",
// // // // //         })
// // // // //       : "";

// // // // //   useEffect(() => {
// // // // //     const onDocClick = (e) => {
// // // // //       if (!datePickerRef.current) return;
// // // // //       if (!datePickerRef.current.contains(e.target)) setOpenDatePickerFor(null);
// // // // //     };

// // // // //     document.addEventListener("click", onDocClick);
// // // // //     return () => document.removeEventListener("click", onDocClick);
// // // // //   }, []);
// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50 px-2 py-4">
// // // // //       <div className="flex items-center justify-between mb-2">
// // // // //         <h1 className="text-2xl font-bold text-[#006600]">
// // // // //           AVAILABLE Booking Details
// // // // //         </h1>
// // // // //         <button
// // // // //           onClick={() => navigate(-1)}
// // // // //           className="px-4 py-2 border border-gray-300  hover:bg-gray-100"
// // // // //         >
// // // // //           Back
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* TOGGLE */}
// // // // //       <div className="flex justify-center mb-6">
// // // // //         <div
// // // // //           role="switch"
// // // // //           aria-checked={isAgencyBooking}
// // // // //           onClick={() => {
// // // // //             setIsAgencyBooking((prev) => {
// // // // //               const next = !prev;
// // // // //               setErrors({});

// // // // //               if (next) {
// // // // //                 setFirstName("");
// // // // //                 setLastName("");
// // // // //                 setEmail("");
// // // // //                 setPhone("");
// // // // //               } else {
// // // // //                 setAgencyName("");
// // // // //                 setAgencyEmail("");
// // // // //                 setAgencyPhone("");
// // // // //                 setAgentName("");
// // // // //               }

// // // // //               return next;
// // // // //             });
// // // // //           }}
// // // // //           className="relative select-none cursor-pointer"
// // // // //         >
// // // // //           <div className="w-56 h-12 -full bg-gray-200 p-1 shadow-inner relative">
// // // // //             <div
// // // // //               className={`absolute top-1 left-1 h-10 w-1/2 -full bg-white shadow transition-transform duration-200 ${
// // // // //                 isAgencyBooking ? "translate-x-full" : ""
// // // // //               }`}
// // // // //             />
// // // // //             <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
// // // // //               <span className={!isAgencyBooking ? "text-[#006600]" : "text-gray-500"}>
// // // // //                 NORMAL
// // // // //               </span>
// // // // //               <span className={isAgencyBooking ? "text-[#006600]" : "text-gray-500"}>
// // // // //                 AGENCY
// // // // //               </span>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* FORM */}
// // // // //       <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // //         {/* Room Info */}
// // // // //         <div className="bg-white shadow p-4">
// // // // //           <h2 className="text-xl font-bold mb-3 py-2">Room Information</h2>

// // // // //           {/* Room Type */}
// // // // //           <div>
// // // // //             <label className="font-semibold">Room Type:</label>
// // // // //             <div className="mt-1 border px-3 py-2 bg-gray-100 text-gray-800 ">
// // // // //               {selectedRoomType}
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Check-In */}
// // // // //           <div className="relative mt-4" ref={datePickerRef}>
// // // // //             <label className="font-semibold">Check-In:</label>
// // // // //             <div
// // // // //               onClick={(e) => {
// // // // //                 e.stopPropagation();
// // // // //                 setOpenDatePickerFor((prev) => (prev === "checkin" ? null : "checkin"));
// // // // //               }}
// // // // //               className="mt-1 w-full border px-3 py-3 flex justify-between cursor-pointer"
// // // // //             >
// // // // //               <span>{formatDate(checkInDate)}</span>
// // // // //               <Calendar />
// // // // //             </div>

// // // // //             {openDatePickerFor === "checkin" && (
// // // // //               <div className="absolute z-50 mt-2">
// // // // //                 <DatePicker
// // // // //                   inline
// // // // //                   selected={checkInDate}
// // // // //                   minDate={new Date()} 
// // // // //                   onChange={(d) => {
// // // // //                     setCheckInDate(d);
// // // // //                     validateField("checkInDate", d);
// // // // //                     setOpenDatePickerFor(null);
// // // // //                   }}
// // // // //                 />
// // // // //               </div>
// // // // //             )}
// // // // //           </div>

// // // // //           {/* Check-Out */}
// // // // //           <div className="relative mt-4" ref={datePickerRef}>
// // // // //             <label className="font-semibold">Check-Out:</label>
// // // // //             <div
// // // // //               onClick={(e) => {
// // // // //                 e.stopPropagation();
// // // // //                 setOpenDatePickerFor((prev) => (prev === "checkout" ? null : "checkout"));
// // // // //               }}
// // // // //               className="mt-1 w-full border px-3 py-3 flex justify-between cursor-pointer"
// // // // //             >
// // // // //               <span>{formatDate(checkOutDate)}</span>
// // // // //               <Calendar />
// // // // //             </div>

// // // // //             {openDatePickerFor === "checkout" && (
// // // // //               <div className="absolute z-50 mt-2">
// // // // //                 <DatePicker
// // // // //                   inline
// // // // //                   selected={checkOutDate}
// // // // //                   minDate={checkInDate || new Date()}
// // // // //                   onChange={(d) => {
// // // // //                     setCheckOutDate(d);
// // // // //                     validateField("checkOutDate", d);
// // // // //                     setOpenDatePickerFor(null);
// // // // //                   }}
// // // // //                 />
// // // // //               </div>
// // // // //             )}
// // // // //           </div>

// // // // //           {/* Room Numbers */}
// // // // //           <div className="mt-4">
// // // // //             <label className="font-semibold">Room Number(s):</label>

// // // // //             {loadingAvailableRooms ? (
// // // // //               <div className="mt-1 border px-3 py-2 bg-gray-50">Loading rooms...</div>
// // // // //             ) : (
// // // // //               <>
// // // // //                 <select
// // // // //                   value={selectedRoomNo}
// // // // //                   onChange={(e) => {
// // // // //                     setSelectedRoomNo(e.target.value);
// // // // //                     validateField("selectedRoomNo", e.target.value);
// // // // //                   }}
// // // // //                   className={inputClass("selectedRoomNo")}
// // // // //                 >
// // // // //                   <option value="">Select</option>
// // // // //                   {availableRooms.map((rn) => (
// // // // //                     <option key={rn} value={rn}>
// // // // //                       {rn}
// // // // //                     </option>
// // // // //                   ))}
// // // // //                 </select>

// // // // //                 {!availableRooms.length && (
// // // // //                   <p className="text-sm text-gray-600 mt-1">No rooms available.</p>
// // // // //                 )}
// // // // //               </>
// // // // //             )}
// // // // //           </div>

// // // // //           {/* Rooms Requested */}
// // // // //           <div className="flex gap-3 mt-4">
// // // // //             <div className="flex-1">
// // // // //               <label className="font-semibold">Rooms Requested:</label>
// // // // //               <input
// // // // //                 type="number"
// // // // //                 min="1"
// // // // //                 value={roomsRequested}
// // // // //                 onChange={(e) =>
// // // // //                   setRoomsRequested(parseInt(e.target.value) || 1)
// // // // //                 }
// // // // //                 className={inputClass("roomsRequested")}
// // // // //               />
// // // // //             </div>

// // // // //             <div className="flex-1">
// // // // //               <label className="font-semibold">Children:</label>
// // // // //               <input
// // // // //                 type="number"
// // // // //                 min="0"
// // // // //                 value={children}
// // // // //                 onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
// // // // //                 className="mt-1 border px-3 py-2 w-full"
// // // // //               />
// // // // //             </div>
// // // // //           </div>

// // // // //           <p className="font-semibold mt-2">Room Price: Nu. {roomPrice} / night</p>
// // // // //           <p className="font-semibold">Total Price: Nu. {totalPrice}</p>
// // // // //         </div>

// // // // //         {/* Guest / Agency Info */}
// // // // //         <div className="bg-white shadow p-4">
// // // // //           <h2 className="text-xl font-bold mb-3 py-2">Guest / Agency Information</h2>

// // // // //           {isAgencyBooking ? (
// // // // //             <>
// // // // //               <div>
// // // // //                 <label className="font-semibold">Agency Name:</label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   value={agencyName}
// // // // //                   onChange={(e) => {
// // // // //                     setAgencyName(e.target.value);
// // // // //                     validateField("agencyName", e.target.value);
// // // // //                   }}
// // // // //                   className={inputClass("agencyName")}
// // // // //                 />
// // // // //                 {errors.agencyName && <p className="text-red-500 text-sm">{errors.agencyName}</p>}
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="font-semibold">Agency Email (optional):</label>
// // // // //                 <input
// // // // //                   type="email"
// // // // //                   value={agencyEmail}
// // // // //                   onChange={(e) => {
// // // // //                     setAgencyEmail(e.target.value);
// // // // //                     validateField("email", e.target.value);
// // // // //                   }}
// // // // //                   className="mt-1 border px-3 py-2 w-full"
// // // // //                 />
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="font-semibold">Agency Phone (optional):</label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   value={agencyPhone}
// // // // //                   onChange={(e) => setAgencyPhone(e.target.value)}
// // // // //                   className="mt-1 border px-3 py-2 w-full"
// // // // //                 />
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="font-semibold">Agent Name:</label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   value={agentName}
// // // // //                   onChange={(e) => {
// // // // //                     setAgentName(e.target.value);
// // // // //                     validateField("agentName", e.target.value);
// // // // //                   }}
// // // // //                   className={inputClass("agentName")}
// // // // //                 />
// // // // //                 {errors.agentName && <p className="text-red-500 text-sm">{errors.agentName}</p>}
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="font-semibold">Country:</label>
// // // // //                 <select
// // // // //                   value={country}
// // // // //                   onChange={(e) => {
// // // // //                     const sel = e.target.value;
// // // // //                     setCountry(sel);
// // // // //                     const c = countries.find((x) => x.name === sel);
// // // // //                     setPhoneCode(c?.code || "+975");
// // // // //                   }}
// // // // //                   className="mt-1 border px-3 py-2 w-full"
// // // // //                 >
// // // // //                   {countries.map((c) => (
// // // // //                     <option key={c.name} value={c.name}>
// // // // //                       {c.name} ({c.code})
// // // // //                     </option>
// // // // //                   ))}
// // // // //                 </select>
// // // // //               </div>

// // // // //               <div className="mt-3">
// // // // //                 <label className="font-semibold">Types of Meals:</label>
// // // // //                 <div className="flex flex-col gap-2 mt-1">
// // // // //                   {["breakfast", "lunch", "dinner"].map((m) => (
// // // // //                     <label key={m} className="flex items-center gap-2">
// // // // //                       <input
// // // // //                         type="checkbox"
// // // // //                         checked={meals.includes(m)}
// // // // //                         onChange={() => toggleMeal(m)}
// // // // //                       />
// // // // //                       <span className="capitalize">{m}</span>
// // // // //                     </label>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>
// // // // //             </>
// // // // //           ) : (
// // // // //             <>
// // // // //               <div>
// // // // //                 <label className="font-semibold">First Name:</label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   value={firstName}
// // // // //                   onChange={(e) => {
// // // // //                     setFirstName(e.target.value);
// // // // //                     validateField("firstName", e.target.value);
// // // // //                   }}
// // // // //                   className={inputClass("firstName")}
// // // // //                 />
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="font-semibold">Last Name:</label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   value={lastName}
// // // // //                   onChange={(e) => {
// // // // //                     setLastName(e.target.value);
// // // // //                     validateField("lastName", e.target.value);
// // // // //                   }}
// // // // //                   className={inputClass("lastName")}
// // // // //                 />
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="font-semibold">Email:</label>
// // // // //                 <input
// // // // //                   type="email"
// // // // //                   value={email}
// // // // //                   onChange={(e) => {
// // // // //                     setEmail(e.target.value);
// // // // //                     validateField("email", e.target.value);
// // // // //                   }}
// // // // //                   className={inputClass("email")}
// // // // //                 />
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="font-semibold">Country:</label>
// // // // //                 <select
// // // // //                   value={country}
// // // // //                   onChange={(e) => {
// // // // //                     const sel = e.target.value;
// // // // //                     setCountry(sel);
// // // // //                     const c = countries.find((x) => x.name === sel);
// // // // //                     setPhoneCode(c?.code || "+975");
// // // // //                   }}
// // // // //                   className="mt-1 border px-3 py-2 w-full"
// // // // //                 >
// // // // //                   {countries.map((c) => (
// // // // //                     <option key={c.name} value={c.name}>
// // // // //                       {c.name} ({c.code})
// // // // //                     </option>
// // // // //                   ))}
// // // // //                 </select>
// // // // //               </div>

// // // // //               <div className="flex gap-2">
// // // // //                 <div className="flex-1">
// // // // //                   <label>Code:</label>
// // // // //                   <input
// // // // //                     type="text"
// // // // //                     readOnly
// // // // //                     value={phoneCode}
// // // // //                     className="mt-1 bg-gray-100 border px-3 py-2 w-full"
// // // // //                   />
// // // // //                 </div>

// // // // //                 <div className="flex-1">
// // // // //                   <label>Phone:</label>
// // // // //                   <input
// // // // //                     type="text"
// // // // //                     value={phone}
// // // // //                     onChange={(e) => setPhone(e.target.value)}
// // // // //                     className={inputClass("phone")}
// // // // //                   />
// // // // //                   {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="mt-3">
// // // // //                 <label className="font-semibold">Types of Meals:</label>
// // // // //                 <div className="flex flex-col gap-2 mt-1">
// // // // //                   {["breakfast", "lunch", "dinner"].map((m) => (
// // // // //                     <label key={m} className="flex items-center gap-2">
// // // // //                       <input
// // // // //                         type="checkbox"
// // // // //                         checked={meals.includes(m)}
// // // // //                         onChange={() => toggleMeal(m)}
// // // // //                       />
// // // // //                       <span className="capitalize">{m}</span>
// // // // //                     </label>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>
// // // // //             </>
// // // // //           )}

// // // // //           <div>
// // // // //             <label className="font-semibold">Journal Number:</label>
// // // // //             <input
// // // // //               type="text"
// // // // //               value={journalInput}
// // // // //               onChange={(e) => {
// // // // //                 setJournalInput(e.target.value);
// // // // //                 validateField("journalInput", e.target.value);
// // // // //               }}
// // // // //               className={inputClass("journalInput")}
// // // // //             />
// // // // //           </div>

// // // // //           <div>
// // // // //             <label>Special Request:</label>
// // // // //             <textarea
// // // // //               value={specialRequest}
// // // // //               onChange={(e) => setSpecialRequest(e.target.value)}
// // // // //               className="mt-1 border px-3 py-2 w-full"
// // // // //             />
// // // // //           </div>

// // // // //           {/* Confirm + Guaranteed */}
// // // // //           <div className="flex gap-3 mt-4">
// // // // //             <button
// // // // //               type="button"
// // // // //               onClick={() => submitAdminBooking("confirmed")}
// // // // //               className="flex-1 bg-[#006600] text-white px-6 py-2 shadow hover:bg-green-800"
// // // // //             >
// // // // //               Confirm Booking
// // // // //             </button>

// // // // //             <button
// // // // //               type="button"
// // // // //               onClick={() => submitAdminBooking("guaranteed")}
// // // // //               className="flex-1 bg-[#0044cc] text-white px-6 py-2 shadow hover:bg-blue-800"
// // // // //             >
// // // // //               Guaranteed Booking
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </form>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // // BookingForm.jsx
// // // // import React, { useEffect, useRef, useState } from "react";
// // // // import { useNavigate, useLocation } from "react-router-dom";
// // // // import DatePicker from "react-datepicker";
// // // // import "react-datepicker/dist/react-datepicker.css";
// // // // import Swal from "sweetalert2";
// // // // import { Calendar } from "lucide-react";

// // // // const API_URL = import.meta.env.VITE_API_URL || "";

// // // // const countries = [
// // // //   { name: "Bhutan", code: "+975" },
// // // //   // ... you can include full list, truncated here for brevity
// // // // ];

// // // // export default function BookingForm() {
// // // //   const navigate = useNavigate();
// // // //   const { state } = useLocation();

// // // //   // incoming
// // // //   const initialSelectedDate = state?.selectedDate ? new Date(state.selectedDate) : null;
// // // //   const selectedRoomTypeFromState = state?.roomType || "";

// // // //   // core states
// // // //   const [selectedRoomType, setSelectedRoomType] = useState(selectedRoomTypeFromState);
// // // //   const [roomTypeData, setRoomTypeData] = useState(null); // full obj as from DB

// // // //   const [checkInDate, setCheckInDate] = useState(initialSelectedDate);
// // // //   const [checkOutDate, setCheckOutDate] = useState(null);

// // // //   const [roomsRequested, setRoomsRequested] = useState(1);
// // // //   const [occupancyTypes, setOccupancyTypes] = useState(["double"]); // per room: 'single'|'double'|'twin'
// // // //   const [adults, setAdults] = useState(2);
// // // //   const [childrenCount, setChildrenCount] = useState(0);
// // // //   const [childAges, setChildAges] = useState([]); // e.g. [ "0-1", "6-11", "12+" ]
// // // //   const [mealPlan, setMealPlan] = useState("ep"); // 'ep'|'cp'|'map'|'ap'

// // // //   const [availableRooms, setAvailableRooms] = useState([]);
// // // //   const [selectedRoomNo, setSelectedRoomNo] = useState("");
// // // //   const [loadingAvailableRooms, setLoadingAvailableRooms] = useState(false);

// // // //   // guest/agency fields (kept simple)
// // // //   const [isAgencyBooking, setIsAgencyBooking] = useState(false);
// // // //   const [agencyName, setAgencyName] = useState("");
// // // //   const [agentName, setAgentName] = useState("");
// // // //   const [firstName, setFirstName] = useState("");
// // // //   const [lastName, setLastName] = useState("");
// // // //   const [email, setEmail] = useState("");
// // // //   const [country, setCountry] = useState("Bhutan");
// // // //   const [phoneCode, setPhoneCode] = useState("+975");
// // // //   const [phone, setPhone] = useState("");
// // // //   const [journalInput, setJournalInput] = useState("");
// // // //   const [specialRequest, setSpecialRequest] = useState("");

// // // //   // UI helpers
// // // //   const [openDatePickerFor, setOpenDatePickerFor] = useState(null);
// // // //   const datePickerRef = useRef();

// // // //   // errors & loading
// // // //   const [errors, setErrors] = useState({});

// // // //   // pricing/total
// // // //   const [perNightBreakdown, setPerNightBreakdown] = useState({
// // // //     baseRooms: 0,
// // // //     childrenTotal: 0,
// // // //     extraBeds: 0,
// // // //     mealsTotal: 0,
// // // //     grandPerNight: 0,
// // // //     nights: 1,
// // // //     grandTotal: 0,
// // // //   });

// // // //   // ---------------------------------------------------------------------------
// // // //   // Load room type full data (pricing etc) when selectedRoomType changes
// // // //   // ---------------------------------------------------------------------------
// // // //   useEffect(() => {
// // // //     if (!selectedRoomType) {
// // // //       setRoomTypeData(null);
// // // //       return;
// // // //     }

// // // //     const loadRoomType = async () => {
// // // //       try {
// // // //         const res = await fetch(`${API_URL}/rooms/room-types/${encodeURIComponent(selectedRoomType)}`, {
// // // //           credentials: "include",
// // // //         });
// // // //         if (!res.ok) {
// // // //           // handle gracefully: fallback to list endpoint
// // // //           const listRes = await fetch(`${API_URL}/rooms/room-types`, { credentials: "include" });
// // // //           const listJson = await listRes.json();
// // // //           const found = listJson.roomTypes?.find((r) => r.roomType === selectedRoomType);
// // // //           setRoomTypeData(found || null);
// // // //         } else {
// // // //           const json = await res.json();
// // // //           setRoomTypeData(json.roomType || json);
// // // //         }
// // // //       } catch (err) {
// // // //         console.error("Failed to fetch room type details:", err);
// // // //       }
// // // //     };

// // // //     loadRoomType();
// // // //   }, [selectedRoomType]);

// // // //   // ---------------------------------------------------------------------------
// // // //   // Sync occupancyTypes array to number of rooms requested
// // // //   // ---------------------------------------------------------------------------
// // // //   useEffect(() => {
// // // //     setOccupancyTypes((prev) => {
// // // //       const copy = [...prev];
// // // //       while (copy.length < roomsRequested) copy.push("double");
// // // //       return copy.slice(0, roomsRequested);
// // // //     });
// // // //   }, [roomsRequested]);

// // // //   // ---------------------------------------------------------------------------
// // // //   // Sync childAges to childrenCount
// // // //   // ---------------------------------------------------------------------------
// // // //   useEffect(() => {
// // // //     setChildAges((prev) => {
// // // //       const copy = [...prev];
// // // //       while (copy.length < childrenCount) copy.push("6-11");
// // // //       return copy.slice(0, childrenCount);
// // // //     });
// // // //   }, [childrenCount]);

// // // //   // ---------------------------------------------------------------------------
// // // //   // Fetch available room numbers for assignedRoom selections when dates & roomType set
// // // //   // ---------------------------------------------------------------------------
// // // //   useEffect(() => {
// // // //     const fetchAvailable = async () => {
// // // //       setAvailableRooms([]);
// // // //       setSelectedRoomNo("");
// // // //       if (!selectedRoomType || !checkInDate || !checkOutDate) return;

// // // //       const toYMD = (d) => {
// // // //         const yyyy = d.getFullYear();
// // // //         const mm = String(d.getMonth() + 1).padStart(2, "0");
// // // //         const dd = String(d.getDate()).padStart(2, "0");
// // // //         return `${yyyy}-${mm}-${dd}`;
// // // //       };
// // // //       const checkInStr = toYMD(checkInDate);
// // // //       const checkOutStr = toYMD(checkOutDate);

// // // //       setLoadingAvailableRooms(true);
// // // //       try {
// // // //         const url = `${API_URL}/rooms/available-numbers/${encodeURIComponent(selectedRoomType)}?checkIn=${checkInStr}&checkOut=${checkOutStr}`;
// // // //         const res = await fetch(url, { credentials: "include" });
// // // //         const data = await res.json();

// // // //         let arr = null;
// // // //         if (Array.isArray(data.availableRoomNumbers)) arr = data.availableRoomNumbers;
// // // //         else if (Array.isArray(data.available)) arr = data.available;
// // // //         else if (Array.isArray(data)) arr = data;

// // // //         if (Array.isArray(arr)) setAvailableRooms(arr.map(String));
// // // //       } catch (err) {
// // // //         console.error("Error loading available rooms", err);
// // // //       } finally {
// // // //         setLoadingAvailableRooms(false);
// // // //       }
// // // //     };

// // // //     fetchAvailable();
// // // //   }, [selectedRoomType, checkInDate, checkOutDate]);

// // // //   // ---------------------------------------------------------------------------
// // // //   // Validators (small)
// // // //   // ---------------------------------------------------------------------------
// // // //   const validateField = (field, value) => {
// // // //     let msg = "";
// // // //     switch (field) {
// // // //       case "firstName":
// // // //       case "lastName":
// // // //         if (!isAgencyBooking && !value.trim()) msg = "Required.";
// // // //         break;
// // // //       case "email":
// // // //         if (!isAgencyBooking) {
// // // //           if (!value.trim()) msg = "Required.";
// // // //           else if (!/^\S+@\S+\.\S+$/.test(value)) msg = "Invalid email.";
// // // //         }
// // // //         break;
// // // //       case "selectedRoomNo":
// // // //         if (!value.trim()) msg = "Please pick a room number.";
// // // //         break;
// // // //       case "checkInDate":
// // // //       case "checkOutDate":
// // // //         if (!value) msg = "Required.";
// // // //         break;
// // // //     }
// // // //     setErrors((p) => ({ ...p, [field]: msg }));
// // // //   };

// // // //   // ---------------------------------------------------------------------------
// // // //   // Utility: days between (nights)
// // // //   // ---------------------------------------------------------------------------
// // // //   const calcNights = (from, to) => {
// // // //     if (!from || !to) return 1;
// // // //     const diff = Math.ceil((to - from) / 86400000);
// // // //     return diff > 0 ? diff : 1;
// // // //   };

// // // //   // ---------------------------------------------------------------------------
// // // //   // Pricing calc (keeps in-sync whenever relevant inputs or roomTypeData change)
// // // //   // ---------------------------------------------------------------------------
// // // //   useEffect(() => {
// // // //     // default breakdown
// // // //     const breakdown = {
// // // //       baseRooms: 0,
// // // //       childrenTotal: 0,
// // // //       extraBeds: 0,
// // // //       mealsTotal: 0,
// // // //       grandPerNight: 0,
// // // //       nights: calcNights(checkInDate, checkOutDate),
// // // //       grandTotal: 0,
// // // //     };

// // // //     if (!roomTypeData || !roomTypeData.pricing) {
// // // //       setPerNightBreakdown(breakdown);
// // // //       return;
// // // //     }

// // // //     const pricing = roomTypeData.pricing;
// // // //     const occPerRoom = roomTypeData.occupancy || 2; // fallback occupancy value

// // // //     // per-room base price (sum across roomsRequested using their chosen occupancy)
// // // //     let baseRoomsTotal = 0;
// // // //     for (let i = 0; i < roomsRequested; i++) {
// // // //       const occ = occupancyTypes[i] || "double"; // single/double/twin
// // // //       // map 'twin' to 'double' pricing unless you have separate
// // // //       const occKey = occ === "twin" ? "double" : occ;

// // // //       // Guard: pricing[mealPlan] might exist, and then pricing[mealPlan][occKey]
// // // //       const mealBlock = pricing[mealPlan] || pricing.ep || {};
// // // //       const roomPrice = mealBlock[occKey] ?? 0;
// // // //       baseRoomsTotal += Number(roomPrice);
// // // //     }

// // // //     // children charge
// // // //     let childrenTotal = 0;
// // // //     if (Array.isArray(childAges)) {
// // // //       childAges.forEach((ageStr) => {
// // // //         // Interpret ageStr: expected "0-1", "1-5", "6-11", "12+"
// // // //         if (!ageStr) return;
// // // //         if (ageStr.includes("1-5") || ageStr.includes("0-5") || ageStr === "1-5") {
// // // //           // age1to5
// // // //           const amt = pricing.childPolicy?.age1to5?.price ?? 0;
// // // //           childrenTotal += Number(amt);
// // // //         } else if (ageStr.includes("6-11") || ageStr === "6-11") {
// // // //           // age6to11 per mealPlan
// // // //           const amt = pricing.childPolicy?.age6to11?.[mealPlan] ?? 0;
// // // //           childrenTotal += Number(amt);
// // // //         } else {
// // // //           // 12+ -> adult price: we'll charge same as one occupant price (choose first room's occupancy price)
// // // //           // choose average of occupancy types (or baseRoomsTotal/roomsRequested)
// // // //           const perRoomAvg = roomsRequested > 0 ? baseRoomsTotal / roomsRequested : 0;
// // // //           childrenTotal += perRoomAvg; // approximate adult price
// // // //         }
// // // //       });
// // // //     }

// // // //     // mealsTotal if pricing.meals exists and you want to charge per person (optional)
// // // //     // Many hotels include meal increments inside pricing blocks, so mealsTotal may be 0.
// // // //     // We'll compute extra per-person meal increments if pricing.meals.* present and guest wants individual meal add-ons (not using plan)
// // // //     let mealsTotal = 0;
// // // //     // (We assume mealPlan already handled inside pricing[mealPlan], so mealsTotal remains 0)

// // // //     // extra bed logic:
// // // //     // If total pax > allowed occupancy => compute extra bed count and price
// // // //     let extraBedsTotal = 0;
// // // //     try {
// // // //       const allowedTotal = Number(occPerRoom) * Number(roomsRequested);
// // // //       const pax = Number(adults) + Number(childrenCount);
// // // //       if (pax > allowedTotal) {
// // // //         const extraNeeded = pax - allowedTotal;
// // // //         // price per extra bed depends on mealPlan; handle mapDouble/mapSingle special keys
// // // //         let extraUnitPrice = 0;
// // // //         if (mealPlan === "map") {
// // // //           // pick mapDouble if occupancy is double else mapSingle
// // // //           const isDouble = occupancyTypes.some((o) => (o === "double" || o === "twin"));
// // // //           extraUnitPrice = pricing.extraBed?.mapDouble ?? pricing.extraBed?.mapSingle ?? 0;
// // // //         } else {
// // // //           extraUnitPrice = pricing.extraBed?.[mealPlan] ?? 0;
// // // //         }
// // // //         extraBedsTotal = Number(extraUnitPrice) * extraNeeded;
// // // //       }
// // // //     } catch (err) {
// // // //       console.warn("extra bed calc failed", err);
// // // //       extraBedsTotal = 0;
// // // //     }

// // // //     const grandPerNight = Number(baseRoomsTotal) + Number(childrenTotal) + Number(extraBedsTotal) + Number(mealsTotal);
// // // //     const nights = breakdown.nights;
// // // //     const grandTotal = grandPerNight * nights;

// // // //     breakdown.baseRooms = Number(baseRoomsTotal);
// // // //     breakdown.childrenTotal = Number(childrenTotal);
// // // //     breakdown.extraBeds = Number(extraBedsTotal);
// // // //     breakdown.mealsTotal = Number(mealsTotal);
// // // //     breakdown.grandPerNight = Number(grandPerNight);
// // // //     breakdown.nights = nights;
// // // //     breakdown.grandTotal = Number(grandTotal);

// // // //     setPerNightBreakdown(breakdown);
// // // //   }, [roomTypeData, roomsRequested, occupancyTypes, adults, childAges, childrenCount, mealPlan, checkInDate, checkOutDate]);

// // // //   // ---------------------------------------------------------------------------
// // // //   // Helpers for child age select
// // // //   // ---------------------------------------------------------------------------
// // // //   const childAgeOptions = [
// // // //     { value: "0-1", label: "0-1" },
// // // //     { value: "1-5", label: "1-5" },
// // // //     { value: "6-11", label: "6-11" },
// // // //     { value: "12+", label: "12+" },
// // // //   ];

// // // //   // ---------------------------------------------------------------------------
// // // //   // Submit booking (admin)
// // // //   // ---------------------------------------------------------------------------
// // // //   const toYMD = (d) => {
// // // //     if (!d) return "";
// // // //     const yyyy = d.getFullYear();
// // // //     const mm = String(d.getMonth() + 1).padStart(2, "0");
// // // //     const dd = String(d.getDate()).padStart(2, "0");
// // // //     return `${yyyy}-${mm}-${dd}`;
// // // //   };

// // // //   const submitBooking = async (status) => {
// // // //     // basic validation
// // // //     ["firstName", "lastName", "email", "checkInDate", "checkOutDate", "selectedRoomNo"].forEach((k) =>
// // // //       validateField(k, eval(k))
// // // //     );

// // // //     const assigned = selectedRoomNo ? selectedRoomNo.split(",").map((x) => x.trim()) : undefined;

// // // //     const roomSelection = [
// // // //       {
// // // //         roomType: selectedRoomType,
// // // //         roomsRequested,
// // // //         occupancyTypes,
// // // //       },
// // // //     ];

// // // //     const payload = {
// // // //       isAgencyBooking,
// // // //       agencyName: isAgencyBooking ? agencyName : undefined,
// // // //       agentName: isAgencyBooking ? agentName : undefined,

// // // //       country,
// // // //       firstName: !isAgencyBooking ? firstName : undefined,
// // // //       lastName: !isAgencyBooking ? lastName : undefined,
// // // //       email: !isAgencyBooking ? email : undefined,
// // // //       phone: !isAgencyBooking ? phone : undefined,

// // // //       checkIn: toYMD(checkInDate),
// // // //       checkOut: toYMD(checkOutDate),

// // // //       roomSelection,
// // // //       meals: mealPlan,
// // // //       specialRequest,
// // // //       assignedRoom: assigned,
// // // //       transactionNumber: journalInput || undefined,
// // // //       calculatedPricing: perNightBreakdown, // helpful for server-side reconciliation
// // // //       childAges,
// // // //       adults,
// // // //       childrenCount,
// // // //       statusOverride: status,
// // // //     };

// // // //     try {
// // // //       const res = await fetch(`${API_URL}/bookings/book-rooms`, {
// // // //         method: "POST",
// // // //         credentials: "include",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify(payload),
// // // //       });
// // // //       const data = await res.json();
// // // //       if (!res.ok) throw new Error(data.message || "Booking failed");
// // // //       await Swal.fire({
// // // //         title: "Success",
// // // //         text: `Booking created (${status})`,
// // // //         icon: "success",
// // // //         background: "#006600",
// // // //         color: "white",
// // // //       });
// // // //       navigate("/booking", { state: { activeTab: "BOOKED" } });
// // // //     } catch (err) {
// // // //       Swal.fire("Error", err.message || "Failed", "error");
// // // //     }
// // // //   };

// // // //   // ---------------------------------------------------------------------------
// // // //   // UI rendering
// // // //   // ---------------------------------------------------------------------------
// // // //   const formatDate = (d) =>
// // // //     d
// // // //       ? new Date(d).toLocaleDateString("en-GB", {
// // // //           day: "2-digit",
// // // //           month: "short",
// // // //           year: "numeric",
// // // //         })
// // // //       : "";

// // // //   useEffect(() => {
// // // //     const onDocClick = (e) => {
// // // //       if (!datePickerRef.current) return;
// // // //       if (!datePickerRef.current.contains(e.target)) setOpenDatePickerFor(null);
// // // //     };
// // // //     document.addEventListener("click", onDocClick);
// // // //     return () => document.removeEventListener("click", onDocClick);
// // // //   }, []);

// // // //   // ---------------------------------------------------------------------------
// // // //   // Render
// // // //   // ---------------------------------------------------------------------------
// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 px-2 py-4">
// // // //       <div className="flex items-center justify-between mb-2">
// // // //         <h1 className="text-2xl font-bold text-[#006600]">AVAILABLE Booking Details</h1>
// // // //         <button onClick={() => navigate(-1)} className="px-4 py-2 border border-gray-300  hover:bg-gray-100">
// // // //           Back
// // // //         </button>
// // // //       </div>

// // // //       {/* Toggle Agency */}
// // // //       <div className="flex justify-center mb-6">
// // // //         <div
// // // //           role="switch"
// // // //           aria-checked={isAgencyBooking}
// // // //           onClick={() => {
// // // //             setIsAgencyBooking((prev) => {
// // // //               const next = !prev;
// // // //               setErrors({});
// // // //               return next;
// // // //             });
// // // //           }}
// // // //           className="relative select-none cursor-pointer"
// // // //         >
// // // //           <div className="w-56 h-12 -full bg-gray-200 p-1 shadow-inner relative">
// // // //             <div className={`absolute top-1 left-1 h-10 w-1/2 -full bg-white shadow transition-transform duration-200 ${isAgencyBooking ? "translate-x-full" : ""}`} />
// // // //             <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
// // // //               <span className={!isAgencyBooking ? "text-[#006600]" : "text-gray-500"}>NORMAL</span>
// // // //               <span className={isAgencyBooking ? "text-[#006600]" : "text-gray-500"}>AGENCY</span>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //         {/* Left: Room Info */}
// // // //         <div className="bg-white shadow p-4">
// // // //           <h2 className="text-xl font-bold mb-3 py-2">Room Information</h2>

// // // //           {/* Room Type (readonly) */}
// // // //           <div>
// // // //             <label className="font-semibold">Room Type:</label>
// // // //             <div className="mt-1 border px-3 py-2 bg-gray-100 text-gray-800 ">{selectedRoomType || "—"}</div>
// // // //           </div>

// // // //           {/* Check-in */}
// // // //           <div className="relative mt-4" ref={datePickerRef}>
// // // //             <label className="font-semibold">Check-In:</label>
// // // //             <div
// // // //               onClick={(e) => {
// // // //                 e.stopPropagation();
// // // //                 setOpenDatePickerFor(openDatePickerFor === "checkin" ? null : "checkin");
// // // //               }}
// // // //               className="mt-1 w-full border px-3 py-3 flex justify-between cursor-pointer"
// // // //             >
// // // //               <span>{formatDate(checkInDate)}</span>
// // // //               <Calendar />
// // // //             </div>
// // // //             {openDatePickerFor === "checkin" && (
// // // //               <div className="absolute z-50 mt-2">
// // // //                 <DatePicker inline selected={checkInDate} minDate={new Date()} onChange={(d) => { setCheckInDate(d); validateField("checkInDate", d); setOpenDatePickerFor(null); }} />
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           {/* Check-out */}
// // // //           <div className="relative mt-4" ref={datePickerRef}>
// // // //             <label className="font-semibold">Check-Out:</label>
// // // //             <div
// // // //               onClick={(e) => {
// // // //                 e.stopPropagation();
// // // //                 setOpenDatePickerFor(openDatePickerFor === "checkout" ? null : "checkout");
// // // //               }}
// // // //               className="mt-1 w-full border px-3 py-3 flex justify-between cursor-pointer"
// // // //             >
// // // //               <span>{formatDate(checkOutDate)}</span>
// // // //               <Calendar />
// // // //             </div>
// // // //             {openDatePickerFor === "checkout" && (
// // // //               <div className="absolute z-50 mt-2">
// // // //                 <DatePicker inline selected={checkOutDate} minDate={checkInDate || new Date()} onChange={(d) => { setCheckOutDate(d); validateField("checkOutDate", d); setOpenDatePickerFor(null); }} />
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           {/* Room Numbers (available) */}
// // // //           <div className="mt-4">
// // // //             <label className="font-semibold">Room Number(s):</label>
// // // //             {loadingAvailableRooms ? (
// // // //               <div className="mt-1 border px-3 py-2 bg-gray-50">Loading rooms...</div>
// // // //             ) : (
// // // //               <>
// // // //                 <select value={selectedRoomNo} onChange={(e) => { setSelectedRoomNo(e.target.value); validateField("selectedRoomNo", e.target.value); }} className="mt-1 border px-3 py-2 w-full">
// // // //                   <option value="">Select</option>
// // // //                   {availableRooms.map((rn) => (
// // // //                     <option key={rn} value={rn}>
// // // //                       {rn}
// // // //                     </option>
// // // //                   ))}
// // // //                 </select>
// // // //                 {!availableRooms.length && <p className="text-sm text-gray-600 mt-1">No rooms available for these dates / type.</p>}
// // // //               </>
// // // //             )}
// // // //           </div>

// // // //           {/* Rooms Requested + occupancy per room */}
// // // //           <div className="flex gap-3 mt-4">
// // // //             <div className="flex-1">
// // // //               <label className="font-semibold">Rooms Requested:</label>
// // // //               <input type="number" min="1" value={roomsRequested} onChange={(e) => setRoomsRequested(Math.max(1, parseInt(e.target.value || "1")))} className="mt-1 border px-3 py-2 w-full" />
// // // //             </div>

// // // //             <div className="flex-1">
// // // //               <label className="font-semibold">Adults:</label>
// // // //               <input type="number" min="1" value={adults} onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value || "1")))} className="mt-1 border px-3 py-2 w-full" />
// // // //             </div>
// // // //           </div>

// // // //           {/* Children count + ages */}
// // // //           <div className="mt-3">
// // // //             <label className="font-semibold">Children:</label>
// // // //             <div className="flex gap-3 mt-1">
// // // //               <input type="number" min="0" value={childrenCount} onChange={(e) => setChildrenCount(Math.max(0, parseInt(e.target.value || "0")))} className="border px-3 py-2 w-24" />
// // // //               <div className="flex-1">
// // // //                 {Array.from({ length: childrenCount }).map((_, idx) => (
// // // //                   <div key={idx} className="mt-2">
// // // //                     <label className="text-sm">Child {idx + 1} age</label>
// // // //                     <select value={childAges[idx] || "6-11"} onChange={(e) => { const arr = [...childAges]; arr[idx] = e.target.value; setChildAges(arr); }} className="mt-1 border px-3 py-2 w-full">
// // // //                       {childAgeOptions.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
// // // //                     </select>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Occupancy per room selectors */}
// // // //           <div className="mt-4">
// // // //             <label className="font-semibold">Occupancy Type (per room):</label>
// // // //             <div className="mt-1 grid grid-cols-1 gap-2">
// // // //               {Array.from({ length: roomsRequested }).map((_, i) => (
// // // //                 <div key={i} className="flex items-center gap-2">
// // // //                   <div className="w-24">Room {i + 1}</div>
// // // //                   <select value={occupancyTypes[i] || "double"} onChange={(e) => { const arr = [...occupancyTypes]; arr[i] = e.target.value; setOccupancyTypes(arr); }} className="border px-3 py-2">
// // // //                     <option value="single">Single</option>
// // // //                     <option value="double">Double</option>
// // // //                     <option value="twin">Twin</option>
// // // //                   </select>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </div>

// // // //           {/* Meal Plan */}
// // // //           <div className="mt-4">
// // // //             <label className="font-semibold">Meal Plan</label>
// // // //             <select value={mealPlan} onChange={(e) => setMealPlan(e.target.value)} className="mt-1 border px-3 py-2 w-full">
// // // //               <option value="ep">EP</option>
// // // //               <option value="cp">CP</option>
// // // //               <option value="map">MAP</option>
// // // //               <option value="ap">AP</option>
// // // //             </select>
// // // //           </div>

// // // //           {/* Price summary */}
// // // //           <div className="mt-4 border-t pt-3">
// // // //             <p className="font-semibold">Summary</p>
// // // //             <div className="mt-2 text-sm">
// // // //               <div className="flex justify-between">
// // // //                 <span>Room(s) per night</span>
// // // //                 <span>Nu. {perNightBreakdown.baseRooms.toFixed(2)}</span>
// // // //               </div>
// // // //               <div className="flex justify-between">
// // // //                 <span>Children total / night</span>
// // // //                 <span>Nu. {perNightBreakdown.childrenTotal.toFixed(2)}</span>
// // // //               </div>
// // // //               <div className="flex justify-between">
// // // //                 <span>Extra beds / night</span>
// // // //                 <span>Nu. {perNightBreakdown.extraBeds.toFixed(2)}</span>
// // // //               </div>
// // // //               <hr className="my-2" />
// // // //               <div className="flex justify-between font-bold">
// // // //                 <span>Total per night</span>
// // // //                 <span>Nu. {perNightBreakdown.grandPerNight.toFixed(2)}</span>
// // // //               </div>
// // // //               <div className="flex justify-between mt-1">
// // // //                 <span>Length (nights)</span>
// // // //                 <span>{perNightBreakdown.nights}</span>
// // // //               </div>
// // // //               <div className="flex justify-between mt-2 text-xl font-extrabold">
// // // //                 <span>Grand total</span>
// // // //                 <span>Nu. {perNightBreakdown.grandTotal.toFixed(2)}</span>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Right: Guest / Agency Info */}
// // // //         <div className="bg-white shadow p-4">
// // // //           <h2 className="text-xl font-bold mb-3 py-2">Guest / Agency Information</h2>

// // // //           {isAgencyBooking ? (
// // // //             <>
// // // //               <div>
// // // //                 <label className="font-semibold">Agency Name:</label>
// // // //                 <input type="text" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} className="mt-1 border px-3 py-2 w-full" />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="font-semibold">Agent Name:</label>
// // // //                 <input type="text" value={agentName} onChange={(e) => setAgentName(e.target.value)} className="mt-1 border px-3 py-2 w-full" />
// // // //               </div>
// // // //             </>
// // // //           ) : (
// // // //             <>
// // // //               <div>
// // // //                 <label className="font-semibold">First Name:</label>
// // // //                 <input type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value); validateField("firstName", e.target.value); }} className="mt-1 border px-3 py-2 w-full" />
// // // //               </div>

// // // //               <div>
// // // //                 <label className="font-semibold">Last Name:</label>
// // // //                 <input type="text" value={lastName} onChange={(e) => { setLastName(e.target.value); validateField("lastName", e.target.value); }} className="mt-1 border px-3 py-2 w-full" />
// // // //               </div>

// // // //               <div>
// // // //                 <label className="font-semibold">Email:</label>
// // // //                 <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); validateField("email", e.target.value); }} className="mt-1 border px-3 py-2 w-full" />
// // // //               </div>

// // // //               <div className="mt-3">
// // // //                 <label className="font-semibold">Country:</label>
// // // //                 <select value={country} onChange={(e) => { const sel = e.target.value; setCountry(sel); const c = countries.find((x) => x.name === sel); setPhoneCode(c?.code || "+975"); }} className="mt-1 border px-3 py-2 w-full">
// // // //                   {countries.map((c) => (<option key={c.name} value={c.name}>{c.name} ({c.code})</option>))}
// // // //                 </select>
// // // //               </div>

// // // //               <div className="flex gap-2 mt-2">
// // // //                 <div className="w-32">
// // // //                   <label>Code</label>
// // // //                   <input readOnly value={phoneCode} className="mt-1 bg-gray-100 border px-3 py-2 w-full" />
// // // //                 </div>
// // // //                 <div className="flex-1">
// // // //                   <label>Phone</label>
// // // //                   <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 border px-3 py-2 w-full" />
// // // //                 </div>
// // // //               </div>
// // // //             </>
// // // //           )}

// // // //           <div className="mt-3">
// // // //             <label className="font-semibold">Journal Number:</label>
// // // //             <input type="text" value={journalInput} onChange={(e) => setJournalInput(e.target.value)} className="mt-1 border px-3 py-2 w-full" />
// // // //           </div>

// // // //           <div className="mt-3">
// // // //             <label>Special Request:</label>
// // // //             <textarea value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} className="mt-1 border px-3 py-2 w-full" />
// // // //           </div>

// // // //           <div className="flex gap-3 mt-4">
// // // //             <button type="button" onClick={() => submitBooking("confirmed")} className="flex-1 bg-[#006600] text-white px-6 py-2 shadow hover:bg-green-800">Confirm Booking</button>
// // // //             <button type="button" onClick={() => submitBooking("guaranteed")} className="flex-1 bg-[#0044cc] text-white px-6 py-2 shadow hover:bg-blue-800">Guaranteed Booking</button>
// // // //           </div>
// // // //         </div>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // }
// // // import React, { useEffect, useRef, useState } from "react";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import DatePicker from "react-datepicker";
// // // import "react-datepicker/dist/react-datepicker.css";
// // // import Swal from "sweetalert2";
// // // import { Calendar } from "lucide-react";

// // // const API_URL = import.meta.env.VITE_API_URL || "";

// // // const countries = [
// // //   { name: "Bhutan", code: "+975" },
// // //   { name: "India", code: "+91" },
// // //   { name: "Nepal", code: "+977" },
// // //   { name: "Bangladesh", code: "+880" },
// // //   { name: "Thailand", code: "+66" },
// // // ];
 
// // // export default function BookingForm() {
// // //   const navigate = useNavigate();
// // //   const { state } = useLocation();

// // //   const initialSelectedDate = state?.selectedDate ? new Date(state.selectedDate) : null;
// // //   const selectedRoomTypeFromState = state?.roomType || "";

// // //   // Core booking states
// // //   const [selectedRoomType, setSelectedRoomType] = useState(selectedRoomTypeFromState);
// // //   const [roomTypeData, setRoomTypeData] = useState(null);

// // //   const [checkInDate, setCheckInDate] = useState(initialSelectedDate);
// // //   const [checkOutDate, setCheckOutDate] = useState(null);

// // //   const [roomsRequested, setRoomsRequested] = useState(1);
// // //   const [meals, setMeals] = useState([]);

// // //   // Room selection (PREVENT duplicates)
// // //   const [selectedRoomNos, setSelectedRoomNos] = useState([]);

// // //   // Occupancy per room
// // //   const [occupancyTypes, setOccupancyTypes] = useState(["double"]);

// // //   // Guests
// // //   const [adults, setAdults] = useState(2);
// // //   const [childrenCount, setChildrenCount] = useState(0);
// // //   const [childAges, setChildAges] = useState([]);
// // //   const toggleMeal = (meal) => {
// // //     setMeals((prev) =>
// // //       prev.includes(meal)
// // //         ? prev.filter((m) => m !== meal)
// // //         : [...prev, meal]
// // //     );
// // //   };

// // //   // Meal plan
// // //   const [mealPlan, setMealPlan] = useState("ep");

// // //   // Guest/Agency
// // //   const [isAgencyBooking, setIsAgencyBooking] = useState(false);
// // //   const [agencyName, setAgencyName] = useState("");
// // //   const [agentName, setAgentName] = useState("");
// // //   const [firstName, setFirstName] = useState("");
// // //   const [lastName, setLastName] = useState("");
// // //   const [email, setEmail] = useState("");
// // //   const [country, setCountry] = useState("Bhutan");
// // //   const [phoneCode, setPhoneCode] = useState("+975");
// // //   const [phone, setPhone] = useState("");
// // //   const [journalInput, setJournalInput] = useState("");
// // //   const [specialRequest, setSpecialRequest] = useState("");

// // //   const [errors, setErrors] = useState({});
// // //   const [loadingAvailableRooms, setLoadingAvailableRooms] = useState(false);
// // //   const [availableRooms, setAvailableRooms] = useState([]);

// // //   const [openDatePickerFor, setOpenDatePickerFor] = useState(null);
// // //   const datePickerRef = useRef();

// // //   const [perNightBreakdown, setPerNightBreakdown] = useState({
// // //     baseRooms: 0,
// // //     childrenTotal: 0,
// // //     extraBeds: 0,
// // //     grandPerNight: 0,
// // //     nights: 1,
// // //     grandTotal: 0,
// // //   });

// // //   // ----------------------------
// // //   // KEEP selectedRoomNos length = roomsRequested
// // //   // ----------------------------
// // //   useEffect(() => {
// // //     setSelectedRoomNos((prev) => {
// // //       const arr = [...prev];
// // //       while (arr.length < roomsRequested) arr.push("");
// // //       return arr.slice(0, roomsRequested);
// // //     });
// // //   }, [roomsRequested]);

// // //   // ----------------------------
// // //   // KEEP occupancyTypes length = roomsRequested
// // //   // ----------------------------
// // //   useEffect(() => {
// // //     setOccupancyTypes((prev) => {
// // //       const arr = [...prev];
// // //       while (arr.length < roomsRequested) arr.push("double");
// // //       return arr.slice(0, roomsRequested);
// // //     });
// // //   }, [roomsRequested]);

// // //   // ----------------------------
// // //   // KEEP childAges length = childrenCount
// // //   // ----------------------------
// // //   useEffect(() => {
// // //     setChildAges((prev) => {
// // //       const arr = [...prev];
// // //       while (arr.length < childrenCount) arr.push("6-11");
// // //       return arr.slice(0, childrenCount);
// // //     });
// // //   }, [childrenCount]);

// // //   // ----------------------------
// // //   // FETCH room type pricing details
// // //   // ----------------------------
// // //   useEffect(() => {
// // //     if (!selectedRoomType) return;

// // //     const load = async () => {
// // //       try {
// // //         const res = await fetch(
// // //           `${API_URL}/rooms/room-types/${encodeURIComponent(selectedRoomType)}`,
// // //           { credentials: "include" }
// // //         );

// // //         if (!res.ok) {
// // //           const list = await fetch(`${API_URL}/rooms/room-types`, {
// // //             credentials: "include",
// // //           });
// // //           const json = await list.json();
// // //           const found = json.roomTypes?.find((r) => r.roomType === selectedRoomType);
// // //           setRoomTypeData(found || null);
// // //           return;
// // //         }

// // //         const json = await res.json();
// // //         setRoomTypeData(json.roomType || json);
// // //       } catch (e) {
// // //         console.error("Failed to load room type info", e);
// // //       }
// // //     };

// // //     load();
// // //   }, [selectedRoomType]);
// // //   // ----------------------------
// // //   // FETCH available room numbers when dates & room type set
// // //   // ----------------------------
// // //   useEffect(() => {
// // //     const fetchAvailable = async () => {
// // //       setAvailableRooms([]);
// // //       setSelectedRoomNos((prev) => prev.map(() => "")); // clear selections when dates/type change
// // //       if (!selectedRoomType || !checkInDate || !checkOutDate) return;

// // //       const toYMD = (d) => {
// // //         const yyyy = d.getFullYear();
// // //         const mm = String(d.getMonth() + 1).padStart(2, "0");
// // //         const dd = String(d.getDate()).padStart(2, "0");
// // //         return `${yyyy}-${mm}-${dd}`;
// // //       };
// // //       const checkInStr = toYMD(checkInDate);
// // //       const checkOutStr = toYMD(checkOutDate);

// // //       setLoadingAvailableRooms(true);
// // //       try {
// // //         const url = `${API_URL}/rooms/available-numbers/${encodeURIComponent(selectedRoomType)}?checkIn=${checkInStr}&checkOut=${checkOutStr}`;
// // //         const res = await fetch(url, { credentials: "include" });
// // //         const data = await res.json();

// // //         let arr = null;
// // //         if (Array.isArray(data.availableRoomNumbers)) arr = data.availableRoomNumbers;
// // //         else if (Array.isArray(data.available)) arr = data.available;
// // //         else if (Array.isArray(data)) arr = data;

// // //         if (Array.isArray(arr)) setAvailableRooms(arr.map(String));
// // //       } catch (err) {
// // //         console.error("Error loading available rooms", err);
// // //       } finally {
// // //         setLoadingAvailableRooms(false);
// // //       }
// // //     };

// // //     fetchAvailable();
// // //   }, [selectedRoomType, checkInDate, checkOutDate]);

// // //   // ----------------------------
// // //   // Basic validators
// // //   // ----------------------------
// // //   const validateField = (field, value) => {
// // //     let msg = "";
// // //     switch (field) {
// // //       case "firstName":
// // //       case "lastName":
// // //         if (!isAgencyBooking && !value?.toString().trim()) msg = "Required.";
// // //         break;
// // //       case "email":
// // //         if (!isAgencyBooking) {
// // //           if (!value?.toString().trim()) msg = "Required.";
// // //           else if (!/^\S+@\S+\.\S+$/.test(value)) msg = "Invalid email.";
// // //         }
// // //         break;
// // //       case "checkInDate":
// // //       case "checkOutDate":
// // //         if (!value) msg = "Required.";
// // //         break;
// // //       default:
// // //         msg = "";
// // //     }
// // //     setErrors((p) => ({ ...p, [field]: msg }));
// // //   };

// // //   // ----------------------------
// // //   // Nights calculation
// // //   // ----------------------------
// // //   const calcNights = (from, to) => {
// // //     if (!from || !to) return 1;
// // //     const diff = Math.ceil((to - from) / 86400000);
// // //     return diff > 0 ? diff : 1;
// // //   };

// // //   // ----------------------------
// // //   // Pricing calculation (uses schema structure)
// // //   // ----------------------------
// // //   useEffect(() => {
// // //     const breakdown = {
// // //       baseRooms: 0,
// // //       childrenTotal: 0,
// // //       extraBeds: 0,
// // //       grandPerNight: 0,
// // //       nights: calcNights(checkInDate, checkOutDate),
// // //       grandTotal: 0,
// // //     };

// // //     if (!roomTypeData || !roomTypeData.pricing) {
// // //       setPerNightBreakdown(breakdown);
// // //       return;
// // //     }

// // //     const pricing = roomTypeData.pricing;
// // //     const occPerRoom = Number(roomTypeData.occupancy || 2);

// // //     // base room prices depending on occupancy types & meal plan
// // //     let base = 0;
// // //     for (let i = 0; i < roomsRequested; i++) {
// // //       const occ = occupancyTypes[i] || "double";
// // //       const occKey = occ === "twin" ? "double" : occ; // map twin -> double pricing
// // //       const mealBlock = pricing[mealPlan] || pricing.ep || {};
// // //       const roomPrice = Number(mealBlock[occKey] ?? 0);
// // //       base += roomPrice;
// // //     }

// // //     // children pricing
// // //     let childrenTotal = 0;
// // //     childAges.forEach((ageStr) => {
// // //       if (!ageStr) return;
// // //       if (ageStr.includes("1-5") || ageStr.includes("0-1") || ageStr === "1-5") {
// // //         childrenTotal += Number(pricing.childPolicy?.age1to5?.price ?? 0);
// // //       } else if (ageStr.includes("6-11") || ageStr === "6-11") {
// // //         childrenTotal += Number(pricing.childPolicy?.age6to11?.[mealPlan] ?? 0);
// // //       } else {
// // //         // 12+ treated as adult: average per-room price (fallback)
// // //         const avgPerRoom = roomsRequested > 0 ? base / roomsRequested : 0;
// // //         childrenTotal += avgPerRoom;
// // //       }
// // //     });

// // //     // extra bed logic: if pax > capacity, charge extras
// // //     let extraBedTotal = 0;
// // //     try {
// // //       const capacity = occPerRoom * roomsRequested;
// // //       const pax = Number(adults) + Number(childrenCount);
// // //       if (pax > capacity) {
// // //         const extraNeeded = pax - capacity;
// // //         let unit = 0;
// // //         if (mealPlan === "map") {
// // //           unit = Number(pricing.extraBed?.mapDouble ?? pricing.extraBed?.mapSingle ?? 0);
// // //         } else {
// // //           unit = Number(pricing.extraBed?.[mealPlan] ?? 0);
// // //         }
// // //         extraBedTotal = unit * extraNeeded;
// // //       }
// // //     } catch (err) {
// // //       extraBedTotal = 0;
// // //     }

// // //     const grandPerNight = base + childrenTotal + extraBedTotal;
// // //     const nights = breakdown.nights;
// // //     const grandTotal = grandPerNight * nights;

// // //     breakdown.baseRooms = Number(base);
// // //     breakdown.childrenTotal = Number(childrenTotal);
// // //     breakdown.extraBeds = Number(extraBedTotal);
// // //     breakdown.grandPerNight = Number(grandPerNight);
// // //     breakdown.nights = nights;
// // //     breakdown.grandTotal = Number(grandTotal);

// // //     setPerNightBreakdown(breakdown);
// // //   }, [roomTypeData, roomsRequested, occupancyTypes, adults, childAges, childrenCount, mealPlan, checkInDate, checkOutDate]);

// // //   // ----------------------------
// // //   // Child age options helper
// // //   // ----------------------------
// // //   const childAgeOptions = [
// // //     { value: "0-1", label: "0-1" },
// // //     { value: "1-5", label: "1-5" },
// // //     { value: "6-11", label: "6-11" },
// // //     { value: "12+", label: "12+" },
// // //   ];

// // //   // ----------------------------
// // //   // Helper: options for a particular room dropdown index (prevents duplicates)
// // //   // ----------------------------
// // //   const optionsForIndex = (index) => {
// // //     // return availableRooms excluding any selected in other indexes
// // //     const selectedOthers = selectedRoomNos.filter((_, i) => i !== index && selectedRoomNos[i]);
// // //     return availableRooms.filter((r) => !selectedOthers.includes(r));
// // //   };

// // //   // ----------------------------
// // //   // Submit booking
// // //   // ----------------------------
// // //   const toYMD = (d) => {
// // //     if (!d) return "";
// // //     const yyyy = d.getFullYear();
// // //     const mm = String(d.getMonth() + 1).padStart(2, "0");
// // //     const dd = String(d.getDate()).padStart(2, "0");
// // //     return `${yyyy}-${mm}-${dd}`;
// // //   };

// // //   const submitBooking = async (status) => {
// // //     // basic validation
// // //     validateField("firstName", firstName);
// // //     validateField("lastName", lastName);
// // //     validateField("email", email);
// // //     validateField("checkInDate", checkInDate);
// // //     validateField("checkOutDate", checkOutDate);

// // //     // ensure assigned rooms count matches roomsRequested if availableRooms exist
// // //     const assigned = selectedRoomNos.filter((x) => x && x.trim());
// // //     if (assigned.length !== roomsRequested) {
// // //       Swal.fire("Error", `Please select ${roomsRequested} room number(s).`, "error");
// // //       return;
// // //     }

// // //     const payload = {
// // //       isAgencyBooking,
// // //       agencyName: isAgencyBooking ? agencyName : undefined,
// // //       agentName: isAgencyBooking ? agentName : undefined,

// // //       country,
// // //       firstName: !isAgencyBooking ? firstName : undefined,
// // //       lastName: !isAgencyBooking ? lastName : undefined,
// // //       email: !isAgencyBooking ? email : undefined,
// // //       phone: !isAgencyBooking ? phone : undefined,

// // //       checkIn: toYMD(checkInDate),
// // //       checkOut: toYMD(checkOutDate),

// // //       roomSelection: [{ roomType: selectedRoomType, roomsRequested, occupancyTypes }],
// // //       meals: mealPlan,
// // //       specialRequest,
// // //       assignedRoom: assigned,
// // //       transactionNumber: journalInput || undefined,
// // //       calculatedPricing: perNightBreakdown,
// // //       childAges,
// // //       adults,
// // //       childrenCount,
// // //       statusOverride: status,
// // //       meals: meals.length ? meals : undefined,

      
// // //     };

// // //     try {
// // //       const res = await fetch(`${API_URL}/bookings/book-rooms`, {
// // //         method: "POST",
// // //         credentials: "include",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(payload),
// // //       });
// // //       const data = await res.json();
// // //       if (!res.ok) throw new Error(data.message || "Booking failed");
// // //       await Swal.fire({ title: "Success", text: `Booking created (${status})`, icon: "success", background: "#006600", color: "white" });
// // //       navigate("/booking", { state: { activeTab: "BOOKED" } });
// // //     } catch (err) {
// // //       Swal.fire("Error", err.message || "Failed to create booking", "error");
// // //     }
// // //   };
// // //   // ----------------------------
// // //   // RENDER UI
// // //   // ----------------------------
// // //   const formatDate = (d) =>
// // //     d
// // //       ? new Date(d).toLocaleDateString("en-GB", {
// // //           day: "2-digit",
// // //           month: "short",
// // //           year: "numeric",
// // //         })
// // //       : "";

// // //   useEffect(() => {
// // //     const onDocClick = (e) => {
// // //       if (!datePickerRef.current) return;
// // //       if (!datePickerRef.current.contains(e.target)) setOpenDatePickerFor(null);
// // //     };
// // //     document.addEventListener("click", onDocClick);
// // //     return () => document.removeEventListener("click", onDocClick);
// // //   }, []);

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 px-2 py-4">
// // //       <div className="flex items-center justify-between mb-2">
// // //         <h1 className="text-2xl font-bold text-[#006600]">AVAILABLE Booking Details</h1>
// // //         <button onClick={() => navigate(-1)} className="px-4 py-2 border border-gray-300 hover:bg-gray-100">
// // //           Back
// // //         </button>
// // //       </div>

// // //       {/* Agency toggle */}
// // //       <div className="flex justify-center mb-6">
// // //         <div
// // //           role="switch"
// // //           aria-checked={isAgencyBooking}
// // //           onClick={() => {
// // //             setIsAgencyBooking((p) => !p);
// // //             setErrors({});
// // //           }}
// // //           className="relative select-none cursor-pointer"
// // //         >
// // //           <div className="w-56 h-12 -full bg-gray-200 p-1 shadow-inner relative">
// // //             <div className={`absolute top-1 left-1 h-10 w-1/2 -full bg-white shadow transition-transform duration-200 ${isAgencyBooking ? "translate-x-full" : ""}`} />
// // //             <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
// // //               <span className={!isAgencyBooking ? "text-[#006600]" : "text-gray-500"}>NORMAL</span>
// // //               <span className={isAgencyBooking ? "text-[#006600]" : "text-gray-500"}>AGENCY</span>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //         {/* ---------------- LEFT: Room Info ---------------- */}
// // //         <div className="bg-white shadow p-4">
// // //           <h2 className="text-xl font-bold mb-3 py-2">Room Information</h2>

// // //           {/* Room Type (readonly) */}
// // //           <div>
// // //             <label className="font-semibold">Room Type:</label>
// // //             <div className="mt-1 border px-3 py-2 bg-gray-100 text-gray-800">{selectedRoomType || "—"}</div>
// // //           </div>

// // //           {/* Check-In */}
// // //           <div className="relative mt-4" ref={datePickerRef}>
// // //             <label className="font-semibold">Check-In:</label>
// // //             <div
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setOpenDatePickerFor(openDatePickerFor === "checkin" ? null : "checkin");
// // //               }}
// // //               className="mt-1 w-full border px-3 py-3 flex justify-between cursor-pointer"
// // //             >
// // //               <span>{formatDate(checkInDate)}</span>
// // //               <Calendar />
// // //             </div>

// // //             {openDatePickerFor === "checkin" && (
// // //               <div className="absolute z-50 mt-2">
// // //                 <DatePicker
// // //                   inline
// // //                   selected={checkInDate}
// // //                   minDate={new Date()}
// // //                   onChange={(d) => {
// // //                     setCheckInDate(d);
// // //                     validateField("checkInDate", d);
// // //                     setOpenDatePickerFor(null);
// // //                   }}
// // //                 />
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Check-Out */}
// // //           <div className="relative mt-4" ref={datePickerRef}>
// // //             <label className="font-semibold">Check-Out:</label>
// // //             <div
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setOpenDatePickerFor(openDatePickerFor === "checkout" ? null : "checkout");
// // //               }}
// // //               className="mt-1 w-full border px-3 py-3 flex justify-between cursor-pointer"
// // //             >
// // //               <span>{formatDate(checkOutDate)}</span>
// // //               <Calendar />
// // //             </div>

// // //             {openDatePickerFor === "checkout" && (
// // //               <div className="absolute z-50 mt-2">
// // //                 <DatePicker
// // //                   inline
// // //                   selected={checkOutDate}
// // //                   minDate={checkInDate || new Date()}
// // //                   onChange={(d) => {
// // //                     setCheckOutDate(d);
// // //                     validateField("checkOutDate", d);
// // //                     setOpenDatePickerFor(null);
// // //                   }}
// // //                 />
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Room Numbers (dynamic) */}
// // //           <div className="mt-4">
// // //             <label className="font-semibold">Room Number(s):</label>

// // //             {loadingAvailableRooms ? (
// // //               <div className="mt-1 border px-3 py-2 bg-gray-50">Loading rooms...</div>
// // //             ) : (
// // //               <>
// // //                 {Array.from({ length: roomsRequested }).map((_, idx) => (
// // //                   <div key={idx} className="mt-2">
// // //                     <label className="text-sm">Room {idx + 1}</label>
// // //                     <select
// // //                       value={selectedRoomNos[idx] || ""}
// // //                       onChange={(e) => {
// // //                         const arr = [...selectedRoomNos];
// // //                         arr[idx] = e.target.value;
// // //                         setSelectedRoomNos(arr);
// // //                       }}
// // //                       className="mt-1 border px-3 py-2 w-full"
// // //                     >
// // //                       <option value="">Select</option>
// // //                       {optionsForIndex(idx).map((rn) => (
// // //                         <option key={rn} value={rn}>
// // //                           {rn}
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                   </div>
// // //                 ))}

// // //                 {!availableRooms.length && (
// // //                   <p className="text-sm text-gray-600 mt-1">No rooms available for these dates / type.</p>
// // //                 )}
// // //               </>
// // //             )}
// // //           </div>

// // //           {/* Rooms requested and counts */}
// // //           <div className="flex gap-3 mt-4">
// // //             <div className="flex-1">
// // //               <label className="font-semibold">Rooms Requested:</label>
// // //               <input
// // //                 type="number"
// // //                 min="1"
// // //                 value={roomsRequested}
// // //                 onChange={(e) => setRoomsRequested(Math.max(1, parseInt(e.target.value || "1")))}
// // //                 className="mt-1 border px-3 py-2 w-full"
// // //               />
// // //             </div>

// // //             <div className="flex-1">
// // //               <label className="font-semibold">Adults:</label>
// // //               <input
// // //                 type="number"
// // //                 min="1"
// // //                 value={adults}
// // //                 onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value || "1")))}
// // //                 className="mt-1 border px-3 py-2 w-full"
// // //               />
// // //             </div>
// // //           </div>

// // //           {/* Children */}
// // //           <div className="mt-3">
// // //             <label className="font-semibold">Children:</label>
// // //             <div className="flex gap-3 mt-1">
// // //               <input
// // //                 type="number"
// // //                 min="0"
// // //                 value={childrenCount}
// // //                 onChange={(e) => setChildrenCount(Math.max(0, parseInt(e.target.value || "0")))}
// // //                 className="border px-3 py-2 w-24"
// // //               />
// // //               <div className="flex-1">
// // //                 {Array.from({ length: childrenCount }).map((_, idx) => (
// // //                   <div key={idx} className="mt-2">
// // //                     <label className="text-sm">Child {idx + 1} age</label>
// // //                     <select
// // //                       value={childAges[idx] || "6-11"}
// // //                       onChange={(e) => {
// // //                         const arr = [...childAges];
// // //                         arr[idx] = e.target.value;
// // //                         setChildAges(arr);
// // //                       }}
// // //                       className="mt-1 border px-3 py-2 w-full"
// // //                     >
// // //                       {childAgeOptions.map((o) => (
// // //                         <option key={o.value} value={o.value}>
// // //                           {o.label}
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Occupancy per room */}
// // //           <div className="mt-4">
// // //             <label className="font-semibold">Occupancy Type (per room):</label>
// // //             <div className="mt-1 grid grid-cols-1 gap-2">
// // //               {Array.from({ length: roomsRequested }).map((_, i) => (
// // //                 <div key={i} className="flex items-center gap-2">
// // //                   <div className="w-24">Room {i + 1}</div>
// // //                   <select
// // //                     value={occupancyTypes[i] || "double"}
// // //                     onChange={(e) => {
// // //                       const arr = [...occupancyTypes];
// // //                       arr[i] = e.target.value;
// // //                       setOccupancyTypes(arr);
// // //                     }}
// // //                     className="border px-3 py-2"
// // //                   >
// // //                     <option value="single">Single</option>
// // //                     <option value="double">Double</option>
// // //                     <option value="twin">Twin</option>
// // //                   </select>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           {/* Meal Plan */}
// // //           <div className="mt-4">
// // //             <label className="font-semibold">Meal Plan</label>
// // //             <select value={mealPlan} onChange={(e) => setMealPlan(e.target.value)} className="mt-1 border px-3 py-2 w-full">
// // //               <option value="ep">EP</option>
// // //               <option value="cp">CP</option>
// // //               <option value="map">MAP</option>
// // //               <option value="ap">AP</option>
// // //             </select>
// // //           </div>

// // //           {/* Price summary */}
// // //           <div className="mt-4 border-t pt-3">
// // //             <p className="font-semibold">Summary</p>
// // //             <div className="mt-2 text-sm">
// // //               <div className="flex justify-between">
// // //                 <span>Room(s) per night</span>
// // //                 <span>Nu. {perNightBreakdown.baseRooms.toFixed(2)}</span>
// // //               </div>
// // //               <div className="flex justify-between">
// // //                 <span>Children total / night</span>
// // //                 <span>Nu. {perNightBreakdown.childrenTotal.toFixed(2)}</span>
// // //               </div>
// // //               <div className="flex justify-between">
// // //                 <span>Extra beds / night</span>
// // //                 <span>Nu. {perNightBreakdown.extraBeds.toFixed(2)}</span>
// // //               </div>
// // //               <hr className="my-2" />
// // //               <div className="flex justify-between font-bold">
// // //                 <span>Total per night</span>
// // //                 <span>Nu. {perNightBreakdown.grandPerNight.toFixed(2)}</span>
// // //               </div>
// // //               <div className="flex justify-between mt-1">
// // //                 <span>Length (nights)</span>
// // //                 <span>{perNightBreakdown.nights}</span>
// // //               </div>
// // //               <div className="flex justify-between mt-2 text-xl font-extrabold">
// // //                 <span>Grand total</span>
// // //                 <span>Nu. {perNightBreakdown.grandTotal.toFixed(2)}</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //         {/* ---------------- RIGHT: Guest / Agency Information ---------------- */}
// // //         <div className="bg-white shadow p-4">
// // //           <h2 className="text-xl font-bold mb-3 py-2">Guest / Agency Information</h2>

// // //           {isAgencyBooking ? (
// // //             <>
// // //               {/* Agency Name */}
// // //               <div>
// // //                 <label className="font-semibold">Agency Name:</label>
// // //                 <input
// // //                   type="text"
// // //                   value={agencyName}
// // //                   onChange={(e) => setAgencyName(e.target.value)}
// // //                   className="mt-1 border px-3 py-2 w-full"
// // //                 />
// // //               </div>

// // //               {/* Agent Name */}
// // //               <div className="mt-3">
// // //                 <label className="font-semibold">Agent Name:</label>
// // //                 <input
// // //                   type="text"
// // //                   value={agentName}
// // //                   onChange={(e) => setAgentName(e.target.value)}
// // //                   className="mt-1 border px-3 py-2 w-full"
// // //                 />
// // //               </div>
// // //             </>
// // //           ) : (
// // //             <>
// // //               {/* First Name */}
// // //               <div>
// // //                 <label className="font-semibold">First Name:</label>
// // //                 <input
// // //                   type="text"
// // //                   value={firstName}
// // //                   onChange={(e) => {
// // //                     setFirstName(e.target.value);
// // //                     validateField("firstName", e.target.value);
// // //                   }}
// // //                   className="mt-1 border px-3 py-2 w-full"
// // //                 />
// // //                 {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
// // //               </div>

// // //               {/* Last Name */}
// // //               <div className="mt-3">
// // //                 <label className="font-semibold">Last Name:</label>
// // //                 <input
// // //                   type="text"
// // //                   value={lastName}
// // //                   onChange={(e) => {
// // //                     setLastName(e.target.value);
// // //                     validateField("lastName", e.target.value);
// // //                   }}
// // //                   className="mt-1 border px-3 py-2 w-full"
// // //                 />
// // //                 {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
// // //               </div>

// // //               {/* Email */}
// // //               <div className="mt-3">
// // //                 <label className="font-semibold">Email:</label>
// // //                 <input
// // //                   type="email"
// // //                   value={email}
// // //                   onChange={(e) => {
// // //                     setEmail(e.target.value);
// // //                     validateField("email", e.target.value);
// // //                   }}
// // //                   className="mt-1 border px-3 py-2 w-full"
// // //                 />
// // //                 {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
// // //               </div>

// // //               {/* Country */}
// // //               <div className="mt-3">
// // //                 <label className="font-semibold">Country:</label>
// // //                 <select
// // //                   value={country}
// // //                   onChange={(e) => {
// // //                     const sel = e.target.value;
// // //                     setCountry(sel);
// // //                     const c = countries.find((x) => x.name === sel);
// // //                     setPhoneCode(c?.code || "+975");
// // //                   }}
// // //                   className="mt-1 border px-3 py-2 w-full"
// // //                 >
// // //                   {countries.map((c) => (
// // //                     <option key={c.name} value={c.name}>
// // //                       {c.name} ({c.code})
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //               </div>

// // //               {/* Phone Code + Number */}
// // //               <div className="flex gap-2 mt-3">
// // //                 <div className="w-32">
// // //                   <label>Code</label>
// // //                   <input
// // //                     readOnly
// // //                     value={phoneCode}
// // //                     className="mt-1 bg-gray-100 border px-3 py-2 w-full"
// // //                   />
// // //                 </div>

// // //                 <div className="flex-1">
// // //                   <label>Phone</label>
// // //                   <input
// // //                     type="text"
// // //                     value={phone}
// // //                     onChange={(e) => setPhone(e.target.value)}
// // //                     className="mt-1 border px-3 py-2 w-full"
// // //                   />
// // //                 </div>
// // //               </div>
// // //             </>
// // //           )}
// // //           {/* Meals (Breakfast, Lunch, Dinner) */}
// // //           <div className="mt-4">
// // //             <label className="font-semibold">Meals Required:</label>
// // //             <div className="flex flex-col gap-2 mt-1">
// // //               {["breakfast", "lunch", "dinner"].map((m) => (
// // //                 <label key={m} className="flex items-center gap-2">
// // //                   <input
// // //                     type="checkbox"
// // //                     checked={meals.includes(m)}
// // //                     onChange={() => toggleMeal(m)}
// // //                   />
// // //                   <span className="capitalize">{m}</span>
// // //                 </label>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           {/* Journal Number */}
// // //           <div className="mt-3">
// // //             <label className="font-semibold">Journal Number:</label>
// // //             <input
// // //               type="text"
// // //               value={journalInput}
// // //               onChange={(e) => setJournalInput(e.target.value)}
// // //               className="mt-1 border px-3 py-2 w-full"
// // //             />
// // //           </div>

// // //           {/* Special Request */}
// // //           <div className="mt-3">
// // //             <label className="font-semibold">Special Request:</label>
// // //             <textarea
// // //               value={specialRequest}
// // //               onChange={(e) => setSpecialRequest(e.target.value)}
// // //               className="mt-1 border px-3 py-2 w-full"
// // //             />
// // //           </div>

// // //           {/* Buttons */}
// // //           <div className="flex gap-3 mt-6">
// // //             <button
// // //               type="button"
// // //               onClick={() => submitBooking("confirmed")}
// // //               className="flex-1 bg-[#006600] text-white px-6 py-2 shadow hover:bg-green-800"
// // //             >
// // //               Confirm Booking
// // //             </button>

// // //             <button
// // //               type="button"
// // //               onClick={() => submitBooking("guaranteed")}
// // //               className="flex-1 bg-[#0044cc] text-white px-6 py-2 shadow hover:bg-blue-800"
// // //             >
// // //               Guaranteed Booking
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </form>
// // //     </div>
// // //   );
// // // }
// // // BookingForm.jsx
// // import React, { useEffect, useRef, useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import Swal from "sweetalert2";
// // import { Calendar } from "lucide-react";

// // const API_URL = import.meta.env.VITE_API_URL || "";

// // const countries = [
// //   { name: "Bhutan", code: "+975" },
// //   { name: "India", code: "+91" },
// //   { name: "Nepal", code: "+977" },
// //   { name: "Bangladesh", code: "+880" },
// //   { name: "Thailand", code: "+66" },
// // ];

// // export default function BookingForm() {
// //   const navigate = useNavigate();
// //   const { state } = useLocation();

// //   const initialSelectedDate = state?.selectedDate ? new Date(state.selectedDate) : null;
// //   const selectedRoomTypeFromState = state?.roomType || "";

// //   // Core booking states
// //   const [selectedRoomType, setSelectedRoomType] = useState(selectedRoomTypeFromState);
// //   const [roomTypeData, setRoomTypeData] = useState(null);

// //   const [checkInDate, setCheckInDate] = useState(initialSelectedDate);
// //   const [checkOutDate, setCheckOutDate] = useState(null);

// //   const [roomsRequested, setRoomsRequested] = useState(1);

// //   // Meals state
// //   const [meals, setMeals] = useState([]); // selected checkboxes (e.g. ["breakfast","lunch"])
// //   const [mealPrices, setMealPrices] = useState({ breakfast: 0, lunch: 0, dinner: 0 });

// //   // Room selection (PREVENT duplicates)
// //   const [selectedRoomNos, setSelectedRoomNos] = useState([]);

// //   // Occupancy per room
// //   const [occupancyTypes, setOccupancyTypes] = useState(["double"]);

// //   // Guests
// //   const [adults, setAdults] = useState(2);
// //   const [childrenCount, setChildrenCount] = useState(0);
// //   const [childAges, setChildAges] = useState([]);

// //   // Meal plan
// //   const [mealPlan, setMealPlan] = useState("ep"); // ep | cp | map | ap
// // const [extraBeds, setExtraBeds] = useState(0);

// //   // Guest/Agency
// //   const [isAgencyBooking, setIsAgencyBooking] = useState(false);
// //   const [agencyName, setAgencyName] = useState("");
// //   const [agentName, setAgentName] = useState("");
// //   const [firstName, setFirstName] = useState("");
// //   const [lastName, setLastName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [country, setCountry] = useState("Bhutan");
// //   const [phoneCode, setPhoneCode] = useState("+975");
// //   const [phone, setPhone] = useState("");
// //   const [journalInput, setJournalInput] = useState("");
// //   const [specialRequest, setSpecialRequest] = useState("");

// //   const [errors, setErrors] = useState({});
// //   const [loadingAvailableRooms, setLoadingAvailableRooms] = useState(false);
// //   const [availableRooms, setAvailableRooms] = useState([]);

// //   const [openDatePickerFor, setOpenDatePickerFor] = useState(null);
// //   const datePickerRef = useRef();

// //   const [perNightBreakdown, setPerNightBreakdown] = useState({
// //     baseRooms: 0,
// //     childrenTotal: 0,
// //     extraBeds: 0,
// //     mealsTotal: 0,
// //     grandPerNight: 0,
// //     nights: 1,
// //     grandTotal: 0,
// //   });

// //   // ----------------------------
// //   // Sync arrays lengths
// //   // ----------------------------
// //   useEffect(() => {
// //     setSelectedRoomNos((prev) => {
// //       const arr = [...prev];
// //       while (arr.length < roomsRequested) arr.push("");
// //       return arr.slice(0, roomsRequested);
// //     });
// //   }, [roomsRequested]);

// //   useEffect(() => {
// //     setOccupancyTypes((prev) => {
// //       const arr = [...prev];
// //       while (arr.length < roomsRequested) arr.push("double");
// //       return arr.slice(0, roomsRequested);
// //     });
// //   }, [roomsRequested]);

// //   useEffect(() => {
// //     setChildAges((prev) => {
// //       const arr = [...prev];
// //       while (arr.length < childrenCount) arr.push("6-11");
// //       return arr.slice(0, childrenCount);
// //     });
// //   }, [childrenCount]);

// //   // ----------------------------
// //   // Load roomTypeData (pricing etc.)
// //   // ----------------------------
// //   useEffect(() => {
// //     if (!selectedRoomType) return;

// //     const load = async () => {
// //       try {
// //         const res = await fetch(
// //           `${API_URL}/rooms/room-types/${encodeURIComponent(selectedRoomType)}`,
// //           { credentials: "include" }
// //         );

// //         if (!res.ok) {
// //           const list = await fetch(`${API_URL}/rooms/room-types`, { credentials: "include" });
// //           const json = await list.json();
// //           const found = json.roomTypes?.find((r) => r.roomType === selectedRoomType);
// //           setRoomTypeData(found || null);
// //           return;
// //         }

// //         const json = await res.json();
// //         setRoomTypeData(json.roomType || json);
// //       } catch (e) {
// //         console.error("Failed to load room type info", e);
// //       }
// //     };

// //     load();
// //   }, [selectedRoomType]);

// //   // ----------------------------
// //   // Pull mealPrices from roomTypeData
// //   // ----------------------------
// //   useEffect(() => {
// //     if (!roomTypeData?.pricing?.meals) {
// //       setMealPrices({ breakfast: 0, lunch: 0, dinner: 0 });
// //       return;
// //     }
// //     setMealPrices({
// //       breakfast: Number(roomTypeData.pricing.meals.breakfast || 0),
// //       lunch: Number(roomTypeData.pricing.meals.lunch || 0),
// //       dinner: Number(roomTypeData.pricing.meals.dinner || 0),
// //     });
// //   }, [roomTypeData]);

// //   // ----------------------------
// //   // Auto-apply included meals when mealPlan changes
// //   // EP = none, CP = breakfast, MAP = breakfast (and LD chosen by user), AP = all
// //   // ----------------------------
// //   useEffect(() => {
// //     if (mealPlan === "ep") setMeals([]);
// //     else if (mealPlan === "cp") setMeals(["breakfast"]);
// //     else if (mealPlan === "map") setMeals(["breakfast"]); // allow user to add lunch/dinner
// //     else if (mealPlan === "ap") setMeals(["breakfast", "lunch", "dinner"]);
// //   }, [mealPlan]);

// //   // ----------------------------
// //   // Fetch available rooms for dates/type
// //   // ----------------------------
// //   useEffect(() => {
// //     const fetchAvailable = async () => {
// //       setAvailableRooms([]);
// //       setSelectedRoomNos((prev) => prev.map(() => "")); // clear selections when dates/type change
// //       if (!selectedRoomType || !checkInDate || !checkOutDate) return;

// //       const toYMD = (d) => {
// //         const yyyy = d.getFullYear();
// //         const mm = String(d.getMonth() + 1).padStart(2, "0");
// //         const dd = String(d.getDate()).padStart(2, "0");
// //         return `${yyyy}-${mm}-${dd}`;
// //       };
// //       const checkInStr = toYMD(checkInDate);
// //       const checkOutStr = toYMD(checkOutDate);

// //       setLoadingAvailableRooms(true);
// //       try {
// //         const url = `${API_URL}/rooms/available-numbers/${encodeURIComponent(selectedRoomType)}?checkIn=${checkInStr}&checkOut=${checkOutStr}`;
// //         const res = await fetch(url, { credentials: "include" });
// //         const data = await res.json();

// //         let arr = null;
// //         if (Array.isArray(data.availableRoomNumbers)) arr = data.availableRoomNumbers;
// //         else if (Array.isArray(data.available)) arr = data.available;
// //         else if (Array.isArray(data)) arr = data;

// //         if (Array.isArray(arr)) setAvailableRooms(arr.map(String));
// //       } catch (err) {
// //         console.error("Error loading available rooms", err);
// //       } finally {
// //         setLoadingAvailableRooms(false);
// //       }
// //     };

// //     fetchAvailable();
// //   }, [selectedRoomType, checkInDate, checkOutDate]);

// //   // ----------------------------
// //   // Basic validators
// //   // ----------------------------
// //   const validateField = (field, value) => {
// //     let msg = "";
// //     switch (field) {
// //       case "firstName":
// //       case "lastName":
// //         if (!isAgencyBooking && !value?.toString().trim()) msg = "Required.";
// //         break;
// //       case "email":
// //         if (!isAgencyBooking) {
// //           if (!value?.toString().trim()) msg = "Required.";
// //           else if (!/^\S+@\S+\.\S+$/.test(value)) msg = "Invalid email.";
// //         }
// //         break;
// //       case "checkInDate":
// //       case "checkOutDate":
// //         if (!value) msg = "Required.";
// //         break;
// //       default:
// //         msg = "";
// //     }
// //     setErrors((p) => ({ ...p, [field]: msg }));
// //   };

// //   // ----------------------------
// //   // Nights calculation
// //   // ----------------------------
// //   const calcNights = (from, to) => {
// //     if (!from || !to) return 1;
// //     const diff = Math.ceil((to - from) / 86400000);
// //     return diff > 0 ? diff : 1;
// //   };

// //   // ----------------------------
// //   // MAP-specific toggle + general toggleMeal
// //   // - Option A behaviour: dynamic reorder: if first unselected, next becomes free
// //   // ----------------------------
// //   const toggleMeal = (meal) => {
// //     // AP => everything included, cannot toggle
// //     if (mealPlan === "ap") return;

// //     // CP => breakfast fixed/included
// //     if (mealPlan === "cp" && meal === "breakfast") return;

// //     // MAP special handling
// //     if (mealPlan === "map") {
// //       // breakfast is always included and not toggleable
// //       if (meal === "breakfast") return;

// //       setMeals((prev) => {
// //         const updated = [...prev];
// //         if (updated.includes(meal)) {
// //           // remove it
// //           return updated.filter((m) => m !== meal);
// //         } else {
// //           // add to end (keeps selection order)
// //           return [...updated, meal];
// //         }
// //       });
// //       return;
// //     }

// //     // EP normal toggle (and CP for lunch/dinner)
// //     setMeals((prev) => (prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]));
// //   };

// //   // ----------------------------
// //   // Child age options helper
// //   // ----------------------------
// //   const childAgeOptions = [
// //     { value: "0-1", label: "0-1" },
// //     { value: "1-5", label: "1-5" },
// //     { value: "6-11", label: "6-11" },
// //     { value: "12+", label: "12+" },
// //   ];

// //   // ----------------------------
// //   // Helper: options for a particular room dropdown index (prevents duplicates)
// //   // ----------------------------
// //   const optionsForIndex = (index) => {
// //     const selectedOthers = selectedRoomNos.filter((_, i) => i !== index && selectedRoomNos[i]);
// //     return availableRooms.filter((r) => !selectedOthers.includes(r));
// //   };

// //   // ----------------------------
// //   // Pricing calculation (includes meals per-night)
// //   // ----------------------------
// //   useEffect(() => {
// //     const breakdown = {
// //       baseRooms: 0,
// //       childrenTotal: 0,
// //       extraBeds: 0,
// //       mealsTotal: 0, // per night
// //       grandPerNight: 0,
// //       nights: calcNights(checkInDate, checkOutDate),
// //       grandTotal: 0,
// //     };

// //     if (!roomTypeData || !roomTypeData.pricing) {
// //       setPerNightBreakdown(breakdown);
// //       return;
// //     }

// //     const pricing = roomTypeData.pricing;
// //     const occPerRoom = Number(roomTypeData.occupancy || 2);
// //     const nights = breakdown.nights;

// //     // 1) base rooms
// //     let base = 0;
// //     for (let i = 0; i < roomsRequested; i++) {
// //       const occ = occupancyTypes[i] || "double";
// //       const occKey = occ === "twin" ? "double" : occ;
// //       const mealBlock = pricing[mealPlan] || pricing.ep || {};
// //       const roomPrice = Number(mealBlock[occKey] ?? 0);
// //       base += roomPrice;
// //     }

// //     // 2) children pricing
// //     let childrenTotal = 0;
// //     childAges.forEach((ageStr) => {
// //       if (!ageStr) return;
// //       if (ageStr === "0-1" || ageStr === "1-5") {
// //         childrenTotal += Number(pricing.childPolicy?.age1to5?.price ?? 0);
// //       } else if (ageStr === "6-11") {
// //         childrenTotal += Number(pricing.childPolicy?.age6to11?.[mealPlan] ?? 0);
// //       } else {
// //         // 12+ treat as adult: use avg per-room fallback
// //         const avg = roomsRequested > 0 ? base / roomsRequested : 0;
// //         childrenTotal += avg;
// //       }
// //     });

// //     // 3) extra beds
// //     let extraBedTotal = 0;
// //     try {
// //       const capacity = occPerRoom * roomsRequested;
// //       const pax = Number(adults) + Number(childrenCount);
// //       if (pax > capacity) {
// //         const extraNeeded = pax - capacity;
// //         let unit = 0;
// //         if (mealPlan === "map") {
// //           unit = Number(pricing.extraBed?.mapDouble ?? pricing.extraBed?.mapSingle ?? 0);
// //         } else {
// //           unit = Number(pricing.extraBed?.[mealPlan] ?? 0);
// //         }
// //         extraBedTotal = unit * extraNeeded;
// //       }
// //     } catch (err) {
// //       extraBedTotal = 0;
// //     }

// //     // 4) meals per night (AP/CP/MAP/EP rules)
// //     let mealPerNight = 0;

// //     // EP -> everything paid if selected
// //     if (mealPlan === "ep") {
// //       meals.forEach((m) => {
// //         mealPerNight += Number(mealPrices[m] ?? 0);
// //       });
// //     }

// //     // CP -> breakfast included; paid: lunch/dinner if selected
// //     if (mealPlan === "cp") {
// //       meals.forEach((m) => {
// //         if (m !== "breakfast") mealPerNight += Number(mealPrices[m] ?? 0);
// //       });
// //     }

// //     // MAP -> breakfast always included (already ensured by auto-apply).
// //     // For lunch/dinner: first selected (by order in meals array) between lunch/dinner is FREE.
// //     // If both selected, the second one is charged.
// //     if (mealPlan === "map") {
// //       // meals array may contain "breakfast" + zero/one/two of ["lunch","dinner"]
// //       const ld = meals.filter((m) => m === "lunch" || m === "dinner");
// //       if (ld.length === 1) {
// //         // that one is free -> no charge
// //         mealPerNight += 0;
// //       } else if (ld.length === 2) {
// //         // first is free, second charged
// //         const paid = ld[1]; // dynamic ordering: ld[0] is first selected, ld[1] second
// //         mealPerNight += Number(mealPrices[paid] ?? 0);
// //       }
// //       // breakfast included => no charge
// //     }

// //     // AP -> everything included -> 0
// //     if (mealPlan === "ap") {
// //       mealPerNight = 0;
// //     }

// //     const mealsTotal = mealPerNight; // per night

// //     // 5) final totals
// //     const grandPerNight = base + childrenTotal + extraBedTotal + mealsTotal;
// //     const grandTotal = grandPerNight * nights;

// //     breakdown.baseRooms = Number(base);
// //     breakdown.childrenTotal = Number(childrenTotal);
// //     breakdown.extraBeds = Number(extraBedTotal);
// //     breakdown.mealsTotal = Number(mealsTotal);
// //     breakdown.grandPerNight = Number(grandPerNight);
// //     breakdown.nights = nights;
// //     breakdown.grandTotal = Number(grandTotal);

// //     setPerNightBreakdown(breakdown);
// //   }, [
// //     roomTypeData,
// //     roomsRequested,
// //     occupancyTypes,
// //     adults,
// //     childAges,
// //     childrenCount,
// //     meals,
// //     mealPlan,
// //     mealPrices,
// //     checkInDate,
// //     checkOutDate,
// //   ]);

// //   // ----------------------------
// //   // Submit booking
// //   // ----------------------------
// //   const toYMD = (d) => {
// //     if (!d) return "";
// //     const yyyy = d.getFullYear();
// //     const mm = String(d.getMonth() + 1).padStart(2, "0");
// //     const dd = String(d.getDate()).padStart(2, "0");
// //     return `${yyyy}-${mm}-${dd}`;
// //   };

// //   const submitBooking = async (status) => {
// //     // basic validation
// //     validateField("firstName", firstName);
// //     validateField("lastName", lastName);
// //     validateField("email", email);
// //     validateField("checkInDate", checkInDate);
// //     validateField("checkOutDate", checkOutDate);

// //     // ensure assigned rooms count matches roomsRequested if availableRooms exist
// //     const assigned = selectedRoomNos.filter((x) => x && x.trim());
// //     if (availableRooms.length && assigned.length !== roomsRequested) {
// //       Swal.fire("Error", `Please select ${roomsRequested} room number(s).`, "error");
// //       return;
// //     }

// //     const payload = {
// //       isAgencyBooking,
// //       agencyName: isAgencyBooking ? agencyName : undefined,
// //       agentName: isAgencyBooking ? agentName : undefined,

// //       country,
// //       firstName: !isAgencyBooking ? firstName : undefined,
// //       lastName: !isAgencyBooking ? lastName : undefined,
// //       email: !isAgencyBooking ? email : undefined,
// //       phone: !isAgencyBooking ? phone : undefined,

// //       checkIn: toYMD(checkInDate),
// //       checkOut: toYMD(checkOutDate),

// //       roomSelection: [{ roomType: selectedRoomType, roomsRequested, occupancyTypes }],
// //       mealPlan, // primary plan
// //       selectedMeals: meals.length ? meals : undefined, // actual selected checkboxes
// //       specialRequest,
// //       assignedRoom: assigned.length ? assigned : undefined,
// //       transactionNumber: journalInput || undefined,
// //       calculatedPricing: perNightBreakdown,
// //       childAges,
// //       adults,
// //       childrenCount,
// //       statusOverride: status,
// //     };

// //     try {
// //       const res = await fetch(`${API_URL}/bookings/book-rooms`, {
// //         method: "POST",
// //         credentials: "include",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });
// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.message || "Booking failed");
// //       await Swal.fire({
// //         title: "Success",
// //         text: `Booking created (${status})`,
// //         icon: "success",
// //         background: "#006600",
// //         color: "white",
// //       });
// //       navigate("/booking", { state: { activeTab: "BOOKED" } });
// //     } catch (err) {
// //       Swal.fire("Error", err.message || "Failed to create booking", "error");
// //     }
// //   };

// //   // ----------------------------
// //   // Render helpers & UI
// //   // ----------------------------
// //   const formatDate = (d) =>
// //     d
// //       ? new Date(d).toLocaleDateString("en-GB", {
// //           day: "2-digit",
// //           month: "short",
// //           year: "numeric",
// //         })
// //       : "";

// //   useEffect(() => {
// //     const onDocClick = (e) => {
// //       if (!datePickerRef.current) return;
// //       if (!datePickerRef.current.contains(e.target)) setOpenDatePickerFor(null);
// //     };
// //     document.addEventListener("click", onDocClick);
// //     return () => document.removeEventListener("click", onDocClick);
// //   }, []);

// //   // UI helper: whether lunch/dinner should show price in MAP scenario
// //   const mapShowPrice = (mealName) => {
// //     if (mealPlan !== "map") return true; // other plans rely on other rules
// //     const ld = meals.filter((m) => m === "lunch" || m === "dinner");
// //     if (ld.length === 2) {
// //       // second selected (ld[1]) is charged
// //       return ld[1] === mealName;
// //     }
// //     // if only one selected it's free -> do not show price
// //     return false;
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 px-2 py-4">
// //       <div className="flex items-center justify-between mb-2">
// //         <h1 className="text-2xl font-bold text-[#006600]">AVAILABLE Booking Details</h1>
// //         <button onClick={() => navigate(-1)} className="px-4 py-2 border border-gray-300 hover:bg-gray-100">
// //           Back
// //         </button>
// //       </div>

// //       {/* Agency toggle */}
// //       <div className="flex justify-center mb-6">
// //         <div
// //           role="switch"
// //           aria-checked={isAgencyBooking}
// //           onClick={() => {
// //             setIsAgencyBooking((p) => !p);
// //             setErrors({});
// //           }}
// //           className="relative select-none cursor-pointer"
// //         >
// //           <div className="w-56 h-12 -full bg-gray-200 p-1 shadow-inner relative">
// //             <div
// //               className={`absolute top-1 left-1 h-10 w-1/2 -full bg-white shadow transition-transform duration-200 ${
// //                 isAgencyBooking ? "translate-x-full" : ""
// //               }`}
// //             />
// //             <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
// //               <span className={!isAgencyBooking ? "text-[#006600]" : "text-gray-500"}>NORMAL</span>
// //               <span className={isAgencyBooking ? "text-[#006600]" : "text-gray-500"}>AGENCY</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {/* ---------------- LEFT: Room Info ---------------- */}
// //         <div className="bg-white shadow p-4">
// //           <h2 className="text-xl font-bold mb-3 py-2">Room Information</h2>

// //           {/* Room Type (readonly) */}
// //           <div>
// //             <label className="font-semibold">Room Type:</label>
// //             <div className="mt-1 border px-3 py-2 bg-gray-100 text-gray-800">{selectedRoomType || "—"}</div>
// //           </div>

// //           {/* Check-In */}
// //           <div className="relative mt-4" ref={datePickerRef}>
// //             <label className="font-semibold">Check-In:</label>
// //             <div
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 setOpenDatePickerFor(openDatePickerFor === "checkin" ? null : "checkin");
// //               }}
// //               className="mt-1 w-full border px-3 py-3 flex justify-between cursor-pointer"
// //             >
// //               <span>{formatDate(checkInDate)}</span>
// //               <Calendar />
// //             </div>

// //             {openDatePickerFor === "checkin" && (
// //               <div className="absolute z-50 mt-2">
// //                 <DatePicker
// //                   inline
// //                   selected={checkInDate}
// //                   minDate={new Date()}
// //                   onChange={(d) => {
// //                     setCheckInDate(d);
// //                     validateField("checkInDate", d);
// //                     setOpenDatePickerFor(null);
// //                   }}
// //                 />
// //               </div>
// //             )}
// //           </div>

// //           {/* Check-Out */}
// //           <div className="relative mt-4" ref={datePickerRef}>
// //             <label className="font-semibold">Check-Out:</label>
// //             <div
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 setOpenDatePickerFor(openDatePickerFor === "checkout" ? null : "checkout");
// //               }}
// //               className="mt-1 w-full border px-3 py-3 flex justify-between cursor-pointer"
// //             >
// //               <span>{formatDate(checkOutDate)}</span>
// //               <Calendar />
// //             </div>

// //             {openDatePickerFor === "checkout" && (
// //               <div className="absolute z-50 mt-2">
// //                 <DatePicker
// //                   inline
// //                   selected={checkOutDate}
// //                   minDate={checkInDate || new Date()}
// //                   onChange={(d) => {
// //                     setCheckOutDate(d);
// //                     validateField("checkOutDate", d);
// //                     setOpenDatePickerFor(null);
// //                   }}
// //                 />
// //               </div>
// //             )}
// //           </div>

// //           {/* Room Numbers (dynamic) */}
// //           <div className="mt-4">
// //             <label className="font-semibold">Room Number(s):</label>

// //             {loadingAvailableRooms ? (
// //               <div className="mt-1 border px-3 py-2 bg-gray-50">Loading rooms...</div>
// //             ) : (
// //               <>
// //                 {Array.from({ length: roomsRequested }).map((_, idx) => (
// //                   <div key={idx} className="mt-2">
// //                     <label className="text-sm">Room {idx + 1}</label>
// //                     <select
// //                       value={selectedRoomNos[idx] || ""}
// //                       onChange={(e) => {
// //                         const arr = [...selectedRoomNos];
// //                         arr[idx] = e.target.value;
// //                         setSelectedRoomNos(arr);
// //                       }}
// //                       className="mt-1 border px-3 py-2 w-full"
// //                     >
// //                       <option value="">Select</option>
// //                       {optionsForIndex(idx).map((rn) => (
// //                         <option key={rn} value={rn}>
// //                           {rn}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 ))}

// //                 {!availableRooms.length && (
// //                   <p className="text-sm text-gray-600 mt-1">No rooms available for these dates / type.</p>
// //                 )}
// //               </>
// //             )}
// //           </div>

// //           {/* Rooms requested and counts */}
// //           <div className="flex gap-3 mt-4">
// //             <div className="flex-1">
// //               <label className="font-semibold">Rooms Requested:</label>
// //               <input
// //                 type="number"
// //                 min="1"
// //                 value={roomsRequested}
// //                 onChange={(e) => setRoomsRequested(Math.max(1, parseInt(e.target.value || "1")))}
// //                 className="mt-1 border px-3 py-2 w-full"
// //               />
// //             </div>

// //             <div className="flex-1">
// //               <label className="font-semibold">Adults:</label>
// //               <input
// //                 type="number"
// //                 min="1"
// //                 value={adults}
// //                 onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value || "1")))}
// //                 className="mt-1 border px-3 py-2 w-full"
// //               />
// //             </div>
// //           </div>

// //           {/* Children */}
// //           <div className="mt-3">
// //             <label className="font-semibold">Children:</label>
// //             <div className="flex gap-3 mt-1">
// //               <input
// //                 type="number"
// //                 min="0"
// //                 value={childrenCount}
// //                 onChange={(e) => setChildrenCount(Math.max(0, parseInt(e.target.value || "0")))}
// //                 className="border px-3 py-2 w-24"
// //               />
// //               <div className="flex-1">
// //                 {Array.from({ length: childrenCount }).map((_, idx) => (
// //                   <div key={idx} className="mt-2">
// //                     <label className="text-sm">Child {idx + 1} age</label>
// //                     <select
// //                       value={childAges[idx] || "6-11"}
// //                       onChange={(e) => {
// //                         const arr = [...childAges];
// //                         arr[idx] = e.target.value;
// //                         setChildAges(arr);
// //                       }}
// //                       className="mt-1 border px-3 py-2 w-full"
// //                     >
// //                       {childAgeOptions.map((o) => (
// //                         <option key={o.value} value={o.value}>
// //                           {o.label}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Occupancy per room */}
// //           <div className="mt-4">
// //             <label className="font-semibold">Occupancy Type (per room):</label>
// //             <div className="mt-1 grid grid-cols-1 gap-2">
// //               {Array.from({ length: roomsRequested }).map((_, i) => (
// //                 <div key={i} className="flex items-center gap-2">
// //                   <div className="w-24">Room {i + 1}</div>
// //                   <select
// //                     value={occupancyTypes[i] || "double"}
// //                     onChange={(e) => {
// //                       const arr = [...occupancyTypes];
// //                       arr[i] = e.target.value;
// //                       setOccupancyTypes(arr);
// //                     }}
// //                     className="border px-3 py-2"
// //                   >
// //                     <option value="single">Single</option>
// //                     <option value="double">Double</option>
// //                     <option value="twin">Twin</option>
// //                   </select>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Meal Plan */}
// //           <div className="mt-4">
// //             <label className="font-semibold">Meal Plan</label>
// //             <select value={mealPlan} onChange={(e) => setMealPlan(e.target.value)} className="mt-1 border px-3 py-2 w-full">
// //               <option value="ep">EP</option>
// //               <option value="cp">CP</option>
// //               <option value="map">MAP</option>
// //               <option value="ap">AP</option>
// //             </select>
// //           </div>

// //           {/* Price summary */}
// //           <div className="mt-4 border-t pt-3">
// //             <p className="font-semibold">Summary</p>
// //             <div className="mt-2 text-sm">
// //               <div className="flex justify-between">
// //                 <span>Room(s) per night</span>
// //                 <span>Nu. {perNightBreakdown.baseRooms.toFixed(2)}</span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span>Children total / night</span>
// //                 <span>Nu. {perNightBreakdown.childrenTotal.toFixed(2)}</span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span>Extra beds / night</span>
// //                 <span>Nu. {perNightBreakdown.extraBeds.toFixed(2)}</span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span>Meals / night</span>
// //                 <span>Nu. {perNightBreakdown.mealsTotal.toFixed(2)}</span>
// //               </div>
// //               <hr className="my-2" />
// //               <div className="flex justify-between font-bold">
// //                 <span>Total per night</span>
// //                 <span>Nu. {perNightBreakdown.grandPerNight.toFixed(2)}</span>
// //               </div>
// //               <div className="flex justify-between mt-1">
// //                 <span>Length (nights)</span>
// //                 <span>{perNightBreakdown.nights}</span>
// //               </div>
// //               <div className="flex justify-between mt-2 text-xl font-extrabold">
// //                 <span>Grand total</span>
// //                 <span>Nu. {perNightBreakdown.grandTotal.toFixed(2)}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ---------------- RIGHT: Guest / Agency Information ---------------- */}
// //         <div className="bg-white shadow p-4">
// //           <h2 className="text-xl font-bold mb-3 py-2">Guest / Agency Information</h2>

// //           {isAgencyBooking ? (
// //             <>
// //               <div>
// //                 <label className="font-semibold">Agency Name:</label>
// //                 <input type="text" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} className="mt-1 border px-3 py-2 w-full" />
// //               </div>

// //               <div className="mt-3">
// //                 <label className="font-semibold">Agent Name:</label>
// //                 <input type="text" value={agentName} onChange={(e) => setAgentName(e.target.value)} className="mt-1 border px-3 py-2 w-full" />
// //               </div>
// //             </>
// //           ) : (
// //             <>
// //               <div>
// //                 <label className="font-semibold">First Name:</label>
// //                 <input type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value); validateField("firstName", e.target.value); }} className="mt-1 border px-3 py-2 w-full" />
// //                 {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
// //               </div>

// //               <div className="mt-3">
// //                 <label className="font-semibold">Last Name:</label>
// //                 <input type="text" value={lastName} onChange={(e) => { setLastName(e.target.value); validateField("lastName", e.target.value); }} className="mt-1 border px-3 py-2 w-full" />
// //                 {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
// //               </div>

// //               <div className="mt-3">
// //                 <label className="font-semibold">Email:</label>
// //                 <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); validateField("email", e.target.value); }} className="mt-1 border px-3 py-2 w-full" />
// //                 {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
// //               </div>

// //               <div className="mt-3">
// //                 <label className="font-semibold">Country:</label>
// //                 <select value={country} onChange={(e) => { const sel = e.target.value; setCountry(sel); const c = countries.find((x) => x.name === sel); setPhoneCode(c?.code || "+975"); }} className="mt-1 border px-3 py-2 w-full">
// //                   {countries.map((c) => (<option key={c.name} value={c.name}>{c.name} ({c.code})</option>))}
// //                 </select>
// //               </div>

// //               <div className="flex gap-2 mt-3">
// //                 <div className="w-32">
// //                   <label>Code</label>
// //                   <input readOnly value={phoneCode} className="mt-1 bg-gray-100 border px-3 py-2 w-full" />
// //                 </div>

// //                 <div className="flex-1">
// //                   <label>Phone</label>
// //                   <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 border px-3 py-2 w-full" />
// //                 </div>
// //               </div>
// //             </>
// //           )}

// //           {/* Meals Based On Plan */}
// //           <div className="mt-4">
// //             <label className="font-semibold">Meals Required:</label>
// //             <div className="flex flex-col gap-2 mt-1">
// //               {/* Breakfast */}
// //               <label className="flex items-center gap-2">
// //                 <input
// //                   type="checkbox"
// //                   checked={meals.includes("breakfast")}
// //                   disabled={mealPlan === "cp" || mealPlan === "map" || mealPlan === "ap"}
// //                   onChange={() => toggleMeal("breakfast")}
// //                 />
// //                 <span>Breakfast</span>
// //                 {/* Price / label */}
// //                 {mealPlan === "ep" && <span className="text-gray-500">(+Nu. {mealPrices.breakfast})</span>}
// //                 {mealPlan === "cp" && <span className="text-green-600 ml-2">Included</span>}
// //                 {mealPlan === "map" && <span className="text-green-600 ml-2">Included</span>}
// //                 {mealPlan === "ap" && <span className="text-green-600 ml-2">Included</span>}
// //               </label>

// //               {/* Lunch */}
// //               <label className="flex items-center gap-2">
// //                 <input
// //                   type="checkbox"
// //                   checked={meals.includes("lunch")}
// //                   disabled={mealPlan === "ap"}
// //                   onChange={() => toggleMeal("lunch")}
// //                 />
// //                 <span>Lunch</span>

// //                 {/* show price label depending on plan & map logic */}
// //                 {mealPlan === "ep" && <span className="text-gray-500">(+Nu. {mealPrices.lunch})</span>}
// //                 {mealPlan === "cp" && <span className="text-gray-500">(+Nu. {mealPrices.lunch})</span>}
// //                 {mealPlan === "map" && mapShowPrice("lunch") && <span className="text-gray-500">(+Nu. {mealPrices.lunch})</span>}
// //                 {mealPlan === "ap" && <span className="text-green-600 ml-2">Included</span>}
// //               </label>

// //               {/* Dinner */}
// //               <label className="flex items-center gap-2">
// //                 <input
// //                   type="checkbox"
// //                   checked={meals.includes("dinner")}
// //                   disabled={mealPlan === "ap"}
// //                   onChange={() => toggleMeal("dinner")}
// //                 />
// //                 <span>Dinner</span>

// //                 {mealPlan === "ep" && <span className="text-gray-500">(+Nu. {mealPrices.dinner})</span>}
// //                 {mealPlan === "cp" && <span className="text-gray-500">(+Nu. {mealPrices.dinner})</span>}
// //                 {mealPlan === "map" && mapShowPrice("dinner") && <span className="text-gray-500">(+Nu. {mealPrices.dinner})</span>}
// //                 {mealPlan === "ap" && <span className="text-green-600 ml-2">Included</span>}
// //               </label>
// //             </div>
// //           </div>

// //           {/* Journal Number */}
// //           <div className="mt-3">
// //             <label className="font-semibold">Journal Number:</label>
// //             <input type="text" value={journalInput} onChange={(e) => setJournalInput(e.target.value)} className="mt-1 border px-3 py-2 w-full" />
// //           </div>

// //           {/* Special Request */}
// //           <div className="mt-3">
// //             <label className="font-semibold">Special Request:</label>
// //             <textarea value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} className="mt-1 border px-3 py-2 w-full" />
// //           </div>

// //           {/* Buttons */}
// //           <div className="flex gap-3 mt-6">
// //             <button type="button" onClick={() => submitBooking("confirmed")} className="flex-1 bg-[#006600] text-white px-6 py-2 shadow hover:bg-green-800">
// //               Confirm Booking
// //             </button>

// //             <button type="button" onClick={() => submitBooking("guaranteed")} className="flex-1 bg-[#0044cc] text-white px-6 py-2 shadow hover:bg-blue-800">
// //               Guaranteed Booking
// //             </button>
// //           </div>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }
// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Swal from "sweetalert2";
// import { Calendar } from "lucide-react";

// const API_URL = import.meta.env.VITE_API_URL || "";

// const countries = [
//   { name: "Bhutan", code: "+975" },
//   { name: "India", code: "+91" },
//   { name: "Nepal", code: "+977" },
//   { name: "Bangladesh", code: "+880" },
//   { name: "Thailand", code: "+66" },
// ];

// export default function BookingForm() {
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   const initialSelectedDate = state?.selectedDate ? new Date(state.selectedDate) : null;
//   const selectedRoomTypeFromState = state?.roomType || "";

//   // Core booking states
//   const [selectedRoomType, setSelectedRoomType] = useState(selectedRoomTypeFromState);
//   const [roomTypeData, setRoomTypeData] = useState(null);

//   const [checkInDate, setCheckInDate] = useState(initialSelectedDate);
//   const [checkOutDate, setCheckOutDate] = useState(null);

//   const [roomsRequested, setRoomsRequested] = useState(1);

//   // Meals state
//   const [meals, setMeals] = useState([]);
//   const [mealPrices, setMealPrices] = useState({ breakfast: 0, lunch: 0, dinner: 0 });

//   // Room selection (PREVENT duplicates)
//   const [selectedRoomNos, setSelectedRoomNos] = useState([]);

//   // Occupancy per room
//   const [occupancyTypes, setOccupancyTypes] = useState(["double"]);

//   // Guests
//   const [adults, setAdults] = useState(2);
//   const [childrenCount, setChildrenCount] = useState(0);
//   const [childAges, setChildAges] = useState([]);

//   // Meal plan
//   const [mealPlan, setMealPlan] = useState("ep");
//   const [extraBeds, setExtraBeds] = useState(0);

//   // Guest/Agency
//   const [isAgencyBooking, setIsAgencyBooking] = useState(false);
//   const [agencyName, setAgencyName] = useState("");
//   const [agentName, setAgentName] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [country, setCountry] = useState("Bhutan");
//   const [phoneCode, setPhoneCode] = useState("+975");
//   const [phone, setPhone] = useState("");
//   const [journalInput, setJournalInput] = useState("");
//   const [specialRequest, setSpecialRequest] = useState("");

//   const [errors, setErrors] = useState({});
//   const [loadingAvailableRooms, setLoadingAvailableRooms] = useState(false);
//   const [availableRooms, setAvailableRooms] = useState([]);

//   const [openDatePickerFor, setOpenDatePickerFor] = useState(null);
//   const datePickerRef = useRef();

//   const [perNightBreakdown, setPerNightBreakdown] = useState({
//     baseRooms: 0,
//     childrenTotal: 0,
//     extraBeds: 0,
//     mealsTotal: 0,
//     grandPerNight: 0,
//     nights: 1,
//     grandTotal: 0,
//   });

//   // --- sync arrays ---
//   useEffect(() => {
//     setSelectedRoomNos((prev) => {
//       const arr = [...prev];
//       while (arr.length < roomsRequested) arr.push("");
//       return arr.slice(0, roomsRequested);
//     });
//   }, [roomsRequested]);

//   useEffect(() => {
//     setOccupancyTypes((prev) => {
//       const arr = [...prev];
//       while (arr.length < roomsRequested) arr.push("double");
//       return arr.slice(0, roomsRequested);
//     });
//   }, [roomsRequested]);

//   useEffect(() => {
//     setChildAges((prev) => {
//       const arr = [...prev];
//       while (arr.length < childrenCount) arr.push("6-11");
//       return arr.slice(0, childrenCount);
//     });
//   }, [childrenCount]);

//   // --- load room type pricing ---
//   useEffect(() => {
//     if (!selectedRoomType) return;

//     const load = async () => {
//       try {
//         const res = await fetch(
//           `${API_URL}/rooms/room-types/${encodeURIComponent(selectedRoomType)}`,
//           { credentials: "include" }
//         );

//         if (!res.ok) {
//           const list = await fetch(`${API_URL}/rooms/room-types`, { credentials: "include" });
//           const json = await list.json();
//           const found = json.roomTypes?.find((r) => r.roomType === selectedRoomType);
//           setRoomTypeData(found || null);
//           return;
//         }

//         const json = await res.json();
//         setRoomTypeData(json.roomType || json);
//       } catch (e) {
//         console.error("Failed to load room type info", e);
//       }
//     };

//     load();
//   }, [selectedRoomType]);

//   // --- meal prices ---
//   useEffect(() => {
//     if (!roomTypeData?.pricing?.meals) {
//       setMealPrices({ breakfast: 0, lunch: 0, dinner: 0 });
//       return;
//     }
//     setMealPrices({
//       breakfast: Number(roomTypeData.pricing.meals.breakfast || 0),
//       lunch: Number(roomTypeData.pricing.meals.lunch || 0),
//       dinner: Number(roomTypeData.pricing.meals.dinner || 0),
//     });
//   }, [roomTypeData]);

//   // --- auto meals ---
//   useEffect(() => {
//     if (mealPlan === "ep") setMeals([]);
//     else if (mealPlan === "cp") setMeals(["breakfast"]);
//     else if (mealPlan === "map") setMeals(["breakfast"]);
//     else if (mealPlan === "ap") setMeals(["breakfast", "lunch", "dinner"]);
//   }, [mealPlan]);

//   // --- available rooms ---
//   useEffect(() => {
//     const fetchAvailable = async () => {
//       setAvailableRooms([]);
//       setSelectedRoomNos((prev) => prev.map(() => ""));
//       if (!selectedRoomType || !checkInDate || !checkOutDate) return;

//       const toYMD = (d) => {
//         const yyyy = d.getFullYear();
//         const mm = String(d.getMonth() + 1).padStart(2, "0");
//         const dd = String(d.getDate()).padStart(2, "0");
//         return `${yyyy}-${mm}-${dd}`;
//       };

//       const checkInStr = toYMD(checkInDate);
//       const checkOutStr = toYMD(checkOutDate);

//       setLoadingAvailableRooms(true);
//       try {
//         const url = `${API_URL}/rooms/available-numbers/${encodeURIComponent(
//           selectedRoomType
//         )}?checkIn=${checkInStr}&checkOut=${checkOutStr}`;

//         const res = await fetch(url, { credentials: "include" });
//         const data = await res.json();

//         let arr = null;
//         if (Array.isArray(data.availableRoomNumbers)) arr = data.availableRoomNumbers;
//         else if (Array.isArray(data.available)) arr = data.available;
//         else if (Array.isArray(data)) arr = data;

//         if (Array.isArray(arr)) setAvailableRooms(arr.map(String));
//       } catch (err) {
//         console.error("Error loading available rooms", err);
//       } finally {
//         setLoadingAvailableRooms(false);
//       }
//     };

//     fetchAvailable();
//   }, [selectedRoomType, checkInDate, checkOutDate]);

//   // ------------ VALIDATION ------------
//   const validateField = (field, value) => {
//     let msg = "";
//     switch (field) {
//       case "firstName":
//       case "lastName":
//         if (!isAgencyBooking && !value?.toString().trim()) msg = "Required.";
//         break;
//       case "email":
//         if (!isAgencyBooking) {
//           if (!value?.toString().trim()) msg = "Required.";
//           else if (!/^\S+@\S+\.\S+$/.test(value)) msg = "Invalid email.";
//         }
//         break;
//       case "checkInDate":
//       case "checkOutDate":
//         if (!value) msg = "Required.";
//         break;
//       default:
//         msg = "";
//     }
//     setErrors((p) => ({ ...p, [field]: msg }));
//   };

//   const calcNights = (from, to) => {
//     if (!from || !to) return 1;
//     const diff = Math.ceil((to - from) / 86400000);
//     return diff > 0 ? diff : 1;
//   };

//   // ------------ MAP TOGGLE ------------
//   const toggleMeal = (meal) => {
//     if (mealPlan === "ap") return;
//     if (mealPlan === "cp" && meal === "breakfast") return;

//     if (mealPlan === "map") {
//       if (meal === "breakfast") return;
//       setMeals((prev) => {
//         const updated = [...prev];
//         return updated.includes(meal)
//           ? updated.filter((m) => m !== meal)
//           : [...updated, meal];
//       });
//       return;
//     }

//     setMeals((prev) =>
//       prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]
//     );
//   };

//   const childAgeOptions = [
//     { value: "0-1", label: "0-1" },
//     { value: "1-5", label: "1-5" },
//     { value: "6-11", label: "6-11" },
//     { value: "12+", label: "12+" },
//   ];

//   const optionsForIndex = (index) => {
//     const selectedOthers = selectedRoomNos.filter(
//       (_, i) => i !== index && selectedRoomNos[i]
//     );
//     return availableRooms.filter((r) => !selectedOthers.includes(r));
//   };

//   // ---------- GLOBAL EXTRA BED RULES ----------
//   const showExtraBedSection =
//     mealPlan === "map" || occupancyTypes.some((occ) => occ === "double");

//   const eligibleRoomsCount =
//     mealPlan === "map"
//       ? roomsRequested
//       : occupancyTypes.filter((occ) => occ === "double").length;

//   useEffect(() => {
//     if (extraBeds > eligibleRoomsCount) setExtraBeds(eligibleRoomsCount);
//   }, [eligibleRoomsCount]);

//   // ------------ PRICING ------------
//   useEffect(() => {
//     const breakdown = {
//       baseRooms: 0,
//       childrenTotal: 0,
//       extraBeds: 0,
//       mealsTotal: 0,
//       grandPerNight: 0,
//       nights: calcNights(checkInDate, checkOutDate),
//       grandTotal: 0,
//     };

//     if (!roomTypeData || !roomTypeData.pricing) {
//       setPerNightBreakdown(breakdown);
//       return;
//     }

//     const pricing = roomTypeData.pricing;
//     const occPerRoom = Number(roomTypeData.occupancy || 2);
//     const nights = breakdown.nights;

//     let base = 0;
//     for (let i = 0; i < roomsRequested; i++) {
//       const occ = occupancyTypes[i] || "double";
//       const occKey = occ === "twin" ? "double" : occ;
//       const mealBlock = pricing[mealPlan] || pricing.ep || {};
//       const roomPrice = Number(mealBlock[occKey] ?? 0);
//       base += roomPrice;
//     }

//     let childrenTotal = 0;
//     childAges.forEach((ageStr) => {
//       if (!ageStr) return;
//       if (ageStr === "0-1" || ageStr === "1-5") {
//         childrenTotal += Number(pricing.childPolicy?.age1to5?.price ?? 0);
//       } else if (ageStr === "6-11") {
//         childrenTotal += Number(pricing.childPolicy?.age6to11?.[mealPlan] ?? 0);
//       } else {
//         const avg = roomsRequested > 0 ? base / roomsRequested : 0;
//         childrenTotal += avg;
//       }
//     });

//     let extraBedTotal = 0;
//     try {
//       const capacity = occPerRoom * roomsRequested;
//       const pax = Number(adults) + Number(childrenCount);
//       if (pax > capacity) {
//         const extraNeeded = pax - capacity;
//         let unit = 0;
//         if (mealPlan === "map") {
//           unit = Number(
//             pricing.extraBed?.mapDouble ?? pricing.extraBed?.mapSingle ?? 0
//           );
//         } else {
//           unit = Number(pricing.extraBed?.[mealPlan] ?? 0);
//         }
//         extraBedTotal = unit * extraNeeded;
//       }
//     } catch (err) {
//       extraBedTotal = 0;
//     }

//     let mealPerNight = 0;

//     if (mealPlan === "ep") {
//       meals.forEach((m) => (mealPerNight += Number(mealPrices[m] ?? 0)));
//     }

//     if (mealPlan === "cp") {
//       meals.forEach((m) => {
//         if (m !== "breakfast") mealPerNight += Number(mealPrices[m] ?? 0);
//       });
//     }

//     if (mealPlan === "map") {
//       const ld = meals.filter((m) => m === "lunch" || m === "dinner");
//       if (ld.length === 2) {
//         mealPerNight += Number(mealPrices[ld[1]] ?? 0);
//       }
//     }

//     const mealsTotal = mealPlan === "ap" ? 0 : mealPerNight;

//     const grandPerNight = base + childrenTotal + extraBedTotal + mealsTotal;
//     const grandTotal = grandPerNight * nights;

//     breakdown.baseRooms = base;
//     breakdown.childrenTotal = childrenTotal;
//     breakdown.extraBeds = extraBedTotal;
//     breakdown.mealsTotal = mealsTotal;
//     breakdown.grandPerNight = grandPerNight;
//     breakdown.grandTotal = grandTotal;

//     setPerNightBreakdown(breakdown);
//   }, [
//     roomTypeData,
//     roomsRequested,
//     occupancyTypes,
//     adults,
//     childAges,
//     childrenCount,
//     meals,
//     mealPlan,
//     mealPrices,
//     checkInDate,
//     checkOutDate,
//   ]);
//   // ---------------------- SUBMIT HELPERS ----------------------
//   const toYMD = (d) => {
//     if (!d) return "";
//     const yyyy = d.getFullYear();
//     const mm = String(d.getMonth() + 1).padStart(2, "0");
//     const dd = String(d.getDate()).padStart(2, "0");
//     return `${yyyy}-${mm}-${dd}`;
//   };

//   const submitBooking = async (status) => {
//     validateField("firstName", firstName);
//     validateField("lastName", lastName);
//     validateField("email", email);
//     validateField("checkInDate", checkInDate);
//     validateField("checkOutDate", checkOutDate);

//     const assigned = selectedRoomNos.filter((x) => x && x.trim());
//     if (availableRooms.length && assigned.length !== roomsRequested) {
//       Swal.fire("Error", `Please select ${roomsRequested} room number(s).`, "error");
//       return;
//     }

//     const payload = {
//       isAgencyBooking,
//       agencyName: isAgencyBooking ? agencyName : undefined,
//       agentName: isAgencyBooking ? agentName : undefined,

//       country,
//       firstName: !isAgencyBooking ? firstName : undefined,
//       lastName: !isAgencyBooking ? lastName : undefined,
//       email: !isAgencyBooking ? email : undefined,
//       phone: !isAgencyBooking ? phone : undefined,

//       checkIn: toYMD(checkInDate),
//       checkOut: toYMD(checkOutDate),

//       roomSelection: [
//         {
//           roomType: selectedRoomType,
//           roomsRequested,
//           occupancyType: occupancyTypes[0],
//           adults,
//           childrenAges: childAges,
//           extraBed: extraBeds,
//           mealPlan,
//         },
//       ],

//       selectedMeals: meals.length ? meals : undefined,
//       specialRequest,
//       assignedRoom: assigned.length ? assigned : undefined,
//       transactionNumber: journalInput || undefined,

//       calculatedPricing: perNightBreakdown,
//       childAges,
//       childrenCount,
//       statusOverride: status,
//     };

//     try {
//       const res = await fetch(`${API_URL}/bookings/book-rooms`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Booking failed");

//       await Swal.fire({
//         title: "Success",
//         text: `Booking created (${status})`,
//         icon: "success",
//         background: "#006600",
//         color: "white",
//       });

//       navigate("/booking", { state: { activeTab: "BOOKED" } });
//     } catch (err) {
//       Swal.fire("Error", err.message || "Failed to create booking", "error");
//     }
//   };

//   const formatDate = (d) =>
//     d
//       ? new Date(d).toLocaleDateString("en-GB", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//         })
//       : "";

//   useEffect(() => {
//     const onDocClick = (e) => {
//       if (!datePickerRef.current) return;
//       if (!datePickerRef.current.contains(e.target)) setOpenDatePickerFor(null);
//     };
//     document.addEventListener("click", onDocClick);
//     return () => document.removeEventListener("click", onDocClick);
//   }, []);

//   const mapShowPrice = (mealName) => {
//     if (mealPlan !== "map") return true;
//     const ld = meals.filter((m) => m === "lunch" || m === "dinner");
//     if (ld.length === 2) return ld[1] === mealName;
//     return false;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-2 py-4">
//       <div className="flex items-center justify-between mb-2">
//         <h1 className="text-2xl font-bold text-[#006600]">AVAILABLE Booking Details</h1>
//         <button
//           onClick={() => navigate(-1)}
//           className="px-4 py-2 border border-gray-300 hover:bg-gray-100"
//         >
//           Back
//         </button>
//       </div>

//       {/* ---------------- Agency Switch ---------------- */}
//       <div className="flex justify-center mb-6">
//         <div
//           role="switch"
//           aria-checked={isAgencyBooking}
//           onClick={() => {
//             setIsAgencyBooking((p) => !p);
//             setErrors({});
//           }}
//           className="relative select-none cursor-pointer"
//         >
//           <div className="w-56 h-12 bg-gray-200 p-1 shadow-inner relative rounded-full">
//             <div
//               className={`absolute top-1 left-1 h-10 w-1/2 rounded-full bg-white shadow transition-transform duration-200 ${
//                 isAgencyBooking ? "translate-x-full" : ""
//               }`}
//             />
//             <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
//               <span className={!isAgencyBooking ? "text-[#006600]" : "text-gray-500"}>NORMAL</span>
//               <span className={isAgencyBooking ? "text-[#006600]" : "text-gray-500"}>AGENCY</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

//         {/* --------------- LEFT PANEL --------------- */}
//         <div className="bg-white shadow p-4">
//           <h2 className="text-xl font-bold mb-3 py-2">Room Information</h2>

//           {/* Room Type */}
//           <div>
//             <label className="font-semibold">Room Type:</label>
//             <div className="mt-1 border px-3 py-2 bg-gray-100 text-gray-800">
//               {selectedRoomType || "—"}
//             </div>
//           </div>

//           {/* Check-In */}
//           <div className="relative mt-4" ref={datePickerRef}>
//             <label className="font-semibold">Check-In:</label>
//             <div
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setOpenDatePickerFor(openDatePickerFor === "checkin" ? null : "checkin");
//               }}
//               className="mt-1 w-full border px-3 py-3 flex justify-between cursor-pointer"
//             >
//               <span>{formatDate(checkInDate)}</span>
//               <Calendar />
//             </div>

//             {openDatePickerFor === "checkin" && (
//               <div className="absolute z-50 mt-2">
//                 <DatePicker
//                   inline
//                   selected={checkInDate}
//                   minDate={new Date()}
//                   onChange={(d) => {
//                     setCheckInDate(d);
//                     validateField("checkInDate", d);
//                     setOpenDatePickerFor(null);
//                   }}
//                 />
//               </div>
//             )}
//           </div>

//           {/* Check-Out */}
//           <div className="relative mt-4" ref={datePickerRef}>
//             <label className="font-semibold">Check-Out:</label>
//             <div
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setOpenDatePickerFor(openDatePickerFor === "checkout" ? null : "checkout");
//               }}
//               className="mt-1 w-full border px-3 py-3 flex justify-between cursor-pointer"
//             >
//               <span>{formatDate(checkOutDate)}</span>
//               <Calendar />
//             </div>

//             {openDatePickerFor === "checkout" && (
//               <div className="absolute z-50 mt-2">
//                 <DatePicker
//                   inline
//                   selected={checkOutDate}
//                   minDate={checkInDate || new Date()}
//                   onChange={(d) => {
//                     setCheckOutDate(d);
//                     validateField("checkOutDate", d);
//                     setOpenDatePickerFor(null);
//                   }}
//                 />
//               </div>
//             )}
//           </div>

//           {/* Room Numbers */}
//           <div className="mt-4">
//             <label className="font-semibold">Room Number(s):</label>

//             {loadingAvailableRooms ? (
//               <div className="mt-1 border px-3 py-2 bg-gray-50">Loading rooms...</div>
//             ) : (
//               <>
//                 {Array.from({ length: roomsRequested }).map((_, idx) => (
//                   <div key={idx} className="mt-2">
//                     <label className="text-sm">Room {idx + 1}</label>
//                     <select
//                       value={selectedRoomNos[idx] || ""}
//                       onChange={(e) => {
//                         const arr = [...selectedRoomNos];
//                         arr[idx] = e.target.value;
//                         setSelectedRoomNos(arr);
//                       }}
//                       className="mt-1 border px-3 py-2 w-full"
//                     >
//                       <option value="">Select</option>
//                       {optionsForIndex(idx).map((rn) => (
//                         <option key={rn} value={rn}>
//                           {rn}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 ))}

//                 {!availableRooms.length && (
//                   <p className="text-sm text-gray-600 mt-1">
//                     No rooms available for these dates / type.
//                   </p>
//                 )}
//               </>
//             )}
//           </div>

//           {/* Rooms / Adults */}
//           <div className="flex gap-3 mt-4">
//             <div className="flex-1">
//               <label className="font-semibold">Rooms Requested:</label>
//               <input
//                 type="number"
//                 min="1"
//                 value={roomsRequested}
//                 onChange={(e) => setRoomsRequested(Math.max(1, parseInt(e.target.value || 1)))}
//                 className="mt-1 border px-3 py-2 w-full"
//               />
//             </div>

//             <div className="flex-1">
//               <label className="font-semibold">Adults:</label>
//               <input
//                 type="number"
//                 min="1"
//                 value={adults}
//                 onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value || 1)))}
//                 className="mt-1 border px-3 py-2 w-full"
//               />
//             </div>
//           </div>

//           {/* Children */}
//           <div className="mt-3">
//             <label className="font-semibold">Children:</label>
//             <div className="flex gap-3 mt-1">
//               <input
//                 type="number"
//                 min="0"
//                 value={childrenCount}
//                 onChange={(e) =>
//                   setChildrenCount(Math.max(0, parseInt(e.target.value || 0)))
//                 }
//                 className="border px-3 py-2 w-24"
//               />

//               <div className="flex-1">
//                 {Array.from({ length: childrenCount }).map((_, idx) => (
//                   <div key={idx} className="mt-2">
//                     <label className="text-sm">Child {idx + 1} age</label>
//                     <select
//                       value={childAges[idx] || "6-11"}
//                       onChange={(e) => {
//                         const arr = [...childAges];
//                         arr[idx] = e.target.value;
//                         setChildAges(arr);
//                       }}
//                       className="mt-1 border px-3 py-2 w-full"
//                     >
//                       {childAgeOptions.map((o) => (
//                         <option key={o.value} value={o.value}>
//                           {o.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Occupancy */}
//           <div className="mt-4">
//             <label className="font-semibold">Occupancy Type (per room):</label>
//             <div className="mt-1 grid grid-cols-1 gap-2">
//               {Array.from({ length: roomsRequested }).map((_, i) => (
//                 <div key={i} className="flex items-center gap-2">
//                   <div className="w-24">Room {i + 1}</div>
//                   <select
//                     value={occupancyTypes[i] || "double"}
//                     onChange={(e) => {
//                       const arr = [...occupancyTypes];
//                       arr[i] = e.target.value;
//                       setOccupancyTypes(arr);
//                     }}
//                     className="border px-3 py-2"
//                   >
//                     <option value="single">Single</option>
//                     <option value="double">Double</option>
//                     <option value="twin">Twin</option>
//                   </select>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* EXTRA BEDS GLOBAL */}
//           {showExtraBedSection && (
//             <div className="mt-4">
//               <label className="font-semibold">Extra Beds (Global)</label>
//               <select
//                 value={extraBeds}
//                 onChange={(e) => setExtraBeds(Number(e.target.value))}
//                 className="mt-1 border px-3 py-2 w-full"
//               >
//                 {Array.from({ length: eligibleRoomsCount + 1 }).map((_, i) => (
//                   <option key={i} value={i}>
//                     {i} {i === 1 ? "extra bed" : "extra beds"}
//                   </option>
//                 ))}
//               </select>

//               <p className="text-sm text-gray-600 mt-1">
//                 Eligible rooms: {eligibleRoomsCount}
//                 {mealPlan === "map" && " (MAP allows extra beds for all rooms)"}
//               </p>
//             </div>
//           )}

//           {/* Meal Plan */}
//           <div className="mt-4">
//             <label className="font-semibold">Meal Plan</label>
//             <select
//               value={mealPlan}
//               onChange={(e) => setMealPlan(e.target.value)}
//               className="mt-1 border px-3 py-2 w-full"
//             >
//               <option value="ep">EP</option>
//               <option value="cp">CP</option>
//               <option value="map">MAP</option>
//               <option value="ap">AP</option>
//             </select>
//           </div>

//           {/* Summary */}
//           <div className="mt-4 border-t pt-3">
//             <p className="font-semibold">Summary</p>
//             <div className="mt-2 text-sm">
//               <div className="flex justify-between">
//                 <span>Room(s) per night</span>
//                 <span>Nu. {perNightBreakdown.baseRooms.toFixed(2)}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Children total / night</span>
//                 <span>Nu. {perNightBreakdown.childrenTotal.toFixed(2)}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Extra beds / night</span>
//                 <span>Nu. {perNightBreakdown.extraBeds.toFixed(2)}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Meals / night</span>
//                 <span>Nu. {perNightBreakdown.mealsTotal.toFixed(2)}</span>
//               </div>

//               <hr className="my-2" />

//               <div className="flex justify-between font-bold">
//                 <span>Total per night</span>
//                 <span>Nu. {perNightBreakdown.grandPerNight.toFixed(2)}</span>
//               </div>

//               <div className="flex justify-between mt-1">
//                 <span>Length (nights)</span>
//                 <span>{perNightBreakdown.nights}</span>
//               </div>

//               <div className="flex justify-between mt-2 text-xl font-extrabold">
//                 <span>Grand total</span>
//                 <span>Nu. {perNightBreakdown.grandTotal.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* ---------------- RIGHT PANEL ---------------- */}
//         <div className="bg-white shadow p-4">
//           <h2 className="text-xl font-bold mb-3 py-2">Guest / Agency Information</h2>

//           {/* ---------------- AGENCY MODE ---------------- */}
//           {isAgencyBooking ? (
//             <>
//               <div>
//                 <label className="font-semibold">Agency Name:</label>
//                 <input
//                   type="text"
//                   value={agencyName}
//                   onChange={(e) => setAgencyName(e.target.value)}
//                   className="mt-1 border px-3 py-2 w-full"
//                 />
//               </div>

//               <div className="mt-3">
//                 <label className="font-semibold">Agent Name:</label>
//                 <input
//                   type="text"
//                   value={agentName}
//                   onChange={(e) => setAgentName(e.target.value)}
//                   className="mt-1 border px-3 py-2 w-full"
//                 />
//               </div>
//             </>
//           ) : (
//             <>
//               {/* ---------------- NORMAL MODE ---------------- */}
//               <div>
//                 <label className="font-semibold">First Name:</label>
//                 <input
//                   type="text"
//                   value={firstName}
//                   onChange={(e) => {
//                     setFirstName(e.target.value);
//                     validateField("firstName", e.target.value);
//                   }}
//                   className="mt-1 border px-3 py-2 w-full"
//                 />
//                 {errors.firstName && (
//                   <p className="text-red-500 text-sm">{errors.firstName}</p>
//                 )}
//               </div>

//               <div className="mt-3">
//                 <label className="font-semibold">Last Name:</label>
//                 <input
//                   type="text"
//                   value={lastName}
//                   onChange={(e) => {
//                     setLastName(e.target.value);
//                     validateField("lastName", e.target.value);
//                   }}
//                   className="mt-1 border px-3 py-2 w-full"
//                 />
//                 {errors.lastName && (
//                   <p className="text-red-500 text-sm">{errors.lastName}</p>
//                 )}
//               </div>

//               <div className="mt-3">
//                 <label className="font-semibold">Email:</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                     validateField("email", e.target.value);
//                   }}
//                   className="mt-1 border px-3 py-2 w-full"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm">{errors.email}</p>
//                 )}
//               </div>

//               {/* Country */}
//               <div className="mt-3">
//                 <label className="font-semibold">Country:</label>
//                 <select
//                   value={country}
//                   onChange={(e) => {
//                     const sel = e.target.value;
//                     setCountry(sel);
//                     const c = countries.find((x) => x.name === sel);
//                     setPhoneCode(c?.code || "+975");
//                   }}
//                   className="mt-1 border px-3 py-2 w-full"
//                 >
//                   {countries.map((c) => (
//                     <option key={c.name} value={c.name}>
//                       {c.name} ({c.code})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Phone */}
//               <div className="flex gap-2 mt-3">
//                 <div className="w-32">
//                   <label>Code</label>
//                   <input
//                     readOnly
//                     value={phoneCode}
//                     className="mt-1 bg-gray-100 border px-3 py-2 w-full"
//                   />
//                 </div>

//                 <div className="flex-1">
//                   <label>Phone</label>
//                   <input
//                     type="text"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="mt-1 border px-3 py-2 w-full"
//                   />
//                 </div>
//               </div>
//             </>
//           )}

//           {/* ---------------- MEALS ---------------- */}
//           <div className="mt-4">
//             <label className="font-semibold">Meals Required:</label>
//             <div className="flex flex-col gap-2 mt-1">

//               {/* Breakfast */}
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={meals.includes("breakfast")}
//                   disabled={mealPlan === "cp" || mealPlan === "map" || mealPlan === "ap"}
//                   onChange={() => toggleMeal("breakfast")}
//                 />
//                 <span>Breakfast</span>

//                 {mealPlan === "ep" && (
//                   <span className="text-gray-500">(+Nu. {mealPrices.breakfast})</span>
//                 )}
//                 {mealPlan !== "ep" && (
//                   <span className="text-green-600 ml-2">Included</span>
//                 )}
//               </label>

//               {/* Lunch */}
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={meals.includes("lunch")}
//                   disabled={mealPlan === "ap"}
//                   onChange={() => toggleMeal("lunch")}
//                 />
//                 <span>Lunch</span>

//                 {(mealPlan === "ep" || mealPlan === "cp") && (
//                   <span className="text-gray-500">(+Nu. {mealPrices.lunch})</span>
//                 )}
//                 {mealPlan === "map" && mapShowPrice("lunch") && (
//                   <span className="text-gray-500">(+Nu. {mealPrices.lunch})</span>
//                 )}
//                 {mealPlan === "ap" && (
//                   <span className="text-green-600 ml-2">Included</span>
//                 )}
//               </label>

//               {/* Dinner */}
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={meals.includes("dinner")}
//                   disabled={mealPlan === "ap"}
//                   onChange={() => toggleMeal("dinner")}
//                 />
//                 <span>Dinner</span>

//                 {(mealPlan === "ep" || mealPlan === "cp") && (
//                   <span className="text-gray-500">(+Nu. {mealPrices.dinner})</span>
//                 )}
//                 {mealPlan === "map" && mapShowPrice("dinner") && (
//                   <span className="text-gray-500">(+Nu. {mealPrices.dinner})</span>
//                 )}
//                 {mealPlan === "ap" && (
//                   <span className="text-green-600 ml-2">Included</span>
//                 )}
//               </label>
//             </div>
//           </div>

//           {/* Journal Number */}
//           <div className="mt-3">
//             <label className="font-semibold">Journal Number:</label>
//             <input
//               type="text"
//               value={journalInput}
//               onChange={(e) => setJournalInput(e.target.value)}
//               className="mt-1 border px-3 py-2 w-full"
//             />
//           </div>

//           {/* Special Request */}
//           <div className="mt-3">
//             <label className="font-semibold">Special Request:</label>
//             <textarea
//               value={specialRequest}
//               onChange={(e) => setSpecialRequest(e.target.value)}
//               className="mt-1 border px-3 py-2 w-full"
//             />
//           </div>

//           {/* Submit Buttons */}
//           <div className="flex gap-3 mt-6">
//             <button
//               type="button"
//               onClick={() => submitBooking("confirmed")}
//               className="flex-1 bg-[#006600] text-white px-6 py-2 shadow hover:bg-green-800"
//             >
//               Confirm Booking
//             </button>

//             <button
//               type="button"
//               onClick={() => submitBooking("guaranteed")}
//               className="flex-1 bg-[#0044cc] text-white px-6 py-2 shadow hover:bg-blue-800"
//             >
//               Guaranteed Booking
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { Calendar } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "";

const countries = [
  { name: "Bhutan", code: "+975" },
  { name: "India", code: "+91" },
  { name: "Nepal", code: "+977" },
  { name: "Bangladesh", code: "+880" },
  { name: "Thailand", code: "+66" },
];

export default function BookingForm() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const initialSelectedDate = state?.selectedDate ? new Date(state.selectedDate) : null;
  const selectedRoomTypeFromState = state?.roomType || "";

  // Core booking states
  const [selectedRoomType, setSelectedRoomType] = useState(selectedRoomTypeFromState);
  const [roomTypeData, setRoomTypeData] = useState(null);

  const [checkInDate, setCheckInDate] = useState(initialSelectedDate);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [roomsRequested, setRoomsRequested] = useState(1);

  // Meals state
  const [meals, setMeals] = useState([]);
  const [mealPrices, setMealPrices] = useState({ breakfast: 0, lunch: 0, dinner: 0 });

  // Room selection (PREVENT duplicates)
  const [selectedRoomNos, setSelectedRoomNos] = useState([]);

  // Occupancy per room
  const [occupancyTypes, setOccupancyTypes] = useState(["double"]);

  // Guests
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [childAges, setChildAges] = useState([]);

  // Meal plan
  const [mealPlan, setMealPlan] = useState("ep");
  const [extraBeds, setExtraBeds] = useState(0);

  // Guest/Agency
  const [isAgencyBooking, setIsAgencyBooking] = useState(false);
  const [agencyName, setAgencyName] = useState("");
  const [agentName, setAgentName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Bhutan");
  const [phoneCode, setPhoneCode] = useState("+975");
  const [phone, setPhone] = useState("");
  const [journalInput, setJournalInput] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const [errors, setErrors] = useState({});
  const [loadingAvailableRooms, setLoadingAvailableRooms] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);

  const [openDatePickerFor, setOpenDatePickerFor] = useState(null);
  const datePickerRef = useRef();

  const [perNightBreakdown, setPerNightBreakdown] = useState({
    baseRooms: 0,
    childrenTotal: 0,
    extraBeds: 0,
    mealsTotal: 0,
    grandPerNight: 0,
    nights: 1,
    grandTotal: 0,
  });

  // --- sync arrays ---
  useEffect(() => {
    setSelectedRoomNos((prev) => {
      const arr = [...prev];
      while (arr.length < roomsRequested) arr.push("");
      return arr.slice(0, roomsRequested);
    });
  }, [roomsRequested]);

  useEffect(() => {
    setOccupancyTypes((prev) => {
      const arr = [...prev];
      while (arr.length < roomsRequested) arr.push("double");
      return arr.slice(0, roomsRequested);
    });
  }, [roomsRequested]);

  useEffect(() => {
    setChildAges((prev) => {
      const arr = [...prev];
      while (arr.length < childrenCount) arr.push("6-11");
      return arr.slice(0, childrenCount);
    });
  }, [childrenCount]);

  // --- load room type pricing ---
  useEffect(() => {
    if (!selectedRoomType) return;

    const load = async () => {
      try {
        const res = await fetch(
          `${API_URL}/rooms/room-types/${encodeURIComponent(selectedRoomType)}`,
          { credentials: "include" }
        );

        if (!res.ok) {
          const list = await fetch(`${API_URL}/rooms/room-types`, { credentials: "include" });
          const json = await list.json();
          const found = json.roomTypes?.find((r) => r.roomType === selectedRoomType);
          setRoomTypeData(found || null);
          return;
        }

        const json = await res.json();
        setRoomTypeData(json.roomType || json);
      } catch (e) {
        console.error("Failed to load room type info", e);
      }
    };

    load();
  }, [selectedRoomType]);

  // --- meal prices ---
  useEffect(() => {
    if (!roomTypeData?.pricing?.meals) {
      setMealPrices({ breakfast: 0, lunch: 0, dinner: 0 });
      return;
    }
    setMealPrices({
      breakfast: Number(roomTypeData.pricing.meals.breakfast || 0),
      lunch: Number(roomTypeData.pricing.meals.lunch || 0),
      dinner: Number(roomTypeData.pricing.meals.dinner || 0),
    });
  }, [roomTypeData]);

  // --- auto meals ---
  useEffect(() => {
    if (mealPlan === "ep") setMeals([]);
    else if (mealPlan === "cp") setMeals(["breakfast"]);
    else if (mealPlan === "map") setMeals(["breakfast"]);
    else if (mealPlan === "ap") setMeals(["breakfast", "lunch", "dinner"]);
  }, [mealPlan]);

  // --- available rooms ---
  useEffect(() => {
    const fetchAvailable = async () => {
      setAvailableRooms([]);
      setSelectedRoomNos((prev) => prev.map(() => ""));
      if (!selectedRoomType || !checkInDate || !checkOutDate) return;

      const toYMD = (d) => {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
      };

      const checkInStr = toYMD(checkInDate);
      const checkOutStr = toYMD(checkOutDate);

      setLoadingAvailableRooms(true);
      try {
        const url = `${API_URL}/rooms/available-numbers/${encodeURIComponent(
          selectedRoomType
        )}?checkIn=${checkInStr}&checkOut=${checkOutStr}`;

        const res = await fetch(url, { credentials: "include" });
        const data = await res.json();

        let arr = null;
        if (Array.isArray(data.availableRoomNumbers)) arr = data.availableRoomNumbers;
        else if (Array.isArray(data.available)) arr = data.available;
        else if (Array.isArray(data)) arr = data;

        if (Array.isArray(arr)) setAvailableRooms(arr.map(String));
      } catch (err) {
        console.error("Error loading available rooms", err);
      } finally {
        setLoadingAvailableRooms(false);
      }
    };

    fetchAvailable();
  }, [selectedRoomType, checkInDate, checkOutDate]);

  // ------------ VALIDATION ------------
  const validateField = (field, value) => {
    let msg = "";
    switch (field) {
      case "firstName":
      case "lastName":
        if (!isAgencyBooking && !value?.toString().trim()) msg = "Required.";
        break;
      case "email":
        if (!isAgencyBooking) {
          if (!value?.toString().trim()) msg = "Required.";
          else if (!/^\S+@\S+\.\S+$/.test(value)) msg = "Invalid email.";
        }
        break;
      case "checkInDate":
      case "checkOutDate":
        if (!value) msg = "Required.";
        break;
      default:
        msg = "";
    }
    setErrors((p) => ({ ...p, [field]: msg }));
  };

  const calcNights = (from, to) => {
    if (!from || !to) return 1;
    const diff = Math.ceil((to - from) / 86400000);
    return diff > 0 ? diff : 1;
  };

  // ------------ MAP TOGGLE ------------
  const toggleMeal = (meal) => {
    if (mealPlan === "ap") return;
    if (mealPlan === "cp" && meal === "breakfast") return;

    if (mealPlan === "map") {
      if (meal === "breakfast") return;
      setMeals((prev) => {
        const updated = [...prev];
        return updated.includes(meal)
          ? updated.filter((m) => m !== meal)
          : [...updated, meal];
      });
      return;
    }

    setMeals((prev) =>
      prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]
    );
  };

  const childAgeOptions = [
    { value: "0-1", label: "0-1" },
    { value: "1-5", label: "1-5" },
    { value: "6-11", label: "6-11" },
    { value: "12+", label: "12+" },
  ];

  const optionsForIndex = (index) => {
    const selectedOthers = selectedRoomNos.filter(
      (_, i) => i !== index && selectedRoomNos[i]
    );
    return availableRooms.filter((r) => !selectedOthers.includes(r));
  };

  // ---------- EXTRA BEDS ----------
  const showExtraBedSection =
    mealPlan === "map" || occupancyTypes.some((occ) => occ === "double");

  const eligibleRoomsCount =
    mealPlan === "map"
      ? roomsRequested
      : occupancyTypes.filter((occ) => occ === "double").length;

  useEffect(() => {
    if (extraBeds > eligibleRoomsCount) setExtraBeds(eligibleRoomsCount);
  }, [eligibleRoomsCount]);

  // ------------ PRICING ------------
  useEffect(() => {
    const breakdown = {
      baseRooms: 0,
      childrenTotal: 0,
      extraBeds: 0,
      mealsTotal: 0,
      grandPerNight: 0,
      nights: calcNights(checkInDate, checkOutDate),
      grandTotal: 0,
    };

    if (!roomTypeData || !roomTypeData.pricing) {
      setPerNightBreakdown(breakdown);
      return;
    }

    const pricing = roomTypeData.pricing;
    const occPerRoom = Number(roomTypeData.occupancy || 2);
    const nights = breakdown.nights;

    let base = 0;
    for (let i = 0; i < roomsRequested; i++) {
      const occ = occupancyTypes[i] || "double";
      const occKey = occ === "twin" ? "double" : occ;
      const mealBlock = pricing[mealPlan] || pricing.ep || {};
      const roomPrice = Number(mealBlock[occKey] ?? 0);
      base += roomPrice;
    }

    let childrenTotal = 0;
    childAges.forEach((ageStr) => {
      if (!ageStr) return;
      if (ageStr === "0-1" || ageStr === "1-5") {
        childrenTotal += Number(pricing.childPolicy?.age1to5?.price ?? 0);
      } else if (ageStr === "6-11") {
        childrenTotal += Number(pricing.childPolicy?.age6to11?.[mealPlan] ?? 0);
      } else {
        const avg = roomsRequested > 0 ? base / roomsRequested : 0;
        childrenTotal += avg;
      }
    });

    let extraBedTotal = 0;
    try {
      const capacity = occPerRoom * roomsRequested;
      const pax = Number(adults) + Number(childrenCount);
      if (pax > capacity) {
        const extraNeeded = pax - capacity;
        let unit = 0;
        if (mealPlan === "map") {
          unit = Number(
            pricing.extraBed?.mapDouble ?? pricing.extraBed?.mapSingle ?? 0
          );
        } else {
          unit = Number(pricing.extraBed?.[mealPlan] ?? 0);
        }
        extraBedTotal = unit * extraNeeded;
      }
    } catch (err) {
      extraBedTotal = 0;
    }

    let mealPerNight = 0;

    if (mealPlan === "ep") {
      meals.forEach((m) => (mealPerNight += Number(mealPrices[m] ?? 0)));
    }

    if (mealPlan === "cp") {
      meals.forEach((m) => {
        if (m !== "breakfast") mealPerNight += Number(mealPrices[m] ?? 0);
      });
    }

    if (mealPlan === "map") {
      const ld = meals.filter((m) => m === "lunch" || m === "dinner");
      if (ld.length === 2) {
        mealPerNight += Number(mealPrices[ld[1]] ?? 0);
      }
    }

    const mealsTotal = mealPlan === "ap" ? 0 : mealPerNight;

    const grandPerNight = base + childrenTotal + extraBedTotal + mealsTotal;
    const grandTotal = grandPerNight * nights;

    breakdown.baseRooms = base;
    breakdown.childrenTotal = childrenTotal;
    breakdown.extraBeds = extraBedTotal;
    breakdown.mealsTotal = mealsTotal;
    breakdown.grandPerNight = grandPerNight;
    breakdown.grandTotal = grandTotal;

    setPerNightBreakdown(breakdown);
  }, [
    roomTypeData,
    roomsRequested,
    occupancyTypes,
    adults,
    childAges,
    childrenCount,
    meals,
    mealPlan,
    mealPrices,
    checkInDate,
    checkOutDate,
  ]);

  // ---------------------- SUBMIT HELPERS ----------------------
  const toYMD = (d) => {
    if (!d) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const submitBooking = async (status) => {
    validateField("firstName", firstName);
    validateField("lastName", lastName);
    validateField("email", email);
    validateField("checkInDate", checkInDate);
    validateField("checkOutDate", checkOutDate);

    const assigned = selectedRoomNos.filter((x) => x && x.trim());
    if (availableRooms.length && assigned.length !== roomsRequested) {
      Swal.fire("Error", `Please select ${roomsRequested} room number(s).`, "error");
      return;
    }

    // FINAL FIXED PAYLOAD
    const payload = {
      isAgencyBooking,
      agencyName: isAgencyBooking ? agencyName : undefined,
      agentName: isAgencyBooking ? agentName : undefined,

      country,
      firstName: !isAgencyBooking ? firstName : undefined,
      lastName: !isAgencyBooking ? lastName : undefined,
      email: !isAgencyBooking ? email : undefined,
      phone: !isAgencyBooking ? phone : undefined,

      checkIn: toYMD(checkInDate),
      checkOut: toYMD(checkOutDate),

      roomSelection: [
        {
          roomType: selectedRoomType,
          roomsRequested,
          occupancyType: occupancyTypes,    // << FIXED ARRAY
          adults,
          childrenAges: childAges,
          extraBed: extraBeds,
          mealPlan,
        },
      ],

      selectedMeals: meals.length ? meals : undefined,
      specialRequest,

      assignedRoom: assigned.length ? assigned : undefined, // KEEP MANUAL ASSIGN

      journalNumber: journalInput || undefined,  // << FIXED

      calculatedPricing: perNightBreakdown,
      childAges,
      childrenCount,
      statusOverride: status,
    };

    try {
      const res = await fetch(`${API_URL}/bookings/book-rooms`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Booking failed");

      await Swal.fire({
        title: "Success",
        text: `Booking created (${status})`,
        icon: "success",
        background: "#006600",
        color: "white",
      });

      navigate("/booking", { state: { activeTab: "BOOKED" } });
    } catch (err) {
      Swal.fire("Error", err.message || "Failed to create booking", "error");
    }
  };

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "";

  useEffect(() => {
    const onDocClick = (e) => {
      if (!datePickerRef.current) return;
      if (!datePickerRef.current.contains(e.target)) setOpenDatePickerFor(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const mapShowPrice = (mealName) => {
    if (mealPlan !== "map") return true;
    const ld = meals.filter((m) => m === "lunch" || m === "dinner");
    if (ld.length === 2) return ld[1] === mealName;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-2 py-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-[#006600]">AVAILABLE Booking Details</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-gray-300 hover:bg-gray-100"
        >
          Back
        </button>
      </div>

      {/* ---------------- Agency Switch ---------------- */}
      <div className="flex justify-center mb-6">
        <div
          role="switch"
          aria-checked={isAgencyBooking}
          onClick={() => {
            setIsAgencyBooking((p) => !p);
            setErrors({});
          }}
          className="relative select-none cursor-pointer"
        >
          <div className="w-56 h-12 bg-gray-200 p-1 shadow-inner relative rounded-full">
            <div
              className={`absolute top-1 left-1 h-10 w-1/2 rounded-full bg-white shadow transition-transform duration-200 ${
                isAgencyBooking ? "translate-x-full" : ""
              }`}
            />
            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
              <span className={!isAgencyBooking ? "text-[#006600]" : "text-gray-500"}>NORMAL</span>
              <span className={isAgencyBooking ? "text-[#006600]" : "text-gray-500"}>AGENCY</span>
            </div>
          </div>
        </div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* --------------- LEFT PANEL --------------- */}
        <div className="bg-white shadow p-4">
          <h2 className="text-xl font-bold mb-3 py-2">Room Information</h2>

          {/* Room Type */}
          <div>
            <label className="font-semibold">Room Type:</label>
            <div className="mt-1 border px-3 py-2 bg-gray-100 text-gray-800">
              {selectedRoomType || "—"}
            </div>
          </div>

          {/* Check-In */}
          <div className="relative mt-4" ref={datePickerRef}>
            <label className="font-semibold">Check-In:</label>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setOpenDatePickerFor(openDatePickerFor === "checkin" ? null : "checkin");
              }}
              className="mt-1 w-full border px-3 py-3 flex justify-between cursor-pointer"
            >
              <span>{formatDate(checkInDate)}</span>
              <Calendar />
            </div>

            {openDatePickerFor === "checkin" && (
              <div className="absolute z-50 mt-2">
                <DatePicker
                  inline
                  selected={checkInDate}
                  minDate={new Date()}
                  onChange={(d) => {
                    setCheckInDate(d);
                    validateField("checkInDate", d);
                    setOpenDatePickerFor(null);
                  }}
                />
              </div>
            )}
          </div>

          {/* Check-Out */}
          <div className="relative mt-4" ref={datePickerRef}>
            <label className="font-semibold">Check-Out:</label>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setOpenDatePickerFor(openDatePickerFor === "checkout" ? null : "checkout");
              }}
              className="mt-1 w-full border px-3 py-3 flex justify-between cursor-pointer"
            >
              <span>{formatDate(checkOutDate)}</span>
              <Calendar />
            </div>

            {openDatePickerFor === "checkout" && (
              <div className="absolute z-50 mt-2">
                <DatePicker
                  inline
                  selected={checkOutDate}
                  minDate={checkInDate || new Date()}
                  onChange={(d) => {
                    setCheckOutDate(d);
                    validateField("checkOutDate", d);
                    setOpenDatePickerFor(null);
                  }}
                />
              </div>
            )}
          </div>

          {/* Room Numbers */}
          <div className="mt-4">
            <label className="font-semibold">Room Number(s):</label>

            {loadingAvailableRooms ? (
              <div className="mt-1 border px-3 py-2 bg-gray-50">Loading rooms...</div>
            ) : (
              <>
                {Array.from({ length: roomsRequested }).map((_, idx) => (
                  <div key={idx} className="mt-2">
                    <label className="text-sm">Room {idx + 1}</label>
                    <select
                      value={selectedRoomNos[idx] || ""}
                      onChange={(e) => {
                        const arr = [...selectedRoomNos];
                        arr[idx] = e.target.value;
                        setSelectedRoomNos(arr);
                      }}
                      className="mt-1 border px-3 py-2 w-full"
                    >
                      <option value="">Select</option>
                      {optionsForIndex(idx).map((rn) => (
                        <option key={rn} value={rn}>
                          {rn}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                {!availableRooms.length && (
                  <p className="text-sm text-gray-600 mt-1">
                    No rooms available for these dates / type.
                  </p>
                )}
              </>
            )}
          </div>

          {/* Rooms / Adults */}
          <div className="flex gap-3 mt-4">
            <div className="flex-1">
              <label className="font-semibold">Rooms Requested:</label>
              <input
                type="number"
                min="1"
                value={roomsRequested}
                onChange={(e) => setRoomsRequested(Math.max(1, parseInt(e.target.value || 1)))}
                className="mt-1 border px-3 py-2 w-full"
              />
            </div>

            <div className="flex-1">
              <label className="font-semibold">Adults:</label>
              <input
                type="number"
                min="1"
                value={adults}
                onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value || 1)))}
                className="mt-1 border px-3 py-2 w-full"
              />
            </div>
          </div>

          {/* Children */}
          <div className="mt-3">
            <label className="font-semibold">Children:</label>
            <div className="flex gap-3 mt-1">
              <input
                type="number"
                min="0"
                value={childrenCount}
                onChange={(e) =>
                  setChildrenCount(Math.max(0, parseInt(e.target.value || 0)))
                }
                className="border px-3 py-2 w-24"
              />

              <div className="flex-1">
                {Array.from({ length: childrenCount }).map((_, idx) => (
                  <div key={idx} className="mt-2">
                    <label className="text-sm">Child {idx + 1} age</label>
                    <select
                      value={childAges[idx] || "6-11"}
                      onChange={(e) => {
                        const arr = [...childAges];
                        arr[idx] = e.target.value;
                        setChildAges(arr);
                      }}
                      className="mt-1 border px-3 py-2 w-full"
                    >
                      {childAgeOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Occupancy */}
          <div className="mt-4">
            <label className="font-semibold">Occupancy Type (per room):</label>
            <div className="mt-1 grid grid-cols-1 gap-2">
              {Array.from({ length: roomsRequested }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-24">Room {i + 1}</div>
                  <select
                    value={occupancyTypes[i] || "double"}
                    onChange={(e) => {
                      const arr = [...occupancyTypes];
                      arr[i] = e.target.value;
                      setOccupancyTypes(arr);
                    }}
                    className="border px-3 py-2"
                  >
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="twin">Twin</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* EXTRA BEDS GLOBAL */}
          {showExtraBedSection && (
            <div className="mt-4">
              <label className="font-semibold">Extra Beds (Global)</label>
              <select
                value={extraBeds}
                onChange={(e) => setExtraBeds(Number(e.target.value))}
                className="mt-1 border px-3 py-2 w-full"
              >
                {Array.from({ length: eligibleRoomsCount + 1 }).map((_, i) => (
                  <option key={i} value={i}>
                    {i} {i === 1 ? "extra bed" : "extra beds"}
                  </option>
                ))}
              </select>

              <p className="text-sm text-gray-600 mt-1">
                Eligible rooms: {eligibleRoomsCount}
                {mealPlan === "map" && " (MAP allows extra beds for all rooms)"}
              </p>
            </div>
          )}

          {/* Meal Plan */}
          <div className="mt-4">
            <label className="font-semibold">Meal Plan</label>
            <select
              value={mealPlan}
              onChange={(e) => setMealPlan(e.target.value)}
              className="mt-1 border px-3 py-2 w-full"
            >
              <option value="ep">EP</option>
              <option value="cp">CP</option>
              <option value="map">MAP</option>
              <option value="ap">AP</option>
            </select>
          </div>

          {/* Summary */}
          <div className="mt-4 border-t pt-3">
            <p className="font-semibold">Summary</p>
            <div className="mt-2 text-sm">
              <div className="flex justify-between">
                <span>Room(s) per night</span>
                <span>Nu. {perNightBreakdown.baseRooms.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Children total / night</span>
                <span>Nu. {perNightBreakdown.childrenTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Extra beds / night</span>
                <span>Nu. {perNightBreakdown.extraBeds.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Meals / night</span>
                <span>Nu. {perNightBreakdown.mealsTotal.toFixed(2)}</span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between font-bold">
                <span>Total per night</span>
                <span>Nu. {perNightBreakdown.grandPerNight.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mt-1">
                <span>Length (nights)</span>
                <span>{perNightBreakdown.nights}</span>
              </div>

              <div className="flex justify-between mt-2 text-xl font-extrabold">
                <span>Grand total</span>
                <span>Nu. {perNightBreakdown.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT PANEL ---------------- */}
        <div className="bg-white shadow p-4">
          <h2 className="text-xl font-bold mb-3 py-2">Guest / Agency Information</h2>

          {/* ---------------- AGENCY MODE ---------------- */}
          {isAgencyBooking ? (
            <>
              <div>
                <label className="font-semibold">Agency Name:</label>
                <input
                  type="text"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  className="mt-1 border px-3 py-2 w-full"
                />
              </div>

              <div className="mt-3">
                <label className="font-semibold">Agent Name:</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="mt-1 border px-3 py-2 w-full"
                />
              </div>
            </>
          ) : (
            <>
              {/* ---------------- NORMAL MODE ---------------- */}
              <div>
                <label className="font-semibold">First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    validateField("firstName", e.target.value);
                  }}
                  className="mt-1 border px-3 py-2 w-full"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>

              <div className="mt-3">
                <label className="font-semibold">Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    validateField("lastName", e.target.value);
                  }}
                  className="mt-1 border px-3 py-2 w-full"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>

              <div className="mt-3">
                <label className="font-semibold">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateField("email", e.target.value);
                  }}
                  className="mt-1 border px-3 py-2 w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Country */}
              <div className="mt-3">
                <label className="font-semibold">Country:</label>
                <select
                  value={country}
                  onChange={(e) => {
                    const sel = e.target.value;
                    setCountry(sel);
                    const c = countries.find((x) => x.name === sel);
                    setPhoneCode(c?.code || "+975");
                  }}
                  className="mt-1 border px-3 py-2 w-full"
                >
                  {countries.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone */}
              <div className="flex gap-2 mt-3">
                <div className="w-32">
                  <label>Code</label>
                  <input
                    readOnly
                    value={phoneCode}
                    className="mt-1 bg-gray-100 border px-3 py-2 w-full"
                  />
                </div>

                <div className="flex-1">
                  <label>Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 border px-3 py-2 w-full"
                  />
                </div>
              </div>
            </>
          )}

          {/* ---------------- MEALS ---------------- */}
          <div className="mt-4">
            <label className="font-semibold">Meals Required:</label>
            <div className="flex flex-col gap-2 mt-1">

              {/* Breakfast */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={meals.includes("breakfast")}
                  disabled={mealPlan === "cp" || mealPlan === "map" || mealPlan === "ap"}
                  onChange={() => toggleMeal("breakfast")}
                />
                <span>Breakfast</span>

                {mealPlan === "ep" && (
                  <span className="text-gray-500">(+Nu. {mealPrices.breakfast})</span>
                )}
                {mealPlan !== "ep" && (
                  <span className="text-green-600 ml-2">Included</span>
                )}
              </label>

              {/* Lunch */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={meals.includes("lunch")}
                  disabled={mealPlan === "ap"}
                  onChange={() => toggleMeal("lunch")}
                />
                <span>Lunch</span>

                {(mealPlan === "ep" || mealPlan === "cp") && (
                  <span className="text-gray-500">(+Nu. {mealPrices.lunch})</span>
                )}
                {mealPlan === "map" && mapShowPrice("lunch") && (
                  <span className="text-gray-500">(+Nu. {mealPrices.lunch})</span>
                )}
                {mealPlan === "ap" && (
                  <span className="text-green-600 ml-2">Included</span>
                )}
              </label>

              {/* Dinner */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={meals.includes("dinner")}
                  disabled={mealPlan === "ap"}
                  onChange={() => toggleMeal("dinner")}
                />
                <span>Dinner</span>

                {(mealPlan === "ep" || mealPlan === "cp") && (
                  <span className="text-gray-500">(+Nu. {mealPrices.dinner})</span>
                )}
                {mealPlan === "map" && mapShowPrice("dinner") && (
                  <span className="text-gray-500">(+Nu. {mealPrices.dinner})</span>
                )}
                {mealPlan === "ap" && (
                  <span className="text-green-600 ml-2">Included</span>
                )}
              </label>
            </div>
          </div>

          {/* Journal Number */}
          <div className="mt-3">
            <label className="font-semibold">Journal Number:</label>
            <input
              type="text"
              value={journalInput}
              onChange={(e) => setJournalInput(e.target.value)}
              className="mt-1 border px-3 py-2 w-full"
            />
          </div>

          {/* Special Request */}
          <div className="mt-3">
            <label className="font-semibold">Special Request:</label>
            <textarea
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              className="mt-1 border px-3 py-2 w-full"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => submitBooking("confirmed")}
              className="flex-1 bg-[#006600] text-white px-6 py-2 shadow hover:bg-green-800"
            >
              Confirm Booking
            </button>

            <button
              type="button"
              onClick={() => submitBooking("guaranteed")}
              className="flex-1 bg-[#0044cc] text-white px-6 py-2 shadow hover:bg-blue-800"
            >
              Guaranteed Booking
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
