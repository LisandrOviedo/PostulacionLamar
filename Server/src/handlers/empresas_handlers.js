const {
  todasLasEmpresas,
  todasLasEmpresasActivas,
  traerEmpresa,
  crearEmpresa,
  modificarEmpresa,
  inactivarEmpresa,
} = require("../controllers/empresas_controllers");

const getEmpresas = async (req, res) => {
  try {
    const response = await todasLasEmpresas();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getEmpresasActivas = async (req, res) => {
  try {
    const response = await todasLasEmpresasActivas();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getEmpresa = async (req, res) => {
  const { empresa_id } = req.params;

  try {
    const response = await traerEmpresa(empresa_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postEmpresa = async (req, res) => {
  const { codigo_empresa, nombre, direccion, rif } = req.body;

  try {
    const response = await crearEmpresa(codigo_empresa, nombre, direccion, rif);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putEmpresa = async (req, res) => {
  const { empresa_id, codigo_empresa, nombre, direccion, rif } = req.body;

  try {
    const response = await modificarEmpresa(
      empresa_id,
      codigo_empresa,
      nombre,
      direccion,
      rif
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteEmpresa = async (req, res) => {
  const { empresa_id } = req.body;

  try {
    const response = await inactivarEmpresa(empresa_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getEmpresas,
  getEmpresasActivas,
  getEmpresa,
  postEmpresa,
  putEmpresa,
  deleteEmpresa,
};
