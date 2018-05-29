import React from 'react';
import LockIcon from 'react-icons/lib/md/check-circle';
import {
    Grid
} from 'material-ui';
import ItemNotaFiscalContainer from './ItemNotaFiscalContainer';
import ItemPedidoContainer from './ItemPedidoContainer';

const ItemConferido = ({item}) => {
    const {
        cd_peca,
        nm_peca,
        qt_item,
        vl_item,
        cd_produto,
        nm_produto,
        qt_pedido,
        vl_item_pedido
    } = item;
    return (
        <div style={{padding:-0.5}}>
            <Grid container>
                <Grid item xs={5}>
                    <ItemNotaFiscalContainer
                        cd_peca={cd_peca}
                        nm_peca={nm_peca}
                        qt_item={qt_item}
                        vl_item={vl_item}
                    />
                </Grid>
                <Grid item xs={1} >
                    <Grid container alignItems="center" justify="center">
                        <LockIcon size={24} color={'green'}/>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <ItemPedidoContainer
                        cd_produto={cd_produto}
                        nm_produto={nm_produto}
                        qt_pedido={qt_pedido}
                        vl_item_pedido={vl_item_pedido}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default ItemConferido;