/*
* @Author: Alone Walker
* @Date:   2018-07-21 18:34:29
* @Last Modified by:   Alone Walker
* @Last Modified time: 2019-04-10 16:30:56
*/
;(function (factory) {
   if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        // AMD或CMD
        define(function () {
            return lineProgressbar;
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        //Browser globals
        factory(jQuery);
    }
}(function ($) {
	var defaults = {
		percentage : null,
		ShowProgressCount: true,
		duration: 1000,
		fillBackgroundColor: '#3498db',
		backgroundColor: '#EEEEEE',
		radius: '0px',
		height: '10px',
		width: '100%'
	};
	var LineProgressbar = function (element, options) {
		// Markup
		/*var print = new Typping({
			source: document.getElementById('print-content'),
			output: document.getElementById('print'),
			delay: 1
		});*/
		$(element).html('<div class="progressbar"><div class="proggress"></div><div class="percentCount"></div></div>');
		var progressFill = $(element).find('.proggress');
		var progressBar= $(element).find('.progressbar');
		var progressBarContainer = $(element).parent();
		progressFill.css({
			backgroundColor : options.fillBackgroundColor,
			height : options.height,
			borderRadius: options.radius,
		});
		progressBar.css({
			width : options.width,
			backgroundColor : options.backgroundColor,
			borderRadius: options.radius
		});
		// Progressing
		progressFill.animate(
			{
				width: (function () {
					return (options.percentage + '%');
				})()
			},
			{
				step: function(x) {
					if(options.ShowProgressCount){		//如果现实进度文本
						// $(el).find(".percentCount").text(Math.round(x) + "%");
						if (x == options.percentage) {
							$(element).parent().slideUp();
							debugger;
							$('#circle').circleToggle();
						}
					}
					else{
						if (x == options.percentage) {
							$(element).parent().slideUp();
							$('#circle').circleToggle();
						}
					}
				},
				duration: options.duration
			}
		);
	};
	$.fn.lineProgressbar = function (parameter, callback) {
		if (typeof parameter == 'function') { //重载
            callback = parameter;
            parameter = {};
        } else {
            parameter = parameter || {};
            callback = callback || function () {};
        }
        var options = $.extend({}, defaults, parameter);
        return this.each(function () {
            var lineProgressbar = new LineProgressbar(this, options);
            callback(lineProgressbar);
        });
	};
}));
