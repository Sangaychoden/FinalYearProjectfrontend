import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: reset password

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const inputRefs = useRef([]);

  // 🔹 Styles
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
    textAlign: "left",
  };

  const inputStyle = {
    padding: "8px 12px",
    borderRadius: "0",
    border: "1px solid #9E9E9E",
    fontSize: "14px",
    textAlign: "left",
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

  const buttonHover = (e, hover) => {
    e.target.style.backgroundColor = hover ? "#004d00" : "#006600";
  };

  // 🔹 Validation functions
  const validateEmail = (value) => {
    const newErrors = { ...errors };
    if (!value.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(value))
      newErrors.email = "Please enter a valid email address.";
    else delete newErrors.email;
    setErrors(newErrors);
    return !newErrors.email;
  };

  const validatePasswords = () => {
    const newErrors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!newPassword.trim())
      newErrors.newPassword = "New password cannot be empty.";
    else if (!passwordRegex.test(newPassword))
      newErrors.newPassword =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";

    if (!confirmPassword.trim())
      newErrors.confirmPassword = "Please confirm your new password.";
    else if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Step 1 — Email submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      Swal.fire({
        title: "OTP Sent!",
        html: `<p style="color:#d3ffd3; font-size:16px;">An OTP has been sent to your email. Please check your inbox.</p>`,
        icon: "success",
        confirmButtonColor: "#008000",
        color: "#fff",
        background: "#006600",
      }).then(() => setStep(2));
    }
  };

  // 🔹 Step 2 — OTP Handling
  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // Only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

const handleOtpSubmit = (e) => {
  e.preventDefault();
  const correctOtp = ["1", "2", "3", "4", "5", "6"]; // Dummy OTP

  if (otp.join("") === correctOtp.join("")) {
    Swal.fire({
      title: "OTP Verified!",
      html: `<p style="color:#d3ffd3; font-size:16px;">You can now reset your password.</p>`,
      icon: "success",
      confirmButtonColor: "#008000",
      color: "#fff",
      background: "#006600",
    }).then(() => setStep(3));
  } else {
    Swal.fire({
      title: "Invalid OTP",
      html: `<p style="font-size:16px;">The OTP you entered is incorrect.</p>`,
      icon: "error",
      confirmButtonColor: "#d33",
      color: "#fff",
      background: "#006600",
    }).then(() => {
      // Clear OTP inputs after clicking OK
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0].focus(); // focus first input
    });
  }
};

  const handleResendOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0].focus();
    Swal.fire({
      title: "OTP Sent!",
      html: `<p style="color:#d3ffd3; font-size:16px;">A new OTP has been sent to your email. Use it within 5 minutes.</p>`,
      icon: "success",
      confirmButtonColor: "#008000",
      color: "#fff",
      background: "#006600",
    });
  };

  // 🔹 Live Password Validation
  const handleNewPasswordChange = (value) => {
    setNewPassword(value);
    const newErrors = { ...errors };
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!value.trim()) newErrors.newPassword = "New password cannot be empty.";
    else if (!passwordRegex.test(value))
      newErrors.newPassword =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    else delete newErrors.newPassword;

    if (confirmPassword && value !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    else if (confirmPassword) delete newErrors.confirmPassword;

    setErrors(newErrors);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    const newErrors = { ...errors };
    if (!value.trim()) newErrors.confirmPassword = "Please confirm your new password.";
    else if (newPassword !== value) newErrors.confirmPassword = "Passwords do not match.";
    else delete newErrors.confirmPassword;

    setErrors(newErrors);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      Swal.fire({
        title: "Password Reset!",
        html: `<p style="color:#d3ffd3; font-size:16px;">Your password has been updated successfully.</p>`,
        icon: "success",
        confirmButtonColor: "#008000",
        color: "#fff",
        background: "#006600",
      }).then(() => navigate("/"));
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <img src="/images/logologo.png" alt="Logo" style={logoStyle} />

        {/* Step 1: Email */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} noValidate>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                style={inputStyle}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
              />
              {errors.email && <p style={errorStyle}>{errors.email}</p>}
            </div>
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(e) => buttonHover(e, true)}
              onMouseLeave={(e) => buttonHover(e, false)}
            >
              Send
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit} noValidate>
            <div style={{ ...formGroupStyle, textAlign: "center" }}>
              <label style={labelStyle}>Enter OTP</label>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    style={{ ...inputStyle, width: "40px", textAlign: "center" }}
                  />
                ))}
              </div>
              <p style={{ fontSize: "12px", marginTop: "8px", color: "#555" }}>
                OTP valid for 5 minutes. Didn’t receive?<br />
                <span
                  style={{ color: "#006600", cursor: "pointer", fontWeight: 600 }}
                  onClick={handleResendOtp}
                >
                  Send again
                </span>
              </p>
            </div>
            <button
              type="submit"
              style={{
                ...buttonStyle,
                backgroundColor: otp.every((d) => d !== "") ? "#006600" : "#999",
                cursor: otp.every((d) => d !== "") ? "pointer" : "not-allowed",
              }}
              onMouseEnter={(e) => otp.every((d) => d !== "") && buttonHover(e, true)}
              onMouseLeave={(e) => otp.every((d) => d !== "") && buttonHover(e, false)}
              disabled={!otp.every((d) => d !== "")}
            >
              Verify
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={handleResetSubmit} noValidate>
            <div style={formGroupStyle}>
              <label style={labelStyle}>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                style={inputStyle}
                value={newPassword}
                onChange={(e) => handleNewPasswordChange(e.target.value)}
                autoComplete="new-password"
              />
              {errors.newPassword && <p style={errorStyle}>{errors.newPassword}</p>}
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                style={inputStyle}
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                autoComplete="new-password"
              />
              {errors.confirmPassword && <p style={errorStyle}>{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(e) => buttonHover(e, true)}
              onMouseLeave={(e) => buttonHover(e, false)}
            >
              Reset
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
