import axios from "axios";

import Swal from "sweetalert2";

import { allAreasInteresActivas, resetState } from "./areasInteresSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllAreasInteresActivas = (token) => {
  const URL_ALL_AREAS_ACTIVAS = `${URL_SERVER}/areas_interes/activas`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_AREAS_ACTIVAS, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allAreasInteresActivas(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetAreasInteres = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
