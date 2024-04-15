import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getCargoActual,
  putFotoEmpleado,
} from "../../redux/empleados/empleadoAction";

import { Button, Input, InputFile, Label, Title } from "../UI";

import Swal from "sweetalert2";

export function DatosPersonales() {
  const dispatch = useDispatch();

  const empleado = useSelector((state) => state.empleados.empleado);

  const cargo_actual = useSelector((state) => state.empleados.cargo_actual);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;
  const FOTO_PERFIL = `${URL_SERVER}/documentos_empleados/documento/${empleado.cedula}/${empleado.foto_perfil_nombre}`;

  const [imagen, setImagen] = useState(FOTO_PERFIL || "/Person.svg");

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(getCargoActual(empleado.empleado_id));

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
      <div className="flex flex-col items-center gap-2 mb-2">
        <img
          id="preview_foto"
          src={imagen}
          alt="Imgen del perfil"
          className="w-32 h-32 border border-[#002846] rounded bg-gray-400 cursor-pointer"
          onClick={() => document.getElementById("foto_perfil").click()}
        />
        <Label htmlFor="foto_perfil">Imagen del perfil</Label>
        <InputFile
          id="foto_perfil"
          name="foto_perfil"
          accept=".jpg, .jpeg, .png"
          onChange={handleValidateImage}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-3 mt-5 mb-5">
        {empleado && (
          <>
            <div className="flex flex-col place-content-between">
              <Label htmlFor="nombre_completo">Nombre completo</Label>
              <Input
                id="nombre_completo"
                type="text"
                name="nombre_completo"
                value={`${empleado.nombres} ${empleado.apellidos}`}
                readOnly
              />
            </div>
            <div className="flex flex-col place-content-between">
              <Label htmlFor="cedula">Cédula</Label>
              <Input
                id="cedula"
                type="text"
                name="cedula"
                value={empleado.cedula}
                readOnly
              />
            </div>
            <div className="flex flex-col place-content-between">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={empleado.correo}
                readOnly
              />
            </div>
            <div className="flex flex-col place-content-between">
              <Label htmlFor="telefono">Número de contacto</Label>
              <Input
                id="telefono"
                type="tel"
                name="telefono"
                pattern="[0-9]"
                value={empleado.telefono}
                readOnly
              />
            </div>
            <div className="flex flex-col place-content-between">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                type="text"
                name="direccion"
                value={empleado.direccion}
                readOnly
              />
            </div>
          </>
        )}
        {cargo_actual?.Cargos?.length > 0 ? (
          <>
            <div className="flex flex-col place-content-between">
              <Label htmlFor="cargo_actual">Cargo Actual</Label>
              <Input
                id="cargo_actual"
                type="text"
                name="cargo_actual"
                value={cargo_actual.Cargos[0].descripcion}
                readOnly
              />
            </div>
            <div className="flex flex-col place-content-between">
              <Label htmlFor="nombre_empresa">Empresa</Label>
              <Input
                id="nombre_empresa"
                type="text"
                name="nombre_empresa"
                value={cargo_actual.Cargos[0].Empresa.nombre}
                readOnly
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col place-content-between">
              <Label htmlFor="cargo_actual">Cargo Actual</Label>
              <Input
                id="cargo_actual"
                type="text"
                name="cargo_actual"
                value=""
                readOnly
              />
            </div>
            <div className="flex flex-col place-content-between">
              <Label htmlFor="nombre_empresa">Empresa</Label>
              <Input
                id="nombre_empresa"
                type="text"
                name="nombre_empresa"
                value=""
                readOnly
              />
            </div>
          </>
        )}
        <div className="md:col-span-3 flex justify-center items-center">
          <Button className="m-0 w-auto" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
}
