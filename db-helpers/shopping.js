import shoppingModel from "../models/shopping.js";

const helpers = {
  byId: async (id) => {
    const exist = await shoppingModel.findById(id);
    if (!exist) throw new Error(`No existe una venta para este ID`);
  },
};

export default helpers;