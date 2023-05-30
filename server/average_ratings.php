<?php
require_once "db_connect.php";

$query = "SELECT rated_user_id, AVG(rating) AS average_rating FROM ratings GROUP BY rated_user_id";
$result = mysqli_query($conn, $query);

if ($result) {
  $averageRatings = array();

  if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
      $averageRatings[$row['rated_user_id']] = $row['average_rating'];
    }
  }

  echo json_encode($averageRatings);
} else {
  http_response_code(500);
  echo "Napaka pri pridobivanju povprečnih ocen: " . mysqli_error($conn);
}

$conn->close();
?>
