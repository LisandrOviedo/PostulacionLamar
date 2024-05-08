import Swal from "sweetalert2";

export const alertError = (error) => {
  Swal.fire({
    title: "Oops...",
    text: `${error.response.data.error}`,
    icon: "error",
    showConfirmButton: false,
    timer: 2000,
  });
};
