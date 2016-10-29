<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php echo generateHead("Edit Bio"); ?>
</head>
<body>

<?php if (login_check($mysqli) == true) : ?>
    <?php
    $id = $_GET['id'];
    if ($stmt = $mysqli->prepare("SELECT name, status, image_loc, bio FROM bios WHERE id = ? LIMIT 1")) {
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows != 1) die("Invalid ID");

        //Bind the results
        $name = $status = $image_loc = $bio = '';
        $stmt->bind_result($name, $status, $image_loc, $bio);
        $stmt->fetch();
    } else {
        die("DB Error");
    }
    ?>
    <div id="contact-container">
        <h2>Bio Editor</h2>
        <div class='error' <?php if(!$_GET['error']) echo "style='display: none;'"; ?>>Invalid Information</div>
        <form name="email_form" action="edit_bio-handle.php" method="post" enctype="multipart/form-data">
            <input type="text" name="name" placeholder="Name" value="<?php echo $name; ?>" />

            <input type="text" name="status" placeholder="Status" value="<?php echo $status; ?>" />

            <img src="<?php echo $image_loc; ?>" alt="<?php echo $name; ?>" class="bio-img"/>
            <input type="file" name="img" accept="image/*" value="Choose Image" style="margin-bottom: 30px" id="imgInput" />

            <textarea placeholder="Bio" rows="12" name="bio"><?php echo br2nl($bio); ?></textarea>

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