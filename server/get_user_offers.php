<?php
require_once "db_connect.php";

$user_id = $_GET["user_id"];

// Pridobi ponudbe uporabnika
$query = "SELECT language_exchange.*, users.username 
          FROM language_exchange 
          JOIN users ON language_exchange.user_id = users.id 
          WHERE user_id = '$user_id'";
$result = mysqli_query($conn, $query);

if ($result) {
  $offers = array();

  if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
      $offers[] = $row;
    }
  }

  echo json_encode($offers);
} else {
  http_response_code(500);
  echo "Napaka pri pridobivanju ponudb: " . mysqli_error($conn);
}

$conn->close();
?>