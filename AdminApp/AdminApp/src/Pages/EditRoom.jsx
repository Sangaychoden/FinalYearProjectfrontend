import React, { useState, useMemo, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";

const EditRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();
  const fileRef = useRef(null);

  const baseRoom = useMemo(() => {
    if (location.state?.room) return location.state.room;
    const ls = JSON.parse(localStorage.getItem("rooms") || "[]");
    return (
      ls.find((r) => String(r.id) === String(roomId)) || {
        id: Number(roomId) || 1,
        title: "Deluxe Double",
        size: "29 m²",
        occupancy: 3,
        beds: "2 x Super Single Bed(s)",
        location: "Riverside View",
        details:
          "Enjoy a relaxing stay in our Deluxe Double Room, featuring a scenic river view and a cozy, well-appointed space.",
        features: [
          "Individually controlled air-conditioning",
          "Carpeted flooring",
          "Bedhead USB chargers",
          "Cable TV",
          "Free WiFi",
          "Coffee/Tea facilities with kettle jug",
          "Bottled mineral water",
          "Universal power plugs",
        ],
        bathroomAmenities: [
          "Heated WC seat",
          "Compartmentalised shower",
          "Cold & hot water rain shower",
          "Shampoo & body liquid soap",
          "Hairdryer",
          "Bathroom heater",
          "Complimentary bathrobe, towels, and toiletries",
        ],
        optional: "Extra bed setup",
        images: ["/images/home/heat.jpg"], // multiple images array
      }
    );
  }, [location.state, roomId]);

  const [updatedRoom, setUpdatedRoom] = useState({
    id: baseRoom.id,
    title: baseRoom.title,
    size: baseRoom.size,
    occupancy: baseRoom.occupancy,
    beds: baseRoom.beds,
    location: baseRoom.location,
    details: baseRoom.details,
    features: Array.isArray(baseRoom.features)
      ? baseRoom.features.join(", ")
      : baseRoom.features,
    bathroomAmenities: Array.isArray(baseRoom.bathroomAmenities)
      ? baseRoom.bathroomAmenities.join(", ")
      : baseRoom.bathroomAmenities,
    optional: baseRoom.optional || "",
  });

  const [images, setImages] = useState(
    Array.isArray(baseRoom.images)
      ? baseRoom.images.map((url) => ({ url }))
      : []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRoom((prev) => ({ ...prev, [name]: value }));
  };

  const openPicker = () => fileRef.current?.click();

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + images.length > 5) {
      Swal.fire({
        icon: "warning",
        title: "Image Limit Reached",
        text: "You can upload a maximum of 5 images.",
      confirmButtonColor: "#008000",
      color: "#fff",
      background: "#006600",

      });
      return;
    }
    const newImages = selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const img = images[index];
    if (img?.url?.startsWith("blob:")) URL.revokeObjectURL(img.url);
    setImages(images.filter((_, i) => i !== index));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (images.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Please add at least one image",
      confirmButtonColor: "#008000",
      color: "#fff",
      background: "#006600",        
      });
      return;
    }

    const normalized = {
      ...updatedRoom,
      features: String(updatedRoom.features)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      bathroomAmenities: String(updatedRoom.bathroomAmenities)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      images: images.map((img) => img.url), // store image URLs or blob previews
    };

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the room details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
            confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      color: "#fff",
      background: "#006600",
    }).then((result) => {
      if (result.isConfirmed) {
        const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
        const next = rooms.map((r) =>
          String(r.id) === String(normalized.id) ? normalized : r
        );
        localStorage.setItem("rooms", JSON.stringify(next));
        navigate("/room-display");
      }
    });
  };

  return (
    <section className="min-h-screen bg-gray-50 font-inter py-6">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg -lg">
        <h1 className="text-2xl font-semibold text-black mb-6">Edit Room</h1>
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Room Title + Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Room Title</label>
              <input
                type="text"
                name="title"
                value={updatedRoom.title}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 -md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Room Size</label>
              <input
                type="text"
                name="size"
                value={updatedRoom.size}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 -md"
                required
              />
            </div>
          </div>

          {/* Occupancy + Beds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Occupancy</label>
              <input
                type="number"
                name="occupancy"
                value={updatedRoom.occupancy}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 -md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Beds</label>
              <input
                type="text"
                name="beds"
                value={updatedRoom.beds}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 -md"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={updatedRoom.location}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 -md"
            />
          </div>

          {/* Room Details */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Room Details</label>
            <textarea
              name="details"
              value={updatedRoom.details}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 p-3 -md"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Room Features (comma separated)
            </label>
            <input
              type="text"
              name="features"
              value={updatedRoom.features}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 -md"
            />
          </div>

          {/* Bathroom Amenities */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Bathroom Amenities (comma separated)
            </label>
            <input
              type="text"
              name="bathroomAmenities"
              value={updatedRoom.bathroomAmenities}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 -md"
            />
          </div>

          {/* Optional */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Other Options</label>
            <input
              type="text"
              name="optional"
              value={updatedRoom.optional}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 -md"
            />
          </div>

{/* Multiple Image Upload */}
<div>
  <label className="block text-gray-700 font-medium mb-2">
    Room Images (Max 5)
  </label>

  {/* Hidden file input */}
  <input
    type="file"
    accept="image/*"
    multiple
    ref={fileRef}
    onChange={handleImageChange}
    className="hidden"
  />

  {/* Upload button + count */}
  <div className="flex items-center gap-3 mb-3">
    <button
      type="button"
      onClick={openPicker}
      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
    >
      <FaCloudUploadAlt className="text-gray-600 w-5 h-5" />
      <span className="text-gray-700 font-medium">Upload Image</span>
    </button>

    <span className="text-gray-600">
      {images.length} file{images.length !== 1 ? "s" : ""} selected
    </span>
  </div>

  {/* Image previews */}
  {images.length > 0 && (
    <div className="flex flex-wrap mt-2 gap-3">
      {images.map((img, i) => (
        <div
          key={i}
          className="relative w-24 h-24 border rounded-md overflow-hidden group"
        >
          <img
            src={img.url}
            alt={`Room Preview ${i + 1}`}
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
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="bg-[#006600] text-white py-2 px-8 -md hover:bg-[#004d00] transition-colors"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border border-[#006600] text-[#006600] py-3 px-8 -md hover:bg-[#f0fdf4] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditRoom;
