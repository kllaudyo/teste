<?php

require_once "../util/conexao.php";
require_once "../mnr-api/class/Settings.php";
require_once "../mnr-api/class/Response.php";
require_once "../mnr-api/class/Utils.php";
require_once "NotaFiscalDAO.php";

class ListaNFEController
{
    private $id_fornecedor;
    private $id_usuario;

    public function __construct($id_fornecedor, $id_usuario)
    {
        $this->id_usuario = $id_usuario;
        $this->id_fornecedor = $id_fornecedor;
        $this->settings();
        $this->response($this->listar());
    }

    private function listar()
    {
        if(strlen(trim($this->id_fornecedor)) === 0)
            return $this->fail();

        if(strlen(trim($this->id_usuario)) === 0)
            return $this->fail();

        $dao = new NotaFiscalDAO(new Conexao());
        return $dao->listar($this->id_fornecedor, $this->id_usuario);
    }

    private function fail()
    {
        return json_encode(array(
            "status" => 0,
            "message" => "Atenção: parametros inválidos $this->id_usuario - $this->id_fornecedor"
        ));
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

new ListaNFEController($_GET["id_fornecedor"], $_GET["id_usuario"]);