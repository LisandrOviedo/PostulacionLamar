const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Direcciones", {
    direccion_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    empleado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    calle_avenida: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    parroquia_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    municipio_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
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
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
