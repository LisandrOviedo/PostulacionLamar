import axios from "axios";

import Swal from "sweetalert2";

import { allEstadosActivos, resetState } from "./estadosSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllEstadosActivos = (token, pais) => {
  const URL_ALL_ESTADOS_ACTIVOS = `${URL_SERVER}/estados/activos/${pais}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_ESTADOS_ACTIVOS, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allEstadosActivos(data));
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
