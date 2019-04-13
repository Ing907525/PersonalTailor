/**
 * jQuery Line Progressbar
 * Author: KingRayhan<rayhan095@gmail.com>
 * Author URL: http://rayhan.info
 * Version: 1.0.0
 */
require.config({
	baseUrl: "./src",
	shim:{
		"stars" : {
			deps: ["jquery"],
　　　　　　　　	exports: 'stars'
		},
		"Typping" : {
			deps: ["jquery"],
　　　　　　　　	exports: 'Typping'
		},
		"circleToggle" : {
			deps: ["jquery"],
　　　　　　　　	exports: 'circleToggle'
		},
		"lineProgressbar" : {
			deps: ["jquery"],
　　　　　　　　	exports: 'lineProgressbar'
		}
	},
	paths:{
		"jquery": ["js/jQuery/jquery-1.11.0"],
		"stars" : "js/stars",
		"bootstrap" : "js/bootstrap/bootstrap.min",
		"Typping" : "js/print/Typping",
		"circleToggle" : "js/circleToggle",
		"lineProgressbar" : "js/lineProgressbar"
	}
});
require(['jquery', 'bootstrap', 'Typping', 'circleToggle', 'lineProgressbar'], function ($, b, t, c, l) {
	$('.tips').fadeIn(function () {
    	$(this).find('.open-title').text('正在读取用户数据信息');
    	$(this).find('.open-tips').text('Openning the user information database：')
    });
	$('#progressbar').lineProgressbar({
		percentage: 100,
		fillBackgroundColor: '#3498db',
		ShowProgressCount:false,
		duration:5000,
		backgroundColor:'rgba(0,0,0,0.2)',
		height: '32px'
	});
})
