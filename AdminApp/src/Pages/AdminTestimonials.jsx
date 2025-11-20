
// // // import React, { useEffect, useMemo, useState } from "react";
// // // import { Link } from "react-router-dom";
// // // import Swal from "sweetalert2";
// // // import { Plus } from "lucide-react";

// // // const GREEN = "#006600";
// // // const CONFIRM_GREEN = "#008000";
// // // const DEFAULT_PHOTO =
// // //   "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; // default avatar

// // // const API_BASE = "http://localhost:3000/testimonials";

// // // const AdminTestimonials = () => {
// // //   const [items, setItems] = useState([]);
// // //   const [tab, setTab] = useState("published");
// // //   const [loading, setLoading] = useState(false);

// // //   // Fetch testimonials based on tab
// // //   const fetchTestimonials = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const endpoint =
// // //         tab === "published"
// // //           ? `${API_BASE}/testimonials`
// // //           : `${API_BASE}/testimonials/archived`;
// // //       const res = await fetch(endpoint);
// // //       if (!res.ok) throw new Error("Failed to fetch testimonials");
// // //       const data = await res.json();
// // //       setItems(data.testimonials || []);
// // //     } catch (error) {
// // //       console.error("Error fetching testimonials:", error);
// // //       Swal.fire({
// // //         title: "Error",
// // //         text: "Failed to fetch testimonials.",
// // //         icon: "error",
// // //         confirmButtonColor: CONFIRM_GREEN,
// // //         color: "#fff",
// // //         background: GREEN,
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchTestimonials();
// // //   }, [tab]);

// // //   const toggleArchive = async (id, isArchived) => {
// // //     const goingTo = isArchived ? "restore" : "archive";
// // //     Swal.fire({
// // //       title:
// // //         goingTo === "archive"
// // //           ? "Archive testimonial?"
// // //           : "Restore testimonial?",
// // //       icon: "question",
// // //       showCancelButton: true,
// // //       confirmButtonColor: CONFIRM_GREEN,
// // //       cancelButtonColor: "#d33",
// // //       color: "#fff",
// // //       background: GREEN,
// // //       confirmButtonText: goingTo === "archive" ? "Archive" : "Restore",
// // //     }).then(async (res) => {
// // //       if (res.isConfirmed) {
// // //         try {
// // //           const endpoint = `${API_BASE}/testimonials/${id}`;
// // //           const response = await fetch(endpoint, {
// // //             method: "PATCH",
// // //             headers: { "Content-Type": "application/json" },
// // //             body: JSON.stringify({ isArchived: !isArchived }),
// // //           });

// // //           if (!response.ok) throw new Error("Failed to update status");

// // //           Swal.fire({
// // //             title: "Done",
// // //             text:
// // //               goingTo === "archive"
// // //                 ? "Moved to Archived."
// // //                 : "Moved to Published.",
// // //             icon: "success",
// // //             confirmButtonColor: CONFIRM_GREEN,
// // //             color: "#fff",
// // //             background: GREEN,
// // //           });

// // //           fetchTestimonials();
// // //         } catch (error) {
// // //           console.error("Error updating testimonial:", error);
// // //           Swal.fire({
// // //             title: "Error",
// // //             text: "Failed to update testimonial.",
// // //             icon: "error",
// // //             confirmButtonColor: CONFIRM_GREEN,
// // //             color: "#fff",
// // //             background: GREEN,
// // //           });
// // //         }
// // //       }
// // //     });
// // //   };

// // //   const filtered = useMemo(() => items, [items]);

// // //   return (
// // //     <main className="px-2 font-Arial bg-white text-black min-h-screen">
// // //       <h2 className="text-2xl font-bold text-gray-800 mb-6">Testimonials</h2>

