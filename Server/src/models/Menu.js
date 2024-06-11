const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Menu",
    {
      menu_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      padre_id: {
        // Campo relacionado
        type: DataTypes.UUID,
        allowNull: true,
      },
      titulo: {
        // Campo relacionado
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      ruta: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      orden: {
        type: DataTypes.INTEGER(2),
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
          name: "ruta",
          fields: ["ruta"],
        },
      ],
    }
  );
};
