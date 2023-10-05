import mongoose from "mongoose";
import autores from "../models/Autor.js";

class autorController {

  static async listarAutores(req, res) {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (error) {
      res.status(500).send({messagem: "Erro interno no servidor"});
    }
    
  }

  static async listarAutoresPorNacionalidade(req, res) {
    try {
      const country = req.query.nacionalidade;
      const autoresResultado = await autores.find({ nacionalidade: country });
      res.status(200).send(autoresResultado);
    } catch (error) {
      res.status(300).send({ message: `${error.message} - Ocorreu um Erro!` });
    }
  }

  static async listarAutoresPorId(req, res) {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findById(id);

      if(autorResultado !== null){
        res.status(200).send(autorResultado);
      } else {
        res.status(404).send({ message: "ID inexistente!" });
      }
      
    } catch (error) {
      if(error instanceof mongoose.Error.CastError) {
        res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos."});
      } else {
        res.status(500).send({ message: `${error.message} - Erro interno no servidor!` });
      }
    }
  }

  static async cadastrarAutor(req, res) {
    try {
      let novoAutor = new autores(req.body);
      const autorResultado = await novoAutor.save();
      res.status(201).send(autorResultado.toJSON());
      
    } catch (error) {
      res.status(500).send({ message: `${error.message} - falha ao cadastrar autor!` });
    }
  }

  static async atualizarAutor(req, res) {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send("autor atualizado com sucesso!");
    } catch (error) {
      res.status(300).send({ message: `${error.message} - Erro ao atualizar autor!` });
    }
  }

  static async excluirAutor(req, res) {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send("Autor excluído com sucesso!");
    } catch (error) {
      res.status(300).send("Erro ao excluir autor.");
    }
  }
}

export default autorController;