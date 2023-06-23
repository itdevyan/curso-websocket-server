const socketController = (socket) => {
  console.log("cliente conectado", socket.id);

  socket.on("disconnect", () => {
    console.log("cliente desconectado", socket.id);
  });

  socket.on("enviar-mensaje", (payload, callback) => {
    console.log("Información escuchada desde el cliente:", payload);

    // estas dos instrucciones son lo mismo, solo le llega al cliente
    // callback("abc123");
    // socket.emit("acuso-recibo-mensaje", payload);

    // Esto en el caso que el manejador de evento sea this.io (lo que esta en Server.js)
    // this.io.emit("acuso-recibo-mensaje", payload); los emite a todos

    callback("abc123");
    // Cuando se usa broadcast, todos los DEMAS CLIENTES reciben el mensaje
    socket.broadcast.emit("acuso-recibo-mensaje", payload);
  });
};

module.exports = {
  socketController,
};
