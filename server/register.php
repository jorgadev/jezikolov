<?php
require_once "db_connect.php";

// Pridobite podatke iz zahtevka
$data = json_decode(file_get_contents("php://input"), true);

// Preverite, ali so vse zahtevane vrednosti prisotne
if (empty($data["username"]) || empty($data["email"]) || empty($data["password"])) {
  $response = array("message" => "Vnesite vse zahtevane podatke");
  http_response_code(400); // Nastavi statusni kod na 400 (Nepravilna zahteva)
  echo json_encode($response, JSON_UNESCAPED_UNICODE);
  exit;
}

// Preverite, ali je e-poštni naslov veljaven
if (!filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
  $response = array("message" => "Neveljaven e-poštni naslov");
  http_response_code(400); // Nastavi statusni kod na 400 (Nepravilna zahteva)
  echo json_encode($response, JSON_UNESCAPED_UNICODE);
  exit;
}

// Preverite, ali uporabnik že obstaja v bazi
$username = $data["username"];
$email = $data["email"];
$sql = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  $response = array("message" => "Uporabnik s tem e-mail naslovom že obstaja");
  http_response_code(409); // Nastavi statusni kod na 409 (Konflikt)
  echo json_encode($response, JSON_UNESCAPED_UNICODE);
  exit;
}

// Preveri dolžino gesla
$password = $data["password"];
if (strlen($password) < 8) {
  $response = array("message" => "Geslo mora vsebovati vsaj 8 znakov");
  http_response_code(400); // Nastavi statusni kod na 400 (Nepravilna zahteva)
  echo json_encode($response, JSON_UNESCAPED_UNICODE);
  exit;
}

// Varno shranite geslo (npr. s hashiranjem)
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Generirajte žeton (token) za uporabnika
$token = bin2hex(random_bytes(32));

// Vstavite uporabnika in žeton v bazo
$sql = "INSERT INTO users (username, email, password, token) VALUES ('$username', '$email', '$hashedPassword', '$token')";
if ($conn->query($sql) === TRUE) {
  // Pridobite podrobnosti o uporabniku iz baze
  $query = "SELECT * FROM users WHERE email = '$email'";
  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    unset($user['password']);
    $response = array("message" => "Registracija uspešna", "user" => $user);
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
  } else {
    $response = array("message" => "Napaka pri pridobivanju podrobnosti o uporabniku");
    http_response_code(500); // Nastavi statusni kod na 500 (Notranja napaka strežnika)
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
  }
} else {
  $response = array("message" => "Napaka pri registraciji: " . $conn->error);
  http_response_code(500); // Nastavi statusni kod na 500 (Notranja napaka strežnika)
  echo json_encode($response, JSON_UNESCAPED_UNICODE);
}

// Zaprite povezavo z bazo
$conn->close();
?>
