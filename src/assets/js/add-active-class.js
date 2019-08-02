'use strict';

$(function () {
    var location = window.location.href;
  
    var cur_url = location.split('/').pop();

    $('#js-menu .header__menu-link').each(function () {
        var link = $(this).attr('href');

        if (cur_url == link) {
            $(this).addClass('active');
        }
    });

    $('#js-menuFooter .footer__menu-link').each(function () {
        var link = $(this).attr('href');

        if (cur_url == link) {
            $(this).addClass('active');
        }
    });

    $('#js-menu .header__menu-link.active').click(function(e) {
        e.preventDefault();
    });

    $('#js-menuFooter .footer__menu-link.active').click(function(e) {
        e.preventDefault();
    })
});