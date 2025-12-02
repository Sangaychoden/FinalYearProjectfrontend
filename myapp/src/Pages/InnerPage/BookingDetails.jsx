
// // // import React, { useState, useEffect } from "react";
// // // import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
// // // import Swal from "sweetalert2";
// // // import { useNavigate, useLocation } from "react-router-dom";

// // // const BookingDetails = () => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const info = location.state;

// // //   if (!info || !info.roomData) {
// // //     return (
// // //       <section>
// // //         <BreadCrumb title="booking details" />
// // //         <div className="py-20 text-center text-xl text-gray-700">
// // //           Booking information is missing.
// // //         </div>
// // //       </section>
// // //     );
// // //   }

// // //   const room = info.roomData;
// // //   const pricing = room.pricing || {};
// // //   const mealPlan = info.mealPlan || "ep"; // ep | cp | map | ap
// // //   const occupancyType = info.occupancyType || "double"; // single | double
// // //   const childrenAges = info.childrenAges || [];
// // //   const adults = info.adult || 1;
// // //   const children = info.children || 0;

// // //   // base price per room per night based on meal plan & occupancy
// // //   const basePrice =
// // //     pricing?.[mealPlan]?.[occupancyType] ?? room.price ?? 0;

// // //   // extra bed price per night
// // //   const getExtraBedPrice = () => {
// // //     if (!pricing.extraBed) return 0;
// // //     if (mealPlan === "map") {
// // //       return occupancyType === "single"
// // //         ? pricing.extraBed.mapSingle ?? 0
// // //         : pricing.extraBed.mapDouble ?? 0;
// // //     }
// // //     return pricing.extraBed[mealPlan] ?? 0;
// // //   };
// // // const getChildUnitPrice = (ageGroup) => {
// // //   const childPolicy = pricing.childPolicy || {};

// // //   // 1–5 years: FREE (matches backend)
// // //   if (ageGroup === "1-5") {
// // //     return 0;
// // //   }

// // //   // 6–11 years: charge based on meal plan
// // //   if (ageGroup === "6-11") {
// // //     return childPolicy.age6to11?.[mealPlan] ?? 0;
// // //   }

// // //   // 12+ treated as adult
// // //   if (ageGroup === "12+") {
// // //     return basePrice;
// // //   }

// // //   return 0;
// // // };


// // //   // date format for UI
// // //   const formatDate = (date) => {
// // //     if (!date) return "--";
// // //     return new Date(date).toLocaleDateString("en-US", {
// // //       weekday: "short",
// // //       month: "short",
// // //       day: "2-digit",
// // //       year: "numeric",
// // //     });
// // //   };

// // //   // initial booking state
// // //   const [bookingData, setBookingData] = useState(() => ({
// // //     checkIn: info?.checkIn ? new Date(info.checkIn) : null,
// // //     checkOut: info?.checkOut ? new Date(info.checkOut) : null,
// // //     nights:
// // //       info?.nights ||
// // //       (info?.checkIn && info?.checkOut
// // //         ? Math.ceil(
// // //             (new Date(info.checkOut) - new Date(info.checkIn)) /
// // //               (1000 * 60 * 60 * 24)
// // //           )
// // //         : 0),
// // //     rooms: [
// // //       {
// // //         name: room.roomType,
// // //         price: basePrice,
// // //         quantity: info.room || 1,
// // //       },
// // //     ],
// // //   }));

// // //   // countries / phone codes (same as your original)
// // //   const countries = [
// // //     "Afghanistan",
// // //     "Albania",
// // //     "Algeria",
// // //     "Andorra",
// // //     "Angola",
// // //     "Antigua and Barbuda",
// // //     "Argentina",
// // //     "Armenia",
// // //     "Australia",
// // //     "Austria",
// // //     "Azerbaijan",
// // //     "Bahamas",
// // //     "Bahrain",
// // //     "Bangladesh",
// // //     "Barbados",
// // //     "Belarus",
// // //     "Belgium",
// // //     "Belize",
// // //     "Benin",
// // //     "Bhutan",
// // //     "Bolivia",
// // //     "Bosnia and Herzegovina",
// // //     "Botswana",
// // //     "Brazil",
// // //     "Brunei",
// // //     "Bulgaria",
// // //     "Burkina Faso",
// // //     "Burundi",
// // //     "Cape Verde",
// // //     "Cambodia",
// // //     "Cameroon",
// // //     "Canada",
// // //     "Central African Republic",
// // //     "Chad",
// // //     "Chile",
// // //     "China",
// // //     "Colombia",
// // //     "Comoros",
// // //     "Congo",
// // //     "Costa Rica",
// // //     "Croatia",
// // //     "Cuba",
// // //     "Cyprus",
// // //     "Czech Republic",
// // //     "Democratic Republic of the Congo",
// // //     "Denmark",
// // //     "Djibouti",
// // //     "Dominica",
// // //     "Dominican Republic",
// // //     "Ecuador",
// // //     "Egypt",
// // //     "El Salvador",
// // //     "Equatorial Guinea",
// // //     "Eritrea",
// // //     "Estonia",
// // //     "Eswatini",
// // //     "Ethiopia",
// // //     "Fiji",
// // //     "Finland",
// // //     "France",
// // //     "Gabon",
// // //     "Gambia",
// // //     "Georgia",
// // //     "Germany",
// // //     "Ghana",
// // //     "Greece",
// // //     "Grenada",
// // //     "Guatemala",
// // //     "Guinea",
// // //     "Guinea-Bissau",
// // //     "Guyana",
// // //     "Haiti",
// // //     "Honduras",
// // //     "Hungary",
// // //     "Iceland",
// // //     "India",
// // //     "Indonesia",
// // //     "Iran",
// // //     "Iraq",
// // //     "Ireland",
// // //     "Israel",
// // //     "Italy",
// // //     "Ivory Coast",
// // //     "Jamaica",
// // //     "Japan",
// // //     "Jordan",
// // //     "Kazakhstan",
// // //     "Kenya",
// // //     "Kiribati",
// // //     "Kuwait",
// // //     "Kyrgyzstan",
// // //     "Laos",
// // //     "Latvia",
// // //     "Lebanon",
// // //     "Lesotho",
// // //     "Liberia",
// // //     "Libya",
// // //     "Liechtenstein",
// // //     "Lithuania",
// // //     "Luxembourg",
// // //     "Madagascar",
// // //     "Malawi",
// // //     "Malaysia",
// // //     "Maldives",
// // //     "Mali",
// // //     "Malta",
// // //     "Marshall Islands",
// // //     "Mauritania",
// // //     "Mauritius",
// // //     "Mexico",
// // //     "Micronesia",
// // //     "Moldova",
// // //     "Monaco",
// // //     "Mongolia",
// // //     "Montenegro",
// // //     "Morocco",
// // //     "Mozambique",
// // //     "Myanmar",
// // //     "Namibia",
// // //     "Nauru",
// // //     "Nepal",
// // //     "Netherlands",
// // //     "New Zealand",
// // //     "Nicaragua",
// // //     "Niger",
// // //     "Nigeria",
// // //     "North Korea",
// // //     "North Macedonia",
// // //     "Norway",
// // //     "Oman",
// // //     "Pakistan",
// // //     "Palau",
// // //     "Palestine",
// // //     "Panama",
// // //     "Papua New Guinea",
// // //     "Paraguay",
// // //     "Peru",
// // //     "Philippines",
// // //     "Poland",
// // //     "Portugal",
// // //     "Qatar",
// // //     "Romania",
// // //     "Russia",
// // //     "Rwanda",
// // //     "Saint Kitts and Nevis",
// // //     "Saint Lucia",
// // //     "Saint Vincent and the Grenadines",
// // //     "Samoa",
// // //     "San Marino",
// // //     "Sao Tome and Principe",
// // //     "Saudi Arabia",
// // //     "Senegal",
// // //     "Serbia",
// // //     "Seychelles",
// // //     "Sierra Leone",
// // //     "Singapore",
// // //     "Slovakia",
// // //     "Slovenia",
// // //     "Solomon Islands",
// // //     "Somalia",
// // //     "South Africa",
// // //     "South Korea",
// // //     "South Sudan",
// // //     "Spain",
// // //     "Sri Lanka",
// // //     "Sudan",
// // //     "Suriname",
// // //     "Sweden",
// // //     "Switzerland",
// // //     "Syria",
// // //     "Taiwan",
// // //     "Tajikistan",
// // //     "Tanzania",
// // //     "Thailand",
// // //     "Timor-Leste",
// // //     "Togo",
// // //     "Tonga",
// // //     "Trinidad and Tobago",
// // //     "Tunisia",
// // //     "Turkey",
// // //     "Turkmenistan",
// // //     "Tuvalu",
// // //     "Uganda",
// // //     "Ukraine",
// // //     "United Arab Emirates",
// // //     "United Kingdom",
// // //     "United States",
// // //     "Uruguay",
// // //     "Uzbekistan",
// // //     "Vanuatu",
// // //     "Vatican City",
// // //     "Venezuela",
// // //     "Vietnam",
// // //     "Yemen",
// // //     "Zambia",
// // //     "Zimbabwe",
// // //   ];

// // //   const phoneCodes = [
// // //     "+93",
// // //     "+355",
// // //     "+213",
// // //     "+376",
// // //     "+244",
// // //     "+1-268",
// // //     "+54",
// // //     "+374",
// // //     "+61",
// // //     "+43",
// // //     "+994",
// // //     "+1-242",
// // //     "+973",
// // //     "+880",
// // //     "+1-246",
// // //     "+375",
// // //     "+32",
// // //     "+501",
// // //     "+229",
// // //     "+975",
// // //     "+591",
// // //     "+387",
// // //     "+267",
// // //     "+55",
// // //     "+673",
// // //     "+359",
// // //     "+226",
// // //     "+257",
// // //     "+238",
// // //     "+855",
// // //     "+237",
// // //     "+1",
// // //     "+236",
// // //     "+235",
// // //     "+56",
// // //     "+86",
// // //     "+57",
// // //     "+269",
// // //     "+242",
// // //     "+506",
// // //     "+385",
// // //     "+53",
// // //     "+357",
// // //     "+420",
// // //     "+243",
// // //     "+45",
// // //     "+253",
// // //     "+1-767",
// // //     "+1-809",
// // //     "+593",
// // //     "+20",
// // //     "+503",
// // //     "+240",
// // //     "+291",
// // //     "+372",
// // //     "+268",
// // //     "+251",
// // //     "+679",
// // //     "+358",
// // //     "+33",
// // //     "+241",
// // //     "+220",
// // //     "+995",
// // //     "+49",
// // //     "+233",
// // //     "+30",
// // //     "+1-473",
// // //     "+502",
// // //     "+224",
// // //     "+245",
// // //     "+592",
// // //     "+509",
// // //     "+504",
// // //     "+36",
// // //     "+354",
// // //     "+91",
// // //     "+62",
// // //     "+98",
// // //     "+964",
// // //     "+353",
// // //     "+972",
// // //     "+39",
// // //     "+225",
// // //     "+1-876",
// // //     "+81",
// // //     "+962",
// // //     "+7",
// // //     "+254",
// // //     "+686",
// // //     "+965",
// // //     "+996",
// // //     "+856",
// // //     "+371",
// // //     "+961",
// // //     "+266",
// // //     "+231",
// // //     "+218",
// // //     "+423",
// // //     "+370",
// // //     "+352",
// // //     "+261",
// // //     "+265",
// // //     "+60",
// // //     "+960",
// // //     "+223",
// // //     "+356",
// // //     "+692",
// // //     "+222",
// // //     "+230",
// // //     "+52",
// // //     "+691",
// // //     "+373",
// // //     "+377",
// // //     "+976",
// // //     "+382",
// // //     "+212",
// // //     "+258",
// // //     "+95",
// // //     "+264",
// // //     "+674",
// // //     "+977",
// // //     "+31",
// // //     "+64",
// // //     "+505",
// // //     "+227",
// // //     "+234",
// // //     "+850",
// // //     "+389",
// // //     "+47",
// // //     "+968",
// // //     "+92",
// // //     "+680",
// // //     "+970",
// // //     "+507",
// // //     "+675",
// // //     "+595",
// // //     "+51",
// // //     "+63",
// // //     "+48",
// // //     "+351",
// // //     "+974",
// // //     "+40",
// // //     "+7",
// // //     "+250",
// // //     "+1-869",
// // //     "+1-758",
// // //     "+1-784",
// // //     "+685",
// // //     "+378",
// // //     "+239",
// // //     "+966",
// // //     "+221",
// // //     "+381",
// // //     "+248",
// // //     "+232",
// // //     "+65",
// // //     "+421",
// // //     "+386",
// // //     "+677",
// // //     "+252",
// // //     "+27",
// // //     "+82",
// // //     "+211",
// // //     "+34",
// // //     "+94",
// // //     "+249",
// // //     "+597",
// // //     "+46",
// // //     "+41",
// // //     "+963",
// // //     "+886",
// // //     "+992",
// // //     "+255",
// // //     "+66",
// // //     "+670",
// // //     "+228",
// // //     "+676",
// // //     "+1-868",
// // //     "+216",
// // //     "+90",
// // //     "+993",
// // //     "+688",
// // //     "+256",
// // //     "+380",
// // //     "+971",
// // //     "+44",
// // //     "+1",
// // //     "+598",
// // //     "+998",
// // //     "+678",
// // //     "+39",
// // //     "+58",
// // //     "+84",
// // //     "+967",
// // //     "+260",
// // //     "+263",
// // //   ];

// // //   const [selectedCountry, setSelectedCountry] = useState(
// // //     info?.country || countries[0]
// // //   );
// // //   const [selectedPhoneCode, setSelectedPhoneCode] = useState(() => {
// // //     const index = countries.indexOf(info?.country || countries[0]);
// // //     return phoneCodes[index] || "+975";
// // //   });

// // //   // extra bed (single checkbox, one bed total)
// // //   const [extraBed, setExtraBed] = useState(false);
// // //  const [mealsSelected, setMealsSelected] = useState(() => {
// // //   switch (mealPlan) {
// // //     case "cp":
// // //       return { breakfast: true, lunch: false, dinner: false }; // BF included
// // //     case "map":
// // //       return { breakfast: true, lunch: false, dinner: false }; // BF included
// // //     case "ap":
// // //       return { breakfast: true, lunch: true, dinner: true }; // All included
// // //     default: // EP
// // //       return { breakfast: false, lunch: false, dinner: false };
// // //   }
// // // });

