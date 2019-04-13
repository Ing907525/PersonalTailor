'use strict';
import {u,$,pa} from './modules.js';
console.log(123)
$('.M-box3').pagination({
    pageCount: 7,
    jump: true,
    coping: true,
    mode:'fixed',
    homePage: '首页',
    endPage: '末页',
    prevContent: '上页',
    nextContent: '下页',
    callback: function (api) {
    	console.log(api)
    	var pageCurrent_ = api.getCurrent();
    	var url = 'src/js/json/data' + pageCurrent_ + '.json';
    	$.ajax({
	    	url:url,
	    	type:'get',
	    	dataType:'json',
	    	success:function (data) {
				var htmlTitle = '';
				var htmlDetail = '';
	    		$.each(data.datas,function (k,v) {
	    			htmlTitle += '<th>' + v.name + '</th>';
	    			htmlDetail += '<td>' + v.content + '</td>';
	    		})
	    		$('.pagination-detail .title').html(htmlTitle)
				$('.pagination-detail .detail').html(htmlDetail)
	    	},
	    	error:function () {
	    		console.log(arguments[1])
	    	}
	    })
    }
},function (api) {
	var url = 'src/js/json/data1.json';
	console.log(api.getCurrent())
	$.ajax({
    	url:url,
    	type:'get',
    	dataType:'json',
    	success:function (data) {
			var htmlTitle = '';
			var htmlDetail = '';
    		$.each(data.datas,function (k,v) {
    			htmlTitle = '<th>' + v.name + '</th>';
    			htmlDetail = '<td>' + v.content + '</td>';
    			$('.pagination-detail .title').append(htmlTitle)
				$('.pagination-detail .detail').append(htmlDetail)
    		})
    	},
    	error:function () {
    		console.log(arguments[1])
    	}
    })
});
/*var x = start;
var y = end;
var a = current;
var b = opts.count;
var c = pageCount;
// x=	a	  >		b-1		   ?	a    +		b-1		  >		c	  ?		a   -		(b-(c-a))					   :	a-2		 : 1;
x=current > opts.count - 1 ? current + opts.count - 1 > pageCount ? current - (opts.count - (pageCount - current)) : current - 2 : 1;
//x=a>4-1?a+4-1>c?a-(4-(c-a)):a-2:1;*/



/*// 0<a<=4;
var a=1,x,y;
// c=4;
x=a>3?(a+3>c?c-4:a-2):1
y=a+3>=c?c:x+4;

for(;a<4;a++){
	for (var c = 4; c < 10; c++) {
		x=a>3?(a+3>c?c-4:a-2):1;
		y=a+3>=c?c:x+4;
		console.log('------------------------')
		console.log('当a='+ a + '且c='+ c + '时x='+x)
		console.log('当a='+ a + '且c='+ c + '时y='+y)
		console.log('------------------------')
	}
}*/

