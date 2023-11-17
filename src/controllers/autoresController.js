import { autores } from "../models/index.js";
import ErroNotFound from "../erros/ErroNotFound.js";

class autorController {

  static async listarAutores(req, res, next) {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (error) {
      next(error);
    }

  }

  static async listarAutoresPorNacionalidade(req, res, next) {
    try {
      const country = req.query.nacionalidade;
      const autoresResultado = await autores.find({ nacionalidade: country });
      if (autoresResultado.length !== 0) {
        res.status(200).send(autoresResultado);
      } else {
        next(new ErroNotFound("Nacionalidade não encontrada!"));
      }

    } catch (error) {
      next(error);
    }
  }

  static async listarAutoresPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findById(id);
      console.log(autorResultado);
      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        next(new ErroNotFound("Id do autor não encontrado"));
      }

    } catch (error) {
      next(error);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      let novoAutor = new autores(req.body);
      const autorResultado = await novoAutor.save();
      res.status(201).send(autorResultado.toJSON());

    } catch (error) {
      next(error);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorId = await autores.findByIdAndUpdate(id, { $set: req.body });

      if (autorId !== null) {
        res.status(200).send("autor atualizado com sucesso!");
      } else {
        next(new ErroNotFound("Id do autor não encontrado!"));
      }

    } catch (error) {
      next(error);
    }
  }

  static async excluirAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorId = await autores.findByIdAndDelete(id);

      if (autorId !== null) {
        res.status(200).send("Autor excluído com sucesso!");
      } else {
        next(new ErroNotFound("Id do autor não encontrado!"));
      }
      
    } catch (error) {
      next(error);
    }
  }
}

export default autorController;