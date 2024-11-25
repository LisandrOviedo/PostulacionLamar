import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Hr, Title } from "../UI";

import Swal from "sweetalert2";

export default function InfoCurriculo() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);

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
      <div className="flex flex-col gap-4 sm:w-[80%] md:w-[70%] lg:w-[60%]">
        <Title>Identificación de Talentos</Title>

        <p className="text-justify text-sm sm:text-base">
          A fin de identificar talentos potenciales en la organización, le
          invitamos a completar el siguiente formulario donde deberá indicar su
          profesión y/o experiencia, así como su área de interés laboral, entre
          otros.
        </p>

        <Hr />

        <span className="text-base sm:text-lg text-center">
          Observaciones para después del llenado del formulario:
        </span>

        <ul className="list-disc text-justify sm:text-left text-sm sm:text-base">
          <li>
            Anexar resumen curricular en formato PDF{" "}
            <img className="w-[1.2rem] inline" src="./PDF.svg" alt="PDF Icon" />
          </li>
          <li>
            Anexar el resto de documentos requeridos en el menú{" "}
            <b>Perfil Profesional / Anexar Documentos</b>.
          </li>
        </ul>

        <div className="flex justify-center">
          <Button className="w-auto" onClick={handleContinuar}>
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
