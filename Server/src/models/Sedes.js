const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Sedes", {
    sede_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    empresa_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM("Casa", "Edificio", "Finca", "Procesadora"),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitud: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    longitud: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
