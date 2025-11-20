// // src/Pages/Receptionists.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { setAlert } from "../utils/sweetAlert";
// import { Plus } from "lucide-react";

// const initialReceptionists = [
//   { id: 1, username: "Receptionist1", password: "pass123" },
//   { id: 2, username: "Receptionist2", password: "pass456" },
// ];

// const Receptionists = () => {
//   const [receptionists, setReceptionists] = useState(initialReceptionists);
//   const [showAddPopup, setShowAddPopup] = useState(false);
//   const [newUsername, setNewUsername] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   // For validation
//   const [touchedUsername, setTouchedUsername] = useState(false);
//   const [touchedPassword, setTouchedPassword] = useState(false);

//   const navigate = useNavigate();

//   const validatePassword = (pw) => {
//     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
//     return regex.test(pw);
//   };

//   const handleAddReceptionist = async () => {
//     setTouchedUsername(true);
//     setTouchedPassword(true);

//     if (!newUsername || !newPassword) return;

//     if (!validatePassword(newPassword)) {
//       return; // error message will show via validation below
//     }

//     setReceptionists([
//       ...receptionists,
//       { id: Date.now(), username: newUsername, password: newPassword },
//     ]);
//     setShowAddPopup(false);
//     await setAlert({ icon: "success", title: "Added!", text: `Receptionist ${newUsername} created.` });
//     setNewUsername("");
//     setNewPassword("");
//     setTouchedUsername(false);
//     setTouchedPassword(false);
//   };

//   return (
//     <div className="px-2">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Receptionists</h1>
// <button
//   className="inline-flex items-center gap-2 px-4 h-10 text-md text-white shadow-md hover:shadow-lg transition"
//   style={{ backgroundColor: "#006600" }}
//   onClick={() => setShowAddPopup(true)} // <-- show popup on click
// >
//   <Plus size={18} />
//   Add New
// </button>

//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {receptionists.map((rec) => (
//           <div key={rec.id} className="bg-white shadow p-12 flex flex-col items-center gap-6">
//             <p className="font-semibold">{rec.username}</p>
//             <button
//               className="bg-[#006600] text-white px-10 py-2 hover:bg-green-800"
//               onClick={() => navigate("/receptionist-details", { state: { receptionist: rec } })}
//             >
//               View
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Add New Popup */}
//       {showAddPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 w-96  shadow-lg">
//             <h2 className="text-xl font-bold mb-4 text-center">Add Receptionist</h2>

//             <div className="mb-3">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={newUsername}
//                 onChange={(e) => {
//                   setNewUsername(e.target.value);
//                   setTouchedUsername(true);
//                 }}
//                 className="w-full border px-3 py-2  focus:outline-none focus:ring-2 focus:ring-green-300"
//               />
//               {touchedUsername && !newUsername && (
//                 <p className="text-red-500 text-sm mt-1">Username is required</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={newPassword}
//                 onChange={(e) => {
//                   setNewPassword(e.target.value);
//                   setTouchedPassword(true);
//                 }}
//                 className="w-full border px-3 py-2  focus:outline-none focus:ring-2 focus:ring-green-300"
//               />
//               {touchedPassword && !newPassword && (
//                 <p className="text-red-500 text-sm mt-1">Password is required</p>
//               )}
//               {touchedPassword && newPassword && !validatePassword(newPassword) && (
//                 <p className="text-red-500 text-sm mt-1">
// Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.                </p>
//               )}
//             </div>

//             <div className="flex justify-center gap-4 mt-4">
//               <button
//                 className="bg-[#006600] text-white px-6 py-2 hover:bg-green-800"
//                 onClick={handleAddReceptionist}
//               >
//                 Create
//               </button>
//               <button
//                 className="bg-red-600 text-white px-6 py-2 hover:bg-red-700"
//                 onClick={() => {
//                   setShowAddPopup(false);
//                   setNewUsername("");
//                   setNewPassword("");
//                   setTouchedUsername(false);
//                   setTouchedPassword(false);
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Receptionists;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../utils/sweetAlert";
import { Plus } from "lucide-react";

const API_URL = "http://localhost:3000";
const THEME_GREEN = "#006600";

