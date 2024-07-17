const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Empleado", {
    empleado_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    rol_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: false,
    },
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tipo_identificacion: {
      type: DataTypes.ENUM("E", "V"),
      allowNull: true,
    },
    numero_identificacion: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    clave: {
      type: DataTypes.STRING,
      defaultValue:
        "$2b$10$Clo.xXD2ozw5Dgch5aMM9u5ddkZf1ETN4CNNlzbTDPHcVg90lOXU.",
    },
    estado_civil: {
      type: DataTypes.ENUM(
        "Soltero(a)",
        "Casado(a)",
        "Viudo(a)",
        "Divorciado(a)",
        "Concubino"
      ),
      allowNull: true,
    },
    rif: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    correo: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    etnia_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: true,
    },
    mano_dominante: {
      type: DataTypes.ENUM("Izquierdo", "Derecho"),
      allowNull: true,
    },
    sexo: {
      type: DataTypes.ENUM("Masculino", "Femenino"),
      allowNull: true,
    },
    factor_grupo_sanguineo: {
      type: DataTypes.ENUM("A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"),
      allowNull: true,
    },
    cantidad_hijos: {
      type: DataTypes.INTEGER(2),
      defaultValue: 0,
    },
    carga_familiar: {
      type: DataTypes.INTEGER(2),
      defaultValue: 0,
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    nacimiento_ciudad_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: true,
    },
    nacimiento_estado_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: true,
    },
    nacimiento_pais_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: true,
    },
    calle_avenida: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    parroquia_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: true,
    },
    municipio_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: true,
    },
    tipo_vivienda: {
      type: DataTypes.ENUM("Casa", "Edificio"),
      allowNull: true,
    },
    numero_casa: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    piso: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
    },
    apartamento: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    urbanizacion_sector: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    estado_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: true,
    },
    pais_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: true,
    },
    licencia_conducir: {
      type: DataTypes.ENUM("Si", "No"),
      allowNull: true,
    },
    licencia_grado: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
    },
    licencia_vencimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    carta_medica: {
      type: DataTypes.ENUM("Si", "No"),
      allowNull: true,
    },
    carta_medica_vencimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    talla_camisa: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    talla_pantalon: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    talla_calzado: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    trabajo_anteriormente: {
      type: DataTypes.ENUM("Si", "No"),
      allowNull: true,
    },
    trabajo_especifique: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    motivo_retiro: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    posee_parientes_empresa: {
      type: DataTypes.ENUM("Si", "No"),
      allowNull: true,
    },
    foto_perfil_nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    foto_perfil_ruta: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
