<?php
require_once "db_connect.php";

$data = json_decode(file_get_contents("php://input"), true);

$offer_id = $data["offerId"];

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
