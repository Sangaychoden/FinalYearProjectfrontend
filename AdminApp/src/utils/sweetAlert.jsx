// src/utils/sweetAlert.js
import Swal from "sweetalert2";

export const setAlert = async ({
  title,
  text,
  icon = "info",
  showCancelButton = false,
  confirmButtonText = "OK",
  cancelButtonText = "No",
}) => {
  const result = await Swal.fire({
    title,
    html: `<p style="color:#d3ffd3; font-size:16px;">${text}</p>`,
    icon,
    showCancelButton,
    confirmButtonColor: "#008000",
    cancelButtonColor: "#d33",
    confirmButtonText,
    cancelButtonText,
    color: "#fff",
    background: "#006600",

    customClass: {
      popup: "no-radius-popup",
      confirmButton: "no-radius-btn",
      cancelButton: "no-radius-btn",
    },
  });

  return result.isConfirmed;
};
