
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;
const THEME_GREEN = "#006600";
const CONFIRM_GREEN = "#008000";

const AddTestimonial = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    stay: "",
    text: "",
  });
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);

  // ✅ Update form fields
  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // ✅ Open file picker
  const openPicker = () => fileRef.current?.click();

  // ✅ Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      Swal.fire({
        icon: "warning",
        title: "File Too Large",
        text: "Please upload an image smaller than 3MB.",
        confirmButtonColor: CONFIRM_GREEN,
        color: "#fff",
        background: THEME_GREEN,
      });
      return;
    }

    setImage(file);
    e.target.value = "";
  };

  // ✅ Remove selected image
  const handleRemoveImage = () => setImage(null);

  // ✅ Validation
  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.stay.trim()) next.stay = "Stay period is required.";
    if (!form.text.trim()) next.text = "Testimonial message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // ✅ Submit handler (confirmation included)
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    Swal.fire({
      title: "Confirm Publish",
      text: "Do you want to publish this testimonial?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: CONFIRM_GREEN,
      cancelButtonColor: "#d33",
      color: "#fff",
      background: THEME_GREEN,
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("stayPeriod", form.stay);
      formData.append("message", form.text);

      // ✅ Only append image if selected
      if (image) {
        formData.append("image", image);
      }

      try {
        const res = await fetch(`${API_URL}/testimonials/testimonials`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (res.status === 401) throw new Error("Unauthorized");
        if (!res.ok) throw new Error("Failed to add testimonial");

        Swal.fire({
          title: "Published!",
          text: "Testimonial added successfully.",
          icon: "success",
          confirmButtonColor: CONFIRM_GREEN,
          color: "#fff",
          background: THEME_GREEN,
        }).then(() => navigate("/admin-testimonials"));
      } catch (err) {
        console.error("❌ Add testimonial error:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            err.message === "Unauthorized"
              ? "Your session has expired. Please log in again."
              : "Failed to add testimonial. Please try again later.",
          confirmButtonColor: CONFIRM_GREEN,
          color: "#fff",
          background: THEME_GREEN,
        });
      }
    });
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 py-3 font-inter">
      <div className="bg-white p-8 shadow-lg w-full max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Add Testimonial</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 text-gray-500 hover:bg-gray-100 transition"
          >
            Back
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Name</label>
            <input
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Enter guest name"
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
            <label className="block text-gray-700 mb-2 font-medium">
              Stay Period
            </label>
            <input
              value={form.stay}
              onChange={(e) => setField("stay", e.target.value)}
              placeholder="e.g., July 2 to July 4, 2025"
              className={`w-full p-3 border ${
                errors.stay ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.stay && (
              <p className="mt-2 text-sm text-red-600">{errors.stay}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Testimonial Message
            </label>
            <textarea
              value={form.text}
              onChange={(e) => setField("text", e.target.value)}
              rows={4}
              placeholder="Write your testimonial..."
              className={`w-full p-3 border resize-y ${
                errors.text ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.text && (
              <p className="mt-2 text-sm text-red-600">{errors.text}</p>
            )}
          </div>

          {/* Image Upload (Optional) */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Upload Image (Optional)
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <div className="flex items-center gap-3 mb-2">
              <button
                type="button"
                onClick={openPicker}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-100 transition"
              >
                <FaCloudUploadAlt className="text-gray-600 w-5 h-5" />
                <span className="text-gray-700 font-medium">Upload Image</span>
              </button>
              <span className="text-gray-600">
                {image ? "1 file selected" : "No file selected"}
              </span>
            </div>

            {/* Preview */}
            {image && (
              <div className="relative w-24 h-24 border overflow-hidden group mt-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition -full"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-5 mt-4">
            <button
              type="submit"
              className="bg-[#006600] text-white py-3 px-8 hover:bg-[#000000] transition-colors"
            >
              Publish
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border border-[#006600] text-[#006600] py-3 px-8 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTestimonial;
