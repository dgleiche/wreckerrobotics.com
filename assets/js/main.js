//Function for reading image as url for file chooser
function readURL(input, output) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            output.attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function getEditor(obj) {
    return obj.editable('getHTML', true, true);
}

function setEditor(obj, val) {
    obj.editable('setHTML', val, false);
}

function newEditor(selector) {
    $(selector).editable({
        inlineMode: false,
        placeholder: '',
        height: 450,
        plainPaste: false
    });
    return true;
}

function isNormalInteger(str) {
    var n = ~~Number(str);
    return String(n) === str && n >= 0;
}

$(function() {
    $('li.dropdown').hover(function() {
        $(this).toggleClass('open');
    }, function() {
        $(this).toggleClass('open');
    });

    $('#main_slider').camera({
        loader: 'bar'
    });

    //Add wysiwyg

    if ($("#post").length) {
        newEditor('#post');
        newEditor('#postEdit');
    }

    if ($("#bio").length) {
        newEditor('#bio');
        newEditor('#bioEdit');
    }

    //Form Validation
    $('#contact-form').submit(function() {
        var email = $(this).find('#email');
        var subject = $(this).find('#subject');
        var msg = $(this).find('#msg');

        var send = true;

        if (!email.val()) {
            email.parent().addClass('has-error');
            send = false;
        } else {
            email.parent().removeClass('has-error');
        }

        if (!subject.val()) {
            subject.parent().addClass('has-error');
            send = false;
        } else {
            subject.parent().removeClass('has-error');
        }

        if (!msg.val()) {
            msg.parent().addClass('has-error');
            send = false;
        } else {
            msg.parent().removeClass('has-error');
        }

        return send;
    });

    //Login form validation (doesn't check actual login)
    $('#login-form').submit(function() {
        var email = $(this).find('#email');
        var pass = $(this).find('#pass');

        var complete = true;

        if (!email.val()) {
            email.parent().addClass('has-error');
            complete = false;
        } else {
            email.parent().removeClass('has-error');
        }

        if (!pass.val()) {
            pass.parent().addClass('has-error');
            complete = false;
        } else {
            pass.parent().removeClass('has-error');
        }

        if (complete) {
            //Create new field for post to hold encrypted pass
            var p = document.createElement("input");

            $(this).append(p);
            p.name = "p";
            p.type = "hidden";
            p.value = hex_sha512(pass.val());

            //Make sure we dont send the password
            pass.val("");
        }

        return complete;
    });

    //Global to hold files
    var files;

    //Change img preview when img is chosen in bio uploader
    $('#bio-img').change(function(e) {
        //Update file
        files = e.target.files;

        var preview = $('.bio-img-preview');
        readURL(this, preview);
        preview.fadeIn('slow');
    });


    //For asynchronously adding member
    $('#add-member-btn').click(function() {
        var name, status, bio, img, form, bioVal;

        form = $('#member-form');

        name = form.find('#name');
        status = form.find('#status');
        bio = form.find('#bio');
        img = form.find('#bio-img');

        bioVal = getEditor(bio);

        //Completion check
        var complete = true;

        if (!name.val()) {
            name.parent().addClass('has-error');
            complete = false;
        } else {
            name.parent().removeClass('has-error');
        }

        if (!bioVal) {
            bio.parent().addClass('has-error');
            complete = false;
        } else {
            bio.parent().removeClass('has-error');
        }

        if (!img.val()) {
            img.addClass('form-control');
            img.parent().addClass('has-error');
            complete = false;
        } else {
            img.removeClass('form-control');
            img.parent().removeClass('has-error');
        }

        if (complete) {
            //Create formdata object to add files to
            var data = new FormData();

            data.append('file', files[0]);
            data.append('name', name.val());
            data.append('status', status.val());
            data.append('bio', bioVal);

            //Submit through ajax
            $.ajax({
                url: '/member/add',
                type: 'POST',
                data: data,
                contentType: false,
                dataType: 'json',
                processData: false,
                cache: false,
                success: window.location=window.location
            });
        }

    });

    //For editing bio
    $('.edit-member').click(function() {
        var name, bio, status, parent, modal, id;

        parent = $(this).parent().parent();

        name = parent.find('.name').text();
        bio = parent.find('.bio').html();
        status = parent.attr('data-status');
        id = parent.attr('id');

        modal = $('#memberEditModal');

        modal.find("#id").val(id);

        //Set the modal vals
        var nName, nStatus, nBio;

        nName = modal.find('#name');
        nStatus = modal.find('#status');

        nBio = modal.find('#bioEdit');

        nName.val(name);

        setEditor(nBio, bio);

        switch (status) {
            case '0':
                nStatus.val("Captain");
                break;
            case '1':
                nStatus.val("Member");
                break;
            case '2':
                nStatus.val("Alum");
                break;
            default:
                break;
        }

    });

    $("#edit-member-btn").click(function() {
        var name, status, bio, form, id, bioVal;

        form = $('#edit-member-form');

        name = form.find('#name');
        status = form.find('#status');
        bio = form.find('#bioEdit');
        id = form.find('#id');

        bioVal = getEditor(bio);

        //Completion check
        var complete = true;

        if (!name.val()) {
            name.parent().addClass('has-error');
            complete = false;
        } else {
            name.parent().removeClass('has-error');
        }

        if (!bioVal) {
            bio.parent().addClass('has-error');
            complete = false;
        } else {
            bio.parent().removeClass('has-error');
        }

        if (complete) {
            //Create formdata object to add files to
            var data = new FormData();

            data.append('name', name.val());
            data.append('status', status.val());
            data.append('bio', bioVal);
            data.append('id', id.val());

            //Submit through ajax
            $.ajax({
                url: '/member/update',
                type: 'POST',
                data: data,
                contentType: false,
                dataType: 'json',
                processData: false,
                cache: false,
                success: window.location=window.location
            });
        }

    });

    $('.delete-member').click(function() {
        if (confirm('Are You Sure You Want to Delete?')) {
            var id = $(this).parent().parent().attr('id');

            var data = new FormData();

            data.append('id', id);

            //Submit through ajax
            $.ajax({
                url: '/member/delete',
                type: 'POST',
                data: data,
                contentType: false,
                dataType: 'json',
                processData: false,
                cache: false,
                success: window.location=window.location
            });
        }
    });

    //For asynchronously adding announcement
    $('#add-announcement-btn').click(function() {
        var title, post, form, postVal;

        form = $('#announcement-form');

        title = form.find('#title');
        post = $("#post");

        postVal = getEditor(post);

        //Completion check
        var complete = true;

        if (!title.val()) {
            title.parent().addClass('has-error');
            complete = false;
        } else {
            title.parent().removeClass('has-error');
        }

        if (!postVal) {
            post.parent().addClass('has-error');
            complete = false;
        } else {
            post.parent().removeClass('has-error');
        }

        if (complete) {
            //Create formdata object to add files to
            var data = new FormData();

            data.append('title', title.val());
            data.append('post', postVal);

            //Submit through ajax
            $.ajax({
                url: '/announcement/add',
                type: 'POST',
                data: data,
                contentType: false,
                dataType: 'json',
                processData: false,
                cache: false,
                success: window.location=window.location
            });
        }

    });

    $('.edit-announcement').click(function() {
        var title, post, parent, modal, id;

        parent = $(this).parent().parent();

        title = parent.find('.title').text();
        post = parent.find('.post').html();
        id = parent.attr('id');

        modal = $('#announcementEditModal');

        modal.find("#id").val(id);

        //Set the modal vals
        var nTitle, nPost;

        nTitle = modal.find('#title');

        nPost = modal.find('#postEdit');

        nTitle.val(title);

        setEditor(nPost, post);
    });

    $("#edit-announcement-btn").click(function() {
        var title, post, form, id, postVal;

        form = $('#announcement-edit-form');

        title = form.find('#title');
        post = form.find('#postEdit');
        id = form.find('#id');

        postVal = getEditor(post);

        //Completion check
        var complete = true;

        if (!title.val()) {
            title.parent().addClass('has-error');
            complete = false;
        } else {
            title.parent().removeClass('has-error');
        }

        if (!postVal) {
            post.parent().addClass('has-error');
            complete = false;
        } else {
            post.parent().removeClass('has-error');
        }

        if (complete) {
            //Create formdata object to add files to
            var data = new FormData();

            data.append('title', title.val());
            data.append('post', postVal);
            data.append('id', id.val());

            //Submit through ajax
            $.ajax({
                url: '/announcement/update',
                type: 'POST',
                data: data,
                contentType: false,
                dataType: 'json',
                processData: false,
                cache: false,
                success: window.location=window.location
            });
        }

    });

    $('.delete-announcement').click(function() {
        if (confirm('Are You Sure You Want to Delete?')) {
            var id = $(this).parent().parent().attr('id');

            var data = new FormData();

            data.append('id', id);

            //Submit through ajax
            $.ajax({
                url: '/announcement/delete',
                type: 'POST',
                data: data,
                contentType: false,
                dataType: 'json',
                processData: false,
                cache: false,
                success: window.location=window.location
            });
        }
    });

    $('#add-album-btn').click(function() {
        var name, description, form;

        form = $('#album-form');

        name = form.find('#name');

        description = form.find('#description');

        //Completion check
        var complete = true;

        if (!name.val()) {
            name.parent().addClass('has-error');
            complete = false;
        } else {
            name.parent().removeClass('has-error');
        }

        if (!description.val()) {
            description.parent().addClass('has-error');
            complete = false;
        } else {
            description.parent().removeClass('has-error');
        }

        if (complete) {
            //Create formdata object to add files to
            var data = new FormData();

            data.append('name', name.val());
            data.append('description', description.val());

            //Submit through ajax
            $.ajax({
                url: '/album/add',
                type: 'POST',
                data: data,
                contentType: false,
                dataType: 'json',
                processData: false,
                cache: false,
                success: window.location=window.location
            });
        }

    });

    $('.edit-album').click(function() {
        var name, description, parent, modal, id;

        parent = $(this).parent().parent();

        name = parent.find('.name').text();
        description = parent.find('.description').text();
        id = parent.attr('id');

        modal = $('#albumEditModal');

        modal.find("#id").val(id);

        //Set the modal vals
        var nName, nDescription;

        nName = modal.find('#name');
        nDescription = modal.find('#description');

        nName.val(name);
        nDescription.val(description);
    });

    $("#edit-album-btn").click(function() {
        var name, description, form, id;

        form = $('#album-edit-form');

        name = form.find('#name');
        description = form.find('#description');
        id = form.find('#id');

        //Completion check
        var complete = true;

        if (!name.val()) {
            name.parent().addClass('has-error');
            complete = false;
        } else {
            name.parent().removeClass('has-error');
        }

        if (!description.val()) {
            description.parent().addClass('has-error');
            complete = false;
        } else {
            description.parent().removeClass('has-error');
        }

        if (complete) {
            //Create formdata object to add files to
            var data = new FormData();

            data.append('name', name.val());
            data.append('description', description.val());
            data.append('id', id.val());

            //Submit through ajax
            $.ajax({
                url: '/album/update',
                type: 'POST',
                data: data,
                contentType: false,
                dataType: 'json',
                processData: false,
                cache: false,
                success: window.location=window.location
            });
        }
    });

    $('.delete-album').click(function() {
        if (confirm('Are You Sure You Want to Delete?')) {
            var id = $(this).parent().parent().attr('id');

            var data = new FormData();

            data.append('id', id);

            //Submit through ajax
            $.ajax({
                url: '/album/delete',
                type: 'POST',
                data: data,
                contentType: false,
                dataType: 'json',
                processData: false,
                cache: false,
                success: window.location=window.location
            });
        }
    });

    //Global to hold gallery images
    var galFiles;

    //Change img preview when img is chosen in bio uploader
    $('#gallery-img-up').change(function(e) {
        //Update file
        galFiles = e.target.files;

        var preview = $('.gallery-img-preview');
        readURL(this, preview);
        preview.fadeIn('slow');
    });

    $('#add-gallery-btn').click(function() {
        var description, img, form, id;

        form = $('#gallery-form');

        description = form.find('#description');
        id = form.find('#id');
        img = form.find('#gallery-img-up');

        //Completion check
        var complete = true;

        if (!description.val()) {
            description.parent().addClass('has-error');
            complete = false;
        } else {
            description.parent().removeClass('has-error');
        }

        if (!id.val()) {
            id.parent().addClass('has-error');
            complete = false;
        } else {
            id.parent().removeClass('has-error');
        }

        if (!img.val()) {
            img.addClass('form-control');
            img.parent().addClass('has-error');
            complete = false;
        } else {
            img.removeClass('form-control');
            img.parent().removeClass('has-error');
        }

        if (complete) {
            //Create formdata object to add files to
            var data = new FormData();

            data.append('file', galFiles[0]);
            data.append('description', description.val());
            data.append('album', id.val());

            alert('Image Added Successfully');

            //Submit through ajax
            $.ajax({
                url: '/gallery/add',
                type: 'POST',
                data: data,
                contentType: false,
                dataType: 'json',
                processData: false,
                cache: false,
                success: window.location.reload()
            });
        }

    });

    if ($('.scale').length) {
        var images = $('.scale');

        images.each(function(i) {
            var width = $(this).width();
            var height = images.height();

            var valScale = width;

            //Scale we want
            var nScale = 200;

            var perScale = nScale / valScale;

            $(this).css({
                "zoom": perScale,
                '-moz-transform': perScale,
                '-o-transform': perScale
            });
        });
    }

    //Global to hold images
    var sliderFiles;

    //Change img preview when img is chosen in bio uploader
    $('#slider-img-up').change(function(e) {
        //Update file
        sliderFiles = e.target.files;

        var preview = $('.slider-img-preview');
        readURL(this, preview);
        preview.fadeIn('slow');
    });

    $('#add-slider-btn').click(function() {
        var img, form;

        form = $('#slider-image-form');

        img = form.find('#slider-img-up');

        //Completion check
        var complete = true;

        if (!img.val()) {
            img.addClass('form-control');
            img.parent().addClass('has-error');
            complete = false;
        } else {
            img.removeClass('form-control');
            img.parent().removeClass('has-error');
        }

        if (complete) {
            //Create formdata object to add files to
            var data = new FormData();

            data.append('file', sliderFiles[0]);

            alert('Image Added Successfully');

            //Submit through ajax
            $.ajax({
                url: '/slider/add',
                type: 'POST',
                data: data,
                contentType: false,
                dataType: 'json',
                processData: false,
                cache: false,
                success: window.location.reload()
            });
        }

    });

    $('.delete-slider').click(function() {
        if (confirm('Are You Sure You Want to Delete?')) {
            var id = $(this).parent().attr('id');

            var data = new FormData();

            data.append('id', id);

            //Submit through ajax
            $.ajax({
                url: '/slider/delete',
                type: 'POST',
                data: data,
                contentType: false,
                dataType: 'json',
                processData: false,
                cache: false,
                success: window.location=window.location
            });
        }
    });

    $("#slider-btn").click(function() {
        var sort_order;

        sort_order = $('.sort');

        sort_order.each(function(i) {

            //Completion check
            var complete = true;

            var id = $(this).attr("id");

            var sort = $(this).val();

            if (isNormalInteger(sort)) {
                var data = new FormData();

                data.append('id', id);
                data.append('sort', sort);

                //Submit through ajax
                $.ajax({
                    url: '/slider/update',
                    type: 'POST',
                    data: data,
                    contentType: false,
                    dataType: 'json',
                    processData: false,
                    cache: false
                });
            }
        });

        //Refresh the page
        window.location = window.location;
    });

    $('#register-form').submit(function() {
        var email = $(this).find('#email');
        var pass = $(this).find('#pass');
        var name = $(this).find('#name');

        var complete = true;

        if (!email.val()) {
            email.parent().addClass('has-error');
            complete = false;
        } else {
            email.parent().removeClass('has-error');
        }

        if (!pass.val()) {
            pass.parent().addClass('has-error');
            complete = false;
        } else {
            pass.parent().removeClass('has-error');
        }

        if (!name.val()) {
            name.parent().addClass('has-error');
            complete = false;
        } else {
            name.parent().removeClass('has-error');
        }

        if (complete) {
            //Create new field for post to hold encrypted pass
            var p = document.createElement("input");

            $(this).append(p);
            p.name = "p";
            p.type = "hidden";
            p.value = hex_sha512(pass.val());

            //Make sure we dont send the password
            pass.val("");
        }

        return complete;
    });
});

//Fix issue of not focusing while inside modal
$(document).on('focusin', function(e) {
    if ($(e.target).closest(".f-popup-line").length) {
        e.stopImmediatePropagation();
    }
});