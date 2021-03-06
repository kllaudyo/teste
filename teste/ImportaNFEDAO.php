<?php

class ImportaNFEDAO
{
    private $database_connection;
    public function __construct(Conexao $conexao)
    {
        $conexao->conectar();
        $this->database_connection = $conexao->conexao;
    }

    public function listar($id_fornecedor, $id_usuario)
    {
        $database_query = "begin listar_nfe(:rs,:id_fornecedor, :id_usuario); end;";
        $database_statement = oci_parse($this->database_connection, $database_query);
        $database_cursor = oci_new_cursor($this->database_connection);

        oci_bind_by_name($database_statement, ":rs", $database_cursor, -1, OCI_B_CURSOR);
        oci_bind_by_name($database_statement, ":id_fornecedor", $id_fornecedor);
        oci_bind_by_name($database_statement, ":id_usuario", $id_usuario);
        oci_execute($database_statement);
        oci_execute($database_cursor, OCI_DEFAULT);

        $database_result = array();
        while($database_row = oci_fetch_array($database_cursor, OCI_ASSOC + OCI_RETURN_NULLS))
        {
            Utils::to_utf8($database_row);
            array_push($database_result, array_change_key_case($database_row, CASE_LOWER));
        }

        return $database_result;
    }

//    public function importar($id_fornecedor, $id_usuario, $id_pedido, $nfe_content)
//    {
//        $database_query = "begin salvar_nfe(:rs,:id_fornecedor, :id_usuario, :id_pedido, xmltype(:nfe)); end;";
//        $database_statement = oci_parse($this->database_connection, $database_query);
//        $database_cursor = oci_new_cursor($this->database_connection);
//
//        oci_bind_by_name($database_statement, ":rs", $database_cursor, -1, OCI_B_CURSOR);
//        oci_bind_by_name($database_statement, ":id_fornecedor", $id_fornecedor);
//        oci_bind_by_name($database_statement, ":id_usuario", $id_usuario);
//        oci_bind_by_name($database_statement, ":id_pedido", $id_pedido);
//        oci_bind_by_name($database_statement, ":nfe", $nfe_content);
//        oci_execute($database_statement);
//        oci_execute($database_cursor, OCI_DEFAULT);
//
//        $database_result = array();
//        while($database_row = oci_fetch_array($database_cursor, OCI_ASSOC + OCI_RETURN_NULLS))
//        {
//            Utils::to_utf8($database_row);
//            array_push($database_result, $database_row);
//        }
//
//        return $database_result[0];
//    }

    public function importar($id_fornecedor, $id_usuario, $nfe_content)
    {
        $database_query = "begin salvar_nfe(:rs,:id_fornecedor, :id_usuario, xmltype(:nfe)); end;";
        $database_statement = oci_parse($this->database_connection, $database_query);
        $database_cursor = oci_new_cursor($this->database_connection);

        oci_bind_by_name($database_statement, ":rs", $database_cursor, -1, OCI_B_CURSOR);
        oci_bind_by_name($database_statement, ":id_fornecedor", $id_fornecedor);
        oci_bind_by_name($database_statement, ":id_usuario", $id_usuario);
        oci_bind_by_name($database_statement, ":nfe", $nfe_content);
        oci_execute($database_statement);
        oci_execute($database_cursor, OCI_DEFAULT);

        $database_result = array();
        while($database_row = oci_fetch_array($database_cursor, OCI_ASSOC + OCI_RETURN_NULLS))
        {
            Utils::to_utf8($database_row);
            array_push($database_result, $database_row);
        }

        return $database_result[0];
    }

}