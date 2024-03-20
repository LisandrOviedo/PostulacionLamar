import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllCurriculos } from "../../redux/curriculoAction";

import { Title } from "../UI";

export function Postulaciones() {
  const curriculos = useSelector((state) => state.curriculos);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(getAllCurriculos());
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

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Postulaciones</Title>
      </div>

      <div className="mt-8 sm:mx-auto w-full">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
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
                  <div className="flex items-center">Teléfono</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Correo</div>
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
                    Área Interés
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
                    Recibido
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
                  <div className="flex items-center">
                    Estado
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
                  <div className="flex items-center">Acción</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {curriculos?.curriculos === "No existen curriculos" ? (
                <p className="text-center">No existen curriculos!</p>
              ) : (
                curriculos?.curriculos.map((curriculo, i) => (
                  <tr
                    key={i}
                    className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">
                      {curriculo.Empleado.nombres}{" "}
                      {curriculo.Empleado.apellidos}
                    </td>
                    <td className="px-4 py-4">{curriculo.Empleado.telefono}</td>
                    <td className="px-4 py-4">{curriculo.Empleado.correo}</td>
                    <td className="px-4 py-4">{curriculo.grado_instruccion}</td>
                    <td className="px-4 py-4">
                      {curriculo.Areas_Intere.nombre}
                    </td>
                    <td className="px-4 py-4">
                      {convertirFecha(curriculo.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      {convertirFecha(curriculo.updatedAt)}
                    </td>
                    <td className="px-4 py-4">{curriculo.estado}</td>
                    <td className="px-4 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Detalles
                      </a>
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
