'use strict';

var ajaxURL = '/wp-admin/admin-ajax.php';
var isAllowScroll = true

$("form#russianDate").change(function()
{
		var day = $(".russian-date-day .option.selected").text(),
				month = $(".russian-date-month .option.selected").attr("data-value"),
				year = $(".russian-date-year .option.selected").text(),
				rdate = day + "." + month + "." + year;

		isAllowScroll = false;

		$.ajax(
		{
			url: ajaxURL,
			type:'POST',
			data: "action=converter&rdate=" + rdate,
			beforeSend: function()
			{
				$(".converter-loader").addClass('l-active');
			},
			success: function(data)
			{
				data = $.parseJSON(data);
				$(".jewish-date-day").val(data.jday).niceSelect('update');
				$(".jewish-date-month").val(data.jmonth).niceSelect('update');
				$(".jewish-date-year").val(data.jyear).niceSelect('update');

				$('.modal-converter__form-button_calendar').attr('href', '/kalendar/?Monate=' + data.jmonth + '&jahr=' + data.jyear);
				isAllowScroll = true;
				$(".converter-loader").removeClass('l-active');
			}
		});

		return false;
	});



$("form#jewishDate").change(function()
{
	var day = $(".jewish-date-day .option.selected").text(),
			month = $(".jewish-date-month .option.selected").attr("data-value"),
			year = $(".jewish-date-year .option.selected").text(),
			jdate = day + "." + month + "." + year;

	$(".c-result").empty();
	isAllowScroll = false;

	$.ajax(
	{
		url: ajaxURL,
		type:'POST',
		dataType: "json",
		data: "action=jewconverter&jdate=" + jdate,
		beforeSend: function()
		{
			$(".converter-loader").addClass('l-active');
		},
		success: function(data)
		{
			$(".russian-date-day").val(data.rday).niceSelect('update');
			$(".russian-date-month").val(data.rmonth).niceSelect('update');
			$(".russian-date-year").val(data.ryear).niceSelect('update');

			$('.modal-converter__form-button_calendar').attr('href', '/kalendar/?Monate=' + data.jmonth + '&jahr=' + data.jyear);
			isAllowScroll = true;
			$(".converter-loader").removeClass('l-active');
		}
	});

	return false;
});