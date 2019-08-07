'use strict';

$('img[class*="wp-image-"]').each(function(){
	var currentImage = $(this);
	var imageParent = currentImage.parent();
	var parentContent = imageParent.html();
	
	if(imageParent.prop('tagName') == 'P' && imageParent.children().length == 1){
		imageParent.after('<div class="content-inner__block-img content-inner__block-img_position_center">' + parentContent + '</div>');
		
		imageParent.remove();
	}
});

$(document).ready(function()
{
	$("#js-mapList").children("li").each(function()
	{
		var block = $(this).find('a'),
				city = block.attr('data-pulse');

		block.on('mouseover', function()
		{
			$('.pulse-css').removeClass('pulse-visible');
			$('.pulse-' + city).addClass('pulse-visible');
			console.log(city);
		});
		block.on('mouseout', function ()
		{
			$('.pulse-css').removeClass('pulse-visible');
		});
	});
})

// Скроллинг вверх
if ($(window).width() > 992)
{
	var CurrentScroll = 0;
	$(window).scroll(function(event)
	{
		var NextScroll = $(this).scrollTop();

		if ((NextScroll > CurrentScroll) || (NextScroll == 0))
		{
			$('.header').removeClass('fixed');
		}
		else
		{
			$('.header').addClass('fixed');
		}

		CurrentScroll = NextScroll;
	});
}