// // // // For MAP, track the order of selection
// // // const [mapMealOrder, setMapMealOrder] = useState([]); // ["lunch", "dinner"]


// // //   // update nights if user changes dates
// // //   useEffect(() => {
// // //     if (bookingData.checkIn && bookingData.checkOut) {
// // //       const nights = Math.ceil(
// // //         (bookingData.checkOut - bookingData.checkIn) /
// // //           (1000 * 60 * 60 * 24)
// // //       );
// // //       setBookingData((prev) => ({
// // //         ...prev,
// // //         nights: nights > 0 ? nights : 0,
// // //       }));
// // //     }
// // //   }, [bookingData.checkIn, bookingData.checkOut]);

// // //   // update room quantity
// // //   const updateRoomQuantity = (index, quantity) => {
// // //     setBookingData((prev) => {
// // //       const updatedRooms = [...prev.rooms];
// // //       updatedRooms[index].quantity = parseInt(quantity) || 1;
// // //       return { ...prev, rooms: updatedRooms };
// // //     });
// // //   };

// // //   // calculations
// // //   const nights = bookingData.nights || 0;
// // //   const roomsQty = bookingData.rooms[0].quantity || 1;

// // //   const roomCost = basePrice * roomsQty * nights;

// // //   const extraBedCost = extraBed ? getExtraBedPrice() * nights : 0;

// // //   // children cost
// // //   let childrenCost = 0;
// // //   childrenAges.forEach((ageGroup) => {
// // //     childrenCost += getChildUnitPrice(ageGroup) * nights;
// // //   });

// // //   // meals cost (assume price is per person per night)
// // //   const guestsCount = adults + children;
// // //    let perNightMeals = 0;

// // // if (mealPlan === "ep") {
// // //   perNightMeals =
// // //     (mealsSelected.breakfast ? pricing.meals?.breakfast || 0 : 0) +
// // //     (mealsSelected.lunch ? pricing.meals?.lunch || 0 : 0) +
// // //     (mealsSelected.dinner ? pricing.meals?.dinner || 0 : 0);
// // // } else if (mealPlan === "cp") {
// // //   // BF included
// // //   perNightMeals =
// // //     (mealsSelected.lunch ? pricing.meals?.lunch || 0 : 0) +
// // //     (mealsSelected.dinner ? pricing.meals?.dinner || 0 : 0);
// // // } else if (mealPlan === "map") {
// // //   // MAP: breakfast included, optional meals, first selected free
// // //   perNightMeals = 0;
// // //   mapMealOrder.forEach((meal, index) => {
// // //     if (index === 0) return; // first selected meal is free
// // //     if (meal === "lunch") perNightMeals += pricing.meals?.lunch || 0;
// // //     if (meal === "dinner") perNightMeals += pricing.meals?.dinner || 0;
// // //   });
// // // } else {
// // //   perNightMeals = 0; // AP all included
// // // }

// // // const mealsCost = perNightMeals * nights * guestsCount;

// // //   const totalAmount = roomCost + extraBedCost + childrenCost + mealsCost;

// // //   // handle booking submit
// // //   const handleBooking = async (e) => {
// // //     e.preventDefault();
// // //     const form = e.target;
// // //     const formData = new FormData(form);

// // //     const selectedMealsList = Object.entries(mealsSelected)
// // //       .filter(([, checked]) => checked)
// // //       .map(([key]) => key); // ['breakfast','lunch',...]

// // //     const bookingRequest = {
// // //       firstName: formData.get("firstName"),
// // //       lastName: formData.get("lastName"),
// // //       email: formData.get("email"),
// // //       country: formData.get("country"),
// // //       phone: selectedPhoneCode + formData.get("phone"),
// // //       checkIn: bookingData.checkIn
// // //         ? new Date(bookingData.checkIn).toISOString().split("T")[0]
// // //         : null,
// // //       checkOut: bookingData.checkOut
// // //         ? new Date(bookingData.checkOut).toISOString().split("T")[0]
// // //         : null,
// // //       roomSelection: [
// // //         {
// // //           roomType: room.roomType,
// // //           roomsRequested: roomsQty,
// // //         },
// // //       ],
// // //       mealPlan,
// // //       occupancyType,
// // //       adults,
// // //       children,
// // //       childrenAges,
// // //       extraBed,
// // //       meals: selectedMealsList,
// // //       specialRequest: formData.get("specialRequest") || "",
// // //       totalAmount,
// // //     };

// // //     const API_URL = import.meta.env.VITE_API_URL;

// // //     const result = await Swal.fire({
// // //       html: `<p style="color:#d3ffd3; font-size:16px;">Do you want to confirm this booking?</p>`,
// // //       title: "Are you sure?",
// // //       icon: "warning",
// // //       showCancelButton: true,
// // //       confirmButtonColor: "#008000",
// // //       cancelButtonColor: "#d33",
// // //       confirmButtonText: "Yes",
// // //       cancelButtonText: "Cancel",
// // //       background: "#006600",
// // //       color: "#fff",
// // //     });

// // //     if (!result.isConfirmed) return;

// // //     try {
// // //       const response = await fetch(`${API_URL}/bookings/book-rooms`, {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(bookingRequest),
// // //       });

// // //       const data = await response.json();

// // //       if (response.ok) {
// // //         Swal.fire({
// // //           html: `<p style="color:#d3ffd3; font-size:16px;">Your booking request has been submitted. Our team will contact you shortly to confirm payment and finalize your stay.</p>`,
// // //           title: "Booking Request Sent!",
// // //           icon: "success",
// // //           confirmButtonColor: "#008000",
// // //           background: "#006600",
// // //           color: "#fff",
// // //         });
// // //         navigate("/room");
// // //       } else {
// // //         Swal.fire({
// // //           title: "Booking Failed",
// // //           html: `<p style="color:#ffd3d3; font-size:16px;">${
// // //             data.message || "Something went wrong."
// // //           }</p>`,
// // //           icon: "error",
// // //           background: "#006600",
// // //           color: "#fff",
// // //           confirmButtonColor: "#008000",
// // //         });
// // //       }
// // //     } catch (err) {
// // //       console.error("Booking request error:", err);
// // //       Swal.fire({
// // //         title: "Server Error",
// // //         text: "Unable to send booking request. Please try again later.",
// // //         icon: "error",
// // //         background: "#006600",
// // //         color: "#fff",
// // //         confirmButtonColor: "#008000",
// // //       });
// // //     }
// // //   };

// // //   return (
// // //     <section>
// // //       <BreadCrumb title="booking details" />
// // //       <div className="min-h-screen bg-white py-10 px-6 md:px-20">
// // //         <div className="flex flex-col md:flex-row gap-8">
// // // {/* LEFT COLUMN */}
// // // <div className="w-full bg-[#F9F9F9] md:w-1/3 border border-gray-200 -md p-4 shadow-sm text-sm">
// // //   <h3 className="font-semibold text-lg mb-3">Booking Details</h3>

// // //   {/* Check-in / Check-out */}
// // //   <div className="flex justify-between text-gray-700 mb-3">
// // //     <div className="w-1/2">
// // //       <p className="font-medium text-sm mb-1">Check-in</p>
// // //       <p className="text-sm">{formatDate(bookingData.checkIn)}</p>
// // //       <p className="text-xs text-gray-500">From 3:00 PM</p>
// // //     </div>
// // //     <div className="w-[1px] bg-gray-300 mx-2"></div>
// // //     <div className="w-1/2">
// // //       <p className="font-medium text-sm mb-1">Check-out</p>
// // //       <p className="text-sm">{formatDate(bookingData.checkOut)}</p>
// // //       <p className="text-xs text-gray-500">Until 12:00 PM</p>
// // //     </div>
// // //   </div>

// // //   <p className="mb-3 text-gray-700 text-sm">
// // //     Length of stay: <span className="font-medium">{nights} night(s)</span>
// // //   </p>

// // //   <hr className="my-2" />

// // //   {/* --- PER NIGHT BREAKDOWN --- */}
// // //   <p className="font-medium text-sm mb-2">Cost per night</p>

// // //   {/* Rooms */}
// // //   <div className="flex justify-between mb-1">
// // //     <p className="text-sm">{room.roomType} × {roomsQty}</p>
// // //     <p className="text-sm">
// // //       BTN {(basePrice * roomsQty).toLocaleString("en-US", { minimumFractionDigits: 2 })}
// // //     </p>
// // //   </div>

// // //   {/* Extra bed */}
// // //   {extraBed && (
// // //     <div className="flex justify-between mb-1">
// // //       <p className="text-sm">Extra bed × 1</p>
// // //       <p className="text-sm">
// // //         BTN {getExtraBedPrice().toLocaleString("en-US", { minimumFractionDigits: 2 })}
// // //       </p>
// // //     </div>
// // //   )}

// // //   {/* Children */}
// // //   {childrenAges.length > 0 && (
// // //     <>
// // //       <p className="font-medium text-sm mt-2 mb-1">Children</p>
// // //       {childrenAges.map((ageGroup, idx) => (
// // //         <div key={idx} className="flex justify-between mb-1">
// // //           <p className="text-sm">Child {idx + 1} ({ageGroup})</p>
// // //           <p className="text-sm">
// // //             BTN {getChildUnitPrice(ageGroup).toLocaleString("en-US", { minimumFractionDigits: 2 })}
// // //           </p>
// // //         </div>
// // //       ))}
// // //     </>
// // //   )}

// // //   {/* Meals */}
// // //   {(mealsSelected.breakfast || mealsSelected.lunch || mealsSelected.dinner) && (
// // //     <>
// // //       <p className="font-medium text-sm mt-2 mb-1">Meals</p>
// // //       <div className="flex justify-between mb-1">
// // //         <p className="text-sm">
// // //           {[mealsSelected.breakfast && "Breakfast", mealsSelected.lunch && "Lunch", mealsSelected.dinner && "Dinner"]
// // //             .filter(Boolean)
// // //             .join(", ")} × {guestsCount} guest(s)
// // //         </p>
// // //         <p className="text-sm">
// // //           BTN {perNightMeals.toLocaleString("en-US", { minimumFractionDigits: 2 })}
// // //         </p>
// // //       </div>
// // //     </>
// // //   )}

// // //   <hr className="my-2" />

// // //   {/* Total per night */}
// // //   <div className="flex justify-between items-center mb-2">
// // //     <p className="font-medium text-sm">Total per night</p>
// // //     <p className="text-blue-600 font-semibold text-sm">
// // //       BTN {(
// // //         basePrice * roomsQty +
// // //         (extraBed ? getExtraBedPrice() : 0) +
// // //         childrenAges.reduce((sum, age) => sum + getChildUnitPrice(age), 0) +
// // //         perNightMeals
// // //       ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
// // //     </p>
// // //   </div>

// // //   {/* Grand total */}
// // //   <div className="flex justify-between items-center mt-3">
// // //     <p className="font-semibold text-base">Total cost ({nights} night(s))</p>
// // //     <p className="text-green-600 font-bold text-xl">
// // //       BTN {totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
// // //     </p>
// // //   </div>
// // // </div>

// // //           {/* RIGHT COLUMN */}
// // //           <div className="w-full md:w-2/3 text-sm">
// // //             <h3 className="font-semibold text-lg mb-4">
// // //               Enter your details
// // //             </h3>

// // //             <form className="space-y-6" onSubmit={handleBooking}>
// // //               {/* Name */}
// // //               <div className="grid md:grid-cols-2 gap-4">
// // //                 <div>
// // //                   <label className="block text-gray-700 font-medium">
// // //                     First name <span className="text-red-500">*</span>
// // //                   </label>
// // //                   <input
// // //                     type="text"
// // //                     name="firstName"
// // //                     required
// // //                     placeholder="Enter first name"
// // //                     className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="block text-gray-700 font-medium">
// // //                     Last name <span className="text-red-500">*</span>
// // //                   </label>
// // //                   <input
// // //                     type="text"
// // //                     name="lastName"
// // //                     required
// // //                     placeholder="Enter last name"
// // //                     className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
// // //                   />
// // //                 </div>
// // //               </div>

// // //               {/* Email */}
// // //               <div>
// // //                 <label className="block text-gray-700 font-medium">
// // //                   Email address <span className="text-red-500">*</span>
// // //                 </label>
// // //                 <input
// // //                   type="email"
// // //                   name="email"
// // //                   required
// // //                   placeholder="you@example.com"
// // //                   className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
// // //                 />
// // //               </div>

// // //               {/* Country */}
// // //               <div>
// // //                 <label className="block text-gray-700 font-medium">
// // //                   Country/Region
// // //                 </label>
// // //                 <select
// // //                   name="country"
// // //                   value={selectedCountry}
// // //                   onChange={(e) => {
// // //                     const country = e.target.value;
// // //                     const index = countries.indexOf(country);
// // //                     setSelectedCountry(country);
// // //                     setSelectedPhoneCode(phoneCodes[index] || "+975");
// // //                   }}
// // //                   className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
// // //                 >
// // //                   {countries.map((country) => (
// // //                     <option key={country}>{country}</option>
// // //                   ))}
// // //                 </select>
// // //               </div>

// // //               {/* Phone */}
// // //               <div>
// // //                 <label className="block text-gray-700 font-medium">
// // //                   Phone number <span className="text-red-500">*</span>
// // //                 </label>
// // //                 <div className="flex gap-2 flex-wrap">
// // //                   <select
// // //                     name="phoneCode"
// // //                     value={selectedPhoneCode}
// // //                     onChange={(e) => setSelectedPhoneCode(e.target.value)}
// // //                     className="flex-[1_1_30%] border border-gray-300 -md px-2 py-2"
// // //                   >
// // //                     {phoneCodes.map((code) => (
// // //                       <option key={code} value={code}>
// // //                         {code}
// // //                       </option>
// // //                     ))}
// // //                   </select>

// // //                   <input
// // //                     type="text"
// // //                     name="phone"
// // //                     required
// // //                     placeholder="Enter phone number"
// // //                     className="flex-[2_1_65%] border border-gray-300 -md px-3 py-2"
// // //                   />
// // //                 </div>
// // //               </div>

