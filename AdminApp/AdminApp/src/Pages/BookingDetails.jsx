// src/Pages/BookingDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setAlert } from "../utils/sweetAlert"; // your sweet alert utility

const roomTypes = [
  { name: "DELUXE SUITE", price: 100 },
  { name: "JUNIOR SUITE", price: 150 },
  { name: "EXECUTIVE SUITE", price: 200 },
  { name: "PRESIDENTIAL SUITE", price: 300 },
];

const countries = [ { name: "Afghanistan", code: "+93" }, { name: "Albania", code: "+355" }, { name: "Algeria", code: "+213" }, { name: "Andorra", code: "+376" }, { name: "Angola", code: "+244" }, { name: "Argentina", code: "+54" }, { name: "Armenia", code: "+374" }, { name: "Australia", code: "+61" }, { name: "Austria", code: "+43" }, { name: "Azerbaijan", code: "+994" }, { name: "Bahamas", code: "+1‑242" }, { name: "Bahrain", code: "+973" }, { name: "Bangladesh", code: "+880" }, { name: "Belarus", code: "+375" }, { name: "Belgium", code: "+32" }, { name: "Bhutan", code: "+975" }, { name: "Bolivia", code: "+591" }, { name: "Brazil", code: "+55" }, { name: "Brunei Darussalam", code: "+673" }, { name: "Bulgaria", code: "+359" }, { name: "Burundi", code: "+257" }, { name: "Cambodia", code: "+855" }, { name: "Cameroon", code: "+237" }, { name: "Canada", code: "+1" }, { name: "Chile", code: "+56" }, { name: "China", code: "+86" }, { name: "Colombia", code: "+57" }, { name: "Costa Rica", code: "+506" }, { name: "Croatia", code: "+385" }, { name: "Cuba", code: "+53" }, { name: "Cyprus", code: "+357" }, { name: "Czech Republic", code: "+420" }, { name: "Denmark", code: "+45" }, { name: "Djibouti", code: "+253" }, { name: "Dominica", code: "+1‑767" }, { name: "Dominican Republic", code: "+1‑809" }, { name: "Ecuador", code: "+593" }, { name: "Egypt", code: "+20" }, { name: "El Salvador", code: "+503" }, { name: "Estonia", code: "+372" }, { name: "Ethiopia", code: "+251" }, { name: "Fiji", code: "+679" }, { name: "Finland", code: "+358" }, { name: "France", code: "+33" }, { name: "Germany", code: "+49" }, { name: "Ghana", code: "+233" }, { name: "Greece", code: "+30" }, { name: "Hungary", code: "+36" }, { name: "Iceland", code: "+354" }, { name: "India", code: "+91" }, { name: "Indonesia", code: "+62" }, { name: "Iran", code: "+98" }, { name: "Iraq", code: "+964" }, { name: "Ireland", code: "+353" }, { name: "Israel", code: "+972" }, { name: "Italy", code: "+39" }, { name: "Japan", code: "+81" }, { name: "Kenya", code: "+254" }, { name: "Kuwait", code: "+965" }, { name: "Laos", code: "+856" }, { name: "Latvia", code: "+371" }, { name: "Lebanon", code: "+961" }, { name: "Lithuania", code: "+370" }, { name: "Luxembourg", code: "+352" }, { name: "Malaysia", code: "+60" }, { name: "Maldives", code: "+960" }, { name: "Malta", code: "+356" }, { name: "Mexico", code: "+52" }, { name: "Mongolia", code: "+976" }, { name: "Morocco", code: "+212" }, { name: "Nepal", code: "+977" }, { name: "Netherlands", code: "+31" }, { name: "New Zealand", code: "+64" }, { name: "Nigeria", code: "+234" }, { name: "Norway", code: "+47" }, { name: "Pakistan", code: "+92" }, { name: "Philippines", code: "+63" }, { name: "Poland", code: "+48" }, { name: "Portugal", code: "+351" }, { name: "Qatar", code: "+974" }, { name: "Romania", code: "+40" }, { name: "Russia", code: "+7" }, { name: "Saudi Arabia", code: "+966" }, { name: "Singapore", code: "+65" }, { name: "Slovakia", code: "+421" }, { name: "Slovenia", code: "+386" }, { name: "South Africa", code: "+27" }, { name: "South Korea", code: "+82" }, { name: "Spain", code: "+34" }, { name: "Sri Lanka", code: "+94" }, { name: "Sweden", code: "+46" }, { name: "Switzerland", code: "+41" }, { name: "Thailand", code: "+66" }, { name: "Turkey", code: "+90" }, { name: "UAE", code: "+971" }, { name: "UK", code: "+44" }, { name: "USA", code: "+1" }, { name: "Vietnam", code: "+84" }, ];

const BookingDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking, activeTab } = location.state || {};

  const [bookingStatus, setBookingStatus] = useState(booking?.status);
  const [journalInput, setJournalInput] = useState(booking?.journalNumber || "");
  const [selectedRoomType, setSelectedRoomType] = useState(booking?.type || "");
  const [selectedRoomNo, setSelectedRoomNo] = useState(booking?.roomNo || "");
  const [checkInDate, setCheckInDate] = useState(booking?.checkIn ? new Date(booking.checkIn) : null);
  const [checkOutDate, setCheckOutDate] = useState(booking?.checkOut ? new Date(booking.checkOut) : null);
  const [adults, setAdults] = useState(booking?.adults || 1);
  const [children, setChildren] = useState(booking?.children || 0);
  const [firstName, setFirstName] = useState(booking?.firstName || "");
  const [lastName, setLastName] = useState(booking?.lastName || "");
  const [email, setEmail] = useState(booking?.email || "");
  const [country, setCountry] = useState(booking?.country || countries[0].name);
  const [phoneCode, setPhoneCode] = useState(
    booking?.phoneCode || countries.find(c => c.name === (booking?.country || countries[0].name))?.code
  );
  const [phone, setPhone] = useState(booking?.phone || "");
  const [specialRequest, setSpecialRequest] = useState(booking?.specialRequest || "");
  const [roomPrice, setRoomPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const room = roomTypes.find(r => r.name === selectedRoomType);
    const price = room ? room.price : 0;
    setRoomPrice(price);

    if (checkInDate && checkOutDate) {
      const diffTime = Math.max(checkOutDate - checkInDate, 0);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalPrice(diffDays * price);
    } else {
      setTotalPrice(price);
    }
  }, [selectedRoomType, checkInDate, checkOutDate]);

  if (!booking) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-700">No booking selected.</h2>
        <button
          className="mt-4 px-4 py-2 bg-green-600 text-white"
          onClick={() => navigate("/booking", { state: { activeTab: "AVAILABLE" } })}
        >
          Go Back
        </button>
      </div>
    );
  }

const handleConfirmBooking = async () => {
  // First, ask for confirmation with Yes/No
  const confirmed = await setAlert({
    icon: "warning",
    title: "Confirm Booking?",
    text: "Are you sure you want to confirm this booking?",
    showCancelButton: true,   // Yes/No buttons
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });

  if (confirmed) {
    // Update booking status
    setBookingStatus("BOOKED");

    // Show success with single OK button
    await setAlert({
      icon: "success",
      title: "Success!",
      text: "The booking has been confirmed.",
      showCancelButton: false, // single OK button
      confirmButtonText: "OK",
    });

    // Navigate back to booking page
    navigate("/booking", { state: { activeTab: "BOOKED" } });
  }
};


