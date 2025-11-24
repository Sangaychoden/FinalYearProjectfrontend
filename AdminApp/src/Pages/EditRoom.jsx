
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
// //     location: "",
// //     roomNumbers: "",
// //     roomDetails: "",
// //     roomFeatures: "",
// //     bathroomAmenities: "",
// //     optional: "",
// //   });

// //   const [existingImages, setExistingImages] = useState([]); // ✅ images already saved in DB
// //   const [newImages, setNewImages] = useState([]); // ✅ new images selected by user
// //   const [loading, setLoading] = useState(false);

// //   // ✅ Fetch existing room details
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

// //         setFormData({
// //           roomType: room.roomType || "",
// //           price: room.price || "",
// //           numberOfRooms: room.numberOfRooms || "",
// //           size: room.size || "",
// //           beds: room.beds || "",
// //           occupancy: room.occupancy || "",
// //           location: room.location || "",
// //           roomNumbers: Array.isArray(room.roomNumbers)
// //             ? room.roomNumbers.join(", ")
// //             : room.roomNumbers || "",
// //           roomDetails: room.roomDetails || "",
// //           roomFeatures:
// //             typeof room.roomFeatures === "string"
// //               ? room.roomFeatures
// //               : Array.isArray(room.roomFeatures)
// //               ? room.roomFeatures.join(", ")
// //               : "",
// //           bathroomAmenities:
// //             typeof room.bathroomAmenities === "string"
// //               ? room.bathroomAmenities
// //               : Array.isArray(room.bathroomAmenities)
// //               ? room.bathroomAmenities.join(", ")
// //               : "",
// //           optional: room.optional || "",
// //         });

// //         // ✅ load existing image URLs
// //         setExistingImages(Array.isArray(room.images) ? room.images : []);
// //       } catch (err) {
// //         console.error("Fetch Room Error:", err);
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

// //   // ✅ Handle input change
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   // ✅ File picker
// //   const openPicker = () => fileRef.current?.click();

// //   // ✅ Handle new image selection
// //   const handleImageChange = (e) => {
// //     const selectedFiles = Array.from(e.target.files);
// //     const total = existingImages.length + newImages.length + selectedFiles.length;

// //     if (total > 5) {
// //       Swal.fire({
// //         icon: "warning",
// //               title: "Image Limit Reached",
// //               text: `You can upload a maximum of 5 images.`,
// //         confirmButtonColor: "#008000",
// //         color: "#fff",
// //         background: "#006600",
// //       });
// //       return;
// //     }

// //     const newImgs = selectedFiles.map((file) => ({
// //       file,
// //       url: URL.createObjectURL(file),
// //     }));

// //     setNewImages((prev) => [...prev, ...newImgs]);
// //   };

// //   // ✅ Remove existing image
// //   const handleRemoveExisting = (index) => {
// //     const updated = existingImages.filter((_, i) => i !== index);
// //     setExistingImages(updated);
// //   };

// //   // ✅ Remove newly added image
// //   const handleRemoveNew = (index) => {
// //     const updated = newImages.filter((_, i) => i !== index);
// //     setNewImages(updated);
// //   };

