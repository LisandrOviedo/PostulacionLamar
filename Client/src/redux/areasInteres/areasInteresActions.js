import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllAreasInteresActivas = async (token) => {
  const URL_ALL_AREAS_ACTIVAS = `${URL_SERVER}/areas_interes/activas`;

  try {
    const { data } = await axios(URL_ALL_AREAS_ACTIVAS, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};
