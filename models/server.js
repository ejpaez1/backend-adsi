import express from "express";
import cors from "cors";
import mongoConnection from "../database/config.js";

class Server {
  constructor() {
    //Definimos el puerto en una variable de entorno
    this.port = process.env.PORT;
    //Instanciamos express
    this.app = express();
    //Conectar a la base de datos en mongo
    this.myConnection();
    //Llamar middlewares
    this.middlewares();
    //Definir rutas
    this.routes();
  }
  routes() {}

  async myConnection() {
    await mongoConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor iniciado en el puerto ${this.port}`);
    });
  }
}

export { Server };
