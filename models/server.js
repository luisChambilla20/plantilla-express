const express = require("express");
const cors = require("cors");
const { connectionMongo } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.routesPath = "/api/users";
    this.authPath = "/api/auth";

    // Conectar db
    this.connectDb();

    // Configurar middlewares primero
    this.middlewares();

    // Luego configurar rutas
    this.routes();
  }

  async connectDb() {
    await connectionMongo();
  }

  middlewares() {
    // Leer y parsear el body de las solicitudes
    this.app.use(express.json());

    // Configuración de CORS
    this.app.use(cors());

    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.routesPath, require("../routes/user.routes"));
    this.app.use(this.authPath, require("../routes/auth.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
