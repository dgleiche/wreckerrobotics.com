<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();

if (isset($_GET['photo'], $_GET['loc'], $_GET['album']) && login_check($mysqli) == true) {
    //Time to do sql
    if ($del_stmt = $mysqli->prepare("DELETE FROM gallery_imgs WHERE id=?")) {
        $del_stmt->bind_param('i', $_GET['photo']);
        //Execute
        if (!$del_stmt->execute()) {
            header('Location: gallery.php?error=1');
        }
        $del_stmt->close();
        //Success
        unlink($_GET['loc']);
        header('Location: gallery.php?album=' . $_GET['album']);
    } else {
        //Failed
        header('Location: gallery.php?error=2');
    }
} else {
    //POST vars not sent or not logged in
    echo 'Invalid Request';
}