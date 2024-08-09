const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Areas_Interes", {
    area_interes_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
