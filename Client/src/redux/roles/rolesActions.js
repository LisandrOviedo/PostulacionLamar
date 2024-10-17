import axios from "axios";

import { alertError } from "../../utils/sweetAlert2";

import Swal from "sweetalert2";

import { allRoles, resetState } from "./rolesSlices";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllRoles = (token) => {
  const URL_ALL_ROLES = `${URL_SERVER}/roles`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_ALL_ROLES, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allRoles(data));
    } catch (error) {
      alertError(error);
      throw new Error();
    }
  };
};

export const putRolEmpleado = async (token, rol_id, empleado_id) => {
  const URL_CAMBIAR_ROL_EMPLEADO = `${URL_SERVER}/roles/cambiarRolEmpleado`;

  try {
    await axios.put(
      URL_CAMBIAR_ROL_EMPLEADO,
      { rol_id: rol_id, empleado_id: empleado_id },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return Swal.fire({
      text: "¡Rol cambiado exitosamente!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    alertError(error);
    throw new Error();
  }
};

export const resetRoles = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