// // //       {/* Tabs + Add Button */}
// // //       <div className="flex items-center justify-between mb-6">
// // //         <div className="flex items-center">
// // //           <button
// // //             onClick={() => setTab("published")}
// // //             className={`px-6 py-2 font-small border ${
// // //               tab === "published" ? "text-white" : "bg-white text-black"
// // //             }`}
// // //             style={{
// // //               backgroundColor: tab === "published" ? GREEN : "transparent",
// // //               borderColor: tab === "published" ? GREEN : "#000000ff",
// // //             }}
// // //           >
// // //             PUBLISHED
// // //           </button>
// // //           <button
// // //             onClick={() => setTab("archived")}
// // //             className={`px-6 py-2 font-small border ${
// // //               tab === "archived" ? "text-white" : "bg-white text-black"
// // //             }`}
// // //             style={{
// // //               backgroundColor: tab === "archived" ? GREEN : "transparent",
// // //               borderColor: tab === "archived" ? GREEN : "#000000ff",
// // //             }}
// // //           >
// // //             ARCHIVED
// // //           </button>
// // //         </div>

// // //         <Link
// // //           to="/add-testimonial"
// // //           className="inline-flex items-center gap-2 px-4 h-10 text-md text-white shadow-md hover:shadow-lg transition"
// // //           style={{ backgroundColor: GREEN }}
// // //         >
// // //           <Plus size={18} />
// // //           Add Testimonials
// // //         </Link>
// // //       </div>

// // //       {/* Testimonials List */}
// // //       {loading ? (
// // //         <div className="text-gray-600 italic">Loading testimonials...</div>
// // //       ) : (
// // //         <div className="space-y-5">
// // //           {filtered.map((t) => (
// // //             <article
// // //               key={t._id}
// // //               className="border border-gray-200 bg-white rounded-none p-6"
// // //             >
// // //               <div className="flex items-start gap-6">
// // //                 {/* Photo */}
// // //                 <div className="w-32 h-32 bg-gray-100 overflow-hidden flex-shrink-0">
// // //                   <img
// // //                     src={t.image || DEFAULT_PHOTO}
// // //                     alt={t.name}
// // //                     className="w-full h-full object-cover"
// // //                   />
// // //                 </div>

// // //                 {/* Text Content */}
// // //                 <div className="flex-1">
// // //                   <h3
// // //                     className="text-xl font-bold uppercase"
// // //                     style={{ color: GREEN }}
// // //                   >
// // //                     {t.name}
// // //                   </h3>
// // //                   <p className="text-md font-semibold mt-1 text-black">
// // //                     {t.stayPeriod}
// // //                   </p>
// // //                   <p className="text-md mt-2 leading-6 text-gray-800">
// // //                     {t.message}
// // //                   </p>
// // //                 </div>

// // //                 {/* Action Buttons */}
// // //                 <div className="flex flex-col gap-2 items-end">
// // //                  <Link
// // //                     to={`/edit-testimonial/${t._id}`}
// // //                     state={{ testimonial: t }}
// // //                     className="w-24 h-10 inline-flex items-center justify-center text-sm font-semibold text-white rounded-none"
// // //                     style={{ backgroundColor: GREEN }}
// // //                   >
// // //                     Edit
// // //                   </Link>

// // //                   <button
// // //                     onClick={() => toggleArchive(t._id, t.isArchived)}
// // //                     className="w-24 h-10 inline-flex items-center justify-center text-sm font-semibold text-white rounded-none"
// // //                     style={{
// // //                       backgroundColor: t.isArchived ? GREEN : "#b91c1c",
// // //                     }}
// // //                   >
// // //                     {t.isArchived ? "Restore" : "Archive"}
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </article>
// // //           ))}

// // //           {filtered.length === 0 && (
// // //             <div className="text-sm text-gray-500 italic">
// // //               No testimonials found.
// // //             </div>
// // //           )}
// // //         </div>
// // //       )}
// // //     </main>
// // //   );
// // // };

// // // export default AdminTestimonials;
// // // src/Admin/Pages/AdminTestimonials.jsx
// // import React, { useEffect, useMemo, useState } from "react";
// // import { Link } from "react-router-dom";
// // import Swal from "sweetalert2";
// // import { Plus } from "lucide-react";

// // const GREEN = "#006600";
// // const CONFIRM_GREEN = "#008000";
// // const DEFAULT_PHOTO =
// //   "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; // default avatar

