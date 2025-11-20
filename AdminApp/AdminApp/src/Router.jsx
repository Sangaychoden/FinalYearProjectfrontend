// src/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import Dashboard from "./Pages/Dashboard";
import Booking from "./Pages/Booking";
import BookingDetails from "./Pages/BookingDetails";
import Receptionists from "./Pages/Receptionist";
import ReceptionistDetails from "./Pages/ReceptionistDetails";

// Admin pages
import AdminRooms from "./Pages/AdminRooms.jsx";
import AddRoom from "./Pages/AddRoom.jsx";
import RoomDisplay from "./Pages/RoomDisplay.jsx";
import EditRoom from "./Pages/EditRoom.jsx";
import AdminProfile from "./Pages/AdminProfile.jsx";
import AdminFacilities from "./Pages/AdminFacilities.jsx";
import AddFacility from "./Pages/AddFacility.jsx";
import EditFacility from "./Pages/EditFacility.jsx";
import AdminTestimonials from "./Pages/AdminTestimonials.jsx";
import AddTestimonial from "./Pages/AddTestimonial.jsx";
import EditTestimonial from "./Pages/EditTestimonial.jsx";
import AdminLayout from "./Components/AdminLayout";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Pages using Layout */}
        <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/booking" element={<AdminLayout><Booking /></AdminLayout>} />
        <Route path="/booking-details" element={<AdminLayout><BookingDetails /></AdminLayout>} />
        <Route path="/receptionists" element={<AdminLayout><Receptionists /></AdminLayout>} />
        <Route path="/receptionist-details" element={<AdminLayout><ReceptionistDetails /></AdminLayout>} />

        {/* Rooms */}
        <Route path="/admin-rooms" element={<AdminLayout><AdminRooms /></AdminLayout>} />
        <Route path="/add-room" element={<AdminLayout><AddRoom /></AdminLayout>} />
        <Route path="/room-display" element={<AdminLayout><RoomDisplay /></AdminLayout>} />
        <Route path="/edit-room" element={<AdminLayout><EditRoom /></AdminLayout>} />

        {/* Profile */}
        <Route path="/admin-profile" element={<AdminLayout><AdminProfile /></AdminLayout>} />

        {/* Facilities */}
        <Route path="/admin-facilities" element={<AdminLayout><AdminFacilities /></AdminLayout>} />
        <Route path="/add-facility" element={<AdminLayout><AddFacility /></AdminLayout>} />
        <Route path="/edit-facility" element={<AdminLayout><EditFacility /></AdminLayout>} />

        {/* Testimonials */}
        <Route path="/admin-testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
        <Route path="/add-testimonial" element={<AdminLayout><AddTestimonial /></AdminLayout>} />
        <Route path="/edit-testimonial" element={<AdminLayout><EditTestimonial /></AdminLayout>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
