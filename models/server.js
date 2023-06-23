const express = require("express");
const cors = require("cors");
const { socketController } = require("../sockets/controller");

class Server {
  constructor() {
    // Configuración e inicialización
    this.app = express();
    this.port = process.env.PORT;

    // Config para Socket.io
    // http ya viene de node
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.paths = {};

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();

    // Sockets
    this.sockets();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {}

  sockets() {
    this.io.on("connection", socketController);
  }

  listen() {
    // En vez de levantar app de express, se levanta server de socket.io
    this.server.listen(this.port, () => {
      console.log("Servidor iniciado en puerto", this.port);
    });
  }
}

module.exports = Server;
