<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();

if (isset($_POST['album']) && login_check($mysqli) == true) {
    $name = $_POST['name'];
    $album = $_POST['album'];
    $caption = nl2br($_POST['caption']);

    if ($_FILES['img']['error'] > 0) {
        die(var_dump($_FILES));
        //header('Location: new_image.php?error=2&album='. $album);
    }

    //Retrieve album name
    $stmt = $mysqli->prepare("SELECT name FROM albums WHERE id=? LIMIT 1");
    $stmt->bind_param('i', $album);
    $stmt->execute();
    $stmt->store_result();

    $album_name = '';
    $stmt->bind_result($album_name);
    $stmt->fetch();

    if ($stmt->num_rows == 1) {
        $img = "gallery/" . $album_name . '/' . $_FILES['img']['name'];

        if (move_uploaded_file($_FILES['img']['tmp_name'], $img)) {
            //Time to do sql
            if ($insert_stmt = $mysqli->prepare("INSERT INTO gallery_imgs (album_id, caption, title, image_loc) VALUES (?, ?, ?, ?)")) {
                $insert_stmt->bind_param('isss', $album, $caption, $name, $img);
                //Execute
                if (!$insert_stmt->execute()) {
                    header('Location: new_bio.php?error=133&album='. $album);
                } else {
                    header('Location: new_bio.php?error=52&album='. $album);
                }
            }
            //Success
            header('Location: gallery.php?album=' . $album);
        } else {
            //Failed
            var_dump($_FILES);
            //header('Location: new_image.php?error=124&album='. $album);
        }
    } else {
        //No album with given ID
        header('Location: new_image.php?error=32&album='. $album);
    }
} else {
    //POST vars not sent or not logged in
    echo 'Invalid Request';
}