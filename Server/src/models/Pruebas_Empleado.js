const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Pruebas_Empleado",
    {
      prueba_id: {
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
      prueba: {
        type: DataTypes.ENUM("Kostick"),
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ruta: {
        type: DataTypes.STRING,
        allowNull: true,
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
          name: "ruta",
          fields: ["ruta"],
        },
      ],
    }
  );
};
