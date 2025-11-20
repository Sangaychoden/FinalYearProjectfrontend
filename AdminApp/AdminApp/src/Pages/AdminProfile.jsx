import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const AdminProfile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const currentPassword = "Admin@123"; // simulate stored password

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/;

  const validateFields = (field, value) => {
    const newErrors = { ...errors };

    if (field === "oldPassword") {
      if (!value.trim()) newErrors.oldPassword = "Old password is required.";
      else delete newErrors.oldPassword;
    }

    if (field === "newPassword") {
      if (!value.trim()) {
        newErrors.newPassword = "New password is required.";
      } else if (!passwordRegex.test(value)) {
        newErrors.newPassword =
          "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
      } else delete newErrors.newPassword;

      if (confirmPassword && confirmPassword !== value)
        newErrors.confirmPassword = "Passwords do not match.";
      else if (confirmPassword) delete newErrors.confirmPassword;
    }

    if (field === "confirmPassword") {
      if (!value.trim())
        newErrors.confirmPassword = "Please confirm your password.";
      else if (value !== newPassword)
        newErrors.confirmPassword = "Passwords do not match.";
      else delete newErrors.confirmPassword;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!oldPassword) newErrors.oldPassword = "Old password is required.";
    if (!newPassword)
      newErrors.newPassword = "New password is required.";
    else if (!passwordRegex.test(newPassword))
      newErrors.newPassword =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    else if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ Check old password correctness
    if (oldPassword !== currentPassword) {
      Swal.fire({
        title: "Incorrect Password",
        text: "Your old password is incorrect. Please try again.",
        icon: "error",
        confirmButtonColor: "#008000",
        color: "#fff",
        background: "#006600",
      });
      return;
    }

    // ✅ Success Alert
    Swal.fire({
      title: "Password Updated!",
      text: "Your password has been successfully changed.",
      icon: "success",
      confirmButtonColor: "#008000",
      color: "#fff",
      background: "#006600",
    });

    // Reset fields
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-50 py-4 px-4 overflow-y-auto">
      <div className="bg-white shadow-xl  p-8 w-full max-w-lg border border-gray-200">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-7xl text-green-700 mb-3" />
          <h2 className="text-2xl font-semibold text-gray-800">RINZIN DORJI</h2>
          <p className="text-green-700 text-sm mt-1 font-semibold">ADMIN</p>
        </div>

        <hr className="border-gray-300 my-5" />

        {/* Change Password Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
            Change Password
          </h3>

          {/* Old Password */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                validateFields("oldPassword", e.target.value);
              }}
              className={`w-full border ${
                errors.oldPassword ? "border-red-500" : "border-gray-300"
              }  p-2 focus:outline-none focus:ring-2 ${
                errors.oldPassword ? "focus:ring-red-500" : "focus:ring-green-600"
              }`}
              placeholder="Enter old password"
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.oldPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                validateFields("newPassword", e.target.value);
              }}
              className={`w-full border ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              }  p-2 focus:outline-none focus:ring-2 ${
                errors.newPassword
                  ? "focus:ring-red-500"
                  : "focus:ring-green-600"
              }`}
              placeholder="Enter new password"
            />
            {errors.newPassword ? (
              <p className="text-red-500 text-xs mt-1">
                {errors.newPassword}
              </p>
            ) : (
              newPassword && (
                <p className="text-green-600 text-xs mt-1">
                  ✅ Strong password!
                </p>
              )
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateFields("confirmPassword", e.target.value);
              }}
              className={`w-full border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }  p-2 focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "focus:ring-red-500"
                  : "focus:ring-green-600"
              }`}
              placeholder="Re-enter new password"
            />
            {errors.confirmPassword ? (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            ) : (
              confirmPassword &&
              confirmPassword === newPassword && (
                <p className="text-green-600 text-xs mt-1">
                  ✅ Passwords match!
                </p>
              )
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#006600] text-white py-2 hover:bg-[#004d00] transition duration-300"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
