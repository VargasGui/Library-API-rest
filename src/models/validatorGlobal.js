/* eslint-disable indent */
import mongoose from "mongoose";

//define uma propriedade para todos os campos do tipo string dos meus modelos
mongoose.Schema.Types.String.set("validate", {
    validator: (valor) => valor.trim() !== "",
    message: ({path}) => `O campo ${path} foi fornecido em branco!`
});
