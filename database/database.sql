-- Crea il database
CREATE DATABASE IF NOT EXISTS registro_utenti;
USE registro_utenti;

-- Crea la tabella utenti
CREATE TABLE IF NOT EXISTS utenti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
