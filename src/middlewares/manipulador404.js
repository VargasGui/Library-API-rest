/* eslint-disable indent */
import ErroNotFound from "../erros/ErroNotFound.js";


function manipulador404(req, res, next) {
    const erro404 = new ErroNotFound();
    next(erro404);
}

export default manipulador404;