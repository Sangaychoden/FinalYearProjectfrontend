import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const THEME_GREEN = "#006600";
const MAX_IMAGES = 5; // <- Changed to 5

const AddFacility = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);

  const remainingSlots = useMemo(
    () => Math.max(0, MAX_IMAGES - images.length),
    [images.length]
  );

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  };

  const openPicker = () => fileInputRef.current?.click();

  const onPickFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const batch = files
      .slice(0, MAX_IMAGES - images.length)
      .map((file) => ({ file, url: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...batch]);
    e.target.value = "";
  };

  const removeImage = (idx) => {
    setImages((prev) => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[idx].url);
      copy.splice(idx, 1);
      return copy;
    });
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.description.trim()) next.description = "Description is required.";
    if (images.length === 0) next.images = "Please add at least one photo.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      const first = document.querySelector("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    await Swal.fire({
      title: "Saved",
      text: "Facility has been created.",
      icon: "success",
      confirmButtonColor: "#008000",
      color: "#fff",
      background: "#006600",
    });
    navigate("/admin-facilities");
  };

  return (
    <div className="flex justify-center py-3 min-h-screen bg-gray-50 font-inter">
      <div className="bg-white shadow-lg p-8 w-full max-w-4xl">
        {/* Header with Back button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black" >
            Add Facility
          </h1>
          <button
            onClick={() => navigate("/admin-facilities")}
            className="px-4 py-2 border border-gray-300 text-gray-300"
          >
           Back
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Title</label>
            <input
              data-error={!!errors.title}
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="e.g., The Loft"
              className={`w-full border p-3 ${
                errors.title ? "border-red-600" : "border-gray-300"
              } `}
            />
            {errors.title && <p className="mt-2 text-red-500 text-sm">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Description</label>
            <textarea
              data-error={!!errors.description}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              rows={4}
              placeholder="Write a short description…"
              className={`w-full border p-3 ${
                errors.description ? "border-red-600" : "border-gray-300"
              } `}
            />
            {errors.description && (
              <p className="mt-2 text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Photos */}
          <div data-error={!!errors.images}>
            <label className="block text-gray-700 mb-2 font-medium">Photos (Max {MAX_IMAGES})</label>

            {images.length > 0 && (
              <div className="flex flex-wrap gap-5 mb-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative w-32 h-32 border overflow-hidden  group">
                    <img src={img.url} alt={`facility-${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition rounded-full"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-5">
              {Array.from({ length: remainingSlots }).map((_, i) => (
                <button
                  type="button"
                  key={`slot-${i}`}
                  onClick={openPicker}
                  className="w-32 h-32 border-2 border-dashed flex flex-col items-center justify-center text-gray-500 hover:border-[#006600] hover:text-[#006600] transition "
                >
                  <span className="text-3xl">＋</span>
                  <span className="text-xs mt-1">Add photo</span>
                </button>
              ))}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={onPickFiles}
            />
            {errors.images && <p className="mt-2 text-red-500 text-sm">{errors.images}</p>}
          </div>

          {/* Submit button */}
                      <div className="flex justify-center space-x-5 mt-4">
            <button
              type="submit"
              className="bg-[#006600] text-white py-3 px-10  hover:bg-[#004d00] transition-colors"
            >
              Save
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

export default AddFacility;
