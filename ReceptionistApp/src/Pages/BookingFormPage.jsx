
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

//   const initialSelectedDate = state?.selectedDate ? new Date(state.selectedDate) : null;
//   const selectedRoomTypeFromState = state?.roomType || "";

//   const [roomTypes, setRoomTypes] = useState([]);

//   const [isAgencyBooking, setIsAgencyBooking] = useState(false);

//   // Agency
//   const [agencyName, setAgencyName] = useState("");
//   const [agencyEmail, setAgencyEmail] = useState("");
//   const [agencyPhone, setAgencyPhone] = useState("");
//   const [agentName, setAgentName] = useState("");

//   // Guest
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");

//   const [country, setCountry] = useState("Bhutan");
//   const [phoneCode, setPhoneCode] = useState("+975");

//   const [journalInput, setJournalInput] = useState("");
//   const [selectedRoomType, setSelectedRoomType] = useState(selectedRoomTypeFromState);
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

//   const datePickerRef = useRef();

//   const [availableRooms, setAvailableRooms] = useState([]);
//   const [loadingAvailableRooms, setLoadingAvailableRooms] = useState(false);

//   useEffect(() => {
//     const loadRoomTypes = async () => {
//       try {
//         const res = await fetch(`${API_URL}/rooms/room-types`, { credentials: "include" });
//         const json = await res.json();

//         if (res.ok && Array.isArray(json.roomTypes)) {
//           const list = json.roomTypes.map((r) => ({ name: r.roomType, price: r.price }));
//           setRoomTypes(list);
//         }
//       } catch (err) {
//         console.error("Failed to load room types:", err);
//       }
//     };

//     loadRoomTypes();
//   }, []);

//   useEffect(() => {
//     const room = roomTypes.find((r) => r.name === selectedRoomType);
//     const price = room ? room.price : 0;

//     setRoomPrice(price);

//     if (checkInDate && checkOutDate && price) {
//       const diff = Math.ceil((checkOutDate - checkInDate) / 86400000);
//       const nights = diff > 0 ? diff : 1;
//       setTotalPrice(nights * price * roomsRequested);
//     } else if (checkInDate && price && !checkOutDate) {
//       setTotalPrice(price * roomsRequested);
//     } else {
//       setTotalPrice(0);
//     }
//   }, [selectedRoomType, checkInDate, checkOutDate, roomsRequested, roomTypes]);

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

//         if (Array.isArray(arr)) {
//           setAvailableRooms(arr.map((x) => String(x)));
//         }
//       } catch (err) {
//         console.error("Error loading rooms:", err);
//       } finally {
//         setLoadingAvailableRooms(false);
//       }
//     };

//     fetchAvailableRooms();
//   }, [selectedRoomType, checkInDate, checkOutDate]);

//   const inputClass = (field) =>
//     `mt-1 border px-3 py-2 w-full focus:outline-none focus:ring-2 ${
//       errors[field] ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-green-300"
//     }`;

//   const validateField = (field, value) => {
//     let msg = "";

//     switch (field) {
//       case "agencyName":
//         if (isAgencyBooking && !value.trim()) msg = "Agency name is required.";
//         break;

//       case "agentName":
//         if (isAgencyBooking && !value.trim()) msg = "Agent name is required.";
//         break;

//       case "firstName":
//       case "lastName":
//       case "selectedRoomNo":
//       case "journalInput":
//         if (!isAgencyBooking && !value.trim()) msg = "This field is required.";
//         break;

//       case "email":
//         if (!isAgencyBooking) {
//           if (!value.trim()) msg = "Required.";
//           else if (!/^\S+@\S+\.\S+$/.test(value)) msg = "Invalid email.";
//         }
//         break;
//     }

//     setErrors((prev) => ({ ...prev, [field]: msg }));
//   };

//   const toggleMeal = (meal) => {
//     setMeals((prev) => (prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]));
//   };

//   const submitAdminBooking = async (status) => {
//     ["selectedRoomType", "selectedRoomNo", "checkInDate", "checkOutDate"].forEach((f) =>
//       validateField(f, eval(f))
//     );

//     const payload = {
//       isAgencyBooking,
//       agencyName: isAgencyBooking ? agencyName : undefined,
//       agencyEmail: isAgencyBooking ? agencyEmail : undefined,
//       agencyPhone: isAgencyBooking ? agencyPhone : undefined,
//       agentName: isAgencyBooking ? agentName : undefined,

//       country,
//       firstName: !isAgencyBooking ? firstName : undefined,
//       lastName: !isAgencyBooking ? lastName : undefined,
//       email: !isAgencyBooking ? email : undefined,
//       phone: !isAgencyBooking ? phone : undefined,

