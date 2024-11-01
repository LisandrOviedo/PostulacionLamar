import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllDepartamentosActivos = async (token, empresa_id) => {
  const URL_ALL_DEPARTAMENTOS_ACTIVOS = `${URL_SERVER}/departamentos/activos/${empresa_id}`;

  try {
    const { data } = await axios(URL_ALL_DEPARTAMENTOS_ACTIVOS, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};
