import articleModel from "../models/article.js";

const article = {
  get: async (req, res) => {
    const { value } = req.query;
    const article = await articleModel
      .find({
        $or: [
          { name: new RegExp(value, "i") },
          { description: new RegExp(value, "i") },
        ],
      })
      .sort({ createdAt: -1 })
      .populate("category", ["name", "description"]);
    res.json({
      article,
    });
  },
  getById: async (req, res) => {
    const { id } = req.params;
    const article = await articleModel
      .findOne({ _id: id })
      .populate("category", ["name", "description"]);

    res.json({
      article,
    });
  },
  add: async (req, res) => {
    const { category, code, name, description, price, stock } = req.body;
    const article = new articleModel({
      category,
      code,
      name,
      description,
      price,
      stock,
    });
    await article.save();
    res.status(200).json({
      article,
    });
  },
  //Modificar datos
  modify: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, __v, state, ...remains } = req.body;
    const article = await articleModel.findByIdAndUpdate(id, remains);
    res.json({
      article,
    });
  },

  enable: async (req, res) => {
    const { id } = req.params;
    const article = await articleModel.findByIdAndUpdate(id, { state: 1 });
    res.json({
      article,
    });
  },

  disable: async (req, res) => {
    const { id } = req.params;
    const article = await articleModel.findByIdAndUpdate(id, { state: 0 });
    res.json({
      article,
    });
  },
};

export default article;
