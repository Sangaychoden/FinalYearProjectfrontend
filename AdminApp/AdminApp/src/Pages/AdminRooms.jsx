
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus} from "lucide-react";

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const roomData = [
      {
        id: 1,
        title: "Deluxe Double",
        availability: "20 Rooms Available",
        price: "$90 | Nu 7600",
        image: "/images/rooms/deluxe-double.jpg",
      },
      {
        id: 2,
        title: "Junior Suite",
        availability: "2 Rooms Available",
        price: "$95 | Nu 8200",
        image: "/images/rooms/junior-suite.jpg",
      },
    ];
    setRooms(roomData);
  }, []);

  // Navigate to Room Display page
  const handleViewClick = (roomId) => {
    navigate(`/room-display`);
  };

  const RoomCard = ({ room, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className={`bg-white shadow-lg overflow-hidden border-l-4 border-[#004d00] hover:shadow-xl transition-all duration-500 transform ${
          isHovered ? "scale-105 -translate-y-2" : "scale-100"
        }`}
        style={{ animationDelay: `${index * 200}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex">
          {/* Room Image */}
          <div className="w-2/5">
            <img
              src={room.image}
              alt={room.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop";
              }}
            />
          </div>

          {/* Room Details */}
          <div className="w-3/5 p-16">
            <h3 className="text-xl font-semibold text-black mb-2">
              {room.title}
            </h3>
            {room.price && (
              <p className="text-lg font-semibold text-black mb-2">
                {room.price}
              </p>
            )}
            <p className="text-lightblack mb-6">{room.availability}</p>
            <button
              onClick={() => handleViewClick(room.id)}
              className="w-full bg-[#004d00] text-white py-2 px-4 font-small hover:bg-[#003300] transition-colors duration-300"
            >
              View
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-2">
      <div className="max-w-6xl mx-auto"> {/* ⬅ added padding-left */}
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Room Management
            </h1>
          </div>

          {/* Add Room Button */}
          <div className="ml-auto">
            <button
              className="inline-flex items-center gap-2 px-4 h-10 text-md text-white shadow-md hover:shadow-lg transition"
              style={{ backgroundColor: "#006600" }}
              onClick={() => navigate("/add-room")}
            >
              <Plus size={18} />
              Add Room
            </button>
          </div>
          
        </div>

        {/* Room Cards Grid */}
        <div className="space-y-6 mt-4">
          {rooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminRooms;
