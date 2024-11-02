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
const PDFDocument = require("pdfkit-table");
const fs = require("node:fs");
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
    const doc = new PDFDocument({
      bufferPages: true,
      font: "Helvetica",
    });

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

    doc.pipe(fs.createWriteStream(pdf_path));

    const logoPath = path.join(__dirname, `../../public/LogoAzul.png`);
    doc.image(logoPath, 55, 35, { width: 80 });

    doc.moveDown(2);
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("Perfil Profesional", { align: "center" });
    doc.moveDown();

    doc.on("pageAdded", () => {
      doc.fillColor("black");
      doc.image(logoPath, 55, 35, { width: 80 });
      doc.moveDown(2);
      doc.moveDown();
    });

    for (const seccion of content) {
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text(seccion.titulo, { underline: true });
      doc.moveDown();

      for (const campo of seccion.contenido) {
        if (campo.titulo_campo === "Experiencias") {
          if (!campo.descripcion_campo.length) {
            doc
              .fontSize(11)
              .font("Helvetica")
              .text("No tiene experencia previa", { indent: 20 });
          } else {
            (async function createTable() {
              const table = {
                headers: [
                  "Tipo",
                  "Cargo / Título",
                  "Desde",
                  "Hasta",
                  "Empresa / Centro Educativo",
                ],
                rows: [],
              };
              for (const experiencia of campo.descripcion_campo) {
                const row = [
                  experiencia.tipo,
                  experiencia.cargo_titulo,
                  experiencia.fecha_desde,
                  experiencia.fecha_hasta,
                  experiencia.empresa_centro_educativo,
                ];
                table.rows.push(row);
              }
              await doc.table(table, {
                columnsSize: [50, 130, 70, 70, 160],
                prepareHeader: () => doc.fontSize(11).font("Helvetica-Bold"),
                prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                  doc.fontSize(10).font("Helvetica");
                },
              });
            })();
          }
        } else if (campo.titulo_campo === "Títulos Obtenidos") {
          if (!campo.descripcion_campo.length) {
            doc
              .fontSize(11)
              .font("Helvetica")
              .text("No tiene títulos", { indent: 20 });
          } else {
            (async function createTable2() {
              const table = {
                headers: [
                  "Grado Instrucción",
                  "Desde",
                  "Hasta",
                  "Nombre Instituto",
                  "Título Obtenido",
                ],
                rows: [],
              };
              for (const titulo of campo.descripcion_campo) {
                const row = [
                  titulo.grado_instruccion,
                  titulo.fecha_desde,
                  titulo.fecha_hasta,
                  titulo.nombre_instituto,
                  titulo.titulo_obtenido,
                ];
                table.rows.push(row);
              }
              await doc.table(table, {
                columnsSize: [110, 70, 70, 115, 115],
                prepareHeader: () => doc.fontSize(11).font("Helvetica-Bold"),
                prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                  doc.fontSize(10).font("Helvetica");
                },
              });
            })();
          }
        } else if (campo.titulo_campo === "Idiomas") {
          if (!campo.descripcion_campo.length) {
            doc
              .fontSize(11)
              .font("Helvetica")
              .text("No tiene conocimientos", { indent: 20 });
          } else {
            (async function createTable() {
              const table = {
                headers: ["Idioma", "Nivel"],
                rows: [],
              };
              for (const idioma of campo.descripcion_campo) {
                const row = [idioma.nombre, idioma.nivel];
                table.rows.push(row);
              }
              await doc.table(table, {
                prepareHeader: () => doc.fontSize(11).font("Helvetica-Bold"),
                prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                  doc.fontSize(10).font("Helvetica");
                },
              });
            })();
          }
        } else {
          if (campo.titulo_campo) {
            doc.fontSize(11).font("Helvetica-Bold").text(campo.titulo_campo, {
              continued: true,
              indent: 20,
            });

            if (!campo.descripcion_campo) {
              doc
                .fontSize(11)
                .font("Helvetica")
                .text("Sin registrar / No posee", { indent: 20 });
            } else {
              doc.fontSize(11).font("Helvetica").text(campo.descripcion_campo);
            }
          } else {
            if (!campo.descripcion_campo) {
              doc
                .fontSize(11)
                .font("Helvetica")
                .text("Sin registrar / No posee", { indent: 20 });
            } else {
              doc
                .fontSize(11)
                .font("Helvetica")
                .text(campo.descripcion_campo, { indent: 20 });
            }
          }
        }
      }
      doc.moveDown();
    }

    doc.end();

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
