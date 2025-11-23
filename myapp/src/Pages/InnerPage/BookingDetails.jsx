// import React, { useState } from "react";
// import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";


// const BookingDetails = () => {
//   const navigate = useNavigate();

//  const location = useLocation();
// const info = location.state;
// const formatDate = (date) => {
//   return new Date(date).toLocaleDateString("en-US", {
//     weekday: "short",
//     month: "short",
//     day: "2-digit",
//     year: "numeric",
//   });
// };

// const [bookingData, setBookingData] = useState(() => ({
//   checkIn: info?.checkIn ? formatDate(info.checkIn) : "",
//   checkOut: info?.checkOut ? formatDate(info.checkOut) : "",
//   nights: info
//     ? Math.ceil(
//         (new Date(info.checkOut) - new Date(info.checkIn)) /
//           (1000 * 60 * 60 * 24)
//       )
//     : 0,
//   rooms: info
//     ? [
//         {
//           name: info.roomData.roomType,
//           price: info.roomData.price,
//           quantity: info.room,
//         },
//       ]
//     : [],
// }));


//   const countries = ["Bhutan","India","Nepal","Bangladesh","Thailand","China","Japan","Australia","United Kingdom","United States"];
//   const phoneCodes = ["+975","+91","+977","+880","+66","+86","+81","+61","+44","+1"];

//   const updateRoomQuantity = (index, quantity) => {
//     setBookingData((prev) => {
//       const updatedRooms = [...prev.rooms];
//       updatedRooms[index].quantity = parseInt(quantity) || 0;
//       return { ...prev, rooms: updatedRooms };
//     });
//   };

//   const totalAmount = bookingData.rooms.reduce(
//     (total, room) => total + room.price * room.quantity,
//     0
//   );

//   const handleBooking = async (e) => {
//   e.preventDefault();

//   const form = e.target;
//   const formData = new FormData(form);

//   // Collect user form values
//   const bookingRequest = {
//     firstName: formData.get("firstName"),
//     lastName: formData.get("lastName"),
//     email: formData.get("email"),
//     country: formData.get("country"),
//     phone: formData.get("phoneCode") + formData.get("phone"),
//     checkIn: new Date(info.checkIn).toISOString().split("T")[0],
//     checkOut: new Date(info.checkOut).toISOString().split("T")[0],
//     roomSelection: [
//       {
//         roomType: info.roomData.roomType,
//         roomsRequested: info.room,
//       },
//     ],
//     meals: Array.from(form.querySelectorAll('input[type="checkbox"]:checked')).map(
//       (el) => el.nextSibling.textContent.toLowerCase()
//     ),
//     specialRequest: formData.get("specialRequest") || "",
//   };

//   const API_URL = import.meta.env.VITE_API_URL;

//   // Confirm alert before sending
//   const result = await Swal.fire({
//     html: `<p style="color:#d3ffd3; font-size:16px;">Do you want to confirm this booking?</p>`,
//     title: "Are you sure?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#008000",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes",
//     cancelButtonText: "Cancel",
//     background: "#006600",
//     color: "#fff",
//   });

//   if (!result.isConfirmed) return;

//   try {
//     const response = await fetch(`${API_URL}/bookings/book-rooms`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(bookingRequest),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       Swal.fire({
//         html: `<p style="color:#d3ffd3; font-size:16px;">Your booking request has been submitted. Our team will contact you shortly to confirm payment through email and finalize your stay.</p>`,
//         title: "Booking Request Sent!",
//         icon: "success",
//         confirmButtonColor: "#008000",
//         background: "#006600",
//         color: "#fff",
//       });
//       navigate("/room");
//     } else {
//       Swal.fire({
//         title: "Booking Failed",
//         html: `<p style="color:#ffd3d3; font-size:16px;">${data.message || "Something went wrong."}</p>`,
//         icon: "error",
//         background: "#006600",
//         color: "#fff",
//         confirmButtonColor: "#008000",
//       });
//     }
//   } catch (err) {
//     console.error("Booking request error:", err);
//     Swal.fire({
//       title: "Server Error",
//       text: "Unable to send booking request. Please try again later.",
//       icon: "error",
//       background: "#006600",
//       color: "#fff",
//       confirmButtonColor: "#008000",
//     });
//   }
// };


