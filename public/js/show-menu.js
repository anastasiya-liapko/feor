'use strict';

$(function () {
    var MOBILE_WIDTH = 991;

    $('#js-hamburger').on('click', function () {
        $('#js-hamburger').toggleClass('active');
        $('#js-menu').slideToggle();
    });

    $(document).click(function(e) {
        if ($(window).width() <= MOBILE_WIDTH) {
            if ($(e.target).closest('#js-menu').length) return;
            if ($(e.target).closest('#js-hamburger').length) return;
            $('#js-menu').slideUp();
            $('#js-hamburger').removeClass('active');
            event.stopPropagation();
        }
    });

});