// // const API_BASE = `${import.meta.env.VITE_API_URL}/testimonials`;

// // const AdminTestimonials = () => {
// //   const [items, setItems] = useState([]);
// //   const [tab, setTab] = useState("published");
// //   const [loading, setLoading] = useState(false);

// //   // ✅ Fetch testimonials based on tab
// //   const fetchTestimonials = async () => {
// //     setLoading(true);
// //     try {
// //       const endpoint =
// //         tab === "published"
// //           ? `${API_BASE}/testimonials`
// //           : `${API_BASE}/testimonials/archived`;
// //       const res = await fetch(endpoint, { credentials: "include" });
// //       if (!res.ok) throw new Error("Failed to fetch testimonials");
// //       const data = await res.json();
// //       setItems(data.testimonials || []);
// //     } catch (error) {
// //       console.error("Error fetching testimonials:", error);
// //       Swal.fire({
// //         title: "Error",
// //         text: "Failed to fetch testimonials.",
// //         icon: "error",
// //         confirmButtonColor: CONFIRM_GREEN,
// //         color: "#fff",
// //         background: GREEN,
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchTestimonials();
// //   }, [tab]);

// //   // ✅ Archive / Restore handler
// //   const toggleArchive = async (id, isArchived) => {
// //     const action = isArchived ? "restore" : "archive";
// //     const confirmTitle = isArchived
// //       ? "Restore Testimonial?"
// //       : "Archive Testimonial?";
// //     const confirmText = isArchived
// //       ? "Do you want to restore this testimonial?"
// //       : "Do you want to archive this testimonial?";

// //     const result = await Swal.fire({
// //       title: confirmTitle,
// //       text: confirmText,
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonText: isArchived ? "Restore" : "Archive",
// //       cancelButtonText: "Cancel",
// //       confirmButtonColor: CONFIRM_GREEN,
// //       cancelButtonColor: "#d33",
// //       color: "#fff",
// //       background: GREEN,
// //     });

// //     if (!result.isConfirmed) return;

// //     try {
// //       // ✅ Choose correct endpoint based on action
// //       const endpoint = isArchived
// //         ? `${API_BASE}/testimonials/${id}/restore`
// //         : `${API_BASE}/testimonials/${id}/archive`;

// //       const res = await fetch(endpoint, {
// //         method: "PATCH",
// //         credentials: "include", // ✅ send cookies
// //       });

// //       if (!res.ok) throw new Error("Failed to update testimonial status");

// //       const data = await res.json();

// //       await Swal.fire({
// //         title: "Success",
// //         text: data.message || (isArchived ? "Restored successfully!" : "Archived successfully!"),
// //         icon: "success",
// //         confirmButtonColor: CONFIRM_GREEN,
// //         background: GREEN,
// //         color: "#fff",
// //       });

// //       fetchTestimonials(); // ✅ Refresh list
// //     } catch (error) {
// //       console.error("Error updating testimonial:", error);
// //       Swal.fire({
// //         title: "Error",
// //         text: "Failed to update testimonial.",
// //         icon: "error",
// //         confirmButtonColor: CONFIRM_GREEN,
// //         color: "#fff",
// //         background: GREEN,
// //       });
// //     }
// //   };

// //   const filtered = useMemo(() => items, [items]);

// //   return (
// //     <main className="px-2 font-Arial bg-white text-black min-h-screen">
// //       <h2 className="text-2xl font-bold text-gray-800 mb-6">Testimonials</h2>

// //       {/* Tabs + Add Button */}
// //       <div className="flex items-center justify-between mb-6">
// //         <div className="flex items-center">
// //           <button
// //             onClick={() => setTab("published")}
// //             className={`px-6 py-2 font-small border ${
// //               tab === "published" ? "text-white" : "bg-white text-black"
// //             }`}
// //             style={{
// //               backgroundColor: tab === "published" ? GREEN : "transparent",
// //               borderColor: tab === "published" ? GREEN : "#000000ff",
// //             }}
// //           >
// //             PUBLISHED
// //           </button>
// //           <button
// //             onClick={() => setTab("archived")}
// //             className={`px-6 py-2 font-small border ${
// //               tab === "archived" ? "text-white" : "bg-white text-black"
// //             }`}
// //             style={{
// //               backgroundColor: tab === "archived" ? GREEN : "transparent",
// //               borderColor: tab === "archived" ? GREEN : "#000000ff",
// //             }}
// //           >
// //             ARCHIVED
// //           </button>
// //         </div>

