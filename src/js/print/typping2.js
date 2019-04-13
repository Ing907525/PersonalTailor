/*
* @Author: Alone Walker
* @Date:   2018-07-21 18:34:29
* @Last Modified by:   Alone Walker
* @Last Modified time: 2018-07-21 20:35:10
*/

;(function(root, factory) {
  if (typeof exports === 'object') {
        module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define('Typing', [], function($) {
      return (root.Typing = factory($));
    });
  } else {
    root.Typing = factory();
  }
}(this, function() {
  function Typing(opts) {
    this.opts = opts || {};
    this.source = opts.source;
    this.output = opts.output;
    this.delay = opts.delay || 120;
    this.chain = {
      parent: null,
      dom: this.output,
      val: []
    };
    this._stop = true;
    this.key = 0;

    if (!(typeof this.opts.done == 'function')) this.opts.done = function() {};
  }
  Typing.fn = Typing.prototype = {
    toArray: function(eles) {
      var result = [];
      for (var i = 0; i < eles.length; i++) {
        result.push(eles[i]);
      }
      return result;
    },

    init: function() {
      this.chain.val = this.convert(this.source, this.chain.val);
    },

    convert: function(dom, arr) {
      var that = this,
        children = this.toArray(dom.childNodes);

      for (var i = 0; i < children.length; i++) {
        var node = children[i];
        if (node.nodeType === 3) {
          arr = arr.concat(node.nodeValue.split(''));
        } else if (node.nodeType === 1) {
          var val = [];
          val = that.convert(node, val);
          arr.push({
            'dom': node,
            'val': val
          });
        }
      }

      return arr;
    },

    print: function(dom, val, callback) {
      if (dom != 'undefined' && dom != undefined) {
        setTimeout(function() {
          dom.appendChild(document.createTextNode(val));
          callback();
        }, this.delay);
        return this;
      }
      else{
        return this;
      }
    },

    play: function(ele) {
      if (this._stop) return;
      if (!ele) return;
      if (!ele.val.length) {
        if (ele.parent) this.play(ele.parent);
        else this.opts.done();
        return;
      }

      var curr = ele.val.shift();
      var that = this;
      if (typeof curr === 'string') {
        this.print(ele.dom, curr, function() {
          that.play(ele);
        });
      } else {
        var dom = document.createElement(curr.dom.nodeName);
        var attrs = that.toArray(curr.dom.attributes);
        for (var i = 0; i < attrs.length; i++) {
          var attr = attrs[i];
          dom.setAttribute(attr.name, attr.value);
        }
        ele.dom.appendChild(dom);
        curr.parent = ele;
        curr.dom = dom;
        this.play(curr.val.length ? curr : curr.parent);
      }
      return this;
    },

    start: function() {
      this._stop = false;
      this.init();
      this.play(this.chain);

      return this;
    },

    pause: function() {
      this._stop = true;
    },

    resume: function() {
      this._stop = false;
      this.play(this.chain);
    }
  };

  Typing.version = '2.1';

  return Typing;
}));
/*
;(function(factory) {
    if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        // AMD或CMD
        define(function() {
            return typping;
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function(root, jQuery) {
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
}(function($) {
    var defaults = {
        source: null,
        output: null,
        delay: 120,
        chain: { parent: null, dom: this.output, val: [] },
        _stop: true,
        key: 0,
    };
    var Typping = function(element, options) {
        function toArray(eles) {
            var result = [];
            for (var i = 0; i < eles.length; i++) {
                result.push(eles[i]);
            }
            return result;
        }
        function init () {
          chain.val = convert(source, chain.val);
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
            }, delay);
            return;
          }
          else{
            return;
          }
        }
        function play (ele) {
          if (_stop) return;
          if (!ele) return;
          if (!ele.val.length) {
            if (ele.parent) play(ele.parent);
            else opts.done();
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
          return this;
        }
        function start () {
          _stop = false;
          init();
          play(this.chain);

          return this;
        }
        function pause () {
          _stop = true;
        }
        function resume () {
          _stop = false;
          play(chain);
        }
    };
    $.fn.Typping = function(parameter, callback) {
        if (typeof parameter == 'function') { //重载
            callback = parameter;
            parameter = {};
        } else {
            parameter = parameter || {};
            callback = callback || function() {};
        }
        var options = $.extend({}, defaults, parameter);
        return this.each(function() {
            var typping = new Typping(this, options);
            callback(typping);
        });
    };
}));*/