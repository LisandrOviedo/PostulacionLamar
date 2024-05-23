import Swal from "sweetalert2";

export const alertError = async (error) => {
  if (error.response.status === 403) {
    await Swal.fire({
      title: "Oops...",
      text: "Debes iniciar sesión nuevamente",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });

    window.location.href = "/";
  } else if (error.response.status === 404) {
    Swal.fire({
      title: "Oops...",
      text: "Error 404 - No encontrado",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    Swal.fire({
      title: "Oops...",
      text: `${error.response.data.error}`,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};
