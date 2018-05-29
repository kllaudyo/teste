import React, {Component, Fragment} from 'react';
import { AppBar, Toolbar, Typography, Input, Grid } from 'material-ui';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'react-icons/lib/md/arrow-drop-down';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            itens:[],
            itens_nota_fiscal:[
                {"cd_peca":"54444 MON","nm_peca":"AMORTECEDOR","qt_item":4,"vl_item":104},
                {"cd_peca":"HF472C","nm_peca":"DISCO FREIO","qt_item":2,"vl_item":108.04},
                {"cd_peca":"L551NA","nm_peca":"LONA FREIO","qt_item":1,"vl_item":104},
                {"cd_peca":"R3063 REI","nm_peca":"SUPORTE ROLAMENTO CENTRAL","qt_item":1,"vl_item":178.36}
            ]
        }
    }

    componentDidMount(){
        document.body.style.backgroundColor="#e9e9e9";
        this.setState({
            itens:[
                {"id_item_nota_fiscal":1,"id_pedido":14995823,"id_entrega":90,"id_produto":31715,"cd_produto":"00000001937","nm_produto":"LONA FREIO AR DIANTEIRO STD OF-1318 L552","id_peca":1,"cd_peca":"L552NA","nm_peca":"LONA FREIO","vl_item_pedido":11.25,"vl_item":90,"qt_pedido":8,"qt_item":1,"cs_status":"P"},
                {"id_item_nota_fiscal":3,"id_pedido":14995823,"id_entrega":90,"id_produto":32743,"cd_produto":"00000003003","nm_produto":"LONA FREIO AR TRASEIRO STD L227NA OF-1620","id_peca":3,"cd_peca":"L227NA","nm_peca":"LONA FREIO","vl_item_pedido":16.75,"vl_item":134,"qt_pedido":80,"qt_item":10,"cs_status":"P"},
                {"id_item_nota_fiscal":4,"id_pedido":14995823,"id_entrega":90,"id_produto":34186,"cd_produto":"00000004701","nm_produto":"CHAVE SETA 01.9120.80 KOSTAL OF-1620","id_peca":4,"cd_peca":"1912080","nm_peca":"CHAVE SETA","vl_item_pedido":125,"vl_item":125,"qt_pedido":2,"qt_item":2,"cs_status":"C"},
                {"id_item_nota_fiscal":5,"id_pedido":14995823,"id_entrega":90,"id_produto":34638,"cd_produto":"00000005161","nm_produto":"ELEMENTO FILTRANTE HU931/5X OF-1417/99","id_peca":5,"cd_peca":"HU931/5X","nm_peca":"FILTRO LUBRIF","vl_item_pedido":15.62,"vl_item":15.62,"qt_pedido":6,"qt_item":6,"cs_status":"C"},
                {"id_item_nota_fiscal":6,"id_pedido":14995823,"id_entrega":90,"id_produto":34660,"cd_produto":"00000005183","nm_produto":"ARTICULADOR ROSCA ESQUERDO CAIXA ZF S5-680 N0968","id_peca":6,"cd_peca":"N968","nm_peca":"TERMINAL CAMBIO ZF 56MM LE","vl_item_pedido":44,"vl_item":44,"qt_pedido":1,"qt_item":1,"cs_status":"C"},
                {"id_item_nota_fiscal":7,"id_pedido":14995823,"id_entrega":90,"id_produto":34959,"cd_produto":"00000005514","nm_produto":"FILTRO DIESEL WK1060/4 OF-1417/1721","id_peca":7,"cd_peca":"WK1060/4","nm_peca":"FILTRO SEPARADOR AGUA","vl_item_pedido":51.21,"vl_item":51.21,"qt_pedido":5,"qt_item":5,"cs_status":"C"},
                {"id_item_nota_fiscal":8,"id_pedido":14995823,"id_entrega":90,"id_produto":35101,"cd_produto":"00000005664","nm_produto":"CRUZETA CARDAN 1418 CZ271 STHAL OF-1721","id_peca":8,"cd_peca":"CZ271","nm_peca":"CRUZETA CARDAN","vl_item_pedido":46,"vl_item":46,"qt_pedido":1,"qt_item":1,"cs_status":"C"},
                {"id_item_nota_fiscal":9,"id_pedido":14995823,"id_entrega":90,"id_produto":35184,"cd_produto":"00000005751","nm_produto":"MANCAL DIANT MOTOR PARTIDA DELCO REMY 29","id_peca":9,"cd_peca":"10515825","nm_peca":"MANCAL ACIONAMENTO MOTOR PART","vl_item_pedido":120,"vl_item":120,"qt_pedido":1,"qt_item":1,"cs_status":"C"},
                {"id_item_nota_fiscal":11,"id_pedido":14995823,"id_entrega":90,"id_produto":35611,"cd_produto":"00000006203","nm_produto":"REGULADOR VOLTAGEM 28V OF-1417","id_peca":11,"cd_peca":"1197311300","nm_peca":"REGULADOR VOLT","vl_item_pedido":185,"vl_item":185,"qt_pedido":1,"qt_item":1,"cs_status":"C"},
                {"id_item_nota_fiscal":12,"id_pedido":14995823,"id_entrega":90,"id_produto":293149,"cd_produto":"00000006713","nm_produto":"CRUZETA TRANSMISSAO CZ256 STAHL LO-814","id_peca":12,"cd_peca":"CZ256","nm_peca":"CRUZETA CARDAN","vl_item_pedido":35,"vl_item":35,"qt_pedido":3,"qt_item":1,"cs_status":"P"},
                {"id_item_nota_fiscal":13,"id_pedido":14995823,"id_entrega":90,"id_produto":214770,"cd_produto":"00000006927","nm_produto":"BARRA LONGA DIRECAO N5197 OF- 1417 / 1721","id_peca":13,"cd_peca":"N5197","nm_peca":"BARRA DIR","vl_item_pedido":322,"vl_item":322,"qt_pedido":1,"qt_item":1,"cs_status":"C"},
                {"id_item_nota_fiscal":14,"id_pedido":14995823,"id_entrega":90,"id_produto":403038,"cd_produto":"00000007682","nm_produto":"AMORTECEDOR TRASEIRO 45136 OF-1721 1722","id_peca":14,"cd_peca":"65458 MON","nm_peca":"AMORTECEDOR","vl_item_pedido":175,"vl_item":175,"qt_pedido":2,"qt_item":2,"cs_status":"C"},
                {"id_item_nota_fiscal":15,"id_pedido":14995823,"id_entrega":90,"id_produto":684131,"cd_produto":"00000008239","nm_produto":"BUJAO ROSCADO LATAO 22MM VALVULA PU","id_peca":15,"cd_peca":"0009970934","nm_peca":"BUJAO ROSCADO VALV APU","vl_item_pedido":6.3,"vl_item":6.3,"qt_pedido":5,"qt_item":5,"cs_status":"C"},
                {"id_item_nota_fiscal":17,"id_pedido":14995823,"id_entrega":90,"id_produto":639761,"cd_produto":"00000009263","nm_produto":"CHAVE SETA MODERNA","id_peca":17,"cd_peca":"10021123","nm_peca":"CHAVE SETA","vl_item_pedido":169,"vl_item":169,"qt_pedido":3,"qt_item":3,"cs_status":"C"},
                {"id_item_nota_fiscal":18,"id_pedido":14995823,"id_entrega":90,"id_produto":693686,"cd_produto":"00000009369","nm_produto":"PASTILHA FREIO DIANTEIRO LO-915 RCPT 04500","id_peca":18,"cd_peca":"P117NA","nm_peca":"PASTILHA FREIO","vl_item_pedido":63,"vl_item":63,"qt_pedido":2,"qt_item":2,"cs_status":"C"},
                {"id_item_nota_fiscal":20,"id_pedido":14995823,"id_entrega":90,"id_produto":2488485,"cd_produto":"00000010107","nm_produto":"ROLAMENTO ALTERNADOR FAG","id_peca":20,"cd_peca":"B1799T1XDDG","nm_peca":"ROLAMENTO ALT","vl_item_pedido":25,"vl_item":25,"qt_pedido":2,"qt_item":2,"cs_status":"C"}
                ]
        })
    }

    renderList = (title, itens) =>
        <Fragment>
            <Typography
                style={{flex:1, padding:15}}
                variant="subheading"
                color="inherit">
                {title}
            </Typography>
            {itens.map(this.renderItem)}
        </Fragment>;

    renderItem = ({cd_peca, nm_peca, cd_produto, nm_produto, qt_item, qt_pedido, vl_item, vl_item_pedido}) =>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid item xs={12}>
                    <Grid
                        container
                        spacing={16}
                        alignItems="center"
                        justify="space-between">
                        <Grid item xs={1}>
                            <Typography >{cd_peca}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography >{nm_peca}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography >{qt_item}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography >{vl_item}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography >{cd_produto}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography >{nm_produto}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography >{qt_pedido}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography >{vl_item_pedido}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>;

    render() {
        const { itens } = this.state;
        return (
            <Fragment>
                <AppBar position="fixed" color="default">
                    <Toolbar>
                        <Typography style={{flex:1}}  variant="title" color="inherit">
                            Número Nota Fiscal
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
                <div style={{paddingTop:60, marginLeft:100, marginRight:100}}>
                    {this.renderList("Itens Conferidos", itens.filter(({cs_status}) => cs_status === "C"))}
                    {this.renderList("Itens Pendentes", itens.filter(({cs_status}) => cs_status === "P"))}
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography
                                style={{flex:1, padding:15}}
                                variant="subheading"
                                color="inherit">
                                Itens não conferidos
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography
                                style={{flex:1, padding:15}}
                                variant="subheading"
                                color="inherit">
                                Nota Fiscal
                            </Typography>

                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                style={{flex:1, padding:15}}
                                variant="subheading"
                                color="inherit">
                                Pedidos
                            </Typography>

                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        );
    }
}

export default App;
