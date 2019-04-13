/*
* @Author: Alone Walker
* @Date:   2018-01-30 14:52:00
* @Last Modified by:   Alone Walker
* @Last Modified time: 2018-11-29 01:21:20
*/
/*;(function (factory) {
  if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
      // AMD或CMD
      define(function () {
          return bannering;
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
    "auto": true,             // Boolean: Animate automatically, true or false
    "speed": 500,             // Integer: Speed of the transition, in milliseconds
    "timeout": 4000,          // Integer: Time between slide transitions, in milliseconds
    "pager": true,           // Boolean: Show pager, true or false
    "nav": false,             // Boolean: Show navigation, true or false
    "random": false,          // Boolean: Randomize the order of the slides, true or false
    "pause": true,           // Boolean: Pause on hover, true or false
    "pauseControls": true,    // Boolean: Pause when hovering controls, true or false
    "prevText": "Previous",   // String: Text for the "previous" button
    "nextText": "Next",       // String: Text for the "next" button
    "maxwidth": "",           // Integer: Max-width of the slideshow, in pixels
    "navContainer": ".banner-thumb",       // Selector: Where auto generated controls should be appended to, default is after the <ul>
    "manualControls": "",     // Selector: Declare custom pager navigation
    "namespace": "",   // String: change the default namespace used
    "before": $.noop,         // Function: Before callback
    "after": $.noop           // Function: After callback
  };
  var Bannering = function (element, options) {

    // Index for namespacing
    // i++;

    // Local variables
    var that = $(element),
    vender,
    selectTab,
    start,
    restart,
    rotate,
    _tabs,

    // Helpers
    index = 0,
    $slide = that.children('.banner-item'),
    length = $slide.length,
    fadeTime = parseFloat(options.speed),
    waitTime = parseFloat(options.timeout),
    maxw = parseFloat(options.maxwidth),

    // Namespacing
    namespace = options.namespace,
    namespaceIdx = namespace + index,

    // Classes
    navClass = namespace + "_nav " + namespaceIdx + "_nav",
    activeClass = namespace + "_here",
    visibleClass = namespaceIdx + "_on",
    slideClassPrefix = namespaceIdx + "_s",

    // Pager
    $pager = $("<ul class='list-unstyled " + namespace + "_tabs " + namespaceIdx + "_tabs'>"),

    // Styles for visible and hidden slides
    visible = {"float": "left", "position": "relative", "opacity": 1, "zIndex": 2},
    hidden = {"float": "none", "position": "absolute", "opacity": 0, "zIndex": 1},

    // Detect transition support
    supportsTransitions = (function () {
      var docBody = document.body || document.documentElement;
      var styles = docBody.style;
      var prop = "transition";
      if (typeof styles[prop] === "string") {
        return true;
      }
      // Tests for vendor specific prop
      vendor = ["Moz", "Webkit", "Khtml", "O", "ms"];
      prop = prop.charAt(0).toUpperCase() + prop.substr(1);
      var i;
      for (i = 0; i < vendor.length; i++) {
        if (typeof styles[vendor[i] + prop] === "string") {
          return true;
        }
      }
      return false;
    })(),

    // Slide Animation
    _slide = function (idx) {
      options.before(idx);
      // If CSS3 transitions are supported
      if (supportsTransitions) {
        $slide.removeClass(visibleClass)
          .css(hidden)
          .eq(idx)
          .addClass(visibleClass)
          .css(visible);
        index = idx;
        setTimeout(function () {
          options.after(idx);
        }, fadeTime)
      } else {
        $slide.stop()
          .fadeOut(fadeTime, function () {
            $(this)
              .removeClass(visibleClass)
              .css(hidden)
              .css("opacity", 1);
          })
          .eq(idx)
          .fadeIn(fadeTime, function() {
            $(this)
              .addClass(visibleClass)
              .css(visible);
            options.after(idx);
            index = idx;
          });
      }
    }
    // Random order
    if (options.random) {
      $slide.sort(function () {
        return (Math.round(Math.random()) - 0.5);
      });
      that
        .empty()
        .append($slide);
    }
    // Add ID's to each slide
    $slide.each(function (i) {
      this.id = slideClassPrefix + i;
    });
    // Add max-width and classes
    that.addClass(namespace + " " + namespaceIdx);
    if (options && options.maxwidth) {
      that.css("max-width", maxw);
    }
    // Hide all slides, then show first one
    $slide
      .hide()
      .css(hidden)
      .eq(0)
      .addClass(visibleClass)
      .css(visible)
      .show();
    // CSS transitions
    if (supportsTransitions) {
      $slide
        .show()
        .css({
          // -ms prefix isn't needed as IE10 uses prefix free version
          "-webkit-transition": "opacity " + fadeTime + "ms ease-in-out",
          "-moz-transition": "opacity " + fadeTime + "ms ease-in-out",
          "-o-transition": "opacity " + fadeTime + "ms ease-in-out",
          "transition": "opacity " + fadeTime + "ms ease-in-out"
        });
    }
    // ******************************************************************************************
    // Only run if there's more than one slide
    if ($slide.length > 1) {

      // Make sure the timeout is at least 100ms longer than the fade
      if (waitTime < fadeTime + 100) {
        return;
      }

      // Pager
      if (options.pager && !options.manualControls) {
        var tabMarkup = [];
        $slide.each(function (i) {
          var n = i + 1;
          var img = $(this).find('.banner-image').clone().html();
          var text = $(this).find('.banner-title h2').text();
          console.log(img)
          tabMarkup +=
            "<li class='" + slideClassPrefix + n + "'>" +
            img +
            "<p>" + text + "</p>" +
            "</li>";
        });
        $pager.append(tabMarkup);
        // Inject pager
        if (options.navContainer) {
          $(options.navContainer).append($pager);
        } else {
          that.after($pager);
        }
      }

      // Manual pager controls
      if (options.manualControls) {
        $pager = $(options.manualControls);
        $pager.addClass(namespace + "_tabs " + namespaceIdx + "_tabs");
      }

      // Add pager slide class prefixes
      if (options.pager || options.manualControls) {
        $pager.find('li').each(function (i) {
          $(this).addClass(slideClassPrefix + (i + 1));
        });
      }

      // If we have a pager, we need to set up the selectTab function
      if (options.pager || options.manualControls) {
        $tabs = $pager.find('a');

        // Select pager item
        selectTab = function (idx) {
          $tabs
          .closest("li")
          .removeClass(activeClass)
          .eq(idx)
          .addClass(activeClass);
        };
      }

      // Auto cycle
      if (options.auto) {

        start = function () {
          rotate = setInterval(function () {

            // Clear the event queue
            $slide.stop(true, true);

            var idx = index + 1 < length ? index + 1 : 0;

            // Remove active state and set new if pager is set
            if (options.pager || options.manualControls) {
              selectTab(idx);
            }

            _slide(idx);
          }, waitTime);
        };

        // Init cycle
        start();
      }

      // Restarting cycle
      restart = function () {
        if (options.auto) {
          // Stop
          clearInterval(rotate);
          // Restart
          start();
        }
      };

      // Pause on hover
      if (options.pause) {
        that.hover(function () {
          clearInterval(rotate);
        }, function () {
          restart();
        });
      }

      // Pager click event handler
      if (options.pager || options.manualControls) {
        $tabs.bind("click", function (e) {
          e.preventDefault();

          if (!options.pauseControls) {
            restart();
          }

          // Get index of clicked tab
          var idx = $tabs.index(this);

          // Break if element is already active or currently animated
          if (index === idx || $("." + visibleClass).queue('fx').length) {
            return;
          }

          // Remove active state from old tab and set new one
          selectTab(idx);

          // Do the animation
          _slide(idx);
        })
        .eq(0)
        .closest("li")
        .addClass(activeClass);

        // Pause when hovering pager
        if (options.pauseControls) {
          $tabs.hover(function () {
            clearInterval(rotate);
          }, function () {
            restart();
          });
        }
      }

      // Navigation
      if (options.nav) {
        var navMarkup =
          "<a href='#' class='" + navClass + " prev'>" + options.prevText + "</a>" +
          "<a href='#' class='" + navClass + " next'>" + options.nextText + "</a>";

        // Inject navigation
        if (options.navContainer) {
          $(options.navContainer).append(navMarkup);
        } else {
          that.after(navMarkup);
        }

        var $trigger = $("." + namespaceIdx + "_nav"),
          $prev = $trigger.filter(".prev");

        // Click event handler
        $trigger.bind("click", function (e) {
          e.preventDefault();

          var $visibleClass = $("." + visibleClass);

          // Prevent clicking if currently animated
          if ($visibleClass.queue('fx').length) {
            return;
          }

          //  Adds active class during slide animation
          //  $(this)
          //    .addClass(namespace + "_active")
          //    .delay(fadeTime)
          //    .queue(function (next) {
          //      $(this).removeClass(namespace + "_active");
          //      next();
          //  });

          // Determine where to slide
          var idx = $slide.index($visibleClass),
            prevIdx = idx - 1,
            nextIdx = idx + 1 < length ? index + 1 : 0;

          // Go to slide
          _slide($(this)[0] === $prev[0] ? prevIdx : nextIdx);
          if (options.pager || options.manualControls) {
          selectTab($(this)[0] === $prev[0] ? prevIdx : nextIdx);
        }

            if (!options.pauseControls) {
              restart();
            }
          });

        // Pause when hovering navigation
        if (options.pauseControls) {
          $trigger.hover(function () {
            clearInterval(rotate);
          }, function () {
            restart();
          });
        }
      }

    }

    // Max-width fallback
    if (typeof document.body.style.maxWidth === "undefined" && options.maxwidth) {
      var widthSupport = function () {
        that.css("width", "100%");
        if (that.width() > maxw) {
          that.css("width", maxw);
        }
      };

      // Init fallback
      widthSupport();
      $(window).bind("resize", function () {
        widthSupport();
      });
    }
  };
  $.fn.bannering = function (parameter, callback) {
    if (typeof parameter == 'function') { //重载
        callback = parameter;
        parameter = {};
      } else {
          parameter = parameter || {};
          callback = callback || function () {};
      }
      var options = $.extend({}, defaults, parameter);
      return this.each(function (i) {
          var bannering = new Bannering(this, options);
          callback(bannering);
      });
    };
}));*/
;(function (factory) {
  if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
      // AMD或CMD
      define(function () {
          return bannering;
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
    "auto": true,             // Boolean: Animate automatically, true or false
    "speed": 500,             // Integer: Speed of the transition, in milliseconds
    "timeout": 4000,          // Integer: Time between slide transitions, in milliseconds
    "pager": true,           // Boolean: Show pager, true or false
    "nav": false,             // Boolean: Show navigation, true or false
    "random": false,          // Boolean: Randomize the order of the slides, true or false
    "pause": true,           // Boolean: Pause on hover, true or false
    "pauseControls": true,    // Boolean: Pause when hovering controls, true or false
    "prevText": "Previous",   // String: Text for the "previous" button
    "nextText": "Next",       // String: Text for the "next" button
    "maxwidth": "",           // Integer: Max-width of the slideshow, in pixels
    "navContainer": "",       // Selector: Where auto generated controls should be appended to, default is after the <ul>
    "manualControls": ".banner-thumb",     // Selector: Declare custom pager navigation
    "namespace": "",   // String: change the default namespace used
    "before": $.noop,         // Function: Before callback
    "after": $.noop           // Function: After callback
  };
  var Bannering = function (element, options) {

    // Index for namespacing
    // i++;

    // Local variables
    var that = $(element),
    vender,
    selectTab,
    start,
    restart,
    rotate,
    _tabs,
    navcss,

    // Helpers
    index = 0,
    $slide = that.children('.banner-item'),
    length = $slide.length,
    fadeTime = parseFloat(options.speed),
    waitTime = parseFloat(options.timeout),
    maxw = parseFloat(options.maxwidth),

    // Namespacing
    namespace = options.namespace,
    namespaceIdx = namespace + index,

    // Classes
    navClass = namespace + "_nav " + namespaceIdx + "_nav",
    activeClass = namespace + "_here",
    visibleClass = namespaceIdx + "_on",
    slideClassPrefix = namespaceIdx + "_s",

    // Pager
    $pager = $("<ul class='list-unstyled " + namespace + "_tabs " + namespaceIdx + "_tabs' />"),

    // Styles for visible and hidden slides
    visible = {"float": "left", "position": "relative", "opacity": 1, "zIndex": 2},
    hidden = {"float": "none", "position": "absolute", "opacity": 0, "zIndex": 1},
    navcss = {"float": "left", "position": "relative", "margin": "0 10px", "width": "15px", "height": "15px", "border-radius":"15px", "zIndex": "10", "background": "#fff", "color": "#000","textAlign":"center", "lineHeight": "15px"},
    // Detect transition support
    supportsTransitions = (function () {
      var docBody = document.body || document.documentElement;
      var styles = docBody.style;
      var prop = "transition";
      if (typeof styles[prop] === "string") {
        return true;
      }
      // Tests for vendor specific prop
      vendor = ["Moz", "Webkit", "Khtml", "O", "ms"];
      prop = prop.charAt(0).toUpperCase() + prop.substr(1);
      var i;
      for (i = 0; i < vendor.length; i++) {
        if (typeof styles[vendor[i] + prop] === "string") {
          return true;
        }
      }
      return false;
    })(),

    // Slide Animation
    _slide = function (idx) {
      options.before(idx);
      // If CSS3 transitions are supported
      if (supportsTransitions) {
        $slide.removeClass(visibleClass)
          .css(hidden)
          .eq(idx)
          .addClass(visibleClass)
          .css(visible);
        index = idx;
        setTimeout(function () {
          options.after(idx);
        }, fadeTime)
      } else {
        $slide.stop()
          .fadeOut(fadeTime, function () {
            $(this)
              .removeClass(visibleClass)
              .css(hidden)
              .css("opacity", 1);
          })
          .eq(idx)
          .fadeIn(fadeTime, function() {
            $(this)
              .addClass(visibleClass)
              .css(visible);
            options.after(idx);
            index = idx;
          });
      }
    }
    // Random order
    if (options.random) {
      $slide.sort(function () {
        return (Math.round(Math.random()) - 0.5);
      });
      that
        .empty()
        .append($slide);
    }
    // Add ID's to each slide
    $slide.each(function (i) {
      this.id = slideClassPrefix + i;
    });
    // Add max-width and classes
    that.addClass(namespace + " " + namespaceIdx);
    if (options && options.maxwidth) {
      that.css("max-width", maxw);
    }
    // Hide all slides, then show first one
    $slide
      .hide()
      .css(hidden)
      .eq(0)
      .addClass(visibleClass)
      .css(visible)
      .show();
    // CSS transitions
    if (supportsTransitions) {
      $slide
        .show()
        .css({
          // -ms prefix isn't needed as IE10 uses prefix free version
          "-webkit-transition": "opacity " + fadeTime + "ms ease-in-out",
          "-moz-transition": "opacity " + fadeTime + "ms ease-in-out",
          "-o-transition": "opacity " + fadeTime + "ms ease-in-out",
          "transition": "opacity " + fadeTime + "ms ease-in-out"
        });
    }
    // ******************************************************************************************
    // Only run if there's more than one slide
    if ($slide.length > 1) {

      // Make sure the timeout is at least 100ms longer than the fade
      if (waitTime < fadeTime + 100) {
        return;
      }

      // Pager
      if (options.pager && !options.manualControls) {
        var tabMarkup = [];
        $slide.each(function (i) {
          var n = i + 1;
          var img = $(this).find('.banner-image').clone().html();
          var text = $(this).find('.banner-title h2').text();
          tabMarkup +=
            "<li>" +
            "<a href='#' class='" + slideClassPrefix + n + "'>" + n + "</a>" +
            "</li>";
        });
        $pager.append(tabMarkup);
        // Inject pager
        if (options.navContainer) {
          var width = $slide.outerWidth(true);
          var height = $slide.find('.banner-title').outerHeight() + $slide.find('.banner-image').outerHeight(true);
          that.width(width);
          $slide.css('width', '100%');
          $(options.navContainer).removeClass().addClass(options.navContainer.substr(1));
          $(options.navContainer).append($pager);
          $(options.navContainer).find('li').css(navcss);
          var width_ = $(options.navContainer).outerWidth(true);
          $(options.navContainer).css({
            right: (width - width_)/2,
            top: height
          });
        } else {
          var width = $slide.outerWidth(true);
          var height = $slide.find('.banner-title').outerHeight() + $slide.find('.banner-image').outerHeight(true);
          that.width(width);
          $slide.css('width', '100%');
          $pager.removeClass().addClass(options.navContainer.substr(1));
          $pager.addClass('banner-thumb');
          that.append($pager);
          $pager.find('li').css(navcss);
          var width_ = $pager.outerWidth(true);
          $pager.css({
            right: (width - width_)/2,
            top: height
          });
        }
      }

      // Manual pager controls
      if (options.manualControls) {
        $pager = $(options.manualControls);
        $pager.addClass(namespace + "_tabs " + namespaceIdx + "_tabs");
      }

      // Add pager slide class prefixes
      if (options.pager || options.manualControls) {
        var tabMarkup = [];
        $slide.each(function (i) {
          var n = i + 1;
          var img = $(this).find('.banner-image').clone().html();
          var text = $(this).find('.banner-title h2').text();
          console.log(img)
          tabMarkup +=
            "<li class='" + slideClassPrefix + n + "'>" +
            img +
            "<p>" + text + "</p>" +
            "</li>";
        });
        $pager.append(tabMarkup);
        // Inject pager
        if (options.navContainer) {
          $(options.navContainer).append($pager);
        } else {
          that.append($pager);
        }
        $pager.find('li').each(function (i) {
          $(this).addClass(slideClassPrefix + (i + 1));
        });
      }

      // If we have a pager, we need to set up the selectTab function
      if (options.pager || options.manualControls) {
        $tabs = $pager.find('a');

        // Select pager item
        selectTab = function (idx) {
          $tabs
          .closest("li")
          .removeClass(activeClass)
          .eq(idx)
          .addClass(activeClass);
        };
      }

      // Auto cycle
      if (options.auto) {

        start = function () {
          rotate = setInterval(function () {

            // Clear the event queue
            $slide.stop(true, true);

            var idx = index + 1 < length ? index + 1 : 0;

            // Remove active state and set new if pager is set
            if (options.pager || options.manualControls) {
              selectTab(idx);
            }

            _slide(idx);
          }, waitTime);
        };

        // Init cycle
        start();
      }

      // Restarting cycle
      restart = function () {
        if (options.auto) {
          // Stop
          clearInterval(rotate);
          // Restart
          start();
        }
      };

      // Pause on hover
      if (options.pause) {
        that.hover(function () {
          clearInterval(rotate);
        }, function () {
          restart();
        });
      }

      // Pager click event handler
      if (options.pager || options.manualControls) {
        $tabs.bind("click", function (e) {
          e.preventDefault();

          if (!options.pauseControls) {
            restart();
          }

          // Get index of clicked tab
          var idx = $tabs.index(this);

          // Break if element is already active or currently animated
          if (index === idx || $("." + visibleClass).queue('fx').length) {
            return;
          }

          // Remove active state from old tab and set new one
          selectTab(idx);

          // Do the animation
          _slide(idx);
        })
        .eq(0)
        .closest("li")
        .addClass(activeClass);

        // Pause when hovering pager
        if (options.pauseControls) {
          $tabs.hover(function () {
            clearInterval(rotate);
          }, function () {
            restart();
          });
        }
      }

      // Navigation
      if (options.nav) {
        var navMarkup =
          "<a href='#' class='" + navClass + " prev'>" + options.prevText + "</a>" +
          "<a href='#' class='" + navClass + " next'>" + options.nextText + "</a>";

        // Inject navigation
        if (options.navContainer) {
          $(options.navContainer).append(navMarkup);
        } else {
          that.after(navMarkup);
        }

        var $trigger = $("." + namespaceIdx + "_nav"),
          $prev = $trigger.filter(".prev");

        // Click event handler
        $trigger.bind("click", function (e) {
          e.preventDefault();

          var $visibleClass = $("." + visibleClass);

          // Prevent clicking if currently animated
          if ($visibleClass.queue('fx').length) {
            return;
          }

          //  Adds active class during slide animation
          //  $(this)
          //    .addClass(namespace + "_active")
          //    .delay(fadeTime)
          //    .queue(function (next) {
          //      $(this).removeClass(namespace + "_active");
          //      next();
          //  });

          // Determine where to slide
          var idx = $slide.index($visibleClass),
            prevIdx = idx - 1,
            nextIdx = idx + 1 < length ? index + 1 : 0;

          // Go to slide
          _slide($(this)[0] === $prev[0] ? prevIdx : nextIdx);
          if (options.pager || options.manualControls) {
          selectTab($(this)[0] === $prev[0] ? prevIdx : nextIdx);
        }

            if (!options.pauseControls) {
              restart();
            }
          });

        // Pause when hovering navigation
        if (options.pauseControls) {
          $trigger.hover(function () {
            clearInterval(rotate);
          }, function () {
            restart();
          });
        }
      }
    }

    // Max-width fallback
    if (typeof document.body.style.maxWidth === "undefined" && options.maxwidth) {
      var widthSupport = function () {
        that.css("width", "100%");
        if (that.width() > maxw) {
          that.css("width", maxw);
        }
      };

      // Init fallback
      widthSupport();
      $(window).bind("resize", function () {
        widthSupport();
      });
    }
  };
  $.fn.bannering = function (parameter, callback) {
    if (typeof parameter == 'function') { //重载
        callback = parameter;
        parameter = {};
      } else {
          parameter = parameter || {};
          callback = callback || function () {};
      }
      var options = $.extend({}, defaults, parameter);
      return this.each(function (i) {
          var bannering = new Bannering(this, options);
          callback(bannering);
      });
    };
}));

