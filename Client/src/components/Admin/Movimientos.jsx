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
    fecha_ingreso: YYYYMMDD(),
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

  const handleFind = () => {
    dispatch(postFiltros(filters));
  };

  const handleEmpleadoExiste = async (e) => {
    const { value } = e.target;

    if (value.trim() !== "") {
      try {
        const filtros = { numero_identificacion: value };
        await dispatch(postFiltros(filtros));

        const response = await dispatch(getAllEmpleados(token, filtros, 1, 1));
        const empleados = response.payload.empleados;

        console.log(response.payload.empleados[0]);

        if (empleados.length > 0) {
          const empleado = empleados[0];
          setDatosMovimimento({
            tipo_identificacion: empleado.tipo_identificacion || "V",
            numero_identificacion: empleado.numero_identificacion || "",
            nombres: empleado.nombres || "",
            apellidos: empleado.apellidos || "",
            codigo_nomina: empleado.codigo_nomina || "",
            cargo_actual: empleado.cargo_actual || "",
            empresa: empleado.empresa || "",
            sueldo_actual: empleado.sueldo_actual || "",
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
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Movimientos</Title>
      </div>
      <br />
      <Hr />
      <br />
      <div className="sm:w-full sm:max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
          <div>
            <Label htmlFor="nombres">Nombres</Label>
            <Input
              id="nombres"
              name="nombres"
              value={datosMovimiento.nombres}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="apellidos">Apellidos</Label>
            <Input
              id="apellidos"
              name="apellidos"
              value={datosMovimiento.apellidos}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="codigo_nomina">Codigo de Nomina</Label>
            <Input
              id="codigo_nomina"
              name="codigo_nomina"
              value={datosMovimiento.codigo_nomina}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="cargo_actual">Cargo Actual</Label>
            <Input
              id="cargo_actual"
              name="cargo_actual"
              value={datosMovimiento.cargo_actual}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="empresa">Empresa</Label>
            <Input
              id="empresa"
              name="empresa"
              value={datosMovimiento.empresa}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="sueldo_actual">Sueldo Actual</Label>
            <Input
              id="sueldo_actual"
              name="sueldo_actual"
              value={datosMovimiento.sueldo_actual}
              readOnly
            />
          </div>
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
          <div>
            <Button
              className="w-full flex items-center justify-center space-x-2 mt-7"
              onClick={handleFind}
            >
              <FaMagnifyingGlass />
              <span>Buscar</span>
            </Button>
          </div>
        </div>
        <br />
        <Hr />
        <br />
        <div>
          <Label>Duración del Movimiento</Label>
          <Select
            id="duracion_tipo"
            name="duracion_tipo"
            onChange={(e) =>
              setDatosMovimimento({
                ...datosMovimiento,
                tipo_movimiento: e.target.value,
              })
            }
            defaultValue={datosMovimiento.tipo_movimiento}
          >
            <option value="Temporal">Temporal</option>
            <option value="Permanente">Permanente</option>
          </Select>
          {datosMovimiento.tipo_movimiento === "Temporal" && (
            <div className="mt-4">
              <Label htmlFor="duracion_temporal">Duración (días)</Label>
              <Input
                id="duracion_temporal"
                name="duracion_temporal"
                type="number"
                onChange={handleValidate}
              />
              {errors.duracion_temporal && (
                <p className="text-red-500">{errors.duracion_temporal}</p>
              )}
            </div>
          )}
        </div>
        <br />
        <Hr />
        <br />
        <div>
          <Label htmlFor="justificacion_movimiento">
            Justificación del Movimiento Organizativo
          </Label>
          <textarea
            id="justificacion_movimiento"
            name="justificacion_movimiento"
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-[#002846] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleValidate}
          />
          {errors.justificacion_movimiento && (
            <p className="text-red-500">{errors.justificacion_movimiento}</p>
          )}
        </div>
        <br />
        <Hr />
        <br />
        <div>
          <Button
            className="w-full flex items-center justify-center space-x-2"
            onClick={handleEmpleadoExiste}
          >
            <FaFloppyDisk />
            <span>Guardar Movimiento</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
