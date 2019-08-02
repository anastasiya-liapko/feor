// if($(window).width() > 992)
// {
// 	$('.top-menu li.menu-item').hover(function()
// 	{
// 		var wrapper = $(this).find('.hidden-block'),
// 				content = $(this).find('.hidden-block').find('ul');

// 		$(this).find('.header__menu-link').toggleClass('hover');
// 		wrapper.stop().toggleClass('visible-block');
// 		content.toggleClass('animated fadeInUp fast');

// 		//$('.hidden-block').stop().toggleClass('visible-block');
// 		//$('.hidden-block').find('ul').toggleClass('animated fadeInUp fast');
// 	})
// }


if($(window).width() > 992)
{
	$('.top-menu li.menu-item').on('mouseenter', function()
	{
		$(this).addClass('active-block');
		$(this).find('.hidden-block').addClass('active-block');

		var height = 0;
		$.each($('.hidden-block ul'), function(i, item) {
			height = $(this).height() > height ? $(this).height() + 35 : height;
		})

		$('.hidden-block').css('height', height);
		$('.hidden-block').stop().addClass('visible-block');
		$('.hidden-block').find('ul').addClass('animated fadeInUp fast');
	})

	$('.top-menu li.menu-item').on('mouseleave', function()
	{
		$(this).find('.hidden-block').removeClass('active-block');
		$(this).removeClass('active-block');
	})

	$('.top-menu').on('mouseleave', function()
	{
		$('.hidden-block').stop().removeClass('visible-block');
		$('.hidden-block').find('ul').removeClass('animated fadeInUp fast');
	})
}
