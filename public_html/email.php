<?php
session_start();

function escape_message($string) {

    $bad = array("content-type","bcc:","to:","cc:","href");

    return str_replace($bad,"",$string);
}

function check_address($field)
{
    // Sanitize e-mail address
    $field = filter_var($field, FILTER_SANITIZE_EMAIL);
    // Validate e-mail address
    if(filter_var($field, FILTER_VALIDATE_EMAIL))
    {
        return TRUE;
    }
    else
    {
        return FALSE;
    }
}

if(isset($_POST['email']) && $_POST['email'] != '' && check_address($_POST['email']) && isset($_POST['subject']) && $_POST['subject'] != '' && isset($_POST['message']) && $_POST['message'] != '') {
    $email_to = 'dgleiche@me.com,rgleiche@optonline.net,madelinemds97@optonline.net,eonsin@126.com,svisme@me.com';
    $email_from = filter_var(escape_message($_POST['email']), FILTER_SANITIZE_EMAIL);
    $subject = escape_message($_POST['subject']);
    $message = wordwrap(escape_message($_POST['message']), 70);

    $headers = 'From: ' . $email_from . "\r\n" .
            'Reply-To: ' . $email_from . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

    @mail($email_to, $subject, $message, $headers);

    header('Location: contact.php?success=true');
}

else {
    //Fields haven't been properly completed
    $query_string = "err=true";
    if (!isset($_POST['email']) || $_POST['email'] == '' || !check_address($_POST['email'])) {
        $query_string .= '&email_err=true';
    }

    if (!isset($_POST['subject']) || $_POST['subject'] == '') {
        $query_string .= "&subject_err=true";
    }

    if (!isset($_POST['message']) || $_POST['message'] == '') {
        $query_string .= "&message_err=true";
    }

    header('Location: contact.php?' . $query_string);
}