<?php
include_once 'references/php/db_connect.php';
include_once 'references/php/functions.php';

sec_session_start();
?>
<!DOCTYPE html>
<!--
INDEX PAGE
CREATED BY DYLAN GLEICHER, TECHNOLOGY DIRECTOR AT WRECKER ROBOTICS (AND SELF-PROCLAIMED DIG PRODUCTONS)
MADE FOR WRECKERS ROBOTICS
COPYRIGHT 2014 WRECKERS ROBOTICS. ALL RIGHTS RESERVED
-->
<html lang="en">

<head>
    <!--[if lt IE 10]>
        <script>alert('This website is designed for IE 10+. Please upgrade or use any other browser');</script>
    <![endif]-->

    <?php echo generateHead(); ?>
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
<div id="blob-container" class="blue-overlay">
    <h1 class="outlined">FTC 2014 East Super Regional Champions</h1>
    <h1 class="outlined">FTC 2014 WORLD Quarterfinalists</h1>
    <img class="logo-img-left" src="references/images/wrecker2.png" alt="Wreckers Robotics"/>
    <span class="logo-text">TEAM 577</span>
    <img class="logo-img-right" src="references/images/wrecker2.png" alt="Wreckers Robotics"/>
    <div class="fancy-line"></div>
    <p class="about">
        Team 577, Wreckers Robotics, is a completely student-run FTC team composed of Staples High School students from Westport, Connecticut.
        The students design and build robots on their own through a collaborative process in a team member's basement.
        The team has a strong tradition of attracting and mentoring new members each year.
        The experienced members mentor new team members and those new members will become the next mentors,
        thus continuing the legacy of the team and FIRST FTC program.
    </p>
    <!-- Start WOWSlider.com -->
    <div id="slider-container">
        <iframe src="slider.html" class="img_slider"></iframe>
    </div>
    <!-- End WOWSlider.com -->
</div>
<!-- End Blob with slider -->
<div id="bottom-info">

    <!-- Team Updates -->
    <div id="team-updates" class="blue-overlay">
        <div class="title-container">
            <span class="title-text">Team Updates</span>
            <br />
        </div>
        <div class="fancy-line"></div>
        <a class="prev browse left"></a>
        <div class="scrollable" id="navigator">
            <div class="items">
                <div class="item">
                    <p class="about">
                        We Came. We Saw. We Wrecked. <br /><br /> Wreckers Robotics, in an alliance with the Landroids and the Metal Maurauders, outplayed and outscored their opposition en route to winning 1st place in the FTC East Super Regional and a birth to the FTC World Championship.
                    </p>
                    <div class="img-container">
                        <img src="team_updates/srhighscore.JPG?" alt="Super Regionals Wreckers 411 over opponent 394."/>
                    </div>
                </div>
                <div class="item">
                    <p class="about">
                        On March 02 2014, Wreckers Robotics participated in the NJ FTC State Championship Tournament.  Wreckers performed very well and was the Captain of the winning alliance.  In addition, the team won the PTC Design award, Compass award and was 2nd runner up for the Inspire award.
                    </p>
                    <div class="img-container">
                        <img src="team_updates/nj.jpg" />
                    </div>
                </div>
                <div class="item">
                    <p class="about">
                        On February 16, the team participated in the Hudson Valley NY FTC Regional Championship.  The team did very well, going 9-0 and advancing to the FTC Super Regional championship in York, PA on April 03.
                    </p>
                    <div class="img-container">
                        <img src="team_updates/ny.jpg" />
                    </div>
                </div>

                <div class="item">
                    <p class="about">
                        In NJ, the Wreckers put up one of the highest scores in the FTC for the season!
                    </p>
                    <div class="img-container">
                        <img src="team_updates/highscore.jpg" />
                    </div>
                </div>
            </div>
        </div>
        <a class="next browse right"></a>
        <!-- END TEAM UPDATES -->
    </div>
    <!-- FTC INFO -->
    <div id="ftc-info" class="blue-overlay">
        <img src="references/images/ftc_logo.png?1" />
        <span class="title-text">What is FIRST?</span>
        <br />
        <div class="fancy-line"></div>
        <p class="about-first">
            FIRST is a 501(c)(3) not-for-profit organization whose goal is to show children of all ages that STEM is both fun and rewarding and lead to successful careers.
        </p>
        <!-- Display corresponding PDF in overlay -->
        <a class="button pdf-overlay" rel="#overlay" href="http://www.usfirst.org/sites/default/files/uploadedFiles/About_Us/Media_Center/FIRST_Facts_Assets/WhatisFIRST_Brochure.pdf">Learn More</a>
        <a class="button pdf-link" target="_blank" href="http://www.usfirst.org/sites/default/files/uploadedFiles/About_Us/Media_Center/FIRST_Facts_Assets/WhatisFIRST_Brochure.pdf">Learn More</a>
    </div>
</div>

<?php echo generateFooter(); ?>

<!-- Overlayed FIRST Brochure PDF -->
<div class="apple_overlay" id="overlay">
    <!-- External content to be loaded -->
    <iframe class="ftc-pdf-frame" src="http://www.usfirst.org/sites/default/files/uploadedFiles/About_Us/Media_Center/FIRST_Facts_Assets/WhatisFIRST_Brochure.pdf"></iframe>
</div>
</body>

</html>