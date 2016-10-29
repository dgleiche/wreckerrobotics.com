<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php echo generateHead("New Image"); ?>
</head>
<body>

<?php if (login_check($mysqli) == true) : ?>
    <div id="contact-container">
        <h2>New Image</h2>
        <div class='error' <?php if(!$_GET['error']) echo "style='display: none;'"; ?>>Invalid Information</div>
        <form name="email_form" action="new_image-handle.php" method="post" enctype="multipart/form-data">
            <input type="text" name="name" placeholder="Image Title (Optional)" />

            <img src="" style="display: none" class="bio-img" />
            <input type="file" name="img" accept="image/*" value="Choose Image" style="margin-bottom: 30px" id="imgInput" />

            <textarea name="caption" rows="3" placeholder="Image Caption (Optional)"></textarea>
            <br />
            <input type="hidden" name="album" value="<?php echo $_GET['album']; ?>" />

            <input type="submit" value="Upload" />
        </form>
    </div>
<?php else : ?>
    <p>
        <span class="error">You are not authorized to access this page.</span> Please <a href="login.php">login</a>.
    </p>
<?php endif; ?>
</body>
</html>