//   return (
//     <section>
//       <BreadCrumb title="booking details" />
//       <div className="min-h-screen bg-white py-10 px-6 md:px-20">
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* LEFT COLUMN */}
//           <div className="w-full bg-[#F9F9F9] md:w-1/3 border border-gray-200 -md p-5 shadow-sm text-sm">
//             <h3 className="font-semibold text-lg mb-4">Your booking details</h3>
//             <div className="flex justify-between items-start text-gray-700 mb-4">
//               <div className="w-1/2">
//                 <p className="font-medium mb-1">Check-in</p>
//                 <p>{bookingData.checkIn}</p>
//                 <p>From 3:00 PM</p>
//               </div>
//               <div className="w-[1px] bg-gray-300 mx-3"></div>
//               <div className="w-1/2">
//                 <p className="font-medium mb-1">Check-out</p>
//                 <p>{bookingData.checkOut}</p>
//                 <p>Until 12:00 PM</p>
//               </div>
//             </div>
//             <p className="mb-4 text-gray-700">
//               Total length of stay: <span className="font-medium">{bookingData.nights} nights</span>
//             </p>
//             <hr className="my-3" />
//             <p className="font-medium mb-1">Room</p>
//             {bookingData.rooms.map((room, index) => (
//               <div key={index} className="flex justify-between">
//                 <p>{room.name} x {room.quantity}</p>
//                 <p>BTN {(room.price * room.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
//               </div>
//             ))}
//             <hr className="my-4" />
//             <div className="flex justify-between items-center">
//               <p className="font-semibold text-lg">Total</p>
//               <p className="text-green-600 font-bold text-2xl">
//                 BTN {totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
//               </p>
//             </div>
//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="w-full md:w-2/3 text-sm">
//             <h3 className="font-semibold text-lg mb-4">Enter your details</h3>
//            <form className="space-y-6" onSubmit={handleBooking}>
//   {/* Name fields */}
//   <div className="grid md:grid-cols-2 gap-4">
//     <div>
//       <label className="block text-gray-700 font-medium">
//         First name <span className="text-red-500">*</span>
//       </label>
//       <input
//         type="text"
//         name="firstName"   // ✅ added name
//         required
//         placeholder="Enter first name"
//         className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none placeholder:text-[#808080]"
//       />
//     </div>
//     <div>
//       <label className="block text-gray-700 font-medium">
//         Last name <span className="text-red-500">*</span>
//       </label>
//       <input
//         type="text"
//         name="lastName"    // ✅ added name
//         required
//         placeholder="Enter last name"
//         className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none placeholder:text-[#808080]"
//       />
//     </div>
//   </div>

//   {/* Email */}
//   <div>
//     <label className="block text-gray-700 font-medium">
//       Email address <span className="text-red-500">*</span>
//     </label>
//     <input
//       type="email"
//       name="email"   // ✅ added name
//       required
//       placeholder="you@example.com"
//       className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none placeholder:text-[#808080]"
//     />
//   </div>

//   {/* Country/Region */}
//   <div>
//     <label className="block text-gray-700 font-medium">Country/Region</label>
//     <select
//       name="country"   // ✅ added name
//       className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none placeholder:text-[#808080]"
//     >
//       {countries.map((country) => (
//         <option key={country}>{country}</option>
//       ))}
//     </select>
//   </div>

//   {/* Phone number with responsive dropdowns */}
//   <div>
//     <label className="block text-gray-700 font-medium">
//       Phone number <span className="text-red-500">*</span>
//     </label>
//     <div className="flex gap-2 flex-wrap">
//       <select
//         name="phoneCode"   // ✅ added name
//         className="flex-[1_1_30%] min-w-[80px] border border-gray-300 -md px-2 py-2 focus:ring-1 focus:ring-green-500 focus:outline-none"
//       >
//         {phoneCodes.map((code) => (
//           <option key={code}>{code}</option>
//         ))}
//       </select>
//       <input
//         type="text"
//         name="phone"   // ✅ added name
//         required
//         placeholder="Enter phone number"
//         className="flex-[2_1_65%] min-w-[150px] border border-gray-300 -md px-3 py-2 focus:ring-1 focus:ring-green-500 focus:outline-none"
//       />
//     </div>
//   </div>

