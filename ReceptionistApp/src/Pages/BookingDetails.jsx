
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { setAlert } from "../utils/sweetAlert";
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
  const [roomInput, setRoomInput] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);

  // ⭐ Fetch booking for ALL STATUSES
  const fetchBookingData = async () => {
    try {
      let found = null;

      // pending
      const p = await fetch(`${API_URL}/bookings/pending`, { credentials: "include" });
      const pj = await p.json();
      if (pj.bookings) found = pj.bookings.find((b) => b._id === id);

      // confirmed/guaranteed
      if (!found) {
        const c = await fetch(`${API_URL}/bookings/confirmed-guaranteed-bookings`, {
          credentials: "include",
        });
        const cj = await c.json();
        if (cj.bookings) found = cj.bookings.find((b) => b._id === id);
      }

      // checked-in
      if (!found) {
        const ci = await fetch(`${API_URL}/bookings/checked-in`, { credentials: "include" });
        const cij = await ci.json();
        if (cij.bookings) found = cij.bookings.find((b) => b._id === id);
      }

      // cancelled
      if (!found) {
        const ca = await fetch(`${API_URL}/bookings/cancelled/all`, {
          credentials: "include",
        });
        const caj = await ca.json();
        if (caj.bookings) found = caj.bookings.find((b) => b._id === id);
      }

      setBooking(found || null);
      setRoomInput(found?.assignedRoom?.join(", ") || "");

      // load room details
      if (found && found.status !== "cancelled") {
        const date = new Date().toISOString().split("T")[0];
        const rr = await fetch(`${API_URL}/rooms/available?date=${date}`);
        const rdata = await rr.json();
        if (rdata.availableRooms?.length > 0) {
          const matched = rdata.availableRooms.find(
            (r) => r.roomType === found.rooms?.[0]?.roomType
          );
          setSelectedRoom(matched);
        }
      }
    } catch (err) {
      console.error("❌ fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, [id]);

  // Update room
  const handleUpdateRoom = async () => {
    const newRooms = roomInput.split(",").map((r) => r.trim()).filter(Boolean);
    if (!newRooms.length)
      return setAlert({ icon: "warning", title: "Invalid", text: "Enter at least one room." });

    const ok = await setAlert({
      icon: "question",
      title: "Update Room(s)?",
      text: `Change to: ${newRooms.join(", ")}`,
      showCancelButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: "#008000",
    });

    if (!ok) return;

    try {
      const res = await fetch(`${API_URL}/bookings/change-room/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ newRoom: newRooms }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await Swal.fire({
        icon: "success",
        background: "#006600",
        color: "white",
        confirmButtonColor: "#008000",
        title: "Updated!",
        text: "Room updated.",
      });

      setBooking({ ...booking, assignedRoom: newRooms });
      setShowUpdate(false);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed", text: err.message });
    }
  };

  // Confirm booking
  const handleConfirmBooking = async () => {
    const popup = await Swal.fire({
      title: "Confirm Booking",
      text: "Enter deposit transaction number:",
      input: "text",
      showCancelButton: true,
      background: "#006600",
      color: "white",
      confirmButtonColor: "#008000",
    });

    if (!popup.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}/bookings/confirm/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ transactionNumber: popup.value }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await Swal.fire({
        icon: "success",
        background: "#006600",
        color: "white",
        confirmButtonColor: "#008000",
        title: "Confirmed!",
        text: "Deposit received.",
      });

      navigate("/booking", { state: { activeTab: "BOOKED" } });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    }
  };

  // Guarantee booking
  const handleGuaranteeBooking = async () => {
    const popup = await Swal.fire({
      title: "Guarantee Booking",
      text: "Enter FULL payment transaction number:",
      input: "text",
      showCancelButton: true,
      background: "#006600",
      color: "white",
      confirmButtonColor: "#008000",
    });

    if (!popup.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}/bookings/guarantee-booking/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ transactionNumber: popup.value }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await Swal.fire({
        icon: "success",
        background: "#006600",
        color: "white",
        confirmButtonColor: "#008000",
        title: "Guaranteed!",
        text: "Full payment received.",
      });

      navigate("/booking", { state: { activeTab: "BOOKED" } });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed", text: err.message });
    }
  };

  // Check-in
  const handleCheckIn = async () => {
    if (booking.status === "confirmed") {
      const popup = await Swal.fire({
        title: "Check In?",
        text: "Enter check-in transaction number:",
        input: "text",
        showCancelButton: true,
        background: "#006600",
        color: "white",
        confirmButtonColor: "#008000",
      });

      if (!popup.isConfirmed) return;
    }

    try {
      const res = await fetch(`${API_URL}/bookings/checkin/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ transactionNumber: "FULLY_PAID" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await Swal.fire({
        icon: "success",
        background: "#006600",
        color: "white",
        confirmButtonColor: "#008000",
        title: "Checked In!",
      });

      navigate("/booking", { state: { activeTab: "CHECKED IN" } });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed", text: err.message });
    }
  };

  // Cancel booking
  const handleCancelBooking = async () => {
    const popup = await Swal.fire({
      title: booking.status === "pending" ? "Reject Booking" : "Cancel Booking",
      text: "Enter the reason:",
      input: "text",
      showCancelButton: true,
      background: "#006600",
      color: "white",
    });

    if (!popup.value) return;

    try {
      const endpoint =
        booking.status === "pending"
          ? `${API_URL}/bookings/reject/${id}`
          : `${API_URL}/bookings/cancel/${id}`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ reason: popup.value }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await Swal.fire({
        icon: "success",
        title: booking.status === "pending" ? "Booking Rejected" : "Booking Cancelled",
        background: "#006600",
        color: "white",
      });

      navigate("/booking", {
        state: {
          activeTab: booking.status === "pending" ? "AVAILABLE" : "BOOKED",
        },
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed", text: err.message });
    }
  };

  // ========================
  //       RENDER
  // ========================
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading booking details...
      </div>
    );

  if (!booking)
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Booking not found.</h2>
        <button
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );

  const nights = calculateNights(booking.checkIn, booking.checkOut);
  const created = booking.createdAt ? formatNiceDate(booking.createdAt) : "—";

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-10 border">

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
              Status: <span className="text-[#006600]">{booking.status.toUpperCase()}</span>
            </p>

            {booking.isAgencyBooking ? (
              <p className="text-purple-700 font-semibold mt-1">Agency Booking</p>
            ) : (
              <p className="text-green-700 font-semibold mt-1">Guest Booking</p>
            )}


            {booking.transactionNumber && (
              <p className="text-gray-600 mt-1">Txn #: {booking.transactionNumber}</p>
            )}
          </div>
        </div>

        {/* GUEST OR AGENCY DETAILS */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-[#006600] mb-4">
            {booking.isAgencyBooking ? "Agency Details" : "Guest Details"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-800">

            {/* AGENCY MODE */}
            {booking.isAgencyBooking ? (
              <>
                <p><strong>Agency Name:</strong> {booking.agencyName || "—"}</p>
                <p><strong>Agent Name:</strong> {booking.agentName || "—"}</p>
                <p><strong>Agent Email:</strong> {booking.email || "—"}</p>
                <p><strong>Country:</strong> {booking.country || "—"}</p>
                <p><strong>Phone:</strong> {booking.phoneNumber || "—"}</p>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
                <p><strong>Email:</strong> {booking.email}</p>
                <p><strong>Country:</strong> {booking.country}</p>
                <p><strong>Phone:</strong> {booking.phoneNumber || booking.phone}</p>
              </>
            )}

            {/* COMMON */}
            <p><strong>Check-In:</strong> {formatNiceDate(booking.checkIn)}</p>
            <p><strong>Check-Out:</strong> {formatNiceDate(booking.checkOut)}</p>
            <p><strong>Nights:</strong> {nights}</p>
            <p>
              <strong>Assigned Room(s):</strong>{" "}
              {booking.assignedRoom?.length ? booking.assignedRoom.join(", ") : "—"}
            </p>
          </div>

          <p className="mt-4">
            <strong>Special Request:</strong> {booking.specialRequest || "—"}
          </p>
        </div>

        {/* EDIT ASSIGNED ROOM */}
        <div className="mt-8">
          <p className="font-semibold">Edit Assigned Room(s):</p>

          {booking.status === "checked_in" || booking.status === "cancelled" ? (
            <p className="mt-1 text-gray-700">{booking.assignedRoom?.join(", ") || "—"}</p>
          ) : (
            <div className="flex gap-2 mt-2">
              <input
                value={roomInput}
                onChange={(e) => {
                  setRoomInput(e.target.value);
                  setShowUpdate(true);
                }}
                className="border px-2 py-1 w-44 text-sm"
              />
              {showUpdate && (
                <button
                  onClick={handleUpdateRoom}
                  className="px-3 py-1 bg-[#006600] text-white text-xs"
                >
                  Update
                </button>
              )}
            </div>
          )}
        </div>

        {/* ROOM DETAILS SECTION
        {selectedRoom && (
          <div className="mt-8 p-5 border bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-[#006600] mb-2">Room Details</h3>
            <p>Type: {selectedRoom.roomType}</p>
            {selectedRoom.location && <p>Location: {selectedRoom.location}</p>}
            {selectedRoom.size && <p>Size: {selectedRoom.size} m²</p>}
            {selectedRoom.occupancy && <p>Occupancy: {selectedRoom.occupancy}</p>}
          </div>
        )} */}

        {/* ROOMS TABLE */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-[#006600] mb-4">Booked Rooms</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-[#006600] text-white">
                <tr>
                  <th className="px-4 py-3">Room</th>
                  <th className="px-4 py-3 text-right">Qty</th>
                  <th className="px-4 py-3">Occupancy</th>
                  <th className="px-4 py-3">Meal Plan</th>
                  <th className="px-4 py-3 text-right">Adults</th>
                  <th className="px-4 py-3">Children</th>
                  <th className="px-4 py-3 text-right">Extra Beds</th>
                  <th className="px-4 py-3 text-right">Price/Night</th>
                  <th className="px-4 py-3 text-right">Nights</th>
                </tr>
              </thead>

              <tbody>
                {booking.rooms.map((r, idx) => (
                  <tr key={idx} className="border-t bg-white">
                    <td className="px-4 py-3">{r.roomType}</td>
                    <td className="px-4 py-3 text-right">{r.quantity || 1}</td>
                    <td className="px-4 py-3">{(r.occupancyType || []).join(", ")}</td>
                    <td className="px-4 py-3">{mealPlanDisplay(r.mealPlan)}</td>
                    <td className="px-4 py-3 text-right">{r.adults}</td>
                    <td className="px-4 py-3">
                      {(r.children || []).map((c) => c.age).join(", ") || "—"}
                    </td>
                    <td className="px-4 py-3 text-right">{r.extraBeds}</td>
                    <td className="px-4 py-3 text-right">Nu. {r.pricePerNight}</td>
                    <td className="px-4 py-3 text-right">{nights}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot className="bg-gray-100">
                <tr>
                  <td colSpan={8} className="px-4 py-3 text-right font-semibold">
                    Booking Total
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-[#006600]">
                    Nu. {booking.totalPrice}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* CANCEL REASON */}
        {booking.status === "cancelled" && booking.cancelReason && (
          <div className="mt-8 p-5 border bg-red-50 rounded-lg text-red-700">
            <strong>Cancel Reason:</strong> {booking.cancelReason}
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="mt-10 flex justify-center gap-4">

          {booking.status === "pending" && (
            <button
              onClick={handleConfirmBooking}
              className="bg-[#006600] text-white px-6 py-3 rounded"
            >
              Deposit Confirmed
            </button>
          )}

          {(booking.status === "pending" || booking.status === "confirmed") && (
            <button
              onClick={handleGuaranteeBooking}
              className="bg-blue-700 text-white px-6 py-3 rounded"
            >
              Full Payment Confirmed
            </button>
          )}

          {(booking.status === "pending" || booking.status === "confirmed") && (
            <button
              onClick={handleCancelBooking}
              className="bg-red-600 text-white px-6 py-3 rounded"
            >
              {booking.status === "pending" ? "Reject Booking" : "Cancel Booking"}
            </button>
          )}

          {(booking.status === "confirmed" || booking.status === "guaranteed") && (
            <button
              onClick={handleCheckIn}
              className="bg-purple-700 text-white px-6 py-3 rounded"
            >
              Check In
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default BookingDetailsPage; 