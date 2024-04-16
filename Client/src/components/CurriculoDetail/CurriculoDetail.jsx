import React from "react";

import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getAllAreasInteresActivas } from "../../redux/areasinteres/areainteresAction";
import { putCurriculo } from "../../redux/curriculos/curriculoAction";

import { Button, Input, Label, Select, Title } from "../UI";

import Swal from "sweetalert2";

export function CurriculoDetail() {
  const dispatch = useDispatch();

  const curriculoEmpleado = useSelector(
    (state) => state.curriculos.curriculoEmpleado
  );

  const areas_interes_activas = useSelector(
    (state) => state.areas_interes.areas_interes_activas
  );

  const [datosCurriculo, setDatosCurriculo] = useState({
    curriculo_id: curriculoEmpleado.curriculo_id,
    grado_instruccion: curriculoEmpleado.grado_instruccion,
    titulos_obtenidos: curriculoEmpleado.Titulo_Obtenidos,
    disponibilidad_viajar: curriculoEmpleado.disponibilidad_viajar,
    disponibilidad_cambio_residencia:
      curriculoEmpleado.disponibilidad_cambio_residencia,
    cantidad_hijos: curriculoEmpleado.cantidad_hijos,
    habilidades_tecnicas: curriculoEmpleado.habilidades_tecnicas,
    areas_interes: curriculoEmpleado.Areas_Interes,
    experiencias: curriculoEmpleado.Experiencia,
  });

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(getAllAreasInteresActivas());

    document.title = "Grupo Lamar - Modificar Currículo";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  const [isHidden, setIsHidden] = useState(true);

  const [isLoad, setIsLoad] = useState({
    areas_interes: true,
  });

  const handleInputChangeCurriculo = (event) => {
    const { name, value } = event.target;

    setDatosCurriculo({ ...datosCurriculo, [name]: value });
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

  const handleAddArea = (event) => {
    event.preventDefault();

    if (datosCurriculo.areas_interes.length === 3) {
      return alert("Solo puedes agregar máximo 3 áreas de interés");
    }

    const select = document.getElementById("area_interes_id");
    const name = select.options[select.selectedIndex].text;
    const value = select.options[select.selectedIndex].value;

    const areaValidatorInclude = datosCurriculo.areas_interes.some(
      (area) => area.area_interes_id === value && area.nombre === name
    );

    if (areaValidatorInclude) {
      return alert("Ya has agregado esta área de interés");
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

    select.selectedIndex = 0;
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

  const handleAddTituloObtenido = (event) => {
    event.preventDefault();

    const select = document.getElementById("titulo_obtenido");

    if (!select.value) {
      select.focus();
      return alert("Debes ingresar el nombre del título obtenido");
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
      return alert("Ya has agregado un título obtenido con ese nombre");
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

  const handleAddExperiencia = (event) => {
    event.preventDefault();

    const tipo = document.getElementById("tipo");
    const cargo_titulo = document.getElementById("cargo_titulo");
    const duracion = document.getElementById("duracion");
    const empresa_centro_educativo = document.getElementById(
      "empresa_centro_educativo"
    );

    if (tipo.value === "Ninguno") {
      return alert("Debes seleccionar un tipo de experiencia");
    }

    if (!cargo_titulo.value || !empresa_centro_educativo) {
      cargo_titulo.focus();
      return alert(
        "Debes escribir el nombre del cargo o título y el nombre de la empresa o centro educativo"
      );
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
      return alert(
        "Ya has agregado una experiencia con ese cargo / título en esa empresa / centro educativo"
      );
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

  const handleValidateChildrens = () => {
    const input = document.getElementById("cantidad_hijos");

    if (input.value < 0) {
      input.value = 0;
    }

    if (input.value > 15) {
      input.value = 15;
    }

    setDatosCurriculo({ ...datosCurriculo, cantidad_hijos: input.value });
  };

  const handleValidateChildrensEmpty = () => {
    const input = document.getElementById("cantidad_hijos");

    if (!input.value) {
      input.value = 0;
    }

    setDatosCurriculo({ ...datosCurriculo, cantidad_hijos: input.value });
  };

  const handleUpdateCurriculo = async () => {
    if (
      !datosCurriculo.grado_instruccion ||
      !datosCurriculo.areas_interes.length
    ) {
      return Swal.fire({
        title: "Oops...",
        text: "Datos faltantes",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    try {
      dispatch(putCurriculo(datosCurriculo));
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white static">
      <Title>Detalles Currículo</Title>
      <hr className="w-[80%] h-0.5 my-5 bg-gray-300 border-0 m-auto" />
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
                placeholder="Ingrese el nombre del título"
              />
              <Button className="m-0 w-auto" onClick={handleAddTituloObtenido}>
                Agregar
              </Button>
            </div>
          </div>
          <div className="md:col-span-3">
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
                    className="bg-gray-400 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">{titulo_obtenido.nombre}</td>
                    <td className="px-4 py-4">
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-blue-500"
                        onClick={handleDeleteTituloObtenido}
                      >
                        Borrar
                      </a>
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
                {areas_interes_activas?.length > 0
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
          <div className="md:col-span-3">
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
                    className="bg-gray-400 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">{area.nombre}</td>
                    <td className="px-4 py-4">
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-blue-500"
                        onClick={handleDeleteArea}
                      >
                        Borrar
                      </a>
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

            <Input
              id="cargo_titulo"
              type="text"
              name="cargo_titulo"
              placeholder="Ingrese el nombre del cargo o título"
            />
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
            <div className="flex gap-4 w-full items-start">
              <Input
                id="empresa_centro_educativo"
                type="text"
                name="empresa_centro_educativo"
                placeholder="Ingrese el nombre de la empresa / centro educativo"
              />
              <Button className="m-0 w-auto" onClick={handleAddExperiencia}>
                Agregar
              </Button>
            </div>
          </div>
          <div className="flex flex-col place-content-between">
            <Label htmlFor="cantidad_hijos">Cantidad de hijos</Label>
            <Input
              id="cantidad_hijos"
              type="number"
              name="cantidad_hijos"
              min="0"
              max="15"
              value={datosCurriculo.cantidad_hijos}
              onChange={handleValidateChildrens}
              onBlur={handleValidateChildrensEmpty}
            />
          </div>
          <div className="md:col-span-3">
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
                    className="bg-gray-400 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">{experiencia.tipo}</td>
                    <td className="px-4 py-4">{experiencia.cargo_titulo}</td>
                    <td className="px-4 py-4">{experiencia.duracion}</td>
                    <td className="px-4 py-4">
                      {experiencia.empresa_centro_educativo}
                    </td>
                    <td className="px-4 py-4">
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-blue-500"
                        onClick={handleDeleteExp}
                      >
                        Borrar
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:col-span-3 flex flex-col place-content-between">
            <Label htmlFor="cantidad_hijos">Habilidades técnicas</Label>
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
