import { useEffect } from "react";

import { useSelector } from "react-redux";

import { Title } from "../UI";

export function Home() {
  const empleado = useSelector((state) => state.empleados.empleado);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="mt-24 flex flex-col justify-center items-center bg-white gap-2">
      <Title>Página de Inicio</Title>
      <Title>{`${empleado.nombres} ${empleado.apellidos}`}</Title>
    </div>
  );
}
