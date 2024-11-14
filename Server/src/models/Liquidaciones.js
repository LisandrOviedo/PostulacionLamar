const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Liquidaciones", {
    liquidacion_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    empleado_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cargo_empleado_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_egreso: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    motivo_retiro: {
      type: DataTypes.ENUM("Abandono", "Despido", "Renuncia"),
      allowNull: false,
    },
    causa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ssst: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    anticipos_prestamos: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
    },
    vacaciones_vencidas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dias_cesta_ticket: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    poliza_hcm: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
    },
    bonificacion: {
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