// // //               {/* Room Selection */}
// // //               <div>
// // //                 <h4 className="font-semibold mb-2">Room Selection</h4>
// // //                 <div className="flex gap-6">
// // //                   {bookingData.rooms.map((roomRow, index) => (
// // //                     <div key={index} className="flex items-center gap-2">
// // //                       <label>{roomRow.name}</label>
// // //                       <input
// // //                         type="number"
// // //                         min="1"
// // //                         value={roomRow.quantity}
// // //                         onChange={(e) =>
// // //                           updateRoomQuantity(index, e.target.value)
// // //                         }
// // //                         className="w-16 border border-gray-300 -md px-2 py-1 text-center"
// // //                       />
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>

// // //          {/* Extra Bed checkbox */}
// // // {(mealPlan === "map" || occupancyType === "double") && (
// // //   <div>
// // //     <label className="flex items-center gap-2">
// // //       <input
// // //         type="checkbox"
// // //         checked={extraBed}
// // //         onChange={(e) => setExtraBed(e.target.checked)}
// // //       />
// // //       <span>Add Extra Bed</span>
// // //     </label>
// // //     {extraBed && (
// // //       <p className="text-xs text-gray-600 mt-1">
// // //         Extra bed price per night: BTN{" "}
// // //         {getExtraBedPrice().toLocaleString("en-US", {
// // //           minimumFractionDigits: 2,
// // //         })}
// // //       </p>
// // //     )}
// // //   </div>
// // // )}

             
// // //               {/* Meals */}

// // // <div>
// // //   <h4 className="font-semibold mb-2">Types of Meals</h4>
// // //   <div className="flex flex-col gap-2">
// // //     {/* Breakfast */}
// // //     <label className="flex items-center gap-2">
// // //       <input
// // //         type="checkbox"
// // //         checked={mealsSelected.breakfast}
// // //         disabled={mealPlan !== "ep"} // EP only, others included
// // //         onChange={() =>
// // //           setMealsSelected((prev) => ({
// // //             ...prev,
// // //             breakfast: !prev.breakfast,
// // //           }))
// // //         }
// // //       />
// // //       <span>
// // //         Breakfast{" "}
// // //         {pricing.meals?.breakfast
// // //           ? `(BTN ${pricing.meals.breakfast})`
// // //           : "(Included)"}
// // //       </span>
// // //     </label>

// // //     {/* Lunch */}
// // //     {mealPlan !== "ap" && (
// // //       <label className="flex items-center gap-2">
// // //         <input
// // //           type="checkbox"
// // //           checked={mealsSelected.lunch}
// // //           onChange={() => {
// // //             if (mealPlan === "map") {
// // //               setMealsSelected((prev) => {
// // //                 const newVal = !prev.lunch;
// // //                 let newOrder = [...mapMealOrder];
// // //                 if (newVal) {
// // //                   newOrder.push("lunch");
// // //                 } else {
// // //                   newOrder = newOrder.filter((m) => m !== "lunch");
// // //                 }
// // //                 setMapMealOrder(newOrder);
// // //                 return { ...prev, lunch: newVal };
// // //               });
// // //             } else {
// // //               setMealsSelected((prev) => ({ ...prev, lunch: !prev.lunch }));
// // //             }
// // //           }}
// // //         />
// // //         <span>
// // //           Lunch{" "}
// // //           {mealPlan === "ep"
// // //             ? `(BTN ${pricing.meals?.lunch})`
// // //             : mealPlan === "cp"
// // //             ? `(BTN ${pricing.meals?.lunch})`
// // //             : mealPlan === "map"
// // //             ? mapMealOrder[0] === "lunch"
// // //               ? "(Included)" // first selected meal free
// // //               : mapMealOrder.length > 1 && mapMealOrder[1] === "lunch"
// // //               ? `(BTN ${pricing.meals?.lunch})`
// // //               : `(BTN ${pricing.meals?.lunch})`
// // //             : `(BTN ${pricing.meals?.lunch})`}
// // //         </span>
// // //       </label>
// // //     )}

// // //     {/* Dinner */}
// // //     {mealPlan !== "ap" && (
// // //       <label className="flex items-center gap-2">
// // //         <input
// // //           type="checkbox"
// // //           checked={mealsSelected.dinner}
// // //           onChange={() => {
// // //             if (mealPlan === "map") {
// // //               setMealsSelected((prev) => {
// // //                 const newVal = !prev.dinner;
// // //                 let newOrder = [...mapMealOrder];
// // //                 if (newVal) {
// // //                   newOrder.push("dinner");
// // //                 } else {
// // //                   newOrder = newOrder.filter((m) => m !== "dinner");
// // //                 }
// // //                 setMapMealOrder(newOrder);
// // //                 return { ...prev, dinner: newVal };
// // //               });
// // //             } else {
// // //               setMealsSelected((prev) => ({ ...prev, dinner: !prev.dinner }));
// // //             }
// // //           }}
// // //         />
// // //         <span>
// // //           Dinner{" "}
// // //           {mealPlan === "ep"
// // //             ? `(BTN ${pricing.meals?.dinner})`
// // //             : mealPlan === "cp"
// // //             ? `(BTN ${pricing.meals?.dinner})`
// // //             : mealPlan === "map"
// // //             ? mapMealOrder[0] === "dinner"
// // //               ? "(Included)" // first selected meal free
// // //               : mapMealOrder.length > 1 && mapMealOrder[1] === "dinner"
// // //               ? `(BTN ${pricing.meals?.dinner})`
// // //               : `(BTN ${pricing.meals?.dinner})`
// // //             : `(BTN ${pricing.meals?.dinner})`}
// // //         </span>
// // //       </label>
// // //     )}

// // //     {/* AP plan */}
// // //     {mealPlan === "ap" && (
// // //       <>
// // //         <label className="flex items-center gap-2">
// // //           <input type="checkbox" checked disabled />
// // //           <span>Lunch (BTN {pricing.meals?.lunch})</span>
// // //         </label>
// // //         <label className="flex items-center gap-2">
// // //           <input type="checkbox" checked disabled />
// // //           <span>Dinner (BTN {pricing.meals?.dinner})</span>
// // //         </label>
// // //       </>
// // //     )}
// // //   </div>
// // // </div>

// // //               {/* Special Request */}
// // //               <div>
// // //                 <h4 className="font-semibold mb-2">Special Request</h4>
// // //                 <textarea
// // //                   name="specialRequest"
// // //                   rows="3"
// // //                   placeholder="Write your request here..."
// // //                   className="w-full border border-gray-300 -md px-3 py-2"
// // //                 ></textarea>
// // //               </div>

// // //               {/* Confirm */}
// // //               <div className="pt-6">
// // //                 <button
// // //                   type="submit"
// // //                   className="w-full bg-[#006600] text-white font-semibold py-3 -md hover:bg-green-700 transition"
// // //                 >
// // //                   Confirm Booking
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default BookingDetails;
// // import React, { useState, useEffect } from "react";
// // import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
// // import Swal from "sweetalert2";
// // import { useNavigate, useLocation } from "react-router-dom";

// // const BookingDetails = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const info = location.state;

// //   if (!info || !info.roomData) {
// //     return (
// //       <section>
// //         <BreadCrumb title="booking details" />
// //         <div className="py-20 text-center text-xl text-gray-700">
// //           Booking information is missing.
// //         </div>
// //       </section>
// //     );
// //   }

// //   const room = info.roomData;
// //   const pricing = room.pricing || {};
// //   const mealPlan = info.mealPlan || "ep"; // ep | cp | map | ap
// //   const childrenAgesFromInfo = info.childrenAges || [];
// //   const adultsFromInfo = info.adult || 1;
// //   const childrenFromInfo = info.children || 0;

// //   // base price per room per night based on meal plan & occupancy (for display)
// //   const getPriceForOcc = (occ) =>
// //     pricing?.[mealPlan]?.[occ] ?? room.price ?? 0;

// //   // extra bed price per night
// //   const getExtraBedPrice = (occ) => {
// //     if (!pricing.extraBed) return 0;
// //     if (mealPlan === "map") {
// //       // if you have special MAP mapping
// //       return occ === "single"
// //         ? pricing.extraBed.mapSingle ?? pricing.extraBed[mealPlan] ?? 0
// //         : pricing.extraBed.mapDouble ?? pricing.extraBed[mealPlan] ?? 0;
// //     }
// //     return pricing.extraBed[mealPlan] ?? 0;
// //   };

// //   const getChildUnitPrice = (ageGroup) => {
// //     const childPolicy = pricing.childPolicy || {};

// //     if (ageGroup === "1-5") return 0;
// //     if (ageGroup === "6-11") return childPolicy.age6to11?.[mealPlan] ?? 0;
// //     if (ageGroup === "12+") return getPriceForOcc("double"); // treat as adult price (approx)
// //     return 0;
// //   };

// //   // date format for UI
// //   const formatDate = (date) => {
// //     if (!date) return "--";
// //     return new Date(date).toLocaleDateString("en-US", {
// //       weekday: "short",
// //       month: "short",
// //       day: "2-digit",
// //       year: "numeric",
// //     });
// //   };

// //   // --- initial bookingData state
// //   const [bookingData, setBookingData] = useState(() => {
// //     const initialRoomsQty = info.room || 1;
// //     // occupancyType expected as array in info (you chose A)
// //     const occFromInfo = Array.isArray(info.occupancyType)
// //       ? info.occupancyType
// //       : [info.occupancyType || "double"];

// //     // ensure occupancy array matches rooms count
// //     const occNormalized = Array.from({ length: initialRoomsQty }).map(
// //       (_, i) => occFromInfo[i] || occFromInfo[0] || "double"
// //     );

// //     return {
// //       checkIn: info?.checkIn ? new Date(info.checkIn) : null,
// //       checkOut: info?.checkOut ? new Date(info.checkOut) : null,
// //       nights:
// //         info?.nights ||
// //         (info?.checkIn && info?.checkOut
// //           ? Math.ceil(
// //               (new Date(info.checkOut) - new Date(info.checkIn)) /
// //                 (1000 * 60 * 60 * 24)
// //             )
// //           : 0),
// //       rooms: [
// //         {
// //           name: room.roomType,
// //           price: getPriceForOcc(occNormalized[0]),
// //           quantity: initialRoomsQty,
// //         },
// //       ],
// //       occupancyArray: occNormalized, // array of 'single'|'double' per room
// //     };
// //   });

// //   // short country list
// //   const countries = ["Bhutan", "India", "Nepal", "United States", "United Kingdom"];
// //   const phoneCodes = ["+975", "+91", "+977", "+1", "+44"];

// //   const [selectedCountry, setSelectedCountry] = useState(
// //     info?.country || countries[0]
// //   );
// //   const [selectedPhoneCode, setSelectedPhoneCode] = useState(() => {
// //     const idx = countries.indexOf(info?.country || countries[0]);
// //     return phoneCodes[idx] || "+975";
// //   });

// //   // extras & meals state
// //   const [extraBed, setExtraBed] = useState(!!info.extraBed);
// //   const [mealsSelected, setMealsSelected] = useState(() => {
// //     switch (mealPlan) {
// //       case "cp":
// //         return { breakfast: true, lunch: false, dinner: false };
// //       case "map":
// //         return { breakfast: true, lunch: false, dinner: false };
// //       case "ap":
// //         return { breakfast: true, lunch: true, dinner: true };
// //       default:
// //         return { breakfast: false, lunch: false, dinner: false };
// //     }
// //   });
// //   const [mapMealOrder, setMapMealOrder] = useState([]); // order for MAP

// //   // children ages UI state
// //   const [childrenAges, setChildrenAges] = useState(childrenAgesFromInfo);

// //   // Keep adults/children editable locally if you want
// //   const [adults, setAdults] = useState(adultsFromInfo);
// //   const [children, setChildren] = useState(childrenFromInfo);

// //   // When rooms quantity changes, keep occupancyArray length in sync
// //   useEffect(() => {
// //     const roomsQty = bookingData.rooms[0].quantity || 1;
// //     setBookingData((prev) => {
// //       const occ = prev.occupancyArray || ["double"];
// //       if (occ.length === roomsQty) return prev;
// //       const newOcc = Array.from({ length: roomsQty }).map(
// //         (_, i) => occ[i] || occ[0] || "double"
// //       );
// //       return { ...prev, occupancyArray: newOcc };
// //     });
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [bookingData.rooms[0].quantity]);

// //   // update nights if dates change
// //   useEffect(() => {
// //     if (bookingData.checkIn && bookingData.checkOut) {
// //       const nights = Math.ceil(
// //         (bookingData.checkOut - bookingData.checkIn) / (1000 * 60 * 60 * 24)
// //       );
// //       setBookingData((prev) => ({ ...prev, nights: nights > 0 ? nights : 0 }));
// //     }
// //   }, [bookingData.checkIn, bookingData.checkOut]);

// //   // helper to update room quantity
// //   const updateRoomQuantity = (quantity) => {
// //     setBookingData((prev) => {
// //       const q = Math.max(1, parseInt(quantity) || 1);
// //       const updatedRooms = [...prev.rooms];
// //       updatedRooms[0].quantity = q;
// //       return { ...prev, rooms: updatedRooms };
// //     });
// //   };

// //   // helper to set occupancy for a particular room index
// //   const setOccupancyForIndex = (idx, value) => {
// //     setBookingData((prev) => {
// //       const arr = [...(prev.occupancyArray || [])];
// //       arr[idx] = value;
// //       return { ...prev, occupancyArray: arr };
// //     });
// //   };

// //   // Calculations
// //   const nights = bookingData.nights || 0;
// //   const roomsQty = bookingData.rooms[0].quantity || 1;
// //   const occupancyArray = bookingData.occupancyArray || ["double"];
// //   const roomCostPerNight = occupancyArray.reduce(
// //     (sum, occ) => sum + getPriceForOcc(occ),
// //     0
// //   ); // sum of per-room base price (for display if multiple rooms)
// //   const roomCost = roomCostPerNight * nights; // cost for all rooms per night * nights

// //   // extra bed cost: show rules: MAP -> show always; else show only if any double selected
// //   const anyDoubleSelected = occupancyArray.some((o) => o === "double");
// //   const showExtraBedOption = mealPlan === "map" || anyDoubleSelected;

