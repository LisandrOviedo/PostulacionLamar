const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Curriculo", {
    curriculo_id: {
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
    grado_instruccion: {
      type: DataTypes.ENUM(
        "Basico",
        "Bachiller",
        "Tecnico Medio",
        "Tecnico Medio Superior",
        "Universitario"
      ),
      defaultValue: "Basico",
    },
    disponibilidad_viajar: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    disponibilidad_cambio_residencia: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    nombre_pdf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ruta_pdf: {
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
