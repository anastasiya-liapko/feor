'use strict';

var fillCities = function (cities)
{
	$('.veterans__list_type_cities').html("");

	$.each(cities, function (i, city)
	{
		if (city.name !== null)
		{
			var fragment = document.createDocumentFragment();
			var template = document.querySelector('#js-templateVeteransListItem').content.querySelector('.veterans__list-item');
			template.classList.add('veterans__city');
			template.setAttribute('data-city-id', city.term_id);
			var templateElement = template.cloneNode(true);
			templateElement.querySelector('.veterans__list-link').textContent = city.name;
			fragment.appendChild(templateElement);
			$('.veterans__list_type_cities').append(fragment);
		}
	})
}


var fillVeterans = function (veterans)
{
	$('.veterans__people-list').html("");

	$.each(veterans, function (i, veteran)
	{
		var fragment = document.createDocumentFragment();
		var template = document.querySelector('#js-templateVeteransPeopleListItem').content.querySelector('.veterans__people-list-item');
		var templateElement = template.cloneNode(true);
		templateElement.querySelector('.veterans__people-name').textContent = veteran.name;
		templateElement.querySelector('.veterans__people-descr').textContent = veteran.status;
		templateElement.querySelector('.veterans__people-text').textContent = veteran.text;
		if (veteran.text != '')
		{
			templateElement.classList.add('veteran__active');
		}
		fragment.appendChild(templateElement);
		$('.veterans__people-list').append(fragment);
	})
}


// Загрузка ветеранов при клике по городу
$(document).on("click",".veterans__city", function (e)
{
	e.preventDefault();

	var cityId = $(this).attr('data-city-id'),
			ajaxURL = '/wp-admin/admin-ajax.php',
			data = {
				cityId: cityId,
				action: 'get_veterans'
			}

	$('.veterans__city .veterans__list-link').removeClass('active');
	$(this).find('.veterans__list-link').addClass('active');

	$.post(
	{
		url: ajaxURL,
		data: data,
		success: function(veterans)
		{
			veterans = JSON.parse(veterans);

			if (veterans.length > 0)
			{
				fillVeterans(veterans);
			}
			else
			{
				$('.veterans__people-list').html("<span class='empty-data'>Данных нет</span>");
			}
		}
	});
})



// Загрузка городов при клике по округу
$('.veterans__list_type_districts .veterans__list-item').on('click', function(e)
{
	e.preventDefault();

	var termId = $(this).attr('data-term-id'),
			ajaxURL = '/wp-admin/admin-ajax.php',
			data = {
				termId: termId,
				action: 'get_cities'
			}

	$('.veterans__list-link').removeClass('active');
	$(this).find('.veterans__list-link').addClass('active');

	$.post(
	{
		url: ajaxURL,
		data: data,
		success: function(cities)
		{
			cities = JSON.parse(cities);

			fillCities(cities);
		}
	});
})

// Загрузка городов Дальневосточного округа при загрузке страницы
$(document).ready(function()
{
	var termId = 38,
			ajaxURL = '/wp-admin/admin-ajax.php',
			data = {
				termId: termId,
				action: 'get_cities'
			}

	$('.veterans__list-link').removeClass('active');
	$('.veterans__list-item').first().find('.veterans__list-link').addClass('active');

	$.post(
	{
		url: ajaxURL,
		data: data,
		success: function(cities)
		{
			cities = JSON.parse(cities);

			fillCities(cities);
		}
	});
})

// Получить информацию о ветеране и вывести в модальное окно
$(document).on("click",".veteran__active", function (e)
{
	e.preventDefault();

	var name = $(this).find('.veterans__people-name').text();
	var status = $(this).find('.veterans__people-descr').text();
	var text = $(this).find('.veterans__people-text').text();

	var nameBlock = $('.modal-veteran__name');
	var statusBlock = $('.modal-veteran__descr');
	var textBlock = $('.modal-veteran__text');

	nameBlock.text(name);
	statusBlock.text(status);
	textBlock.html(text);

	$('#js-modalVeteran').modal('show');
})