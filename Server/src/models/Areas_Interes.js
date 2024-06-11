const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Areas_Interes",
    {
      area_interes_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          name: "nombre",
          fields: ["nombre"],
        },
      ],
    }
  );
};
