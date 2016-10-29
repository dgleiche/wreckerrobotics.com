<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <?php echo generateHead('Contact Us -- Wreckers Robotics FTC Team #577'); ?>
</head>

<body>
<div id="fb-root"></div>
<?php $logged_in = login_check($mysqli); if ($logged_in) { ?>
    <div id="login-status">Logged In as <?php echo htmlentities($_SESSION['username']); ?> <span style="float:right; margin-right: 60px"><a href="logout.php">Log Out</a></span></div>
<?php } ?>
<!-- BEGIN NAVBAR -->
<?php include("navbar.html"); ?>
<!-- END NAVBAR -->
<!-- Start Blob with slider -->
<div id="contact-container">
    <h2>E-Mail the Coach</h2>
    <div class='error' <?php if(!$_GET['err']) echo "style='display: none;'"; ?>>There were Error(s) Sending your E-Mail</div>
    <?php if(isset($_GET['success'])) { ?>
    <div class='success'>Your E-Mail was Sent Successfully</div>
    <?php } ?>
    <form name="email_form" action="email.php" method="post" onsubmit="return validate()">
        <div class="red-text inv_email" <?php if(!$_GET['email_err']) echo "style='display: none;'"; ?>>Invalid E-Mail</div>
        <input type="text" name="email" placeholder="Your Email Address" <?php if($_GET['email_err']) echo 'class="red-outline"'; ?> />

        <div class="red-text inv_subject" <?php if(!$_GET['subject_err']) echo "style='display: none;'"; ?>>Invalid Subject</div>
        <input type="text" name="subject" placeholder="Subject" <?php if($_GET['subject_err']) echo 'class="red-outline"'; ?> />

        <div class="red-text inv_message" <?php if(!$_GET['message_err']) echo "style='display: none;'"; ?>>Invalid Message</div>
        <textarea placeholder="Your Message" rows="7" name="message" <?php if($_GET['message_err']) echo 'class="red-outline"'; ?>></textarea>
        <br />
        <input type="submit" value="Send" />
    </form>
</div>

<?php echo generateFooter(); ?>
</body>
</html>