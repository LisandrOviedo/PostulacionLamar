import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import validations from "../../utils/validacionesAcceso";

import { Button, Input, Label, Select, Span, Title } from "../UI";

import { MdCancel } from "react-icons/md";

import { getLogin } from "../../redux/empleados/empleadosActions";

import Swal from "sweetalert2";

export function AccesoAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const empleado = useSelector((state) => state.empleados.empleado);

  const [data, setData] = useState({
    tipo_identificacion: "V",
    numero_identificacion: "",
  });

  const [errors, setErrors] = useState({});

  const [primerUseEffectCompletado, setPrimerUseEffectCompletado] =
    useState(false);

  const URL_INTRANET = import.meta.env.VITE_URL_INTRANET;

  const handleLogin = () => {
    const { tipo_identificacion, numero_identificacion, clave } = data;

    dispatch(getLogin(tipo_identificacion, numero_identificacion, clave));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const continuar = document.getElementById("btn_continuar");
      continuar.click();
    }
  };

  useEffect(() => {
    window.scroll(0, 0);

    if (empleado.activo && empleado.Role.acceso_admin) {
      return navigate("/admin/panel");
    }

    document.title = "Grupo Lamar - Login (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    if (!primerUseEffectCompletado) {
      setPrimerUseEffectCompletado(true);
      return;
    }

    if (empleado?.changePassword) {
      return navigate("/miPerfil/actualizarClaveTemporal");
    } else if (empleado.activo && !empleado.Role.acceso_admin) {
      Swal.fire({
        text: "Datos incorrectos",
        icon: "error",
      });
    } else if (empleado.activo && empleado.Role.acceso_admin) {
      Swal.fire({
        title: "¡Bienvenido!",
        text: "Sesión iniciada correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        width: "20em",
      });

      if (location.state?.from) {
        return navigate(location.state.from);
      } else {
        return navigate("/admin/panel");
      }
    }
  }, [empleado]);

  const handleHelp = () => {
    return Swal.fire({
      title: "¡Atención!",
      text: "Contacte al departamento de Talento Humano para recuperar su contraseña",
      icon: "info",
    });
  };

  const handleValidate = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
    setErrors(validations({ ...data, [name]: value }));
  };

  return (
    <div className="flex mt-14 sm:mt-0 sm:h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div>
          <Link to={URL_INTRANET} className="hover:opacity-70">
            <img src="./LogoAzul.png" alt="Logo Grupo Lamar" className="w-32" />
          </Link>
        </div>
        <div>
          <Title className="mt-4 text-2xl font-bold leading-9 tracking-tight">
            Acceso Administrador
          </Title>
        </div>
      </div>
      <div className="mt-10 w-[80%] sm:w-[50%] md:w-[40%] lg:w-[30%] space-y-6">
        <div>
          <Label
            htmlFor="numero_identificacion"
            errors={errors.numero_identificacion}
          >
            Número de identificación
          </Label>
          <div className="flex justify-between gap-2">
            <Select
              className="w-auto"
              name="tipo_identificacion"
              value={data.tipo_identificacion}
              onChange={handleValidate}
            >
              <option value="V">V</option>
              <option value="E">E</option>
            </Select>

            <div className="relative w-full">
              <Input
                id="numero_identificacion"
                name="numero_identificacion"
                value={data.numero_identificacion}
                errors={errors.numero_identificacion}
                onChange={handleValidate}
                onKeyDown={handleKeyDown}
                maxLength="20"
              />
              {errors.numero_identificacion && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
          </div>
          {errors.numero_identificacion && (
            <Span className="m-0">{errors.numero_identificacion}</Span>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between mb-1 gap-4 sm:gap-0">
            <Label htmlFor="clave">Contraseña</Label>
            <button
              className="font-semibold text-[#002846] hover:text-[#002846]/[.5] text-xs sm:text-sm bg-transparent border-none focus:outline-none"
              onClick={handleHelp}
            >
              ¿Olvidó su contraseña?
            </button>
          </div>
          <Input
            id="clave"
            name="clave"
            type="password"
            placeholder="********"
            onChange={handleValidate}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Button
            id="btn_continuar"
            onClick={handleLogin}
            disabled={
              Object.keys(errors).length ||
              !data.tipo_identificacion ||
              !data.numero_identificacion ||
              !data.clave
            }
            className={`${
              (Object.keys(errors).length ||
                !data.tipo_identificacion ||
                !data.numero_identificacion ||
                !data.clave) &&
              "opacity-50"
            }`}
          >
            Acceder
          </Button>
          <Link
            to="/"
            className="font-semibold text-[#002846] hover:text-[#002846]/[.5] text-xs sm:text-sm"
          >
            Ir a la vista de empleado
          </Link>
        </div>
      </div>
    </div>
  );
}
