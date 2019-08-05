$(function () {
    var addPopupPlace = function (map, markerElem, coordinates) {

        // window.util.removePopups('.mapboxgl-popup');
        // window.util.removePopups('.popup-place');

        var fragment = document.createDocumentFragment();
        fragment.appendChild(window.templatePlace(markerElem, coordinates));
        $('#map').append(fragment);
        
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

    window.addPopupPlace = function (map, markerElem, coordinates) {
        addPopupPlace(map, markerElem, coordinates);
    }
});