// //   // ✅ Submit updates
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     Swal.fire({
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
// //     }).then(async (result) => {
// //       if (!result.isConfirmed) return;

// //       try {
// //         setLoading(true);

// //         const formDataToSend = new FormData();
// //         formDataToSend.append("roomType", formData.roomType);
// //         formDataToSend.append("price", formData.price);
// //         formDataToSend.append("numberOfRooms", formData.numberOfRooms);
// //         formDataToSend.append("size", formData.size);
// //         formDataToSend.append("beds", formData.beds);
// //         formDataToSend.append("occupancy", formData.occupancy);
// //         formDataToSend.append("location", formData.location);
// //         formDataToSend.append("roomNumbers", formData.roomNumbers);
// //         formDataToSend.append("roomDetails", formData.roomDetails);
// //         formDataToSend.append("roomFeatures", formData.roomFeatures);
// //         formDataToSend.append("bathroomAmenities", formData.bathroomAmenities);
// //         formDataToSend.append("optional", formData.optional);

// //         // ✅ Send kept existing images (not removed)
// //         formDataToSend.append("existingImages", JSON.stringify(existingImages));

// //         // ✅ Send new uploaded images
// //         newImages.forEach((img) => {
// //           if (img.file) formDataToSend.append("images", img.file);
// //         });

// //         const response = await fetch(`${API_URL}/rooms/rooms/${roomId}`, {
// //           method: "PUT",
// //           credentials: "include",
// //           body: formDataToSend,
// //         });

// //         if (!response.ok)
// //           throw new Error(`Update failed (${response.status})`);

// //         Swal.fire({
// //           icon: "success",
// //           title: "Room updated successfully!",
// //           confirmButtonColor: "#008000",
// //           color: "#fff",
// //           background: "#006600",
// //         }).then(() => {
// //           navigate(`/room-display/${roomId}`);
// //         });
// //       } catch (err) {
// //         console.error("Update error:", err);
// //         Swal.fire({
// //           icon: "error",
// //           title: "Update Failed",
// //           text: err.message,
// //           confirmButtonColor: "#008000",
// //           color: "#fff",
// //           background: "#006600",
// //         });
// //       } finally {
// //         setLoading(false);
// //       }
// //     });
// //   };

// //   return (
// //     <section className="min-h-screen bg-gray-50 font-inter py-6">
// //       <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg -lg">
// //         <h1 className="text-2xl font-semibold text-black mb-6">Edit Room</h1>

// //         {loading ? (
// //           <p className="text-gray-600 text-center">Loading...</p>
// //         ) : (
// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             {/* Room Type + Price */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">
// //                   Room Type
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="roomType"
// //                   value={formData.roomType}
// //                   onChange={handleChange}
// //                   className="w-full border border-gray-300 p-3 -md"
// //                   required
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">
// //                   Price
// //                 </label>
// //                 <input
// //                   type="number"
// //                   name="price"
// //                   value={formData.price}
// //                   onChange={handleChange}
// //                   className="w-full border border-gray-300 p-3 -md"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             {/* Number of Rooms + Size */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">
// //                   Number of Rooms
// //                 </label>
// //                 <input
// //                   type="number"
// //                   name="numberOfRooms"
// //                   value={formData.numberOfRooms}
// //                   onChange={handleChange}
// //                   className="w-full border border-gray-300 p-3 -md"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">
// //                   Room Size (m²)
// //                 </label>
// //                 <input
// //                   type="number"
// //                   name="size"
// //                   value={formData.size}
// //                   onChange={handleChange}
// //                   className="w-full border border-gray-300 p-3 -md"
// //                 />
// //               </div>
// //             </div>

// //             {/* Beds + Occupancy */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">
// //                   Beds
// //                 </label>
// //                 <input
// //                   type="number"
// //                   name="beds"
// //                   value={formData.beds}
// //                   onChange={handleChange}
// //                   className="w-full border border-gray-300 p-3 -md"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">
// //                   Occupancy
// //                 </label>
// //                 <input
// //                   type="number"
// //                   name="occupancy"
// //                   value={formData.occupancy}
// //                   onChange={handleChange}
// //                   className="w-full border border-gray-300 p-3 -md"
// //                 />
// //               </div>
// //             </div>

// //             {/* Location */}
// //             <div>
// //               <label className="block text-gray-700 font-medium mb-2">
// //                 Location
// //               </label>
// //               <input
// //                 type="text"
// //                 name="location"
// //                 value={formData.location}
// //                 onChange={handleChange}
// //                 className="w-full border border-gray-300 p-3 -md"
// //               />
// //             </div>

// //             {/* Room Details */}
// //             <div>
// //               <label className="block text-gray-700 font-medium mb-2">
// //                 Room Details
// //               </label>
// //               <textarea
// //                 name="roomDetails"
// //                 value={formData.roomDetails}
// //                 onChange={handleChange}
// //                 rows="4"
// //                 className="w-full border border-gray-300 p-3 -md"
// //               />
// //             </div>

// //             {/* Features */}
// //             <div>
// //               <label className="block text-gray-700 font-medium mb-2">
// //                 Room Features (comma separated)
// //               </label>
// //               <input
// //                 type="text"
// //                 name="roomFeatures"
// //                 value={formData.roomFeatures}
// //                 onChange={handleChange}
// //                 className="w-full border border-gray-300 p-3 -md"
// //               />
// //             </div>

// //             {/* Bathroom Amenities */}
// //             <div>
// //               <label className="block text-gray-700 font-medium mb-2">
// //                 Bathroom Amenities (comma separated)
// //               </label>
// //               <input
// //                 type="text"
// //                 name="bathroomAmenities"
// //                 value={formData.bathroomAmenities}
// //                 onChange={handleChange}
// //                 className="w-full border border-gray-300 p-3 -md"
// //               />
// //             </div>

// //             {/* Optional */}
// //             <div>
// //               <label className="block text-gray-700 font-medium mb-2">
// //                 Optional
// //               </label>
// //               <input
// //                 type="text"
// //                 name="optional"
// //                 value={formData.optional}
// //                 onChange={handleChange}
// //                 className="w-full border border-gray-300 p-3 -md"
// //               />
// //             </div>

// //             {/* Images */}
// //             <div>
// //               <label className="block text-gray-700 font-medium mb-2">
// //                 Room Images (Max 5)
// //               </label>
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 multiple
// //                 ref={fileRef}
// //                 onChange={handleImageChange}
// //                 className="hidden"
// //               />

// //               <div className="flex items-center gap-3 mb-3">
// //                 <button
// //                   type="button"
// //                   onClick={openPicker}
// //                   className="flex items-center gap-2 px-4 py-2 border border-gray-300 -md hover:bg-gray-100 transition"
// //                 >
// //                   <FaCloudUploadAlt className="text-gray-600 w-5 h-5" />
// //                   <span className="text-gray-700 font-medium">
// //                     Upload Image
// //                   </span>
// //                 </button>
// //                 <span className="text-gray-600">
// //                   {existingImages.length + newImages.length} file
// //                   {existingImages.length + newImages.length !== 1 ? "s" : ""}{" "}
// //                   selected
// //                 </span>
// //               </div>

// //               {/* Existing Images */}
// //               {existingImages.length > 0 && (
// //                 <div className="flex flex-wrap mt-2 gap-3">
// //                   {existingImages.map((url, i) => (
// //                     <div
// //                       key={i}
// //                       className="relative w-24 h-24 border -md overflow-hidden group"
// //                     >
// //                       <img
// //                         src={url}
// //                         alt={`Existing ${i}`}
// //                         className="w-full h-full object-cover"
// //                       />
// //                       <button
// //                         type="button"
// //                         onClick={() => handleRemoveExisting(i)}
// //                         className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
// //                       >
// //                         ×
// //                       </button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}

// //               {/* New Images */}
// //               {newImages.length > 0 && (
// //                 <div className="flex flex-wrap mt-2 gap-3">
// //                   {newImages.map((img, i) => (
// //                     <div
// //                       key={i}
// //                       className="relative w-24 h-24 border -md overflow-hidden group"
// //                     >
// //                       <img
// //                         src={img.url}
// //                         alt={`New ${i}`}
// //                         className="w-full h-full object-cover"
// //                       />
// //                       <button
// //                         type="button"
// //                         onClick={() => handleRemoveNew(i)}
// //                         className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
// //                       >
// //                         ×
// //                       </button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>

// //             {/* Buttons */}
// //             <div className="flex justify-center gap-4">
// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="bg-[#006600] text-white py-2 px-8 -md hover:bg-[#000000] transition"
// //               >
// //                 {loading ? "Updating..." : "Update"}
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={() => navigate(-1)}
// //                 className="border border-[#006600] text-[#006600] py-2 px-8 -md transition"
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
//     roomType: "",
//     price: "",
//     numberOfRooms: "",
//     size: "",
//     beds: "",
//     occupancy: "",
//     location: "",
//     roomNumbers: "",       // 👈 Newly added field
//     roomDetails: "",
//     roomFeatures: "",
//     bathroomAmenities: "",
//     optional: "",
//   });

//   const [existingImages, setExistingImages] = useState([]);
//   const [newImages, setNewImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch existing room details
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

//         setFormData({
//           roomType: room.roomType || "",
//           price: room.price || "",
//           numberOfRooms: room.numberOfRooms || "",
//           size: room.size || "",
//           beds: room.beds || "",
//           occupancy: room.occupancy || "",
//           location: room.location || "",
//           roomNumbers: Array.isArray(room.roomNumbers)
//             ? room.roomNumbers.join(", ")
//             : room.roomNumbers || "",    // 👈 Load room numbers
//           roomDetails: room.roomDetails || "",
//           roomFeatures:
//             typeof room.roomFeatures === "string"
//               ? room.roomFeatures
//               : Array.isArray(room.roomFeatures)
//               ? room.roomFeatures.join(", ")
//               : "",
//           bathroomAmenities:
//             typeof room.bathroomAmenities === "string"
//               ? room.bathroomAmenities
//               : Array.isArray(room.bathroomAmenities)
//               ? room.bathroomAmenities.join(", ")
//               : "",
//           optional: room.optional || "",
//         });

//         setExistingImages(Array.isArray(room.images) ? room.images : []);
//       } catch (err) {
//         console.error("Fetch Room Error:", err);
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

//   // Inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // File picker
//   const openPicker = () => fileRef.current?.click();

//   // Add images
//   const handleImageChange = (e) => {
//     const selected = Array.from(e.target.files);
//     const total = existingImages.length + newImages.length + selected.length;

//     if (total > 5) {
//       Swal.fire({
//         icon: "warning",
//         title: "Image Limit Reached",
//         text: "Maximum 5 images allowed",
//         confirmButtonColor: "#008000",
//         color: "#fff",
//         background: "#006600",
//       });
//       return;
//     }

//     const mapped = selected.map((file) => ({
//       file,
//       url: URL.createObjectURL(file),
//     }));

//     setNewImages((prev) => [...prev, ...mapped]);
//   };

//   const handleRemoveExisting = (index) =>
//     setExistingImages(existingImages.filter((_, i) => i !== index));

//   const handleRemoveNew = (index) =>
//     setNewImages(newImages.filter((_, i) => i !== index));

//   // Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     Swal.fire({
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
//     }).then(async (result) => {
//       if (!result.isConfirmed) return;

//       try {
//         setLoading(true);

//         const fd = new FormData();
//         for (const key in formData) {
//           fd.append(key, formData[key]);
//         }

//         fd.append("existingImages", JSON.stringify(existingImages));

//         newImages.forEach((img) => {
//           if (img.file) fd.append("images", img.file);
//         });

//         const res = await fetch(`${API_URL}/rooms/rooms/${roomId}`, {
//           method: "PUT",
//           credentials: "include",
//           body: fd,
//         });

//         if (!res.ok) throw new Error(`Update failed (${res.status})`);

//         Swal.fire({
//           icon: "success",
//           title: "Room updated successfully!",
//           confirmButtonColor: "#008000",
//           color: "#fff",
//           background: "#006600",
//         }).then(() => navigate(`/room-display/${roomId}`));
//       } catch (err) {
//         console.error("Update error:", err);
//         Swal.fire({
//           icon: "error",
//           title: "Update Failed",
//           text: err.message,
//           confirmButtonColor: "#008000",
//           color: "#fff",
//           background: "#006600",
//         });
//       } finally {
//         setLoading(false);
//       }
//     });
//   };

//   return (
//     <section className="min-h-screen bg-gray-50 font-inter py-6">
//       <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
//         <h1 className="text-2xl font-semibold text-black mb-6">Edit Room</h1>

//         {loading ? (
//           <p className="text-gray-600 text-center">Loading...</p>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-6">

//             {/* Room Type + Price */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="text-gray-700 font-medium mb-2 block">
//                   Room Type
//                 </label>
//                 <input
//                   type="text"
//                   name="roomType"
//                   value={formData.roomType}
//                   onChange={handleChange}
//                   className="w-full border p-3"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="text-gray-700 font-medium mb-2 block">
//                   Price
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   className="w-full border p-3"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Number of Rooms + Size */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//               {/* Number of Rooms */}
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Number of Rooms
//                 </label>
//                 <input
//                   type="number"
//                   name="numberOfRooms"
//                   value={formData.numberOfRooms}
//                   onChange={handleChange}
//                   className="w-full border p-3"
//                 />
//               </div>

//               {/* Room Numbers (NEW FIELD) */}
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Room Numbers (comma separated)
//                 </label>
//                 <input
//                   type="text"
//                   name="roomNumbers"
//                   value={formData.roomNumbers}
//                   onChange={handleChange}
//                   placeholder="e.g., 101, 102, 103"
//                   className="w-full border p-3"
//                 />
//               </div>
//             </div>

//             {/* Size */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">
//                 Room Size (m²)
//               </label>
//               <input
//                 type="number"
//                 name="size"
//                 value={formData.size}
//                 onChange={handleChange}
//                 className="w-full border p-3"
//               />
//             </div>

//             {/* Beds + Occupancy */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Beds
//                 </label>
//                 <input
//                   type="number"
//                   name="beds"
//                   value={formData.beds}
//                   onChange={handleChange}
//                   className="w-full border p-3"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Occupancy
//                 </label>
//                 <input
//                   type="number"
//                   name="occupancy"
//                   value={formData.occupancy}
//                   onChange={handleChange}
//                   className="w-full border p-3"
//                 />
//               </div>
//             </div>

//             {/* Location */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">
//                 Location
//               </label>
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 className="w-full border p-3"
//               />
//             </div>

//             {/* Room Details */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">
//                 Room Details
//               </label>
//               <textarea
//                 name="roomDetails"
//                 value={formData.roomDetails}
//                 onChange={handleChange}
//                 rows="4"
//                 className="w-full border p-3"
//               />
//             </div>

//             {/* Features */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">
//                 Room Features (comma separated)
//               </label>
//               <input
//                 type="text"
//                 name="roomFeatures"
//                 value={formData.roomFeatures}
//                 onChange={handleChange}
//                 className="w-full border p-3"
//               />
//             </div>

//             {/* Bathroom Amenities */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">
//                 Bathroom Amenities (comma separated)
//               </label>
//               <input
//                 type="text"
//                 name="bathroomAmenities"
//                 value={formData.bathroomAmenities}
//                 onChange={handleChange}
//                 className="w-full border p-3"
//               />
//             </div>

//             {/* Optional */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">
//                 Optional
//               </label>
//               <input
//                 type="text"
//                 name="optional"
//                 value={formData.optional}
//                 onChange={handleChange}
//                 className="w-full border p-3"
//               />
//             </div>

//             {/* Images Section */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">
//                 Room Images (Max 5)
//               </label>

//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 ref={fileRef}
//                 onChange={handleImageChange}
//                 className="hidden"
//               />

//               <button
//                 type="button"
//                 onClick={openPicker}
//                 className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-100"
//               >
//                 <FaCloudUploadAlt className="text-gray-600 w-5 h-5" />
//                 Upload Images
//               </button>

//               {/* Existing Images */}
//               {existingImages.length > 0 && (
//                 <div className="flex flex-wrap gap-3 mt-3">
//                   {existingImages.map((url, i) => (
//                     <div key={i} className="relative w-24 h-24 border overflow-hidden group">
//                       <img src={url} className="w-full h-full object-cover" />
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveExisting(i)}
//                         className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 rounded opacity-0 group-hover:opacity-100"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* New Images */}
//               {newImages.length > 0 && (
//                 <div className="flex flex-wrap gap-3 mt-3">
//                   {newImages.map((img, i) => (
//                     <div key={i} className="relative w-24 h-24 border overflow-hidden group">
//                       <img src={img.url} className="w-full h-full object-cover" />
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveNew(i)}
//                         className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 rounded opacity-0 group-hover:opacity-100"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Buttons */}
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
//                 className="border border-[#006600] text-[#006600] py-2 px-8 hover:bg-gray-200"
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
    price: "",
    numberOfRooms: "",
    size: "",
    beds: "",
    occupancy: "",
    roomNumbers: "",
    roomDetails: "",
    roomFeatures: "",
    bathroomAmenities: "",
    optional: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch room details
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/rooms/rooms/${roomId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error(`Failed to fetch room (${res.status})`);

        const data = await res.json();
        const room = data.room || data;

        // AGGRESSIVE ROOM NUMBER FIX 🔥
        let formattedRoomNumbers = "";

        if (Array.isArray(room.roomNumbers)) {
          formattedRoomNumbers = room.roomNumbers.join(", ");
        } else if (typeof room.roomNumbers === "string") {
          try {
            const parsed = JSON.parse(room.roomNumbers);
            if (Array.isArray(parsed)) {
              formattedRoomNumbers = parsed.join(", ");
            } else {
              formattedRoomNumbers = room.roomNumbers
                .replace(/[\[\]\"]/g, "")
                .replace(/\s+/g, "")
                .split(",")
                .join(", ");
            }
          } catch {
            formattedRoomNumbers = room.roomNumbers
              .replace(/[\[\]\"]/g, "")
              .replace(/\s+/g, "")
              .split(",")
              .join(", ");
          }
        }

        setFormData({
          roomType: room.roomType || "",
          price: room.price || "",
          numberOfRooms: room.numberOfRooms || "",
          size: room.size || "",
          beds: room.beds || "",
          occupancy: room.occupancy || "",
          roomNumbers: formattedRoomNumbers,
          roomDetails: room.roomDetails || "",
          roomFeatures:
            Array.isArray(room.roomFeatures)
              ? room.roomFeatures.join(", ")
              : room.roomFeatures || "",
          bathroomAmenities:
            Array.isArray(room.bathroomAmenities)
              ? room.bathroomAmenities.join(", ")
              : room.bathroomAmenities || "",
          optional: room.optional || "",
        });

        setExistingImages(Array.isArray(room.images) ? room.images : []);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error loading room",
          text: err.message,
          confirmButtonColor: "#008000",
          color: "#fff",
          background: "#006600",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open file picker
  const openPicker = () => fileRef.current?.click();

  // Add image
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (existingImages.length + newImages.length + files.length > 5) {
      Swal.fire({
        icon: "warning",
        title: "Image limit reached",
        text: "Max 5 images allowed.",
        confirmButtonColor: "#008000",
        color: "#fff",
        background: "#006600",
      });
      return;
    }

    const mapped = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setNewImages((prev) => [...prev, ...mapped]);
  };

  const handleRemoveExisting = (i) =>
    setExistingImages(existingImages.filter((_, index) => index !== i));

  const handleRemoveNew = (i) =>
    setNewImages(newImages.filter((_, index) => index !== i));

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: "Confirm Update",
      text: "Do you want to update this room?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      color: "#fff",
      background: "#006600",
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);

      const fd = new FormData();

      // Convert cleaned room numbers back to array
      const cleanRoomNumbers = formData.roomNumbers
        .split(",")
        .map((n) => n.trim())
        .filter((n) => n !== "");

      fd.append("roomNumbers", JSON.stringify(cleanRoomNumbers));

      // Append remaining fields
      [
        "roomType",
        "price",
        "numberOfRooms",
        "size",
        "beds",
        "occupancy",
        "roomDetails",
        "roomFeatures",
        "bathroomAmenities",
        "optional",
      ].forEach((field) => {
        fd.append(field, formData[field]);
      });

      fd.append("existingImages", JSON.stringify(existingImages));
      newImages.forEach((img) => fd.append("images", img.file));

      const res = await fetch(`${API_URL}/rooms/rooms/${roomId}`, {
        method: "PUT",
        credentials: "include",
        body: fd,
      });

      if (!res.ok) throw new Error("Update failed");

      Swal.fire({
        icon: "success",
        title: "Room updated successfully!",
        confirmButtonColor: "#008000",
        color: "#fff",
        background: "#006600",
      }).then(() => navigate(`/room-display/${roomId}`));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update error",
        text: err.message,
        confirmButtonColor: "#008000",
        color: "#fff",
        background: "#006600",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Edit Room</h1>

        {loading ? (
          <p className="text-gray-600 text-center">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label>Room Type</label>
                <input
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="w-full border p-3"
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border p-3"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label>Number of Rooms</label>
                <input
                  type="number"
                  name="numberOfRooms"
                  value={formData.numberOfRooms}
                  onChange={handleChange}
                  className="w-full border p-3"
                />
              </div>

              <div>
                <label>Room Numbers (comma separated)</label>
                <input
                  type="text"
                  name="roomNumbers"
                  value={formData.roomNumbers}
                  onChange={handleChange}
                  className="w-full border p-3"
                  placeholder="101, 102, 103"
                />
              </div>
            </div>

            {/* Size */}
            <div>
              <label>Size (m²)</label>
              <input
                type="number"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full border p-3"
              />
            </div>

            {/* Beds & Occupancy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label>Beds</label>
                <input
                  type="number"
                  name="beds"
                  value={formData.beds}
                  onChange={handleChange}
                  className="w-full border p-3"
                />
              </div>

              <div>
                <label>Occupancy</label>
                <input
                  type="number"
                  name="occupancy"
                  value={formData.occupancy}
                  onChange={handleChange}
                  className="w-full border p-3"
                />
              </div>
            </div>



            {/* Room Details */}
            <div>
              <label>Room Details</label>
              <textarea
                name="roomDetails"
                value={formData.roomDetails}
                onChange={handleChange}
                rows="4"
                className="w-full border p-3"
              ></textarea>
            </div>

            {/* Room Features */}
            <div>
              <label>Room Features (comma separated)</label>
              <input
                name="roomFeatures"
                value={formData.roomFeatures}
                onChange={handleChange}
                className="w-full border p-3"
              />
            </div>

            {/* Bathroom Amenities */}
            <div>
              <label>Bathroom Amenities (comma separated)</label>
              <input
                name="bathroomAmenities"
                value={formData.bathroomAmenities}
                onChange={handleChange}
                className="w-full border p-3"
              />
            </div>

            {/* Optional */}
            <div>
              <label>Optional</label>
              <input
                name="optional"
                value={formData.optional}
                onChange={handleChange}
                className="w-full border p-3"
              />
            </div>

            {/* Images */}
            <div>
              <label>Room Images (Max 5)</label>

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
                className="flex items-center gap-2 px-4 py-2 border border-gray-300"
                onClick={openPicker}
              >
                <FaCloudUploadAlt className="w-5 h-5" />
                Upload Images
              </button>

              <div className="flex flex-wrap gap-3 mt-4">
                {existingImages.map((url, idx) => (
                  <div key={idx} className="relative w-24 h-24 border">
                    <img src={url} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveExisting(idx)}
                      className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 rounded"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                {newImages.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24 border">
                    <img src={img.url} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveNew(idx)}
                      className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 rounded"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#006600] text-white py-2 px-8 hover:bg-black"
              >
                {loading ? "Updating..." : "Update"}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="border border-[#006600] text-[#006600] py-2 px-8"
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
