import axios from "axios";

import Swal from "sweetalert2";

import { allEtniasActivas, resetState } from "./etniasSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllEtniasActivas = (token) => {
  const URL_ALL_ETNIAS_ACTIVAS = `${URL_SERVER}/etnias/activas`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_ETNIAS_ACTIVAS, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allEtniasActivas(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetEtnias = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
