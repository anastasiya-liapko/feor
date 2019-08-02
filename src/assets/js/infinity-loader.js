'use strict';

var ajaxURL = '/wp-admin/admin-ajax.php';
var isPostsLoading = false

function loadPosts(customLoaderContainer){
	var infinityLoaderContainer = $('.container_infinity_loader');
	
	if(customLoaderContainer !== undefined) infinityLoaderContainer = customLoaderContainer;
	
	if(infinityLoaderContainer.length > 0){
		var currentPage = parseInt(infinityLoaderContainer.attr('data-current-page'));
		var maxPages = parseInt(infinityLoaderContainer.attr('data-max-pages'));
		var currentObjectId = infinityLoaderContainer.attr('data-current-object-id');
		var fromPage = infinityLoaderContainer.attr('data-from-page');
		var searchQuery = infinityLoaderContainer.attr('data-search-query');
		var isLoadAll = infinityLoaderContainer.attr('data-load-all');
		var searchMode = infinityLoaderContainer.attr('data-search-mode');
		
		if(currentObjectId === undefined) currentObjectId = 0;
		if(searchQuery === undefined) searchQuery = '';
		if(isLoadAll === undefined) isLoadAll = 0;
		if(searchMode === undefined) searchMode = 0;
		
		if(currentPage < maxPages && !isPostsLoading){
			isPostsLoading = true;
			
			currentPage++;
		
			var ajaxData = {
				'action' : 'load_posts',
				'current_page' : currentPage,
				'from_page' : fromPage,
				'current_object_id' : currentObjectId,
				'search_query' : searchQuery,
				'load_all' : isLoadAll,
				'search_mode' : searchMode
			}
		
			$.post(ajaxURL, ajaxData, function(s){
				if(isLoadAll == 1){
					infinityLoaderContainer.attr('data-current-page', maxPages);
					infinityLoaderContainer.html(s);
				}else{
					infinityLoaderContainer.attr('data-current-page', currentPage);
					infinityLoaderContainer.append(s);
				}
				 
				currentPage = parseInt(infinityLoaderContainer.attr('data-current-page'));
				
				if(currentPage >= maxPages){
					infinityLoaderContainer.parent().find('.button_infinity_loader').remove();
				}
				
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
		console.log(currentWindow);
		if(postsLoadScrollPosition >= documentHeight){
			loadPosts();
		}
	});
	
	$('.organizatii__search').submit(function(e){
		e.preventDefault();
		
		var currentForm = $(this);
		var infinityLoaderContainer = currentForm.closest('.organizatii__block').find('.container_infinity_button_loader');
		
		infinityLoaderContainer.attr('data-current-page', 1);
		
		loadPosts(infinityLoaderContainer);
		
		return false;
	});
	
	$('.button_infinity_loader').click(function(e){
		e.preventDefault();
		
		var currentButton = $(this);
		var infinityLoaderContainer = currentButton.parent().find('.container_infinity_button_loader');
		
		loadPosts(infinityLoaderContainer);
	});
	
	$('.organizatii__search-input').on('change keydown keyup', function() {
		var currentInput = $(this);
		var infinityLoaderContainer = currentInput.closest('.organizatii__block').find('.container_infinity_button_loader');
		
		infinityLoaderContainer.attr('data-search-query', currentInput.val());
	});
});

/*$('input[name="tax_search"]').change(function(){
	console.log($(this).prop('checked'));
});*/