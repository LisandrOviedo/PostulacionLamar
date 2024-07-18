const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Documentos_Empleados", {
    documento_empleado_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    empleado_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM(
        "perfil_pdf",
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
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ruta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
