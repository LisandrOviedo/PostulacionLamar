import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  getEmpleadoByID,
  getCargoActual,
} from "../../redux/empleados/empleadoAction";

import { Button, Input, Label, Title } from "../UI";

export function DatosPersonales() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { empleado_id } = useParams();

  const empleado = useSelector((state) => state.empleados.empleado);
  const cargo_actual = useSelector((state) => state.empleados.cargo_actual);

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(getEmpleadoByID(empleado_id));
    dispatch(getCargoActual(empleado_id));
  }, []);

  const handleContinuar = (event) => {
    event.preventDefault();
    navigate(`/form/curriculo/${empleado_id}`);
  };

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white static">
      <Title>Datos Personales</Title>
      <hr className="w-[80%] h-0.5 my-5 bg-gray-300 border-0 m-auto" />

      <form>
        <div className="grid gap-6 md:grid-cols-3 mt-5 mb-5">
          {empleado?.nombres ? (
            <React.Fragment>
              <div>
                <Label htmlFor="nombre_completo">Nombre completo</Label>
                <Input
                  id="nombre_completo"
                  type="text"
                  name="nombre_completo"
                  value={`${empleado.nombres} ${empleado.apellidos}`}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="cedula">Cédula</Label>
                <Input
                  id="cedula"
                  type="text"
                  name="cedula"
                  value={empleado.cedula}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={empleado.correo}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="telefono">Número de contacto</Label>
                <Input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  pattern="[0-9]"
                  value={empleado.telefono}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  type="text"
                  name="direccion"
                  value={empleado.direccion}
                  readOnly
                />
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div>
                <Label htmlFor="nombre_completo">Nombre completo</Label>
                <Input
                  id="nombre_completo"
                  type="text"
                  name="nombre_completo"
                  value=""
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="cedula">Cédula</Label>
                <Input
                  id="cedula"
                  type="text"
                  name="cedula"
                  value=""
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" name="email" value="" readOnly />
              </div>
              <div>
                <Label htmlFor="telefono">Número de contacto</Label>
                <Input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  pattern="[0-9]"
                  value=""
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  type="text"
                  name="direccion"
                  value=""
                  readOnly
                />
              </div>
            </React.Fragment>
          )}
          {cargo_actual?.Cargos?.length > 0 ? (
            <React.Fragment>
              <div>
                <Label htmlFor="cargo_actual">Cargo Actual</Label>
                <Input
                  id="cargo_actual"
                  type="text"
                  name="cargo_actual"
                  value={cargo_actual.Cargos[0].descripcion}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="nombre_empresa">Empresa</Label>
                <Input
                  id="nombre_empresa"
                  type="text"
                  name="nombre_empresa"
                  value={cargo_actual.Cargos[0].Empresa.nombre}
                  readOnly
                />
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div>
                <Label htmlFor="cargo_actual">Cargo Actual</Label>
                <Input
                  id="cargo_actual"
                  type="text"
                  name="cargo_actual"
                  value=""
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="nombre_empresa">Empresa</Label>
                <Input
                  id="nombre_empresa"
                  type="text"
                  name="nombre_empresa"
                  value=""
                  readOnly
                />
              </div>
            </React.Fragment>
          )}
          <div className="flex items-end">
            <Button className="m-0" onClick={handleContinuar}>
              Continuar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
