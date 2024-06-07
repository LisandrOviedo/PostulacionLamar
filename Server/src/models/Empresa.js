const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Empresa",
    {
      empresa_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      codigo_empresa: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      rif: {
        type: DataTypes.STRING(12),
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
          name: "codigo_empresa",
          fields: ["codigo_empresa"],
        },
        {
          unique: true,
          name: "nombre",
          fields: ["nombre"],
        },
        {
          unique: true,
          name: "rif",
          fields: ["rif"],
        },
      ],
    }
  );
};
