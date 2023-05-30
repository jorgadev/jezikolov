<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "jezikolov_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  http_response_code(500); // Napaka na strežniku
  die("Napaka pri povezavi z bazo: " . $conn->connect_error);
}

?>
