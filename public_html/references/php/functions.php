<?php
include_once 'config.php';

date_default_timezone_set('America/New_York');

function generateHead($title = "Wreckers Robotics FTC Team #577") {
    if (!PRODUCTION) {
        $head = '
        <meta charset="utf-8" />
        <meta name="author" content="Dylan Gleicher" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="Wrecker Robotics FTC #577. We are the 2011 FTC World Champions." />
        <meta name="keywords" content="wreckers,robotics,wrecker,wrecker robotics,ftc,577,first,2011 ftc champion" />

        <title>' . $title . '</title>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
        <script src="http://code.jquery.com/jquery-migrate-1.2.1.js"></script>
        <script src="http://cdn.jquerytools.org/1.2.7/all/jquery.tools.min.js"></script>
        <script type="text/javascript" src="references/SlickNav/jquery.slicknav.min.js"></script>
        <script src="references/js/sha512.js"></script>

        <!-- Add fancyBox -->
        <link rel="stylesheet" href="fancybox/source/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
        <script type="text/javascript" src="fancybox/source/jquery.fancybox.pack.js?v=2.1.5"></script>

        <!-- Optionally add helpers - button, thumbnail and/or media -->
        <link rel="stylesheet" href="fancybox/source/helpers/jquery.fancybox-buttons.css?v=1.0.5" type="text/css" media="screen" />
        <script type="text/javascript" src="fancybox/source/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script>
        <script type="text/javascript" src="fancybox/source/helpers/jquery.fancybox-media.js?v=1.0.6"></script>

        <link rel="stylesheet" href="fancybox/source/helpers/jquery.fancybox-thumbs.css?v=1.0.7" type="text/css" media="screen" />
        <script type="text/javascript" src="fancybox/source/helpers/jquery.fancybox-thumbs.js?v=1.0.7"></script>

        <script src="references/main.js?' . rand(1, 1000) . '"></script>

        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="references/stylesheet.css?' . rand(1, 1000) . '" />
        <link type="text/css" rel="stylesheet" href="references/SlickNav/slicknav.css" />

        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

        <!--[if lt IE 10]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->
        ';
    } else {
        $head = '
        <meta charset="utf-8" />
        <meta name="author" content="Dylan Gleicher" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="Wrecker Robotics FTC #577. We are the 2011 FTC World Champions." />
        <meta name="keywords" content="wreckers,robotics,wrecker,wrecker robotics,ftc,577,first,2011 ftc champion" />

        <title>' . $title . '</title>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
        <script src="http://code.jquery.com/jquery-migrate-1.2.1.js"></script>
        <script src="http://cdn.jquerytools.org/1.2.7/all/jquery.tools.min.js"></script>
        <script type="text/javascript" src="references/SlickNav/jquery.slicknav.min.js"></script>
        <script src="references/js/sha512.js"></script>

        <!-- Add fancyBox -->
        <link rel="stylesheet" href="fancybox/source/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
        <script type="text/javascript" src="fancybox/source/jquery.fancybox.pack.js?v=2.1.5"></script>

        <!-- Optionally add helpers - button, thumbnail and/or media -->
        <link rel="stylesheet" href="fancybox/source/helpers/jquery.fancybox-buttons.css?v=1.0.5" type="text/css" media="screen" />
        <script type="text/javascript" src="fancybox/source/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script>
        <script type="text/javascript" src="fancybox/source/helpers/jquery.fancybox-media.js?v=1.0.6"></script>

        <link rel="stylesheet" href="fancybox/source/helpers/jquery.fancybox-thumbs.css?v=1.0.7" type="text/css" media="screen" />
        <script type="text/javascript" src="fancybox/source/helpers/jquery.fancybox-thumbs.js?v=1.0.7"></script>

        <script src="references/main.js"></script>

        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="references/stylesheet.css" />
        <link type="text/css" rel="stylesheet" href="references/SlickNav/slicknav.css" />

        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->
        ';
    }
    return $head;
}

