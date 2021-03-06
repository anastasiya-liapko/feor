$(function () {
    var addMenu = function (map, markersArray) {

        $('#js-mapHamburger').show();

        var addPopup = function (coordinates) {
            var fragmentMenu = document.createDocumentFragment();
            var template = document.querySelector('#js-templatePopupMenu').content.querySelector('.popup-menu');
            var templateElement = template.cloneNode(true);
            fragmentMenu.appendChild(templateElement);
            $('#map-page').append(fragmentMenu);
            Array.prototype.forEach.call(markersArray, function (parent, i) {

                var fragmentMenuItem = document.createDocumentFragment();
                fragmentMenuItem.appendChild(window.templateMenu(parent));
                document.querySelector('.popup-menu__list').append(fragmentMenuItem);
            });
        }

        var showPoint = function (map, point, zoom) {
            if (point[0] !== '' || point[1] !== '') {
                window.map_util.flyTo(map, point, zoom);
                window.map_util.closePopup();
            }
        }

        var addClickFunc = function () {
            $('#map-page .popup-menu__list-link').on('click', function (e) {
                // var name = $(this).text();
                // var address = $(this).attr('data-address');
                var point = $(this).attr('data-point').split(',');
                // var descr = $(this).attr('data-descr');
                // var more = $(this).attr('data-more');
                // var img = $(this).attr('data-img');

                var dropdown = $(this).siblings();
                if (dropdown.children().length !== 0) {
                    dropdown.slideDown();
                    $(this).on('click', function () {
                        // window.util.switchPopup([name, address, descr, more, img]);
                        showPoint(map, point, 11)
                    })
                } else {
                    // window.util.switchPopup([name, address, descr, more, img]);
                    showPoint(map, point, 11)
                }
            });

            $('#map-page .popup-menu__dropdown-link').on('click', function (e) {
                var id = parseInt($(this).attr('data-id'));
                var name = $(this).text();
                var address = $(this).attr('data-address');
                var point = $(this).attr('data-point').split(',');
                var person = $(this).attr('data-person');
                var phone = $(this).attr('data-phone');
                // var descr = $(this).attr('data-descr');
                // var more = $(this).attr('data-more');
                // var img = $(this).attr('data-img');

                // window.util.switchPopup([name, address, descr, more, img]);
                // window.addPopupPlace(map, [name, person, address, phone], point);
                // window.map_util.flyTo(map, point, [name, person, address, phone]);
                showPoint(map, point)
            });

            $('.popup-menu__search-submit').click(function(e) {
                e.preventDefault();
            });
        
            $('.popup-menu__search-input').on('change keydown keyup', function() {
                var input = $(this);
                var cityToFind = input.val().toUpperCase();
                var cityToFindLength = cityToFind.length;
                
                var block = $('.popup-menu__list')
        
                block.find('.popup-menu__list-link').each(function() {
                    var organizatia = $(this).closest('.popup-menu__list-item');
                    var city = $(this).text().toUpperCase();
                    city = city.substring(0, cityToFindLength);
            
                    if (city !== cityToFind) {
                        organizatia.hide();
                    } else {
                        organizatia.show();
                    }
                })
            })
        }
        
        // show/hide menu when hamburger clicked
        $('#map-page .hamburger').on('click', function () {
            $(this).toggleClass('is-active');

            if (!$(this).hasClass('is-active')) {
                $('#map-page .popup-menu').addClass('slide-out-left');
                setTimeout(function () { 
                    $('#map-page .popup-menu').remove();
                }, 400);
            } else {
                
                if ($('div').is('#map-page .popup-menu')) {
                    $('#map-page .popup-menu').addClass('slide-out-left');
                    setTimeout(function () { 
                        $('#map-page .popup-menu').remove();
                    }, 400);
                    setTimeout(function () { 
                        addPopup();
                        addClickFunc();
                    }, 600);
                } else {
                    addPopup();
                    addClickFunc();
                }
            }
        });
    }

window.map_menu = {
    addMenu: function (map, markersArray) {
        addMenu(map, markersArray);
    }
}
});