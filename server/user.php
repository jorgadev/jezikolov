<?php
require_once "db_connect.php";

$token = $_GET["token"];

$sql = "SELECT * FROM users WHERE token = '$token'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $user = $result->fetch_assoc();

  unset($user["password"]);

  echo json_encode($user, JSON_UNESCAPED_UNICODE);
} else {
  $response = array("message" => "Neveljaven žeton");
  http_response_code(401); 
  echo json_encode($response, JSON_UNESCAPED_UNICODE);
}

$conn->close();
?>