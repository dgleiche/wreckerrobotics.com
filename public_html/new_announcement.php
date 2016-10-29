<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php echo generateHead("New Announcement"); ?>
</head>
<body>

<?php if (login_check($mysqli) == true) : ?>
    <div id="contact-container">
        <h2>New Announcement</h2>
        <div class='error' <?php if(!$_GET['error']) echo "style='display: none;'"; ?>>Invalid Information</div>
        <form name="email_form" action="new_announcement-handle.php" method="post" enctype="multipart/form-data">
            <input type="text" name="title" placeholder="Title" />

            <img src="" style="display: none" class="bio-img" />
            <label for="img">Optional Image: </label>
            <input type="file" name="img" accept="image/*" value="Choose Image (Optional)" style="margin-bottom: 30px" id="imgInput" />

            <textarea placeholder="Announcement Text" rows="14" name="text"></textarea>

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