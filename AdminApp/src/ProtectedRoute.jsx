
// import { Navigate, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// export default function ProtectedRoute({ children }) {
//   const [loading, setLoading] = useState(true);
//   const [authenticated, setAuthenticated] = useState(false);
//   const navigate = useNavigate();

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

//         if (!res.ok) {
//           setAuthenticated(false);
//           showPopupAndRedirect();
//         } else {
//           setAuthenticated(true);
//         }
//       } catch (err) {
//         clearTimeout(timeout);
//         setAuthenticated(false);
//         showPopupAndRedirect();
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   // 🔥 Popup function (waits before redirect)
//   const showPopupAndRedirect = async () => {
//     await Swal.fire({
//       icon: "warning",
//       title: "Please Login",
//       text: "Admin access only.",
//       confirmButtonColor: "#006600",
//       background: "#ffffff",
//     });
//     navigate("/login", { replace: true });
//   };

//   if (loading) return null;

//   if (!authenticated) return null; // Because redirect handled manually

//   return children;
// }
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timeout = setTimeout(() => {
      setAuthenticated(false);
      setLoading(false);
      showPopupAndRedirect();
    }, 2000);

    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_URL}/check-auth`, {
          method: "GET",
          credentials: "include",
        });

        clearTimeout(timeout);

        if (!res.ok) {
          setAuthenticated(false);
          setLoading(false);
          showPopupAndRedirect();
        } else {
          setAuthenticated(true);
          setLoading(false);
        }
      } catch (err) {
        clearTimeout(timeout);
        setAuthenticated(false);
        setLoading(false);
        showPopupAndRedirect();
      }
    };

    checkAuth();
  }, []);

  const showPopupAndRedirect = async () => {
    await Swal.fire({
      icon: "warning",
      title: "Please Login",
      text: "Admin access only.",
      confirmButtonColor: "#006600",
      background: "#ffffff",
    });
    navigate("/login", { replace: true });
  };

  if (loading) {
    return <div></div>; // ⬅ keeps component mounted
  }

  if (!authenticated) {
    return <div></div>; // ⬅ allows popup to appear
  }

  return children;
}
