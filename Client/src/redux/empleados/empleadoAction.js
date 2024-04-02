import axios from "axios";

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

      return dispatch(createEmpleado(data));
    } catch (error) {
      console.error(error);
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
      console.error(error);
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
      console.error(error);
    }
  };
};
