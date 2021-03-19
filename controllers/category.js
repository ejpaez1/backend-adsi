import categoryModel from "../models/category.js";

const category = {
  //Obtener
  get: async (req, res) => {
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
  },
  //Obtener por ID
  getById: async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findOne({ _id: id });
    res.json({
      category,
    });
  },
  //Insertar datos
  add: async (req, res) => {
    const { name, description } = req.body;
    const category = new categoryModel({ name, description });
    await category.save();
    res.json({
      category,
    });
  },
  //Modificar datos
  modify: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, __v, state, ...remains } = req.body;
    const category = await categoryModel.findByIdAndUpdate(id, remains);
    res.json({
      category,
    });
  },

  enable: async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(id, { state: 1 });
    res.json({
      category,
    });
  },

  disable: async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(id, { state: 0 });
    res.json({
      category,
    });
  },
/* 
  categoryDelete: async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.json({
      category,
    });
  }, */
};

export default category;
