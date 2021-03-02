import categoryModel from "../models/category.js";
//Obtener
const categoryGet = async (req, res) => {
  const { value } = req.query;
  const category = await categoryModel
    .find({
      $or: [
        { name: new RegExp(value, "i") },
        { description: new RegExp(value, "i") },
      ],
    })
    .sort({ createdAt: -1 });
  res.json({
    category,
  });
};
//Obtener por ID
const categoryGetById = async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findOne({ _id: id });
  res.json({
    category,
  });
};
//Insertar datos
const categoryAdd = async (req, res) => {
  const { name, description } = req.body;
  const category = new categoryModel({ name, description });
  await category.save();
  res.json({
    category,
  });
};
//Modificar datos
const categoryModify = async (req, res) => {
  const { id } = req.params;
  const { _id, createdAt, __v, state, ...remains } = req.body;
  const category = await categoryModel.findByIdAndUpdate(id, remains);
  res.json({
    category,
  });
};

const stateEnable = async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndUpdate(id, { state: 1 });
  res.json({
    category,
  });
};

const stateDisable = async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndUpdate(id, { state: 0 });
  res.json({
    category,
  });
};

const categoryDelete = async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);
  res.json({
    category,
  });
};

export {
  categoryGet,
  categoryGetById,
  categoryAdd,
  categoryModify,
  stateEnable,
  stateDisable,
  categoryDelete,
};
