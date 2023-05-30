<?php
require_once "db_connect.php";

// Pridobite podatke iz zahtevka
$offer_id = $_GET["id"];
$user_id = $_GET["user_id"];

// Posodobite stanje ponudbe na rezervirano
$query = "UPDATE language_exchange SET is_reserved = '$user_id' WHERE id = '$offer_id'";
$result = mysqli_query($conn, $query);

// Preverite, ali je posodobitev uspešna
if ($result) {
  echo "Ponudba je bila uspešno rezervirana.";
} else {
  http_response_code(500);
  echo "Napaka pri rezervaciji ponudbe.";
}

$conn->close();
?>
