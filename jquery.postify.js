(function( $ ) {
 
    $.fn.postify = function(url = undefined, options) {
		
	 
		var settings = $.extend( {}, $.fn.postify.defaults, options );
		
		//initialize with loading
		this.each(function () {
			if(settings.showLoading){
				$(this).append('<div class="' + settings.loadingClass + '">' + settings.loadingElements + '</div>');
			}
		});
	 
		return this.each(function() {
			var elem = $(this);
			var size = {
				"height": $(this).parent().css("height"),
				"width": $(this).parent().css("width")
			};
			
			if(elem.data("postify")){
				
				var src = (url === undefined) ? elem.data("postify") : url;
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
					
					var adjustNewSize = settings.adjustSize;
					
					if(settings.adjustSize == "auto"){
					   adjustNewSize = (parseFloat(newImg.css("height")) > parseFloat(newImg.css("width"))) ? "childHeight" : "childWidth";
					}
					
					if(settings.adjustSize == "parent"){
						elem.parent().delay(settings.delay).animate({height: newImg.css("height")}, settings.duration);
					}
					else if(adjustNewSize == "childHeight"){
						var width = (parseFloat(size.height) / parseFloat(newImg.css("height"))) * parseFloat(newImg.css("width"));
						newImg.animate({height: elem.css("height"), width: width + "px"});
					}
					else if(adjustNewSize == "childWidth"){
						var height = (parseFloat(size.width) / parseFloat(newImg.css("width"))) * parseFloat(newImg.css("height"));
						newImg.animate({height: height, width: elem.css("width")});
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
		"adjustSize": "parent"
	};
 
}( jQuery ));