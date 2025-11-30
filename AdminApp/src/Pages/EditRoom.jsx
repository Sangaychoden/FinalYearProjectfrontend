
// // import React, { useState, useEffect, useRef } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import Swal from "sweetalert2";
// // import { FaCloudUploadAlt } from "react-icons/fa";

// // const API_URL = import.meta.env.VITE_API_URL;

// // const EditRoom = () => {
// //   const navigate = useNavigate();
// //   const { roomId } = useParams();
// //   const fileRef = useRef(null);

// //   const [formData, setFormData] = useState({
// //     roomType: "",
// //     price: "",
// //     numberOfRooms: "",
// //     size: "",
// //     beds: "",
// //     occupancy: "",
// //     roomNumbers: "",
// //     roomDetails: "",
// //     roomFeatures: "",
// //     bathroomAmenities: "",
// //     optional: "",
// //   });

// //   const [existingImages, setExistingImages] = useState([]);
// //   const [newImages, setNewImages] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   // Fetch room details
// //   useEffect(() => {
// //     const fetchRoom = async () => {
// //       try {
// //         setLoading(true);

// //         const res = await fetch(`${API_URL}/rooms/rooms/${roomId}`, {
// //           method: "GET",
// //           credentials: "include",
// //         });

// //         if (!res.ok) throw new Error(`Failed to fetch room (${res.status})`);

// //         const data = await res.json();
// //         const room = data.room || data;

// //         // AGGRESSIVE ROOM NUMBER FIX 🔥
// //         let formattedRoomNumbers = "";

// //         if (Array.isArray(room.roomNumbers)) {
// //           formattedRoomNumbers = room.roomNumbers.join(", ");
// //         } else if (typeof room.roomNumbers === "string") {
// //           try {
// //             const parsed = JSON.parse(room.roomNumbers);
// //             if (Array.isArray(parsed)) {
// //               formattedRoomNumbers = parsed.join(", ");
// //             } else {
// //               formattedRoomNumbers = room.roomNumbers
// //                 .replace(/[\[\]\"]/g, "")
// //                 .replace(/\s+/g, "")
// //                 .split(",")
// //                 .join(", ");
// //             }
// //           } catch {
// //             formattedRoomNumbers = room.roomNumbers
// //               .replace(/[\[\]\"]/g, "")
// //               .replace(/\s+/g, "")
// //               .split(",")
// //               .join(", ");
// //           }
// //         }

// //         setFormData({
// //           roomType: room.roomType || "",
// //           price: room.price || "",
// //           numberOfRooms: room.numberOfRooms || "",
// //           size: room.size || "",
// //           beds: room.beds || "",
// //           occupancy: room.occupancy || "",
// //           roomNumbers: formattedRoomNumbers,
// //           roomDetails: room.roomDetails || "",
// //           roomFeatures:
// //             Array.isArray(room.roomFeatures)
// //               ? room.roomFeatures.join(", ")
// //               : room.roomFeatures || "",
// //           bathroomAmenities:
// //             Array.isArray(room.bathroomAmenities)
// //               ? room.bathroomAmenities.join(", ")
// //               : room.bathroomAmenities || "",
// //           optional: room.optional || "",
// //         });

// //         setExistingImages(Array.isArray(room.images) ? room.images : []);
// //       } catch (err) {
// //         Swal.fire({
// //           icon: "error",
// //           title: "Error loading room",
// //           text: err.message,
// //           confirmButtonColor: "#008000",
// //           color: "#fff",
// //           background: "#006600",
// //         });
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchRoom();
// //   }, [roomId]);

// //   // Handle input changes
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   // Open file picker
// //   const openPicker = () => fileRef.current?.click();

// //   // Add image
// //   const handleImageChange = (e) => {
// //     const files = Array.from(e.target.files);

// //     if (existingImages.length + newImages.length + files.length > 5) {
// //       Swal.fire({
// //         icon: "warning",
// //         title: "Image limit reached",
// //         text: "Max 5 images allowed.",
// //         confirmButtonColor: "#008000",
// //         color: "#fff",
// //         background: "#006600",
// //       });
// //       return;
// //     }

// //     const mapped = files.map((file) => ({
// //       file,
// //       url: URL.createObjectURL(file),
// //     }));

// //     setNewImages((prev) => [...prev, ...mapped]);
// //   };

// //   const handleRemoveExisting = (i) =>
// //     setExistingImages(existingImages.filter((_, index) => index !== i));

// //   const handleRemoveNew = (i) =>
// //     setNewImages(newImages.filter((_, index) => index !== i));

