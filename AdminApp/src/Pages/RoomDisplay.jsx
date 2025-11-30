
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { BsArrowLeft, BsArrowRight, BsCheck2 } from "react-icons/bs";
// import {
//   FaDollarSign,
//   FaVectorSquare,
//   FaUserFriends,
//   FaBed,
//   FaWater,
// } from "react-icons/fa";
// import Swal from "sweetalert2";
// import "react-datepicker/dist/react-datepicker.css";

// const RoomDisplay = () => {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const [room, setRoom] = useState(null);
//   const [imageIndex, setImageIndex] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const API_URL = import.meta.env.VITE_API_URL;
//   const BTN_PER_USD = 85.49;

//   // ✅ Fetch Room Details
//   useEffect(() => {
//     const fetchRoomDetails = async () => {
//       try {
//         const response = await fetch(`${API_URL}/rooms/rooms`);
//         const data = await response.json();

//         if (response.ok && data.rooms) {
//           const foundRoom = data.rooms.find((r) => r._id === roomId);
//           setRoom(foundRoom || null);
//         } else {
//           console.error("Failed to fetch room details:", data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching room details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoomDetails();
//   }, [API_URL, roomId]);

//   const prevBtn = () => {
//     if (!room?.images?.length) return;
//     setImageIndex(
//       (prev) => (prev - 1 + room.images.length) % room.images.length
//     );
//   };

//   const nextBtn = () => {
//     if (!room?.images?.length) return;
//     setImageIndex((prev) => (prev + 1) % room.images.length);
//   };

//   const handleEdit = () => {
//     if (room && room._id) {
//       navigate(`/edit-room/${room._id}`, { state: { room } });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Room ID missing",
//         text: "Unable to navigate to the edit page. Please try again.",
//       confirmButtonColor: "#008000",
//       color: "#fff",
//       background: "#006600",            }).then(() => {
//       });
//     }
//   };

//   // ✅ Handle Delete Room
//   const handleDelete = async () => {
//     Swal.fire({
//       title: "Confirm Delete",
//       html: `<p style="color:#d3ffd3; font-size:16px;">Do you want to delete this room?</p>`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#008000",
//       confirmButtonText: "Yes",
//       color: "#fff",
//       background: "#006600",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const response = await fetch(`${API_URL}/rooms/rooms/${roomId}`, {
//             method: "DELETE",
//             credentials: "include",
//           });

//           if (response.ok) {
//             Swal.fire({
//               icon: "success",
//               title: "Deleted!",
//               text: "Room has been deleted successfully.",
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#008000",
//       color: "#fff",
//       background: "#006600",            }).then(() => {
//               navigate("/admin-rooms"); // Redirect to room list or any page
//             });
//           } else {
//             const errorData = await response.json();
//             Swal.fire({
//               icon: "error",
//               title: "Error",
//               text: errorData.message || "Failed to delete the room.",
//       confirmButtonColor: "#008000",
//       color: "#fff",
//       background: "#006600",            }).then(() => {
//             });
//           }
//         } catch (error) {
//           Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "Something went wrong while deleting the room.",
//       confirmButtonColor: "#008000",
//       color: "#fff",
//       background: "#006600",            }).then(() => {
//           });
//           console.error("Delete error:", error);
//         }
//       }
//     });
//   };

//   const setAlert = () => {
//     Swal.fire({
//       html: `<p style="color:#d3ffd3; font-size:16px;">Do you want to proceed to booking details?</p>`,
//       title: "Room is available!",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#008000",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes",
//       color: "#fff",
//       iconColor: "#fff",
//       background: "#006600",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate(`/booking/${roomId}`);
//       }
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-lg text-gray-600">
//         Loading room details...
//       </div>
//     );
//   }

//   if (!room) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen text-gray-600">
//         <p className="text-lg">Room not found.</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="mt-4 px-4 py-2 bg-[#006600] text-white  hover:bg-green-700 transition"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const usdPrice = (room.price / BTN_PER_USD).toFixed(2);

//   // ✅ Normalize features and amenities
//   const normalizedFeatures = Array.isArray(room.roomFeatures)
//     ? room.roomFeatures
//     : room.roomFeatures
//     ? room.roomFeatures.split(",").map((f) => f.trim())
//     : [];

