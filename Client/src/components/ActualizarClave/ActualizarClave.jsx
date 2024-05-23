import { clsx } from "clsx";
import { useEffect, useState } from "react";

import validations from "../../utils/validacionesActualizarClave";

import { useSelector } from "react-redux";

import { Button, Input, Title } from "../UI";

import { putPassword } from "../../redux/empleados/empleadoAction";

export function ActualizarClave() {
  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const [data, setData] = useState({
    claveAnterior: "",
    claveNueva: "",
    confirmarClave: "",
  });

  const [errors, setErrors] = useState({});

  const handleUpdatePassword = async () => {
    const body = {
      empleado_id: empleado.empleado_id,
      claveAnterior: data.claveAnterior,
      claveNueva: data.claveNueva,
    };

    try {
      await putPassword(token, body);

      window.location.reload();
    } catch (error) {
      return error;
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

    document.title = "Grupo Lamar - Actualizar Clave Temporal";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  return (
    <div className="mt-24 sm:mt-32 flex flex-col justify-center items-center px-10 bg-white h-full">
      <Title>Actualización de contraseña</Title>
      <br />
      <Input
        className="w-32 text-center"
        type="password"
        name="claveAnterior"
        id="claveAnterior"
        value={data.claveAnterior}
        onChange={handleOnChange}
        placeholder="Clave Actual"
        minLength="4"
        maxLength="4"
        required
      />
      {errors.claveAnterior && (
        <p className="text-base sm:text-lg text-red-700 font-bold text-center">
          {errors.claveAnterior}
        </p>
      )}
      <br />
      <Input
        className="w-32 text-center"
        type="password"
        name="claveNueva"
        id="claveNueva"
        value={data.claveNueva}
        onChange={handleOnChange}
        placeholder="Clave Nueva"
        minLength="4"
        maxLength="4"
        required
      />
      {errors.claveNueva && (
        <p className="text-base sm:text-lg text-red-700 font-bold text-center">
          {errors.claveNueva}
        </p>
      )}
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
      {errors.confirmarClave && (
        <p className="text-base sm:text-lg text-red-700 font-bold text-center">
          {errors.confirmarClave}
        </p>
      )}
      <Button
        id="btn_continuar"
        type="submit"
        onClick={handleUpdatePassword}
        disabled={
          Object.keys(errors).length ||
          !data.claveAnterior ||
          !data.claveNueva ||
          !data.confirmarClave
        }
        className={clsx("w-auto", {
          "opacity-50":
            Object.keys(errors).length ||
            !data.claveAnterior ||
            !data.claveNueva ||
            !data.confirmarClave,
        })}
      >
        Continuar
      </Button>
    </div>
  );
}
