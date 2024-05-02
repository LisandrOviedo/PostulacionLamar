const {
  todosLosCurriculos,
  traerCurriculo,
  traerCurriculoPDF,
  traerCurriculoEmpleado,
  crearCurriculo,
  modificarCurriculo,
  inactivarCurriculo,
} = require("../controllers/curriculos_controllers");

const path = require("path");
const PDFDocument = require("pdfkit-table");

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
  const { curriculo_id } = req.body;

  try {
    const response = await traerCurriculo(curriculo_id);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCurriculoPDF = async (req, res) => {
  const { empleado_id, cedula } = req.body;
  const filename = `Curriculo - ${cedula}.pdf`;

  try {
    const doc = new PDFDocument({
      bufferPages: true,
      font: "Helvetica-Bold",
    });

    // Genera el contenido del PDF
    const content = await traerCurriculoPDF(empleado_id);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    doc.pipe(res);

    doc.fontSize(14).text("Postulación", { align: "center" });
    doc.moveDown(0.5);

    // Agrega el contenido al documento PDF
    content.forEach((seccion) => {
      doc.moveDown();
      doc.font("Helvetica-Bold");
      doc.fontSize(12).text(seccion.titulo, { underline: true });
      doc.moveDown();

      seccion.contenido.forEach(async (campo) => {
        if (campo.titulo_campo === "Experiencias") {
          const table = {
            headers: [
              "Tipo",
              "Cargo / Título",
              "Duración",
              "Empresa / Centro Educativo",
            ],
            rows: [],
          };

          for (const experiencia of campo.descripcion_campo) {
            const row = [
              experiencia.tipo,
              experiencia.cargo_titulo,
              experiencia.duracion,
              experiencia.empresa_centro_educativo,
            ];
            table.rows.push(row);
          }

          await doc.table(table, {
            columnsSize: [50, 160, 90, 170],
            prepareHeader: () => doc.font("Helvetica-Bold").fontSize(11),
            prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
              doc.font("Helvetica").fontSize(10);
            },
          });
        } else {
          if (campo.titulo_campo) {
            doc
              .font("Helvetica-Bold")
              .fontSize(11)
              .text(campo.titulo_campo, { continued: true, indent: 20 });
            doc.font("Helvetica").fontSize(11).text(campo.descripcion_campo);
          } else {
            doc
              .font("Helvetica")
              .fontSize(11)
              .text(campo.descripcion_campo, { indent: 20 });
          }
        }

        doc.moveDown();
      });
    });

    const logoPath = path.join(__dirname, `../../public/LogoAzul.png`);
    doc.image(logoPath, 20, 15, { width: 80 });

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
  getCurriculoPDF,
  getCurriculoEmpleado,
  postCurriculo,
  putCurriculo,
  deleteCurriculo,
};
