import axios from "axios";

import Swal from "sweetalert2";

import { allCargosNivelesActivos, resetState } from "./cargosNivelesSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllCargosNivelesActivos = (token, cargo_id) => {
  const URL_ALL_CARGOS_NIVELES_ACTIVOS = `${URL_SERVER}/cargos_niveles/activos/${cargo_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_CARGOS_NIVELES_ACTIVOS, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allCargosNivelesActivos(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetCargosNiveles = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
