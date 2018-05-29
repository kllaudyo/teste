import React from 'react';
import {
    Grid,
    Typography
} from 'material-ui';

const ItemNotaFiscal = ({cd_peca, nm_peca, qt_item, vl_item}) =>
    <Grid item xs={12}>
        <Grid
            container
            spacing={16}
            alignItems="center"
            justify="space-between">
            <Grid item xs={2}>
                <Typography >{cd_peca}</Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography >{nm_peca}</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography >{qt_item}</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography >{vl_item}</Typography>
            </Grid>
        </Grid>
    </Grid>
;

export default ItemNotaFiscal;