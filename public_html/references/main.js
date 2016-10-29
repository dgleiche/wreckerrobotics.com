function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.bio-img').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function(){
    $("#navbar li").has(".team-submenu").hover(function() {
        $(".team-submenu").stop(true).slideToggle();
    });

    $("#navbar li").has(".media-submenu").hover(function() {
        $(".media-submenu").stop(true).slideToggle();
    });

    $(function() {
        $('#navbar').slicknav({
            label: '',
            duration: 500,
            closedSymbol: '',
            openedSymbol: ''
        });
    });

    $("#navigator").scrollable();

    $("#team-updates").hover(function() {
        $("#team-updates .right").css("border-left", "30px solid rgba(255, 239, 27, 1)");
        $("#team-updates .left").css("border-right", "30px solid rgba(255, 239, 27, 1)");
    }, function() {
        $("#team-updates .right").css("border-left", "30px solid rgba(255, 239, 27, 0.4)");
        $("#team-updates .left").css("border-right", "30px solid rgba(255, 239, 27, 0.4)");
    });

    if ($("#login-status").is(":visible")) {
        //To account for the login bar's 20px
        $("ul#navbar").css('top', '20px');
    }

    $(".member-logged_in").hover(function() {
        $(this).css('background', 'whitesmoke');
    }, function() {
        $(this).css('background', 'white');
    });

    $("#imgInput").change(function(){
        readURL(this);
        $('.bio-img').fadeIn('slow');
    });

    $(".fancybox").fancybox();
});

$(function() {

    // if the function argument is given to overlay,
    // it is assumed to be the onBeforeLoad event listener
    $("a[rel=#overlay]").overlay({
        mask: 'grey',
        effect: 'apple'
    });
});

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function formhash(form, password) {
    // Create a new element input, this will be our hashed password field.
    var p = document.createElement("input");

    // Add the new element to our form.
    form.appendChild(p);
    p.name = "p";
    p.type = "hidden";
    p.value = hex_sha512(password.value);

    // Make sure the plaintext password doesn't get sent.
    password.value = "";

    // Finally submit the form.
    form.submit();
}

function validate() {
    var email_regex = /@/;
    var email_field = $('input[name=email]').attr('value');
    //Store whether form failed so we don't return after only checking one field
    var failed = false;
    if (!email_regex.test(email_field)) {
        $('.inv_email').css('display', 'block');
        $('input[name=email]').addClass('red-outline');
        failed = true;
    } else {
        $('.inv_email').css('display', 'none');
        $('input[name=email]').removeClass('red-outline');
    }

    if ($('input[name=subject]').attr('value') == '') {
        $('.inv_subject').css('display', 'block');
        $('input[name=subject]').addClass('red-outline');
        failed = true;
    } else {
        $('.inv_subject').css('display', 'none');
        $('input[name=subject]').removeClass('red-outline');
    }

    if ($('textarea[name=message]').val() == '') {
        $('.inv_message').css('display', 'block');
        $('textarea[name=message]').addClass('red-outline');
        failed = true;
    } else {
        $('.inv_message').css('display', 'none');
        $('textarea[name=message]').removeClass('red-outline');
    }

    if (failed) {
        $('.error').css('display', 'block');
        $('.success').css('display', 'none');
        return false;
    }
}