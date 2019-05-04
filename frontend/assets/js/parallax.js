'use strict';

$(function () {
    var SCROLL_SPEED = 5;
    var MOBILE_WIDTH = 991;

    $('body').show();

    var setHeight = function () {
        var height = $('.page').height() - ($('.page').height() - $(window).height()) / SCROLL_SPEED;
        $('#js-parallax').height(height);
    }

    var scroll = function () {
        for(var i = 0; i < $('#js-parallax').find('.parallax__layer').length; i++) {
            $('#js-parallax').css('transform', 'translateY(' + ($(window).scrollTop() / SCROLL_SPEED) + 'px');
        }
    };
   
    var addParallax = function() {
        
        if ($(window).width() > MOBILE_WIDTH) {
            setHeight();
            scroll();
            $(window).on('scroll', scroll);
        } else {
            $('#js-parallax').height('auto');
            $(window).on('scroll', function() {
                $('#js-parallax').css('transform', 'translateY(0px)');
            });
        }
    };

    addParallax();

    $(window).resize(function () {
        addParallax();
    });
});