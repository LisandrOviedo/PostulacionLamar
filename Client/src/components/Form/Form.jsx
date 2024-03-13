import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Button from "../UI/Button";
import Logo from "../UI/Logo";
import Input from "../UI/Input";

import validations from "./validations";

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
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre_completo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ingrese su nombre completo"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Cédula
            </label>
            <input
              type="text"
              name="cedula"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ingrese su número de cédula"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Número de contacto
            </label>
            <input
              type="tel"
              name="telefono"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ingrese su número de teléfono celular"
              pattern="[0-9]"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ingrese su dirección completa"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Grado de instrucción
            </label>
            <select
              name="grado_instruccion"
              className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#002846] sm:text-sm sm:leading-6"
            >
              <option>Básico</option>
              <option>Bachiller</option>
              <option>Técnico Medio</option>
              <option>Técnico Medio Superior</option>
              <option>Universitario</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Título obtenido
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ingrese el nombre de su título obtenido en su grado de instrucción"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Indica cuál es tu área de interés laboral
            </label>
            <select
              name="interes_laboral"
              className="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#002846] sm:text-sm sm:leading-6"
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
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Adjunte su resumen curricular (PDF)
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
            />
            <p
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              PDF (Máx. 10 mb).
            </p>
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            {/* <label
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
            </label> */}
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Continuar
        </button>
      </form>
    </div>
  );
}

{
  /* <form>
        <div className="border-b flex flex-col items-center border-gray-900/10 pb-1">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Información Personal
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Rellena todos los campos y presiona continuar.
          </p>
        </div>
        <div className="mt-5 -mx-6 flex flex-col gap-5">
          <div className="w-1/3 px-6">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Nombre completo
            </label>
            <Input type="text" name="nombre_completo" />
          </div>

          <div className="w-1/6 px-6">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Cédula
            </label>
            <Input type="text" name="cedula" value={cedula} readOnly={true} />
          </div>

          <div className="w-1/3 px-6">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Correo electrónico
            </label>
            <Input type="email" name="email" />
          </div>

          <div className="sm:w-1/6 px-6">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Número de contacto
            </label>
            <Input type="text" name="telefono" />
          </div>

          <div className="sm:w-1/2 px-6">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Dirección
            </label>
            <Input type="text" name="direccion" />
          </div>

          <div className="sm:w-1/6 px-6 mt-5">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Grado de instrucción
            </label>
            <div className="mt-2">
              <select
                name="grado_instruccion"
                className="p-2 h-[2.25rem] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#002846] sm:text-sm sm:leading-6"
              >
                <option>Básico</option>
                <option>Bachiller</option>
                <option>Técnico Medio</option>
                <option>Técnico Medio Superior</option>
                <option>Universitario</option>
              </select>
            </div>
          </div>

          <div className="sm:w-1/3 px-6 mt-5">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Título obtenido
            </label>
            <Input type="text" name="titulo_obtenido" />
          </div>
          <div className="sm:w-1/5 px-6 mt-5">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Indica cuál es tu área de interés laboral
            </label>
            <div className="mt-2">
              <select
                name="interes_laboral"
                className="p-2 h-[2.25rem] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#002846] sm:text-sm sm:leading-6"
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
          </div>

          <div className="sm:w-1/6 px-6 mt-5">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Adjunte su resumen curricular (PDF)
            </label>
            <Input type="text" name="cargo_actual" />
          </div>
          <br />
        </div>
      </form> */
}
