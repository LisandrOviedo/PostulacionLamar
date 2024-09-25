import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

// import {
//   allMovimientos,
//   movimientoEmpleado,
//   paginaActual,
//   limitePorPagina,
//   filtros,
//   resetFilters,
//   resetState,
// } from "./movimientosSlices";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const postMovimiento = async (token, datosMovimiento) => {
  const URL_POST_MOVIMIENTO = `${URL_SERVER}/movimientos`;

  try {
    await axios.post(URL_POST_MOVIMIENTO, datosMovimiento, {
      headers: { authorization: `Bearer ${token}` },
    });

    return Swal.fire({
      text: "¡Movimiento realizado exitosamente!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

// export const postPaginaActual = (pagina_actual) => {
//   return async (dispatch) => {
//     try {
//       return dispatch(paginaActual(pagina_actual));
//     } catch (error) {
//       alertError(error);

//       throw new Error();
//     }
//   };
// };

// export const postLimitePorPagina = (limite_pagina) => {
//   return async (dispatch) => {
//     try {
//       return dispatch(limitePorPagina(limite_pagina));
//     } catch (error) {
//       alertError(error);

//       throw new Error();
//     }
//   };
// };

// export const postFiltros = (filters) => {
//   return async (dispatch) => {
//     try {
//       return dispatch(filtros(filters));
//     } catch (error) {
//       alertError(error);

//       throw new Error();
//     }
//   };
// };

// export const deleteFiltros = () => {
//   return async (dispatch) => {
//     try {
//       return dispatch(resetFilters());
//     } catch (error) {
//       alertError(error);

//       throw new Error();
//     }
//   };
// };

// export const resetMovimientos = () => {
//   return async (dispatch) => {
//     try {
//       return dispatch(resetState());
//     } catch (error) {
//       alertError(error);

//       throw new Error();
//     }
//   };
// };
