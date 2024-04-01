import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import validations from "./validations";

import axios from "axios";

import { Button, Input, Title } from "../UI";

export function UpdatePassword() {
  const navigate = useNavigate();

  const [access, setAccess] = useState({});

  const { empleado_id } = useParams();

  const [data, setData] = useState({
    clave: "",
    confirmarClave: "",
  });

  const [errors, setErrors] = useState({});

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const handleFindCI = async () => {
    const URL_LOGIN = `${URL_SERVER}/empleados/modificarClave`;

    const body = {
      empleado_id: empleado_id,
      clave: data.clave,
    };

    try {
      const { data } = await axios.put(URL_LOGIN, body);

      setAccess(data);
    } catch (error) {
      if (
        error.response.data.error ===
        "Error al modificar el empleado: Ya has restablecido tu contraseña anteriormente"
      ) {
        alert(error.response.data.error);
        return navigate("/");
      }
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
  }, []);

  useEffect(() => {
    if (access.empleado_id && access.activo) {
      navigate(`/form/datospersonales/${access.empleado_id}`);
      return alert("Su contraseña ha sido actualizada, puede continuar");
    }
  }, [access]);

  return (
    <div className="mt-24 sm:mt-32 flex flex-col justify-center items-center px-10 bg-white h-full">
      <Title>Actualización de contraseña</Title>
      <br />
      <p className="text-center text-sm sm:text-base">
        ¡Hola, bienvenid@! Haz ingresado con una contraseña temporal, por
        seguridad, para continuar deberás actualizar tu contraseña
      </p>
      <hr className="w-[50%] h-0.5 my-5 bg-gray-100 border-0" />
      <label htmlFor="clave" className="text-center text-base sm:text-lg">
        Ingrese su nueva contraseña (¡No la olvides!):
      </label>
      <br />
      <Input
        className="w-32 text-center"
        type="password"
        name="clave"
        id="clave"
        value={data.clave}
        onChange={handleOnChange}
        placeholder="Nueva clave"
        minLength="4"
        maxLength="4"
        required
      />
      <p className="text-base sm:text-lg text-red-700 font-bold text-center">
        {errors.clave}
      </p>
      <br />
      <Input
        className="w-32 text-center"
        type="password"
        name="confirmarClave"
        id="confirmarClave"
        value={data.confirmarClave}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        placeholder="Confirmar clave"
        minLength="4"
        maxLength="4"
        required
      />
      <p className="text-base sm:text-lg text-red-700 font-bold text-center">
        {errors.confirmarClave}
      </p>
      <Button
        id="btn_continuar"
        type="submit"
        onClick={handleFindCI}
        disabled={
          Object.keys(errors).length > 0 ||
          Object.keys(data.clave).length <= 0 ||
          Object.keys(data.confirmarClave).length <= 0
        }
        className={clsx("", {
          "opacity-50":
            Object.keys(errors).length > 0 ||
            Object.keys(data.clave).length <= 0 ||
            Object.keys(data.confirmarClave).length <= 0,
        })}
      >
        Continuar
      </Button>
    </div>
  );
}
