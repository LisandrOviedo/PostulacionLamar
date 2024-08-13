import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEtniasActivas } from "../../redux/etnias/etniasActions";
import { getAllPaisesActivos } from "../../redux/paises/paisesActions";
import {
  getAllEstadosResidencia,
  getAllEstadosNacimiento,
  resetEstadosNacimiento,
  resetEstadosResidencia,
} from "../../redux/estados/estadosActions";
import {
  getAllMunicipiosActivos,
  resetMunicipios,
} from "../../redux/municipios/municipiosActions";
import {
  getAllParroquiasActivas,
  resetParroquias,
} from "../../redux/parroquias/parroquiasActions";
import { getEmpleadoExistencia } from "../../redux/empleados/empleadosActions";
import { getAllEmpresasActivas } from "../../redux/empresas/empresasActions";
import {
  getAllDepartamentosActivos,
  resetDepartamentos,
} from "../../redux/departamentos/departamentosActions";
import {
  getAllCargosNivelesActivos,
  resetCargosNiveles,
} from "../../redux/cargosNiveles/cargosNivelesActions";
import {
  getAllCargosActivos,
  resetCargos,
} from "../../redux/cargos/cargosActions";
import { saveFichaIngreso } from "../../redux/fichasIngresos/fichasIngresosActions";
import { Button, Input, Label, Select, Title, Hr } from "../UI";
import { FaFloppyDisk, FaCircleInfo } from "react-icons/fa6";
import { YYYYMMDD } from "../../utils/formatearFecha";
import validations from "../../utils/validacionesAcceso";

import Swal from "sweetalert2";

