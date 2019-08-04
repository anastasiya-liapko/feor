$(function () {
    var addMenu = function (map, markersArray) {

        $('#js-mapHamburger').show();

        var addPopup = function (coordinates) {
            var fragmentMenu = document.createDocumentFragment();
            var template = document.querySelector('#js-templatePopupMenu').content.querySelector('.popup-menu');
            var templateElement = template.cloneNode(true);
            fragmentMenu.appendChild(templateElement);
            $('#map').append(fragmentMenu);
            Array.prototype.forEach.call(markersArray, function (parent, i) {

                var fragmentMenuItem = document.createDocumentFragment();
                fragmentMenuItem.appendChild(window.templateMenu(parent));
                document.querySelector('.popup-menu__list').append(fragmentMenuItem);
            });
        }

        var addClickFunc = function () {
            $('#map .popup-menu__list-link').on('click', function (e) {
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
                        window.util.flyTo(map, point);
                        window.util.closePopup();
                    })
                } else {
                    // window.util.switchPopup([name, address, descr, more, img]);
                    window.util.flyTo(map, point);
                    window.util.closePopup();
                }
            });

            $('#map .popup-menu__dropdown-link').on('click', function () {
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
                window.util.flyTo(map, point, [name, person, address, phone]);
                window.util.closePopup();
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
        $('#map .hamburger').on('click', function () {
            $(this).toggleClass('is-active');

            if (!$(this).hasClass('is-active')) {
                $('#map .popup-menu').addClass('slide-out-left');
                setTimeout(function () { 
                    $('#map .popup-menu').remove();
                }, 400);
            } else {
                
                if ($('div').is('#map .popup-menu')) {
                    $('#map .popup-menu').addClass('slide-out-left');
                    setTimeout(function () { 
                        $('#map .popup-menu').remove();
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

        // закрытие при клике вне меню
        // $('#map').on('click', function (e) {
        //     console.log($('#js-mapHamburger').find(e.target).length === 0 )
        //     console.log($('#map .popup').find(e.target).length === 0 )
        //     console.log($(this).find(e.target).hasClass('popup'))
        //     if ($('#js-mapHamburger').find(e.target).length === 0 
        //     && $('#map .popup').find(e.target).length === 0 
        //     || !$(this).find(e.target).hasClass('popup')) {
        //         window.util.closePopup();
        //     }
        // });
    }

window.menu = {
    addMenu: function (map, markersArray) {
        addMenu(map, markersArray);
    }
}
});