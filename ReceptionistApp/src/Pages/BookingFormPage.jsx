// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Swal from "sweetalert2";
// import { Calendar } from "lucide-react";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// const countries = [
//   { name: "Bhutan", code: "+975" },
//   { name: "India", code: "+91" },
//   { name: "United States", code: "+1" },
// ];

// export default function BookingForm() {
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   const selectedRoomTypeState = state?.roomType || "";
//   const initialSelectedDate = state?.selectedDate ? new Date(state.selectedDate) : null;

//   const [roomTypes, setRoomTypes] = useState([]);

//   const [isAgencyBooking, setIsAgencyBooking] = useState(false);

//   // Agency fields
//   const [agencyName, setAgencyName] = useState("");
//   const [agencyEmail, setAgencyEmail] = useState("");
//   const [agencyPhone, setAgencyPhone] = useState("");
//   const [agentName, setAgentName] = useState("");

//   // Guest fields
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");

//   const [country, setCountry] = useState("Bhutan");
//   const [phoneCode, setPhoneCode] = useState("+975");

//   const [journalInput, setJournalInput] = useState("");
//   const [selectedRoomType, setSelectedRoomType] = useState(selectedRoomTypeState);
//   const [selectedRoomNo, setSelectedRoomNo] = useState("");

//   const [checkInDate, setCheckInDate] = useState(initialSelectedDate);
//   const [checkOutDate, setCheckOutDate] = useState(null);

//   const [roomsRequested, setRoomsRequested] = useState(1);
//   const [children, setChildren] = useState(0);

//   const [specialRequest, setSpecialRequest] = useState("");
//   const [meals, setMeals] = useState([]);

//   const [roomPrice, setRoomPrice] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);

//   const [errors, setErrors] = useState({});
//   const [openDatePickerFor, setOpenDatePickerFor] = useState(null);
//   const datePickerRef = useRef(null);

//   const [availableRooms, setAvailableRooms] = useState([]);
//   const [loadingAvailableRooms, setLoadingAvailableRooms] = useState(false);

//   // Room types
//   useEffect(() => {
//     const loadRoomTypes = async () => {
//       try {
//         const res = await fetch(`${API_URL}/rooms/room-types`, { credentials: "include" });
//         const json = await res.json();
//         if (res.ok && Array.isArray(json.roomTypes)) {
//           const list = json.roomTypes.map((r) => ({
//             name: r.roomType,
//             price: r.price,
//           }));
//           setRoomTypes(list);
//         }
//       } catch (err) {
//         console.error("Failed to load room types:", err);
//       }
//     };
//     loadRoomTypes();
//   }, []);

//   // Price calculation
//   useEffect(() => {
//     const r = roomTypes.find((x) => x.name === selectedRoomType);
//     const price = r ? r.price : 0;
//     setRoomPrice(price);

//     if (checkInDate && checkOutDate) {
//       const diff = Math.ceil((checkOutDate - checkInDate) / 86400000);
//       const nights = diff > 0 ? diff : 1;
//       setTotalPrice(nights * price * roomsRequested);
//     } else if (checkInDate) {
//       setTotalPrice(price * roomsRequested);
//     } else {
//       setTotalPrice(0);
//     }
//   }, [selectedRoomType, checkInDate, checkOutDate, roomsRequested, roomTypes]);

//   // Available room numbers
//   useEffect(() => {
//     const fetchAvailableRooms = async () => {
//       setAvailableRooms([]);

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
//         const url = `${API_URL}/rooms/available-numbers/${selectedRoomType}?checkIn=${checkInStr}&checkOut=${checkOutStr}`;
//         const res = await fetch(url, { credentials: "include" });
//         const data = await res.json();

//         let arr = null;
//         if (Array.isArray(data.availableRoomNumbers)) arr = data.availableRoomNumbers;
//         else if (Array.isArray(data.available)) arr = data.available;
//         else if (Array.isArray(data)) arr = data;

//         if (Array.isArray(arr)) setAvailableRooms(arr.map(String));
//       } catch (err) {
//         console.error("Failed to load rooms:", err);
//       } finally {
//         setLoadingAvailableRooms(false);
//       }
//     };

