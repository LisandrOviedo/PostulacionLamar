import React from "react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { Button, Label, Title, InputFile } from "../UI";

import { postDocumentos } from "../../redux/empleados/empleadoAction";

import Swal from "sweetalert2";

export function AnexarDocumentos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const empleado = useSelector((state) => state.empleados.empleado);

  const [isLoad, setIsLoad] = useState({
    foto_carnet: false,
    foto_cedula: false,
    rif: false,
    resumen_curricular: false,
    titulo_bachiller: false,
    titulos_universitarios: false,
    otros_estudios: false,
    referencia_personal: false,
    cuenta_bancaria: false,
  });

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
    const { name } = event.target;

    if (!file) {
      setIsLoad({ ...isLoad, [name]: false });
      return;
    }

    const allowedTypes = ["application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      input.value = "";
      setIsLoad({ ...isLoad, [name]: false });

      Swal.fire({
        title: "Oops...",
        text: "¡Solo se permiten archivos PDF!",
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }

    setIsLoad({ ...isLoad, [name]: true });
  };

  const handleValidateImage = (event) => {
    const input = event.target;
    const file = input.files[0];
    const { name } = event.target;

    if (!file) {
      setIsLoad({ ...isLoad, [name]: false });
      return;
    }

    const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      input.value = "";
      setIsLoad({ ...isLoad, [name]: false });

      Swal.fire({
        title: "Oops...",
        text: "¡Solo se permiten archivos JPG / JPEG / PNG!",
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }

    setIsLoad({ ...isLoad, [name]: true });
  };

  const handleValidateImagePDF = (event) => {
    const input = event.target;
    const file = input.files[0];
    const { name } = event.target;

    if (!file) {
      setIsLoad({ ...isLoad, [name]: false });
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
      setIsLoad({ ...isLoad, [name]: false });

      Swal.fire({
        title: "Oops...",
        text: "¡Solo se permiten archivos JPG / JPEG / PNG / PDF!",
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }

    setIsLoad({ ...isLoad, [name]: true });
  };

  const handleCreateAnexos = async (event) => {
    event.preventDefault();

    const foto_carnet = document.getElementById("foto_carnet");
    const foto_carnet_file = foto_carnet.files[0];

    const foto_cedula = document.getElementById("foto_cedula");
    const foto_cedula_file = foto_cedula.files[0];

    const rif = document.getElementById("rif");
    const rif_file = rif.files[0];

    const resumen_curricular = document.getElementById("resumen_curricular");
    const resumen_curricular_file = resumen_curricular.files[0];

    const titulo_bachiller = document.getElementById("titulo_bachiller");
    const titulo_bachiller_file = titulo_bachiller.files[0];

    const titulos_universitarios = document.getElementById(
      "titulos_universitarios"
    );
    const titulos_universitarios_file = titulos_universitarios.files[0];

    const otros_estudios = document.getElementById("otros_estudios");
    const otros_estudios_file = otros_estudios.files[0];

    const referencia_personal = document.getElementById("referencia_personal");
    const referencia_personal_file = referencia_personal.files[0];

    const cuenta_bancaria = document.getElementById("cuenta_bancaria");
    const cuenta_bancaria_file = cuenta_bancaria.files[0];

    if (
      foto_carnet.value ||
      foto_cedula.value ||
      rif.value ||
      resumen_curricular.value ||
      titulo_bachiller.value ||
      titulos_universitarios.value ||
      otros_estudios.value ||
      referencia_personal.value ||
      cuenta_bancaria.value
    ) {
      const formData = new FormData();
      formData.append("empleado_id", empleado.empleado_id);
      formData.append("cedula", empleado.cedula);

      if (foto_carnet.value) {
        formData.append("anexos", foto_carnet_file);
      }

      if (foto_cedula.value) {
        formData.append("anexos", foto_cedula_file);
      }

      if (rif.value) {
        formData.append("anexos", rif_file);
      }

      if (resumen_curricular.value) {
        formData.append("anexos", resumen_curricular_file);
      }

      if (titulo_bachiller.value) {
        formData.append("anexos", titulo_bachiller_file);
      }

      if (titulos_universitarios.value) {
        formData.append("anexos", titulos_universitarios_file);
      }

      if (otros_estudios.value) {
        formData.append("anexos", otros_estudios_file);
      }
      if (referencia_personal.value) {
        formData.append("anexos", referencia_personal_file);
      }
      if (cuenta_bancaria.value) {
        formData.append("anexos", cuenta_bancaria_file);
      }

      try {
        dispatch(postDocumentos(formData));
      } catch (error) {
        return error;
      }
    }

    Swal.fire({
      title: "Oops...",
      text: "¡Debes cargar al menos 1 archivo!",
      icon: "error",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white">
      <Title>Mis documentos</Title>
      <hr className="w-[80%] h-0.5 my-5 bg-gray-300 border-0 m-auto" />

      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 mt-5 mb-5">
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
            className={`${
              isLoad.foto_carnet ? "border-green-500" : "border-red-500"
            }`}
          />
        </div>
        <div className="flex flex-col place-content-between">
          <Label htmlFor="foto_cedula">
            Adjunte su cédula de identidad{" "}
            <span className="mt-1 text-sm text-red-600 dark:text-gray-300">
              (JPG, JPEG, PNG, PDF)
            </span>
          </Label>
          <InputFile
            id="foto_cedula"
            name="foto_cedula"
            accept=".jpg, .jpeg, .png, application/pdf"
            onChange={handleValidateImagePDF}
            className={`${
              isLoad.foto_cedula ? "border-green-500" : "border-red-500"
            }`}
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
            className={`${isLoad.rif ? "border-green-500" : "border-red-500"}`}
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
            className={`${
              isLoad.resumen_curricular ? "border-green-500" : "border-red-500"
            }`}
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
            className={`${
              isLoad.titulo_bachiller ? "border-green-500" : "border-red-500"
            }`}
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
            className={`${
              isLoad.titulos_universitarios
                ? "border-green-500"
                : "border-red-500"
            }`}
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
            className={`${
              isLoad.otros_estudios ? "border-green-500" : "border-red-500"
            }`}
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
            className={`${
              isLoad.referencia_personal ? "border-green-500" : "border-red-500"
            }`}
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
            className={`${
              isLoad.cuenta_bancaria ? "border-green-500" : "border-red-500"
            }`}
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
