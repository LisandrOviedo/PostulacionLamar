import axios from "axios";

import { allAreasInteres } from "./areainteresSlice";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllAreasInteres = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_SERVER}/areasinteres`);

      return dispatch(allAreasInteres(data));
    } catch (error) {
      console.error(error);
    }
  };
};
