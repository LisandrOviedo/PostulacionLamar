import axios from "axios";

import Swal from "sweetalert2";

import {
  allTiposSugerenciasActivas,
  resetStateTiposSugerenciasActivas,
  resetState,
} from "./tiposSugerenciasSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllTiposSugerenciasActivas = () => {
  const URL_ALL_TIPOS_SUGERENCIAS_ACTIVAS = `${URL_SERVER}/tipos_sugerencias/activas`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_TIPOS_SUGERENCIAS_ACTIVAS);

      return dispatch(allTiposSugerenciasActivas(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetTiposSugerenciasActivas = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetStateTiposSugerenciasActivas());
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
