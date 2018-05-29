import React from 'react';
import {
    Grid,
    Typography
} from 'material-ui';

const ItemPedido = ({cd_produto, nm_produto, qt_pedido, vl_item_pedido}) =>
    <Grid item xs={12}>
        <Grid
            container
            spacing={16}
            alignItems="center"
            justify="space-between"
        >
            <Grid item xs={2}>
                <Typography >{cd_produto}</Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography >{nm_produto.substr(0,20)}</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography >{qt_pedido}</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography >{vl_item_pedido}</Typography>
            </Grid>
        </Grid>
    </Grid>
;

export default ItemPedido;