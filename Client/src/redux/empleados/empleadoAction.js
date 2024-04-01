import axios from "axios";

import { empleado, cargoActual } from "./empleadoSlice";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getEmpleado = (empleado_id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `${URL_SERVER}/empleados/detalle/${empleado_id}`
      );

      return dispatch(empleado(data));
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
