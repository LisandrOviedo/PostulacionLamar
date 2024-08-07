import axios from "axios";

import Swal from "sweetalert2";

import { allDepartamentosActivos, resetState } from "./departamentosSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllDepartamentosActivos = (token, empresa_id) => {
  const URL_ALL_DEPARTAMENTOS_ACTIVOS = `${URL_SERVER}/departamentos/activos/${empresa_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_DEPARTAMENTOS_ACTIVOS, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allDepartamentosActivos(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetDepartamentos = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
