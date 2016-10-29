<?php
include_once 'references/php/functions.php';

sec_session_start();

//Unset all session vars
$_SESSION = array();

//get session params
$params = session_get_cookie_params();

//Delete cookie
setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);

//Destroy session
session_destroy();
header('Location: index.php');