//       checkIn: checkInDate?.toISOString(),
//       checkOut: checkOutDate?.toISOString(),

//       roomSelection: [
//         { roomType: selectedRoomType, roomsRequested: roomsRequested || 1 },
//       ],

//       meals,
//       specialRequest,

//       assignedRoom: selectedRoomNo
//         ? selectedRoomNo.split(",").map((x) => x.trim())
//         : undefined,

//       transactionNumber: journalInput || undefined,
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

//       if (!res.ok) throw new Error(data.message);

//       await Swal.fire({
//         title: "Success!",
//         text: `Booking created as ${status.toUpperCase()}`,
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

//   useEffect(() => {
//     const onDocClick = (e) => {
//       if (!datePickerRef.current) return;
//       if (!datePickerRef.current.contains(e.target)) setOpenDatePickerFor(null);
//     };

//     document.addEventListener("click", onDocClick);
//     return () => document.removeEventListener("click", onDocClick);
//   }, []);
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { Calendar } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const countries = [
  { name: "Afghanistan", code: "+93" },
  { name: "Albania", code: "+355" },
  { name: "Algeria", code: "+213" },
  { name: "Andorra", code: "+376" },
  { name: "Angola", code: "+244" },
  { name: "Argentina", code: "+54" },
  { name: "Armenia", code: "+374" },
  { name: "Australia", code: "+61" },
  { name: "Austria", code: "+43" },
  { name: "Azerbaijan", code: "+994" },
  { name: "Bahamas", code: "+1‑242" },
  { name: "Bahrain", code: "+973" },
  { name: "Bangladesh", code: "+880" },
  { name: "Barbados", code: "+1‑246" },
  { name: "Belarus", code: "+375" },
  { name: "Belgium", code: "+32" },
  { name: "Belize", code: "+501" },
  { name: "Benin", code: "+229" },
  { name: "Bhutan", code: "+975" },
  { name: "Bolivia", code: "+591" },
  { name: "Bosnia and Herzegovina", code: "+387" },
  { name: "Botswana", code: "+267" },
  { name: "Brazil", code: "+55" },
  { name: "Brunei", code: "+673" },
  { name: "Bulgaria", code: "+359" },
  { name: "Burkina Faso", code: "+226" },
  { name: "Burundi", code: "+257" },
  { name: "Cambodia", code: "+855" },
  { name: "Cameroon", code: "+237" },
  { name: "Canada", code: "+1" },
  { name: "Chad", code: "+235" },
  { name: "Chile", code: "+56" },
  { name: "China", code: "+86" },
  { name: "Colombia", code: "+57" },
  { name: "Costa Rica", code: "+506" },
  { name: "Croatia", code: "+385" },
  { name: "Cuba", code: "+53" },
  { name: "Cyprus", code: "+357" },
  { name: "Czech Republic", code: "+420" },
  { name: "Denmark", code: "+45" },
  { name: "Djibouti", code: "+253" },
  { name: "Dominica", code: "+1‑767" },
  { name: "Dominican Republic", code: "+1‑809" },
  { name: "Ecuador", code: "+593" },
  { name: "Egypt", code: "+20" },
  { name: "Estonia", code: "+372" },
  { name: "Ethiopia", code: "+251" },
  { name: "Fiji", code: "+679" },
  { name: "Finland", code: "+358" },
  { name: "France", code: "+33" },
  { name: "Gabon", code: "+241" },
  { name: "Gambia", code: "+220" },
  { name: "Georgia", code: "+995" },
  { name: "Germany", code: "+49" },
  { name: "Ghana", code: "+233" },
  { name: "Greece", code: "+30" },
  { name: "Guatemala", code: "+502" },
  { name: "Haiti", code: "+509" },
  { name: "Honduras", code: "+504" },
  { name: "Hungary", code: "+36" },
  { name: "Iceland", code: "+354" },
  { name: "India", code: "+91" },
  { name: "Indonesia", code: "+62" },
  { name: "Iran", code: "+98" },
  { name: "Iraq", code: "+964" },
  { name: "Ireland", code: "+353" },
  { name: "Israel", code: "+972" },
  { name: "Italy", code: "+39" },
  { name: "Jamaica", code: "+1‑876" },
  { name: "Japan", code: "+81" },
  { name: "Jordan", code: "+962" },
  { name: "Kazakhstan", code: "+7" },
  { name: "Kenya", code: "+254" },
  { name: "Kuwait", code: "+965" },
  { name: "Kyrgyzstan", code: "+996" },
  { name: "Laos", code: "+856" },
  { name: "Latvia", code: "+371" },
  { name: "Lebanon", code: "+961" },
  { name: "Lesotho", code: "+266" },
  { name: "Liberia", code: "+231" },
  { name: "Libya", code: "+218" },
  { name: "Lithuania", code: "+370" },
  { name: "Luxembourg", code: "+352" },
  { name: "Madagascar", code: "+261" },
  { name: "Malawi", code: "+265" },
  { name: "Malaysia", code: "+60" },
  { name: "Maldives", code: "+960" },
  { name: "Mali", code: "+223" },
  { name: "Malta", code: "+356" },
  { name: "Mauritania", code: "+222" },
  { name: "Mauritius", code: "+230" },
  { name: "Mexico", code: "+52" },
  { name: "Moldova", code: "+373" },
  { name: "Monaco", code: "+377" },
  { name: "Mongolia", code: "+976" },
  { name: "Montenegro", code: "+382" },
  { name: "Morocco", code: "+212" },
  { name: "Mozambique", code: "+258" },
  { name: "Myanmar", code: "+95" },
  { name: "Namibia", code: "+264" },
  { name: "Nepal", code: "+977" },
  { name: "Netherlands", code: "+31" },
  { name: "New Zealand", code: "+64" },
  { name: "Nicaragua", code: "+505" },
  { name: "Niger", code: "+227" },
  { name: "Nigeria", code: "+234" },
  { name: "North Korea", code: "+850" },
  { name: "Norway", code: "+47" },
  { name: "Oman", code: "+968" },
  { name: "Pakistan", code: "+92" },
  { name: "Palau", code: "+680" },
  { name: "Panama", code: "+507" },
  { name: "Papua New Guinea", code: "+675" },
  { name: "Paraguay", code: "+595" },
  { name: "Peru", code: "+51" },
  { name: "Philippines", code: "+63" },
  { name: "Poland", code: "+48" },
  { name: "Portugal", code: "+351" },
  { name: "Qatar", code: "+974" },
  { name: "Romania", code: "+40" },
  { name: "Russia", code: "+7" },
  { name: "Rwanda", code: "+250" },
  { name: "Samoa", code: "+685" },
  { name: "San Marino", code: "+378" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "Senegal", code: "+221" },
  { name: "Serbia", code: "+381" },
  { name: "Seychelles", code: "+248" },
  { name: "Singapore", code: "+65" },
  { name: "Slovakia", code: "+421" },
  { name: "Slovenia", code: "+386" },
  { name: "Somalia", code: "+252" },
  { name: "South Africa", code: "+27" },
  { name: "South Korea", code: "+82" },
  { name: "Spain", code: "+34" },
  { name: "Sri Lanka", code: "+94" },
  { name: "Sudan", code: "+249" },
  { name: "Sweden", code: "+46" },
  { name: "Switzerland", code: "+41" },
  { name: "Syria", code: "+963" },
  { name: "Taiwan", code: "+886" },
  { name: "Tajikistan", code: "+992" },
  { name: "Tanzania", code: "+255" },
  { name: "Thailand", code: "+66" },
  { name: "Tunisia", code: "+216" },
  { name: "Turkey", code: "+90" },
  { name: "Turkmenistan", code: "+993" },
  { name: "Uganda", code: "+256" },
  { name: "Ukraine", code: "+380" },
  { name: "United Arab Emirates", code: "+971" },
  { name: "United Kingdom", code: "+44" },
  { name: "United States", code: "+1" },
  { name: "Uruguay", code: "+598" },
  { name: "Uzbekistan", code: "+998" },
  { name: "Vanuatu", code: "+678" },
  { name: "Vatican City", code: "+379" },
  { name: "Venezuela", code: "+58" },
  { name: "Vietnam", code: "+84" },
  { name: "Yemen", code: "+967" },
  { name: "Zambia", code: "+260" },
  { name: "Zimbabwe", code: "+263" },
];

export default function BookingForm() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const initialSelectedDate = state?.selectedDate ? new Date(state.selectedDate) : null;
  const selectedRoomTypeFromState = state?.roomType || "";

  const [roomTypes, setRoomTypes] = useState([]);

  const [isAgencyBooking, setIsAgencyBooking] = useState(false);

  // Agency fields
  const [agencyName, setAgencyName] = useState("");
  const [agencyEmail, setAgencyEmail] = useState("");
  const [agencyPhone, setAgencyPhone] = useState("");
  const [agentName, setAgentName] = useState("");

  // Guest fields
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

  // ✔ FIXED: always send YYYY-MM-DD
  const toYMD = (d) => {
    if (!d) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
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

      // ✔ FINAL FIX (YYYY-MM-DD)
      checkIn: checkInDate ? toYMD(checkInDate) : undefined,
      checkOut: checkOutDate ? toYMD(checkOutDate) : undefined,

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
