$(function () {
    // $.post('../../../get_base.php', {map_params: 1}, function (msg) {
    //     const MIN_ZOOM = 8;
    //     const SINA_ICON = 'http://localhost:8888/public/img/sina.png';

    // paths for feor-dev.alef.im
    $.post('/wp-content/themes/feor/get_base.php', {map_params: 1}, function (msg) {
        const MIN_ZOOM = 8;
        const SINA_ICON = '/wp-content/themes/feor/public/img/sina-white.png';

        var obj = jQuery.parseJSON(msg);
        let params = {lat: -56.857595, lng: 151.171936, zoom: 10};

        if (obj[0].lat !== undefined) {
            params = obj[0];
        }

        var uluru = {lat: params.lat, lng: params.lng};

        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpYXBrbyIsImEiOiJjangyenVmeGMwcTFjM3lvNGhsdmUzejRoIn0.zdJYMN5sxS2SJXZV2Lb3aA';
        // mapboxgl.accessToken = 'pk.eyJ1IjoiZXVyb2FsdGVyIiwiYSI6ImNqbjV6MmRsMDN2M3Iza3F5N3gwem91ZjIifQ.jLCJyKH7fgUFe8tESEv5XA';

        var map = new mapboxgl.Map({
            container: 'map',

            // blue
            // style: 'mapbox://styles/aliapko/cjypmcduk1uaa1crs7i9txmv7',

            // neon
            style: 'mapbox://styles/aliapko/cjyrd7mp10cqw1cmkus4q9qaj',

            // ya
            // style: 'mapbox://styles/euroalter/cjhc0mx9r0ne52rld04nd20xw',

            center: uluru,
            zoom: params.zoom
            // minZoom: MIN_ZOOM
        });


        function downloadUrl(url, callback) {
            var request = window.ActiveXObject ?
                new ActiveXObject('Microsoft.XMLHTTP') :
                new XMLHttpRequest;

            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    request.onreadystatechange = doNothing;
                    callback(request, request.status);
                }
            };

            request.open('GET', url, true);
            request.send(null);
        }

        map.loadImage(SINA_ICON, function(error, image) {
            if (error) throw error;
            map.addImage('sina', image);
        });

        map.on('load', function () {
            var zoomValue = map.getZoom();
            downloadUrl('/wp-content/themes/feor/get_base.php', function (data) {
                var xml = data.responseXML;
                var markers = xml.documentElement.getElementsByTagName('marker');
                window.marker.addMarkers(map, markers);
            });
        });

    });

    function doNothing() {}
});