import categoryModel from "../models/category.js";

const category = {
  //Obtener
  categoryGet: async (req, res) => {
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
  categoryGetById: async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findOne({ _id: id });
    res.json({
      category,
    });
  },
  //Insertar datos
  categoryAdd: async (req, res) => {
    const { name, description } = req.body;
    const category = new categoryModel({ name, description });
    await category.save();
    res.json({
      category,
    });
  },
  //Modificar datos
  categoryModify: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, __v, state, ...remains } = req.body;
    const category = await categoryModel.findByIdAndUpdate(id, remains);
    res.json({
      category,
    });
  },

  stateEnable: async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(id, { state: 1 });
    res.json({
      category,
    });
  },

  stateDisable: async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(id, { state: 0 });
    res.json({
      category,
    });
  },

  categoryDelete: async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.json({
      category,
    });
  },
};

export default category;
