import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEmpleados,
  postFiltros,
  deleteFiltros,
} from "../../redux/empleados/empleadosActions";
import { Button, Input, Label, Select, Title, Hr } from "../UI";
import { FaMagnifyingGlass, FaFloppyDisk } from "react-icons/fa6";
import { YYYYMMDD } from "../../utils/formatearFecha";

export function Movimientos() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.empleados.token);
  const filtros = useSelector((state) => state.empleados.filtros);

  const [errors, setErrors] = useState({});
  const [filters, setFilters] = useState({
    numero_identificacion: filtros.numero_identificacion || "",
    activo: 1,
  });
  const [datosMovimiento, setDatosMovimimento] = useState({
    tipo_identificacion: "V",
    tipo_movimiento: "Temporal",
    numero_identificacion: "",
    nombres: "",
    apellidos: "",
    codigo_nomina: "",
    cargo_actual: "",
    empresa: "",
    sueldo_actual: "",
    unidad_organizativa: "",
    antiguedad: "",
    fecha_ingreso: YYYYMMDD(),
    tipo_nomina: "Empleados",
    frecuencia_nomina: "Semanal",
    clase_movimiento: "",
    tipo_movimiento: "Temporal",
    duracion_movimiento: "",
    justificacion: "",
    nuevo_cargo: "",
    nueva_empresa: "",
    nueva_unidad_organizativa: "",
    vigencia_movimiento_desde: "",
    vigencia_movimiento_hasta: "",
    nuevo_sueldo: "",
    nuevo_codigo_nomina: "",
    periodo_prueba: false,
  });

  useEffect(() => {
    window.scroll(0, 0);
    document.title = "Grupo Lamar - Movimientos";
    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  const handleValidate = (e) => {
    const { name, value } = e.target;
    setDatosMovimimento({ ...datosMovimiento, [name]: value });
  };

  const handleResetFilters = () => {
    setFilters({
      numero_identificacion: "",
    });

    const inputSearch = document.getElementById("numero_identificacion");
    inputSearch.value = "";
    dispatch(deleteFiltros());
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;

    setDatosMovimimento({ ...datosMovimiento, [name]: checked });
  };

  const handleFind = () => {
    dispatch(postFiltros(filters));
  };

  const handleEmpleadoExiste = async (e) => {
    const { value } = e.target;

    if (value.trim() !== "") {
      try {
        const filtros = { numero_identificacion: value, activo: "1" };
        await dispatch(postFiltros(filtros));

        // revisar los await y usar getEmpleadoExistencia()
        const response = await dispatch(getAllEmpleados(token, filtros, 1, 1));
        const empleados = response.payload.empleados;

        console.log(response.payload.empleados[0]);

        if (empleados.length > 0) {
          const empleado = empleados[0];
          setDatosMovimimento({
            ...datosMovimiento,
            tipo_identificacion: empleado.tipo_identificacion || "V",
            numero_identificacion: empleado.numero_identificacion || "",
            nombres: empleado.nombres || "",
            apellidos: empleado.apellidos || "",
            codigo_nomina: empleado.codigo_nomina || "",
            cargo_actual: empleado.cargo_actual || "",
            empresa: empleado.empresa || "",
            sueldo_actual: empleado.sueldo_actual || "",
            unidad_organizativa: empleado.unidad_organizativa || "",
            antiguedad: empleado.antiguedad || "",
            fecha_ingreso: empleado.fecha_ingreso || YYYYMMDD(),
          });
          setErrors({}); // Clear errors if employee is found
        } else {
          setErrors({ numero_identificacion: "Empleado no encontrado" });
          // Clear datosMovimiento if employee is not found
          setDatosMovimimento({
            tipo_identificacion: "V",
            tipo_movimiento: "Temporal",
            numero_identificacion: "",
            nombres: "",
            apellidos: "",
            codigo_nomina: "",
            cargo_actual: "",
            empresa: "",
            sueldo_actual: "",
            fecha_ingreso: YYYYMMDD(),
          });
        }
      } catch (error) {
        setErrors({ numero_identificacion: "Error al buscar el empleado" });
      }
    }
  };

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8">
      <Title>Movimientos</Title>
      <Hr className="w-full my-5" />
      <div className="sm:w-full sm:max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {/* Identificación */}
          <div>
            <Label htmlFor="numero_identificacion">Identificación</Label>
            <div className="grid grid-cols-4">
              <Select
                name="tipo_identificacion"
                defaultValue={datosMovimiento.tipo_identificacion}
                onChange={handleValidate}
              >
                <option value="V">V</option>
                <option value="E">E</option>
              </Select>
              <div className="col-span-3 pl-3">
                <Input
                  id="numero_identificacion"
                  name="numero_identificacion"
                  onChange={handleValidate}
                  onBlur={handleEmpleadoExiste}
                />
              </div>
            </div>
            {errors.numero_identificacion && (
              <p className="text-red-500">{errors.numero_identificacion}</p>
            )}
          </div>
          {/* Nombres */}
          <div>
            <Label htmlFor="nombres">Nombres</Label>
            <Input
              id="nombres"
              name="nombres"
              value={datosMovimiento.nombres}
              readOnly
            />
          </div>
          {/* Apellidos */}
          <div>
            <Label htmlFor="apellidos">Apellidos</Label>
            <Input
              id="apellidos"
              name="apellidos"
              value={datosMovimiento.apellidos}
              readOnly
            />
          </div>
          {/* Codigo de Nomina */}
          <div>
            <Label htmlFor="codigo_nomina">Codigo de Nomina</Label>
            <Input
              id="codigo_nomina"
              name="codigo_nomina"
              value={datosMovimiento.codigo_nomina}
              readOnly
            />
          </div>
          {/* Cargo Actual */}
          <div>
            <Label htmlFor="cargo_actual">Cargo Actual</Label>
            <Input
              id="cargo_actual"
              name="cargo_actual"
              value={datosMovimiento.cargo_actual}
              readOnly
            />
          </div>
          {/* Empresa */}
          <div>
            <Label htmlFor="empresa">Empresa</Label>
            <Input
              id="empresa"
              name="empresa"
              value={datosMovimiento.empresa}
              readOnly
            />
          </div>
          {/* Sueldo Actual */}
          <div>
            <Label htmlFor="sueldo_actual">Sueldo Actual</Label>
            <Input
              id="sueldo_actual"
              name="sueldo_actual"
              value={datosMovimiento.sueldo_actual}
              readOnly
            />
          </div>
          {/* Unidad Organizativa de Adscripción */}
          <div>
            <Label htmlFor="unidad_organizativa">Unidad Organizativa</Label>
            <Input
              id="unidad_organizativa"
              name="unidad_organizativa"
              value={datosMovimiento.unidad_organizativa}
              readOnly
            />
          </div>
          {/* Antigüedad */}
          <div>
            <Label htmlFor="antiguedad">Antigüedad</Label>
            <Input
              id="antiguedad"
              name="antiguedad"
              value={datosMovimiento.antiguedad}
              readOnly
            />
          </div>
          {/* Fecha de Ingreso */}
          <div>
            <Label htmlFor="fecha_ingreso">Fecha de Ingreso</Label>
            <Input
              type="date"
              id="fecha_ingreso"
              name="fecha_ingreso"
              value={datosMovimiento.fecha_ingreso}
              readOnly
            />
          </div>
          {/* Frecuencia de Nómina */}
          <div>
            <Label htmlFor="frecuencia_nomina">Frecuencia de Nómina</Label>
            <Select
              id="frecuencia_nomina"
              name="frecuencia_nomina"
              value={datosMovimiento.frecuencia_nomina}
              readOnly
            >
              <option value="Semanal">Semanal</option>
              <option value="Quincenal">Quincenal</option>
              <option value="Mensual">Mensual</option>
            </Select>
          </div>
          {/* Tipo de Nómina */}
          <div>
            <Label htmlFor="tipo_nomina">Tipo de Nómina</Label>
            <Select
              id="tipo_nomina"
              name="tipo_nomina"
              value={datosMovimiento.tipo_nomina}
              readOnly
            >
              <option value="Empleados">Empleados</option>
              <option value="Contratados">Contratados</option>
            </Select>
          </div>
        </div>
        <br />
        <Title>Detalle del Movimiento Organizativo</Title>
        <Hr className="w-full my-5" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Clase de Movimiento */}
          <div>
            <Label htmlFor="clase_movimiento">Clase de Movimiento</Label>
            <Select
              id="clase_movimiento"
              name="clase_movimiento"
              value={datosMovimiento.clase_movimiento}
              onChange={handleValidate}
            >
              <option>Seleccione</option>
              <option>Transferencia entre Empresas</option>
              <option>Reasignacion de funciones</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="tipo_movimiento">Tipo de Movimiento</Label>
            <Select
              id="tipo_movimiento"
              name="tipo_movimiento"
              value={datosMovimiento.tipo_movimiento}
              onChange={handleValidate}
              defaultValue={datosMovimiento.tipo_movimiento}
            >
              <option value="Temporal">Temporal</option>
              <option value="Permanente">Permanente</option>
            </Select>
          </div>
          {datosMovimiento.tipo_movimiento === "Temporal" && (
            <div>
              <Label htmlFor="duracion_movimiento">
                Duración de Movimiento
              </Label>
              <Input
                id="duracion_movimiento"
                name="duracion_movimiento"
                type="number"
                min="0"
                max="90"
                onChange={handleValidate}
                value={datosMovimiento.duracion_movimiento}
              />
            </div>
          )}
          <div>
            <Label htmlFor="periodo_prueba">Periodo de prueba</Label>
            <input
              id="periodo_prueba"
              name="periodo_prueba"
              type="checkbox"
              value={datosMovimiento.periodo_prueba}
              onChange={handleChecked}
            />
          </div>
          {datosMovimiento.periodo_prueba && (
            <div>
              <Label htmlFor="duracion_periodo_prueba">
                Duracion de periodo de Prueba
              </Label>
              <Input
                id="duracion_periodo_prueba"
                name="duracion_periodo_prueba"
                type="number"
                min="0"
                max="90"
                onChange={handleValidate}
                value={datosMovimiento.duracion_periodo_prueba}
              />
            </div>
          )}
        </div>
        <div className="grid my-2 grid-cols-1 gap-4 sm:grid-cols-1">
          <div>
            <Label htmlFor="justificacion">Justificación</Label>
            <textarea
              id="justificacion"
              className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-[#002846] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="justificacion"
              onChange={handleValidate}
              value={datosMovimiento.justificacion}
            />
          </div>
        </div>
        {/* Justificación */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Nueva Condición Laboral del Trabajador */}
          <div>
            <Label htmlFor="nuevo_cargo">Nuevo Cargo</Label>
            <Input
              id="nuevo_cargo"
              name="nuevo_cargo"
              onChange={handleValidate}
              value={datosMovimiento.nuevo_cargo}
            />
          </div>
          <div>
            <Label htmlFor="nueva_empresa">Nueva Empresa</Label>
            <Input
              id="nueva_empresa"
              name="nueva_empresa"
              onChange={handleValidate}
              value={datosMovimiento.nueva_empresa}
            />
          </div>
          <div>
            <Label htmlFor="nueva_unidad_organizativa">
              Nueva Unidad Organizativa
            </Label>
            <Input
              id="nueva_unidad_organizativa"
              name="nueva_unidad_organizativa"
              onChange={handleValidate}
              value={datosMovimiento.nueva_unidad_organizativa}
            />
          </div>
          <div>
            <Label htmlFor="vigencia_movimiento_desde">
              Vigencia del Movimiento Desde
            </Label>
            <Input
              type="date"
              id="vigencia_movimiento_desde"
              name="vigencia_movimiento_desde"
              onChange={handleValidate}
              value={datosMovimiento.vigencia_movimiento_desde}
            />
          </div>
          <div>
            <Label htmlFor="vigencia_movimiento_hasta">
              Vigencia del Movimiento Hasta
            </Label>
            <Input
              type="date"
              id="vigencia_movimiento_hasta"
              name="vigencia_movimiento_hasta"
              onChange={handleValidate}
              value={datosMovimiento.vigencia_movimiento_hasta}
            />
          </div>
          <div>
            <Label htmlFor="nuevo_sueldo">Nuevo Sueldo</Label>
            <Input
              id="nuevo_sueldo"
              name="nuevo_sueldo"
              onChange={handleValidate}
              value={datosMovimiento.nuevo_sueldo}
            />
          </div>
          {/* Frecuencia de Nómina */}
          <div>
            <Label htmlFor="nueva_frecuencia_nomina">
              Nueva Frecuencia de Nómina
            </Label>
            <Select
              id="nueva_frecuencia_nomina"
              name="nueva_frecuencia_nomina"
              value={datosMovimiento.nueva_frecuencia_nomina}
            >
              <option value="Semanal">Semanal</option>
              <option value="Quincenal">Quincenal</option>
              <option value="Mensual">Mensual</option>
            </Select>
          </div>
          {/* Tipo de Nómina */}
          <div>
            <Label htmlFor="nuevo_tipo_nomina">Tipo de Nómina</Label>
            <Select
              id="nuevo_tipo_nomina"
              name="nuevo_tipo_nomina"
              value={datosMovimiento.nuevo_tipo_nomina}
            >
              <option value="Empleados">Empleados</option>
              <option value="Contratados">Contratados</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="nuevo_codigo_nomina">Nuevo Codigo de Nomina</Label>
            <Input
              id="nuevo_codigo_nomina"
              name="nuevo_codigo_nomina"
              onChange={handleValidate}
              value={datosMovimiento.nuevo_codigo_nomina}
            />
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <Button onClick={handleResetFilters} icon={FaFloppyDisk}>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}
