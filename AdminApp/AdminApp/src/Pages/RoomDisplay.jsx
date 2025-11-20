import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // Add useNavigate
import { BsArrowLeft, BsArrowRight, BsCheck2 } from "react-icons/bs";
import { FaDollarSign, FaVectorSquare, FaUserFriends, FaBed, FaWater } from "react-icons/fa";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const RoomDisplay = () => {
  const { roomId } = useParams();
  const [imageIndex, setImageIndex] = useState(0);

  // Initialize the room data
  const rooms = [
    {
      id: 1,
      title: "Deluxe Double",
      size: "29 m²",
      occupancy: 3,
      beds: "2 x Super Single Bed(s)",
      location: "Riverside View",
      details: "Enjoy a relaxing stay in our Deluxe Double Room, featuring a scenic river view and a cozy, well-appointed space.",
      features: [
        "Individually controlled air-conditioning",
        "Carpeted flooring",
        "Bedhead USB chargers",
        "Cable TV",
        "Free WiFi",
        "Coffee/Tea facilities with kettle jug",
        "Bottled mineral water",
        "Universal power plugs"
      ],
      bathroomAmenities: [
        "Heated WC seat",
        "Compartmentalised shower",
        "Cold & hot water rain shower",
        "Shampoo & body liquid soap",
        "Hairdryer",
        "Bathroom heater",
        "Complimentary bathrobe, towels, and toiletries"
      ],
      optional: "Extra bed setup",
      image: "/images/heat.png"
    }
  ];

  // Initialize useNavigate
  const navigate = useNavigate();

  const prevBtn = () => setImageIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
  const nextBtn = () => setImageIndex((prev) => (prev + 1) % rooms.length);

  const setAlert = () => {
    Swal.fire({
      html: `<p style="color:#d3ffd3; font-size:16px;">Do you want to proceed to booking details?</p>`,
      title: "Room is available!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      color: "#fff",
      iconColor: "#fff",
      background: "#006600"
    }).then((result) => {
      if (result.isConfirmed) {
        // Navigate to booking details with room information
        navigate(`/room-display`);
      }
    });
  };

  // Handle Edit Button click
  const handleEdit = () => {
  const room = rooms.find(r => r.id === Number(roomId)) || rooms[0];
  navigate(`/edit-room`, { state: { room } });
};

  return (
    <section>
      <div className="py-0 px-2 bg-white text-black">
        <div className="flex justify-between items-center max-w-8xl mx-auto mb-6 px-4 md:px-0">
  <h1 className="text-2xl font-bold">Room Details</h1>

  <button
    type="button"
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 border border-gray-300 text-gray-300 px-4 py-2 transition-colors"
  >
    Back
  </button>
</div>

<div className="max-w-8xl   grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5">

          <div className="col-span-6 md:col-span-4">
            {/* Image slider */}
            <div className="overflow-hidden relative group">
              <img
                src={rooms[0].image}
                alt="Room"
                className="transition-all duration-500 delay-300 w-full h-[400px] object-cover "
              />
              <span
                className="w-[40px] h-[40px] bg-white dark:bg-lightBlack hover:bg-[#006600] dark:hover:bg-[#006600] grid items-center justify-center absolute bottom-[45%] left-[-50px] group-hover:left-4 transition-all duration-300 cursor-pointer"
                onClick={prevBtn}
              >
                <BsArrowLeft size={20} className="text-lightBlack dark:text-white hover:text-white" />
              </span>
              <span
                className="w-[40px] h-[40px] bg-white dark:bg-lightBlack hover:bg-[#006600] dark:hover:bg-[#006600] grid items-center justify-center absolute bottom-[45%] right-[-50px] group-hover:right-4 transition-all duration-300 cursor-pointer"
                onClick={nextBtn}
              >
                <BsArrowRight size={20} className="text-lightBlack dark:text-white hover:text-white" />
              </span>
            </div>

            {/* Room Title & Description */}
            <div className="pt-5 lg:pt-[28px] pr-3">
              <h2 className="py-2 font-Arial text-2xl text-black font-semibold">
                {rooms[0]?.title}
              </h2>
              <p className="text-l lg:text-l leading-6 text-black font-normal font-Arial">
                {rooms[0]?.details}
              </p>

              {/* Room Features */}
              <div className="pt-10">
                <h2 className="pb-2 font-Arial text-2xl text-black font-semibold">Room Features</h2>
                <ul className="space-y-3">
                  {rooms[0]?.features.map((feature, i) => (
                    <li className="flex items-center text-md text-black" key={i}>
                      <BsCheck2 size={16} className="text-[#006600] mr-3" />
                      <span className="text-md text-black">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bathroom Amenities */}
              <div className="pt-10">
                <h2 className="pb-2 font-Arial text-2xl text-black font-semibold">Bathroom Amenities</h2>
                <ul className="space-y-3">
                  {rooms[0]?.bathroomAmenities.map((item, i) => (
                    <li className="flex items-center text-md text-black" key={i}>
                      <BsCheck2 size={16} className="text-[#006600] mr-3" />
                      <span className="text-md text-black">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

{/* Right Column: Room Info */}
<div className="col-span-6 md:col-span-3 lg:col-span-2">
  <div className="bg-[#F5F5F5] dark:bg-lightBlack px-7 py-8 md:px-8 md:py-10 lg:px-0 lg:py-0 2xl:px-10 2xl:pt-[45px] 2xl:pb-[30px]">
    {/* Title */}
    <h4 className="font-Arial px-5 text-xl sm:text-[22px] md:text-2xl xl:text-2xl leading-7 md:leading-8 lg:leading-10 xl:leading-[50px] 2xl:leading-[60px] 3xl:leading-[70px] text-lightBlack dark:text-white font-semibold pt-4">
      Room Info
    </h4>

    {/* Room Info List */}
    <div className="grid items-center">
      <div className="flex items-center py-5 px-5 border-b-[1px] border-[#D3D3D3] dark:border-gray">
        <FaVectorSquare className="text-[#006600] w-5 h-5 mr-3" />
        <span className="text-sm lg:text-[15px] leading-[26px] text-[#808080] dark:text-lightGray font-normal font-Arial">
          {rooms[0].size} sqm
        </span>
      </div>

      <div className="flex items-center py-5 px-5 border-b-[1px] border-[#D3D3D3] dark:border-gray">
        <FaUserFriends className="text-[#006600] w-5 h-5 mr-3" />
        <span className="text-sm lg:text-[15px] leading-[26px] text-[#808080] dark:text-lightGray font-normal font-Arial">
          {rooms[0].occupancy} max
        </span>
      </div>

      <div className="flex items-center py-5 px-5 border-b-[1px] border-[#D3D3D3] dark:border-gray">
        <FaBed className="text-[#006600] w-5 h-5 mr-3" />
        <span className="text-sm lg:text-[15px] leading-[26px] text-[#808080] dark:text-lightGray font-normal font-Arial">
          {rooms[0].beds}
        </span>
      </div>

      <div className="flex items-center py-5 px-5 dark:border-gray">
        <FaWater className="text-[#006600] w-5 h-5 mr-3" />
        <span className="text-sm lg:text-[15px] leading-[26px] text-[#808080] dark:text-lightGray font-normal font-Arial">
          {rooms[0].location}
        </span>
      </div>
    </div>


  </div>
      {/* Edit Button */}
    <div className="py-5">
      <button
        onClick={handleEdit}
        className="bg-[#006600] w-full h-10 2xl:h-[50px] text-white px-5 hover:bg-green-700 transition"
      >
        Edit
      </button>
    </div>
</div>

        </div>
      </div>
    </section>
  );
};

export default RoomDisplay;