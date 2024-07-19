const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Documentos_Empleados", {
    documento_empleado_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    empleado_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
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