// //   // calculate extraBed cost (if selected assume one extra bed total)
// //   // choose price by first double if exists else first occupancy
// //   const extraBedCostPerNight = (() => {
// //     const occForExtra = anyDoubleSelected ? "double" : occupancyArray[0] || "double";
// //     return getExtraBedPrice(occForExtra);
// //   })();
// //   const extraBedCost = extraBed ? extraBedCostPerNight * nights : 0;

// //   // children cost
// //   let childrenCost = 0;
// //   childrenAges.forEach((ageGroup) => {
// //     childrenCost += getChildUnitPrice(ageGroup) * nights;
// //   });

// //   // meals cost
// //   const guestsCount = adults + children;
// //   let perNightMeals = 0;
// //   if (mealPlan === "ep") {
// //     perNightMeals =
// //       (mealsSelected.breakfast ? pricing.meals?.breakfast || 0 : 0) +
// //       (mealsSelected.lunch ? pricing.meals?.lunch || 0 : 0) +
// //       (mealsSelected.dinner ? pricing.meals?.dinner || 0 : 0);
// //   } else if (mealPlan === "cp") {
// //     perNightMeals =
// //       (mealsSelected.lunch ? pricing.meals?.lunch || 0 : 0) +
// //       (mealsSelected.dinner ? pricing.meals?.dinner || 0 : 0);
// //   } else if (mealPlan === "map") {
// //     perNightMeals = 0;
// //     mapMealOrder.forEach((meal, index) => {
// //       if (index === 0) return; // first selected meal is free
// //       if (meal === "lunch") perNightMeals += pricing.meals?.lunch || 0;
// //       if (meal === "dinner") perNightMeals += pricing.meals?.dinner || 0;
// //     });
// //   } else {
// //     perNightMeals = 0; // AP included
// //   }
// //   const mealsCost = perNightMeals * nights * guestsCount;

// //   const totalAmount = roomCost + extraBedCost + childrenCost + mealsCost;

// //   // Build roomSelection payload grouped by occupancy
// //   const buildRoomSelection = () => {
// //     // occupancyArray length equals roomsQty
// //     const map = {};
// //     occupancyArray.forEach((occ) => {
// //       map[occ] = (map[occ] || 0) + 1;
// //     });
// //     // result is array of objects as backend expects
// //     return Object.entries(map).map(([occ, count]) => ({
// //       roomType: room.roomType,
// //       roomsRequested: count,
// //       occupancyType: occ,
// //       mealPlan,
// //       adults,
// //       childrenAges,
// //       extraBed,
// //     }));
// //   };

// //   // handle booking submit
// //   const handleBooking = async (e) => {
// //     e.preventDefault();
// //     const form = e.target;
// //     const formData = new FormData(form);

// //     const selectedMealsList = Object.entries(mealsSelected)
// //       .filter(([, checked]) => checked)
// //       .map(([key]) => key);

// //     const bookingRequest = {
// //       firstName: formData.get("firstName"),
// //       lastName: formData.get("lastName"),
// //       email: formData.get("email"),
// //       country: formData.get("country"),
// //       phone: selectedPhoneCode + formData.get("phone"),
// //       checkIn: bookingData.checkIn
// //         ? new Date(bookingData.checkIn).toISOString().split("T")[0]
// //         : null,
// //       checkOut: bookingData.checkOut
// //         ? new Date(bookingData.checkOut).toISOString().split("T")[0]
// //         : null,
// //       roomSelection: buildRoomSelection(),
// //       mealPlan,
// //       occupancyType: occupancyArray, // keep for convenience
// //       adults,
// //       children,
// //       childrenAges,
// //       extraBed,
// //       meals: selectedMealsList,
// //       specialRequest: formData.get("specialRequest") || "",
// //       totalAmount,
// //     };

// //     const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// //     const result = await Swal.fire({
// //       html: `<p style="color:#d3ffd3; font-size:16px;">Do you want to confirm this booking?</p>`,
// //       title: "Are you sure?",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonColor: "#008000",
// //       cancelButtonColor: "#d33",
// //       confirmButtonText: "Yes",
// //       cancelButtonText: "Cancel",
// //       background: "#006600",
// //       color: "#fff",
// //     });

// //     if (!result.isConfirmed) return;

// //     try {
// //       const response = await fetch(`${API_URL}/bookings/book-rooms`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(bookingRequest),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         Swal.fire({
// //           html: `<p style="color:#d3ffd3; font-size:16px;">Your booking request has been submitted. Our team will contact you shortly to confirm payment and finalize your stay.</p>`,
// //           title: "Booking Request Sent!",
// //           icon: "success",
// //           confirmButtonColor: "#008000",
// //           background: "#006600",
// //           color: "#fff",
// //         });
// //         navigate("/room");
// //       } else {
// //         Swal.fire({
// //           title: "Booking Failed",
// //           html: `<p style="color:#ffd3d3; font-size:16px;">${
// //             data.message || "Something went wrong."
// //           }</p>`,
// //           icon: "error",
// //           background: "#006600",
// //           color: "#fff",
// //           confirmButtonColor: "#008000",
// //         });
// //       }
// //     } catch (err) {
// //       console.error("Booking request error:", err);
// //       Swal.fire({
// //         title: "Server Error",
// //         text: "Unable to send booking request. Please try again later.",
// //         icon: "error",
// //         background: "#006600",
// //         color: "#fff",
// //         confirmButtonColor: "#008000",
// //       });
// //     }
// //   };

// //   return (
// //     <section>
// //       <BreadCrumb title="booking details" />
// //       <div className="min-h-screen bg-white py-10 px-6 md:px-20">
// //         <div className="flex flex-col md:flex-row gap-8">
// //           {/* LEFT SUMMARY */}
// //           <div className="w-full bg-[#F9F9F9] md:w-1/3 border border-gray-200 -md p-4 shadow-sm text-sm">
// //             <h3 className="font-semibold text-lg mb-3">Booking Details</h3>

// //             <div className="flex justify-between text-gray-700 mb-3">
// //               <div className="w-1/2">
// //                 <p className="font-medium text-sm mb-1">Check-in</p>
// //                 <p className="text-sm">{formatDate(bookingData.checkIn)}</p>
// //                 <p className="text-xs text-gray-500">From 3:00 PM</p>
// //               </div>
// //               <div className="w-[1px] bg-gray-300 mx-2"></div>
// //               <div className="w-1/2">
// //                 <p className="font-medium text-sm mb-1">Check-out</p>
// //                 <p className="text-sm">{formatDate(bookingData.checkOut)}</p>
// //                 <p className="text-xs text-gray-500">Until 12:00 PM</p>
// //               </div>
// //             </div>

// //             <p className="mb-3 text-gray-700 text-sm">
// //               Length of stay: <span className="font-medium">{nights} night(s)</span>
// //             </p>

// //             <hr className="my-2" />

// //             <p className="font-medium text-sm mb-2">Cost per night</p>

// //             <div className="mb-2">
// //               {occupancyArray.map((occ, idx) => (
// //                 <div key={idx} className="flex justify-between mb-1">
// //                   <p className="text-sm">
// //                     {room.roomType} — Room {idx + 1} ({occ})
// //                   </p>
// //                   <p className="text-sm">
// //                     BTN {getPriceForOcc(occ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>

// //             {extraBed && (
// //               <div className="flex justify-between mb-1">
// //                 <p className="text-sm">Extra bed × 1</p>
// //                 <p className="text-sm">
// //                   BTN {extraBedCostPerNight.toLocaleString("en-US", { minimumFractionDigits: 2 })}
// //                 </p>
// //               </div>
// //             )}

// //             {childrenAges.length > 0 && (
// //               <>
// //                 <p className="font-medium text-sm mt-2 mb-1">Children</p>
// //                 {childrenAges.map((ageGroup, idx) => (
// //                   <div key={idx} className="flex justify-between mb-1">
// //                     <p className="text-sm">Child {idx + 1} ({ageGroup})</p>
// //                     <p className="text-sm">
// //                       BTN {getChildUnitPrice(ageGroup).toLocaleString("en-US", { minimumFractionDigits: 2 })}
// //                     </p>
// //                   </div>
// //                 ))}
// //               </>
// //             )}

// //             {(mealsSelected.breakfast || mealsSelected.lunch || mealsSelected.dinner) && (
// //               <>
// //                 <p className="font-medium text-sm mt-2 mb-1">Meals</p>
// //                 <div className="flex justify-between mb-1">
// //                   <p className="text-sm">
// //                     {[mealsSelected.breakfast && "Breakfast", mealsSelected.lunch && "Lunch", mealsSelected.dinner && "Dinner"]
// //                       .filter(Boolean)
// //                       .join(", ")} × {guestsCount} guest(s)
// //                   </p>
// //                   <p className="text-sm">
// //                     BTN {perNightMeals.toLocaleString("en-US", { minimumFractionDigits: 2 })}
// //                   </p>
// //                 </div>
// //               </>
// //             )}

// //             <hr className="my-2" />

// //             <div className="flex justify-between items-center mb-2">
// //               <p className="font-medium text-sm">Total per night</p>
// //               <p className="text-blue-600 font-semibold text-sm">
// //                 BTN {(
// //                   roomCostPerNight +
// //                   (extraBed ? extraBedCostPerNight : 0) +
// //                   childrenAges.reduce((sum, age) => sum + getChildUnitPrice(age), 0) +
// //                   perNightMeals
// //                 ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
// //               </p>
// //             </div>

// //             <div className="flex justify-between items-center mt-3">
// //               <p className="font-semibold text-base">Total cost ({nights} night(s))</p>
// //               <p className="text-green-600 font-bold text-xl">
// //                 BTN {totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
// //               </p>
// //             </div>
// //           </div>

// //           {/* RIGHT FORM */}
// //           <div className="w-full md:w-2/3 text-sm">
// //             <h3 className="font-semibold text-lg mb-4">Enter your details</h3>

// //             <form className="space-y-6" onSubmit={handleBooking}>
// //               <div className="grid md:grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-gray-700 font-medium">
// //                     First name <span className="text-red-500">*</span>
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="firstName"
// //                     defaultValue={info.firstName || ""}
// //                     required
// //                     placeholder="Enter first name"
// //                     className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-gray-700 font-medium">
// //                     Last name <span className="text-red-500">*</span>
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="lastName"
// //                     defaultValue={info.lastName || ""}
// //                     required
// //                     placeholder="Enter last name"
// //                     className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-gray-700 font-medium">
// //                   Email address <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   defaultValue={info.email || ""}
// //                   required
// //                   placeholder="you@example.com"
// //                   className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-gray-700 font-medium">Country/Region</label>
// //                 <select
// //                   name="country"
// //                   value={selectedCountry}
// //                   onChange={(e) => {
// //                     const country = e.target.value;
// //                     const index = countries.indexOf(country);
// //                     setSelectedCountry(country);
// //                     setSelectedPhoneCode(phoneCodes[index] || "+975");
// //                   }}
// //                   className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
// //                 >
// //                   {countries.map((country) => (
// //                     <option key={country} value={country}>
// //                       {country}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-gray-700 font-medium">
// //                   Phone number <span className="text-red-500">*</span>
// //                 </label>
// //                 <div className="flex gap-2 flex-wrap">
// //                   <select
// //                     name="phoneCode"
// //                     value={selectedPhoneCode}
// //                     onChange={(e) => setSelectedPhoneCode(e.target.value)}
// //                     className="flex-[1_1_30%] border border-gray-300 -md px-2 py-2"
// //                   >
// //                     {phoneCodes.map((code) => (
// //                       <option key={code} value={code}>
// //                         {code}
// //                       </option>
// //                     ))}
// //                   </select>

// //                   <input
// //                     type="text"
// //                     name="phone"
// //                     defaultValue={info.phone ? info.phone.replace(selectedPhoneCode, "") : ""}
// //                     required
// //                     placeholder="Enter phone number"
// //                     className="flex-[2_1_65%] border border-gray-300 -md px-3 py-2"
// //                   />
// //                 </div>
// //               </div>

// //               {/* ROOM QUANTITY ONLY (user asked to show only room quantity) */}
// //               <div>
// //                 <h4 className="font-semibold mb-2">Room Selection</h4>
// //                 <div className="flex items-center gap-4">
// //                   <label className="min-w-[120px]">{room.roomType}</label>
// //                   <div className="flex items-center gap-2">
// //                     <button
// //                       type="button"
// //                       onClick={() => updateRoomQuantity(Math.max(1, roomsQty - 1))}
// //                       className="px-3 py-1 bg-gray-300 "
// //                     >
// //                       -
// //                     </button>
// //                     <input
// //                       type="number"
// //                       min="1"
// //                       value={roomsQty}
// //                       onChange={(e) => updateRoomQuantity(e.target.value)}
// //                       className="w-20 border border-gray-300 -md px-2 py-1 text-center"
// //                     />
// //                     <button
// //                       type="button"
// //                       onClick={() => updateRoomQuantity(roomsQty + 1)}
// //                       className="px-3 py-1 bg-gray-300 "
// //                     >
// //                       +
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* If more than 1 room, show occupancy selector per room */}
// //                 {roomsQty > 1 && (
// //                   <div className="mt-3 space-y-2">
// //                     <p className="text-sm font-medium">Occupancy per room</p>
// //                     {Array.from({ length: roomsQty }).map((_, idx) => (
// //                       <div key={idx} className="flex justify-between items-center">
// //                         <span>Room {idx + 1}</span>
// //                         <select
// //                           value={occupancyArray[idx] || "double"}
// //                           onChange={(e) => setOccupancyForIndex(idx, e.target.value)}
// //                           className="border px-3 py-2"
// //                         >
// //                           <option value="single">Single</option>
// //                           <option value="double">Double</option>
// //                         </select>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Extra Bed - show according to rule */}
// //               {showExtraBedOption && (
// //                 <div>
// //                   <label className="flex items-center gap-2">
// //                     <input
// //                       type="checkbox"
// //                       checked={extraBed}
// //                       onChange={(e) => setExtraBed(e.target.checked)}
// //                     />
// //                     <span>Add Extra Bed</span>
// //                   </label>
// //                   {extraBed && (
// //                     <p className="text-xs text-gray-600 mt-1">
// //                       Extra bed price per night: BTN{" "}
// //                       {extraBedCostPerNight.toLocaleString("en-US", { minimumFractionDigits: 2 })}
// //                     </p>
// //                   )}
// //                 </div>
// //               )}

