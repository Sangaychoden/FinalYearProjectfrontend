
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import { FaCloudUploadAlt } from "react-icons/fa";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
// const THEME_GREEN = "#006600";
// const CONFIRM_GREEN = "#008000";
// const MAX_IMAGES = 5;

// const EditFacility = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [form, setForm] = useState({ title: "", description: "" });
//   const [images, setImages] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch facility details
//   useEffect(() => {
//     const fetchFacility = async () => {
//       try {
//         const res = await fetch(`${API_URL}/facilities/${id}`, {
//           method: "GET",
//           credentials: "include",
//         });

//         if (res.status === 401) throw new Error("Unauthorized");
//         if (!res.ok) throw new Error("Failed to fetch facility");

//         const data = await res.json();
//         setForm({
//           title: data.facility?.title || "",
//           description: data.facility?.description || "",
//         });

//         const existingImgs = (data.facility?.images || []).map((url) => ({
//           url,
//           isExisting: true,
//         }));
//         setImages(existingImgs);
//       } catch (err) {
//         console.error("❌ Error fetching facility:", err);
//         Swal.fire({
//           icon: "error",
//           title:
//             err.message === "Unauthorized"
//               ? "Access Denied"
//               : "Failed to load facility",
//           text:
//             err.message === "Unauthorized"
//               ? "Your session has expired. Please log in again."
//               : "Please try again later.",
//       confirmButtonColor: "#008000",
//       color: "#fff",
//       background: "#006600",            }).then(() => {
//         }).then(() => {
//           if (err.message === "Unauthorized") navigate("/admin-login");
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFacility();
//   }, [id, navigate]);

//   // ✅ Validation
//   const validate = () => {
//     const next = {};
//     if (!form.title.trim()) next.title = "Title is required.";
//     if (!form.description.trim()) next.description = "Description is required.";
//     if (images.length === 0) next.images = "Please include at least one image.";
//     setErrors(next);
//     return Object.keys(next).length === 0;
//   };

//   const setField = (name, value) => {
//     setForm((f) => ({ ...f, [name]: value }));
//     setErrors((e) => ({ ...e, [name]: "" }));
//   };

//   const openPicker = () => fileInputRef.current?.click();

//   const onPickFiles = (e) => {
//     const files = Array.from(e.target.files || []);
//     if (!files.length) return;
//     const capacity = MAX_IMAGES - images.length;
//     const newFiles = files.slice(0, capacity).map((file) => ({
//       file,
//       url: URL.createObjectURL(file),
//       isExisting: false,
//     }));
//     setImages((prev) => [...prev, ...newFiles]);
//     e.target.value = "";
//   };

