import axios from "axios";

import { alertError } from "../../utils/sweetAlert2";

import { allRoles, resetState } from "./rolesSlices";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllRoles = (token) => {
  const URL_ALL_ROLES = `${URL_SERVER}/roles`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_ROLES, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allRoles(data));
    } catch (error) {
      alertError(error);
      throw new Error();
    }
  };
};

export const resetRoles = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
