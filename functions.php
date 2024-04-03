<?php
function sendJSON($data, $status_code = 200){
    http_response_code($status_code);
    $json = json_encode($data);
    echo $json;
    exit();
}

?>