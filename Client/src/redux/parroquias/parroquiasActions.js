import axios from "axios";

import Swal from "sweetalert2";

import { allParroquiasActivas, resetState } from "./parroquiasSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllParroquiasActivas = (token, municipio_id) => {
  const URL_ALL_PARROQUIAS_ACTIVAS = `${URL_SERVER}/parroquias/activas/${municipio_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_PARROQUIAS_ACTIVAS, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allParroquiasActivas(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetEstados = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
