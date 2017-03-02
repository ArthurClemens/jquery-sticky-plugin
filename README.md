# Sticky jQuery Plugin

v0.1.0

Keep one, two or more elements stuck to the page when scrolling up and down.



## Background

It's common practice to have a menu or sidebar navigation stick at the top of the browser window, using 'position: fixed'. But because a fixed positioned element is removed from the rendering flow (as if the fixed element does not exist), content below will suddenly shift upwards. 
This plugin inserts an element below the fixed element to 'fill up' the removed spacing.
It also calculates the y position of fixed elements below to encounter that removed spacing.



## Usage

One sticky element:

	HTML:
	<div class='makeSticky'>
		sticky menu
	</div>

	CSS:
	.sticky {
		position: fixed;
		width: 100%;
	}

	JS:	
	jQuery('.makeSticky').sticky();


Multiple sticky elements:

	HTML:
	<div class='makeSticky'>
		sticky content one
	</makeSticky>
	<div class='makeSticky'>
		sticky content two
	</makeSticky>
	

	CSS:
	.sticky {
		position: fixed;
		width: 100%;
	}
	
	JS:
	jQuery('.makeSticky').sticky();



### Options

- cssclass: CSS class name of sticky element when stuck. Default: 'sticky'.


				
## Demo

Fiddle: http://jsfiddle.net/gh/get/jquery/1.7.1/ArthurClemens/jquery-sticky-plugin/tree/master/jsfiddle/



## Caveats

This is code version 0.1.0.

- Untested on IEs
- Cannot pass y position: it is assumed fixed elements are stuck to the top
- Cannot unstick elements (for instance let the user remove a sticky bar)



## License

The MIT License

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
