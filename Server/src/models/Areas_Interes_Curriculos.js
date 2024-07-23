const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Areas_Interes_Curriculos", {
    area_interes_curriculo_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    curriculo_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    area_interes_id: {
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
