import React from 'react';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography
} from 'material-ui';
import ItemNotaFiscal from './ItemNotaFiscal';
import ExpandMoreIcon from 'react-icons/lib/md/keyboard-arrow-down';

const ItemNotaFiscalContainer =
    ({cd_peca, nm_peca, qt_item, vl_item, children}) =>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <ItemNotaFiscal
                    cd_peca={cd_peca}
                    nm_peca={nm_peca}
                    qt_item={qt_item}
                    vl_item={vl_item}
                />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    {children}
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
;

export default ItemNotaFiscalContainer;