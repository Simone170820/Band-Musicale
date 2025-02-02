<?php
$servername = "localhost"; // Il server di XAMPP
$username = "root"; // Utente predefinito di MySQL in XAMPP
$password = ""; // Lascia vuoto (in XAMPP di default non c'è password)
$dbname = "registro_utenti"; // Nome del database che hai creato

// Connessione al database
$conn = new mysqli($servername, $username, $password, $dbname);

// Controlla la connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}
?>