// //   // Submit handler
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const confirm = await Swal.fire({
// //       title: "Confirm Update",
// //       text: "Do you want to update this room?",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonText: "Yes",
// //       cancelButtonText: "Cancel",
// //       confirmButtonColor: "#008000",
// //       cancelButtonColor: "#d33",
// //       color: "#fff",
// //       background: "#006600",
// //     });

// //     if (!confirm.isConfirmed) return;

// //     try {
// //       setLoading(true);

// //       const fd = new FormData();

// //       // Convert cleaned room numbers back to array
// //       const cleanRoomNumbers = formData.roomNumbers
// //         .split(",")
// //         .map((n) => n.trim())
// //         .filter((n) => n !== "");

// //       fd.append("roomNumbers", JSON.stringify(cleanRoomNumbers));

// //       // Append remaining fields
// //       [
// //         "roomType",
// //         "price",
// //         "numberOfRooms",
// //         "size",
// //         "beds",
// //         "occupancy",
// //         "roomDetails",
// //         "roomFeatures",
// //         "bathroomAmenities",
// //         "optional",
// //       ].forEach((field) => {
// //         fd.append(field, formData[field]);
// //       });

// //       fd.append("existingImages", JSON.stringify(existingImages));
// //       newImages.forEach((img) => fd.append("images", img.file));

// //       const res = await fetch(`${API_URL}/rooms/rooms/${roomId}`, {
// //         method: "PUT",
// //         credentials: "include",
// //         body: fd,
// //       });

// //       if (!res.ok) throw new Error("Update failed");

// //       Swal.fire({
// //         icon: "success",
// //         title: "Room updated successfully!",
// //         confirmButtonColor: "#008000",
// //         color: "#fff",
// //         background: "#006600",
// //       }).then(() => navigate(`/room-display/${roomId}`));
// //     } catch (err) {
// //       Swal.fire({
// //         icon: "error",
// //         title: "Update error",
// //         text: err.message,
// //         confirmButtonColor: "#008000",
// //         color: "#fff",
// //         background: "#006600",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <section className="min-h-screen bg-gray-50 py-6">
// //       <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
// //         <h1 className="text-2xl font-semibold mb-6">Edit Room</h1>

// //         {loading ? (
// //           <p className="text-gray-600 text-center">Loading...</p>
// //         ) : (
// //           <form onSubmit={handleSubmit} className="space-y-6">

// //             {/* Row 1 */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div>
// //                 <label>Room Type</label>
// //                 <input
// //                   name="roomType"
// //                   value={formData.roomType}
// //                   onChange={handleChange}
// //                   className="w-full border p-3"
// //                 />
// //               </div>
// //               <div>
// //                 <label>Price</label>
// //                 <input
// //                   type="number"
// //                   name="price"
// //                   value={formData.price}
// //                   onChange={handleChange}
// //                   className="w-full border p-3"
// //                 />
// //               </div>
// //             </div>

// //             {/* Row 2 */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div>
// //                 <label>Number of Rooms</label>
// //                 <input
// //                   type="number"
// //                   name="numberOfRooms"
// //                   value={formData.numberOfRooms}
// //                   onChange={handleChange}
// //                   className="w-full border p-3"
// //                 />
// //               </div>

// //               <div>
// //                 <label>Room Numbers (comma separated)</label>
// //                 <input
// //                   type="text"
// //                   name="roomNumbers"
// //                   value={formData.roomNumbers}
// //                   onChange={handleChange}
// //                   className="w-full border p-3"
// //                   placeholder="101, 102, 103"
// //                 />
// //               </div>
// //             </div>

// //             {/* Size */}
// //             <div>
// //               <label>Size (m²)</label>
// //               <input
// //                 type="number"
// //                 name="size"
// //                 value={formData.size}
// //                 onChange={handleChange}
// //                 className="w-full border p-3"
// //               />
// //             </div>

// //             {/* Beds & Occupancy */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div>
// //                 <label>Beds</label>
// //                 <input
// //                   type="number"
// //                   name="beds"
// //                   value={formData.beds}
// //                   onChange={handleChange}
// //                   className="w-full border p-3"
// //                 />
// //               </div>

// //               <div>
// //                 <label>Occupancy</label>
// //                 <input
// //                   type="number"
// //                   name="occupancy"
// //                   value={formData.occupancy}
// //                   onChange={handleChange}
// //                   className="w-full border p-3"
// //                 />
// //               </div>
// //             </div>



// //             {/* Room Details */}
// //             <div>
// //               <label>Room Details</label>
// //               <textarea
// //                 name="roomDetails"
// //                 value={formData.roomDetails}
// //                 onChange={handleChange}
// //                 rows="4"
// //                 className="w-full border p-3"
// //               ></textarea>
// //             </div>

// //             {/* Room Features */}
// //             <div>
// //               <label>Room Features (comma separated)</label>
// //               <input
// //                 name="roomFeatures"
// //                 value={formData.roomFeatures}
// //                 onChange={handleChange}
// //                 className="w-full border p-3"
// //               />
// //             </div>

// //             {/* Bathroom Amenities */}
// //             <div>
// //               <label>Bathroom Amenities (comma separated)</label>
// //               <input
// //                 name="bathroomAmenities"
// //                 value={formData.bathroomAmenities}
// //                 onChange={handleChange}
// //                 className="w-full border p-3"
// //               />
// //             </div>

// //             {/* Optional */}
// //             <div>
// //               <label>Optional</label>
// //               <input
// //                 name="optional"
// //                 value={formData.optional}
// //                 onChange={handleChange}
// //                 className="w-full border p-3"
// //               />
// //             </div>

// //             {/* Images */}
// //             <div>
// //               <label>Room Images (Max 5)</label>

// //               <input
// //                 type="file"
// //                 ref={fileRef}
// //                 accept="image/*"
// //                 multiple
// //                 className="hidden"
// //                 onChange={handleImageChange}
// //               />

// //               <button
// //                 type="button"
// //                 className="flex items-center gap-2 px-4 py-2 border border-gray-300"
// //                 onClick={openPicker}
// //               >
// //                 <FaCloudUploadAlt className="w-5 h-5" />
// //                 Upload Images
// //               </button>

// //               <div className="flex flex-wrap gap-3 mt-4">
// //                 {existingImages.map((url, idx) => (
// //                   <div key={idx} className="relative w-24 h-24 border">
// //                     <img src={url} className="w-full h-full object-cover" />
// //                     <button
// //                       type="button"
// //                       onClick={() => handleRemoveExisting(idx)}
// //                       className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 rounded"
// //                     >
// //                       ×
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>

// //               <div className="flex flex-wrap gap-3 mt-4">
// //                 {newImages.map((img, idx) => (
// //                   <div key={idx} className="relative w-24 h-24 border">
// //                     <img src={img.url} className="w-full h-full object-cover" />
// //                     <button
// //                       type="button"
// //                       onClick={() => handleRemoveNew(idx)}
// //                       className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 rounded"
// //                     >
// //                       ×
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="flex justify-center gap-4 mt-6">
// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="bg-[#006600] text-white py-2 px-8 hover:bg-black"
// //               >
// //                 {loading ? "Updating..." : "Update"}
// //               </button>

// //               <button
// //                 type="button"
// //                 onClick={() => navigate(-1)}
// //                 className="border border-[#006600] text-[#006600] py-2 px-8"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </form>
// //         )}
// //       </div>
// //     </section>
// //   );
// // };

// // export default EditRoom;
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import { FaCloudUploadAlt } from "react-icons/fa";

// const API_URL = import.meta.env.VITE_API_URL;

// const EditRoom = () => {
//   const navigate = useNavigate();
//   const { roomId } = useParams();
//   const fileRef = useRef(null);

//   const [formData, setFormData] = useState({
//     // Basic Room Info
//     roomType: "",
//     price: "",
//     numberOfRooms: "",
//     size: "",
//     beds: "",
//     occupancy: "",
//     roomDetails: "",
//     roomFeatures: "",
//     bathroomAmenities: "",
//     optional: "",

//     // Room numbers by occupancy (strings, comma-separated)
//     singleRooms: "",
//     doubleRooms: "",

//     // Meal Plan Pricing
//     epSingle: "",
//     epDouble: "",
//     cpSingle: "",
//     cpDouble: "",
//     mapSingle: "",
//     mapDouble: "",
//     apSingle: "",
//     apDouble: "",

//     // Extra Bed Pricing
//     extraBedEP: "",
//     extraBedCP: "",
//     extraBedMAPSingle: "",
//     extraBedMAPDouble: "",
//     extraBedAP: "",

//     // Child Pricing (6–11)
//     childEP: "",
//     childCP: "",
//     childMAP: "",
//     childAP: "",

//     // Meals
//     mealBreakfast: "",
//     mealLunch: "",
//     mealDinner: "",

//     // Tax
//     taxGST: "",
//     taxServiceCharge: "",
//   });

//   const [existingImages, setExistingImages] = useState([]);
//   const [newImages, setNewImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ===================== FETCH ROOM DETAILS =====================
//   useEffect(() => {
//     const fetchRoom = async () => {
//       try {
//         setLoading(true);

//         const res = await fetch(`${API_URL}/rooms/rooms/${roomId}`, {
//           method: "GET",
//           credentials: "include",
//         });

//         if (!res.ok) throw new Error(`Failed to fetch room (${res.status})`);

//         const data = await res.json();
//         const room = data.room || data;

//         // --- split roomNumbers into singleRooms / doubleRooms using roomOccupancy ---
//         let singleRoomsArr = [];
//         let doubleRoomsArr = [];

//         if (Array.isArray(room.roomNumbers) && Array.isArray(room.roomOccupancy)) {
//           room.roomNumbers.forEach((num, idx) => {
//             const occ = room.roomOccupancy[idx];
//             if (occ === "single") singleRoomsArr.push(num);
//             else if (occ === "double") doubleRoomsArr.push(num);
//           });
//         } else if (Array.isArray(room.roomNumbers)) {
//           // fallback: if we don't have roomOccupancy, treat all as double
//           doubleRoomsArr = room.roomNumbers;
//         }

//         const pricing = room.pricing || {};
//         const ep = pricing.ep || {};
//         const cp = pricing.cp || {};
//         const map = pricing.map || {};
//         const ap = pricing.ap || {};
//         const extraBed = pricing.extraBed || {};
//         const meals = pricing.meals || {};
//         const childPolicy = pricing.childPolicy || {};
//         const child6to11 = childPolicy.age6to11 || {};
//         const tax = pricing.tax || {};

//         setFormData({
//           // Basic
//           roomType: room.roomType || "",
//           price: room.price || "",
//           numberOfRooms: room.numberOfRooms || "",
//           size: room.size || "",
//           beds: room.beds || "",
//           occupancy: room.occupancy || "",
//           roomDetails: room.roomDetails || "",
//           roomFeatures: Array.isArray(room.roomFeatures)
//             ? room.roomFeatures.join(", ")
//             : room.roomFeatures || "",
//           bathroomAmenities: Array.isArray(room.bathroomAmenities)
//             ? room.bathroomAmenities.join(", ")
//             : room.bathroomAmenities || "",
//           optional: room.optional || "",

//           // Room numbers as comma-separated strings
//           singleRooms: singleRoomsArr.join(", "),
//           doubleRooms: doubleRoomsArr.join(", "),

//           // Meal Plan Pricing
//           epSingle: ep.single ?? "",
//           epDouble: ep.double ?? "",
//           cpSingle: cp.single ?? "",
//           cpDouble: cp.double ?? "",
//           mapSingle: map.single ?? "",
//           mapDouble: map.double ?? "",
//           apSingle: ap.single ?? "",
//           apDouble: ap.double ?? "",

//           // Extra Bed
//           extraBedEP: extraBed.ep ?? "",
//           extraBedCP: extraBed.cp ?? "",
//           extraBedMAPSingle: extraBed.mapSingle ?? "",
//           extraBedMAPDouble: extraBed.mapDouble ?? "",
//           extraBedAP: extraBed.ap ?? "",

//           // Child (6–11)
//           childEP: child6to11.ep ?? "",
//           childCP: child6to11.cp ?? "",
//           childMAP: child6to11.map ?? "",
//           childAP: child6to11.ap ?? "",

//           // Meals
//           mealBreakfast: meals.breakfast ?? "",
//           mealLunch: meals.lunch ?? "",
//           mealDinner: meals.dinner ?? "",

//           // Tax
//           taxGST: tax.gst ?? "",
//           taxServiceCharge: tax.serviceCharge ?? "",
//         });

//         setExistingImages(Array.isArray(room.images) ? room.images : []);
//       } catch (err) {
//         Swal.fire({
//           icon: "error",
//           title: "Error loading room",
//           text: err.message,
//           confirmButtonColor: "#008000",
//           color: "#fff",
//           background: "#006600",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoom();
//   }, [roomId]);

//   // ===================== INPUT HANDLERS =====================
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const openPicker = () => fileRef.current?.click();

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);

//     if (existingImages.length + newImages.length + files.length > 5) {
//       Swal.fire({
//         icon: "warning",
//         title: "Image limit reached",
//         text: "Max 5 images allowed.",
//         confirmButtonColor: "#008000",
//         color: "#fff",
//         background: "#006600",
//       });
//       return;
//     }

//     const mapped = files.map((file) => ({
//       file,
//       url: URL.createObjectURL(file),
//     }));

//     setNewImages((prev) => [...prev, ...mapped]);
//   };

//   const handleRemoveExisting = (i) =>
//     setExistingImages((prev) => prev.filter((_, index) => index !== i));

//   const handleRemoveNew = (i) =>
//     setNewImages((prev) => prev.filter((_, index) => index !== i));

//   // ===================== SUBMIT =====================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const confirm = await Swal.fire({
//       title: "Confirm Update",
//       text: "Do you want to update this room?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#008000",
//       cancelButtonColor: "#d33",
//       color: "#fff",
//       background: "#006600",
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       setLoading(true);

//       const fd = new FormData();

//       // Basic Room Info
//       fd.append("roomType", formData.roomType);
//       fd.append("price", formData.price);
//       fd.append("numberOfRooms", formData.numberOfRooms);
//       fd.append("size", formData.size);
//       fd.append("beds", formData.beds);
//       fd.append("occupancy", formData.occupancy);
//       fd.append("roomDetails", formData.roomDetails);
//       fd.append("roomFeatures", formData.roomFeatures);
//       fd.append("bathroomAmenities", formData.bathroomAmenities);
//       fd.append("optional", formData.optional);

//       // Single & Double room numbers → same as AddRoom
//       const singleList = formData.singleRooms
//         ? formData.singleRooms
//             .split(",")
//             .map((r) => r.trim())
//             .filter(Boolean)
//         : [];
//       const doubleList = formData.doubleRooms
//         ? formData.doubleRooms
//             .split(",")
//             .map((r) => r.trim())
//             .filter(Boolean)
//         : [];

//       fd.append("singleRooms", JSON.stringify(singleList));
//       fd.append("doubleRooms", JSON.stringify(doubleList));

//       // Meal Plan Prices
//       fd.append("epSingle", formData.epSingle);
//       fd.append("epDouble", formData.epDouble);
//       fd.append("cpSingle", formData.cpSingle);
//       fd.append("cpDouble", formData.cpDouble);
//       fd.append("mapSingle", formData.mapSingle);
//       fd.append("mapDouble", formData.mapDouble);
//       fd.append("apSingle", formData.apSingle);
//       fd.append("apDouble", formData.apDouble);

//       // Extra Bed
//       fd.append("extraBedEP", formData.extraBedEP);
//       fd.append("extraBedCP", formData.extraBedCP);
//       fd.append("extraBedMAPSingle", formData.extraBedMAPSingle);
//       fd.append("extraBedMAPDouble", formData.extraBedMAPDouble);
//       fd.append("extraBedAP", formData.extraBedAP);

//       // Child Policy (6–11)
//       fd.append("childEP", formData.childEP);
//       fd.append("childCP", formData.childCP);
//       fd.append("childMAP", formData.childMAP);
//       fd.append("childAP", formData.childAP);

//       // Meals
//       fd.append("mealBreakfast", formData.mealBreakfast);
//       fd.append("mealLunch", formData.mealLunch);
//       fd.append("mealDinner", formData.mealDinner);

//       // Tax
//       fd.append("taxGST", formData.taxGST);
//       fd.append("taxServiceCharge", formData.taxServiceCharge);

//       // Images
//       fd.append("existingImages", JSON.stringify(existingImages));
//       newImages.forEach((img) => fd.append("images", img.file));

//       const res = await fetch(`${API_URL}/rooms/rooms/${roomId}`, {
//         method: "PUT",
//         credentials: "include",
//         body: fd,
//       });

//       if (!res.ok) {
//         const errData = await res.json().catch(() => ({}));
//         throw new Error(errData.message || "Update failed");
//       }

//       Swal.fire({
//         icon: "success",
//         title: "Room updated successfully!",
//         confirmButtonColor: "#008000",
//         color: "#fff",
//         background: "#006600",
//       }).then(() => navigate(`/room-display/${roomId}`));
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Update error",
//         text: err.message,
//         confirmButtonColor: "#008000",
//         color: "#fff",
//         background: "#006600",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===================== RENDER =====================
//   return (
//     <section className="min-h-screen bg-gray-50 py-6">
//       <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg">
//         <h1 className="text-2xl font-semibold mb-6">Edit Room</h1>

//         {loading ? (
//           <p className="text-gray-600 text-center">Loading...</p>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Row 1 */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block mb-1">Room Type</label>
//                 <input
//                   name="roomType"
//                   value={formData.roomType}
//                   onChange={handleChange}
//                   className="w-full border p-3"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Base Price (Nu.)</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   className="w-full border p-3"
//                 />
//               </div>
//             </div>

//             {/* Row 2 */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block mb-1">Number of Rooms</label>
//                 <input
//                   type="number"
//                   name="numberOfRooms"
//                   value={formData.numberOfRooms}
//                   onChange={handleChange}
//                   className="w-full border p-3"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Room Size (m²)</label>
//                 <input
//                   type="number"
//                   name="size"
//                   value={formData.size}
//                   onChange={handleChange}
//                   className="w-full border p-3"
//                 />
//               </div>
//             </div>

//             {/* Beds & Occupancy */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block mb-1">Beds</label>
//                 <input
//                   type="number"
//                   name="beds"
//                   value={formData.beds}
//                   onChange={handleChange}
//                   className="w-full border p-3"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Max Occupancy</label>
//                 <input
//                   type="number"
//                   name="occupancy"
//                   value={formData.occupancy}
//                   onChange={handleChange}
//                   className="w-full border p-3"
//                 />
//               </div>
//             </div>

//             {/* Room Numbers by Occupancy */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block mb-1">
//                   Single Occupancy Rooms (comma separated)
//                 </label>
//                 <input
//                   type="text"
//                   name="singleRooms"
//                   value={formData.singleRooms}
//                   onChange={handleChange}
//                   className="w-full border p-3"
//                   placeholder="101, 102"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">
//                   Double Occupancy Rooms (comma separated)
//                 </label>
//                 <input
//                   type="text"
//                   name="doubleRooms"
//                   value={formData.doubleRooms}
//                   onChange={handleChange}
//                   className="w-full border p-3"
//                   placeholder="201, 202"
//                 />
//               </div>
//             </div>

//             {/* Room Details */}
//             <div>
//               <label className="block mb-1">Room Details</label>
//               <textarea
//                 name="roomDetails"
//                 value={formData.roomDetails}
//                 onChange={handleChange}
//                 rows="4"
//                 className="w-full border p-3"
//               ></textarea>
//             </div>

//             {/* Room Features */}
//             <div>
//               <label className="block mb-1">Room Features (comma separated)</label>
//               <input
//                 name="roomFeatures"
//                 value={formData.roomFeatures}
//                 onChange={handleChange}
//                 className="w-full border p-3"
//               />
//             </div>

//             {/* Bathroom Amenities */}
//             <div>
//               <label className="block mb-1">
//                 Bathroom Amenities (comma separated)
//               </label>
//               <input
//                 name="bathroomAmenities"
//                 value={formData.bathroomAmenities}
//                 onChange={handleChange}
//                 className="w-full border p-3"
//               />
//             </div>

//             {/* Optional */}
//             <div>
//               <label className="block mb-1">Optional</label>
//               <input
//                 name="optional"
//                 value={formData.optional}
//                 onChange={handleChange}
//                 className="w-full border p-3"
//               />
//             </div>

//             {/* Meal Plan Pricing */}
//             <section className="space-y-4">
//               <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
//                 Meal Plan Pricing (Per Night)
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 {/* EP */}
//                 <div className="border rounded p-3">
//                   <h3 className="font-semibold mb-2">EP</h3>
//                   <label className="block text-sm mb-1">Single</label>
//                   <input
//                     type="number"
//                     name="epSingle"
//                     value={formData.epSingle}
//                     onChange={handleChange}
//                     className="w-full border p-2 mb-2"
//                   />
//                   <label className="block text-sm mb-1">Double</label>
//                   <input
//                     type="number"
//                     name="epDouble"
//                     value={formData.epDouble}
//                     onChange={handleChange}
//                     className="w-full border p-2"
//                   />
//                 </div>

//                 {/* CP */}
//                 <div className="border rounded p-3">
//                   <h3 className="font-semibold mb-2">CP</h3>
//                   <label className="block text-sm mb-1">Single</label>
//                   <input
//                     type="number"
//                     name="cpSingle"
//                     value={formData.cpSingle}
//                     onChange={handleChange}
//                     className="w-full border p-2 mb-2"
//                   />
//                   <label className="block text-sm mb-1">Double</label>
//                   <input
//                     type="number"
//                     name="cpDouble"
//                     value={formData.cpDouble}
//                     onChange={handleChange}
//                     className="w-full border p-2"
//                   />
//                 </div>

//                 {/* MAP */}
//                 <div className="border rounded p-3">
//                   <h3 className="font-semibold mb-2">MAP</h3>
//                   <label className="block text-sm mb-1">Single</label>
//                   <input
//                     type="number"
//                     name="mapSingle"
//                     value={formData.mapSingle}
//                     onChange={handleChange}
//                     className="w-full border p-2 mb-2"
//                   />
//                   <label className="block text-sm mb-1">Double</label>
//                   <input
//                     type="number"
//                     name="mapDouble"
//                     value={formData.mapDouble}
//                     onChange={handleChange}
//                     className="w-full border p-2"
//                   />
//                 </div>

//                 {/* AP */}
//                 <div className="border rounded p-3">
//                   <h3 className="font-semibold mb-2">AP</h3>
//                   <label className="block text-sm mb-1">Single</label>
//                   <input
//                     type="number"
//                     name="apSingle"
//                     value={formData.apSingle}
//                     onChange={handleChange}
//                     className="w-full border p-2 mb-2"
//                   />
//                   <label className="block text-sm mb-1">Double</label>
//                   <input
//                     type="number"
//                     name="apDouble"
//                     value={formData.apDouble}
//                     onChange={handleChange}
//                     className="w-full border p-2"
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* Extra Bed & Child */}
//             <section className="space-y-4">
//               <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
//                 Extra Bed & Child Pricing
//               </h2>

