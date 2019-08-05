$(function () {
    var switchPopup = function (markerElem) {
        $('#map-page .hamburger').removeClass('is-active');

        if ($('div').is('#map-page .popup')) {
            $('#map-page .popup').addClass('slide-out-left');
            setTimeout(function () { 
                $('#map-page .popup').remove();
            }, 400);
            setTimeout(function () { 
                window.map_addPopupCity(markerElem);
            }, 600);
        } else {
            window.map_addPopupCity(markerElem);
        }
    };

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

    var flyTo = function (map, coordinates, array) {
        removePopups('.mapboxgl-popup');
        removePopups('.popup-place');
        
        var zoomValue = map.getZoom();
        zoomValue = zoomValue <= 14 ? 14 : zoomValue;

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
            console.log('add popup')
            window.map_addPopupPlace(map, array, coordinates)
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

    window.map_util = {
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