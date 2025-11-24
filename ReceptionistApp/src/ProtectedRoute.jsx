// // // src/Components/ProtectedRoute.jsx
// // import { Navigate } from "react-router-dom";
// // import { useEffect, useState } from "react";

// // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// // export default function ProtectedRoute({ children }) {
// //   const [loading, setLoading] = useState(true);
// //   const [authenticated, setAuthenticated] = useState(false);

// //   useEffect(() => {
// //     const checkAuth = async () => {
// //       try {
// //         const res = await fetch(`${API_URL}/check-auth`, {
// //           method: "GET",
// //           credentials: "include",
// //         });

// //         if (res.ok) {
// //           setAuthenticated(true);
// //         } else {
// //           setAuthenticated(false);
// //         }
// //       } catch (err) {
// //         setAuthenticated(false);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     checkAuth();
// //   }, []);

// //   if (loading) return <p>Loading...</p>;

// //   return authenticated ? children : <Navigate to="/login" replace />;
// // }
// // // src/Components/ProtectedRoute.jsx
// // import { Navigate } from "react-router-dom";
// // import { useEffect, useState } from "react";

// // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// // export default function ProtectedRoute({ children }) {
// //   const [loading, setLoading] = useState(true);
// //   const [authenticated, setAuthenticated] = useState(false);

// //   useEffect(() => {
// //     const checkAuth = async () => {
// //       try {
// //         const res = await fetch(`${API_URL}/check-auth`, {
// //           method: "GET",
// //           credentials: "include",
// //         });

// //         if (res.ok) {
// //           setAuthenticated(true);
// //         } else {
// //           setAuthenticated(false);
// //         }
// //       } catch (err) {
// //         setAuthenticated(false);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     checkAuth();
// //   }, []);

// //   if (loading) return <p>Loading...</p>;

// //   return authenticated ? children : <Navigate to="/login" replace />;
// // }
// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// export default function ProtectedRoute({ children }) {
//   const [loading, setLoading] = useState(true);
//   const [authenticated, setAuthenticated] = useState(false);
//   const [showLoginAlert, setShowLoginAlert] = useState(false);

//   useEffect(() => {
//     let timeout = setTimeout(() => {
//       setAuthenticated(false);
//       setLoading(false);
//     }, 2000);

//     const checkAuth = async () => {
//       try {
//         const res = await fetch(`${API_URL}/check-auth`, {
//           method: "GET",
//           credentials: "include",
//         });

//         clearTimeout(timeout);
//         setAuthenticated(res.ok);
//         if (!res.ok) setShowLoginAlert(true);
//       } catch (err) {
//         clearTimeout(timeout);
//         setAuthenticated(false);
//         setShowLoginAlert(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   if (loading) return null;

//   if (!authenticated) {
//     if (showLoginAlert) {
//       Swal.fire({
//         icon: "warning",
//         title: "Please Login",
//         text: "You must be logged in to access this page.",
//         confirmButtonColor: "#006600",
//         background: "#ffffff",
//       });
//       setShowLoginAlert(false); // avoid repeat popup
//     }

//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setAuthenticated(false);
      setLoading(false);
    }, 2000);

    const checkAuth = async () => {
      try {
        // 🔥 Check ONLY receptionist authentication
        const res = await fetch(`${API_URL}/check-auth`, {
          method: "GET",
          credentials: "include",
        });

        clearTimeout(timeout);
        setAuthenticated(res.ok);

        if (!res.ok) setShowLoginAlert(true);
      } catch (err) {
        clearTimeout(timeout);
        setAuthenticated(false);
        setShowLoginAlert(true);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return null;

  if (!authenticated) {
    if (showLoginAlert) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "Receptionist access only.",
        confirmButtonColor: "#006600",
        background: "#ffffff",
      });
      setShowLoginAlert(false);
    }

    return <Navigate to="/login" replace />;
  }

  return children;
}