// //         <Link
// //           to="/add-testimonial"
// //           className="inline-flex items-center gap-2 px-4 h-10 text-md text-white shadow-md hover:shadow-lg transition"
// //           style={{ backgroundColor: GREEN }}
// //         >
// //           <Plus size={18} />
// //           Add Testimonials
// //         </Link>
// //       </div>

// //       {/* Testimonials List */}
// //       {loading ? (
// //         <div className="text-gray-600 italic">Loading testimonials...</div>
// //       ) : (
// //         <div className="space-y-5">
// //           {filtered.map((t) => (
// //             <article
// //               key={t._id}
// //               className="border border-gray-200 bg-white rounded-none p-6"
// //             >
// //               <div className="flex items-start gap-6">
// //                 {/* Photo */}
// //                 <div className="w-32 h-32 bg-gray-100 overflow-hidden flex-shrink-0">
// //                   <img
// //                     src={t.image || DEFAULT_PHOTO}
// //                     alt={t.name}
// //                     className="w-full h-full object-cover"
// //                   />
// //                 </div>

// //                 {/* Text Content */}
// //                 <div className="flex-1">
// //                   <h3
// //                     className="text-xl font-bold uppercase"
// //                     style={{ color: GREEN }}
// //                   >
// //                     {t.name}
// //                   </h3>
// //                   <p className="text-md font-semibold mt-1 text-black">
// //                     {t.stayPeriod}
// //                   </p>
// //                   <p className="text-md mt-2 leading-6 text-gray-800">
// //                     {t.message}
// //                   </p>
// //                 </div>

// //                 {/* Action Buttons */}
// //                 <div className="flex flex-col gap-2 items-end">
// //                   <Link
// //                     to={`/edit-testimonial/${t._id}`}
// //                     state={{ testimonial: t }}
// //                     className="w-24 h-10 inline-flex items-center justify-center text-sm font-semibold text-white rounded-none"
// //                     style={{ backgroundColor: GREEN }}
// //                   >
// //                     Edit
// //                   </Link>

// //                   <button
// //                     onClick={() => toggleArchive(t._id, t.isArchived)}
// //                     className="w-24 h-10 inline-flex items-center justify-center text-sm font-semibold text-white rounded-none"
// //                     style={{
// //                       backgroundColor: t.isArchived ? CONFIRM_GREEN : "#b91c1c",
// //                     }}
// //                   >
// //                     {t.isArchived ? "Restore" : "Archive"}
// //                   </button>
// //                 </div>
// //               </div>
// //             </article>
// //           ))}

// //           {filtered.length === 0 && (
// //             <div className="text-sm text-gray-500 italic">
// //               No testimonials found.
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </main>
// //   );
// // };

// // export default AdminTestimonials;
// // src/Admin/Pages/AdminTestimonials.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { Plus } from "lucide-react";

// const GREEN = "#006600";
// const CONFIRM_GREEN = "#008000";
// const RESTORE_ORANGE = "#FFA500"; // ✅ new orange for restore
// const DEFAULT_PHOTO =
//   "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; // default avatar

// const API_BASE = `${import.meta.env.VITE_API_URL}/testimonials`;

// const AdminTestimonials = () => {
//   const [items, setItems] = useState([]);
//   const [tab, setTab] = useState("published");
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch testimonials
//   const fetchTestimonials = async () => {
//     setLoading(true);
//     try {
//       const endpoint =
//         tab === "published"
//           ? `${API_BASE}/testimonials`
//           : `${API_BASE}/testimonials/archived`;
//       const res = await fetch(endpoint, { credentials: "include" });
//       if (!res.ok) throw new Error("Failed to fetch testimonials");
//       const data = await res.json();
//       setItems(data.testimonials || []);
//     } catch (error) {
//       console.error("Error fetching testimonials:", error);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to fetch testimonials.",
//         icon: "error",
//         confirmButtonColor: CONFIRM_GREEN,
//         color: "#fff",
//         background: GREEN,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTestimonials();
//   }, [tab]);

