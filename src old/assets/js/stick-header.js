'use strict';

if($(window).width() > 992)
{
	$(window).scroll(function()
	{
		if ($(this).scrollTop() > 1)
		{
			$('.header').addClass("sticky");
		}
		else
		{
			$('.header').removeClass("sticky");
		}
	});
}