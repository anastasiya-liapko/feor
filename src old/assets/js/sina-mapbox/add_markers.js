$(function () {
    var addMarkers = function (map, markers) {

        var geo = [];

        Array.prototype.forEach.call(markers, function (markerElem) {
            var id = markerElem['id'];
            var name = markerElem['name'];
            var address = markerElem['address'];
            var point = [parseFloat(markerElem['lng']), parseFloat(markerElem['lat'])];
            

            var myGeoJSON = {};
            myGeoJSON.type = "Feature";

            myGeoJSON.geometry = {};
            myGeoJSON.geometry.type = "Point";
            myGeoJSON.geometry.coordinates = point;

            myGeoJSON.properties = {};
            myGeoJSON.properties.id = id;   
            myGeoJSON.properties.name = name;   
            myGeoJSON.properties.address = address;            

            if (markerElem['lng'] !== '' || markerElem['lat'] !== '') {
                geo.push(myGeoJSON);
            }
        });

        map.addLayer({
            "id": 'point',
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": geo
                }
            },
            "layout": {
                "icon-image": "sina",
                // "icon-size": 0.13
                "icon-size": 0.25
            }
        });
   
        map.on('click', 'point', function (e) {
            var address = e.features[0].properties.address;
            var orgs = document.querySelectorAll('.sina-map__org-address .link__text');
            orgs.forEach(function(elem) {
                if (elem.innerText === address) {
                    elem.closest('.sina-map__org').scrollIntoView({block: "start", behavior: "smooth"});
                }
            })
            var coordinates = e.features[0].geometry.coordinates.slice();
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            window.util.flyTo(map, coordinates);
        });

        map.on('mouseenter', 'point', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
         
        map.on('mouseleave', 'point', function () {
            map.getCanvas().style.cursor = '';
        });
    }

    window.marker = {
        addMarkers: function (map, markers) {
            addMarkers(map, markers);
        }
    }
});