//   // ✅ Archive / Restore handler
//   const toggleArchive = async (id, isArchived) => {
//     const action = isArchived ? "restore" : "archive";
//     const confirmTitle = isArchived
//       ? "Restore Testimonial?"
//       : "Archive Testimonial?";
//     const confirmText = isArchived
//       ? "Do you want to restore this testimonial?"
//       : "Do you want to archive this testimonial?";

//     const result = await Swal.fire({
//       title: confirmTitle,
//       text: confirmText,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: isArchived ? "Restore" : "Archive",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: isArchived ? RESTORE_ORANGE : CONFIRM_GREEN,
//       cancelButtonColor: "#d33",
//       color: "#fff",
//       background: GREEN,
//     });

//     if (!result.isConfirmed) return;

//     try {
//       // ✅ Choose correct endpoint based on action
//       const endpoint = isArchived
//         ? `${API_BASE}/testimonials/${id}/restore`
//         : `${API_BASE}/testimonials/${id}/archive`;

//       const res = await fetch(endpoint, {
//         method: "PATCH",
//         credentials: "include", // ✅ send cookies
//       });

//       if (!res.ok) throw new Error("Failed to update testimonial status");

//       const data = await res.json();

//       await Swal.fire({
//         title: "Success",
//         text: data.message || (isArchived ? "Restored successfully!" : "Archived successfully!"),
//         icon: "success",
//         confirmButtonColor: CONFIRM_GREEN,
//         background: GREEN,
//         color: "#fff",
//       });

//       fetchTestimonials(); // ✅ Refresh list
//     } catch (error) {
//       console.error("Error updating testimonial:", error);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to update testimonial.",
//         icon: "error",
//         confirmButtonColor: CONFIRM_GREEN,
//         color: "#fff",
//         background: GREEN,
//       });
//     }
//   };

//   const filtered = useMemo(() => items, [items]);

//   return (
//     <main className="px-2 font-Arial bg-white text-black min-h-screen">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Testimonials</h2>

//       {/* Tabs + Add Button */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center">
//           <button
//             onClick={() => setTab("published")}
//             className={`px-6 py-2 font-small border ${
//               tab === "published" ? "text-white" : "bg-white text-black"
//             }`}
//             style={{
//               backgroundColor: tab === "published" ? GREEN : "transparent",
//               borderColor: tab === "published" ? GREEN : "#000000ff",
//             }}
//           >
//             PUBLISHED
//           </button>
//           <button
//             onClick={() => setTab("archived")}
//             className={`px-6 py-2 font-small border ${
//               tab === "archived" ? "text-white" : "bg-white text-black"
//             }`}
//             style={{
//               backgroundColor: tab === "archived" ? GREEN : "transparent",
//               borderColor: tab === "archived" ? GREEN : "#000000ff",
//             }}
//           >
//             ARCHIVED
//           </button>
//         </div>

//         <Link
//           to="/add-testimonial"
//           className="inline-flex items-center gap-2 px-4 h-10 text-md text-white shadow-md hover:shadow-lg transition"
//           style={{ backgroundColor: GREEN }}
//         >
//           <Plus size={18} />
//           Add Testimonials
//         </Link>
//       </div>

