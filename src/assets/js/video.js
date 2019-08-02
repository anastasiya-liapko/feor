'use strict';

$(document).ready(function()
{
	$('.popupYoutube').fancybox(
	{
		caption : function( instance, item )
		{
			return $(this).attr('data-title');
		}
	});
})