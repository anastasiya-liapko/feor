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
		var self = $(this).find('a'),
				city = self.attr('data-pulse');

		self.mouseover(function()
		{
			$('.pulse-css').addClass('pulse-hide');
			$('.pulse-' + city).removeClass('pulse-hide');
		});
		self.mouseout(function ()
		{
			$('.pulse-css').addClass('pulse-hide');
		});
	});
})