import categoryModel from "../models/category.js";

const helpers = {
  byId: async (id) => {
    const exist = await categoryModel.findById(id);
    if (!exist) throw new Error("No existe categoria para este ID");
  },
  byName: async (name) => {
    const exist = await categoryModel.findOne({ name });
    if (exist) throw new Error(`Error, ya existe la categoria ${name}`);
  },
};

export default helpers;
