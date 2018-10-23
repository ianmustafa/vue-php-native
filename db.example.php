<?php

// Silakan berkreasi
$_dbhost = 'localhost';
$_dbname = 'vue-php-native';
$_dbuser = 'local';
$_dbpass = 'secret';

return new PDO(
    "mysql:host={$_dbhost};dbname={$_dbname}",
    $_dbuser,
    $_dbpass,
    [
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]
);
