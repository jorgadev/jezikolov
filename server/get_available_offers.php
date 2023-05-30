<?php
require_once "db_connect.php";

$user_id = $_GET["user_id"];

// Pridobi razpoložljive ponudbe
$query = "SELECT language_exchange.*, users.username 
          FROM language_exchange 
          JOIN users ON language_exchange.user_id = users.id 
          WHERE user_id <> '$user_id'";
$result = mysqli_query($conn, $query);

if ($result) {
  $availableOffers = array();

  if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
      $availableOffers[] = $row;
    }
  }

  echo json_encode($availableOffers);
} else {
  http_response_code(500);
  echo "Napaka pri pridobivanju razpoložljivih ponudb: " . mysqli_error($conn);
}

$conn->close();
?>
