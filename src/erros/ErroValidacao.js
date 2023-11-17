/* eslint-disable indent */
import ErroRequisicao from "./ErroRequisicao.js";

class ErroValidacao extends ErroRequisicao {
    constructor(error) {
        const mensagensErro = Object.values(error.errors)
            .map(error => error.message)
            .join("; ");

        super(`Os seguintes erros foram encontrados: ${mensagensErro}`);
    }
}
export default ErroValidacao;