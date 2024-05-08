import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { putFotoEmpleado } from "../../redux/empleados/empleadoAction";

import { Button, InputFile, Title } from "../UI";

import Swal from "sweetalert2";

export function DetalleEmpleado() {
  const dispatch = useDispatch();

  const empleado = useSelector((state) => state.empleados.empleadoDetail);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;
  const FOTO_PERFIL = `${URL_SERVER}/documentos_empleados/documento/${empleado.cedula}/${empleado.foto_perfil_nombre}`;

  const [imagen, setImagen] = useState(
    empleado.foto_perfil_nombre ? FOTO_PERFIL : "/Person.svg"
  );

  useEffect(() => {
    window.scroll(0, 0);

    document.title = "Grupo Lamar - Datos Personales";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

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

    const reader = new FileReader();
    reader.onload = () => {
      setImagen(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = () => {
    const foto_perfil = document.getElementById("foto_perfil");
    const foto_perfil_file = foto_perfil.files[0];

    if (foto_perfil.value) {
      const formData = new FormData();
      formData.append("empleado_id", empleado.empleado_id);
      formData.append("cedula", empleado.cedula);
      formData.append("foto_perfil", foto_perfil_file);

      try {
        dispatch(putFotoEmpleado(formData));
      } catch (error) {
        return error;
      }
    }
  };

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white static">
      <Title>Datos Personales</Title>
      <hr className="w-[80%] h-0.5 my-5 bg-gray-300 border-0 m-auto" />
      <div className="flex items-center justify-center">
        <div>
          <div className="mt-6 border-t border-gray-100">
            {empleado && (
              <>
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Nombre completo
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleado.nombres} {empleado.apellidos}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Número de cédula
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleado.cedula}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Correo electrónico
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleado.correo}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Número de contacto
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleado.telefono}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Dirección
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {empleado.direccion}
                    </dd>
                  </div>
                </dl>
              </>
            )}
            {empleado?.Cargos?.length > 0 && (
              <>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Cargo actual
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.Cargos[0].descripcion}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold leading-6 text-gray-900">
                    Nombre empresa
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {empleado.Cargos[0].Empresa.nombre}
                  </dd>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 mb-2">
          <img
            id="preview_foto"
            src={imagen}
            alt="Imgen del perfil"
            className="w-32 h-32 border border-[#002846] bg-gray-400 cursor-pointer rounded-full ring-2 ring-[#F0C95C]"
            onClick={() => document.getElementById("foto_perfil").click()}
          />
          <label htmlFor="foto_perfil" className="text-sm">
            Imagen del perfil
          </label>
          <label
            htmlFor="foto_perfil"
            className="cursor-pointer hover:text-blue-600"
          >
            <img
              src="/Upload.svg"
              alt="Upload Icon"
              className="w-5 h-5 inline-block mr-2"
            />
            Cargar nueva imagen
          </label>
          <InputFile
            id="foto_perfil"
            name="foto_perfil"
            accept=".jpg, .jpeg, .png"
            onChange={handleValidateImage}
            className="hidden"
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3 mt-5 mb-5">
        <div className="md:col-span-3 flex justify-center items-center">
          <Button className="m-0 w-auto" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
}