function generateFooter() {
    $footer = '
    <div id="footer">
        <!-- Oh well if Google can use center tags so can I! -->
        <center>
            <table>
                <tr>
                    <td><span class="footer-blob">&copy; ' . date("Y") . ' Dylan Gleicher (Creator of DIG Productions). All Rights Reserved. Site by DIG Productions (<a href="mailto:dgleiche@me.com">dgleiche@me.com</a>).</span></td>
                </tr>
                <tr>
                    <td><div class="fb-like-box" data-href="https://www.facebook.com/WreckerRobotics" data-height="1" data-colorscheme="light" data-show-faces="true" data-header="true" data-stream="false" data-show-border="true"></div></td>
                </tr>
            </table>
        </center>
    </div>
    ';
    return $footer;
}

function br2nl($str) {
    $str = preg_replace("/(\r\n|\n|\r)/", "", $str);
    return preg_replace("=<br */?>=i", "\n", $str);
}

function sec_session_start() {
    $session_name = 'sec_session_id';
    $secure = SECURE;

    $httponly = true;

    if (ini_set('session.use_only_cookies', 1) === FALSE) {
        header("Location: ../../error.php?err=Could not initiate a safe session (ini_set)");
        exit();
    }
    //Get cookie params
    $cookieParams = session_get_cookie_params();
    session_set_cookie_params($cookieParams["lifetime"],
        $cookieParams["path"],
        $cookieParams["domain"],
        $secure,
        $httponly);

    //Set the session name
    session_name($session_name);
    session_start();
    session_regenerate_id(); //Regenerate session, delete old one
}

function login($email, $password, $mysqli) {
    //Using prepared statements protects against injection
    if ($stmt = $mysqli->prepare("SELECT id, password, salt FROM members WHERE username = ? LIMIT 1")) {
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();

        //Retrieve results
        $user_id = $db_password = $salt = '';
        $stmt->bind_result($user_id, $db_password, $salt);
        $stmt->fetch();

        //Hash pass with salt
        $password = hash('sha512', $password . $salt);
        if ($stmt->num_rows == 1) {
            //Check pw match
            if ($db_password == $password) {
                //Password matches
                $user_browser = $_SERVER['HTTP_USER_AGENT'];
                //XSS Protection (might print value)
                $user_id = preg_replace("/[^0-9]+/", "", $user_id);
                $_SESSION['user_id'] = $user_id;

                //More XSS Protection
                $username = preg_replace("/[^a-zA-Z0-9_\-]+/", "", $email);
                $_SESSION['username'] = $email;
                $_SESSION['login_string'] = hash('sha512', $password . $user_browser);

                return true;
            } else {
                //PW incorrect
                return false;
            }
        } else {
            //No user exists
            return false;
        }
    }
}

function login_check($mysqli) {
    //Check if all SESSION vars are set
    if (isset($_SESSION['user_id'], $_SESSION['username'], $_SESSION['login_string'])) {
        $user_id = $_SESSION['user_id'];
        $login_string = $_SESSION['login_string'];
        $username = $_SESSION['username'];

        //User-agent string of user
        $user_browser = $_SERVER['HTTP_USER_AGENT'];

        if ($stmt = $mysqli->prepare("SELECT password FROM members WHERE id = ? LIMIT 1")) {
            $stmt->bind_param('i', $user_id);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows == 1) {
                //Get vars
                $password = '';
                $stmt->bind_result($password);
                $stmt->fetch();
                $login_check = hash('sha512', $password . $user_browser);

                if ($login_check == $login_string) {
                    //Logged In
                    return true;
                } else {
                    //Not logged in
                    return false;
                }
            } else {
                //Not logged in
                return false;
            }
        } else {
            //Not logged in
            return false;
        }
    } else {
        //Not logged in
        return false;
    }
}

