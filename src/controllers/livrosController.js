import { autores, livros } from "../models/index.js";
import ErroNotFound from "../erros/ErroNotFound.js";

class livroController {

  static async listarLivros(req, res, next) {
    try {
      const buscaLivro = livros.find();
      req.resultado = buscaLivro;
      //Aqui criamos uma propriedade na requisição e atribuimos nossa coleção de livros a ela, para podermos utilizar na função paginar()
      next();

    } catch (error) {
      next(error);
    }
  }

  static async listarLivroPorFiltro(req, res, next) {

    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros
          .find(busca);

        if (livrosResultado.length !== 0) {
          req.resultado = livrosResultado;
          next();
        }
      } else {
        next(new ErroNotFound("Nada foi encontrado!"));
      }

    } catch (error) {
      next(error);
    }
  }

  static async listarLivrosPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livrosResultado = await livros.findById(id)
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

      if (livroId !== null) {
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

      if (livroId !== null) {
        res.status(200).send("Livro excluído com sucesso!");
      } else {
        next(new ErroNotFound("Id do livro inválido!"));
      }

    } catch (error) {
      next(error);
    }
  }
}
async function processaBusca(requisicao) {
  const { editora, titulo, minPag, maxPag, nomeAutor } = requisicao;
  let busca = {};

  if (editora) busca.editora = { $regex: editora, $options: "i" };
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPag || maxPag) busca.numeroPaginas = {};

  if (nomeAutor) {

    const regex = new RegExp(nomeAutor, "i");
    const autor = await autores.findOne({ nome: regex });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }

  }

  if (minPag) busca.numeroPaginas.$gte = minPag;
  if (maxPag) busca.numeroPaginas.$lte = maxPag;


  return busca;
}

export default livroController;