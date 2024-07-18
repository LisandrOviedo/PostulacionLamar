const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Direcciones", {
    direccion_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    empleado_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    calle_avenida: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    parroquia_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: true,
    },
    municipio_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: true,
    },
    tipo_vivienda: {
      type: DataTypes.ENUM("Casa", "Edificio"),
      allowNull: true,
    },
    numero_casa: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    piso: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
    },
    apartamento: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    urbanizacion_sector: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    estado_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: true,
    },
    pais_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
