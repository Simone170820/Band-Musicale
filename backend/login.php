<?php
include 'config.php';
session_start(); // Avvia la sessione

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Cerca l'utente nel database
    $sql = "SELECT * FROM utenti WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        // Verifica la password
        if (password_verify($password, $row['password'])) {
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['user_name'] = $row['nome'];
            echo "Login riuscito! Benvenuto, " . $row['nome'];
        } else {
            echo "Password errata!";
        }
    } else {
        echo "Utente non trovato!";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <h2>Accedi</h2>
    <form action="" method="POST">
        Email: <input type="email" name="email" required><br>
        Password: <input type="password" name="password" required><br>
        <button type="submit">Accedi</button>
    </form>
</body>
</html>
