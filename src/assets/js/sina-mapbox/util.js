$(function () {
    var flyTo = function (map, coordinates) {
        var zoomValue = map.getZoom();

        zoomValue = zoomValue <= 13 ? 13 : zoomValue;

        map.flyTo({
            center: coordinates,
            zoom: zoomValue,
            bearing: 2,
            
            // speed: 0.8,
            speed: 2,
            curve: 1,

            easing: function (t) { return t; }
        });
    };

    window.util = {
        flyTo: function (map, coordinates) {
            flyTo(map, coordinates);
        }
    }

});