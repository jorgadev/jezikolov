<?php
require_once "db_connect.php";

// Pridobite podatke iz zahtevka
$data = json_decode(file_get_contents("php://input"), true);

// Pridobitev podatkov iz obrazca
$nativeLanguage = $data['nativeLanguage'];
$learningLanguage = $data['learningLanguage'];
$availabilityDate = $data['availabilityDate'];
$availabilityTime = $data['availabilityTime'];
$description = $data['description'];
$userId = $data['userId'];

// Priprava poizvedbe za vstavljanje podatkov
$sql = "INSERT INTO language_exchange (native_language, learning_language, availability_date, availability_time, description, user_id)
        VALUES ('$nativeLanguage', '$learningLanguage', '$availabilityDate', '$availabilityTime', '$description', '$userId')";

// Izvedba poizvedbe
if ($conn->query($sql) === TRUE) {
    http_response_code(200); // Uspešno
    echo "Podatki so bili uspešno vstavljeni.";
} else {
    http_response_code(500); // Napaka na strežniku
    echo "Napaka pri vstavljanju podatkov: " . $conn->error;
}

// Zapiranje povezave z bazo podatkov
$conn->close();
?>