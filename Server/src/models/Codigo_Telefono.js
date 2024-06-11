const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Codigo_Telefono",
    {
      codigo_telefono_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      codigo: {
        type: DataTypes.STRING(7),
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
          name: "codigo",
          fields: ["codigo"],
        },
      ],
    }
  );
};
