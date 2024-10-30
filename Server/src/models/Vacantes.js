const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Vacantes", {
    vacante_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    area_interes_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creado_por_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
