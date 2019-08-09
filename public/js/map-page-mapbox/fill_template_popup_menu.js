'use strict';

$(function () {
    window.templateMenu = function (markerElem) {
        var template = document.querySelector('#js-templatePopupMenuItem').content.querySelector('.popup-menu__list-item');
        var templateElement = template.cloneNode(true);
        templateElement.querySelector('.popup-menu__list-link').setAttribute('data-id', markerElem.id);
        templateElement.querySelector('.popup-menu__list-link').textContent = markerElem.name;
        templateElement.querySelector('.popup-menu__list-link').setAttribute('data-address', markerElem.address);
        templateElement.querySelector('.popup-menu__list-link').setAttribute('data-person', markerElem.person);
        templateElement.querySelector('.popup-menu__list-link').setAttribute('data-phone', markerElem.phone);
        templateElement.querySelector('.popup-menu__list-link').setAttribute('data-point', markerElem.point);

        // if (markerElem.childs.length !== 0) {

        //     Array.prototype.forEach.call(markerElem.childs, function (child) {
        //         var dropdownItem = document.createElement('li');
        //         dropdownItem.setAttribute('class', 'popup-menu__dropdown-item');
        //         var dropdownLink = document.createElement('a');
        //         dropdownLink.setAttribute('class', 'popup-menu__dropdown-link');
        //         dropdownLink.textContent = child.name;
        //         dropdownLink.setAttribute('data-id', child.id);
        //         dropdownLink.setAttribute('data-point', child.point);
        //         dropdownLink.setAttribute('data-address', child.address);
        //         dropdownLink.setAttribute('data-person', child.person);
        //         dropdownLink.setAttribute('data-phone', child.phone);
        //         dropdownItem.appendChild(dropdownLink);
        //         templateElement.querySelector('.popup-menu__dropdown').append(dropdownItem);
        //     })
        // }
        return templateElement;
    };
});