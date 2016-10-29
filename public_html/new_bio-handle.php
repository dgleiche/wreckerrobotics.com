<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();

if (isset($_POST['name'], $_POST['status'], $_POST['bio']) && login_check($mysqli) == true) {
    $name = $_POST['name'];
    $status = $_POST['status'];
    $bio = nl2br($_POST['bio']);

    if (!($name == '' || $status == '' || $bio == '')) {

        if ($_FILES['img']['error'] > 0) {
            header('Location: new_bio.php?error=2');
        }

        $img = "team_members/" . $_FILES['img']['name'];

        if (move_uploaded_file($_FILES['img']['tmp_name'], $img)) {
            //Time to do sql
            if ($insert_stmt = $mysqli->prepare("INSERT INTO bios (name, status, bio, image_loc) VALUES (?, ?, ?, ?)")) {
                $insert_stmt->bind_param('ssss', $name, $status, $bio, $img);
                //Execute
                if (!$insert_stmt->execute()) {
                    header('Location: new_bio.php?error=1');
                }
            }
            //Success
            header('Location: team.php');
        } else {
            //Failed
            header('Location: new_bio.php?error=1');
        }
    } else {
        header('Location: new_bio.php?error=1');
    }
} else {
    //POST vars not sent or not logged in
    echo 'Invalid Request';
}