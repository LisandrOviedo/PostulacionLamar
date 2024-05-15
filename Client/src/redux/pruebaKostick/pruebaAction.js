import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

import { prueba, resetState } from "./pruebaSlice";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getPrueba = (token) => {
  const URL_PRUEBA = `${URL_SERVER}/respuestas`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_PRUEBA, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(prueba(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetPrueba = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
