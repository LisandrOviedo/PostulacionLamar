const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Movimientos", {
    movimiento_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    empleado_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clase_movimiento_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duracion_movimiento: {
      type: DataTypes.ENUM("Permanente", "Temporal"),
      allowNull: false,
    },
    duracion_movimiento_dias: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
    },
    requiere_periodo_prueba: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    duracion_periodo_prueba: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
    },
    justificacion_movimiento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cargo_nivel_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vigencia_movimiento_desde: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    vigencia_movimiento_hasta: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    tipo_nomina: {
      type: DataTypes.ENUM("Empleados", "Obreros", "Otro"),
      allowNull: false,
    },
    otro_tipo_nomina: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    frecuencia_nomina: {
      type: DataTypes.ENUM("Semanal", "Quincenal", "Otro"),
      allowNull: false,
    },
    otra_frecuencia_nomina: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sueldo: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
    },
    codigo_nomina: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    solicitante_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    supervisor_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gerencia_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tthh_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado_solicitud: {
      type: DataTypes.ENUM("Pendiente por revisar", "Aprobada", "Denegada"),
      defaultValue: "Pendiente por revisar",
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
