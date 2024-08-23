import axios from "axios";

import Swal from "sweetalert2";

import { allEmpresasActivas, resetState } from "./empresasSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllEmpresasActivas = () => {
  const URL_ALL_EMPRESAS_ACTIVAS = `${URL_SERVER}/empresas/activas`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_EMPRESAS_ACTIVAS);

      return dispatch(allEmpresasActivas(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetEmpresas = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
