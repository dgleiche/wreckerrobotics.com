<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php echo generateHead("The Team -- Wreckers Robotics FTC Team #577"); ?>
</head>

<body>
<div id="fb-root"></div>
<?php $logged_in = login_check($mysqli); if ($logged_in) { ?>
    <div id="login-status">Logged In as <?php echo htmlentities($_SESSION['username']); ?> <span style="float:right; margin-right: 60px"><a href="logout.php">Log Out</a></span></div>
<?php } ?>
<!-- BEGIN NAVBAR -->
<?php include("navbar.html"); ?>
<!-- END NAVBAR -->
<?php
//Retrieve articles from DB and store in assoc array
$id = $name = $status = $image_loc = $bio = $stmt = '';
retrieveBios($mysqli, $id, $name, $status, $image_loc, $bio, $stmt);
?>

<div id="team-container">
    <!-- Show edit bar when applicable -->
    <?php if ($logged_in) { ?>
        <div id="edit-bar"><a href="new_bio.php" class="fa fa-pencil"> Create a New Entry</a></div>
    <?php } ?>

    <!-- Fetch bios w/ PHP -->
    <?php while($stmt->fetch()) { ?>
        <?php if ($name == "Haris Durrani") echo "<h2>Wreckers Robotics Alumni</h2>"; ?>
        <div class="member <?php if($logged_in) echo 'member-logged_in'; ?>">
            <?php if ($logged_in) { ?><div class="tools"><a href="edit_bio.php?id=<?php echo $id; ?>" class="fa fa-edit img-link" alt="Edit Bio"> Edit</a></div> <?php } ?>
            <div class="name"><?php echo $name; ?></div>
            <div class="status"><?php echo $status; ?></div>
            <img src="<?php echo $image_loc; ?>" alt="<?php echo $name; ?>" />
            <p class="bio">
                <?php echo $bio; ?>
            </p>
        </div>
    <?php } $stmt->close(); ?>
</div>

<?php echo generateFooter(); ?>
</body>
</html>