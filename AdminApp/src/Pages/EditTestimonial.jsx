
// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import { FaCloudUploadAlt } from "react-icons/fa";

// // const API_URL = "http://localhost:3000/testimonials/testimonials";
// const API_URL = `${import.meta.env.VITE_API_URL}/testimonials/testimonials`;

// const THEME_GREEN = "#006600";
// const CONFIRM_GREEN = "#008000";

// const EditTestimonial = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const fileRef = useRef(null);

//   const [form, setForm] = useState({
//     name: "",
//     stayPeriod: "",
//     message: "",
//   });
//   const [image, setImage] = useState(null);
//   const [removeImageFlag, setRemoveImageFlag] = useState(false); // ✅ Track removal
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch testimonial details
//   useEffect(() => {
//     const fetchTestimonial = async () => {
//       try {
//         const res = await fetch(`${API_URL}/${id}`, { credentials: "include" });
//         if (!res.ok) throw new Error("Failed to load testimonial data");

//         const data = await res.json();
//         const t = data.testimonial || data;

//         setForm({
//           name: t.name || "",
//           stayPeriod: t.stayPeriod || "",
//           message: t.message || "",
//         });

//         if (t.image) setImage({ url: t.image });
//       } catch (err) {
//         console.error("Fetch error:", err);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Failed to fetch testimonial details.",
//       confirmButtonColor: "#008000",
//       color: "#fff",
//       background: "#006600",            }).then(() => {
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTestimonial();
//   }, [id]);

//   // ✅ Field handler
//   const setField = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//     setErrors((prev) => ({ ...prev, [key]: "" }));
//   };

//   // ✅ Validation
//   const validate = () => {
//     const next = {};
//     if (!form.name.trim()) next.name = "Name is required.";
//     if (!form.stayPeriod.trim()) next.stayPeriod = "Stay period is required.";
//     if (!form.message.trim()) next.message = "Message is required.";
//     setErrors(next);
//     return Object.keys(next).length === 0;
//   };

//   // ✅ Image picker
//   const openPicker = () => fileRef.current?.click();

//   const onImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (image?.url?.startsWith("blob:")) URL.revokeObjectURL(image.url);
//     setImage({ file, url: URL.createObjectURL(file) });
//     setRemoveImageFlag(false); // Reset flag if uploading a new image
//   };

//   // ✅ Handle remove image
//   const removeImage = () => {
//     if (image?.url?.startsWith("blob:")) URL.revokeObjectURL(image.url);
//     setImage(null);
//     setRemoveImageFlag(true); // ✅ Mark for backend removal
//   };

