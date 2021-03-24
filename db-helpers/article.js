import articleModel from "../models/article.js";

const helpers = {
  byId: async (id) => {
    const exist = await articleModel.findById(id);
    if (!exist) throw new Error(`No existe un articulo para este ID`);
  },
  byName: async (name) => {
    const exist = await articleModel.findOne({ name });
    if (exist) throw new Error(`Ya existe un aritculo con este nombre`);
  },
  byCode: async (code) => {
    const exist = await articleModel.findOne({ code });
    if (exist) throw new Error(`Ya existe un articulo con este codigo`);
  }
};

export default helpers;
