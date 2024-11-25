import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
// import Webcam from "react-webcam";

import { getAllEtniasActivas } from "../../redux/etnias/etniasActions";

import { getAllPaisesActivos } from "../../redux/paises/paisesActions";

import {
  getAllEstadosResidencia,
  getAllEstadosNacimiento,
} from "../../redux/estados/estadosActions";

import { getAllMunicipiosActivos } from "../../redux/municipios/municipiosActions";

import { getAllParroquiasActivas } from "../../redux/parroquias/parroquiasActions";

import { getEmpleadoExistencia } from "../../redux/empleados/empleadosActions";

import { getAllEmpresasActivas } from "../../redux/empresas/empresasActions";

import { getAllDepartamentosActivos } from "../../redux/departamentos/departamentosActions";

import { getAllCargosNivelesActivos } from "../../redux/cargosNiveles/cargosNivelesActions";

import { getAllCargosActivos } from "../../redux/cargos/cargosActions";

import { saveFichaIngreso } from "../../redux/fichasIngresos/fichasIngresosActions";

import {
  Button,
  CheckBox,
  Date,
  Input,
  Label,
  Select,
  Span,
  TextArea,
  Title,
  Hr,
} from "../UI";

import { FaFloppyDisk } from "react-icons/fa6";

// import { IoCameraOutline, IoCameraReverseOutline } from "react-icons/io5";

import { MdCancel } from "react-icons/md";

import { BiSolidShow, BiSolidHide } from "react-icons/bi";

import {
  YYYYMMDD,
  YYYYMM,
  calcularMaxFechaNacimiento,
} from "../../utils/formatearFecha";
import validations from "../../utils/validacionesFormularioIngreso";

import Swal from "sweetalert2";

