<?php
require_once "db_connect.php";

// Pridobite podatke iz zahtevka
$offer_id = $_GET["id"];

// Izvedite poizvedbo za odstranjevanje ponudbe
$query = "DELETE FROM language_exchange WHERE id = $offer_id";
$result = mysqli_query($conn, $query);

// Preverite, ali je poizvedba uspešna
if ($result) {
  // Vrne odgovor s statusom 200 (Uspešno)
  http_response_code(200);
  echo "Ponudba je bila uspešno odstranjena.";
} else {
  // Napaka pri odstranjevanju ponudbe
  // Vrne odgovor s statusom 500 (Napaka na strežniku)
  http_response_code(500);
  echo "Napaka pri odstranjevanju ponudbe: " . mysqli_error($conn);
}

// Zapiranje povezave z bazo podatkov
$conn->close();
?>