//   {/* Room selection */}
//   <div>
//     <h4 className="font-semibold mb-2">Room Selection</h4>
//     <div className="flex gap-6">
//       {bookingData.rooms.map((room, index) => (
//         <div key={index} className="flex items-center gap-2">
//           <label>{room.name}</label>
//           <input
//             type="number"
//             min="0"
//             value={room.quantity}
//             onChange={(e) => updateRoomQuantity(index, e.target.value)}
//             className="w-16 border border-gray-300 -md px-2 py-1 text-center"
//           />
//         </div>
//       ))}
//     </div>
//   </div>

//   {/* Types of Meals */}
//   <div>
//     <h4 className="font-semibold mb-2">Types of Meals</h4>
//     <div className="flex flex-col gap-2">
//       {["Breakfast", "Lunch", "Dinner"].map((meal) => (
//         <label key={meal} className="flex items-center gap-2">
//           <input type="checkbox" />
//           <span>{meal}</span>
//         </label>
//       ))}
//     </div>
//   </div>

//   {/* Special Request */}
//   <div>
//     <h4 className="font-semibold mb-2">Special Request</h4>
//     <textarea
//       name="specialRequest"   // ✅ added name
//       rows="3"
//       placeholder="Write your request here..."
//       className="w-full border border-gray-300 -md px-3 py-2 focus:ring-1 focus:ring-green-500 focus:outline-none placeholder:text-[#808080]"
//     ></textarea>
//   </div>

