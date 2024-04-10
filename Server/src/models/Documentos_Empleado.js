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
        "Foto Carnet",
        "Cedula",
        "RIF",
        "Curriculo",
        "Titulo Bachiller",
        "Titulo Universitario",
        "Otros Estudios",
        "Referencia Personal",
        "Soporte Cuenta Bancaria"
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
