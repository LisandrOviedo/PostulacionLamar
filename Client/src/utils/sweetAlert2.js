import Swal from "sweetalert2";

export const alertError = (error) => {
  if (error.response.status === 403) {
    Swal.fire({
      title: "Oops...",
      text: "Tu sesión ha expirado o has ingresado desde otro dispositivo",
      icon: "error",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      }
    });
  } else if (error.response.status === 404) {
    Swal.fire({
      title: "Oops...",
      text: "Error 404 - No encontrado",
      icon: "error",
      showConfirmButton: false,
      timer: 3000,
    });
  } else {
    Swal.fire({
      title: "Oops...",
      text: `${error.response.data.error}`,
      icon: "error",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};
