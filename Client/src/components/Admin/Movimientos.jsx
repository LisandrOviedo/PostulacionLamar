//useState Es un Hook que te permite añadir estado a tus componentes funcionales y te re/renderiza el comp.
//useEffect Es un Hook de React que te permite ejecutar codigo al montar, desmontar y cuando cambie el estado sobre algo, de un componente
import { useState, useEffect } from "react";

//useDispatch es un Hook que te permite llenar un estado de Redux.
//useSelector es un Hook que te permite extraer datos del store (estado) de Redux.
import { useDispatch, useSelector } from "react-redux";

import { getAllEmpresasActivas } from "../../redux/empresas/empresasActions";

import {
  getAllDepartamentosActivos,
  resetDepartamentos,
} from "../../redux/departamentos/departamentosActions";

import {
  getAllCargosNivelesActivos,
  resetCargosNiveles,
} from "../../redux/cargosNiveles/cargosNivelesActions";

import {
  getAllCargosActivos,
  resetCargos,
} from "../../redux/cargos/cargosActions";

import {
  Button,
  CheckBox,
  Date,
  Input,
  Label,
  Select,
  Span,
  Title,
  Hr,
  TextArea,
} from "../UI"; //son componentes para reutilizar

import { FaMagnifyingGlass, FaFloppyDisk } from "react-icons/fa6";

import validations from "../../utils/validacionesMovimientos";

import { MdCancel } from "react-icons/md";