// //               {/* Meals */}
// //               <div>
// //                 <h4 className="font-semibold mb-2">Types of Meals</h4>
// //                 <div className="flex flex-col gap-2">
// //                   <label className="flex items-center gap-2">
// //                     <input
// //                       type="checkbox"
// //                       checked={mealsSelected.breakfast}
// //                       disabled={mealPlan !== "ep"}
// //                       onChange={() =>
// //                         setMealsSelected((prev) => ({ ...prev, breakfast: !prev.breakfast }))
// //                       }
// //                     />
// //                     <span>
// //                       Breakfast{" "}
// //                       {pricing.meals?.breakfast ? `(BTN ${pricing.meals.breakfast})` : "(Included)"}
// //                     </span>
// //                   </label>

// //                   {mealPlan !== "ap" && (
// //                     <label className="flex items-center gap-2">
// //                       <input
// //                         type="checkbox"
// //                         checked={mealsSelected.lunch}
// //                         onChange={() => {
// //                           if (mealPlan === "map") {
// //                             setMealsSelected((prev) => {
// //                               const newVal = !prev.lunch;
// //                               let newOrder = [...mapMealOrder];
// //                               if (newVal) newOrder.push("lunch");
// //                               else newOrder = newOrder.filter((m) => m !== "lunch");
// //                               setMapMealOrder(newOrder);
// //                               return { ...prev, lunch: newVal };
// //                             });
// //                           } else {
// //                             setMealsSelected((prev) => ({ ...prev, lunch: !prev.lunch }));
// //                           }
// //                         }}
// //                       />
// //                       <span>
// //                         Lunch {pricing.meals?.lunch ? `(BTN ${pricing.meals.lunch})` : ""}
// //                         {mealPlan === "map" && mapMealOrder[0] === "lunch" ? " (Included - first MAP choice)" : ""}
// //                       </span>
// //                     </label>
// //                   )}

// //                   {mealPlan !== "ap" && (
// //                     <label className="flex items-center gap-2">
// //                       <input
// //                         type="checkbox"
// //                         checked={mealsSelected.dinner}
// //                         onChange={() => {
// //                           if (mealPlan === "map") {
// //                             setMealsSelected((prev) => {
// //                               const newVal = !prev.dinner;
// //                               let newOrder = [...mapMealOrder];
// //                               if (newVal) newOrder.push("dinner");
// //                               else newOrder = newOrder.filter((m) => m !== "dinner");
// //                               setMapMealOrder(newOrder);
// //                               return { ...prev, dinner: newVal };
// //                             });
// //                           } else {
// //                             setMealsSelected((prev) => ({ ...prev, dinner: !prev.dinner }));
// //                           }
// //                         }}
// //                       />
// //                       <span>
// //                         Dinner {pricing.meals?.dinner ? `(BTN ${pricing.meals.dinner})` : ""}
// //                         {mealPlan === "map" && mapMealOrder[0] === "dinner" ? " (Included - first MAP choice)" : ""}
// //                       </span>
// //                     </label>
// //                   )}

// //                   {mealPlan === "ap" && (
// //                     <>
// //                       <label className="flex items-center gap-2">
// //                         <input type="checkbox" checked disabled />
// //                         <span>Lunch (Included)</span>
// //                       </label>
// //                       <label className="flex items-center gap-2">
// //                         <input type="checkbox" checked disabled />
// //                         <span>Dinner (Included)</span>
// //                       </label>
// //                     </>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Special Request */}
// //               <div>
// //                 <h4 className="font-semibold mb-2">Special Request</h4>
// //                 <textarea
// //                   name="specialRequest"
// //                   defaultValue={info.specialRequest || ""}
// //                   rows="3"
// //                   placeholder="Write your request here..."
// //                   className="w-full border border-gray-300 -md px-3 py-2"
// //                 ></textarea>
// //               </div>

// //               {/* Confirm */}
// //               <div className="pt-6">
// //                 <button
// //                   type="submit"
// //                   className="w-full bg-[#006600] text-white font-semibold py-3 -md hover:bg-green-700 transition"
// //                 >
// //                   Confirm Booking
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default BookingDetails; 
// import React, { useState, useEffect } from "react";
// import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
// import Swal from "sweetalert2";
// import { useNavigate, useLocation } from "react-router-dom";

// const BookingDetails = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const info = location.state;

//   if (!info || !info.roomData) {
//     return (
//       <section>
//         <BreadCrumb title="booking details" />
//         <div className="py-20 text-center text-xl text-gray-700">
//           Booking information is missing.
//         </div>
//       </section>
//     );
//   }

//   const room = info.roomData;
//   const pricing = room.pricing || {};
//   const mealPlan = info.mealPlan || "ep";
//   const childrenAgesFromInfo = info.childrenAges || [];
//   const adultsFromInfo = info.adult || 1;
//   const childrenFromInfo = info.children || 0;

//   const getPriceForOcc = (occ) =>
//     pricing?.[mealPlan]?.[occ] ?? room.price ?? 0;

//   const getExtraBedPrice = (occ) => {
//     if (!pricing.extraBed) return 0;
//     if (mealPlan === "map") {
//       return occ === "single"
//         ? pricing.extraBed.mapSingle ?? pricing.extraBed[mealPlan] ?? 0
//         : pricing.extraBed.mapDouble ?? pricing.extraBed[mealPlan] ?? 0;
//     }
//     return pricing.extraBed[mealPlan] ?? 0;
//   };

//   const getChildUnitPrice = (ageGroup) => {
//     const childPolicy = pricing.childPolicy || {};
//     if (ageGroup === "1-5") return 0;
//     if (ageGroup === "6-11") return childPolicy.age6to11?.[mealPlan] ?? 0;
//     if (ageGroup === "12+") return getPriceForOcc("double");
//     return 0;
//   };

//   const formatDate = (date) => {
//     if (!date) return "--";
//     return new Date(date).toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "short",
//       day: "2-digit",
//       year: "numeric",
//     });
//   };

//   const [bookingData, setBookingData] = useState(() => {
//     const initialRoomsQty = info.room || 1;
//   //  ` const occFromInfo = Array.isArray(info.occupancyType)
//   //     ? info.occupancyType
//   //     : [info.occupancyType || "double"]`;
//     const occFromInfo = info.occupancyType || info.occupancyPerRoom || ["double"];

//     // const occNormalized = Array.from({ length: initialRoomsQty }).map(
//     //   (_, i) => occFromInfo[i] || occFromInfo[0] || "double"
//     // );
//     const occNormalized = occFromInfo.slice(0, initialRoomsQty);


//     return {
//       checkIn: info?.checkIn ? new Date(info.checkIn) : null,
//       checkOut: info?.checkOut ? new Date(info.checkOut) : null,
//       nights:
//         info?.nights ||
//         (info?.checkIn && info?.checkOut
//           ? Math.ceil(
//               (new Date(info.checkOut) - new Date(info.checkIn)) /
//                 (1000 * 60 * 60 * 24)
//             )
//           : 0),
//       rooms: [
//         {
//           name: room.roomType,
//           price: getPriceForOcc(occNormalized[0]),
//           quantity: initialRoomsQty,
//         },
//       ],
//       occupancyArray: occNormalized,
//     };
//   });

//   const countries = ["Bhutan", "India", "Nepal", "United States", "United Kingdom"];
//   const phoneCodes = ["+975", "+91", "+977", "+1", "+44"];

//   const [selectedCountry, setSelectedCountry] = useState(
//     info?.country || countries[0]
//   );
//   const [selectedPhoneCode, setSelectedPhoneCode] = useState(() => {
//     const idx = countries.indexOf(info?.country || countries[0]);
//     return phoneCodes[idx] || "+975";
//   });

//   const [extraBed, setExtraBed] = useState(!!info.extraBed);
//   const [mealsSelected, setMealsSelected] = useState(() => {
//     switch (mealPlan) {
//       case "cp":
//         return { breakfast: true, lunch: false, dinner: false };
//       case "map":
//         return { breakfast: true, lunch: false, dinner: false };
//       case "ap":
//         return { breakfast: true, lunch: true, dinner: true };
//       default:
//         return { breakfast: false, lunch: false, dinner: false };
//     }
//   });

//   const [mapMealOrder, setMapMealOrder] = useState([]);
//   const [childrenAges, setChildrenAges] = useState(childrenAgesFromInfo);
//   const [adults, setAdults] = useState(adultsFromInfo);
//   const [children, setChildren] = useState(childrenFromInfo);

//   // NEW: Agency Booking
//   const [isAgencyBooking, setIsAgencyBooking] = useState(false);

//   useEffect(() => {
//     const roomsQty = bookingData.rooms[0].quantity || 1;
//     setBookingData((prev) => {
//       const occ = prev.occupancyArray || ["double"];
//       if (occ.length === roomsQty) return prev;
//       const newOcc = Array.from({ length: roomsQty }).map(
//         (_, i) => occ[i] || occ[0] || "double"
//       );
//       return { ...prev, occupancyArray: newOcc };
//     });
//   }, [bookingData.rooms[0].quantity]);

//   useEffect(() => {
//     if (bookingData.checkIn && bookingData.checkOut) {
//       const nights = Math.ceil(
//         (bookingData.checkOut - bookingData.checkIn) / (1000 * 60 * 60 * 24)
//       );
//       setBookingData((prev) => ({ ...prev, nights: nights > 0 ? nights : 0 }));
//     }
//   }, [bookingData.checkIn, bookingData.checkOut]);

//   const updateRoomQuantity = (quantity) => {
//     setBookingData((prev) => {
//       const q = Math.max(1, parseInt(quantity) || 1);
//       const updatedRooms = [...prev.rooms];
//       updatedRooms[0].quantity = q;
//       return { ...prev, rooms: updatedRooms };
//     });
//   };

//   const setOccupancyForIndex = (idx, value) => {
//     setBookingData((prev) => {
//       const arr = [...(prev.occupancyArray || [])];
//       arr[idx] = value;
//       return { ...prev, occupancyArray: arr };
//     });
//   };

//   const nights = bookingData.nights || 0;
//   const roomsQty = bookingData.rooms[0].quantity || 1;
//   const occupancyArray = bookingData.occupancyArray || ["double"];
//   const roomCostPerNight = occupancyArray.reduce(
//     (sum, occ) => sum + getPriceForOcc(occ),
//     0
//   );
//   const roomCost = roomCostPerNight * nights;

//   const anyDoubleSelected = occupancyArray.some((o) => o === "double");
//   const showExtraBedOption = mealPlan === "map" || anyDoubleSelected;

//   const extraBedCostPerNight = (() => {
//     const occForExtra = anyDoubleSelected ? "double" : occupancyArray[0] || "double";
//     return getExtraBedPrice(occForExtra);
//   })();
//   const extraBedCost = extraBed ? extraBedCostPerNight * nights : 0;

//   let childrenCost = 0;
//   childrenAges.forEach((ageGroup) => {
//     childrenCost += getChildUnitPrice(ageGroup) * nights;
//   });

//   const guestsCount = adults + children;
//   let perNightMeals = 0;

//   if (mealPlan === "ep") {
//     perNightMeals =
//       (mealsSelected.breakfast ? pricing.meals?.breakfast || 0 : 0) +
//       (mealsSelected.lunch ? pricing.meals?.lunch || 0 : 0) +
//       (mealsSelected.dinner ? pricing.meals?.dinner || 0 : 0);
//   } else if (mealPlan === "cp") {
//     perNightMeals =
//       (mealsSelected.lunch ? pricing.meals?.lunch || 0 : 0) +
//       (mealsSelected.dinner ? pricing.meals?.dinner || 0 : 0);
//   } else if (mealPlan === "map") {
//     perNightMeals = 0;
//     mapMealOrder.forEach((meal, index) => {
//       if (index === 0) return;
//       if (meal === "lunch") perNightMeals += pricing.meals?.lunch || 0;
//       if (meal === "dinner") perNightMeals += pricing.meals?.dinner || 0;
//     });
//   } else {
//     perNightMeals = 0;
//   }

//   const mealsCost = perNightMeals * nights * guestsCount;
//   const totalAmount = roomCost + extraBedCost + childrenCost + mealsCost;

//   const buildRoomSelection = () => {
//     const map = {};
//     occupancyArray.forEach((occ) => {
//       map[occ] = (map[occ] || 0) + 1;
//     });

//     return Object.entries(map).map(([occ, count]) => ({
//       roomType: room.roomType,
//       roomsRequested: count,
//       // occupancyType: occ,
//       occupancyType: occupancyArray,
//       mealPlan,
//       adults,
//       childrenAges,
//       extraBed,
//     }));
//   };

//   const handleBooking = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const formData = new FormData(form);

//     const selectedMealsList = Object.entries(mealsSelected)
//       .filter(([, checked]) => checked)
//       .map(([key]) => key);

//     const bookingRequest = {
//       firstName: isAgencyBooking ? null : formData.get("firstName"),
//       lastName: isAgencyBooking ? null : formData.get("lastName"),
//       email: isAgencyBooking ? null : formData.get("email"),
//       country: isAgencyBooking ? null : formData.get("country"),
//       phone: isAgencyBooking
//         ? null
//         : selectedPhoneCode + (formData.get("phone") || ""),

//       isAgencyBooking,
//       agencyName: isAgencyBooking ? formData.get("agencyName") : null,
//       agentName: isAgencyBooking ? formData.get("agentName") : null,
//       agencyEmail: isAgencyBooking ? formData.get("agencyEmail") : null,
//       agencyPhone: isAgencyBooking ? formData.get("agencyPhone") : null,

//       checkIn: bookingData.checkIn
//         ? new Date(bookingData.checkIn).toISOString().split("T")[0]
//         : null,
//       checkOut: bookingData.checkOut
//         ? new Date(bookingData.checkOut).toISOString().split("T")[0]
//         : null,

//       roomSelection: buildRoomSelection(),
//       mealPlan,
//       occupancyType: occupancyArray,
//       adults,
//       children,
//       childrenAges,
//       extraBed,
//       meals: selectedMealsList,
//       specialRequest: formData.get("specialRequest") || "",
//       totalAmount,
//     };

