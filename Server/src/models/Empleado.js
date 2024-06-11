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
    cedula: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    clave: {
      type: DataTypes.STRING,
      defaultValue:
        "$2b$10$Clo.xXD2ozw5Dgch5aMM9u5ddkZf1ETN4CNNlzbTDPHcVg90lOXU.",
    },
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    genero: {
      type: DataTypes.ENUM("Masculino", "Femenino"),
      allowNull: true,
    },
    etnia_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: true,
    },
    codigo_telefono: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    correo: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    cantidad_hijos: {
      type: DataTypes.INTEGER(2),
      defaultValue: 0,
    },
    foto_perfil_nombre: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    foto_perfil_ruta: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
