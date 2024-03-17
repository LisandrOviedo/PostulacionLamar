const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Curriculo", {
    curriculo_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
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
    titulo_obtenido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    area_interes_otro: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ruta_pdf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM(
        "Pendiente por revisar",
        "En revision",
        "Rechazado con replica",
        "Rechazado",
        "Pendiente por entrevista",
        "Aceptado",
        "Almacenado"
      ),
      defaultValue: "Pendiente por revisar",
    },
    inactivo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
