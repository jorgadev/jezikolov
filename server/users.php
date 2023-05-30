<?php
require_once "db_connect.php";

$user_id = $_GET["user_id"];

$query = "SELECT id, username, email FROM users WHERE id <> '$user_id'";
$result = mysqli_query($conn, $query);

if ($result) {
  $availableUsers = array();

  if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
      $availableUsers[] = $row;
    }
  }

  echo json_encode($availableUsers);
} else {
  http_response_code(500);
  echo "Napaka pri pridobivanju razpoložljivih uporabnikov: " . mysqli_error($conn);
}

$conn->close();
?>
