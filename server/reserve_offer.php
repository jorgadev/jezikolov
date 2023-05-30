<?php
require_once "db_connect.php";

$offer_id = $_GET["id"];
$user_id = $_GET["user_id"];

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