//   const normalizedAmenities = Array.isArray(room.bathroomAmenities)
//     ? room.bathroomAmenities
//     : room.bathroomAmenities
//     ? room.bathroomAmenities.split(",").map((a) => a.trim())
//     : [];

//   return (
//     <section>
//       <div className="py-0 px-2 bg-white text-black">
//         {/* Header */}
//         <div className="flex justify-between items-center max-w-8xl mx-auto mb-6 px-4 md:px-0">
//           <h1 className="text-2xl font-bold">Room Details</h1>

//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 hover:bg-gray-100 transition"
//           >
//             Back
//           </button>
//         </div>

//         <div className="max-w-8xl grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5">
//           {/* Left Column */}
//           <div className="col-span-6 md:col-span-4">
//             <div className="overflow-hidden relative group">
//               <img
//                 src={room.images?.[imageIndex]}
//                 alt={room.roomType}
//                 className="transition-all duration-500 delay-300 w-full h-[400px] object-cover"
//                 onError={(e) => {
//                   e.target.src =
//                     "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop";
//                 }}
//               />
//               {room.images?.length > 1 && (
//                 <>
//                   <span
//                     className="w-[40px] h-[40px] bg-white hover:bg-[#000000] hover:text-white grid items-center justify-center absolute bottom-[45%] left-[-50px] group-hover:left-4 transition-all duration-300 cursor-pointer"
//                     onClick={prevBtn}
//                   >
//                     <BsArrowLeft size={20} className="text-gray-700" />
//                   </span>
//                   <span
//                     className="w-[40px] h-[40px] bg-white hover:bg-[#000000] hover:text-white grid items-center justify-center absolute bottom-[45%] right-[-50px] group-hover:right-4 transition-all duration-300 cursor-pointer"
//                     onClick={nextBtn}
//                   >
//                     <BsArrowRight size={20} className="text-gray-700 hover:text-white" />
//                   </span>
//                 </>
//               )}
//             </div>

//             <div className="pt-5 lg:pt-[28px] pr-3">
//               <h2 className="py-2 text-2xl text-black font-semibold">
//                 {room.roomType}
//               </h2>
//               <p className="text-l lg:text-l leading-6 text-black font-normal">
//                 {room.roomDetails}
//               </p>

//               {/* Room Features */}
//               <div className="pt-10">
//                 <h2 className="pb-2 text-2xl text-black font-semibold">
//                   Room Features
//                 </h2>
//                 <ul className="space-y-3">
//                   {normalizedFeatures.map((feature, i) => (
//                     <li className="flex items-center text-md text-black" key={i}>
//                       <BsCheck2 size={16} className="text-[#006600] mr-3" />
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Bathroom Amenities */}
//               <div className="pt-10">
//                 <h2 className="pb-2 text-2xl text-black font-semibold">
//                   Bathroom Amenities
//                 </h2>
//                 <ul className="space-y-3">
//                   {normalizedAmenities.map((item, i) => (
//                     <li className="flex items-center text-md text-black" key={i}>
//                       <BsCheck2 size={16} className="text-[#006600] mr-3" />
//                       <span>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="col-span-6 md:col-span-3 lg:col-span-2">
//             <div className="bg-[#F5F5F5] px-7 py-8">
//               <h4 className="text-xl font-semibold pb-4">Room Info</h4>

//               <div className="grid items-center">
//                 <div className="flex items-center py-4 border-b border-gray-300">
//                   <FaDollarSign className="text-[#006600] w-5 h-5 mr-3" />
//                   <span className="text-sm text-gray-700">
//                     ${usdPrice} | Nu {room.price}
//                   </span>
//                 </div>

//                 <div className="flex items-center py-4 border-b border-gray-300">
//                   <FaVectorSquare className="text-[#006600] w-5 h-5 mr-3" />
//                   <span className="text-sm text-gray-700">
//                     {room.size} m²
//                   </span>
//                 </div>

//                 <div className="flex items-center py-4 border-b border-gray-300">
//                   <FaUserFriends className="text-[#006600] w-5 h-5 mr-3" />
//                   <span className="text-sm text-gray-700">
//                     Max {room.occupancy} Guests
//                   </span>
//                 </div>

