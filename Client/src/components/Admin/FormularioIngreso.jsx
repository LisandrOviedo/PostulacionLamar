import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEtniasActivas } from "../../redux/etnias/etniasActions";

import { Button, Input, Label, Select, Title, Hr } from "../UI";

import Swal from "sweetalert2";

export function FormularioIngreso() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.empleados.token);

  const etnias_activas = useSelector((state) => state.etnias.etnias_activas);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const [errors, setErrors] = useState({});

  const [datosIngreso, setDatosIngreso] = useState({
    titulos_obtenidos: [],
    experiencias: [],
    contactos_emergencia: [],
  });

  const [titulosObtenidos, setTitulosObtenidos] = useState({
    grado_instruccion: "Primaria",
    nombre_instituto: "",
    grado_obtenido: "",
    fecha_desde: "",
    fecha_hasta: "",
  });

  const [trabajosAnteriores, setTrabajosAnteriores] = useState({
    tipo: "Laboral",
    empresa_centro_educativo: "",
    cargo_titulo: "",
    fecha_desde: "",
    fecha_hasta: "",
  });

  const [contactoEmergencia, setContactoEmergencia] = useState({
    nombre_apellido: "",
    parentesco: "Amigo/a",
    telefono: "",
    direccion: "",
  });

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

    // setErrors(newErrors);

    setDatosIngreso({ ...datosIngreso, [name]: value });
  };

  const handleAddTitulosObtenidos = () => {
    if (
      !titulosObtenidos.grado_instruccion ||
      !titulosObtenidos.nombre_instituto ||
      !titulosObtenidos.grado_obtenido ||
      !titulosObtenidos.fecha_desde ||
      !titulosObtenidos.fecha_hasta
    ) {
      Swal.fire({
        title: "Oops...",
        text: "Faltan campos por llenar para añadir tu título obtenido",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const tituloYaRegistrado = datosIngreso.titulos_obtenidos.some(
      (titulo) =>
        titulo.grado_instruccion === titulosObtenidos.grado_instruccion &&
        titulo.nombre_instituto === titulosObtenidos.nombre_instituto &&
        titulo.grado_obtenido === titulosObtenidos.grado_obtenido
    );

    if (tituloYaRegistrado) {
      Swal.fire({
        title: "Oops...",
        text: "Ya has agregado ese título",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const newTitulo = [...datosIngreso.titulos_obtenidos, titulosObtenidos];
    setDatosIngreso({ ...datosIngreso, titulos_obtenidos: newTitulo });
    setTitulosObtenidos({
      grado_instruccion: "Primaria",
      nombre_instituto: "",
      grado_obtenido: "",
      fecha_desde: "",
      fecha_hasta: "",
    });
  };

  const handleAddTrabajosAnteriores = () => {
    if (
      !trabajosAnteriores.tipo ||
      !trabajosAnteriores.empresa_centro_educativo ||
      !trabajosAnteriores.cargo_titulo ||
      !trabajosAnteriores.fecha_desde ||
      !trabajosAnteriores.fecha_hasta
    ) {
      Swal.fire({
        title: "Oops...",
        text: "Faltan campos por llenar para añadir tu trabajo anterior",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const trabajoYaRegistrado = datosIngreso.experiencias.some(
      (trabajo) =>
        trabajo.empresa_centro_educativo ===
          trabajosAnteriores.empresa_centro_educativo &&
        trabajo.cargo_titulo === trabajosAnteriores.cargo_titulo &&
        trabajo.fecha_desde === trabajosAnteriores.fecha_desde &&
        trabajo.fecha_hasta === trabajosAnteriores.fecha_hasta
    );

    if (trabajoYaRegistrado) {
      Swal.fire({
        title: "Oops...",
        text: "Ya has agregado ese trabajo anterior",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const newTrabajoAnterior = [
      ...datosIngreso.experiencias,
      trabajosAnteriores,
    ];
    setDatosIngreso({
      ...datosIngreso,
      experiencias: newTrabajoAnterior,
    });
    setTrabajosAnteriores({
      tipo: "Laboral",
      empresa_centro_educativo: "",
      cargo_titulo: "",
      fecha_desde: "",
      fecha_hasta: "",
    });
  };

  const handleAddContactoEmergencia = () => {
    if (
      !contactoEmergencia.nombre_apellido ||
      !contactoEmergencia.telefono ||
      !contactoEmergencia.direccion
    ) {
      Swal.fire({
        title: "Oops...",
        text: "Faltan campos por llenar para añadir el contacto de emergencia",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const contactoYaRegistrado = datosIngreso.contactos_emergencia.some(
      (contacto) =>
        contacto.nombre_apellido === contactoEmergencia.nombre_apellido &&
        contacto.telefono === contactoEmergencia.telefono
    );

    if (contactoYaRegistrado) {
      Swal.fire({
        title: "Oops...",
        text: "Ya has agregado este contacto de emergencia",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const newContactoEmergencia = [
      ...datosIngreso.contactos_emergencia,
      contactoEmergencia,
    ];
    setDatosIngreso({
      ...datosIngreso,
      contactos_emergencia: newContactoEmergencia,
    });

    setContactoEmergencia({
      nombre_apellido: "",
      parentesco: "Amigo/a",
      telefono: "",
      direccion: "",
    });
  };

  const handleRemoveTitulosObtenidos = (index) => {
    const newTitulo = datosIngreso.titulos_obtenidos.filter(
      (_, i) => i !== index
    );
    setDatosIngreso({ ...datosIngreso, titulos_obtenidos: newTitulo });
  };

  const hanndleRemoveTrabajosAnteriores = (index) => {
    const newTrabajoAnterior = datosIngreso.experiencias.filter(
      (_, i) => i !== index
    );
    setDatosIngreso({ ...datosIngreso, experiencias: newTrabajoAnterior });
  };

  const handleRemoveContactoEmergencia = (index) => {
    const newContactoEmergencia = datosIngreso.contactos_emergencia.filter(
      (_, i) => i !== index
    );
    setDatosIngreso({
      ...datosIngreso,
      contactos_emergencia: newContactoEmergencia,
    });
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
              <Label htmlFor="numero_identificacion">Identificación</Label>
              <div className="grid grid-cols-4">
                <Select
                  name="tipo_identificacion"
                  defaultValue="V"
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
                  />
                  {errors.cedula && (
                    <p className="text-red-500">{errors.cedula}</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="nombres">Nombres</Label>
              <Input id="nombres" name="nombres" onChange={handleValidate} />
              {errors.nombres && (
                <p className="text-red-500">{errors.nombres}</p>
              )}
            </div>
            <div>
              <Label htmlFor="apellidos">Apellidos</Label>
              <Input
                id="apellidos"
                name="apellidos"
                onChange={handleValidate}
              />
              {errors.apellidos && (
                <p className="text-red-500">{errors.apellidos}</p>
              )}
            </div>
            <div>
              <Label htmlFor="estado_civil">Estado Civil</Label>
              <Select
                id="estado_civil"
                name="estado_civil"
                defaultValue="Soltero(a)"
                onChange={handleValidate}
              >
                <option value="Soltero(a)">Soltero(a)</option>
                <option value="Casado(a)">Casado(a)</option>
                <option value="Viudo(a)">Viudo(a)</option>
                <option value="Divorciado(a)">Divorciado(a)</option>
                <option value="Concubino">Concubino</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="rif">Registro de Información Fiscal (RIF)</Label>
              <Input id="rif" name="rif" onChange={handleValidate} />
              {errors.rif && <p className="text-red-500">{errors.rif}</p>}
            </div>
            <div>
              <Label htmlFor="telefono">Teléfono Móvil</Label>
              <Input
                id="telefono"
                type="tel"
                name="telefono"
                onChange={handleValidate}
              />
              {errors.telefono && (
                <p className="text-red-500">{errors.telefono}</p>
              )}
            </div>
            <div>
              <Label htmlFor="correo">Correo Electrónico</Label>
              <Input
                id="correo"
                type="email"
                name="correo"
                onChange={handleValidate}
              />
              {errors.correo && <p className="text-red-500">{errors.correo}</p>}
            </div>
            <div>
              <Label htmlFor="etnia">Etnia</Label>
              <Select
                className="w-full"
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
            <div>
              <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
              <Input
                type="date"
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                onChange={handleValidate}
              />
              {errors.fecha_nacimiento && (
                <p className="text-red-500">{errors.fecha_nacimiento}</p>
              )}
            </div>
            <div>
              <Label htmlFor="nacimiento_ciudad_id">Lugar de Nacimiento</Label>
              <Input
                id="nacimiento_ciudad_id"
                name="nacimiento_ciudad_id"
                onChange={handleValidate}
              />
              {errors.lugarNacimiento && (
                <p className="text-red-500">{errors.lugarNacimiento}</p>
              )}
            </div>
            <div>
              <Label htmlFor="nacimiento_estado_id">Estado de Nacimiento</Label>
              <Input
                id="nacimiento_estado_id"
                name="nacimiento_estado_id"
                onChange={handleValidate}
              />
              {errors.estadoNacimiento && (
                <p className="text-red-500">{errors.estadoNacimiento}</p>
              )}
            </div>
            <div>
              <Label htmlFor="nacimiento_pais_id">Nacionalidad</Label>
              <Input
                id="nacimiento_pais_id"
                name="nacimiento_pais_id"
                onChange={handleValidate}
              />
              {errors.nacionalidad && (
                <p className="text-red-500">{errors.nacionalidad}</p>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="calle_avenida">Calle / Avenida</Label>
              <Input
                id="calle_avenida"
                name="calle_avenida"
                onChange={handleValidate}
              />
              {errors.direccion && (
                <p className="text-red-500">{errors.direccion}</p>
              )}
            </div>
          </div>
          {/* //TODO: llenar los selects segun pais, estado parroquia etc */}
          <div className="pt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="parroquia_id">Parroquia</Label>
              <Input name="parroquia_id" onChange={handleValidate} />
              {errors.parroquia && (
                <p className="text-red-500">{errors.parroquia}</p>
              )}
            </div>
            <div>
              <Label htmlFor="municipio_id">Municipio</Label>
              <Input
                id="municipio_id"
                name="municipio_id"
                onChange={handleValidate}
              />
              {errors.municipio && (
                <p className="text-red-500">{errors.municipio}</p>
              )}
            </div>
            <div>
              <Label htmlFor="urbanizacion_sector">Urbanizacion / Sector</Label>
              <Input
                id="urbanizacion_sector"
                name="urbanizacion_sector"
                onChange={handleValidate}
              />
              {errors.urbanizacion && (
                <p className="text-red-500">{errors.urbanizacion}</p>
              )}
            </div>
            <div>
              <Label htmlFor="tipo_vivienda">Tipo de Vivienda</Label>
              <Select
                id="tipo_vivienda"
                name="tipo_vivienda"
                defaultValue="Casa"
                onChange={handleValidate}
              >
                <option value="Casa">Casa</option>
                <option value="Edificio">Edificio</option>
              </Select>
              {errors.tipo_vivienda && (
                <p className="text-red-500">{errors.tipo_vivienda}</p>
              )}
            </div>


            {/* TODO: agregar input para numero de casa o en caso de edificio piso y apto */}

            <div>
              <Label htmlFor="estado_id">Estado</Label>
              <Input
                id="estado_id"
                name="estado_id"
                onChange={handleValidate}
              />
              {errors.estado && <p className="text-red-500">{errors.estado}</p>}
            </div>
            <div>
              <Label htmlFor="pais_id">Pais</Label>
              <Input id="pais_id" name="pais_id" onChange={handleValidate} />
              {errors.pais && <p className="text-red-500">{errors.pais}</p>}
            </div>
          </div>
          <div className="pt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
            <div>
              <Label htmlFor="sexo">Sexo</Label>
              <Select
                id="sexo"
                defaultValue="Masculino"
                name="sexo"
                onChange={handleValidate}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="mano_dominante">Mano Dominante</Label>
              <Select
                id="mano_dominante"
                name="mano_dominante"
                defaultValue="Derecha"
                onChange={handleValidate}
              >
                <option value="Derecha">Derecha</option>
                <option value="Izquierda">Izquierda</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="factor_grupo_sanguineo">Grupo Sanguineo</Label>
              <Select
                id="factor_grupo_sanguineo"
                name="factor_grupo_sanguineo"
                defaultValue="A+"
                onChange={handleValidate}
              >
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
                <option value="O+">O+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="AB-">AB-</option>
                <option value="O-">O-</option>
              </Select>
              {errors.grupoSanguineo && (
                <p className="text-red-500">{errors.grupoSanguineo}</p>
              )}
            </div>
            <div>
              <Label htmlFor="cantidad_hijos">Cantidad de Hijos</Label>
              <Input
                type="number"
                name="cantidad_hijos"
                id="cantidad_hijos"
                defaultValue="0"
                min="0"
                max="15"
                onChange={handleValidate}
              />
              {errors.numeroHijos && (
                <p className="text-red-500">{errors.numeroHijos}</p>
              )}
            </div>
            <div>
              <Label htmlFor="carga_familiar">Carga Familiar</Label>
              <Input
                type="number"
                name="carga_familiar"
                id="carga_familiar"
                defaultValue="0"
                min="0"
                onChange={handleValidate}
              />
              {errors.numeroHijos && (
                <p className="text-red-500">{errors.numeroHijos}</p>
              )}
            </div>
          </div>
          <div className="pt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {/* TODO: revisar grados de licencia en caso de no tener */}
            <div>
              <Label htmlFor="licencia_conducir_grado">
                ¿Posee Licencia de Conducir? Especifique el grado
              </Label>
              <Input
                type="number"
                id="licencia_conducir_grado"
                name="licencia_conducir_grado"
                max="5"
                min="0"
                onChange={handleValidate}
              />
              {errors.grado && <p className="text-red-500">{errors.grado}</p>}
            </div>
            <div>
              <Label htmlFor="licencia_conducir_vencimiento">
                Fecha de Nacimiento
              </Label>
              <Input
                type="date"
                id="licencia_conducir_vencimiento"
                name="licencia_conducir_vencimiento"
                onChange={handleValidate}
              />
              {errors.fecha_nacimiento && (
                <p className="text-red-500">{errors.fecha_nacimiento}</p>
              )}
            </div>

            <div>
              <Label htmlFor="carta_medica_vencimiento">
                ¿Posee Carta Medica? Especifique su fecha de vencimiento
              </Label>
              <Input
                type="date"
                id="carta_medica_vencimiento"
                name="carta_medica_vencimiento"
                onChange={handleValidate}
              />
              {errors.fecha_nacimiento && (
                <p className="text-red-500">{errors.fecha_nacimiento}</p>
              )}
            </div>

            <div>
              <Label htmlFor="talla_camisa">Talla Camisa</Label>
              <Input
                name="talla_camisa"
                id="talla_camisa"
                onChange={handleValidate}
              />
              {errors.tallaCamisa && (
                <p className="text-red-500">{errors.tallaCamisa}</p>
              )}
            </div>
            <div>
              <Label htmlFor="talla_pantalon">Talla Pantalon</Label>
              <Input
                name="talla_pantalon"
                id="talla_pantalon"
                onChange={handleValidate}
              />
              {errors.tallaPantalon && (
                <p className="text-red-500">{errors.tallaPantalon}</p>
              )}
            </div>
            <div>
              <Label htmlFor="talla_calzado">Talla Calzado</Label>
              <Input
                name="talla_calzado"
                id="talla_calzado"
                onChange={handleValidate}
              />
              {errors.tallaCalzado && (
                <p className="text-red-500">{errors.tallaCalzado}</p>
              )}
            </div>
          </div>

          {/* Educación */}
          <div className="mt-8 ">
            <Title>Educación</Title>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
              <div>
                <Label htmlFor="grado_instruccion">Grado de instrucción</Label>
                <Select
                  id="grado_instruccion"
                  name="grado_instruccion"
                  value={titulosObtenidos.grado_instruccion}
                  onChange={(e) =>
                    setTitulosObtenidos({
                      ...titulosObtenidos,
                      grado_instruccion: e.target.value,
                    })
                  }
                >
                  <option value="Primaria">Primaria</option>
                  <option value="Secundaria">Secundaria</option>
                  <option value="Técnica">Técnica</option>
                  <option value="Universitaria">Universitaria</option>
                  <option value="Postgrado">Postgrado</option>-{" "}
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="nombre_instituto">Nombre del Instituto</Label>
                <Input
                  id="nombre_instituto"
                  name="nombre_instituto"
                  value={titulosObtenidos.nombre_instituto}
                  onChange={(e) =>
                    setTitulosObtenidos({
                      ...titulosObtenidos,
                      nombre_instituto: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="grado_obtenido">Grado Obtenido</Label>
                <Input
                  id="grado_obtenido"
                  name="grado_obtenido"
                  value={titulosObtenidos.grado_obtenido}
                  onChange={(e) =>
                    setTitulosObtenidos({
                      ...titulosObtenidos,
                      grado_obtenido: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="fecha_desde">Desde</Label>
                <Input
                  id="fecha_desde"
                  name="fecha_desde"
                  type="date"
                  value={titulosObtenidos.fecha_desde}
                  onChange={(e) =>
                    setTitulosObtenidos({
                      ...titulosObtenidos,
                      fecha_desde: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="fecha_hasta">Hasta</Label>
                <Input
                  id="fecha_hasta"
                  name="fecha_hasta"
                  type="date"
                  value={titulosObtenidos.fecha_hasta}
                  onChange={(e) =>
                    setTitulosObtenidos({
                      ...titulosObtenidos,
                      fecha_hasta: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Button
                  type="button"
                  onClick={handleAddTitulosObtenidos}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Agregar Título
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="md:col-span-3 overflow-x-auto shadow-md rounded-lg mt-8">
              <table className="w-full mx-auto text-sm text-left rtl:text-right dark:text-gray-400">
                <thead className="text-xs uppercase bg-blue-600 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-white">
                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">
                        Grado de Instrucción
                      </div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">
                        Nombre del Instituto
                      </div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">Grado Obtenido</div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">Fecha Desde</div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">Fecha Hasta</div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">Acción</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datosIngreso.titulos_obtenidos.map((edu, index) => (
                    <tr
                      key={index}
                      className="bg-gray-300 border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-4 py-4">{edu.grado_instruccion}</td>
                      <td className="px-4 py-4">{edu.nombre_instituto}</td>
                      <td className="px-4 py-4">{edu.grado_obtenido}</td>
                      <td className="px-4 py-4">{edu.fecha_desde}</td>
                      <td className="px-4 py-4">{edu.fecha_hasta}</td>
                      <td className="px-4 py-4">
                        <span
                          className="font-medium text-red-600 hover:text-red-800 dark:text-blue-500 cursor-pointer"
                          onClick={() => handleRemoveTitulosObtenidos(index)}
                        >
                          Borrar
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trabajos Anteriores */}
          <div className="mt-8 ">
            <Title>Trabajos Anteriores</Title>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
              <div>
                <Label htmlFor="empresa_centro_educativo">
                  Nombre de la empresa
                </Label>
                <Input
                  id="empresa_centro_educativo"
                  name="empresa_centro_educativo"
                  value={trabajosAnteriores.empresa_centro_educativo}
                  onChange={(e) =>
                    setTrabajosAnteriores({
                      ...trabajosAnteriores,
                      empresa_centro_educativo: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="cargo_titulo">Grado Obtenido</Label>
                <Input
                  id="cargo_titulo"
                  name="cargo_titulo"
                  value={trabajosAnteriores.cargo_titulo}
                  onChange={(e) =>
                    setTrabajosAnteriores({
                      ...trabajosAnteriores,
                      cargo_titulo: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="fecha_desde">Desde</Label>
                <Input
                  id="fecha_desde"
                  name="fecha_desde"
                  type="date"
                  value={trabajosAnteriores.fecha_desde}
                  onChange={(e) =>
                    setTrabajosAnteriores({
                      ...trabajosAnteriores,
                      fecha_desde: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="fecha_hasta">Hasta</Label>
                <Input
                  id="fecha_hasta"
                  name="fecha_hasta"
                  type="date"
                  value={trabajosAnteriores.fecha_hasta}
                  onChange={(e) =>
                    setTrabajosAnteriores({
                      ...trabajosAnteriores,
                      fecha_hasta: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Button
                  type="button"
                  onClick={handleAddTrabajosAnteriores}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Agregar Trabajo Anterior
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="md:col-span-3 overflow-x-auto shadow-md rounded-lg mt-8">
              <table className="w-full mx-auto text-sm text-left rtl:text-right dark:text-gray-400">
                <thead className="text-xs uppercase bg-blue-600 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-white">
                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">Empresa</div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">Cargo</div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">Fecha Desde</div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">Fecha Hasta</div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">Acción</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datosIngreso.experiencias.map((experiencia, i) => (
                    <tr
                      key={i}
                      className="bg-gray-300 border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-4 py-4">
                        {experiencia.empresa_centro_educativo}
                      </td>
                      <td className="px-4 py-4">{experiencia.cargo_titulo}</td>
                      <td className="px-4 py-4">{experiencia.fecha_desde}</td>
                      <td className="px-4 py-4">{experiencia.fecha_hasta}</td>
                      <td className="px-4 py-4">
                        <span
                          className="font-medium text-red-600 hover:text-red-800 dark:text-blue-500 cursor-pointer"
                          onClick={() => hanndleRemoveTrabajosAnteriores(i)}
                        >
                          Borrar
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Salud */}
          <div className="mt-8">
            <Title>Salud</Title>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="">Discapacidad</Label>
                <Input name="discapacidad" onChange={handleValidate} />
                {errors.discapacidad && (
                  <p className="text-red-500">{errors.discapacidad}</p>
                )}
              </div>
              <div>
                <Label htmlFor="">Alergias</Label>
                <Input name="alergias" onChange={handleValidate} />
                {errors.alergias && (
                  <p className="text-red-500">{errors.alergias}</p>
                )}
              </div>
              <div>
                <Label htmlFor="">Tratamientos Medicos</Label>
                <Input name="tratamientos" onChange={handleValidate} />
                {errors.tratamientos && (
                  <p className="text-red-500">{errors.tratamientos}</p>
                )}
              </div>
              <div>
                <Label htmlFor="">
                  ¿Está tomando algún medicamento actualmente?
                </Label>
                <Input name="medicamentos" onChange={handleValidate} />
                {errors.medicamentos && (
                  <p className="text-red-500">{errors.medicamentos}</p>
                )}
              </div>
              <div>
                <Label htmlFor="">Operaciones</Label>
                <Input name="operaciones" onChange={handleValidate} />
                {errors.operaciones && (
                  <p className="text-red-500">{errors.operaciones}</p>
                )}
              </div>
              <div>
                <Label htmlFor="">¿Está en alguna sociedad médica?</Label>
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
              <div>
                <Label htmlFor="nombre_apellido">Nombre y Apellido</Label>
                <Input
                  id="nombre_apellido"
                  name="nombre_apellido"
                  value={contactoEmergencia.nombre_apellido}
                  onChange={(e) =>
                    setContactoEmergencia({
                      ...contactoEmergencia,
                      nombre_apellido: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="parentesco">Parentesco</Label>
                <Select
                  id="parentesco"
                  name="parentesco"
                  value={contactoEmergencia.parentesco}
                  onChange={(e) =>
                    setContactoEmergencia({
                      ...contactoEmergencia,
                      parentesco: e.target.value,
                    })
                  }
                >
                  <option value="Abuelo/a">Abuelo/a</option>
                  <option value="Amigo/a">Amigo/a</option>
                  <option value="Conyuge">Conyuge</option>
                  <option value="Hermano/a">Hermano/a</option>
                  <option value="Hijo/a">Hijo/a</option>
                  <option value="Madre">Madre</option>
                  <option value="Nieto/a">Nieto/a</option>
                  <option value="Padre">Padre</option>
                  <option value="Primo/a">Primo/a</option>
                  <option value="Sobrino/a">Sobrino/a</option>
                  <option value="Tio/a">Tio/a</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="telefono">Telefono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={contactoEmergencia.telefono}
                  onChange={(e) =>
                    setContactoEmergencia({
                      ...contactoEmergencia,
                      telefono: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="direccion">Direccion</Label>
                <Input
                  id="direccion"
                  name="direccion"
                  value={contactoEmergencia.direccion}
                  onChange={(e) =>
                    setContactoEmergencia({
                      ...contactoEmergencia,
                      direccion: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Button
                  type="button"
                  onClick={handleAddContactoEmergencia}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Agregar Contacto Emergencia
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="md:col-span-3 overflow-x-auto shadow-md rounded-lg mt-8">
              <table className="w-full mx-auto text-sm text-left rtl:text-right dark:text-gray-400">
                <thead className="text-xs uppercase bg-blue-600 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-white">
                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">Nombre y Apellido</div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">Parentesco</div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">Telefono</div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">Direccion</div>
                    </th>

                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">Acción</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datosIngreso.contactos_emergencia.map((contacto, i) => (
                    <tr
                      key={i}
                      className="bg-gray-300 border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-4 py-4">{contacto.nombre_apellido}</td>
                      <td className="px-4 py-4">{contacto.parentesco}</td>
                      <td className="px-4 py-4">{contacto.telefono}</td>
                      <td className="px-4 py-4">{contacto.direccion}</td>
                      <td className="px-4 py-4">
                        <span
                          className="font-medium text-red-600 hover:text-red-800 dark:text-blue-500 cursor-pointer"
                          onClick={() => handleRemoveContactoEmergencia(i)}
                        >
                          Borrar
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Datos Bancarios */}
          <div className="mt-8">
            <Title>Datos Bancarios</Title>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="titular_cuenta">Titular de la Cuenta</Label>
                <Select
                  id="titular_cuenta"
                  name="titular_cuenta"
                  defaultValue="propia"
                  onChange={(e) => {
                    handleValidate(e);
                    setDatosIngreso((prevState) => ({
                      ...prevState,
                      titularCuentaBancaria: e.target.value,
                    }));
                  }}
                >
                  <option value="propia">Propia</option>
                  <option value="tercero">Tercero</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="entidad_bancaria">Entidad Bancaria</Label>
                <Select
                  id="entidad_bancaria"
                  name="entidad_bancaria"
                  onChange={handleValidate}
                >
                  <option value="100% Banco">100% Banco</option>
                  <option value="Banco Activo">Banco Activo</option>
                  <option value="Banco Bicentenario">Banco Bicentenario</option>
                  <option value="Banco Caroni">Banco Caroni</option>
                  <option value="Banco De La Fuerza Armada Nacional Bolivariana">
                    Banco De La Fuerza Armada Nacional Bolivariana
                  </option>
                  <option value="Banco De Venezuela">Banco De Venezuela</option>
                  <option value="Banco Del Tesoro">Banco Del Tesoro</option>
                  <option value="Banco Exterior">Banco Exterior</option>
                  <option value="Banco Fondo Comun">Banco Fondo Comun</option>
                  <option value="Banco Nacional De Credito">
                    Banco Nacional De Credito
                  </option>
                  <option value="Banco Plaza">Banco Plaza</option>
                  <option value="Banco Sofitasa">Banco Sofitasa</option>
                  <option value="Banco Venezolano De Credito">
                    Banco Venezolano De Credito
                  </option>
                  <option value="Bancamiga">Bancamiga</option>
                  <option value="Bancaribe">Bancaribe</option>
                  <option value="Banesco Banco Universal">
                    Banesco Banco Universal
                  </option>
                  <option value="Bancrecer">Bancrecer</option>
                  <option value="Banplus">Banplus</option>
                  <option value="BBVA Provincial">BBVA Provincial</option>
                  <option value="DELSUR Banco Universal">
                    DELSUR Banco Universal
                  </option>
                  <option value="Mercantil Banco">Mercantil Banco</option>
                  <option value="Mi Banco">Mi Banco</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="numero_cuenta">Número de Cuenta</Label>
                <Input
                  id="numero_cuenta"
                  name="numero_cuenta"
                  onChange={handleValidate}
                />
                {errors.numero_cuenta && (
                  <p className="text-red-500">{errors.numero_cuenta}</p>
                )}
              </div>
            </div>
            {datosIngreso.titular_cuenta === "tercero" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <Label htmlFor="numero_identificacion_tercero">
                    Identificación del Titular
                  </Label>
                  <div className="grid grid-cols-4">
                    <Select
                      name="tipo_identificacion_tercero"
                      defaultValue="V"
                      onChange={handleValidate}
                    >
                      <option value="V">V</option>
                      <option value="E">E</option>
                    </Select>

                    <div className="col-span-3 pl-3">
                      <Input
                        id="numero_identificacion_tercero"
                        name="numero_identificacion_tercero"
                        onChange={handleValidate}
                      />
                      {errors.cedula && (
                        <p className="text-red-500">{errors.cedula}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="nombre_apellido_tercero">
                    Nombre y Apellido del Titular
                  </Label>
                  <Input
                    id="nombre_apellido_tercero"
                    name="nombre_apellido_tercero"
                    onChange={handleValidate}
                  />
                  {errors.nombre_apellido_tercero && (
                    <p className="text-red-500">
                      {errors.nombre_apellido_tercero}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="parentesco_tercero">Parentesco</Label>
                  <Select
                    id="parentesco_tercero"
                    name="parentesco_tercero"
                    value={contactoEmergencia.parentesco_tercero}
                    onChange={(e) =>
                      setContactoEmergencia({
                        ...contactoEmergencia,
                        parentesco_tercero: e.target.value,
                      })
                    }
                  >
                    <option value="Abuelo/a">Abuelo/a</option>
                    <option value="Amigo/a">Amigo/a</option>
                    <option value="Conyuge">Conyuge</option>
                    <option value="Hermano/a">Hermano/a</option>
                    <option value="Hijo/a">Hijo/a</option>
                    <option value="Madre">Madre</option>
                    <option value="Nieto/a">Nieto/a</option>
                    <option value="Padre">Padre</option>
                    <option value="Primo/a">Primo/a</option>
                    <option value="Sobrino/a">Sobrino/a</option>
                    <option value="Tio/a">Tio/a</option>
                  </Select>
                  {errors.parentesco_tercero && (
                    <p className="text-red-500">{errors.parentesco_tercero}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ESPACIO PARA EL DEPARTAMENTO DE TALENTO HUMANO */}

          <div className="mt-8">
            <Title>Espacio para el departamento de talento humano</Title>
            {/* cargo = cargoid select,
              departamento = departamentoid tabla cargos select,
              salario input number,
              fecha_ingreso tye date,
              observaciones input textarea
            */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="cargo_id">Cargo</Label>
                <Select
                  id="cargo_id"
                  name="cargo_id"
                  onChange={(e) => {
                    handleValidate(e);
                    setDatosIngreso((prevState) => ({
                      ...prevState,
                      cargo_id: e.target.value,
                    }));
                  }}
                >
                  <option value="1">Obrero General</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="">Departamento / Gerencia</Label>
                <Select
                  id=""
                  name=""
                  onChange={handleValidate}
                >
                  <option value="1">Administracion</option>
                  
                </Select>
              </div>
              <div>
                <Label htmlFor="salario">Salario</Label>
                <Input
                  id="salario"
                  name="salario"
                  onChange={handleValidate}
                />
                {errors.numero_cuenta && (
                  <p className="text-red-500">{errors.salario}</p>
                )}
              </div>
              <div>
                <Label htmlFor="fecha_ingreso">Fecha de Ingreso</Label>
                <Input
                  id="fecha_ingreso"
                  name="fecha_ingreso"
                  type="date"
                  onChange={handleValidate}
                />
                {errors.fecha_ingreso && (
                  <p className="text-red-500">{errors.fecha_ingreso}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="observaciones" >Observaciones</Label>
            <Input id="observaciones" name="observaciones" className="h-24" type="textarea" />
          </div>

          <div className="mt-8 justify-center">
            <Button className="w-auto" type="submit">Guardar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
