const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Curriculos", {
    curriculo_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    empleado_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    disponibilidad_viajar: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    disponibilidad_cambio_residencia: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    habilidades_tecnicas: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    revisado_por_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
