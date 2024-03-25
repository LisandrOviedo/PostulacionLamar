import React from "react";
import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { getAllAreasInteres } from "../../redux/areasinteres/areainteresAction";

import { Button, Input, Label, Select, Title } from "../UI";

export function Curriculo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const empleado = useSelector((state) => state.empleado);
  const areas_interes = useSelector((state) => state.areas_interes);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const [datosCurriculo, setDatosCurriculo] = useState({
    empleado_id: empleado.empleado.empleado_id,
    grado_instruccion: "Basico",
    titulo_obtenido: "",
    disponibilidad_viajar: "true",
    disponibilidad_cambio_residencia: "true",
    areas_interes: [], // ID's de las áreas
    experiencia_tipo: "Ninguno",
    cargos_titulos: [],
    experiencia_duracion: "Menos de 1 año",
  });

  const [isReadOnly, setIsReadOnly] = useState(true);

  const handlePDF = (event) => {
    const input = event.target;
    const pdf = input.files[0];

    if (!pdf) {
      return; // No se seleccionó ningún archivo
    }

    const allowedTypes = ["application/pdf"];

    if (!allowedTypes.includes(pdf.type)) {
      input.value = ""; // Borra el valor del campo de entrada
      return alert("¡Solo se permiten archivos PDF!");
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getAllAreasInteres());
  }, []);

  const handleInputChangeCurriculo = (event) => {
    const { name, value } = event.target;

    setDatosCurriculo({ ...datosCurriculo, [name]: value });
  };

  const handleCargoTituloSelected = () => {
    const select = document.getElementById("cargo_titulo_id");
    const name = select.options[select.selectedIndex].text;
    const cargoTituloOtro = document.getElementById("cargo_titulo_otro");

    if (name === "Otro") {
      return setIsReadOnly(false);
    }

    if (isReadOnly === false) {
      cargoTituloOtro.value = "";
      return setIsReadOnly(true);
    }
  };

  // const handleAddCargoTitulo = (event) => {
  //   event.preventDefault();

  //   if (datosCurriculo.cargos_titulos.length === 3) {
  //     return alert("Solo puedes agregar máximo 3 áreas de interés");
  //   }

  //   const areaOtro = document.getElementById("area_interes_otro");
  //   const select = document.getElementById("area_interes_id");
  //   const name = select.options[select.selectedIndex].text;
  //   const value = select.options[select.selectedIndex].value;

  //   const areaValidatorInclude = datosCurriculo.areas_interes.some(
  //     (area) => area.area_interes_id === value && area.nombre === name
  //   );

  //   if (areaValidatorInclude) {
  //     areaOtro.value = "";
  //     return alert("Ya has agregado esta área de interés");
  //   }

  //   if (name === "Otro") {
  //     if (areaOtro.value === "") {
  //       areaOtro.focus();
  //       return alert("Debes escribir el nombre del área que deseas añadir");
  //     }

  //     setDatosCurriculo({
  //       ...datosCurriculo,
  //       areas_interes: [
  //         ...datosCurriculo.areas_interes,
  //         { area_interes_id: value, nombre: name, nombre_otro: areaOtro.value },
  //       ],
  //     });

  //     areaOtro.value = "";
  //     select.selectedIndex = 0;

  //     return setIsReadOnly(true);
  //   }

  //   select.selectedIndex = 0;

  //   return setDatosCurriculo({
  //     ...datosCurriculo,
  //     areas_interes: [
  //       ...datosCurriculo.areas_interes,
  //       { area_interes_id: value, nombre: name, nombre_otro: "" },
  //     ],
  //   });
  // };

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

    select.selectedIndex = 0;

    return setIsReadOnly(true);
  };

  const handleCreateCurriculo = async (event) => {
    event.preventDefault();

    const input = document.getElementById("pdf");
    const pdf = input.files[0];

    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("empleado_id", datosCurriculo.empleado_id);
    formData.append("grado_instruccion", datosCurriculo.grado_instruccion);
    formData.append("titulo_obtenido", datosCurriculo.titulo_obtenido);
    formData.append("centro_educativo", datosCurriculo.centro_educativo);
    formData.append(
      "disponibilidad_viajar",
      datosCurriculo.disponibilidad_viajar
    );
    formData.append(
      "disponibilidad_cambio_residencia",
      datosCurriculo.disponibilidad_cambio_residencia
    );

    const { data } = await axios.post(`${URL_SERVER}/curriculos`, formData);

    if (data.curriculo_id) {
      await axios.post(`${URL_SERVER}/curriculos/agregarArea`, {
        curriculo_id: data.curriculo_id,
        areas_interes: datosCurriculo.areas_interes,
      });
      return alert("Curriculo registrado");
    }

    return alert(data);
  };

  const handleDeleteRow = (event) => {
    const rowIndex = event.target.parentNode.parentNode.rowIndex;
    const updatedAreasInteres = datosCurriculo.areas_interes.filter(
      (_, index) => index !== rowIndex - 1
    );

    setDatosCurriculo({
      ...datosCurriculo,
      areas_interes: updatedAreasInteres,
    });
  };

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white static">
      <Title>Datos Currículo</Title>
      <hr className="w-[80%] h-0.5 my-5 bg-gray-300 border-0 m-auto" />

      <form>
        <div className="grid gap-6 md:grid-cols-3 mt-5 mb-5">
          <div>
            <Label htmlFor="grado_instruccion">
              Grado de instrucción más alta
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
          <div>
            <Label htmlFor="titulo_obtenido">
              Títulos obtenidos (Agregar todos)
            </Label>
            <div className="flex gap-4 w-full items-start">
              <Input
                id="titulo_obtenido"
                type="text"
                name="titulo_obtenido"
                placeholder="Ingrese el nombre del título"
                value={datosCurriculo.titulo_obtenido}
                onChange={handleInputChangeCurriculo}
              />
              <Button className="m-0" onClick={handleAddArea}>
                Agregar
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="pdf">Adjunte su resumen curricular (PDF)</Label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="pdf"
              type="file"
              accept="application/pdf"
              onChange={handlePDF}
              name="pdf"
            />
            <p
              className="mt-1 text-sm text-red-600 dark:text-gray-300"
              id="file_input_help"
            >
              ¡Solo archivos en formato PDF!
            </p>
          </div>
          <div>
            <Label htmlFor="area_interes_id">
              Indica cuál es tu área de interés laboral
            </Label>
            <div className="flex gap-4 w-full items-start">
              <Select
                id="area_interes_id"
                name="area_interes_id"
                className="inline-block"
              >
                {areas_interes &&
                areas_interes.areas_interes &&
                areas_interes.areas_interes.length > 0
                  ? areas_interes?.areas_interes.map(
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
              <Button className="m-0" onClick={handleAddArea}>
                Agregar
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="disponibilidad_viajar_si">
              ¿Posees disponibilidad para viajar?
            </Label>
            <div className="mt-4">
              <input
                id="disponibilidad_viajar_si"
                type="radio"
                name="disponibilidad_viajar"
                value="true"
                defaultChecked
                onChange={handleInputChangeCurriculo}
              />
              <label htmlFor="disponibilidad_viajar_si" className="ml-1">
                Si
              </label>
              <input
                id="disponibilidad_viajar_no"
                type="radio"
                name="disponibilidad_viajar"
                value="false"
                className="ml-6"
                onChange={handleInputChangeCurriculo}
              />
              <label htmlFor="disponibilidad_viajar_no" className="ml-1">
                No
              </label>
            </div>
          </div>
          <div>
            <Label htmlFor="disponibilidad_cambio_residencia_si">
              ¿Posees disponibilidad para cambio de residencia?
            </Label>
            <div className="mt-4">
              <input
                id="disponibilidad_cambio_residencia_si"
                type="radio"
                name="disponibilidad_cambio_residencia"
                value="true"
                defaultChecked
                onChange={handleInputChangeCurriculo}
              />
              <label
                htmlFor="disponibilidad_cambio_residencia_si"
                className="ml-1"
              >
                Si
              </label>
              <input
                id="disponibilidad_cambio_residencia_no"
                type="radio"
                name="disponibilidad_cambio_residencia"
                value="false"
                className="ml-6"
                onChange={handleInputChangeCurriculo}
              />
              <label
                htmlFor="disponibilidad_cambio_residencia_no"
                className="ml-1"
              >
                No
              </label>
            </div>
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
                    <div className="flex items-center">Descripción (Otro)</div>
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
                    <td className="px-4 py-4">{area.nombre_otro}</td>
                    <td className="px-4 py-4">
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-blue-500"
                        onClick={handleDeleteRow}
                      >
                        Borrar
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <Label htmlFor="experiencia_tipo">
              ¿Posees experiencia laboral o realizaste algún curso?
            </Label>
            <Select
              id="experiencia_tipo"
              name="experiencia_tipo"
              value={datosCurriculo.experiencia_tipo}
              onChange={handleInputChangeCurriculo}
            >
              <option value="Ninguno">Ninguno</option>
              <option value="Laboral">Experiencia Laboral</option>
              <option value="Curso">Experiencia Curso</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="experiencia_duracion">
              Duración de la experiencia
            </Label>
            <Select
              id="experiencia_duracion"
              name="experiencia_duracion"
              value={datosCurriculo.experiencia_duracion}
              onChange={handleInputChangeCurriculo}
            >
              <option value="Menos de 1 año">Menos de 1 año</option>
              <option value="1-2 años">1-2 años</option>
              <option value="3-4 años">3-4 años</option>
              <option value="5 años o más">5 años o más</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="cargo_titulo_id">
              ¿Cual fue tu cargo laboral o título obtenido en el curso?
            </Label>
            <div className="flex gap-4 w-full items-start">
              <Select
                id="cargo_titulo_id"
                name="cargo_titulo_id"
                onChange={handleCargoTituloSelected}
                className="inline-block"
              >
                {areas_interes &&
                areas_interes.areas_interes &&
                areas_interes.areas_interes.length > 0
                  ? areas_interes?.areas_interes.map(
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
              <Button className="m-0">Agregar</Button>
            </div>
          </div>
          <div>
            <Label htmlFor="cargo_titulo_otro">
              Agregar otro cargo laboral o título obtenido en el curso
              (Opcional)
            </Label>
            <Input
              id="cargo_titulo_otro"
              type="text"
              name="cargo_titulo_otro"
              placeholder="Ingrese el nombre del cargo o título"
              readOnly={isReadOnly}
            />
          </div>
          <div>
            <Label htmlFor="empresa_centro_educativo">
              Nombre de empresa / centro educativo
            </Label>
            <Input
              id="empresa_centro_educativo"
              type="text"
              name="empresa_centro_educativo"
              placeholder="Ingrese el nombre de la empresa / centro educativo"
            />
          </div>
          <div className="flex items-end">
            <Button className="m-0" onClick={handleCreateCurriculo}>
              Continuar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
