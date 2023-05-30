<?php
require_once "db_connect.php";

$data = json_decode(file_get_contents("php://input"), true);

$offer_id = $data["id"];
$user_id = $data["user_id"];

$query = "UPDATE language_exchange SET is_reserved = '$user_id' WHERE id = '$offer_id'";
$result = mysqli_query($conn, $query);

if ($result) {
  echo "Ponudba je bila uspešno rezervirana.";
} else {
  http_response_code(500);
  echo "Napaka pri rezervaciji ponudbe.";
}

$conn->close();
?>
