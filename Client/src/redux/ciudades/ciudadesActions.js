import axios from "axios";

import Swal from "sweetalert2";

import { allCiudadesActivas, resetState } from "./ciudadesSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllCiudadesActivas = (token, estado_id) => {
  const URL_ALL_CIUDADES_ACTIVAS = `${URL_SERVER}/ciudades/activas/${estado_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_CIUDADES_ACTIVAS, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allCiudadesActivas(data));
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
