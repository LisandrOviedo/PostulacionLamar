import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

import {
  token,
  allEmpleados,
  empleadoLogin,
  empleadoDetail,
  empleadoExiste,
  allDocumentos,
  paginaActual,
  limitePorPagina,
  filtros,
  resetEmpleadoExiste,
  resetFilters,
  resetState,
} from "./empleadosSlices";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getLogin = (tipo_identificacion, numero_identificacion, clave) => {
  const URL_LOGIN = `${URL_SERVER}/empleados/login?tipo_identificacion=${tipo_identificacion}&numero_identificacion=${numero_identificacion}&clave=${clave}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_LOGIN);

      if (data.token && data.infoEmpleado) {
        dispatch(token(data.token));
        dispatch(empleadoLogin(data.infoEmpleado));
        return;
      }

      dispatch(empleadoLogin(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const getEmpleadoDetail = (token, empleado_id) => {
  const URL_EMPLEADO_DETAIL = `${URL_SERVER}/empleados/detalle/${empleado_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_EMPLEADO_DETAIL, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(empleadoDetail(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const getEmpleadoExistencia = (
  token,
  tipo_identificacion,
  numero_identificacion
) => {
  const URL_EMPLEADO_EXISTENCIA = `${URL_SERVER}/empleados/empleadoExistencia?tipo_identificacion=${tipo_identificacion}&numero_identificacion=${numero_identificacion}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_EMPLEADO_EXISTENCIA, {
        headers: { authorization: `Bearer ${token}` },
      });

      if (data?.empleado_id) {
        dispatch(empleadoExiste(data));
      } else {
        dispatch(resetEmpleadoExiste());
      }
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetEmpleadoExistencia = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetEmpleadoExiste());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const putPassword = async (token, body) => {
  const URL_PUT_PASSWORD = `${URL_SERVER}/empleados/modificarClave`;

  try {
    await axios.put(URL_PUT_PASSWORD, body, {
      headers: { authorization: `Bearer ${token}` },
    });

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

export const resetPassword = async (token, empleado_id) => {
  const URL_RESET_PASSWORD = `${URL_SERVER}/empleados/reiniciarClave`;

  try {
    await axios.put(
      URL_RESET_PASSWORD,
      { empleado_id },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    await putCerrarSesion(token, empleado_id);

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

export const postDocumentos = async (token, formData) => {
  const URL_POST_DOCUMENTOS = `${URL_SERVER}/documentos_empleados`;

  try {
    await axios.post(URL_POST_DOCUMENTOS, formData, {
      headers: { authorization: `Bearer ${token}` },
    });

    await Swal.fire({
      text: "Documentos actualizados correctamente",
      icon: "success",
    });

    window.scroll(0, 0);
    window.location.reload();
    return;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const getDocumentos = (token, empleado_id) => {
  const URL_GET_DOCUMENTOS = `${URL_SERVER}/documentos_empleados/detalle/${empleado_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_GET_DOCUMENTOS, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(allDocumentos(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const putFotoEmpleado = (token, formData) => {
  const URL_PUT_FOTOEMPLEADO = `${URL_SERVER}/empleados/modificarFoto`;

  return async (dispatch) => {
    try {
      const { data } = await axios.put(URL_PUT_FOTOEMPLEADO, formData, {
        headers: { authorization: `Bearer ${token}` },
      });

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

export const putActivo = async (token, empleado_id) => {
  const URL_PUT_ACTIVO = `${URL_SERVER}/empleados/inactivar`;

  try {
    await axios.put(
      URL_PUT_ACTIVO,
      { empleado_id },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    await putCerrarSesion(token, empleado_id);

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

const putCerrarSesion = async (token, empleado_id) => {
  const URL_CERRAR_SESION = `${URL_SERVER}/sesiones/inactivar`;

  try {
    await axios.put(
      URL_CERRAR_SESION,
      { empleado_id },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const getAllEmpleados = (
  token,
  filtros,
  paginaActual,
  limitePorPagina
) => {
  const URL_ALL_EMPLEADOS = `${URL_SERVER}/empleados/allEmpleados`;

  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        URL_ALL_EMPLEADOS,
        {
          filtros,
          paginaActual,
          limitePorPagina,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

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

export const putEmpleado = (token, datosPersonales) => {
  const URL_PUT_EMPLEADO = `${URL_SERVER}/empleados/modificar`;

  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        URL_PUT_EMPLEADO,
        { datosPersonales },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      dispatch(empleadoLogin(data));

      await Swal.fire({
        text: `Sus datos han sido actualizados exitosamente`,
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
        width: "20em",
      });

      window.location.reload();
      return;
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
