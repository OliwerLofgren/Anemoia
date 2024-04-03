<?php
function sendJSON($data, $status_code = 200){
    http_response_code($status_code);
    $json = json_encode($data);
    echo $json;
    exit();
}

function removeDir($dir) {
    // Get all files and directories within the given directory
    // Glob Find pathnames matching a pattern
    // "my_photos/photos_" . (id) . /*
    $files = glob($dir . '/*');
    // Loop through each file/directory
    foreach ($files as $file) {
        if (is_file($file)) {
            // If it's a file, delete it
            unlink($file);
        } 
    }
    // Remove the empty directory
    rmdir($dir);
}
?>