const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Experiencias", {
    experiencia_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    fecha_desde: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fecha_hasta: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
