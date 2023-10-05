import express from "express";
import livroController from "../controllers/livrosController.js";

const router = express.Router();

router
  .get("/livros", livroController.listarLivros)
  .get("/livros/busca", livroController.listarLivroPorEditora)
  .get("/livros/:id", livroController.listarLivrosPorId)
  .post("/livros", livroController.cadastrarLivro)
  .put("/livros/:id", livroController.atualizarlivro)
  .delete("/livros/:id", livroController.excluirLivro);
    
export default router;




