import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllIdiomasActivos = async (token) => {
  const URL_ALL_IDIOMAS_ACTIVOS = `${URL_SERVER}/idiomas/activos`;

  try {
    const { data } = await axios(URL_ALL_IDIOMAS_ACTIVOS, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};
