<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();

if (isset($_POST['name'], $_POST['description']) && login_check($mysqli) == true) {
    $name = $_POST['name'];
    $description = $_POST['description'];

    if (!($name == '' || $description == '')) {

        //Time to do sql
        if ($insert_stmt = $mysqli->prepare("INSERT INTO albums (name, description) VALUES (?, ?)")) {
            $insert_stmt->bind_param('ss', $name, $description);
            //Execute
            if (!$insert_stmt->execute()) {
                header('Location: new_album.php?error=1');
            }
            //Success
            mkdir('gallery/' . $name);
            header('Location: gallery.php');
        } else {
            //Failed
            header('Location: new_album.php?error=1');
        }
    } else {
        header('Location: new_album.php?error=2');
    }
} else {
    //POST vars not sent or not logged in
    echo 'Invalid Request';
}