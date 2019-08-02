'use strict';

$(function () {
    $('#js-modalSearch').on('shown.bs.modal', function (e) {
        $('#js-modalSearchInput').focus()
    })
});