import { clsx } from "clsx";

import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getAllAreasInteresActivas } from "../../redux/areasinteres/areainteresAction";
import { getAllIdiomasActivos } from "../../redux/idiomas/idiomasAction";
import {
  putCurriculo,
  postCurriculoPDF,
} from "../../redux/curriculos/curriculoAction";

import { Button, Hr, Input, Label, Select, Title } from "../UI";

import validations from "../../utils/validacionesCurriculo";

import Swal from "sweetalert2";

export function DetalleCurriculo() {
  const dispatch = useDispatch();

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const token = useSelector((state) => state.empleados.token);

  const curriculoEmpleado = useSelector(
    (state) => state.curriculos.curriculoEmpleado
  );

  const areas_interes_activas = useSelector(
    (state) => state.areas_interes.areas_interes_activas
  );

  const idiomas_activos = useSelector((state) => state.idiomas.idiomas_activos);

  const [datosCurriculo, setDatosCurriculo] = useState({
    curriculo_id: curriculoEmpleado.curriculo_id,
    grado_instruccion: curriculoEmpleado.grado_instruccion,
    titulos_obtenidos: curriculoEmpleado.Titulo_Obtenidos,
    disponibilidad_viajar: curriculoEmpleado.disponibilidad_viajar,
    disponibilidad_cambio_residencia:
      curriculoEmpleado.disponibilidad_cambio_residencia,
    habilidades_tecnicas: curriculoEmpleado.habilidades_tecnicas,
    areas_interes: curriculoEmpleado.Areas_Interes,
    experiencias: curriculoEmpleado.Experiencia,
    idiomas: curriculoEmpleado.Idiomas,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(getAllAreasInteresActivas(token));

    dispatch(getAllIdiomasActivos(token));

    document.title = "Grupo Lamar - Modificar Perfil Profesional";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenIdioma, setIsHiddenIdioma] = useState(true);

  const [isLoad, setIsLoad] = useState({
    areas_interes: true,
  });

  const handleInputChangeCurriculo = (event) => {
    const { name, value } = event.target;

    setDatosCurriculo({ ...datosCurriculo, [name]: value });

    if (name === "habilidades_tecnicas") {
      setErrors(validations({ ...errors, [name]: value }));
    }
  };

  const handleCheckedChangeCurriculo = (event) => {
    const { name, checked } = event.target;

    setDatosCurriculo({ ...datosCurriculo, [name]: checked });
  };

  const handleTipoExpSelected = () => {
    const select = document.getElementById("tipo");
    const name = select.options[select.selectedIndex].text;

    if (name === "Ninguno") {
      setIsHidden(true);
      return;
    }

    if (isHidden) {
      setIsHidden(false);
      return;
    }
  };

  const handleIdiomaSelected = () => {
    const select = document.getElementById("idiomas");
    const select2 = document.getElementById("nivel_idioma");

    const name = select.options[select.selectedIndex].text;

    if (select2.selectedIndex !== 0) {
      select2.selectedIndex = 0;
    }

    if (name === "Ninguno") {
      setIsHiddenIdioma(true);
      return;
    }

    if (isHidden) {
      setIsHiddenIdioma(false);
      return;
    }
  };

  const handleAddArea = () => {
    if (datosCurriculo.areas_interes.length === 3) {
      Swal.fire({
        title: "Oops...",
        text: "Solo puedes agregar máximo 3 áreas de interés",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const select = document.getElementById("area_interes_id");
    const name = select.options[select.selectedIndex].text;
    const value = select.options[select.selectedIndex].value;

    const areaValidatorInclude = datosCurriculo.areas_interes.some(
      (area) => area.area_interes_id === value && area.nombre === name
    );

    if (areaValidatorInclude) {
      Swal.fire({
        title: "Oops...",
        text: "Ya has agregado esta área de interés",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    setDatosCurriculo({
      ...datosCurriculo,
      areas_interes: [
        ...datosCurriculo.areas_interes,
        { area_interes_id: value, nombre: name },
      ],
    });

    if (!isLoad.areas_interes) {
      setIsLoad({ ...isLoad, areas_interes: true });
    }

    if (select.selectedIndex !== 0) {
      select.selectedIndex = 0;
    }

    return;
  };

  const handleAddIdioma = () => {
    const select = document.getElementById("idiomas");
    const select2 = document.getElementById("nivel_idioma");

    const nombre = select.options[select.selectedIndex].text;
    const id = select.options[select.selectedIndex].value;
    const nivel = select2.options[select2.selectedIndex].value;

    if (nombre === "Ninguno") {
      return;
    }

    const idiomaValidatorInclude = datosCurriculo.idiomas.some(
      (idioma) => idioma.nombre === nombre
    );

    if (idiomaValidatorInclude) {
      Swal.fire({
        title: "Oops...",
        text: "Ya has agregado este idioma",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    setDatosCurriculo({
      ...datosCurriculo,
      idiomas: [
        ...datosCurriculo.idiomas,
        { idioma_id: id, nombre: nombre, nivel: nivel },
      ],
    });

    if (select.selectedIndex !== 0 || select2.selectedIndex !== 0) {
      select.selectedIndex = 0;
      select2.selectedIndex = 0;
    }

    return;
  };

  const handleDeleteArea = (event) => {
    const rowIndex = event.target.parentNode.parentNode.rowIndex;
    const updatedAreasInteres = datosCurriculo.areas_interes.filter(
      (_, index) => index !== rowIndex - 1
    );

    setDatosCurriculo({
      ...datosCurriculo,
      areas_interes: updatedAreasInteres,
    });

    if (!updatedAreasInteres.length) {
      setIsLoad({ ...isLoad, areas_interes: false });
    }
  };

  const handleAddTituloObtenido = () => {
    const select = document.getElementById("titulo_obtenido");

    if (!select.value) {
      select.focus();

      Swal.fire({
        title: "Oops...",
        text: "Debes ingresar el nombre del título obtenido",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    let duplicado = false;

    datosCurriculo.titulos_obtenidos.forEach((titulo_obtenido) => {
      if (titulo_obtenido.nombre.toLowerCase() === select.value.toLowerCase()) {
        duplicado = true;
        return;
      }
    });

    if (duplicado) {
      select.value = "";
      select.focus();

      Swal.fire({
        title: "Oops...",
        text: "Ya has agregado un título obtenido con ese nombre",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    setDatosCurriculo({
      ...datosCurriculo,
      titulos_obtenidos: [
        ...datosCurriculo.titulos_obtenidos,
        { nombre: select.value },
      ],
    });

    select.value = "";
    select.focus();
    return;
  };

  const handleAddExperiencia = () => {
    const tipo = document.getElementById("tipo");
    const cargo_titulo = document.getElementById("cargo_titulo");
    const duracion = document.getElementById("duracion");
    const empresa_centro_educativo = document.getElementById(
      "empresa_centro_educativo"
    );

    if (!cargo_titulo.value || !empresa_centro_educativo) {
      cargo_titulo.focus();

      Swal.fire({
        title: "Oops...",
        text: "Debes escribir el nombre del cargo o título y el nombre de la empresa o centro educativo",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    let duplicado = false;

    datosCurriculo.experiencias.forEach((experiencia) => {
      if (
        experiencia.tipo.toLowerCase() === tipo.value.toLowerCase() &&
        experiencia.cargo_titulo.toLowerCase() ===
          cargo_titulo.value.toLowerCase() &&
        experiencia.empresa_centro_educativo ===
          empresa_centro_educativo.value.toLowerCase()
      ) {
        duplicado = true;
        return;
      }
    });

    if (duplicado) {
      cargo_titulo.value = "";
      empresa_centro_educativo.value = "";
      cargo_titulo.focus();

      Swal.fire({
        title: "Oops...",
        text: "Ya has agregado una experiencia con ese cargo / título en esa empresa / centro educativo",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    setDatosCurriculo({
      ...datosCurriculo,
      experiencias: [
        ...datosCurriculo.experiencias,
        {
          tipo: tipo.value,
          cargo_titulo: cargo_titulo.value,
          duracion: duracion.value,
          empresa_centro_educativo: empresa_centro_educativo.value,
        },
      ],
    });

    cargo_titulo.value = "";
    empresa_centro_educativo.value = "";
    duracion.selectedIndex = 0;
    cargo_titulo.focus();
  };

  const handleDeleteExp = (event) => {
    const rowIndex = event.target.parentNode.parentNode.rowIndex;
    const updatedExperiencias = datosCurriculo.experiencias.filter(
      (_, index) => index !== rowIndex - 1
    );

    setDatosCurriculo({
      ...datosCurriculo,
      experiencias: updatedExperiencias,
    });
  };

  const handleDeleteIdioma = (event) => {
    const rowIndex = event.target.parentNode.parentNode.rowIndex;
    const updatedIdiomas = datosCurriculo.idiomas.filter(
      (_, index) => index !== rowIndex - 1
    );

    setDatosCurriculo({
      ...datosCurriculo,
      idiomas: updatedIdiomas,
    });
  };

  const handleDeleteTituloObtenido = (event) => {
    const rowIndex = event.target.parentNode.parentNode.rowIndex;
    const updatedTitulosObtenidos = datosCurriculo.titulos_obtenidos.filter(
      (_, index) => index !== rowIndex - 1
    );

    setDatosCurriculo({
      ...datosCurriculo,
      titulos_obtenidos: updatedTitulosObtenidos,
    });
  };

  const handleUpdateCurriculo = async () => {
    if (
      !datosCurriculo.grado_instruccion ||
      !datosCurriculo.areas_interes.length
    ) {
      Swal.fire({
        title: "Oops...",
        text: "Datos faltantes",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (Object.keys(errors).length) {
      Swal.fire({
        title: "Oops...",
        text: "Verifique los errores en los campos e inténtelo de nuevo",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      dispatch(putCurriculo(token, datosCurriculo))
        .then(() => {
          // Acciones a realizar después de que se resuelva la promesa exitosamente
          dispatch(
            postCurriculoPDF(
              token,
              curriculoEmpleado.Empleado.empleado_id,
              curriculoEmpleado.Empleado.cedula
            )
          )
            .then((response) => {
              Swal.fire({
                text: "¿Deseas observar / descargar tu perfil?",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si",
                cancelButtonText: "No",
              }).then((result) => {
                if (result.isConfirmed) {
                  const URL_GET_PDF = `${URL_SERVER}/documentos_empleados/documento/${curriculoEmpleado.Empleado.cedula}/${response.data}`;

                  window.open(URL_GET_PDF, "_blank");
                }
              });
            })
            .catch((error) => {
              return error;
            });
        })
        .catch((error) => {
          return error;
        });
    } catch (error) {
      return error;
    }
  };

  const handleValidate = (e) => {
    const { name, value } = e.target;

    setErrors(validations({ ...errors, [name]: value }));
  };

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white static">
      <Title>Detalles del Perfil Profesional</Title>
      <br />
      <Hr />
      <br />
      {curriculoEmpleado && curriculoEmpleado?.curriculo_id ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mt-5 mb-5">
          <div className="flex flex-col place-content-between">
            <Label htmlFor="grado_instruccion">
              Grado de instrucción más alta obtenida
            </Label>
            <Select
              id="grado_instruccion"
              name="grado_instruccion"
              value={datosCurriculo.grado_instruccion}
              onChange={handleInputChangeCurriculo}
            >
              <option value="Basico">Básico</option>
              <option value="Bachiller">Bachiller</option>
              <option value="Tecnico Medio">Técnico Medio</option>
              <option value="Tecnico Medio Superior">
                Técnico Medio Superior
              </option>
              <option value="Universitario">Universitario</option>
            </Select>
          </div>
          <div className="md:col-span-2 flex flex-col place-content-between">
            <Label htmlFor="titulo_obtenido">
              Títulos obtenidos (Agregar todos uno por uno)
            </Label>
            <div className="flex gap-4">
              <Input
                id="titulo_obtenido"
                type="text"
                name="titulo_obtenido"
                onChange={handleValidate}
                placeholder="Ingrese el nombre del título"
              />
              {errors.titulo_obtenido && (
                <p className="text-xs sm:text-sm text-red-700 font-bold text-center">
                  {errors.titulo_obtenido}
                </p>
              )}
              <Button
                onClick={handleAddTituloObtenido}
                disabled={errors.titulo_obtenido}
                className={clsx("m-0 w-auto ", {
                  "opacity-50": errors.hasOwnProperty("titulo_obtenido"),
                })}
              >
                Agregar
              </Button>
            </div>
          </div>
          <div className="md:col-span-3 overflow-x-auto shadow-md rounded-lg">
            <table className="w-full mx-auto text-sm text-left rtl:text-right dark:text-gray-400">
              <thead className="text-xs uppercase bg-blue-600 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-white">
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      Títulos obtenidos agregados
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Acción</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {datosCurriculo.titulos_obtenidos.map((titulo_obtenido, i) => (
                  <tr
                    key={i}
                    className="bg-gray-300 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">{titulo_obtenido.nombre}</td>
                    <td className="px-4 py-4">
                      <span
                        className="font-medium text-red-600 hover:text-red-800 dark:text-blue-500 cursor-pointer"
                        onClick={handleDeleteTituloObtenido}
                      >
                        Borrar
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col place-content-between md:col-span-2 lg:col-span-1">
            <Label htmlFor="area_interes_id">
              Indica cuál es tu área de interés laboral
            </Label>
            <div className="flex gap-4">
              <Select
                id="area_interes_id"
                name="area_interes_id"
                className={`inline-block ${
                  isLoad.areas_interes ? null : "border-red-500"
                }`}
              >
                {areas_interes_activas?.length
                  ? areas_interes_activas?.map(
                      (area, i) =>
                        area.activo && (
                          <option
                            key={i}
                            name={area.nombre}
                            value={area.area_interes_id}
                          >
                            {area.nombre}
                          </option>
                        )
                    )
                  : null}
              </Select>
              <Button className="m-0 w-auto" onClick={handleAddArea}>
                Agregar
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <input
              id="disponibilidad_viajar"
              name="disponibilidad_viajar"
              type="checkbox"
              checked={datosCurriculo.disponibilidad_viajar}
              onChange={handleCheckedChangeCurriculo}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <Label htmlFor="disponibilidad_viajar">
              ¿Posees disponibilidad para viajar?
            </Label>
          </div>
          <div className="flex items-center justify-center gap-2">
            <input
              id="disponibilidad_cambio_residencia"
              name="disponibilidad_cambio_residencia"
              type="checkbox"
              checked={datosCurriculo.disponibilidad_cambio_residencia}
              onChange={handleCheckedChangeCurriculo}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <Label htmlFor="disponibilidad_cambio_residencia">
              ¿Posees disponibilidad para cambio de residencia?
            </Label>
          </div>
          <div className="md:col-span-3 overflow-x-auto shadow-md rounded-lg">
            <table className="w-full mx-auto text-sm text-left rtl:text-right dark:text-gray-400">
              <thead className="text-xs uppercase bg-blue-600 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-white">
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      Areas de interés seleccionadas
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Acción</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {datosCurriculo.areas_interes.map((area, i) => (
                  <tr
                    key={i}
                    className="bg-gray-300 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">{area.nombre}</td>
                    <td className="px-4 py-4">
                      <span
                        className="font-medium text-red-600 hover:text-red-800 dark:text-blue-500 cursor-pointer"
                        onClick={handleDeleteArea}
                      >
                        Borrar
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col place-content-between">
            <Label htmlFor="tipo">
              ¿Posees experiencia laboral o realizaste algún curso?
            </Label>
            <Select id="tipo" name="tipo" onChange={handleTipoExpSelected}>
              <option value="Ninguno">Ninguno</option>
              <option value="Laboral">Experiencia Laboral</option>
              <option value="Curso">Experiencia Curso</option>
            </Select>
          </div>
          <div
            className={` ${
              isHidden
                ? "hidden"
                : "flex flex-col place-content-between md:col-span-2 lg:col-span-1"
            }`}
          >
            <Label htmlFor="cargo_titulo">
              Cargo laboral o título conseguido (Agregar todos uno por uno)
            </Label>
            <div className="flex gap-4 w-full items-center">
              <Input
                id="cargo_titulo"
                type="text"
                name="cargo_titulo"
                onChange={handleValidate}
                placeholder="Ingrese el nombre del cargo o título"
              />
              {errors.cargo_titulo && (
                <p className="text-xs sm:text-sm text-red-700 font-bold text-center">
                  {errors.cargo_titulo}
                </p>
              )}
            </div>
          </div>
          <div
            className={` ${
              isHidden ? "hidden" : "flex flex-col place-content-between"
            }`}
          >
            <Label htmlFor="duracion">Duración de la experiencia</Label>
            <Select id="duracion" name="duracion">
              <option value="Menos de 1 año">Menos de 1 año</option>
              <option value="1-2 años">1-2 años</option>
              <option value="3-4 años">3-4 años</option>
              <option value="5 años o más">5 años o más</option>
            </Select>
          </div>
          <div
            className={` ${
              isHidden
                ? "hidden"
                : "flex flex-col place-content-between md:col-span-2"
            }`}
          >
            <Label htmlFor="empresa_centro_educativo">
              Nombre de la empresa / centro educativo
            </Label>
            <div className="flex gap-4 w-full items-center">
              <Input
                id="empresa_centro_educativo"
                type="text"
                name="empresa_centro_educativo"
                onChange={handleValidate}
                placeholder="Ingrese el nombre de la empresa / centro educativo"
              />
              {errors.empresa_centro_educativo && (
                <p className="text-xs sm:text-sm text-red-700 font-bold text-center">
                  {errors.empresa_centro_educativo}
                </p>
              )}
              <Button
                onClick={handleAddExperiencia}
                disabled={
                  errors.empresa_centro_educativo || errors.cargo_titulo
                }
                className={clsx("m-0 w-auto ", {
                  "opacity-50":
                    errors.hasOwnProperty("empresa_centro_educativo") ||
                    errors.hasOwnProperty("cargo_titulo"),
                })}
              >
                Agregar
              </Button>
            </div>
          </div>
          <div className="md:col-span-3 overflow-x-auto shadow-md rounded-lg">
            <table className="w-full mx-auto text-sm text-left rtl:text-right dark:text-gray-400">
              <thead className="text-xs uppercase bg-blue-600 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-white">
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      Experiencias agregadas
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Cargo / Título</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Duración</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      Empresa / Centro Educativo
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Acción</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {datosCurriculo.experiencias.map((experiencia, i) => (
                  <tr
                    key={i}
                    className="bg-gray-300 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">{experiencia.tipo}</td>
                    <td className="px-4 py-4">{experiencia.cargo_titulo}</td>
                    <td className="px-4 py-4">{experiencia.duracion}</td>
                    <td className="px-4 py-4">
                      {experiencia.empresa_centro_educativo}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className="font-medium text-red-600 hover:text-red-800 dark:text-blue-500 cursor-pointer"
                        onClick={handleDeleteExp}
                      >
                        Borrar
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col place-content-between">
            <Label htmlFor="idiomas">Conocimiento de idiomas</Label>
            <Select id="idiomas" name="idiomas" onChange={handleIdiomaSelected}>
              <option value="Ninguno">Ninguno</option>
              {idiomas_activos?.length
                ? idiomas_activos?.map(
                    (idioma, i) =>
                      idioma.activo && (
                        <option
                          key={i}
                          name={idioma.nombre}
                          value={idioma.idioma_id}
                        >
                          {idioma.nombre}
                        </option>
                      )
                  )
                : null}
            </Select>
          </div>
          <div
            className={`flex flex-col place-content-between ${
              isHiddenIdioma ? "hidden" : null
            }`}
          >
            <Label htmlFor="idiomas">Nivel del idioma</Label>
            <div className="flex gap-2">
              <Select
                id="nivel_idioma"
                name="nivel_idioma"
                onChange={handleTipoExpSelected}
              >
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </Select>
              <Button onClick={handleAddIdioma} className="m-0 w-auto">
                Agregar
              </Button>
            </div>
          </div>
          <div className="md:col-span-3 overflow-x-auto shadow-md rounded-lg">
            <table className="w-full mx-auto text-sm text-left rtl:text-right dark:text-gray-400">
              <thead className="text-xs uppercase bg-blue-600 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-white">
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Idiomas agregados</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Nivel</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Acción</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {datosCurriculo.idiomas.map((idioma, i) => (
                  <tr
                    key={i}
                    className="bg-gray-300 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">{idioma.nombre}</td>
                    <td className="px-4 py-4">
                      {idioma.nivel || idioma.Idiomas_Curriculo.nivel}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className="font-medium text-red-600 hover:text-red-800 dark:text-blue-500 cursor-pointer"
                        onClick={handleDeleteIdioma}
                      >
                        Borrar
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:col-span-3 flex flex-col place-content-between">
            <Label htmlFor="habilidades_tecnicas">Habilidades técnicas</Label>
            <div className="mt-2">
              <textarea
                id="habilidades_tecnicas"
                name="habilidades_tecnicas"
                rows="3"
                className="text-sm resize-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Escribe tus habilidades técnicas"
                onChange={handleInputChangeCurriculo}
                value={datosCurriculo.habilidades_tecnicas}
              ></textarea>
              {errors.habilidades_tecnicas && (
                <p className="text-xs sm:text-sm text-red-700 font-bold text-center">
                  {errors.habilidades_tecnicas}
                </p>
              )}
            </div>
          </div>
          <div className="md:col-span-3 flex justify-center items-center">
            <Button className="m-0 w-auto" onClick={handleUpdateCurriculo}>
              Guardar Cambios
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
