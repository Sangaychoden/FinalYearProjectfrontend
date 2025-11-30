
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
    // Basic Room Info
    roomType: "",
    roomNumbers: "",
    roomOccupancyType: "",
    numberOfRooms: "",
    size: "",
    beds: "",
    occupancy: "",
    roomDetails: "",
    roomFeatures: "",
    bathroomAmenities: "",
    optional: "",

    // Meal Plan Pricing (EP / CP / MAP / AP)
    epSingle: "",
    epDouble: "",
    cpSingle: "",
    cpDouble: "",
    mapSingle: "",
    mapDouble: "",
    apSingle: "",
    apDouble: "",

    // Extra Bed Pricing
    extraBedEP: "",
    extraBedCP: "",
    extraBedMAPSingle: "",
    extraBedMAPDouble: "",
    extraBedAP: "",

    // Child Pricing (Age 6–11)
    childEP: "",
    childCP: "",
    childMAP: "",
    childAP: "",

    // Meals Price
    mealBreakfast: "",
    mealLunch: "",
    mealDinner: "",

    // Tax
    taxGST: "",
    taxServiceCharge: "",
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

    // Basic required fields
    if (!formData.roomType.trim()) next.roomType = "Room Type is required.";
    if (!formData.roomNumbers.trim())
      next.roomNumbers = "Room numbers are required.";
    if (!formData.roomOccupancyType.trim())
      next.roomOccupancyType = "Room occupancy type is required.";
    if (!formData.numberOfRooms)
      next.numberOfRooms = "Number of Rooms is required.";
    if (!formData.size) next.size = "Room Size is required.";
    if (!formData.beds) next.beds = "Number of Beds is required.";
    if (!formData.occupancy) next.occupancy = "Occupancy is required.";
    if (!formData.roomDetails.trim())
      next.roomDetails = "Room Details are required.";
    if (!formData.roomFeatures.trim())
      next.roomFeatures = "Room Features are required.";
    if (!formData.bathroomAmenities.trim()) {
      next.bathroomAmenities = "Bathroom Amenities are required.";
    }

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

    // Basic Room Info
    formDataToSend.append("roomType", formData.roomType);

    const roomNumbersList = formData.roomNumbers
      ? formData.roomNumbers
          .split(",")
          .map((r) => r.trim())
          .filter(Boolean)
      : [];

    formDataToSend.append("roomNumbers", JSON.stringify(roomNumbersList));
    formDataToSend.append("roomOccupancyType", formData.roomOccupancyType);

    formDataToSend.append("numberOfRooms", formData.numberOfRooms);
    formDataToSend.append("size", formData.size);
    formDataToSend.append("beds", formData.beds);
    formDataToSend.append("occupancy", formData.occupancy);
    formDataToSend.append("roomDetails", formData.roomDetails);
    formDataToSend.append("roomFeatures", formData.roomFeatures);
    formDataToSend.append("bathroomAmenities", formData.bathroomAmenities);
    formDataToSend.append("optional", formData.optional);

    // Meal Plan Prices
    formDataToSend.append("epSingle", formData.epSingle);
    formDataToSend.append("epDouble", formData.epDouble);
    formDataToSend.append("cpSingle", formData.cpSingle);
    formDataToSend.append("cpDouble", formData.cpDouble);
    formDataToSend.append("mapSingle", formData.mapSingle);
    formDataToSend.append("mapDouble", formData.mapDouble);
    formDataToSend.append("apSingle", formData.apSingle);
    formDataToSend.append("apDouble", formData.apDouble);

    // Extra Bed
    formDataToSend.append("extraBedEP", formData.extraBedEP);
    formDataToSend.append("extraBedCP", formData.extraBedCP);
    formDataToSend.append("extraBedMAPSingle", formData.extraBedMAPSingle);
    formDataToSend.append("extraBedMAPDouble", formData.extraBedMAPDouble);
    formDataToSend.append("extraBedAP", formData.extraBedAP);

    // Child Policy (6–11)
    formDataToSend.append("childEP", formData.childEP);
    formDataToSend.append("childCP", formData.childCP);
    formDataToSend.append("childMAP", formData.childMAP);
    formDataToSend.append("childAP", formData.childAP);

    // Meals
    formDataToSend.append("mealBreakfast", formData.mealBreakfast);
    formDataToSend.append("mealLunch", formData.mealLunch);
    formDataToSend.append("mealDinner", formData.mealDinner);

    // Tax
    formDataToSend.append("taxGST", formData.taxGST);
    formDataToSend.append("taxServiceCharge", formData.taxServiceCharge);

    // Images
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
      <div className="bg-white p-8 shadow-lg w-full max-w-5xl">
        <h1 className="text-2xl font-bold text-black mb-6">Add New Room</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ================= BASIC ROOM INFO ================= */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Basic Room Information
            </h2>

            {/* Room Type + Room Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Room Type
                </label>
                <input
                  data-error={!!errors.roomType}
                  type="text"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  placeholder="e.g. Deluxe, Junior Suite"
                  className={`w-full border p-3 ${
                    errors.roomType ? "border-red-600" : "border-gray-300"
                  }`}
                />
                {errors.roomType && (
                  <p className="mt-2 text-red-500 text-sm">
                    {errors.roomType}
                  </p>
                )}
              </div>
               <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Number of Rooms
                </label>
                <input
                  data-error={!!errors.numberOfRooms}
                  name="numberOfRooms"
                  type="number"
                  value={formData.numberOfRooms}
                  onChange={handleChange}
                  placeholder="Total rooms of this type"
                  className={`w-full border p-3 ${
                    errors.numberOfRooms ? "border-red-600" : "border-gray-300"
                  }`}
                />
                {errors.numberOfRooms && (
                  <p className="mt-2 text-red-500 text-sm">
                    {errors.numberOfRooms}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Room Numbers (comma separated)
                </label>
                <input
                  data-error={!!errors.roomNumbers}
                  name="roomNumbers"
                  type="text"
                  value={formData.roomNumbers}
                  onChange={handleChange}
                  placeholder="e.g. 101, 102, 103"
                  className={`w-full border p-3 ${
                    errors.roomNumbers ? "border-red-600" : "border-gray-300"
                  }`}
                />
                {errors.roomNumbers && (
                  <p className="mt-2 text-red-500 text-sm">
                    {errors.roomNumbers}
                  </p>
                )}
              </div>
              <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Room Occupancy Type (comma separated, e.g. single, double)
              </label>
              <input
                data-error={!!errors.roomOccupancyType}
                name="roomOccupancyType"
                type="text"
                value={formData.roomOccupancyType}
                onChange={handleChange}
                placeholder="e.g. single, double"
                className={`w-full border p-3 ${
                  errors.roomOccupancyType
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
              />
              {errors.roomOccupancyType && (
                <p className="mt-2 text-red-500 text-sm">
                  {errors.roomOccupancyType}
                </p>
              )}
            </div>
            <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Room Size (sq ft)
                </label>
                <input
                  data-error={!!errors.size}
                  name="size"
                  type="number"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="e.g. 350"
                  className={`w-full border p-3 ${
                    errors.size ? "border-red-600" : "border-gray-300"
                  }`}
                />
                {errors.size && (
                  <p className="mt-2 text-red-500 text-sm">{errors.size}</p>
                )}
              </div>
               <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Beds (count)
                </label>
                <input
                  data-error={!!errors.beds}
                  type="number"
                  name="beds"
                  value={formData.beds}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  className={`w-full border p-3 ${
                    errors.beds ? "border-red-600" : "border-gray-300"
                  }`}
                />
                {errors.beds && (
                  <p className="mt-2 text-red-500 text-sm">{errors.beds}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Max Occupancy
                </label>
                <input
                  data-error={!!errors.occupancy}
                  type="number"
                  name="occupancy"
                  value={formData.occupancy}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  className={`w-full border p-3 ${
                    errors.occupancy ? "border-red-600" : "border-gray-300"
                  }`}
                />
                {errors.occupancy && (
                  <p className="mt-2 text-red-500 text-sm">
                    {errors.occupancy}
                  </p>
                )}
              </div>
            </div>

            {/* Room Details */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Room Details
              </label>
              <textarea
                data-error={!!errors.roomDetails}
                name="roomDetails"
                value={formData.roomDetails}
                onChange={handleChange}
                rows={3}
                placeholder="Describe the room briefly..."
                className={`w-full border p-3 ${
                  errors.roomDetails ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.roomDetails && (
                <p className="mt-2 text-red-500 text-sm">
                  {errors.roomDetails}
                </p>
              )}
            </div>

            {/* Features + Bathroom + Optional */}
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
                className={`w-full border p-3 ${
                  errors.roomFeatures ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.roomFeatures && (
                <p className="mt-2 text-red-500 text-sm">
                  {errors.roomFeatures}
                </p>
              )}
            </div>

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
                className={`w-full border p-3 ${
                  errors.bathroomAmenities
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
              />
              {errors.bathroomAmenities && (
                <p className="mt-2 text-red-500 text-sm">
                  {errors.bathroomAmenities}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Other Options
              </label>
              <input
                type="text"
                name="optional"
                value={formData.optional}
                onChange={handleChange}
                placeholder="e.g. River-facing, Non-smoking"
                className="w-full border p-3 border-gray-300"
              />
            </div>
          </section>

          {/* ================= MEAL PLAN PRICING ================= */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Meal Plan Pricing (Per Night)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* EP */}
              <div className="border rounded p-3">
                <h3 className="font-semibold mb-2">European Plan (EP)</h3>
                <label className="block text-sm text-gray-700 mb-1">
                  Single
                </label>
                <input
                  type="number"
                  name="epSingle"
                  value={formData.epSingle}
                  onChange={handleChange}
                  placeholder="EP Single"
                  className="w-full border p-2 border-gray-300 mb-2"
                />
                <label className="block text-sm text-gray-700 mb-1">
                  Double
                </label>
                <input
                  type="number"
                  name="epDouble"
                  value={formData.epDouble}
                  onChange={handleChange}
                  placeholder="EP Double"
                  className="w-full border p-2 border-gray-300"
                />
              </div>

              {/* CP */}
              <div className="border rounded p-3">
                <h3 className="font-semibold mb-2">Continental Plan (CP)</h3>
                <label className="block text-sm text-gray-700 mb-1">
                  Single
                </label>
                <input
                  type="number"
                  name="cpSingle"
                  value={formData.cpSingle}
                  onChange={handleChange}
                  placeholder="CP Single"
                  className="w-full border p-2 border-gray-300 mb-2"
                />
                <label className="block text-sm text-gray-700 mb-1">
                  Double
                </label>
                <input
                  type="number"
                  name="cpDouble"
                  value={formData.cpDouble}
                  onChange={handleChange}
                  placeholder="CP Double"
                  className="w-full border p-2 border-gray-300"
                />
              </div>

              {/* MAP */}
              <div className="border rounded p-3">
                <h3 className="font-semibold mb-2">Modified American Plan (MAP)</h3>
                <label className="block text-sm text-gray-700 mb-1">
                  Single
                </label>
                <input
                  type="number"
                  name="mapSingle"
                  value={formData.mapSingle}
                  onChange={handleChange}
                  placeholder="MAP Single"
                  className="w-full border p-2 border-gray-300 mb-2"
                />
                <label className="block text-sm text-gray-700 mb-1">
                  Double
                </label>
                <input
                  type="number"
                  name="mapDouble"
                  value={formData.mapDouble}
                  onChange={handleChange}
                  placeholder="MAP Double"
                  className="w-full border p-2 border-gray-300"
                />
              </div>

              {/* AP */}
              <div className="border rounded p-3">
                <h3 className="font-semibold mb-2">American Plan (AP)</h3>
                <label className="block text-sm text-gray-700 mb-1">
                  Single
                </label>
                <input
                  type="number"
                  name="apSingle"
                  value={formData.apSingle}
                  onChange={handleChange}
                  placeholder="AP Single"
                  className="w-full border p-2 border-gray-300 mb-2"
                />
                <label className="block text-sm text-gray-700 mb-1">
                  Double
                </label>
                <input
                  type="number"
                  name="apDouble"
                  value={formData.apDouble}
                  onChange={handleChange}
                  placeholder="AP Double"
                  className="w-full border p-2 border-gray-300"
                />
              </div>
            </div>
          </section>

          {/* ================= EXTRA BED & CHILD PRICING ================= */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Extra Bed & Child Pricing
            </h2>

            {/* Extra Bed */}
            <div>
              <h3 className="font-semibold mb-2">Extra Bed (Per Night)</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Extra Bed EP
                  </label>
                  <input
                    type="number"
                    name="extraBedEP"
                    value={formData.extraBedEP}
                    onChange={handleChange}
                    className="w-full border p-2 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Extra Bed CP
                  </label>
                  <input
                    type="number"
                    name="extraBedCP"
                    value={formData.extraBedCP}
                    onChange={handleChange}
                    className="w-full border p-2 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Extra Bed MAP (Single)
                  </label>
                  <input
                    type="number"
                    name="extraBedMAPSingle"
                    value={formData.extraBedMAPSingle}
                    onChange={handleChange}
                    className="w-full border p-2 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Extra Bed MAP (Double)
                  </label>
                  <input
                    type="number"
                    name="extraBedMAPDouble"
                    value={formData.extraBedMAPDouble}
                    onChange={handleChange}
                    className="w-full border p-2 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Extra Bed AP
                  </label>
                  <input
                    type="number"
                    name="extraBedAP"
                    value={formData.extraBedAP}
                    onChange={handleChange}
                    className="w-full border p-2 border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Child Pricing */}
            <div>
              <h3 className="font-semibold mb-2">
                Child (Age 6–11) Per Night (1–5 Years = Free)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Child EP
                  </label>
                  <input
                    type="number"
                    name="childEP"
                    value={formData.childEP}
                    onChange={handleChange}
                    className="w-full border p-2 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Child CP
                  </label>
                  <input
                    type="number"
                    name="childCP"
                    value={formData.childCP}
                    onChange={handleChange}
                    className="w-full border p-2 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Child MAP
                  </label>
                  <input
                    type="number"
                    name="childMAP"
                    value={formData.childMAP}
                    onChange={handleChange}
                    className="w-full border p-2 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Child AP
                  </label>
                  <input
                    type="number"
                    name="childAP"
                    value={formData.childAP}
                    onChange={handleChange}
                    className="w-full border p-2 border-gray-300"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ================= MEAL & TAX SECTION ================= */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Meals & Tax
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Meals */}
              <div>
                <h3 className="font-semibold mb-2">Meal Prices</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Breakfast
                    </label>
                    <input
                      type="number"
                      name="mealBreakfast"
                      value={formData.mealBreakfast}
                      onChange={handleChange}
                      placeholder="e.g. 660"
                      className="w-full border p-2 border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Lunch
                    </label>
                    <input
                      type="number"
                      name="mealLunch"
                      value={formData.mealLunch}
                      onChange={handleChange}
                      placeholder="e.g. 1200"
                      className="w-full border p-2 border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Dinner
                    </label>
                    <input
                      type="number"
                      name="mealDinner"
                      value={formData.mealDinner}
                      onChange={handleChange}
                      placeholder="e.g. 1500"
                      className="w-full border p-2 border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Tax */}
              <div>
                <h3 className="font-semibold mb-2">Tax</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      GST (%)
                    </label>
                    <input
                      type="number"
                      name="taxGST"
                      value={formData.taxGST}
                      onChange={handleChange}
                      placeholder="e.g. 5"
                      className="w-full border p-2 border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Service Charge (%)
                    </label>
                    <input
                      type="number"
                      name="taxServiceCharge"
                      value={formData.taxServiceCharge}
                      onChange={handleChange}
                      placeholder="e.g. 10"
                      className="w-full border p-2 border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= IMAGE UPLOAD ================= */}
          <section className="space-y-3" data-error={!!errors.images}>
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Upload Images
            </h2>

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
                <span className="text-gray-700 font-medium">Upload Images</span>
              </button>
              <span className="text-gray-600">
                {images.length} file{images.length !== 1 ? "s" : ""} selected
              </span>
            </div>

            {errors.images && (
              <p className="mt-2 text-red-500 text-sm">{errors.images}</p>
            )}

            {images.length > 0 && (
              <div className="flex flex-wrap mt-3 gap-3">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-24 h-24 border overflow-hidden group"
                  >
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
          </section>

          {/* ================= BUTTONS ================= */}
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

export default AddRoom;