//                 <div className="flex items-center py-4 border-b border-gray-300">
//                   <FaBed className="text-[#006600] w-5 h-5 mr-3" />
//                   <span className="text-sm text-gray-700">
//                     {room.beds} Beds
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="py-5 flex flex-col gap-3">
//               <button
//                 onClick={handleEdit}
//                 className="bg-[#006600] w-full h-10 text-white hover:bg-green-700 transition"
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={handleDelete}
//                 className="bg-red-600 w-full h-10 text-white hover:bg-red-700 transition"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RoomDisplay;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft, BsArrowRight, BsCheck2 } from "react-icons/bs";
import {
  FaDollarSign,
  FaVectorSquare,
  FaUserFriends,
  FaBed,
} from "react-icons/fa";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

const RoomDisplay = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;
  const BTN_PER_USD = 85.49;

  // ✅ Fetch Room Details
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/rooms/rooms`);
        const data = await response.json();

        if (response.ok && data.rooms) {
          const foundRoom = data.rooms.find((r) => r._id === roomId);
          setRoom(foundRoom || null);
        } else {
          console.error("Failed to fetch room details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching room details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [API_URL, roomId]);

  const prevBtn = () => {
    if (!room?.images?.length) return;
    setImageIndex(
      (prev) => (prev - 1 + room.images.length) % room.images.length
    );
  };

  const nextBtn = () => {
    if (!room?.images?.length) return;
    setImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const handleEdit = () => {
    if (room && room._id) {
      navigate(`/edit-room/${room._id}`, { state: { room } });
    } else {
      Swal.fire({
        icon: "error",
        title: "Room ID missing",
        text: "Unable to navigate to the edit page. Please try again.",
        confirmButtonColor: "#008000",
        color: "#fff",
        background: "#006600",
      });
    }
  };

  // ✅ Handle Delete Room
  const handleDelete = async () => {
    Swal.fire({
      title: "Confirm Delete",
      html: `<p style="color:#d3ffd3; font-size:16px;">Do you want to delete this room?</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#008000",
      confirmButtonText: "Yes",
      color: "#fff",
      background: "#006600",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_URL}/rooms/rooms/${roomId}`, {
            method: "DELETE",
            credentials: "include",
          });

          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Room has been deleted successfully.",
              confirmButtonColor: "#d33",
              cancelButtonColor: "#008000",
              color: "#fff",
              background: "#006600",
            }).then(() => {
              navigate("/admin-rooms");
            });
          } else {
            const errorData = await response.json();
            Swal.fire({
              icon: "error",
              title: "Error",
              text: errorData.message || "Failed to delete the room.",
              confirmButtonColor: "#008000",
              color: "#fff",
              background: "#006600",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong while deleting the room.",
            confirmButtonColor: "#008000",
            color: "#fff",
            background: "#006600",
          });
          console.error("Delete error:", error);
        }
      }
    });
  };

  const setAlert = () => {
    Swal.fire({
      html: `<p style="color:#d3ffd3; font-size:16px;">Do you want to proceed to booking details?</p>`,
      title: "Room is available!",
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
        navigate(`/booking/${roomId}`);
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading room details...
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-600">
        <p className="text-lg">Room not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-[#006600] text-white hover:bg-green-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  // ================= DERIVED VALUES =================
  const usdPrice = (room.price / BTN_PER_USD).toFixed(2);

  // Features & amenities normalization
  const normalizedFeatures = Array.isArray(room.roomFeatures)
    ? room.roomFeatures
    : room.roomFeatures
    ? room.roomFeatures.split(",").map((f) => f.trim())
    : [];

  const normalizedAmenities = Array.isArray(room.bathroomAmenities)
    ? room.bathroomAmenities
    : room.bathroomAmenities
    ? room.bathroomAmenities.split(",").map((a) => a.trim())
    : [];

  // Room numbers by occupancy
  const singleRooms = [];
  const doubleRooms = [];

  if (Array.isArray(room.roomNumbers)) {
    room.roomNumbers.forEach((num, idx) => {
      const occ = room.roomOccupancy?.[idx];
      if (occ === "single") singleRooms.push(num);
      else if (occ === "double") doubleRooms.push(num);
    });
  }

  // Pricing sections (defensive)
  const pricing = room.pricing || {};
  const ep = pricing.ep || {};
  const cp = pricing.cp || {};
  const map = pricing.map || {};
  const ap = pricing.ap || {};

  const extraBed = pricing.extraBed || {};
  const meals = pricing.meals || {};
  const childPolicy = pricing.childPolicy || {};
  const age1to5 = childPolicy.age1to5 || {};
  const age6to11 = childPolicy.age6to11 || {};
  const tax = pricing.tax || {};

  return (
    <section>
      <div className="py-0 px-2 bg-white text-black">
        {/* Header */}
        <div className="flex justify-between items-center max-w-8xl mx-auto mb-6 px-4 md:px-0">
          <h1 className="text-2xl font-bold">Room Details</h1>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 hover:bg-gray-100 transition"
          >
            Back
          </button>
        </div>

        <div className="max-w-8xl grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5">
          {/* Left Column */}
          <div className="col-span-6 md:col-span-4">
            {/* Main image + slider */}
            <div className="overflow-hidden relative group">
              <img
                src={room.images?.[imageIndex]}
                alt={room.roomType}
                className="transition-all duration-500 delay-300 w-full h-[400px] object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop";
                }}
              />
              {room.images?.length > 1 && (
                <>
                  <span
                    className="w-[40px] h-[40px] bg-white hover:bg-[#000000] hover:text-white grid items-center justify-center absolute bottom-[45%] left-[-50px] group-hover:left-4 transition-all duration-300 cursor-pointer"
                    onClick={prevBtn}
                  >
                    <BsArrowLeft size={20} className="text-gray-700" />
                  </span>
                  <span
                    className="w-[40px] h-[40px] bg-white hover:bg-[#000000] hover:text-white grid items-center justify-center absolute bottom-[45%] right-[-50px] group-hover:right-4 transition-all duration-300 cursor-pointer"
                    onClick={nextBtn}
                  >
                    <BsArrowRight size={20} className="text-gray-700 hover:text-white" />
                  </span>
                </>
              )}
            </div>

            {/* Text info */}
            <div className="pt-5 lg:pt-[28px] pr-3">
              <h2 className="py-2 text-2xl text-black font-semibold">
                {room.roomType}
              </h2>
              <p className="text-l lg:text-l leading-6 text-black font-normal">
                {room.roomDetails}
              </p>

             
              {/* Room Features */}
              <div className="pt-8">
                <h2 className="pb-2 text-2xl text-black font-semibold">
                  Room Features
                </h2>
                <ul className="space-y-3">
                  {normalizedFeatures.map((feature, i) => (
                    <li className="flex items-center text-md text-black" key={i}>
                      <BsCheck2 size={16} className="text-[#006600] mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {normalizedFeatures.length === 0 && (
                    <li className="text-sm text-gray-500">No features listed.</li>
                  )}
                </ul>
              </div>

              {/* Bathroom Amenities */}
              <div className="pt-8">
                <h2 className="pb-2 text-2xl text-black font-semibold">
                  Bathroom Amenities
                </h2>
                <ul className="space-y-3">
                  {normalizedAmenities.map((item, i) => (
                    <li className="flex items-center text-md text-black" key={i}>
                      <BsCheck2 size={16} className="text-[#006600] mr-3" />
                      <span>{item}</span>
                    </li>
                  ))}
                  {normalizedAmenities.length === 0 && (
                    <li className="text-sm text-gray-500">No amenities listed.</li>
                  )}
                </ul>
              </div>

              {/* ================= MEAL PLAN PRICING ================= */}
              <div className="pt-10">
                <h2 className="pb-2 text-2xl text-black font-semibold">
                  Meal Plan Pricing (Per Night)
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left">Plan</th>
                        <th className="px-3 py-2 text-right">Single</th>
                        <th className="px-3 py-2 text-right">Double</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-t">EP</td>
                        <td className="px-3 py-2 border-t text-right">
                          {ep.single ?? "—"}
                        </td>
                        <td className="px-3 py-2 border-t text-right">
                          {ep.double ?? "—"}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-t">CP</td>
                        <td className="px-3 py-2 border-t text-right">
                          {cp.single ?? "—"}
                        </td>
                        <td className="px-3 py-2 border-t text-right">
                          {cp.double ?? "—"}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-t">MAP</td>
                        <td className="px-3 py-2 border-t text-right">
                          {map.single ?? "—"}
                        </td>
                        <td className="px-3 py-2 border-t text-right">
                          {map.double ?? "—"}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-t">AP</td>
                        <td className="px-3 py-2 border-t text-right">
                          {ap.single ?? "—"}
                        </td>
                        <td className="px-3 py-2 border-t text-right">
                          {ap.double ?? "—"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ================= EXTRA BED & CHILD PRICING ================= */}
              <div className="pt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Extra Bed */}
                <div>
                  <h2 className="pb-2 text-2xl text-black font-semibold">
                    Extra Bed (Per Night)
                  </h2>
                  <ul className="text-sm space-y-2">
                    <li>EP: {extraBed.ep ?? "—"}</li>
                    <li>CP: {extraBed.cp ?? "—"}</li>
                    <li>MAP Single: {extraBed.mapSingle ?? "—"}</li>
                    <li>MAP Double: {extraBed.mapDouble ?? "—"}</li>
                    <li>AP: {extraBed.ap ?? "—"}</li>
                  </ul>
                </div>

                {/* Child Policy */}
                <div>
                  <h2 className="pb-2 text-2xl text-black font-semibold">
                    Child Pricing
                  </h2>
                  <ul className="text-sm space-y-1">
                    <li>
                      Age 1–5:{" "}
                      {age1to5.price != null
                        ? `${age1to5.price} (per night)`
                        : "Free / Not charged"}
                    </li>
                    <li>Age 6–11 EP: {age6to11.ep ?? "—"}</li>
                    <li>Age 6–11 CP: {age6to11.cp ?? "—"}</li>
                    <li>Age 6–11 MAP: {age6to11.map ?? "—"}</li>
                    <li>Age 6–11 AP: {age6to11.ap ?? "—"}</li>
                    <li>
                      Age 12+ treated as adult:{" "}
                      {childPolicy.age12plusIsAdult ? "Yes" : "No / Not set"}
                    </li>
                  </ul>
                </div>
              </div>

              {/* ================= MEALS & TAX ================= */}
              <div className="pt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Meals */}
                <div>
                  <h2 className="pb-2 text-2xl text-black font-semibold">
                    Meal Prices
                  </h2>
                  <ul className="text-sm space-y-2">
                    <li>Breakfast: {meals.breakfast ?? "—"}</li>
                    <li>Lunch: {meals.lunch ?? "—"}</li>
                    <li>Dinner: {meals.dinner ?? "—"}</li>
                  </ul>
                </div>

                {/* Tax */}
                <div>
                  <h2 className="pb-2 text-2xl text-black font-semibold">
                    Tax
                  </h2>
                  <ul className="text-sm space-y-2">
                    <li>GST: {tax.gst != null ? `${tax.gst}%` : "—"}</li>
                    <li>
                      Service Charge:{" "}
                      {tax.serviceCharge != null
                        ? `${tax.serviceCharge}%`
                        : "—"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <div className="bg-[#F5F5F5] px-7 py-8">
              <h4 className="text-xl font-semibold pb-4">Room Info</h4>

              <div className="grid items-center">
                {/* <div className="flex items-center py-4 border-b border-gray-300">
                  <FaDollarSign className="text-[#006600] w-5 h-5 mr-3" />
                  <span className="text-sm text-gray-700">
                    ${usdPrice} | Nu {room.price}
                  </span>
                </div> */}

                <div className="flex items-center py-4 border-b border-gray-300">
                  <FaVectorSquare className="text-[#006600] w-5 h-5 mr-3" />
                  <span className="text-sm text-gray-700">
                    {room.size} m²
                  </span>
                </div>

                <div className="flex items-center py-4 border-b border-gray-300">
                  <FaUserFriends className="text-[#006600] w-5 h-5 mr-3" />
                  <span className="text-sm text-gray-700">
                    Max {room.occupancy} Guests
                  </span>
                </div>

                <div className="flex items-center py-4 border-b border-gray-300">
                  <FaBed className="text-[#006600] w-5 h-5 mr-3" />
                  <span className="text-sm text-gray-700">
                    {room.beds} Beds
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="py-5 flex flex-col gap-3">
              <button
                onClick={handleEdit}
                className="bg-[#006600] w-full h-10 text-white hover:bg-green-700 transition"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 w-full h-10 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDisplay;
