<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();

if (isset($_POST['title'], $_POST['text'], $_POST['id']) && login_check($mysqli) == true) {
    $title = $_POST['title'];
    $text = nl2br($_POST['text']);

    if (!($text == '' || $title == '')) {

        $id = $_POST['id'];
        $no_img = false;

        if ($_FILES['img']['error'] > 0) {
            $no_img = true;
        }

        if (!$no_img) {
            $img = "images/announcements/" . $_FILES['img']['name'];

            if (move_uploaded_file($_FILES['img']['tmp_name'], $img)) {
                //Time to do sql
                if ($insert_stmt = $mysqli->prepare("UPDATE announcements SET title=?, text=?, image_loc=? WHERE id=?")) {
                    $insert_stmt->bind_param('sssi', $title, $text, $img, $id);
                    //Execute
                    if (!$insert_stmt->execute()) {
                        header('Location: edit_announcement.php?error=1&id=' . $id);
                    }
                }
                //Remove old image
                unlink($_POST['old_img_loc']);
            } else {
                //Failed
                header('Location: edit_announcement.php?error=1&id=' . $id);
            }
        } else {
            if ($insert_stmt = $mysqli->prepare("UPDATE announcements SET title=?, text=? WHERE id=?")) {
                $insert_stmt->bind_param('ssi', $title, $text, $id);
                //Execute
                if (!$insert_stmt->execute()) {
                    header('Location: edit_announcement.php?error=1&id=' . $id);
                }
            }
        }
        //Success
        header('Location: announcements.php');
    } else {
        header('Location: edit_announcement.php?error=2&id=' . $id);
    }
} else {
    //POST vars not sent or not logged in
    echo 'Invalid Request';
}