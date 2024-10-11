import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getAllMovimientos,
  getMovimientoDetail,
  putAprobarMovimiento,
  putDenegarMovimiento,
  postMovimientoPDF,
  postPaginaActual,
  postLimitePorPagina,
  postFiltros,
  deleteFiltros,
  clearMovimientoDetail,
} from "../../redux/movimientos/movimientosActions";

import { getAllClasesMovimientosActivas } from "../../redux/clasesMovimientos/clasesMovimientosActions";

import { getAllEmpresasActivas } from "../../redux/empresas/empresasActions";

import {
  getAllSedesActivas,
  resetSedesActivas,
} from "../../redux/sedes/sedesActions";

import { Button, Input, Label, Select, Span, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYYHHMM2 } from "../../utils/formatearFecha";

import { calcularAntiguedad } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export function Roles_Permisologia() {
 

  const dispatch = useDispatch();

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const movimiento = useSelector((state) => state.movimientos.movimientoDetail);

  const movimientos = useSelector((state) => state.movimientos.movimientos);

  const paginaActual = useSelector((state) => state.movimientos.paginaActual);

  const empresas_activas = useSelector(
    (state) => state.empresas.empresas_activas
  );
  const clases_movimientos_activas = useSelector(
    (state) => state.clases_movimientos.clases_movimientos_activas
  );

  const sedes_activas = useSelector((state) => state.sedes.sedes_activas);

  const limitePorPagina = useSelector(
    (state) => state.movimientos.limitePorPagina
  );

  const filtros = useSelector((state) => state.movimientos.filtros);

  const [filters, setFilters] = useState({
    numero_identificacion: filtros.numero_identificacion || "",
    apellidos: filtros.numero_identificacion || "",
    clase_movimiento_id: filtros.clase_movimiento_id || "Seleccione",
    estado_solicitud: filtros.estado_solicitud || "",
    orden_campo: filtros.orden_campo || "",
    orden_por: filtros.orden_por || "",
    empresa_id: filtros.empresa_id || "Seleccione",
   
  });
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalContentRef = useRef(null);
  const tableRef = useRef(null);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const handleChangePagination = (e) => {
    const { value } = e.target;

    dispatch(postLimitePorPagina(value));

    if (paginaActual !== 1) {
      dispatch(postPaginaActual(1));
    }
  };

  const handleSelectToggle = () => {
    setIsSelectOpen(prevState => !prevState);
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
      clase_movimiento_id: "Seleccione",
      estado_solicitud: "",
      orden_campo: "",
      orden_por: "",
      empresa_id: "Seleccione",
      sede_id: "Seleccione",
    });

    const buscarPor = document.getElementById("buscar_por");
    const inputSearch = document.getElementById("input_search");

    buscarPor.selectedIndex = 0;
    inputSearch.value = "";

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

    dispatch(getAllEmpresasActivas(token));
    dispatch(getAllClasesMovimientosActivas(token));

    document.title = "Grupo Lamar - Solicitudes Movimientos (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    if (showModal) {
      // Reinicia el scroll al inicio cada vez que el modal se abre
      modalContentRef.current.scrollTop = 0;
    }
  }, [showModal]);

  useEffect(() => {
    dispatch(getAllMovimientos(token, filtros, paginaActual, limitePorPagina));
  }, [filtros, paginaActual, limitePorPagina]);

  useEffect(() => {
    if (filters.empresa_id && filters.empresa_id !== "Seleccione") {
      setFilters({ ...filters, sede_id: "Seleccione" });
      dispatch(getAllSedesActivas(filters.empresa_id));
    } else {
      dispatch(resetSedesActivas());
      setFilters({ ...filters, sede_id: "Seleccione" });
    }
  }, [filters.empresa_id]);

  const handleVerDetalles = (movimiento_id) => {
    if (!showModal) {
      setShowModal(true);
    }

    dispatch(getMovimientoDetail(token, movimiento_id, empleado.empleado_id));
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
    if (paginaActual < movimientos.cantidadPaginas) {
      dispatch(postPaginaActual(paginaActual + 1)).then(() => {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  const handleAprobarMovimiento = async (movimiento_id) => {
    const { value: text, isConfirmed } = await Swal.fire({
      input: "textarea",
      inputLabel: "Aprobar Movimiento",
      inputPlaceholder: "Escribe tus observaciones aquí...",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    });

    if (isConfirmed) {
      await putAprobarMovimiento(
        token,
        movimiento_id,
        empleado.empleado_id,
        text
      );

      handleFind();
      handleVerDetalles(movimiento_id);
    }
  };

  const handleDenegarMovimiento = async (movimiento_id) => {
    const { value: text, isConfirmed } = await Swal.fire({
      input: "textarea",
      inputLabel: "Denegar Movimiento",
      inputPlaceholder: "Escribe tus observaciones aquí...",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    });

    if (isConfirmed) {
      await putDenegarMovimiento(
        token,
        movimiento_id,
        empleado.empleado_id,
        text
      );

      handleFind();
      handleVerDetalles(movimiento_id);
    }
  };

  const handleCerrarModal = () => {
    setShowModal(0);
    clearMovimientoDetail();
  };

  const handleChangeFiltersSelect = (e) => {
    const { value } = e.target;

    const buscarPor = document.getElementById("input_search");
    const valueBuscarPor = buscarPor.value;

    if (valueBuscarPor) {
      setFilters((prevFilters) => {
        let updatedFilters = { ...prevFilters };

        if (value === "numero_identificacion") {
          updatedFilters.apellidos = "";
        } else if (value === "apellidos") {
          updatedFilters.numero_identificacion = "";
        }

        return { ...updatedFilters, [value]: valueBuscarPor };
      });
    }
  };




  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Roles y Permisología</Title>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 w-full">
        <div className="flex flex-col place-content-between">
          <Label htmlFor="buscar_por">Buscar por</Label>
          <Select
            id="buscar_por"
            name="buscar_por"
            onChange={handleChangeFiltersSelect}
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
        <div className="overflow-x-auto shadow-md rounded-lg">
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
                  <div className="flex items-center">Cargo actual</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Empresa</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">
                    Unidad organizativa de adscripción
                  </div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Roles</div>
                </th>

                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">
                    <span
                      id="updatedAt"
                      name="updatedAt"
                      onClick={changeOrder}
                      className="text-black hover:text-black flex items-center"
                    >
                      Últ. Modif.
                      <img
                        name="updatedAt"
                        src={
                          filters.orden_campo === "updatedAt" &&
                          filters.orden_por === "ASC"
                            ? "./SortAZ.svg"
                            : filters.orden_campo === "updatedAt" &&
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
                  <div className="flex items-center">Acción</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {movimientos === "No existen movimientos" ||
              !movimientos.movimientos?.length ? (
                <tr>
                  <td colSpan="4" className="text-center p-2">
                    <p>¡No existen registros de movimientos!</p>
                  </td>
                </tr>
              ) : (
                movimientos.movimientos?.map((movimiento, i) => (
                  <tr
                    key={i}
                    className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="p-4">
                      {movimiento.Empleado.apellidos}{" "}
                      {movimiento.Empleado.nombres}
                    </td>
                    <td className="p-4">
                      {movimiento.Empleado.tipo_identificacion}
                      {movimiento.Empleado.numero_identificacion}
                    </td>
                    <td className="p-4">
                      {movimiento.Clases_Movimiento.descripcion}
                    </td>
                    <td className="p-4">
                      {DDMMYYYYHHMM2(movimiento.createdAt)}
                    </td>
                    <td className="p-4">{movimiento.estado_solicitud}</td>
                    <td className="p-4">
                      {DDMMYYYYHHMM2(movimiento.updatedAt)}
                    </td>
                    <td className="p-4 flex gap-2">
                      <Button
                        className="m-0 w-auto text-xs"
                        onClick={() =>
                          handleVerDetalles(movimiento.movimiento_id)
                        }
                      >
                        Editar roles
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
            movimientos.totalRegistros
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
              movimientos.cantidadPaginas
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
                  paginaActual >= movimientos.cantidadPaginas
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

      {/* Main modal */}
      <div
        className={
          showModal
            ? "fixed z-[1000] flex items-center justify-center w-full sm:w-[60%] text-sm md:text-base"
            : "hidden"
        }
      >
        {/* Modal content */}
        <div className={`bg-gray-400 rounded-lg border-2 border-white lg:w-[70%] ${isSelectOpen ? 'lg:max-h-[80vh]' : 'lg:max-h-[90vh]'}`}>
          {/* Modal header */}
          <div className="flex items-start justify-between p-4 md:p-5 border-b rounded-t">
            <div className="flex flex-col items-start">
              <Span className="font-bold">
                {`${movimiento?.movimiento?.Empleado?.Empresa?.nombre} (${movimiento?.movimiento?.Empleado?.Empresa?.Sedes[0]?.nombre})`}
              </Span>
              <Span>
                {`${movimiento?.movimiento?.Empleado?.nombres} ${movimiento?.movimiento?.Empleado?.apellidos}`}
              </Span>
              <Span>
                {`${movimiento?.movimiento?.Empleado?.tipo_identificacion}-${movimiento?.movimiento?.Empleado?.numero_identificacion}`}
              </Span>
            </div>

            <div className="flex gap-2 items-center">
              {movimiento?.movimiento?.estado_solicitud ===
                "Pendiente por revisar" ||
              movimiento?.movimiento?.estado_solicitud === "Revisado" ? (
                <Button
                  className="m-0 w-auto text-xs bg-green-600 hover:bg-green-600/[.5]"
                  onClick={() =>
                    handleAprobarMovimiento(
                      movimiento.movimiento.movimiento_id
                        )
                  }
                >
                  Guardar
                </Button>
              ) : null}

              <Button
                className="m-0 w-auto text-xs"
                onClick={handleCerrarModal}
              >
                Cerrar
              </Button>
            </div>
          </div>

                  {/* Modal body */}
                  <div className={`overflow-y-auto p-4 transition-all duration-300 ${isSelectOpen ? 'max-h-[100vh]' : 'max-h-[90vh]'}`} ref={modalContentRef}>
                    <div className="flex flex-col items-center border-b">
                      <Span className="font-bold mb-2">Roles</Span>
                      <Select
                        className="bg-gray-300 border border-white rounded-md p-2 w-full sm:w-auto"
                        onClick={handleSelectToggle} // Cambia el estado al hacer clic
                      >
                        <option value="admin">Admin</option>
                        <option value="empleados">Empleados</option>
                      </Select>
                    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

