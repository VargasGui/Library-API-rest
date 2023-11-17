import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: String }, //o id é auto-gerado
  titulo: { type: String, required: [true, "O título não pode ser nulo!"] },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "O(A) autor(a) não pode ser nulo!"] },
  editora: {
    type: String,
    required: [true, "A editora não pode ser nulo!"]
  },
  numeroPaginas: {
    type: Number,
    validate: {
      validator: (valor) => {
        return valor >= 0 && valor <= 3000;
      },
      message: "O número de páginas deve estar entre 0 e 3000."
    }
  }

});

const livros = mongoose.model("livros", livroSchema);

export default livros;