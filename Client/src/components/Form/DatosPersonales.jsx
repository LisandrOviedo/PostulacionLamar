import { useEffect } from "react";

import { useSelector } from "react-redux";

import { Button, Input, Label, Title } from "../UI";

export function DatosPersonales() {
  const empleado = useSelector((state) => state.empleado);

  // const handlePDF = (event) => {
  //   const input = event.target;
  //   const file = input.files[0];

  //   if (!file) {
  //     return; // No se seleccionó ningún archivo
  //   }

  //   const allowedTypes = ["application/pdf"];

  //   if (!allowedTypes.includes(file.type)) {
  //     input.value = ""; // Borra el valor del campo de entrada
  //     return alert("¡Solo se permiten archivos PDF!");
  //   }
  // };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white static">
      <Title>Datos Personales</Title>
      <hr className="w-[80%] h-0.5 my-5 bg-gray-300 border-0 m-auto" />

      <form>
        <div className="grid gap-6 md:grid-cols-2 mt-5">
          <div>
            <Label>Nombre completo</Label>
            <Input
              type="text"
              name="nombre_completo"
              value={`${empleado.empleado.nombres} ${empleado.empleado.apellidos}`}
              readOnly
            />
          </div>
          <div>
            <Label>Cédula</Label>
            <Input
              type="text"
              name="cedula"
              value={empleado.empleado.cedula}
              readOnly
            />
          </div>
          <div>
            <Label>Correo electrónico</Label>
            <Input
              type="email"
              name="email"
              value={empleado.empleado.correo}
              readOnly
            />
          </div>
          <div>
            <Label>Número de contacto</Label>
            <Input
              type="tel"
              name="telefono"
              pattern="[0-9]"
              value={empleado.empleado.telefono}
              readOnly
            />
          </div>
          <div>
            <Label>Dirección</Label>
            <Input
              type="text"
              name="direccion"
              value={empleado.empleado.direccion}
              readOnly
            />
          </div>
          <div>
            <Label>Cargo Actual</Label>
            <Input
              type="text"
              name="cargo_actual"
              value={empleado.empleado.direccion}
              readOnly
            />
          </div>
          <div>
            <Label>Empresa</Label>
            <Input
              type="text"
              name="nombre_empresa"
              value={empleado.empleado.direccion}
              readOnly
            />
          </div>
          {/* <div>
            <Label>Grado de instrucción</Label>
            <Select name="grado_instruccion">
              <option>Básico</option>
              <option>Bachiller</option>
              <option>Técnico Medio</option>
              <option>Técnico Medio Superior</option>
              <option>Universitario</option>
            </Select>
          </div>

          <div>
            <Label>Título obtenido</Label>
            <Input
              type="text"
              name="titulo_obtenido"
              placeholder="Ingrese el nombre de su título obtenido en su grado de instrucción"
              
            />
          </div>
          <div>
            <Label>Indica cuál es tu área de interés laboral</Label>
            <Select name="interes_laboral">
              <option>Administración</option>
              <option>Cadena de suministros</option>
              <option>Mantenimiento</option>
              <option>Producción</option>
              <option>Proyectos</option>
              <option>SIG y permisología</option>
              <option>SSST</option>
              <option>Talento Humano</option>
              <option>Tecnología e informática</option>
              <option>Otro</option>
            </Select>
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
            />
            <p
              className="mt-1 text-sm text-red-600 dark:text-gray-300"
              id="file_input_help"
            >
              ¡Solo archivos en formato PDF!
            </p>
          </div> */}
        </div>
        <Button type="submit">Continuar</Button>
      </form>
    </div>
  );
}
