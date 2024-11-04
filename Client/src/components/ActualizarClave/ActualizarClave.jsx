import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import validations from "../../utils/validacionesActualizarClave";
import { Button, Input, Label, Title, Span } from "../UI";
import { MdCancel } from "react-icons/md";
import { putPassword } from "../../redux/empleados/empleadosActions";

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

    await putPassword(token, body);

    window.location.reload();
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

    document.title = "Grupo Lamar - Actualizar Clave";
    
    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  return (
    <div className="mt-24 sm:mt-32 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <Title>Actualización de contraseña</Title>
        <br />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mx-[10%] sm:mx-[0%]">
          <div className="flex flex-col">
            <Label htmlFor="claveAnterior" errors={errors.claveAnterior}>
              Clave anterior
            </Label>
            <div className="relative flex items-center">
              <Input
                type="password"
                name="claveAnterior"
                id="claveAnterior"
                value={data.claveAnterior}
                onChange={handleOnChange}
                minLength="4"
                maxLength="4"
                required
                className="pr-10"
                errors={errors.claveAnterior}
              />
              {errors.claveAnterior && (
                <MdCancel className="text-red-600 absolute right-2 top-1/2 transform -translate-y-1/2 text-xl" />
              )}
            </div>
            {errors.claveAnterior && (
              <Span className="m-0">{errors.claveAnterior}</Span>
            )}
          </div>
          <div className="flex flex-col">
            <Label htmlFor="claveNueva" errors={errors.claveNueva}>
              Clave nueva
            </Label>
            <div className="relative flex items-center">
              <Input
                type="password"
                name="claveNueva"
                id="claveNueva"
                value={data.claveNueva}
                onChange={handleOnChange}
                minLength="4"
                maxLength="4"
                required
                errors={errors.claveNueva}
              />
              {errors.claveNueva && (
                <MdCancel className="text-red-600 absolute right-2 top-1/2 transform -translate-y-1/2 text-xl" />
              )}
            </div>
            {errors.claveNueva && (
              <Span className="m-0">{errors.claveNueva}</Span>
            )}
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
          <div className="sm:col-span-3 flex justify-center">
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
                "opacity-600":
                  Object.keys(errors).length ||
                  !data.claveAnterior ||
                  !data.claveNueva ||
                  !data.confirmarClave,
              })}
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
