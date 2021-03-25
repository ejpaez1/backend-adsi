import shoppingModel from "../models/shopping.js";
import modifyStock from "../db-helpers/modifyStock.js"

const shopping = {
  //Obtener
  get: async (req, res) => {
    const { value } = req.query;
    const shopping = await shoppingModel
      .find({
        $or: [
          { typeProof: new RegExp(value, "i") },
          { numProof: new RegExp(value, "i") },
        ],
      })
      .sort({ createdAt: -1 })
      .populate("user", ["name", "email"])
      .populate("person ", ["name", "idDocument"]);

    res.json({
      shopping,
    });
  },
  getById: async (req, res) => {
    const { id } = req.params;
    const shopping = await shoppingModel
      .findOne({ _id: id })
      .populate("user", ["name", "email"])
      .populate("person ", ["name", "idDocument"]);

    res.json({
      shopping,
    });
  },
  add: async (req, res) => {
    const {
      user,
      person,
      typeProof,
      serieProof,
      numProof,
      total,
      tax,
      details,
    } = req.body;
    const shopping = new shoppingModel({
      user,
      person,
      typeProof,
      serieProof,
      numProof,
      total,
      tax,
      details,
    });

    //total
    shopping.total = shopping.details.reduce((acc, article) => acc + (article.quantity * article.price), 0)
    //tax
    shopping.tax = shopping.total * 0.19
    await shopping.save();
    details.map((article) => modifyStock.disminuirStock(article._id,article.quantity))
    res.status(200).json({
      shopping,
    });
  },
  enable: async (req, res) => {
    const { id } = req.params;
    const shopping = await shoppingModel.findByIdAndUpdate(id, { state: 1 });
    shopping.details.map((article) => modifyStock.disminuirStock(article._id,article.quantity))
    res.json({
      shopping,
    });
  },
  disable: async (req, res) => {
    const { id } = req.params;
    const shopping = await shoppingModel.findByIdAndUpdate(id, { state: 0 });
    shopping.details.map((article) => modifyStock.aumentarStock(article._id,article.quantity))
    res.json({
      shopping,
    });
  },
};

export default shopping;
