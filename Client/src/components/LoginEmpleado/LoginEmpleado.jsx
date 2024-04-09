import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import validations from "./validations";

import { Button, Input, Label, Title } from "../UI";

import { getLogin, resetEmpleados } from "../../redux/empleados/empleadoAction";
import { resetCurriculos } from "../../redux/curriculos/curriculoAction";

import Swal from "sweetalert2";

export function LoginEmpleado() {
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

    document.title = "Grupo Lamar - Login";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    if (empleado.changePassword) {
      return navigate("/empleado/cambioClave");
    } else if (
      (empleado.activo && empleado.rol === "empleado") ||
      empleado.rol === "admin"
    ) {
      return navigate("/home");
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
    <div className="flex mt-14 sm:mt-0 sm:h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div>
          <Link
            to="https://grupo-lamar.com/es/"
            target="_blank"
            className="hover:opacity-70"
          >
            <img src="/LogoAzul.png" alt="Logo Grupo Lamar" className="w-32" />
          </Link>
        </div>
        <div>
          <Title className="mt-4 text-2xl font-bold leading-9 tracking-tight">
            Acceso Empleado
          </Title>
        </div>
      </div>

      <div className="mt-10 w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%] space-y-6">
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