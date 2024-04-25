import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Title } from "../UI";

import { resetCurriculos } from "../../redux/curriculos/curriculoAction";

export function Home() {
  const dispatch = useDispatch();

  const empleado = useSelector((state) => state.empleados.empleado);

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(resetCurriculos());

    document.title = "Grupo Lamar - Inicio";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  return (
    <div className="mt-24 sm:mt-32 flex flex-col justify-center items-center bg-white gap-2">
      <Title>Página de Inicio</Title>
      <Title>{`${empleado.nombres} ${empleado.apellidos}`}</Title>
    </div>
  );
}
