'use strict';

$( document ).ready(function() {

    var setHeight = function () {
        if (!$('.sina-map__button-more').hasClass('opened')) {
            var heightP = $('.sina-map__text p:first-child').innerHeight();
            $('.sina-map__text').css('max-height', heightP + 'px');
        } else {
            $('.sina-map__text').css('max-height', 4000 + 'px');
        }
    };

    setHeight();

    setTimeout(function() {
        setHeight();
    },100)
        
    $(window).on('resize', function() {
        setHeight();
    });


    $('.sina-map__button-more').on('click', function () {
        if (!$('.sina-map__button-more').hasClass('opened')) {
            $(this).addClass('opened')
            $('.sina-map__button-more').html('свернуть текст')
            $('.sina-map__button-more').attr('data-text', 'свернуть текст')
        } else {
            $('.sina-map__button-more').removeClass('opened')
            setTimeout(function() {
                $('.sina-map__button-more').html('читать далее')
                $('.sina-map__button-more').attr('data-text', 'читать далее')
            }, 2000)
        }
        setHeight();
    })
});