//       {/* Testimonials List */}
//       {loading ? (
//         <div className="text-gray-600 italic">Loading testimonials...</div>
//       ) : (
//         <div className="space-y-5">
//           {filtered.map((t) => (
//             <article
//               key={t._id}
//               className="border border-gray-200 bg-white rounded-none p-6"
//             >
//               <div className="flex items-start gap-6">
//                 {/* Photo */}
//                 <div className="w-32 h-32 bg-gray-100 overflow-hidden flex-shrink-0">
//                   <img
//                     src={t.image || DEFAULT_PHOTO}
//                     alt={t.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 {/* Text Content */}
//                 <div className="flex-1">
//                   <h3
//                     className="text-xl font-bold uppercase"
//                     style={{ color: GREEN }}
//                   >
//                     {t.name}
//                   </h3>
//                   <p className="text-md font-semibold mt-1 text-black">
//                     {t.stayPeriod}
//                   </p>
//                   <p className="text-md mt-2 leading-6 text-gray-800">
//                     {t.message}
//                   </p>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col gap-2 items-end">
//                   <Link
//                     to={`/edit-testimonial/${t._id}`}
//                     state={{ testimonial: t }}
//                     className="w-24 h-10 inline-flex items-center justify-center text-sm font-semibold text-white rounded-none"
//                     style={{ backgroundColor: GREEN }}
//                   >
//                     Edit
//                   </Link>

//                   <button
//                     onClick={() => toggleArchive(t._id, t.isArchived)}
//                     className="w-24 h-10 inline-flex items-center justify-center text-sm font-semibold text-white rounded-none"
//                     style={{
//                       backgroundColor: t.isArchived ? RESTORE_ORANGE : "#b91c1c",
//                     }}
//                   >
//                     {t.isArchived ? "Restore" : "Archive"}
//                   </button>
//                 </div>
//               </div>
//             </article>
//           ))}

//           {filtered.length === 0 && (
//             <div className="text-sm text-gray-500 italic">
//               No testimonials found.
//             </div>
//           )}
//         </div>
//       )}
//     </main>
//   );
// };

// export default AdminTestimonials;
// src/Admin/Pages/AdminTestimonials.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Plus, Trash2 } from "lucide-react"; // ✅ added delete icon

const GREEN = "#006600";
const CONFIRM_GREEN = "#e39300ff";
const RESTORE_ORANGE = "#e39300ff";
const DELETE_RED = "#b91c1c";
const DEFAULT_PHOTO =
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

const API_BASE = `${import.meta.env.VITE_API_URL}/testimonials`;

