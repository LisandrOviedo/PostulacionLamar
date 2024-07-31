import axios from "axios";

import Swal from "sweetalert2";

import { allMunicipiosActivos, resetState } from "./municipiosSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllMunicipiosActivos = (token, estado_id) => {
  const URL_ALL_MUNICIPIOS_ACTIVOS = `${URL_SERVER}/municipios/activos/${estado_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_MUNICIPIOS_ACTIVOS, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allMunicipiosActivos(data));
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
