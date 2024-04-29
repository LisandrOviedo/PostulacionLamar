const PDFDocument = require("pdfkit");

const buildPDF = (dataCallback, endCallback) => {
  const doc = new PDFDocument();

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc.text("Hola Mundo");
  doc.end();
};

module.exports = {
  buildPDF,
};
