const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Experiencia", {
    experiencia_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    empleado_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM("Laboral", "Curso"),
      allowNull: false,
    },
    empresa_centro_educativo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cargo_titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duracion: {
      type: DataTypes.ENUM(
        "Menos de 1 año",
        "1-2 años",
        "3-4 años",
        "5 años o más"
      ),
      defaultValue: "Menos de 1 año",
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
