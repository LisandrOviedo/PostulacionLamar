import axios from "axios";

import Swal from "sweetalert2";

import { allCargosActivos, resetState } from "./cargosSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllCargosActivos = (token) => {
  const URL_ALL_EMPRESAS = `${URL_SERVER}/cargos/activos`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_EMPRESAS, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allCargosActivos(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetCargos = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
