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
            myGeoJSON.properties.descr = elem.descr;
            myGeoJSON.properties.more = elem.more;       
            myGeoJSON.properties.img = 'images/s1200-3.jpeg'; 
            myGeoJSON.properties.quantity = elem.childs === undefined || elem.childs.length === 0 ? '' : elem.childs.length;myGeoJSON.properties.person = elem.person;   
            myGeoJSON.properties.phone = elem.phone;  
            myGeoJSON.properties.icon = elem.childs === undefined || elem.childs.length === 0 ? 'place' : 'places'; 

            // create popup
            // var name = "<p class=\"popup-place__name\">" + elem.name + "</p>"
            // var person = "<p class=\"popup-place__person\"><span class=\"icon-map-person\"></span><span>Имя Равина</span></p>"
            // var address = "<a class=\"popup-place__address\" href=\"https://yandex.by/maps/?ll=" + elem.point[0] + "," + elem.point[1] + "&z=16&text=" + elem.name.split(' ').join('%20') + "\" target=\"_blank\"><span class=\"icon-map\"></span><span>" + elem.name + "</span></a>"
            // var phone = "<a class=\"popup-place__phone\" href=\"tel:84959955774\"><span class=\"icon-phone\"></span><span>(495) 995-57-74</span></a>"

            // myGeoJSON.properties.popup = "<div class=\"popup popup-place d-flex flex-column\">" + name + person + address + phone + "</div>";

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

        map.addLayer({
            "id": 'points',
            "type": "circle",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": geoCities
                }
            },
            "paint": {
                "circle-stroke-width": 10,
                "circle-stroke-opacity": 0,
                "circle-stroke-color": "#1a3646",
                "circle-color": "#54ecea",
                "circle-radius": ["interpolate", ["linear"], ["zoom"], 7, ["interpolate", ["exponential", 1], ["number", ["get", "children"]], 1, 3, 4, 6], 22, ["interpolate", ["exponential", 1], ["number", ["get", "children"]], 999, 23]]
            }
        });


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
                "icon-offset": [0, -25]
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
                "text-color": "#54ecea",
                // "text-translate": ["interpolate", ["exponential", 1.7], ["zoom"], 10, ["literal", [5, 4]], 15, ["literal", [14, 14]]]
                "text-translate": [0,5]
            },
            layout: {
                "icon-image": ["get", "icon"],
                // "icon-size": {
                //     base: 1,
                //     stops: [[13, .4], [16, 1]]
                // },
                "icon-size": 1,
                "icon-offset": [0, -25],
                "text-line-height": 0.5,
                "text-field": ["get", "quantity"],
                "text-font": ["Roboto Black", "Arial Unicode MS Regular"]
                // "text-size": ["interpolate", ["linear"], ["zoom"], 6, ["interpolate", ["exponential", 1], ["number", ["get", "children"]], 1, 11, 5, 28], 12, ["interpolate", ["exponential", 1], ["number", ["get", "children"]], 1, 40, 5, 40]],
                // "text-anchor": "right"
            }
        });


        // show popup on click
        map.on('click', 'point', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            
            // var popup = e.features[0].properties.popup;
            // new mapboxgl.Popup({
            //     anchor: 'bottom',
            //     offset: [0, -50],
            //     closeButton: false
            // })
            // .setLngLat(coordinates)
            // .setHTML(popup)
            // .addTo(map);

            var name = e.features[0].properties.name;
            var person = e.features[0].properties.person;
            var address = e.features[0].properties.address;
            var phone = e.features[0].properties.phone;
            window.addPopupPlace(map, [name, person, address, phone], coordinates);
            window.util.flyTo(map, coordinates);
        });

        map.on('mouseenter', 'point', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
         
        map.on('mouseleave', 'point', function () {
            map.getCanvas().style.cursor = '';
        });


        // show popup on click
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
            window.util.flyTo(map, coordinates);
        });

        map.on('mouseenter', 'city', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
         
        map.on('mouseleave', 'city', function () {
            map.getCanvas().style.cursor = '';
        });
    }

    window.marker = {
        addMarkers: function (map, markersArray) {
            addMarkers(map, markersArray);
        }
    }
});