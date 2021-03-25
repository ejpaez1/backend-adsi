import saleModel from "../models/sale.js";
import modifyStock from "../db-helpers/modifyStock.js"

const sale = {
  //Obtener
  get: async (req, res) => {
    const { value } = req.query;
    const sale = await saleModel
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
      sale,
    });
  },
  getById: async (req, res) => {
    const { id } = req.params;
    const sale = await saleModel
      .findOne({ _id: id })
      .populate("user", ["name", "email"])
      .populate("person ", ["name", "idDocument"]);

    res.json({
      sale,
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
    const sale = new saleModel({
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
    sale.total = sale.details.reduce((acc, article) => acc + (article.quantity * article.price), 0)
    //tax
    sale.tax = sale.total * 0.19
    if(details.discount) {
      sale.total = sale.total - sale.details.discount
    }
    await sale.save();
    details.map((article) => modifyStock.disminuirStock(article._id,article.quantity))
    res.status(200).json({
      sale,
    });
  },
  enable: async (req, res) => {
    const { id } = req.params;
    const sale = await saleModel.findByIdAndUpdate(id, { state: 1 });
    sale.details.map((article) => modifyStock.disminuirStock(article._id,article.quantity))
    res.json({
      sale,
    });
  },
  disable: async (req, res) => {
    const { id } = req.params;
    const sale = await saleModel.findByIdAndUpdate(id, { state: 0 });
    sale.details.map((article) => modifyStock.aumentarStock(article._id,article.quantity))
    res.json({
      sale,
    });
  },
};

export default sale;
