<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php echo generateHead("New Album"); ?>
</head>
<body>

<?php if (login_check($mysqli) == true) : ?>
    <div id="contact-container">
        <h2>New Album</h2>
        <div class='error' <?php if(!$_GET['error']) echo "style='display: none;'"; ?>>Invalid Information</div>
        <form name="email_form" action="new_album-handle.php" method="post">
            <input type="text" name="name" placeholder="Album Name" />

            <input type="text" name="description" placeholder="Album Description" />

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