const {
  todosLosMovimientos,
  traerMovimiento,
  traerMovimientoPDF,
  crearMovimiento,
  modificarMovimiento,
  aprobarMovimiento,
  denegarMovimiento,
  inactivarMovimiento,
} = require("../controllers/movimientos_controllers");

const { reporteMovimiento } = require("../utils/reportes");

const { crearCarpetaSiNoExiste } = require("../utils/pruebaKostick");

const path = require("node:path");

const puppeteer = require("puppeteer");

const getMovimientos = async (req, res) => {
  const { filtros, paginaActual, limitePorPagina } = req.body;

  try {
    const response = await todosLosMovimientos(
      filtros,
      paginaActual,
      limitePorPagina
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getMovimiento = async (req, res) => {
  const { movimiento_id, empleado_id } = req.query;

  try {
    const response = await traerMovimiento(movimiento_id, empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getMovimientoPDF = async (req, res) => {
  const { movimiento_id, empleado_id, identificacion } = req.body;
  const filename = `Movimiento ${movimiento_id}.pdf`;

  try {
    // Genera el contenido del PDF
    const content = await traerMovimientoPDF(movimiento_id, empleado_id);

    const dest_path = path.join(
      __dirname,
      `../../public/documentosEmpleados/${identificacion}`
    );

    crearCarpetaSiNoExiste(dest_path);

    const pdf_path = path.join(
      __dirname,
      `../../public/documentosEmpleados/${identificacion}/${filename}`
    );

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setContent(reporteMovimiento(content), {
      waitUntil: "domcontentloaded",
    });

    await page.pdf({
      format: "A4",
      path: pdf_path,
      printBackground: true,
      margin: {
        top: "30px",
        right: "50px",
        bottom: "30px",
        left: "50px",
      },
      displayHeaderFooter: true,
      footerTemplate:
        '<div style="text-align: right; width: 297mm; font-size: 10px;"><span style="margin-right: 1cm;"><span class="pageNumber"></span> de <span class="totalPages"></span></span></div>',
    });

    await browser.close();

    return res.status(201).json(filename);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postMovimiento = async (req, res) => {
  const {
    empleado_id,
    cargo_empleado_id,
    clase_movimiento_id,
    duracion_movimiento,
    duracion_movimiento_dias,
    requiere_periodo_prueba,
    duracion_periodo_prueba,
    justificacion_movimiento,
    empresa_id,
    cargo_nivel_id,
    vigencia_movimiento_desde,
    vigencia_movimiento_hasta,
    tipo_nomina,
    otro_tipo_nomina,
    frecuencia_nomina,
    otra_frecuencia_nomina,
    sueldo,
    codigo_nomina,
    solicitante_id,
    supervisor_id,
    gerencia_id,
    tthh_id,
  } = req.body;

  try {
    const response = await crearMovimiento(
      empleado_id,
      cargo_empleado_id,
      clase_movimiento_id,
      duracion_movimiento,
      duracion_movimiento_dias,
      requiere_periodo_prueba,
      duracion_periodo_prueba,
      justificacion_movimiento,
      empresa_id,
      cargo_nivel_id,
      vigencia_movimiento_desde,
      vigencia_movimiento_hasta,
      tipo_nomina,
      otro_tipo_nomina,
      frecuencia_nomina,
      otra_frecuencia_nomina,
      sueldo,
      codigo_nomina,
      solicitante_id,
      supervisor_id,
      gerencia_id,
      tthh_id
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putMovimiento = async (req, res) => {
  const {
    movimiento_id,
    clase_movimiento_id,
    duracion_movimiento,
    duracion_movimiento_dias,
    requiere_periodo_prueba,
    duracion_periodo_prueba,
    justificacion_movimiento,
    empresa_id,
    cargo_nivel_id,
    vigencia_movimiento_desde,
    vigencia_movimiento_hasta,
    tipo_nomina,
    otro_tipo_nomina,
    frecuencia_nomina,
    otra_frecuencia_nomina,
    sueldo,
    codigo_nomina,
    solicitante_id,
    supervisor_id,
    gerencia_id,
    tthh_id,
  } = req.body;

  try {
    const response = await modificarMovimiento(
      movimiento_id,
      clase_movimiento_id,
      duracion_movimiento,
      duracion_movimiento_dias,
      requiere_periodo_prueba,
      duracion_periodo_prueba,
      justificacion_movimiento,
      empresa_id,
      cargo_nivel_id,
      vigencia_movimiento_desde,
      vigencia_movimiento_hasta,
      tipo_nomina,
      otro_tipo_nomina,
      frecuencia_nomina,
      otra_frecuencia_nomina,
      sueldo,
      codigo_nomina,
      solicitante_id,
      supervisor_id,
      gerencia_id,
      tthh_id
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putAprobarMovimiento = async (req, res) => {
  const { movimiento_id, revisado_por_id, observaciones } = req.body;

  try {
    const response = await aprobarMovimiento(
      movimiento_id,
      revisado_por_id,
      observaciones
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putDenegarMovimiento = async (req, res) => {
  const { movimiento_id, revisado_por_id, observaciones } = req.body;

  try {
    const response = await denegarMovimiento(
      movimiento_id,
      revisado_por_id,
      observaciones
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteMovimiento = async (req, res) => {
  const { movimiento_id } = req.body;

  try {
    const response = await inactivarMovimiento(movimiento_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getMovimientos,
  getMovimiento,
  getMovimientoPDF,
  postMovimiento,
  putMovimiento,
  putAprobarMovimiento,
  putDenegarMovimiento,
  deleteMovimiento,
};
