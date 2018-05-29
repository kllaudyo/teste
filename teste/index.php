<?php
    require_once "../util/Util.php";
    session_start();
    Util::SessionASP2PHP();
    $id_usuario = $_SESSION["usuario"];
    $id_fornecedor = $_SESSION["id"];
?>
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><meta name="theme-color" content="#000000"><link rel="manifest" href="/manifest.json"><link rel="shortcut icon" href="/favicon.ico"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"><title>React App</title></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root" data-fornecedor="<?php echo $id_fornecedor;?>" data-usuario="<?php echo $id_usuario;?>"></div><script type="text/javascript" src="static/js/main.f2d4b7bb.js"></script></body></html>