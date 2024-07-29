const express = require("express");

const server = express();

// Rota de exemplo
server.get("/", (req, res) => {
  res.send("Olá, mundo!");
});

// Inicie o servidor na porta 3000
server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
