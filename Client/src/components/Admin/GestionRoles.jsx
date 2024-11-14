import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import {
  getAllRolesFiltrados,
  postCrearRol,
  getRol,
  putModificarRol,
  putActivo,
} from "../../redux/roles/rolesActions";

import { Button, Input, Label, Select, Span, Title, CheckBox } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYYHHMM2 } from "../../utils/formatearFecha";

import { TfiPencil } from "react-icons/tfi";

import Swal from "sweetalert2";

export function GestionRoles() {
  const token = useSelector((state) => state.empleados.token);

  const [roles, setRoles] = useState([]);

  const [rolDetail, setRolDetail] = useState({});

  const [paginaActual, setPaginaActual] = useState(1);

  const [limitePorPagina, setLimitePorPagina] = useState(2);

  const [filters, setFilters] = useState({
    nombre: "",
    descripcion: "",
    orden_campo: "",
    orden_por: "",
  });

  const [nuevoRol, setNuevoRol] = useState({
    nombre: "",
    descripcion: "",
    acceso_admin: true,
  });

  const [errors, setErrors] = useState({});

  const [modificar, setModificar] = useState({
    nombre: false,
    descripcion: false,
  });

  const [showDetallesRolModal, setShowDetallesRolModal] = useState(false);
  const [showCrearRolModal, setShowCrearRolModal] = useState(false);

  const tableRef = useRef(null);

  const handleChangePagination = async (e) => {
    const { value } = e.target;

    setLimitePorPagina(value);

    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataAllRoles = await getAllRolesFiltrados(token, filters, 1, value);

    setRoles(dataAllRoles);
  };

  const handleChangeFiltersInput = (e) => {
    const { value } = e.target;

    const buscarPor = document.getElementById("buscar_por");
    const valueBuscarPor = buscarPor.value;

    setFilters({ ...filters, [valueBuscarPor]: value });
  };

  const handleCheckedChange = (event) => {
    const { name, checked } = event.target;

    setNuevoRol({ ...nuevoRol, [name]: checked });
  };

  const handleChangeFiltersSelect = (e) => {
    const { value } = e.target;

    const buscarPor = document.getElementById("input_search");
    const valueBuscarPor = buscarPor.value;

    if (valueBuscarPor) {
      setFilters((prevFilters) => {
        let updatedFilters = { ...prevFilters };

        if (value === "nombre") {
          updatedFilters.descripcion = "";
        } else if (value === "descripcion") {
          updatedFilters.nombre = "";
        }

        return { ...updatedFilters, [value]: valueBuscarPor };
      });
    }
  };

  const handleResetFilters = async () => {
    setFilters({
      nombre: "",
      descripcion: "",
      orden_campo: "",
      orden_por: "",
    });

    const buscarPor = document.getElementById("buscar_por");
    const inputSearch = document.getElementById("input_search");

    buscarPor.selectedIndex = 0;
    inputSearch.value = "";

    const dataAllRoles = await getAllRolesFiltrados(
      token,
      {
        nombre: "",
        descripcion: "",
        orden_campo: "",
        orden_por: "",
      },
      1,
      limitePorPagina
    );

    setRoles(dataAllRoles);
  };

  const handleFind = async () => {
    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataAllRoles = await getAllRolesFiltrados(
      token,
      filters,
      1,
      limitePorPagina
    );

    setRoles(dataAllRoles);
  };

  const handleChangeActivo = (rol_id) => {
    Swal.fire({
      text: "¿Seguro que desea activar / desactivar el rol?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await putActivo(token, rol_id);

        const dataAllRoles = await getAllRolesFiltrados(
          token,
          filters,
          paginaActual,
          limitePorPagina
        );

        setRoles(dataAllRoles);
      }
    });
  };

  useEffect(() => {
    window.scroll(0, 0);

    handleFind();

    document.title = "Grupo Lamar - Gestión de Roles (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  const handleGuardarRol = async () => {
    // Llamar a la función que realiza la solicitud a la API directamente
    await postCrearRol(token, nuevoRol);

    handleCerrarModalCrearRol();

    const dataAllRoles = await getAllRolesFiltrados(
      token,
      filters,
      paginaActual,
      limitePorPagina
    );

    setRoles(dataAllRoles);
  };

  const handleOpenCrearRolModal = () => {
    setShowCrearRolModal(true);
  };

  const handleOpenDetallesRolModal = async (rol_id) => {
    const data = await getRol(token, rol_id);

    setRolDetail(data);

    if (!showDetallesRolModal) {
      setShowDetallesRolModal(true);
    }
  };

  //editar

  const handleModificarRol = () => {
    // Llamada a la función modificarRol

    Swal.fire({
      text: "¿Seguro que deseas modificar este rol?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await putModificarRol(
          token,
          rolDetail.rol_id,
          rolDetail.nombre,
          rolDetail.descripcion
        );

        const dataAllRoles = await getAllRolesFiltrados(
          token,
          filters,
          paginaActual,
          limitePorPagina
        );

        setRoles(dataAllRoles);

        handleCerrarModal();
      }
    });
  };

  const changeOrder = async (e) => {
    const { name } = e.target;

    if (!filters.orden_campo) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      const dataAllRoles = await getAllRolesFiltrados(
        token,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        1,
        limitePorPagina
      );

      setRoles(dataAllRoles);
    } else if (filters.orden_campo === name && filters.orden_por === "ASC") {
      setFilters((prevFilters) => ({ ...prevFilters, orden_por: "DESC" }));

      const dataAllRoles = await getAllRolesFiltrados(
        token,
        { ...filters, orden_por: "DESC" },
        1,
        limitePorPagina
      );

      setRoles(dataAllRoles);
    } else if (filters.orden_campo === name && filters.orden_por === "DESC") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: "",
        orden_por: "",
      }));

      const dataAllRoles = await getAllRolesFiltrados(
        token,
        { ...filters, orden_campo: "", orden_por: "" },
        1,
        limitePorPagina
      );

      setRoles(dataAllRoles);
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      const dataAllRoles = await getAllRolesFiltrados(
        token,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        1,
        limitePorPagina
      );

      setRoles(dataAllRoles);
    }
  };

  const paginaAnterior = async () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);

      const dataAllRoles = await getAllRolesFiltrados(
        token,
        filters,
        paginaActual - 1,
        limitePorPagina
      );

      setRoles(dataAllRoles);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paginaSiguiente = async () => {
    if (paginaActual < roles.cantidadPaginas) {
      setPaginaActual(paginaActual + 1);

      const dataAllRoles = await getAllRolesFiltrados(
        token,
        filters,
        paginaActual + 1,
        limitePorPagina
      );

      setRoles(dataAllRoles);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleValidateCrear = (e) => {
    const { name, value } = e.target;

    setNuevoRol({ ...nuevoRol, [name]: value });
  };

  const handleValidateModificar = (e) => {
    const { name, value } = e.target;

    setRolDetail({ ...rolDetail, [name]: value });
  };

  const handleModificar = (campo) => {
    setModificar({ ...modificar, [campo]: !modificar[campo] });
  };

  const handleCerrarModal = () => {
    setShowDetallesRolModal(false);

    setModificar({ nombre: false, descripcion: false });
  };

  const handleCerrarModalCrearRol = () => {
    setNuevoRol({ nombre: "", descripcion: "", acceso_admin: true });

    setShowCrearRolModal(false);
  };

  const handleChangePage = async (page) => {
    if (paginaActual !== page) {
      setPaginaActual(page);

      const dataAllRoles = await getAllRolesFiltrados(
        token,
        filters,
        page,
        limitePorPagina
      );

      setRoles(dataAllRoles);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        className={`mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8 ${
          (showDetallesRolModal || showCrearRolModal) &&
          "opacity-50 pointer-events-none"
        }`}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Title>Gestión De Roles</Title>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-5 w-full">
          <div className="flex flex-col place-content-between">
            <Label htmlFor="buscar_por">Buscar por</Label>
            <Select
              id="buscar_por"
              name="buscar_por"
              onChange={handleChangeFiltersSelect}
              defaultValue={filters.nombre ? "nombre" : "descripcion"}
            >
              <option value="descripcion">Descripción</option>
              <option value="nombre">Nombre</option>
            </Select>
          </div>
          <div className="flex w-full items-end">
            <Input
              type="text"
              id="input_search"
              placeholder="Escribe aquí tu búsqueda"
              onChange={handleChangeFiltersInput}
              defaultValue={
                filters.descripcion
                  ? `${filters.descripcion}`
                  : filters.nombre
                  ? `${filters.nombre}`
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
          {/* <div> */}
          <div
            id="tabla"
            ref={tableRef}
            className="flex flex-col sm:flex-row items-end gap-3 sm:col-span-2 md:col-span-3 justify-center"
          >
            <Button className="m-0 sm:w-auto" onClick={handleFind}>
              Buscar
            </Button>
            <Button className="m-0 sm:w-auto" onClick={handleResetFilters}>
              Restablecer Filtros
            </Button>
            <Button
              className="m-0 sm:w-auto bg-green-600"
              onClick={handleOpenCrearRolModal}
            >
              Crear rol
            </Button>
          </div>
          {/* </div> */}
        </div>

        <div className="mt-8 sm:mx-auto w-full">
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
              <thead className="text-xs uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <Span
                        id="nombre"
                        name="nombre"
                        onClick={changeOrder}
                        className="text-black hover:text-black flex items-center"
                      >
                        Nombre del Rol
                        <img
                          name="nombre"
                          src={
                            filters.orden_campo === "nombre" &&
                            filters.orden_por === "ASC"
                              ? "./SortAZ.svg"
                              : filters.orden_campo === "nombre" &&
                                filters.orden_por === "DESC"
                              ? "./SortZA.svg"
                              : "./SortDefault.svg"
                          }
                          alt="Icon Sort"
                          className="w-5 h-5 ms-1.5 cursor-pointer"
                        />
                      </Span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Descripción</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <Span
                        id="createdAt"
                        name="createdAt"
                        onClick={changeOrder}
                        className="text-black hover:text-black flex items-center"
                      >
                        Creado
                        <img
                          name="createdAt"
                          src={
                            filters.orden_campo === "createdAt" &&
                            filters.orden_por === "ASC"
                              ? "./SortAZ.svg"
                              : filters.orden_campo === "createdAt" &&
                                filters.orden_por === "DESC"
                              ? "./SortZA.svg"
                              : "./SortDefault.svg"
                          }
                          alt="Icon Sort"
                          className="w-5 h-5 ms-1.5 cursor-pointer"
                        />
                      </Span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <Span
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
                      </Span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Estado</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Acción</div>
                  </th>
                </tr>
              </thead>

              {roles.roles && roles.roles.length > 0 && (
                <tbody>
                  {roles.roles.map((rol, i) => (
                    <tr
                      key={i}
                      className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300"
                    >
                      <td className="p-4">{rol.nombre}</td>
                      <td className="p-4">{rol.descripcion}</td>
                      <td className="p-4">{DDMMYYYYHHMM2(rol.createdAt)}</td>
                      <td className="p-4">{DDMMYYYYHHMM2(rol.updatedAt)}</td>
                      <td className="p-4">
                        {rol.activo ? "Activo" : "Inactivo"}
                      </td>
                      <td className="p-4 flex gap-2">
                        <Button
                          className="m-0 w-auto text-xs"
                          onClick={() => handleOpenDetallesRolModal(rol.rol_id)}
                        >
                          Editar Rol
                        </Button>

                        <Button className="m-0 w-auto text-xs">
                          Editar Accesos
                        </Button>
                        <Button
                          className={`m-0 w-auto text-xs ${
                            rol.activo
                              ? "bg-red-500 hover:bg-red-600 "
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                          onClick={() => handleChangeActivo(rol.rol_id)}
                        >
                          {rol.activo ? "Inactivar" : "Activar"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>

          <nav className="flex items-center justify-center md:justify-between flex-column flex-wrap md:flex-row pt-4">
            {infoPaginador(paginaActual, limitePorPagina, roles.totalRegistros)}
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <Span
                  onClick={paginaAnterior}
                  className={`flex select-none text-black items-center justify-center px-3 h-8 border border-gray-300 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white ${
                    paginaActual <= 1
                      ? "cursor-default"
                      : "cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  Pág. Anterior
                </Span>
              </li>
              {calcularPaginasARenderizar(
                paginaActual,
                roles.cantidadPaginas
              ).map((page) => (
                <li key={page}>
                  <Span
                    onClick={() => handleChangePage(page)}
                    className={`cursor-pointer select-none text-black flex items-center justify-center px-3 h-8 border border-gray-300 hover:bg-blue-100 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white ${
                      page === paginaActual
                        ? "font-semibold text-blue-600 hover:text-blue-600 bg-blue-50"
                        : ""
                    }`}
                  >
                    {page}
                  </Span>
                </li>
              ))}
              <li>
                <Span
                  onClick={paginaSiguiente}
                  className={`flex select-none text-black items-center justify-center px-3 h-8 border border-gray-300 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white ${
                    paginaActual >= roles.cantidadPaginas
                      ? "cursor-default"
                      : "cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  Pág. Siguiente
                </Span>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Modal para crear rol */}
      {showCrearRolModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center">
          <div className="bg-gray-400 rounded-lg border-2 border-white p-6 sm:w-[80%] md:w-[60%] lg:w-[50%] mx-auto">
            <div className="grid p-2 gap-4">
              <div className="border-b p-2 m-0">
                <Title>Creación de Rol</Title>
              </div>
              <div>
                <Label htmlFor="nombreCrear" className="font-bold">
                  Nombre del rol
                </Label>
                <Input
                  type="text"
                  id="nombreCrear"
                  name="nombre"
                  value={nuevoRol.nombre}
                  onChange={handleValidateCrear}
                />
              </div>
              <div>
                <Label htmlFor="descripcionCrear" className="font-bold">
                  Descripción del rol
                </Label>
                <Input
                  type="text"
                  id="descripcionCrear"
                  name="descripcion"
                  value={nuevoRol.descripcion}
                  onChange={handleValidateCrear}
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckBox
                  id="acceso_admin"
                  name="acceso_admin"
                  onChange={handleCheckedChange}
                  checked={nuevoRol.acceso_admin}
                />
                <Label className="select-none" htmlFor="acceso_admin">
                  Acceso admin
                </Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  className="m-0 w-auto text-xs bg-green-600 hover:bg-green-600/[.5]"
                  onClick={handleGuardarRol}
                >
                  Crear
                </Button>
                <Button
                  className="m-0 w-auto text-xs"
                  onClick={handleCerrarModalCrearRol}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDetallesRolModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center">
          <div className="bg-gray-400 rounded-lg border-2 border-white p-6 sm:w-[80%] md:w-[60%]">
            <div className="grid sm:grid-cols-2 lg:col-span-3 p-2 gap-6">
              <div className="sm:col-span-2 lg:col-span-3 border-b p-2 m-0">
                <Title>Detalles del Rol</Title>
              </div>
              <div>
                {!modificar.nombre ? (
                  <>
                    <Span className="font-bold">
                      Nombre del rol{" "}
                      <TfiPencil
                        className="inline cursor-pointer"
                        onClick={() => handleModificar("nombre")}
                      />
                    </Span>
                    <Span>{rolDetail.nombre}</Span>
                  </>
                ) : (
                  <>
                    <Label htmlFor="nombreEditar" className="font-bold">
                      Nombre del rol{" "}
                      <TfiPencil
                        className="inline cursor-pointer"
                        onClick={() => handleModificar("nombre")}
                      />
                    </Label>
                    <Input
                      type="text"
                      id="nombreEditar"
                      name="nombre"
                      value={rolDetail.nombre}
                      onChange={handleValidateModificar}
                    />
                  </>
                )}
              </div>

              <div>
                {!modificar.descripcion ? (
                  <>
                    <Span className="font-bold">
                      Descripción del rol{" "}
                      <TfiPencil
                        className="inline cursor-pointer"
                        onClick={() => handleModificar("descripcion")}
                      />
                    </Span>
                    <Span>{rolDetail.descripcion}</Span>
                  </>
                ) : (
                  <>
                    <Label htmlFor="descripcionEditar" className="font-bold">
                      Descripción del rol{" "}
                      <TfiPencil
                        className="inline cursor-pointer"
                        onClick={() => handleModificar("descripcion")}
                      />
                    </Label>
                    <Input
                      type="text"
                      id="descripcionEditar"
                      name="descripcion"
                      value={rolDetail.descripcion}
                      onChange={handleValidateModificar}
                    />
                  </>
                )}
              </div>

              <div>
                <Span className="font-bold">Fecha de creación</Span>
                <Span>{DDMMYYYYHHMM2(rolDetail.createdAt)}</Span>
              </div>
              <div>
                <Span className="font-bold">Fecha de última modificación</Span>
                <Span>{DDMMYYYYHHMM2(rolDetail.updatedAt)}</Span>
              </div>

              <div className="flex justify-center gap-2 border-t sm:col-span-2 lg:col-span-3 pt-4">
                {rolDetail.nombre && rolDetail.descripcion && (
                  <Button
                    className="m-0 w-auto text-xs"
                    onClick={handleModificarRol}
                  >
                    Actualizar Rol
                  </Button>
                )}
                <Button
                  className="m-0 w-auto text-xs"
                  onClick={handleCerrarModal}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
