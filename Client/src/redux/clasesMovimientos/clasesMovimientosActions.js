import axios from "axios";

import Swal from "sweetalert2";

import {
  allClasesMovimientosActivas,
  resetState,
} from "./clasesMovimientosSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllClasesMovimientosActivas = (token) => {
  const URL_ALL_CLASES_MOVIMIENTOS_ACTIVAS = `${URL_SERVER}/clases_movimientos/activas`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_CLASES_MOVIMIENTOS_ACTIVAS, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allClasesMovimientosActivas(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetAreasInteres = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
