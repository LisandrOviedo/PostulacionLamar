const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Areas_Interes", {
    area_interes_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    inactivo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
