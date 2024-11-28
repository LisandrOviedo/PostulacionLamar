import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Title } from "../UI";

export default function PanelAdmin() {
  const empleado = useSelector((state) => state.empleados.empleado);

  useEffect(() => {
    window.scroll(0, 0);

    document.title = "Grupo Lamar - Dashboard (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  return (
    <div className="mt-24 sm:mt-32 flex flex-col justify-center items-center bg-white gap-2">
      <Title>Panel Administrativo</Title>
      <Title>{`${empleado.nombres} ${empleado.apellidos}`}</Title>
      <Link
        to="/inicio"
        className="font-semibold text-primary hover:text-primary/[.5] text-xs sm:text-sm"
      >
        Ir a la vista de empleado
      </Link>
    </div>
  );
}
