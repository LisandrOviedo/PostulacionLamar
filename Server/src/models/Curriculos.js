const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Curriculos", {
    curriculo_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    empleado_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: false,
    },
    disponibilidad_viajar: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    disponibilidad_cambio_residencia: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    habilidades_tecnicas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("Pendiente por revisar", "Revisado"),
      defaultValue: "Pendiente por revisar",
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
