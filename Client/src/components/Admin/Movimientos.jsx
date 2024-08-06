import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmpleadoExistencia } from "../../redux/empleados/empleadosActions";
import { Button, Input, Label, Select, Title, Hr } from "../UI";
import { FaMagnifyingGlass, FaFloppyDisk } from "react-icons/fa6";
import Swal from "sweetalert2";

export function Movimientos() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.empleados.token);
  const [errors, setErrors] = useState({});
  const [datosMovimiento, setDatosMovimimento] = useState({});
  const [duracionTipo, setDuracionTipo] = useState(""); // Estado para manejar la selección

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

  const handleEmpleadoExiste = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (value) {
      getEmpleadoExistencia(
        token,
        datosMovimiento.tipo_identificacion,
        datosMovimiento.numero_identificacion
      ).then((data) => {
        if (data) {
          const numero_identificacion = document.getElementById(
            "numero_identificacion"
          );
          numero_identificacion.value = null;
        }
      });
    }
  };

  const handleDuracionTipoChange = (e) => {
    setDuracionTipo(e.target.value);
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
              value="John"
              readOnly
              //   value={empleado.nombre}
            />
          </div>
          <div>
            <Label htmlFor="apellidos">Apellidos</Label>
            <Input id="apellidos" name="apellidos" value="Doe" readOnly />
          </div>
          <div>
            <Label htmlFor="codigo_nomina">Codigo de Nomina</Label>
            <Input
              id="codigo_nomina"
              name="codigo_nomina"
              value="T01"
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="cargo_actual">Cargo Actual</Label>
            <Input id="cargo_actual" value="Obrero I" readOnly />
          </div>
          <div>
            <Label htmlFor="correo">Empresa</Label>
            <Input id="correo" name="correo" value="test@mail.com" readOnly />
          </div>
          <div>
            <Label htmlFor="sueldo_actual">Sueldo Actual</Label>
            <Input
              id="sueldo_actual"
              name="sueldo_actual"
              value="12000"
              readOnly
            />
          </div>
          <div>
            <Label>Fecha de Ingreso</Label>
            <Input type="date" readOnly defaultToNow={true} />
          </div>
          <div>
            <Button className="w-full flex items-center justify-center space-x-2 mt-7">
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
            onChange={handleDuracionTipoChange}
          >
            <option value="Temporal">Temporal</option>
            <option value="Permanente">Permanente</option>
          </Select>
          {duracionTipo === "Temporal" && (
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
          <Title>Nueva Condición Laboral del Trabajador</Title>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="nuevo_cargo">Nuevo Cargo</Label>
              <Input
                id="nuevo_cargo"
                name="nuevo_cargo"
                onChange={handleValidate}
              />
              {errors.nuevo_cargo && (
                <p className="text-red-500">{errors.nuevo_cargo}</p>
              )}
            </div>
            <div>
              <Label htmlFor="nueva_empresa">Nueva Empresa</Label>
              <Input
                id="nueva_empresa"
                name="nueva_empresa"
                onChange={handleValidate}
              />
              {errors.nueva_empresa && (
                <p className="text-red-500">{errors.nueva_empresa}</p>
              )}
            </div>
            <div>
              <Label htmlFor="nueva_unidad_adscripcion">
                Nueva Unidad Organizativa de Adscripción
              </Label>
              <Input
                id="nueva_unidad_adscripcion"
                name="nueva_unidad_adscripcion"
                onChange={handleValidate}
              />
              {errors.nueva_unidad_adscripcion && (
                <p className="text-red-500">
                  {errors.nueva_unidad_adscripcion}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label>Vigencia del Movimiento</Label>
            <div className="grid grid-cols-2">
              <div>
                <Label htmlFor="vigencia_desde">Desde</Label>
                <Input
                  id="vigencia_desde"
                  name="vigencia_desde"
                  type="date"
                  onChange={handleValidate}
                />
                {errors.vigencia_desde && (
                  <p className="text-red-500">{errors.vigencia_desde}</p>
                )}
              </div>
              <div className="ml-4">
                <Label htmlFor="vigencia_hasta">Hasta</Label>
                <Input
                  id="vigencia_hasta"
                  name="vigencia_hasta"
                  type="date"
                  onChange={handleValidate}
                />
                {errors.vigencia_hasta && (
                  <p className="text-red-500">{errors.vigencia_hasta}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Button className="w-auto flex items-center space-x-2" type="submit">
            <FaFloppyDisk />
            <span>Guardar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
