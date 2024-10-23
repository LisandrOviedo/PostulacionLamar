import {
  todosLosDepartamentos,
  todosLosDepartamentosActivos,
  traerDepartamento,
  crearDepartamento,
  modificarDepartamento,
  inactivarDepartamento,
} from "../controllers/departamentos_controllers.js";

export const getDepartamentos = async (req, res) => {
  const { empresa_id } = req.params;

  try {
    const response = await todosLosDepartamentos(empresa_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getDepartamentosActivos = async (req, res) => {
  const { empresa_id } = req.params;

  try {
    const response = await todosLosDepartamentosActivos(empresa_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getDepartamento = async (req, res) => {
  const { departamento_id } = req.params;

  try {
    const response = await traerDepartamento(departamento_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postDepartamento = async (req, res) => {
  const { empresa_id, nombre, descripcion } = req.body;

  try {
    const response = await crearDepartamento(empresa_id, nombre, descripcion);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putDepartamento = async (req, res) => {
  const { departamento_id, empresa_id, nombre, descripcion } = req.body;

  try {
    const response = await modificarDepartamento(
      departamento_id,
      empresa_id,
      nombre,
      descripcion
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteDepartamento = async (req, res) => {
  const { departamento_id } = req.body;

  try {
    const response = await inactivarDepartamento(departamento_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
