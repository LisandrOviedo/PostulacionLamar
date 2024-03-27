import axios from "axios";

import { allAreasInteresActivas } from "./areainteresSlice";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllAreasInteresActivas = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_SERVER}/areasinteres/activas`);

      return dispatch(allAreasInteresActivas(data));
    } catch (error) {
      console.error(error);
    }
  };
};