export default function FormularioIngreso() {
  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  // const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const [etniasActivas, setEtniasActivas] = useState([]);

  const [paisesActivos, setPaisesActivos] = useState([]);

  const [empresasActivas, setEmpresasActivas] = useState([]);

  const [estadosNacimiento, setEstadosNacimiento] = useState([]);

  const [estadosResidencia, setEstadosResidencia] = useState([]);

  const [municipiosActivos, setMunicipiosActivos] = useState([]);

  const [parroquiasActivas, setParroquiasActivas] = useState([]);

  const [departamentosActivos, setDepartamentosActivos] = useState([]);

  const [cargosActivos, setCargosActivos] = useState([]);

  const [cargosNivelesActivos, setCargosNivelesActivos] = useState([]);

  const [errors, setErrors] = useState({});

  const [showSalario, setShowSalario] = useState(true);

  // const [imagenEmpleado, setImagenEmpleado] = useState(null);

  // const [facingMode, setFacingMode] = useState("environment");

  // const webCamRef = useRef(null);

  const [datosIngreso, setDatosIngreso] = useState({
    tipo_identificacion: "V",
    numero_identificacion: "",
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
    posee_licencia_conducir: false,
    posee_carta_medica: false,
    tiene_parientes_empresa: false,
    salario: "",
  });

  useEffect(() => {
    window.scroll(0, 0);
    document.title = "Grupo Lamar - Formulario de Ingreso (Admin)";

    (async function () {
      const dataEtniasActivas = await getAllEtniasActivas(token);
      const dataPaisesActivos = await getAllPaisesActivos(token);
      const dataEmpresasActivas = await getAllEmpresasActivas();

      setEtniasActivas(dataEtniasActivas);
      setPaisesActivos(dataPaisesActivos);
      setEmpresasActivas(dataEmpresasActivas);
    })();

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    (async function () {
      if (
        datosIngreso.nacimiento_pais_id &&
        datosIngreso.nacimiento_pais_id !== "Seleccione"
      ) {
        setDatosIngreso({
          ...datosIngreso,
          nacimiento_estado_id: "Seleccione",
        });

        const dataEstadosNacimiento = await getAllEstadosNacimiento(
          token,
          datosIngreso.nacimiento_pais_id
        );

        setEstadosNacimiento(dataEstadosNacimiento);
      } else {
        setEstadosNacimiento([]);

        setDatosIngreso({
          ...datosIngreso,
          nacimiento_estado_id: "Seleccione",
        });
      }
    })();
  }, [datosIngreso.nacimiento_pais_id]);

  useEffect(() => {
    (async function () {
      if (datosIngreso.pais_id && datosIngreso.pais_id !== "Seleccione") {
        setEstadosResidencia([]);
        setMunicipiosActivos([]);
        setParroquiasActivas([]);

        setDatosIngreso({ ...datosIngreso, estado_id: "Seleccione" });

        const dataEstadosResidencia = await getAllEstadosResidencia(
          token,
          datosIngreso.pais_id
        );

        setEstadosResidencia(dataEstadosResidencia);
      } else {
        setEstadosResidencia([]);
        setMunicipiosActivos([]);
        setParroquiasActivas([]);

        setDatosIngreso({ ...datosIngreso, estado_id: "Seleccione" });
      }
    })();
  }, [datosIngreso.pais_id]);

  useEffect(() => {
    (async function () {
      if (datosIngreso.estado_id && datosIngreso.estado_id !== "Seleccione") {
        setMunicipiosActivos([]);
        setParroquiasActivas([]);

        setDatosIngreso({ ...datosIngreso, municipio_id: "Seleccione" });

        const dataMunicipiosActivos = await getAllMunicipiosActivos(
          token,
          datosIngreso.estado_id
        );

        setMunicipiosActivos(dataMunicipiosActivos);
      } else {
        setMunicipiosActivos([]);
        setParroquiasActivas([]);
        setDatosIngreso({ ...datosIngreso, municipio_id: "Seleccione" });
      }
    })();
  }, [datosIngreso.estado_id]);

  useEffect(() => {
    (async function () {
      if (
        datosIngreso.municipio_id &&
        datosIngreso.municipio_id !== "Seleccione"
      ) {
        setParroquiasActivas([]);

        setDatosIngreso({ ...datosIngreso, parroquia_id: "Seleccione" });

        const dataParroquiasActivas = await getAllParroquiasActivas(
          token,
          datosIngreso.municipio_id
        );

        setParroquiasActivas(dataParroquiasActivas);
      } else {
        setParroquiasActivas([]);

        setDatosIngreso({ ...datosIngreso, parroquia_id: "Seleccione" });
      }
    })();
  }, [datosIngreso.municipio_id]);

  useEffect(() => {
    (async function () {
      if (datosIngreso.empresa_id && datosIngreso.empresa_id !== "Seleccione") {
        setDepartamentosActivos([]);
        setCargosActivos([]);
        setCargosNivelesActivos([]);

        setDatosIngreso({ ...datosIngreso, departamento_id: "Seleccione" });

        const dataDepartamentosActivos = await getAllDepartamentosActivos(
          token,
          datosIngreso.empresa_id
        );

        setDepartamentosActivos(dataDepartamentosActivos);
      } else {
        setDepartamentosActivos([]);
        setCargosActivos([]);
        setCargosNivelesActivos([]);

        setDatosIngreso({ ...datosIngreso, departamento_id: "Seleccione" });
      }
    })();
  }, [datosIngreso.empresa_id]);

  useEffect(() => {
    (async function () {
      if (
        datosIngreso.departamento_id &&
        datosIngreso.departamento_id !== "Seleccione"
      ) {
        setCargosActivos([]);
        setCargosNivelesActivos([]);

        setDatosIngreso({ ...datosIngreso, cargo_id: "Seleccione" });

        const dataCargosActivos = await getAllCargosActivos(
          token,
          datosIngreso.departamento_id
        );

        setCargosActivos(dataCargosActivos);
      } else {
        setCargosActivos([]);
        setCargosNivelesActivos([]);

        setDatosIngreso({ ...datosIngreso, cargo_id: "Seleccione" });
      }
    })();
  }, [datosIngreso.departamento_id]);

  useEffect(() => {
    (async function () {
      if (datosIngreso.cargo_id && datosIngreso.cargo_id !== "Seleccione") {
        setCargosNivelesActivos([]);

        setDatosIngreso({ ...datosIngreso, cargo_nivel_id: "Seleccione" });

        const dataCargosNivelesActivos = await getAllCargosNivelesActivos(
          token,
          datosIngreso.cargo_id
        );

        setCargosNivelesActivos(dataCargosNivelesActivos);
      } else {
        setCargosNivelesActivos([]);

        setDatosIngreso({ ...datosIngreso, cargo_nivel_id: "Seleccione" });
      }
    })();
  }, [datosIngreso.cargo_id]);

  const handleValidate = (e) => {
    const { name, value } = e.target;

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
      setErrors(validations({ ...datosIngreso, [name]: value }));
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
      fecha_desde_titulo: "",
      fecha_hasta_titulo: "",
      nombre_instituto: "",
      titulo_obtenido: "",
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

    setErrors(validations({ ...datosIngreso }));

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
      fecha_desde_experiencia: "",
      fecha_hasta_experiencia: "",
      empresa_centro_educativo: "",
      cargo_titulo: "",
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

    setErrors(validations({ ...datosIngreso }));

    cargo_titulo.value = null;
    empresa_centro_educativo.value = null;
    fecha_desde_experiencia.value = null;
    fecha_hasta_experiencia.value = null;
  };

  const handleAddReferenciaPersonal = () => {
    const nombre_apellido = document.getElementById(
      "nombre_apellido_referencia"
    );
    const direccion = document.getElementById("direccion_referencia");
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
    const input_nombre_apellido = document.getElementById(
      "nombre_apellido_contacto_emergencia"
    );
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

  const handleEmpleadoExiste = async (e) => {
    const { value } = e.target;

    if (value) {
      await getEmpleadoExistencia(
        token,
        datosIngreso.tipo_identificacion,
        datosIngreso.numero_identificacion,
        ""
      ).then((data) => {
        if (data) {
          const numero_identificacion = document.getElementById(
            "numero_identificacion"
          );

          numero_identificacion.value = null;

          numero_identificacion.focus();

          Swal.fire({
            title: "Oops...",
            text: "Ese empleado ya cuenta con ficha de ingreso",
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
          return;
        }
      });
    }
  };

  const handleSaveFicha = async () => {
    const numero_identificacion = document.getElementById(
      "numero_identificacion"
    );
    const nombres = document.getElementById("nombres");
    const apellidos = document.getElementById("apellidos");
    const estado_civil = document.getElementById("estado_civil");
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
        text: "Datos Faltantes jiji",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });

      return;
    }

    await saveFichaIngreso(token, datosIngreso);

    window.scroll(0, 0);

    setDatosIngreso({
      tipo_identificacion: "V",
      numero_identificacion: "",
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
      posee_licencia_conducir: false,
      posee_carta_medica: false,
      tiene_parientes_empresa: false,
      salario: "",
    });
  };

  const handleConvertirADecimales = (e) => {
    const { name, value } = e.target;

    if (value) {
      const numeroFormateado = Number.parseFloat(value).toFixed(2);

      setDatosIngreso({ ...datosIngreso, [name]: numeroFormateado });

      setErrors(validations({ ...datosIngreso, [name]: numeroFormateado }));
    }
  };

  // const tomarFoto = () => {
  //   const imageSrc = webCamRef.current.getScreenshot();

  //   setImagenEmpleado(imageSrc);

  //   console.log(imageSrc);
  // };

  // const cambiarCamara = () => {
  //   facingMode === "user"
  //     ? setFacingMode("environment")
  //     : setFacingMode("user");
  // };

  // const descargarImagen = () => {
  //   const a = document.createElement("a");

  //   a.href = imagenEmpleado;

  //   a.download = "prueba.png";

  //   a.click();
  // };

  return (
    <div className="mt-24 sm:mt-32 items-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <Title>Formulario de Ingreso</Title>
      </div>
      <br />
      <Hr />
      <br />
      <Span className="text-center m-0 text-red-600">
        (*) Campos obligatorios
      </Span>
      <br />
      <div className="w-full">
        {/* Información Personal */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 items-start">
          <div>
            <Label
              htmlFor="numero_identificacion"
              errors={errors.numero_identificacion}
            >
              Número de identificación *
            </Label>
            <div className="flex justify-between gap-2">
              <Select
                className="w-auto"
                name="tipo_identificacion"
                value={datosIngreso.tipo_identificacion}
                onChange={handleValidate}
              >
                <option value="V">V</option>
                <option value="E">E</option>
              </Select>

              <div className="relative w-full">
                <Input
                  id="numero_identificacion"
                  name="numero_identificacion"
                  value={datosIngreso.numero_identificacion}
                  errors={errors.numero_identificacion}
                  onChange={handleValidate}
                  onBlur={handleEmpleadoExiste}
                  maxLength="20"
                />
                {errors.numero_identificacion && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
            </div>
            {errors.numero_identificacion && (
              <Span className="m-0">{errors.numero_identificacion}</Span>
            )}
          </div>
          <div>
            <Label htmlFor="nombres" errors={errors.nombres}>
              Nombres *
            </Label>
            <div className="relative w-full">
              <Input
                id="nombres"
                name="nombres"
                onChange={handleValidate}
                errors={errors.nombres}
              />
              {errors.nombres && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
            {errors.nombres && <Span className="m-0">{errors.nombres}</Span>}
          </div>
          <div>
            <Label htmlFor="apellidos" errors={errors.apellidos}>
              Apellidos *
            </Label>
            <div className="relative w-full">
              <Input
                id="apellidos"
                name="apellidos"
                onChange={handleValidate}
                errors={errors.apellidos}
              />
              {errors.apellidos && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
            {errors.apellidos && (
              <Span className="m-0">{errors.apellidos}</Span>
            )}
          </div>
          <div>
            <Label htmlFor="estado_civil">Estado civil</Label>
            <Select
              id="estado_civil"
              name="estado_civil"
              value={datosIngreso.estado_civil}
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
            <Label htmlFor="rif" errors={errors.rif}>
              Registro de información fiscal (RIF)
            </Label>
            <div className="relative w-full">
              <Input
                id="rif"
                name="rif"
                onChange={handleValidate}
                errors={errors.rif}
              />
              {errors.rif && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
            {errors.rif && <Span className="m-0">{errors.rif}</Span>}
          </div>
          <div>
            <Label htmlFor="telefono" errors={errors.telefono}>
              Teléfono
            </Label>
            <div className="relative w-full">
              <Input
                id="telefono"
                type="tel"
                maxLength="20"
                name="telefono"
                onChange={handleValidate}
                errors={errors.telefono}
              />
              {errors.telefono && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
            {errors.telefono && <Span className="m-0">{errors.telefono}</Span>}
          </div>
          <div>
            <Label htmlFor="correo" errors={errors.correo}>
              Correo electrónico
            </Label>
            <div className="relative w-full">
              <Input
                id="correo"
                type="email"
                name="correo"
                onChange={handleValidate}
                errors={errors.correo}
                maxLength="150"
              />
              {errors.correo && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
            {errors.correo && <Span className="m-0">{errors.correo}</Span>}
          </div>
          <div>
            <Label htmlFor="etnia_id">Etnia</Label>
            <Select
              id="etnia_id"
              name="etnia_id"
              value={datosIngreso.etnia_id}
              onChange={handleValidate}
            >
              <option value="Ninguna">Ninguna</option>
              {etniasActivas?.length
                ? etniasActivas?.map(
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
            <Label htmlFor="mano_dominante">Mano dominante</Label>
            <Select
              id="mano_dominante"
              name="mano_dominante"
              value={datosIngreso.mano_dominante}
              onChange={handleValidate}
            >
              <option value="Derecha">Derecha</option>
              <option value="Izquierda">Izquierda</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="sexo">Sexo</Label>
            <Select
              id="sexo"
              name="sexo"
              value={datosIngreso.sexo}
              onChange={handleValidate}
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="factor_grupo_sanguineo">
              Factor grupo sanguíneo
            </Label>
            <Select
              id="factor_grupo_sanguineo"
              name="factor_grupo_sanguineo"
              value={datosIngreso.factor_grupo_sanguineo}
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
          </div>
          <div>
            <Label htmlFor="cantidad_hijos">Cantidad de hijos</Label>
            <Input
              type="number"
              name="cantidad_hijos"
              id="cantidad_hijos"
              value={datosIngreso.cantidad_hijos}
              onChange={handleValidate}
              min="0"
              max="15"
            />
          </div>
          <div>
            <Label htmlFor="carga_familiar">Carga familiar</Label>
            <Input
              type="number"
              name="carga_familiar"
              id="carga_familiar"
              value={datosIngreso.carga_familiar}
              onChange={handleValidate}
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="fecha_nacimiento" errors={errors.fecha_nacimiento}>
              Fecha de nacimiento *
            </Label>
            <Input
              type="date"
              id="fecha_nacimiento"
              name="fecha_nacimiento"
              max={calcularMaxFechaNacimiento()}
              onChange={handleValidate}
              errors={errors.fecha_nacimiento}
            />
            {errors.fecha_nacimiento && (
              <Span className="m-0">{errors.fecha_nacimiento}</Span>
            )}
          </div>
          <div>
            <Label htmlFor="nacimiento_lugar" errors={errors.nacimiento_lugar}>
              Lugar de nacimiento *
            </Label>
            <div className="relative w-full">
              <Input
                id="nacimiento_lugar"
                name="nacimiento_lugar"
                onChange={handleValidate}
                errors={errors.nacimiento_lugar}
              />
              {errors.nacimiento_lugar && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
            {errors.nacimiento_lugar && (
              <Span className="m-0">{errors.nacimiento_lugar}</Span>
            )}
          </div>
          <div>
            <Label htmlFor="nacimiento_pais_id">Nacionalidad *</Label>
            <Select
              id="nacimiento_pais_id"
              name="nacimiento_pais_id"
              defaultValue="Seleccione"
              onChange={handleValidate}
            >
              <option name="Seleccione">Seleccione</option>
              {paisesActivos?.length
                ? paisesActivos?.map(
                    (pais, i) =>
                      pais.activo && (
                        <option key={i} name={pais.nombre} value={pais.pais_id}>
                          {pais.nombre}
                        </option>
                      )
                  )
                : null}
            </Select>
          </div>
          <div>
            <Label htmlFor="nacimiento_estado_id">Estado de nacimiento *</Label>
            <Select
              id="nacimiento_estado_id"
              name="nacimiento_estado_id"
              value={datosIngreso.nacimiento_estado_id}
              onChange={handleValidate}
            >
              <option name="Seleccione">Seleccione</option>
              {estadosNacimiento?.length
                ? estadosNacimiento?.map(
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
            <Label htmlFor="pais_id">País de residencia *</Label>
            <Select
              id="pais_id"
              name="pais_id"
              defaultValue="Seleccione"
              onChange={handleValidate}
            >
              <option name="Seleccione">Seleccione</option>
              {paisesActivos?.map(
                (pais, i) =>
                  pais.activo && (
                    <option key={i} name={pais.nombre} value={pais.pais_id}>
                      {pais.nombre}
                    </option>
                  )
              )}
            </Select>
          </div>
          <div>
            <Label htmlFor="estado_id">Estado de residencia *</Label>
            <Select
              id="estado_id"
              name="estado_id"
              value={datosIngreso.estado_id}
              onChange={handleValidate}
            >
              <option name="Seleccione">Seleccione</option>
              {estadosResidencia?.length
                ? estadosResidencia?.map(
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
            <Label htmlFor="municipio_id">Municipio *</Label>
            <Select
              id="municipio_id"
              name="municipio_id"
              value={datosIngreso.municipio_id}
              onChange={handleValidate}
            >
              <option name="Seleccione">Seleccione</option>
              {municipiosActivos?.length
                ? municipiosActivos?.map(
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
            <Label htmlFor="parroquia_id">Parroquia *</Label>
            <Select
              id="parroquia_id"
              name="parroquia_id"
              value={datosIngreso.parroquia_id}
              onChange={handleValidate}
            >
              <option name="Seleccione">Seleccione</option>
              {parroquiasActivas?.length
                ? parroquiasActivas?.map(
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
            <Label
              htmlFor="urbanizacion_sector"
              errors={errors.urbanizacion_sector}
            >
              Urbanización / Sector *
            </Label>
            <div className="relative w-full">
              <Input
                id="urbanizacion_sector"
                name="urbanizacion_sector"
                onChange={handleValidate}
                errors={errors.urbanizacion_sector}
              />
              {errors.urbanizacion_sector && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
            {errors.urbanizacion_sector && (
              <Span className="m-0">{errors.urbanizacion_sector}</Span>
            )}
          </div>
          <div>
            <Label htmlFor="calle_avenida" errors={errors.calle_avenida}>
              Calle / Avenida *
            </Label>
            <div className="relative w-full">
              <Input
                id="calle_avenida"
                name="calle_avenida"
                onChange={handleValidate}
                errors={errors.calle_avenida}
              />
              {errors.calle_avenida && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
            {errors.calle_avenida && (
              <Span className="m-0">{errors.calle_avenida}</Span>
            )}
          </div>
          <div>
            <Label htmlFor="tipo_vivienda">Tipo de vivienda *</Label>
            <Select
              id="tipo_vivienda"
              name="tipo_vivienda"
              value={datosIngreso.tipo_vivienda}
              onChange={handleValidate}
            >
              <option value="Casa">Casa</option>
              <option value="Edificio">Edificio</option>
            </Select>
          </div>

          {datosIngreso.tipo_vivienda === "Casa" && (
            <div>
              <Label htmlFor="numero_casa" errors={errors.numero_casa}>
                Numero de casa *
              </Label>
              <div className="relative w-full">
                <Input
                  name="numero_casa"
                  id="numero_casa"
                  onChange={handleValidate}
                  errors={errors.numero_casa}
                />
                {errors.numero_casa && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.numero_casa && (
                <Span className="m-0">{errors.numero_casa}</Span>
              )}
            </div>
          )}
          {datosIngreso.tipo_vivienda === "Edificio" && (
            <>
              <div>
                <Label htmlFor="piso">Piso *</Label>
                <Input
                  name="piso"
                  id="piso"
                  onChange={handleValidate}
                  type="number"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="apartamento" errors={errors.apartamento}>
                  Apartamento *
                </Label>
                <div className="relative w-full">
                  <Input
                    name="apartamento"
                    id="apartamento"
                    onChange={handleValidate}
                    errors={errors.apartamento}
                  />
                  {errors.apartamento && (
                    <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                  )}
                </div>
                {errors.apartamento && (
                  <Span className="m-0">{errors.apartamento}</Span>
                )}
              </div>
            </>
          )}
          <div className="flex gap-2 justify-center items-center h-full">
            <CheckBox
              name="posee_licencia_conducir"
              id="posee_licencia_conducir"
              checked={datosIngreso.posee_licencia_conducir}
              onChange={handleChecked}
            />
            <Label className="select-none" htmlFor="posee_licencia_conducir">
              ¿Posee licencia de conducir?
            </Label>
          </div>
          {datosIngreso.posee_licencia_conducir && (
            <>
              <div>
                <Label htmlFor="licencia_conducir_grado">
                  Grado más alto obtenido de licencia de conducir *
                </Label>
                <Input
                  type="number"
                  id="licencia_conducir_grado"
                  name="licencia_conducir_grado"
                  max="5"
                  min="0"
                  onChange={handleValidate}
                />
              </div>
              <div>
                <Label htmlFor="licencia_conducir_vencimiento">
                  Fecha de vencimiento de licencia de conducir *
                </Label>
                <Date
                  id="licencia_conducir_vencimiento"
                  name="licencia_conducir_vencimiento"
                  onChange={handleValidate}
                />
              </div>
            </>
          )}
          <div className="flex gap-2 justify-center items-center h-full">
            <CheckBox
              name="posee_carta_medica"
              id="posee_carta_medica"
              checked={datosIngreso.posee_carta_medica}
              onChange={handleChecked}
            />
            <Label className="select-none" htmlFor="posee_carta_medica">
              ¿Posee carta médica?
            </Label>
          </div>
          {datosIngreso.posee_carta_medica && (
            <div>
              <Label htmlFor="carta_medica_vencimiento">
                Fecha de vencimiento de carta médica *
              </Label>
              <Date
                id="carta_medica_vencimiento"
                name="carta_medica_vencimiento"
                onChange={handleValidate}
              />
            </div>
          )}
          <div>
            <Label htmlFor="talla_camisa" errors={errors.talla_camisa}>
              Talla camisa *
            </Label>
            <div className="relative w-full">
              <Input
                name="talla_camisa"
                id="talla_camisa"
                onChange={handleValidate}
                errors={errors.talla_camisa}
              />
              {errors.talla_camisa && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
            {errors.talla_camisa && (
              <Span className="m-0">{errors.talla_camisa}</Span>
            )}
          </div>
          <div>
            <Label htmlFor="talla_pantalon" errors={errors.talla_pantalon}>
              Talla pantalón *
            </Label>
            <div className="relative w-full">
              <Input
                name="talla_pantalon"
                id="talla_pantalon"
                onChange={handleValidate}
                errors={errors.talla_pantalon}
              />
              {errors.talla_pantalon && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
            {errors.talla_pantalon && (
              <Span className="m-0">{errors.talla_pantalon}</Span>
            )}
          </div>
          <div>
            <Label htmlFor="talla_calzado" errors={errors.talla_calzado}>
              Talla calzado *
            </Label>
            <div className="relative w-full">
              <Input
                name="talla_calzado"
                id="talla_calzado"
                onChange={handleValidate}
                errors={errors.talla_calzado}
              />
              {errors.talla_calzado && (
                <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
              )}
            </div>
            {errors.talla_calzado && (
              <Span className="m-0">{errors.talla_calzado}</Span>
            )}
          </div>
        </div>

        {/* Educación */}
        <div className="mt-6">
          <Title>Educación</Title>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 items-start mt-2">
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
              <Label
                htmlFor="nombre_instituto"
                errors={errors.nombre_instituto}
              >
                Nombre del instituto
              </Label>
              <div className="relative w-full">
                <Input
                  id="nombre_instituto"
                  name="nombre_instituto"
                  onChange={handleValidate}
                  errors={errors.nombre_instituto}
                />
                {errors.nombre_instituto && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.nombre_instituto && (
                <Span className="m-0">{errors.nombre_instituto}</Span>
              )}
            </div>
            <div>
              <Label htmlFor="titulo_obtenido" errors={errors.titulo_obtenido}>
                Titulo obtenido
              </Label>
              <div className="relative w-full">
                <Input
                  id="titulo_obtenido"
                  name="titulo_obtenido"
                  onChange={handleValidate}
                  errors={errors.titulo_obtenido}
                />
                {errors.titulo_obtenido && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.titulo_obtenido && (
                <Span className="m-0">{errors.titulo_obtenido}</Span>
              )}
            </div>
            <div>
              <Label htmlFor="fecha_desde_titulo" errors={errors.fecha_titulo}>
                Desde
              </Label>
              <Date
                type="month"
                id="fecha_desde_titulo"
                name="fecha_desde_titulo"
                max={YYYYMM()}
                errors={errors.fecha_titulo}
                onChange={handleValidate}
              />
            </div>
            <div>
              <Label htmlFor="fecha_hasta_titulo" errors={errors.fecha_titulo}>
                Hasta
              </Label>
              <Date
                type="month"
                id="fecha_hasta_titulo"
                name="fecha_hasta_titulo"
                max={YYYYMM()}
                errors={errors.fecha_titulo}
                onChange={handleValidate}
              />
              {errors.fecha_titulo && (
                <Span className="m-0">{errors.fecha_titulo}</Span>
              )}
            </div>
            {!errors.nombre_instituto &&
              !errors.titulo_obtenido &&
              !errors.fecha_titulo && (
                <div className="flex h-full items-end">
                  <Button
                    onClick={handleAddTituloObtenido}
                    className="m-0 w-full"
                  >
                    Agregar Título
                  </Button>
                </div>
              )}
          </div>
        </div>

        <div className="mt-6">
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
                    <div className="flex items-center">Título Obtenido</div>
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
                    className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300"
                  >
                    <td className="p-4">{edu.grado_instruccion}</td>
                    <td className="p-4">{edu.nombre_instituto}</td>
                    <td className="p-4">{edu.titulo_obtenido}</td>
                    <td className="p-4">{edu.fecha_desde}</td>
                    <td className="p-4">{edu.fecha_hasta}</td>
                    <td className="p-4">
                      <span
                        className="font-medium text-red-600 hover:text-red-800 cursor-pointer"
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

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 items-start mt-2">
            <div>
              <Label
                htmlFor="empresa_centro_educativo"
                errors={errors.empresa_centro_educativo}
              >
                Nombre de la empresa
              </Label>
              <div className="relative w-full">
                <Input
                  id="empresa_centro_educativo"
                  name="empresa_centro_educativo"
                  onChange={handleValidate}
                  errors={errors.empresa_centro_educativo}
                />
                {errors.empresa_centro_educativo && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.empresa_centro_educativo && (
                <Span className="m-0">{errors.empresa_centro_educativo}</Span>
              )}
            </div>
            <div>
              <Label htmlFor="cargo_titulo" errors={errors.cargo_titulo}>
                Cargo ejercido
              </Label>
              <div className="relative w-full">
                <Input
                  id="cargo_titulo"
                  name="cargo_titulo"
                  onChange={handleValidate}
                  errors={errors.cargo_titulo}
                />
                {errors.cargo_titulo && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.cargo_titulo && (
                <Span className="m-0">{errors.cargo_titulo}</Span>
              )}
            </div>
            <div>
              <Label
                htmlFor="fecha_desde_experiencia"
                errors={errors.fecha_experiencia}
              >
                Desde
              </Label>
              <Date
                id="fecha_desde_experiencia"
                name="fecha_desde_experiencia"
                max={YYYYMMDD()}
                onChange={handleValidate}
                errors={errors.fecha_experiencia}
              />
            </div>
            <div>
              <Label
                htmlFor="fecha_hasta_experiencia"
                errors={errors.fecha_experiencia}
              >
                Hasta
              </Label>
              <Date
                id="fecha_hasta_experiencia"
                name="fecha_hasta_experiencia"
                max={YYYYMMDD()}
                onChange={handleValidate}
                errors={errors.fecha_experiencia}
              />
              {errors.fecha_experiencia && (
                <Span className="m-0">{errors.fecha_experiencia}</Span>
              )}
            </div>
            {!errors.empresa_centro_educativo &&
              !errors.cargo_titulo &&
              !errors.fecha_experiencia && (
                <div className="flex h-full items-end">
                  <Button onClick={handleAddExperiencia} className="m-0 w-full">
                    Agregar Trabajo Anterior
                  </Button>
                </div>
              )}
          </div>
        </div>

        <div className="mt-6">
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
                    className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300"
                  >
                    <td className="p-4">
                      {experiencia.empresa_centro_educativo}
                    </td>
                    <td className="p-4">{experiencia.cargo_titulo}</td>
                    <td className="p-4">{experiencia.fecha_desde}</td>
                    <td className="p-4">{experiencia.fecha_hasta}</td>
                    <td className="p-4">
                      <span
                        className="font-medium text-red-600 hover:text-red-800 cursor-pointer"
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
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 items-end mt-2">
            <div>
              <Label
                htmlFor="trabajo_anteriormente_especifique"
                errors={errors.trabajo_anteriormente_especifique}
              >
                ¿Ha trabajado anteriormente en esta empresa? Especifique
              </Label>
              <div className="relative w-full">
                <Input
                  id="trabajo_anteriormente_especifique"
                  name="trabajo_anteriormente_especifique"
                  onChange={handleValidate}
                  errors={errors.trabajo_anteriormente_especifique}
                />
                {errors.trabajo_anteriormente_especifique && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.trabajo_anteriormente_especifique && (
                <Span className="m-0">
                  {errors.trabajo_anteriormente_especifique}
                </Span>
              )}
            </div>
            <div>
              <Label htmlFor="motivo_retiro" errors={errors.motivo_retiro}>
                Motivo del retiro
              </Label>
              <div className="relative w-full">
                <Input
                  id="motivo_retiro"
                  name="motivo_retiro"
                  onChange={handleValidate}
                  errors={errors.motivo_retiro}
                />
                {errors.motivo_retiro && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.motivo_retiro && (
                <Span className="m-0">{errors.motivo_retiro}</Span>
              )}
            </div>
            <div className="flex gap-2 justify-center items-center h-full">
              <CheckBox
                name="tiene_parientes_empresa"
                id="tiene_parientes_empresa"
                checked={datosIngreso.tiene_parientes_empresa}
                onChange={handleChecked}
              />
              <Label className="select-none" htmlFor="tiene_parientes_empresa">
                ¿Posee parientes que trabajen en esta empresa?
              </Label>
            </div>
            {datosIngreso.tiene_parientes_empresa && (
              <div>
                <Label htmlFor="posee_parientes_empresa">
                  Especifique cuantos parientes posee en la empresa
                </Label>
                <Input
                  type="number"
                  min="0"
                  max="20"
                  value={datosIngreso.posee_parientes_empresa}
                  onChange={handleValidate}
                  id="posee_parientes_empresa"
                  name="posee_parientes_empresa"
                />
              </div>
            )}
          </div>
        </div>

        {/* Referencias Personales */}
        <div className="mt-6">
          <Title>Referencias Personales *</Title>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 items-start mt-2">
            <div>
              <Label
                htmlFor="nombre_apellido_referencia"
                errors={errors.nombre_apellido_referencia}
              >
                Nombres y apellidos
              </Label>
              <div className="relative w-full">
                <Input
                  id="nombre_apellido_referencia"
                  name="nombre_apellido_referencia"
                  onChange={handleValidate}
                  errors={errors.nombre_apellido_referencia}
                />
                {errors.nombre_apellido_referencia && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.nombre_apellido_referencia && (
                <Span className="m-0">{errors.nombre_apellido_referencia}</Span>
              )}
            </div>
            <div>
              <Label
                htmlFor="direccion_referencia"
                errors={errors.direccion_referencia}
              >
                Dirección
              </Label>
              <div className="relative w-full">
                <Input
                  id="direccion_referencia"
                  name="direccion_referencia"
                  onChange={handleValidate}
                  errors={errors.direccion_referencia}
                />
                {errors.direccion_referencia && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.direccion_referencia && (
                <Span className="m-0">{errors.direccion_referencia}</Span>
              )}
            </div>
            <div>
              <Label
                htmlFor="telefono_referencia"
                errors={errors.telefono_referencia}
              >
                Teléfono
              </Label>
              <div className="relative w-full">
                <Input
                  id="telefono_referencia"
                  name="telefono_referencia"
                  type="tel"
                  maxLength="20"
                  onChange={handleValidate}
                  errors={errors.telefono_referencia}
                />
                {errors.telefono_referencia && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.telefono_referencia && (
                <Span className="m-0">{errors.telefono_referencia}</Span>
              )}
            </div>
            <div>
              <Label htmlFor="ocupacion" errors={errors.ocupacion}>
                Ocupación
              </Label>
              <div className="relative w-full">
                <Input
                  id="ocupacion"
                  name="ocupacion"
                  onChange={handleValidate}
                  errors={errors.ocupacion}
                />
                {errors.ocupacion && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.ocupacion && (
                <Span className="m-0">{errors.ocupacion}</Span>
              )}
            </div>
            {!errors.nombre_apellido_referencia &&
              !errors.direccion_referencia &&
              !errors.telefono_referencia &&
              !errors.ocupacion && (
                <div className="flex h-full items-end">
                  <Button
                    onClick={handleAddReferenciaPersonal}
                    className="m-0 w-full"
                  >
                    Agregar Referencia Personal
                  </Button>
                </div>
              )}
          </div>
        </div>

        <div className="mt-6">
          <div className="md:col-span-3 overflow-x-auto shadow-md rounded-lg mt-8">
            <table className="w-full mx-auto text-sm text-left rtl:text-right dark:text-gray-400">
              <thead className="text-xs uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-black">
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Nombres y Apellidos</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Dirección</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Teléfono</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Ocupación</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Acción</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {datosIngreso.referencias_personales.map((referencia, i) => (
                  <tr
                    key={i}
                    className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300"
                  >
                    <td className="p-4">{referencia.nombre_apellido}</td>
                    <td className="p-4">{referencia.direccion}</td>
                    <td className="p-4">{referencia.telefono}</td>
                    <td className="p-4">{referencia.ocupacion}</td>
                    <td className="p-4">
                      <span
                        className="font-medium text-red-600 hover:text-red-800 cursor-pointer"
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
        <div className="mt-6">
          <Title>Salud</Title>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 items-start mt-2">
            <div className="flex gap-2 justify-center items-center h-full">
              <CheckBox
                name="alergia_alimentos"
                id="alergia_alimentos"
                checked={datosIngreso.alergia_alimentos}
                onChange={handleChecked}
              />
              <Label className="select-none" htmlFor="alergia_alimentos">
                ¿Es alérgico a algún alimento?
              </Label>
            </div>
            <div className="flex gap-2 justify-center items-center h-full">
              <CheckBox
                name="alergia_medicamentos"
                id="alergia_medicamentos"
                checked={datosIngreso.alergia_medicamentos}
                onChange={handleChecked}
              />
              <Label className="select-none" htmlFor="alergia_medicamentos">
                ¿Es alérgico a algún medicamento?
              </Label>
            </div>
            <div className="flex gap-2 justify-center items-center h-full">
              <CheckBox
                name="alergia_otros"
                id="alergia_otros"
                checked={datosIngreso.alergia_otros}
                onChange={handleChecked}
              />
              <Label className="select-none" htmlFor="alergia_otros">
                ¿Es alérgico a alguna otra cosa?
              </Label>
            </div>
            <div className="flex gap-2 justify-center items-center h-full">
              <CheckBox
                name="fuma"
                id="fuma"
                checked={datosIngreso.fuma}
                onChange={handleChecked}
              />
              <Label className="select-none" htmlFor="fuma">
                ¿Fuma?
              </Label>
            </div>
            <div>
              <Label
                htmlFor="alergia_especifique"
                errors={errors.alergia_especifique}
              >
                Especifique sus alergias
              </Label>
              <div className="relative w-full">
                <Input
                  name="alergia_especifique"
                  id="alergia_especifique"
                  onChange={handleValidate}
                  errors={errors.alergia_especifique}
                />
                {errors.alergia_especifique && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.alergia_especifique && (
                <Span className="m-0">{errors.alergia_especifique}</Span>
              )}
            </div>
            <div>
              <Label
                htmlFor="cicatriz_especifique"
                errors={errors.cicatriz_especifique}
              >
                ¿Posee alguna cicatriz? Especifique
              </Label>
              <div className="relative w-full">
                <Input
                  name="cicatriz_especifique"
                  id="cicatriz_especifique"
                  onChange={handleValidate}
                  errors={errors.cicatriz_especifique}
                />
                {errors.cicatriz_especifique && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.cicatriz_especifique && (
                <Span className="m-0">{errors.cicatriz_especifique}</Span>
              )}
            </div>
          </div>
        </div>

        {/* Contacto de Emergencia */}
        <div className="mt-6">
          <Title>Contactos de Emergencia *</Title>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 items-start mt-2">
            <div>
              <Label
                htmlFor="nombre_apellido_contacto_emergencia"
                errors={errors.nombre_apellido_contacto_emergencia}
              >
                Nombre y apellido
              </Label>
              <div className="relative w-full">
                <Input
                  id="nombre_apellido_contacto_emergencia"
                  name="nombre_apellido_contacto_emergencia"
                  onChange={handleValidate}
                  errors={errors.nombre_apellido_contacto_emergencia}
                />
                {errors.nombre_apellido_contacto_emergencia && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.nombre_apellido_contacto_emergencia && (
                <Span className="m-0">
                  {errors.nombre_apellido_contacto_emergencia}
                </Span>
              )}
            </div>
            <div>
              <Label htmlFor="parentesco_contacto_emergencia">Parentesco</Label>
              <Select id="parentesco_contacto_emergencia" name="parentesco">
                <option value="Abuelo(a)">Abuelo(a)</option>
                <option value="Amigo(a)">Amigo(a)</option>
                <option value="Conyuge">Conyuge</option>
                <option value="Cuñado(a)">Cuñado(a)</option>
                <option value="Hermano(a)">Hermano(a)</option>
                <option value="Hijo(a)">Hijo(a)</option>
                <option value="Madre">Madre</option>
                <option value="Nieto(a)">Nieto(a)</option>
                <option value="Padre">Padre</option>
                <option value="Primo(a)">Primo(a)</option>
                <option value="Sobrino(a)">Sobrino(a)</option>
                <option value="Suegro(a)">Suegro(a)</option>
                <option value="Tío(a)">Tío(a)</option>
                <option value="Vecino(a)">Vecino(a)</option>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="telefono_contacto_emergencia"
                errors={errors.telefono_contacto_emergencia}
              >
                Teléfono
              </Label>
              <div className="relative w-full">
                <Input
                  id="telefono_contacto_emergencia"
                  name="telefono_contacto_emergencia"
                  type="tel"
                  maxLength="20"
                  onChange={handleValidate}
                  errors={errors.telefono_contacto_emergencia}
                />
                {errors.telefono_contacto_emergencia && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.telefono_contacto_emergencia && (
                <Span className="m-0">
                  {errors.telefono_contacto_emergencia}
                </Span>
              )}
            </div>
            <div>
              <Label
                htmlFor="direccion_contacto_emergencia"
                errors={errors.direccion_contacto_emergencia}
              >
                Dirección
              </Label>
              <div className="relative w-full">
                <Input
                  id="direccion_contacto_emergencia"
                  name="direccion_contacto_emergencia"
                  onChange={handleValidate}
                  errors={errors.direccion_contacto_emergencia}
                />
                {errors.direccion_contacto_emergencia && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.direccion_contacto_emergencia && (
                <Span className="m-0">
                  {errors.direccion_contacto_emergencia}
                </Span>
              )}
            </div>
            {!errors.nombre_apellido_contacto_emergencia &&
              !errors.telefono_contacto_emergencia &&
              !errors.direccion_contacto_emergencia && (
                <div className="flex h-full items-end">
                  <Button
                    onClick={handleAddContactoEmergencia}
                    className="m-0 w-full"
                  >
                    Agregar Contacto Emergencia
                  </Button>
                </div>
              )}
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
                    <div className="flex items-center">Teléfono</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Dirección</div>
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
                    className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300"
                  >
                    <td className="p-4">{contacto.nombre_apellido}</td>
                    <td className="p-4">{contacto.parentesco}</td>
                    <td className="p-4">{contacto.telefono}</td>
                    <td className="p-4">{contacto.direccion}</td>
                    <td className="p-4">
                      <span
                        className="font-medium text-red-600 hover:text-red-800 cursor-pointer"
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
        <div className="mt-6">
          <Title>Datos Bancarios</Title>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 items-start mt-2">
            <div>
              <Label htmlFor="titular_cuenta">Titular de la cuenta</Label>
              <Select
                id="titular_cuenta"
                name="titular_cuenta"
                value={datosIngreso.titular_cuenta}
                onChange={handleValidate}
              >
                <option value="Propia">Propia</option>
                <option value="Tercero">Tercero</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="entidad_bancaria">Entidad bancaria</Label>
              <Select
                id="entidad_bancaria"
                name="entidad_bancaria"
                value={datosIngreso.entidad_bancaria}
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
              <Label htmlFor="numero_cuenta" errors={errors.numero_cuenta}>
                Número de cuenta *
              </Label>
              <div className="relative w-full">
                <Input
                  id="numero_cuenta"
                  name="numero_cuenta"
                  type="tel"
                  maxLength="20"
                  onChange={handleValidate}
                  errors={errors.numero_cuenta}
                />
                {errors.numero_cuenta && (
                  <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                )}
              </div>
              {errors.numero_cuenta && (
                <Span className="m-0">{errors.numero_cuenta}</Span>
              )}
            </div>
            <div>
              <Label htmlFor="tipo_cuenta">Tipo de Cuenta</Label>
              <Select
                id="tipo_cuenta"
                name="tipo_cuenta"
                value={datosIngreso.tipo_cuenta}
                onChange={handleValidate}
              >
                <option value="Ahorro">Ahorro</option>
                <option value="Corriente">Corriente</option>
              </Select>
            </div>

            {datosIngreso.titular_cuenta === "Tercero" && (
              <>
                <div>
                  <Label
                    htmlFor="numero_identificacion_tercero"
                    errors={errors.numero_identificacion_tercero}
                  >
                    Número de identificación del titular *
                  </Label>
                  <div className="flex justify-between gap-2">
                    <Select
                      className="w-auto"
                      name="tipo_identificacion_tercero"
                      value={datosIngreso.tipo_identificacion_tercero || "V"}
                      onChange={handleValidate}
                    >
                      <option value="V">V</option>
                      <option value="E">E</option>
                    </Select>
                    <div className="relative w-full">
                      <Input
                        id="numero_identificacion_tercero"
                        name="numero_identificacion_tercero"
                        onChange={handleValidate}
                        errors={errors.numero_identificacion_tercero}
                        maxLength="20"
                      />
                      {errors.numero_identificacion_tercero && (
                        <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                      )}
                    </div>
                  </div>
                  {errors.numero_identificacion_tercero && (
                    <Span className="m-0">
                      {errors.numero_identificacion_tercero}
                    </Span>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="nombre_apellido_tercero"
                    errors={errors.nombre_apellido_tercero}
                  >
                    Nombre y apellido del titular *
                  </Label>
                  <div className="relative w-full">
                    <Input
                      id="nombre_apellido_tercero"
                      name="nombre_apellido_tercero"
                      onChange={handleValidate}
                      errors={errors.nombre_apellido_tercero}
                    />
                    {errors.nombre_apellido_tercero && (
                      <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                    )}
                  </div>
                  {errors.nombre_apellido_tercero && (
                    <Span className="m-0">
                      {errors.nombre_apellido_tercero}
                    </Span>
                  )}
                </div>
                <div>
                  <Label htmlFor="parentesco_tercero">Parentesco</Label>
                  <Select
                    id="parentesco_tercero"
                    name="parentesco_tercero"
                    value={datosIngreso.parentesco_tercero}
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
              </>
            )}
          </div>
        </div>

        {/* ESPACIO PARA EL DEPARTAMENTO DE TALENTO HUMANO */}

        <div className="mt-6">
          <Title>Espacio para el departamento de talento humano</Title>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 items-start mt-2">
            <div>
              <Label htmlFor="empresa_id">Empresa *</Label>

              {empleado.Role.nombre !== "Admin Global" ? (
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
                  id="empresa_id"
                  name="empresa_id"
                  defaultValue="Seleccione"
                  onChange={handleValidate}
                >
                  <option>Seleccione</option>
                  {empresasActivas?.length
                    ? empresasActivas?.map(
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
              <Label htmlFor="departamento_id">Departamento *</Label>
              <Select
                id="departamento_id"
                name="departamento_id"
                defaultValue="Seleccione"
                onChange={handleValidate}
              >
                <option>Seleccione</option>
                {departamentosActivos?.length
                  ? departamentosActivos?.map(
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
              <Label htmlFor="cargo_id">Cargo *</Label>
              <Select
                id="cargo_id"
                name="cargo_id"
                defaultValue="Seleccione"
                onChange={handleValidate}
              >
                <option>Seleccione</option>
                {cargosActivos?.length
                  ? cargosActivos?.map(
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
              <Label htmlFor="cargo_nivel_id">Nivel del cargo *</Label>
              <Select
                id="cargo_nivel_id"
                name="cargo_nivel_id"
                defaultValue="Seleccione"
                onChange={handleValidate}
              >
                <option>Seleccione</option>
                {cargosNivelesActivos?.length
                  ? cargosNivelesActivos?.map(
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
              <Label htmlFor="salario" errors={errors.salario}>
                Salario *
              </Label>
              <div className="relative w-full">
                <Input
                  id="salario"
                  name="salario"
                  onChange={handleValidate}
                  errors={errors.salario}
                  onBlur={handleConvertirADecimales}
                  value={datosIngreso.salario}
                  type="number"
                  min="1"
                  className={`${!showSalario && "text-transparent"}`}
                />

                {!showSalario ? (
                  <BiSolidShow
                    className="absolute right-6 top-[30%] text-xl"
                    onClick={() => setShowSalario(!showSalario)}
                  />
                ) : (
                  <BiSolidHide
                    className="absolute right-6 top-[30%] text-xl"
                    onClick={() => setShowSalario(!showSalario)}
                  />
                )}
              </div>
              {errors.salario && <Span className="m-0">{errors.salario}</Span>}
            </div>
            <div>
              <Label htmlFor="fecha_ingreso">Fecha de ingreso *</Label>
              <Date
                id="fecha_ingreso"
                name="fecha_ingreso"
                value={datosIngreso.fecha_ingreso}
                onChange={handleValidate}
              />
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-3">
              <Label htmlFor="observaciones" errors={errors.observaciones}>
                Observaciones
              </Label>
              <TextArea
                id="observaciones"
                name="observaciones"
                type="textarea"
                rows="3"
                onChange={handleValidate}
                errors={errors.observaciones}
              />
              {errors.observaciones && (
                <Span className="m-0">{errors.observaciones}</Span>
              )}
            </div>

            {/* <div className="col-span-1 sm:col-span-2 md:col-span-3">
              <Span>Foto empleado</Span>
              <div className="flex flex-col items-center gap-2">
                {imagenEmpleado ? (
                  <>
                    <img
                      src={imagenEmpleado}
                      alt="Imagen Del Empleado"
                      className="sm:w-2/4 md:w-1/4"
                    />
                    <Button
                      className="m-0 w-auto text-xs bg-red-600 hover:bg-red-600/[.5]"
                      onClick={() => setImagenEmpleado(null)}
                    >
                      Volver a tomar
                    </Button>
                    <Button
                      className="m-0 w-auto text-xs bg-red-600 hover:bg-red-600/[.5]"
                      onClick={descargarImagen}
                    >
                      Descargar
                    </Button>
                  </>
                ) : (
                  <>
                    <Webcam
                      className="sm:w-2/4 md:w-1/4 flex flex-col"
                      audio={false}
                      screenshotFormat="image/png"
                      ref={webCamRef}
                      videoConstraints={{
                        facingMode: facingMode,
                      }}
                    />

                    <div className="flex gap-2">
                      <Button
                        className="m-0 w-auto flex items-center justify-center gap-2"
                        onClick={cambiarCamara}
                      >
                        <IoCameraReverseOutline />
                        <>Cambiar cámara</>
                      </Button>
                      <Button
                        className="m-0 w-auto bg-green-600 hover:bg-green-600/[.5] flex items-center justify-center gap-2"
                        onClick={tomarFoto}
                      >
                        <IoCameraOutline />
                        <>Tomar foto</>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div> */}
          </div>
        </div>
        <div className="mt-2 flex justify-center">
          <Button
            disabled={Object.keys(errors).length}
            className={`w-auto flex items-center justify-center gap-2 ${
              Object.keys(errors).length && "opacity-50"
            }`}
            onClick={handleSaveFicha}
          >
            <FaFloppyDisk />
            <>Guardar</>
          </Button>
        </div>
      </div>
    </div>
  );
}
