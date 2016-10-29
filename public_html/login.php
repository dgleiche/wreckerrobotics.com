<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php echo generateHead("Log In -- Wreckers Robotics FTC Team #577"); ?>
</head>
<body>
<div id="fb-root"></div>
<?php $logged_in = login_check($mysqli); if ($logged_in) { ?>
    <div id="login-status">Logged In as <?php echo htmlentities($_SESSION['username']); ?> <span style="float:right; margin-right: 60px"><a href="logout.php">Log Out</a></span></div>
<?php } ?>
<!-- BEGIN NAVBAR -->
<?php include("navbar.html"); ?>
<!-- END NAVBAR -->
<div id="contact-container">
    <h2>Login</h2>
    <div class='error' <?php if(!$_GET['error']) echo "style='display: none;'"; ?>>Invalid Login Information</div>
    <form name="email_form" action="login-handle.php" method="post">
        <input type="text" name="email" placeholder="Email" />

        <input type="password" name="password" placeholder="Password" />

        <br />
        <input type="submit" value="Log In" onclick="formhash(this.form, this.form.password);" />
    </form>
</div>

<?php echo generateFooter(); ?>
</body>
</html>