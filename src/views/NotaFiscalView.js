import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui';
import {
    Typography,
    AppBar,
    Toolbar,
    Input,
    Button,
    IconButton,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableCell,
    TableRow,
    TableBody,
    Checkbox
} from 'material-ui';
import ArrowBack from 'react-icons/lib/md/arrow-back';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AddIcon from 'react-icons/lib/md/add';
import ConferidoLista from '../components/ConferidoLista';
import ContestadoLista from '../components/ContestadoLista';
import Container from "../components/Container";
import { Routes } from "../utils/Constants";
import {getItens} from "../utils/api";

const styles = theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 4,
        right: theme.spacing.unit * 4,
    },
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        margin: theme.spacing.unit / 2,
        backgroundColor: "#ccc"
    },
});

class NotaFiscalView extends Component{

    constructor(props){
        super(props);
        this.state = {
            nr_nota_fiscal:null,
            id_comprador:0,
            pedidos:[],
            itens:[],
            itens_nota_fiscal:[],
            itens_pedido:[]
        }
    }

    componentDidMount(){
        const { id_nota_fiscal, id_fornecedor, id_usuario } = this.props;
        getItens({id_nota_fiscal, id_fornecedor, id_usuario})
            .then( ({ id_comprador, pedidos, nr_nota_fiscal, itens_conferidos, itens_nao_conferidos_nota, itens_nao_conferidos_pedido}) =>
                this.setState({
                    nr_nota_fiscal,
                    id_comprador,
                    pedidos,
                    itens: itens_conferidos,
                    itens_nota_fiscal: itens_nao_conferidos_nota,
                    itens_pedido: itens_nao_conferidos_pedido
                })
            );
    }

    render(){
        const { classes } = this.props;
        const { nr_nota_fiscal, itens, itens_nota_fiscal, itens_pedido, pedidos } = this.state;
        return (
            <Fragment>

                <Dialog
                    open={true}
                >
                    <DialogTitle>
                        Pedidos
                    </DialogTitle>
                    <DialogContent>
                        <Input
                            placeholder="Pesquisar por Número do pedido..."
                            fullWidth
                        />
                        <Table>
                            <TableBody>
                                <TableRow
                                    hover
                                    selected={false}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={false} />
                                    </TableCell>
                                    <TableCell>
                                        Teste
                                    </TableCell>
                                    <TableCell>
                                        Teste
                                    </TableCell>
                                    <TableCell>
                                        Teste
                                    </TableCell>
                                    <TableCell>
                                        Teste
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    hover
                                    selected={false}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={false} />
                                    </TableCell>
                                    <TableCell>
                                        Teste
                                    </TableCell>
                                    <TableCell>
                                        Teste
                                    </TableCell>
                                    <TableCell>
                                        Teste
                                    </TableCell>
                                    <TableCell>
                                        Teste
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    hover
                                    selected={true}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={true} />
                                    </TableCell>
                                    <TableCell>
                                        Teste
                                    </TableCell>
                                    <TableCell>
                                        Teste
                                    </TableCell>
                                    <TableCell>
                                        Teste
                                    </TableCell>
                                    <TableCell>
                                        Teste
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary">Cancelar</Button>
                        <Button color="primary">Associar</Button>
                    </DialogActions>
                </Dialog>

                <AppBar position="fixed" color="default">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            component={Link}
                            to={Routes.MNR_NOTA_FISCAL_LISTA}
                        >
                            <ArrowBack/>
                        </IconButton>
                        <Typography style={{flex:1}}  variant="title" color="inherit">
                            {nr_nota_fiscal}
                        </Typography>
                        <Input
                            placeholder="Pesquisar Item..."
                            disableUnderline
                            inputProps={{
                                style:{
                                    borderWidth:4,
                                    borderColor:'red'
                                }
                            }}
                        />
                    </Toolbar>
                </AppBar>
                <Container>
                    <Fragment>
                        {pedidos.map(pedido =>
                            <Chip
                                className={classes.chip}
                                label={pedido.nr_pedido_cliente}
                                onDelete={()=>alert(pedido.id_pedido)}
                            />
                        )}
                    </Fragment>
                    <DragDropContextProvider backend={HTML5Backend}>
                        <ContestadoLista
                            title={"Itens Não Conferidos"}
                            itens_nota_fiscal={itens_nota_fiscal}
                            itens_pedido={itens_pedido}
                        />
                    </DragDropContextProvider>
                    <ConferidoLista
                        title={"Itens Conferidos"}
                        itens={itens.filter(({cs_status}) => cs_status === "C")}
                    />
                    <ConferidoLista
                        title={"Itens Parciais"}
                        itens={itens.filter(({cs_status}) => cs_status === "P")}
                    />
                </Container>
                <Button
                    variant="fab"
                    className={classes.fab}
                    color={"primary"}
                >
                    <AddIcon />
                </Button>
            </Fragment>
        );
    }
}

export default withStyles(styles)(NotaFiscalView);