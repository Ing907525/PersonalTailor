;(function (factory) {
   if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        // AMD或CMD
        define(function () {
            return stars;
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
    //配置参数
    var defaults = {

    };
    var Stars = function (element, options) {
        var context;
        var arr = new Array();
        var starCount = 800;
        //初始化画布及context
        function init(){
            //获取canvas
            var starsDom = $(element).get(0);
            windowWidth = $(window).outerWidth(true); //当前的窗口的高度
            starsDom.width=windowWidth;
            starsDom.height=parseInt($(document).height());
            //获取context
            context = starsDom.getContext("2d");
        }

        //创建一个星星对象
        var Star = function (){
            this.x = windowWidth * Math.random();//横坐标
            this.y = 5000 * Math.random();//纵坐标
            this.text=".";//文本
            this.color = "white";//颜色
            //产生随机颜色
            this.getColor=function(){
                var _r = Math.random();
                if(_r<0.5){
                    this.color = "#333";
                }else{
                    this.color = "white";
                }
            }

            //初始化
            this.init=function(){
                this.getColor();
            }
            //绘制
            this.draw=function(){
                context.fillStyle=this.color;
                context.fillText(this.text,this.x,this.y);
            }
        }

         //画月亮
        function drawMoon(){
             var moon = new Image();
             moon.src = "./src/img/moon.png"
             context.drawImage(moon,-5,-10);
        }

        //星星闪起来
        function playstarsDom(){
            for (var n = 0; n < starCount; n++){
                arr[n].getColor();
                arr[n].draw();
            }
            setTimeout(function () {
               playstarsDom()
            },100);
        }

        init();
        $(window).resize(function(event) {
           init();
        });
        //画星星
        for (var i=0;i<starCount;i++) {
            var star = new Star();
            star.init();
            star.draw();
            arr.push(star);
        }
        drawMoon();//绘制月亮
        playstarsDom();//绘制闪动的星星
    };
    $.fn.stars = function (parameter, callback) {
        if (typeof parameter == 'function') { //重载
            callback = parameter;
            parameter = {};
        } else {
            parameter = parameter || {};
            callback = callback || function () {};
        }
        var options = $.extend({}, defaults, parameter);
        return this.each(function () {
            var stars = new Stars(this, options);
            callback(stars);
        });
    };
}));

/*//初始化画布及context
function init(){
    //获取canvas
    var starsDom = document.getElementById("starsDom");
    windowWidth = $(window).outerWidth(true); //当前的窗口的高度
    starsDom.width=windowWidth;
    starsDom.height=$(window).outerHeight(true);
    //获取context
    context = starsDom.getContext("2d");
}

//创建一个星星对象
var Star = function (){
    this.x = windowWidth * Math.random();//横坐标
    this.y = 5000 * Math.random();//纵坐标
    this.text=".";//文本
    this.color = "white";//颜色
    //产生随机颜色
    this.getColor=function(){
        var _r = Math.random();
        if(_r<0.5){
            this.color = "#333";
        }else{
            this.color = "white";
        }
    }

    //初始化
    this.init=function(){
        this.getColor();
    }
    //绘制
    this.draw=function(){
        context.fillStyle=this.color;
        context.fillText(this.text,this.x,this.y);
    }
}

 //画月亮
function drawMoon(){
     var moon = new Image();
     moon.src = "./src/img/moon.png"
     context.drawImage(moon,-5,-10);
}

//页面加载的时候
window.onload = function() {
    init();
    //画星星
    for (var i=0;i<starCount;i++) {
        var star = new Star();
        star.init();
        star.draw();
        arr.push(star);
    }
    drawMoon();//绘制月亮
    playstarsDom();//绘制闪动的星星
}

//星星闪起来
function playstarsDom(){
    for (var n = 0; n < starCount; n++){
        arr[n].getColor();
        arr[n].draw();
    }
    setTimeout("playstarsDom()",100);
}*/
