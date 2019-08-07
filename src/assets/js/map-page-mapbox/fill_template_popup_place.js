'use strict';

$(function () {
    window.map_templatePlace = function (markerElem, coordinates) {
        var name = markerElem[0];
        var descr = markerElem[1];
        var address = markerElem[2];
        var phone = markerElem[3];

        var firstPart = phone.split('(').pop().split(')').shift()
        var secondPart = phone.split(')').pop()
        var thirdPart = secondPart.split(' ').pop().split('-')
        var phoneLink = 8 + firstPart + thirdPart[0] + thirdPart[1] + thirdPart[2]

        var template = document.querySelector('#js-templatePopupPlace').content.querySelector('.popup');
        var templateElement = template.cloneNode(true);
        templateElement.querySelector('.popup__name').textContent = name;
        templateElement.querySelector('.popup__person .popup__text').textContent = descr;
        templateElement.querySelector('.popup__address .popup__text').textContent = address;
        templateElement.querySelector('.popup__address').href = "https://yandex.by/maps/?ll=" + coordinates[0] + "," + coordinates[1] + "&z=16&text=" + name.split(' ').join('%20');
        templateElement.querySelector('.popup__phone .popup__text').textContent = phone;
        templateElement.querySelector('.popup__phone').href = 'tel:' + phoneLink;
        
        return templateElement;
    };
});