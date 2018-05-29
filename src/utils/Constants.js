export const
    MNR_BASE_ROUTE = process.env.NODE_ENV === 'production' ? '/nfe/index.php/' : '/',
    MNR_BASE_URL = process.env.NODE_ENV === 'production' ? '/nfe' : 'http://192.168.1.111/nfe',
    Routes = {
        MNR_NOTA_FISCAL_LISTA: MNR_BASE_ROUTE,
        MNR_NOTA_FISCAL: `${MNR_BASE_ROUTE}:id`
    },
    Uris = {
        MNR_URL_IMPORTAR : `${MNR_BASE_URL}/ImportaNFEController.php`,
        MNR_URL_LISTAR: `${MNR_BASE_URL}/listanfecontroller.php`,
        MNR_URL_ITENS: `${MNR_BASE_URL}/notafiscalcontroller.php`
    },
    Colors = {
        MNR_BACKGROUND: "#e9e9e9",
        MNR_CHIP_COLOR: "#e0f2f1"
    }
;