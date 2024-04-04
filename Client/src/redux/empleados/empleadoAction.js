import axios from "axios";
import Swal from "sweetalert2";

import {
  allEmpleados,
  createEmpleado,
  empleadoByID,
  cargoActualEmpleado,
  resetState,
} from "./empleadoSlice";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getLogin = (cedula, clave) => {
  const URL_LOGIN = `${URL_SERVER}/empleados/login?cedula=${cedula}&clave=${clave}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_LOGIN);

      dispatch(createEmpleado(data));

      return Swal.fire({
        title: "¡Bienvenido!",
        text: "Sesión iniciada correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        width: "20em",
      });
    } catch (error) {
      throw new Error(
        Swal.fire({
          title: "Oops...",
          text: `${error.response.data.error}`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        })
      );
    }
  };
};

export const getEmpleadoByID = (empleado_id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `${URL_SERVER}/empleados/detalle/${empleado_id}`
      );

      return dispatch(empleadoByID(data));
    } catch (error) {
      throw new Error(
        Swal.fire({
          title: "Oops...",
          text: `${error.response.data.error}`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        })
      );
    }
  };
};

export const getCargoActual = (empleado_id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `${URL_SERVER}/empleados/cargoActual/${empleado_id}`
      );

      return dispatch(cargoActualEmpleado(data));
    } catch (error) {
      throw new Error(
        Swal.fire({
          title: "Oops...",
          text: `${error.response.data.error}`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        })
      );
    }
  };
};

export const putPassword = async (body) => {
  const URL_PUT_PASSWORD = `${URL_SERVER}/empleados/modificarClave`;

  try {
    await axios.put(URL_PUT_PASSWORD, body);

    return Swal.fire({
      text: "Su contraseña ha sido actualizada exitosamente, proceda a loguearse para continuar",
      icon: "success",
    });
  } catch (error) {
    throw new Error(
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      })
    );
  }
};

export const resetEmpleados = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      throw new Error(
        Swal.fire({
          title: "Oops...",
          text: `${error.response.data.error}`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        })
      );
    }
  };
};
