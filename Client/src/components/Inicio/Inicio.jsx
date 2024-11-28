import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Title } from "../UI";

export default function Inicio() {
  const empleado = useSelector((state) => state.empleados.empleado);

  useEffect(() => {
    window.scroll(0, 0);

    document.title = "Grupo Lamar - Inicio";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  return (
    <div className="mt-24 sm:mt-32 flex flex-col justify-center items-center bg-white gap-2">
      <Title>Página de Inicio</Title>
      <Title>{`${empleado.nombres} ${empleado.apellidos}`}</Title>
      {empleado.Role.acceso_admin && (
        <Link
          to="/admin/panel"
          className="font-semibold text-primary hover:text-primary/[.5] text-xs sm:text-sm"
        >
          Ir a la vista administrativa
        </Link>
      )}
    </div>
  );
}
