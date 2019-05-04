'use strict';

$(function () {

    $('#js-hamburger').on('click', function () {
        $('#js-hamburger').toggleClass('active');
        $('#js-menu').slideToggle();
    });

});