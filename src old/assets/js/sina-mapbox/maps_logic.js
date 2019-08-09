$(function () {
    const MIN_ZOOM = 8;
    const SINA_ICON = '/wp-content/themes/feor/public/img/sina-white.png';
    const ZOOM = 9;

    let params = {lat: 55.753208, lng: 37.604008, zoom: ZOOM};

    var uluru = {lat: params.lat, lng: params.lng};

    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpYXBrbyIsImEiOiJjangyenVmeGMwcTFjM3lvNGhsdmUzejRoIn0.zdJYMN5sxS2SJXZV2Lb3aA';

    var map = new mapboxgl.Map({
        container: 'map',
        // neon
        style: 'mapbox://styles/aliapko/cjyrd7mp10cqw1cmkus4q9qaj',
        center: uluru,
        zoom: params.zoom
        // minZoom: MIN_ZOOM
    });

    map.loadImage(SINA_ICON, function(error, image) {
        if (error) throw error;
        map.addImage('sina', image);
    });

    map.on('load', function () {
        var zoomValue = map.getZoom();
        window.marker.addMarkers(map, orgsMoscow);
    });

});
