import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import validations from "../../utils/validacionesActualizarClaveTemporal";

import { useSelector } from "react-redux";

import { Button, Hr, Input, Label, Title } from "../UI";

import { putPasswordTemporal } from "../../redux/empleados/empleadosActions";

export function ActualizarClaveTemporal() {
  const navigate = useNavigate();

  const empleado = useSelector((state) => state.empleados.empleado);

  const [data, setData] = useState({
    clave: "",
    confirmarClave: "",
  });

  const [errors, setErrors] = useState({});

  const handleUpdatePassword = async () => {
    const body = {
      empleado_id: empleado.empleado_id,
      clave: data.clave,
    };

    try {
      await putPasswordTemporal(body);

      if (empleado.rol === "admin") {
        navigate("/admin/acceso");
        return;
      }

      navigate("/");
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
      <p className="text-center text-sm sm:text-base">
        ¡Hola, bienvenid@! Haz ingresado con una contraseña temporal, por
        seguridad, para continuar deberás actualizar tu contraseña
      </p>
      <br />
      <Hr />
      <br />
      <Label htmlFor="clave" className="text-center sm:text-base">
        Ingrese su nueva contraseña (¡No la olvides!):
      </Label>
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
      {errors.clave && (
        <p className="text-base sm:text-lg text-red-700 font-bold text-center">
          {errors.clave}
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
          Object.keys(errors).length || !data.clave || !data.confirmarClave
        }
        className={clsx("w-auto", {
          "opacity-50":
            Object.keys(errors).length || !data.clave || !data.confirmarClave,
        })}
      >
        Continuar
      </Button>
    </div>
  );
}
