import {
  BsArrowLeft,
  BsArrowRight,
  BsCheck2,
} from "react-icons/bs";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import { useState, useEffect, useRef } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  FaDollarSign,
  FaVectorSquare,
  FaUserFriends,
  FaBed,
  FaWater,
} from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import Swal from "sweetalert2";
import FloatingSocials from "../../Shared/FloatingSocials";
import GoToTop from "../../Shared/GoToTop";
import "./RoomsDatepicker.css";

const RoomDetails2 = () => {
  /* -------------------------
      ALL HOOKS AT THE TOP
  --------------------------*/

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const guestRef = useRef(null);
  const roomRef = useRef(null);

  const [roomData, setRoomData] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);

  const [imageIndex, setImageIndex] = useState(0);

  const [showAvailability, setShowAvailability] = useState(false);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const [room, setRoom] = useState(1);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);

  const [guestOpen, setGuestOpen] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);

  const [showInOverlay, setShowInOverlay] = useState(false);
  const [showOutOverlay, setShowOutOverlay] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [useDesktopPicker, setUseDesktopPicker] = useState(false);

  const BTN_PER_USD = 85.49;

  const priceUSD = roomData?.price
    ? (roomData.price / BTN_PER_USD).toFixed(2)
    : null;

  /* -------------------------
      FETCH ROOM DATA
  --------------------------*/
  useEffect(() => {
    if (!id || roomData) return;

    const fetchRoom = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/rooms/rooms/${id}`
        );

        const data = await res.json();
        setRoomData(data.room || data);
      } catch (error) {
        console.error("Room fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id, roomData]);

  /* -------------------------
      RESPONSIVE CALENDAR
  --------------------------*/
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setUseDesktopPicker(mq.matches);

    update();
    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, []);

  /* -------------------------
      CLOSE DROPDOWNS ON OUTSIDE CLICK
  --------------------------*/
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (guestRef.current && !guestRef.current.contains(event.target)) {
        setGuestOpen(false);
      }
      if (roomRef.current && !roomRef.current.contains(event.target)) {
        setRoomOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* -------------------------
      IMAGE HANDLERS
  --------------------------*/
  const images = roomData?.images || [];

  const prevBtn = () =>
    setImageIndex((prev) =>
      images.length ? (prev - 1 + images.length) % images.length : 0
    );

  const nextBtn = () =>
    setImageIndex((prev) =>
      images.length ? (prev + 1) % images.length : 0
    );

  /* -------------------------
      DATE FORMATTER
  --------------------------*/
  const fmt = (d) =>
    d
      ? d.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })
      : "";

  /* -------------------------
      OVERLAY OPEN/CLOSE
  --------------------------*/
  const openInOverlay = () => {
    setShowOutOverlay(false);
    setIsClosing(false);
    setShowInOverlay(true);
  };

  const openOutOverlay = () => {
    setShowInOverlay(false);
    setIsClosing(false);
    setShowOutOverlay(true);
  };

  const closeOverlay = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowInOverlay(false);
      setShowOutOverlay(false);
      setIsClosing(false);
    }, 200);
  };

  /* -------------------------
      AVAILABILITY CHECK
  --------------------------*/
  const checkRoomAvailability = async () => {
    if (!checkIn || !checkOut) {
      Swal.fire("Please select check-in & check-out dates", "", "warning");
      return;
    }

    const roomType = roomData?.roomType;
    const API_URL = import.meta.env.VITE_API_URL;

    const url = `${API_URL}/rooms/${encodeURIComponent(
      roomType
    )}/availability?checkIn=${
      checkIn.toISOString().split("T")[0]
    }&checkOut=${checkOut.toISOString().split("T")[0]}&adults=${adult}&children=${children}&roomsRequested=${room}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.roomsAvailable || data.roomsAvailable <= 0) {
        Swal.fire({
          title: "Room Not Available",
          icon: "warning",
          html: `<p style="font-size:16px;">No rooms available.</p>`,
          background: "#006600",
          color: "#fff",
          confirmButtonColor: "#008000",
        });
        return;
      }

      Swal.fire({
        title: "Room Available",
        icon: "success",
        html: `<p>${data.roomsAvailable} rooms available. Proceed?</p>`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "#008000",
        cancelButtonColor: "#d33",
        background: "#006600",
        color: "#fff",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/booking_details", {
            state: { checkIn, checkOut, room, adult, children, roomData },
          });
        }
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Server error", "", "error");
    }
  };

  /* -------------------------
      CONDITIONAL LOADING UI
  --------------------------*/
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Loading room...
      </div>
    );
  }

  if (!roomData) {
    return (
      <div className="text-center py-20 text-red-600 text-lg">
        Room not found.
      </div>
    );
  }

  /* -------------------------
      MAIN UI
  --------------------------*/
  return (
    <section>
      <BreadCrumb title="room details" />

      {/* IMAGE + DETAILS SECTION */}
      <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
        <div className="Container grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5">
          
          {/* LEFT SECTION */}
          <div className="col-span-6 md:col-span-4">
            <div className="overflow-hidden relative group">
              <img
                src={images[imageIndex] || "/images/home/room1.jpeg"}
                alt={roomData.roomType}
                className="transition-all duration-500"
              />

              {/* Prev Btn */}
              <span
                className="w-[40px] h-[40px] bg-white dark:bg-lightBlack hover:bg-[#006600] absolute left-[-50px] bottom-[45%] group-hover:left-4 transition-all duration-300 grid place-items-center cursor-pointer"
                onClick={prevBtn}
              >
                <BsArrowLeft className="text-lightBlack dark:text-white" size={20} />
              </span>

              {/* Next Btn */}
              <span
                className="w-[40px] h-[40px] bg-white dark:bg-lightBlack hover:bg-[#006600] absolute right-[-50px] bottom-[45%] group-hover:right-4 transition-all duration-300 grid place-items-center cursor-pointer"
                onClick={nextBtn}
              >
                <BsArrowRight className="text-lightBlack dark:text-white" size={20} />
              </span>
            </div>

            {/* Room Details */}
            <div className="pt-5 lg:pt-[35px] pr-3">
              <h2 className="text-2xl lg:text-4xl font-semibold text-lightBlack dark:text-white">
                {roomData.roomType}
              </h2>

              <p className="text-sm text-[#808080] dark:text-lightGray">
                {roomData.roomDetails}
              </p>

              {/* Features */}
              <div className="pt-10">
                <h2 className="pb-3 text-2xl font-semibold dark:text-white">
                  Room Features
                </h2>
                <ul className="space-y-2">
                  {roomData.roomFeatures?.split(",").map((f, i) => (
                    <li key={i} className="flex items-center">
                      <BsCheck2 className="text-[#006600] mr-2" /> {f.trim()}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bathroom Amenities */}
              <div className="pt-10">
                <h2 className="pb-3 text-2xl font-semibold dark:text-white">
                  Bathroom Amenities
                </h2>
                <ul className="space-y-2">
                  {roomData.bathroomAmenities?.split(",").map((b, i) => (
                    <li key={i} className="flex items-center">
                      <BsCheck2 className="text-[#006600] mr-2" /> {b.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <div className="px-7 py-8">
              
              <h4 className="text-2xl font-semibold dark:text-white mb-3">
                Room Details
              </h4>

              <div className="space-y-5">
                <div className="flex items-center border-b pb-4">
                  <FaDollarSign className="text-[#006600] mr-3" />
                  Nu {roomData.price} (USD {priceUSD}++)
                </div>

                <div className="flex items-center border-b pb-4">
                  <FaVectorSquare className="text-[#006600] mr-3" />
                  {roomData.size} m²
                </div>

                <div className="flex items-center border-b pb-4">
                  <FaUserFriends className="text-[#006600] mr-3" />
                  {roomData.occupancy} max
                </div>

                <div className="flex items-center border-b pb-4">
                  <FaBed className="text-[#006600] mr-3" />
                  {roomData.beds} Beds
                </div>

                <div className="flex items-center border-b pb-4">
                  <FaWater className="text-[#006600] mr-3" />
                  {roomData.location}
                </div>
              </div>

              <div className="py-5">
                <button
                  onClick={() => setShowAvailability(true)}
                  className="bg-[#006600] text-white w-full h-10 font-semibold hover:opacity-80"
                >
                  Book This Room
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* -------------------------
          BOOKING SLIDE PANEL
      --------------------------*/}
      {showAvailability && (
        <div className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-black dark:bg-lightBlack shadow-xl z-[1000] transition duration-500">
          
          <div className="p-6 h-full flex flex-col relative">
            <button
              className="absolute top-2 right-4 text-white text-4xl"
              onClick={() => setShowAvailability(false)}
            >
              ×
            </button>

            {/* CheckIn / CheckOut */}
            <div className="grid gap-4 mt-10 mb-6">
              
              <div>
                <label className="text-white block mb-1">Check-in</label>
                <input
                  type="date"
                  value={checkIn ? checkIn.toISOString().split("T")[0] : ""}
                  onChange={(e) =>
                    setCheckIn(e.target.value ? new Date(e.target.value) : null)
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border border-white bg-black text-white px-3 py-2"
                />
              </div>

              <div>
                <label className="text-white block mb-1">Check-out</label>
                <input
                  type="date"
                  value={checkOut ? checkOut.toISOString().split("T")[0] : ""}
                  onChange={(e) =>
                    setCheckOut(e.target.value ? new Date(e.target.value) : null)
                  }
                  min={
                    checkIn
                      ? new Date(checkIn.getTime() + 86400000)
                          .toISOString()
                          .split("T")[0]
                      : new Date().toISOString().split("T")[0]
                  }
                  className="w-full border border-white bg-black text-white px-3 py-2"
                />
              </div>

            </div>

            {/* Guests */}
            <div ref={guestRef} className="mb-4 relative">
              <label className="text-white block mb-1">Guests</label>

              <div
                className="border border-white px-3 py-2 text-white flex justify-between cursor-pointer"
                onClick={() => setGuestOpen(!guestOpen)}
              >
                {adult} Adult, {children} Child
                <BiChevronDown />
              </div>

              {guestOpen && (
                <div className="absolute z-50 w-full bg-white dark:bg-lightBlack p-3 space-y-3 shadow-lg">

                  <div className="flex justify-between">
                    <span>Adults</span>
                    <div className="flex gap-2">
                      <button
                        className="bg-[#006600] text-white w-6 h-6"
                        onClick={() => setAdult((v) => Math.max(1, v - 1))}
                      >
                        -
                      </button>
                      <span>{adult}</span>
                      <button
                        className="bg-[#006600] text-white w-6 h-6"
                        onClick={() => setAdult(adult + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span>Children</span>
                    <div className="flex gap-2">
                      <button
                        className="bg-[#006600] text-white w-6 h-6"
                        onClick={() => setChildren((v) => Math.max(0, v - 1))}
                      >
                        -
                      </button>
                      <span>{children}</span>
                      <button
                        className="bg-[#006600] text-white w-6 h-6"
                        onClick={() => setChildren(children + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Rooms */}
            <div ref={roomRef} className="mb-4 relative">
              <label className="text-white block mb-1">Rooms</label>

              <div
                className="border border-white px-3 py-2 text-white flex justify-between cursor-pointer"
                onClick={() => setRoomOpen(!roomOpen)}
              >
                {room} Room{room > 1 ? "s" : ""}
                <BiChevronDown />
              </div>

              {roomOpen && (
                <div className="absolute z-50 w-full bg-white dark:bg-lightBlack p-3 space-y-3 shadow-lg">
                  <div className="flex justify-between">
                    <span>Rooms</span>
                    <div className="flex gap-2">
                      <button
                        className="bg-[#006600] text-white w-6 h-6"
                        onClick={() => setRoom((v) => Math.max(1, v - 1))}
                      >
                        -
                      </button>
                      <span>{room}</span>
                      <button
                        className="bg-[#006600] text-white w-6 h-6"
                        onClick={() => setRoom(room + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Submit Button */}
            <button
              onClick={checkRoomAvailability}
              className="mt-auto bg-[#006600] text-white py-3 font-semibold hover:bg-[#004d00]"
            >
              Check Availability
            </button>

          </div>

        </div>
      )}

      {!showAvailability && <FloatingSocials />}
      {!showAvailability && <GoToTop />}

    </section>
  );
};

export default RoomDetails2;
