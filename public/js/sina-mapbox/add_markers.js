$(function () {
    var addMarkers = function (map, markers) {

        var geo = [];
        var geoCities = [];

        Array.prototype.forEach.call(markers, function (markerElem) {
            // var id = markerElem.getAttribute('id');
            var parentId = markerElem.getAttribute('parentId');
            
            var name = markerElem.getAttribute('name');
            var address = markerElem.getAttribute('address');
            // var type = markerElem.getAttribute('type');
            var descr = markerElem.getAttribute('descr');
            var more = markerElem.getAttribute('descrLink');
            var point = [parseFloat(markerElem.getAttribute('lng')), parseFloat(markerElem.getAttribute('lat'))];
            
            var myGeoJSON = {};
            myGeoJSON.type = "Feature";

            myGeoJSON.geometry = {};
            myGeoJSON.geometry.type = "Point";
            myGeoJSON.geometry.coordinates = point;

            myGeoJSON.properties = {};
            myGeoJSON.properties.name = name;   
            myGeoJSON.properties.address = address; 
            myGeoJSON.properties.descr = descr;
            myGeoJSON.properties.more = more;       
            myGeoJSON.properties.img = 'images/s1200-3.jpeg';             

            if (parseInt(parentId) === 0) {
                geoCities.push(myGeoJSON);
            } else {
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
            var address = e.features[0].properties.name;
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