export function FormularioIngreso() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.empleados.token);

  const etnias_activas = useSelector((state) => state.etnias.etnias_activas);
  const empleado = useSelector((state) => state.empleados.empleado);
  const paises_activos = useSelector((state) => state.paises.paises_activos);
  const estados_residencia = useSelector(
    (state) => state.estados.estados_residencia
  );
  const estados_nacimiento = useSelector(
    (state) => state.estados.estados_nacimiento
  );
  const municipios_activos = useSelector(
    (state) => state.municipios.municipios_activos
  );
  const parroquias_activas = useSelector(
    (state) => state.parroquias.parroquias_activas
  );

  const empresas_activas = useSelector(
    (state) => state.empresas.empresas_activas
  );
  const departamentos_activos = useSelector(
    (state) => state.departamentos.departamentos_activos
  );
  const cargos_activos = useSelector((state) => state.cargos.cargos_activos);
  const cargos_niveles_activos = useSelector(
    (state) => state.cargos_niveles.cargos_niveles_activos
  );

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const [errors, setErrors] = useState({});

  const [datosIngreso, setDatosIngreso] = useState({
    tipo_identificacion: "V",
    estado_civil: "Soltero(a)",
    mano_dominante: "Derecha",
    sexo: "Masculino",
    factor_grupo_sanguineo: "Seleccione",
    cantidad_hijos: "0",
    carga_familiar: "0",
    tipo_vivienda: "Casa",
    grado_instruccion: "Primaria",
    titulos_obtenidos: [],
    experiencias: [],
    referencias_personales: [],
    posee_parientes_empresa: "0",
    contactos_emergencia: [],
    alergia_alimentos: false,
    alergia_medicamentos: false,
    alergia_otros: false,
    fuma: false,
    titular_cuenta: "Propia",
    entidad_bancaria: "100% Banco",
    tipo_cuenta: "Corriente",
    fecha_ingreso: YYYYMMDD(),
  });

  useEffect(() => {
    window.scroll(0, 0);
    document.title = "Grupo Lamar - Formulario de ingreso (Admin)";

    dispatch(getAllEtniasActivas(token));
    dispatch(getAllPaisesActivos(token));
    dispatch(getAllEmpresasActivas(token));

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    if (
      datosIngreso.nacimiento_pais_id &&
      datosIngreso.nacimiento_pais_id !== "Seleccione"
    ) {
      setDatosIngreso({ ...datosIngreso, nacimiento_estado_id: "Seleccione" });
      dispatch(getAllEstadosNacimiento(token, datosIngreso.nacimiento_pais_id));
    } else {
      dispatch(resetEstadosNacimiento());
      setDatosIngreso({ ...datosIngreso, nacimiento_estado_id: "Seleccione" });
    }
  }, [datosIngreso.nacimiento_pais_id]);

  useEffect(() => {
    if (datosIngreso.pais_id && datosIngreso.pais_id !== "Seleccione") {
      dispatch(resetEstadosResidencia());
      dispatch(resetMunicipios());
      dispatch(resetParroquias());
      setDatosIngreso({ ...datosIngreso, estado_id: "Seleccione" });
      dispatch(getAllEstadosResidencia(token, datosIngreso.pais_id));
    } else {
      dispatch(resetEstadosResidencia());
      dispatch(resetMunicipios());
      dispatch(resetParroquias());
      setDatosIngreso({ ...datosIngreso, estado_id: "Seleccione" });
    }
  }, [datosIngreso.pais_id]);

  useEffect(() => {
    if (datosIngreso.estado_id && datosIngreso.estado_id !== "Seleccione") {
      dispatch(resetMunicipios());
      dispatch(resetParroquias());
      setDatosIngreso({ ...datosIngreso, municipio_id: "Seleccione" });
      dispatch(getAllMunicipiosActivos(token, datosIngreso.estado_id));
    } else {
      dispatch(resetMunicipios());
      dispatch(resetParroquias());
      setDatosIngreso({ ...datosIngreso, municipio_id: "Seleccione" });
    }
  }, [datosIngreso.estado_id]);

  useEffect(() => {
    if (
      datosIngreso.municipio_id &&
      datosIngreso.municipio_id !== "Seleccione"
    ) {
      dispatch(resetParroquias());
      setDatosIngreso({ ...datosIngreso, parroquia_id: "Seleccione" });
      dispatch(getAllParroquiasActivas(token, datosIngreso.municipio_id));
    } else {
      dispatch(resetParroquias());
      setDatosIngreso({ ...datosIngreso, parroquia_id: "Seleccione" });
    }
  }, [datosIngreso.municipio_id]);

  useEffect(() => {
    if (datosIngreso.empresa_id && datosIngreso.empresa_id !== "Seleccione") {
      dispatch(resetDepartamentos());
      dispatch(resetCargos());
      dispatch(resetCargosNiveles());
      setDatosIngreso({ ...datosIngreso, departamento_id: "Seleccione" });
      dispatch(getAllDepartamentosActivos(token, datosIngreso.empresa_id));
    } else {
      dispatch(resetDepartamentos());
      dispatch(resetCargos());
      dispatch(resetCargosNiveles());
      setDatosIngreso({ ...datosIngreso, departamento_id: "Seleccione" });
    }
  }, [datosIngreso.empresa_id]);

  useEffect(() => {
    if (
      datosIngreso.departamento_id &&
      datosIngreso.departamento_id !== "Seleccione"
    ) {
      dispatch(resetCargos());
      dispatch(resetCargosNiveles());
      setDatosIngreso({ ...datosIngreso, cargo_id: "Seleccione" });
      dispatch(getAllCargosActivos(token, datosIngreso.departamento_id));
    } else {
      dispatch(resetCargos());
      dispatch(resetCargosNiveles());
      setDatosIngreso({ ...datosIngreso, cargo_id: "Seleccione" });
    }
  }, [datosIngreso.departamento_id]);

  useEffect(() => {
    if (datosIngreso.cargo_id && datosIngreso.cargo_id !== "Seleccione") {
      dispatch(resetCargosNiveles());
      setDatosIngreso({ ...datosIngreso, cargo_nivel_id: "Seleccione" });
      dispatch(getAllCargosNivelesActivos(token, datosIngreso.cargo_id));
    } else {
      dispatch(resetCargosNiveles());
      setDatosIngreso({ ...datosIngreso, cargo_nivel_id: "Seleccione" });
    }
  }, [datosIngreso.cargo_id]);

  const handleValidate = (e) => {
    const { name, value } = e.target;

    document.getElementById("fecha_nacimiento").placeholder = "";

    if (name === "tipo_vivienda" && value === "Casa") {
      setDatosIngreso((prevState) => {
        const newState = { ...prevState };
        delete newState.piso;
        delete newState.apartamento;

        newState.tipo_vivienda = "Casa";
        return newState;
      });
    } else if (name === "tipo_vivienda" && value === "Edificio") {
      setDatosIngreso((prevState) => {
        const newState = { ...prevState };
        delete newState.numero_casa;

        newState.tipo_vivienda = "Edificio";
        return newState;
      });
    } else if (name === "titular_cuenta" && value === "Propia") {
      setDatosIngreso((prevState) => {
        const newState = { ...prevState };
        delete newState.tipo_identificacion_tercero;
        delete newState.parentesco_tercero;
        delete newState.nombre_apellido_tercero;
        delete newState.numero_identificacion_tercero;

        newState.titular_cuenta = "Propia";
        return newState;
      });
    } else if (name === "titular_cuenta" && value === "Tercero") {
      setDatosIngreso({
        ...datosIngreso,
        tipo_identificacion_tercero: "V",
        parentesco_tercero: "Abuelo(a)",
        [name]: value,
      });
    } else {
      setDatosIngreso({ ...datosIngreso, [name]: value });
    }
  };

  const handleRemoveTitulosObtenidos = (index) => {
    const newTitulo = datosIngreso.titulos_obtenidos.filter(
      (_, i) => i !== index
    );
    setDatosIngreso({ ...datosIngreso, titulos_obtenidos: newTitulo });
  };

  const handleRemoveTrabajosAnteriores = (index) => {
    const newTrabajoAnterior = datosIngreso.experiencias.filter(
      (_, i) => i !== index
    );
    setDatosIngreso({ ...datosIngreso, experiencias: newTrabajoAnterior });
  };

  const handleRemoveReferenciaPersonal = (index) => {
    const newReferenciaPersonal = datosIngreso.referencias_personales.filter(
      (_, i) => i !== index
    );
    setDatosIngreso({
      ...datosIngreso,
      referencias_personales: newReferenciaPersonal,
    });
  };

  const handleRemoveContactoEmergencia = (index) => {
    const newContactoEmergencia = datosIngreso.contactos_emergencia.filter(
      (_, i) => i !== index
    );
    setDatosIngreso({
      ...datosIngreso,
      contactos_emergencia: newContactoEmergencia,
    });
  };

  const handleChecked = (event) => {
    const { name, checked } = event.target;

    setDatosIngreso({ ...datosIngreso, [name]: checked });
  };

  const handleAddTituloObtenido = () => {
    const input_fecha_desde = document.getElementById("fecha_desde_titulo");
    const input_grado_instruccion =
      document.getElementById("grado_instruccion");
    const input_fecha_hasta = document.getElementById("fecha_hasta_titulo");
    const input_nombre_instituto = document.getElementById("nombre_instituto");
    const input_titulo_obtenido = document.getElementById("titulo_obtenido");

    if (
      !input_fecha_desde.value ||
      !input_fecha_hasta.value ||
      !input_nombre_instituto.value ||
      !input_titulo_obtenido.value
    ) {
      Swal.fire({
        title: "Oops...",
        text: "Faltan campos por llenar para añadir tu título obtenido",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const tituloValidatorInclude = datosIngreso.titulos_obtenidos.some(
      (titulo) =>
        titulo.grado_instruccion === input_grado_instruccion.value &&
        titulo.nombre_instituto === input_nombre_instituto.value &&
        titulo.titulo_obtenido === input_titulo_obtenido.value
    );

    if (tituloValidatorInclude) {
      Swal.fire({
        title: "Oops...",
        text: "Ya has agregado ese título",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    setDatosIngreso({
      ...datosIngreso,
      titulos_obtenidos: [
        ...datosIngreso.titulos_obtenidos,
        {
          grado_instruccion: input_grado_instruccion.value,
          fecha_desde: input_fecha_desde.value,
          fecha_hasta: input_fecha_hasta.value,
          nombre_instituto: input_nombre_instituto.value,
          titulo_obtenido: input_titulo_obtenido.value,
        },
      ],
    });

    input_grado_instruccion.value = "Primaria";
    input_fecha_desde.value = null;
    input_fecha_hasta.value = null;
    input_nombre_instituto.value = null;
    input_titulo_obtenido.value = null;
  };

  const handleAddExperiencia = () => {
    const cargo_titulo = document.getElementById("cargo_titulo");
    const fecha_desde = document.getElementById("fecha_desde_experiencia");
    const fecha_hasta = document.getElementById("fecha_hasta_experiencia");
    const empresa_centro_educativo = document.getElementById(
      "empresa_centro_educativo"
    );

    if (
      !empresa_centro_educativo.value ||
      !cargo_titulo.value ||
      !fecha_desde_experiencia.value ||
      !fecha_hasta_experiencia.value
    ) {
      Swal.fire({
        title: "Oops...",
        text: "Faltan campos por llenar para añadir tu experiencia",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const expValidatorInclude = datosIngreso.experiencias.some(
      (experiencia) =>
        experiencia.cargo_titulo.toLowerCase() ===
          cargo_titulo.value.toLowerCase() &&
        experiencia.empresa_centro_educativo ===
          empresa_centro_educativo.value.toLowerCase() &&
        experiencia.fecha_desde === fecha_desde.value &&
        experiencia.fecha_hasta === fecha_hasta.value
    );

    if (expValidatorInclude) {
      Swal.fire({
        title: "Oops...",
        text: "Ya has agregado esa experiencia",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    setDatosIngreso({
      ...datosIngreso,
      experiencias: [
        ...datosIngreso.experiencias,
        {
          tipo: "Laboral",
          empresa_centro_educativo: empresa_centro_educativo.value,
          cargo_titulo: cargo_titulo.value,
          fecha_desde: fecha_desde_experiencia.value,
          fecha_hasta: fecha_hasta_experiencia.value,
        },
      ],
    });

    cargo_titulo.value = null;
    empresa_centro_educativo.value = null;
    fecha_desde_experiencia.value = null;
    fecha_hasta_experiencia.value = null;
  };

  const handleAddReferenciaPersonal = () => {
    const nombre_apellido = document.getElementById("nombre_apellido");
    const direccion = document.getElementById("direccion");
    const telefono = document.getElementById("telefono_referencia");
    const ocupacion = document.getElementById("ocupacion");

    if (
      !nombre_apellido.value ||
      !direccion.value ||
      !telefono.value ||
      !ocupacion.value
    ) {
      Swal.fire({
        title: "Oops...",
        text: "Faltan campos por llenar para añadir tu referencia personal",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const refValidatorInclude = datosIngreso.referencias_personales.some(
      (referencia) => referencia.telefono === telefono.value.toLowerCase()
    );

    if (refValidatorInclude) {
      Swal.fire({
        title: "Oops...",
        text: "Ya has agregado esa referencia personal",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    setDatosIngreso({
      ...datosIngreso,
      referencias_personales: [
        ...datosIngreso.referencias_personales,
        {
          nombre_apellido: nombre_apellido.value,
          direccion: direccion.value,
          telefono: telefono.value,
          ocupacion: ocupacion.value,
        },
      ],
    });

    nombre_apellido.value = null;
    direccion.value = null;
    telefono.value = null;
    ocupacion.value = null;
  };

  const handleAddContactoEmergencia = () => {
    const input_nombre_apellido = document.getElementById("nombre_apellido");
    const input_parentesco_contacto_emergencia = document.getElementById(
      "parentesco_contacto_emergencia"
    );
    const input_telefono_contacto_emergencia = document.getElementById(
      "telefono_contacto_emergencia"
    );
    const input_direccion = document.getElementById(
      "direccion_contacto_emergencia"
    );

    if (
      !input_nombre_apellido.value ||
      !input_parentesco_contacto_emergencia.value ||
      !input_telefono_contacto_emergencia.value ||
      !input_direccion.value
    ) {
      Swal.fire({
        title: "Oops...",
        text: "Faltan campos por llenar para añadir contecto de emergencia",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const contactoEmergenciaValidatorInclude =
      datosIngreso.contactos_emergencia.some(
        (contacto) =>
          contacto.telefono === input_telefono_contacto_emergencia.value
      );

    if (contactoEmergenciaValidatorInclude) {
      Swal.fire({
        title: "Oops...",
        text: "Ya has agregado ese teléfono contacto",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    setDatosIngreso({
      ...datosIngreso,
      contactos_emergencia: [
        ...datosIngreso.contactos_emergencia,
        {
          nombre_apellido: input_nombre_apellido.value,
          parentesco: input_parentesco_contacto_emergencia.value,
          telefono: input_telefono_contacto_emergencia.value,
          direccion: input_direccion.value,
        },
      ],
    });

    input_parentesco_contacto_emergencia.selectedIndex = 0;
    input_nombre_apellido.value = null;
    input_telefono_contacto_emergencia.value = null;
    input_direccion.value = null;
  };

  const handleEmpleadoExiste = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (value) {
      getEmpleadoExistencia(
        token,
        datosIngreso.tipo_identificacion,
        datosIngreso.numero_identificacion
      ).then((data) => {
        if (data) {
          const numero_identificacion = document.getElementById(
            "numero_identificacion"
          );
          numero_identificacion.value = null;
        }
      });
    }
  };

  const handleSaveFicha = () => {
    const numero_identificacion = document.getElementById(
      "numero_identificacion"
    );
    const nombres = document.getElementById("nombres");
    const apellidos = document.getElementById("apellidos");
    const estado_civil = document.getElementById("estado_civil");
    const rif = document.getElementById("rif");
    const telefono = document.getElementById("telefono");
    const correo = document.getElementById("correo");
    const fecha_nacimiento = document.getElementById("fecha_nacimiento");
    const nacimiento_lugar = document.getElementById("nacimiento_lugar");
    const nacimiento_pais_id = document.getElementById("nacimiento_pais_id");
    const nacimiento_estado_id = document.getElementById(
      "nacimiento_estado_id"
    );
    const pais_id = document.getElementById("pais_id");
    const estado_id = document.getElementById("estado_id");
    const municipio_id = document.getElementById("municipio_id");
    const parroquia_id = document.getElementById("parroquia_id");
    const urbanizacion_sector = document.getElementById("urbanizacion_sector");
    const calle_avenida = document.getElementById("calle_avenida");
    const talla_camisa = document.getElementById("talla_camisa");
    const talla_pantalon = document.getElementById("talla_pantalon");
    const talla_calzado = document.getElementById("talla_calzado");
    const numero_cuenta = document.getElementById("numero_cuenta");
    const empresa_id = document.getElementById("empresa_id");
    const departamento_id = document.getElementById("departamento_id");
    const cargo_id = document.getElementById("cargo_id");
    const cargo_nivel_id = document.getElementById("cargo_nivel_id");
    const salario = document.getElementById("salario");
    const numero_identificacion_tercero = document.getElementById(
      "numero_identificacion_tercero"
    );
    const nombre_apellido_tercero = document.getElementById(
      "nombre_apellido_tercero"
    );

    if (
      !numero_identificacion.value ||
      !nombres.value ||
      !apellidos.value ||
      !estado_civil.value ||
      !rif.value ||
      !telefono.value ||
      !correo.value ||
      !fecha_nacimiento.value ||
      !nacimiento_lugar.value ||
      !nacimiento_pais_id.value ||
      nacimiento_pais_id.value === "Seleccione" ||
      !nacimiento_estado_id.value ||
      nacimiento_estado_id.value === "Seleccione" ||
      !pais_id.value ||
      pais_id.value === "Seleccione" ||
      !estado_id.value ||
      estado_id.value === "Seleccione" ||
      !municipio_id.value ||
      municipio_id.value === "Seleccione" ||
      !parroquia_id.value ||
      parroquia_id.value === "Seleccione" ||
      !urbanizacion_sector.value ||
      !calle_avenida.value ||
      !talla_camisa.value ||
      !talla_pantalon.value ||
      !talla_calzado.value ||
      !numero_cuenta.value ||
      !empresa_id.value ||
      empresa_id.value === "Seleccione" ||
      !departamento_id.value ||
      departamento_id.value === "Seleccione" ||
      !cargo_id.value ||
      cargo_id.value === "Seleccione" ||
      !cargo_nivel_id.value ||
      cargo_nivel_id.value === "Seleccione" ||
      !salario.value ||
      !datosIngreso.referencias_personales.length ||
      !datosIngreso.contactos_emergencia.length ||
      (datosIngreso.titular_cuenta === "Tercero" &&
        (!numero_identificacion_tercero.value ||
          !nombre_apellido_tercero.value))
    ) {
      Swal.fire({
        title: "Oops...",
        text: "Datos Faltantes",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });

      return;
    }

    dispatch(saveFichaIngreso(token, datosIngreso)).then(() => {
      window.scroll(0, 0);
      window.location.reload();
    });
  };

  return (
    <div className="mt-24 sm:mt-32 items-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <Title>Formulario de Ingreso</Title>
      </div>
      <br />
      <Hr />
      <br />
      <div className="w-full">
        {/* Información Personal */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="numero_identificacion">Identificación</Label>
            <div className="grid grid-cols-4">
              <Select
                name="tipo_identificacion"
                defaultValue={datosIngreso.tipo_identificacion}
                onChange={handleValidate}
              >
                <option value="V">V</option>
                <option value="E">E</option>
              </Select>

              <div className="col-span-3 pl-3">
                <Input
                  id="numero_identificacion"
                  name="numero_identificacion"
                  onChange={handleValidate}
                  onBlur={handleEmpleadoExiste}
                />
              </div>
            </div>
            {errors.numero_identificacion && (
              <p className="text-red-500">{errors.numero_identificacion}</p>
            )}
          </div>
          <div>
            <Label htmlFor="nombres">Nombres</Label>
            <Input id="nombres" name="nombres" onChange={handleValidate} />
            {errors.nombres && <p className="text-red-500">{errors.nombres}</p>}
          </div>
          <div>
            <Label htmlFor="apellidos">Apellidos</Label>
            <Input id="apellidos" name="apellidos" onChange={handleValidate} />
            {errors.apellidos && (
              <p className="text-red-500">{errors.apellidos}</p>
            )}
          </div>
          <div>
            <Label htmlFor="estado_civil">Estado Civil</Label>
            <Select
              id="estado_civil"
              name="estado_civil"
              defaultValue={datosIngreso.estado_civil}
              onChange={handleValidate}
            >
              <option value="Soltero(a)">Soltero(a)</option>
              <option value="Casado(a)">Casado(a)</option>
              <option value="Viudo(a)">Viudo(a)</option>
              <option value="Divorciado(a)">Divorciado(a)</option>
              <option value="Concubino">Concubino</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="rif">Registro de Información Fiscal (RIF)</Label>
            <Input id="rif" name="rif" onChange={handleValidate} />
            {errors.rif && <p className="text-red-500">{errors.rif}</p>}
          </div>
          <div>
            <Label htmlFor="telefono">Teléfono Móvil</Label>
            <Input
              id="telefono"
              type="tel"
              name="telefono"
              onChange={handleValidate}
            />
            {errors.telefono && (
              <p className="text-red-500">{errors.telefono}</p>
            )}
          </div>
          <div>
            <Label htmlFor="correo">Correo Electrónico</Label>
            <Input
              id="correo"
              type="email"
              name="correo"
              onChange={handleValidate}
            />
            {errors.correo && <p className="text-red-500">{errors.correo}</p>}
          </div>
          <div>
            <Label htmlFor="etnia_id">Etnia</Label>
            <Select
              className="w-full"
              id="etnia_id"
              name="etnia_id"
              value={datosIngreso.etnia_id}
              onChange={handleValidate}
            >
              <option value="Ninguna">Ninguna</option>
              {etnias_activas?.length
                ? etnias_activas?.map(
                    (etnia, i) =>
                      etnia.activo && (
                        <option
                          key={i}
                          name={etnia.nombre}
                          value={etnia.etnia_id}
                        >
                          {etnia.nombre}
                        </option>
                      )
                  )
                : null}
            </Select>
          </div>
          <div>
            <Label htmlFor="mano_dominante">Mano Dominante</Label>
            <Select
              id="mano_dominante"
              name="mano_dominante"
              defaultValue={datosIngreso.mano_dominante}
              onChange={handleValidate}
            >
              <option value="Derecha">Derecha</option>
              <option value="Izquierda">Izquierda</option>
            </Select>
          </div>
        </div>

        <div className="pt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <Label htmlFor="sexo">Sexo</Label>
            <Select
              id="sexo"
              defaultValue={datosIngreso.sexo}
              name="sexo"
              onChange={handleValidate}
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="factor_grupo_sanguineo">Grupo Sanguineo</Label>
            <Select
              id="factor_grupo_sanguineo"
              name="factor_grupo_sanguineo"
              defaultValue={datosIngreso.factor_grupo_sanguineo}
              onChange={handleValidate}
            >
              <option value="Seleccione">Seleccione</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="AB+">AB+</option>
              <option value="O+">O+</option>
              <option value="A-">A-</option>
              <option value="B-">B-</option>
              <option value="AB-">AB-</option>
              <option value="O-">O-</option>
            </Select>
            {errors.grupoSanguineo && (
              <p className="text-red-500">{errors.grupoSanguineo}</p>
            )}
          </div>
          <div>
            <Label htmlFor="cantidad_hijos">Cantidad de Hijos</Label>
            <Input
              type="number"
              name="cantidad_hijos"
              id="cantidad_hijos"
              defaultValue={datosIngreso.cantidad_hijos}
              min="0"
              max="15"
              onChange={handleValidate}
            />
            {errors.numeroHijos && (
              <p className="text-red-500">{errors.numeroHijos}</p>
            )}
          </div>
          <div>
            <Label htmlFor="carga_familiar">Carga Familiar</Label>
            <Input
              type="number"
              name="carga_familiar"
              id="carga_familiar"
              defaultValue={datosIngreso.carga_familiar}
              min="0"
              onChange={handleValidate}
            />
            {errors.numeroHijos && (
              <p className="text-red-500">{errors.numeroHijos}</p>
            )}
          </div>
        </div>

        <div className="pt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
            <Input
              type="date"
              id="fecha_nacimiento"
              name="fecha_nacimiento"
              max={YYYYMMDD()}
              onChange={handleValidate}
            />
            {errors.fecha_nacimiento && (
              <p className="text-red-500">{errors.fecha_nacimiento}</p>
            )}
          </div>
          <div>
            <Label htmlFor="nacimiento_lugar">Lugar de Nacimiento</Label>
            <Input
              id="nacimiento_lugar"
              name="nacimiento_lugar"
              onChange={handleValidate}
            />
            {errors.nacimiento_lugar && (
              <p className="text-red-500">{errors.nacimiento_lugar}</p>
            )}
          </div>
          <div>
            <Label htmlFor="nacimiento_pais_id">Nacionalidad</Label>
            <Select
              className="w-full"
              id="nacimiento_pais_id"
              name="nacimiento_pais_id"
              defaultValue="Seleccione"
              onChange={handleValidate}
            >
              <option name="Seleccione">Seleccione</option>
              {paises_activos?.length
                ? paises_activos?.map(
                    (pais, i) =>
                      pais.activo && (
                        <option key={i} name={pais.nombre} value={pais.pais_id}>
                          {pais.nombre}
                        </option>
                      )
                  )
                : null}
            </Select>
            {errors.nacimiento_pais_id && (
              <p className="text-red-500">{errors.nacimiento_pais_id}</p>
            )}
          </div>
          <div>
            <Label htmlFor="nacimiento_estado_id">Estado de Nacimiento</Label>
            <Select
              className="w-full"
              id="nacimiento_estado_id"
              name="nacimiento_estado_id"
              value={datosIngreso.nacimiento_estado_id}
              onChange={handleValidate}
            >
              <option name="Seleccione">Seleccione</option>
              {estados_nacimiento?.length
                ? estados_nacimiento?.map(
                    (estado, i) =>
                      estado.activo && (
                        <option
                          key={i}
                          name={estado.nombre}
                          value={estado.estado_id}
                        >
                          {estado.nombre}
                        </option>
                      )
                  )
                : null}
            </Select>
            {errors.nacimiento_estado_id && (
              <p className="text-red-500">{errors.nacimiento_estado_id}</p>
            )}
          </div>

          <div>
            <Label htmlFor="pais_id">Pais de Residencia</Label>
            <Select
              className="w-full"
              id="pais_id"
              name="pais_id"
              defaultValue="Seleccione"
              onChange={handleValidate}
            >
              <option name="Seleccione">Seleccione</option>
              {paises_activos?.length
                ? paises_activos?.map(
                    (pais, i) =>
                      pais.activo && (
                        <option key={i} name={pais.nombre} value={pais.pais_id}>
                          {pais.nombre}
                        </option>
                      )
                  )
                : null}
            </Select>
            {errors.pais_id && <p className="text-red-500">{errors.pais_id}</p>}
          </div>
          <div>
            <Label htmlFor="estado_id">Estado de Residencia</Label>
            <Select
              className="w-full"
              id="estado_id"
              name="estado_id"
              value={datosIngreso.estado_id}
              onChange={handleValidate}
            >
              <option name="Seleccione">Seleccione</option>
              {estados_residencia?.length
                ? estados_residencia?.map(
                    (estado, i) =>
                      estado.activo && (
                        <option
                          key={i}
                          name={estado.nombre}
                          value={estado.estado_id}
                        >
                          {estado.nombre}
                        </option>
                      )
                  )
                : null}
            </Select>
          </div>
          <div>
            <Label htmlFor="municipio_id">Municipio</Label>
            <Select
              className="w-full"
              id="municipio_id"
              name="municipio_id"
              value={datosIngreso.municipio_id}
              onChange={handleValidate}
            >
              <option name="Seleccione">Seleccione</option>
              {municipios_activos?.length
                ? municipios_activos?.map(
                    (municipio, i) =>
                      municipio.activo && (
                        <option
                          key={i}
                          name={municipio.nombre}
                          value={municipio.municipio_id}
                        >
                          {municipio.nombre}
                        </option>
                      )
                  )
                : null}
            </Select>
          </div>
          <div>
            <Label htmlFor="parroquia_id">Parroquia</Label>
            <Select
              className="w-full"
              id="parroquia_id"
              name="parroquia_id"
              value={datosIngreso.parroquia_id}
              onChange={handleValidate}
            >
              <option name="Seleccione">Seleccione</option>
              {parroquias_activas?.length
                ? parroquias_activas?.map(
                    (parroquia, i) =>
                      parroquia.activo && (
                        <option
                          key={i}
                          name={parroquia.nombre}
                          value={parroquia.parroquia_id}
                        >
                          {parroquia.nombre}
                        </option>
                      )
                  )
                : null}
            </Select>
          </div>
          <div>
            <Label htmlFor="urbanizacion_sector">Urbanizacion / Sector</Label>
            <Input
              id="urbanizacion_sector"
              name="urbanizacion_sector"
              onChange={handleValidate}
            />
            {errors.urbanizacion_sector && (
              <p className="text-red-500">{errors.urbanizacion_sector}</p>
            )}
          </div>
          <div>
            <Label htmlFor="calle_avenida">Calle / Avenida</Label>
            <Input
              id="calle_avenida"
              name="calle_avenida"
              onChange={handleValidate}
            />
            {errors.direccion && (
              <p className="text-red-500">{errors.direccion}</p>
            )}
          </div>
          <div>
            <Label htmlFor="tipo_vivienda">Tipo de Vivienda</Label>
            <Select
              id="tipo_vivienda"
              name="tipo_vivienda"
              defaultValue={datosIngreso.tipo_vivienda}
              onChange={handleValidate}
            >
              <option value="Casa">Casa</option>
              <option value="Edificio">Edificio</option>
            </Select>
          </div>

          {datosIngreso.tipo_vivienda === "Casa" && (
            <div>
              <Label htmlFor="numero_casa">Numero de Casa</Label>
              <Input
                name="numero_casa"
                id="numero_casa"
                onChange={handleValidate}
              />
              {errors.tallaCalzado && (
                <p className="text-red-500">{errors.tallaCalzado}</p>
              )}
            </div>
          )}
          {datosIngreso.tipo_vivienda === "Edificio" && (
            <div className="grid grid-cols-2">
              <div className="mr-2">
                <Label htmlFor="piso">Piso</Label>
                <Input name="piso" id="piso" onChange={handleValidate} />
                {errors.tallaCalzado && (
                  <p className="text-red-500">{errors.tallaCalzado}</p>
                )}
              </div>
              <div className="ml-2">
                <Label htmlFor="apartamento">Apartamento</Label>
                <Input
                  name="apartamento"
                  id="apartamento"
                  onChange={handleValidate}
                />
                {errors.tallaCalzado && (
                  <p className="text-red-500">{errors.tallaCalzado}</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 items-end">
          <div>
            <Label htmlFor="licencia_conducir_grado">
              ¿Posee Licencia de Conducir? Especifique el grado
            </Label>
            <Input
              type="number"
              id="licencia_conducir_grado"
              name="licencia_conducir_grado"
              max="5"
              min="0"
              onChange={handleValidate}
            />
            {errors.grado && <p className="text-red-500">{errors.grado}</p>}
          </div>
          <div>
            <Label htmlFor="licencia_conducir_vencimiento">
              Fecha de Vencimiento Licencia de Conducir
            </Label>
            <Input
              type="date"
              id="licencia_conducir_vencimiento"
              name="licencia_conducir_vencimiento"
              max={YYYYMMDD()}
              onChange={handleValidate}
            />
          </div>

          <div>
            <Label htmlFor="carta_medica_vencimiento">
              ¿Posee Carta Médica? Indique la fecha de vencimiento
            </Label>
            <Input
              type="date"
              id="carta_medica_vencimiento"
              name="carta_medica_vencimiento"
              max={YYYYMMDD()}
              onChange={handleValidate}
            />
          </div>

          <div>
            <Label htmlFor="talla_camisa">Talla Camisa</Label>
            <Input
              name="talla_camisa"
              id="talla_camisa"
              onChange={handleValidate}
            />
            {errors.talla_camisa && (
              <p className="text-red-500">{errors.talla_camisa}</p>
            )}
          </div>
          <div>
            <Label htmlFor="talla_pantalon">Talla Pantalon</Label>
            <Input
              name="talla_pantalon"
              id="talla_pantalon"
              onChange={handleValidate}
            />
            {errors.talla_pantalon && (
              <p className="text-red-500">{errors.talla_pantalon}</p>
            )}
          </div>
          <div>
            <Label htmlFor="talla_calzado">Talla Calzado</Label>
            <Input
              name="talla_calzado"
              id="talla_calzado"
              onChange={handleValidate}
            />
            {errors.talla_calzado && (
              <p className="text-red-500">{errors.talla_calzado}</p>
            )}
          </div>
        </div>

        {/* Educación */}
        <div className="mt-8 ">
          <Title>Educación</Title>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <Label htmlFor="grado_instruccion">Grado de instrucción</Label>
              <Select
                id="grado_instruccion"
                name="grado_instruccion"
                defaultValue={datosIngreso.grado_instruccion}
              >
                <option value="Primaria">Primaria</option>
                <option value="Secundaria">Secundaria</option>
                <option value="Técnica">Técnica</option>
                <option value="Universitaria">Universitaria</option>
                <option value="Postgrado">Postgrado</option>-{" "}
              </Select>
            </div>
            <div>
              <Label htmlFor="nombre_instituto">Nombre del Instituto</Label>
              <Input id="nombre_instituto" name="nombre_instituto" />
            </div>
            <div>
              <Label htmlFor="titulo_obtenido">Titulo Obtenido</Label>
              <Input id="titulo_obtenido" name="titulo_obtenido" />
            </div>
            <div>
              <Label htmlFor="fecha_desde_titulo">Desde</Label>
              <Input
                id="fecha_desde_titulo"
                name="fecha_desde"
                type="date"
                max={YYYYMMDD()}
              />
            </div>
            <div>
              <Label htmlFor="fecha_hasta_titulo">Hasta</Label>
              <Input
                id="fecha_hasta_titulo"
                name="fecha_hasta"
                type="date"
                max={YYYYMMDD()}
              />
            </div>
            <div>
              <Button
                type="button"
                onClick={handleAddTituloObtenido}
                className="w-full flex mt-7 items-center justify-center space-x-2"
              >
                Agregar Título
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="md:col-span-3 overflow-x-auto shadow-md rounded-lg mt-8">
            <table className="w-full mx-auto text-sm text-left rtl:text-right dark:text-gray-400">
              <thead className="text-xs uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text_black">
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      Grado de Instrucción
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      Nombre del Instituto
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Titulo Obtenido</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Fecha Desde</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Fecha Hasta</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Acción</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {datosIngreso.titulos_obtenidos.map((edu, index) => (
                  <tr
                    key={index}
                    className="bg-gray-300 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">{edu.grado_instruccion}</td>
                    <td className="px-4 py-4">{edu.nombre_instituto}</td>
                    <td className="px-4 py-4">{edu.titulo_obtenido}</td>
                    <td className="px-4 py-4">{edu.fecha_desde}</td>
                    <td className="px-4 py-4">{edu.fecha_hasta}</td>
                    <td className="px-4 py-4">
                      <span
                        className="font-medium text-red-600 hover:text-red-800 dark:text-blue-500 cursor-pointer"
                        onClick={() => handleRemoveTitulosObtenidos(index)}
                      >
                        Borrar
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trabajos Anteriores */}
        <div className="mt-8 ">
          <Title>Trabajos Anteriores</Title>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <Label htmlFor="empresa_centro_educativo">
                Nombre de la empresa
              </Label>
              <Input
                id="empresa_centro_educativo"
                name="empresa_centro_educativo"
              />
            </div>
            <div>
              <Label htmlFor="cargo_titulo">Cargo</Label>
              <Input id="cargo_titulo" name="cargo_titulo" />
            </div>
            <div>
              <Label htmlFor="fecha_desde_experiencia">Desde</Label>
              <Input
                id="fecha_desde_experiencia"
                name="fecha_desde"
                type="date"
                max={YYYYMMDD()}
              />
            </div>
            <div>
              <Label htmlFor="fecha_hasta_experiencia">Hasta</Label>
              <Input
                id="fecha_hasta_experiencia"
                name="fecha_hasta"
                type="date"
                max={YYYYMMDD()}
              />
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <Button
                type="button"
                onClick={handleAddExperiencia}
                className="w-full flex mt-7 items-center justify-center space-x-2"
              >
                Agregar Trabajo Anterior
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="md:col-span-3 overflow-x-auto shadow-md rounded-lg mt-8">
            <table className="w-full mx-auto text-sm text-left rtl:text-right dark:text-gray-400">
              <thead className="text-xs uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-black">
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Empresa</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Cargo</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Fecha Desde</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Fecha Hasta</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Acción</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {datosIngreso.experiencias.map((experiencia, i) => (
                  <tr
                    key={i}
                    className="bg-gray-300 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">
                      {experiencia.empresa_centro_educativo}
                    </td>
                    <td className="px-4 py-4">{experiencia.cargo_titulo}</td>
                    <td className="px-4 py-4">{experiencia.fecha_desde}</td>
                    <td className="px-4 py-4">{experiencia.fecha_hasta}</td>
                    <td className="px-4 py-4">
                      <span
                        className="font-medium text-red-600 hover:text-red-800 dark:text-blue-500 cursor-pointer"
                        onClick={() => handleRemoveTrabajosAnteriores(i)}
                      >
                        Borrar
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-end md:grid-cols-3">
            <div>
              <Label htmlFor="trabajo_anteriormente_especifique">
                ¿Trabajo Anteriormente en esta empresa? Especifique
              </Label>
              <Input
                id="trabajo_anteriormente_especifique"
                name="trabajo_anteriormente_especifique"
                onChange={handleValidate}
              />
            </div>
            <div>
              <Label htmlFor="motivo_retiro">Motivo del Retiro</Label>
              <Input
                id="motivo_retiro"
                name="motivo_retiro"
                onChange={handleValidate}
              />
            </div>
            <div>
              <Label htmlFor="posee_parientes_empresa">
                ¿Posee parientes que trabajen en esta empresa? Especifique
                cuantos
              </Label>
              <Input
                type="number"
                min="0"
                max="30"
                defaultValue={datosIngreso.posee_parientes_empresa}
                onChange={handleValidate}
                id="posee_parientes_empresa"
                name="posee_parientes_empresa"
              />
            </div>
          </div>
        </div>

        {/* Referencias Personales */}
        <div className="mt-8 ">
          <Title>Referencias Personales</Title>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <Label htmlFor="nombre_apellido">Nombres y Apellidos</Label>
              <Input id="nombre_apellido" name="nombre_apellido" />
            </div>
            <div>
              <Label htmlFor="direccion">Direccion</Label>
              <Input id="direccion" name="direccion" />
            </div>
            <div>
              <Label htmlFor="telefono_referencia">Telefono</Label>
              <Input id="telefono_referencia" name="telefono" />
            </div>
            <div>
              <Label htmlFor="ocupacion">Ocupacion</Label>
              <Input id="ocupacion" name="ocupacion" />
            </div>

            <div className="sm:col-span-2 md:col-span-1">
              <Button
                type="button"
                onClick={handleAddReferenciaPersonal}
                className="w-full flex mt-7 items-center justify-center space-x-2"
              >
                Agregar Referencia Personal
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="md:col-span-3 overflow-x-auto shadow-md rounded-lg mt-8">
            <table className="w-full mx-auto text-sm text-left rtl:text-right dark:text-gray-400">
              <thead className="text-xs uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-black">
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Nombres Y Apellidos</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Direccion</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Telefono</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Ocupacion</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Acciones</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {datosIngreso.referencias_personales.map((referencia, i) => (
                  <tr
                    key={i}
                    className="bg-gray-300 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">{referencia.nombre_apellido}</td>
                    <td className="px-4 py-4">{referencia.direccion}</td>
                    <td className="px-4 py-4">{referencia.telefono}</td>
                    <td className="px-4 py-4">{referencia.ocupacion}</td>
                    <td className="px-4 py-4">
                      <span
                        className="font-medium text-red-600 hover:text-red-800 dark:text-blue-500 cursor-pointer"
                        onClick={() => handleRemoveReferenciaPersonal(i)}
                      >
                        Borrar
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Salud */}
        <div className="mt-8">
          <Title>Salud</Title>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <span className="font-semibold">Alergias</span>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="alergia_alimentos">Alimentos</Label>
                  <input
                    name="alergia_alimentos"
                    id="alergia_alimentos"
                    type="checkbox"
                    checked={datosIngreso.alergia_alimentos}
                    onChange={handleChecked}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="alergia_medicamentos">Medicamentos</Label>
                  <input
                    name="alergia_medicamentos"
                    id="alergia_medicamentos"
                    type="checkbox"
                    checked={datosIngreso.alergia_medicamentos}
                    onChange={handleChecked}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="alergia_otros">Otros</Label>
                  <input
                    name="alergia_otros"
                    id="alergia_otros"
                    type="checkbox"
                    checked={datosIngreso.alergia_otros}
                    onChange={handleChecked}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center mt-10 gap-2">
                <Label htmlFor="fuma">Fuma?</Label>
                <input
                  name="fuma"
                  id="fuma"
                  type="checkbox"
                  checked={datosIngreso.fuma}
                  onChange={handleChecked}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="alergia_especifique">Especifique Alergia</Label>
              <Input
                name="alergia_especifique"
                id="alergia_especifique"
                onChange={handleValidate}
              />
            </div>

            <div>
              <Label htmlFor="cicatriz_especifique">
                Tiene usted Alguna Cicatriz? Especifique
              </Label>
              <Input
                name="cicatriz_especifique"
                id="cicatriz_especifique"
                onChange={handleValidate}
              />
            </div>
          </div>
        </div>

        {/* Contacto de Emergencia */}
        <div className="mt-8">
          <Title>Contactos de Emergencia</Title>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="nombre_apellido">Nombre y Apellido</Label>
              <Input id="nombre_apellido" name="nombre_apellido" />
              {errors.nombre_apellido && (
                <p className="text-red-500">{errors.nombre_apellido}</p>
              )}
            </div>
            <div>
              <Label htmlFor="parentesco_contacto_emergencia">Parentesco</Label>
              <Select id="parentesco_contacto_emergencia" name="parentesco">
                <option value="Abuelo(a)">Abuelo(a)</option>
                <option value="Amigo(a)">Amigo(a)</option>
                <option value="Conyuge">Conyuge</option>
                <option value="Hermano(a)">Hermano(a)</option>
                <option value="Hijo(a)">Hijo(a)</option>
                <option value="Madre">Madre</option>
                <option value="Nieto(a)">Nieto(a)</option>
                <option value="Padre">Padre</option>
                <option value="Primo(a)">Primo(a)</option>
                <option value="Sobrino(a)">Sobrino(a)</option>
                <option value="Tio(a)">Tio(a)</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="telefono_contacto_emergencia">Telefono</Label>
              <Input
                id="telefono_contacto_emergencia"
                name="telefono"
                type="tel"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="direccion_contacto_emergencia">Direccion</Label>
              <Input id="direccion_contacto_emergencia" name="direccion" />
            </div>

            <div>
              <Button
                type="button"
                onClick={handleAddContactoEmergencia}
                className="w-full flex mt-7 items-center justify-center space-x-2"
              >
                Agregar Contacto Emergencia
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="md:col-span-3 overflow-x-auto shadow-md rounded-lg mt-8">
            <table className="w-full mx-auto text-sm text-left rtl:text-right dark:text-gray-400">
              <thead className="text-xs uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-black">
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Nombre y Apellido</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Parentesco</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Telefono</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Direccion</div>
                  </th>

                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Acción</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {datosIngreso.contactos_emergencia.map((contacto, i) => (
                  <tr
                    key={i}
                    className="bg-gray-300 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">{contacto.nombre_apellido}</td>
                    <td className="px-4 py-4">{contacto.parentesco}</td>
                    <td className="px-4 py-4">{contacto.telefono}</td>
                    <td className="px-4 py-4">{contacto.direccion}</td>
                    <td className="px-4 py-4">
                      <span
                        className="font-medium text-red-600 hover:text-red-800 dark:text-blue-500 cursor-pointer"
                        onClick={() => handleRemoveContactoEmergencia(i)}
                      >
                        Borrar
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Datos Bancarios */}
        <div className="mt-8">
          <Title>Datos Bancarios</Title>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <Label htmlFor="titular_cuenta">Titular de la Cuenta</Label>
              <Select
                id="titular_cuenta"
                name="titular_cuenta"
                defaultValue={datosIngreso.titular_cuenta}
                onChange={handleValidate}
              >
                <option value="Propia">Propia</option>
                <option value="Tercero">Tercero</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="entidad_bancaria">Entidad Bancaria</Label>
              <Select
                id="entidad_bancaria"
                name="entidad_bancaria"
                defaultValue={datosIngreso.entidad_bancaria}
                onChange={handleValidate}
              >
                <option value="100% Banco">100% Banco</option>
                <option value="Banco Activo">Banco Activo</option>
                <option value="Banco Bicentenario">Banco Bicentenario</option>
                <option value="Banco Caroni">Banco Caroni</option>
                <option value="Banco De La Fuerza Armada Nacional Bolivariana">
                  Banco De La Fuerza Armada Nacional Bolivariana
                </option>
                <option value="Banco De Venezuela">Banco De Venezuela</option>
                <option value="Banco Del Tesoro">Banco Del Tesoro</option>
                <option value="Banco Exterior">Banco Exterior</option>
                <option value="Banco Fondo Comun">Banco Fondo Comun</option>
                <option value="Banco Nacional De Credito">
                  Banco Nacional De Credito
                </option>
                <option value="Banco Plaza">Banco Plaza</option>
                <option value="Banco Sofitasa">Banco Sofitasa</option>
                <option value="Banco Venezolano De Credito">
                  Banco Venezolano De Credito
                </option>
                <option value="Bancamiga">Bancamiga</option>
                <option value="Bancaribe">Bancaribe</option>
                <option value="Banesco Banco Universal">
                  Banesco Banco Universal
                </option>
                <option value="Bancrecer">Bancrecer</option>
                <option value="Banplus">Banplus</option>
                <option value="BBVA Provincial">BBVA Provincial</option>
                <option value="DELSUR Banco Universal">
                  DELSUR Banco Universal
                </option>
                <option value="Mercantil Banco">Mercantil Banco</option>
                <option value="Mi Banco">Mi Banco</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="numero_cuenta">Número de Cuenta</Label>
              <Input
                id="numero_cuenta"
                name="numero_cuenta"
                onChange={handleValidate}
              />
              {errors.numero_cuenta && (
                <p className="text-red-500">{errors.numero_cuenta}</p>
              )}
            </div>
            <div>
              <Label htmlFor="tipo_cuenta">Tpo de Cuenta</Label>
              <Select
                id="tipo_cuenta"
                name="tipo_cuenta"
                defaultValue={datosIngreso.tipo_cuenta}
                onChange={handleValidate}
              >
                <option value="Ahorro">Ahorro</option>
                <option value="Corriente">Corriente</option>
              </Select>
            </div>
          </div>
          {datosIngreso.titular_cuenta === "Tercero" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="numero_identificacion_tercero">
                  Identificación del Titular
                </Label>
                <div className="grid grid-cols-4">
                  <Select
                    name="tipo_identificacion_tercero"
                    defaultValue={datosIngreso.tipo_identificacion_tercero}
                    onChange={handleValidate}
                  >
                    <option value="V">V</option>
                    <option value="E">E</option>
                  </Select>

                  <div className="col-span-3 pl-3">
                    <Input
                      id="numero_identificacion_tercero"
                      name="numero_identificacion_tercero"
                      onChange={handleValidate}
                    />
                    {errors.cedula && (
                      <p className="text-red-500">{errors.cedula}</p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="nombre_apellido_tercero">
                  Nombre y Apellido del Titular
                </Label>
                <Input
                  id="nombre_apellido_tercero"
                  name="nombre_apellido_tercero"
                  onChange={handleValidate}
                />
                {errors.nombre_apellido_tercero && (
                  <p className="text-red-500">
                    {errors.nombre_apellido_tercero}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="parentesco_tercero">Parentesco</Label>
                <Select
                  id="parentesco_tercero"
                  name="parentesco_tercero"
                  defaultValue={datosIngreso.parentesco_tercero}
                  onChange={handleValidate}
                >
                  <option value="Abuelo(a)">Abuelo(a)</option>
                  <option value="Amigo(a)">Amigo(a)</option>
                  <option value="Conyuge">Conyuge</option>
                  <option value="Hermano(a)">Hermano(a)</option>
                  <option value="Hijo(a)">Hijo(a)</option>
                  <option value="Madre">Madre</option>
                  <option value="Nieto(a)">Nieto(a)</option>
                  <option value="Padre">Padre</option>
                  <option value="Primo(a)">Primo(a)</option>
                  <option value="Sobrino(a)">Sobrino(a)</option>
                  <option value="Tio(a)">Tio(a)</option>
                </Select>
                {errors.parentesco_tercero && (
                  <p className="text-red-500">{errors.parentesco_tercero}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ESPACIO PARA EL DEPARTAMENTO DE TALENTO HUMANO */}

        <div className="mt-8">
          <Title>Espacio para talento humano</Title>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="empresa_id">Empresa</Label>
              {/* if superadmin = select, if admin = disabled="true" */}
              {empleado.Role.nombre !== "admin" ? (
                <Input
                  id="empresa_id"
                  name="empresa_id"
                  readOnly
                  value={
                    empleado?.Cargos_Niveles[0]?.Cargo.Departamento.Empresa
                      .nombre
                  }
                />
              ) : (
                <Select
                  className="w-full"
                  id="empresa_id"
                  name="empresa_id"
                  defaultValue="Seleccione"
                  onChange={handleValidate}
                >
                  <option>Seleccione</option>
                  {empresas_activas?.length
                    ? empresas_activas?.map(
                        (empresa, i) =>
                          empresa.activo && (
                            <option
                              key={i}
                              name={empresa.nombre}
                              value={empresa.empresa_id}
                            >
                              {empresa.nombre}
                            </option>
                          )
                      )
                    : null}
                </Select>
              )}
            </div>

            <div>
              <Label htmlFor="departamento_id">Departamento</Label>
              <Select
                className="w-full"
                id="departamento_id"
                name="departamento_id"
                defaultValue="Seleccione"
                onChange={handleValidate}
              >
                <option>Seleccione</option>
                {departamentos_activos?.length
                  ? departamentos_activos?.map(
                      (departamento, i) =>
                        departamento.activo && (
                          <option
                            key={i}
                            name={departamento.nombre}
                            value={departamento.departamento_id}
                          >
                            {departamento.nombre}
                          </option>
                        )
                    )
                  : null}
              </Select>
            </div>
            <div>
              <Label htmlFor="cargo_id">Cargo</Label>
              <Select
                className="w-full"
                id="cargo_id"
                name="cargo_id"
                defaultValue="Seleccione"
                onChange={handleValidate}
              >
                <option>Seleccione</option>
                {cargos_activos?.length
                  ? cargos_activos?.map(
                      (cargo, i) =>
                        cargo.activo && (
                          <option
                            key={i}
                            name={cargo.descripcion}
                            value={cargo.cargo_id}
                          >
                            {cargo.descripcion}
                          </option>
                        )
                    )
                  : null}
              </Select>
            </div>
            <div>
              <Label htmlFor="cargo_nivel_id">Nivel</Label>
              <Select
                className="w-full"
                id="cargo_nivel_id"
                name="cargo_nivel_id"
                defaultValue="Seleccione"
                onChange={handleValidate}
              >
                <option>Seleccione</option>
                {cargos_niveles_activos?.length
                  ? cargos_niveles_activos?.map(
                      (cargo_nivel, i) =>
                        cargo_nivel.activo && (
                          <option
                            key={i}
                            name={cargo_nivel.nivel}
                            value={cargo_nivel.cargo_nivel_id}
                          >
                            {cargo_nivel.nivel}
                          </option>
                        )
                    )
                  : null}
              </Select>
            </div>
            <div>
              <Label htmlFor="salario" className="flex">
                Salario <FaCircleInfo className="ml-2 text-gray-600" />
              </Label>
              {/* rango_salario se asignara al min y max del input, ademas debe mostrarse al administrador */}
              <Input id="salario" name="salario" onChange={handleValidate} />
              {errors.numero_cuenta && (
                <p className="text-red-500">{errors.salario}</p>
              )}
            </div>
            <div>
              <Label htmlFor="fecha_ingreso">Fecha de Ingreso</Label>
              <Input
                id="fecha_ingreso"
                name="fecha_ingreso"
                type="date"
                defaultValue={datosIngreso.fecha_ingreso}
                onChange={handleValidate}
              />
              {errors.fecha_ingreso && (
                <p className="text-red-500">{errors.fecha_ingreso}</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="observaciones">Observaciones</Label>
          <textarea
            id="observaciones"
            name="observaciones"
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-[#002846] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="textarea"
            rows="3"
            maxLength="255"
            onChange={handleValidate}
          />
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            className="sm:w-full md:w-auto flex items-center justify-center space-x-2"
            onClick={handleSaveFicha}
          >
            <FaFloppyDisk />
            <span>Guardar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
