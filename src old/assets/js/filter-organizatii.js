'use strict';

$(function () {
    $('.organizatii__search-submit').click(function(e) {
        e.preventDefault();
    });

    $('.organizatii__search-input').on('change keydown keyup', function() {
        var input = $(this);
        var cityToFind = input.val().toUpperCase();
        var cityToFindLength = cityToFind.length;
        
        var block = input.closest('.organizatii__block');

        block.find('.organizatia__contact-link_map .link__text').each(function() {
            var organizatia = $(this).closest('.organizatia');
            var city = $(this).text().toUpperCase();
            city = city.substring(0, cityToFindLength);
    
            if (city !== cityToFind) {
                organizatia.hide();
            } else {
                organizatia.show();
            }
        })
    })
});