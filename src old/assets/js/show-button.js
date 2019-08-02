'use strict';

$(function () {
    var showButton = function() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opers Mini/i.test(navigator.userAgent)) {
            $('.community').each(function() {
                $(this).removeClass('show-button')
            })
        } else {
            $('.community').each(function() {
                $(this).addClass('show-button')
            })
        }
    }
    showButton();

    $(window).on('resize', function() {
        showButton();
    })
});