export function Movimientos() {
  //dispatch es esencial para comunicar cambios en el estado de tu aplicación a través de acciones
  const dispatch = useDispatch();

  /*En este caso, está accediendo a state.empleados.token, 
  lo que significa que está extrayendo el valor del token del objeto empleados dentro del estado. */
  const token = useSelector((state) => state.empleados.token);

  /*Toma todo el estado de Redux como argumento y devuelve la propiedad 
  filtros del slice empleados del estado */
  const filtros = useSelector((state) => state.empleados.filtros);

  const empleado = useSelector((state) => state.empleados.empleado);

  const empresas_activas = useSelector(
    (state) => state.empresas.empresas_activas
  );

  const departamentos_activos = useSelector(
    (state) => state.departamentos.departamentos_activos
  );

  const cargos_activos = useSelector((state) => state.cargos.cargos_activos);

  const cargos_niveles_activos = useSelector(
    (state) => state.cargos_niveles.cargos_niveles_activos
  );

  //setErrors es la función que usarás para actualizar el estado "errors"
  const [errors, setErrors] = useState({});

  const [datosMovimiento, setDatosMovimiento] = useState({
    tipo_identificacion: "V",
    numero_identificacion: "",
    duracion_movimiento: "Temporal",
    clase_movimiento: "Seleccione",
    duracion_movimiento_desde: "",
    duracion_movimiento_hasta: "",
    duracion_periodo_prueba: "",
    vigencia_movimiento_desde: "",
    vigencia_movimiento_hasta: "",
    frecuencia_nomina: "",
    sueldo_actual: "",
    numero_identificacion_solicitante: "",
    tipo_identificacion_solicitante: "V",
    nuevo_sueldo: "1",
    codigo_nomina: "",
    numero_identificacion_supervisor: "",
    tipo_identificacion_supervisor: "v",
    tipo_identificacion_gerencia: "V",
    numero_identificacion_gerencia: "",
    numero_identificacion_tthh: "",
    tipo_identificacion_tthh: "V",
  });

  useEffect(() => {
    window.scroll(0, 0); //window.scroll(0, 0): Desplaza la ventana a la parte superior izquierda de la página.
    document.title = "Grupo Lamar - Movimientos (Admin)";

    dispatch(getAllEmpresasActivas(token));

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    if (
      datosMovimiento.empresa_id &&
      datosMovimiento.empresa_id !== "Seleccione"
    ) {
      dispatch(resetDepartamentos());
      dispatch(resetCargos());
      dispatch(resetCargosNiveles());
      setDatosMovimiento({ ...datosMovimiento, departamento_id: "Seleccione" });
      dispatch(getAllDepartamentosActivos(token, datosMovimiento.empresa_id));
    } else {
      dispatch(resetDepartamentos());
      dispatch(resetCargos());
      dispatch(resetCargosNiveles());
      setDatosMovimiento({ ...datosMovimiento, departamento_id: "Seleccione" });
    }
  }, [datosMovimiento.empresa_id]);

  useEffect(() => {
    if (
      datosMovimiento.departamento_id &&
      datosMovimiento.departamento_id !== "Seleccione"
    ) {
      dispatch(resetCargos());
      dispatch(resetCargosNiveles());
      setDatosMovimiento({ ...datosMovimiento, cargo_id: "Seleccione" });
      dispatch(getAllCargosActivos(token, datosMovimiento.departamento_id));
    } else {
      dispatch(resetCargos());
      dispatch(resetCargosNiveles());
      setDatosMovimiento({ ...datosMovimiento, cargo_id: "Seleccione" });
    }
  }, [datosMovimiento.departamento_id]);

  useEffect(() => {
    if (datosMovimiento.cargo_id && datosMovimiento.cargo_id !== "Seleccione") {
      dispatch(resetCargosNiveles());
      setDatosMovimiento({ ...datosMovimiento, cargo_nivel_id: "Seleccione" });
      dispatch(getAllCargosNivelesActivos(token, datosMovimiento.cargo_id));
    } else {
      dispatch(resetCargosNiveles());
      setDatosMovimiento({ ...datosMovimiento, cargo_nivel_id: "Seleccione" });
    }
  }, [datosMovimiento.cargo_id]);

  //Cada vez que el usuario cambia el valor de un campo, handleValidate se encarga de validar la entrada y actualizar el estado del formulario.
  const handleValidate = (e) => {
    const { name, value } = e.target; //Este parámetro representa el evento que desencadenó la función. En este caso, es un evento de entrada (Input).

    setDatosMovimiento({ ...datosMovimiento, [name]: value }); //... y el nombre del estado hace que se mantenga la información del estado

    setErrors(validations({ ...datosMovimiento, [name]: value }));
  };

  const handleConvertirADecimales = (e) => {
    const { name, value } = e.target;

    const numeroFormateado = Number.parseFloat(value).toFixed(2);

    setDatosMovimiento({ ...datosMovimiento, [name]: numeroFormateado });

    setErrors(validations({ ...datosMovimiento, [name]: numeroFormateado }));
  };

  const handleCheckedValidate = (event) => {
    const { name, checked } = event.target;

    setDatosMovimiento({ ...datosMovimiento, [name]: checked });
  };

  //Este es el código que renderiza un formulario para los movimientos.
  /*En este caso, el return está devolviendo un conjunto de elementos JSX que forman la estructura del formulario para movimientos */
  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Movimientos</Title>
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
            value={datosMovimiento.tipo_identificacion}
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
              value={datosMovimiento.numero_identificacion}
              onChange={handleValidate}
              errors={errors.numero_identificacion}
            />
            {errors.numero_identificacion && (
              <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
            )}
          </div>

          <Button className="w-auto flex gap-2 items-center m-0">
            <FaMagnifyingGlass />
            <span>Buscar</span>
          </Button>
        </div>

        <span className="text-sm text-gray-500">
          {errors.numero_identificacion}
        </span>
      </div>

      <div className="p-4 border rounded-lg shadow-md w-full">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 w-full">
          <div>
            <span>Nombres</span>
            {/*El componente <Label> en tu código se utiliza para renderizar un componente de etiqueta label asociada a un campo de entrada en un formulario. */}
            <br />
            <span>{datosMovimiento.nombres || "-"}</span>
          </div>

          <div>
            <span>Apellidos</span>
            <br />
            <span>{datosMovimiento.apellidos || "-"}</span>
          </div>
          <div>
            <span>Número de identificación</span>
            <br />
            <span>
              {(datosMovimiento.tipo_identificacion &&
                datosMovimiento.numero_identificacion) ||
                "-"}
            </span>
          </div>
          <div>
            <span>Código de Nómina</span>
            <br />
            <span>{datosMovimiento.codigo_nomina || "-"}</span>
          </div>

          <div>
            <span>Cargo Actual</span>
            <br />
            <span>{datosMovimiento.cargo_actual || "-"}</span>
          </div>

          <div>
            <span>Empresa</span>
            <br />
            <span>{datosMovimiento.empresa || "-"}</span>
          </div>
          <div>
            <span>Unidad Organizativa De Adscripción</span>
            <br />
            <span>{datosMovimiento.unidad_organizativa || "-"}</span>
          </div>

          <div>
            <span>Fecha de Ingreso</span>
            <br />
            <span>{datosMovimiento.fecha_ingreso || "-"}</span>
          </div>
          <div>
            <span>Antigüedad</span>
            <br />
            <span>{datosMovimiento.antiguedad || "-"}</span>
          </div>
          <div>
            <span>Sueldo Actual</span>
            <br />
            <span>{datosMovimiento.sueldo_actual || "-"}</span>
          </div>

          <div>
            <span>Tipo de Nómina</span>
            <br />
            <span>{datosMovimiento.tipo_nomina || "-"}</span>
          </div>

          <div>
            <span>Frecuencia de Nómina</span>
            <br />
            <span>{datosMovimiento.frecuencia_nomina || "-"}</span>
          </div>
        </div>
      </div>

      <br />
      <Title>Detalle del Movimiento Organizativo</Title>
      <Hr className="w-full my-5" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full">
        {/* Clase de Movimiento */}
        <div>
          <Label htmlFor="clase_movimiento">Clase De Movimiento</Label>
          <Select
            id="clase_movimiento"
            name="clase_movimiento"
            onChange={handleValidate}
          >
            <option value="Seleccione">Seleccione</option>
            <option value="Transferencia entre Empresas">
              Transferencia entre Empresas
            </option>
            <option value="Reasignacion de funciones">
              Reasignacion de funciones
            </option>
            <option value="redenominacion">Redenominacion de cargo</option>
            <option value="promocion">Promocion</option>
            <option value="cambio_sede_misma_empresa">
              Cambio de sede (misma empresa)
            </option>
            <option value="cambio_dpto_misma_empresa">
              Cambio de departamento (misma empresa)
            </option>
            <option value="ajuste_sueldo">Ajuste de sueldo</option>
            <option value="cambio_nomina">Cambio de nómina</option>
            <option value="otro">Otro</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="duracion_movimiento">Duración De Movimiento</Label>
          <Select
            id="duracion_movimiento"
            name="duracion_movimiento"
            onChange={handleValidate}
            value={datosMovimiento.duracion_movimiento}
          >
            <option value="Temporal">Temporal</option>
            {datosMovimiento.clase_movimiento !== "periodo_prueba" && (
              <option value="Permanente">Permanente</option>
            )}
          </Select>
        </div>
        {datosMovimiento.duracion_movimiento === "Temporal" && (
          <>
            <div>
              <Label htmlFor="duracion_movimiento_desde">Fecha Desde</Label>
              <Date
                id="duracion_movimiento_desde"
                name="duracion_movimiento_desde"
                type="date" //se cambia tipo date, numer o text password email
                onChange={handleValidate}
                value={datosMovimiento.duracion_movimiento_desde}
                errors={errors.duracion_movimiento}
              />
            </div>
            <div>
              <Label htmlFor="duracion_movimiento_hasta">Fecha Hasta</Label>
              <Date
                id="duracion_movimiento_hasta"
                name="duracion_movimiento_hasta"
                type="date"
                onChange={handleValidate}
                value={datosMovimiento.duracion_movimiento_hasta}
                errors={errors.duracion_movimiento}
              />
              <span className="text-sm text-gray-500">
                {errors.duracion_movimiento}
              </span>
            </div>
          </>
        )}
        <div className="flex items-center justify-center gap-2">
          <CheckBox
            id="periodo_prueba"
            name="periodo_prueba"
            onChange={handleCheckedValidate}
          />
          <Label className="select-none" htmlFor="periodo_prueba">
            ¿Requiere periodo de prueba?
          </Label>
        </div>
        {datosMovimiento.periodo_prueba && (
          <div>
            <Label htmlFor="duracion_periodo_prueba">
              Duración De Periodo De Prueba
            </Label>
            <Input
              id="duracion_periodo_prueba"
              name="duracion_periodo_prueba"
              type="number"
              min="1"
              max="90"
              onChange={handleValidate}
              value={datosMovimiento.duracion_periodo_prueba || 1}
            />
          </div>
        )}
        <div className="sm:col-span-2 md:col-span-3">
          <Label htmlFor="justificacion">
            Justificación Del Movimiento Organizativo
          </Label>
          <TextArea
            id="justificacion"
            name="justificacion"
            onChange={handleValidate}
            value={datosMovimiento.justificacion}
            rows="5"
          />
        </div>
      </div>
      <br />
      <Title>Nueva Condición Laboral Del Trabajador</Title>
      <Hr className="w-full my-5" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full">
        {/* Nueva Condición Laboral del Trabajador */}
        {(datosMovimiento.clase_movimiento !== "cambio_sede_misma_empresa" ||
          datosMovimiento.clase_movimiento !== "cambio_dpto_misma_empresa") && (
          <div>
            <Label htmlFor="empresa_id">Empresa</Label>

            <Select
              className="w-full"
              id="empresa_id"
              name="empresa_id"
              value="Seleccione"
              onChange={handleValidate}
            >
              <option>Seleccione</option>
              {empresas_activas?.length
                ? empresas_activas?.map(
                    (empresa, i) =>
                      empresa.activo && (
                        <option
                          key={i}
                          name={empresa.nombre}
                          value={empresa.empresa_id}
                        >
                          {empresa.nombre}
                        </option>
                      )
                  )
                : null}
            </Select>
          </div>
        )}
        <div>
          <Label htmlFor="departamento_id">Departamento</Label>
          <Select
            className="w-full"
            id="departamento_id"
            name="departamento_id"
            value="Seleccione"
            onChange={handleValidate}
          >
            <option>Seleccione</option>
            {departamentos_activos?.length
              ? departamentos_activos?.map(
                  (departamento, i) =>
                    departamento.activo && (
                      <option
                        key={i}
                        name={departamento.nombre}
                        value={departamento.departamento_id}
                      >
                        {departamento.nombre}
                      </option>
                    )
                )
              : null}
          </Select>
        </div>
        <div>
          <Label htmlFor="cargo_id">Cargo</Label>
          <Select
            className="w-full"
            id="cargo_id"
            name="cargo_id"
            value="Seleccione"
            onChange={handleValidate}
          >
            <option>Seleccione</option>
            {cargos_activos?.length
              ? cargos_activos?.map(
                  (cargo, i) =>
                    cargo.activo && (
                      <option
                        key={i}
                        name={cargo.descripcion}
                        value={cargo.cargo_id}
                      >
                        {cargo.descripcion}
                      </option>
                    )
                )
              : null}
          </Select>
        </div>
        <div>
          <Label htmlFor="cargo_nivel_id">Nivel Del Cargo</Label>
          <Select
            className="w-full"
            id="cargo_nivel_id"
            name="cargo_nivel_id"
            value="Seleccione"
            onChange={handleValidate}
          >
            <option>Seleccione</option>
            {cargos_niveles_activos?.length
              ? cargos_niveles_activos?.map(
                  (cargo_nivel, i) =>
                    cargo_nivel.activo && (
                      <option
                        key={i}
                        name={cargo_nivel.nivel}
                        value={cargo_nivel.cargo_nivel_id}
                      >
                        {cargo_nivel.nivel}
                      </option>
                    )
                )
              : null}
          </Select>
        </div>
        <div>
          <Label htmlFor="vigencia_movimiento_desde">
            Vigencia del Movimiento Fecha Desde
          </Label>
          <Date
            type="date"
            id="vigencia_movimiento_desde"
            name="vigencia_movimiento_desde"
            onChange={handleValidate}
            value={datosMovimiento.vigencia_movimiento_desde}
            errors={errors.vigencia_movimiento}
          />
        </div>
        <div>
          <Label htmlFor="vigencia_movimiento_hasta">
            Vigencia del Movimiento Fecha Hasta
          </Label>
          <Date
            type="date"
            id="vigencia_movimiento_hasta"
            name="vigencia_movimiento_hasta"
            onChange={handleValidate}
            value={datosMovimiento.vigencia_movimiento_hasta}
            errors={errors.vigencia_movimiento}
          />
          <span>{errors.vigencia_movimiento}</span>
        </div>
        {/* Tipo de Nómina */}
        <div>
          <Label htmlFor="nuevo_tipo_nomina">Tipo de Nómina</Label>
          <Select id="nuevo_tipo_nomina" name="nuevo_tipo_nomina">
            <option value="Empleados">Empleados</option>
            <option value="Contratados">Contratados</option>
          </Select>
        </div>
        {/* Frecuencia de Nómina */}
        <div>
          <Label htmlFor="nueva_frecuencia_nomina">Frecuencia de Nómina</Label>
          <Select id="nueva_frecuencia_nomina" name="nueva_frecuencia_nomina">
            <option value="Semanal">Semanal</option>
            <option value="Quincenal">Quincenal</option>
            <option value="Mensual">Mensual</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="nuevo_sueldo" errors={errors.nuevo_sueldo}>
            Nuevo Sueldo
          </Label>

          <div className="relative">
            <Input
              id="nuevo_sueldo"
              name="nuevo_sueldo"
              onChange={handleValidate} // Esta línea llama a tu función de validación
              onBlur={handleConvertirADecimales}
              errors={errors.nuevo_sueldo}
              maxLength="5" //maximo de digitos
              className="pr-8" // padding a la derecha para que no tenga conflicto con el icono de validacion
              value={datosMovimiento.nuevo_sueldo}
              type="number"
              min="1"
            />
            {errors.nuevo_sueldo && (
              <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
            )}
          </div>
          <span className="text-sm text-gray-500">{errors.nuevo_sueldo}</span>
        </div>

        <div>
          <Label htmlFor="codigo_nomina" errors={errors.codigo_nomina}>
            Código de Nómina
          </Label>
          <div className="relative">
            <Input
              id="codigo_nomina"
              name="codigo_nomina"
              onChange={handleValidate}
              errors={errors.codigo_nomina}
              value={datosMovimiento.codigo_nomina}
            />
            {errors.codigo_nomina && (
              <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
            )}
          </div>
          <span className="text-sm text-gray-500">{errors.codigo_nomina}</span>
        </div>
      </div>
      <br />

      <Title>Datos Del Solicitante</Title>
      <Hr className="w-full my-5" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full">
        <div>
          <Label
            htmlFor="numero_identificacion_solicitante"
            errors={errors.numero_identificacion_solicitante}
          >
            Número de identificación
          </Label>
          <div className="flex justify-between gap-2">
            <Select
              className="w-auto"
              name="tipo_identificacion_solicitante"
              value={datosMovimiento.tipo_identificacion_solicitante}
              onChange={handleValidate}
            >
              <option value="V">V</option>
              <option value="E">E</option>
            </Select>
            <div className="relative w-full">
              <Input
                id="numero_identificacion_solicitante"
                name="numero_identificacion_solicitante"
                onChange={handleValidate}
                value={datosMovimiento.numero_identificacion_solicitante}
                errors={errors.numero_identificacion_solicitante}
              />
              {errors.numero_identificacion_solicitante && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
          </div>
          <span className="text-sm text-gray-500">
            {errors.numero_identificacion_solicitante}
          </span>
        </div>

        <div>
          <Span>Nombre Completo</Span>
          <span>-</span>
        </div>
        <div>
          <Span>Cargo</Span>
          <span>-</span>
        </div>
      </div>
      <br />
      <Title>Supervisor Inmediato</Title>
      <Hr className="w-full my-5" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full">
        <div>
          <Label
            htmlFor="numero_identificacion_supervisor"
            errors={errors.numero_identificacion_supervisor}
          >
            Número de identificación
          </Label>
          <div className="flex justify-between gap-2">
            <Select
              className="w-auto"
              name="tipo_identificacion_supervisor"
              onChange={handleValidate}
              errors={errors.numero_identificacion_supervisor}
            >
              <option value="V">V</option>
              <option value="E">E</option>
            </Select>

            <div className="relative w-full">
              <Input
                id="numero_identificacion_supervisor"
                name="numero_identificacion_supervisor"
                onChange={handleValidate}
                errors={errors.numero_identificacion_supervisor}
              />
              {errors.numero_identificacion_supervisor && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
          </div>
          <span className="text- sm text-gray-500">
            {errors.numero_identificacion_supervisor}
          </span>
        </div>
        <div>
          <Span>Nombre Completo</Span>
          <span>-</span>
        </div>
        <div>
          <Span>Cargo</Span>
          <span>-</span>
        </div>
      </div>

      <br />
      <Title>Aprobación Gerencia De Área</Title>
      <Hr className="w-full my-5" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full">
        <div>
          <Label htmlFor="numero_identificacion_gerencia">
            Número de identificación
          </Label>
          <div className="flex justify-between gap-2">
            <Select
              className="w-auto"
              name="tipo_identificacion_gerencia"
              onChange={handleValidate}
              errors={errors.numero_identificacion_gerencia}
            >
              <option value="V">V</option>
              <option value="E">E</option>
            </Select>

            <div className="relative w-full">
              <Input
                id="numero_identificacion_gerencia"
                name="numero_identificacion_gerencia"
                onChange={handleValidate}
                errors={errors.numero_identificacion_gerencia}
              />
              {errors.numero_identificacion_gerencia && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
          </div>
          <span className="text- sm text-gray-500">
            {errors.numero_identificacion_gerencia}
          </span>
        </div>
        <div>
          <Span>Nombre Completo</Span>
          <span>-</span>
        </div>
        <div>
          <Span>Cargo</Span>
          <span>-</span>
        </div>
      </div>
      <br />

      <Title>Talento Humano</Title>
      <Hr className="w-full my-5" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full">
        <div>
          <Label htmlFor="numero_identificacion_tthh">
            Número de identificación
          </Label>
          <div className="flex justify-between gap-2">
            <Select
              className="w-auto"
              name="tipo_identificacion_tthh"
              onChange={handleValidate}
            >
              <option value="V">V</option>
              <option value="E">E</option>
            </Select>

            <div className="relative w-full">
              <Input
                id="numero_identificacion_tthh"
                name="numero_identificacion_tthh"
                onChange={handleValidate}
                errors={errors.numero_identificacion_tthh}
              />
              {errors.numero_identificacion_tthh && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
          </div>
          <span className="text- sm text-gray-500">
            {errors.numero_identificacion_tthh}
          </span>
        </div>
        <div>
          <Span>Nombre Completo</Span>
          <span>-</span>
        </div>
        <div>
          <Span>Cargo</Span>
          <span>-</span>
        </div>
      </div>

      <div className="mx-auto sm:col-span-2 md:col-span-3">
        <Button className="w-auto flex items-center gap-2">
          {/*Es un icono de la libreria react icons */}
          <FaFloppyDisk />
          <span>Guardar</span>
        </Button>
      </div>
    </div>
  );
}
