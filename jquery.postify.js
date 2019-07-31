(function( $ ) {
 
    $.fn.postify = function(url = undefined, options) {
		
	 
		var settings = $.extend( {}, $.fn.postify.defaults, options );
		
		var animation = typeof settings.animation === "string" ? $.fn.postify.animations[settings.animation] : settings.animation;
		
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
						$(this).fadeOut(settings.duration);
						
					});
					
					var animOpts = animation[2] !== undefined ? {duration: settings.duration, step: animation[2]} : settings.duration;
					
					newImg.hide().css({
						position: "absolute",
						top: "0",
						left: "0",
						width: "100%",
						display: "inline-block"
					}).css(animation[0]).appendTo(elem).animate(animation[1], animOpts);
					
					var adjustNewSize = settings.adjustSize;
					
					if(settings.adjustSize === "auto"){
					   adjustNewSize = (parseFloat(newImg.css("height")) > parseFloat(newImg.css("width"))) ? ((parseFloat(size.height) > parseFloat(size.width)) ? "childWidth" : "childHeight") : ((parseFloat(size.height) > parseFloat(size.width)) ? "childWidth" : "childHeight");
					}
					
					
					if(settings.adjustSize === "cover") {
						if(parseFloat(newImg.css("height")) > parseFloat(newImg.css("width"))){
						   newImg.animate({width: "100%"}, settings.duration);
						}
						else{
						   newImg.animate({height: "100%"}, settings.duration);
						}
						
						var hW = (parseFloat(newImg.css("width")) - parseFloat(size.width)) / 2;
						var hH = (parseFloat(newImg.css("height")) - parseFloat(size.height)) / 2;
						if(parseFloat(newImg.css("width")) > parseFloat(newImg.css("height"))){
							
							console.log(hH);
							newImg.animate({top: 0, left: '-'+hW+'px'}, settings.duration);
						}
						else {
							newImg.animate({left: 0, top: '-'+hH+'px'}, settings.duration);
						}
						
					}
					
					else if(adjustNewSize === "parent"){
						elem.parent().animate({height: newImg.css("height")}, settings.duration);
					}
					else if(adjustNewSize === "childHeight"){
						var width = (parseFloat(size.height) / parseFloat(newImg.css("height"))) * parseFloat(newImg.css("width"));
						newImg.animate({height: elem.css("height"), width: width + "px"});
					}
					else if(adjustNewSize === "childWidth"){
						var height = (parseFloat(size.width) / parseFloat(newImg.css("width"))) * parseFloat(newImg.css("height"));
						newImg.animate({height: height, width: elem.css("width")});
					}
				});
				
				newImg.delay(settings.delay).attr("src", src);
				
			}
			else if(elem.data("postify-bg")){
				var newImg = $("<img>");
				newImg.load(function () {
					$(this).css("background-image", "url(" + $(this).data("postify-bg") + ")");
					
					elem.find("." + settings.loadingClass).each(function(){
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
	// Predefined animations
	$.fn.postify.animations = {
		"fade": [{opacity: 0}, {opacity:1}],
		"slideLeft": [{left: "100%"}, {left: "0"}],
		"slideRight": [{left: "-100%"}, {left: "0"}],
		"slideUp": [{top: "100%"}, {top: "0"}],
		"slideDown": [{top: "-100%"}, {top: "0"}],
		"flip": [{transform: "rotate3d(0, 1, 0, 90deg)"}, {hi: 0}, function (now, fx){
			$(this).css("transform", "rotate3d(0, 1, 0, " + (1 - fx.pos) * 90 + "deg)");
		}],
		"scale": [{transform: "scale(0) translate(50%, 50%)", top: "-50%", left: "0%"}, {scale: 1}, function (now, fx){
			$(this).css("transform", "scale(" + now + ")");
		}]
	};
 
}( jQuery ));