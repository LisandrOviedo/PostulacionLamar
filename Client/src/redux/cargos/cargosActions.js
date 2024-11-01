import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllCargosActivos = async (token, departamento_id) => {
  const URL_ALL_CARGOS_ACTIVOS = `${URL_SERVER}/cargos/activos/${departamento_id}`;

  try {
    const { data } = await axios(URL_ALL_CARGOS_ACTIVOS, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};
