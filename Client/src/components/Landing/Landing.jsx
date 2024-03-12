import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Button from "../UI/Button";
import Logo from "../UI/Logo";

import validations from "./validations";

export function Landing() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    cedula: "",
  });
  const [errors, setErrors] = useState({});

  const handleFindCI = () => {
    const cedula = data.cedula;

    navigate(`/form/${cedula}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const continuar = document.getElementById("btn_continuar");
      continuar.click();
    }
  };

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
    <div className="h-screen flex flex-col justify-center items-center px-10 bg-[#FFCC00]">
      <Link
        to="https://grupo-lamar.com/es/"
        target="_blank"
        className="hover:opacity-70"
      >
        <Logo className="w-20 mb-4 sm:w-28" />
      </Link>
      <h1 className="text-xl font-bold text-center">
        Identificación de Talentos
      </h1>
      <br />
      <p className="text-center">
        A fin de identificar talentos potenciales en la organización, le
        invitamos a completar el siguiente formulario donde deberá indicar su
        profesión y/o experiencia, así como tu área de interés laboral.
      </p>
      <hr className="w-[50%] h-0.5 my-5 bg-gray-100 border-0" />
      <span className="text-lg text-center">
        Observaciones para el llenado del formulario:
      </span>
      <br />
      <ul className="list-disc text-center sm:text-left">
        <li>
          Disponibilidad de tiempo de 30 minutos para aplicación del Test de
          Valoración Actitudinal
        </li>
        <li>
          Cargar resumen curricular en formato PDF{" "}
          <img className="w-[1.2rem] inline" src="/PDF.svg" alt="PDF Icon" />
        </li>
      </ul>
      <br />
      <label className="text-center">
        Ingrese su número de cédula para empezar:
      </label>
      <br />
      <input
        className="text-center mb-2 shadow appearance-none border rounded w-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="cedula"
        value={data.cedula}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        placeholder="12345678"
        minLength="1"
        maxLength="9"
      />
      <p className="mb-1 text-red-700 font-bold text-center">{errors.cedula}</p>
      <Button
        id="btn_continuar"
        type="submit"
        onClick={handleFindCI}
        disabled={
          Object.keys(errors).length > 0 || Object.keys(data.cedula).length <= 0
        }
      >
        Continuar
      </Button>
    </div>
  );
}
