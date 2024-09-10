import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { getAllAreasInteresActivas } from "../../redux/areasInteres/areasInteresActions";
import { getAllIdiomasActivos } from "../../redux/idiomas/idiomasActions";
import {
  putCurriculo,
  postCurriculoPDF,
  getCurriculoEmpleado,
} from "../../redux/curriculos/curriculosActions";

import {
  Button,
  CheckBox,
  Date,
  Hr,
  Input,
  Label,
  Select,
  TextArea,
  Title,
} from "../UI";

import { YYYYMMDD } from "../../utils/formatearFecha";

import validations from "../../utils/validacionesCurriculo";

import Swal from "sweetalert2";

export function CrearCurriculo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const token = useSelector((state) => state.empleados.token);

  const curriculoEmpleado = useSelector(
    (state) => state.curriculos.curriculoEmpleado
  );

  const empleado = useSelector((state) => state.empleados.empleado);

  const areas_interes_activas = useSelector(
    (state) => state.areas_interes.areas_interes_activas
  );

  const idiomas_activos = useSelector((state) => state.idiomas.idiomas_activos);

  const [datosCurriculo, setDatosCurriculo] = useState({
    empleado_id: empleado.empleado_id,
    curriculo_id: curriculoEmpleado?.Curriculo?.curriculo_id || "",
    titulos_obtenidos: curriculoEmpleado?.Titulos_Obtenidos || [],
    disponibilidad_viajar:
      curriculoEmpleado?.Curriculo?.disponibilidad_viajar || false,
    disponibilidad_cambio_residencia:
      curriculoEmpleado?.Curriculo?.disponibilidad_cambio_residencia || false,
    habilidades_tecnicas:
      curriculoEmpleado?.Curriculo?.habilidades_tecnicas || "",
    areas_interes: curriculoEmpleado?.Curriculo?.Areas_Interes || [],
    experiencias: curriculoEmpleado?.Experiencias || [],
    idiomas: curriculoEmpleado?.Curriculo?.Idiomas || [],
  });

  const [errors, setErrors] = useState({});

  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenIdioma, setIsHiddenIdioma] = useState(true);

  const [isLoad, setIsLoad] = useState({
    areas_interes: datosCurriculo.areas_interes.length ? true : false,
  });

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(getAllAreasInteresActivas(token));

    dispatch(getAllIdiomasActivos(token));

    document.title = "Grupo Lamar - Perfil Profesional";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, [curriculoEmpleado]);

  useEffect(() => {
    if (
      areas_interes_activas?.length &&
      searchParams.get("areaInteres") &&
      parseInt(searchParams.get("areaInteres"))
    ) {
      const select = document.getElementById("area_interes_id");

      select.value = searchParams.get("areaInteres");
    }
  }, [areas_interes_activas]);

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

  const handleTipoExpSelected = (e) => {
    const { value } = e.target;

    if (value === "Ninguno") {
      setIsHidden(true);
    } else if (value !== "Ninguno" && isHidden) {
      setIsHidden(false);
    }
  };

  const handleIdiomaSelected = (e) => {
    const { value } = e.target;

    const nivel_idioma = document.getElementById("nivel_idioma");

    if (nivel_idioma.selectedIndex !== 0) {
      nivel_idioma.selectedIndex = 0;
    }

    if (value === "Ninguno") {
      setIsHiddenIdioma(true);
    } else if (value !== "Ninguno" && isHiddenIdioma) {
      setIsHiddenIdioma(false);
    }
  };

  const handleAddArea = () => {
    if (datosCurriculo.areas_interes.length === 3) {
      Swal.fire({
        title: "Oops...",
        text: "Solo puedes agregar máximo 3 áreas de interés",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const select = document.getElementById("area_interes_id");
    const name = select.options[select.selectedIndex].text;
    const value = select.options[select.selectedIndex].value;

    const areaValidatorInclude = datosCurriculo.areas_interes.some(
      (area) => area.area_interes_id === parseInt(value) && area.nombre === name
    );

    if (areaValidatorInclude) {
      Swal.fire({
        title: "Oops...",
        text: "Ya has agregado esa área de interés",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    setDatosCurriculo({
      ...datosCurriculo,
      areas_interes: [
        ...datosCurriculo.areas_interes,
        { area_interes_id: parseInt(value), nombre: name },
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
        text: "Ya has agregado ese idioma",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    setDatosCurriculo({
      ...datosCurriculo,
      idiomas: [
        ...datosCurriculo.idiomas,
        { idioma_id: id, nombre: nombre, Idiomas_Curriculos: { nivel: nivel } },
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
    const input_fecha_desde = document.getElementById(
      "fecha_desde_titulo_obtenido"
    );
    const input_grado_instruccion =
      document.getElementById("grado_instruccion");
    const input_fecha_hasta = document.getElementById(
      "fecha_hasta_titulo_obtenido"
    );
    const input_nombre_instituto = document.getElementById("nombre_instituto");
    const input_titulo_obtenido = document.getElementById("titulo_obtenido");

    if (
      !input_fecha_desde.value ||
      !input_fecha_hasta.value ||
      !input_nombre_instituto.value ||
      !input_titulo_obtenido.value
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

    const tituloValidatorInclude = datosCurriculo.titulos_obtenidos.some(
      (titulo) =>
        titulo.grado_instruccion === input_grado_instruccion.value &&
        titulo.nombre_instituto === input_nombre_instituto.value &&
        titulo.titulo_obtenido === input_titulo_obtenido.value
    );

    if (tituloValidatorInclude) {
      Swal.fire({
        title: "Oops...",
        text: "Ya has agregado ese título",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    setDatosCurriculo({
      ...datosCurriculo,
      titulos_obtenidos: [
        ...datosCurriculo.titulos_obtenidos,
        {
          grado_instruccion: input_grado_instruccion.value,
          fecha_desde: input_fecha_desde.value,
          fecha_hasta: input_fecha_hasta.value,
          nombre_instituto: input_nombre_instituto.value,
          titulo_obtenido: input_titulo_obtenido.value,
        },
      ],
    });

    input_grado_instruccion.value = "Primaria";
    input_fecha_desde.value = null;
    input_fecha_hasta.value = null;
    input_nombre_instituto.value = null;
    input_titulo_obtenido.value = null;
  };

  const handleAddExperiencia = () => {
    const tipo = document.getElementById("tipo");
    const cargo_titulo = document.getElementById("cargo_titulo");
    const fecha_desde_experiencia = document.getElementById(
      "fecha_desde_experiencia"
    );
    const fecha_hasta_experiencia = document.getElementById(
      "fecha_hasta_experiencia"
    );
    const empresa_centro_educativo = document.getElementById(
      "empresa_centro_educativo"
    );

    if (
      !tipo.value ||
      !empresa_centro_educativo.value ||
      !cargo_titulo.value ||
      !fecha_desde_experiencia.value ||
      !fecha_hasta_experiencia.value
    ) {
      Swal.fire({
        title: "Oops...",
        text: "Faltan campos por llenar para añadir tu experiencia",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const expValidatorInclude = datosCurriculo.experiencias.some(
      (experiencia) =>
        experiencia.tipo.toLowerCase() === tipo.value.toLowerCase() &&
        experiencia.cargo_titulo.toLowerCase() ===
          cargo_titulo.value.toLowerCase() &&
        experiencia.empresa_centro_educativo ===
          empresa_centro_educativo.value.toLowerCase()
    );

    if (expValidatorInclude) {
      Swal.fire({
        title: "Oops...",
        text: "Ya has agregado esa experiencia",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    setDatosCurriculo({
      ...datosCurriculo,
      experiencias: [
        ...datosCurriculo.experiencias,
        {
          tipo: tipo.value,
          empresa_centro_educativo: empresa_centro_educativo.value,
          cargo_titulo: cargo_titulo.value,
          fecha_desde: fecha_desde_experiencia.value,
          fecha_hasta: fecha_hasta_experiencia.value,
        },
      ],
    });

    cargo_titulo.value = null;
    empresa_centro_educativo.value = null;
    fecha_desde_experiencia.value = null;
    fecha_hasta_experiencia.value = null;
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

  const handleSaveCurriculo = async () => {
    if (!datosCurriculo.areas_interes.length) {
      return Swal.fire({
        title: "Oops...",
        text: "Debes añadir al menos 1 área de interés",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }

    try {
      dispatch(putCurriculo(token, datosCurriculo))
        .then(() => {
          dispatch(getCurriculoEmpleado(token, empleado.empleado_id));

          dispatch(
            postCurriculoPDF(
              token,
              empleado.empleado_id,
              `${empleado.tipo_identificacion}${empleado.numero_identificacion}`
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
                  const URL_GET_PDF = `${URL_SERVER}/documentos_empleados/documento/${empleado.tipo_identificacion}${empleado.numero_identificacion}/${response.data}`;
                  window.open(URL_GET_PDF, "_blank");
                }
              });
              navigate("/inicio");
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

  const handleValidateDate = (e) => {
    const fecha_desde_titulo_obtenido = document.getElementById(
      "fecha_desde_titulo_obtenido"
    );
    const fecha_hasta_titulo_obtenido = document.getElementById(
      "fecha_hasta_titulo_obtenido"
    );
    const fecha_desde_experiencia = document.getElementById(
      "fecha_desde_experiencia"
    );
    const fecha_hasta_experiencia = document.getElementById(
      "fecha_hasta_experiencia"
    );

    if (
      fecha_desde_titulo_obtenido.value &&
      fecha_hasta_titulo_obtenido.value &&
      fecha_desde_titulo_obtenido.value >= fecha_hasta_titulo_obtenido.value
    ) {
      Swal.fire({
        title: "Oops...",
        text: `La "fecha desde" del título obtenido no puede ser igual o menor que la "fecha hasta"`,
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });

      fecha_desde_titulo_obtenido.value = null;
      fecha_hasta_titulo_obtenido.value = null;
      return;
    }

    if (
      fecha_desde_experiencia.value &&
      fecha_hasta_experiencia.value &&
      fecha_desde_experiencia.value >= fecha_hasta_experiencia.value
    ) {
      Swal.fire({
        title: "Oops...",
        text: `La "fecha desde" de la experiencia no puede ser igual o menor que la "fecha hasta"`,
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });

      fecha_desde_experiencia.value = null;
      fecha_hasta_experiencia.value = null;
      return;
    }

    const { name, value } = e.target;

    const fecha_actual = YYYYMMDD();

    if (value > fecha_actual) {
      const input = document.getElementById(name);

      input.value = fecha_actual;
    }
  };

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white">
      <Title>Perfil Profesional</Title>
      <br />
      <Hr />
      <br />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mt-5 mb-5">
        <div className="flex flex-col place-content-between">
          <Label htmlFor="grado_instruccion">Grado de instrucción</Label>
          <Select
            id="grado_instruccion"
            name="grado_instruccion"
            defaultValue="Primaria"
          >
            <option value="Primaria">Primaria</option>
            <option value="Secundaria">Secundaria</option>
            <option value="Técnica">Técnica</option>
            <option value="Universitaria">Universitaria</option>
            <option value="Postgrado">Postgrado</option>
          </Select>
        </div>
        <div className="flex flex-col place-content-between">
          <Label htmlFor="fecha_desde_titulo_obtenido">Fecha desde</Label>
          <Date
            id="fecha_desde_titulo_obtenido"
            name="fecha_desde_titulo_obtenido"
            type="date"
            max={YYYYMMDD()}
            onChange={handleValidateDate}
          />
        </div>
        <div className="flex flex-col place-content-between">
          <Label htmlFor="fecha_hasta_titulo_obtenido">Fecha hasta</Label>
          <Date
            id="fecha_hasta_titulo_obtenido"
            name="fecha_hasta_titulo_obtenido"
            type="date"
            max={YYYYMMDD()}
            onChange={handleValidateDate}
          />
        </div>
        <div className="md:col-span-2 flex flex-col place-content-between">
          <Label htmlFor="nombre_instituto">Nombre instituto</Label>
          <div className="flex gap-4 w-full items-start">
            <Input
              id="nombre_instituto"
              type="text"
              name="nombre_instituto"
              onChange={handleValidate}
              placeholder="Ingrese el nombre del instituto"
            />
            {errors.nombre_instituto && (
              <p className="text-xs sm:text-sm text-red-700 font-bold text-center">
                {errors.nombre_instituto}
              </p>
            )}
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col place-content-between">
          <Label htmlFor="titulo_obtenido">Título obtenido</Label>
          <div className="flex gap-4 w-full items-start">
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
            <Button onClick={handleAddTituloObtenido} className="m-0 w-auto">
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
                  <div className="flex items-center">Grado instrucción</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Fecha desde</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Fecha hasta</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Nombre instituto</div>
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
                  <td className="px-4 py-4">
                    {titulo_obtenido.titulo_obtenido}
                  </td>
                  <td className="px-4 py-4">
                    {titulo_obtenido.grado_instruccion}
                  </td>
                  <td className="px-4 py-4">{titulo_obtenido.fecha_desde}</td>
                  <td className="px-4 py-4">{titulo_obtenido.fecha_hasta}</td>
                  <td className="px-4 py-4">
                    {titulo_obtenido.nombre_instituto}
                  </td>
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
          <div className="flex gap-4 w-full items-start">
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
          <CheckBox
            id="disponibilidad_viajar"
            name="disponibilidad_viajar"
            checked={datosCurriculo.disponibilidad_viajar}
            onChange={handleCheckedChangeCurriculo}
          />
          <Label className="select-none" htmlFor="disponibilidad_viajar">
            ¿Posees disponibilidad para viajar?
          </Label>
        </div>
        <div className="flex items-center justify-center gap-2">
          <CheckBox
            id="disponibilidad_cambio_residencia"
            name="disponibilidad_cambio_residencia"
            checked={datosCurriculo.disponibilidad_cambio_residencia}
            onChange={handleCheckedChangeCurriculo}
          />
          <Label className="select-none" htmlFor="disponibilidad_cambio_residencia">
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
          <Label htmlFor="fecha_desde_experiencia">Fecha desde</Label>
          <Date
            id="fecha_desde_experiencia"
            name="fecha_desde_experiencia"
            type="date"
            max={YYYYMMDD()}
            onChange={handleValidateDate}
          />
        </div>
        <div
          className={` ${
            isHidden ? "hidden" : "flex flex-col place-content-between"
          }`}
        >
          <Label htmlFor="fecha_hasta_experiencia">Fecha hasta</Label>
          <Date
            id="fecha_hasta_experiencia"
            name="fecha_hasta_experiencia"
            type="date"
            max={YYYYMMDD()}
            onChange={handleValidateDate}
          />
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
            <Button onClick={handleAddExperiencia} className="m-0 w-auto">
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
                  <div className="flex items-center">Fecha desde</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Fecha hasta</div>
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
                  <td className="px-4 py-4">{experiencia.fecha_desde}</td>
                  <td className="px-4 py-4">{experiencia.fecha_hasta}</td>
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
            <Select id="nivel_idioma" name="nivel_idioma">
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
                    {idioma.Idiomas_Curriculos.nivel}
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
            <TextArea
              id="habilidades_tecnicas"
              name="habilidades_tecnicas"
              rows="3"
              placeholder="Escribe tus habilidades técnicas"
              onChange={handleInputChangeCurriculo}
              value={datosCurriculo.habilidades_tecnicas}
            />
            {errors.habilidades_tecnicas && (
              <p className="text-xs sm:text-sm text-red-700 font-bold text-center">
                {errors.habilidades_tecnicas}
              </p>
            )}
          </div>
        </div>
        <div className="md:col-span-3 flex justify-center items-center">
          <Button className="m-0 w-auto" onClick={handleSaveCurriculo}>
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
}
