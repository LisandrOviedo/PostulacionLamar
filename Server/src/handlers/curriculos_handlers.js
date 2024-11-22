const {
  todosLosCurriculos,
  traerCurriculo,
  traerCurriculoPDF,
  traerCurriculoPDFAnexos,
  cambiarEstadoRevisado,
  traerCurriculoEmpleado,
  modificarCurriculo,
  inactivarCurriculo,
} = require("../controllers/curriculos_controllers");

const {
  crearCurriculoPDF,
} = require("../controllers/documentos_empleados_controllers");

const { crearCarpetaSiNoExiste } = require("../utils/pruebaKostick");

const path = require("node:path");
const fs = require("node:fs");

const puppeteer = require("puppeteer");
const { reporteCurriculoPDF } = require("../utils/reportes.js");

const JSZip = require("jszip");

const getCurriculos = async (req, res) => {
  const { filtros, paginaActual, limitePorPagina } = req.body;

  try {
    const response = await todosLosCurriculos(
      filtros,
      paginaActual,
      limitePorPagina
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCurriculo = async (req, res) => {
  const { curriculo_id } = req.body;

  try {
    const response = await traerCurriculo(curriculo_id);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCurriculoPDF = async (req, res) => {
  const { empleado_id, identificacion } = req.body;
  const filename = "Perfil Profesional.pdf";

  try {
    // Genera el contenido del PDF
    const content = await traerCurriculoPDF(empleado_id);

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

    await page.setContent(reporteCurriculoPDF(content), {
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

    await crearCurriculoPDF(empleado_id, filename, pdf_path);

    return res.status(201).json(filename);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCurriculoPDFAnexos = async (req, res) => {
  const { empleado_id, identificacion } = req.body;
  const filename = `Anexos ${identificacion}.zip`;

  try {
    const anexos = await traerCurriculoPDFAnexos(empleado_id);

    const zip = new JSZip();

    const carpetaDestino = path.join(
      __dirname,
      `../../public/documentosEmpleados/${identificacion}/`
    );

    crearCarpetaSiNoExiste(carpetaDestino);

    anexos.forEach((anexo) => {
      const fileData = fs.readFileSync(anexo);
      const nombreArchivo = path.basename(anexo);
      zip.file(nombreArchivo, fileData);
    });

    // Generar el archivo ZIP
    const content = await zip.generateAsync({ type: "nodebuffer" });

    // Ruta completa del archivo ZIP
    const rutaArchivoZip = path.join(carpetaDestino, filename);

    // Guardar el archivo ZIP en la carpeta específica
    fs.writeFileSync(rutaArchivoZip, content);

    return res.send("Archivo ZIP generado y guardado correctamente.");
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

const putCurriculo = async (req, res) => {
  const {
    empleado_id,
    curriculo_id,
    disponibilidad_viajar,
    disponibilidad_cambio_residencia,
    habilidades_tecnicas,
  } = req.body;

  try {
    const response = await modificarCurriculo(
      empleado_id,
      curriculo_id,
      disponibilidad_viajar,
      disponibilidad_cambio_residencia,
      habilidades_tecnicas
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putCurriculoEstado = async (req, res) => {
  const { empleado_id, revisado_por_id } = req.body;

  try {
    const response = await cambiarEstadoRevisado(empleado_id, revisado_por_id);

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
  getCurriculoPDF,
  getCurriculoPDFAnexos,
  getCurriculoEmpleado,
  putCurriculo,
  putCurriculoEstado,
  deleteCurriculo,
};
