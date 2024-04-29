import axios from "axios";
import Swal from "sweetalert2";

import {
  allCurriculos,
  curriculoDetail,
  createCurriculo,
  curriculoEmpleado,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
} from "./curriculoSlice";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllCurriculos = (filtros, paginaActual, limitePorPagina) => {
  const URL_ALL_CURRICULOS = `${URL_SERVER}/curriculos/allCurriculos`;

  return async (dispatch) => {
    try {
      const { data } = await axios.post(URL_ALL_CURRICULOS, {
        filtros,
        paginaActual,
        limitePorPagina,
      });

      return dispatch(allCurriculos(data));
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error();
    }
  };
};

export const postPaginaActual = (pagina_actual) => {
  return async (dispatch) => {
    try {
      return dispatch(paginaActual(pagina_actual));
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error();
    }
  };
};

export const postLimitePorPagina = (limite_pagina) => {
  return async (dispatch) => {
    try {
      return dispatch(limitePorPagina(limite_pagina));
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error();
    }
  };
};

export const postFiltros = (filters) => {
  return async (dispatch) => {
    try {
      return dispatch(filtros(filters));
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error();
    }
  };
};

export const deleteFiltros = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetFilters());
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error();
    }
  };
};

export const getCurriculo = (empleado_id, cedula) => {
  // const URL_CURRICULO = `${URL_SERVER}/curriculos/detalleEmpleado/${empleado_id}`;
  const URL_CURRICULO = `${URL_SERVER}/curriculos/detalle/${empleado_id}`;

  return (dispatch) => {
    try {
      axios({
        url: URL_CURRICULO, // Cambia la URL según sea necesario
        method: "GET",
        responseType: "blob", // Especifica que la respuesta es un objeto Blob
      })
        .then((response) => {
          // Crear un enlace de descarga
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `Curriculo - ${cedula}.pdf`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error();
    }
  };
};

export const getCurriculoEmpleado = (empleado_id) => {
  const URL_CURRICULO_DETAIL = `${URL_SERVER}/curriculos/detalleEmpleado/${empleado_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios.get(URL_CURRICULO_DETAIL);

      return dispatch(curriculoEmpleado(data));
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error();
    }
  };
};

// POST CURRICULO

export const postCurriculo = (datosCurriculo) => {
  const URL_CREATE_CURRICULO = `${URL_SERVER}/curriculos`;

  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${URL_CREATE_CURRICULO}`,
        datosCurriculo
      );

      dispatch(createCurriculo(data));

      await postAreasInteres(data.curriculo_id, datosCurriculo.areas_interes);

      if (datosCurriculo.titulos_obtenidos) {
        await postTitulosObtenidos(
          data.curriculo_id,
          datosCurriculo.titulos_obtenidos
        );
      }

      if (datosCurriculo.experiencias) {
        await postExperiencias(data.curriculo_id, datosCurriculo.experiencias);
      }

      return Swal.fire({
        text: "¡Currículo enviado exitosamente!",
        icon: "success",
        showConfirmButton: false,
        timer: 4000,
      });
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error();
    }
  };
};

const postAreasInteres = async (curriculo_id, areas_interes) => {
  const URL_ADD_AREASINTERES = `${URL_SERVER}/areasinteres/agregarArea`;

  try {
    await axios.post(`${URL_ADD_AREASINTERES}`, {
      curriculo_id,
      areas_interes,
    });
  } catch (error) {
    Swal.fire({
      title: "Oops...",
      text: `${error.response.data.error}`,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw new Error();
  }
};

const postTitulosObtenidos = async (curriculo_id, titulos_obtenidos) => {
  const URL_ADD_TITULOSOBTENIDOS = `${URL_SERVER}/titulosobtenidos`;

  try {
    await axios.post(`${URL_ADD_TITULOSOBTENIDOS}`, {
      curriculo_id,
      titulos_obtenidos,
    });
  } catch (error) {
    Swal.fire({
      title: "Oops...",
      text: `${error.response.data.error}`,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw new Error();
  }
};

const postExperiencias = async (curriculo_id, experiencias) => {
  const URL_ADD_EXPERIENCIAS = `${URL_SERVER}/experiencias`;

  try {
    await axios.post(`${URL_ADD_EXPERIENCIAS}`, {
      curriculo_id,
      experiencias,
    });
  } catch (error) {
    Swal.fire({
      title: "Oops...",
      text: `${error.response.data.error}`,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw new Error();
  }
};

// FIN POST CURRICULO

export const resetCurriculos = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error();
    }
  };
};

// UPDATE CURRICULO

export const putCurriculo = (datosCurriculo) => {
  const URL_PUT_CURRICULO = `${URL_SERVER}/curriculos/modificar`;

  return async () => {
    try {
      const { data } = await axios.put(`${URL_PUT_CURRICULO}`, datosCurriculo);

      await putAreasInteres(data.curriculo_id, datosCurriculo.areas_interes);

      if (datosCurriculo.titulos_obtenidos) {
        await putTitulosObtenidos(
          data.curriculo_id,
          datosCurriculo.titulos_obtenidos
        );
      }

      if (datosCurriculo.experiencias) {
        await putExperiencias(data.curriculo_id, datosCurriculo.experiencias);
      }

      return Swal.fire({
        text: "¡Curriculo actualizado exitosamente!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error();
    }
  };
};

const putAreasInteres = async (curriculo_id, areas_interes) => {
  const URL_ADD_AREASINTERES = `${URL_SERVER}/areasinteres/agregarArea`;
  const URL_DELETE_AREASINTERES = `${URL_SERVER}/areasinteres/eliminarAreas/${curriculo_id}`;

  try {
    await axios.delete(URL_DELETE_AREASINTERES);

    await axios.post(`${URL_ADD_AREASINTERES}`, {
      curriculo_id,
      areas_interes,
    });
  } catch (error) {
    Swal.fire({
      title: "Oops...",
      text: `${error.response.data.error}`,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw new Error();
  }
};

const putTitulosObtenidos = async (curriculo_id, titulos_obtenidos) => {
  const URL_ADD_TITULOSOBTENIDOS = `${URL_SERVER}/titulosobtenidos`;
  const URL_DELETE_TITULOSOBTENIDOS = `${URL_SERVER}/titulosobtenidos/eliminarTitulos/${curriculo_id}`;

  try {
    await axios.delete(URL_DELETE_TITULOSOBTENIDOS);

    await axios.post(`${URL_ADD_TITULOSOBTENIDOS}`, {
      curriculo_id,
      titulos_obtenidos,
    });
  } catch (error) {
    Swal.fire({
      title: "Oops...",
      text: `${error.response.data.error}`,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw new Error();
  }
};

const putExperiencias = async (curriculo_id, experiencias) => {
  const URL_ADD_EXPERIENCIAS = `${URL_SERVER}/experiencias`;
  const URL_DELETE_EXPERIENCIAS = `${URL_SERVER}/experiencias/eliminarExperiencias/${curriculo_id}`;

  try {
    await axios.delete(URL_DELETE_EXPERIENCIAS);

    await axios.post(`${URL_ADD_EXPERIENCIAS}`, {
      curriculo_id,
      experiencias,
    });
  } catch (error) {
    Swal.fire({
      title: "Oops...",
      text: `${error.response.data.error}`,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw new Error();
  }
};

// FIN PUT CURRICULO
