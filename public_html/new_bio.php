<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php echo generateHead("New Bio"); ?>
</head>
<body>

<?php if (login_check($mysqli) == true) : ?>
    <div id="contact-container">
        <h2>Bio Uploader</h2>
        <div class='error' <?php if(!$_GET['error']) echo "style='display: none;'"; ?>>Invalid Information</div>
        <form name="email_form" action="new_bio-handle.php" method="post" enctype="multipart/form-data">
            <input type="text" name="name" placeholder="Name" />

            <input type="text" name="status" placeholder="Status" />

            <img src="" style="display: none" class="bio-img" />
            <input type="file" name="img" accept="image/*" value="Choose Image" style="margin-bottom: 30px" id="imgInput" />

            <textarea placeholder="Bio" rows="7" name="bio"></textarea>

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