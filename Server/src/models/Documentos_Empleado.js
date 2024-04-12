const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Documentos_Empleado", {
    documento_empleado_id: {
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
    tipo_documento: {
      type: DataTypes.ENUM(
        "foto_carnet",
        "foto_cedula",
        "rif",
        "resumen_curricular",
        "titulo_bachiller",
        "titulos_universitarios",
        "otros_estudios",
        "referencia_personal",
        "cuenta_bancaria"
      ),
      allowNull: false,
    },
    ruta_documento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};