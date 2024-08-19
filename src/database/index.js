import mongoose from "mongoose";
import dotenv from "dotenv";

// Carregue as variáveis de ambiente do arquivo .env
dotenv.config();

class Database {
  constructor() {
    // Use a URL do MongoDB Atlas definida na variável de ambiente
    const mongoURI = process.env.MONGODB_URI;
    this.connection = mongoose
      .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Conectado ao MongoDB Atlas"))
      .catch(err => console.error("Erro ao conectar ao MongoDB Atlas", err));
  }
}

export default new Database();
