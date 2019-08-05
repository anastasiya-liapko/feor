$(function () {
    const URL = 'get_base.php'
    // const URL = '../../../get_base.php'
    
    $.post(URL, {map_params: 1}, function (msg) {
        const PLACE = 'public/img/map-pin.png';
        const PLACES = 'public/img/map-pin-large.png';
        // const PLACE = 'http://localhost:8888/public/img/map-pin.png';
        // const PLACES = 'http://localhost:8888/public/img/map-pin-large.png';

        var obj = jQuery.parseJSON(msg);
        let params = {lat: -56.857595, lng: 151.171936, zoom: 10};

        if (obj[0].lat !== undefined) {
            params = obj[0];
        }

        var uluru = {lat: params.lat, lng: params.lng};

        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpYXBrbyIsImEiOiJjangyenVmeGMwcTFjM3lvNGhsdmUzejRoIn0.zdJYMN5sxS2SJXZV2Lb3aA';

        var map = new mapboxgl.Map({
            container: 'map',
            // для изменения стилей 
            // https://studio.mapbox.com/styles/aliapko/cjx336vt21apr1cpadxu1ogcg/edit/#3.08/43.35/36.8
            style: 'mapbox://styles/aliapko/cjyrd7mp10cqw1cmkus4q9qaj',
            // style: 'mapbox://styles/aliapko/cjx336vt21apr1cpadxu1ogcg/draft',
            center: uluru,
            zoom: params.zoom
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


        // load pins images on the map
        map.loadImage(PLACE, function(error, image) {
            if (error) throw error;
            map.addImage('place', image);
        });

        map.loadImage(PLACES, function(error, image) {
            if (error) throw error;
            map.addImage('places', image);
        });


        map.addControl(new mapboxgl.NavigationControl());


        var markersArray = [];


        // logic when map loading
        map.on('load', function () {
            var zoomValue = map.getZoom();
            downloadUrl(URL, function (data) {
                var xml = data.responseXML;
                var markers = xml.documentElement.getElementsByTagName('marker');
                getMarkersWithChildren(markers);
                window.menu.addMenu(map, markersArray);
                window.marker.addMarkers(map, markersArray);
                window.util.switchLayer(map, zoomValue); 
            });
        });


        // show/hide layers when zoom changed
        map.on('zoom', function () {
            var zoomValue = map.getZoom();
            window.util.switchLayer(map, zoomValue);            
        });


        // remove popups on click
        $(document).on('click', function (e) {
            if (e.target.closest('#map') === null) {
                window.util.removePopups('.mapboxgl-popup');
                window.util.removePopups('.popup-place');
            }
        })
        

        // transform list of places into array with children
        var getMarkersWithChildren = function (markers) {
            
            Array.prototype.forEach.call(markers, function (parent, i) {
                var id = parent.getAttribute('id');
                var parentId = parent.getAttribute('parentId');
                if (parseInt(parentId) === 0) {
                    markersArray.push({
                        'id': parent.getAttribute('id'),
                        'parentId': parent.getAttribute('parentId'),
                        'name': parent.getAttribute('name'),
                        'address': parent.getAttribute('address'),
                        'point': [parseFloat(parent.getAttribute('lng')), parseFloat(parent.getAttribute('lat'))],
                        'descr': parent.getAttribute('descr'),
                        'more': parent.getAttribute('descrLink'),
                        'img': 'images/s1200-3.jpeg',
                        'person': parent.getAttribute('person'),
                        'phone': parent.getAttribute('phone'),
                        'childs': []
                    });
    
                    Array.prototype.forEach.call(markers, function (child) {
                        var childParentId = child.getAttribute('parentId');
                        if (parseInt(childParentId) === parseInt(id)) {
                            markersArray[i].childs.push({
                                'id': child.getAttribute('id'),
                                'parentId': child.getAttribute('parentId'),
                                'name': child.getAttribute('name'),
                                'address': child.getAttribute('address'),
                                'point': [parseFloat(child.getAttribute('lng')), parseFloat(child.getAttribute('lat'))],
                                'descr': child.getAttribute('descr'),
                                'more': child.getAttribute('descrLink'),
                                'img': 'images/s1200-3.jpeg',
                                'person': parent.getAttribute('person'),
                                'phone': parent.getAttribute('phone')
                            });
                        };
                    });
                };
            });
        };

    });

    function doNothing() {}
});