//useState Es un Hook que te permite añadir estado a tus componentes funcionales y te re/renderiza el comp.
//useEffect Es un Hook de React que te permite ejecutar codigo al montar, desmontar y cuando cambie el estado sobre algo, de un componente
import { useState, useEffect } from "react";

//useDispatch es un Hook que te permite llenar un estado de Redux.
//useSelector es un Hook que te permite extraer datos del store (estado) de Redux.
import { useDispatch, useSelector } from "react-redux";

import { getAllEmpresasActivas } from "../../redux/empresas/empresasActions";

import { getEmpleadoExistencia } from "../../redux/empleados/empleadosActions";

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

import { getAllClasesMovimientosActivas } from "../../redux/clasesMovimientos/clasesMovimientosActions";

import { postMovimiento } from "../../redux/movimientos/movimientosActions";

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

import { calcularAntiguedad } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export function Movimientos() {
  //dispatch es esencial para comunicar cambios en el estado de tu aplicación a través de acciones
  const dispatch = useDispatch();

  /*En este caso, está accediendo a state.empleados.token, 
  lo que significa que está extrayendo el valor del token del objeto empleados dentro del estado. */
  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const clases_movimientos_activas = useSelector(
    (state) => state.clases_movimientos.clases_movimientos_activas
  );

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
    solicitante_id: empleado.empleado_id,
    empresa_id: empleado.empresa_id,
    tipo_identificacion: "V",
    numero_identificacion: "",
    duracion_movimiento: "Permanente",
    duracion_movimiento_dias: "1",
    duracion_periodo_prueba: "1",
    sueldo: "",
    tipo_identificacion_supervisor: "V",
    tipo_identificacion_gerencia: "V",
    tipo_identificacion_tthh: "V",
    numero_identificacion_supervisor: "",
    numero_identificacion_gerencia: "",
    numero_identificacion_tthh: "",
  });

  const [datosEmpleado, setDatosEmpleado] = useState({});
  const [datosSupervisor, setDatosSupervisor] = useState({});
  const [datosAprobacionGerencia, setDatosAprobacionGerencia] = useState({});
  const [datosTTHH, setDatosTTHH] = useState({});

  const [movEntreEmpresas, setMovEntreEmpresas] = useState(true);

  useEffect(() => {
    window.scroll(0, 0); // Desplaza la ventana a la parte superior izquierda de la página.
    document.title = "Grupo Lamar - Movimientos (Admin)";

    dispatch(getAllEmpresasActivas(token));
    dispatch(getAllClasesMovimientosActivas(token));

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
    const { name, value, options } = e.target; //Este parámetro representa el evento que desencadenó la función. En este caso, es un evento de entrada (Input).

    if (e.target.tagName === "SELECT" && name === "clase_movimiento_id") {
      if (
        options[e.target.selectedIndex].text === "Transferencia entre empresas"
      ) {
        setMovEntreEmpresas(false);
      } else {
        setMovEntreEmpresas(true);
        setDatosMovimiento({
          ...datosMovimiento,
          empresa_id: empleado.empresa_id,
        });
      }
    }

    setDatosMovimiento({ ...datosMovimiento, [name]: value }); //... y el nombre del estado hace que se mantenga la información del estado

    setErrors(validations({ ...datosMovimiento, [name]: value }));
  };

  const handleConvertirADecimales = (e) => {
    const { name, value } = e.target;

    if (value) {
      const numeroFormateado = Number.parseFloat(value).toFixed(2);

      setDatosMovimiento({ ...datosMovimiento, [name]: numeroFormateado });

      setErrors(validations({ ...datosMovimiento, [name]: numeroFormateado }));
    }
  };

  const handleCheckedValidate = (event) => {
    const { name, checked } = event.target;

    setDatosMovimiento({ ...datosMovimiento, [name]: checked });
  };

  const handleExistenciaEmpleado = async () => {
    if (!datosMovimiento.numero_identificacion) {
      setDatosEmpleado({});
      setDatosMovimiento({
        ...datosMovimiento,
        empleado_id: "",
      });
    } else {
      setDatosEmpleado({});
      setDatosMovimiento({
        ...datosMovimiento,
        empleado_id: "",
        cargo_empleado_id: "",
      });

      await getEmpleadoExistencia(
        token,
        datosMovimiento.tipo_identificacion,
        datosMovimiento.numero_identificacion,
        empleado.empresa_id
      ).then((data) => {
        if (data?.empleado_id) {
          setDatosEmpleado(data);
          setDatosMovimiento({
            ...datosMovimiento,
            empleado_id: data.empleado_id,
            cargo_empleado_id: data.Cargos_Empleados[0]?.cargo_empleado_id
              ? data.Cargos_Empleados[0].cargo_empleado_id
              : "",
          });
        }
      });
    }
  };

  const handleEmpleadoSupervisor = async () => {
    //Se reutilliza
    if (!datosMovimiento.numero_identificacion_supervisor) {
      setDatosSupervisor({});
      setDatosMovimiento({
        ...datosMovimiento,
        supervisor_id: "",
      });
    } else {
      setDatosSupervisor({});
      setDatosMovimiento({
        ...datosMovimiento,
        supervisor_id: "",
      });

      await getEmpleadoExistencia(
        token,
        datosMovimiento.tipo_identificacion_supervisor,
        datosMovimiento.numero_identificacion_supervisor,
        empleado.empresa_id
      ).then((data) => {
        if (data?.empleado_id) {
          setDatosSupervisor(data);
          setDatosMovimiento({
            ...datosMovimiento,
            supervisor_id: data.empleado_id,
          });
        }
      });
    }
  };

  const handleEmpleadoGerencia = async () => {
    //Se reutilliza
    if (!datosMovimiento.numero_identificacion_gerencia) {
      setDatosAprobacionGerencia({});
      setDatosMovimiento({
        ...datosMovimiento,
        gerencia_id: "",
      });
    } else {
      setDatosAprobacionGerencia({});
      setDatosMovimiento({
        ...datosMovimiento,
        gerencia_id: "",
      });

      await getEmpleadoExistencia(
        token,
        datosMovimiento.tipo_identificacion_gerencia,
        datosMovimiento.numero_identificacion_gerencia,
        empleado.empresa_id
      ).then((data) => {
        if (data?.empleado_id) {
          setDatosAprobacionGerencia(data);
          setDatosMovimiento({
            ...datosMovimiento,
            gerencia_id: data.empleado_id,
          });
        }
      });
    }
  };

  const handleEmpleadoTTHH = async () => {
    //Se reutilliza
    if (!datosMovimiento.numero_identificacion_tthh) {
      setDatosTTHH({});
      setDatosMovimiento({
        ...datosMovimiento,
        tthh_id: "",
      });
    } else {
      setDatosTTHH({});
      setDatosMovimiento({
        ...datosMovimiento,
        tthh_id: "",
      });

      await getEmpleadoExistencia(
        token,
        datosMovimiento.tipo_identificacion_tthh,
        datosMovimiento.numero_identificacion_tthh,
        empleado.empresa_id
      ).then((data) => {
        if (data?.empleado_id) {
          setDatosTTHH(data);
          setDatosMovimiento({
            ...datosMovimiento,
            tthh_id: data.empleado_id,
          });
        }
      });
    }
  };

  const handlePostMovimiento = async () => {
    const select = document.getElementById("clase_movimiento_id");

    const opcionSeleccionada = select.options[select.selectedIndex];

    const tipoSeleccionado = opcionSeleccionada.getAttribute("name");

    const sueldo = document.getElementById("sueldo").value;

    if (tipoSeleccionado !== "Transferencia entre empresas" && !sueldo) {
      Swal.fire({
        title: "Oops...",
        text: "Datos faltantes",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      await postMovimiento(token, datosMovimiento).then(() => {
        window.scroll(0, 0);
        window.location.reload();
      });
    }
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
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 w-full">
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
              <Span>Código de nómina</Span>
              <Span>{datosEmpleado?.Movimientos[0]?.codigo_nomina || "-"}</Span>
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
              <Span>Sueldo actual</Span>
              <Span>
                {datosEmpleado?.Cargos_Empleados[0]?.salario
                  ? `Bs. ${datosEmpleado?.Cargos_Empleados[0]?.salario}`
                  : "-"}
              </Span>
            </div>

            <div>
              <Span>Tipo de nómina</Span>
              <Span>
                {datosEmpleado?.Movimientos[0]?.tipo_nomina === "Otro"
                  ? datosEmpleado?.Movimientos[0]?.otro_tipo_nomina
                  : datosEmpleado?.Movimientos[0]?.tipo_nomina || "-"}
              </Span>
            </div>

            <div>
              <Span>Frecuencia de nómina</Span>
              <Span>
                {datosEmpleado?.Movimientos[0]?.frecuencia_nomina === "Otro"
                  ? datosEmpleado?.Movimientos[0]?.otra_frecuencia_nomina
                  : datosEmpleado?.Movimientos[0]?.frecuencia_nomina || "-"}
              </Span>
            </div>
          </div>
        </div>
      )}

      <br />
      <Title>Detalle del Movimiento Organizativo</Title>
      <Hr className="w-full my-5" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full">
        {/* Clase de Movimiento */}
        <div>
          <Label htmlFor="clase_movimiento_id">Clase de movimiento</Label>
          <Select
            id="clase_movimiento_id"
            name="clase_movimiento_id"
            onChange={handleValidate}
          >
            <option>Seleccione</option>
            {clases_movimientos_activas?.length
              ? clases_movimientos_activas?.map((clase_movimiento, i) => (
                  <option
                    key={i}
                    name={clase_movimiento.descripcion}
                    value={clase_movimiento.clase_movimiento_id}
                  >
                    {clase_movimiento.descripcion}
                  </option>
                ))
              : null}
          </Select>
        </div>
        <div>
          <Label htmlFor="duracion_movimiento">Duración de movimiento</Label>
          <Select
            id="duracion_movimiento"
            name="duracion_movimiento"
            onChange={handleValidate}
            value={datosMovimiento.duracion_movimiento}
          >
            <option value="Permanente">Permanente</option>
            <option value="Temporal">Temporal</option>
          </Select>
        </div>

        {datosMovimiento.duracion_movimiento === "Temporal" && (
          <div>
            <Label htmlFor="duracion_movimiento_dias">
              Duración de movimiento (días)
            </Label>
            <Input
              id="duracion_movimiento_dias"
              name="duracion_movimiento_dias"
              type="number"
              onChange={handleValidate}
              value={datosMovimiento.duracion_movimiento_dias}
              min="1"
            />
          </div>
        )}
        <div className="flex items-center justify-center gap-2">
          <CheckBox
            id="requiere_periodo_prueba"
            name="requiere_periodo_prueba"
            onChange={handleCheckedValidate}
          />
          <Label className="select-none" htmlFor="requiere_periodo_prueba">
            ¿Requiere periodo de prueba?
          </Label>
        </div>
        {datosMovimiento.requiere_periodo_prueba && (
          <div>
            <Label htmlFor="duracion_periodo_prueba">
              Duración de periodo de prueba (días)
            </Label>
            <Input
              id="duracion_periodo_prueba"
              name="duracion_periodo_prueba"
              type="number"
              min="1"
              max="90"
              onChange={handleValidate}
              value={datosMovimiento.duracion_periodo_prueba}
            />
          </div>
        )}
        <div className="sm:col-span-2 md:col-span-3">
          <Label htmlFor="justificacion_movimiento">
            Justificación del movimiento organizativo
          </Label>
          <TextArea
            id="justificacion_movimiento"
            name="justificacion_movimiento"
            onChange={handleValidate}
            rows="5"
          />
        </div>
      </div>
      <br />
      <Title>Nueva Condición Laboral Del Trabajador</Title>
      <Hr className="w-full my-5" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full">
        {/* Nueva Condición Laboral del Trabajador */}

        <div className="flex flex-col justify-start">
          <Label htmlFor="empresa_id">Empresa</Label>

          <Select
            className="w-full"
            id="empresa_id"
            name="empresa_id"
            onChange={handleValidate}
            value={datosMovimiento.empresa_id}
            disabled={movEntreEmpresas}
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

        <div className="flex flex-col justify-start">
          <Label htmlFor="departamento_id">Departamento</Label>
          <Select
            className="w-full"
            id="departamento_id"
            name="departamento_id"
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
        <div className="flex flex-col justify-start">
          <Label htmlFor="cargo_id">Cargo</Label>
          <Select
            className="w-full"
            id="cargo_id"
            name="cargo_id"
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
        <div className="flex flex-col justify-start">
          <Label htmlFor="cargo_nivel_id">Nivel del cargo</Label>
          <Select
            className="w-full"
            id="cargo_nivel_id"
            name="cargo_nivel_id"
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
        <div className="flex flex-col justify-start">
          <Label
            htmlFor="vigencia_movimiento_desde"
            errors={errors.vigencia_movimiento}
          >
            Vigencia del movimiento (fecha desde)
          </Label>
          <Date
            id="vigencia_movimiento_desde"
            name="vigencia_movimiento_desde"
            onChange={handleValidate}
            errors={errors.vigencia_movimiento}
          />
        </div>
        <div className="flex flex-col justify-start">
          <Label
            htmlFor="vigencia_movimiento_hasta"
            errors={errors.vigencia_movimiento}
          >
            Vigencia del movimiento (fecha hasta)
          </Label>
          <Date
            id="vigencia_movimiento_hasta"
            name="vigencia_movimiento_hasta"
            onChange={handleValidate}
            errors={errors.vigencia_movimiento}
          />
          {errors.vigencia_movimiento && (
            <Span className="m-0">{errors.vigencia_movimiento}</Span>
          )}
        </div>

        {/* Tipo de Nómina */}
        <div className="flex flex-col justify-start">
          <Label htmlFor="tipo_nomina">Tipo de nómina</Label>
          <Select id="tipo_nomina" name="tipo_nomina" onChange={handleValidate}>
            <option value="Seleccione">Seleccione</option>
            <option value="Empleados">Empleados</option>
            <option value="Obreros">Obreros</option>
            <option value="Otro">Otro</option>
          </Select>
        </div>

        {datosMovimiento.tipo_nomina === "Otro" && (
          <div className="flex flex-col justify-start">
            <Label htmlFor="otro_tipo_nomina">
              Especifique el otro tipo de nómina:
            </Label>
            <Input
              type="text"
              id="otro_tipo_nomina"
              name="otro_tipo_nomina"
              onChange={handleValidate}
            />
          </div>
        )}

        {/* Frecuencia de Nómina */}
        <div className="flex flex-col justify-start">
          <Label htmlFor="frecuencia_nomina">Frecuencia de nómina</Label>
          <Select
            id="frecuencia_nomina"
            name="frecuencia_nomina"
            onChange={handleValidate}
          >
            <option>Seleccione</option>
            <option value="Semanal">Semanal</option>
            <option value="Quincenal">Quincenal</option>
            <option value="Otro">Otro</option>
          </Select>
        </div>

        {datosMovimiento.frecuencia_nomina === "Otro" && (
          <div className="flex flex-col justify-start">
            <Label htmlFor="otra_frecuencia_nomina">
              Especifique la otra frecuencia de nómina:
            </Label>
            <Input
              type="text"
              id="otra_frecuencia_nomina"
              name="otra_frecuencia_nomina"
              onChange={handleValidate}
            />
          </div>
        )}

        <div className="flex flex-col justify-start">
          <Label htmlFor="sueldo" errors={errors.sueldo}>
            Nuevo sueldo (Bs.)
          </Label>

          <div className="relative">
            <Input
              id="sueldo"
              name="sueldo"
              onChange={handleValidate} // Esta línea llama a tu función de validación
              onBlur={handleConvertirADecimales}
              errors={errors.sueldo}
              className="pr-8" // padding a la derecha para que no tenga conflicto con el icono de validacion
              value={datosMovimiento.sueldo}
              type="number"
              min="1"
            />
            {errors.sueldo && (
              <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
            )}
          </div>
          {errors.sueldo && <Span className="m-0">{errors.sueldo}</Span>}
        </div>

        <div className="flex flex-col justify-start">
          <Label htmlFor="codigo_nomina" errors={errors.codigo_nomina}>
            Código de nómina
          </Label>
          <div className="relative">
            <Input
              id="codigo_nomina"
              name="codigo_nomina"
              onChange={handleValidate}
              errors={errors.codigo_nomina}
            />
            {errors.codigo_nomina && (
              <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
            )}
          </div>
          {errors.codigo_nomina && (
            <Span className="m-0">{errors.codigo_nomina}</Span>
          )}
        </div>
      </div>
      <br />

      <Title>Datos Del Solicitante</Title>
      <Hr className="w-full my-5" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full">
        <div>
          <Span>Número de identificación</Span>
          <Span>
            {empleado.tipo_identificacion}
            {empleado.numero_identificacion}
          </Span>
        </div>

        <div>
          <Span>Nombre completo</Span>
          <Span>{`${empleado.nombres} ${empleado.apellidos}`}</Span>
        </div>

        <div>
          <Span>Cargo</Span>
          <Span>
            {empleado?.Cargos_Empleados &&
            empleado.Cargos_Empleados[0]?.Cargos_Nivele.Cargo.descripcion
              ? `${empleado?.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo?.descripcion} ${empleado?.Cargos_Empleados[0]?.Cargos_Nivele?.nivel}`
              : "-"}
          </Span>
        </div>
      </div>
      <br />
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
              value={datosMovimiento.tipo_identificacion_supervisor}
              errors={errors.numero_identificacion_supervisor}
              onChange={handleValidate}
            >
              <option value="V">V</option>
              <option value="E">E</option>
            </Select>

            <div className="relative w-full">
              <Input
                id="numero_identificacion_supervisor"
                name="numero_identificacion_supervisor"
                onChange={handleValidate}
                value={datosMovimiento.numero_identificacion_supervisor}
                errors={errors.numero_identificacion_supervisor}
                onBlur={handleEmpleadoSupervisor} //onblur
              />
              {errors.numero_identificacion_supervisor && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
          </div>
          {errors.numero_identificacion_supervisor && (
            <Span className="m-0">
              {errors.numero_identificacion_supervisor}
            </Span>
          )}
        </div>

        <div>
          <Span>Nombre completo</Span>
          <Span>
            {datosSupervisor.nombres
              ? `${datosSupervisor.nombres} ${datosSupervisor.apellidos}`
              : "-"}
          </Span>
        </div>
        <div>
          <Span>Cargo</Span>
          <Span>
            {datosSupervisor.Cargos_Niveles
              ? datosSupervisor?.Cargos_Niveles[0]?.Cargo?.descripcion
              : "-"}
          </Span>
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
              value={datosMovimiento.tipo_identificacion_gerencia}
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
                onBlur={handleEmpleadoGerencia} //onblur
                value={datosMovimiento.numero_identificacion_gerencia}
              />
              {errors.numero_identificacion_gerencia && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
          </div>
          {errors.numero_identificacion_gerencia && (
            <Span className="m-0">{errors.numero_identificacion_gerencia}</Span>
          )}
        </div>
        <div>
          <Span>Nombre completo</Span>
          <Span>
            {datosAprobacionGerencia.nombres
              ? `${datosAprobacionGerencia.nombres} ${datosAprobacionGerencia.apellidos}`
              : "-"}
          </Span>
        </div>
        <div>
          <Span>Cargo</Span>
          <Span>
            {datosAprobacionGerencia.Cargos_Niveles
              ? datosAprobacionGerencia?.Cargos_Niveles[0]?.Cargo?.descripcion
              : "-"}
          </Span>
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
              value={datosMovimiento.tipo_identificacion_tthh}
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
                onBlur={handleEmpleadoTTHH} //onblur
                value={datosMovimiento.numero_identificacion_tthh}
              />
              {errors.numero_identificacion_tthh && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
          </div>
          {errors.numero_identificacion_tthh && (
            <Span className="m-0">{errors.numero_identificacion_tthh}</Span>
          )}
        </div>
        <div>
          <Span>Nombre completo</Span>
          <Span>
            {datosTTHH.nombres
              ? `${datosTTHH.nombres} ${datosTTHH.apellidos}`
              : "-"}
          </Span>
        </div>
        <div>
          <Span>Cargo</Span>
          <Span>
            {datosTTHH.Cargos_Niveles
              ? datosTTHH?.Cargos_Niveles[0]?.Cargo?.descripcion
              : "-"}
          </Span>
        </div>
      </div>

      <div className="mx-auto sm:col-span-2 md:col-span-3">
        <Button
          className="w-auto flex items-center gap-2"
          onClick={handlePostMovimiento}
        >
          {/*Es un icono de la libreria react icons */}
          <FaFloppyDisk />
          <>Guardar</>
        </Button>
      </div>
    </div>
  );
}
