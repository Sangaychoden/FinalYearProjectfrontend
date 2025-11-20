import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";

const MAX_IMAGES = 5;
const GREEN = "#006600";

const AddRoom = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    roomType: "",
    price: "",
    numberOfRooms: "",
    size: "",
    bedType: "",
    occupancy: "",
    location: "",
    roomNumber: "",
    roomDetails: "",
    roomFeatures: "",
    bathroomAmenities: "",
    otherOptions: "",
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  // Open file picker
  const openPicker = () => fileRef.current?.click();

  // Handle multiple image selection
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

  // Remove individual image
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Validation
  const validate = () => {
    const next = {};
    if (!formData.roomType.trim()) next.roomType = "Room Type is required.";
    if (!formData.price) next.price = "Price is required.";
    if (!formData.numberOfRooms) next.numberOfRooms = "Number of Rooms is required.";
    if (!formData.size) next.size = "Room Size is required.";
    if (!formData.bedType.trim()) next.bedType = "Bed Type is required.";
    if (!formData.occupancy) next.occupancy = "Occupancy is required.";
    if (!formData.location.trim()) next.location = "Location is required.";
    if (!formData.roomNumber.trim()) next.roomNumber = "Room Number is required.";
    if (!formData.roomDetails.trim()) next.roomDetails = "Room Details are required.";
    if (!formData.roomFeatures.trim()) next.roomFeatures = "Room Features are required.";
    if (!formData.bathroomAmenities.trim()) next.bathroomAmenities = "Bathroom Amenities are required.";
    if (images.length === 0) next.images = "Please upload at least one image.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector("[data-error='true']");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    console.log("Room added:", formData, images);

    Swal.fire({
      icon: "success",
      title: "New Room Added!",
      text: "Your room has been successfully added.",
      confirmButtonColor: "#008000",
      color: "#fff",
      background: "#006600",

    }).then(() => navigate(-1));
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
              <select
                data-error={!!errors.roomType}
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className={`w-full border p-3 ${errors.roomType ? "border-red-600" : "border-gray-300"}`}
              >
                <option value="">Select Type</option>
                <option value="Standard Room">Standard Room</option>
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="Suite">Suite</option>
              </select>
              {errors.roomType && <p className="mt-2 text-red-500 text-sm">{errors.roomType}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Price (Nu.)</label>
              <input
                data-error={!!errors.price}
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter room price"
                className={`w-full border p-3 ${errors.price ? "border-red-600" : "border-gray-300"}`}
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
                value={formData.numberOfRooms}
                onChange={handleChange}
                placeholder="Enter total number of rooms"
                className={`w-full border p-3 ${errors.numberOfRooms ? "border-red-600" : "border-gray-300"}`}
              />
              {errors.numberOfRooms && <p className="mt-2 text-red-500 text-sm">{errors.numberOfRooms}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Room Size (sq ft)</label>
              <input
                data-error={!!errors.size}
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="Enter room size in sq ft"
                className={`w-full border p-3 ${errors.size ? "border-red-600" : "border-gray-300"}`}
              />
              {errors.size && <p className="mt-2 text-red-500 text-sm">{errors.size}</p>}
            </div>
          </div>

          {/* Bed Type + Occupancy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Bed Type</label>
              <input
                data-error={!!errors.bedType}
                type="text"
                name="bedType"
                value={formData.bedType}
                onChange={handleChange}
                placeholder="e.g. King Bed"
                className={`w-full border p-3 ${errors.bedType ? "border-red-600" : "border-gray-300"}`}
              />
              {errors.bedType && <p className="mt-2 text-red-500 text-sm">{errors.bedType}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Occupancy</label>
              <input
                data-error={!!errors.occupancy}
                name="occupancy"
                value={formData.occupancy}
                onChange={handleChange}
                placeholder="e.g. 2 Adults"
                className={`w-full border p-3 ${errors.occupancy ? "border-red-600" : "border-gray-300"}`}
              />
              {errors.occupancy && <p className="mt-2 text-red-500 text-sm">{errors.occupancy}</p>}
            </div>
          </div>

{/* Room Number + Location */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Room Number */}
  <div>
    <label className="block text-gray-700 mb-2 font-medium">Room Number</label>
    <input
      data-error={!!errors.roomNumber}
      type="text"
      name="roomNumber"
      value={formData.roomNumber || ""}
      onChange={handleChange}
      placeholder="e.g. 101, 102A"
      className={`w-full border p-3 ${errors.roomNumber ? "border-red-600" : "border-gray-300"}`}
    />
    {errors.roomNumber && <p className="mt-2 text-red-500 text-sm">{errors.roomNumber}</p>}
  </div>

  {/* Location */}
  <div>
    <label className="block text-gray-700 mb-2 font-medium">Location</label>
    <input
      data-error={!!errors.location}
      type="text"
      name="location"
      value={formData.location}
      onChange={handleChange}
      placeholder="e.g. Ground Floor, East Wing"
      className={`w-full border p-3 ${errors.location ? "border-red-600" : "border-gray-300"}`}
    />
    {errors.location && <p className="mt-2 text-red-500 text-sm">{errors.location}</p>}
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
              className={`w-full border p-3 ${errors.roomDetails ? "border-red-600" : "border-gray-300"}`}
            />
            {errors.roomDetails && <p className="mt-2 text-red-500 text-sm">{errors.roomDetails}</p>}
          </div>

          {/* Features */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Room Features (comma separated)</label>
            <input
              data-error={!!errors.roomFeatures}
              type="text"
              name="roomFeatures"
              value={formData.roomFeatures}
              onChange={handleChange}
              placeholder="e.g. Free Wi-Fi, Mini Bar, Balcony"
              className={`w-full border p-3 ${errors.roomFeatures ? "border-red-600" : "border-gray-300"}`}
            />
            {errors.roomFeatures && <p className="mt-2 text-red-500 text-sm">{errors.roomFeatures}</p>}
          </div>

          {/* Bathroom Amenities */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Bathroom Amenities (comma separated)</label>
            <input
              data-error={!!errors.bathroomAmenities}
              type="text"
              name="bathroomAmenities"
              value={formData.bathroomAmenities}
              onChange={handleChange}
              placeholder="e.g. Heated WC seat, Rain shower"
              className={`w-full border p-3 ${errors.bathroomAmenities ? "border-red-600" : "border-gray-300"}`}
            />
            {errors.bathroomAmenities && <p className="mt-2 text-red-500 text-sm">{errors.bathroomAmenities}</p>}
          </div>

          {/* Other Options */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Other Options</label>
            <input
              type="text"
              name="otherOptions"
              value={formData.otherOptions}
              onChange={handleChange}
              placeholder="e.g. Free Breakfast, Airport Pickup"
              className={`w-full border p-3 ${errors.otherOptions ? "border-red-600" : "border-gray-300"}`}
            />
            {errors.otherOptions && <p className="mt-2 text-red-500 text-sm">{errors.otherOptions}</p>}
          </div>

          {/* Images */}
          <div data-error={!!errors.images}>
            <label className="block text-gray-700 mb-2 font-medium">Upload Images (Max {MAX_IMAGES})</label>
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
              <span className="text-gray-600">{images.length} file{images.length !== 1 ? "s" : ""} selected</span>
            </div>
            {errors.images && <p className="mt-2 text-red-500 text-sm">{errors.images}</p>}

            {/* Image previews */}
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
              className="bg-[#006600] text-white py-3 px-8 hover:bg-[#004d00] transition-colors"
            >
              Confirm
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

export default AddRoom;
