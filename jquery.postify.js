(function( $ ) {
 
    $.fn.postify = function(options) {
		
	 
		var settings = $.extend( {}, $.fn.postify.defaults, options );
		
		//initialize with loading
		this.each(function () {
			if(settings.showLoading){
				$(this).append('<div class="' + settings.loadingClass + '">' + settings.loadingElements + '</div>');
			}
		});
	 
		return this.each(function() {
			var elem = $(this);
			var height = $(this).parent().css("height");
			//elem.css("opacity", "0");
			if(elem.data("postify")){
				var src = elem.data("postify");
				var newImg = $("<img>");
				newImg.load(function () {
					
					elem.find('.' + settings.loadingClass).each(function(){
						$(this).delay(settings.delay).fadeOut(settings.duration);
						
					});
					newImg.css({
						position: "absolute",
						top: "0",
						left: "0",
						width: "100%"
					}).hide().delay(settings.delay).appendTo(elem).fadeIn(1000);
					
					if(settings.adjustParentSize == "height"){
						elem.parent().delay(settings.delay).animate({height: newImg.css("height")}, settings.duration);
					}
				});
				
				newImg.attr("src", src);
				
			}
			else if(elem.data("postify-bg")){
				var newImg = $("<img>");
				newImg.load(function () {
					$(this).css("background-image", "url(" + $(this).data("postify-bg") + ")");
					
					elem.find(loadingClass, function(){
						$(this).remove();
					});
					
					elem.fadeIn("slow");
				});
				
				newImg.attr("src", elem.data("postify-bg"));
				
			}
		
		});
 
    };
	
	$.fn.postify.defaults = {
		"animation": "fade",
		"easing": "ease",
		"duration": "slow",
		"delay": 0,
		"showLoading": true,
		"loadingClass": "postify-loading",
		"loadingElements": "<div></div><div></div><div></div><div></div>",
		"adjustParentSize": "height"
	};
 
}( jQuery ));