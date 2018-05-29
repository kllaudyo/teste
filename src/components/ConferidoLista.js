import React, { Fragment } from 'react';
import { Typography } from 'material-ui';
import ItemConferido from './ItemConferido';

const ConferidoLista = ({title, itens}) => {

    if(!itens.length)
        return null;

    return (
        <Fragment>
            <Typography
                style={{flex:1, padding:15}}
                variant="subheading"
                color="inherit">
                {title}
            </Typography>
            {itens.map(item => <ItemConferido item={item} />)}
        </Fragment>
    );
};

export default ConferidoLista;