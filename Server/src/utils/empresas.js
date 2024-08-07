/**
 * <b>Empresas faltantes en la API</b>
 * @module "src/utils/empresas.js"
 */

/**
 * <b>Lista de empresas</b>
 * @type {Array<{codigo_empresa: string, descripcion_empresa: string, direccion_empresa: string, rif: string}>}
 */
const empresas_faltantes = [
  {
    codigo_empresa: "106",
    descripcion_empresa: "Corporativo",
    direccion_empresa: "AV.5 SAN FRANCISCO SECTOR EL B AJO, FRENTE A  LA CRUZ",
    rif_empresa: "J-30711765-6",
  },
  // {
  //   descripcion_empresa: "Motores Lago",
  // },
];

module.exports = {
  empresas_faltantes,
};
