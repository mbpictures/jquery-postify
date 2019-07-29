(function( $ ) {
 
    $.fn.showLinkLocation = function(options) {
		
        
	 
		var settings = $.extend( {}, defaults, options );
	 
		return this.each(function() {
			var elem = $(this);
			elem.css("opacity", "0");
			
			if(elem.data("postify")){
				var newImg = $("<img>");
				newImg.load(function () {
					elem.attr("src", $(this).attr("postify"));
					
					elem.find(loadingClass, function(){
						$(this).remove();
					});
					
					elem.
				});
				
				newImg.attr("src", elem.data("postify"));
				
			}
			else if(elem.data("postify-bg")){
				var newImg = $("<img>");
				newImg.load(function () {
					$(this).css("background-image", "url(" + $(this).data("postify-bg") + ")");
					
					elem.find(loadingClass, function(){
						$(this).remove();
					});
					
					elem.
				});
				
				newImg.attr("src", elem.data("postify-bg"));
				
			}
		
		});
 
    };
	
	$.fn.postify.defaults = {
		animation: "fade",
		easing: "ease",
		duration: "slow",
		loadingClass: "postify-loading"
	};
 
}( jQuery ));