//     fetchAvailableRooms();
//   }, [selectedRoomType, checkInDate, checkOutDate]);

//   const inputClass = (field) =>
//     `mt-1 border px-3 py-2 w-full ${errors[field] ? "border-red-500" : "border-gray-300"}`;

//   const validateField = (field, value) => {
//     let msg = "";

//     switch (field) {
//       case "firstName":
//       case "lastName":
//         if (!isAgencyBooking && !value.trim()) msg = "Required.";
//         break;

//       case "agencyName":
//       case "agentName":
//         if (isAgencyBooking && !value.trim()) msg = "Required.";
//         break;

//       case "email":
//         if (!isAgencyBooking) {
//           if (!value.trim()) msg = "Required.";
//           else if (!/^\S+@\S+\.\S+$/.test(value)) msg = "Invalid email.";
//         }
//         break;

//       case "selectedRoomNo":
//         if (!value.trim()) msg = "Required.";
//         break;
//     }

//     setErrors((prev) => ({ ...prev, [field]: msg }));
//   };

//   const toggleMeal = (meal) => {
//     setMeals((prev) =>
//       prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]
//     );
//   };

//   const makeBooking = async (statusOverride) => {
//     // Validate basic
//     validateField("selectedRoomNo", selectedRoomNo);

//     if (isAgencyBooking) {
//       validateField("agencyName", agencyName);
//       validateField("agentName", agentName);
//     } else {
//       validateField("firstName", firstName);
//       validateField("lastName", lastName);
//       validateField("email", email);
//     }

//     const payload = {
//       isAgencyBooking,

//       agencyName: isAgencyBooking ? agencyName : undefined,
//       agencyEmail: isAgencyBooking ? agencyEmail : undefined,
//       agencyPhone: isAgencyBooking ? agencyPhone : undefined,
//       agentName: isAgencyBooking ? agentName : undefined,

//       firstName: !isAgencyBooking ? firstName : undefined,
//       lastName: !isAgencyBooking ? lastName : undefined,
//       email: !isAgencyBooking ? email : undefined,
//       phone: !isAgencyBooking ? phone : undefined,

//       country,
//       meals,
//       specialRequest,
//       transactionNumber: journalInput,

//       checkIn: checkInDate?.toISOString(),
//       checkOut: checkOutDate?.toISOString(),

//       roomSelection: [
//         { roomType: selectedRoomType, roomsRequested: roomsRequested },
//       ],

//       assignedRoom: selectedRoomNo.split(",").map((r) => r.trim()),

//       statusOverride,
//     };

//     try {
//       const res = await fetch(`${API_URL}/bookings/book-rooms`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       await Swal.fire({
//         title: "Success!",
//         text: `Booking created as ${statusOverride.toUpperCase()}`,
//         icon: "success",
//         background: "#006600",
//         color: "white",
//       });

//       navigate("/booking", { state: { activeTab: "BOOKED" } });
//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
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

//   // Close datepicker on outside click
//   useEffect(() => {
//     const listener = (e) => {
//       if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
//         setOpenDatePickerFor(null);
//       }
//     };
//     document.addEventListener("mousedown", listener);
//     return () => document.removeEventListener("mousedown", listener);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 px-2 py-4">
//       <div className="flex items-center justify-between mb-2">
//         <h1 className="text-2xl font-bold text-[#006600]">Booking Form</h1>
//         <button
//           onClick={() => navigate(-1)}
//           className="px-4 py-2 border  bg-white hover:bg-gray-100"
//         >
//           Back
//         </button>
//       </div>

//       {/* NORMAL / AGENCY toggle */}
//       <div className="flex justify-center mb-6">
//         <div
//           role="switch"
//           aria-checked={isAgencyBooking}
//           onClick={() => setIsAgencyBooking((prev) => !prev)}
//           className="relative cursor-pointer"
//         >
//           <div className="w-56 h-12 -full bg-gray-200 p-1 shadow-inner relative">
//             <div
//               className={`absolute top-1 left-1 h-10 w-1/2 -full bg-white shadow transition-transform ${
//                 isAgencyBooking ? "translate-x-full" : ""
//               }`}
//             />
//             <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
//               <span className={!isAgencyBooking ? "text-[#006600]" : "text-gray-500"}>
//                 NORMAL
//               </span>
//               <span className={isAgencyBooking ? "text-[#006600]" : "text-gray-500"}>
//                 AGENCY
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FORM */}
//       <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Left: Room details */}
//         <div className="bg-white shadow p-4">
//           <h2 className="text-xl font-bold mb-3">Room Information</h2>

