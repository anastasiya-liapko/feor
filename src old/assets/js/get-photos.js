'use strict';

$('.show-photos').on('click', function(e)
{
	e.preventDefault();
	var postId = $(this).attr('data-id'),
			ajaxURL = '/wp-admin/admin-ajax.php',
			data = {
				postId: postId,
				action: 'get_photos'
			}

	$.post(
	{
		url: ajaxURL,
		data: data,
		success: function(photos)
		{
			//console.log(photos);
			photos = JSON.parse(photos);

			var i,
					thumb,
					arr = [],
					count = photos.length,
					video_preview = '/wp-content/themes/feor/public/img/video-preview.jpg';

			if (photos.length > 0)
			{
				for (i = 0; i < count; i++)
				{

					var url = photos[i]['url'],
							type = photos[i]['type'];

					thumb = (photos[i]['type'] == 'video') ? photos[i]['url'] : photos[i]['thumb'];

					arr.push({
						src: photos[i]['url'],
						opts: {
							caption: photos[i]['caption'],
							thumb: thumb
						}
					});
				}

				$.fancybox.open(arr,
				{
					loop : true,
					transitionDuration : 100,
					animationDuration : 500,
					animationEffect : "fade",
					buttons : [
						'download',
						'zoom',
						'close'
					],
					thumbs : {
						autoStart : true
					},
					tpl: {
						error: '<p class="fancybox-error">Фотографии пока не загружены</p>'
					},
					'beforeLoad': function(e)
					{

						var group = e.group,
								index,
								src,
								i,
								count = group.length;

						for ( i = 0; i < count; i++)
						{
							if (group[i]['type'] == 'video')
							{
								index = group[i]['index'];
								src = group[i]['src'];

								$(".fancybox-thumbs__list").find("a[data-index='" + index + "']")
									.append("<video width='100' height='75'><source src='" + src + "' type='video/mp4'></video>");
							}
						}
					},
				});
			}
		}
	});
})