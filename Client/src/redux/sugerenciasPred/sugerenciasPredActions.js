import axios from "axios";

import Swal from "sweetalert2";

import {
  allSugerenciasPredActivas,
  resetStateSugerenciasPredActivas,
  resetState,
} from "./sugerenciasPredSlices.js";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllSugerenciasPredActivas = (tipo_sugerencia_id) => {
  const URL_ALL_SUGERENCIAS_PRED_ACTIVAS = `${URL_SERVER}/sugerencias_pred/activas/${tipo_sugerencia_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_SUGERENCIAS_PRED_ACTIVAS);

      return dispatch(allSugerenciasPredActivas(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetSugerenciasPredActivas = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetStateSugerenciasPredActivas());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetSedes = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
