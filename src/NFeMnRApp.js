import React, {Component, Fragment} from 'react';
import { Route, Switch } from 'react-router-dom';
import { Routes, Colors } from './utils/Constants';
import NotasFiscaisView from "./views/NotasFiscaisView";
import NotaFiscalView from "./views/NotaFiscalView";

class NFeMnRApp extends Component{

    componentDidMount(){
        document.body.style.backgroundColor = Colors.MNR_BACKGROUND;
    }

    render(){
        const {fornecedor, usuario} = this.props;
        return (
            <Fragment>
                <Switch>
                    <Route
                        exact path={Routes.MNR_NOTA_FISCAL_LISTA}
                        render={() =>
                            <NotasFiscaisView
                                id_fornecedor={fornecedor}
                                id_usuario={usuario}
                            />
                        }
                    />
                    <Route
                        exact path={Routes.MNR_NOTA_FISCAL}
                        render={({match}) =>
                            <NotaFiscalView
                                id_fornecedor={fornecedor}
                                id_usuario={usuario}
                                id_nota_fiscal={match.params.id}
                            />
                        }
                    />
                </Switch>
            </Fragment>
        )
    }

}

export default NFeMnRApp;