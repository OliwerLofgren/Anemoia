<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_FILES["upload"])) {
        $tmp_name = $_FILES["upload"]["tmp_name"];
        $name = $_FILES["upload"]["name"];
        $upload_folder = "./uploads/";

        
        if (!is_dir($upload_folder)) {
            mkdir($upload_folder, 0755, true);
        }

        $destination = $upload_folder . $name;

        if (move_uploaded_file($tmp_name, $destination)) {
            updateJson();
            echo json_encode(["message" => "File uploaded successfully", "file_path" => $destination]);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Unable to upload file"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "No file uploaded"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
}

function updateJson() {
    $filename = "./users.json"; 
    $json = json_decode(file_get_contents($filename), true);
    
    foreach ($json as &$obj) {
       
        if (isset($obj["upload"])) {
            $obj["upload"] = "true";
            break; 
        }
    }
    
    file_put_contents($filename, json_encode($json, JSON_PRETTY_PRINT));
}



?>
