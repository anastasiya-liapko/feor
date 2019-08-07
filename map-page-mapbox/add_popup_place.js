$(function () {
    var addPopupPlace = function (map, markerElem, coordinates) {

        // window.util.removePopups('.mapboxgl-popup');
        // window.util.removePopups('.popup-place');

        var fragment = document.createDocumentFragment();
        fragment.appendChild(window.map_templatePlace(markerElem, coordinates));
        $('#map-page').append(fragment);
        
        var html = $('.popup-place').append(fragment)[0].outerHTML
        new mapboxgl.Popup({
            anchor: 'bottom',
            offset: [0, -50],
            closeButton: false
        })
        .setLngLat(coordinates)
        .setHTML(html)
        .addTo(map);
    };

    window.map_addPopupPlace = function (map, markerElem, coordinates) {
        addPopupPlace(map, markerElem, coordinates);
    }
});