'use strict';

$(function () {
   
    var mySwiper = new Swiper ('.swiper-container', {
      
        direction: 'horizontal',
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        speed: 500,
        navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1550: {
              slidesPerView: 1
            }
        },
        on: {
            resize: function () {
                mySwiper.update();
            }
        }
    })
});