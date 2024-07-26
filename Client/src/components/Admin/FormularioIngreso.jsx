import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEtniasActivas } from "../../redux/etnias/etniasActions";

import { Button, Input, Label, Select, Title, Hr } from "../UI";

export function FormularioIngreso() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.empleados.token);

  const etnias_activas = useSelector((state) => state.etnias.etnias_activas);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const [errors, setErrors] = useState({});

  const [datosIngreso, setDatosIngreso] = useState({});

  useEffect(() => {
    window.scroll(0, 0);
    document.title = "Grupo Lamar - Formulario de ingreso (Admin)";

    dispatch(getAllEtniasActivas(token));

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  const handleValidate = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    const regex = pattern ? new RegExp(pattern) : /.*/;
    if (!value) {
      newErrors[name] = "Este campo es obligatorio";
    } else if (!regex.test(value)) {
      newErrors[name] = "Formato no válido";
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);

    setDatosIngreso({ ...datosIngreso, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formErrors = {};

    formData.forEach((value, key) => {
      if (!value) {
        formErrors[key] = "Este campo es obligatorio";
      }
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Procesar el formulario
      console.log(Object.fromEntries(formData.entries()));
    }
  };

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <Title>Formulario de Ingreso</Title>
      </div>
      <br />
      <Hr />
      <br />
      <div className="sm:w-full sm:max-w-6xl">
        <form onSubmit={handleSubmit}>
          {/* Información Personal */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* TODO: comprobar cedula si existe y bloquear todos los campos, desbloquear hasta que compruebe cedula */}
            <div>
              <Label>Cedula de Identidad</Label>
              <div className="grid grid-cols-4">
                <Select
                  name="tipoCedula"
                  value={datosIngreso.tipoCedula || ""}
                  onChange={handleValidate}
                >
                  <option value="V">V</option>
                  <option value="E">E</option>
                </Select>

                <div className="col-span-3 pl-3">
                  <Input name="cedula" onChange={handleValidate} />
                  {errors.cedula && (
                    <p className="text-red-500">{errors.cedula}</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <Label>Nombres</Label>
              <Input
                name="nombres"
                pattern="[A-Za-z]+"
                onChange={handleValidate}
              />
              {errors.nombres && (
                <p className="text-red-500">{errors.nombres}</p>
              )}
            </div>
            <div>
              <Label>Apellidos</Label>
              <Input
                name="apellidos"
                pattern="[A-Za-z]+"
                onChange={handleValidate}
              />
              {errors.apellidos && (
                <p className="text-red-500">{errors.apellidos}</p>
              )}
            </div>
            <div>
              <Label>Estado Civil</Label>
              <Select name="estadoCivil">
                <option>Soltero(a)</option>
                <option>Casado(a)</option>
                <option>Viudo(a)</option>
                <option>Divorciado(a)</option>
                <option>Concubino</option>
              </Select>
            </div>
            <div>
              <Label>Registro de Informacion Fiscal (RIF)</Label>
              <Input name="rif" onChange={handleValidate} />
              {errors.rif && <p className="text-red-500">{errors.rif}</p>}
            </div>
            <div>
              <Label>Teléfono Móvil</Label>
              <Input name="telefono" onChange={handleValidate} />
              {errors.telefono && (
                <p className="text-red-500">{errors.telefono}</p>
              )}
            </div>
            <div>
              <Label>Correo Electrónico</Label>
              <Input type="email" name="correo" onChange={handleValidate} />
              {errors.correo && <p className="text-red-500">{errors.correo}</p>}
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-3">
                <Label>Etnia</Label>
                <Select
                  className="w-auto"
                  id="etnia"
                  name="etnia"
                  value={datosIngreso.etnia}
                  onChange={handleValidate}
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
            </div>
            <div>
              <Label>Fecha de Nacimiento</Label>
              <Input
                type="date"
                name="fechaNacimiento"
                onChange={handleValidate}
              />
              {errors.fechaNacimiento && (
                <p className="text-red-500">{errors.fechaNacimiento}</p>
              )}
            </div>
            <div>
              <Label>Lugar de Nacimiento</Label>
              <Input name="lugarNacimiento" onChange={handleValidate} />
              {errors.lugarNacimiento && (
                <p className="text-red-500">{errors.lugarNacimiento}</p>
              )}
            </div>
            <div>
              <Label>Estado de Nacimiento</Label>
              <Input name="estadoNacimiento" onChange={handleValidate} />
              {errors.estadoNacimiento && (
                <p className="text-red-500">{errors.estadoNacimiento}</p>
              )}
            </div>
            <div>
              <Label>Nacionalidad</Label>
              <Input name="nacionalidad" onChange={handleValidate} />
              {errors.nacionalidad && (
                <p className="text-red-500">{errors.nacionalidad}</p>
              )}
            </div>
            <div className="col-span-2">
              <Label>Direccion de Habitacion</Label>
              <Input name="direccion" onChange={handleValidate} />
              {errors.direccion && (
                <p className="text-red-500">{errors.direccion}</p>
              )}
            </div>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <Label>Parroquia</Label>
              <Input name="parroquia" onChange={handleValidate} />
              {errors.parroquia && (
                <p className="text-red-500">{errors.parroquia}</p>
              )}
            </div>
            <div>
              <Label>Municipio</Label>
              <Input name="municipio" onChange={handleValidate} />
              {errors.municipio && (
                <p className="text-red-500">{errors.municipio}</p>
              )}
            </div>
            <div>
              <Label>Urbanizacion / Sector</Label>
              <Input name="urbanizacion" onChange={handleValidate} />
              {errors.urbanizacion && (
                <p className="text-red-500">{errors.urbanizacion}</p>
              )}
            </div>
            <div>
              <Label>Tipo de Vivienda</Label>
              <Select name="tipo_vivienda" onChange={handleValidate}>
                <option>Casa</option>
                <option>Apartamento</option>
              </Select>
              {errors.tipo_vivienda && (
                <p className="text-red-500">{errors.tipo_vivienda}</p>
              )}
            </div>

            <div>
              <Label>Estado</Label>
              <Input name="estado" onChange={handleValidate} />
              {errors.estado && <p className="text-red-500">{errors.estado}</p>}
            </div>
            <div>
              <Label>Pais</Label>
              <Input name="pais" onChange={handleValidate} />
              {errors.pais && <p className="text-red-500">{errors.pais}</p>}
            </div>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
            <div>
              <Label>Sexo</Label>
              <Select name="sexo">
                <option>Masculino</option>
                <option>Femenino</option>
              </Select>
            </div>
            <div>
              <Label>Mano Dominante</Label>
              <Select name="manoDominante">
                <option>Izquierdo</option>
                <option>Derecho</option>
              </Select>
            </div>
            <div>
              <Label>Grupo Sanguineo</Label>
              <Input name="grupoSanguineo" onChange={handleValidate} />
              {errors.grupoSanguineo && (
                <p className="text-red-500">{errors.grupoSanguineo}</p>
              )}
            </div>
            <div>
              <Label>Numero de Hijos</Label>
              <Input name="numeroHijos" onChange={handleValidate} />
              {errors.numeroHijos && (
                <p className="text-red-500">{errors.numeroHijos}</p>
              )}
            </div>
            <div>
              <Label>Carga Familiar</Label>
              <Input name="cargaFamiliar" onChange={handleValidate} />
              {errors.cargaFamiliar && (
                <p className="text-red-500">{errors.cargaFamiliar}</p>
              )}
            </div>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-4 sm:grid-cols-7">
            <div>
              <Label>Licencia de Conducir</Label>
              <Select name="licenciaConducir">
                <option>Si</option>
                <option>No</option>
              </Select>
            </div>
            <div>
              <Label>Grado</Label>
              <Input name="grado" onChange={handleValidate} />
              {errors.grado && <p className="text-red-500">{errors.grado}</p>}
            </div>
            <div>
              <Label>Carta Medica</Label>
              <Select name="cartaMedica">
                <option>Si</option>
                <option>No</option>
              </Select>
            </div>
            <div>
              <Label>Fecha de vencimiento</Label>
              <Input
                type="date"
                name="fechaVencimiento"
                onChange={handleValidate}
              />
              {errors.fechaVencimiento && (
                <p className="text-red-500">{errors.fechaVencimiento}</p>
              )}
            </div>
            <div>
              <Label>Talla Camisa</Label>
              <Input name="tallaCamisa" onChange={handleValidate} />
              {errors.tallaCamisa && (
                <p className="text-red-500">{errors.tallaCamisa}</p>
              )}
            </div>
            <div>
              <Label>Talla Pantalon</Label>
              <Input name="tallaPantalon" onChange={handleValidate} />
              {errors.tallaPantalon && (
                <p className="text-red-500">{errors.tallaPantalon}</p>
              )}
            </div>
            <div>
              <Label>Talla Calzado</Label>
              <Input name="tallaCalzado" onChange={handleValidate} />
              {errors.tallaCalzado && (
                <p className="text-red-500">{errors.tallaCalzado}</p>
              )}
            </div>
          </div>

          {/* Tabla de Educación */}
          <div className="mt-8 ">
            <Title>Educación</Title>
            <div className=" overflow-x-auto shadow-md rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
                <thead className="text-xs uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="border px-4 py-3">Educacion</th>
                    <th className="border px-4 py-3">Desde</th>
                    <th className="border px-4 py-3">Hasta</th>
                    <th className="border px-4 py-3">Nombre del Instituto</th>
                    <th className="border px-4 py-3">Titulo Obtenido</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Primaria",
                    "Secundaria",
                    "Tecnica",
                    "Universitaria",
                    "Postgrado",
                  ].map((level) => (
                    <tr key={level}>
                      <td className="border p-2">{level}</td>
                      <td className="border p-2">
                        <Input
                          type="month"
                          name={`${level}_desde`}
                          onChange={handleValidate}
                        />
                        {errors[`${level}_desde`] && (
                          <p className="text-red-500">
                            {errors[`${level}_desde`]}
                          </p>
                        )}
                      </td>
                      <td className="border p-2">
                        <Input
                          type="month"
                          name={`${level}_hasta`}
                          onChange={handleValidate}
                        />
                        {errors[`${level}_hasta`] && (
                          <p className="text-red-500">
                            {errors[`${level}_hasta`]}
                          </p>
                        )}
                      </td>
                      <td className="border p-2">
                        <Input
                          name={`${level}_instituto`}
                          onChange={handleValidate}
                        />
                        {errors[`${level}_instituto`] && (
                          <p className="text-red-500">
                            {errors[`${level}_instituto`]}
                          </p>
                        )}
                      </td>
                      <td className="border p-2">
                        <Input
                          name={`${level}_titulo`}
                          onChange={handleValidate}
                        />
                        {errors[`${level}_titulo`] && (
                          <p className="text-red-500">
                            {errors[`${level}_titulo`]}
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trabajos Anteriores */}
          <div className="mt-8">
            <Title>Trabajos Anteriores</Title>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="col-span-2">
                <Label>Empresa</Label>
                <Input name="empresa1" onChange={handleValidate} />
                {errors.empresa1 && (
                  <p className="text-red-500">{errors.empresa1}</p>
                )}
              </div>
              <div>
                <Label>Cargo Desempeñado</Label>
                <Input name="cargo1" onChange={handleValidate} />
                {errors.cargo1 && (
                  <p className="text-red-500">{errors.cargo1}</p>
                )}
              </div>
              <div>
                <Label>Tiempo de Servicio</Label>
                <Input name="tiempo1" onChange={handleValidate} />
                {errors.tiempo1 && (
                  <p className="text-red-500">{errors.tiempo1}</p>
                )}
              </div>
              <div className="col-span-2">
                <Label>Empresa</Label>
                <Input name="empresa2" onChange={handleValidate} />
                {errors.empresa2 && (
                  <p className="text-red-500">{errors.empresa2}</p>
                )}
              </div>
              <div>
                <Label>Cargo Desempeñado</Label>
                <Input name="cargo2" onChange={handleValidate} />
                {errors.cargo2 && (
                  <p className="text-red-500">{errors.cargo2}</p>
                )}
              </div>
              <div>
                <Label>Tiempo de Servicio</Label>
                <Input name="tiempo2" onChange={handleValidate} />
                {errors.tiempo2 && (
                  <p className="text-red-500">{errors.tiempo2}</p>
                )}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <Label>¿Trabajo Anteriormente en esta empresa?</Label>
                <Input name="trabajoAnterior" onChange={handleValidate} />
                {errors.trabajoAnterior && (
                  <p className="text-red-500">{errors.trabajoAnterior}</p>
                )}
              </div>
              <div>
                <Label>Motivo del retiro</Label>
                <Input name="motivoRetiro" onChange={handleValidate} />
                {errors.motivoRetiro && (
                  <p className="text-red-500">{errors.motivoRetiro}</p>
                )}
              </div>
              <div>
                <Label>¿Posee parientes que trabajen en esta empresa?</Label>
                <Input name="parientesEmpresa" onChange={handleValidate} />
                {errors.parientesEmpresa && (
                  <p className="text-red-500">{errors.parientesEmpresa}</p>
                )}
              </div>
            </div>
          </div>

          {/* Salud */}
          <div className="mt-8">
            <Title>Salud</Title>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <Label>Discapacidad</Label>
                <Input name="discapacidad" onChange={handleValidate} />
                {errors.discapacidad && (
                  <p className="text-red-500">{errors.discapacidad}</p>
                )}
              </div>
              <div>
                <Label>Alergias</Label>
                <Input name="alergias" onChange={handleValidate} />
                {errors.alergias && (
                  <p className="text-red-500">{errors.alergias}</p>
                )}
              </div>
              <div>
                <Label>Tratamientos Medicos</Label>
                <Input name="tratamientos" onChange={handleValidate} />
                {errors.tratamientos && (
                  <p className="text-red-500">{errors.tratamientos}</p>
                )}
              </div>
              <div>
                <Label>¿Está tomando algún medicamento actualmente?</Label>
                <Input name="medicamentos" onChange={handleValidate} />
                {errors.medicamentos && (
                  <p className="text-red-500">{errors.medicamentos}</p>
                )}
              </div>
              <div>
                <Label>Operaciones</Label>
                <Input name="operaciones" onChange={handleValidate} />
                {errors.operaciones && (
                  <p className="text-red-500">{errors.operaciones}</p>
                )}
              </div>
              <div>
                <Label>¿Está en alguna sociedad médica?</Label>
                <Input name="sociedadMedica" onChange={handleValidate} />
                {errors.sociedadMedica && (
                  <p className="text-red-500">{errors.sociedadMedica}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contacto de Emergencia */}
          <div className="mt-8">
            <Title>Contacto de Emergencia</Title>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="col-span-2">
                <Label>Nombre y Apellido</Label>
                <Input name="contactoNombre" onChange={handleValidate} />
                {errors.contactoNombre && (
                  <p className="text-red-500">{errors.contactoNombre}</p>
                )}
              </div>
              <div>
                <Label>Parentesco</Label>
                <Input name="contactoParentesco" onChange={handleValidate} />
                {errors.contactoParentesco && (
                  <p className="text-red-500">{errors.contactoParentesco}</p>
                )}
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input name="contactoTelefono" onChange={handleValidate} />
                {errors.contactoTelefono && (
                  <p className="text-red-500">{errors.contactoTelefono}</p>
                )}
              </div>
              <div>
                <Label>Dirección</Label>
                <Input name="contactoDireccion" onChange={handleValidate} />
                {errors.contactoDireccion && (
                  <p className="text-red-500">{errors.contactoDireccion}</p>
                )}
              </div>
              <div>
                <Label>Ciudad</Label>
                <Input name="contactoCiudad" onChange={handleValidate} />
                {errors.contactoCiudad && (
                  <p className="text-red-500">{errors.contactoCiudad}</p>
                )}
              </div>
            </div>
          </div>

          {/* Datos Bancarios */}
          <div className="mt-8">
            <Title>Datos Bancarios</Title>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <Label>Titular de la Cuenta</Label>
                <Select name="titularCuentaBancaria">
                  <option value="propia">propia</option>
                  <option value="tercero">tercero</option>
                </Select>
              </div>
              <div>
                <Label>Entidad Bancaria</Label>
                <Input name="entidadBancaria" onChange={handleValidate} />
                {errors.contactoNombre && (
                  <p className="text-red-500">{errors.contactoNombre}</p>
                )}
              </div>
              <div>
                <Label>Numero de Cuenta</Label>
                <Input name="numeroCuenta" onChange={handleValidate} />
                {errors.contactoNombre && (
                  <p className="text-red-500">{errors.contactoNombre}</p>
                )}
              </div>
            </div>

            {datosIngreso.titularCuentaBancaria === "tercero" && (
              <div>
                <div>
                  <Label>Nombre y Apellido</Label>
                  <Input
                    name="nombreTitularCuentaBancaria"
                    onChange={handleValidate}
                  />
                  {errors.contactoNombre && (
                    <p className="text-red-500">{errors.contactoNombre}</p>
                  )}
                </div>
                <div>
                  <Label>Cedula</Label>
                  <Input
                    name="cedulaTitularCuentaBancaria"
                    onChange={handleValidate}
                  />
                  {errors.contactoNombre && (
                    <p className="text-red-500">{errors.contactoNombre}</p>
                  )}
                </div>
                <div>
                  <div>
                    <Label>parentesco</Label>
                    <Input
                      name="parentescoTitularCuentaBancaria"
                      onChange={handleValidate}
                    />
                    {errors.contactoNombre && (
                      <p className="text-red-500">{errors.contactoNombre}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-8 flex justify-center">
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
