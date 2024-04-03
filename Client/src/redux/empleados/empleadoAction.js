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
        position: "center",
        showConfirmButton: false,
        timer: 1500,
        width: "20em",
      });
    } catch (error) {
      alert(error.response.data.error);
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
      alert(error.response.data.error);
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
      alert(error.response.data.error);
    }
  };
};

export const putPassword = async (body) => {
  const URL_PUT_PASSWORD = `${URL_SERVER}/empleados/modificarClave`;

  try {
    const response = await axios.put(URL_PUT_PASSWORD, body);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const resetEmpleados = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};
