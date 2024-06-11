import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getAllEtniasActivas } from "../../redux/etnias/etniasActions";

import { Button, Hr, Input, Select, Title } from "../UI";

import { calcularEdad } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export function DatosPersonales() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const etnias_activas = useSelector((state) => state.etnias.etnias_activas);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;
  const FOTO_PERFIL = `${URL_SERVER}/documentos_empleados/documento/${empleado.cedula}/${empleado.foto_perfil_nombre}`;

  const [imagen, setImagen] = useState(
    empleado.foto_perfil_nombre ? FOTO_PERFIL : "/Person.svg"
  );

  const [datosPersonales, setDatosPersonales] = useState({
    genero: empleado.genero || "Sin registrar",
    etnia_id: empleado.etnia_id || "Ninguno",
    telefono: empleado.telefono || "Sin registrar / No Posee",
    correo: empleado.correo || "Sin registrar / No Posee",
    direccion: empleado.direccion || "Sin registrar",
    cantidad_hijos: empleado.cantidad_hijos,
  });

  useEffect(() => {
    window.scroll(0, 0);

    document.title = "Grupo Lamar - Datos Personales";

    dispatch(getAllEtniasActivas(token));

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  const handleInputChangeDatos = (event) => {
    const { name, value } = event.target;

    setDatosPersonales({ ...datosPersonales, [name]: value });
  };

  const handleSaveChanges = () => {};

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white static">
      <Title>Datos Personales</Title>
      <br />
      <Hr />
      <br />
      <div className="flex items-center justify-center flex-col-reverse sm:flex-row">
        <div>
          <dl className="divide-y divide-gray-100">
            {empleado && (
              <>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Tipo de usuario
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.Role.descripcion}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Nombre completo
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.nombres} {empleado.apellidos}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Fecha nacimiento
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.fecha_nacimiento}
                    {" ("}
                    {calcularEdad(empleado.fecha_nacimiento)}
                    {" años)"}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Número de cédula
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.cedula}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Género
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <Select
                      className="w-auto"
                      id="genero"
                      name="genero"
                      value={datosPersonales.genero}
                      onChange={handleInputChangeDatos}
                    >
                      <option value="Sin registrar">Sin registrar</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                    </Select>
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Etnia
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <Select
                      className="w-auto"
                      id="etnia_id"
                      name="etnia_id"
                      value={datosPersonales.etnia_id}
                      onChange={handleInputChangeDatos}
                    >
                      <option value="Ninguna">Ninguna</option>
                      {etnias_activas?.length
                        ? etnias_activas?.map(
                            (etnia, i) =>
                              etnia.activo && (
                                <option
                                  key={i}
                                  name={etnia.nombre}
                                  value={etnia.etnia_id}
                                >
                                  {etnia.nombre}
                                </option>
                              )
                          )
                        : null}
                    </Select>
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Número de contacto
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {datosPersonales.telefono}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Correo electrónico
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {datosPersonales.correo}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Dirección
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {datosPersonales.direccion}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Cantidad de hijos
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {datosPersonales.cantidad_hijos}
                  </dd>
                </div>
              </>
            )}
            {empleado?.Cargos?.length > 0 && (
              <>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Cargo actual
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.Cargos[0].descripcion}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Nombre empresa
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.Cargos[0].Empresa.nombre}
                  </dd>
                </div>
              </>
            )}
          </dl>
        </div>

        <div className="flex flex-col items-center gap-2 mb-2">
          <img
            src={imagen}
            alt="Imgen del perfil"
            className="w-40 h-40 border border-[#002846] bg-gray-400 rounded-full ring-2 ring-[#F0C95C]"
          />
          <span className="text-sm">Imagen del perfil</span>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3 mt-5 mb-5">
        <div className="md:col-span-3 flex justify-center items-center">
          <Button className="m-0 w-auto" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
}
