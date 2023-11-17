/* eslint-disable indent */
import ErroBase from "./erroBase.js";

class ErroNotFound extends ErroBase {
    constructor(mensagem = "Página não encontrada!") {
        super(mensagem, 404);
    }
}
export default ErroNotFound;