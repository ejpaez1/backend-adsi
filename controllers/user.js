import userModel from "../models/user.js";
import bcrypt from "bcrypt";

//Obtener usuario
const userGet = async (req, res) => {
  const { value } = req.query;
  const user = await userModel.find({
    $or: [{ name: new RegExp(value, "i") }, { email: new RegExp(value, "i") }],
  });
  res.json({
    user,
  });
};
//Obtener usuario por ID
const userGetById = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findOne({ _id: id });
  res.json({
    user,
  });
};
//Añadir usuario
const userAdd = async (req, res) => {
  const { name, email, password, rol } = req.body;
  const user = new userModel({ name, email, password, rol });
  //"El salt son el número de vueltas"
  user.password = bcrypt.hashSync(password, 10);
  await user.save();
  res.json({
    user,
  });
};
//Modificar usuario
const userUpdate = async (req, res) => {
  const { id } = req.params;
  const { _id, __v, state, createdAt, email, ...remains } = req.body
  remains.password = bcrypt.hashSync(remains.password, 10);
  //1: buscar, 2: modificar
  const user = await userModel.findOneAndUpdate(id, remains);
  res.json({
    user,
  });
};
// //Eliminar usuario
// const userDelete = async (req, res) => {
//   const { id } = req.params;
//   const user = await userModel.findByIdAndDelete(id);
//   res.json({
//     user,
//   });
// };

const stateEnable = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findByIdAndUpdate(id, { state: 1 });
  res.json({
    user,
  });
};

const stateDisable = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findByIdAndUpdate(id, { state: 0 });
  res.json({
    user,
  });
};

export { userGet, userGetById, userAdd, userUpdate, stateEnable, stateDisable };
