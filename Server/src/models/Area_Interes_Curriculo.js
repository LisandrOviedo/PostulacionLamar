const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Area_Interes_Curriculo", {
    area_interes_curriculo_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    curriculo_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: false,
    },
    area_interes_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
