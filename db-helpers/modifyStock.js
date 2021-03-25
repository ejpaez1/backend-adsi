import articleModel from "../models/article.js";

const stock = {
  disminuirStock: async (_id, cantidad) => {
    let { stock } = await articleModel.findById(_id);
    stock = parseInt(stock) - parseInt(cantidad);
    await articleModel.findByIdAndUpdate({ _id }, { stock });
  },
  aumentarStock: async (_id, cantidad) => {
    let { stock } = await articleModel.findById(_id);
    stock = parseInt(stock) + parseInt(cantidad);
    await articleModel.findByIdAndUpdate({ _id }, { stock });
  },
};

export default stock;
