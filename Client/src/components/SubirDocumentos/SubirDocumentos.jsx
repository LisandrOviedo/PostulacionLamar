import axios from "axios";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { Button, Hr, Title, InputFile } from "../UI";

import {
  postDocumentos,
  getDocumentos,
} from "../../redux/empleados/empleadosActions";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

export default function SubirDocumentos() {
  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const [anexos, setAnexos] = useState([]);

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

    document.title = "Grupo Lamar - Mis Documentos";

    (async function () {
      const data = await getDocumentos(token, empleado.empleado_id);

      setAnexos(data);
    })();

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
        timer: 3000,
      });
      return;
    }

    setIsLoad({ ...isLoad, [name]: true });
  };

  const handleValidatePDFDOC = (event) => {
    const input = event.target;
    const file = input.files[0];
    const { name } = event.target;

    if (!file) {
      setIsLoad({ ...isLoad, [name]: false });
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      input.value = "";
      setIsLoad({ ...isLoad, [name]: false });

      Swal.fire({
        title: "Oops...",
        text: "¡Solo se permiten archivos PDF / DOC / DOCX!",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
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
        timer: 3000,
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
        timer: 3000,
      });
      return;
    }

    setIsLoad({ ...isLoad, [name]: true });
  };

  const handleCreateAnexos = async () => {
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
      formData.append(
        "identificacion",
        `${empleado.tipo_identificacion}${empleado.numero_identificacion}`
      );

      if (foto_carnet.value) {
        formData.append("foto_carnet", foto_carnet_file);
      }

      if (foto_cedula.value) {
        formData.append("foto_cedula", foto_cedula_file);
      }

      if (rif.value) {
        formData.append("rif", rif_file);
      }

      if (resumen_curricular.value) {
        formData.append("resumen_curricular", resumen_curricular_file);
      }

      if (titulo_bachiller.value) {
        formData.append("titulo_bachiller", titulo_bachiller_file);
      }

      if (titulos_universitarios.value) {
        formData.append("titulos_universitarios", titulos_universitarios_file);
      }

      if (otros_estudios.value) {
        formData.append("otros_estudios", otros_estudios_file);
      }
      if (referencia_personal.value) {
        formData.append("referencia_personal", referencia_personal_file);
      }
      if (cuenta_bancaria.value) {
        formData.append("cuenta_bancaria", cuenta_bancaria_file);
      }

      await postDocumentos(token, formData);

      const data = await getDocumentos(token, empleado.empleado_id);

      setAnexos(data);

      setIsLoad({
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

      foto_carnet.value = "";
      foto_cedula.value = "";
      rif.value = "";
      resumen_curricular.value = "";
      titulo_bachiller.value = "";
      titulos_universitarios.value = "";
      otros_estudios.value = "";
      referencia_personal.value = "";
      cuenta_bancaria.value = "";

      window.scroll(0, 0);
    } else {
      Swal.fire({
        title: "Oops...",
        text: "¡Debes cargar al menos 1 archivo!",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const handleOpenDocument = async (filename) => {
    const URL_GET_DOCUMENTOS = `${URL_SERVER}/documentos_empleados/documento/${empleado.tipo_identificacion}${empleado.numero_identificacion}/${filename}`;

    try {
      await axios.get(URL_GET_DOCUMENTOS);
      window.open(URL_GET_DOCUMENTOS, "_blank");
    } catch (error) {
      alertError(error);
    }
  };

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white">
      <Title>Mis Documentos</Title>
      <br />
      <Hr />
      <div className="flex flex-col mt-5 mb-5 gap-3">
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Tipo Documento</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Nombre Documento</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Acción</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Cargar / Actualizar</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300">
                <td className="p-4 font-bold">Perfil Profesional</td>
                {anexos &&
                anexos.find((anexo) => anexo.tipo === "perfil_pdf") ? (
                  <>
                    <td className="p-4">
                      {
                        anexos.find((anexo) => anexo.tipo === "perfil_pdf")
                          .nombre
                      }
                    </td>
                    <td className="p-4">
                      <Button
                        className="m-0 w-auto"
                        onClick={() =>
                          handleOpenDocument(
                            anexos.find((anexo) => anexo.tipo === "perfil_pdf")
                              .nombre
                          )
                        }
                      >
                        Ver
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-4 text-red-800">No cargado</td>
                    <td className="p-4"></td>
                  </>
                )}
                <td className="p-4">
                  <Link to="/perfilProfesional/info">
                    <Button className="m-0 w-auto">Cargar / Actualizar</Button>
                  </Link>
                </td>
              </tr>
              <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300">
                <td className="p-4 font-bold">Foto Carnet</td>
                {anexos &&
                anexos.find((anexo) => anexo.tipo === "foto_carnet") ? (
                  <>
                    <td className="p-4">
                      {
                        anexos.find((anexo) => anexo.tipo === "foto_carnet")
                          .nombre
                      }
                    </td>
                    <td className="p-4">
                      <Button
                        className="m-0 w-auto"
                        onClick={() =>
                          handleOpenDocument(
                            anexos.find((anexo) => anexo.tipo === "foto_carnet")
                              .nombre
                          )
                        }
                      >
                        Ver
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-4 text-red-800">No cargado</td>
                    <td className="p-4"></td>
                  </>
                )}
                <td className="p-4">
                  <InputFile
                    id="foto_carnet"
                    name="foto_carnet"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleValidateImage}
                    className={`${isLoad.foto_carnet && "border-green-500"}`}
                  />
                </td>
              </tr>
              <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300">
                <td className="p-4 font-bold">Foto Cédula</td>
                {anexos &&
                anexos.find((anexo) => anexo.tipo === "foto_cedula") ? (
                  <>
                    <td className="p-4">
                      {
                        anexos.find((anexo) => anexo.tipo === "foto_cedula")
                          .nombre
                      }
                    </td>
                    <td className="p-4">
                      <Button
                        className="m-0 w-auto"
                        onClick={() =>
                          handleOpenDocument(
                            anexos.find((anexo) => anexo.tipo === "foto_cedula")
                              .nombre
                          )
                        }
                      >
                        Ver
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-4 text-red-800">No cargado</td>
                    <td className="p-4"></td>
                  </>
                )}
                <td className="p-4">
                  <InputFile
                    id="foto_cedula"
                    name="foto_cedula"
                    accept=".jpg, .jpeg, .png, application/pdf"
                    onChange={handleValidateImagePDF}
                    className={`${isLoad.foto_cedula && "border-green-500"}`}
                  />
                </td>
              </tr>
              <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300">
                <td className="p-4 font-bold">RIF</td>
                {anexos && anexos.find((anexo) => anexo.tipo === "rif") ? (
                  <>
                    <td className="p-4">
                      {anexos.find((anexo) => anexo.tipo === "rif").nombre}
                    </td>
                    <td className="p-4">
                      <Button
                        className="m-0 w-auto"
                        onClick={() =>
                          handleOpenDocument(
                            anexos.find((anexo) => anexo.tipo === "rif").nombre
                          )
                        }
                      >
                        Ver
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-4 text-red-800">No cargado</td>
                    <td className="p-4"></td>
                  </>
                )}
                <td className="p-4">
                  <InputFile
                    id="rif"
                    name="rif"
                    accept="application/pdf"
                    onChange={handleValidatePDF}
                    className={`${isLoad.rif && "border-green-500"}`}
                  />
                </td>
              </tr>
              <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300">
                <td className="p-4 font-bold">Resumen Curricular</td>
                {anexos &&
                anexos.find((anexo) => anexo.tipo === "resumen_curricular") ? (
                  <>
                    <td className="p-4">
                      {
                        anexos.find(
                          (anexo) => anexo.tipo === "resumen_curricular"
                        ).nombre
                      }
                    </td>
                    <td className="p-4">
                      <Button
                        className="m-0 w-auto"
                        onClick={() =>
                          handleOpenDocument(
                            anexos.find(
                              (anexo) => anexo.tipo === "resumen_curricular"
                            ).nombre
                          )
                        }
                      >
                        Ver
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-4 text-red-800">No cargado</td>
                    <td className="p-4"></td>
                  </>
                )}
                <td className="p-4">
                  <InputFile
                    id="resumen_curricular"
                    name="resumen_curricular"
                    accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleValidatePDFDOC}
                    className={`${
                      isLoad.resumen_curricular && "border-green-500"
                    }`}
                  />
                </td>
              </tr>
              <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300">
                <td className="p-4 font-bold">Título Bachiller</td>
                {anexos &&
                anexos.find((anexo) => anexo.tipo === "titulo_bachiller") ? (
                  <>
                    <td className="p-4">
                      {
                        anexos.find(
                          (anexo) => anexo.tipo === "titulo_bachiller"
                        ).nombre
                      }
                    </td>
                    <td className="p-4">
                      <Button
                        className="m-0 w-auto"
                        onClick={() =>
                          handleOpenDocument(
                            anexos.find(
                              (anexo) => anexo.tipo === "titulo_bachiller"
                            ).nombre
                          )
                        }
                      >
                        Ver
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-4 text-red-800">No cargado</td>
                    <td className="p-4"></td>
                  </>
                )}
                <td className="p-4">
                  <InputFile
                    id="titulo_bachiller"
                    name="titulo_bachiller"
                    accept=".jpg, .jpeg, .png, application/pdf"
                    onChange={handleValidateImagePDF}
                    className={`${
                      isLoad.titulo_bachiller && "border-green-500"
                    }`}
                  />
                </td>
              </tr>
              <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300">
                <td className="p-4 font-bold">Títulos Universitarios</td>
                {anexos &&
                anexos.find(
                  (anexo) => anexo.tipo === "titulos_universitarios"
                ) ? (
                  <>
                    <td className="p-4">
                      {
                        anexos.find(
                          (anexo) => anexo.tipo === "titulos_universitarios"
                        ).nombre
                      }
                    </td>
                    <td className="p-4">
                      <Button
                        className="m-0 w-auto"
                        onClick={() =>
                          handleOpenDocument(
                            anexos.find(
                              (anexo) => anexo.tipo === "titulos_universitarios"
                            ).nombre
                          )
                        }
                      >
                        Ver
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-4 text-red-800">No cargado</td>
                    <td className="p-4"></td>
                  </>
                )}
                <td className="p-4">
                  <InputFile
                    id="titulos_universitarios"
                    name="titulos_universitarios"
                    accept="application/pdf"
                    onChange={handleValidatePDF}
                    className={`${
                      isLoad.titulos_universitarios && "border-green-500"
                    }`}
                  />
                </td>
              </tr>
              <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300">
                <td className="p-4 font-bold">Otros Estudios</td>
                {anexos &&
                anexos.find((anexo) => anexo.tipo === "otros_estudios") ? (
                  <>
                    <td className="p-4">
                      {
                        anexos.find((anexo) => anexo.tipo === "otros_estudios")
                          .nombre
                      }
                    </td>
                    <td className="p-4">
                      <Button
                        className="m-0 w-auto"
                        onClick={() =>
                          handleOpenDocument(
                            anexos.find(
                              (anexo) => anexo.tipo === "otros_estudios"
                            ).nombre
                          )
                        }
                      >
                        Ver
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-4 text-red-800">No cargado</td>
                    <td className="p-4"></td>
                  </>
                )}
                <td className="p-4">
                  <InputFile
                    id="otros_estudios"
                    name="otros_estudios"
                    accept="application/pdf"
                    onChange={handleValidatePDF}
                    className={`${isLoad.otros_estudios && "border-green-500"}`}
                  />
                </td>
              </tr>
              <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300">
                <td className="p-4 font-bold">Referencias Personales</td>
                {anexos &&
                anexos.find((anexo) => anexo.tipo === "referencia_personal") ? (
                  <>
                    <td className="p-4">
                      {
                        anexos.find(
                          (anexo) => anexo.tipo === "referencia_personal"
                        ).nombre
                      }
                    </td>
                    <td className="p-4">
                      <Button
                        className="m-0 w-auto"
                        onClick={() =>
                          handleOpenDocument(
                            anexos.find(
                              (anexo) => anexo.tipo === "referencia_personal"
                            ).nombre
                          )
                        }
                      >
                        Ver
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-4 text-red-800">No cargado</td>
                    <td className="p-4"></td>
                  </>
                )}
                <td className="p-4">
                  <InputFile
                    id="referencia_personal"
                    name="referencia_personal"
                    accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleValidatePDFDOC}
                    className={`${
                      isLoad.referencia_personal && "border-green-500"
                    }`}
                  />
                </td>
              </tr>
              <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300">
                <td className="p-4 font-bold">Soporte Cuenta Bancaria</td>
                {anexos &&
                anexos.find((anexo) => anexo.tipo === "cuenta_bancaria") ? (
                  <>
                    <td className="p-4">
                      {
                        anexos.find((anexo) => anexo.tipo === "cuenta_bancaria")
                          .nombre
                      }
                    </td>
                    <td className="p-4">
                      <Button
                        className="m-0 w-auto"
                        onClick={() =>
                          handleOpenDocument(
                            anexos.find(
                              (anexo) => anexo.tipo === "cuenta_bancaria"
                            ).nombre
                          )
                        }
                      >
                        Ver
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-4 text-red-800">No cargado</td>
                    <td className="p-4"></td>
                  </>
                )}
                <td className="p-4">
                  <InputFile
                    id="cuenta_bancaria"
                    name="cuenta_bancaria"
                    accept=".jpg, .jpeg, .png, application/pdf"
                    onChange={handleValidateImagePDF}
                    className={`${
                      isLoad.cuenta_bancaria && "border-green-500"
                    }`}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center">
          <Button className="m-0 w-auto" onClick={handleCreateAnexos}>
            Actualizar Documentos
          </Button>
        </div>
      </div>
    </div>
  );
}
