<?php
require_once "db_connect.php";

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["token"])) {
  $response = array("message" => "Manjka žeton (token)");
  http_response_code(400); // Nastavi statusni kod na 400 (Nepravilna zahteva)
  echo json_encode($response, JSON_UNESCAPED_UNICODE);
  exit;
}

// Preveri veljavnost žetona
$token = $data["token"];
$sql = "SELECT * FROM users WHERE token = '$token'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  $response = array("message" => "Veljaven žeton");
  echo json_encode($response, JSON_UNESCAPED_UNICODE);
} else {
  $response = array("message" => "Neveljaven žeton");
  http_response_code(401); // Nastavi statusni kod na 401 (Neavtorizirano)
  echo json_encode($response, JSON_UNESCAPED_UNICODE);
}

$conn->close();
?>