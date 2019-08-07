$(function () {
    const PLACE = '/wp-content/themes/feor/public/img/map-pin.png';
    const PLACES = '/wp-content/themes/feor/public/img/map-pin-large.png';

    let params = {lat: 55.753208, lng: 37.604008, zoom: 12};

    // if (orgs[0].lat !== undefined) {
    //     params = obj[0];
    // }

    var uluru = {lat: params.lat, lng: params.lng};

    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpYXBrbyIsImEiOiJjangyenVmeGMwcTFjM3lvNGhsdmUzejRoIn0.zdJYMN5sxS2SJXZV2Lb3aA';

    var map = new mapboxgl.Map({
        container: 'map-page',
        // для изменения стилей 
        // https://studio.mapbox.com/styles/aliapko/cjx336vt21apr1cpadxu1ogcg/edit/#3.08/43.35/36.8
        style: 'mapbox://styles/aliapko/cjyrd7mp10cqw1cmkus4q9qaj',
        // style: 'mapbox://styles/aliapko/cjx336vt21apr1cpadxu1ogcg/draft',
        center: uluru,
        zoom: params.zoom
    });

    // load pins images on the map
    map.loadImage(PLACE, function(error, image) {
        if (error) throw error;
        map.addImage('place', image);
    });

    map.loadImage(PLACES, function(error, image) {
        if (error) throw error;
        map.addImage('places', image);
    });

    // add controls
    map.addControl(new mapboxgl.NavigationControl());

    var markersArray = [];

    // logic when map loading
    map.on('load', function () {
        var zoomValue = map.getZoom();
        getMarkersWithChildren(orgs, cities);
        window.map_menu.addMenu(map, markersArray);
        window.map_marker.addMarkers(map, markersArray);
        window.map_util.switchLayer(map, zoomValue); 
    });

    // show/hide layers when zoom changed
    map.on('zoom', function () {
        var zoomValue = map.getZoom();
        window.map_util.switchLayer(map, zoomValue);            
    });

    // remove popups on click
    $(document).on('click', function (e) {
        if (e.target.closest('#map-page') === null) {
            window.map_util.removePopups('.mapboxgl-popup');
            window.map_util.removePopups('.popup-place');
        }
    })
    
    // transform list of places into array with children
    var getMarkersWithChildren = function (orgs, cities) {
        
        Array.prototype.forEach.call(cities, function (city, cityIndex) {
            markersArray.push({
                'id': cityIndex,
                'name': city,
                'point': [parseFloat('37.607689'), parseFloat('55.788845')],
                'childs': []
            });

            Array.prototype.forEach.call(orgs, function (place, placeIndex) {
                if (place['city'] === city) {
                    markersArray[cityIndex].childs.push({
                        'name': place['name'],
                        'address': 'Москва, 127055, ул.Образцова, д.11, стр.5, эт.4',
                        // 'point': [parseFloat(child.getAttribute('lng')), parseFloat(child.getAttribute('lat'))],
                        'point': [parseFloat('37.607689'), parseFloat('55.788845')],
                        'person': 'Имя Раввина',
                        'phone': '(495) 995-57-74'
                    });
                };
            });
        });
    };

});
