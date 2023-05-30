<?php
require_once "db_connect.php";

// Pridobite podatke iz zahtevka
$offer_id = $_GET["id"];

// Posodobite stanje rezervacije na 0
$query = "UPDATE language_exchange SET is_reserved = 0 WHERE id = $offer_id";
$result = mysqli_query($conn, $query);

// Preverite, ali je posodobitev uspešna
if ($result) {
  http_response_code(200);
  echo "Rezervacija je bila uspešno odpovedana.";
} else {
  http_response_code(500);
  echo "Napaka pri odpovedi rezervacije.";
}

$conn->close();
?>