// src/utils/sweetAlert.js
import Swal from "sweetalert2";

export const setAlert = async ({
  title,
  text,
  icon = "info",
  showCancelButton = false, // default false for single OK
  confirmButtonText = "OK",
  cancelButtonText = "No",
}) => {
  const result = await Swal.fire({
    title,
    html: `<p style="color:#d3ffd3; font-size:16px;">${text}</p>`,
    icon,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
    color: "#fff",
    confirmButtonColor: "#008000",
    cancelButtonColor: "#d33",
    background: "#006600",
  });

  return result.isConfirmed;
};
