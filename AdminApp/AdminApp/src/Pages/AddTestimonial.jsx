import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";

const GREEN = "#006600";
const MAX_IMAGES = 5;

const AddTestimonial = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    stay: "",
    text: "",
  });
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);

  const setField = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const openPicker = () => fileRef.current?.click();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > MAX_IMAGES) {
      Swal.fire({
        icon: "warning",
        title: "Image Limit Reached",
        text: `You can upload a maximum of ${MAX_IMAGES} images.`,
              confirmButtonColor: "#008000",
      color: "#fff",
      background: "#006600",

      });
      return;
    }
    setImages((prev) => [...prev, ...files]);
    e.target.value = "";
    setErrors((e) => ({ ...e, images: "" }));
  };

  const handleRemoveImage = (i) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.stay.trim()) next.stay = "Stay is required.";
    if (!form.text.trim()) next.text = "Testimonial is required.";
    if (images.length === 0) next.images = "Please upload at least one image.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    Swal.fire({
      title: "Published",
      text: "Testimonial has been added.",
      icon: "success",
      confirmButtonColor: "#008000",
      color: "#fff",
      background: "#006600",
    }).then(() => navigate("/admin-testimonials"));
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 py-3 font-inter">
      <div className="bg-white p-8 shadow-lg w-full max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Add Testimonial</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 text-gray-300"
          >
            Back
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Name</label>
            <input
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Enter your name"
              className={`w-full p-3 border   ${
                errors.name ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Stay */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Stay</label>
            <input
              value={form.stay}
              onChange={(e) => setField("stay", e.target.value)}
              placeholder="Enter your stay"
              className={`w-full p-3 border ${
                errors.stay ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.stay && <p className="mt-2 text-sm text-red-600">{errors.stay}</p>}
          </div>

          {/* Testimonial */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Testimonial</label>
            <textarea
              value={form.text}
              onChange={(e) => setField("text", e.target.value)}
              rows={4}
              placeholder="Write your testimonial here..."
              className={`w-full p-3 border resize-y ${
                errors.text ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.text && <p className="mt-2 text-sm text-red-600">{errors.text}</p>}
          </div>

          {/* Images */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Upload Images (Max {MAX_IMAGES})
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
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
                <span className="text-gray-700 font-medium">Upload Images</span>
              </button>
              <span className="text-gray-600">{images.length} file{images.length !== 1 ? "s" : ""} selected</span>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {images.map((img, i) => (
                  <div key={i} className="relative w-24 h-24 border overflow-hidden group ">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-full"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.images && <p className="mt-2 text-sm text-red-600">{errors.images}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-5 mt-4">
            <button
              type="submit"
              className="bg-[#006600] text-white py-3 px-8 hover:bg-[#004d00] transition-colors"
            >
              Publish
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border border-[#006600] text-[#006600] py-3 px-8 hover:bg-[#f0fdf4] transition-colors"
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
