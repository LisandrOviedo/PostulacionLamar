const {
  todasLasFichasIngresos,
  traerFichaIngresoEmpleado,
  traerFichaIngreso,
  traerFichaIngresoPDF,
  crearFichaIngreso,
  modificarFichaIngreso,
  inactivarFichaIngreso,
} = require("../controllers/fichas_ingresos_controllers");

const {
  traerFotoEmpleado,
} = require("../controllers/empleados_controllers.js");

const { crearCarpetaSiNoExiste } = require("../utils/pruebaKostick");

const path = require("node:path");

const puppeteer = require("puppeteer");

const { reporteFichaIngreso } = require("../utils/reportes.js");

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
    // Genera el contenido del PDF
    const content = await traerFichaIngresoPDF(empleado_id);

    const foto_empleado = await traerFotoEmpleado(empleado_id);

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

    await page.setContent(reporteFichaIngreso(content, foto_empleado), {
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
