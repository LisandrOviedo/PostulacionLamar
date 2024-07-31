import axios from "axios";

import Swal from "sweetalert2";

import {
  allEstadosNacimiento,
  allEstadosResidencia,
  resetStateEstadosNacimiento,
  resetStateEstadosResidencia,
  resetState,
} from "./estadosSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllEstadosNacimiento = (token, pais_id) => {
  const URL_ALL_ESTADOS_ACTIVOS = `${URL_SERVER}/estados/activos/${pais_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_ESTADOS_ACTIVOS, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allEstadosNacimiento(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const getAllEstadosResidencia = (token, pais_id) => {
  const URL_ALL_ESTADOS_ACTIVOS = `${URL_SERVER}/estados/activos/${pais_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_ESTADOS_ACTIVOS, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allEstadosResidencia(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetEstadosNacimiento = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetStateEstadosNacimiento());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetEstadosResidencia = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetStateEstadosResidencia());
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
