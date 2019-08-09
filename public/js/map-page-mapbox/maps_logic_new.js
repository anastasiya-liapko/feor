$(function () {
    // const PLACE = '/wp-content/themes/feor/public/img/map-pin.png';
    // const PLACES = '/wp-content/themes/feor/public/img/map-pin-large.png';
    const PLACE = '/wp-content/themes/feor/public/img/pin-new.png';
    const PLACES = '/wp-content/themes/feor/public/img/pin-new.png';
    const ZOOM = 4;
    const BOUNDS_RUSSIA = new L.LatLngBounds([30.0, 15.0], [78.0, 188.0]);
    const BOUNDS_DALNEVOSTOCHNYJ = new L.LatLngBounds([65.0, 70.0], [62.0, 210.0]);
    const BOUNDS_PRIVOLZHSKIJ = new L.LatLngBounds([45.0, 51.0], [64.0, 54.0]);
    const BOUNDS_SEVERO_ZAPADNYJ = new L.LatLngBounds([50.0, 51.0], [74.0, 34.0]);
    const BOUNDS_SEVERO_KAVKAZKIJ = new L.LatLngBounds([45.0, 57.0], [43.0, 30.0]);
    const BOUNDS_SIBIRSKIJ = new L.LatLngBounds([40.0, 55.0], [78.0, 148.0]);
    const BOUNDS_URALSKIJ = new L.LatLngBounds([49.0, 55.0], [75.0, 87.0]);
    const BOUNDS_CZENTRALNYJ = new L.LatLngBounds([47.0, 41.0], [60.0, 34.0]);
    const BOUNDS_YUZHNYJ = new L.LatLngBounds([53.0, 44.0], [42.0, 45.0]);


    L.mapbox.accessToken = 'pk.eyJ1IjoiYWxpYXBrbyIsImEiOiJjangyenVmeGMwcTFjM3lvNGhsdmUzejRoIn0.zdJYMN5sxS2SJXZV2Lb3aA';

    var map = L.map('leaflet-map', {
        doubleClickZoom: false,
        zoomControl: true,
        zoomDelta: 0.25,
        zoomSnap: 0
    })
        .setView([63.674041, 99.742382], ZOOM)
        .addLayer(L.mapbox.styleLayer('mapbox://styles/aliapko/cjz3xyd8w6z761cpl5jldcwwr'));


    // bounds
    var district = ''

    document.referrer.split('/').forEach( function (elem) {
        if (elem === 'dalnevostochnyj') {
            district = 'dalnevostochnyj'
        } else if (elem === 'privolzhskij') {
            district = 'privolzhskij'
        } else if (elem === 'severo-zapadnyj') {
            district = 'severo-zapadnyj'
        } else if (elem === 'severo-kavkazkij') {
            district = 'severo-kavkazkij'
        } else if (elem === 'sibirskij') {
            district = 'sibirskij'
        } else if (elem === 'uralskij') {
            district = 'uralskij'
        } else if (elem === 'czentralnyj') {
            district = 'czentralnyj'
        } else if (elem === 'yuzhnyj') {
            district = 'yuzhnyj'
        }
    })

    if (district === 'dalnevostochnyj') {
        map.fitBounds(BOUNDS_DALNEVOSTOCHNYJ, { padding: [20, 20] });
    } else if (district === 'privolzhskij') {
        map.fitBounds(BOUNDS_PRIVOLZHSKIJ, { padding: [20, 20] });
    } else if (district === 'severo-zapadnyj') {
        map.fitBounds(BOUNDS_SEVERO_ZAPADNYJ, { padding: [20, 20] });
    } else if (district === 'severo-kavkazkij') {
        map.fitBounds(BOUNDS_SEVERO_KAVKAZKIJ, { padding: [20, 20] });
    } else if (district === 'sibirskij') {
        map.fitBounds(BOUNDS_SIBIRSKIJ, { padding: [20, 20] });
    } else if (district === 'uralskij') {
        map.fitBounds(BOUNDS_URALSKIJ, { padding: [20, 20] });
    } else if (district === 'czentralnyj') {
        map.fitBounds(BOUNDS_CZENTRALNYJ, { padding: [20, 20] });
    } else if (district === 'yuzhnyj') {
        map.fitBounds(BOUNDS_YUZHNYJ, { padding: [20, 20] });
    } else {
        map.fitBounds(BOUNDS_RUSSIA, { padding: [20, 20] });
    }



    // transform list of places into array of cities with children
    var getMarkersWithChildren = function (orgs, cities) {
        
        Array.prototype.forEach.call(cities, function (city, cityIndex) {
            markersArray.push({
                'id': cityIndex,
                'name': city['name'],
                // 'point': [parseFloat(city['lng']), parseFloat(city['lat'])],
                'point': [parseFloat(city['lat']), parseFloat(city['lng'])],
                'childs': []
            });

            Array.prototype.forEach.call(orgs, function (place, placeIndex) {
                if (place['city'] === city['name']) {
                    markersArray[cityIndex].childs.push({
                        'id': place['id'],
                        'name': place['name'],
                        'address': place['address'],
                        // 'point': [parseFloat(child.getAttribute('lng')), parseFloat(child.getAttribute('lat'))],
                        // 'point': [place['lng'] === '' ? '' : parseFloat(place['lng']), place['lat'] === '' ? '' : parseFloat(place['lat'])],
                        'point': [place['lat'] === '' ? '' : parseFloat(place['lat']), place['lng'] === '' ? '' : parseFloat(place['lng'])],
                        'person': place['person'],
                        'phone': place['phone']
                    });
                };
            });
        });
    };


    cities.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })

    cities.forEach(function (elem) {
        if (elem.name === 'Санкт-Петербург') {
            cities.splice(cities.indexOf(elem), 1)
            cities.unshift(elem);
            return false;
        }
    })

    cities.forEach(function (elem) {
        if (elem.name === 'Москва') {
            cities.splice(cities.indexOf(elem), 1)
            cities.unshift(elem);
            return false;
        }
    })

    var markersArray = [];
    
    getMarkersWithChildren(orgs, cities);
    window.map_menu.addMenu(map, markersArray);
    // window.map_marker.addMarkers(map, markersArray);


    // created geojson
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
        // myGeoJSON.properties.quantity = elem.childs === undefined || elem.childs.length === 0 ? '' : elem.childs.length;myGeoJSON.properties.person = elem.person;   
        myGeoJSON.properties.phone = elem.phone;  
        myGeoJSON.properties.person = elem.person;  
        // myGeoJSON.properties.icon = elem.childs === undefined || elem.childs.length === 0 ? 'place' : 'places'; 
        // myGeoJSON.properties['marker-size'] = 'large';
        // myGeoJSON.properties['marker-symbol'] = 'bus';
        // myGeoJSON.properties['marker-color'] = '#fa0';

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


    // created icons for markers
    // var iconPlace = L.icon({
    //     iconUrl: PLACE,
    //     iconSize: [33, 48]
    //     // iconAnchor: [22, 94],
    //     // popupAnchor: [-3, -76],
    //     // shadowUrl: 'my-icon-shadow.png',
    //     // shadowRetinaUrl: 'my-icon-shadow@2x.png',
    //     // shadowSize: [68, 95],
    //     // shadowAnchor: [22, 94]
    // });
    var iconPlace = L.divIcon({
        html: '<div class="map-page__cluster-places"></div>',
        className: 'myclusterplace'
    })

    var iconPlaces = L.icon({
        iconUrl: PLACES,
        iconSize: [55, 48]
    });


    // places with clusters
    var layerWithPlaces = L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 60,
        disableClusteringAtZoom: 14,
        iconCreateFunction: function(cluster) {
            var markers = cluster.getAllChildMarkers();
            var html = '<div class="map-page__cluster-places">' + markers.length + '</div>';
            return L.divIcon({
                html: html,
                className: 'myclusterplace'
                // iconUrl: PLACE,
                // iconSize: [33, 48]
                // iconAnchor: new L.Point(stacked.x, stacked.y)
                // iconAnchor: [22, 94],
                // popupAnchor: [-3, -76],
                // shadowUrl: 'my-icon-shadow.png',
                // shadowRetinaUrl: 'my-icon-shadow@2x.png',
                // shadowSize: [68, 95],
                // shadowAnchor: [22, 94]
            });
        }
    });

    // cities with clusters
    // var layerWithCities = L.markerClusterGroup({
    //     showCoverageOnHover: false,
    //     iconCreateFunction: function(cluster) {
    //         var markers = cluster.getAllChildMarkers();
    //         var html = '<div class="map-page__cluster-cities">' + markers.length + '</div>';
    //         return L.divIcon({
    //             html: html,
    //             className: 'myclustercity'
    //         });
    //     }
    // }).addTo(map);

    // cities without clusters
    var layerWithCities = L.mapbox.featureLayer();

    function onClick(e) {
        var point = e.target._latlng
        // var popup = e.target.getPopup();
        // var content = popup.getContent();
        // var zoom = map.getZoom();
        // zoom = zoom <= 14 ? 14 : zoom;
        // map.flyTo([point.lat, point.lng], zoom)
        window.map_util.flyTo(map, [point.lat, point.lng])
    }

    // added markers to clasters layers
    Array.prototype.forEach.call(markersArray, function (markerElem) { 

        if (markerElem.childs.length > 0) {
            var html = '<div class="map-page__cluster-cities d-flex flex-column"><div class="map-page__cluster-cities-icon">' + markerElem.childs.length + '</div><span class="map-page__cluster-cities-label">' + markerElem.name + '</span></div>';
            var marker = L.marker(markerElem.point, {
                icon: L.divIcon({
                    html: html,
                    className: 'myclustercity'
                    // iconAnchor: [22, 94]
                })
            }).addTo(layerWithCities);
            marker.on('click', onClick);

        } else {
            var marker = L.marker(markerElem.point, {icon: iconPlace}).addTo(layerWithCities);
            marker.on('click', onClick);
        }
        
        Array.prototype.forEach.call(markerElem.childs, function (place) { 

            var firstPart = place.phone.split('(').pop().split(')').shift()
            var secondPart = place.phone.split(')').pop()
            var thirdPart = secondPart.split(' ').pop().split('-')
            var phoneLink = 8 + firstPart + thirdPart[0] + thirdPart[1] + thirdPart[2]

            // var yandexLink = 'https://yandex.by/maps/?ll=' + place.point[0] + ',' + place.point[1] + '&z=16&text=' + place.name.split(' ').join('%20').split('"').join('%20');
            var yandexLink = 'https://yandex.by/maps/?text=' + place.name.split(' ').join('%20').split('"').join('%20');
            var html = '';
            html += '<div class="popup popup-place d-flex flex-column">' +
                '<p class="popup__name">' + place.name + '</p>'
                if (place.person !== '') {
                    html += '<p class="popup__person d-flex align-items-start">' +
                        '<span class="popup__icon icon-map-person d-flex align-items-center justify-content-center"></span>' +
                        '<span class="popup__text d-flex align-items-center">' + place.person + '</span>' +
                    '</p>'
                }
                html += '<a href="' + yandexLink + '" class="popup__address d-flex align-items-start" target="_blank">' +
                    '<span class="popup__icon icon-map d-flex align-items-center justify-content-center"></span>' +
                    '<span class="popup__text d-flex align-items-center">' + place.address + '</span>' +
                '</a>' +
                '<a href="tel:' + phoneLink + '" class="popup__phone d-flex align-items-start">' +
                    '<span class="popup__icon icon-phone d-flex align-items-center justify-content-center"></span>' +
                    '<span class="popup__text d-flex align-items-center">' + place.phone + '</span>' +
                '</div>' +
            '</div>'

            var marker = L.marker(place.point, {icon: iconPlace, id: place.id}).addTo(layerWithPlaces);
            marker.bindPopup(html);
            marker.on('click', onClick);
        })
    })


    // toggle layers
    var setLayer = function (zoom) {
        if (zoom < 10) {
            map.removeLayer(layerWithPlaces)
            map.addLayer(layerWithCities)
        } else {
            map.removeLayer(layerWithCities)
            map.addLayer(layerWithPlaces)
        }
    }
    setLayer(ZOOM)

    map.on('zoom', function(e) {
        var zoom = e.target._zoom;
        setLayer(zoom)
    });

    // L.popup().setLatLng([55.753208, 37.604008])
    //     .setContent("This is popup content")
    //     .openOn(map);




    // labelgun
    var totalTime = 0;
    var totalMarkers;
    var labelEngine;


    // This is core of how Labelgun works. We must provide two functions, one
    // that hides our labels, another that shows the labels. These are essentially
    // callbacks that labelgun uses to actually show and hide our labels
    // In this instance we set the labels opacity to 0 and 1 respectively. 
    var hideLabel = function(label){ label.labelObject.style.opacity = 0;};
    var showLabel = function(label){ label.labelObject.style.opacity = 1;};
    labelEngine = new labelgun.default(hideLabel, showLabel);

    var id = 0;
    var labels = [];
    var totalMarkers = 0;

    // Add the markers to the map
    // var markers = L.geoJSON(geoCities, {
    //   onEachFeature : function(feature, label) {
    //     label.bindTooltip(feature.properties.name, {permanent: true});
    //     labels.push(label);
    //     totalMarkers += 1;
    //   }
    // });

    // For each marker lets add a label
    var i = 0;
    layerWithCities.eachLayer(function(label){
      label.added = true;
      addLabel(label, i);
      i++;
    });

    // markers.addTo(map);

    map.on("zoomend", function(){
      resetLabels(layerWithCities);
    });

    // var bounds = new L.LatLngBounds([-180.0, 41.2], [180.0, 82.1]);
    // map.fitBounds(bounds, { padding: [20, 20] });
    // map.fitBounds(BOUNDS_RUSSIA, { padding: [20, 20] });
    // map.fitBounds(russiaLayer.getBounds());

    // var cover = document.getElementById("cover");
    // cover.parentNode.removeChild(cover);
    resetLabels(layerWithCities);


    function resetLabels(markers) {

      var i = 0;
      markers.eachLayer(function(label){
        addLabel(label, ++i);
      });
      labelEngine.update();

    }

    function addLabel(layer, id) {

      // This is ugly but there is no getContainer method on the tooltip :(
      var label = layer._icon
      if (label) {

        // We need the bounding rectangle of the label itself
        var rect = label.getBoundingClientRect();

        // We convert the container coordinates (screen space) to Lat/lng
        var bottomLeft = map.containerPointToLatLng([rect.left, rect.bottom]);
        var topRight = map.containerPointToLatLng([rect.right, rect.top]);
        var boundingBox = {
          bottomLeft : [bottomLeft.lng, bottomLeft.lat],
          topRight   : [topRight.lng, topRight.lat]
        };

        // Ingest the label into labelgun itself
        labelEngine.ingestLabel(
          boundingBox,
          id,
          parseInt(Math.random() * (5 - 1) + 1), // Weight
          label,
          "Test " + id,
          false
        );

        // If the label hasn't been added to the map already
        // add it and set the added flag to true
        if (!layer.added) {
          layer.addTo(map);
          layer.added = true;
        }

      }

    }


});
