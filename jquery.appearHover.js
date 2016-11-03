/*
 * jQuery.appearHover
 * https://github.com/esvlad/jquery.appearHover/
 * Copyright (c) 2016 Startsev Vladislav
 * Licensed under the GNU General Public License (https://opensource.org/licenses/GPL-3.0)
 */
 
(function($){
	$.fn.appearHover = function(options){
   		options = $.extend({
			timeout: 300,
			class: false,
			animate: 'fade',
			animateSpeed: 300,
			adnimateEasing: false,
			animateCallback: false,
			animateIn: false,
			animateOut: false
		}, options);
		
		var make = function(){
			
			if(options.animate != false){
				var ani = options.animateSpeed;
				if(options.adnimateEasing != false) ani += ','+options.adnimateEasing;
				if(options.animateCallback != false) ani += ','+options.animateCallback;
			}
			
			function animate_element(element, data, ani, action){
				switch(data){
					case 'fade' :
						if(action == 0){
							element.fadeOut(ani);
						} else element.fadeIn(ani);
						break;
					case 'hide' :
						if(action == 0){
							element.hide(ani);
						} else element.show(ani);
						break;
					case 'slide' :
						if(action == 0){
							element.slideUp(ani);
						} else element.slideDown(ani);
						break;
					default : 
						if(action == 0){
							element.animate({animateIn});
						} else element.animate({animateOut});
						break;
				}
			}

			var active;
			var element = $(this).children();
			element.hover(
				function(){
					active = true;
				},
				function(){
					if(options.class != false){
						element.removeClass(options.class);
					}
					if(options.animate != false){						
						animate_element(element, options.animate, ani, 0);
					}
					active = false;
				}
			);
			
			$(this).hover(
				function(){
					active = true;
					
					if(options.class != false){
						element.addClass(options.class);
					}
					
					if(options.animate != false){
						animate_element(element, options.animate, ani, 1);
					}
				},
				function(){
					active = false;
					setTimeout(function(){
						if(active != true){
							if(options.class != false){
								element.removeClass(options.class);
							}
							
							if(options.animate != false){
								animate_element(element, options.animate, ani, 0);
							}
						}
					}, options.timeout);
				}
			);
		}
		
		return this.each(make);
  };
})(jQuery);
