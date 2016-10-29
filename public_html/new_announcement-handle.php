<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();

if (isset($_POST['title'], $_POST['text']) && login_check($mysqli) == true) {
    $title = $_POST['title'];
    $text = nl2br($_POST['text']);

    if (!($title == '' || $text == '')) {

        $useImg = true;
        date_default_timezone_set('America/New_York');
        $date = date("Y-m-d");

        if ($_FILES['img']['error'] > 0) {
            $useImg = false;
        }

        if ($useImg) {
            $img = "images/announcements/" . $_FILES['img']['name'];

            if (move_uploaded_file($_FILES['img']['tmp_name'], $img)) {
                //Time to do sql
                if ($insert_stmt = $mysqli->prepare("INSERT INTO announcements (title, date, image_loc, text) VALUES (?, ?, ?, ?)")) {

                    $insert_stmt->bind_param('ssss', $title, $date, $img, $text);
                    //Execute
                    if (!$insert_stmt->execute()) {
                        header('Location: new_announcement.php?error=1');
                    }
                }
                //Success
                header('Location: announcements.php');
            } else {
                //Failed
                header('Location: new_announcement.php?error=1');
            }
        } else {
            if ($insert_stmt = $mysqli->prepare("INSERT INTO announcements (title, date, text) VALUES (?, ?, ?)")) {
                $insert_stmt->bind_param('sss', $title, $date, $text);
                //Execute
                if (!$insert_stmt->execute()) {
                    header('Location: new_announcement.php?error=1');
                }
            }
            //Success
            header('Location: announcements.php');
        }
    } else {
        header('Location: new_announcement.php?error=3');
    }
} else {
    //POST vars not sent or not logged in
    echo 'Invalid Request';
}