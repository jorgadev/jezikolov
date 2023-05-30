<?php
require_once "db_connect.php";

$offer_id = $_GET["id"];

$query = "DELETE FROM language_exchange WHERE id = $offer_id";
$result = mysqli_query($conn, $query);

if ($result) {
  http_response_code(200);
  echo "Ponudba je bila uspešno odstranjena.";
} else {
  http_response_code(500);
  echo "Napaka pri odstranjevanju ponudbe: " . mysqli_error($conn);
}

$conn->close();
?>
