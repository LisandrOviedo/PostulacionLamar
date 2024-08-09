import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getCurriculoEmpleado } from "../../redux/curriculos/curriculosActions";

import { Button, Hr, Title } from "../UI";

import Swal from "sweetalert2";

export function InfoCurriculo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(getCurriculoEmpleado(token, empleado.empleado_id));

    document.title = "Grupo Lamar - Perfil Profesional";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  const handleContinuar = async () => {
    navigate("/perfilProfesional/registro");

    return Swal.fire({
      title: "Perfil Profesional",
      text: `Actualiza tus datos y presiona el botón "Guardar Cambios" al final de la página`,
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
        profesión y/o experiencia, así como su área de interés laboral, entre
        otros.
      </p>
      <br />
      <Hr />
      <br />
      <span className="text-base sm:text-lg text-center">
        Observaciones para después del llenado del formulario:
      </span>
      <br />
      <ul className="list-disc text-justify sm:text-left text-sm sm:text-base">
        <li>
          Disponibilidad de tiempo de 30 minutos para aplicación del Test de
          Valoración Actitudinal
        </li>
        <li>
          Anexar resumen curricular en formato PDF{" "}
          <img className="w-[1.2rem] inline" src="./PDF.svg" alt="PDF Icon" />{" "}
          Además, anexar también el resto de documentos requeridos en el menú
          Perfil Profesional / Anexar documentos.
        </li>
      </ul>
      <Button className="w-auto" onClick={handleContinuar}>
        Continuar
      </Button>
    </div>
  );
}
