import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, maxlength: 50, unique: true },
  description: { type: String, maxlength: 150 },
  state: { type: Number, default: 1 }, //Activo : 1, Inactivo: 0
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("categoryModel", categorySchema);