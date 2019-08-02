'use strict';

$(function () {
    var veterans = [
        {
            id: 1,
            name: 'Дальневосточный',
            cities: [
                {
                    id: 1,
                    name: 'Балаково',
                    veterans: [
                        { 
                            id: 1,
                            name: 'Барская Сима Иосифовна',
                            descr: 'труженик тыла'
                        },
                        { 
                            id: 1,
                            name: 'Барская Сима Иосифовна',
                            descr: 'труженик тыла'
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Ижевск',
                    veterans: [
                        { 
                            id: 1,
                            name: 'Гандельсман Софья Ильинична',
                            descr: 'труженик тыла'
                        },
                        { 
                            id: 1,
                            name: 'Данилова Дора Самуиловна',
                            descr: 'ветеран войны'
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: 'Приволжский',
            cities: [
                {
                    id: 1,
                    name: 'Йошкар-Ола',
                    veterans: [
                        { 
                            id: 1,
                            name: 'Дынин Лазарь Залманович',
                            descr: 'ветеран войны'
                        },
                        { 
                            id: 2,
                            name: 'Ливак Борис Борисович',
                            descr: 'труженик тыла'
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Киров',
                    veterans: [
                        { 
                            id: 1,
                            name: 'Палкина Майя Михайловна',
                            descr: 'труженик тыла'
                        },
                        { 
                            id: 2,
                            name: 'Столь Матвей Михайлович',
                            descr: 'ветеран войны'
                        }
                    ]
                }
            ]
        }
    ]
    
    var removeActiveClass = function (elems) {
        $.each(elems, function (i, elem) {
            elem.classList.remove('active')
        })
    }

    var fillCities = function (cities) {
        $.each(cities, function (i, city) {
            var fragment = document.createDocumentFragment();
            var template = document.querySelector('#js-templateVeteransListItem').content.querySelector('.veterans__list-item');
            var templateElement = template.cloneNode(true);
            templateElement.querySelector('.veterans__list-link').textContent = city.name;
            fragment.appendChild(templateElement);
            $('.veterans__list_type_cities').append(fragment);
        })
    }

    var fillVeterans = function (veterans) {
        $.each(veterans, function (i, veteran) {
            var fragment = document.createDocumentFragment();
            var template = document.querySelector('#js-templateVeteransPeopleListItem').content.querySelector('.veterans__people-list-item');
            var templateElement = template.cloneNode(true);
            templateElement.querySelector('.veterans__people-name').textContent = veteran.name;
            templateElement.querySelector('.veterans__people-descr').textContent = veteran.descr;
            fragment.appendChild(templateElement);
            $('.veterans__people-list').append(fragment);
        })
    }

    fillCities(veterans[0].cities)
    $('.veterans__list_type_cities .veterans__list-item:first-child .veterans__list-link').addClass('active')
    fillVeterans(veterans[0].cities[0].veterans)

    $('.veterans__list_type_districts .veterans__list-link').click(function(e) {
        e.preventDefault()
        removeActiveClass($('.veterans__list_type_districts .veterans__list-link'))
        this.classList.add('active')
        var pickedDistrict = this.text
        $('.veterans__list_type_cities').empty();
        $('.veterans__people-list').empty();
        $.each(veterans, function(i, district) {
            if (district.name === pickedDistrict) {
                fillCities(district.cities)
                $('.veterans__list_type_cities .veterans__list-item:first-child .veterans__list-link').addClass('active')
                fillVeterans(district.cities[0].veterans)

                $('.veterans__list_type_cities .veterans__list-link').click(function(e) {
                    e.preventDefault()
                    removeActiveClass($('.veterans__list_type_cities .veterans__list-link'))
                    this.classList.add('active')
                    var pickedCity = this.text
                    $('.veterans__people-list').empty();
                    $.each(district.cities, function (i, city) {
                        if (city.name === pickedCity) {
                            fillVeterans(city.veterans)
                        }
                    })
                })
            }
        })
    })
});