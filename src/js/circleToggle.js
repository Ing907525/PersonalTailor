/*
* @Author: Alone Walker
* @Date:   2018-07-21 19:44:31
* @Last Modified by:   Alone Walker
* @Last Modified time: 2019-04-14 01:26:59
*/
;(function (factory) {
   if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        // AMD或CMD
        define(function () {
            return circleToggle;
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
	var defaults1 = {
        callback:function (argument) {}
	};
	var CircleToggle = function (element, option) {
		$(element).html('<div class="circle circle-1"></div><div class="circle circle-2"></div>');
		$(element).animate({'margin-top':'-174px'},300,function () {
			$('.circle-1').addClass('circle-animation-1');
			$('.circle-2').addClass('circle-animation-2');
			function audioPlay() {
				var myAuto = document.getElementById('myaudio');
				var c_music = $('.bg-music');
				var musicArr = [
					"AngelsWillRise",
					"Apollo'sTriumph",
					"AutobotsReunite",
					"BeethovenVirus",
					"BlackBlade",
					"BreathAndLife",
					"ConquestOfParadise",
					"DragonRider",
					"ElDorado",
					"EmpireOfAngels",
					"Exodus",
					"Faded",
					"FleursDuMal",
					"FollowYourDream",
					"ForTheWin",
					"GoTime",
					"GuardiansAtTheGate",
					"HaloThemeMjolnirMix",
					"HeartOfCourage",
					"Hero'sTheme",
					"He'sAPirate",
					"HumanLegacy",
					"Intro",
					"Monody",
					"PacificRim",
					"RockHouseJail",
					"SeeYouAgain",
					"Skorpinok",
					"StrengthOfAThousandMen",
					"TalesOfTheElectricRomeo",
					"TheMass",
					"TheMedallionCalls",
					"Time",
					"Victory",
					"ZoostersBreakout"
				]
				var index = Math.floor((Math.random()*musicArr.length));
				myaudio.src='src/files/' + musicArr[index] +'.mp3';
				// myaudio.src='src/files/test.mp3';
				myAuto.addEventListener('ended',function(){
					index = Math.floor((Math.random()*musicArr.length));
                    var objUrl = 'src/files/' + musicArr[index] + '.mp3';
	                $(myAuto).attr({"src": objUrl, 'preload': 'auto'});
	                $(myAuto).load();
	                $(myAuto)[0].play();
	                $(myAuto).show();
	                getTime();
	                // 获取mp3文件的时间 兼容浏览器
			        function getTime() {
			            setTimeout(function () {
			                var duration = $(myAuto)[0].duration;
			                if(isNaN(duration)){
			                    getTime();
			                }
			                else{
			                    console.info("该歌曲的总时间为："+$(myAuto)[0].duration+"秒")
			                }
			            }, 10);
			        }
                },false)
                myAuto.play();
                var flag = 0;
                c_music.on('click', function() {
                	console.log(flag)
                	event.preventDefault();
                	if (flag == 0) {
                		myAuto.pause();
                		flag = 1;
                	}else{
                		myAuto.play();
                		flag = 0;
                	}

                });
			}
			// 播放音乐
			audioPlay();
			// writeContent(true);
            function decompose(){
                // 基本信息
                $('.basic-information').addClass('flash');
                $('.main-bg').addClass('show bounceIn')
                setTimeout(function(){
                    $('.main-bg').addClass('bounceOut').removeClass('bounceIn')
                },9000)
                // 学校专业
                $('.school-professional').addClass('flash flash-1');
                setTimeout(function(){
                    // debugger;
                    $('.basic-information-detail').hide().next().show();
                    $('.main-bg').addClass('bounceIn').removeClass('bounceOut');
                    setTimeout(function () {
                        $('.title-').addClass('bounceOutDown').removeClass('bounceInDown').css('display','none')
                        $('.detail-').addClass('bounceOutUp').removeClass('bounceInUp').css('display','none')
                    },5000)
                    setTimeout(function(){
                        $('.title-1').addClass('bounceInDown').css('display','block')
                        $('.detail-1').addClass('bounceInUp').css('display','block')
                    },5000)
                },10000)
                setTimeout(function () {
                    $('.main-bg').addClass('bounceOut').removeClass('bounceIn')
                },17500)
                // 工作经历
                $('.work-experience').addClass('flash flash-2');
                setTimeout(function () {
                    $('.school-professional-detail').hide().next().show();
                    $('.main-bg').addClass('bounceIn').removeClass('bounceOut');
                },18000)
                setTimeout(function () {
                    $('.main-bg').addClass('bounceOut').removeClass('bounceIn')
                },26500)
                // 专业技能
                $('.professional-skill').addClass('flash flash-3');
                setTimeout(function () {
                    $('.work-experience-detail').hide().next().show();
                    $('.main-bg').addClass('bounceIn').removeClass('bounceOut');
                },27000)
                setTimeout(function () {
                    $('.main-bg').addClass('bounceOut').removeClass('bounceIn')
                },35500)
                // 项目经验
                $('.project-experience').addClass('flash flash-4');
                setTimeout(function () {
                    $('.professional-skill-detail').hide().next().show();
                    $('.main-bg').addClass('bounceIn').removeClass('bounceOut');
                },36000)
                setTimeout(function () {
                    $('.main-bg').addClass('bounceOut').removeClass('bounceIn')
                },44500)
                // 附属信息
                $('.satellite-information').addClass('flash flash-5');
                setTimeout(function () {
                    $('.project-experience-detail').hide().next().show(function () {
                        $(this).find('.flex-middle-center').removeClass('flex-middle-center');
                    });
                    $('.main-bg').addClass('bounceIn').removeClass('bounceOut');
                },45000)
            }
            function allFlash(t) {
                setTimeout(function () {
                    $('#popup').empty().siblings('#popup-all').animate({'display':'block'}, function () {
                        $('.banner-title li').on('click', function(event) {
                            event.preventDefault();
                            var index = $(this).index();
                            $('.banner-list .banner-item').eq(index).addClass('active').siblings().removeClass('active');
                        });
                        $('.school-professional-detail').css('display', 'block');
                        $('.map').removeClass('col-md-8').addClass('col-md-10');
                        $('#print-content').typping();
                        setTimeout(function () {
                            $('.title-').css('display', 'block').removeClass('bounceOutDown').addClass('slideInLeft')
                            $('.detail-').css('display', 'block').removeClass('bounceOutUp').addClass('slideInLeft')
                        },5000)
                        setTimeout(function () {
                            $('.title-1').css('display', 'block').removeClass('bounceInDown').addClass('slideInRight')
                            $('.detail-1').css('display', 'block').removeClass('bounceInUp').addClass('slideInRight')
                        },5000)
                        $('.expertise-navbar img').on('click', function(event) {
                            event.preventDefault();
                            var index = $(this).index();
                            $('#popup-all .expertise-item').eq(index).slideDown().siblings().slideUp();
                        });
                    });
                },t)
            }
			$('.slideLeft-BG').slideDown('slow',function () {
				decompose();
				allFlash(54000);
                $('.ignore').on('click', function(event) {
                    event.preventDefault();
                    allFlash(540);
                });
			})
		})
        defaults1.callback.apply(this, element);
	};
	$.fn.circleToggle = function (parameter, callback) {
		if (typeof parameter == 'function') { //重载
            callback = parameter;
            parameter = {};
        } else {
            parameter = parameter || {};
            callback = callback || function () {};
        }
        var option = $.extend({}, defaults1, parameter);
        return this.each(function () {
            var circleToggle = new CircleToggle(this, option);
            callback(circleToggle);
        });
	};
}));