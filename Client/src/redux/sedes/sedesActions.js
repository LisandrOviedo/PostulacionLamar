import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllSedesActivas = async (empresa_id) => {
  const URL_ALL_SEDES_ACTIVAS = `${URL_SERVER}/sedes/activas/${empresa_id}`;

  try {
    const { data } = await axios(URL_ALL_SEDES_ACTIVAS);

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};