const Receptionists = () => {
  const [receptionists, setReceptionists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Validation
  const [touchedUsername, setTouchedUsername] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);

  const navigate = useNavigate();

  // ✅ Fetch Receptionists
  useEffect(() => {
    const fetchReceptionists = async () => {
      try {
        const res = await fetch(`${API_URL}/receptionists`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401) throw new Error("Unauthorized");
        if (!res.ok) throw new Error("Failed to fetch receptionists");

        const data = await res.json();
        setReceptionists(data.receptionists || []);
      } catch (err) {
        console.error("❌ Fetch receptionists error:", err);
        await setAlert({
          icon: "error",
          title: "Error",
          text:
            err.message === "Unauthorized"
              ? "Your session has expired. Please log in again."
              : "Failed to load receptionists. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReceptionists();
  }, []);

  // ✅ Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // ✅ Handle Add Receptionist
  const handleAddReceptionist = async () => {
    setTouchedUsername(true);
    setTouchedEmail(true);

    if (!newUsername || !newEmail) return;
    if (!validateEmail(newEmail)) return;

    try {
      const res = await fetch(`${API_URL}/receptionists/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: newUsername,
          email: newEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Failed to create receptionist");

      await setAlert({
        icon: "success",
        title: "Success",
        text: `Receptionist ${newUsername} created successfully! Password has been sent to their email.`,
      });

      // ✅ Update list
      setReceptionists((prev) => [...prev, data.receptionist]);
      setShowAddPopup(false);
      setNewUsername("");
      setNewEmail("");
      setTouchedUsername(false);
      setTouchedEmail(false);
    } catch (err) {
      console.error("❌ Add receptionist error:", err);
      await setAlert({
        icon: "error",
        title: "Error",
        text:
          err.message === "Unauthorized"
            ? "Your session has expired. Please log in again."
            : err.message || "Failed to create receptionist. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading receptionists...
      </div>
    );
  }

  return (
    <div className="px-2 font-inter">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Receptionists</h1>
        <button
          className="inline-flex items-center gap-2 px-4 h-10 text-md text-white shadow-md hover:shadow-lg transition"
          style={{ backgroundColor: THEME_GREEN }}
          onClick={() => setShowAddPopup(true)}
        >
          <Plus size={18} />
          Add New
        </button>
      </div>

      {/* Receptionists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {receptionists.length > 0 ? (
          receptionists.map((rec) => (
            <div
              key={rec._id}
              className="bg-white shadow p-8 flex flex-col items-center gap-4 border rounded-lg"
            >
              <p className="font-semibold text-lg text-black">
                {rec.username}
              </p>
              <p className="text-sm text-gray-500">{rec.email}</p>
              <button
                className="bg-[#006600] text-white px-6 py-2 hover:bg-green-800 rounded-md"
                onClick={() =>
                  navigate("/receptionist-details", {
                    state: { receptionist: rec },
                  })
                }
              >
                View
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No receptionists found.
          </p>
        )}
      </div>

      {/* Add New Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-96 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">
              Add Receptionist
            </h2>

            <div className="mb-3">
              <input
                type="text"
                placeholder="Username"
                value={newUsername}
                onChange={(e) => {
                  setNewUsername(e.target.value);
                  setTouchedUsername(true);
                }}
                className="w-full border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 rounded"
              />
              {touchedUsername && !newUsername && (
                <p className="text-red-500 text-sm mt-1">
                  Username is required
                </p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                  setTouchedEmail(true);
                }}
                className="w-full border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 rounded"
              />
              {touchedEmail && !newEmail && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
              {touchedEmail && newEmail && !validateEmail(newEmail) && (
                <p className="text-red-500 text-sm mt-1">
                  Invalid email format
                </p>
              )}
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-[#006600] text-white px-6 py-2 hover:bg-green-800 rounded"
                onClick={handleAddReceptionist}
              >
                Create
              </button>
              <button
                className="bg-red-600 text-white px-6 py-2 hover:bg-red-700 rounded"
                onClick={() => {
                  setShowAddPopup(false);
                  setNewUsername("");
                  setNewEmail("");
                  setTouchedUsername(false);
                  setTouchedEmail(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Receptionists;
