
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";

const MAX_IMAGES = 5;
const API_URL = `${import.meta.env.VITE_API_URL}/rooms/rooms`;


const AddRoom = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    roomType: "",
    price: "",
    numberOfRooms: "",
    size: "",
    beds: "",
    occupancy: "",
    roomNumber: "",
    roomDetails: "",
    roomFeatures: "",
    bathroomAmenities: "",
    optional: "",
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  // Open file picker
  const openPicker = () => fileRef.current?.click();

  // Handle image selection
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + images.length > MAX_IMAGES) {
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
    setImages([...images, ...selectedFiles]);
    setErrors((prev) => ({ ...prev, images: "" }));
  };

  // Remove selected image
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Validate inputs
  const validate = () => {
    const next = {};
    if (!formData.roomType.trim()) next.roomType = "Room Type is required.";
    if (!formData.price) next.price = "Price is required.";
    if (!formData.numberOfRooms) next.numberOfRooms = "Number of Rooms is required.";
    if (!formData.size) next.size = "Room Size is required.";
    if (!formData.beds) next.beds = "Number of Beds is required.";
    if (!formData.occupancy) next.occupancy = "Occupancy is required.";
    if (!formData.roomNumber.trim()) next.roomNumber = "Room Number is required.";
    if (!formData.roomDetails.trim()) next.roomDetails = "Room Details are required.";
    if (!formData.roomFeatures.trim()) next.roomFeatures = "Room Features are required.";
    if (!formData.bathroomAmenities.trim()) next.bathroomAmenities = "Bathroom Amenities are required.";
    if (images.length === 0) next.images = "Please upload at least one image.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      const firstError = document.querySelector("[data-error='true']");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("roomType", formData.roomType);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("numberOfRooms", formData.numberOfRooms);
    formDataToSend.append("size", formData.size);
    formDataToSend.append("beds", formData.beds);
    formDataToSend.append("occupancy", formData.occupancy);
    formDataToSend.append(
      "roomNumbers",
      JSON.stringify(formData.roomNumber.split(",").map((r) => r.trim()))
    );
    formDataToSend.append("roomDetails", formData.roomDetails);
    formDataToSend.append("roomFeatures", formData.roomFeatures);
    formDataToSend.append("bathroomAmenities", formData.bathroomAmenities);
    formDataToSend.append("optional", formData.optional);

    images.forEach((img) => formDataToSend.append("images", img));

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "New Room Added!",
          text: "Your room has been successfully added.",
          confirmButtonColor: "#008000",
          color: "#fff",
          background: "#006600",
        }).then(() => navigate("/admin-rooms"));
      } else {
        const errData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errData.message || "Something went wrong while adding the room.",
          confirmButtonColor: "#008000",
          color: "#fff",
          background: "#006600",
        });
      }
    } catch (error) {
      console.error("Error adding room:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Unable to connect to the server.",
        confirmButtonColor: "#008000",
        color: "#fff",
        background: "#006600",
      });
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 py-3 font-inter">
      <div className="bg-white p-8 shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-black mb-6">Add New Room</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Room Type + Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Room Type</label>
              <input
                data-error={!!errors.roomType}
                type="text"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                placeholder="Enter room type (e.g. Deluxe Suite)"
                className={`w-full border p-3 -md ${
                  errors.roomType ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.roomType && <p className="mt-2 text-red-500 text-sm">{errors.roomType}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Price (Nu.)</label>
              <input
                data-error={!!errors.price}
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter room price"
                className={`w-full border p-3 -md ${
                  errors.price ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.price && <p className="mt-2 text-red-500 text-sm">{errors.price}</p>}
            </div>
          </div>

          {/* Number of Rooms + Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Number of Rooms</label>
              <input
                data-error={!!errors.numberOfRooms}
                name="numberOfRooms"
                type="number"
                value={formData.numberOfRooms}
                onChange={handleChange}
                placeholder="Enter total number of rooms"
                className={`w-full border p-3 -md ${
                  errors.numberOfRooms ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.numberOfRooms && (
                <p className="mt-2 text-red-500 text-sm">{errors.numberOfRooms}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Room Size (sq ft)</label>
              <input
                data-error={!!errors.size}
                name="size"
                type="number"
                value={formData.size}
                onChange={handleChange}
                placeholder="Enter room size"
                className={`w-full border p-3 -md ${
                  errors.size ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.size && <p className="mt-2 text-red-500 text-sm">{errors.size}</p>}
            </div>
          </div>

          {/* Beds + Occupancy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Beds</label>
              <input
                data-error={!!errors.beds}
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                placeholder="e.g. 2"
                className={`w-full border p-3 -md ${
                  errors.beds ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.beds && <p className="mt-2 text-red-500 text-sm">{errors.beds}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Occupancy</label>
              <input
                data-error={!!errors.occupancy}
                type="number"
                name="occupancy"
                value={formData.occupancy}
                onChange={handleChange}
                placeholder="e.g. 2 Adults"
                className={`w-full border p-3 -md ${
                  errors.occupancy ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.occupancy && <p className="mt-2 text-red-500 text-sm">{errors.occupancy}</p>}
            </div>
          </div>

          {/* Room Number + Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Room Numbers (comma separated)
              </label>
              <input
                data-error={!!errors.roomNumber}
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="e.g. 101, 102A"
                className={`w-full border p-3 -md ${
                  errors.roomNumber ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.roomNumber && (
                <p className="mt-2 text-red-500 text-sm">{errors.roomNumber}</p>
              )}
            </div>


          </div>

          {/* Room Details */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Room Details</label>
            <textarea
              data-error={!!errors.roomDetails}
              name="roomDetails"
              value={formData.roomDetails}
              onChange={handleChange}
              rows={3}
              placeholder="Describe the room briefly..."
              className={`w-full border p-3 -md ${
                errors.roomDetails ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.roomDetails && (
              <p className="mt-2 text-red-500 text-sm">{errors.roomDetails}</p>
            )}
          </div>

          {/* Room Features */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Room Features (comma separated)
            </label>
            <input
              data-error={!!errors.roomFeatures}
              type="text"
              name="roomFeatures"
              value={formData.roomFeatures}
              onChange={handleChange}
              placeholder="e.g. Free Wi-Fi, Mini Bar, Balcony"
              className={`w-full border p-3 -md ${
                errors.roomFeatures ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.roomFeatures && (
              <p className="mt-2 text-red-500 text-sm">{errors.roomFeatures}</p>
            )}
          </div>

          {/* Bathroom Amenities */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Bathroom Amenities (comma separated)
            </label>
            <input
              data-error={!!errors.bathroomAmenities}
              type="text"
              name="bathroomAmenities"
              value={formData.bathroomAmenities}
              onChange={handleChange}
              placeholder="e.g. Rain Shower, Hot Water"
              className={`w-full border p-3 -md ${
                errors.bathroomAmenities ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.bathroomAmenities && (
              <p className="mt-2 text-red-500 text-sm">{errors.bathroomAmenities}</p>
            )}
          </div>

          {/* Optional */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Other Options</label>
            <input
              type="text"
              name="optional"
              value={formData.optional}
              onChange={handleChange}
              placeholder="e.g. Sea-facing, Non-smoking"
              className={`w-full border p-3 -md ${
                errors.optional ? "border-red-600" : "border-gray-300"
              }`}
            />
            {errors.optional && (
              <p className="mt-2 text-red-500 text-sm">{errors.optional}</p>
            )}
          </div>

          {/* Image Upload */}
          <div data-error={!!errors.images}>
            <label className="block text-gray-700 mb-2 font-medium">
              Upload Images (Max {MAX_IMAGES})
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={openPicker}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-100 transition"
              >
                <FaCloudUploadAlt className="text-gray-600 w-5 h-5" />
                <span className="text-gray-700 font-medium">Upload Image</span>
              </button>
              <span className="text-gray-600">
                {images.length} file{images.length !== 1 ? "s" : ""} selected
              </span>
            </div>

            {errors.images && <p className="mt-2 text-red-500 text-sm">{errors.images}</p>}

            {images.length > 0 && (
              <div className="flex flex-wrap mt-3 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative w-24 h-24 border overflow-hidden group">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-5">
            <button
              type="submit"
              className="bg-[#006600] text-white py-3 px-8 hover:bg-[#003300] transition-colors"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border border-[#006600] text-[#006600] py-3 px-8  transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
