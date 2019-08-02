'use strict';

function loadPostsRavvinsByCity(cityToFind)
{
    var container = $('.container_infinity_loader_ravvins');
    var fromPage = container.attr('data-from-page');

    var ajaxData = {
        'action' : 'load_posts_ravvins_by_city',
        'city_to_find' : cityToFind,
        'from_page' : fromPage
    }

    $.post(ajaxURL, ajaxData, function(s)
    {
        container.html(s);
    });
}



$(function () {
    $('.chairmen__search-submit').click(function(e) {
        e.preventDefault();

        var parent = $('.chairmen__person');
        var cityToFind = $('.chairmen__search-input').val();
        var cityToFindLength = cityToFind.length;

        parent.attr('data-city-to-find', cityToFind);

        if (cityToFind != '')
        {
            loadPostsRavvinsByCity(cityToFind);
        }

    });
});