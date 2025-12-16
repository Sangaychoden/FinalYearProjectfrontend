
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft, BsArrowRight, BsCheck2 } from "react-icons/bs";
import {
  FaDollarSign,
  FaVectorSquare,
  FaUserFriends,
  FaBed,
} from "react-icons/fa";

import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import ReactDatePicker from "react-datepicker";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

const RoomDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
const PLANS = [
  { label: "European Plan (EP)", key: "ep" },
  { label: "Continental Plan (CP)", key: "cp" },
  { label: "Modified American Plan (MAP)", key: "map" },
  { label: "American Plan (AP)", key: "ap" },
];

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

  const [mealPlan, setMealPlan] = useState("ep");
  const [childrenAges, setChildrenAges] = useState([]);

  // ⭐ UPDATED: allow multi-occupancy
  const [occupancyType, setOccupancyType] = useState(["double"]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (room) return;
      if (!id) return;

      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const response = await fetch(`${API_URL}/rooms/${id}`);
        const data = await response.json();

        if (data.room) setRoom(data.room);
        else if (data.rooms?.length > 0) setRoom(data.rooms[0]);
      } catch (error) {
        console.error("Error fetching room:", error);
      }
    };

    fetchRoomDetails();
  }, [id, room]);
/** ⭐ Keep occupancy array in sync with roomCount */
useEffect(() => {
  setOccupancyType((prev) => {
    const updated = [...prev];

    // Expand array if needed
    while (updated.length < roomCount) {
      updated.push(updated[0] || "double");
    }

    // Trim extra
    return updated.slice(0, roomCount);
  });
}, [roomCount]);

  /** ⭐ When children count changes → regenerate dropdowns */
  // useEffect(() => {
  //   const arr = [];
  //   for (let i = 0; i < children; i++) {
  //     arr.push("6-11");
  //   }
  //   setChildrenAges(arr);
  // }, [children]);
  useEffect(() => {
  const arr = [];
  for (let i = 0; i < children; i++) {
    arr.push(childrenAges[i] || "6-11");
  }
  setChildrenAges(arr);
}, [children]);


  // const changeChildAge = (index, value) => {
  //   const updated = [...childrenAges];
  //   updated[index] = value;
  //   setChildrenAges(updated);
  // };
  const changeChildAge = (index, value) => {
  const oldValue = childrenAges[index];

  const updated = [...childrenAges];
  updated[index] = value;
  setChildrenAges(updated);

  // 🔥 If changed TO 12+ → move child → adult
  if (value === "12+" && oldValue !== "12+") {
    setAdult((prev) => prev + 1);
    setChildren((prev) => Math.max(0, prev - 1));
    return;
  }

  // 🔥 If changed FROM 12+ → revert adult → child
  if (oldValue === "12+" && value !== "12+") {
    setAdult((prev) => Math.max(1, prev - 1));
    setChildren((prev) => prev + 1);
  }
};


  const images = room?.images?.length
    ? room.images
    : ["/images/inner/room1.jpeg", "/images/inner/room2.jpeg"];

  const prevBtn = () =>
    setImageIndex((p) => (p - 1 + images.length) % images.length);

  const nextBtn = () =>
    setImageIndex((p) => (p + 1) % images.length);

  const calcNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = checkOut - checkIn;
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  /** ⭐ Meal plan price per night (single value only, not per room occupancy) */
  const getMealPlanPrice = () => {
    if (!room?.pricing) return 0;

    // If multiple rooms → use occupancy of first room for now
    const occ = Array.isArray(occupancyType)
      ? occupancyType[0] || "double"
      : occupancyType;

    return room.pricing[mealPlan]?.[occ] ?? 0;
  };

  const calcTotal = () => {
    const nights = calcNights();
    const price = getMealPlanPrice();
    return (nights * roomCount * price).toFixed(2);
  };
  // FIX: Convert 12+ children to adults
