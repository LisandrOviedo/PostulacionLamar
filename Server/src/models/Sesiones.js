const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Sesiones",
    {
      sesion_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      empleado_id: {
        // Campo relacionado
        type: DataTypes.UUID,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          name: "empleado_id",
          fields: ["empleado_id"],
        },
        {
          unique: true,
          name: "token",
          fields: ["token"],
        },
      ],
    }
  );
};
