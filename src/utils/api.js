import { Uris } from "./Constants";

const
    mode =
        process.env.NODE_ENV === 'production'
            ? null
            : 'cors'
    ,

    getRequestHeaders = () => new Headers({
        'Accept': 'application/json'
    });

export const
    getNFE = ({id_fornecedor, id_usuario}) =>
        fetch(`${Uris.MNR_URL_LISTAR}?id_fornecedor=${id_fornecedor}&id_usuario=${id_usuario}`, {method: 'GET', mode, headers:getRequestHeaders()})
            .then( response => response.json())
            .catch( err => console.log(err))
    ,
    getItens = ({id_fornecedor, id_usuario, id_nota_fiscal}) =>
        fetch(`${Uris.MNR_URL_ITENS}?id_fornecedor=${id_fornecedor}&id_usuario=${id_usuario}&id_nota_fiscal=${id_nota_fiscal}`,{method: 'GET', mode, headers:getRequestHeaders()})
            .then(response => response.json())
            .catch( err => console.log(err))
;

