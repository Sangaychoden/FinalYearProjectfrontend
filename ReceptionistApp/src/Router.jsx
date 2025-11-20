// // src/AppRouter.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./Pages/Login";
// import Dashboard from "./Pages/Dashboard";
// import Booking from "./Pages/Booking";
// import BookingDetails from "./Pages/BookingDetails"; // <-- new
// import AdminLayout from "./Components/AdminLayout";

// const AppRouter = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Pages */}
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />

//         {/* Admin Pages using Layout */}
//         <Route
//           path="/dashboard"
//           element={
//             <AdminLayout>
//               <Dashboard />
//             </AdminLayout>
//           }
//         />

//         <Route
//           path="/booking"
//           element={
//             <AdminLayout>
//               <Booking />
//             </AdminLayout>
//           }
//         />

//         <Route
//           path="/booking-details"
//           element={
//             <AdminLayout>
//               <BookingDetails />
//             </AdminLayout>
//           }
//         />

//         {/* Add more admin pages here */}
//       </Routes>
//     </Router>
//   );
// };

// export default AppRouter;
// src/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Booking from "./Pages/Booking";
import BookingDetails from "./Pages/BookingDetails"; // Booking details page
import AdminLayout from "./Components/AdminLayout";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Pages with layout */}
        <Route
          path="/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/booking"
          element={
            <AdminLayout>
              <Booking />
            </AdminLayout>
          }
        />

        {/* ✅ Supports both /booking-details and /booking-details/:id */}
        <Route
          path="/booking-details/:id?"
          element={
            <AdminLayout>
              <BookingDetails />
            </AdminLayout>
          }
        />

        {/* Add more admin routes here */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
