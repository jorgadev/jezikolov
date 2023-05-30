<?php
require_once "db_connect.php";

// Pridobite žeton iz zahtevka
$token = $_GET["token"];

// Preverite veljavnost žetona
$sql = "SELECT * FROM users WHERE token = '$token'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // Žeton je veljaven, pridobite podatke uporabnika
  $user = $result->fetch_assoc();

  // Odstranite geslo iz podatkov uporabnika
  unset($user["password"]);

  // Vrnite podatke uporabnika kot odgovor
  echo json_encode($user, JSON_UNESCAPED_UNICODE);
} else {
  // Žeton ni veljaven
  $response = array("message" => "Neveljaven žeton");
  http_response_code(401); // Nastavi statusni kod na 401 (Neavtoriziran dostop)
  echo json_encode($response, JSON_UNESCAPED_UNICODE);
}

// Zaprite povezavo z bazo
$conn->close();
?>