//     const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

//     const result = await Swal.fire({
//       html: `<p style="color:#d3ffd3; font-size:16px;">Do you want to confirm this booking?</p>`,
//       title: "Are you sure?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#008000",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes",
//       cancelButtonText: "Cancel",
//       background: "#006600",
//       color: "#fff",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       const response = await fetch(`${API_URL}/bookings/book-rooms`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookingRequest),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Swal.fire({
//           html: `<p style="color:#d3ffd3; font-size:16px;">Your booking request has been submitted. Our team will contact you shortly to confirm payment and finalize your stay.</p>`,
//           title: "Booking Request Sent!",
//           icon: "success",
//           confirmButtonColor: "#008000",
//           background: "#006600",
//           color: "#fff",
//         });
//         navigate("/room");
//       } else {
//         Swal.fire({
//           title: "Booking Failed",
//           html: `<p style="color:#ffd3d3; font-size:16px;">${
//             data.message || "Something went wrong."
//           }</p>`,
//           icon: "error",
//           background: "#006600",
//           color: "#fff",
//           confirmButtonColor: "#008000",
//         });
//       }
//     } catch (err) {
//       console.error("Booking request error:", err);
//       Swal.fire({
//         title: "Server Error",
//         text: "Unable to send booking request. Please try again later.",
//         icon: "error",
//         background: "#006600",
//         color: "#fff",
//         confirmButtonColor: "#008000",
//       });
//     }
//   };

//   return (
//     <section>
//       <BreadCrumb title="booking details" />
//       <div className="min-h-screen bg-white py-10 px-6 md:px-20">
//         <div className="flex flex-col md:flex-row gap-8">

//           {/* LEFT SUMMARY */}
//           <div className="w-full bg-[#F9F9F9] md:w-1/3 border border-gray-200 -md p-4 shadow-sm text-sm">
//             <h3 className="font-semibold text-lg mb-3">Booking Details</h3>

//             <div className="flex justify-between text-gray-700 mb-3">
//               <div className="w-1/2">
//                 <p className="font-medium text-sm mb-1">Check-in</p>
//                 <p className="text-sm">{formatDate(bookingData.checkIn)}</p>
//                 <p className="text-xs text-gray-500">From 3:00 PM</p>
//               </div>
//               <div className="w-[1px] bg-gray-300 mx-2"></div>
//               <div className="w-1/2">
//                 <p className="font-medium text-sm mb-1">Check-out</p>
//                 <p className="text-sm">{formatDate(bookingData.checkOut)}</p>
//                 <p className="text-xs text-gray-500">Until 12:00 PM</p>
//               </div>
//             </div>

//             <p className="mb-3 text-gray-700 text-sm">
//               Length of stay: <span className="font-medium">{nights} night(s)</span>
//             </p>

//             <hr className="my-2" />

//             <p className="font-medium text-sm mb-2">Cost per night</p>

//             <div className="mb-2">
//               {occupancyArray.map((occ, idx) => (
//                 <div key={idx} className="flex justify-between mb-1">
//                   <p className="text-sm">
//                     {room.roomType} — Room {idx + 1} ({occ})
//                   </p>
//                   <p className="text-sm">
//                     BTN{" "}
//                     {getPriceForOcc(occ).toLocaleString("en-US", {
//                       minimumFractionDigits: 2,
//                     })}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {extraBed && (
//               <div className="flex justify-between mb-1">
//                 <p className="text-sm">Extra bed × 1</p>
//                 <p className="text-sm">
//                   BTN{" "}
//                   {extraBedCostPerNight.toLocaleString("en-US", {
//                     minimumFractionDigits: 2,
//                   })}
//                 </p>
//               </div>
//             )}

//             {childrenAges.length > 0 && (
//               <>
//                 <p className="font-medium text-sm mt-2 mb-1">Children</p>
//                 {childrenAges.map((ageGroup, idx) => (
//                   <div key={idx} className="flex justify-between mb-1">
//                     <p className="text-sm">Child {idx + 1} ({ageGroup})</p>
//                     <p className="text-sm">
//                       BTN{" "}
//                       {getChildUnitPrice(ageGroup).toLocaleString("en-US", {
//                         minimumFractionDigits: 2,
//                       })}
//                     </p>
//                   </div>
//                 ))}
//               </>
//             )}

//             {(mealsSelected.breakfast ||
//               mealsSelected.lunch ||
//               mealsSelected.dinner) && (
//               <>
//                 <p className="font-medium text-sm mt-2 mb-1">Meals</p>
//                 <div className="flex justify-between mb-1">
//                   <p className="text-sm">
//                     {[
//                       mealsSelected.breakfast && "Breakfast",
//                       mealsSelected.lunch && "Lunch",
//                       mealsSelected.dinner && "Dinner",
//                     ]
//                       .filter(Boolean)
//                       .join(", ")}{" "}
//                     × {guestsCount} guest(s)
//                   </p>
//                   <p className="text-sm">
//                     BTN{" "}
//                     {perNightMeals.toLocaleString("en-US", {
//                       minimumFractionDigits: 2,
//                     })}
//                   </p>
//                 </div>
//               </>
//             )}

//             <hr className="my-2" />

//             <div className="flex justify-between items-center mb-2">
//               <p className="font-medium text-sm">Total per night</p>
//               <p className="text-blue-600 font-semibold text-sm">
//                 BTN{" "}
//                 {(
//                   roomCostPerNight +
//                   (extraBed ? extraBedCostPerNight : 0) +
//                   childrenAges.reduce(
//                     (sum, age) => sum + getChildUnitPrice(age),
//                     0
//                   ) +
//                   perNightMeals
//                 ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
//               </p>
//             </div>

//             <div className="flex justify-between items-center mt-3">
//               <p className="font-semibold text-base">
//                 Total cost ({nights} night(s))
//               </p>
//               <p className="text-green-600 font-bold text-xl">
//                 BTN{" "}
//                 {totalAmount.toLocaleString("en-US", {
//                   minimumFractionDigits: 2,
//                 })}
//               </p>
//             </div>
//           </div>

//           {/* RIGHT — FORM */}
//           <div className="w-full md:w-2/3 text-sm">

//             {/* Agency Toggle */}
//             <div className="flex items-center gap-2 mb-4">
//               <input
//                 type="checkbox"
//                 checked={isAgencyBooking}
//                 onChange={(e) => setIsAgencyBooking(e.target.checked)}
//               />
//               <span className="font-medium text-gray-700">
//                 This is an Agency Booking
//               </span>
//             </div>

//             <h3 className="font-semibold text-lg mb-4">Enter your details</h3>

//             <form className="space-y-6" onSubmit={handleBooking}>

//               {/* Guest Details */}
//               {!isAgencyBooking && (
//                 <>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-gray-700 font-medium">
//                         First name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="firstName"
//                         defaultValue={info.firstName || ""}
//                         required
//                         placeholder="Enter first name"
//                         className="w-full border border-gray-300 -md px-3 py-2 mt-1"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium">
//                         Last name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="lastName"
//                         defaultValue={info.lastName || ""}
//                         required
//                         placeholder="Enter last name"
//                         className="w-full border border-gray-300 -md px-3 py-2 mt-1"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-gray-700 font-medium">
//                       Email address <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       defaultValue={info.email || ""}
//                       required
//                       placeholder="you@example.com"
//                       className="w-full border border-gray-300 -md px-3 py-2 mt-1"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-gray-700 font-medium">
//                       Country/Region
//                     </label>
//                     <select
//                       name="country"
//                       value={selectedCountry}
//                       onChange={(e) => {
//                         const country = e.target.value;
//                         const index = countries.indexOf(country);
//                         setSelectedCountry(country);
//                         setSelectedPhoneCode(phoneCodes[index] || "+975");
//                       }}
//                       className="w-full border border-gray-300 -md px-3 py-2 mt-1"
//                     >
//                       {countries.map((country) => (
//                         <option key={country} value={country}>
//                           {country}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-gray-700 font-medium">
//                       Phone number <span className="text-red-500">*</span>
//                     </label>
//                     <div className="flex gap-2 flex-wrap">
//                       <select
//                         name="phoneCode"
//                         value={selectedPhoneCode}
//                         onChange={(e) => setSelectedPhoneCode(e.target.value)}
//                         className="flex-[1_1_30%] border border-gray-300 -md px-2 py-2"
//                       >
//                         {phoneCodes.map((code) => (
//                           <option key={code} value={code}>
//                             {code}
//                           </option>
//                         ))}
//                       </select>

//                       <input
//                         type="text"
//                         name="phone"
//                         required
//                         defaultValue={
//                           info.phone
//                             ? info.phone.replace(selectedPhoneCode, "")
//                             : ""
//                         }
//                         placeholder="Enter phone number"
//                         className="flex-[2_1_65%] border border-gray-300 -md px-3 py-2"
//                       />
//                     </div>
//                   </div>
//                 </>
//               )}

//               {/* Agency Fields */}
//              {/* AGENCY DETAILS */}
// {isAgencyBooking && (
//   <>
//     {/* Agency Name */}
//     <div>
//       <label className="block text-gray-700 font-medium">
//         Agency Name <span className="text-red-500">*</span>
//       </label>
//       <input
//         type="text"
//         name="agencyName"
//         required
//         placeholder="Enter agency name"
//         className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
//       />
//     </div>

//     {/* Agent Name */}
//     <div>
//       <label className="block text-gray-700 font-medium">
//         Agent Name <span className="text-red-500">*</span>
//       </label>
//       <input
//         type="text"
//         name="agentName"
//         required
//         placeholder="Enter agent's full name"
//         className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
//       />
//     </div>

//     {/* Agency Email */}
//     <div>
//       <label className="block text-gray-700 font-medium">
//         Agency Email <span className="text-red-500">*</span>
//       </label>
//       <input
//         type="email"
//         name="agencyEmail"
//         required
//         placeholder="agency@example.com"
//         className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
//       />
//     </div>

//     {/* Agency Country */}
//     <div>
//       <label className="block text-gray-700 font-medium">
//         Agency Country/Region
//       </label>
//       <select
//         name="agencyCountry"
//         value={selectedCountry} // optional: separate state if you want
//         onChange={(e) => {
//           const country = e.target.value;
//           const idx = countries.indexOf(country);
//           setSelectedCountry(country); 
//           setSelectedPhoneCode(phoneCodes[idx] || "+975"); // sync code
//         }}
//         className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
//       >
//         {countries.map((country) => (
//           <option key={country} value={country}>
//             {country}
//           </option>
//         ))}
//       </select>
//     </div>

//     {/* Agency Phone (with code dropdown) */}
//     <div>
//       <label className="block text-gray-700 font-medium">
//         Agency Phone <span className="text-red-500">*</span>
//       </label>
//       <div className="flex gap-2 flex-wrap">
//         <select
//           name="agencyPhoneCode"
//           value={selectedPhoneCode}
//           onChange={(e) => setSelectedPhoneCode(e.target.value)}
//           className="flex-[1_1_30%] border border-gray-300 -md px-2 py-2"
//         >
//           {phoneCodes.map((code) => (
//             <option key={code} value={code}>
//               {code}
//             </option>
//           ))}
//         </select>

//         <input
//           type="text"
//           name="agencyPhone"
//           required
//           placeholder="Enter agency phone number"
//           className="flex-[2_1_65%] border border-gray-300 -md px-3 py-2"
//         />
//       </div>
//     </div>
//   </>
// )}


