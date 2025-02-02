<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php"); // Se non sei loggato, vai al login
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Area Riservata</title>
</head>
<body>
    <h2>Ciao, <?php echo $_SESSION['user_name']; ?>! Sei nella tua area riservata.</h2>
    <a href="logout.php">Esci</a>
</body>
</html>
