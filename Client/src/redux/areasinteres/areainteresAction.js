import axios from "axios";
import Swal from "sweetalert2";

import { allAreasInteresActivas } from "./areainteresSlice";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllAreasInteresActivas = () => {
  const URL_ALL_AREAS_ACTIVAS = `${URL_SERVER}/areasinteres/activas`;

  return async (dispatch) => {
    try {
      const { data } = await axios.get(URL_ALL_AREAS_ACTIVAS);

      return dispatch(allAreasInteresActivas(data));
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error();
    }
  };
};
