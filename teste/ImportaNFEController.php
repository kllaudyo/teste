<?php

require_once "../util/conexao.php";
require_once "../mnr-api/class/Settings.php";
require_once "../mnr-api/class/Response.php";
require_once "../mnr-api/class/Utils.php";
require_once "NotaFiscalDAO.php";

class ImportaNFEController
{
    private $id_fornecedor;
    private $id_usuario;

    public function __construct($id_fornecedor, $id_usuario)
    {
        $this->id_usuario = $id_usuario;
        $this->id_fornecedor = $id_fornecedor;
        $this->settings();
        $this->response($this->upload());
    }

    private function upload()
    {

        if(strlen(trim($this->id_fornecedor)) === 0)
            return $this->fail();

        if(strlen(trim($this->id_usuario)) === 0)
            return $this->fail();

        if(!isset($_FILES["uploadFileNF"]) || !isset($_FILES["uploadFileNF"]["name"]))
            return $this->fail();

        if(!$_FILES["uploadFileNF"]["error"] === UPLOAD_ERR_OK)
            return $this->fail();

        $file_info = new SplFileInfo($_FILES["uploadFileNF"]["name"]);
        if(strtoupper($file_info->getExtension()) !== "XML")
            return $this->fail();

        $nfe = file_get_contents($_FILES["uploadFileNF"]["tmp_name"]);

        $dao = new NotaFiscalDAO(new Conexao());
        $result = $dao->importar($this->id_fornecedor, $this->id_usuario, $nfe);
        return json_encode($result);

    }

    private function fail()
    {
        return json_encode(array(
            "status" => 0,
            "message" => "Atenção: O arquivo não foi importado!Favor anexar um arquivo válido no formato XML"
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
        $response->html($result);
    }
}

new ImportaNFEController($_POST["id_fornecedor"], $_POST["id_usuario"]);