const {
  todasLasFichasIngresos,
  traerFichaIngresoEmpleado,
  traerFichaIngreso,
  traerFichaIngresoPDF,
  crearFichaIngreso,
  modificarFichaIngreso,
  inactivarFichaIngreso,
} = require("../controllers/fichas_ingresos_controllers");

const getFichasIngresosEmpleado = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todasLasFichasIngresos(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getFichaIngresoEmpleado = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await traerFichaIngresoEmpleado(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getFichaIngreso = async (req, res) => {
  const { ficha_ingreso_id } = req.params;

  try {
    const response = await traerFichaIngreso(ficha_ingreso_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postFichaIngreso = async (req, res) => {
  const { empleado_id, datosIngreso } = req.body;

  try {
    const response = await crearFichaIngreso(empleado_id, datosIngreso);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getFichaIngresoPDF = async (req, res) => {
  const { empleado_id, identificacion } = req.body;
  const filename = "Ficha Ingreso.pdf";

  try {
    const doc = new PDFDocument({
      bufferPages: true,
      font: "Helvetica",
    });

    // Genera el contenido del PDF
    const content = await traerFichaIngresoPDF(empleado_id);

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
      .text("Ficha Ingreso", { align: "center" });
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
      // AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
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

const putFichaIngreso = async (req, res) => {
  const {
    ficha_ingreso_id,
    cargo_nivel_id,
    salario,
    fecha_ingreso,
    observaciones,
  } = req.body;

  try {
    const response = await modificarFichaIngreso(
      ficha_ingreso_id,
      cargo_nivel_id,
      salario,
      fecha_ingreso,
      observaciones
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteFichaIngreso = async (req, res) => {
  const { ficha_ingreso_id } = req.body;

  try {
    const response = await inactivarFichaIngreso(ficha_ingreso_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getFichasIngresosEmpleado,
  getFichaIngresoEmpleado,
  getFichaIngreso,
  getFichaIngresoPDF,
  postFichaIngreso,
  putFichaIngreso,
  deleteFichaIngreso,
};
