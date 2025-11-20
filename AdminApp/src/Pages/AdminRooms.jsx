
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const BTN_PER_USD = 85.49; // ✅ Conversion rate

  // ✅ Fetch rooms from backend
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${API_URL}/rooms/rooms`);
        const data = await response.json();

        if (response.ok && data.rooms) {
          setRooms(data.rooms);
        } else {
          console.error("Failed to fetch rooms:", data.message);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [API_URL]);

  // ✅ Navigate to Room Display page
  const handleViewClick = (roomId) => {
    navigate(`/room-display/${roomId}`);
  };

  // ✅ Room Card Component
  const RoomCard = ({ room, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    // 💵 Convert BTN → USD
    const usdPrice = (room.price / BTN_PER_USD).toFixed(2);

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
              src={room.images?.[0] || "/images/placeholder-room.jpg"}
              alt={room.roomType}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop";
              }}
            />
          </div>

          {/* Room Details */}
          <div className="w-3/5 p-6">
            <h3 className="text-xl font-semibold text-black mb-2">
              {room.roomType}
            </h3>

            {room.price && (
              <p className="text-lg font-semibold text-black mb-2">
                ${usdPrice} | Nu {room.price}
              </p>
            )}

            <p className="text-lightblack mb-6">
              {room.numberOfRooms} Room{room.numberOfRooms > 1 ? "s" : ""} Available
            </p>

            <button
              onClick={() => handleViewClick(room._id)}
              className="w-full bg-[#004d00] text-white py-2 px-4 font-small hover:bg-[#003300] transition-colors duration-300"
            >
              View
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ✅ Main UI
  return (
    <div className="min-h-screen bg-gray-50 px-2">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Room Management</h1>

          <button
            className="inline-flex items-center gap-2 px-4 h-10 text-md text-white shadow-md hover:shadow-lg transition"
            style={{ backgroundColor: "#006600" }}
            onClick={() => navigate("/add-room")}
          >
            <Plus size={18} />
            Add Room
          </button>
        </div>

        {/* Room Cards */}
        {loading ? (
          <div className="text-center text-gray-600 py-20 text-lg">
            Loading rooms...
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center text-gray-500 py-20 text-lg">
            No rooms found.
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            {rooms.map((room, index) => (
              <RoomCard key={room._id} room={room} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRooms;
