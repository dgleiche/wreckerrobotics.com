<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php echo generateHead('Announcements -- Wreckers Robotics FTC #577'); ?>
</head>
<body>

<div id="fb-root"></div>
<?php include('navbar.html'); ?>
<?php $logged_in = login_check($mysqli); if ($logged_in) { ?>
    <div id="login-status">Logged In as <?php echo htmlentities($_SESSION['username']); ?> <span style="float:right; margin-right: 60px"><a href="logout.php">Log Out</a></span></div>
<?php } ?>

<?php
//Retrieve articles from DB and store in assoc array
$title = $date = $image_loc = $text = $stmt = $id = '';
retrieveArticles($mysqli, $id, $title, $date, $image_loc, $text, $stmt);
?>

<div id="announcements-container">
    <?php if ($logged_in) { ?>
        <div id="edit-bar"><a href="new_announcement.php" class="fa fa-pencil"> Create a New Entry</a></div>
    <?php } ?>

    <div class="announce-logo-text">Announcements</div>
    <?php while($stmt->fetch()) { ?>
    <?php
    $dateFormat = DateTime::createFromFormat("Y-m-d", $date);
    $d = $dateFormat->format("d"); $m = $dateFormat->format("m"); $y = $dateFormat->format("Y");
    $jd = gregoriantojd($m, $d, $y);
    ?>
    <div class="announcement" id="<?php echo $id; ?>">
        <?php if ($logged_in) { ?>
            <a href="delete_announcement.php?id=<?php echo $id; ?><?php if ($image_loc) : ?>&img=<?php echo $image_loc; endif;?>" class="fa fa-minus-square-o" onclick="return confirm('Are you sure you want to delete this item?');"> Delete &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</a>
            <a href="edit_announcement.php?id=<?php echo $id; ?>" class="fa fa-edit"> Edit</a>
        <?php } ?>
        <div class="title"><?php echo $title; ?></div>
        <div class="date fa fa-paperclip"> Posted <?php echo jdmonthname($jd, CAL_MONTH_GREGORIAN_SHORT) . ' ' . $d . ' ' . $y ?></div>
        <div class="content">
            <?php if ($image_loc) { ?>
                <img src="<?php echo $image_loc; ?>" alt="<?php echo $title; ?>" />
                <br />
            <?php } ?>
            <?php echo $text ?>
        </div>
    </div>
    <?php } $stmt->close(); ?>
</div>

<?php echo generateFooter(); ?>
</body>
</html>