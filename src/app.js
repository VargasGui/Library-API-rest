import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Erro de Conexão"));

db.once("open", () => {
  console.log("Conectado com o Banco de Dados com sucesso.");
});

const app = express();

app.use(express.json());

routes(app);

export default app;