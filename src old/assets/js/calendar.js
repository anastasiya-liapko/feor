'use strict';

'use strict';

function Calendar2(id, year, month) {
  var Dlast = new Date(year,month+1,0).getDate(),
      DlastPrev = new Date(year,month,0).getDate(),
      D = new Date(year,month,Dlast),
      DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
      DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
      DNfirst = DNfirst + 1,
      calendar = '<tr>',
      month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

  if (DNfirst != 0) {
    for (var i = DlastPrev - DNfirst + 2; i <= DlastPrev; i++) calendar += '<td class="disabled"><div class="elem-wrapper d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-between"><span class="day d-block2">' + i + '</span><span class="day-jew d-flex flex-column align-items-center align-items-sm-end justify-content-center"><span>23</span><span>нисана</span></span>';
  } else {
    for (var  i = 0; i < 6; i++) calendar += '</div><td>';
  }

  for(var  i = 1; i <= Dlast; i++) {
    if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 5) {
      calendar += '<td class="border-top fri">' +
      '<div class="elem-wrapper d-flex flex-column">' +
      '<div class="d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-between">' +
      '<span class="day d-block">' + i + '</span>' +
      '<span class="day-jew d-flex flex-column align-items-center align-items-sm-end justify-content-center"><span>23</span><span>нисана</span></span>' +
      '</div>' +
      '<div class="images d-none d-sm-block">' +
      '<span class="image image_first d-flex flex-nowrap align-items-center"><span class="icon icon-calendar-kdoshim"></span><span class="text">Кдошим</span></span>' +
      '<span class="image image_third d-flex flex-nowrap align-items-center"><span class="icon icon-calendar-candles"></span><span class="text">13:08</span></span>' +
      '</div>' +
      '</div>' +
      '</td>';
    }
    else 
    if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 6) {
      calendar += '<td class="border-top sat">' +
      '<div class="elem-wrapper d-flex flex-column">' +
      '<div class="d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-between">' +
      '<span class="day d-block">' + i + '</span>' +
      '<span class="day-jew d-flex flex-column align-items-center align-items-sm-end justify-content-center"><span>23</span><span>нисана</span></span>' +
      '</div>' +
      '<div class="images d-none d-sm-block">' +
      '<span class="image image_third d-flex flex-nowrap align-items-center"><span class="icon icon-calendar-stars"></span><span class="text">17:00</span></span>' +
      '</div>' +
      '</div>' +
      '</td>';
    } else if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
      calendar += '<td><div class="elem-wrapper d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-between"><span class="day d-block active">' + i + '</span><span class="day-jew d-flex flex-column  align-items-center align-items-sm-end justify-content-center"><span>23</span><span>нисана</span></span></div></td>';
    }

    else{
      calendar += '<td><div class="elem-wrapper d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-between"><span class="day d-block">' + i + '</span><span class="day-jew d-flex flex-column  align-items-center align-items-sm-end justify-content-center"><span>23</span><span>нисана</span></span></div></td>';
    }

    if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 6) {
      calendar += '<tr>';
    }
  }

  for(var  i = 1; i < 7 - DNlast; i++) calendar += '<td class="disabled"><div class="elem-wrapper d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-between"><span class="day d-block">' + i + '</span><span class="day-jew d-flex flex-column align-items-center align-items-sm-end justify-content-center"><span>23</span><span>нисана</span></span></div></td>';
  document.querySelector('#'+id+' tbody').innerHTML = calendar;
  document.querySelector('#calendar-picked-date').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
  document.querySelector('#calendar-picked-date').dataset.month = D.getMonth();
  document.querySelector('#calendar-picked-date').dataset.year = D.getFullYear();
  document.querySelector('.calendar__header-current-month .month').innerHTML = month[D.getMonth()];
  document.querySelector('.calendar__header-current-month .year').innerHTML = D.getFullYear();
  document.querySelector('.calendar__header-date-button_prev .month').innerHTML = month[D.getMonth() === 0 ? 11 : D.getMonth() - 1];
  document.querySelector('.calendar__header-date-button_prev .year').innerHTML = D.getFullYear();
  document.querySelector('.calendar__header-date-button_next .month').innerHTML = month[D.getMonth() === 11 ? 0 : D.getMonth() + 1];
  document.querySelector('.calendar__header-date-button_next .year').innerHTML = D.getFullYear();
  document.querySelector('.calendar__header-current-date .day').innerHTML = new Date().getDate();
  document.querySelector('.calendar__header-current-date .month').innerHTML = month[new Date().getMonth()];
  document.querySelector('.calendar__header-current-date .year').innerHTML = new Date().getFullYear();
}

Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());

// переключатель минус месяц
document.querySelector('#js-prevMonthButton').onclick = function() {
  Calendar2("calendar2", document.querySelector('#calendar-picked-date').dataset.year, parseFloat(document.querySelector('#calendar-picked-date').dataset.month)-1);
}

// переключатель плюс месяц
document.querySelector('#js-nextMonthButton').onclick = function() {
  Calendar2("calendar2", document.querySelector('#calendar-picked-date').dataset.year, parseFloat(document.querySelector('#calendar-picked-date').dataset.month)+1);
}