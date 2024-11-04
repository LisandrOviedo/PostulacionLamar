import axios from "axios";

import { alertError } from "../../utils/sweetAlert2";

import Swal from "sweetalert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllRolesFiltrados = async (
  token,
  filtros,
  paginaActual,
  limitePorPagina
) => {
  const URL_ALL_ROLES_FILTRADOS = `${URL_SERVER}/roles/allRoles`;

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

    return data;
  } catch (error) {
    alertError(error);
    throw new Error();
  }
};

export const getAllRoles = async (token) => {
  const URL_ALL_ROLES = `${URL_SERVER}/roles`;

  try {
    const { data } = await axios(URL_ALL_ROLES, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);
    throw new Error();
  }
};

export const getRol = async (token, rol_id) => {
  const URL_DETALLES_ROL = `${URL_SERVER}/roles/detalle/${rol_id}`;

  try {
    const { data } = await axios(URL_DETALLES_ROL, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);
    throw new Error();
  }
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

export const putModificarRol = async (token, rol_id, nombre, descripcion) => {
  const URL_CAMBIAR_ROL = `${URL_SERVER}/roles/modificar`;

  try {
    await axios.put(
      URL_CAMBIAR_ROL,
      { rol_id, nombre, descripcion },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return Swal.fire({
      text: "¡Rol modificado exitosamente!",
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    alertError(error);
    throw new Error();
  }
};

export const postCrearRol = async (token, nuevoRol) => {
  const URL_CREAR_ROL = `${URL_SERVER}/roles`;

  const { nombre, descripcion, acceso_admin } = nuevoRol;

  try {
    await axios.post(
      URL_CREAR_ROL,
      { nombre, descripcion, acceso_admin }, // Enviar nombre y descripción en el cuerpo
      {
        headers: { authorization: `Bearer ${token}` }, // Encabezados en el lugar correcto
      }
    );

    // Mostrar el mensaje de éxito
    return Swal.fire({
      text: "¡Rol creado exitosamente!",
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    alertError(error);
    throw new Error();
  }
};

export const putActivo = async (token, rol_id) => {
  const URL_PUT_ACTIVO = `${URL_SERVER}/roles/inactivar`;

  try {
    await axios.put(
      URL_PUT_ACTIVO,
      { rol_id },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return Swal.fire({
      text: "¡Rol actualizado exitosamente!",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
      width: "20em",
    });
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};
