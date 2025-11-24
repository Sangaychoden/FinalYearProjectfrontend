// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom"; // ✅ include useNavigate
// import logo from "../../public/images/logologo.png";

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate(); // ✅ initialize navigate

//   const menuItems = [
//     { path: "/dashboard", label: "DASHBOARD" },
//     { path: "/booking", label: "BOOKING" },
//     // { path: "/booking-form", label: "BOOKING FORM" },

    
    
//   ];

//   const handleLogout = () => {
//     // Optional: Clear session or token before redirect
//     // localStorage.removeItem("authToken");
//     navigate("/"); // ✅ redirects to login or homepage
//   };

//   return (
//     <div
//       className="fixed left-0 top-0 h-screen w-56 bg-white flex flex-col justify-between
//                  shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1),4px_0_4px_-2px_rgba(0,0,0,0.06)]
//                  z-50"
//     >
//       <div>
//         <div className="flex justify-center">
//           <img
//             src={logo}
//             alt="Resort Logo"
//             className="w-40 h-auto object-contain pt-5 pb-5"
//           />
//         </div>

//         <nav className="mt-0">
//           <ul>
//             {menuItems.map((item) => (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`block py-4 pl-8 font-small ${
//                     location.pathname === item.path
//                       ? "bg-[#006600] text-white"
//                       : "text-black hover:bg-gray-100"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

//       <div className="p-0">
//         <button
//           className="w-full py-3 bg-[#006600] text-white hover:bg-green-800"
//           onClick={handleLogout}
//         >
//           LOG OUT
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../public/images/logologo.png";

const API_URL = import.meta.env.VITE_API_URL;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/dashboard", label: "DASHBOARD" },
    { path: "/booking", label: "BOOKING" },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Logout failed");

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login"); // fallback
    }
  };

  return (
    <div
      className="fixed left-0 top-0 h-screen w-56 bg-white flex flex-col justify-between
                 shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1),4px_0_4px_-2px_rgba(0,0,0,0.06)]
                 z-50"
    >
      <div>
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Resort Logo"
            className="w-40 h-auto object-contain pt-5 pb-5"
          />
        </div>

        <nav className="mt-0">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block py-4 pl-8 font-small ${
                    location.pathname === item.path
                      ? "bg-[#006600] text-white"
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="p-0">
        <button
          className="w-full py-3 bg-[#006600] text-white hover:bg-green-800"
          onClick={handleLogout}
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
