const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Experiencia", {
    experiencia_id: {
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
    tipo: {
      type: DataTypes.ENUM("Laboral", "Curso"),
      defaultValue: "Laboral",
    },
    cargo_titulo_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: false,
    },
    cargo_titulo_otro: {
      type: DataTypes.STRING,
      allowNull: true,
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
    empresa_centro_educativo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
