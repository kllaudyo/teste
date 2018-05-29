import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui';
import {
    AppBar,
    Toolbar,
    Typography,
    Input,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
    TextField
} from 'material-ui';
import AddIcon from 'react-icons/lib/md/add';
import Container from "../components/Container";
import { getNFE } from "../utils/api";
import {Routes, Uris} from "../utils/Constants";

const styles = theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 4,
        right: theme.spacing.unit * 4,
    }
});

class NotasFiscaisView extends Component{

    constructor(props){
        super(props);
        this.state = {
            is_open_dialog:false,
            nfe:[]
        }
    }

    componentDidMount(){
        if(this.iframe)
            if (this.iframe.attachEvent)
                this.iframe.attachEvent("onload", this.handleLoadIframe);
            else
                this.iframe.onload = this.handleLoadIframe;
        this.handleRefresh();
    }

    handleRefresh = () => {
        const {id_fornecedor, id_usuario} = this.props;
        getNFE({id_fornecedor, id_usuario})
            .then(nfe => this.setState({nfe}));
    };

    handleOpenNotaFiscal = id => {
        const { history } = this.props;
        console.log(Routes.MNR_NOTA_FISCAL_LISTA, id, id.toString());
        history.push(`${Routes.MNR_NOTA_FISCAL_LISTA + id.toString()}`);
    };

    handleOpenDialog = () =>
        this.setState({is_open_dialog: true});

    handleCloseDialog = () =>
        this.setState({is_open_dialog: false});

    handleSubmit = () => {
        //if (this.file.value.length > 0)
        this.form.submit();
    };

    handleLoadIframe = e => {
        const doc =
            this.iframe.contentDocument
                ? this.iframe.contentDocument
                : this.iframe.contentWindow.document;
        const result = JSON.parse(doc.body.innerText);

        if(result.status.toString() === "1"){
            this.handleRefresh();
            this.handleCloseDialog();
        }
        alert(result.message);
    };

    render(){
        const { id_fornecedor, id_usuario } = this.props;
        const { nfe, is_open_dialog } = this.state;
        return (
            <Fragment>
                <Dialog
                    fullScreen
                    open={is_open_dialog}
                    aria-labelledby="form-dialog-title"
                    onClose={this.handleCloseDialog}
                >
                    <DialogTitle id="form-dialog-title">
                        Enviar Arquivo XML
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Envie seu arquivo xml aqui
                        </DialogContentText>
                        <form
                            id="uploadFormNF"
                            action={Uris.MNR_URL_IMPORTAR}
                            method="POST"
                            target="uploadIframeNF"
                            enctype="multipart/form-data"
                            ref={form => this.form = form}
                        >
                            <input type="hidden" name="id_fornecedor" value={id_fornecedor} />
                            <input type="hidden" name="id_usuario" value={id_usuario} />
                            <TextField
                                fullWidth
                                ref={file =>this.file = file}
                                type="file"
                                name="uploadFileNF"
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={()=>this.handleSubmit()} color="primary">
                            Importar
                        </Button>
                    </DialogActions>
                </Dialog>
                <AppBar position="fixed" color="default">
                    <Toolbar>
                        <Typography style={{flex:1}} variant="title" color="inherit">
                            Notas Fiscais
                        </Typography>
                        <Input
                            placeholder="Pesquisar Número Nota fiscal..."
                            disableUnderline
                        />
                    </Toolbar>
                </AppBar>
                <Container>
                    <iframe
                        name="uploadIframeNF"
                        id="uploadIframeNF"
                        ref={iframe => this.iframe = iframe}
                        style={{height:0, width:0, border:'none'}}
                    />
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Número</TableCell>
                                    <TableCell>Comprador</TableCell>
                                    <TableCell>Emissão</TableCell>
                                    <TableCell>Chave</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {nfe.map( (nf, k) =>
                                    <TableRow
                                        key={k}
                                        hover
                                        onClick={()=> this.handleOpenNotaFiscal(nf.id_nota_fiscal)}
                                    >
                                        <TableCell>
                                            {nf.nr_nota_fiscal}
                                        </TableCell>
                                        <TableCell>
                                            {nf.nm_razao_social}
                                        </TableCell>
                                        <TableCell>
                                            {`${nf.dt_emissao} ${nf.hr_emissao}`}
                                        </TableCell>
                                        <TableCell>
                                            {nf.hs_nota_fiscal.substr(3)}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Paper>
                </Container>
                <Button
                    variant="fab"
                    onClick={this.handleOpenDialog}
                    className={this.props.classes.fab}
                    color={"primary"}
                >
                    <AddIcon />
                </Button>
            </Fragment>
        )
    }
}

export default withRouter(withStyles(styles)(NotasFiscaisView));