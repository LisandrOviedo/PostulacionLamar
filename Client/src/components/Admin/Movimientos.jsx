import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllEmpleados,
  postFiltros,
  deleteFiltros,
} from "../../redux/empleados/empleadosActions";
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

import { Button, Input, Label, Select, Title, Hr } from "../UI";

import { YYYYMMDD } from "../../utils/formatearFecha";

import { FaMagnifyingGlass, FaFloppyDisk } from "react-icons/fa6";

export function Movimientos() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.empleados.token);
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

  const [errors, setErrors] = useState({});

  const [datosMovimiento, setDatosMovimiento] = useState({
    tipo_identificacion: "V",
    tipo_movimiento: "Temporal",

    fecha_ingreso: YYYYMMDD(),

    clase_movimiento: "periodo_prueba",
  });

  useEffect(() => {
    window.scroll(0, 0);
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

  const handleValidate = (e) => {
    const { name, value } = e.target;
    setDatosMovimiento({ ...datosMovimiento, [name]: value });
  };

  const handleResetFilters = () => {
    setFilters({
      numero_identificacion: "",
    });

    const inputSearch = document.getElementById("numero_identificacion");
    inputSearch.value = "";
    dispatch(deleteFiltros());
  };

  const handleEmpleadoExiste = async () => {
    const { numero_identificacion } = datosMovimiento;

    if (numero_identificacion.trim() !== "") {
      try {
        const filtros = { numero_identificacion, activo: "1" };
        dispatch(postFiltros(filtros));

        // Revisar los await y usar getEmpleadoExistencia()
        const response = await dispatch(getAllEmpleados(token, filtros, 1, 1));
        const empleados = response.payload.empleados;
        console.log(empleado);
        if (empleados.length > 0) {
          const empleado = empleados[0];
          setDatosMovimiento({
            ...datosMovimiento,
            tipo_identificacion: empleado.tipo_identificacion || "V",
            numero_identificacion: empleado.numero_identificacion || "-",
            nombres: empleado.nombres || "-",
            apellidos: empleado.apellidos || "-",
            fecha_nacimiento: empleado.fecha_nacimiento || "-",
            codigo_nomina: empleado.codigo_nomina || "-",
            cargo_actual: empleado.cargo_actual || "-",
            empresa: empleado.empresa || "-",
            sueldo_actual: empleado.sueldo_actual || "-",
            unidad_organizativa: empleado.unidad_organizativa || "-",
            antiguedad: empleado.antiguedad || "-",
            fecha_ingreso: empleado.fecha_ingreso || YYYYMMDD(),
          });
          setErrors({});
        } else {
          setErrors({ numero_identificacion: "Empleado no encontrado" });
          setDatosMovimiento({
            tipo_identificacion: "V",
            tipo_movimiento: "",
            numero_identificacion: "",
            nombres: "",
            apellidos: "",
            fecha_nacimiento: "",
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
      <div className="w-full">
        <div className="grid sm:grid-cols-1 md:grid-cols-5 gap-2">
          <div className="col-span-1">
            <Label>Tipo de Identificacion</Label>
            <Select
              name="tipo_identificacion"
              defaultValue={datosMovimiento.tipo_identificacion}
              onChange={handleValidate}
            >
              <option value="V">V</option>
              <option value="E">E</option>
            </Select>
          </div>
          <div className="sm:col-span-1 md:col-span-3">
            <Label>Numero de Identificacion</Label>

            <Input
              id="numero_identificacion"
              name="numero_identificacion"
              onChange={handleValidate}
              className="w-full"
            />
          </div>
          <div className="col-span-1 mt-2">
            <Button
              onClick={handleEmpleadoExiste}
              className="w-full flex items-center justify-center space-x-2"
            >
              <FaMagnifyingGlass />
              <span>Buscar</span>
            </Button>
          </div>
        </div>

        <div className="p-4 border rounded-lg shadow-md">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            {/* Nombres */}
            <div>
              <Label htmlFor="nombres">Nombres</Label>
              <div id="nombres">{datosMovimiento.nombres || "-"}</div>
            </div>
            {/* Apellidos */}
            <div>
              <Label htmlFor="apellidos">Apellidos</Label>
              <div id="apellidos">{datosMovimiento.apellidos || "-"}</div>
            </div>
            <div>
              <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
              <div id="fecha_nacimiento">
                {datosMovimiento.fecha_nacimiento || "-"}
              </div>
            </div>
            {/* Codigo de Nomina */}
            <div>
              <Label htmlFor="codigo_nomina">Codigo de Nomina</Label>
              <div id="codigo_nomina">
                {datosMovimiento.codigo_nomina || "-"}
              </div>
            </div>
            {/* Cargo Actual */}
            <div>
              <Label htmlFor="cargo_actual">Cargo Actual</Label>
              <div id="cargo_actual">{datosMovimiento.cargo_actual || "-"}</div>
            </div>
            {/* Empresa */}
            <div>
              <Label htmlFor="empresa">Empresa</Label>
              <div id="empresa">{datosMovimiento.empresa || "-"}</div>
            </div>
            {/* Sueldo Actual */}
            <div>
              <Label htmlFor="sueldo_actual">Sueldo Actual</Label>
              <div id="sueldo_actual">
                {datosMovimiento.sueldo_actual || "-"}
              </div>
            </div>
            {/* Unidad Organizativa de Adscripción */}
            <div>
              <Label htmlFor="unidad_organizativa">Unidad Organizativa</Label>
              <div id="unidad_organizativa">
                {datosMovimiento.unidad_organizativa || "-"}
              </div>
            </div>
            {/* Antigüedad */}
            <div>
              <Label htmlFor="antiguedad">Antigüedad</Label>
              <div id="antiguedad">{datosMovimiento.antiguedad || "-"}</div>
            </div>
            {/* Fecha de Ingreso */}
            <div>
              <Label htmlFor="fecha_ingreso">Fecha de Ingreso</Label>
              <div id="fecha_ingreso">
                {datosMovimiento.fecha_ingreso || "-"}
              </div>
            </div>
            {/* Frecuencia de Nómina */}
            <div>
              <Label htmlFor="frecuencia_nomina">Frecuencia de Nómina</Label>
              <div id="frecuencia_nomina">
                {datosMovimiento.frecuencia_nomina || "-"}
              </div>
            </div>
            {/* Tipo de Nómina */}
            <div>
              <Label htmlFor="tipo_nomina">Tipo de Nómina</Label>
              <div id="tipo_nomina">{datosMovimiento.tipo_nomina || "-"}</div>
            </div>
          </div>
        </div>

        <br />
        <Title>Detalle del Movimiento Organizativo</Title>
        <Hr className="w-full my-5" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Clase de Movimiento */}
          <div>
            <Label htmlFor="clase_movimiento">Clase de Movimiento</Label>
            <Select
              id="clase_movimiento"
              name="clase_movimiento"
              value={datosMovimiento.clase_movimiento}
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
              <option value="periodo_prueba">Periodo de Prueba</option>
              <option value="otro">Otro</option>
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
              {datosMovimiento.clase_movimiento !== "periodo_prueba" && (
                <option value="Permanente">Permanente</option>
              )}
            </Select>
          </div>
          {datosMovimiento.tipo_movimiento === "Temporal" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="duracion_movimiento_desde">Desde</Label>
                <Input
                  id="duracion_movimiento_desde"
                  name="duracion_movimiento_desde"
                  type="number"
                  min="0"
                  max="90"
                  onChange={handleValidate}
                  value={datosMovimiento.duracion_movimiento_desde}
                />
              </div>
              <div>
                <Label htmlFor="duracion_movimiento_hasta">Hasta</Label>
                <Input
                  id="duracion_movimiento_hasta"
                  name="duracion_movimiento_hasta"
                  type="number"
                  min="0"
                  max="90"
                  onChange={handleValidate}
                  value={datosMovimiento.duracion_movimiento_hasta}
                />
              </div>
            </div>
          )}

          {datosMovimiento.clase_movimiento === "periodo_prueba" && (
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Nueva Condición Laboral del Trabajador */}
          {(datosMovimiento.clase_movimiento !== "cambio_sede_misma_empresa" ||
            datosMovimiento.clase_movimiento !==
              "cambio_dpto_misma_empresa") && (
            <div>
              <Label htmlFor="empresa_id">Empresa</Label>

              <Select
                className="w-full"
                id="empresa_id"
                name="empresa_id"
                defaultValue="Seleccione"
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
              defaultValue="Seleccione"
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
              defaultValue="Seleccione"
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
            <Label htmlFor="cargo_nivel_id">Nivel</Label>
            <Select
              className="w-full"
              id="cargo_nivel_id"
              name="cargo_nivel_id"
              defaultValue="Seleccione"
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

          {/* <div>
            <Label htmlFor="nueva_unidad_organizativa">
              Nueva Unidad Organizativa
            </Label>
            <Input
              id="nueva_unidad_organizativa"
              name="nueva_unidad_organizativa"
              onChange={handleValidate}
              value={datosMovimiento.nueva_unidad_organizativa}
            />
          </div> */}

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
        <div className="grid my-2 grid-cols-1 gap-4 sm:grid-cols-1">
          <div>
            <Label htmlFor="observaciones">Observaciones</Label>
            <textarea
              id="observaciones"
              className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-[#002846] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="observaciones"
              onChange={handleValidate}
              value={datosMovimiento.justificacion}
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleResetFilters}
            className="sm:w-full md:w-auto flex items-center justify-center space-x-2"
          >
            <FaFloppyDisk />
            <span>Guardar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
