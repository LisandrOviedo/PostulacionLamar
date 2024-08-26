import Swal from "sweetalert2";

import { store } from "../redux/store";

import { resetAreasInteres } from "../redux/areasInteres/areasInteresActions";
import { resetCurriculos } from "../redux/curriculos/curriculosActions";
import { resetEmpleados } from "../redux/empleados/empleadosActions";
import { resetIdiomas } from "../redux/idiomas/idiomasActions";
import { resetPruebas } from "../redux/pruebasEmpleados/pruebasEmpleadosActions";

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
        store.dispatch(resetAreasInteres());
        store.dispatch(resetCurriculos());
        store.dispatch(resetIdiomas());
        store.dispatch(resetPruebas());
        store.dispatch(resetEmpleados());
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
