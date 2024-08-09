import { clsx } from "clsx";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getAllEtniasActivas } from "../../redux/etnias/etniasActions";
import { putEmpleado } from "../../redux/empleados/empleadosActions";

import { Button, Hr, Input, Select, Title } from "../UI";

import { calcularEdad } from "../../utils/formatearFecha";
import validations from "../../utils/validacionesDatosPersonales";

import Swal from "sweetalert2";

export function DatosPersonales() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const etnias_activas = useSelector((state) => state.etnias.etnias_activas);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;
  const FOTO_PERFIL = `${URL_SERVER}/documentos_empleados/documento/${empleado.numero_identificacion}/${empleado.foto_perfil_nombre}`;

  const [imagen, setImagen] = useState(
    empleado.foto_perfil_nombre ? FOTO_PERFIL : "./Person.svg"
  );

  const [datosPersonales, setDatosPersonales] = useState({
    empleado_id: empleado.empleado_id,
    estado_civil: empleado.estado_civil || "Sin registrar",
    rif: empleado.rif || "",
    telefono: empleado.telefono || "",
    correo: empleado.correo || "",
    etnia_id: empleado.etnia_id || "Ninguna",
    mano_dominante: empleado.mano_dominante || "Sin registrar",
    sexo: empleado.sexo || "Sin registrar",
    factor_grupo_sanguineo: empleado.factor_grupo_sanguineo || "Sin registrar",
    cantidad_hijos: empleado.cantidad_hijos,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scroll(0, 0);

    document.title = "Grupo Lamar - Datos Personales";

    dispatch(getAllEtniasActivas(token));

    return () => {
      document.title = "Grupo Lamar";
    };
  }, [empleado]);

  const handleInputChangeDatos = (event) => {
    const { name, value } = event.target;

    setDatosPersonales({ ...datosPersonales, [name]: value });
    setErrors(validations({ ...datosPersonales, [name]: value }));
  };

  const handleValidateChildrens = () => {
    const input = document.getElementById("cantidad_hijos");

    if (input.value < 0) {
      input.value = input.value.slice(1);
    }

    if (input.value > 15) {
      input.value = 15;
    }

    setDatosPersonales({ ...datosPersonales, cantidad_hijos: input.value });
  };

  const handleValidateChildrensEmpty = () => {
    const input = document.getElementById("cantidad_hijos");

    if (!input.value || input.value == "-0") {
      input.value = 0;
    }

    setDatosPersonales({ ...datosPersonales, cantidad_hijos: input.value });
  };

  const handleSaveChanges = () => {
    dispatch(putEmpleado(token, datosPersonales));
  };

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
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Tipo de usuario
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.Role.descripcion}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Nombre completo
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.nombres} {empleado.apellidos}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Nacionalidad
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.tipo_identificacion === "V"
                      ? "Venezolano"
                      : "Extranjero"}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Número de identificación
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.numero_identificacion}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
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
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Estado civil
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <Select
                      className="w-auto"
                      id="estado_civil"
                      name="estado_civil"
                      value={datosPersonales.estado_civil}
                      onChange={handleInputChangeDatos}
                    >
                      {!empleado.estado_civil ? (
                        <option value="Sin registrar">Sin registrar</option>
                      ) : null}
                      <option value="Soltero(a)">Soltero(a)</option>
                      <option value="Casado(a)">Casado(a)</option>
                      <option value="Viudo(a)">Viudo(a)</option>
                      <option value="Divorciado(a)">Divorciado(a)</option>
                      <option value="Concubino">Concubino</option>
                    </Select>
                  </dd>
                </div>
                {empleado.rif ? (
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      RIF
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleado.rif}
                    </dd>
                  </div>
                ) : (
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      RIF
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <Input
                        className="w-auto"
                        id="rif"
                        type="text"
                        name="rif"
                        value={datosPersonales.rif}
                        onChange={handleInputChangeDatos}
                        placeholder="123456789"
                        maxLength="20"
                      />
                      {errors.rif && (
                        <p className="text-xs sm:text-sm text-red-700 font-bold text-center">
                          {errors.rif}
                        </p>
                      )}
                    </dd>
                  </div>
                )}
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Número de contacto
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <Input
                      className="w-auto"
                      id="telefono"
                      type="tel"
                      name="telefono"
                      value={datosPersonales.telefono}
                      onChange={handleInputChangeDatos}
                      placeholder="+58412XXXXXXX"
                      maxLength="20"
                    />
                    {errors.telefono && (
                      <p className="text-xs sm:text-sm text-red-700 font-bold text-center">
                        {errors.telefono}
                      </p>
                    )}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Correo electrónico
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <Input
                      className="w-auto"
                      id="correo"
                      type="text"
                      name="correo"
                      value={datosPersonales.correo}
                      onChange={handleInputChangeDatos}
                      placeholder="ejemplo@ejemplo.com"
                      maxLength="150"
                    />
                    {errors.correo && (
                      <p className="text-xs sm:text-sm text-red-700 font-bold text-center">
                        {errors.correo}
                      </p>
                    )}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
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
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Mano dominante
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <Select
                      className="w-auto"
                      id="mano_dominante"
                      name="mano_dominante"
                      value={datosPersonales.mano_dominante}
                      onChange={handleInputChangeDatos}
                    >
                      {!empleado.mano_dominante ? (
                        <option value="Sin registrar">Sin registrar</option>
                      ) : null}
                      <option value="Derecha">Derecha</option>
                      <option value="Izquierda">Izquierda</option>
                    </Select>
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Sexo
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <Select
                      className="w-auto"
                      id="sexo"
                      name="sexo"
                      value={datosPersonales.sexo}
                      onChange={handleInputChangeDatos}
                    >
                      {!empleado.sexo ? (
                        <option value="Sin registrar">Sin registrar</option>
                      ) : null}
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                    </Select>
                  </dd>
                </div>
                {empleado.factor_grupo_sanguineo ? (
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Factor grupo sanguíneo
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleado.factor_grupo_sanguineo}
                    </dd>
                  </div>
                ) : (
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Factor Grupo Sanguíneo
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <Select
                        className="w-auto"
                        id="factor_grupo_sanguineo"
                        name="factor_grupo_sanguineo"
                        value={datosPersonales.factor_grupo_sanguineo}
                        onChange={handleInputChangeDatos}
                      >
                        <option value="Sin registrar">Sin registrar</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="AB+">AB+</option>
                        <option value="O+">O+</option>
                        <option value="A-">A-</option>
                        <option value="B-">B-</option>
                        <option value="AB-">AB-</option>
                        <option value="O-">O-</option>
                      </Select>
                    </dd>
                  </div>
                )}
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:items-center">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Cantidad de hijos
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <Input
                      className="w-auto"
                      id="cantidad_hijos"
                      type="number"
                      name="cantidad_hijos"
                      value={datosPersonales.cantidad_hijos}
                      onChange={handleValidateChildrens}
                      min="0"
                      max="15"
                      onBlur={handleValidateChildrensEmpty}
                    />
                  </dd>
                </div>
              </>
            )}
            {empleado?.Cargos_Niveles?.length > 0 &&
              empleado?.Cargos_Niveles?.length > 0 && (
                <>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Nombre empresa
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {
                        empleado?.Cargos_Niveles[0]?.Cargo.Departamento.Empresa
                          .nombre
                      }
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Cargo actual
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleado?.Cargos_Niveles[0]?.Cargo.descripcion}{" "}
                      {empleado?.Cargos_Niveles[0]?.nivel}
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
          <Button
            disabled={Object.keys(errors).length}
            className={clsx("m-0 w-auto ", {
              "opacity-50": Object.keys(errors).length,
            })}
            onClick={handleSaveChanges}
          >
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
}
