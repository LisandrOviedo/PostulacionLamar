import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import validations from "./Validations/login";

import { Button, Input, Label, Title } from "../UI";

import { getLogin, resetEmpleados } from "../../redux/empleados/empleadoAction";
import { resetCurriculos } from "../../redux/curriculos/curriculoAction";

import Swal from "sweetalert2";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const empleado = useSelector((state) => state.empleados.empleado);

  const [data, setData] = useState({
    cedula: "",
    clave: "",
  });

  const [errors, setErrors] = useState({});

  const handleLogin = () => {
    const { cedula, clave } = data;

    dispatch(getLogin(cedula, clave))
      .then(() => {
        // Acciones a realizar después de que se resuelva la promesa exitosamente
      })
      .catch((error) => {
        return error;
      });
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
    if (empleado.activo && empleado.rol === "empleado") {
      Swal.fire({
        text: "Datos incorrectos",
        icon: "error",
      });
    } else if (empleado.activo && empleado.rol === "admin") {
      return navigate("/admin/dashboard");
    }
  }, [empleado]);

  const handleHelp = () => {
    return Swal.fire({
      title: "¡Atención!",
      text: "Contacte al departamento de desarrollo para recuperar su contraseña",
      icon: "info",
    });
  };

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Acceso Administrativo
        </Title>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-[40%] sm:max-w-sm space-y-6">
        <div>
          <Label htmlFor="cedula">Número de cédula</Label>
          <div className="mt-2">
            <Input
              id="cedula"
              name="cedula"
              type="text"
              placeholder="123456789"
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              minLength="1"
              maxLength="9"
              required
            />
            <p className="text-xs sm:text-sm text-red-700 font-bold text-center">
              {errors.cedula}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="clave">Contraseña</Label>
            <div className="text-sm">
              <a
                className="cursor-pointer font-semibold text-[#002846] hover:text-blue-800 text-xs sm:text-sm ml-2 sm:ml-0"
                onClick={handleHelp}
              >
                ¿Olvidó su contraseña?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <Input
              id="clave"
              name="clave"
              type="password"
              placeholder="********"
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              minLength="1"
              required
            />
            <p className="text-xs sm:text-sm text-red-700 font-bold text-center">
              {errors.clave}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button
            id="btn_continuar"
            type="submit"
            onClick={handleLogin}
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
            Acceder
          </Button>
        </div>
      </div>
    </div>
  );
}
