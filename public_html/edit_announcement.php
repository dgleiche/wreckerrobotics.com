<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php echo generateHead("Edit Announcement"); ?>
</head>
<body>

<?php if (login_check($mysqli) == true) : ?>
    <?php
    $id = $_GET['id'];
    if ($stmt = $mysqli->prepare("SELECT title, text, image_loc FROM announcements WHERE id = ? LIMIT 1")) {
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows != 1) die("Invalid ID");

        //Bind the results
        $text = $image_loc = $title = '';
        $stmt->bind_result($title, $text, $image_loc);
        $stmt->fetch();
    } else {
        die("DB Error");
    }
    ?>
    <div id="contact-container">
        <h2>Bio Editor</h2>
        <div class='error' <?php if(!$_GET['error']) echo "style='display: none;'"; ?>>Invalid Information</div>
        <form name="email_form" action="edit_announcement-handle.php" method="post" enctype="multipart/form-data">
            <input type="text" name="title" placeholder="Title" value="<?php echo $title; ?>" />

            <img src="<?php echo $image_loc; ?>" alt="<?php echo $name; ?>" class="bio-img"/>
            <input type="file" name="img" accept="image/*" value="Choose Image" style="margin-bottom: 30px" id="imgInput" />

            <textarea placeholder="Announcement Text" rows="14" name="text"><?php echo br2nl($text); ?></textarea>

            <input type="hidden" name="old_img_loc" value="<?php echo $image_loc; ?>" />
            <input type="hidden" name="id" value="<?php echo $id; ?>" />

            <br />
            <input type="submit" value="Create" />
        </form>
    </div>
<?php else : ?>
    <p>
        <span class="error">You are not authorized to access this page.</span> Please <a href="login.php">login</a>.
    </p>
<?php endif; ?>
</body>
</html>