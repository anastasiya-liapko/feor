'use strict';

$(function () {
    var LANG_LIST_POSITION_TOP = '-123px'

    $('#js-lang').on('click', function () {
        $('#js-langList').toggleClass('active');
    });

    $('#js-langList').on('click', function (e) {
        var target = $(e.target);
        if (target.is('li')) {
            var picked = target.text();
            $('#js-langPicked').text(picked)
        }
    });

    $(document).click(function(e) {
        if ($(e.target).closest('#js-lang').length) return;
        $('#js-langList').removeClass('active');
        event.stopPropagation();
    });

});