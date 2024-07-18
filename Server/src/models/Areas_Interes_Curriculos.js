const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Areas_Interes_Curriculos", {
    area_interes_curriculo_id: {
      type: DataTypes.UUID,
      primaryKey: true,
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
