import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getCurriculoEmpleado } from "../../redux/curriculos/curriculoAction";

import { Button, Title } from "../UI";

import Swal from "sweetalert2";

export function InfoCurriculo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const empleado = useSelector((state) => state.empleados.empleado);

  const curriculoEmpleado = useSelector(
    (state) => state.curriculos.curriculoEmpleado
  );

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(getCurriculoEmpleado(empleado.empleado_id));

    document.title = "Grupo Lamar - Registrar Perfil Profesional";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  const handleContinuar = async (event) => {
    event.preventDefault();

    if (curriculoEmpleado && curriculoEmpleado.curriculo_id) {
      await Swal.fire({
        title: "¡Atención!",
        text: "Ya tienes datos registrados, serás redireccionado a sus detalles",
        icon: "info",
      });

      return navigate(
        `/curriculo/curriculoDetalle/${curriculoEmpleado.curriculo_id}`
      );
    }

    navigate("/curriculo/registro");

    return Swal.fire({
      title: "Creación del perfil profesional",
      text: "Llena los datos y presiona continuar",
      icon: "info",
      showConfirmButton: false,
      timer: 3000,
    });
  };

  return (
    <div className="mt-24 sm:mt-32 flex flex-col justify-start items-center px-10 h-full">
      <Title>Identificación de Talentos</Title>
      <br />
      <p className="text-justify text-sm sm:text-base">
        A fin de identificar talentos potenciales en la organización, le
        invitamos a completar el siguiente formulario donde deberá indicar su
        profesión y/o experiencia, así como tu área de interés laboral.
      </p>
      <hr className="w-[50%] h-0.5 my-5 bg-gray-100 border-0" />
      <span className="text-base sm:text-lg text-center">
        Observaciones para el llenado del formulario:
      </span>
      <br />
      <ul className="list-disc text-justify sm:text-left text-sm sm:text-base">
        <li>
          Disponibilidad de tiempo de 30 minutos para aplicación del Test de
          Valoración Actitudinal
        </li>
        <li>
          Cargar resumen curricular en formato PDF{" "}
          <img className="w-[1.2rem] inline" src="/PDF.svg" alt="PDF Icon" />
        </li>
      </ul>
      <Button className="w-auto" onClick={handleContinuar}>
        Continuar
      </Button>
    </div>
  );
}