function esc_url($url) {
    if ('' == $url) {
        return $url;
    }

    $url = preg_replace('|[^a-z0-9-~+_.?#=!&;,/:%@$\|*\'()\\x80-\\xff]|i', '', $url);

    $strip = array('%0d', '%0a', '%0D', '%0A');
    $url = (string) $url;

    $count = 1;
    while ($count) {
        $url = str_replace($strip, '', $url, $count);
    }

    $url = str_replace(';//', '://', $url);

    $url = htmlentities($url);

    $url = str_replace('&amp;', '&#038;', $url);
    $url = str_replace("'", '&#039;', $url);

    if ($url[0] !== '/') {
        //Only interested in relevant links from PHP_SELF
        return '';
    } else {
        return $url;
    }
}

function retrieveArticles($mysqli, &$id, &$title, &$date, &$image_loc, &$text, &$stmt) {
    if ($stmt = $mysqli->prepare("SELECT id, title, date, image_loc, text FROM announcements ORDER BY id DESC")) {
        //Store results as array
        $stmt->execute();
        $stmt->bind_result($id, $title, $date, $image_loc, $text);
        return true;
    }
    return false;
}

function retrieveBios($mysqli, &$id, &$name, &$status, &$image_loc, &$bio, &$stmt) {
    if ($stmt = $mysqli->prepare("SELECT id, name, status, image_loc, bio FROM bios ORDER BY id ASC")) {
        $stmt->execute();
        $stmt->bind_result($id, $name, $status, $image_loc, $bio);
        return true;
    }
    return false;
}

function retrieveAlbums($mysqli, &$name, &$description, &$id, &$stmt) {
    if ($stmt = $mysqli->prepare("SELECT name, description, id FROM albums ORDER BY id DESC")) {
        $stmt->execute();
        $stmt->bind_result($name, $description, $id);
        $stmt->store_result();
        return true;
    }
    return false;
}

function lastImageFromAlbum($mysqli, $album_id) {
    //Retrieve image from album
    if ($stmt = $mysqli->prepare("SELECT image_loc FROM gallery_imgs WHERE album_id=? ORDER BY id DESC LIMIT 1")) {
        $stmt->bind_param('i', $album_id);
        $stmt->execute();
        $stmt->store_result();
        $image_loc = '';
        $stmt->bind_result($image_loc);
        $stmt->fetch();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            return $image_loc;
        }
        $stmt->close();
    }
    return $mysqli->error;
    //No images in gallery -- return white image
}

function numImagesInAlbum($mysqli, $album_id) {
    if ($stmt = $mysqli->prepare("SELECT id FROM gallery_imgs WHERE album_id=?")) {
        $stmt->bind_param('i', $album_id);
        $stmt->execute();
        $stmt->store_result();

        return $stmt->num_rows;
    }
    //No photos
    return 0;
}

function retrievePhotosFromAlbum($mysqli, $album_id, &$caption, &$title, &$image_loc, &$stmt, &$photoID) {
    if ($stmt = $mysqli->prepare("SELECT caption, title, image_loc, id FROM gallery_imgs WHERE album_id=? ORDER BY id DESC")) {
        $stmt->bind_param('i', $album_id);
        $stmt->execute();
        $stmt->bind_result($caption, $title, $image_loc, $photoID);
        $stmt->store_result();
        return true;
    }
    return false;
}

function getAlbumNameAndDescription($mysqli, $id, &$name, &$desc) {
    if ($stmt = $mysqli->prepare("SELECT name, description FROM albums WHERE id=? LIMIT 1")) {
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $stmt->bind_result($name, $desc);
        $stmt->fetch();
        return true;
    }
    return false;
}

function delTree($dir) {
    $files = array_diff(scandir($dir), array('.','..'));
    foreach ($files as $file) {
        (is_dir("$dir/$file")) ? delTree("$dir/$file") : unlink("$dir/$file");
    }
    return rmdir($dir);
}