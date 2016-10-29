<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php echo generateHead("Gallery -- Wreckers Robotics FTC #577"); ?>
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
$name = $description = $id = $stmt = '';
retrieveAlbums($mysqli, $name, $description, $id, $stmt);

$albumSelected = isset($_GET['album']);
if ($albumSelected) {
    $caption = $title = $image_loc = $photoStmt = $photoID = '';
    if (retrievePhotosFromAlbum($mysqli, $_GET['album'], $caption, $title, $image_loc, $photoStmt, $photoID) && $photoStmt->num_rows > 0) {
        //Successfully Retrieved
        $albumName = $albumDesc = '';
        getAlbumNameAndDescription($mysqli, $_GET['album'], $albumName, $albumDesc);
    } else {
        $albumSelected = false;
    }
}
?>
<div id="gallery-container">
    <?php if ($albumSelected) { ?>
        <!-- Show edit bar when applicable -->
        <?php if ($logged_in) { ?>
            <div id="edit-bar"><a href="new_image.php?album=<?php echo $_GET['album'] ?>" class="fa fa-plus-square-o"> Add an Image to this Album</a></div>
        <?php } ?>
        <h2><?php echo $albumName; ?></h2>
        <div class="album-desc top-album"><?php echo $albumDesc; ?></div>
            <div class="album-container">
                <?php while($photoStmt->fetch()) { ?>
                    <?php if ($logged_in) { ?><a href="delete_photo.php?photo=<?php echo $photoID; ?>&loc=<?php echo $image_loc; ?>&album=<?php echo $_GET['album']; ?>" class="fa fa-minus-square-o" onclick="return confirm('Are you sure you want to delete this item?');"></a><?php } ?>
                    <a class="fancybox" <?php if ($title != '' || $caption != '') { ?>title="<?php echo $title . '<br /><br />' . $caption; ?>"<?php } ?> rel="album" href="<?php echo $image_loc; ?>">

                        <div class="photo">
                            <img src="<?php echo $image_loc; ?>" alt="<?php echo $title; ?>" class="gallery-img" />
                        </div>
                    </a>
                <?php } $photoStmt->close(); ?>
            </div>
        <hr />
    <?php } ?>
    <!-- Show edit bar when applicable -->
    <?php if ($logged_in) { ?>
        <div id="edit-bar"><a href="new_album.php" class="fa fa-pencil"> Create a New Album</a></div>
    <?php } ?>
    <h2>Albums</h2>
    <?php while($stmt->fetch()) { ?>
        <div class="album">
            <h2><?php echo $name; ?></h2>
            <div class="album-desc top-album"><?php echo $description; ?></div>
            <?php if ($logged_in) { ?>
                <a href="delete_album.php?album=<?php echo $id; ?>&name=<?php echo $name; ?>" class="fa fa-minus-square-o" onclick="return confirm('Are you sure you want to delete this item?');"> Delete Album &nbsp;&nbsp;&nbsp;&nbsp;</a>
                <a href="new_image.php?album=<?php echo $id; ?>" class="fa fa-plus-square-o"> Add Image</a>
                <br />
            <?php } ?>
            <a href="?album=<?php echo $id; ?>">
                <img src="<?php echo lastImageFromAlbum($mysqli, $id); ?>" alt="<?php echo $name; ?>" class="gallery-img"/>
                <br />
            </a>
            <span class="number-photos"><?php echo numImagesInAlbum($mysqli, $id); ?> Photos</span>
        </div>
    <?php } $stmt->close(); ?>
</div>

<?php echo generateFooter(); ?>
</body>
</html>