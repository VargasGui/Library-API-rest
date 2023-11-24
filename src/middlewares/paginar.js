import ErroRequisicao from "../erros/ErroRequisicao.js";

/* eslint-disable indent */
async function paginar(req, res, next) {
    try {
        let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;

        let [campoOrdenacao, ordem] = ordenacao.split(":");

        limite = parseInt(limite);
        pagina = parseInt(pagina);
        ordem = parseInt(ordem);

        const resultado = req.resultado;
        //Aqui recebemos a coleção de itens passada pelas funções que a chamam

        if (limite > 0 && pagina > 0) {

            const resultadoPaginado = await resultado.find()
                .sort({ [campoOrdenacao]: ordem })
                //utilizamos a variavel entre [] para ele poder entender que "campoOrdenacao" não sera o nome da propriedade, e sim o nome da variável.
                .skip((pagina - 1) * limite)
                .limit(limite)
                .exec();
            res.status(200).json(resultadoPaginado);

        } else {
            next(new ErroRequisicao());
        }
    } catch (error) {
        next(error);
    }
}

export default paginar;