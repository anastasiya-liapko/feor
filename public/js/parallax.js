'use strict';

$(function () {

    let addParallax = function() {

        let scroll = function () {
            let parent = document.getElementById('js-parallax');
            let children = parent.querySelectorAll('.parallax__layer');
            for(let i = 0; i < children.length; i++) {
                 children[i].style.transform = 'translateY(-' + (window.pageYOffset * i / children.length) + 'px)';
               }
        };
        
        if ($(window).width() > 991) {
            window.addEventListener('scroll', scroll);
        }
    };
    addParallax();

    $(window).resize(function() {
        addParallax();
    });
});