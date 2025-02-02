<?php
include 'config.php'; // Collegamento al database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO utenti (nome, email, password) VALUES ('$nome', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "Registrazione avvenuta con successo!";
    } else {
        echo "Errore: " . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Registrazione</title>
</head>
<body>
    <h2>Registrazione Utente</h2>
    <form action="" method="POST">
        Nome: <input type="text" name="nome" required><br>
        Email: <input type="email" name="email" required><br>
        Password: <input type="password" name="password" required><br>
        <button type="submit">Registrati</button>
    </form>
</body>
</html>
