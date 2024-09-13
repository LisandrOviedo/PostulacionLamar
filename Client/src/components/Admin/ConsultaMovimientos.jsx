import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getAllEmpleados,
  getEmpleadoDetail,
  postPaginaActual,
  postLimitePorPagina,
  postFiltros,
  deleteFiltros,
} from "../../redux/empleados/empleadosActions";

import { Button, Input, Label, Select, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYY } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export function ConsultaMovimientos() {
  const tableRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const empleados = useSelector((state) => state.empleados.empleados);

  const paginaActual = useSelector((state) => state.empleados.paginaActual);

  const limitePorPagina = useSelector(
    (state) => state.empleados.limitePorPagina
  );

  const filtros = useSelector((state) => state.empleados.filtros);

  const [filters, setFilters] = useState({
    numero_identificacion: filtros.numero_identificacion || "",
    orden_campo: filtros.orden_campo || "",
    orden_por: filtros.orden_por || "",
    empresa_id: empleado.empresa_id,
  });

  const [datosMovimiento, setDatosMovimiento] = useState({
    numero_identificacion_solicitante: "",
    tipo_identificacion_solicitante: "V",
    numero_identificacion_solicitante: "",
  });

  const [errors, setErrors] = useState({});

  const handleValidate = (e) => {
    const { name, value } = e.target; //Este parámetro representa el evento que desencadenó la función. En este caso, es un evento de entrada (Input).

    setDatosMovimiento({ ...datosMovimiento, [name]: value }); //... y el nombre del estado hace que se mantenga la información del estado

    setErrors(validations({ ...datosMovimiento, [name]: value }));
  };

  const handleChangePagination = (e) => {
    const { value } = e.target;

    dispatch(postLimitePorPagina(value));

    if (paginaActual !== 1) {
      dispatch(postPaginaActual(1));
    }
  };

  const handleChangeFilters = (e) => {
    const { name, value } = e.target;

    setFilters({ ...filters, [name]: value });
  };

  const handleChangeFiltersInput = (e) => {
    const { value } = e.target;

    const buscarPor = document.getElementById("buscar_por");
    const valueBuscarPor = buscarPor.value;

    setFilters({ ...filters, [valueBuscarPor]: value });
  };

  const handleResetFilters = () => {
    setFilters({
      numero_identificacion: "",
      apellidos: "",
      activo: "",
      orden_campo: "",
      orden_por: "",
      empresa_id: empleado.empresa_id,
    });

    const buscarPor = document.getElementById("buscar_por");
    const inputSearch = document.getElementById("input_search");
    const activo = document.getElementById("activo");

    buscarPor.selectedIndex = 0;
    inputSearch.value = "";
    activo.selectedIndex = 0;

    dispatch(deleteFiltros());
  };

  const handleFind = () => {
    dispatch(postPaginaActual(1)).then(() => {
      dispatch(postFiltros(filters));
    });
  };

  useEffect(() => {
    window.scroll(0, 0);

    handleFind();

    document.title = "Grupo Lamar - Consulta Movimientos (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    dispatch(getAllEmpleados(token, filtros, paginaActual, limitePorPagina));
  }, [filtros, paginaActual, limitePorPagina]);

  // const handleVerFicha = (empleado_id, identificacion) => {
  //   dispatch(postFichaIngresoPDF(token, empleado_id, identificacion)).then(
  //     (response) => {
  //       Swal.fire({
  //         text: `Ficha de ingreso del empleado ${identificacion} generada ¿Deseas abrirla?`,
  //         icon: "info",
  //         showCancelButton: true,
  //         confirmButtonColor: "#3085d6",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: "Si",
  //         cancelButtonText: "No",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           const URL_GET_PDF = `${URL_SERVER}/documentos_empleados/documento/${identificacion}/${response.data}`;
  //           window.open(URL_GET_PDF, "_blank");
  //         }
  //       });
  //     }
  //   );
  // };

  const handleVerDetalles = (empleado_id) => {
    dispatch(getEmpleadoDetail(token, empleado_id))
      .then(() => {
        navigate(`/admin/empleado/${empleado_id}`);
      })
      .catch((error) => {
        return error;
      });
  };

  const changeOrder = (e) => {
    const { name } = e.target;

    if (!filters.orden_campo) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      return dispatch(
        postFiltros({ ...filters, orden_campo: name, orden_por: "ASC" })
      );
    } else if (filters.orden_campo === name && filters.orden_por === "ASC") {
      setFilters((prevFilters) => ({ ...prevFilters, orden_por: "DESC" }));

      return dispatch(postFiltros({ ...filters, orden_por: "DESC" }));
    } else if (filters.orden_campo === name && filters.orden_por === "DESC") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: "",
        orden_por: "",
      }));

      return dispatch(
        postFiltros({ ...filters, orden_campo: "", orden_por: "" })
      );
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      return dispatch(
        postFiltros({ ...filters, orden_campo: name, orden_por: "ASC" })
      );
    }
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) {
      dispatch(postPaginaActual(paginaActual - 1)).then(() => {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  const paginaSiguiente = () => {
    if (paginaActual < empleados.cantidadPaginas) {
      dispatch(postPaginaActual(paginaActual + 1)).then(() => {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Consulta Movimientos</Title>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 w-full">
        <div className="flex flex-col place-content-between">
          <Label htmlFor="buscar_por">Buscar por</Label>
          <Select
            id="buscar_por"
            name="buscar_por"
            // onChange={handleChangeFiltersSelect}
            defaultValue={
              filtros.apellidos ? "apellidos" : "numero_identificacion"
            }
          >
            <option value="numero_identificacion">
              Número de identificación
            </option>
            <option value="apellidos">Apellidos</option>
          </Select>
        </div>
        <div className="flex w-full items-end">
          <Input
            type="text"
            id="input_search"
            placeholder="Escribe aquí tu búsqueda"
            onChange={handleChangeFiltersInput}
            defaultValue={
              filtros.apellidos
                ? `${filtros.apellidos}`
                : filtros.numero_identificacion
                ? `${filtros.numero_identificacion}`
                : ""
            }
          />
        </div>

        {/* Clase de Movimiento */}
        <div>
          <Label htmlFor="clase_movimiento">Clase De Movimiento</Label>
          <Select
            id="clase_movimiento"
            name="clase_movimiento"
            onChange={handleValidate}
          >
            <option value="Seleccione">Seleccione</option>
            <option value="Transferencia entre Empresas">
              Transferencia entre Empresas
            </option>
            <option value="Reasignacion de funciones">
              Reasignacion de funciones
            </option>
            <option value="redenominacion">Redenominacion de cargo</option>
            <option value="promocion">Promoción</option>
            <option value="cambio_sede_misma_empresa">
              Cambio de sede (misma empresa)
            </option>
            <option value="cambio_dpto_misma_empresa">
              Cambio de departamento (misma empresa)
            </option>
            <option value="ajuste_sueldo">Ajuste de sueldo</option>
            <option value="cambio_nomina">Cambio de nómina</option>
            <option value="otro">Otro</option>
          </Select>
        </div>

        <div className="flex flex-col place-content-between">
          <Label htmlFor="limitePorPagina">Límite por página</Label>
          <Select
            id="limitePorPagina"
            name="limitePorPagina"
            defaultValue={limitePorPagina}
            onChange={handleChangePagination}
          >
            <option value="2">2</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </Select>
        </div>
        <div
          id="tabla"
          ref={tableRef}
          className="flex items-end justify-center sm:col-span-2 lg:col-span-1 lg:justify-start gap-2"
        >
          <Button className="m-0 w-auto" onClick={handleFind}>
            Buscar
          </Button>
          <Button className="m-0 w-auto" onClick={handleResetFilters}>
            Restablecer Filtros
          </Button>
        </div>
      </div>
      <div className="mt-8 sm:mx-auto w-full">
        <div className=" overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">
                    <span
                      id="apellidos"
                      name="apellidos"
                      onClick={changeOrder}
                      className="text-black hover:text-black flex items-center"
                    >
                      Nombre Completo
                      <img
                        name="apellidos"
                        src={
                          filters.orden_campo === "apellidos" &&
                          filters.orden_por === "ASC"
                            ? "./SortAZ.svg"
                            : filters.orden_campo === "apellidos" &&
                              filters.orden_por === "DESC"
                            ? "./SortZA.svg"
                            : "./SortDefault.svg"
                        }
                        alt="Icon Sort"
                        className="w-5 h-5 ms-1.5 cursor-pointer"
                      />
                    </span>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Número identificación</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Tipo Movimiento</div>
                </th>

                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Acción</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {empleados === "No existen empleados" ||
              !empleados.empleados?.length ? (
                <tr>
                  <td colSpan="9" className="text-center p-2">
                    <p>¡No existen registros!</p>
                  </td>
                </tr>
              ) : (
                empleados.empleados?.map((empleado, i) => (
                  <tr
                    key={i}
                    className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">
                      {empleado.apellidos} {empleado.nombres}
                    </td>
                    <td className="px-4 py-4">
                      {empleado.tipo_identificacion}
                      {empleado.numero_identificacion}
                    </td>

                    <td className="px-4 py-4">
                      {/* tipo movimiento */}
                    </td>
                    <td className="px-4 py-4 flex gap-2">
                      <Button
                        className="m-0 w-auto text-xs"
                        onClick={() => handleVerDetalles(empleado.empleado_id)}
                      >
                        Detalles
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <nav className="flex items-center justify-center md:justify-between flex-column flex-wrap md:flex-row pt-4">
          {infoPaginador(
            paginaActual,
            limitePorPagina,
            empleados.totalRegistros
          )}
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <span
                onClick={paginaAnterior}
                className={`flex text-black items-center justify-center px-3 h-8 border border-gray-300 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white 
                ${
                  paginaActual <= 1
                    ? "cursor-default"
                    : "cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                Pág. Anterior
              </span>
            </li>
            {calcularPaginasARenderizar(
              paginaActual,
              empleados.cantidadPaginas
            ).map((page) => (
              <li key={page}>
                <span
                  onClick={() =>
                    dispatch(postPaginaActual(page)).then(() => {
                      tableRef.current.scrollIntoView({ behavior: "smooth" });
                    })
                  }
                  className={`cursor-pointer text-black flex items-center justify-center px-3 h-8 border border-gray-300 hover:bg-blue-100 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white ${
                    page === paginaActual
                      ? "font-semibold text-blue-600 hover:text-blue-600 bg-blue-50"
                      : ""
                  }`}
                >
                  {page}
                </span>
              </li>
            ))}
            <li>
              <span
                onClick={paginaSiguiente}
                className={`flex text-black items-center justify-center px-3 h-8 border border-gray-300 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white 
                ${
                  paginaActual >= empleados.cantidadPaginas
                    ? "cursor-default"
                    : "cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                Pág. Siguiente
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
