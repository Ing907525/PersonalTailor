/*
* @Author: Alone Walker
* @Date:   2018-07-21 20:35:29
* @Last Modified by:   Alone Walker
* @Last Modified time: 2018-09-01 16:56:07
*/
;(function (factory) {
   if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        // AMD或CMD
        define(function () {
            return typping;
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
        factory(jQuery);
    }
}(function ($) {
	var defaults = {
		delay: 10,
		chain: {
	      parent: null,
	      dom: document.getElementById('print'),
	      val: []
	    },
		_stop: true,
		key: 0,
		done: function () {}
	};
	var Typping = function (element, options) {
		var source = $(element).get(0);
		function toArray (eles) {
	      	var result = [];
	      	for (var i = 0; i < eles.length; i++) {
	        	result.push(eles[i]);
	      	}
	      	return result;
	    }

	    function init () {
	    	$(options.chain.dom).empty();
	      	options.chain.val = convert(source, options.chain.val);
	    }

	    function convert (dom, arr) {
	        var children = toArray(dom.childNodes);
	      	for (var i = 0; i < children.length; i++) {
	        	var node = children[i];
	        	if (node.nodeType === 3) {
	          		arr = arr.concat(node.nodeValue.split(''));
	        	} else if (node.nodeType === 1) {
	          		var val = [];
	          		val = convert(node, val);
	          		arr.push({
	            		'dom': node,
	            		'val': val
	          		});
	        	}
	      	}
	      	return arr;
	    }

	    function print (dom, val, callback) {
	      	if (dom != 'undefined' && dom != undefined) {
	        	setTimeout(function() {
	          		dom.appendChild(document.createTextNode(val));
	          		callback();
	        	}, options.delay);
	        	return;
	      	}
	      	else{
	        	return;
	      	}
	    }

	    function play (ele) {
	      	if (options._stop) return;
	      	if (!ele) return;
	      	if (!ele.val.length) {
	        	if (ele.parent) play(ele.parent);
	        	else options.done();
	        	return;
	      	}

	      	var curr = ele.val.shift();
	      	if (typeof curr === 'string') {
	        	print(ele.dom, curr, function() {
	          		play(ele);
	        	});
	      	} else {
	        	var dom = document.createElement(curr.dom.nodeName);
	        	var attrs = toArray(curr.dom.attributes);
	        	for (var i = 0; i < attrs.length; i++) {
	          		var attr = attrs[i];
	          		dom.setAttribute(attr.name, attr.value);
	        	}
	        	ele.dom.appendChild(dom);
	        	curr.parent = ele;
	        	curr.dom = dom;
	        	play(curr.val.length ? curr : curr.parent);
	      	}
	      	return;
	    }


	    function pause() {
	      	options._stop = true;
	    }

	    function resume () {
	      	options._stop = false;
	      	play(options.chain);
	    }
	    function start() {
	      	options._stop = false;
	      	init();
	      	play(options.chain);

	      	return;
	    }
	    start()
	};
	$.fn.typping = function (parameter, callback) {
		if (typeof parameter == 'function') { //重载
            callback = parameter;
            parameter = {};
        } else {
            parameter = parameter || {};
            callback = callback || function () {};
        }
        var options = $.extend({}, defaults, parameter);
        return this.each(function () {
            var typping = new Typping(this, options);
            callback(typping);
        });
	};
}));