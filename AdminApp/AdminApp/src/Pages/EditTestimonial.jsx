// src/Admin/Pages/EditTestimonial.jsx
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";

const GREEN = "#006600";

const MOCK_TESTIMONIALS = [
  {
    id: "t1",
    name: "PEMA WANGMO",
    stayed: "Stayed July 2025",
    text:
      "Our stay was wonderful. The serene environment, excellent service, and delicious food made our trip memorable. Highly recommend the resort to anyone visiting Paro.",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "t2",
    name: "PEMA WANGMO",
    stayed: "Stayed July 2025",
    text:
      "Our stay was wonderful. The serene environment, excellent service, and delicious food made our trip memorable. Highly recommend the resort to anyone visiting Paro.",
    photo:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=800&auto=format&fit=crop",
  },
];

const EditTestimonial = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const initial = useMemo(() => {
    if (state?.testimonial) return state.testimonial;
    return (
      MOCK_TESTIMONIALS.find((t) => t.id === id) || {
        id,
        name: "",
        stayed: "",
        text: "",
        photo: "",
      }
    );
  }, [id, state]);

  const [form, setForm] = useState({ name: "", stay: "", text: "" });
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    setForm({
      name: initial.name || "",
      stay: initial.stayed?.replace(/^Stayed\s+/i, "") || "",
      text: initial.text || "",
    });
    if (initial.photo) setImage({ url: initial.photo });
  }, [initial]);

  const setField = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.stay.trim()) next.stay = "Stay is required.";
    if (!form.text.trim()) next.text = "Testimonial is required.";
    if (!image?.url) next.image = "Please add an image.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const openPicker = () => fileRef.current?.click();
  const onImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (image?.file == null && image?.url && image.url.startsWith("blob:")) {
      URL.revokeObjectURL(image.url);
    }
    setImage({ file, url: URL.createObjectURL(file) });
    setErrors((e2) => ({ ...e2, image: "" }));
  };
  const removeImage = () => {
    if (image?.url && image.url.startsWith("blob:")) URL.revokeObjectURL(image.url);
    setImage(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await Swal.fire({
      title: "Saved",
      text: "Testimonial has been updated.",
      icon: "success",
      confirmButtonColor: "#008000",
      color: "#fff",
      background: "#006600",
    });
    navigate("/admin-testimonials");
  };

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

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Name</label>
            <input
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Enter guest name"
              className={`w-full p-3 border ${
                errors.name ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Stay */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Stay</label>
            <input
              value={form.stay}
              onChange={(e) => setField("stay", e.target.value)}
              placeholder="July 2025"
              className={`w-full p-3 border ${
                errors.stay ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.stay && <p className="mt-2 text-sm text-red-600">{errors.stay}</p>}
          </div>

          {/* Testimonial */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Testimonial</label>
            <textarea
              value={form.text}
              onChange={(e) => setField("text", e.target.value)}
              rows={4}
              placeholder="Write testimonial..."
              className={`w-full p-3 border resize-y ${
                errors.text ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.text && <p className="mt-2 text-sm text-red-600">{errors.text}</p>}
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
                  <img src={image.url} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
            />
            {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-5 mt-4">
            <button
              type="submit"
              className="bg-[#006600] text-white py-3 px-8 hover:bg-[#004d00] transition"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border border-[#006600] text-[#006600] py-3 px-8 hover:bg-[#f0fdf4] transition"
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
