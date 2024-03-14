import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Input, Label, Title } from "../../UI";

export function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    cedula: "",
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const continuar = document.getElementById("btn_continuar");
      continuar.click();
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleHelp = () => {
    return alert(
      "Contacte al departamento de desarrollo para recuperar su contraseña"
    );
  };

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        /> */}
        <Title className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Acceso Administrativo
        </Title>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-[40%] sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <Label>Número de cédula</Label>
            <div className="mt-2">
              <Input
                name="cedula"
                type="text"
                placeholder="123456789"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label>Contraseña</Label>
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
                name="password"
                type="password"
                placeholder="********"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Button type="submit">Acceder</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
