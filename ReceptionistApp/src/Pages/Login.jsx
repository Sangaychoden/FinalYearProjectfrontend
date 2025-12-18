import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// ✅ Use .env for base URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_URL = `${BASE_URL}/receptionist/login`; // ✅ Receptionist login endpoint

const ReceptionistLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
const [showPassword, setShowPassword] = useState(false);

  // ===========================
  // Inline Styles
  // ===========================
  const pageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  };

  const cardStyle = {
    background: "white",
    padding: "40px",
    borderRadius: "0",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "350px",
    textAlign: "center",
  };

  const logoStyle = {
    width: "180px",
    marginBottom: "25px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "18px",
    textAlign: "left",
  };

  const labelStyle = {
    marginBottom: "5px",
    color: "#333",
    fontSize: "14px",
    fontWeight: "500",
  };

const inputStyle = {
  padding: "8px 12px",
  borderRadius: "0",
  border: "1px solid #9E9E9E",
  fontSize: "14px",
  position: "relative",
  zIndex: 1, // 🔥 puts input below icon
};

  const errorStyle = {
    color: "red",
    fontSize: "12px",
    marginTop: "4px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "0",
    border: "none",
    backgroundColor: "#006600",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    marginBottom: "5px",
    transition: "background-color 0.2s ease",
  };
const passwordWrapper = {
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "center",
};

const eyeIconStyle = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  color: "#666",
  fontSize: "16px",
  zIndex: 3, // 🔥 must be higher than input
};

  const buttonHover = (e, hover) => {
    e.target.style.backgroundColor = hover ? "#000000" : "#006600";
  };

  // ===========================
  // Validation
  // ===========================
  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===========================
  // Handle Receptionist Login
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        credentials: "include", // important for cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Only allow receptionist login
      if (data.role !== "receptionist") {
        throw new Error("Only receptionists can log in here");
      }

      // ✅ Show success alert and navigate
await Swal.fire({
  title: "Success",
  html: `<div style="margin-bottom: 15px;">Receptionist logged in successfully!</div>`,
  icon: "success",
  background: "#006600",
  color: "white",
  timer: 2000,
  showConfirmButton: false,
  timerProgressBar: true,
});


      // ✅ Clear form and navigate
      setUsername("");
      setPassword("");
      navigate("/dashboard"); // ✅ receptionist dashboard route
    } catch (error) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // JSX Layout
  // ===========================
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <img src="/images/logologo.png" alt="Logo" style={logoStyle} />

        <form onSubmit={handleSubmit} noValidate>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              style={inputStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p style={errorStyle}>{errors.username}</p>}
          </div>

<div style={formGroupStyle}>
  <label style={labelStyle}>Password</label>

  <div style={passwordWrapper}>
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      style={{
        ...inputStyle,
        width: "100%",
        paddingRight: "42px", // space for eye icon
      }}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <span
      style={eyeIconStyle}
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>

  {errors.password && <p style={errorStyle}>{errors.password}</p>}
</div>


          {serverError && <p style={errorStyle}>{serverError}</p>}

          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={(e) => buttonHover(e, true)}
            onMouseLeave={(e) => buttonHover(e, false)}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReceptionistLogin;
