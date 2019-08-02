'use strict';

$("form#russianDate").on("change", function()
{
    var day = $(".russian-date-day .option.selected").text();
    var month = $(".russian-date-month .option.selected").text();
    var year = $(".russian-date-year .option.selected").text();
    var rdate = day + "." + month + "." + year;

    $.ajax(
    {
        // url: 'handler_rus_to_jew.php',
        type:'POST',
        dataType: 'html',
        data: { rdate : rdate },
        beforeSend: function() {
            $(".icon-convert").addClass('convert');
            setTimeout(function() {
                $(".icon-convert").removeClass('convert');
            }, 500)
        },
        success: function(data)
        {
            data = JSON.parse(data);
            $(".jewish-date-day .option.selected").text(data.jday);
            $(".jewish-date-month .option.selected").text(data.jmonth);
            $(".jewish-date-year .option.selected").text(data.jyear);
            // $(".icon-convert").removeClass('convert');
        }
    });
    return false;
});

$("form#jewishDate").on("change", function()
{
    var day = $(".jewish-date-day .option.selected").text();
    var month = $(".jewish-date-month .option.selected").text();
    var year = $(".jewish-date-year .option.selected").text();
    var jdate = day + "." + month + "." + year;

    $.ajax(
    {
        // url: 'handler_jew_to_rus.php',
        type:'POST',
        dataType: 'html',
        data: { jdate : jdate },
        beforeSend: function() {
            $(".icon-convert").addClass('convert');
            setTimeout(function() {
                $(".icon-convert").removeClass('convert');
            }, 500)
        },
        success: function(data)
        {
            data = JSON.parse(data);
            //console.log(data);
            $(".russian-date-day .option.selected").text(data.rday);
            $(".russian-date-month .option.selected").text(getGregorianMonth(data.rmonth));
            $(".russian-date-year .option.selected").text(data.ryear);
            // $(".icon-convert").removeClass('convert');
        }
    });
    return false;
});

function getGregorianMonth(number)
{
    var month;

    if (number == 1) month = 'January';
    if (number == 2) month = 'February';
    if (number == 3) month = 'March';
    if (number == 4) month = 'April';
    if (number == 5) month = 'May';
    if (number == 6) month = 'June';
    if (number == 7) month = 'July';
    if (number == 8) month = 'August';
    if (number == 9) month = 'September';
    if (number == 10) month = 'October';
    if (number == 11) month = 'November';
    if (number == 12) month = 'December';

    return month;
}

function getGregorianMonthNumber(month)
{
    var number;

    if ((month == 'January')	||(month == 'Январь'))		number = 1;
    if ((month == 'February')	||(month == 'Февраль'))		number = 2;
    if ((month == 'March')		||(month == 'Март'))			number = 3;
    if ((month == 'April')		||(month == 'Апрель'))		number = 4;
    if ((month == 'May')			||(month == 'Май'))				number = 5;
    if ((month == 'June')			||(month == 'Июнь'))			number = 6;
    if ((month == 'July')			||(month == 'Июль'))			number = 7;
    if ((month == 'August')		||(month == 'Август'))		number = 8;
    if ((month == 'September')||(month == 'Сентябрь'))	number = 9;
    if ((month == 'October')	||(month == 'Октябрь'))		number = 10;
    if ((month == 'November')	||(month == 'Ноябрь'))		number = 11;
    if ((month == 'December')	||(month == 'Декабрь'))		number = 12;

    return number;
}