import livros from "../models/Livro.js";

class livroController {

  static async listarLivros(req, res) {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(livrosResultado);
    } catch (error) {
      res.status(500).send({message: error.message}, "Erro Interno");
    }
  }

  static async listarLivroPorEditora(req, res) {
    try {
      const editora = req.query.editora;
      const livrosResultado = await livros.find({ "editora": editora });
      res.status(200).send(livrosResultado);
      
    } catch (error) {
      res.status(300).send({message: `${error.message} - Erro!`});
    }
  }

  static async listarLivrosPorId(req, res) {
    try {
      const id = req.params.id;
      const livrosResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
      res.status(200).send(livrosResultado);

    } catch (error) {
      res.status(400).send({ message: `${error.message} - ID inexistente!` });
    }
  }

  static async cadastrarLivro(req, res) {
    try {
      let novoLivro = new livros(req.body);
      const livrosResultado = await novoLivro.save();
      res.status(201).send(livrosResultado.toJSON());

    } catch (error) {
      res.status(500).send({ message: `${error.message} - falha ao cadastrar livro!` });
    }
  }

  static async atualizarlivro(req, res) {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send("Livro atualizado com sucesso!");
      
    } catch (error) {
      res.status(300).send({ message: `${error.message} - Erro ao atualizar livro!` });
    }
  }

  static async excluirLivro(req, res) {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send("Livro excluído com sucesso!");
      
    } catch (error) {
      res.status(300).send("Erro ao excluir livro.");
    }
  }
}

export default livroController;