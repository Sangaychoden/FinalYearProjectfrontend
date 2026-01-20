
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./Pages/Login";
// import Dashboard from "./Pages/Dashboard";
// import Booking from "./Pages/Booking";
// import BookingDetails from "./Pages/BookingDetails"; 
// import BookingFormPage from "./Pages/BookingFormPage";
// import AdminLayout from "./Components/AdminLayout";
// import ProtectedRoute from "./ProtectedRoute";

// const AppRouter = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Pages */}
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />

//         {/* ⭐ Protected Admin Pages */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <AdminLayout>
//                 <Dashboard />
//               </AdminLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/booking"
//           element={
//             <ProtectedRoute>
//               <AdminLayout>
//                 <Booking />
//               </AdminLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/booking-details/:id?"
//           element={
//             <ProtectedRoute>
//               <AdminLayout>
//                 <BookingDetails />
//               </AdminLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/booking-form/:id?"
//           element={
//             <ProtectedRoute>
//               <AdminLayout>
//                 <BookingFormPage />
//               </AdminLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* Add more protected admin routes here in the same way */}
//       </Routes>
//     </Router>
//   );
// };

// export default AppRouter;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Booking from "./Pages/Booking";
import BookingDetails from "./Pages/BookingDetails"; 
import BookingFormPage from "./Pages/BookingFormPage";
import AdminLayout from "./Components/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    // ✅ No basename needed - deployed on separate subdomain resortreception.xceedstudio.com
    <Router>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* ⭐ Protected Pages */}
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
          path="/booking-details/:id?"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <BookingDetails />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking-form/:id?"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <BookingFormPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
};

export default AppRouter;
