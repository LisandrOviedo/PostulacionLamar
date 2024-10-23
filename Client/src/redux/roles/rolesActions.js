import axios from "axios";

import { alertError } from "../../utils/sweetAlert2";

import Swal from "sweetalert2";

import {
  allRoles,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
  Rol
} from "./rolesSlices";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllRolesFiltrados = (
  token,
  filtros,
  paginaActual,
  limitePorPagina
) => {
  const URL_ALL_ROLES_FILTRADOS = `${URL_SERVER}/roles/allRoles`;

  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        URL_ALL_ROLES_FILTRADOS,
        {
          filtros,
          paginaActual,
          limitePorPagina,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      return dispatch(allRoles(data));
    } catch (error) {
      alertError(error);
      throw new Error();
    }
  };
};

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

export const getRol = (token) => {
  const URL_DETALLES = `${URL_SERVER}/roles/detalle`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_DETALLES, {
       
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(Rol(data));
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

export const postPaginaActual = (pagina_actual) => {
  return async (dispatch) => {
    try {
      return dispatch(paginaActual(pagina_actual));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const postLimitePorPagina = (limite_pagina) => {
  return async (dispatch) => {
    try {
      return dispatch(limitePorPagina(limite_pagina));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const postFiltros = (filters) => {
  return async (dispatch) => {
    try {
      return dispatch(filtros(filters));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const deleteFiltros = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetFilters());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
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

export const postCrearRol = async (token, nuevoRol) => {
  const URL_CREAR_ROL = `${URL_SERVER}/roles`;

  try {
    const { nombre, descripcion } = nuevoRol;

    const { data } = await axios.post(
      URL_CREAR_ROL,
      { nombre, descripcion }, // Enviar nombre y descripción en el cuerpo
      {
        headers: { authorization: `Bearer ${token}` }, // Encabezados en el lugar correcto
      }
    );

    // Mostrar el mensaje de éxito
    await Swal.fire({
      text: "¡Rol creado exitosamente!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });

    return data; // Retornar los datos del rol creado
  } catch (error) {
    alertError(error);
    throw new Error(error.response?.data?.error || "Error al crear el rol"); // Mejorar el manejo de errores
  }
};
