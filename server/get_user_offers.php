<?php
require_once "db_connect.php";

// Pridobite podatke iz zahtevka
$user_id = $_GET["user_id"];

// Izvedite poizvedbo za pridobitev ponudb uporabnika
$query = "SELECT language_exchange.*, users.username 
          FROM language_exchange 
          JOIN users ON language_exchange.user_id = users.id 
          WHERE user_id = '$user_id'";
$result = mysqli_query($conn, $query);

// Preverite, ali je poizvedba uspešna
if ($result) {
  // Ustvarite prazen seznam za shranjevanje ponudb
  $offers = array();

  // Preverite, ali rezultat vsebuje vrstice
  if (mysqli_num_rows($result) > 0) {
    // Obdelajte vrstice rezultata poizvedbe
    while ($row = mysqli_fetch_assoc($result)) {
      // Dodajte ponudbo v seznam
      $offers[] = $row;
    }
  }

  // Vrnite seznam ponudb v obliki JSON
  echo json_encode($offers);
} else {
  // Poizvedba ni uspela
  http_response_code(500);
  echo "Napaka pri pridobivanju ponudb: " . mysqli_error($conn);
}

$conn->close();
?>