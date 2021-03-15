import user from "../models/user.js";
import userModel from "../models/user.js";

const helpers = {
  userById: async (id) => {
    const exist = await userModel.findById(id);
    if (!exist) throw new Error(`No existe un usuario para este ID`);
  },
  userEmail: async (email) => {
    const exist = await userModel.findOne({email})
    if (!exist) throw new Error('El email ya se encuentra en uso')
  }
};

export default helpers