//   // ✅ Remove image with confirmation
//   const removeImage = (idx) => {
//     Swal.fire({
//       title: "Confirm Remove",
//       text: "Are you sure you want to remove this image?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes",
//       cancelButtonText: "Cancel",
//       cancelButtonColor: "#d33",
//       confirmButtonColor: "#008000",
//       color: "#fff",
//       background: "#006600",            }).then(() => {
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setImages((prev) => {
//           const updated = [...prev];
//           const item = updated[idx];
//           if (item && !item.isExisting) URL.revokeObjectURL(item.url);
//           updated.splice(idx, 1);
//           return updated;
//         });

//         Swal.fire({
//           icon: "success",
//           title: "Image Removed!",
//           confirmButtonColor: CONFIRM_GREEN,
//           color: "#fff",
//           background: THEME_GREEN,
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       }
//     });
//   };

//   // ✅ Submit form with confirmation
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     Swal.fire({
//       title: "Confirm Update",
//       text: "Do you want to update this facility?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes",
//       cancelButtonText: "Cancel",
//       cancelButtonColor: "#d33",
//       confirmButtonColor: "#008000",
//       color: "#fff",
//       background: "#006600",            }).then(() => {

//     }).then(async (result) => {
//       if (!result.isConfirmed) return;

//       const formData = new FormData();
//       formData.append("title", form.title);
//       formData.append("description", form.description);

//       // ✅ Keep existing images that are not removed
//       const keptImages = images
//         .filter((img) => img.isExisting)
//         .map((img) => img.url);
//       formData.append("existingImages", JSON.stringify(keptImages));

//       // ✅ Add new uploaded files
//       images.forEach((img) => {
//         if (!img.isExisting && img.file) {
//           formData.append("images", img.file);
//         }
//       });

//       try {
//         const res = await fetch(`${API_URL}/facilities/${id}`, {
//           method: "PUT",
//           body: formData,
//           credentials: "include",
//         });

//         if (res.status === 401) throw new Error("Unauthorized");
//         if (!res.ok) throw new Error("Update failed");

//         Swal.fire({
//           icon: "success",
//           title: "Facility updated successfully!",
//       confirmButtonColor: "#008000",
//       color: "#fff",
//       background: "#006600",            }).then(() => {
//         }).then(() => navigate("/admin-facilities"));
//       } catch (err) {
//         console.error("❌ Update error:", err);
//         Swal.fire({
//           icon: "error",
//           title: "Update Failed",
//           text:
//             err.message === "Unauthorized"
//               ? "Your session expired. Please log in again."
//               : "Failed to update facility. Try again.",
//       confirmButtonColor: "#008000",
//       color: "#fff",
//       background: "#006600",            }).then(() => {
//         });
//       }
//     });
//   };

//   const remainingSlots = useMemo(
//     () => Math.max(0, MAX_IMAGES - images.length),
//     [images.length]
//   );

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
//         Loading facility details...
//       </div>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-gray-50 font-inter py-6">
//       <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg -lg">
//         <h1 className="text-2xl font-semibold text-black mb-6">
//           Edit Facility
//         </h1>

//         <form onSubmit={onSubmit} className="space-y-6">
//           {/* Title */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Title</label>
//             <input
//               type="text"
//               value={form.title}
//               onChange={(e) => setField("title", e.target.value)}
//               className={`w-full border p-3 -md ${
//                 errors.title ? "border-red-600" : "border-gray-300"
//               }`}
//               placeholder="e.g., The Loft"
//             />
//             {errors.title && (
//               <p className="text-red-500 text-sm mt-1">{errors.title}</p>
//             )}
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Description
//             </label>
//             <textarea
//               value={form.description}
//               onChange={(e) => setField("description", e.target.value)}
//               rows="4"
//               className={`w-full border p-3 -md ${
//                 errors.description ? "border-red-600" : "border-gray-300"
//               }`}
//               placeholder="Write a short description..."
//             />
//             {errors.description && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.description}
//               </p>
//             )}
//           </div>

//           {/* Images */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Upload Images (Max {MAX_IMAGES})
//             </label>
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               multiple
//               className="hidden"
//               onChange={onPickFiles}
//             />

//             <div className="flex items-center gap-3 mb-3">
//               <button
//                 type="button"
//                 onClick={openPicker}
//                 className="flex items-center gap-2 px-4 py-2 border border-gray-300 -md hover:bg-gray-100 transition"
//               >
//                 <FaCloudUploadAlt className="text-gray-600 w-5 h-5" />
//                 <span className="text-gray-700 font-medium">Upload Image</span>
//               </button>
//               <span className="text-gray-600">
//                 {images.length} file{images.length !== 1 ? "s" : ""} selected
//               </span>
//             </div>

//             {images.length > 0 && (
//               <div className="flex flex-wrap mt-2 gap-3">
//                 {images.map((img, i) => (
//                   <div
//                     key={i}
//                     className="relative w-24 h-24 border -md overflow-hidden group"
//                   >
//                     <img
//                       src={img.url}
//                       alt={`facility-${i}`}
//                       className="w-full h-full object-cover"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(i)}
//                       className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition -full"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//             {errors.images && (
//               <p className="text-red-500 text-sm mt-1">{errors.images}</p>
//             )}
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-center gap-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-[#006600] text-white py-2 px-8 -md hover:bg-[#000000] transition"
//             >
//               {loading ? "Updating..." : "Update"}
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="border border-[#006600] text-[#006600] py-2 px-8 -md transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default EditFacility;
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const THEME_GREEN = "#006600";
const CONFIRM_GREEN = "#008000";
const MAX_IMAGES = 5;

const EditFacility = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({ title: "", description: "" });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch facility
  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const res = await fetch(`${API_URL}/facilities/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401)
          throw new Error("Unauthorized");
        if (!res.ok)
          throw new Error("Failed to fetch facility");

        const data = await res.json();

        setForm({
          title: data.facility?.title || "",
          description: data.facility?.description || "",
        });

        const existingImgs = (data.facility?.images || []).map((url) => ({
          url,
          isExisting: true,
        }));
        setImages(existingImgs);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: err.message === "Unauthorized" ? "Access Denied" : "Failed to load facility",
          text: err.message === "Unauthorized"
            ? "Your session has expired. Please log in again."
            : "Please try again later.",
          confirmButtonColor: CONFIRM_GREEN,
          background: THEME_GREEN,
          color: "#fff",
        }).then(() => {
          if (err.message === "Unauthorized") navigate("/admin-login");
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFacility();
  }, [id, navigate]);

  // Validation
  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.description.trim()) next.description = "Description is required.";
    if (images.length === 0) next.images = "Please include at least one image.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  };

  const openPicker = () => fileInputRef.current?.click();

  const onPickFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const capacity = MAX_IMAGES - images.length;
    const newFiles = files.slice(0, capacity).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isExisting: false,
    }));

    setImages((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  // Remove image
  const removeImage = (idx) => {
    Swal.fire({
      title: "Confirm Remove",
      text: "Are you sure you want to remove this image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#d33",
      confirmButtonColor: CONFIRM_GREEN,
      background: THEME_GREEN,
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        setImages((prev) => {
          const updated = [...prev];
          const item = updated[idx];
          if (item && !item.isExisting) URL.revokeObjectURL(item.url);
          updated.splice(idx, 1);
          return updated;
        });

        Swal.fire({
          icon: "success",
          title: "Image Removed!",
          confirmButtonColor: CONFIRM_GREEN,
          background: THEME_GREEN,
          color: "#fff",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    Swal.fire({
      title: "Confirm Update",
      text: "Do you want to update this facility?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#d33",
      confirmButtonColor: CONFIRM_GREEN,
      background: THEME_GREEN,
      color: "#fff",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);

      const keptImages = images
        .filter((img) => img.isExisting)
        .map((img) => img.url);

      formData.append("existingImages", JSON.stringify(keptImages));

      images.forEach((img) => {
        if (!img.isExisting && img.file) formData.append("images", img.file);
      });

      try {
        const res = await fetch(`${API_URL}/facilities/${id}`, {
          method: "PUT",
          body: formData,
          credentials: "include",
        });

        if (res.status === 401) throw new Error("Unauthorized");
        if (!res.ok) throw new Error("Update failed");

        Swal.fire({
          icon: "success",
          title: "Facility updated successfully!",
          confirmButtonColor: CONFIRM_GREEN,
          background: THEME_GREEN,
          color: "#fff",
        }).then(() => navigate("/admin-facilities"));
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text:
            err.message === "Unauthorized"
              ? "Your session expired. Please log in again."
              : "Failed to update facility. Try again.",
          confirmButtonColor: CONFIRM_GREEN,
          background: THEME_GREEN,
          color: "#fff",
        });
      }
    });
  };

  const remainingSlots = useMemo(
    () => Math.max(0, MAX_IMAGES - images.length),
    [images.length]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading facility details...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 font-inter py-6">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg -lg">
        <h1 className="text-2xl font-semibold text-black mb-6">Edit Facility</h1>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              className={`w-full border p-3  ${
                errors.title ? "border-red-600" : "border-gray-300"
              }`}
              placeholder="e.g., The Loft"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              rows="4"
              className={`w-full border p-3  ${
                errors.description ? "border-red-600" : "border-gray-300"
              }`}
              placeholder="Write a short description..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Images */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Images (Max {MAX_IMAGES})
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={onPickFiles}
            />

            <div className="flex items-center gap-3 mb-3">
              <button
                type="button"
                onClick={openPicker}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300  hover:bg-gray-100 transition"
              >
                <FaCloudUploadAlt className="text-gray-600 w-5 h-5" />
                <span className="text-gray-700 font-medium">Upload Image</span>
              </button>
              <span className="text-gray-600">
                {images.length} file{images.length !== 1 ? "s" : ""} selected
              </span>
            </div>

            {images.length > 0 && (
              <div className="flex flex-wrap mt-2 gap-3">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-24 h-24 border  overflow-hidden group"
                  >
                    <img
                      src={img.url}
                      alt={`facility-${i}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition -full"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">{errors.images}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#006600] text-white py-2 px-8  hover:bg-black transition"
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border border-[#006600] text-[#006600] py-2 px-8  transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditFacility;
