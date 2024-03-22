import React from "react";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getAllAreasInteres } from "../../redux/areasinteres/areainteresAction";

import { Button, Input, Label, Select, Title } from "../UI";

export function Curriculo() {
  const dispatch = useDispatch();
  const empleado = useSelector((state) => state.empleado);
  const areas_interes = useSelector((state) => state.areas_interes);

  const [data, setData] = useState({
    empleado_id: empleado.empleado.empleado_id,
    grado_instruccion: "Basico",
    titulo_obtenido: "",
    centro_educativo: "",
    area_interes_id: "",
    area_interes_otro: "",
    disponibilidad_viajar: "true",
    disponibilidad_cambio_residencia: "true",
    ruta_pdf: "",
    estado: "Pendiente por revisar",
  });

  const handlePDF = (event) => {
    const input = event.target;
    const file = input.files[0];

    if (!file) {
      return; // No se seleccionó ningún archivo
    }

    const allowedTypes = ["application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      input.value = ""; // Borra el valor del campo de entrada
      return alert("¡Solo se permiten archivos PDF!");
    }

    handleInputChange(event);
  };

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getAllAreasInteres());
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setData({ ...data, [name]: value });
  };

  const handleCreateCurriculo = (event) => {
    event.preventDefault();
  };

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white static">
      <Title>Datos Currículo</Title>
      <hr className="w-[80%] h-0.5 my-5 bg-gray-300 border-0 m-auto" />

      <form>
        <div className="grid gap-6 md:grid-cols-2 mt-5">
          <div>
            <Label>Grado de instrucción</Label>
            <Select
              name="grado_instruccion"
              value={data.grado_instruccion}
              onChange={handleInputChange}
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
            <Label>Título obtenido</Label>
            <Input
              type="text"
              name="titulo_obtenido"
              placeholder="Ingrese el nombre de su título obtenido"
              value={data.titulo_obtenido}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Centro Educativo</Label>
            <Input
              type="text"
              name="centro_educativo"
              placeholder="Ingrese el nombre del centro educativo donde obtuvo su título"
              value={data.centro_educativo}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Indica cuál es tu área de interés laboral</Label>
            <Select
              name="area_interes_id"
              value={data.area_interes_id}
              onChange={handleInputChange}
            >
              {areas_interes &&
              areas_interes.areas_interes &&
              areas_interes.areas_interes.length > 0
                ? areas_interes?.areas_interes.map(
                    (area, i) =>
                      area.activo && (
                        <option key={i} value={area.area_interes_id}>
                          {area.nombre}
                        </option>
                      )
                  )
                : null}
            </Select>
          </div>

          <div>
            <Label>Área de interés (Otro)</Label>
            <Input
              type="text"
              name="area_interes_otro"
              placeholder="Ingrese el nombre del área de interés"
              value={data.area_interes_otro}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>¿Disponibilidad para viajar?</Label>
            <div className="mt-4">
              <input
                id="disponibilidad_viajar_si"
                type="radio"
                name="disponibilidad_viajar"
                value="true"
                defaultChecked
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
              <label htmlFor="disponibilidad_viajar_no" className="ml-1">
                No
              </label>
            </div>
          </div>
          <div>
            <Label>¿Disponibilidad para cambio de residencia?</Label>
            <div className="mt-4">
              <input
                id="disponibilidad_cambio_residencia_si"
                type="radio"
                name="disponibilidad_cambio_residencia"
                value="true"
                defaultChecked
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
              <label
                htmlFor="disponibilidad_cambio_residencia_no"
                className="ml-1"
              >
                No
              </label>
            </div>
          </div>
          <div>
            <Label>Adjunte su resumen curricular (PDF)</Label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              accept="application/pdf"
              onChange={handlePDF}
              name="ruta_pdf"
              value={data.ruta_pdf}
            />
            <p
              className="mt-1 text-sm text-red-600 dark:text-gray-300"
              id="file_input_help"
            >
              ¡Solo archivos en formato PDF!
            </p>
          </div>
        </div>
        <Button onClick={handleCreateCurriculo}>Continuar</Button>
      </form>
    </div>
  );
}