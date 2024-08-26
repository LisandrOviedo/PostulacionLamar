import axios from "axios";

import Swal from "sweetalert2";

import {
  allSedesActivas,
  resetStateSedesActivas,
  resetState,
} from "./sedesSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllSedesActivas = (empresa_id) => {
  const URL_ALL_SEDES_ACTIVAS = `${URL_SERVER}/sedes/activas/${empresa_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_SEDES_ACTIVAS);

      return dispatch(allSedesActivas(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetSedesActivas = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetStateSedesActivas());
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
