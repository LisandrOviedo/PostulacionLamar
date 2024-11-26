import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { getEmpleadoDetail } from "../../redux/empleados/empleadosActions";

import { Button, Hr, Title } from "../UI";

import { calcularEdad } from "../../utils/formatearFecha";

export default function DetalleEmpleado() {
  const { empleado_id } = useParams();

  const token = useSelector((state) => state.empleados.token);

  const [empleadoDetail, setEmpleadoDetail] = useState({});

  const navigate = useNavigate();

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;
  const FOTO_PERFIL = `${URL_SERVER}/documentos_empleados/documento/${empleadoDetail.numero_identificacion}${empleadoDetail.tipo_identificacion}/${empleadoDetail.foto_perfil_nombre}`;

  useEffect(() => {
    window.scroll(0, 0);

    document.title = "Grupo Lamar - Detalles Del Empleado";

    (async function () {
      const data = await getEmpleadoDetail(token, empleado_id);

      setEmpleadoDetail(data);
    })();

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  const handleGoBack = () => {
    navigate("/admin/empleados");
  };

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white static">
      <Title>Detalles del Empleado</Title>
      <br />
      <Hr />
      <div className="flex items-center justify-center flex-col-reverse sm:flex-row">
        <div>
          <div className="mt-4 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {empleadoDetail && (
                <>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Tipo de usuario
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleadoDetail.Role?.descripcion}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Nombre completo
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleadoDetail.nombres} {empleadoDetail.apellidos}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Nacionalidad
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleadoDetail.tipo_identificacion === "V"
                        ? "Venezolano"
                        : "Extranjero"}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Número de identificación
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleadoDetail.numero_identificacion}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Fecha nacimiento
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleadoDetail.fecha_nacimiento}
                      {" ("}
                      {calcularEdad(empleadoDetail.fecha_nacimiento)}
                      {" años)"}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Estado civil
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleadoDetail.estado_civil || "Sin registrar"}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      RIF
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleadoDetail.rif || "Sin registrar"}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Número de contacto
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleadoDetail.telefono || "Sin registrar"}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Correo electrónico
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleadoDetail.correo || "Sin registrar"}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Etnia
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleadoDetail.Etnia?.nombre || "Sin registrar"}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Mano dominante
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleadoDetail.mano_dominante || "Sin registrar"}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Sexo
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleadoDetail.sexo || "Sin registrar"}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Factor grupo sanguíneo
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleadoDetail.factor_grupo_sanguineo || "Sin registrar"}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Cantidad de hijos
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleadoDetail.cantidad_hijos}
                    </dd>
                  </div>
                </>
              )}
              {empleadoDetail?.Cargos?.length > 0 && (
                <>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Cargo actual
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleadoDetail.Cargos[0].descripcion}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Nombre empresa
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleadoDetail.Cargos[0].Empresa.nombre}
                    </dd>
                  </div>
                </>
              )}
            </dl>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 mb-2">
          <img
            src={
              empleadoDetail.foto_perfil_nombre ? FOTO_PERFIL : "./Person.svg"
            }
            alt="Imgen del perfil"
            className="w-40 h-40 border border-primary bg-gray-400 rounded-full ring-2 ring-secondary"
          />
          <span className="text-sm">Imagen del perfil</span>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3 mt-5 mb-5">
        <div className="md:col-span-3 flex justify-center items-center">
          <Button className="m-0 w-auto" onClick={handleGoBack}>
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
}
