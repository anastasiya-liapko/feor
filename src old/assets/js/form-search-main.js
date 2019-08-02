'use strict';

$(function () {
    $('.form-search-main').on('keyup blur change', 'input', function (e) {
        if ($(this).closest('.form-search-main').find('.form-search-main__input').val() !== '') {
            $(this).closest('.form-search-main').find('.form-search-main__error').text('')
        } else {
            $(this).closest('.form-search-main').find('.form-search-main__error').text('Укажите город')
        }   
    });

    $('.form-search-main').on('submit', function (e) {

        if ($(this).find('.form-search-main__input').val() !== '') {
            $(this).closest('.form-search-main').find('.form-search-main__error').text('')
            var data = {};

            $(this).find('input').each(function() {
                data[$(this)[0].name] = $(this).val();
            })
            $.ajax({
                method: 'POST',
                url: 'upload.php',
                data: data
            })
            .done(function( msg ) {
                console.log(msg);
                var obj = jQuery.parseJSON(msg);
                console.log(obj);
            });
        } else {
            $(this).closest('.form-search-main').find('.form-search-main__error').text('Укажите город')
        }

        event.preventDefault();
    });
});