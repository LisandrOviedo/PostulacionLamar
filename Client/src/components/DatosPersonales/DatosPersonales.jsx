import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Button, Hr, Label, Title } from "../UI";

import { calcularEdad } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export function DatosPersonales() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;
  const FOTO_PERFIL = `${URL_SERVER}/documentos_empleados/documento/${empleado.cedula}/${empleado.foto_perfil_nombre}`;

  const [imagen, setImagen] = useState(
    empleado.foto_perfil_nombre ? FOTO_PERFIL : "/Person.svg"
  );

  useEffect(() => {
    window.scroll(0, 0);

    document.title = "Grupo Lamar - Datos Personales";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

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
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Género
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.genero || "Sin registrar"}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Etnia
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.etnia || "Ninguna"}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Número de contacto
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.telefono || "Sin registrar / No posee"}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Correo electrónico
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.correo || "Sin registrar / No posee"}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Dirección
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.direccion || "Sin registrar"}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Cantidad de hijos
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.cantidad_hijos}
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
            id="preview_foto"
            src={imagen}
            alt="Imgen del perfil"
            className="w-40 h-40 border border-[#002846] bg-gray-400 rounded-full ring-2 ring-[#F0C95C]"
          />
          <Label htmlFor="preview_foto">Imagen del perfil</Label>
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