//               {/* Room Quantity */}
//               <div>
//                 <h4 className="font-semibold mb-2">Room Selection</h4>
//                 <div className="flex items-center gap-4">
//                   <label className="min-w-[120px]">{room.roomType}</label>
//                   <div className="flex items-center gap-2">
//                     <button
//                       type="button"
//                       onClick={() =>
//                         updateRoomQuantity(Math.max(1, roomsQty - 1))
//                       }
//                       className="px-3 py-1 bg-gray-300 "
//                     >
//                       -
//                     </button>
//                     <input
//                       type="number"
//                       min="1"
//                       value={roomsQty}
//                       onChange={(e) => updateRoomQuantity(e.target.value)}
//                       className="w-20 border border-gray-300 -md px-2 py-1 text-center"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => updateRoomQuantity(roomsQty + 1)}
//                       className="px-3 py-1 bg-gray-300 "
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 {roomsQty > 1 && (
//                   <div className="mt-3 space-y-2">
//                     <p className="text-sm font-medium">Occupancy per room</p>
//                     {Array.from({ length: roomsQty }).map((_, idx) => (
//                       <div
//                         key={idx}
//                         className="flex justify-between items-center"
//                       >
//                         <span>Room {idx + 1}</span>
//                         <select
//                           value={occupancyArray[idx] || "double"}
//                           onChange={(e) =>
//                             setOccupancyForIndex(idx, e.target.value)
//                           }
//                           className="border px-3 py-2"
//                         >
//                           <option value="single">Single</option>
//                           <option value="double">Double</option>
//                         </select>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Extra Bed */}
//              {showExtraBedOption && (
//   <div className="mt-4">
//     <label className="font-semibold">Extra Beds</label>

//     <select
//       value={extraBed}
//       onChange={(e) => setExtraBed(Number(e.target.value))}
//       className="mt-1 border px-3 py-2 w-full"
//     >
//       {Array.from({ length: roomsQty + 1 }).map((_, i) => (
//         <option key={i} value={i}>
//           {i} {i === 1 ? "Extra Bed" : "Extra Beds"}
//         </option>
//       ))}
//     </select>

//     {extraBed > 0 && (
//       <p className="text-xs text-gray-600 mt-1">
//         Extra bed price per night: BTN{" "}
//         {extraBedCostPerNight.toLocaleString("en-US", {
//           minimumFractionDigits: 2,
//         })}
//       </p>
//     )}
//   </div>
// )}

//               {/* {showExtraBedOption && (
//                 <div>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={extraBed}
//                       onChange={(e) => setExtraBed(e.target.checked)}
//                     />
//                     <span>Add Extra Bed</span>
//                   </label>
//                   {extraBed && (
//                     <p className="text-xs text-gray-600 mt-1">
//                       Extra bed price per night: BTN{" "}
//                       {extraBedCostPerNight.toLocaleString("en-US", {
//                         minimumFractionDigits: 2,
//                       })}
//                     </p>
//                   )}
//                 </div>
//               )} */}

//               {/* Meals */}
//               <div>
//                 <h4 className="font-semibold mb-2">Types of Meals</h4>
//                 <div className="flex flex-col gap-2">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={mealsSelected.breakfast}
//                       disabled={mealPlan !== "ep"}
//                       onChange={() =>
//                         setMealsSelected((prev) => ({
//                           ...prev,
//                           breakfast: !prev.breakfast,
//                         }))
//                       }
//                     />
//                     <span>
//                       Breakfast{" "}
//                       {pricing.meals?.breakfast
//                         ? `(BTN ${pricing.meals.breakfast})`
//                         : "(Included)"}
//                     </span>
//                   </label>

//                   {mealPlan !== "ap" && (
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         checked={mealsSelected.lunch}
//                         onChange={() => {
//                           if (mealPlan === "map") {
//                             setMealsSelected((prev) => {
//                               const newVal = !prev.lunch;
//                               let newOrder = [...mapMealOrder];
//                               if (newVal) newOrder.push("lunch");
//                               else
//                                 newOrder = newOrder.filter(
//                                   (m) => m !== "lunch"
//                                 );
//                               setMapMealOrder(newOrder);
//                               return { ...prev, lunch: newVal };
//                             });
//                           } else {
//                             setMealsSelected((prev) => ({
//                               ...prev,
//                               lunch: !prev.lunch,
//                             }));
//                           }
//                         }}
//                       />
//                       <span>
//                         Lunch{" "}
//                         {pricing.meals?.lunch
//                           ? `(BTN ${pricing.meals.lunch})`
//                           : ""}
//                         {mealPlan === "map" &&
//                           mapMealOrder[0] === "lunch" &&
//                           " (Included - first MAP choice)"}
//                       </span>
//                     </label>
//                   )}

//                   {mealPlan !== "ap" && (
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         checked={mealsSelected.dinner}
//                         onChange={() => {
//                           if (mealPlan === "map") {
//                             setMealsSelected((prev) => {
//                               const newVal = !prev.dinner;
//                               let newOrder = [...mapMealOrder];
//                               if (newVal) newOrder.push("dinner");
//                               else
//                                 newOrder = newOrder.filter(
//                                   (m) => m !== "dinner"
//                                 );
//                               setMapMealOrder(newOrder);
//                               return { ...prev, dinner: newVal };
//                             });
//                           } else {
//                             setMealsSelected((prev) => ({
//                               ...prev,
//                               dinner: !prev.dinner,
//                             }));
//                           }
//                         }}
//                       />
//                       <span>
//                         Dinner{" "}
//                         {pricing.meals?.dinner
//                           ? `(BTN ${pricing.meals.dinner})`
//                           : ""}
//                         {mealPlan === "map" &&
//                           mapMealOrder[0] === "dinner" &&
//                           " (Included - first MAP choice)"}
//                       </span>
//                     </label>
//                   )}

//                   {mealPlan === "ap" && (
//                     <>
//                       <label className="flex items-center gap-2">
//                         <input type="checkbox" checked disabled />
//                         <span>Lunch (Included)</span>
//                       </label>
//                       <label className="flex items-center gap-2">
//                         <input type="checkbox" checked disabled />
//                         <span>Dinner (Included)</span>
//                       </label>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Special Request */}
//               <div>
//                 <h4 className="font-semibold mb-2">Special Request</h4>
//                 <textarea
//                   name="specialRequest"
//                   defaultValue={info.specialRequest || ""}
//                   rows="3"
//                   placeholder="Write your request here..."
//                   className="w-full border border-gray-300 -md px-3 py-2"
//                 ></textarea>
//               </div>

//               {/* Confirm */}
//               <div className="pt-6">
//                 <button
//                   type="submit"
//                   className="w-full bg-[#006600] text-white font-semibold py-3 -md hover:bg-green-700 transition"
//                 >
//                   Confirm Booking
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BookingDetails;


import React, { useState, useEffect } from "react";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const BookingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const info = location.state;

  if (!info || !info.roomData) {
    return (
      <section>
        <BreadCrumb title="booking details" />
        <div className="py-20 text-center text-xl text-gray-700">
          Booking information is missing.
        </div>
      </section>
    );
  }

  const room = info.roomData;
  const pricing = room.pricing || {};
  const mealPlan = info.mealPlan || "ep";
  const childrenAgesFromInfo = info.childrenAges || [];
  const adultsFromInfo = info.adult || 1;
  const childrenFromInfo = info.children || 0;

  const getPriceForOcc = (occ) =>
    pricing?.[mealPlan]?.[occ] ?? room.price ?? 0;

  const getExtraBedPrice = (occ) => {
    if (!pricing.extraBed) return 0;
    if (mealPlan === "map") {
      return occ === "single"
        ? pricing.extraBed.mapSingle ?? pricing.extraBed[mealPlan] ?? 0
        : pricing.extraBed.mapDouble ?? pricing.extraBed[mealPlan] ?? 0;
    }
    return pricing.extraBed[mealPlan] ?? 0;
  };

  const getChildUnitPrice = (ageGroup) => {
    const childPolicy = pricing.childPolicy || {};
    if (ageGroup === "1-5") return 0;
    if (ageGroup === "6-11") return childPolicy.age6to11?.[mealPlan] ?? 0;
    if (ageGroup === "12+") return getPriceForOcc("double");
    return 0;
  };

  const formatDate = (date) => {
    if (!date) return "--";
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const [bookingData, setBookingData] = useState(() => {
    const initialRoomsQty = info.room || 1;
  //  ` const occFromInfo = Array.isArray(info.occupancyType)
  //     ? info.occupancyType
  //     : [info.occupancyType || "double"]`;
    const occFromInfo = info.occupancyType || info.occupancyPerRoom || ["double"];

    // const occNormalized = Array.from({ length: initialRoomsQty }).map(
    //   (_, i) => occFromInfo[i] || occFromInfo[0] || "double"
    // );
    const occNormalized = occFromInfo.slice(0, initialRoomsQty);


    return {
      checkIn: info?.checkIn ? new Date(info.checkIn) : null,
      checkOut: info?.checkOut ? new Date(info.checkOut) : null,
      nights:
        info?.nights ||
        (info?.checkIn && info?.checkOut
          ? Math.ceil(
              (new Date(info.checkOut) - new Date(info.checkIn)) /
                (1000 * 60 * 60 * 24)
            )
          : 0),
      rooms: [
        {
          name: room.roomType,
          price: getPriceForOcc(occNormalized[0]),
          quantity: initialRoomsQty,
        },
      ],
      occupancyArray: occNormalized,
    };
  });

  const countries = ["Bhutan", "India", "Nepal", "United States", "United Kingdom"];
  const phoneCodes = ["+975", "+91", "+977", "+1", "+44"];

  const [selectedCountry, setSelectedCountry] = useState(
    info?.country || countries[0]
  );
  const [selectedPhoneCode, setSelectedPhoneCode] = useState(() => {
    const idx = countries.indexOf(info?.country || countries[0]);
    return phoneCodes[idx] || "+975";
  });

  const [extraBed, setExtraBed] = useState(!!info.extraBed);
  const [mealsSelected, setMealsSelected] = useState(() => {
    switch (mealPlan) {
      case "cp":
        return { breakfast: true, lunch: false, dinner: false };
      case "map":
        return { breakfast: true, lunch: false, dinner: false };
      case "ap":
        return { breakfast: true, lunch: true, dinner: true };
      default:
        return { breakfast: false, lunch: false, dinner: false };
    }
  });

  const [mapMealOrder, setMapMealOrder] = useState([]);
  const [childrenAges, setChildrenAges] = useState(childrenAgesFromInfo);
  const [adults, setAdults] = useState(adultsFromInfo);
  const [children, setChildren] = useState(childrenFromInfo);

  // NEW: Agency Booking
  const [isAgencyBooking, setIsAgencyBooking] = useState(false);

  useEffect(() => {
    const roomsQty = bookingData.rooms[0].quantity || 1;
    setBookingData((prev) => {
      const occ = prev.occupancyArray || ["double"];
      if (occ.length === roomsQty) return prev;
      const newOcc = Array.from({ length: roomsQty }).map(
        (_, i) => occ[i] || occ[0] || "double"
      );
      return { ...prev, occupancyArray: newOcc };
    });
  }, [bookingData.rooms[0].quantity]);

  useEffect(() => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const nights = Math.ceil(
        (bookingData.checkOut - bookingData.checkIn) / (1000 * 60 * 60 * 24)
      );
      setBookingData((prev) => ({ ...prev, nights: nights > 0 ? nights : 0 }));
    }
  }, [bookingData.checkIn, bookingData.checkOut]);

  const updateRoomQuantity = (quantity) => {
    setBookingData((prev) => {
      const q = Math.max(1, parseInt(quantity) || 1);
      const updatedRooms = [...prev.rooms];
      updatedRooms[0].quantity = q;
      return { ...prev, rooms: updatedRooms };
    });
  };

  const setOccupancyForIndex = (idx, value) => {
    setBookingData((prev) => {
      const arr = [...(prev.occupancyArray || [])];
      arr[idx] = value;
      return { ...prev, occupancyArray: arr };
    });
  };

  const nights = bookingData.nights || 0;
  const roomsQty = bookingData.rooms[0].quantity || 1;
  const occupancyArray = bookingData.occupancyArray || ["double"];
  const roomCostPerNight = occupancyArray.reduce(
    (sum, occ) => sum + getPriceForOcc(occ),
    0
  );
  const roomCost = roomCostPerNight * nights;

  const anyDoubleSelected = occupancyArray.some((o) => o === "double");
  const showExtraBedOption = mealPlan === "map" || anyDoubleSelected;

  const extraBedCostPerNight = (() => {
    const occForExtra = anyDoubleSelected ? "double" : occupancyArray[0] || "double";
    return getExtraBedPrice(occForExtra);
  })();
  const extraBedCost = extraBed ? extraBedCostPerNight * nights : 0;

  let childrenCost = 0;
  childrenAges.forEach((ageGroup) => {
    childrenCost += getChildUnitPrice(ageGroup) * nights;
  });

  const guestsCount = adults;

let perNightMeals = 0;

  if (mealPlan === "ep") {
    perNightMeals =
      (mealsSelected.breakfast ? pricing.meals?.breakfast || 0 : 0) +
      (mealsSelected.lunch ? pricing.meals?.lunch || 0 : 0) +
      (mealsSelected.dinner ? pricing.meals?.dinner || 0 : 0);
  } else if (mealPlan === "cp") {
    perNightMeals =
      (mealsSelected.lunch ? pricing.meals?.lunch || 0 : 0) +
      (mealsSelected.dinner ? pricing.meals?.dinner || 0 : 0);
  } else if (mealPlan === "map") {
    perNightMeals = 0;
    mapMealOrder.forEach((meal, index) => {
      if (index === 0) return;
      if (meal === "lunch") perNightMeals += pricing.meals?.lunch || 0;
      if (meal === "dinner") perNightMeals += pricing.meals?.dinner || 0;
    });
  } else {
    perNightMeals = 0;
  }
  const totalPerNight =
  roomCostPerNight +
  (extraBed ? extraBedCostPerNight : 0) +
  childrenAges.reduce((sum, age) => sum + getChildUnitPrice(age), 0) +
  (perNightMeals * adults);

const totalAmount = totalPerNight * nights;

  // const mealsCost = perNightMeals * nights * adults;

  // // const mealsCost = perNightMeals * nights * guestsCount;
  // const totalAmount = roomCost + extraBedCost + childrenCost + mealsCost;

  // const buildRoomSelection = () => {
  //   const map = {};
  //   occupancyArray.forEach((occ) => {
  //     map[occ] = (map[occ] || 0) + 1;
  //   });

  //   return Object.entries(map).map(([occ, count]) => ({
  //     roomType: room.roomType,
  //     roomsRequested: count,
  //     // occupancyType: occ,
  //     occupancyType: occupancyArray,
  //     mealPlan,
  //     adults,
  //     childrenAges,
  //     extraBed,
  //   }));
  // };
  const buildRoomSelection = () => {
  return [
    {
      roomType: room.roomType,
      roomsRequested: occupancyArray.length,
      occupancyType: occupancyArray,  // KEEP ENTIRE ARRAY
      mealPlan,
      adults,
      childrenAges,
      extraBed,
    }
  ];
};


  const handleBooking = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const selectedMealsList = Object.entries(mealsSelected)
      .filter(([, checked]) => checked)
      .map(([key]) => key);

    const bookingRequest = {
  isAgencyBooking,

  // 🌟 NORMAL GUEST FIELDS
  firstName: !isAgencyBooking ? formData.get("firstName") : undefined,
  lastName: !isAgencyBooking ? formData.get("lastName") : undefined,
  email: !isAgencyBooking ? formData.get("email") : undefined,
  country: !isAgencyBooking ? formData.get("country") : undefined,
  phone: !isAgencyBooking
    ? selectedPhoneCode + (formData.get("phone") || "")
    : undefined,

  // 🌟 AGENCY FIELDS — map into backend-expected fields
  agencyName: isAgencyBooking ? formData.get("agencyName") : undefined,
  agentName: isAgencyBooking ? formData.get("agentName") : undefined,

  // backend only expects "email" and "phone"
  email: isAgencyBooking ? formData.get("agencyEmail") : bookingRequest?.email,
  phone: isAgencyBooking
    ? selectedPhoneCode + (formData.get("agencyPhone") || "")
    : bookingRequest?.phone,

  country: isAgencyBooking ? formData.get("agencyCountry") : bookingRequest?.country,

  // Dates
  checkIn: bookingData.checkIn
    ? new Date(bookingData.checkIn).toISOString().split("T")[0]
    : null,
  checkOut: bookingData.checkOut
    ? new Date(bookingData.checkOut).toISOString().split("T")[0]
    : null,

  // Rooms
  roomSelection: buildRoomSelection(),
  mealPlan,
  occupancyType: occupancyArray,
  adults,
  children,
  childrenAges,
  extraBed,

  meals: selectedMealsList,
  specialRequest: formData.get("specialRequest") || "",
  totalAmount,
};

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    const result = await Swal.fire({
      html: `<p style="color:#d3ffd3; font-size:16px;">Do you want to confirm this booking?</p>`,
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      background: "#006600",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`${API_URL}/bookings/book-rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingRequest),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          html: `<p style="color:#d3ffd3; font-size:16px;">Your booking request has been submitted. Our team will contact you shortly to confirm payment and finalize your stay.</p>`,
          title: "Booking Request Sent!",
          icon: "success",
          confirmButtonColor: "#008000",
          background: "#006600",
          color: "#fff",
        });
        navigate("/room");
      } else {
        Swal.fire({
          title: "Booking Failed",
          html: `<p style="color:#ffd3d3; font-size:16px;">${
            data.message || "Something went wrong."
          }</p>`,
          icon: "error",
          background: "#006600",
          color: "#fff",
          confirmButtonColor: "#008000",
        });
      }
    } catch (err) {
      console.error("Booking request error:", err);
      Swal.fire({
        title: "Server Error",
        text: "Unable to send booking request. Please try again later.",
        icon: "error",
        background: "#006600",
        color: "#fff",
        confirmButtonColor: "#008000",
      });
    }
  };

  return (
    <section>
      <BreadCrumb title="booking details" />
      <div className="min-h-screen bg-white py-10 px-6 md:px-20">
        <div className="flex flex-col md:flex-row gap-8">

          {/* LEFT SUMMARY */}
          <div className="w-full bg-[#F9F9F9] md:w-1/3 border border-gray-200 -md p-4 shadow-sm text-sm">
            <h3 className="font-semibold text-xl mb-3">Booking Details</h3>

            <div className="flex justify-between text-gray-700 mb-3">
              <div className="w-1/2">
                <p className="font-medium text-sm mb-1">Check-in</p>
                <p className="text-sm">{formatDate(bookingData.checkIn)}</p>
                <p className="text-xs text-gray-500">From 3:00 PM</p>
              </div>
              <div className="w-[1px] bg-gray-300 mx-2"></div>
              <div className="w-1/2">
                <p className="font-medium text-sm mb-1">Check-out</p>
                <p className="text-sm">{formatDate(bookingData.checkOut)}</p>
                <p className="text-xs text-gray-500">Until 12:00 PM</p>
              </div>
            </div>

            <p className="mb-3 text-gray-700 text-sm">
              Length of stay: <span className="font-medium">{nights} night(s)</span>
            </p>

            <hr className="my-2" />

            <p className="font-medium text-sm mb-2">Cost per night</p>

            <div className="mb-2">
              {occupancyArray.map((occ, idx) => (
                <div key={idx} className="flex justify-between mb-1">
                  <p className="text-sm">
                    {room.roomType} — Room {idx + 1} ({occ})
                  </p>
                  <p className="text-sm">
                    BTN{" "}
                    {getPriceForOcc(occ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              ))}
            </div>

            {extraBed && (
              <div className="flex justify-between mb-1">
                <p className="text-sm">Extra bed × 1</p>
                <p className="text-sm">
                  BTN{" "}
                  {extraBedCostPerNight.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            )}

            {childrenAges.length > 0 && (
              <>
                <p className="font-medium text-sm mt-2 mb-1">Children</p>
                {childrenAges.map((ageGroup, idx) => (
                  <div key={idx} className="flex justify-between mb-1">
                    <p className="text-sm">Child {idx + 1} ({ageGroup})</p>
                    <p className="text-sm">
                      BTN{" "}
                      {getChildUnitPrice(ageGroup).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                ))}
              </>
            )}

            {(mealsSelected.breakfast ||
              mealsSelected.lunch ||
              mealsSelected.dinner) && (
              <>
                <p className="font-medium text-sm mt-2 mb-1">Meals</p>
                <div className="flex justify-between mb-1">
                  <p className="text-sm">
                    {[
                      mealsSelected.breakfast && "Breakfast",
                      mealsSelected.lunch && "Lunch",
                      mealsSelected.dinner && "Dinner",
                    ]
                      .filter(Boolean)
                      .join(", ")}{" "}
                    × {adults} adult(s)
                  </p>
                  {/* <p className="text-sm">
                    BTN{" "}
                    {perNightMeals.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </p> */}
                  <p className="text-sm">
                BTN{" "}
                {(perNightMeals * adults).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>

                </div>
              </>
            )}

            <hr className="my-2" />

            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-sm">Total per night</p>
              <p className="text-blue-600 font-semibold text-sm">
               BTN{" "}
                {totalPerNight.toLocaleString("en-US", { minimumFractionDigits: 2 })}

              </p>
            </div>

            <div className="flex justify-between items-center mt-3">
              <p className="font-semibold text-base">
                Total cost ({nights} night(s))
              </p>
              {/* <p className="text-green-600 font-bold text-xl">
                BTN{" "}
                {totalAmount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p> */}
             BTN{" "}
          {totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}


            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="w-full md:w-2/3 text-sm">

            {/* Agency Toggle */}
<div className="flex mb-5 border border-gray-300 w-full max-w-md">
  <button
    className={`flex-1 py-2 font-medium ${
      !isAgencyBooking
        ? "bg-[#006600] text-white"
        : "bg-gray-100 text-gray-700"
    }`}
    onClick={() => setIsAgencyBooking(false)}
  >
    Guest
  </button>
  <button
    className={`flex-1 py-2 font-medium ${
      isAgencyBooking
        ? "bg-[#006600] text-white"
        : "bg-gray-100 text-gray-700"
    }`}
    onClick={() => setIsAgencyBooking(true)}
  >
    Travel Agency
  </button>
</div>


            <h3 className="font-semibold text-xl mb-4">Enter your details</h3>

            <form className="space-y-6" onSubmit={handleBooking}>

              {/* Guest Details */}
              {!isAgencyBooking && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium">
                        First name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        defaultValue={info.firstName || ""}
                        required
                        placeholder="Enter first name"
                        className="w-full border border-gray-300 -md px-3 py-2 mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium">
                        Last name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        defaultValue={info.lastName || ""}
                        required
                        placeholder="Enter last name"
                        className="w-full border border-gray-300 -md px-3 py-2 mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={info.email || ""}
                      required
                      placeholder="you@example.com"
                      className="w-full border border-gray-300 -md px-3 py-2 mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Country/Region
                    </label>
                    <select
                      name="country"
                      value={selectedCountry}
                      onChange={(e) => {
                        const country = e.target.value;
                        const index = countries.indexOf(country);
                        setSelectedCountry(country);
                        setSelectedPhoneCode(phoneCodes[index] || "+975");
                      }}
                      className="w-full border border-gray-300 -md px-3 py-2 mt-1"
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Phone number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      <select
                        name="phoneCode"
                        value={selectedPhoneCode}
                        onChange={(e) => setSelectedPhoneCode(e.target.value)}
                        className="flex-[1_1_30%] border border-gray-300 -md mt-1 px-2 py-2"
                      >
                        {phoneCodes.map((code) => (
                          <option key={code} value={code}>
                            {code}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        name="phone"
                        required
                        defaultValue={
                          info.phone
                            ? info.phone.replace(selectedPhoneCode, "")
                            : ""
                        }
                        placeholder="Enter phone number"
                        className="flex-[2_1_65%] border border-gray-300 -md mt-1 px-3 py-2"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Agency Fields */}
              {isAgencyBooking && (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Agency Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="agencyName"
                      required
                      placeholder="Enter agency name"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Agent Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="agentName"
                      required
                      placeholder="Enter agent's full name"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Agency Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="agencyEmail"
                      required
                      placeholder="agency@example.com"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Agency Country/Region
                    </label>
                    <select
                      name="agencyCountry"
                      value={selectedCountry}
                      onChange={(e) => {
                        const country = e.target.value;
                        const idx = countries.indexOf(country);
                        setSelectedCountry(country);
                        setSelectedPhoneCode(phoneCodes[idx] || "+975");
                      }}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Agency Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      <select
                        name="agencyPhoneCode"
                        value={selectedPhoneCode}
                        onChange={(e) => setSelectedPhoneCode(e.target.value)}
                        className="flex-[1_1_30%] border border-gray-300 rounded-md px-2 py-2"
                      >
                        {phoneCodes.map((code) => (
                          <option key={code} value={code}>
                            {code}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        name="agencyPhone"
                        required
                        placeholder="Enter agency phone number"
                        className="flex-[2_1_65%] border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  </div>
                </>
              )}

<div>
  <h4 className="font-semibold">Room Selection</h4>

  <div className="flex justify-between items-center">
    {/* Label on the left */}
    <label className="text-sm font-medium">{room.roomType}</label>

    {/* Input with - + buttons on the right */}
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => updateRoomQuantity(Math.max(1, roomsQty - 1))}
        className="px-1 py-1 text-2xl bg-gray-300 rounded hover:bg-gray-400 transition"
      >
        -
      </button>

      <input
        type="number"
        min="1"
        value={roomsQty}
        onChange={(e) => updateRoomQuantity(e.target.value)}
        className="w-12 text-center border border-gray-300 py-1"
        style={{ MozAppearance: "textfield" }} // Firefox
      />

      <button
        type="button"
        onClick={() => updateRoomQuantity(roomsQty + 1)}
        className="px-1 py-1 text-2xl bg-gray-300 rounded hover:bg-gray-400 transition"
      >
        +
      </button>
    </div>
  </div>

  {/* Occupancy per room (existing) */}
  {roomsQty > 1 && (
    <div className="mt-3 space-y-2">
      <p className="text-sm font-medium">Occupancy per room</p>
      {Array.from({ length: roomsQty }).map((_, idx) => (
        <div key={idx} className="flex justify-between items-center">
          <span>Room {idx + 1}</span>
          <select
            value={occupancyArray[idx] || "double"}
            onChange={(e) => setOccupancyForIndex(idx, e.target.value)}
            className="border px-3 py-2"
          >
            <option value="single">Single</option>
            <option value="double">Double</option>
          </select>
        </div>
      ))}
    </div>
  )}
</div>

              {/* Extra Bed */}
             {showExtraBedOption && (
  <div className="mt-4">
    <label className="font-semibold">Extra Beds</label>

    <select
      value={extraBed}
      onChange={(e) => setExtraBed(Number(e.target.value))}
      className="mt-1 border px-3 py-2 w-full"
    >
      {Array.from({ length: roomsQty + 1 }).map((_, i) => (
        <option key={i} value={i}>
          {i} {i === 1 ? "Extra Bed" : "Extra Beds"}
        </option>
      ))}
    </select>

    {extraBed > 0 && (
      <p className="text-xs text-gray-600 mt-1">
        Extra bed price per night: BTN{" "}
        {extraBedCostPerNight.toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}
      </p>
    )}
  </div>
)}

              {/* {showExtraBedOption && (
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={extraBed}
                      onChange={(e) => setExtraBed(e.target.checked)}
                    />
                    <span>Add Extra Bed</span>
                  </label>
                  {extraBed && (
                    <p className="text-xs text-gray-600 mt-1">
                      Extra bed price per night: BTN{" "}
                      {extraBedCostPerNight.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  )}
                </div>
              )} */}

              {/* Meals */}
              <div>
                <h4 className="font-semibold mb-2">Types of Meals</h4>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={mealsSelected.breakfast}
                      disabled={mealPlan !== "ep"}
                      onChange={() =>
                        setMealsSelected((prev) => ({
                          ...prev,
                          breakfast: !prev.breakfast,
                        }))
                      }
                    />
                    <span>
                      Breakfast{" "}
                      {pricing.meals?.breakfast
                        ? `(BTN ${pricing.meals.breakfast})`
                        : "(Included)"}
                    </span>
                  </label>

                  {mealPlan !== "ap" && (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={mealsSelected.lunch}
                        onChange={() => {
                          if (mealPlan === "map") {
                            setMealsSelected((prev) => {
                              const newVal = !prev.lunch;
                              let newOrder = [...mapMealOrder];
                              if (newVal) newOrder.push("lunch");
                              else
                                newOrder = newOrder.filter(
                                  (m) => m !== "lunch"
                                );
                              setMapMealOrder(newOrder);
                              return { ...prev, lunch: newVal };
                            });
                          } else {
                            setMealsSelected((prev) => ({
                              ...prev,
                              lunch: !prev.lunch,
                            }));
                          }
                        }}
                      />
                      <span>
                        Lunch{" "}
                        {pricing.meals?.lunch
                          ? `(BTN ${pricing.meals.lunch})`
                          : ""}
                        {mealPlan === "map" &&
                          mapMealOrder[0] === "lunch" &&
                          " (Included - first MAP choice)"}
                      </span>
                    </label>
                  )}

                  {mealPlan !== "ap" && (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={mealsSelected.dinner}
                        onChange={() => {
                          if (mealPlan === "map") {
                            setMealsSelected((prev) => {
                              const newVal = !prev.dinner;
                              let newOrder = [...mapMealOrder];
                              if (newVal) newOrder.push("dinner");
                              else
                                newOrder = newOrder.filter(
                                  (m) => m !== "dinner"
                                );
                              setMapMealOrder(newOrder);
                              return { ...prev, dinner: newVal };
                            });
                          } else {
                            setMealsSelected((prev) => ({
                              ...prev,
                              dinner: !prev.dinner,
                            }));
                          }
                        }}
                      />
                      <span>
                        Dinner{" "}
                        {pricing.meals?.dinner
                          ? `(BTN ${pricing.meals.dinner})`
                          : ""}
                        {mealPlan === "map" &&
                          mapMealOrder[0] === "dinner" &&
                          " (Included - first MAP choice)"}
                      </span>
                    </label>
                  )}

                  {mealPlan === "ap" && (
                    <>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked disabled />
                        <span>Lunch (Included)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked disabled />
                        <span>Dinner (Included)</span>
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* Special Request */}
              <div>
                <h4 className="font-semibold mb-2">Special Request</h4>
                <textarea
                  name="specialRequest"
                  defaultValue={info.specialRequest || ""}
                  rows="3"
                  placeholder="Write your request here..."
                  className="w-full border border-gray-300 -md px-3 py-2"
                ></textarea>
              </div>

              {/* Confirm */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-[#006600] text-white font-semibold py-3 -md hover:bg-green-700 transition"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingDetails;
