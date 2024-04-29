const {
  todosLosCurriculos,
  traerCurriculo,
  traerCurriculoEmpleado,
  crearCurriculo,
  modificarCurriculo,
  inactivarCurriculo,
} = require("../controllers/curriculos_controllers");

const PDFDocument = require("pdfkit");

const getCurriculos = async (req, res) => {
  const { filtros, paginaActual, limitePorPagina } = req.body;

  try {
    const response = await todosLosCurriculos(
      filtros,
      parseInt(paginaActual),
      parseInt(limitePorPagina)
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCurriculo = async (req, res) => {
  try {
    const doc = new PDFDocument();

    // Establecer el nombre del archivo para la descarga
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="documento.pdf"'
    );

    // Pipe el PDF generado hacia la respuesta HTTP
    doc.pipe(res);

    // Agregar contenido al PDF
    doc
      .font("Helvetica-Bold")
      .fontSize(24)
      .text("¡Hola, Mundo!", { align: "center" });

    // Finalizar el PDF y enviar la respuesta
    doc.end();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCurriculoEmpleado = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await traerCurriculoEmpleado(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postCurriculo = async (req, res) => {
  const {
    empleado_id,
    grado_instruccion,
    disponibilidad_viajar,
    disponibilidad_cambio_residencia,
    cantidad_hijos,
    habilidades_tecnicas,
  } = req.body;

  try {
    const response = await crearCurriculo(
      empleado_id,
      grado_instruccion,
      disponibilidad_viajar,
      disponibilidad_cambio_residencia,
      cantidad_hijos,
      habilidades_tecnicas
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putCurriculo = async (req, res) => {
  const {
    curriculo_id,
    grado_instruccion,
    disponibilidad_viajar,
    disponibilidad_cambio_residencia,
    cantidad_hijos,
    habilidades_tecnicas,
  } = req.body;

  try {
    const response = await modificarCurriculo(
      curriculo_id,
      grado_instruccion,
      disponibilidad_viajar,
      disponibilidad_cambio_residencia,
      cantidad_hijos,
      habilidades_tecnicas
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteCurriculo = async (req, res) => {
  const { curriculo_id } = req.body;

  try {
    const response = await inactivarCurriculo(curriculo_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCurriculos,
  getCurriculo,
  getCurriculoEmpleado,
  postCurriculo,
  putCurriculo,
  deleteCurriculo,
};
