<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();

if (isset($_GET['id']) && login_check($mysqli) == true) {
    //Time to do sql
    if ($del_stmt = $mysqli->prepare("DELETE FROM announcements WHERE id=?")) {
        $del_stmt->bind_param('i', $_GET['id']);
        //Execute
        if (!$del_stmt->execute()) {
            header('Location: announcements.php?error=1');
        }
        $del_stmt->close();
        //Success
        if (isset($_GET['img'])) unlink($_GET['img']);

        header('Location: announcements.php');
    } else {
        //Failed
        header('Location: announcements.php?error=2');
    }
} else {
    //POST vars not sent or not logged in
    echo 'Invalid Request';
}