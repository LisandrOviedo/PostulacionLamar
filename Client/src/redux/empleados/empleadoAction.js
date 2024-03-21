import axios from "axios";

import { login, cargoActual } from "./empleadoSlice";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getLogin = (cedula) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `${URL_SERVER}/empleados/login?cedula=${cedula}`
      );

      return dispatch(login(data));
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

      return dispatch(cargoActual(data));
    } catch (error) {
      console.error(error);
    }
  };
};
