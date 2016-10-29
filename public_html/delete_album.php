<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();

if (isset($_GET['album'], $_GET['name']) && login_check($mysqli) == true) {
    //Time to do sql
    if ($del_stmt = $mysqli->prepare("DELETE FROM gallery_imgs WHERE album_id=?")) {
        $del_stmt->bind_param('i', $_GET['album']);
        //Execute
        if (!$del_stmt->execute()) {
            header('Location: gallery.php?error=1');
        }
        $del_stmt->close();

        if ($album_del_stmt = $mysqli->prepare("DELETE FROM albums WHERE id=?")) {
            $album_del_stmt->bind_param('i', $_GET['album']);
            if (!$album_del_stmt->execute()) {
                header('Location: gallery.php?error=4');
            }
            $album_del_stmt->close();
        } else {
            //Failed
            header('Location: gallery.php?error=5');
        }
        //Success
        delTree('gallery/' . $_GET['name']);
        header('Location: gallery.php');
    } else {
        //Failed
        header('Location: gallery.php?error=2');
    }
} else {
    //POST vars not sent or not logged in
    echo 'Invalid Request';
}