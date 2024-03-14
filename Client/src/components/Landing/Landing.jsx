import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import validations from "./validations";

import { Button, Input } from "../UI";

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
    <div className="mt-24 sm:mt-32 flex flex-col justify-center items-center px-10 bg-white h-full">
      <h1 className="text-lg sm:text-xl font-bold text-center">
        Identificación de Talentos
      </h1>
      <br />
      <p className="text-center text-sm sm:text-base">
        A fin de identificar talentos potenciales en la organización, le
        invitamos a completar el siguiente formulario donde deberá indicar su
        profesión y/o experiencia, así como tu área de interés laboral.
      </p>
      <hr className="w-[50%] h-0.5 my-5 bg-gray-100 border-0" />
      <span className="text-base sm:text-lg text-center">
        Observaciones para el llenado del formulario:
      </span>
      <br />
      <ul className="list-disc text-center sm:text-left text-sm sm:text-base">
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
      <label className="text-center text-base sm:text-lg">
        Ingrese su número de cédula para empezar:
      </label>
      <br />

      <Input
        className="w-28 text-center"
        type="text"
        name="cedula"
        value={data.cedula}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        placeholder="12345678"
        minLength="1"
        maxLength="9"
        required
      ></Input>

      {/* <input className="text-base text-center mb-2 appearance-none border-0 w-24 p-3 block rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#002846] sm:text-sm sm:leading-6" /> */}
      <p className="text-base sm:text-lg text-red-700 font-bold text-center">
        {errors.cedula}
      </p>
      <Button
        id="btn_continuar"
        type="submit"
        onClick={handleFindCI}
        disabled={
          Object.keys(errors).length > 0 || Object.keys(data.cedula).length <= 0
        }
        className={clsx("", {
          "opacity-50":
            Object.keys(errors).length > 0 ||
            Object.keys(data.cedula).length <= 0,
        })}
      >
        Continuar
      </Button>
    </div>
  );
}
