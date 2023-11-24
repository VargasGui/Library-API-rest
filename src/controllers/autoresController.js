import { autores } from "../models/index.js";
import ErroNotFound from "../erros/ErroNotFound.js";

class autorController {

  static async listarAutores(req, res, next) {
    try {
      const listaDeAutores = autores.find();
      req.resultado = listaDeAutores;
      next();
    } catch (error) {
      next(error);
    }

  }

  static async listarAutoresPorNacionalidade(req, res, next) {
    try {
      const country = req.query.nacionalidade;
      const nacionalidadeFiltrada = new RegExp(country, "i");

      const autoresResultado = autores.find({ nacionalidade: nacionalidadeFiltrada });
      if (autoresResultado.length !== 0) {
        req.resultado = autoresResultado;
        next();
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