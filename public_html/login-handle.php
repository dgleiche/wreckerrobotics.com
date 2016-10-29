<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();

if (isset($_POST['email'], $_POST['p'])) {
    $email = $_POST['email'];
    $password = $_POST['p']; //Hashed pwd

    if (login($email, $password, $mysqli) == true) {
        //Success
        header('Location: index.php');
    } else {
        //Failed
        header('Location: login.php?error=1');
    }
} else {
    //POST vars not sent
    echo 'Invalid Request';
}