//               {/* Extra Bed */}
//               <div>
//                 <h3 className="font-semibold mb-2">Extra Bed (Per Night)</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm mb-1">Extra Bed EP</label>
//                     <input
//                       type="number"
//                       name="extraBedEP"
//                       value={formData.extraBedEP}
//                       onChange={handleChange}
//                       className="w-full border p-2"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm mb-1">Extra Bed CP</label>
//                     <input
//                       type="number"
//                       name="extraBedCP"
//                       value={formData.extraBedCP}
//                       onChange={handleChange}
//                       className="w-full border p-2"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm mb-1">
//                       Extra Bed MAP (Single)
//                     </label>
//                     <input
//                       type="number"
//                       name="extraBedMAPSingle"
//                       value={formData.extraBedMAPSingle}
//                       onChange={handleChange}
//                       className="w-full border p-2"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm mb-1">
//                       Extra Bed MAP (Double)
//                     </label>
//                     <input
//                       type="number"
//                       name="extraBedMAPDouble"
//                       value={formData.extraBedMAPDouble}
//                       onChange={handleChange}
//                       className="w-full border p-2"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm mb-1">Extra Bed AP</label>
//                     <input
//                       type="number"
//                       name="extraBedAP"
//                       value={formData.extraBedAP}
//                       onChange={handleChange}
//                       className="w-full border p-2"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Child Pricing */}
//               <div>
//                 <h3 className="font-semibold mb-2">
//                   Child (Age 6–11) Per Night (1–5 Years = Free)
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   <div>
//                     <label className="block text-sm mb-1">Child EP</label>
//                     <input
//                       type="number"
//                       name="childEP"
//                       value={formData.childEP}
//                       onChange={handleChange}
//                       className="w-full border p-2"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm mb-1">Child CP</label>
//                     <input
//                       type="number"
//                       name="childCP"
//                       value={formData.childCP}
//                       onChange={handleChange}
//                       className="w-full border p-2"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm mb-1">Child MAP</label>
//                     <input
//                       type="number"
//                       name="childMAP"
//                       value={formData.childMAP}
//                       onChange={handleChange}
//                       className="w-full border p-2"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm mb-1">Child AP</label>
//                     <input
//                       type="number"
//                       name="childAP"
//                       value={formData.childAP}
//                       onChange={handleChange}
//                       className="w-full border p-2"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Meals & Tax */}
//             <section className="space-y-4">
//               <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
//                 Meals & Tax
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Meals */}
//                 <div>
//                   <h3 className="font-semibold mb-2">Meal Prices</h3>
//                   <div className="space-y-3">
//                     <div>
//                       <label className="block text-sm mb-1">Breakfast</label>
//                       <input
//                         type="number"
//                         name="mealBreakfast"
//                         value={formData.mealBreakfast}
//                         onChange={handleChange}
//                         className="w-full border p-2"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm mb-1">Lunch</label>
//                       <input
//                         type="number"
//                         name="mealLunch"
//                         value={formData.mealLunch}
//                         onChange={handleChange}
//                         className="w-full border p-2"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm mb-1">Dinner</label>
//                       <input
//                         type="number"
//                         name="mealDinner"
//                         value={formData.mealDinner}
//                         onChange={handleChange}
//                         className="w-full border p-2"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Tax */}
//                 <div>
//                   <h3 className="font-semibold mb-2">Tax</h3>
//                   <div className="space-y-3">
//                     <div>
//                       <label className="block text-sm mb-1">GST (%)</label>
//                       <input
//                         type="number"
//                         name="taxGST"
//                         value={formData.taxGST}
//                         onChange={handleChange}
//                         className="w-full border p-2"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm mb-1">
//                         Service Charge (%)
//                       </label>
//                       <input
//                         type="number"
//                         name="taxServiceCharge"
//                         value={formData.taxServiceCharge}
//                         onChange={handleChange}
//                         className="w-full border p-2"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Images */}
//             <div>
//               <label className="block mb-1">Room Images (Max 5)</label>