//   // ✅ Submit handler
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const confirm = await Swal.fire({
//       title: "Confirm Update",
//       text: "Do you want to update this testimonial?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes",
//       cancelButtonText: "Cancel",
//       cancelButtonColor: "#d33",
//       confirmButtonColor: "#008000",
//       color: "#fff",
//       background: "#006600",            }).then(() => {
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("stayPeriod", form.stayPeriod);
//       formData.append("message", form.message);

//       // ✅ Handle image upload/removal logic
//       if (removeImageFlag) {
//         formData.append("removeImage", "true");
//       } else if (image?.file) {
//         formData.append("image", image.file);
//       }

//       const res = await fetch(`${API_URL}/${id}`, {
//         method: "PUT",
//         body: formData,
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Failed to update testimonial");
//       const result = await res.json();

//       await Swal.fire({
//         title: "Updated!",
//         text: result.message || "Testimonial successfully updated.",
//         icon: "success",
//       confirmButtonColor: "#008000",
//       color: "#fff",
//       background: "#006600",            }).then(() => {
//       });

//       navigate("/admin-testimonials");
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Update Failed",
//         text: err.message,
//       confirmButtonColor: "#008000",
//       color: "#fff",
//       background: "#006600",            }).then(() => {
//       });
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-gray-600 text-lg">Loading testimonial details...</p>
//       </div>
//     );

//   return (
//     <div className="flex justify-center min-h-screen bg-gray-50 py-3 font-inter">
//       <div className="bg-white p-8 shadow-lg w-full max-w-4xl">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-black">Edit Testimonial</h1>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
//           >
//             Back
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={onSubmit} className="space-y-6">
//           {/* Name */}
//           <div>
//             <label className="block mb-2 text-gray-700 font-medium">Name</label>
//             <input
//               value={form.name}
//               onChange={(e) => setField("name", e.target.value)}
//               placeholder="Enter guest name"
//               className={`w-full p-3 border ${
//                 errors.name ? "border-red-600" : "border-gray-300"
//               }`}
//             />
//             {errors.name && (
//               <p className="mt-2 text-sm text-red-600">{errors.name}</p>
//             )}
//           </div>

//           {/* Stay Period */}
//           <div>
//             <label className="block mb-2 text-gray-700 font-medium">
//               Stay Period
//             </label>
//             <input
//               value={form.stayPeriod}
//               onChange={(e) => setField("stayPeriod", e.target.value)}
//               placeholder="2025-11-02 to 2025-11-07"
//               className={`w-full p-3 border ${
//                 errors.stayPeriod ? "border-red-600" : "border-gray-300"
//               }`}
//             />
//             {errors.stayPeriod && (
//               <p className="mt-2 text-sm text-red-600">{errors.stayPeriod}</p>
//             )}
//           </div>

//           {/* Message */}
//           <div>
//             <label className="block mb-2 text-gray-700 font-medium">Message</label>
//             <textarea
//               value={form.message}
//               onChange={(e) => setField("message", e.target.value)}
//               rows={4}
//               placeholder="Write testimonial..."
//               className={`w-full p-3 border resize-y ${
//                 errors.message ? "border-red-600" : "border-gray-300"
//               }`}
//             />
//             {errors.message && (
//               <p className="mt-2 text-sm text-red-600">{errors.message}</p>
//             )}
//           </div>

//           {/* Image */}
//           <div>
//             <label className="block mb-2 text-gray-700 font-medium">Image</label>
//             <div className="flex items-center gap-3 mb-2">
//               <button
//                 type="button"
//                 onClick={openPicker}
//                 className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-100 transition"
//               >
//                 <FaCloudUploadAlt className="text-gray-600 w-5 h-5" />
//                 {image ? "Replace Image" : "Upload Image"}
//               </button>
//               {image && (
//                 <button
//                   type="button"
//                   onClick={removeImage}
//                   className="px-3 py-2 border border-gray-300 hover:bg-gray-100"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//             {image?.url && (
//               <div className="w-32 h-32 border border-gray-300 overflow-hidden mt-3">
//                 <img
//                   src={image.url}
//                   alt="preview"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             )}
//             <input
//               ref={fileRef}
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={onImageChange}
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-center gap-5 mt-4">
//             <button
//               type="submit"
//               className="bg-[#006600] text-white py-3 px-8 hover:bg-[#000000] transition"
//             >
//               Update
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="border border-[#006600] text-[#006600] py-3 px-8 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditTestimonial;
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";

const API_URL = `${import.meta.env.VITE_API_URL}/testimonials/testimonials`;

const THEME_GREEN = "#006600";
const CONFIRM_GREEN = "#008000";

const EditTestimonial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    stayPeriod: "",
    message: "",
  });
  const [image, setImage] = useState(null);
  const [removeImageFlag, setRemoveImageFlag] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch testimonial details
  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to load testimonial data");

        const data = await res.json();
        const t = data.testimonial || data;

        setForm({
          name: t.name || "",
          stayPeriod: t.stayPeriod || "",
          message: t.message || "",
        });

        if (t.image) setImage({ url: t.image });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch testimonial details.",
          confirmButtonColor: CONFIRM_GREEN,
          color: "#fff",
          background: THEME_GREEN,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [id]);

  // Field handler
  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // Validation
  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.stayPeriod.trim()) next.stayPeriod = "Stay period is required.";
    if (!form.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Image picker
  const openPicker = () => fileRef.current?.click();

  const onImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (image?.url?.startsWith("blob:")) URL.revokeObjectURL(image.url);

    setImage({ file, url: URL.createObjectURL(file) });
    setRemoveImageFlag(false);
  };

  // Remove image
  const removeImage = () => {
    if (image?.url?.startsWith("blob:")) URL.revokeObjectURL(image.url);
    setImage(null);
    setRemoveImageFlag(true);
  };

  // Submit handler
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const confirm = await Swal.fire({
      title: "Confirm Update",
      text: "Do you want to update this testimonial?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#d33",
      confirmButtonColor: CONFIRM_GREEN,
      color: "#fff",
      background: THEME_GREEN,
    });

    // FIX: prevent undefined crash
    if (!confirm || !confirm.isConfirmed) return;

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("stayPeriod", form.stayPeriod);
      formData.append("message", form.message);

      // Handle image upload/remove
      if (removeImageFlag) {
        formData.append("removeImage", "true");
      } else if (image?.file) {
        formData.append("image", image.file);
      }

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update testimonial");

      const result = await res.json();

      await Swal.fire({
        title: "Updated!",
        text: result.message || "Testimonial successfully updated.",
        icon: "success",
        confirmButtonColor: CONFIRM_GREEN,
        color: "#fff",
        background: THEME_GREEN,
      });

      navigate("/admin-testimonials");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.message,
        confirmButtonColor: CONFIRM_GREEN,
        color: "#fff",
        background: THEME_GREEN,
      });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading testimonial details...</p>
      </div>
    );

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 py-3 font-inter">
      <div className="bg-white p-8 shadow-lg w-full max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Edit Testimonial</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Back
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Name</label>
            <input
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className={`w-full p-3 border ${
                errors.name ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Stay Period */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Stay Period
            </label>
            <input
              value={form.stayPeriod}
              onChange={(e) => setField("stayPeriod", e.target.value)}
              className={`w-full p-3 border ${
                errors.stayPeriod ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.stayPeriod && (
              <p className="mt-2 text-sm text-red-600">{errors.stayPeriod}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
              rows={4}
              className={`w-full p-3 border resize-y ${
                errors.message ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.message && (
              <p className="mt-2 text-sm text-red-600">{errors.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Image</label>

            <div className="flex items-center gap-3 mb-2">
              <button
                type="button"
                onClick={openPicker}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-100 transition"
              >
                <FaCloudUploadAlt className="text-gray-600 w-5 h-5" />
                {image ? "Replace Image" : "Upload Image"}
              </button>

              {image && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="px-3 py-2 border border-gray-300 hover:bg-gray-100"
                >
                  Remove
                </button>
              )}
            </div>

            {image?.url && (
              <div className="w-32 h-32 border border-gray-300 overflow-hidden mt-3">
                <img
                  src={image.url}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-5 mt-4">
            <button
              type="submit"
              className="bg-[#006600] text-white py-3 px-8 hover:bg-[#000000] transition"
            >
              Update
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border border-[#006600] text-[#006600] py-3 px-8 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTestimonial;
