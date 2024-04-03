import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import validations from "./validations";

import { useDispatch, useSelector } from "react-redux";

import { Button, Input, Title } from "../UI";
import { getLogin, resetEmpleados } from "../../redux/empleados/empleadoAction";
import { resetCurriculos } from "../../redux/curriculos/curriculoAction";

export function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const empleado = useSelector((state) => state.empleados.empleado);

  const [data, setData] = useState({
    cedula: "",
    clave: "",
  });

  const [errors, setErrors] = useState({});

  const handleFindCI = () => {
    const { cedula, clave } = data;

    try {
      dispatch(getLogin(cedula, clave));
    } catch (error) {
      alert(error.response.data.error);
    }
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

    dispatch(resetEmpleados());
    dispatch(resetCurriculos());
  }, []);

  useEffect(() => {
    if (empleado.changePassword) {
      return navigate("/empleado/cambioClave");
    } else if (empleado.activo) {
      return navigate("/form/datosPersonales");
    }
  }, [empleado, navigate]);

  return (
    <div className="mt-24 sm:mt-32 flex flex-col justify-center items-center px-10 bg-white h-full">
      <Title>Identificación de Talentos</Title>
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
      <label htmlFor="cedula" className="text-center text-base sm:text-lg">
        Ingrese su número de cédula y clave para empezar:
      </label>
      <br />
      <Input
        className="w-28 text-center"
        type="text"
        name="cedula"
        id="cedula"
        value={data.cedula}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        placeholder="Cédula"
        minLength="1"
        maxLength="9"
        required
      />
      <p className="text-base sm:text-lg text-red-700 font-bold text-center">
        {errors.cedula}
      </p>
      <br />
      <Input
        className="w-28 text-center"
        type="password"
        name="clave"
        id="clave"
        value={data.clave}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        placeholder="Clave"
        minLength="4"
        maxLength="4"
        required
      />
      <p className="text-base sm:text-lg text-red-700 font-bold text-center">
        {errors.clave}
      </p>
      <Button
        id="btn_continuar"
        type="submit"
        onClick={handleFindCI}
        disabled={
          Object.keys(errors).length > 0 ||
          Object.keys(data.cedula).length <= 0 ||
          Object.keys(data.clave).length <= 0
        }
        className={clsx("", {
          "opacity-50":
            Object.keys(errors).length > 0 ||
            Object.keys(data.cedula).length <= 0 ||
            Object.keys(data.clave).length <= 0,
        })}
      >
        Continuar
      </Button>
    </div>
  );
}
