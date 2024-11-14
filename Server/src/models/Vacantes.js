const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Vacantes", {
    vacante_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departamento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nivel_educativo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    anos_experiencia: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    area_interes_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creado_por_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
