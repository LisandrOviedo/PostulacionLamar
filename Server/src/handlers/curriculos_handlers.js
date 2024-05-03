const {
  todosLosCurriculos,
  traerCurriculo,
  traerCurriculoPDF,
  traerCurriculoPDFAnexos,
  cambiarEstadoRevisado,
  traerCurriculoEmpleado,
  crearCurriculo,
  modificarCurriculo,
  inactivarCurriculo,
} = require("../controllers/curriculos_controllers");

const { DDMMYYYYHHMM } = require("../utils/formatearFecha");

const path = require("path");
const PDFDocument = require("pdfkit-table");
const fs = require("fs");

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
    });

    // Genera el contenido del PDF
    const content = await traerCurriculoPDF(empleado_id);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    // Guarda el PDF
    doc.pipe(res);

    // const pdf_path = path.join(
    //   __dirname,
    //   `../../public/documentosEmpleados/${cedula}/${DDMMYYYYHHMM()} - CV.pdf`
    // );

    // doc.pipe(fs.createWriteStream(pdf_path));

    const addLogo = () => {
      const logoPath = path.join(__dirname, `../../public/LogoAzul.png`);

      const currentPage = doc.bufferedPageRange().count;

      doc.font("Helvetica").fontSize(10).text(`Página ${currentPage}`, {
        align: "right",
      });

      doc.image(logoPath, 55, 35, { width: 80 });
      doc.translate(0, 20);
    };

    addLogo();

    doc.on("pageAdded", addLogo);

    doc.fontSize(14).text("Postulación", { align: "center" });
    doc.moveDown(0.5);

    // Agrega el contenido al documento PDF
    content.forEach((seccion) => {
      doc.moveDown();
      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(seccion.titulo, { underline: true });
      doc.moveDown();

      seccion.contenido.forEach(async (campo) => {
        if (campo.titulo_campo === "Experiencias") {
          if (!campo.descripcion_campo.length) {
            doc.fontSize(11).font("Helvetica").text("No posee", { indent: 20 });
          } else {
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
          }
        } else {
          if (campo.titulo_campo) {
            doc
              .font("Helvetica-Bold")
              .fontSize(11)
              .text(campo.titulo_campo, { continued: true, indent: 20 });

            if (!campo.descripcion_campo) {
              doc
                .fontSize(11)
                .font("Helvetica")
                .text("No posee", { indent: 20 });
            } else {
              doc.font("Helvetica").fontSize(11).text(campo.descripcion_campo);
            }
          } else {
            if (!campo.descripcion_campo) {
              doc
                .fontSize(11)
                .font("Helvetica")
                .text("No posee", { indent: 20 });
            } else {
              doc
                .font("Helvetica")
                .fontSize(11)
                .text(campo.descripcion_campo, { indent: 20 });
            }
          }
        }

        doc.moveDown();
      });
    });

    doc.end();

    await cambiarEstadoRevisado(empleado_id);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCurriculoPDFAnexos = async (req, res) => {
  const { empleado_id, cedula } = req.body;
  const filename = `Curriculo - ${cedula}.pdf`;

  try {
    const doc = new PDFDocument({
      bufferPages: true,
    });

    // Genera el contenido del PDF
    const content = await traerCurriculoPDF(empleado_id);
    const anexos = await traerCurriculoPDFAnexos(empleado_id);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    doc.pipe(res);

    const addLogo = () => {
      const logoPath = path.join(__dirname, `../../public/LogoAzul.png`);

      const currentPage = doc.bufferedPageRange().count;

      doc.font("Helvetica").fontSize(10).text(`Página ${currentPage}`, {
        align: "right",
      });

      doc.image(logoPath, 55, 35, { width: 80 });
      doc.translate(0, 20);
    };

    addLogo();

    doc.on("pageAdded", addLogo);

    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Postulación", { align: "center" });
    doc.moveDown(0.5);

    // Agrega el contenido al documento PDF
    content.forEach((seccion) => {
      doc.moveDown();
      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(seccion.titulo, { underline: true });
      doc.moveDown();

      seccion.contenido.forEach(async (campo) => {
        if (campo.titulo_campo === "Experiencias") {
          if (!campo.descripcion_campo.length) {
            doc.fontSize(11).font("Helvetica").text("No posee", { indent: 20 });
          } else {
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
          }
        } else {
          if (campo.titulo_campo) {
            doc
              .font("Helvetica-Bold")
              .fontSize(11)
              .text(campo.titulo_campo, { continued: true, indent: 20 });

            if (!campo.descripcion_campo) {
              doc
                .fontSize(11)
                .font("Helvetica")
                .text("No posee", { indent: 20 });
            } else {
              doc.font("Helvetica").fontSize(11).text(campo.descripcion_campo);
            }
          } else {
            if (!campo.descripcion_campo) {
              doc
                .fontSize(11)
                .font("Helvetica")
                .text("No posee", { indent: 20 });
            } else {
              doc
                .font("Helvetica")
                .fontSize(11)
                .text(campo.descripcion_campo, { indent: 20 });
            }
          }
        }

        doc.moveDown();
      });
    });

    anexos.forEach((anexo) => {
      const path = fs.readFileSync(anexo);

      const pathParts = anexo.split("/");
      const fileName = pathParts.pop();
      const fileExtension = fileName.split(".").pop();

      if (fileExtension === "pdf") {
        // doc.addPage().pdf(path);
      } else if (fileExtension === "doc" || fileExtension === "docx") {
        // doc.addPage().text(path.toString());
      } else if (
        fileExtension === "jpeg" ||
        fileExtension === "jpg" ||
        fileExtension === "png"
      ) {
        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;
        const imageScale = 0.3; // Escala deseada de la imagen

        const image = doc.openImage(anexo);

        const imageWidth = image.width * imageScale; // Ancho deseado de la imagen
        const imageHeight = image.height * imageScale; // Alto deseado de la imagen

        const x = (pageWidth - imageWidth) / 2;
        const y = (pageHeight - imageHeight) / 2;

        doc.addPage().image(anexo, x, y, { scale: imageScale });
      }
    });

    doc.end();

    await cambiarEstadoRevisado(empleado_id);
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
  getCurriculoPDFAnexos,
  getCurriculoEmpleado,
  postCurriculo,
  putCurriculo,
  deleteCurriculo,
};
