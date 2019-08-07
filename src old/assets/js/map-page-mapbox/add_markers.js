$(function () {
    var addMarkers = function (map, markersArray) {

        var geo = [];
        var geoCities = [];

        var createGeoJSON = function (elem) {
            var myGeoJSON = {};
            myGeoJSON.type = "Feature";

            myGeoJSON.geometry = {};
            myGeoJSON.geometry.type = "Point";
            myGeoJSON.geometry.coordinates = elem.point;

            myGeoJSON.properties = {};
            myGeoJSON.properties.name = elem.name;   
            myGeoJSON.properties.address = elem.address; 
            myGeoJSON.properties.quantity = elem.childs === undefined || elem.childs.length === 0 ? '' : elem.childs.length;myGeoJSON.properties.person = elem.person;   
            myGeoJSON.properties.phone = elem.phone;  
            myGeoJSON.properties.icon = elem.childs === undefined || elem.childs.length === 0 ? 'place' : 'places'; 

            return myGeoJSON;
        }

        Array.prototype.forEach.call(markersArray, function (markerElem) {  
            var myGeoJSON = createGeoJSON(markerElem);
            geoCities.push(myGeoJSON);

            if (markerElem.childs.length !== 0) {

                Array.prototype.forEach.call(markerElem.childs, function (child) {
                    var myGeoJSON = createGeoJSON(child);
                    geo.push(myGeoJSON);
                })
            }
        });

        // map.addLayer({
        //     "id": 'points',
        //     "type": "circle",
        //     "source": {
        //         "type": "geojson",
        //         "data": {
        //             "type": "FeatureCollection",
        //             "features": geoCities
        //         }
        //     },
        //     "paint": {
        //         "circle-stroke-width": 10,
        //         "circle-stroke-opacity": 0,
        //         "circle-stroke-color": "#1a3646",
        //         "circle-color": "#54ecea",
        //         "circle-radius": ["interpolate", ["linear"], ["zoom"], 7, ["interpolate", ["exponential", 1], ["number", ["get", "children"]], 1, 3, 4, 6], 22, ["interpolate", ["exponential", 1], ["number", ["get", "children"]], 999, 23]]
        //     }
        // });


        // add layer with places
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
            layout: {
                "icon-image": ["get", "icon"],
                "icon-size": 1,
                "icon-offset": [0, -25],
                "icon-allow-overlap": true
                // "icon-ignore-placement": true
            }
        });


        // add layer with cities
        map.addLayer({
            id: "city",
            type: "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": geoCities
                }
            },
            paint: {
                "text-color": "#26465f",
                // "text-translate": ["interpolate", ["exponential", 1.7], ["zoom"], 10, ["literal", [5, 4]], 15, ["literal", [14, 14]]]
                "text-translate": [0,-32]
            },
            layout: {
                "icon-image": ["get", "icon"],
                // "icon-size": {
                //     base: 1,
                //     stops: [[13, .4], [16, 1]]
                // },
                "icon-size": 1,
                "icon-offset": [0, -25],
                "icon-allow-overlap": true,
                // "icon-ignore-placement": true,
                "text-line-height": 0.25,
                "text-field": ["get", "quantity"],
                "text-font": ["Open Sans Bold", "Arial Unicode MS Regular"],
                "text-size": 7
                // "text-size": ["interpolate", ["linear"], ["zoom"], 6, ["interpolate", ["exponential", 1], ["number", ["get", "children"]], 1, 11, 5, 28], 12, ["interpolate", ["exponential", 1], ["number", ["get", "children"]], 1, 40, 5, 40]],
                // "text-anchor": "right"
            }
        });


        // click place pin
        map.on('click', 'point', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            var name = e.features[0].properties.name;
            var person = e.features[0].properties.person;
            var address = e.features[0].properties.address;
            var phone = e.features[0].properties.phone;
            // window.addPopupPlace(map, [name, person, address, phone], coordinates);
            window.map_util.flyTo(map, coordinates, [name, person, address, phone]);
        });

        map.on('mouseenter', 'point', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
         
        map.on('mouseleave', 'point', function () {
            map.getCanvas().style.cursor = '';
        });


        // click city pin
        map.on('click', 'city', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // var name = e.features[0].properties.name;
            // var address = e.features[0].properties.address;
            // var descr = e.features[0].properties.descr;
            // var more = e.features[0].properties.more;
            // var img = e.features[0].properties.img;
            // window.util.switchPopup([name, address, descr, more, img]);
            window.map_util.flyTo(map, coordinates);
        });

        map.on('mouseenter', 'city', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
         
        map.on('mouseleave', 'city', function () {
            map.getCanvas().style.cursor = '';
        });
    }

    window.map_marker = {
        addMarkers: function (map, markersArray) {
            addMarkers(map, markersArray);
        }
    }
});