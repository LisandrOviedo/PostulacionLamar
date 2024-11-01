import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllParroquiasActivas = async (token, municipio_id) => {
  const URL_ALL_PARROQUIAS_ACTIVAS = `${URL_SERVER}/parroquias/activas/${municipio_id}`;

  try {
    const { data } = await axios(URL_ALL_PARROQUIAS_ACTIVAS, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};
