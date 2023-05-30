<?php
require_once "db_connect.php";

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data["user_id"];
$rated_user_id = $data["rated_user_id"];
$rating = $data["rating"];

if (empty($user_id) || empty($rated_user_id) || empty($rating)) {
  http_response_code(400);
  echo "Manjkajo obvezni podatki za oceno.";
  exit();
}

$query = "SELECT * FROM ratings WHERE user_id = '$user_id' AND rated_user_id = '$rated_user_id'";
$result = mysqli_query($conn, $query);

if ($result) {
  // Preveri ali je že prisotna ocena
  if (mysqli_num_rows($result) > 0) {
    // Posodobi obstoječo oceno
    $updateQuery = "UPDATE ratings SET rating = '$rating' WHERE user_id = '$user_id' AND rated_user_id = '$rated_user_id'";
    $updateResult = mysqli_query($conn, $updateQuery);

    if ($updateResult) {
      echo "Ocena je bila posodobljena.";
    } else {
      http_response_code(500);
      echo "Napaka pri posodabljanju ocene: " . mysqli_error($conn);
    }
  } else {
    // Vstavi novo oceno
    $insertQuery = "INSERT INTO ratings (user_id, rated_user_id, rating) VALUES ('$user_id', '$rated_user_id', '$rating')";
    $insertResult = mysqli_query($conn, $insertQuery);

    if ($insertResult) {
      echo "Ocena je bila vstavljena.";
    } else {
      http_response_code(500);
      echo "Napaka pri vstavljanju ocene: " . mysqli_error($conn);
    }
  }
} else {
  http_response_code(500);
  echo "Napaka pri preverjanju ocene: " . mysqli_error($conn);
}

$conn->close();
?>