import { clsx } from "clsx";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getAllEtniasActivas } from "../../redux/etnias/etniasActions";
import { putEmpleado } from "../../redux/empleados/empleadosActions";

import { Button, Hr, Input, Label, Select, Span, Title } from "../UI";

import { calcularEdad } from "../../utils/formatearFecha";
import validations from "../../utils/validacionesDatosPersonales";

import { MdCancel } from "react-icons/md";

export function DatosPersonales() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const etnias_activas = useSelector((state) => state.etnias.etnias_activas);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const FOTO_PERFIL = `${URL_SERVER}/documentos_empleados/documento/${empleado.tipo_identificacion}${empleado.numero_identificacion}/${empleado.foto_perfil_nombre}`;

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
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white">
      <Title>Datos Personales</Title>
      <br />
      <Hr />
      <br />
      <div className="flex flex-col items-center gap-8 mb-8">
        <img
          src={imagen}
          alt="Imgen del perfil"
          className="w-40 h-40 border border-[#002846] bg-gray-400 rounded-full ring-2 ring-[#F0C95C] "
        />
        <Span className="font-bold text-base">Imagen del perfil</Span>
      </div>

      {empleado && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <Span className="font-bold">Tipo de usuario</Span>
            <Span>{empleado.Role.descripcion}</Span>
          </div>
          <div>
            <Span className="font-bold">Nacionalidad</Span>
            <Span>
              {empleado.tipo_identificacion === "V"
                ? "Venezolano"
                : "Extranjero"}
            </Span>
          </div>
          <div>
            <Span className="font-bold">Número de identificación</Span>
            <Span>{empleado.numero_identificacion}</Span>
          </div>
          <div>
            <Span className="font-bold">Fecha nacimiento</Span>
            <Span>
              {empleado.fecha_nacimiento}
              {" ("}
              {calcularEdad(empleado.fecha_nacimiento)}
              {" años)"}
            </Span>
          </div>
          <div>
            <Label htmlFor="estado_civil" className="font-bold">
              Estado civil
            </Label>
            <Select
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
          </div>
          {empleado.rif ? (
            <div>
              <Span className="font-bold">RIF</Span>
              <Span>{empleado.rif}</Span>
            </div>
          ) : (
            <div>
              <Label htmlFor="rif" className="font-bold">
                RIF
              </Label>
              <Input
                id="rif"
                type="text"
                name="rif"
                value={datosPersonales.rif}
                onChange={handleInputChangeDatos}
                maxLength="20"
              />
            </div>
          )}
          <div>
            <Label
              htmlFor="telefono"
              errors={errors.telefono}
              className="font-bold"
            >
              Número de contacto
            </Label>
            <div className="relative">
              <Input
                id="telefono"
                type="tel" // Asegúrate de que el tipo sea "tel"
                name="telefono"
                errors={errors.telefono}
                value={datosPersonales.telefono}
                onChange={handleInputChangeDatos}
                placeholder="+58412XXXXXXX"
                maxLength="20"
              />
              {errors.telefono && (
                <MdCancel className="text-red-600 absolute right-2 top-1/2 transform -translate-y-1/2 text-xl" />
              )}
            </div>
            {errors.telefono && <Span className="m-0">{errors.telefono}</Span>}
          </div>
          <div>
            <Label
              htmlFor="correo"
              errors={errors.correo}
              className="font-bold"
            >
              Correo electrónico
            </Label>
            <div className="relative">
              <Input
                id="correo"
                type="email"
                name="correo"
                errors={errors.correo}
                value={datosPersonales.correo}
                onChange={handleInputChangeDatos}
                maxLength="150"
              />
              {errors.correo && (
                <MdCancel className="text-red-600 absolute right-2 top-1/2 transform -translate-y-1/2 text-xl" />
              )}
            </div>
            {errors.correo && <Span className="m-0">{errors.correo}</Span>}
          </div>
          <div>
            <Label htmlFor="etnia_id" className="font-bold">
              Etnia
            </Label>
            <Select
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
          </div>
          <div>
            <Label htmlFor="mano_dominante" className="font-bold">
              Mano dominante
            </Label>
            <Select
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
          </div>
          <div>
            <Label htmlFor="sexo" className="font-bold">
              Sexo
            </Label>
            <Select
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
          </div>

          {empleado.factor_grupo_sanguineo ? (
            <div>
              <Span className="font-bold">Factor grupo sanguíneo</Span>
              <Span>{empleado.factor_grupo_sanguineo}</Span>
            </div>
          ) : (
            <div>
              <Label htmlFor="factor_grupo_sanguineo" className="font-bold">
                Factor grupo sanguíneo
              </Label>
              <Select
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
            </div>
          )}
          <div>
            <Label htmlFor="cantidad_hijos" className="font-bold">
              Cantidad de hijos
            </Label>
            <Input
              id="cantidad_hijos"
              type="number"
              name="cantidad_hijos"
              value={datosPersonales.cantidad_hijos}
              onChange={handleValidateChildrens}
              min="0"
              max="15"
              onBlur={handleValidateChildrensEmpty}
            />
          </div>
          {empleado?.Cargos_Empleados?.length > 0 && (
            <>
              <div>
                <Span className="font-bold">Nombre empresa</Span>
                <Span>
                  {
                    empleado?.Cargos_Empleados[0]?.Cargos_Nivele.Cargo
                      .Departamento.Empresa.nombre
                  }
                </Span>
              </div>
              <div>
                <Span className="font-bold">Cargo actual</Span>
                <Span>
                  {
                    empleado?.Cargos_Empleados[0]?.Cargos_Nivele.Cargo
                      .descripcion
                  }{" "}
                  {empleado?.Cargos_Empleados[0]?.Cargos_Nivele.nivel}
                </Span>
              </div>
              <div className="mb-6 sm:col-span-2 md:col-span-3 mx-auto">
                <Button
                  disabled={Object.keys(errors).length}
                  className={clsx("m-0 ", {
                    "opacity-600": Object.keys(errors).length,
                  })}
                  onClick={handleSaveChanges}
                >
                  Guardar Cambios
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
