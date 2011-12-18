(function ($) {
	"use strict";
	$.fn.sticky = function (options) {

		var settings = $.extend({
			'cssclass': 'sticky'
		}, options),
			$fixedElements = [],
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

		this.each(function () {
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

		handleScroll = function () {

			scrollTop = $(window).scrollTop();
			for (i = 0; i < $fixedElements.length; i = i + 1) {
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

		handleScrollEvent = function () {
			clearTimeout(ival);
			ival = setTimeout(function () {
				handleScroll();
			}, scrollWait);
		};

		$(window).scroll(handleScrollEvent);

		// update first time without scroll event
		handleScroll();

		return this;
	};

}(jQuery));