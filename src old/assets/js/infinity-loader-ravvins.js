'use strict';

var ajaxURL = '/wp-admin/admin-ajax.php';
var isPostsLoading = false;

function loadPostsRavvins(){
	var infinityLoaderContainer = $('.container_infinity_loader_ravvins');
	
	if(infinityLoaderContainer.length > 0){
		var currentPage = parseInt(infinityLoaderContainer.attr('data-current-page'));
		var postsCount = parseInt(infinityLoaderContainer.attr('data-posts-count'));
		var postsPerPage = parseInt(infinityLoaderContainer.attr('data-posts-per-page'));
		var fromPage = infinityLoaderContainer.attr('data-from-page');
		var maxPages = Math.ceil(postsCount/postsPerPage);
		
		if(currentPage < maxPages && !isPostsLoading){
			isPostsLoading = true;

			currentPage++;

			var ajaxData = {
				'action' : 'load_posts_ravvins',
				'posts_per_page' : postsPerPage,
				'current_page' : currentPage,
				'from_page' : fromPage
			}
		
			$.post(ajaxURL, ajaxData, function(s){
					infinityLoaderContainer.attr('data-current-page', currentPage);
					infinityLoaderContainer.append(s);
				
				isPostsLoading = false;
			});
		}
	}
}

$(function () {
	$(window).scroll(function(){
		var currentWindow = $(this);
		var documentHeight = $(document).height();
		var postsLoadScrollPosition = (currentWindow.scrollTop() + currentWindow.height()) + $('.footer').outerHeight();
		
		if((postsLoadScrollPosition >= documentHeight)&&($('.chairmen__search-input').val() == ''))
		{
			loadPostsRavvins();
		}
	});
});