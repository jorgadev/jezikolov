<?php
require_once "db_connect.php";

// Pridobite podatke iz zahtevka
$data = json_decode(file_get_contents("php://input"), true);

// Preverite, ali je prisoten žeton (token)
if (empty($data["token"])) {
  $response = array("message" => "Manjka žeton (token)");
  http_response_code(400); // Nastavi statusni kod na 400 (Nepravilna zahteva)
  echo json_encode($response, JSON_UNESCAPED_UNICODE);
  exit;
}

// Preverite veljavnost žetona
$token = $data["token"];
$sql = "SELECT * FROM users WHERE token = '$token'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  // Žeton je veljaven
  $response = array("message" => "Veljaven žeton");
  echo json_encode($response, JSON_UNESCAPED_UNICODE);
} else {
  // Žeton ni veljaven
  $response = array("message" => "Neveljaven žeton");
  http_response_code(401); // Nastavi statusni kod na 401 (Neavtorizirano)
  echo json_encode($response, JSON_UNESCAPED_UNICODE);
}

// Zaprite povezavo z bazo
$conn->close();
?>