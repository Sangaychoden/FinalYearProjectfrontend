
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public pages
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";

// Admin pages
import Dashboard from "./Pages/Dashboard";
import Booking from "./Pages/Booking";
import BookingDetails from "./Pages/BookingDetails";
import Receptionists from "./Pages/Receptionist";
import ReceptionistDetails from "./Pages/ReceptionistDetails";

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
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* 🔐 PROTECTED ROUTES (Admin Only) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Booking />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking-details/:id"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <BookingDetails />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/receptionists"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Receptionists />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/receptionist-details"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <ReceptionistDetails />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Rooms */}
        <Route
          path="/admin-rooms"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminRooms />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-room"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AddRoom />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-room/:roomId"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <EditRoom />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/room-display/:roomId"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <RoomDisplay />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/admin-profile"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminProfile />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Facilities */}
        <Route
          path="/admin-facilities"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminFacilities />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-facility"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AddFacility />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-facility/:id"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <EditFacility />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Testimonials */}
        <Route
          path="/admin-testimonials"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminTestimonials />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-testimonial/:id"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <EditTestimonial />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-testimonial"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AddTestimonial />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