//               <input
//                 type="file"
//                 ref={fileRef}
//                 accept="image/*"
//                 multiple
//                 className="hidden"
//                 onChange={handleImageChange}
//               />

//               <button
//                 type="button"
//                 className="flex items-center gap-2 px-4 py-2 border border-gray-300"
//                 onClick={openPicker}
//               >
//                 <FaCloudUploadAlt className="w-5 h-5" />
//                 Upload Images
//               </button>

//               <div className="flex flex-wrap gap-3 mt-4">
//                 {existingImages.map((url, idx) => (
//                   <div key={idx} className="relative w-24 h-24 border">
//                     <img src={url} className="w-full h-full object-cover" />
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveExisting(idx)}
//                       className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 rounded"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex flex-wrap gap-3 mt-4">
//                 {newImages.map((img, idx) => (
//                   <div key={idx} className="relative w-24 h-24 border">
//                     <img src={img.url} className="w-full h-full object-cover" />
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveNew(idx)}
//                       className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 rounded"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-center gap-4 mt-6">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-[#006600] text-white py-2 px-8 hover:bg-black"
//               >
//                 {loading ? "Updating..." : "Update"}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => navigate(-1)}
//                 className="border border-[#006600] text-[#006600] py-2 px-8"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </section>
//   );
// };

