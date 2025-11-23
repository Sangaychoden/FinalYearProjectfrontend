
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setAlert } from "../utils/sweetAlert";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ReceptionistDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { receptionist } = location.state;

  const [showPassword, setShowPassword] = useState(false);
  const [showChangePwModal, setShowChangePwModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username] = useState(receptionist.username);
  const [email] = useState(receptionist.email);

  const [touchedNew, setTouchedNew] = useState(false);
  const [touchedConfirm, setTouchedConfirm] = useState(false);

  // ✅ Delete receptionist (kept same)
  const handleDelete = async () => {
    const confirmed = await setAlert({
      icon: "warning",
      title: "Confirm Delete",
      text: `Do you want to delete ${username}?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (!confirmed) return;

    try {
      const res = await fetch(`${API_URL}/receptionists/${receptionist._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete receptionist");

      await setAlert({
        icon: "success",
        title: "Deleted!",
        text: `Receptionist ${username} deleted successfully.`,
      });
      navigate("/receptionists");
    } catch (err) {
      console.error("❌ Delete error:", err);
      await setAlert({
        icon: "error",
        title: "Error",
        text: "Failed to delete receptionist.",
      });
    }
  };

  // ✅ Password validation
  const validatePassword = (pw) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pw);
  };

  // ✅ Handle Change Password (using /change-password/:id)
  const handlePasswordChangeSubmit = async () => {
    setTouchedNew(true);
    setTouchedConfirm(true);

    if (!newPassword || !confirmPassword) return;

    if (!validatePassword(newPassword)) {
      await setAlert({
        icon: "error",
        title: "Invalid Password",
        text:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      await setAlert({
        icon: "error",
        title: "Mismatch",
        text: "Passwords do not match.",
      });
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/receptionists/change-password/${receptionist._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            username,
            newPassword,
            confirmNewPassword: confirmPassword,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to change password");

      await setAlert({
        icon: "success",
        title: "Password Changed",
        text: `Password for ${username} updated successfully.`,
      });

      setShowChangePwModal(false);
      setNewPassword("");
      setConfirmPassword("");
      setTouchedNew(false);
      setTouchedConfirm(false);
    } catch (err) {
      console.error("❌ Password update error:", err);
      await setAlert({
        icon: "error",
        title: "Error",
        text: err.message || "Failed to change password.",
      });
    }
  };

  return (
    <div className="px-2 py-4 relative">
      {/* Back button top-right */}
      <button
        className="absolute right-2 top-2 px-4 py-2 border border-gray-300 text-gray-600"
        onClick={() => navigate("/receptionists")}
      >
        Back
      </button>

      <h1 className="text-2xl font-semibold mb-6 text-center">
        Receptionist Details
      </h1>

      <div className="bg-white shadow p-6 w-96 mx-auto flex flex-col gap-4">
        {/* Username */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            readOnly
            className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        {/* Email (now displayed instead of password) */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="text"
            value={email}
            readOnly
            className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        {/* Password Placeholder (hidden for security) */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password (Hidden)
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={"********"}
              readOnly
              className="w-full border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-600"
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5" />
              ) : (
                <FaEye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4 justify-center">
          <button
            className="bg-[#006600] text-white px-4 py-2 hover:bg-green-800 w-1/2"
            onClick={() => setShowChangePwModal(true)}
          >
            Change Password
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2  w-1/2"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePwModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-96 shadow-lg flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-2 text-center">
              Change Password
            </h2>

            {/* New Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setTouchedNew(true);
                }}
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {touchedNew && !newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  New password is required
                </p>
              )}
              {touchedNew && newPassword && !validatePassword(newPassword) && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be at least 8 characters and include an
                  uppercase letter, a lowercase letter, a number, and a special
                  character.
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setTouchedConfirm(true);
                }}
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {touchedConfirm && !confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  Confirm password is required
                </p>
              )}
              {touchedConfirm &&
                confirmPassword &&
                newPassword !== confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    Passwords do not match
                  </p>
                )}
            </div>

            {/* Modal Buttons */}
            <div className="flex gap-4 mt-4 justify-center">
              <button
                className="bg-[#006600] text-white px-4 py-2 hover:bg-green-800 w-1/2"
                onClick={handlePasswordChangeSubmit}
              >
                Change
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 w-1/2"
                onClick={() => {
                  setShowChangePwModal(false);
                  setNewPassword("");
                  setConfirmPassword("");
                  setTouchedNew(false);
                  setTouchedConfirm(false);
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

export default ReceptionistDetails;
