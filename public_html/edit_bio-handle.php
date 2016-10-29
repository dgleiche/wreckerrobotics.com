<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();

if (isset($_POST['name'], $_POST['status'], $_POST['bio'], $_POST['id']) && login_check($mysqli) == true) {
    $name = $_POST['name'];
    $status = $_POST['status'];
    $bio = nl2br($_POST['bio']);

    if (!($name == '' || $status == '' || $bio == '')) {

        $id = $_POST['id'];
        $no_img = false;

        if ($_FILES['img']['error'] > 0) {
            $no_img = true;
        }

        if (!$no_img) {
            $img = "team_members/" . $_FILES['img']['name'];

            if (move_uploaded_file($_FILES['img']['tmp_name'], $img)) {
                //Time to do sql
                if ($insert_stmt = $mysqli->prepare("UPDATE bios SET name=?, status=?, bio=?, image_loc=? WHERE id=?")) {
                    $insert_stmt->bind_param('ssssi', $name, $status, $bio, $img, $id);
                    //Execute
                    if (!$insert_stmt->execute()) {
                        header('Location: edit_bio.php?error=1');
                    }
                }
                //Remove old image
                unlink($_POST['old_img_loc']);
            } else {
                //Failed
                header('Location: new_bio.php?error=1');
            }
        } else {
            if ($insert_stmt = $mysqli->prepare("UPDATE bios SET name=?, status=?, bio=? WHERE id=?")) {
                $insert_stmt->bind_param('sssi', $name, $status, $bio, $id);
                //Execute
                if (!$insert_stmt->execute()) {
                    header('Location: edit_bio.php?error=1');
                }
            }
        }
        //Success
        header('Location: team.php');
    } else {
        header('Location: edit_bio.php?error=2');
    }
} else {
    //POST vars not sent or not logged in
    echo 'Invalid Request';
}