// export default EditRoom;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const EditRoom = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    roomType: "",
    roomNumbers: "",
    roomOccupancyType: "",
    numberOfRooms: "",
    size: "",
    beds: "",
    occupancy: "",
    roomDetails: "",
    roomFeatures: "",
    bathroomAmenities: "",
    optional: "",

    epSingle: "",
    epDouble: "",
    cpSingle: "",
    cpDouble: "",
    mapSingle: "",
    mapDouble: "",
    apSingle: "",
    apDouble: "",

    extraBedEP: "",
    extraBedCP: "",
    extraBedMAPSingle: "",
    extraBedMAPDouble: "",
    extraBedAP: "",

    childEP: "",
    childCP: "",
    childMAP: "",
    childAP: "",

    mealBreakfast: "",
    mealLunch: "",
    mealDinner: "",

    taxGST: "",
    taxServiceCharge: ""
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===================== FETCH ROOM DETAILS =====================
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/rooms/rooms/${roomId}`, {
          method: "GET",
          credentials: "include"
        });

        if (!res.ok) throw new Error("Failed to fetch room");

        const data = await res.json();
        const room = data.room || data;

        setFormData({
          roomType: room.roomType || "",
          roomNumbers: room.roomNumbers?.join(", ") || "",
          roomOccupancyType: room.roomOccupancyType?.join(", ") || "",
          numberOfRooms: room.numberOfRooms || "",
          size: room.size || "",
          beds: room.beds || "",
          occupancy: room.occupancy || "",
          roomDetails: room.roomDetails || "",
          roomFeatures: Array.isArray(room.roomFeatures)
            ? room.roomFeatures.join(", ")
            : room.roomFeatures || "",
          bathroomAmenities: Array.isArray(room.bathroomAmenities)
            ? room.bathroomAmenities.join(", ")
            : room.bathroomAmenities || "",
          optional: room.optional || "",

          epSingle: room.pricing?.ep?.single ?? "",
          epDouble: room.pricing?.ep?.double ?? "",
          cpSingle: room.pricing?.cp?.single ?? "",
          cpDouble: room.pricing?.cp?.double ?? "",
          mapSingle: room.pricing?.map?.single ?? "",
          mapDouble: room.pricing?.map?.double ?? "",
          apSingle: room.pricing?.ap?.single ?? "",
          apDouble: room.pricing?.ap?.double ?? "",

          extraBedEP: room.pricing?.extraBed?.ep ?? "",
          extraBedCP: room.pricing?.extraBed?.cp ?? "",
          extraBedMAPSingle: room.pricing?.extraBed?.mapSingle ?? "",
          extraBedMAPDouble: room.pricing?.extraBed?.mapDouble ?? "",
          extraBedAP: room.pricing?.extraBed?.ap ?? "",

          childEP: room.pricing?.childPolicy?.age6to11?.ep ?? "",
          childCP: room.pricing?.childPolicy?.age6to11?.cp ?? "",
          childMAP: room.pricing?.childPolicy?.age6to11?.map ?? "",
          childAP: room.pricing?.childPolicy?.age6to11?.ap ?? "",

          mealBreakfast: room.pricing?.meals?.breakfast ?? "",
          mealLunch: room.pricing?.meals?.lunch ?? "",
          mealDinner: room.pricing?.meals?.dinner ?? "",

          taxGST: room.pricing?.tax?.gst ?? "",
          taxServiceCharge: room.pricing?.tax?.serviceCharge ?? ""
        });

        setExistingImages(room.images || []);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error loading room",
          text: err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  // ===================== INPUT HANDLER =====================
  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  // ===================== IMAGE HANDLING =====================
  const openPicker = () => fileRef.current?.click();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (existingImages.length + newImages.length + files.length > 5) {
      Swal.fire({
        icon: "warning",
        title: "Image limit reached",
        text: "Max 5 images allowed",
      });
      return;
    }

    const mapped = files.map((file) => ({
      file,
      url: URL.createObjectURL(file)
    }));

    setNewImages((prev) => [...prev, ...mapped]);
  };

  const handleRemoveExisting = (i) =>
    setExistingImages((prev) => prev.filter((_, idx) => idx !== i));

  const handleRemoveNew = (i) =>
    setNewImages((prev) => prev.filter((_, idx) => idx !== i));

  // ===================== SUBMIT UPDATE =====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      icon: "warning",
      title: "Update Room?",
      showCancelButton: true,
      confirmButtonText: "Yes"
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);

      const fd = new FormData();

      fd.append("roomType", formData.roomType);
      fd.append("roomNumbers", JSON.stringify(formData.roomNumbers.split(",").map(x => x.trim())));
      fd.append("roomOccupancyType", formData.roomOccupancyType);
      fd.append("numberOfRooms", formData.numberOfRooms);
      fd.append("size", formData.size);
      fd.append("beds", formData.beds);
      fd.append("occupancy", formData.occupancy);
      fd.append("roomDetails", formData.roomDetails);
      fd.append("roomFeatures", formData.roomFeatures);
      fd.append("bathroomAmenities", formData.bathroomAmenities);
      fd.append("optional", formData.optional);

      fd.append("epSingle", formData.epSingle);
      fd.append("epDouble", formData.epDouble);
      fd.append("cpSingle", formData.cpSingle);
      fd.append("cpDouble", formData.cpDouble);
      fd.append("mapSingle", formData.mapSingle);
      fd.append("mapDouble", formData.mapDouble);
      fd.append("apSingle", formData.apSingle);
      fd.append("apDouble", formData.apDouble);

      fd.append("extraBedEP", formData.extraBedEP);
      fd.append("extraBedCP", formData.extraBedCP);
      fd.append("extraBedMAPSingle", formData.extraBedMAPSingle);
      fd.append("extraBedMAPDouble", formData.extraBedMAPDouble);
      fd.append("extraBedAP", formData.extraBedAP);

      fd.append("childEP", formData.childEP);
      fd.append("childCP", formData.childCP);
      fd.append("childMAP", formData.childMAP);
      fd.append("childAP", formData.childAP);

      fd.append("mealBreakfast", formData.mealBreakfast);
      fd.append("mealLunch", formData.mealLunch);
      fd.append("mealDinner", formData.mealDinner);

      fd.append("taxGST", formData.taxGST);
      fd.append("taxServiceCharge", formData.taxServiceCharge);

      fd.append("existingImages", JSON.stringify(existingImages));
      newImages.forEach((img) => fd.append("images", img.file));

      const res = await fetch(`${API_URL}/rooms/rooms/${roomId}`, {
        method: "PUT",
        credentials: "include",
        body: fd
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to update");
      }

      Swal.fire({
        icon: "success",
        title: "Room Updated!"
      }).then(() => navigate("/admin-rooms"));

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Error",
        text: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  // ===================== UI =====================
  return (
    <section className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Edit Room</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* BASIC INFO */}
            <section>
              <h2 className="text-lg font-semibold border-b pb-2">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block mb-1">Room Type</label>
                  <input
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="w-full border p-3"
                  />
                </div>
                  <div>
                  <label className="block mb-1">Number of Rooms</label>
                  <input
                    name="numberOfRooms"
                    type="number"
                    value={formData.numberOfRooms}
                    onChange={handleChange}
                    className="w-full border p-3"
                  />
                </div>
                <div>
                  <label className="block mb-1">Room Numbers (comma separated)</label>
                  <input
                    name="roomNumbers"
                    value={formData.roomNumbers}
                    onChange={handleChange}
                    placeholder="101,102,103"
                    className="w-full border p-3"
                  />
                </div>
                
                 <div>
                <label className="block mb-1">Room Occupancy Types (comma separated)</label>
                <input
                  name="roomOccupancyType"
                  value={formData.roomOccupancyType}
                  onChange={handleChange}
                  placeholder="single,double,single"
                  className="w-full border p-3"
                />
              </div>
                 <div>
                  <label className="block mb-1">Room Size (sq ft)</label>
                  <input
                    name="size"
                    type="number"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full border p-3"
                  />
                </div>
                <div>
                  <label className="block mb-1">Beds</label>
                  <input
                    name="beds"
                    type="number"
                    value={formData.beds}
                    onChange={handleChange}
                    className="w-full border p-3"
                  />
                </div>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                
                <div>
                  <label className="block mb-1">Max Occupancy</label>
                  <input
                    name="occupancy"
                    type="number"
                    value={formData.occupancy}
                    onChange={handleChange}
                    className="w-full border p-3"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block mb-1">Room Details</label>
                <textarea
                  name="roomDetails"
                  value={formData.roomDetails}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border p-3"
                ></textarea>
              </div>

              <div className="mt-4">
                <label className="block mb-1">Room Features (comma separated)</label>
                <input
                  name="roomFeatures"
                  value={formData.roomFeatures}
                  onChange={handleChange}
                  className="w-full border p-3"
                />
              </div>

              <div className="mt-4">
                <label className="block mb-1">Bathroom Amenities (comma separated)</label>
                <input
                  name="bathroomAmenities"
                  value={formData.bathroomAmenities}
                  onChange={handleChange}
                  className="w-full border p-3"
                />
              </div>

              <div className="mt-4">
                <label className="block mb-1">Optional</label>
                <input
                  name="optional"
                  value={formData.optional}
                  onChange={handleChange}
                  className="w-full border p-3"
                />
              </div>
            </section>

            {/* MEAL PLAN PRICING */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">
                Meal Plan Pricing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                {/* EP */}
                <div className="border p-3 rounded">
                  <h3 className="font-semibold mb-2">EP</h3>
                  <label className="block mb-1">Single</label>
                  <input
                    name="epSingle"
                    type="number"
                    value={formData.epSingle}
                    onChange={handleChange}
                    className="w-full border p-2 mb-2"
                  />
                  <label className="block mb-1">Double</label>
                  <input
                    name="epDouble"
                    type="number"
                    value={formData.epDouble}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>

                {/* CP */}
                <div className="border p-3 rounded">
                  <h3 className="font-semibold mb-2">CP</h3>
                  <label className="block mb-1">Single</label>
                  <input
                    name="cpSingle"
                    type="number"
                    value={formData.cpSingle}
                    onChange={handleChange}
                    className="w-full border p-2 mb-2"
                  />
                  <label className="block mb-1">Double</label>
                  <input
                    name="cpDouble"
                    type="number"
                    value={formData.cpDouble}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>

                {/* MAP */}
                <div className="border p-3 rounded">
                  <h3 className="font-semibold mb-2">MAP</h3>
                  <label className="block mb-1">Single</label>
                  <input
                    name="mapSingle"
                    type="number"
                    value={formData.mapSingle}
                    onChange={handleChange}
                    className="w-full border p-2 mb-2"
                  />
                  <label className="block mb-1">Double</label>
                  <input
                    name="mapDouble"
                    type="number"
                    value={formData.mapDouble}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>

                {/* AP */}
                <div className="border p-3 rounded">
                  <h3 className="font-semibold mb-2">AP</h3>
                  <label className="block mb-1">Single</label>
                  <input
                    name="apSingle"
                    type="number"
                    value={formData.apSingle}
                    onChange={handleChange}
                    className="w-full border p-2 mb-2"
                  />
                  <label className="block mb-1">Double</label>
                  <input
                    name="apDouble"
                    type="number"
                    value={formData.apDouble}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
              </div>
            </section>

            {/* EXTRA BED & CHILD */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">
                Extra Bed & Child Policy
              </h2>

              {/* Extra Bed */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block mb-1">Extra Bed EP</label>
                  <input
                    name="extraBedEP"
                    type="number"
                    value={formData.extraBedEP}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1">Extra Bed CP</label>
                  <input
                    name="extraBedCP"
                    type="number"
                    value={formData.extraBedCP}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1">MAP (Single)</label>
                  <input
                    name="extraBedMAPSingle"
                    type="number"
                    value={formData.extraBedMAPSingle}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1">MAP (Double)</label>
                  <input
                    name="extraBedMAPDouble"
                    type="number"
                    value={formData.extraBedMAPDouble}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1">Extra Bed AP</label>
                  <input
                    name="extraBedAP"
                    type="number"
                    value={formData.extraBedAP}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
              </div>

              {/* Child */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block mb-1">Child EP</label>
                  <input
                    name="childEP"
                    type="number"
                    value={formData.childEP}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1">Child CP</label>
                  <input
                    name="childCP"
                    type="number"
                    value={formData.childCP}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1">Child MAP</label>
                  <input
                    name="childMAP"
                    type="number"
                    value={formData.childMAP}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1">Child AP</label>
                  <input
                    name="childAP"
                    type="number"
                    value={formData.childAP}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
              </div>
            </section>

            {/* MEALS & TAX */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">Meals & Tax</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Meals */}
                <div>
                  <h3 className="font-semibold mb-2">Meals</h3>
                  <label className="block mb-1">Breakfast</label>
                  <input
                    name="mealBreakfast"
                    type="number"
                    value={formData.mealBreakfast}
                    onChange={handleChange}
                    className="w-full border p-2 mb-2"
                  />

                  <label className="block mb-1">Lunch</label>
                  <input
                    name="mealLunch"
                    type="number"
                    value={formData.mealLunch}
                    onChange={handleChange}
                    className="w-full border p-2 mb-2"
                  />

                  <label className="block mb-1">Dinner</label>
                  <input
                    name="mealDinner"
                    type="number"
                    value={formData.mealDinner}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>

                {/* Tax */}
                <div>
                  <h3 className="font-semibold mb-2">Tax</h3>
                  <label className="block mb-1">GST (%)</label>
                  <input
                    name="taxGST"
                    type="number"
                    value={formData.taxGST}
                    onChange={handleChange}
                    className="w-full border p-2 mb-2"
                  />

                  <label className="block mb-1">Service Charge (%)</label>
                  <input
                    name="taxServiceCharge"
                    type="number"
                    value={formData.taxServiceCharge}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
              </div>
            </section>

            {/* IMAGES */}
            <section>
              <h2 className="text-lg font-semibold border-b pb-2">Images</h2>

              <input
                type="file"
                ref={fileRef}
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />

              <button
                type="button"
                onClick={openPicker}
                className="flex items-center gap-2 px-4 py-2 border"
              >
                <FaCloudUploadAlt /> Upload Images
              </button>

              {/* EXISTING IMAGES */}
              <div className="flex flex-wrap mt-4 gap-3">
                {existingImages.map((url, idx) => (
                  <div key={idx} className="relative w-24 h-24 border">
                    <img src={url} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveExisting(idx)}
                      className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* NEW IMAGES */}
              <div className="flex flex-wrap mt-4 gap-3">
                {newImages.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24 border">
                    <img src={img.url} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveNew(idx)}
                      className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* BUTTONS */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#006600] text-white py-2 px-10 rounded hover:bg-[#003300]"
              >
                {loading ? "Updating..." : "Update"}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="border border-[#006600] text-[#006600] py-2 px-10 rounded"
              >
                Cancel
              </button>
            </div>

          </form>
        )}
      </div>
    </section>
  );
};

export default EditRoom;
