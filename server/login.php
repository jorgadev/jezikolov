<?php
require_once "db_connect.php";

$data = json_decode(file_get_contents("php://input"), true);

// Preveri vrednosti
if (empty($data["email"]) || empty($data["password"])) {
  $response = array("message" => "Vnesite e-pošto in geslo");
  http_response_code(400); // Nastavi statusni kod na 400 (Nepravilna zahteva)
  echo json_encode($response, JSON_UNESCAPED_UNICODE);
  exit;
}

// Preveri ali uporabnik obstaja v bazi
$email = $data["email"];
$password = $data["password"];
$sql = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $hashedPassword = $row["password"];

  // Preveri pravilnost gesla
  if (password_verify($password, $hashedPassword)) {
  
    // Odstrani geslo iz vrstice
    unset($row['password']);
    $token = $row["token"];
    $response = array("message" => "Prijava uspešna", "user" => $row);
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
  } else {
    $response = array("message" => "Neveljaven e-poštni naslov ali geslo");
    http_response_code(401); 
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
  }
} else {
  $response = array("message" => "Neveljaven e-poštni naslov ali geslo");
  http_response_code(401); 
  echo json_encode($response, JSON_UNESCAPED_UNICODE);
}

$conn->close();
?>
