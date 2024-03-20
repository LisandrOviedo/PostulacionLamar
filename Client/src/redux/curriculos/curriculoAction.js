import axios from "axios";

import { allCurriculos } from "./curriculoSlice";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllCurriculos = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_SERVER}/curriculos`);

      return dispatch(allCurriculos(data));
    } catch (error) {
      console.error(error);
    }
  };
};
