import axios from "axios";

import Swal from "sweetalert2";

import { allPaisesActivos, resetState } from "./paisesSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllPaisesActivos = (token) => {
  const URL_ALL_PAISES_ACTIVOS = `${URL_SERVER}/paises/activos`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_PAISES_ACTIVOS, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allPaisesActivos(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetPaises = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
