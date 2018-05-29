import React, {Fragment} from 'react';
import {
    Grid,
    Typography
} from 'material-ui';
import ItemNotaFiscalContainer from './ItemNotaFiscalContainer';
import ItemPedidoContainer from './ItemPedidoContainer';
import DropBox from './DropBox';
import DragBox from './DragBox';

const ContestadoLista =
    ({title, itens_nota_fiscal, itens_pedido}) => {

        if(!itens_nota_fiscal.length)
            return null;

        return (
            <Fragment>
                <Typography
                    style={{flex:1, padding:15}}
                    variant="subheading"
                    color="inherit">
                    {title}
                </Typography>
                <Grid container>
                    <Grid item xs={5}>
                        {itens_nota_fiscal.map(({ cd_peca, nm_peca, qt_item, vl_item}) =>
                            <DropBox
                                id_item_nota_fiscal = {cd_peca}
                                onDrop={(item) => alert(`Voce conseguiu ${cd_peca} no ${item.id_pedido}`) }
                            >
                                <ItemNotaFiscalContainer
                                    cd_peca={cd_peca}
                                    nm_peca={nm_peca}
                                    qt_item={qt_item}
                                    vl_item={vl_item}
                                />
                            </DropBox>
                        )}
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={6}>
                        {itens_pedido.map(({cd_produto, nm_produto, qt_pedido, vl_item_pedido}) =>
                            <DragBox
                                id_pedido={cd_produto}
                            >
                                <ItemPedidoContainer
                                    cd_produto={cd_produto}
                                    nm_produto={nm_produto}
                                    qt_pedido={qt_pedido}
                                    vl_item_pedido={vl_item_pedido}
                                />
                            </DragBox>
                        )}
                    </Grid>
                </Grid>
            </Fragment>
        )
    };
export default ContestadoLista;