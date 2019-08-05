$(function () {
    var switchPopup = function (markerElem) {
        $('#map .hamburger').removeClass('is-active');

        if ($('div').is('#map .popup')) {
            $('#map .popup').addClass('slide-out-left');
            setTimeout(function () { 
                $('#map .popup').remove();
            }, 400);
            setTimeout(function () { 
                window.addPopupCity(markerElem);
            }, 600);
        } else {
            window.addPopupCity(markerElem);
        }
    };

    var closePopup = function () {
        $('#map .hamburger').removeClass('is-active');
        $('#map .popup-menu').addClass('slide-out-left');
        setTimeout(function () { 
            $('#map .popup-menu').remove();
        }, 400);
    };

    var removePopups = function (selector) {
        $(selector).each(function (index, elem) {
            elem.remove()
        })
    };

    var flyTo = function (map, coordinates, array) {
        removePopups('.mapboxgl-popup');
        removePopups('.popup-place');
        
        var zoomValue = map.getZoom();
        zoomValue = zoomValue <= 12 ? 12 : zoomValue;

        map.flyTo({
            center: coordinates,
            zoom: zoomValue,
            bearing: 2,
            
            // speed: 0.8,
            speed: 2,
            curve: 1,

            easing: function (t) { return t; }
        });

        if (array !== undefined) {
            window.addPopupPlace(map, array, coordinates)
        }
    };

    var switchLayer = function (map, zoomValue) {
        if (zoomValue > 10) {
            map.setLayoutProperty('city', 'visibility', 'none');
            map.setLayoutProperty('point', 'visibility', 'visible');
        } else {
            map.setLayoutProperty('point', 'visibility', 'none');
            map.setLayoutProperty('city', 'visibility', 'visible');
        }
    };

    window.util = {
        switchPopup: function (markerElem) {
            switchPopup(markerElem);
        },
        closePopup: function () {
            closePopup();
        },
        removePopups: function (selector) {
            removePopups(selector);
        },
        flyTo: function (map, coordinates, array) {
            flyTo(map, coordinates, array);
        },
        switchLayer: function (map, zoomValue) {
            switchLayer(map, zoomValue);
        }
    }

});