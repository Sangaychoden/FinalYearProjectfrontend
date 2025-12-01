
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
} from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import Swal from "sweetalert2";
import FloatingSocials from "../../Shared/FloatingSocials";
import GoToTop from "../../Shared/GoToTop";
import "./RoomsDatepicker.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";

const RoomDetails2 = () => {
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

  // number of physical rooms user wants
  const [room, setRoom] = useState(1);

  // total adults + children (booking-level)
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);

  const [guestOpen, setGuestOpen] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);

  const [showInOverlay, setShowInOverlay] = useState(false);
  const [showOutOverlay, setShowOutOverlay] = useState(false);

  const [mealPlan, setMealPlan] = useState("ep");
  // default occupancyType used as initial selection when only 1 room
  const [occupancyType, setOccupancyType] = useState("double");
const PLANS = [
  { label: "European Plan (EP)", key: "ep" },
  { label: "Continental Plan (CP)", key: "cp" },
  { label: "Modified American Plan (MAP)", key: "map" },
  { label: "American Plan (AP)", key: "ap" },
];

  // per-room occupancy array (length == room), values "single" | "double"
  const [occupancyPerRoom, setOccupancyPerRoom] = useState(
    Array.from({ length: 1 }, () => "double")
  );

  // per-booking children ages array (global)
  const [childrenAges, setChildrenAges] = useState([]);

  const [extraOptionsVisible, setExtraOptionsVisible] = useState(false);
  const [extraBed, setExtraBed] = useState(false);

  const BTN_PER_USD = 85.49;
  const priceUSD = roomData?.price
    ? (roomData.price / BTN_PER_USD).toFixed(2)
    : null;

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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // initialize/update occupancyPerRoom when 'room' count changes
  useEffect(() => {
    setOccupancyPerRoom((prev) => {
      const next = [...prev];
      if (room > prev.length) {
        // add new rooms default to current occupancyType
        for (let i = prev.length; i < room; i++) next.push(occupancyType || "double");
      } else if (room < prev.length) {
        // trim
        next.length = room;
      }
      return next;
    });
  }, [room, occupancyType]);

  // regenerate childrenAges array when children count changes
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < children; i++) {
      arr.push(childrenAges[i] || "6-11");
    }
    setChildrenAges(arr);
  }, [children]);

  const changeChildAge = (index, value) => {
    const updated = [...childrenAges];
    updated[index] = value;
    setChildrenAges(updated);
  };

  const images = roomData?.images || [];

  const prevBtn = () =>
    setImageIndex((prev) =>
      images.length ? (prev - 1 + images.length) % images.length : 0
    );

  const nextBtn = () =>
    setImageIndex((prev) =>
      images.length ? (prev + 1) % images.length : 0
    );

  const fmt = (d) =>
    d ? d.toLocaleDateString("en-CA") : "";

  const calcNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = checkOut - checkIn;
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  // Get base price for a given occupancy ("single"/"double")
  const getBasePriceForOccupancy = (occ) => {
    if (!roomData?.pricing) return 0;
    return roomData.pricing?.[mealPlan]?.[occ] || 0;
  };

  // extra bed price for a specific occupancy (handles MAP special keys)
  const getExtraBedPriceForOccupancy = (occ) => {
    const pricing = roomData?.pricing;
    if (!pricing?.extraBed) return 0;
    if (mealPlan === "map") {
      return occ === "single"
        ? pricing.extraBed?.mapSingle ?? 0
        : pricing.extraBed?.mapDouble ?? 0;
    }
    return pricing.extraBed?.[mealPlan] ?? 0;
  };

  // child unit price for an age using a specific occupancy (needed for 12+)
  const getChildUnitPriceForAge = (ageGroup, occ) => {
    const childPolicy = roomData?.childPolicy || {};
    if (ageGroup === "1-5") return 0;
    if (ageGroup === "6-11") return childPolicy?.age6to11?.[mealPlan] ?? 0;
    if (ageGroup === "12+") {
      return getBasePriceForOccupancy(occ);
    }
    return 0;
  };

  // compute child cost total per night across all children (we don't assign per-room children,
  // we compute per-child cost using 'double' by default when per-room occupancy not relevant.
  // But better: compute child price per child using the most-common occupancy among rooms.
  const getChildCostPerNight = () => {
    if (!roomData?.childPolicy) return 0;
    if (childrenAges.length === 0) return 0;

    // find most common occupancy to use as default for child pricing for "12+"
    const occCounts = occupancyPerRoom.reduce((acc, o) => {
      acc[o] = (acc[o] || 0) + 1;
      return acc;
    }, {});
    const defaultOcc =
      Object.keys(occCounts).reduce((a, b) => (occCounts[a] >= occCounts[b] ? a : b), "double") ||
      occupancyPerRoom[0] ||
      "double";

    let sum = 0;
    childrenAges.forEach((age) => {
      sum += getChildUnitPriceForAge(age, defaultOcc);
    });
    return sum;
  };

  // meal extras per person per night
  const perPersonMealExtraPerNight = () => {
    if (!roomData?.pricing?.meals) return 0;
    const meals = roomData.pricing.meals;
    let perPerson = 0;
    if (mealPlan === "ep") {
      perPerson =
        (meals.breakfast || 0) * (0) + // breakfast optional — if selected we add later per selection; but in this component we just show base total for default selections OFF
        0;
      // We'll compute meals added when proceeding (BookingDetails handles selection). Here show basic meal cost = 0.
      perPerson = 0;
    } else if (mealPlan === "cp") {
      perPerson = 0; // BF included
    } else if (mealPlan === "map") {
      perPerson = 0; // BF included; optional meals charged in booking details
    } else if (mealPlan === "ap") {
      perPerson = 0; // all included
    }
    return perPerson;
  };

  // total calculation (per-night base rooms + child costs + meal add-ons + extra bed)
  const calcTotal = () => {
    const nights = calcNights();
    if (!nights) return "0.00";

    // Sum base price across rooms (each room counts as 1 physical room)
    const baseSumPerNight = occupancyPerRoom.reduce((sum, occ) => {
      return sum + Number(getBasePriceForOccupancy(occ) || 0);
    }, 0);

    // children cost per night (total)
    const childCostPerNight = getChildCostPerNight();

    // meals cost: we'll approximate that meals selected later; here we show 0 for included plans.
    // the detailed meal add-ons are handled on booking details page (allows toggling).
    const mealsPerNightTotal = 0;

    // extra bed cost per night across rooms (if extraBed checked)
    const extraBedPerNight = extraBed
      ? occupancyPerRoom.reduce((sum, occ) => sum + getExtraBedPriceForOccupancy(occ), 0)
      : 0;

    const total = nights * (baseSumPerNight + childCostPerNight + mealsPerNightTotal + extraBedPerNight);

    return Number(total).toFixed(2);
  };

  const checkRoomAvailability = async () => {
    if (!checkIn || !checkOut) {
      Swal.fire({
        icon: "warning",
        title: "Please select dates",
        background: "#006600",
        color: "#fff",
        confirmButtonColor: "#008000",
      });
      return;
    }

    const nights = calcNights();
    if (nights <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid dates",
        text: "Check-out must be after check-in.",
        background: "#006600",
        color: "#fff",
        confirmButtonColor: "#008000",
      });
      return;
    }

    const roomType = roomData?.roomType;
    const API_URL = import.meta.env.VITE_API_URL;

    const url =
      `${API_URL}/rooms/${roomType}/availability` +
      `?checkIn=${fmt(checkIn)}` +
      `&checkOut=${fmt(checkOut)}` +
      `&adults=${adult}` +
      `&children=${children}` +
      `&roomsRequested=${room}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      const roomsAvailable = data.room?.availableRooms ?? 0;

      if (!roomsAvailable || roomsAvailable <= 0) {
        Swal.fire({
          title: "Room Not Available",
          icon: "warning",
          html: `<p style="font-size:16px;">${data.message || "No rooms available"}</p>`,
          background: "#006600",
          color: "#fff",
          confirmButtonColor: "#008000",
        });
        return;
      }

      if (!extraOptionsVisible) {
        setExtraOptionsVisible(true);
        Swal.fire({
          title: "Room Available",
          icon: "success",
          html: `<p>${roomsAvailable} room(s) available.<br/>Add meal plan & occupancy.</p>`,
          background: "#006600",
          color: "#fff",
          confirmButtonColor: "#008000",
        });
        return;
      }

      // If extra options visible, confirm and proceed
      Swal.fire({
        title: "Room Available",
        icon: "success",
        html: `<p>${roomsAvailable} room(s) available.<br/>Total: Nu. ${calcTotal()}<br/>Proceed?</p>`,
        showCancelButton: true,
        confirmButtonColor: "#008000",
        cancelButtonColor: "#d33",
        background: "#006600",
        color: "#fff",
      }).then((result) => {
        if (result.isConfirmed) {
          // Build roomSelection array grouped by occupancy type
          const occCounts = occupancyPerRoom.reduce((acc, occ) => {
            acc[occ] = (acc[occ] || 0) + 1;
            return acc;
          }, {});

          // Distribute adults roughly evenly across rooms for payload
          // This is a naive distribution: ceil(adults / room) for first rooms until remainder satisfied
          const adultsPerRoomBase = Math.floor(adult / room);
          let extraAdultsRemainder = adult % room;

          const roomSelection = Object.keys(occCounts).map((occ) => {
            const count = occCounts[occ];
            // For adults we sum up adults for these rooms by distributing sequentially.
            // Simpler: approximate adults per room type = Math.ceil(adult * (count/room))
            const approxAdults = Math.max(1, Math.round((adult * (count / room)) || 1));
            return {
              roomType,
              roomsRequested: count,
              occupancyType: occ,
              mealPlan,
              adults: approxAdults,
              childrenAges, // send booking-level childrenAges; backend can handle
              extraBed: extraBed && (
                // Per earlier rule: MAP shows for both single and double; others only if occ === 'double'
                (mealPlan === "map" ? true : occ === "double")
              ),
            };
          });

          navigate("/booking_details", {
            state: {
              checkIn,
              checkOut,
              room, // number of rooms
              adult,
              children,
              childrenAges,
              mealPlan,
              occupancyType: occupancyPerRoom, 
              occupancyPerRoom,
              roomData,
              nights,
              totalAmount: calcTotal(),
              roomSelection,
              extraBed,
            },
          });
        }
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Server error",
        background: "#006600",
        color: "#fff",
        confirmButtonColor: "#008000",
      });
    }
  };

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

  // Helper: whether extra-bed should be shown/enabled in UI
  const shouldShowExtraBedOption = () => {
    if (mealPlan === "map") return true;
    // show if any selected occupancy is double
    return occupancyPerRoom.some((o) => o === "double");
  };

  return (
    <section>
      <BreadCrumb title="room details" />

      {/* MAIN CONTENT */}
      <div className="py-10 md:py-0 pb-0 md:pb-[120px] lg:py-[80px] dark:bg-lightBlack">
        <div className="Container grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5">
          {/* LEFT */}
          <div className="col-span-6 md:col-span-4">
            {/* IMAGES */}
            <div className="overflow-hidden relative group">
              <img
                src={images[imageIndex] || "/images/home/room1.jpeg"}
                alt={roomData.roomType}
                className="transition-all duration-500 w-full h-[400px] object-cover"
              />

              <span
                className="w-[40px] h-[40px] bg-white dark:bg-lightBlack hover:bg-[#006600] absolute left-[-50px] bottom-[45%] group-hover:left-4 transition-all duration-300 grid place-items-center cursor-pointer"
                onClick={prevBtn}
              >
                <BsArrowLeft size={20} className="text-lightBlack dark:text-white" />
              </span>

              <span
                className="w-[40px] h-[40px] bg-white dark:bg-lightBlack hover:bg-[#006600] absolute right-[-50px] bottom-[45%] group-hover:right-4 transition-all duration-300 grid place-items-center cursor-pointer"
                onClick={nextBtn}
              >
                <BsArrowRight size={20} className="text-lightBlack dark:text-white" />
              </span>
            </div>

            {/* DETAILS */}
            <div className="pt-5 lg:pt-[35px] pr-3">

              <h2 className="text-2xl lg:text-4xl mb-4 font-semibold text-lightBlack dark:text-white">
                {roomData.roomType}
              </h2>

              <p className="text-sm text-[#808080] dark:text-[#D9D9D9]">
                {roomData.roomDetails}
              </p>

              {/* MEAL PLAN SECTION */}
              <div className="pt-10">
                <h2 className="text-2xl lg:text-3xl font-semibold pb-2 dark:text-white">
                  Meal Plan Details
                </h2>
               <ul className="text-[#808080] text-sm space-y-3 leading-relaxed">
                <li>
                  <strong>European Plan (EP)</strong> – Room Only. No meals included. Guests may order meals separately as per restaurant menu.
                </li>

                <li>
                  <strong>Continental Plan (CP)</strong> – Room + Breakfast. Includes morning breakfast only. Lunch and dinner can be purchased separately.
                </li>

                <li>
                  <strong>Modified American Plan (MAP)</strong> – Room + Breakfast + Dinner/Lunch. Includes two meals daily: breakfast and either lunch or dinner.
                </li>

                <li>
                  <strong>American Plan (AP)</strong> – Room + All Meals. Includes breakfast, lunch, and dinner throughout the stay.
                </li>
              </ul>
              </div>

              {/* PRICE TABLE */}
              <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-3 dark:text-white">
                  Meal Plan Pricing
                </h3>
                  <table className="w-full border">
                  <thead className="bg-[#006600] text-white">
                    <tr>
                      <th className="px-4 py-3">Plan</th>
                      <th className="px-4 py-3">Single</th>
                      <th className="px-4 py-3">Double</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    {PLANS.map((plan) => (
                      <tr key={plan.key} className="border-b">
                        <td className="px-4 py-3 uppercase font-bold">{plan.label}</td>

                        <td className="px-4 py-3">
                          {roomData.pricing?.[plan.key]?.single ?? "-"}

                          {/* {room.pricing?.[plan.key]?.single ?? "-"} */}
                        </td>

                        <td className="px-4 py-3">
                          {roomData.pricing?.[plan.key]?.double ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

              {/* FEATURES */}
              <div className="pt-10">
                <h2 className="pb-3 text-2xl font-semibold dark:text-white">
                  Room Features
                </h2>
                <ul className="space-y-2 dark:text-[#D9D9D9]">
                  {roomData.roomFeatures?.split(",").map((f, i) => (
                    <li key={i} className="flex items-center">
                      <BsCheck2 className="text-[#006600] mr-2" />
                      {f.trim()}
                    </li>
                  ))}
                </ul>
              </div>

              {/* BATHROOM AMENITIES */}
              <div className="pt-10">
                <h2 className="pb-3 text-2xl font-semibold dark:text-white">
                  Bathroom Amenities
                </h2>
                <ul className="space-y-2 dark:text-[#D9D9D9]">
                  {roomData.bathroomAmenities?.split(",").map((b, i) => (
                    <li key={i} className="flex items-center">
                      <BsCheck2 className="text-[#006600] mr-2" />
                      {b.trim()}
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

              <div className="space-y-5 dark:text-[#D9D9D9]">
             

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

      {/* SLIDEOUT BOOKING */}
      {showAvailability && (
        <div className="fixed top-0 right-0 w-full md:w-[420px] h-full bg-black dark:bg-lightBlack shadow-xl z-[1000] transition duration-500">
          <div className="p-6 h-full flex flex-col relative">
            <button
              className="absolute top-2 right-4 text-white text-4xl"
              onClick={() => {
                setShowAvailability(false);
                setExtraOptionsVisible(false);
              }}
            >
              ×
            </button>

            {/* IF EXTRA OPTIONS NOT VISIBLE */}
            {!extraOptionsVisible && (
              <>
                <div className="grid gap-4 mt-10 mb-6">

                  {/* CHECK-IN */}
                  <div>
                    <label className="text-white block mb-1">Check-in</label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowInOverlay(true);
                        setShowOutOverlay(false);
                      }}
                      className="w-full border border-white bg-black text-white px-3 py-2 flex items-center justify-between"
                    >
                      <span>{checkIn ? fmt(checkIn) : "dd-mm-yyyy"}</span>
                      <FiCalendar className="text-white opacity-80" size={18} />
                    </button>
                  </div>

                  {/* CHECK-OUT */}
                  <div>
                    <label className="text-white block mb-1">Check-out</label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowOutOverlay(true);
                        setShowInOverlay(false);
                      }}
                      className="w-full border border-white bg-black text-white px-3 py-2 flex items-center justify-between"
                    >
                      <span>{checkOut ? fmt(checkOut) : "dd-mm-yyyy"}</span>
                      <FiCalendar className="text-white opacity-80" size={18} />
                    </button>
                  </div>
                </div>

                {/* GUESTS */}
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
                    <div className="absolute z-50 w-full bg-white p-3 space-y-3 shadow-lg">
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

                {/* ROOMS */}
                <div ref={roomRef} className="mb-4 relative">
                  <label className="text-white block mb-1">Rooms</label>

                  <div
                    className="border border-white px-3 py-2 text-white flex justify-between cursor-pointer"
                    onClick={() => setRoomOpen(!roomOpen)}
                  >
                    {room} Room{room > 1 ? "s" : ""} <BiChevronDown />
                  </div>

                  {roomOpen && (
                    <div className="absolute z-50 w-full bg-white p-3 space-y-3 shadow-lg">
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
              </>
            )}

            {/* CHILD AGE (when extra options visible) */}
            {extraOptionsVisible && children > 0 && (
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2">Children Ages</h4>
                {childrenAges.map((age, index) => (
                  <div key={index} className="flex justify-between items-center mb-2 text-white">
                    <span>Child {index + 1}</span>
                    <select
                      value={age}
                      onChange={(e) => changeChildAge(index, e.target.value)}
                      className="border border-white bg-black text-white px-3 py-2 text-sm"
                    >
                      <option value="1-5">1–5 (Free)</option>
                      <option value="6-11">6–11 (Child Rate)</option>
                      <option value="12+">12+ (Adult)</option>
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* MEAL PLAN */}
            {extraOptionsVisible && (
              <div className="mb-4">
                <label className="text-white block mb-1">Meal Plan</label>
                <select
                  value={mealPlan}
                  onChange={(e) => setMealPlan(e.target.value)}
                  className="w-full border border-white bg-black text-white px-3 py-2"
                >
                  <option value="ep">EP</option>
                  <option value="cp">CP</option>
                  <option value="map">MAP</option>
                  <option value="ap">AP</option>
                </select>
              </div>
            )}

            {/* OCCUPANCY */}
            {extraOptionsVisible && (
              <div className="mb-4">
                <label className="text-white block mb-1">Occupancy per Room</label>

                <div className="space-y-2">
                  {occupancyPerRoom.map((occ, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="text-white">Room {idx + 1}</div>
                      <select
                        value={occ}
                        onChange={(e) => {
                          const updated = [...occupancyPerRoom];
                          updated[idx] = e.target.value;
                          setOccupancyPerRoom(updated);
                        }}
                        className="border border-white bg-black text-white px-3 py-2"
                      >
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* TOTAL */}
            {extraOptionsVisible && (
              <div className="mt-2 mb-4 border-t border-gray-700 pt-4 flex justify-between text-white">
                <span className="font-semibold">Total Amount</span>
                <span className="text-lg font-bold">
                  Nu. {calcTotal()}
                </span>
              </div>
            )}

            <button
              onClick={checkRoomAvailability}
              className="mt-auto bg-[#006600] text-white py-3 font-semibold hover:bg-[#004d00]"
            >
              {extraOptionsVisible ? "Proceed to Booking" : "Check Availability"}
            </button>
          </div>
        </div>
      )}

      {/* DATE PICKER OVERLAY */}
      {(showInOverlay || showOutOverlay) && (
        <div
          className="fixed inset-0 z-[9999] bg-black/20 flex items-center justify-center px-4"
          onClick={() => {
            setShowInOverlay(false);
            setShowOutOverlay(false);
          }}
        >
          <div
            className="bg-white text-black shadow-2xl max-w-[560px] w-full overflow-visible"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold">
                {showInOverlay ? "Select Check-in" : "Select Check-out"}
              </h3>

              <button
                onClick={() => {
                  setShowInOverlay(false);
                  setShowOutOverlay(false);
                }}
                className="px-3 py-1.5 border border-[#D1D5DB] hover:bg-gray-50 text-sm"
              >
                Close
              </button>
            </div>

            {/* CALENDAR */}
            <div className="p-3 md:p-5">
              <ReactDatePicker
                inline
                monthsShown={1}
                calendarClassName="rdp-pill"

                selected={showInOverlay ? checkIn : checkOut}
                minDate={showInOverlay ? new Date() : checkIn || new Date()}

                onChange={(date) => {
                  if (showInOverlay) {
                    setCheckIn(date);
                    if (checkOut && date && checkOut < date) setCheckOut(null);
                    setShowInOverlay(false);
                  } else {
                    setCheckOut(date);
                    setShowOutOverlay(false);
                  }
                }}

                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className="flex items-center justify-between px-3 py-2">

                    {/* Month + Year Dropdown */}
                    <div className="flex items-center space-x-2">
                      {/* MONTH SELECT */}
                      <select
                        value={date.getMonth()}
                        onChange={({ target: { value } }) =>
                          changeMonth(Number(value))
                        }
                        className="border px-2 py-1 text-sm border-[#9CA3AF]"
                      >
                        {Array.from({ length: 12 }).map((_, i) => (
                          <option key={i} value={i}>
                            {new Date(0, i).toLocaleString("default", {
                              month: "long",
                            })}
                          </option>
                        ))}
                      </select>

                      {/* YEAR SELECT */}
                      <select
                        value={date.getFullYear()}
                        onChange={({ target: { value } }) =>
                          changeYear(Number(value))
                        }
                        className="border px-2 py-1 text-sm border-[#9CA3AF]"
                      >
                        {Array.from({ length: 11 }, (_, i) => {
                          const year =
                            new Date().getFullYear() + i;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* NAVIGATION */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        className="px-2 py-1 border border-[#9CA3AF] text-[#1F1F1F]"
                      >
                        ▲
                      </button>
                      <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        className="px-2 py-1 border border-[#9CA3AF] text-[#1F1F1F]"
                      >
                        ▼
                      </button>
                    </div>

                  </div>
                )}
              />
            </div>
          </div>
        </div>
      )}

      {!showAvailability && <FloatingSocials />}
      {!showAvailability && <GoToTop />}
    </section>
  );
};

export default RoomDetails2;
