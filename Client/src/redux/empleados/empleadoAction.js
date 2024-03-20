import axios from "axios";

import { login } from "./empleadoSlice";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getLogin = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL_SERVER}/empleados/login`, body);

      return dispatch(login(data));
    } catch (error) {
      console.error(error);
    }
  };
};
