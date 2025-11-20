// src/Admin/Pages/EditFacility.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const THEME_GREEN = "#006600";
const MAX_IMAGES = 5; // same as AddFacility

// --- Dummy "DB" fallback ---
const MOCK_FACILITIES = [
  {
    id: "f1",
    category: "LOFT",
    title: "The Loft",
    description:
      "The Loft is located on the top floor of the right guestroom wing. It is a column-free open space perfect for private events and quiet reading.",
    images: [
      "https://picsum.photos/seed/loft1/800/600",
      "https://picsum.photos/seed/loft2/800/600",
      "https://picsum.photos/seed/loft3/800/600",
    ],
  },
  {
    id: "f2",
    category: "RESTAURANT",
    title: "Riverside Restaurant",
    description:
      "All-day dining with river views, seasonal produce, and a cozy ambience. Breakfast, lunch, and dinner available.",
    images: [
      "https://picsum.photos/seed/rest1/800/600",
      "https://picsum.photos/seed/rest2/800/600",
    ],
  },
];

const EditFacility = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const initialData = useMemo(() => {
    if (state?.facility) return state.facility;
    return (
      MOCK_FACILITIES.find((f) => f.id === id) || {
        id,
        title: "",
        category: "",
        description: "",
        images: [],
      }
    );
  }, [id, state]);

  const [form, setForm] = useState({ title: "", category: "", description: "" });
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    setForm({
      title: initialData.title || "",
      category: initialData.category || "",
      description: initialData.description || "",
    });
    const mapped = (initialData.images || []).map((u) => ({ url: u, isExisting: true }));
    setImages(mapped);
  }, [initialData]);

  const remainingSlots = useMemo(() => Math.max(0, MAX_IMAGES - images.length), [images.length]);

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  };

  const openPicker = () => fileInputRef.current?.click();

  const onPickFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const capacity = MAX_IMAGES - images.length;
    const batch = files.slice(0, capacity).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isExisting: false,
    }));
    setImages((prev) => [...prev, ...batch]);
    e.target.value = "";
  };

  const removeImage = (idx) => {
    setImages((prev) => {
      const copy = [...prev];
      const item = copy[idx];
      if (item && !item.isExisting) URL.revokeObjectURL(item.url);
      copy.splice(idx, 1);
      return copy;
    });
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.category.trim()) next.category = "Category is required.";
    if (!form.description.trim()) next.description = "Description is required.";
    if (images.length === 0) next.images = "Please keep at least one photo.";
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
      text: "Facility changes have been updated.",
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black" >
            Edit Facility
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
              className={`w-full border p-3 ${errors.title ? "border-red-600" : "border-gray-300"}`}
            />
            {errors.title && <p className="mt-2 text-red-500 text-sm">{errors.title}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Category</label>
            <select
              data-error={!!errors.category}
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
              className={`w-full border p-3 ${errors.category ? "border-red-600" : "border-gray-300"}`}
            >
              <option value="">Select category</option>
              <option value="LOFT">LOFT</option>
              <option value="RESTAURANT">RESTAURANT</option>
              <option value="LOUNGE">LOUNGE</option>
              <option value="GYM">GYM</option>
              <option value="POOL">POOL</option>
              <option value="SPA">SPA</option>
            </select>
            {errors.category && <p className="mt-2 text-red-500 text-sm">{errors.category}</p>}
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
              className={`w-full border p-3 ${errors.description ? "border-red-600" : "border-gray-300"}`}
            />
            {errors.description && <p className="mt-2 text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* Photos */}
          <div data-error={!!errors.images}>
            <label className="block text-gray-700 mb-2 font-medium">Photos (Max {MAX_IMAGES})</label>
            {images.length > 0 && (
              <div className="flex flex-wrap mt-3 gap-5">
                {images.map((img, i) => (
                  <div key={i} className="relative w-32 h-32 border overflow-hidden group">
                    <img src={img.url} alt={`facility-${i}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {remainingSlots > 0 && (
              <div className="flex flex-wrap mt-3 gap-5">
                {Array.from({ length: remainingSlots }).map((_, i) => (
                  <button
                    type="button"
                    key={`slot-${i}`}
                    onClick={openPicker}
                    className="w-32 h-32 border-2 border-dashed flex flex-col items-center justify-center text-gray-500 hover:border-[#006600] hover:text-[#006600] transition"
                  >
                    <span className="text-3xl">＋</span>
                    <span className="text-xs mt-1">Add photo</span>
                  </button>
                ))}
              </div>
            )}
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

          {/* Buttons */}
          <div className="flex justify-center space-x-5 mt-4">
            <button
              type="submit"
              className="bg-[#006600] text-white py-3 px-10 hover:bg-[#004d00] transition-colors"
            >
              Update
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

export default EditFacility;