const AdminTestimonials = () => {
  const [items, setItems] = useState([]);
  const [tab, setTab] = useState("published");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch testimonials
  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const endpoint =
        tab === "published"
          ? `${API_BASE}/testimonials`
          : `${API_BASE}/testimonials/archived`;
      const res = await fetch(endpoint, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      const data = await res.json();
      setItems(data.testimonials || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch testimonials.",
        icon: "error",
        confirmButtonColor: CONFIRM_GREEN,
        color: "#fff",
        background: GREEN,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [tab]);

  // ✅ Archive / Restore handler
  const toggleArchive = async (id, isArchived) => {
    const action = isArchived ? "restore" : "archive";
    const confirmTitle = isArchived
      ? "Restore Testimonial?"
      : "Archive Testimonial?";
    const confirmText = isArchived
      ? "Do you want to restore this testimonial?"
      : "Do you want to archive this testimonial?";

    const result = await Swal.fire({
      title: confirmTitle,
      text: confirmText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: isArchived ? "Restore" : "Archive",
      cancelButtonText: "Cancel",
      confirmButtonColor: isArchived ? RESTORE_ORANGE : CONFIRM_GREEN,
      cancelButtonColor: "#d33",
      color: "#fff",
      background: GREEN,
    });

    if (!result.isConfirmed) return;

    try {
      const endpoint = isArchived
        ? `${API_BASE}/testimonials/${id}/restore`
        : `${API_BASE}/testimonials/${id}/archive`;

      const res = await fetch(endpoint, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update testimonial status");

      const data = await res.json();

      await Swal.fire({
        title: "Success",
        text: data.message || (isArchived ? "Restored successfully!" : "Archived successfully!"),
        icon: "success",
        confirmButtonColor: CONFIRM_GREEN,
        background: GREEN,
        color: "#fff",
      });

      fetchTestimonials();
    } catch (error) {
      console.error("Error updating testimonial:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update testimonial.",
        icon: "error",
        confirmButtonColor: CONFIRM_GREEN,
        color: "#fff",
        background: GREEN,
      });
    }
  };

  // ✅ Delete handler
  const deleteTestimonial = async (id) => {
    const result = await Swal.fire({
      title: "Delete Testimonial?",
      text: "This action cannot be undone. Do you want to permanently delete this testimonial?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: DELETE_RED,
      cancelButtonColor: "#d33",
      background: GREEN,
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      const endpoint = `${API_BASE}/testimonials/${id}`;
      const res = await fetch(endpoint, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete testimonial");

      const data = await res.json();

      await Swal.fire({
        title: "Deleted!",
        text: data.message || "Testimonial deleted successfully.",
        icon: "success",
        confirmButtonColor: CONFIRM_GREEN,
        background: GREEN,
        color: "#fff",
      });

      fetchTestimonials(); // refresh
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to delete testimonial.",
        icon: "error",
        confirmButtonColor: CONFIRM_GREEN,
        background: GREEN,
        color: "#fff",
      });
    }
  };

  const filtered = useMemo(() => items, [items]);

  return (
    <main className="px-2 font-Arial bg-white text-black min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Testimonials</h2>

      {/* Tabs + Add Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => setTab("published")}
            className={`px-6 py-2 font-small border ${
              tab === "published" ? "text-white" : "bg-white text-black"
            }`}
            style={{
              backgroundColor: tab === "published" ? GREEN : "transparent",
              borderColor: tab === "published" ? GREEN : "#000000ff",
            }}
          >
            PUBLISHED
          </button>
          <button
            onClick={() => setTab("archived")}
            className={`px-6 py-2 font-small border ${
              tab === "archived" ? "text-white" : "bg-white text-black"
            }`}
            style={{
              backgroundColor: tab === "archived" ? GREEN : "transparent",
              borderColor: tab === "archived" ? GREEN : "#000000ff",
            }}
          >
            ARCHIVED
          </button>
        </div>

        <Link
          to="/add-testimonial"
          className="inline-flex items-center gap-2 px-4 h-10 text-md text-white shadow-md hover:shadow-lg transition"
          style={{ backgroundColor: GREEN }}
        >
          <Plus size={18} />
          Add Testimonials
        </Link>
      </div>

      {/* Testimonials List */}
      {loading ? (
        <div className="text-gray-600 italic">Loading testimonials...</div>
      ) : (
        <div className="space-y-5">
          {filtered.map((t) => (
            <article
              key={t._id}
              className="border border-gray-200 bg-white rounded-none p-6"
            >
              <div className="flex items-start gap-6">
                {/* Photo */}
                <div className="w-32 h-32 bg-gray-100 overflow-hidden flex-shrink-0">
                  <img
                    src={t.image || DEFAULT_PHOTO}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h3
                    className="text-xl font-bold uppercase"
                    style={{ color: GREEN }}
                  >
                    {t.name}
                  </h3>
                  <p className="text-md font-semibold mt-1 text-black">
                    {t.stayPeriod}
                  </p>
                  <p className="text-md mt-2 leading-6 text-gray-800">
                    {t.message}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 items-end">
                  <Link
                    to={`/edit-testimonial/${t._id}`}
                    state={{ testimonial: t }}
                    className="w-24 h-10 inline-flex items-center justify-center text-sm font-semibold text-white rounded-none"
                    style={{ backgroundColor: GREEN }}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => toggleArchive(t._id, t.isArchived)}
                    className="w-24 h-10 inline-flex items-center justify-center text-sm font-semibold text-white rounded-none"
                    style={{
                      backgroundColor: t.isArchived
                        ? RESTORE_ORANGE
                        : CONFIRM_GREEN,
                    }}
                  >
                    {t.isArchived ? "Restore" : "Archive"}
                  </button>

                  {/* ✅ Delete Button */}
                  <button
                    onClick={() => deleteTestimonial(t._id)}
                    className="w-24 h-10 inline-flex items-center justify-center gap-1 text-sm font-semibold text-white rounded-none"
                    style={{ backgroundColor: DELETE_RED }}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="text-sm text-gray-500 italic">
              No testimonials found.
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default AdminTestimonials;
