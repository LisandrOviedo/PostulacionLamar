//useState Es un Hook que te permite añadir estado a tus componentes funcionales y te re/renderiza el comp.
//useEffect Es un Hook de React que te permite ejecutar codigo al montar, desmontar y cuando cambie el estado sobre algo, de un componente
import { useState, useEffect } from "react";

//useDispatch es un Hook que te permite llenar un estado de Redux.
//useSelector es un Hook que te permite extraer datos del store (estado) de Redux.
import { useSelector } from "react-redux";

import { getEmpleadoExistencia } from "../../redux/empleados/empleadosActions";

import { postLiquidacion } from "../../redux/liquidaciones/liquidacionesActions";

import {
  Button,
  Date,
  Input,
  Label,
  Select,
  Span,
  Title,
  Hr,
  TextArea,
} from "../UI";

import { FaMagnifyingGlass, FaFloppyDisk } from "react-icons/fa6";

import validations from "../../utils/validacionesLiquidaciones";

import { MdCancel } from "react-icons/md";

import { calcularAntiguedad } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export function Liquidaciones() {
  /*En este caso, está accediendo a state.empleados.token, 
  lo que significa que está extrayendo el valor del token del objeto empleados dentro del estado. */
  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const [datosEmpleado, setDatosEmpleado] = useState({});

  //setErrors es la función que usarás para actualizar el estado "errors"
  const [errors, setErrors] = useState({});

  const [datosLiquidaciones, setLiquidaciones] = useState({
    tipo_identificacion: "V",
    numero_identificacion: "",
    sueldo: "",
    codigo: "",
    fecha: "",
    creado_por_id: empleado.empleado_id,
  });

  useEffect(() => {
    window.scroll(0, 0); // Desplaza la ventana a la parte superior izquierda de la página.

    document.title = "Grupo Lamar - Liquidaciones (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  const handleValidate = (e) => {
    const { name, value } = e.target; //Este parámetro representa el evento que desencadenó la función. En este caso, es un evento de entrada (Input).

    setLiquidaciones({ ...datosLiquidaciones, [name]: value }); //... y el nombre del estado hace que se mantenga la información del estado

    setErrors(validations({ ...datosLiquidaciones, [name]: value }));
  };

  const handleConvertirADecimales = (e) => {
    const { name, value } = e.target;

    if (value) {
      const numeroFormateado = Number.parseFloat(value).toFixed(2);

      setLiquidaciones({ ...datosLiquidaciones, [name]: numeroFormateado });

      setErrors(
        validations({
          ...datosLiquidaciones,
          [name]: numeroFormateado,
        })
      );
    }
  };

  const handleExistenciaEmpleado = async () => {
    if (!datosLiquidaciones.numero_identificacion) {
      setDatosEmpleado({});
      setLiquidaciones({
        ...datosLiquidaciones,
        empleado_id: "",
      });
    } else {
      setDatosEmpleado({});
      setLiquidaciones({
        ...datosLiquidaciones,
        empleado_id: "",
        cargo_empleado_id: "",
      });

      await getEmpleadoExistencia(
        token,
        datosLiquidaciones.tipo_identificacion,
        datosLiquidaciones.numero_identificacion,
        empleado.empresa_id
      ).then((data) => {
        if (data?.empleado_id) {
          setDatosEmpleado(data);
          setLiquidaciones({
            ...datosLiquidaciones,
            empleado_id: data.empleado_id,
            cargo_empleado_id: data.Cargos_Empleados[0]?.cargo_empleado_id
              ? data.Cargos_Empleados[0].cargo_empleado_id
              : "",
          });
        }
      });
    }
  };

  const handlePostLiquidaciones = async () => {
    await postLiquidacion(token, datosLiquidaciones);
  };

  //Este es el código que renderiza un formulario para las liquidaciones.
  /*En este caso, el return está devolviendo un conjunto de elementos JSX que forman la estructura del formulario para liquidaciones */
  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Liquidaciones</Title>
      </div>
      <Hr />
      <div className="flex flex-col place-content-between my-6">
        <Label
          htmlFor="numero_identificacion"
          errors={errors.numero_identificacion}
        >
          Número de identificación
        </Label>

        <div className="flex gap-2 items-center">
          <Select
            className="w-auto"
            name="tipo_identificacion"
            value={datosLiquidaciones.tipo_identificacion}
            onChange={handleValidate}
          >
            <option value="V">V</option>
            <option value="E">E</option>
          </Select>

          <div className="relative w-full">
            <Input
              id="numero_identificacion"
              name="numero_identificacion"
              className="pr-8"
              value={datosLiquidaciones.numero_identificacion}
              onChange={handleValidate}
              errors={errors.numero_identificacion}
            />
            {errors.numero_identificacion && (
              <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
            )}
          </div>

          <Button
            className="w-auto flex gap-2 items-center m-0"
            onClick={handleExistenciaEmpleado}
          >
            <FaMagnifyingGlass />
            <>Buscar</>
          </Button>
        </div>

        {errors.numero_identificacion && (
          <Span className="m-0">{errors.numero_identificacion}</Span>
        )}
      </div>

      {datosEmpleado?.empleado_id && (
        <div className="p-4 border rounded-lg shadow-md w-full">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-5 w-full">
            <div>
              <Span>Nombres</Span>
              <Span>{datosEmpleado?.nombres || "-"}</Span>
            </div>

            <div>
              <Span>Apellidos</Span>
              <Span>{datosEmpleado?.apellidos || "-"}</Span>
            </div>

            <div>
              <Span>Número de identificación</Span>
              <Span>
                {(datosEmpleado?.tipo_identificacion &&
                  datosEmpleado?.numero_identificacion) ||
                  "-"}
              </Span>
            </div>

            <div>
              <Span>Cargo actual</Span>
              <Span>
                {datosEmpleado?.Cargos_Empleados[0]?.Cargos_Nivele.Cargo
                  .descripcion || "-"}
              </Span>
            </div>

            <div>
              <Span>Empresa</Span>
              <Span>{datosEmpleado?.Empresa?.nombre || "-"}</Span>
            </div>

            <div>
              <Span>Unidad organizativa de adscripción</Span>
              <Span>
                {datosEmpleado?.Cargos_Empleados[0]?.Cargos_Nivele.Cargo
                  .Departamento.nombre || "-"}
              </Span>
            </div>

            <div>
              <Span>Fecha de ingreso</Span>
              <Span>
                {datosEmpleado?.Fichas_Ingresos[0]?.fecha_ingreso || "-"}
              </Span>
            </div>

            <div>
              <Span>Antigüedad</Span>
              <Span>
                {datosEmpleado?.Fichas_Ingresos[0]?.fecha_ingreso
                  ? `${calcularAntiguedad(
                      datosEmpleado?.Fichas_Ingresos[0]?.fecha_ingreso
                    )} días`
                  : "-"}
              </Span>
            </div>

            <div>
              <Span>Salario</Span>
              <Span>
                {datosEmpleado?.Cargos_Empleados[0]?.salario
                  ? `Bs. ${datosEmpleado?.Cargos_Empleados[0]?.salario}`
                  : "-"}
              </Span>
            </div>
          </div>
        </div>
      )}
      <br />
      <Title>Detalles de la Liquidación</Title>
      <Hr className="w-full my-5" />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 w-full">
        <div className="relative w-full">
          <Label htmlFor="codigo" errors={errors.codigo}>
            Código
          </Label>
          <div className="relative">
            <Input
              type="text"
              id="codigo"
              name="codigo"
              onChange={handleValidate}
              errors={errors.codigo}
              value={datosLiquidaciones.codigo}
            />
            {errors.codigo && (
              <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
            )}
          </div>
          {errors.codigo && <Span className="m-0">{errors.codigo}</Span>}
        </div>

        <div className="flex flex-col justify-start">
          <Label htmlFor="fecha_egreso" errors={errors.fecha}>
            Fecha egreso
          </Label>
          <div className="relative">
            <Date
              id="fecha_egreso"
              name="fecha_egreso"
              onChange={handleValidate}
              erros={errors.fecha}
            />
            {errors.fecha && (
              <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
            )}
          </div>
          {errors.fecha && <Span className="m-0">{errors.fecha}</Span>}
        </div>

        <div>
          <Label htmlFor="motivo_retiro">Motivo del retiro</Label>
          <Select
            id="motivo_retiro"
            name="motivo_retiro"
            onChange={handleValidate}
            value={datosLiquidaciones.motivo_retiro}
          >
            <option>Seleccione</option>
            <option>Abandono</option>
            <option>Despido</option>
            <option>Renuncia</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="causa">Causa</Label>
          <Input
            id="causa"
            name="causa"
            value={datosLiquidaciones.causa}
            onChange={handleValidate}
          />
        </div>
        <div>
          <Label htmlFor="ssst">SSST</Label>
          <TextArea
            id="ssst"
            name="ssst"
            value={datosLiquidaciones.ssst}
            onChange={handleValidate}
            rows="2"
          />
        </div>

        <div className="flex flex-col justify-start">
          <Label
            htmlFor="anticipos_prestamos"
            errors={errors.anticipos_prestamos}
          >
            Anticipos y prestamos
          </Label>

          <div className="relative">
            <Input
              id="anticipos_prestamos"
              name="anticipos_prestamos"
              onChange={handleValidate} // Esta línea llama a tu función de validación
              onBlur={handleConvertirADecimales}
              errors={errors.anticipos_prestamos}
              value={datosLiquidaciones.anticipos_prestamos}
              className="pr-8" // padding a la derecha para que no tenga conflicto con el icono de validacion
              type="number"
              min="1"
            />
            {errors.sueldo && (
              <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
            )}
          </div>

          {errors.anticipos_prestamos && (
            <Span className="m-0">{errors.anticipos_prestamos}</Span>
          )}
        </div>

        <div>
          <div className="flex flex-col justify-start">
            <Label
              htmlFor="vacaciones_vencidas"
              errors={errors.vacaciones_vencidas}
            >
              Vacaciones vencidas
            </Label>

            <div className="relative">
              <Input
                id="vacaciones_vencidas"
                name="vacaciones_vencidas"
                onChange={handleValidate} // Esta línea llama a tu función de validación
                onBlur={handleConvertirADecimales}
                value={datosLiquidaciones.vacaciones_vencidas}
                errors={errors.sueldo}
                className="pr-8" // padding a la derecha para que no tenga conflicto con el icono de validacion
                type="number"
                min="1"
              />
              {errors.sueldo && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
            {errors.vacaciones_vencidas && (
              <Span className="m-0">{errors.vacaciones_vencidas}</Span>
            )}
          </div>
        </div>

        <div>
          <div className="flex flex-col justify-start">
            <Label
              htmlFor="dias_cesta_ticket"
              errors={errors.dias_cesta_ticket}
            >
              Días de cesta ticket
            </Label>

            <div className="relative">
              <Input
                id="dias_cesta_ticket"
                name="dias_cesta_ticket"
                onChange={handleValidate} // Esta línea llama a tu función de validación
                onBlur={handleConvertirADecimales}
                errors={errors.sueldo}
                value={datosLiquidaciones.dias_cesta_ticket}
                type="number"
                min="1"
                max="99"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start">
          <Label htmlFor="poliza_hcm" errors={errors.poliza_hcm}>
            Poliza HCM
          </Label>

          <div className="relative">
            <Input
              id="poliza_hcm"
              name="poliza_hcm"
              onChange={handleValidate} // Esta línea llama a tu función de validación
              onBlur={handleConvertirADecimales}
              errors={errors.poliza_hcm}
              value={datosLiquidaciones.poliza_hcm}
              className="pr-8" // padding a la derecha para que no tenga conflicto con el icono de validacion
              type="number"
              min="1"
            />
            {errors.poliza_hcm && (
              <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
            )}
          </div>
          {errors.poliza_hcm && (
            <Span className="m-0">{errors.poliza_hcm}</Span>
          )}
        </div>
        <div>
          <div className="flex flex-col justify-start">
            <Label htmlFor="bonificacion" errors={errors.bonificacion}>
              Bonificación
            </Label>

            <div className="relative">
              <Input
                id="bonificacion"
                name="bonificacion"
                onChange={handleValidate} // Esta línea llama a tu función de validación
                onBlur={handleConvertirADecimales}
                errors={errors.bonificacion}
                value={datosLiquidaciones.bonificacion}
                className="pr-8" // padding a la derecha para que no tenga conflicto con el icono de validacion
                type="number"
                min="1"
              />
              {errors.sueldo && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
            {errors.bonificacion && (
              <Span className="m-0">{errors.bonificacion}</Span>
            )}
          </div>
        </div>
        <div className="mx-auto sm:col-span-2 md:col-span-3">
          <Button
            className="m-0 w-auto flex items-center gap-2"
            onClick={handlePostLiquidaciones}
          >
            {/*Es un icono de la libreria react icons */}
            <FaFloppyDisk />
            <>Guardar</>
          </Button>
        </div>
      </div>
    </div>
  );
}
