<?php
require_once "db_connect.php";

$offer_id = $_GET["id"];

$query = "UPDATE language_exchange SET is_reserved = 0 WHERE id = $offer_id";
$result = mysqli_query($conn, $query);

if ($result) {
  http_response_code(200);
  echo "Rezervacija je bila uspešno odpovedana.";
} else {
  http_response_code(500);
  echo "Napaka pri odpovedi rezervacije.";
}

$conn->close();
?>