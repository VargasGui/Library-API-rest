import mongoose from "mongoose";
//depois de instalar o mongoose (npm) importamos

mongoose.connect(process.env.STRING_CONEXAO_DB);
//importamos a lib dotenv para protegermos nossa string de conexao, e criamos um arquivo .env onde declaramos uma variável para receber o link de conexão.

let db = mongoose.connection;
//variavel que recebe a conexao

export default db;
//exportando para o arq principal app.js