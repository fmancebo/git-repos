import App from "./app";

// Use process.env.PORT para a porta fornecida pela plataforma de hospedagem
const PORT = process.env.PORT || 5000; // 5000 é a porta padrão usada em desenvolvimento

App.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
