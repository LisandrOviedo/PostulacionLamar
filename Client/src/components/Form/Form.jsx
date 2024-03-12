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
    <div className="h-full flex flex-col px-5 sm:px-10 bg-[#FFCC00] static">
      <Link to="/" className="absolute top-0 mt-5 hover:opacity-80">
        <span className="text-xl sm:text-2xl">⬅️</span>
      </Link>
      <div className="mt-5 w-full flex flex-col items-center">
        <Link
          to="https://grupo-lamar.com/es/"
          target="_blank"
          className="hover:opacity-70"
        >
          <Logo className="w-20 mb-4 sm:w-28" />
        </Link>
        <h1 className="text-xl font-bold text-center">
          Postulación ({cedula})
        </h1>
      </div>
      <hr className="w-[50%] h-0.5 my-5 bg-gray-100 border-0 m-auto" />
      <div>
        <form>
          <div className="border-b flex flex-col items-center border-gray-900/10 pb-1">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Información Personal
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Rellena todos los campos y presiona continuar.
            </p>
          </div>
          <div className="mt-5 -mx-6 flex flex-col gap-5">
            <div className="w-full px-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Nombre completo
              </label>
              <Input type="text" name="nombre_completo" />
            </div>

            <div className="w-2/5 px-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Cédula
              </label>
              <Input type="text" name="cedula" value={cedula} readOnly={true} />
            </div>

            <div className="w-3/5 px-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Correo electrónico
              </label>
              <Input type="email" name="email" />
            </div>

            <div className="sm:w-[12%] px-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Número de contacto
              </label>
              <Input type="text" name="telefono" />
            </div>

            <div className="sm:w-[38%] px-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Dirección
              </label>
              <Input type="text" name="direccion" />
            </div>

            <div className="sm:w-[15%] px-6 mt-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Grado de instrucción
              </label>
              <div className="mt-2">
                <select
                  name="grado_instruccion"
                  className="p-2 h-[2.25rem] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Básico</option>
                  <option>Bachiller</option>
                  <option>Técnico Medio</option>
                  <option>Técnico Medio Superior</option>
                  <option>Universitario</option>
                </select>
              </div>
            </div>

            <div className="sm:w-[25%] px-6 mt-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Título obtenido
              </label>
              <Input type="text" name="titulo_obtenido" />
            </div>

            <div className="sm:w-[25%] px-6 mt-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Indique cúal es su empresa de adscripción
              </label>
              <div className="mt-2">
                <select
                  name="empresa_adscripcion"
                  className="p-2 h-[2.25rem] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>ALTAMAR</option>
                  <option>ANTARTICA</option>
                  <option>AQUAZUL</option>
                  <option>ASTREA</option>
                  <option>ATLANTICO</option>
                  <option>BALANCEADOS</option>
                  <option>CAMACO</option>
                  <option>CATABRE</option>
                  <option>INMARLACA CORPORATIVO</option>
                  <option>ING. 3030</option>
                  <option>INMARLACA</option>
                  <option>LAMARSA</option>
                  <option>LAS CAMELIAS</option>
                  <option>LCDA</option>
                  <option>OPINDULCA</option>
                  <option>PLAMERA DEL LAGO</option>
                  <option>TRANSALCA</option>
                  <option>Otro</option>
                </select>
              </div>
            </div>

            <div className="sm:w-1/2 px-6 mt-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Indique su cargo actual
              </label>
              <Input type="text" name="cargo_actual" />
            </div>

            <div className="sm:w-[25%] px-6 mt-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Indica cuál es tu área de interés laboral
              </label>
              <div className="mt-2">
                <select
                  name="interes_laboral"
                  className="p-2 h-[2.25rem] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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

            <div className="sm:w-1/2 px-6 mt-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Adjunte su resumen curricular (PDF)
              </label>
              <Input type="text" name="cargo_actual" />
            </div>
            <br />
          </div>
        </form>
      </div>
    </div>
  );
}
