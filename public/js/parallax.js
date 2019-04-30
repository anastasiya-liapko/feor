'use strict';

$(function () {
    let SCROLL_SPEED = 5;
    let parent = document.getElementById('js-parallax');
    let children = parent.querySelectorAll('.parallax__layer');
    // let page = document.querySelector('.page');
    
   
    let addParallax = function() {

        let scroll = function () {
            
            for(let i = 0; i < children.length; i++) {
                 // children[i].style.transform = 'translateY(-' + (window.pageYOffset * i / children.length) + 'px)';
                 // parent.style.transform = 'translateY(' + (window.pageYOffset / 2) + 'px)';
                parent.style.transform = 'translateY(' + ($(window).scrollTop() / SCROLL_SPEED) + 'px)';
               }
        };
        
        if ($(window).width() > 991) {
            window.addEventListener('scroll', scroll);
        }
    };

    addParallax();
    
    let height = $('.page').height() - ($('.page')[0].scrollHeight - $(window).height()) / SCROLL_SPEED;
    $('#js-parallax').height(height);

    $(window).resize(function() {
        addParallax();
    });
});