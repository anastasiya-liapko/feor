'use strict';

$(function () {
    $('#js-mapList .list__link').mouseover(function() {
        var selector = $(this).attr('data-pin');
        $('.pin_' + selector).addClass('hover');
    })

    $('#js-mapList .list__link').mouseleave(function() {
        var selector = $(this).attr('data-pin');
        $('.pin_' + selector).removeClass('hover');
    })

    $('#js-mapPins .pin').mouseover(function() {
        var selector = $(this).attr('data-link');
        console.log(selector)
        $('.list__link_' + selector).addClass('hover');
    })

    $('#js-mapPins .pin').mouseleave(function() {
        var selector = $(this).attr('data-link');
        $('.list__link_' + selector).removeClass('hover');
    })

});