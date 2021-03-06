import userModel from "../models/user.js";
import bcrypt from "bcrypt";

const auth = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      //Buscamos el correo en la base de datos
      const user = await userModel.findOne({ email });
      //Si no existe el usuario
      if (!user || user.state === 0) {
        return res.status(400).json({
          message: "User not found",
        });
      }
      //Si el usuario existe y está activo evaluamos
      const myPassword = bcrypt.compareSync(password, user.password);
      if (!myPassword) {
        return res.json({ message: "Wrong password" });
      }

      res.json({
        user,
      });
    } catch (error) {
      res.json({ message: error });
    }
  },
};

export default auth;
