import React from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { Button, Label, Title, InputFile } from "../UI";

import Swal from "sweetalert2";

export function AnexarDocumentos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const empleado = useSelector((state) => state.empleados.empleado);

  useEffect(() => {
    window.scroll(0, 0);

    document.title = "Grupo Lamar - Registrar Documentos";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  const handleValidatePDF = (event) => {
    const input = event.target;
    const file = input.files[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      input.value = "";
      Swal.fire({
        title: "Oops...",
        text: "¡Solo se permiten archivos PDF!",
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }
  };

  const handleValidateImage = (event) => {
    const input = event.target;
    const file = input.files[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      input.value = "";
      Swal.fire({
        title: "Oops...",
        text: "¡Solo se permiten archivos JPG / JPEG / PNG!",
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }
  };

  const handleValidateImagePDF = (event) => {
    const input = event.target;
    const file = input.files[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      input.value = "";
      Swal.fire({
        title: "Oops...",
        text: "¡Solo se permiten archivos JPG / JPEG / PNG / PDF!",
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }
  };

  const handleCreateAnexos = async (event) => {
    event.preventDefault();

    // const input = document.getElementById("pdf");
    // const pdf = input.files[0];

    // if (
    //   !input.value ||
    //   !datosCurriculo.grado_instruccion ||
    //   !datosCurriculo.areas_interes.length
    // ) {
    //   return Swal.fire({
    //     title: "Oops...",
    //     text: "Datos faltantes",
    //     icon: "error",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    // }

    // const formData = new FormData();
    // formData.append("pdf", pdf);
    // formData.append("cedula", empleado.cedula);
    // formData.append("empleado_id", empleado.empleado_id);
    // formData.append("grado_instruccion", datosCurriculo.grado_instruccion);
    // formData.append("centro_educativo", datosCurriculo.centro_educativo);
    // formData.append(
    //   "disponibilidad_viajar",
    //   datosCurriculo.disponibilidad_viajar
    // );
    // formData.append(
    //   "disponibilidad_cambio_residencia",
    //   datosCurriculo.disponibilidad_cambio_residencia
    // );

    // try {
    //   dispatch(
    //     postCurriculo(
    //       formData,
    //       datosCurriculo.areas_interes,
    //       datosCurriculo.titulos_obtenidos,
    //       datosCurriculo.experiencias
    //     )
    //   );
    // } catch (error) {
    //   return error;
    // }
  };

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white">
      <Title>Mis documentos</Title>
      <hr className="w-[80%] h-0.5 my-5 bg-gray-300 border-0 m-auto" />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-5 mb-5">
        <div className="flex flex-col place-content-between">
          <Label htmlFor="foto_carnet">
            Adjunte una foto tipo carnet{" "}
            <span className="mt-1 text-sm text-red-600 dark:text-gray-300">
              (JPG, JPEG, PNG)
            </span>
          </Label>
          <InputFile
            id="foto_carnet"
            name="foto_carnet"
            accept=".jpg, .jpeg, .png"
            onChange={handleValidateImage}
          />
        </div>
        <div className="flex flex-col place-content-between">
          <Label htmlFor="cedula">
            Adjunte su cédula de identidad{" "}
            <span className="mt-1 text-sm text-red-600 dark:text-gray-300">
              (JPG, JPEG, PNG, PDF)
            </span>
          </Label>
          <InputFile
            id="cedula"
            name="cedula"
            accept=".jpg, .jpeg, .png, application/pdf"
            onChange={handleValidateImagePDF}
          />
        </div>
        <div className="flex flex-col place-content-between">
          <Label htmlFor="rif">
            Adjunte su RIF{" "}
            <span className="mt-1 text-sm text-red-600 dark:text-gray-300">
              (PDF)
            </span>
          </Label>
          <InputFile
            id="rif"
            name="rif"
            accept="application/pdf"
            onChange={handleValidatePDF}
          />
        </div>
        <div className="flex flex-col place-content-between">
          <Label htmlFor="resumen_curricular">
            Adjunte su resumen curricular{" "}
            <span className="mt-1 text-sm text-red-600 dark:text-gray-300">
              (PDF)
            </span>
          </Label>
          <InputFile
            id="resumen_curricular"
            name="resumen_curricular"
            accept="application/pdf"
            onChange={handleValidatePDF}
          />
        </div>
        <div className="flex flex-col place-content-between">
          <Label htmlFor="titulo_bachiller">
            Adjunte su título de bachiller{" "}
            <span className="mt-1 text-sm text-red-600 dark:text-gray-300">
              (JPG, JPEG, PNG, PDF)
            </span>
          </Label>
          <InputFile
            id="titulo_bachiller"
            name="titulo_bachiller"
            accept=".jpg, .jpeg, .png, application/pdf"
            onChange={handleValidateImagePDF}
          />
        </div>
        <div className="flex flex-col place-content-between">
          <Label htmlFor="titulos_universitarios">
            Adjunte sus títulos universitarios (todos en un solo archivo){" "}
            <span className="mt-1 text-sm text-red-600 dark:text-gray-300">
              (PDF)
            </span>
          </Label>
          <InputFile
            id="titulos_universitarios"
            name="titulos_universitarios"
            accept="application/pdf"
            onChange={handleValidatePDF}
          />
        </div>
        <div className="flex flex-col place-content-between">
          <Label htmlFor="otros_estudios">
            Adjunte sus otros estudios (todos en un solo archivo){" "}
            <span className="mt-1 text-sm text-red-600 dark:text-gray-300">
              (PDF)
            </span>
          </Label>
          <InputFile
            id="otros_estudios"
            name="otros_estudios"
            accept="application/pdf"
            onChange={handleValidatePDF}
          />
        </div>
        <div className="flex flex-col place-content-between">
          <Label htmlFor="referencia_personal">
            Adjunte dos (2) referencias personales (en un solo archivo){" "}
            <span className="mt-1 text-sm text-red-600 dark:text-gray-300">
              (PDF)
            </span>
          </Label>
          <InputFile
            id="referencia_personal"
            name="referencia_personal"
            accept="application/pdf"
            onChange={handleValidatePDF}
          />
        </div>
        <div className="flex flex-col place-content-between">
          <Label htmlFor="cuenta_bancaria">
            Adjunte soporte de su cuenta bancaria{" "}
            <span className="mt-1 text-sm text-red-600 dark:text-gray-300">
              (JPG, JPEG, PNG, PDF)
            </span>
          </Label>
          <InputFile
            id="cuenta_bancaria"
            name="cuenta_bancaria"
            accept=".jpg, .jpeg, .png, application/pdf"
            onChange={handleValidateImagePDF}
          />
        </div>
        <div className="md:col-span-2 flex justify-center items-center">
          <Button className="m-0 w-auto" onClick={handleCreateAnexos}>
            Enviar Documentos
          </Button>
        </div>
      </div>
    </div>
  );
}
