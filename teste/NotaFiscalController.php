<?php

require_once "../util/conexao.php";
require_once "../mnr-api/class/Settings.php";
require_once "../mnr-api/class/Response.php";
require_once "../mnr-api/class/Utils.php";
require_once "NotaFiscalDAO.php";

class NotaFiscalController
{
    private $id_fornecedor;
    private $id_usuario;
    private $id_nota_fiscal;

    public function __construct($id_fornecedor, $id_usuario, $id_nota_fiscal)
    {
        $this->settings();
        $this->id_fornecedor = $id_fornecedor;
        $this->id_usuario = $id_usuario;
        $this->id_nota_fiscal = $id_nota_fiscal;
        $this->response($this->result());
    }

    public function result()
    {
        $dao = new NotaFiscalDAO(new Conexao());

        $result = array();

        $result = array_merge($result, $dao->notaFiscal(
            $this->id_fornecedor,
            $this->id_usuario,
            $this->id_nota_fiscal
        ));

        $result["pedidos"] = $dao->pedidosNotaFiscal(
            $this->id_fornecedor,
            $this->id_usuario,
            $this->id_nota_fiscal
        );

        $result["itens_nao_conferidos_nota"] = $dao->itensNaoConferidosNotaFiscal(
            $this->id_fornecedor,
            $this->id_usuario,
            $this->id_nota_fiscal
        );

        $result["itens_nao_conferidos_pedido"] = $dao->itensNaoConferidosPedido(
            $this->id_fornecedor,
            $this->id_usuario,
            $this->id_nota_fiscal
        );

        $result["itens_conferidos"] = $dao->itensConferidos(
            $this->id_fornecedor,
            $this->id_usuario,
            $this->id_nota_fiscal
        );

        return $result;
    }

    private function settings()
    {
        $settings = new Settings();
        $settings->charset();
        $settings->dateZone();
        $settings->displayErros();
    }

    private function response($result)
    {
        $response = new Response();
        $response->noCache();
        $response->json($result);
    }

}

new NotaFiscalController($_GET["id_fornecedor"], $_GET["id_usuario"], $_GET["id_nota_fiscal"]);