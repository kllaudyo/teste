import React from 'react';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography
} from 'material-ui';
import ItemPedido from './ItemPedido';
import ExpandMoreIcon from 'react-icons/lib/md/keyboard-arrow-down';

const ItemPedidoContainer =
    ({cd_produto, nm_produto, qt_pedido, vl_item_pedido, children}) =>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <ItemPedido
                    cd_produto={cd_produto}
                    nm_produto={nm_produto}
                    qt_pedido={qt_pedido}
                    vl_item_pedido={vl_item_pedido}
                />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    {children}
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
;

export default ItemPedidoContainer;