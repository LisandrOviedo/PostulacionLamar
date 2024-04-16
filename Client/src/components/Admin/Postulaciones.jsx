import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getAllCurriculos,
  getCurriculo,
} from "../../redux/curriculos/curriculoAction";

import { getAllAreasInteresActivas } from "../../redux/areasinteres/areainteresAction";

import { Button, Input, Label, Select, Title } from "../UI";

export function Postulaciones() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const curriculos = useSelector((state) => state.curriculos.curriculos);

  const areas_interes_activas = useSelector(
    (state) => state.areas_interes.areas_interes_activas
  );

  const [filters, setFilters] = useState({
    where: {},
    orders: {},
    paginaActual: "1",
    limitePorPagina: "2",
  });

  const handleChangePagination = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleChangeFilters = (e) => {
    const { name, value } = e.target;

    if (value === "") {
      const { [name]: _, ...updatedWhere } = filters.where;
      setFilters({
        ...filters,
        where: updatedWhere,
      });
    } else {
      setFilters({
        ...filters,
        where: {
          ...filters.where,
          [name]: value,
        },
      });
    }
  };

  useEffect(() => {
    window.scroll(0, 0);

    // dispatch(getAllCurriculos());
    dispatch(getAllAreasInteresActivas());

    document.title = "Grupo Lamar - Postulaciones (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  const convertirFecha = (fecha) => {
    const isoDateString = fecha;
    const isoDate = new Date(isoDateString);
    const day = String(isoDate.getDate()).padStart(2, "0");
    const month = String(isoDate.getMonth() + 1).padStart(2, "0");
    const year = String(isoDate.getFullYear());
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };

  const handleVerDetalles = (curriculo_id) => {
    dispatch(getCurriculo(curriculo_id))
      .then(() => {
        navigate(`/curriculoDetalle/${curriculo_id}`);
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Postulaciones</Title>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 w-full">
        <div className="flex flex-col place-content-between">
          <Label htmlFor="buscar_por">Buscar por</Label>
          <Select
            id="buscar_por"
            name="buscar_por"
            onChange={handleChangeFilters}
          >
            <option value="cedula">Número de cédula</option>
            <option value="apellidos">Apellidos</option>
          </Select>
        </div>
        <div className="flex w-full items-end">
          <Input
            type="text"
            id="input_search"
            placeholder="Escribe aquí tu búsqueda"
          />
        </div>
        <div className="flex flex-col place-content-between">
          <Label htmlFor="area_interes_id">Filtrar por área de interés</Label>
          <Select
            id="area_interes_id"
            name="area_interes_id"
            onChange={handleChangeFilters}
          >
            <option value="">Todos</option>
            {areas_interes_activas?.length
              ? areas_interes_activas?.map(
                  (area, i) =>
                    area.activo && (
                      <option
                        key={i}
                        name={area.nombre}
                        value={area.area_interes_id}
                      >
                        {area.nombre}
                      </option>
                    )
                )
              : null}
          </Select>
        </div>
        <div className="flex flex-col place-content-between">
          <Label htmlFor="estado">Filtrar por estado</Label>
          <Select id="estado" name="estado" onChange={handleChangeFilters}>
            <option value="">Todos</option>
            <option value="Pendiente por revisar">Pendiente por revisar</option>
            <option value="Revisado">Revisado</option>
          </Select>
        </div>
        <div className="flex flex-col place-content-between">
          <Label htmlFor="limitePorPagina">Límite por página</Label>
          <Select
            id="limitePorPagina"
            name="limitePorPagina"
            defaultValue={filters.limitePorPagina}
            onChange={handleChangePagination}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Select>
        </div>
        <div className="flex items-end justify-center sm:col-span-2 lg:col-span-1 lg:justify-start">
          <Button className="m-0 w-auto">Buscar</Button>
        </div>
      </div>
      <div className="mt-8 sm:mx-auto w-full">
        <div className=" overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400 mb-8">
            <thead className="text-xs uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">
                    Nombre Completo
                    <a href="#">
                      <img
                        src="/sort.svg"
                        alt="Sort.svg"
                        className="w-3 h-3 ms-1.5"
                      ></img>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Cédula</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Teléfono</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Correo</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Áreas de Interés</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">
                    Grado Instrucción
                    <a href="#">
                      <img
                        src="/sort.svg"
                        alt="Sort.svg"
                        className="w-3 h-3 ms-1.5"
                      ></img>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">
                    Últ. Modif.
                    <a href="#">
                      <img
                        src="/sort.svg"
                        alt="Sort.svg"
                        className="w-3 h-3 ms-1.5"
                      ></img>
                    </a>
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
            <tbody>
              {curriculos === "No existen curriculos" ? (
                <p className="text-center p-2">No existen curriculos!</p>
              ) : (
                curriculos?.map((curriculo, i) => (
                  <tr
                    key={i}
                    className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">
                      {curriculo.Empleado.apellidos}{" "}
                      {curriculo.Empleado.nombres}
                    </td>
                    <td className="px-4 py-4">{curriculo.Empleado.cedula}</td>
                    <td className="px-4 py-4">{curriculo.Empleado.telefono}</td>
                    <td className="px-4 py-4">{curriculo.Empleado.correo}</td>
                    <td className="px-4 py-4">
                      {curriculo.Areas_Interes.map(
                        (area, index) =>
                          `${area.nombre}${
                            index !== curriculo.Areas_Interes.length - 1
                              ? ", "
                              : ""
                          }`
                      )}
                    </td>
                    <td className="px-4 py-4">{curriculo.grado_instruccion}</td>
                    <td className="px-4 py-4">
                      {convertirFecha(curriculo.updatedAt)}
                    </td>
                    <td className="px-4 py-4">{curriculo.estado}</td>
                    <td className="px-4 py-4">
                      <Button
                        className="m-0"
                        onClick={() =>
                          handleVerDetalles(curriculo.curriculo_id)
                        }
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
      </div>
    </div>
  );
}
