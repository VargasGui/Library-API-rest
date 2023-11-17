import { livros } from "../models/index.js";
import ErroNotFound from "../erros/ErroNotFound.js";

class livroController {

  static async listarLivros(req, res, next) {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(livrosResultado);
    } catch (error) {
      next(error);
    }
  }

  static async listarLivroPorEditora(req, res, next) {

    try {
      const editora = req.query.editora;
      const livrosResultado = await livros.find({ "editora": editora });
      if (livrosResultado.length !== 0) {
        res.status(200).send(livrosResultado);
      } else {
        next(new ErroNotFound("Editora não encontrada!"));
      }

    } catch (error) {
      next(error);
    }
  }

  static async listarLivrosPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livrosResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livrosResultado == null) {
        next(new ErroNotFound("Id não encontrado!"));
      } else {
        res.status(200).send(livrosResultado);
      }

    } catch (error) {
      next(error);
    }
  }

  static async cadastrarLivro(req, res, next) {
    try {
      let novoLivro = new livros(req.body);
      const livrosResultado = await novoLivro.save();
      res.status(201).send(livrosResultado.toJSON());

    } catch (error) {
      next(error);
    }
  }

  static async atualizarlivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroId = await livros.findByIdAndUpdate(id, { $set: req.body });

      if(livroId !== null){
        res.status(200).send("Livro atualizado com sucesso!");
      } else {
        next(new ErroNotFound("Id do livro inexistente!"));
      }

    } catch (error) {
      next(error);
    }
  }

  static async excluirLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroId = await livros.findByIdAndDelete(id);
      
      if(livroId !== null){
        res.status(200).send("Livro excluído com sucesso!");
      } else {
        next(new ErroNotFound("Id do livro inválido!"));
      }

    } catch (error) {
      next(error);
    }
  }
}

export default livroController;