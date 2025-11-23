
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  BsArrowLeft,
  BsArrowRight,
  BsCheck2
} from "react-icons/bs";
import {
  FaDollarSign,
  FaVectorSquare,
  FaUserFriends,
  FaBed,
  FaWater,
} from "react-icons/fa";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import ReactDatePicker from "react-datepicker";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

const RoomDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ State from previous page
  const {
    room: passedRoom,
    selectedInDate,
    selectedOutDate,
    adult: initialAdult,
    children: initialChildren,
    roomCount: initialRoomCount,
  } = location.state || {};

  const [room, setRoom] = useState(passedRoom || null);
  const [imageIndex, setImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState(
    selectedInDate ? new Date(selectedInDate) : new Date()
  );
  const [checkOut, setCheckOut] = useState(
    selectedOutDate
      ? new Date(selectedOutDate)
      : new Date(new Date().setDate(new Date().getDate() + 2))
  );
  const [adult, setAdult] = useState(initialAdult || 1);
  const [children, setChildren] = useState(initialChildren || 0);
  const [roomCount, setRoomCount] = useState(initialRoomCount || 1);

  // ✅ Fetch room details if ID present or state missing
  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (room) return; // already have data via state
      if (!id) return;

      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const response = await fetch(`${API_URL}/rooms/${id}`);
        const data = await response.json();

        if (data.room) setRoom(data.room);
        else if (data.rooms && data.rooms.length > 0) setRoom(data.rooms[0]);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
  }, [id, room]);

  // ✅ Image slider
  const images = room?.images?.length
    ? room.images
    : ["/images/inner/room1.jpeg", "/images/inner/room2.jpeg"];

  const prevBtn = () =>
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  const nextBtn = () => setImageIndex((prev) => (prev + 1) % images.length);

  // ✅ Calculations
  const calcNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = checkOut - checkIn;
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const calcTotal = () => {
    const nights = calcNights();
    const pricePerNight = room?.price || 0;
    return (nights * roomCount * pricePerNight).toFixed(2);
  };

  // ✅ Booking confirmation
  const confirmBooking = () => {
    const nights = calcNights();
    const total = calcTotal();

    Swal.fire({
      title: "Room is available!",
      html: `<p style="color:#d3ffd3; font-size:16px;">Proceed to booking details?</p>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      color: "#fff",
      iconColor: "#fff",
      background: "#006600",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/booking_details", {
          state: {
            roomData: room,
            checkIn,
            checkOut,
            room: roomCount,
            adult,
            children,
            nights,
            totalAmount: total,
          },
        });
      }
    });
  };

  if (!room) {
    return (
      <div className="py-40 text-center text-xl text-gray-600 dark:text-lightGray">
        Loading room details...
      </div>
    );
  }

  return (
    <section>
      <BreadCrumb title="ROOM DETAILS" home="/" />
      <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
        <div className="Container grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5">
          {/* ===== LEFT COLUMN ===== */}
          <div className="col-span-6 md:col-span-4">
            {/* Image Slider */}
            <div className="overflow-hidden relative group ">
              <img
                src={images[imageIndex]}
                alt={room.roomType}
                className="transition-all duration-500 w-full h-[400px] object-cover "
              />
              <span
                onClick={prevBtn}
                className="w-[40px] h-[40px] bg-white dark:bg-lightBlack hover:bg-[#006600] grid place-items-center absolute bottom-[45%] left-[-50px] group-hover:left-4 transition-all duration-300 cursor-pointer"
              >
                <BsArrowLeft
                  size={20}
                  className="text-lightBlack dark:text-white hover:text-white"
                />
              </span>
              <span
                onClick={nextBtn}
                className="w-[40px] h-[40px] bg-white dark:bg-lightBlack hover:bg-[#006600] grid place-items-center absolute bottom-[45%] right-[-50px] group-hover:right-4 transition-all duration-300 cursor-pointer"
              >
                <BsArrowRight
                  size={20}
                  className="text-lightBlack dark:text-white hover:text-white"
                />
              </span>
            </div>

            {/* Room Info */}
            <div className="pt-5 lg:pt-[35px] pr-3">
              <h2 className="py-2 font-Arial text-4xl font-semibold text-lightBlack dark:text-white">
                {room.roomType}
              </h2>
              <p className="text-sm lg:text-base leading-6 text-[#808080] dark:text-lightGray">
                {room.roomDetails}
              </p>

              {/* Room Numbers */}
              {/* {room.roomNumbers && (
                <div className="pt-6">
                  <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-2">
                    Room Numbers:
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-lightGray">
                    {room.roomNumbers.join(", ")}
                  </p>
                </div>
              )} */}

              {/* Room Features */}
              <div className="pt-10">
                <h2 className="pb-2 text-3xl font-semibold text-lightBlack dark:text-white">
                  Room Features
                </h2>
                <ul className="space-y-2">
                  {room.roomFeatures?.split(",").map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <BsCheck2 size={16} className="text-[#006600] mr-2" />
                      <span className="text-sm text-[#808080] dark:text-lightGray">
                        {feature.trim()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bathroom Amenities */}
              <div className="pt-10">
                <h2 className="pb-2 text-3xl font-semibold text-lightBlack dark:text-white">
                  Bathroom Amenities
                </h2>
                <ul className="space-y-2">
                  {room.bathroomAmenities?.split(",").map((item, i) => (
                    <li key={i} className="flex items-center">
                      <BsCheck2 size={16} className="text-[#006600] mr-2" />
                      <span className="text-sm text-[#808080] dark:text-lightGray">
                        {item.trim()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Optional Features */}
              {/* {room.optional && (
                <div className="pt-10">
                  <h2 className="pb-2 text-3xl font-semibold text-lightBlack dark:text-white">
                    Optional
                  </h2>
                  <ul className="space-y-2">
                    {room.optional?.split(",").map((item, i) => (
                      <li key={i} className="flex items-center">
                        <BsCheck2 size={16} className="text-[#006600] mr-2" />
                        <span className="text-sm text-[#808080] dark:text-lightGray">
                          {item.trim()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )} */}
            </div>
          </div>

          {/* ===== RIGHT COLUMN ===== */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <div className="bg-[#F5F5F5] dark:bg-normalBlack px-7 py-8 ">
              <h4 className="text-2xl font-semibold text-lightBlack dark:text-white mb-4">
                Booking
              </h4>

<div className="flex flex-col gap-4">
  <div>
    <label className="text-gray-700 dark:text-lightGray mb-1 block">
      Check-in
    </label>
    <ReactDatePicker
      selected={checkIn}
      onChange={(date) => {
        setCheckIn(date);
        // Reset checkout if it's before the new check-in
        if (checkOut && date && checkOut < date) setCheckOut(null);
      }}
      className="w-full border border-gray-300 text-gray-800 bg-white px-3 py-3 focus:ring-2 focus:ring-green-600"
      wrapperClassName="w-full"
      minDate={new Date()} // prevent selecting past dates
      placeholderText="Select check-in date"
    />
  </div>
  <div>
    <label className="text-gray-700 dark:text-lightGray mb-1 block">
      Check-out
    </label>
    <ReactDatePicker
      selected={checkOut}
      onChange={(date) => setCheckOut(date)}
      className="w-full border border-gray-300 text-gray-800 bg-white px-3 py-3 focus:ring-2 focus:ring-green-600"
      wrapperClassName="w-full"
      minDate={checkIn || new Date()} // checkout must be after check-in
      placeholderText="Select check-out date"
    />
  </div>
</div>


              {/* Guests & Rooms */}
              <div className="mt-6 space-y-3">
                {[
                  { label: "Adults", value: adult, set: setAdult, min: 1 },
                  { label: "Children", value: children, set: setChildren, min: 0 },
                  { label: "Rooms", value: roomCount, set: setRoomCount, min: 1 },
                ].map(({ label, value, set, min }, i) => (
                  <div className="flex justify-between items-center" key={i}>
                    <span className="text-gray-700 dark:text-lightGray w-24">
                      {label}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => set((v) => Math.max(min, v - 1))}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700  hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-500  text-gray-800 dark:text-white min-w-[40px] text-center">
                        {value}
                      </span>
                      <button
                        onClick={() => set(value + 1)}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700  hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-8 flex justify-between items-center border-t border-gray-300 pt-4">
                <label className="text-base font-semibold text-gray-700 dark:text-lightGray">
                  Total Amount
                </label>
                <span className="text-xl font-bold text-[#444]">
                  Nu. {calcTotal()}
                </span>
              </div>

              {/* Proceed Button */}
              <div className="mt-6">
                <button
                  onClick={confirmBooking}
                  className="bg-[#006600] w-full h-11 text-white font-semibold -sm hover:bg-green-700 transition"
                >
                  Proceed to Booking
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="mt-5">
              <h4 className="text-xl sm:text-2xl font-semibold text-lightBlack dark:text-white mb-2">
                Room Details
              </h4>
              <div className="grid items-center">
                <div className="flex items-center py-4 border-b border-gray-300">
                  <FaDollarSign className="text-[#006600] w-5 h-5 mr-3" />
                  <span className="text-sm text-[#808080] dark:text-lightGray">
                    Nu {room.price?.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center py-4 border-b border-gray-300">
                  <FaVectorSquare className="text-[#006600] w-5 h-5 mr-3" />
                  <span className="text-sm text-[#808080] dark:text-lightGray">
                    {room.size} SQ.FT
                  </span>
                </div>
                <div className="flex items-center py-4 border-b border-gray-300">
                  <FaUserFriends className="text-[#006600] w-5 h-5 mr-3" />
                  <span className="text-sm text-[#808080] dark:text-lightGray">
                    {room.occupancy} Guests
                  </span>
                </div>
                <div className="flex items-center py-4 border-b border-gray-300">
                  <FaBed className="text-[#006600] w-5 h-5 mr-3" />
                  <span className="text-sm text-[#808080] dark:text-lightGray">
                    {room.beds} {room.beds > 1 ? "Beds" : "Bed"}
                  </span>
                </div>
                <div className="flex items-center py-4 border-b border-gray-300">
                  <FaWater className="text-[#006600] w-5 h-5 mr-3" />
                  <span className="text-sm text-[#808080] dark:text-lightGray">
                    {room.location}
                  </span>
                </div>
                {/* <div className="flex items-center py-4 border-b border-gray-300">
                  <BsCheck2 className="text-[#006600] w-5 h-5 mr-3" />
                  <span className="text-sm text-[#808080] dark:text-lightGray">
                    Total Rooms: {room.numberOfRooms}
                  </span>
                </div>
                {room.roomsAvailable !== undefined && (
                  <div className="flex items-center py-4 border-b border-gray-300">
                    <BsCheck2 className="text-[#006600] w-5 h-5 mr-3" />
                    <span className="text-sm text-[#808080] dark:text-lightGray">
                      Rooms Available: {room.roomsAvailable}
                    </span>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
