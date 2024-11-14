import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getVacanteDetailEmpleado } from "../../redux/vacantes/vacantesActions";

import { Button, Span, Title } from "../UI";

import { DDMMYYYYHHMM2 } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export function InfoPostulacion() {
  const navigate = useNavigate();

  const URL_INTRANET = import.meta.env.VITE_URL_INTRANET;

  const { vacante_id } = useParams();

  const [vacanteDetail, setVacanteDetail] = useState({});

  const handleFind = async () => {
    const dataVacanteDetail = await getVacanteDetailEmpleado(vacante_id);

    if (dataVacanteDetail) {
      setVacanteDetail(dataVacanteDetail);
    } else {
      Swal.fire({
        title: "Oops...",
        text: "La vacante no se encuentra disponible y/o ha finalizado su proceso de selección",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = URL_INTRANET;
        }
      });
    }
  };

  useEffect(() => {
    window.scroll(0, 0);

    handleFind();

    document.title = "Grupo Lamar - Detalles De La Vacante (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  return (
    <div className="mt-8 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center items-center gap-1">
        <div className="mx-auto">
          <Link to={URL_INTRANET} className="hover:opacity-70">
            <img
              src="./LogoAzul.png"
              alt="Logo Grupo Lamar"
              className="w-24 sm:w-32"
            />
          </Link>
        </div>
        <Title>Detalles de la Vacante</Title>
      </div>
      <div className="p-4 border rounded-lg shadow-md w-full mt-2">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-5 w-full">
          <div>
            <Span className="font-bold">Nombre de la vacante: </Span>
            <Span>{vacanteDetail?.nombre}</Span>
          </div>
          <div>
            <Span className="font-bold">Ubicación: </Span>
            <Span>{vacanteDetail?.ubicacion}</Span>
          </div>
          <div>
            <Span className="font-bold">Departamento: </Span>
            <Span>{vacanteDetail?.departamento}</Span>
          </div>
          <div>
            <Span className="font-bold">Nivel educativo: </Span>
            <Span className="text-justify">
              {vacanteDetail?.nivel_educativo}
            </Span>
          </div>
          <div>
            <Span className="font-bold">Años de experiencia: </Span>
            <Span>{vacanteDetail?.anos_experiencia}</Span>
          </div>
          <div>
            <Span className="font-bold">Área de interés: </Span>
            <Span>{vacanteDetail?.Areas_Intere?.nombre}</Span>
          </div>
          <div className="break-words">
            <Span className="font-bold">Descripción de la vacante: </Span>
            <Span className="text-justify">{vacanteDetail?.descripcion}</Span>
          </div>
          <div>
            <Span className="font-bold">Fecha de creación: </Span>
            <Span>
              {vacanteDetail?.createdAt &&
                DDMMYYYYHHMM2(vacanteDetail?.createdAt)}
            </Span>
          </div>
          <div>
            <Span className="font-bold">Fecha de última modificación: </Span>
            <Span>
              {vacanteDetail?.updatedAt &&
                DDMMYYYYHHMM2(vacanteDetail?.updatedAt)}
            </Span>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <Button
          className="m-0 w-auto"
          onClick={() => {
            window.location.href = URL_INTRANET;
          }}
        >
          Volver
        </Button>
        <Button
          className="m-0 w-auto"
          onClick={() =>
            navigate(`/perfilProfesional/registro?vacante=${vacante_id}`)
          }
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