const realAdultCount = adult + childrenAges.filter(a => a === "12+").length;

// Only keep real children for pricing
const filteredChildrenAges = childrenAges.filter(a => a !== "12+");

// Children count updated
const realChildrenCount = filteredChildrenAges.length;


  const confirmBooking = () => {
    Swal.fire({
      title: "Room is available!",
      html: `<p style="color:#d3ffd3; font-size:16px;">Proceed to booking?</p>`,
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
        // navigate("/booking_details", {
        //   state: {
        //     roomData: room,
        //     checkIn,
        //     checkOut,
        //     adult,
        //     children,
        //     room: roomCount,
        //     nights: calcNights(),
        //     totalAmount: calcTotal(),
        //     mealPlan,
        //     occupancyType: occupancyType,
        //     childrenAges,
        //   },
        // });
        navigate("/booking_details", {
  state: {
    roomData: room,
    checkIn,
    checkOut,

    adult: realAdultCount,
    children: realChildrenCount,
    childrenAges: filteredChildrenAges,

    room: roomCount,
    nights: calcNights(),
    totalAmount: calcTotal(),
    mealPlan,
    occupancyType: occupancyType,
  },
});
      }
    });
  };

  if (!room) {
    return (
      <div className="py-40 text-center text-xl text-gray-600 dark:text-lightGray">
        Loading...
      </div>
    );
  }

  return (
    <section>
      <BreadCrumb title="ROOM DETAILS" home="/" />

      <div className="py-10 md:py-0 pb-0 md:pb-[120px] lg:py-[80px] dark:bg-black">
        <div className="Container grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5">

          {/* LEFT SIDE */}
          <div className="col-span-6 md:col-span-4">
            <div className="overflow-hidden relative group">
              <img
                src={images[imageIndex]}
                className="w-full h-[400px] object-cover"
              />

              <span
                onClick={prevBtn}
                className="absolute left-[-50px] bottom-[45%] group-hover:left-4 bg-white w-[40px] h-[40px] grid place-items-center cursor-pointer"
              >
                <BsArrowLeft size={20} />
              </span>

              <span
                onClick={nextBtn}
                className="absolute right-[-50px] bottom-[45%] group-hover:right-4 bg-white w-[40px] h-[40px] grid place-items-center cursor-pointer"
              >
                <BsArrowRight size={20} />
              </span>
            </div>

            <div className="pt-5 lg:pt-[35px] pr-3">
              <h2 className="text-2xl lg:text-3xl font-semibold mb-3 dark:text-white">
                {room.roomType}
              </h2>
              <p className="text-md text-[#666666] dark:text-[#D9D9D9]">
                {room.roomDetails}
              </p>
              
<div className="pt-5">
  <h2 className="text-2xl lg:text-2xl font-semibold mb-3 dark:text-white ">
    Meal Plan Details
  </h2>

  <ul className="space-y-4">

    <li className="p-4 border border-[#777777] shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800">
      <span className="font-semibold text-[#333333]">European Plan (EP):</span>
      <p className="text-[#555555] mt-1">
        Room Only. No meals included. Guests may order meals separately as per restaurant menu.
      </p>
      <p className="text-sm font- mt-2 text-[#777777] italic dark:text-gray-300">
        Extra room option: Exclusively for double-occupancy rooms.
      </p>
    </li>

    <li className="p-4 border border-[#777777] shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800">
      <span className="font-semibold text-[#333333]">Continental Plan (CP):</span>
      <p className="text-[#555555] mt-1">
        Room + Breakfast. Includes morning breakfast only. Lunch and dinner can be purchased separately.
      </p>
      <p className="text-sm font- mt-2 text-[#777777] italic dark:text-gray-300">
        Extra room option: Exclusively for double-occupancy rooms.
      </p>
    </li>

    <li className="p-4 border border-[#777777] shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800">
      <span className="font-semibold text-[#333333]">Modified American Plan (MAP):</span>
      <p className="text-[#555555] mt-1">
        Room + Breakfast + Dinner/Lunch. Includes two meals daily: breakfast and either lunch or dinner.
      </p>
      <p className="text-sm font- mt-2 text-[#777777] italic dark:text-gray-300">
        Extra room option: Available for single-occupancy and double-occupancy rooms.
      </p>
    </li>

    <li className="p-4 border border-[#777777] shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800">
      <span className="font-semibold text-[#333333]">American Plan (AP):</span>
      <p className="text-[#555555] mt-1">
        Room + All Meals. Includes breakfast, lunch, and dinner throughout the stay.
      </p>
      <p className="text-sm font- mt-2 text-[#777777] italic dark:text-gray-300">
        Extra room option: Exclusively for double-occupancy rooms.
      </p>
    </li>

  </ul>
</div>




              {/* MEAL PLAN TABLE */}
              <div className="mt-5">
                <h3 className="text-2xl font-semibold mb-3 dark:text-white">
                  Meal Plan Pricing
                </h3>

                  <table className="w-full border border-[#666666] dark:border-[#777777]">
                  <thead className="bg-[#006600] text-white text-md">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-left text-md">Plan</th>
                      <th className="px-4 py-3 font-semibold text-md">Single</th>
                      <th className="px-4 py-3 font-semibold text-md">Double</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    {PLANS.map((plan) => (
                      <tr key={plan.key} className="border-b dark:border-[#777777]">
                        <td className="px-4 py-3 uppercase text-md font-semibold text-[#333333] dark:text-[#D9D9D9]">{plan.label}</td>

                        <td className="px-4 py-3 text-[#4B4B4B] text-md dark:text-[#D9D9D9]">
                          {room.pricing?.[plan.key]?.single ?? "-"}
                        </td>

                        <td className="px-4 py-3 text-[#4B4B4B] text-md dark:text-[#D9D9D9]">
                          {room.pricing?.[plan.key]?.double ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

{/* ROOM FEATURES */}
<div className="pt-5">
  <h2 className="mb-3 text-2xl font-semibold dark:text-white">
    Room Features
  </h2>
  <ul className="space-y-2 text-[#4B4B4B] dark:text-[#D9D9D9] text-md">
    {room.roomFeatures
      ?.split(",")
      .map((f) => f.trim())
      .filter(Boolean)
      .map((f, i) => (
        <li key={i} className="flex items-center">
          <BsCheck2 className="text-[#006600] mr-1 text-sm" />
          {f}
        </li>
      ))}
  </ul>
</div>

{/* BATHROOM AMENITIES */}
<div className="pt-5 pb-3">
  <h2 className="pb-3 text-2xl font-semibold dark:text-white text-md">
    Bathroom Amenities
  </h2>
  <ul className="space-y-2 text-[#4B4B4B] dark:text-[#D9D9D9]">
    {room.bathroomAmenities
      ?.split(",")
      .map((b) => b.trim())
      .filter(Boolean)
      .map((b, i) => (
        <li key={i} className="flex items-center">
          <BsCheck2 className="text-[#006600] mr-1 text-sm" />
          {b}
        </li>
      ))}
  </ul>
</div>


            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2 lg:px-3 ">
            <div className="bg-[#F5F5F5] px-7 py-5 ">
              <h4 className="text-2xl lg:pb-3 font-semibold dark:text-black mb-3">
                Booking
              </h4>

              {/* Dates */}
<div className="flex flex-col gap-4">
  <div className="flex items-center justify-between">
    <label className="w-24">Check-in</label>
    <ReactDatePicker
      selected={checkIn}
      onChange={(d) => {
        setCheckIn(d);
        if (checkOut < d) setCheckOut(null);
      }}
      className="border px-3 py-2 w-full"
      minDate={new Date()}
    />
  </div>

  <div className="flex items-center justify-between">
    <label className="w-24">Check-out</label>
    <ReactDatePicker
      selected={checkOut}
      onChange={(d) => setCheckOut(d)}
      className="border px-3 py-2 w-full"
      minDate={checkIn}
    />
  </div>
</div>


              {/* Adult / Children / Rooms */}
              <div className="mt-6 space-y-4">
                {[
                  { lbl: "Adults", val: adult, set: setAdult, min: 1 },
                  { lbl: "Children", val: children, set: setChildren, min: 0 },
                  { lbl: "Rooms", val: roomCount, set: setRoomCount, min: 1 },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{r.lbl}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => r.set(Math.max(r.min, r.val - 1))}
                        className="px-3 py-1 bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 bg-white border">
                        {r.val}
                      </span>
                      <button
                        onClick={() => r.set(r.val + 1)}
                        className="px-3 py-1 bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ⭐ CHILD AGE DROPDOWNS */}
              {children > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Children Ages</h4>

                  {childrenAges.map((age, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>Child {index + 1}</span>
                      <select
                        value={age}
                        onChange={(e) => changeChildAge(index, e.target.value)}
                        className="border px-3 py-2"
                      >
                        <option value="1-5">1–5 (Free)</option>
                        <option value="6-11">6–11</option>
                        <option value="12+">12+ (Adult)</option>
                      </select>
                    </div>
                  ))}
                </div>
              )}

              {/* Meal Plan Dropdown */}
              <div className="mt-4">
                <label>Meal Plan</label>
                <select
                  value={mealPlan}
                  onChange={(e) => setMealPlan(e.target.value)}
                  className="border w-full px-3 py-2 mt-3"
                >
                  <option value="ep">EP</option>
                  <option value="cp">CP</option>
                  <option value="map">MAP</option>
                  <option value="ap">AP</option>
                </select>
              </div>

              {/* ⭐ UPDATED OCCUPANCY DROPDOWNS */}
              <div className="mt-4">
                <label>Occupancy Type</label>

                {roomCount === 1 ? (
                  <select
                    value={occupancyType[0] || "double"}
                    onChange={(e) => setOccupancyType([e.target.value])}
                    className="border w-full px-3 py-2 mt-3"
                  >
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                  </select>
                ) : (
                  <div className="space-y-2 mt-2">
                    {Array.from({ length: roomCount }).map((_, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span>Room {index + 1}</span>
                        <select
                          value={occupancyType[index] || "double"}
                          onChange={(e) => {
                            const updated = [...occupancyType];
                            updated[index] = e.target.value;
                            setOccupancyType(updated);
                          }}
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

              {/* Total */}
              <div className="mt-8 border-t border-[#999999] pt-6 flex justify-between">
                <span className="font-semibold">Total Amount</span>
                <span className="text-xl font-bold">Nu. {calcTotal()}</span>
              </div>

              <button
                onClick={confirmBooking}
                className="bg-[#006600] hover:bg-black text-white w-full h-11 mt-6 mb-4 font-semibold"
              >
                Proceed to Booking
              </button>
            </div>

            {/* QUICK INFO */}
            <div className="mt-6 mb-8">
              <h4 className="text-2xl lg:pb-2 font-semibold dark:text-white mb-4">
                Room Details
              </h4>

              <div className="space-y-5 text-[#333333] dark:text-[#D9D9D9]">

                <div className="flex items-center border-b border-[#999999] pb-4">
                  <FaVectorSquare className="text-[#006600] mr-3" />
                  {room.size} m²
                </div>

                <div className="flex items-center border-b border-[#999999] pb-4">
                  <FaUserFriends className="text-[#006600] mr-3" />
                  {room.occupancy} max
                </div>

                <div className="flex items-center pb-2">
                  <FaBed className="text-[#006600] mr-3" />
                  {room.beds} Beds
                </div>
              </div>            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
