import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import validations from "./validations";

import Button from "../UI/Button";
import Input from "../UI/Input";
import Label from "../UI/Label";

export function Form() {
  const { cedula } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState({
    cedula: "",
  });

  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    setErrors(
      validations({
        ...data,
        [e.target.name]: e.target.value,
      })
    );
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white static">
      <h1 className="text-lg sm:text-xl font-bold text-center">
        Postulación ({cedula})
      </h1>
      <hr className="w-[80%] h-0.5 my-5 bg-gray-300 border-0 m-auto" />

      <form>
        <div className="grid gap-6 md:grid-cols-2 mt-5">
          <div>
            <Label text="Nombre completo" />
            <Input
              type="text"
              name="nombre_completo"
              placeholder="Ingrese su nombre completo"
              required
            />
          </div>
          <div>
            <Label text="Cédula" />
            <Input
              type="text"
              name="cedula"
              placeholder="Ingrese su número de cédula"
              required
            />
          </div>
          <div>
            <Label text="Correo electrónico" />
            <Input
              type="email"
              name="email"
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>
          <div>
            <Label text="Número de contacto" />
            <Input
              type="tel"
              name="telefono"
              placeholder="Ingrese su número de teléfono celular"
              pattern="[0-9]"
              required
            />
          </div>
          <div>
            <Label text="Dirección" />
            <Input
              type="text"
              name="direccion"
              placeholder="Ingrese su dirección completa"
              required
            />
          </div>
          <div>
            <Label text="Grado de instrucción" />
            <select
              name="grado_instruccion"
              className="cursor-pointer bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-[#002846] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Básico</option>
              <option>Bachiller</option>
              <option>Técnico Medio</option>
              <option>Técnico Medio Superior</option>
              <option>Universitario</option>
            </select>
          </div>

          <div>
            <Label text="Título obtenido" />
            <Input
              type="text"
              name="titulo_obtenido"
              placeholder="Ingrese el nombre de su título obtenido en su grado de instrucción"
              required
            />
          </div>
          <div>
            <Label text="Indica cuál es tu área de interés laboral" />
            <select
              name="interes_laboral"
              className="cursor-pointer bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-[#002846] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
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
            </select>
          </div>
          <div>
            <Label text="Adjunte su resumen curricular (PDF)" />
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              accept="application/pdf"
            />
            <p
              className="mt-1 text-sm text-red-600 dark:text-gray-300"
              id="file_input_help"
            >
              ¡Solo archivos en formato PDF!
            </p>
          </div>
          {/* <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
              .
            </label>
          </div> */}
        </div>
        <Button type="submit">Continuar</Button>
      </form>
    </div>
  );
}
