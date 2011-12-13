(function( $ ){

	$.fn.sticky = function(options) {
	
		var settings = $.extend( {
		  'cssclass' : 'sticky'
		}, options);
		
		var $fixedElements = [],
			$fixedElement,
			offsetY = 0,
			scrollTop = 0,
			ival,
			i,
			$this,
			scrollZone,
			handleScroll,
			handleScrollEvent,
			// scroll wait duration depends if sticky element changes are within scroll zone
			SCROLL_WAIT_FINE = 5,
			SCROLL_WAIT_COURSE = 15,
			scrollWait = SCROLL_WAIT_COURSE;
	
		this.each(function() {
			$this = $(this);
			// scrollY: y position from where to fixate
			$this.scrollY = $this.position().top - offsetY;

			// stickyY: y position when being sticky
			$this.stickyY = offsetY;
			offsetY += $this.outerHeight();
			
			// scrollZone: to get finegrained scroll updates when sticking/unsticking happens
			scrollZone = $this.scrollY + $this.outerHeight();
			
			$fixedElements.push($this);
		});
		
		handleScroll = function() {

			scrollTop = $(window).scrollTop();
			for (i=0; i<$fixedElements.length; i=i+1) {
				$fixedElement = $fixedElements[i];

				if (scrollTop >= $fixedElement.scrollY) {
					if (!$fixedElement.isFixed) {
						$fixedElement.isFixed = 1;
						
						// fix element at y position stickyY
						$fixedElement.addClass(settings.cssclass);
						$fixedElement.css({
							top: $fixedElement.stickyY + 'px'
						});			
						// add a div to hold the padding the fixed element has just removed
						$fixedElement.$div = jQuery('<div></div>').css({
							height: $fixedElement.outerHeight()
						});
						$fixedElement.after($fixedElement.$div);
					}
				} else {
					if ($fixedElement.isFixed) {
						$fixedElement.isFixed = 0;
						$fixedElement.$div.remove();
						$fixedElement.removeClass(settings.cssclass);
						$fixedElement.css({
							top: 'auto'
						});
					}
				}
			}
			scrollWait = scrollTop < scrollZone ? SCROLL_WAIT_FINE : SCROLL_WAIT_COURSE;
		};
		
		handleScrollEvent = function() {
			clearTimeout(ival);
			ival = setTimeout(function() {
				handleScroll();
			}, scrollWait);
		};
		
		$(window).scroll(handleScrollEvent);
		
		// update first time without scroll event
		handleScroll();
		
		return this;	
	};
	
})(jQuery);

/*
Copyright (c) 2011 Arthur Clemens, arthur@visiblearea.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/