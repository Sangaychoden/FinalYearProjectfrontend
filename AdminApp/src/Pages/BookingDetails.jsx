
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { setAlert } from "../utils/sweetAlert";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const BookingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomInput, setRoomInput] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);

  // ⭐ Fetch booking for ALL STATUSES (Pending, Confirmed, Guaranteed, Checked-in, Cancelled)
  const fetchBookingData = async () => {
    try {
      let found = null;

      // 1️⃣ PENDING
      const pending = await fetch(`${API_URL}/bookings/pending`, {
        credentials: "include",
      });
      const pendingJSON = await pending.json();
      if (pendingJSON.bookings)
        found = pendingJSON.bookings.find((b) => b._id === id);

      // 2️⃣ CONFIRMED + GUARANTEED
      if (!found) {
        const booked = await fetch(
          `${API_URL}/bookings/confirmed-guaranteed-bookings`,
          { credentials: "include" }
        );
        const bookedJSON = await booked.json();
        if (bookedJSON.bookings)
          found = bookedJSON.bookings.find((b) => b._id === id);
      }

      // 3️⃣ CHECKED-IN
      if (!found) {
        const checkedIn = await fetch(`${API_URL}/bookings/checked-in`, {
          credentials: "include",
        });
        const checkedInJSON = await checkedIn.json();
        if (checkedInJSON.bookings)
          found = checkedInJSON.bookings.find((b) => b._id === id);
      }

      // 4️⃣ CANCELLED
      if (!found) {
        const cancelled = await fetch(`${API_URL}/bookings/cancelled/all`, {
          credentials: "include",
        });
        const cancelledJSON = await cancelled.json();
        if (cancelledJSON.bookings)
          found = cancelledJSON.bookings.find((b) => b._id === id);
      }

      setBooking(found || null);
      setRoomInput(found?.assignedRoom?.join(", ") || "");

      // Load room details ONLY if not cancelled or checked-in
      if (found && found.status !== "cancelled") {
        const date = new Date().toISOString().split("T")[0];
        const roomRes = await fetch(`${API_URL}/rooms/available?date=${date}`);
        const roomData = await roomRes.json();

        if (roomData.availableRooms?.length > 0) {
          const matched = roomData.availableRooms.find(
            (r) => r.roomType === found.rooms?.[0]?.roomType
          );
          setSelectedRoom(matched);
        }
      }
    } catch (err) {
      console.error("❌ Error fetching booking:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, [id]);

  // UPDATE ROOM(S)
  const handleUpdateRoom = async () => {
    const newRooms = roomInput.split(",").map((r) => r.trim()).filter(Boolean);

    if (!newRooms.length)
      return setAlert({
        icon: "warning",
        title: "Invalid",
        text: "Enter at least one room.",
      });

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
        iconColor: "#008000",
        confirmButtonColor: "#008000",
        title: "Updated!",
        text: "Room updated.",
      });

      setBooking({ ...booking, assignedRoom: newRooms });
      setShowUpdate(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.message,
      });
    }
  };

  // CONFIRM BOOKING
  const handleConfirmBooking = async () => {
    const popup = await Swal.fire({
      title: "Confirm Booking?",
      text: "Enter deposit transaction number:",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: "#008000",
      iconColor: "#008000",
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
        iconColor: "#008000",
        confirmButtonColor: "#008000",
        title: "Confirmed!",
        text: "Deposit received.",
      });

      navigate("/booking", { state: { activeTab: "BOOKED" } });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    }
  };

  // GUARANTEE BOOKING
  const handleGuaranteeBooking = async () => {
    const popup = await Swal.fire({
      title: "Guarantee Booking?",
      text: "Enter FULL payment transaction number:",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: "#008000",
      iconColor: "#008000",
    });

    if (!popup.isConfirmed) return;

    try {
      const res = await fetch(
        `${API_URL}/bookings/guarantee-booking/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ transactionNumber: popup.value }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await Swal.fire({
        icon: "success",
        iconColor: "#008000",
        confirmButtonColor: "#008000",
        title: "Guaranteed!",
        text: "Full payment received.",
      });

      navigate("/booking", { state: { activeTab: "BOOKED" } });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed", text: err.message });
    }
  };

  // CANCEL / REJECT WITH REASON
  const handleCancelBooking = async () => {
    const popup = await Swal.fire({
      title: booking.status === "pending" ? "Reject Booking?" : "Cancel Booking?",
      text: "Enter the reason:",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#008000",
      iconColor: "#008000",
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
        iconColor: "#008000",
        confirmButtonColor: "#008000",
        title:
          booking.status === "pending"
            ? "Booking Rejected"
            : "Booking Cancelled",
        text: "Action completed.",
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
const formatNiceDate = (date) => {
  const d = new Date(date);
  const day = d.getDate(); // no leading zero
  const month = d.toLocaleString("en-GB", { month: "short" }); // Jan, Feb, Mar
  const year = d.getFullYear();
  return `${day} ${month}, ${year}`;
};

  // =======================
  // PAGE LOADING
  // =======================
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading booking details...
      </div>
    );

  if (!booking)
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Booking not found.</h2>
        <button
          className="mt-4 px-4 py-2 bg-green-600 text-white"
          onClick={() => navigate("/booking")}
        >
          Go Back
        </button>
      </div>
    );

  // =======================
  // UI RENDER
  // =======================
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#006600]">
          Booking #{booking.bookingNumber}
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border text-gray-700"
        >
          Back
        </button>
      </div>

      <div className="bg-white shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4 rounded">

        <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Country:</strong> {booking.country}</p>
        <p><strong>Phone:</strong> {booking.phoneNumber}</p>

        <p><strong>Room Type:</strong> {booking.rooms?.[0]?.roomType}</p>
        <p><strong>Quantity:</strong> {booking.rooms?.[0]?.quantity}</p>
        <p><strong>Price/Night:</strong> Nu. {booking.rooms?.[0]?.pricePerNight}</p>

        {selectedRoom && (
          <>
            <p><strong>Room Location:</strong> {selectedRoom.location}</p>
            <p><strong>Occupancy:</strong> {selectedRoom.occupancy}</p>
            <p><strong>Size:</strong> {selectedRoom.size} m²</p>
          </>
        )}

        {/* ASSIGNED ROOM */}
        <div className="col-span-2 mt-2">
          <p className="font-semibold">Assigned Room(s):</p>

          {/* Disable editing for CHECKED-IN or CANCELLED */}
          {booking.status === "checked_in" || booking.status === "cancelled" ? (
            <p className="mt-1 text-gray-700">{booking.assignedRoom?.join(", ")}</p>
          ) : (
            <div className="flex gap-2 mt-1">
              <input
                value={roomInput}
                onChange={(e) => {
                  setRoomInput(e.target.value);
                  setShowUpdate(true);
                }}
                className="border px-2 py-1 rounded w-44 text-sm"
              />
              {showUpdate && (
                <button
                  onClick={handleUpdateRoom}
                  className="px-3 py-1 bg-[#006600] text-white text-xs rounded"
                >
                  Update
                </button>
              )}
            </div>
          )}
        </div>
        <p><strong>Check-In:</strong> {formatNiceDate(booking.checkIn)}</p>
        <p><strong>Check-Out:</strong> {formatNiceDate(booking.checkOut)}</p>

        <p><strong>Total Price:</strong> Nu. {booking.totalPrice}</p>

        <p><strong>Status:</strong> {booking.status.toUpperCase()}</p>

        {/* SHOW CANCEL REASON */}
        {booking.status === "cancelled" && (
          <p className="text-red-600 col-span-2">
            <strong>Cancel Reason:</strong> {booking.cancelReason}
          </p>
        )}

        <div className="col-span-2">
          <p><strong>Special Request:</strong> {booking.specialRequest}</p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="col-span-2 flex justify-center space-x-6 mt-6">

          {/* PENDING → confirm */}
          {booking.status === "pending" && (
            <button
              onClick={handleConfirmBooking}
              className="bg-[#006600] text-white px-6 py-2 rounded"
            >
              Confirm Booking
            </button>
          )}

          {/* pending + confirmed → guarantee */}
          {(booking.status === "pending" || booking.status === "confirmed") && (
            <button
              onClick={handleGuaranteeBooking}
              className="bg-blue-700 text-white px-6 py-2 rounded"
            >
              Guarantee Booking
            </button>
          )}

          {/* pending + confirmed → cancel / reject */}
          {(booking.status === "pending" || booking.status === "confirmed") && (
            <button
              onClick={handleCancelBooking}
              className="bg-red-600 text-white px-6 py-2 rounded"
            >
              {booking.status === "pending" ? "Reject Booking" : "Cancel Booking"}
            </button>
          )}

          {/* CHECKED-IN + CANCELLED → NO BUTTONS */}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