//   {/* Confirm Button */}
//   <div className="pt-6">
//     <button
//       type="submit"
//       className="w-full bg-[#006600] text-white font-semibold py-3 -md hover:bg-green-700 transition"
//     >
//       Confirm Booking
//     </button>
//   </div>
// </form>

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

  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Initialize booking data
  const [bookingData, setBookingData] = useState(() => ({
    checkIn: info?.checkIn ? new Date(info.checkIn) : null,
    checkOut: info?.checkOut ? new Date(info.checkOut) : null,
    nights: info
      ? Math.ceil(
          (new Date(info.checkOut) - new Date(info.checkIn)) /
            (1000 * 60 * 60 * 24)
        )
      : 0,
    rooms: info
      ? [
          {
            name: info.roomData.roomType,
            price: info.roomData.price,
            quantity: info.room,
          },
        ]
      : [],
  }));

  const countries = [
    "Bhutan",
    "India",
    "Nepal",
    "Bangladesh",
    "Thailand",
    "China",
    "Japan",
    "Australia",
    "United Kingdom",
    "United States",
  ];
  const phoneCodes = [
    "+975",
    "+91",
    "+977",
    "+880",
    "+66",
    "+86",
    "+81",
    "+61",
    "+44",
    "+1",
  ];

  // 🧮 Update number of nights dynamically when check-in or check-out changes
  useEffect(() => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const nights = Math.ceil(
        (bookingData.checkOut - bookingData.checkIn) / (1000 * 60 * 60 * 24)
      );
      setBookingData((prev) => ({ ...prev, nights: nights > 0 ? nights : 0 }));
    }
  }, [bookingData.checkIn, bookingData.checkOut]);

  // 🧾 Handle quantity change
  const updateRoomQuantity = (index, quantity) => {
    setBookingData((prev) => {
      const updatedRooms = [...prev.rooms];
      updatedRooms[index].quantity = parseInt(quantity) || 0;
      return { ...prev, rooms: updatedRooms };
    });
  };

  // 🧮 Calculate total cost: price × quantity × nights
  const totalAmount = bookingData.rooms.reduce(
    (total, room) =>
      total + room.price * room.quantity * (bookingData.nights || 1),
    0
  );

  // 📩 Booking submission
  const handleBooking = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const bookingRequest = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      country: formData.get("country"),
      phone: formData.get("phoneCode") + formData.get("phone"),
      checkIn: new Date(bookingData.checkIn).toISOString().split("T")[0],
      checkOut: new Date(bookingData.checkOut).toISOString().split("T")[0],
      roomSelection: [
        {
          roomType: info.roomData.roomType,
          roomsRequested: info.room,
        },
      ],
      meals: Array.from(
        form.querySelectorAll('input[type="checkbox"]:checked')
      ).map((el) => el.nextSibling.textContent.toLowerCase()),
      specialRequest: formData.get("specialRequest") || "",
    };

    const API_URL = import.meta.env.VITE_API_URL;

    // Confirm before sending
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
          html: `<p style="color:#d3ffd3; font-size:16px;">Your booking request has been submitted. Our team will contact you shortly to confirm payment through email and finalize your stay.</p>`,
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
          {/* LEFT COLUMN */}
          <div className="w-full bg-[#F9F9F9] md:w-1/3 border border-gray-200 -md p-5 shadow-sm text-sm">
            <h3 className="font-semibold text-lg mb-4">Your booking details</h3>
            <div className="flex justify-between items-start text-gray-700 mb-4">
              <div className="w-1/2">
                <p className="font-medium mb-1">Check-in</p>
                <p>{bookingData.checkIn ? formatDate(bookingData.checkIn) : "--"}</p>
                <p>From 3:00 PM</p>
              </div>
              <div className="w-[1px] bg-gray-300 mx-3"></div>
              <div className="w-1/2">
                <p className="font-medium mb-1">Check-out</p>
                <p>{bookingData.checkOut ? formatDate(bookingData.checkOut) : "--"}</p>
                <p>Until 12:00 PM</p>
              </div>
            </div>

            <p className="mb-4 text-gray-700">
              Total length of stay:{" "}
              <span className="font-medium">{bookingData.nights} nights</span>
            </p>
            <hr className="my-3" />

            <p className="font-medium mb-1">Room</p>
            {bookingData.rooms.map((room, index) => (
              <div key={index} className="flex justify-between">
                <p>
                  {room.name} × {room.quantity} × {bookingData.nights} nights
                </p>
                <p>
                  BTN{" "}
                  {(
                    room.price *
                    room.quantity *
                    (bookingData.nights || 1)
                  ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            ))}

            <hr className="my-4" />
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">Total</p>
              <p className="text-green-600 font-bold text-2xl">
                BTN{" "}
                {totalAmount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full md:w-2/3 text-sm">
            <h3 className="font-semibold text-lg mb-4">Enter your details</h3>

            <form className="space-y-6" onSubmit={handleBooking}>
              {/* Name */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="Enter first name"
                    className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Enter last name"
                    className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Country/Region
                </label>
                <select
                  name="country"
                  className="w-full border border-gray-300 -md px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:outline-none"
                >
                  {countries.map((country) => (
                    <option key={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Phone number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 flex-wrap">
                  <select
                    name="phoneCode"
                    className="flex-[1_1_30%] border border-gray-300 -md px-2 py-2"
                  >
                    {phoneCodes.map((code) => (
                      <option key={code}>{code}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="phone"
                    required
                    placeholder="Enter phone number"
                    className="flex-[2_1_65%] border border-gray-300 -md px-3 py-2"
                  />
                </div>
              </div>

              {/* Room Selection */}
              <div>
                <h4 className="font-semibold mb-2">Room Selection</h4>
                <div className="flex gap-6">
                  {bookingData.rooms.map((room, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <label>{room.name}</label>
                      <input
                        type="number"
                        min="1"
                        value={room.quantity}
                        onChange={(e) =>
                          updateRoomQuantity(index, e.target.value)
                        }
                        className="w-16 border border-gray-300 -md px-2 py-1 text-center"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Meals */}
              <div>
                <h4 className="font-semibold mb-2">Types of Meals</h4>
                <div className="flex flex-col gap-2">
                  {["Breakfast", "Lunch", "Dinner"].map((meal) => (
                    <label key={meal} className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>{meal}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Request */}
              <div>
                <h4 className="font-semibold mb-2">Special Request</h4>
                <textarea
                  name="specialRequest"
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
