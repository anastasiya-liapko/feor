$(function () {
    var closePopup = function () {
        $('#map-page .hamburger').removeClass('is-active');
        $('#map-page .popup-menu').addClass('slide-out-left');
        setTimeout(function () { 
            $('#map-page .popup-menu').remove();
        }, 400);
    };

    var removePopups = function (selector) {
        $(selector).each(function (index, elem) {
            elem.remove()
        })
    };

    var flyTo = function (map, point, zoom) {
        if (zoom === undefined) {
            zoom = map.getZoom();
            zoom = zoom <= 14 ? 14 : zoom;
        }
        map.flyTo([point[0], point[1]], zoom)
    };


    window.map_util = {
        closePopup: function () {
            closePopup();
        },
        flyTo: function (map, point, zoom) {
            flyTo(map, point, zoom);
        },
        removePopups: function (selector) {
            removePopups(selector);
        }
    }

});