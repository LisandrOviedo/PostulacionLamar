import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button, Title, Hr } from "../UI";

export function PaginaNoEncontrada() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Página no encontrada</Title>
      </div>
      <br />
      <Hr />
      <br />
      <Button
        className="m-0 w-auto"
        onClick={() => {
          pathname.startsWith("/admin/")
            ? navigate("/admin/panel")
            : navigate("/");
        }}
      >
        Volver
      </Button>
    </div>
  );
}
