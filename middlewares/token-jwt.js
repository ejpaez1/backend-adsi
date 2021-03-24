import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

const tokens = {
  generateJWT: (id) => {
    return new Promise((resolve, reject) => {
      const payload = { uid: id };
      jwt.sign(
        payload,
        process.env.SECRETKEY,
        {
          expiresIn: "24h",
        },
        (err, token) => {
          if (err) {
            reject("No se pudo generar el token");
          } else {
            resolve(token);
          }
        }
      );
    });
  },
  validateJWT: async (req, res, next) => {
    const token = req.header("token");
  
    if (!token) {
      return res.status(401).json({
        msg: "No existe token en la petición",
      });
    }
  
    try {
      const { uid } = jwt.verify(token, process.env.SECRETKEY);
      const user = await userModel.findById(uid);
      if (!user || user.state === 0) {
        return res.status(401).json({
          msg: "Token no válido",
        });
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        msg: "Token no valido",
      });
    }
  }
}

export default tokens
