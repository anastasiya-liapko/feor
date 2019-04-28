'use strict';

$(function () {

    $('#js-hamburger').on('click', function () {
        $('#js-hamburger').toggleClass('active');
        $('#js-menu').slideToggle();
    });

    // var displayMenu = function() {
    //     if (jQuery(window).width() > 992) {
    //         $('#js-menu').css('display', 'flex');
    //     } else {
    //         $('#js-menu').css('display', 'none');
    //     }
    // };
    // displayMenu();

    // $( window ).resize(function() {
    //    displayMenu();
    // });

});