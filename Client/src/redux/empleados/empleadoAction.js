import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

import {
  allEmpleados,
  empleadoLogin,
  empleadoDetail,
  allDocumentos,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
} from "./empleadoSlice";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getLogin = (cedula, clave) => {
  const URL_LOGIN = `${URL_SERVER}/empleados/login?cedula=${cedula}&clave=${clave}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_LOGIN);

      dispatch(empleadoLogin(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const getEmpleadoDetail = (empleado_id) => {
  const URL_EMPLEADO_DETAIL = `${URL_SERVER}/empleados/detalle/${empleado_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_EMPLEADO_DETAIL);

      return dispatch(empleadoDetail(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const putPassword = async (body) => {
  const URL_PUT_PASSWORD = `${URL_SERVER}/empleados/modificarClave`;

  try {
    await axios.put(URL_PUT_PASSWORD, body);

    return Swal.fire({
      text: "Su contraseña ha sido actualizada exitosamente",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const putPasswordTemporal = async (body) => {
  const URL_PUT_PASSWORD_TEMPORAL = `${URL_SERVER}/empleados/modificarClaveTemporal`;

  try {
    await axios.put(URL_PUT_PASSWORD_TEMPORAL, body);

    return Swal.fire({
      text: "Su contraseña ha sido actualizada exitosamente, proceda a loguearse para continuar",
      icon: "success",
    });
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const resetPassword = async (empleado_id) => {
  const URL_RESET_PASSWORD = `${URL_SERVER}/empleados/reiniciarClave`;

  try {
    await axios.put(URL_RESET_PASSWORD, { empleado_id });

    return Swal.fire({
      text: `Su contraseña ha sido reiniciada exitosamente a "1234"`,
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

export const resetEmpleados = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const postDocumentos = async (formData) => {
  const URL_POST_DOCUMENTOS = `${URL_SERVER}/documentos_empleados`;

  try {
    await axios.post(URL_POST_DOCUMENTOS, formData);

    await Swal.fire({
      text: "Documentos actualizados correctamente",
      icon: "success",
    });

    window.location.reload();
    window.scroll(0, 0);
    return;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const getDocumentos = (empleado_id) => {
  const URL_GET_DOCUMENTOS = `${URL_SERVER}/documentos_empleados/detalle/${empleado_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios.get(URL_GET_DOCUMENTOS);

      return dispatch(allDocumentos(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const putFotoEmpleado = (formData) => {
  const URL_PUT_FOTOEMPLEADO = `${URL_SERVER}/empleados/modificarFoto`;

  return async (dispatch) => {
    try {
      const { data } = await axios.put(URL_PUT_FOTOEMPLEADO, formData);

      dispatch(empleadoLogin(data));

      return Swal.fire({
        text: "¡Cambios guardados exitosamente!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        width: "20em",
      });
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const putActivo = async (empleado_id) => {
  const URL_PUT_ACTIVO = `${URL_SERVER}/empleados/inactivar`;

  try {
    await axios.put(URL_PUT_ACTIVO, { empleado_id });

    return Swal.fire({
      text: "¡Empleado actualizado exitosamente!",
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

export const getAllEmpleados = (filtros, paginaActual, limitePorPagina) => {
  const URL_ALL_EMPLEADOS = `${URL_SERVER}/empleados/allEmpleados`;

  return async (dispatch) => {
    try {
      const { data } = await axios.post(URL_ALL_EMPLEADOS, {
        filtros,
        paginaActual,
        limitePorPagina,
      });

      return dispatch(allEmpleados(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
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
