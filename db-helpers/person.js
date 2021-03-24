import personModel from "../models/person.js";

const helpers = {
  byId: async (id) => {
    const exist = await personModel.findById(id);
    if (!exist) throw new Error(`No existe una persona para este ID`);
  },
  byIdDocument: async (idDocument) => {
    const exist = await personModel.findOne({ idDocument });
    if (exist) throw new Error(`Ya existe una persona con este documento`);
  },
  byPhone: async (phone) => {
    const exist = await personModel.findOne({ phone });
    if (exist) throw new Error(`Ya existe una persona con este telefono`);
  },
  byEmail: async (email) => {
    const exist = await personModel.findOne({ email });
    if (exist) throw new Error(`Ya existe una persona con este email`);
  },
};

export default helpers;