//           {/* Room type (readonly) */}
//           <div>
//             <label className="font-semibold">Room Type:</label>
//             <div className="mt-1 border px-3 py-2 bg-gray-100 ">
//               {selectedRoomType}
//             </div>
//           </div>

//           {/* Check-in */}
//           <div ref={datePickerRef} className="relative mt-4">
//             <label className="font-semibold">Check-In:</label>
//             <div
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setOpenDatePickerFor(
//                   openDatePickerFor === "checkin" ? null : "checkin"
//                 );
//               }}
//               className="mt-1 border px-3 py-3 flex justify-between cursor-pointer"
//             >
//               <span>{formatDate(checkInDate)}</span>
//               <Calendar size={18} />
//             </div>

//             {openDatePickerFor === "checkin" && (
//               <div className="absolute z-50 mt-2">
//                 <DatePicker
//                   inline
//                   selected={checkInDate}
//                   minDate={new Date()}
//                   onChange={(d) => {
//                     setCheckInDate(d);
//                     setOpenDatePickerFor(null);
//                   }}
//                 />
//               </div>
//             )}
//           </div>

//           {/* Check-out */}
//           <div ref={datePickerRef} className="relative mt-4">
//             <label className="font-semibold">Check-Out:</label>
//             <div
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setOpenDatePickerFor(
//                   openDatePickerFor === "checkout" ? null : "checkout"
//                 );
//               }}
//               className="mt-1 border px-3 py-3 flex justify-between cursor-pointer"
//             >
//               <span>{formatDate(checkOutDate)}</span>
//               <Calendar size={18} />
//             </div>

//             {openDatePickerFor === "checkout" && (
//               <div className="absolute z-50 mt-2">
//                 <DatePicker
//                   inline
//                   selected={checkOutDate}
//                   minDate={checkInDate || new Date()}
//                   onChange={(d) => {
//                     setCheckOutDate(d);
//                     setOpenDatePickerFor(null);
//                   }}
//                 />
//               </div>
//             )}
//           </div>

//           {/* Room Number */}
//           <div className="mt-4">
//             <label className="font-semibold">Room Number(s):</label>
//             {loadingAvailableRooms ? (
//               <div className="mt-1 border px-3 py-2 bg-gray-100">
//                 Loading rooms...
//               </div>
//             ) : (
//               <select
//                 value={selectedRoomNo}
//                 onChange={(e) => setSelectedRoomNo(e.target.value)}
//                 className={inputClass("selectedRoomNo")}
//               >
//                 <option value="">Select</option>
//                 {availableRooms.map((rn) => (
//                   <option key={rn} value={rn}>
//                     {rn}
//                   </option>
//                 ))}
//               </select>
//             )}
//           </div>

//           {/* Rooms Requested + Children */}
//           <div className="flex gap-3 mt-4">
//             <div className="flex-1">
//               <label className="font-semibold">Rooms Requested:</label>
//               <input
//                 type="number"
//                 min="1"
//                 value={roomsRequested}
//                 onChange={(e) => setRoomsRequested(Number(e.target.value))}
//                 className={inputClass("roomsRequested")}
//               />
//             </div>
//             <div className="flex-1">
//               <label className="font-semibold">Children:</label>
//               <input
//                 type="number"
//                 min="0"
//                 value={children}
//                 onChange={(e) => setChildren(Number(e.target.value))}
//                 className="mt-1 border px-3 py-2 w-full"
//               />
//             </div>
//           </div>

//           {/* Price */}
//           <p className="font-semibold mt-3">Room Price: Nu. {roomPrice}</p>
//           <p className="font-semibold">Total: Nu. {totalPrice}</p>
//         </div>

//         {/* Right: Guest or Agency */}
//         <div className="bg-white shadow p-4">
//           <h2 className="text-xl font-bold mb-3">Guest / Agency Info</h2>

//           {isAgencyBooking ? (
//             <>
//               <label className="font-semibold">Agency Name:</label>
//               <input
//                 value={agencyName}
//                 onChange={(e) => setAgencyName(e.target.value)}
//                 className={inputClass("agencyName")}
//               />

//               <label className="font-semibold">Agency Email (optional):</label>
//               <input
//                 value={agencyEmail}
//                 onChange={(e) => setAgencyEmail(e.target.value)}
//                 className="mt-1 border px-3 py-2 w-full"
//               />

//               <label className="font-semibold">Agency Phone (optional):</label>
//               <input
//                 value={agencyPhone}
//                 onChange={(e) => setAgencyPhone(e.target.value)}
//                 className="mt-1 border px-3 py-2 w-full"
//               />

//               <label className="font-semibold mt-2">Agent Name:</label>
//               <input
//                 value={agentName}
//                 onChange={(e) => setAgentName(e.target.value)}
//                 className={inputClass("agentName")}
//               />
//             </>
//           ) : (
//             <>
//               <label className="font-semibold">First Name:</label>
//               <input
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className={inputClass("firstName")}
//               />

//               <label className="font-semibold">Last Name:</label>
//               <input
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className={inputClass("lastName")}
//               />

//               <label className="font-semibold">Email:</label>
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={inputClass("email")}
//               />

//               <label className="font-semibold mt-2">Phone:</label>
//               <input
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className={inputClass("phone")}
//               />
//             </>
//           )}

//           {/* Country */}
//           <div className="mt-2">
//             <label className="font-semibold">Country:</label>
//             <select
//               value={country}
//               onChange={(e) => {
//                 setCountry(e.target.value);
//                 const found = countries.find((x) => x.name === e.target.value);
//                 setPhoneCode(found?.code || "+975");
//               }}
//               className="mt-1 border px-3 py-2 w-full"
//             >
//               {countries.map((c) => (
//                 <option key={c.name} value={c.name}>
//                   {c.name} ({c.code})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Meals */}
//           <div className="mt-3">
//             <label className="font-semibold">Meals:</label>
//             <div className="flex flex-col gap-2 mt-1">
//               {["breakfast", "lunch", "dinner"].map((m) => (
//                 <label key={m} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={meals.includes(m)}
//                     onChange={() => toggleMeal(m)}
//                   />
//                   <span className="capitalize">{m}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Journal */}
//           <div className="mt-3">
//             <label className="font-semibold">Journal Number:</label>
//             <input
//               value={journalInput}
//               onChange={(e) => setJournalInput(e.target.value)}
//               className={inputClass("journalInput")}
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

//           {/* BOTH BUTTONS HERE */}
//           <div className="flex gap-3 mt-4">
//             <button
//               type="button"
//               onClick={() => makeBooking("confirmed")}
//               className="flex-1 bg-[#006600] text-white px-6 py-2 shadow hover:bg-green-800"
//             >
//               Confirm Booking
//             </button>

//             <button
//               type="button"
//               onClick={() => makeBooking("guaranteed")}
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
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { Calendar } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const countries = [
  { name: "Bhutan", code: "+975" },
  { name: "India", code: "+91" },
  { name: "United States", code: "+1" },
];

export default function BookingForm() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const initialSelectedDate = state?.selectedDate ? new Date(state.selectedDate) : null;
  const selectedRoomTypeFromState = state?.roomType || "";

  const [roomTypes, setRoomTypes] = useState([]);

  const [isAgencyBooking, setIsAgencyBooking] = useState(false);

  // Agency
  const [agencyName, setAgencyName] = useState("");
  const [agencyEmail, setAgencyEmail] = useState("");
  const [agencyPhone, setAgencyPhone] = useState("");
  const [agentName, setAgentName] = useState("");

  // Guest
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [country, setCountry] = useState("Bhutan");
  const [phoneCode, setPhoneCode] = useState("+975");

  const [journalInput, setJournalInput] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState(selectedRoomTypeFromState);
  const [selectedRoomNo, setSelectedRoomNo] = useState("");

  const [checkInDate, setCheckInDate] = useState(initialSelectedDate);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [roomsRequested, setRoomsRequested] = useState(1);
  const [children, setChildren] = useState(0);

  const [specialRequest, setSpecialRequest] = useState("");
  const [meals, setMeals] = useState([]);

  const [roomPrice, setRoomPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [errors, setErrors] = useState({});
  const [openDatePickerFor, setOpenDatePickerFor] = useState(null);

  const datePickerRef = useRef();

  const [availableRooms, setAvailableRooms] = useState([]);
  const [loadingAvailableRooms, setLoadingAvailableRooms] = useState(false);

  useEffect(() => {
    const loadRoomTypes = async () => {
      try {
        const res = await fetch(`${API_URL}/rooms/room-types`, { credentials: "include" });
        const json = await res.json();

        if (res.ok && Array.isArray(json.roomTypes)) {
          const list = json.roomTypes.map((r) => ({ name: r.roomType, price: r.price }));
          setRoomTypes(list);
        }
      } catch (err) {
        console.error("Failed to load room types:", err);
      }
    };

    loadRoomTypes();
  }, []);

  useEffect(() => {
    const room = roomTypes.find((r) => r.name === selectedRoomType);
    const price = room ? room.price : 0;

    setRoomPrice(price);

    if (checkInDate && checkOutDate && price) {
      const diff = Math.ceil((checkOutDate - checkInDate) / 86400000);
      const nights = diff > 0 ? diff : 1;
      setTotalPrice(nights * price * roomsRequested);
    } else if (checkInDate && price && !checkOutDate) {
      setTotalPrice(price * roomsRequested);
    } else {
      setTotalPrice(0);
    }
  }, [selectedRoomType, checkInDate, checkOutDate, roomsRequested, roomTypes]);

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      setAvailableRooms([]);

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
        const url = `${API_URL}/rooms/available-numbers/${selectedRoomType}?checkIn=${checkInStr}&checkOut=${checkOutStr}`;
        const res = await fetch(url, { credentials: "include" });
        const data = await res.json();

        let arr = null;

        if (Array.isArray(data.availableRoomNumbers)) arr = data.availableRoomNumbers;
        else if (Array.isArray(data.available)) arr = data.available;
        else if (Array.isArray(data)) arr = data;

        if (Array.isArray(arr)) {
          setAvailableRooms(arr.map((x) => String(x)));
        }
      } catch (err) {
        console.error("Error loading rooms:", err);
      } finally {
        setLoadingAvailableRooms(false);
      }
    };

    fetchAvailableRooms();
  }, [selectedRoomType, checkInDate, checkOutDate]);

  const inputClass = (field) =>
    `mt-1 border px-3 py-2 w-full focus:outline-none focus:ring-2 ${
      errors[field] ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-green-300"
    }`;

  const validateField = (field, value) => {
    let msg = "";

    switch (field) {
      case "agencyName":
        if (isAgencyBooking && !value.trim()) msg = "Agency name is required.";
        break;

      case "agentName":
        if (isAgencyBooking && !value.trim()) msg = "Agent name is required.";
        break;

      case "firstName":
      case "lastName":
      case "selectedRoomNo":
      case "journalInput":
        if (!isAgencyBooking && !value.trim()) msg = "This field is required.";
        break;

      case "email":
        if (!isAgencyBooking) {
          if (!value.trim()) msg = "Required.";
          else if (!/^\S+@\S+\.\S+$/.test(value)) msg = "Invalid email.";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: msg }));
  };

  const toggleMeal = (meal) => {
    setMeals((prev) => (prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]));
  };

  const submitAdminBooking = async (status) => {
    ["selectedRoomType", "selectedRoomNo", "checkInDate", "checkOutDate"].forEach((f) =>
      validateField(f, eval(f))
    );

    const payload = {
      isAgencyBooking,
      agencyName: isAgencyBooking ? agencyName : undefined,
      agencyEmail: isAgencyBooking ? agencyEmail : undefined,
      agencyPhone: isAgencyBooking ? agencyPhone : undefined,
      agentName: isAgencyBooking ? agentName : undefined,

      country,
      firstName: !isAgencyBooking ? firstName : undefined,
      lastName: !isAgencyBooking ? lastName : undefined,
      email: !isAgencyBooking ? email : undefined,
      phone: !isAgencyBooking ? phone : undefined,

      checkIn: checkInDate?.toISOString(),
      checkOut: checkOutDate?.toISOString(),

      roomSelection: [
        { roomType: selectedRoomType, roomsRequested: roomsRequested || 1 },
      ],

      meals,
      specialRequest,

      assignedRoom: selectedRoomNo
        ? selectedRoomNo.split(",").map((x) => x.trim())
        : undefined,

      transactionNumber: journalInput || undefined,
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

      if (!res.ok) throw new Error(data.message);

      await Swal.fire({
        title: "Success!",
        text: `Booking created as ${status.toUpperCase()}`,
        icon: "success",
        background: "#006600",
        color: "white",
      });

      navigate("/booking", { state: { activeTab: "BOOKED" } });
    } catch (err) {
      Swal.fire("Error", err.message, "error");
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

  return (
    <div className="min-h-screen bg-gray-50 px-2 py-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-[#006600]">
          AVAILABLE Booking Details
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-gray-300  hover:bg-gray-100"
        >
          Back
        </button>
      </div>

      {/* TOGGLE */}
      <div className="flex justify-center mb-6">
        <div
          role="switch"
          aria-checked={isAgencyBooking}
          onClick={() => {
            setIsAgencyBooking((prev) => {
              const next = !prev;
              setErrors({});

              if (next) {
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhone("");
              } else {
                setAgencyName("");
                setAgencyEmail("");
                setAgencyPhone("");
                setAgentName("");
              }

              return next;
            });
          }}
          className="relative select-none cursor-pointer"
        >
          <div className="w-56 h-12 -full bg-gray-200 p-1 shadow-inner relative">
            <div
              className={`absolute top-1 left-1 h-10 w-1/2 -full bg-white shadow transition-transform duration-200 ${
                isAgencyBooking ? "translate-x-full" : ""
              }`}
            />
            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
              <span className={!isAgencyBooking ? "text-[#006600]" : "text-gray-500"}>
                NORMAL
              </span>
              <span className={isAgencyBooking ? "text-[#006600]" : "text-gray-500"}>
                AGENCY
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Room Info */}
        <div className="bg-white shadow p-4">
          <h2 className="text-xl font-bold mb-3 py-2">Room Information</h2>

          {/* Room Type */}
          <div>
            <label className="font-semibold">Room Type:</label>
            <div className="mt-1 border px-3 py-2 bg-gray-100 text-gray-800 ">
              {selectedRoomType}
            </div>
          </div>

          {/* Check-In */}
          <div className="relative mt-4" ref={datePickerRef}>
            <label className="font-semibold">Check-In:</label>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setOpenDatePickerFor((prev) => (prev === "checkin" ? null : "checkin"));
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
                setOpenDatePickerFor((prev) => (prev === "checkout" ? null : "checkout"));
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
                <select
                  value={selectedRoomNo}
                  onChange={(e) => {
                    setSelectedRoomNo(e.target.value);
                    validateField("selectedRoomNo", e.target.value);
                  }}
                  className={inputClass("selectedRoomNo")}
                >
                  <option value="">Select</option>
                  {availableRooms.map((rn) => (
                    <option key={rn} value={rn}>
                      {rn}
                    </option>
                  ))}
                </select>

                {!availableRooms.length && (
                  <p className="text-sm text-gray-600 mt-1">No rooms available.</p>
                )}
              </>
            )}
          </div>

          {/* Rooms Requested */}
          <div className="flex gap-3 mt-4">
            <div className="flex-1">
              <label className="font-semibold">Rooms Requested:</label>
              <input
                type="number"
                min="1"
                value={roomsRequested}
                onChange={(e) =>
                  setRoomsRequested(parseInt(e.target.value) || 1)
                }
                className={inputClass("roomsRequested")}
              />
            </div>

            <div className="flex-1">
              <label className="font-semibold">Children:</label>
              <input
                type="number"
                min="0"
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                className="mt-1 border px-3 py-2 w-full"
              />
            </div>
          </div>

          <p className="font-semibold mt-2">Room Price: Nu. {roomPrice} / night</p>
          <p className="font-semibold">Total Price: Nu. {totalPrice}</p>
        </div>

        {/* Guest / Agency Info */}
        <div className="bg-white shadow p-4">
          <h2 className="text-xl font-bold mb-3 py-2">Guest / Agency Information</h2>

          {isAgencyBooking ? (
            <>
              <div>
                <label className="font-semibold">Agency Name:</label>
                <input
                  type="text"
                  value={agencyName}
                  onChange={(e) => {
                    setAgencyName(e.target.value);
                    validateField("agencyName", e.target.value);
                  }}
                  className={inputClass("agencyName")}
                />
                {errors.agencyName && <p className="text-red-500 text-sm">{errors.agencyName}</p>}
              </div>

              <div>
                <label className="font-semibold">Agency Email (optional):</label>
                <input
                  type="email"
                  value={agencyEmail}
                  onChange={(e) => {
                    setAgencyEmail(e.target.value);
                    validateField("email", e.target.value);
                  }}
                  className="mt-1 border px-3 py-2 w-full"
                />
              </div>

              <div>
                <label className="font-semibold">Agency Phone (optional):</label>
                <input
                  type="text"
                  value={agencyPhone}
                  onChange={(e) => setAgencyPhone(e.target.value)}
                  className="mt-1 border px-3 py-2 w-full"
                />
              </div>

              <div>
                <label className="font-semibold">Agent Name:</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => {
                    setAgentName(e.target.value);
                    validateField("agentName", e.target.value);
                  }}
                  className={inputClass("agentName")}
                />
                {errors.agentName && <p className="text-red-500 text-sm">{errors.agentName}</p>}
              </div>

              <div>
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

              <div className="mt-3">
                <label className="font-semibold">Types of Meals:</label>
                <div className="flex flex-col gap-2 mt-1">
                  {["breakfast", "lunch", "dinner"].map((m) => (
                    <label key={m} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={meals.includes(m)}
                        onChange={() => toggleMeal(m)}
                      />
                      <span className="capitalize">{m}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="font-semibold">First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    validateField("firstName", e.target.value);
                  }}
                  className={inputClass("firstName")}
                />
              </div>

              <div>
                <label className="font-semibold">Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    validateField("lastName", e.target.value);
                  }}
                  className={inputClass("lastName")}
                />
              </div>

              <div>
                <label className="font-semibold">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateField("email", e.target.value);
                  }}
                  className={inputClass("email")}
                />
              </div>

              <div>
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

              <div className="flex gap-2">
                <div className="flex-1">
                  <label>Code:</label>
                  <input
                    type="text"
                    readOnly
                    value={phoneCode}
                    className="mt-1 bg-gray-100 border px-3 py-2 w-full"
                  />
                </div>

                <div className="flex-1">
                  <label>Phone:</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass("phone")}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
              </div>

              <div className="mt-3">
                <label className="font-semibold">Types of Meals:</label>
                <div className="flex flex-col gap-2 mt-1">
                  {["breakfast", "lunch", "dinner"].map((m) => (
                    <label key={m} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={meals.includes(m)}
                        onChange={() => toggleMeal(m)}
                      />
                      <span className="capitalize">{m}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="font-semibold">Journal Number:</label>
            <input
              type="text"
              value={journalInput}
              onChange={(e) => {
                setJournalInput(e.target.value);
                validateField("journalInput", e.target.value);
              }}
              className={inputClass("journalInput")}
            />
          </div>

          <div>
            <label>Special Request:</label>
            <textarea
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              className="mt-1 border px-3 py-2 w-full"
            />
          </div>

          {/* Confirm + Guaranteed */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={() => submitAdminBooking("confirmed")}
              className="flex-1 bg-[#006600] text-white px-6 py-2 shadow hover:bg-green-800"
            >
              Confirm Booking
            </button>

            <button
              type="button"
              onClick={() => submitAdminBooking("guaranteed")}
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
