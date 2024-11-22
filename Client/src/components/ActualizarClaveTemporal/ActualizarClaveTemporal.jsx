import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validations from "../../utils/validacionesActualizarClaveTemporal";
import { useSelector } from "react-redux";
import { Button, Hr, Input, Label, Title, Span } from "../UI";
import { MdCancel } from "react-icons/md";
import { putPasswordTemporal } from "../../redux/empleados/empleadosActions";

export default function ActualizarClaveTemporal() {
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

    await putPasswordTemporal(body);

    if (empleado.rol === "admin") {
      navigate("/admin/acceso");
      return;
    }

    navigate("/");
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
    <div className="mt-10 sm:mt-15 flex flex-col justify-center items-center px-4 sm:px-10 bg-white h-full">
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
      <div className="grid gap-3 md:grid-cols-2 items-start mx-[10%]">
        <div className="flex flex-col">
          <Label htmlFor="clave" errors={errors.clave}>
            Nueva clave
          </Label>
          <div className="relative flex items-center">
            <Input
              type="password"
              name="clave"
              id="clave"
              value={data.clave}
              onChange={handleOnChange}
              minLength="4"
              maxLength="4"
              required
              className="pr-10"
              errors={errors.clave}
            />
            {errors.clave && (
              <MdCancel className="text-red-600 absolute right-2 top-1/2 transform -translate-y-1/2 text-xl" />
            )}
          </div>
          {errors.clave && <Span className="m-0">{errors.clave}</Span>}
        </div>
        <div className="flex flex-col">
          <Label htmlFor="confirmarClave" errors={errors.confirmarClave}>
            Confirmar clave
          </Label>
          <div className="relative flex items-center">
            <Input
              type="password"
              name="confirmarClave"
              id="confirmarClave"
              value={data.confirmarClave}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              minLength="4"
              maxLength="4"
              required
              className="pr-10"
              errors={errors.confirmarClave}
            />
            {errors.confirmarClave && (
              <MdCancel className="text-red-600 absolute right-2 top-1/2 transform -translate-y-1/2 text-xl" />
            )}
          </div>
          {errors.confirmarClave && (
            <Span className="m-0">{errors.confirmarClave}</Span>
          )}
        </div>
        <div className="flex flex-row justify-center gap-2 md:col-span-2">
          <Button
            id="btn_continuar"
            type="submit"
            onClick={handleUpdatePassword}
            disabled={
              Object.keys(errors).length || !data.clave || !data.confirmarClave
            }
            className={clsx("w-auto", {
              "opacity-600":
                Object.keys(errors).length ||
                !data.clave ||
                !data.confirmarClave,
            })}
          >
            Continuar
          </Button>
          <Button
            onClick={() => {
              navigate("/");
            }}
            className={clsx("w-auto bg-red-600 hover:bg-red-700")}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
