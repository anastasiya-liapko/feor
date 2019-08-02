'use strict';

$(function () {
    
    $('#js-organizatiiList .list__item').click(function(e) {
        removeActiveClass($(this));

        $(this).addClass('active');

        e.preventDefault();

        var selector = $(this).attr('data-href');
        var position = $('#' + selector).offset().top;

        $("body, html").animate({
            scrollTop: position
        } /* speed */ );
    });

    $('#js-traditionsList .list__item').click(function(e) {
        removeActiveClass($(this));

        $(this).addClass('active');

        e.preventDefault();

        var selector = $(this).attr('data-href');
        var position = $('#' + selector).offset().top;

        $("body, html").animate({
            scrollTop: position
        } /* speed */ );
    });

    $('#js-scrollToTop').click(function(e) {
        e.preventDefault();
        removeActiveClass();

        $("body, html").animate({
            scrollTop: 0
        } /* speed */ );
    });

    $(window).scroll(function() {
        var length = $(document).scrollTop();
        if (length > $(window).height()) {
            $('#js-scrollToTop').css('display', 'flex');
        } else {
            $('#js-scrollToTop').css('display', 'none');
        }
    })
});

var removeActiveClass = function(elem) {
    $(elem).each(function() {
        $(this).removeClass('active')
    })
};

if (window.location.hash!='')
{
    window.hashName = window.location.hash;
    window.location.hash = '';
    $(document).ready(function() {
        $('html').animate({scrollTop: $(window.hashName).offset().top}, 500, function() {
            window.location.hash = window.hashName;
        });
    });
}