const handleCancelBooking = async () => {
  // First, ask for confirmation with Yes/No
  const confirmed = await setAlert({
    icon: "warning",
    title: "Cancel Booking?",
    text: "Are you sure you want to cancel this booking?",
    showCancelButton: true,   // Yes/No buttons
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });

  if (confirmed) {
    // Update booking status
    setBookingStatus("CANCELLED");

    // Show success with single OK button
    await setAlert({
      icon: "success",
      title: "Cancelled",
      text: "The booking has been cancelled.",
      showCancelButton: false, // single OK button
      confirmButtonText: "OK",
    });

    // Navigate back to booking page
    navigate("/booking", { state: { activeTab: "AVAILABLE" } });
  }
};

  return (
    <div className="min-h-screen bg-gray-50 px-2 relative">

      <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold mb-6 text-[#006600]">
        {bookingStatus} Booking Details
      </h1>          
      <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Back
          </button>
        </div>

      {bookingStatus === "AVAILABLE" ? (
        // Full editable form for AVAILABLE bookings
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Room Info */}
          <div className="bg-white shadow p-4 ">
            <h2 className="font-bold mb-2">Room Information</h2>
            <div className="space-y-4">
              <div>
                <label className="font-semibold">Room Type:</label>
                <select
                  className="mt-1 border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={selectedRoomType}
                  onChange={e => setSelectedRoomType(e.target.value)}
                >
                  <option value="">Select Room Type</option>
                  {roomTypes.map((r, idx) => (
                    <option key={idx} value={r.name}>
                      {r.name} (${r.price}/night)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold">Room Number:</label>
                <input
                  type="text"
                  value={selectedRoomNo}
                  onChange={e => setSelectedRoomNo(e.target.value)}
                  placeholder="Enter room number"
                  className="mt-1 border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

<div className="flex flex-col w-full">
  <label className="font-semibold mb-1">Check-In:</label>
  <DatePicker
    selected={checkInDate}
    onChange={setCheckInDate}
    className="border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-300"
    placeholderText="Select check-in date"
  />
</div>

<div className="flex flex-col w-full mt-4">
  <label className="font-semibold mb-1">Check-Out:</label>
  <DatePicker
    selected={checkOutDate}
    onChange={setCheckOutDate}
    className="border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-300"
    placeholderText="Select check-out date"
  />
</div>


              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="font-semibold">Adults:</label>
                  <input
                    type="number"
                    min="1"
                    value={adults}
                    onChange={e => setAdults(parseInt(e.target.value))}
                    className="mt-1 border border-gray-300 px-3 py-2 w-full  focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>

                <div className="flex-1">
                  <label className="font-semibold">Children:</label>
                  <input
                    type="number"
                    min="0"
                    value={children}
                    onChange={e => setChildren(parseInt(e.target.value))}
                    className="mt-1 border border-gray-300 px-3 py-2 w-full  focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>
              </div>

              <p className="font-semibold mt-2">
                Room Price: ${roomPrice} / night
              </p>
              <p className="font-semibold">
                Total Price: ${totalPrice}
              </p>
            </div>
          </div>

          {/* Guest Info */}
          <div className="bg-white shadow p-4 ">
            <h2 className="font-bold mb-2">Guest Information</h2>
            <div className="space-y-4">
              <div>
                <label className="font-semibold">First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="mt-1 border border-gray-300 px-3 py-2 w-full  focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              <div>
                <label className="font-semibold">Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="mt-1 border border-gray-300 px-3 py-2 w-full  focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              <div>
                <label className="font-semibold">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-1 border border-gray-300 px-3 py-2 w-full  focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              <div>
                <label className="font-semibold">Country:</label>
                <select
                  value={country}
                  onChange={e => {
                    const sel = e.target.value;
                    setCountry(sel);
                    const found = countries.find(c => c.name === sel);
                    if (found) setPhoneCode(found.code);
                  }}
                  className="mt-1 border border-gray-300 px-3 py-2 w-full  focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  {countries.map((c, idx) => (
                    <option key={idx} value={c.name}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="font-semibold">Phone Code:</label>
                  <input
                    type="text"
                    value={phoneCode}
                    readOnly
                    className="mt-1 border border-gray-300 px-3 py-2 w-full  bg-gray-100"
                  />
                </div>

                <div className="flex-1">
                  <label className="font-semibold">Phone Number:</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="mt-1 border border-gray-300 px-3 py-2 w-full  focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold">Journal Number:</label>
                <input
                  type="text"
                  value={journalInput}
                  onChange={e => setJournalInput(e.target.value)}
                  className="mt-1 border border-gray-300 px-3 py-2 w-full  focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              <div>
                <label className="font-semibold">Special Request:</label>
                <textarea
                  value={specialRequest}
                  onChange={e => setSpecialRequest(e.target.value)}
                  placeholder="Enter any special requests"
                  className="mt-1 border border-gray-300 px-3 py-2 w-full  focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              <button
                className="mt-4 bg-[#006600] text-white px-6 py-2  shadow hover:bg-green-800 transition w-full"
                onClick={handleConfirmBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      ) : (
        // PENDING / BOOKED: read-only details
<div className="bg-white shadow p-6  grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
  {/* Booking No full width */}
  <div className="col-span-1 md:col-span-2">
    <p><strong>Booking No:</strong> {booking.bookingNo}</p>
  </div>

<p><strong>Name:</strong> {firstName} {lastName}</p>
<p><strong>Email:</strong> {email}</p>
<p><strong>Country:</strong> {country}</p>
<p><strong>Phone:</strong> {phoneCode} {phone}</p>
<p><strong>Room Type:</strong> {selectedRoomType}</p>
{bookingStatus !== "PENDING" && (
  <p><strong>Room No:</strong> {selectedRoomNo}</p>
)}
<p><strong>Check-In:</strong> {checkInDate?.toLocaleDateString()}</p>
<p><strong>Check-Out:</strong> {checkOutDate?.toLocaleDateString()}</p>
<p><strong>Adults:</strong> {adults}</p>
<p><strong>Children:</strong> {children}</p>

  {/* Special Request full width */}
  <div className="col-span-1 md:col-span-2">
    <p><strong>Special Request:</strong> {specialRequest}</p>
  </div>


          {bookingStatus === "PENDING" && (
            <div className="col-span-1 md:col-span-2">
    {/* Room Number */}
    <div>
      <label className="font-semibold">Room Number:</label>
      <input
        type="text"
        value={selectedRoomNo}
        onChange={e => setSelectedRoomNo(e.target.value)}
        placeholder="Enter Room Number"
        className="mt-1 mb-4 border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-300"
      />
    </div>

    {/* Journal Number */}
    <div>
      <label className="font-semibold">Journal Number:</label>
      <input
        type="text"
        value={journalInput}
        onChange={e => setJournalInput(e.target.value)}
        placeholder="Enter Journal Number"
        className="mt-1 mb-4 border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-300"
      />
    </div>

{/* Confirm & Cancel Booking Buttons side by side */}
<div className="col-span-1 md:col-span-2 flex justify-center mt-4 space-x-6">
  <button
    className="bg-[#006600] text-white px-6 py-2 shadow hover:bg-green-800 transition w-full md:w-1/3"
    onClick={handleConfirmBooking}
  >
    Confirm Booking
  </button>

  <button
    className="bg-red-600 text-white px-6 py-2 shadow hover:bg-red-700 transition w-full md:w-1/3"
    onClick={handleCancelBooking}
  >
    Cancel Booking
  </button>
</div>

            </div>
          )}

          {bookingStatus === "BOOKED" && (
            <div className="col-span-1 md:col-span-2">
<div className="flex justify-center mt-4">
  <button
    className="bg-red-600 text-white px-6 py-2 shadow hover:bg-red-700 transition w-2/5 "
    onClick={handleCancelBooking}
  >
    Cancel Booking
  </button>
</div>

            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingDetailsPage;
