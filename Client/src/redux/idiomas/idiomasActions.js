import axios from "axios";

import Swal from "sweetalert2";

import { allIdiomasActivos, resetState } from "./idiomasSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllIdiomasActivos = (token) => {
  const URL_ALL_IDIOMAS_ACTIVOS = `${URL_SERVER}/idiomas/activos`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_IDIOMAS_ACTIVOS, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allIdiomasActivos(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetIdiomas = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
