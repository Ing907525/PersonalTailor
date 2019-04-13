'user strict';
/**
 * [description]
 * @param  	{[Function]} addClass    	[dom节点添加class ：el dom节点 val 添加class名称]
 * @param  	{[Function]} hasClass 		[dom节点是否含有class ：el dom节点 val 判断是否含有class名称]
 * @param 	{[Function]} removeClass	[dom节点删除class ：el dom节点 val 删除class名称]
 * @param 	{[Function]} toHyphen		[字符串命名转化成驼峰命名 ：需要转换成驼峰命名的对象]
 * @param 	{[Function]} toHump			[驼峰命名转化成字符串命名 ：需要转换成连接符命名的对象]
 * @param 	{[Function]} getType		[验证数据类型]
 * @param 	{[Function]} provingCSS		[将css对象转化成css字符串]
 * @param 	{[Function]} imgLoaded		[图片加载完毕后执行函数  imgLoaded(url,function(){this.width,this.height})]
 * @param 	{[Function]} crtTimeFtt   	[日期格式化：fmt 格式化后的日期格式  date 日期 	var newDate = util.crtTimeFtt('YYYY年MM月dd',new Date())]
 * @param 	{[Function]} mergArray   	[合并数组 a 数组a	b 数组b 	var o = util.mergJson(arr1,arr2);]
 * @param 	{[Function]} mergObject   	[合并JSON url1	第一url地址，url2 第二个url地址 	var o = util.mergJson(obj1,obj2);]
 * @param 	{[Function]} crtTimeFtt   	[日期格式化：fmt 格式化后的日期格式  date 日期]
 */
import * as _$ from "../jQuery/jQuery-1.11.0.js";
import * as pagination from "../pagination/jquery.pagination.js";
import * as placeholder from "../placeholder/jquery.placeholder.js";
class Util {
  	constructor() {
		this.version = 'Util.js 2018-05-01 Version 1.0';
  	}
  	init(a,b) {
  		return 'hello';
	}
	trim(str) {
        return str.replace(/^\s+|\s+$/g, "");
    }
	each(array, callback) {
        var len = array.length;
        var i;
        if (typeof len === "number" && len >= 0) {
            for (i = 0; i < len;) {
                if (callback.call(array[i], i, array[i++]) === false) {
                    break;
                }
            }
        } else {
            for (i in array) {
                if (callback.call(array[i], i, array[i]) === false) {
                    break;
                }
            }
        }
    }
	addClass(el, val) {
    	if (el == null) return;
    	let el_class = el.className,//获取 class 内容.
		blank = (el_class != '') ? ' ' : '',//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
		added = el_class + blank + val;//组合原来的 class 和需要添加的 class.
		el.className = added;//替换原来的 class.
    }
    hasClass(el, val){
    	if (el == null) return;
		let el_class = el.className,//获取 class 内容.
		el_class_lst = el_class.split(/\s+/),//通过split空字符将cls转换成数组.
		x = 0;
		for(x in el_class_lst) {
			if(el_class_lst[x] == val) {//循环数组, 判断是否包含cls
				return true;
			}
		}
		return false;
	}
    removeClass(o, val){
    	if (o == null) return;
    	if (!val) {
    		if (o instanceof jQuery && o.length==1) {
    			return this.each(o,function (k,v) {
					console.log(v)
	                v.className = "";
	            })
    		}
    		else{
    			return [].forEach.call(o,function(v){　
				　　v.className = '';　　　　　　
				})
    		}
    	}
    	else{
    		var classNames = val.split(" ");
    		var that = this;
            return this.each(o,function (v) {
                var domClassName = " " + this.className + " ";
                for (var i = 0; i < classNames.length; i++) {
                    var singleClassName = " " + classNames[i] + " ";
                    domClassName = domClassName.replace(singleClassName, " ");
                }
                this.className = that.trim(domClassName);
            })
    	}
	}
	toHyphen(o) {//驼峰命名转连接符命名
		var hyphenateRE = /[A-Z]/g;
		var getKebabCase = (function(str) {
		    var cache = {};
		    return function ( str ) {
		        var ret = cache[ str ];
		        if( ret ) {
		            return ret;
		        }else{
		            return cache[ str ] = str.replace( hyphenateRE, function( i ){
		                return '-' + i.toLowerCase();
		            })
		        }
		    }
		})(o);
		return this.getType().isString(o) ? getKebabCase(o) : getKebabCase(JSON.stringify(o));
	}
	toHump(o) {//连接符命名转驼峰命名
		const humpRE =  /-([a-z])/g;
		var getCamelCase = (function(str) {
			console.log(str)
		    var cache = {};
		    return function ( str ) {
		        if( cache[ str ] ) {
		            return cache[ str ];
		        }else{
		            return cache[ str ] = str.replace( humpRE, function( all, i ) {
		                return i.toUpperCase();
		            })
		        }
		    }
		})(o)
		return this.getType().isString(o) ? getCamelCase(o) : getCamelCase(JSON.stringify(o))
		// return this.getType().isString(o) ? o.replace(hyphenateRE, function (all,i) {return i.toUpperCase();}) : JSON.stringify(o).replace(hyphenateRE, function (all,i) {return i.toUpperCase();})
	}
	getType(o) {		//获取数据类型
		let gettype=Object.prototype.toString;
		let utility = {};
		return utility={
			isObj:function(o){
			   return gettype.call(o) == "[object Object]";
			},
			isArray:function(o){
			   return gettype.call(o) == "[object Array]";
			},
			isNull:function(o){
			   return gettype.call(o) == "[object Null]";
			},
			isDocument:function(o){
			   return gettype.call(o) == "[object Document]"|| ['object HTMLDocument'];
			},
			isFunction:function (o) {
				return gettype.call(o) == "[object Function]";
			},
			isUndefined:function (o) {
				return gettype.call(o) == "[object Undefined]";
			},
			isBoolean:function (o) {
				return gettype.call(o) == "[object Boolean]";
			},
			isNumber:function (o) {
				return gettype.call(o) == "[object Number]";
			},
			isString:function (o) {
				return gettype.call(o) == "[object String]";
			}
		}
	}
	provingCSS(o) {		//验证输入样式
		const regPos = /^\d+(\.\d+)?$/; //非负浮点数
		const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
		let regDom = document.createElement('div');
		for (var k in o) {
			if (window.getComputedStyle(regDom,null)[k] == undefined) {		//如果不是css样式直接删除掉
				delete o[k]
			}
			if (regPos.test(o[k] || regNeg.test(o[k]))) {
				o[k] += 'px';
			}
		}
		let toHyphenStr = this.toHyphen(o);
		let toHyphenStrLength = toHyphenStr.length;
		return toHyphenStr.substring(1,toHyphenStrLength-1).replace(/\"/g,"").replace(/,/g,";");
	}
	imgLoaded (o) { 		//图片是否加载完成
	    let list = [], intervalId = null,
	    // 用来执行队列
	    tick = function () {
	        let i = 0;
	        for (; i < list.length; i++) {
	            list[i].end ? list.splice(i--, 1) : list[i]();
	        };
	        !list.length && stop();
	    },
	    // 停止所有定时器队列
	    stop = function () {
	        clearInterval(intervalId);
	        intervalId = null;
	    };
	    return function (url, ready, load, error) {
	        let onready, width, height, newWidth, newHeight,img = new Image();
	        img.src = url;
	        // 如果图片被缓存，则直接返回缓存数据
	        if (img.complete) {
	            ready.call(img);
	            load && load.call(img);
	            return;
	        };
	        width = img.width;
	        height = img.height;
	        // 加载错误后的事件
	        img.onerror = function () {
	            error && error.call(img);
	            onready.end = true;
	            img = img.onload = img.onerror = null;
	        };
	        // 图片尺寸就绪
	        onready = function () {
	            newWidth = img.width;
	            newHeight = img.height;
	            if (newWidth !== width || newHeight !== height ||
	                // 如果图片已经在其他地方加载可使用面积检测
	                newWidth * newHeight > 1024
	            ) {
	                ready.call(img);
	                onready.end = true;
	            };
	        };
	        onready();
	        // 完全加载完毕的事件
	        img.onload = function () {
	            // onload在定时器时间差范围内可能比onready快
	            // 这里进行检查并保证onready优先执行
	            !onready.end && onready();
	            load && load.call(img);
	            // IE gif动画会循环执行onload，置空onload即可
	            img = img.onload = img.onerror = null;
	        };
	        // 加入队列中定期执行
	        if (!onready.end) {
	            list.push(onready);
	            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
	            if (intervalId === null) intervalId = setInterval(tick, 40);
	        };
	    };
	}
	crtTimeFtt(fmt,crt) {	//日期格式化
		let date = new Date(crt);
		console.log(date)
		var o = {
		    "M+" : date.getMonth()+1,                 //月份
		    "d+" : date.getDate(),                    //日
		    "h+" : date.getHours(),                   //小时
		    "m+" : date.getMinutes(),                 //分
		    "s+" : date.getSeconds(),                 //秒
		    "q+" : Math.floor((date.getMonth()+3)/3), //季度
		    "S"  : date.getMilliseconds()             //毫秒
		};
		if(/(y+)/.test(fmt) || /(Y+)/.test(fmt))
			fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("("+ k +")").test(fmt))
		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
		return fmt;
	}
	mergArray(a,b) {		//合并数组
		function isArrayFn(v) {
			if (typeof Array.isArray === "function") {
				return Array.isArray(v);
			}else{
				return Object.prototype.toString.call(v) === "[object Array]";
			}
		}
		function mergingArray(a,b) {
			if (a.length>b.length) {
				a.push.apply(a,b);
				return a;
			}else{
				b.push.apply(b,a);
				return b;
			}
		}
		if (isArrayFn(a) && isArrayFn(b)) {
			return mergingArray(a,b)
		}else{
			return alert('请输入正确格式数组');
		}
	}
	mergJson(u1,u2) {		//合并JSON
		var map = new Array();
		var m = new Map();
		$.ajax({url:u1,async:false,type:'get',dataType:'json',success:function (data) {
		    	$.each(data,function (k,v) {
		    		m.set(k,v)
		    	})
		    }
		});
	    $.ajax({url:u2,async:false,type:'get',dataType:'json',success:function (data) {
		    	$.each(data,function (k,v) {
		    		m.set(k,v)
		    	})
		    }
		});
		for (var [key, value] of m) {
		  map.push({key: key, val: value});
		}
	   	return map;
	}
}

// 继承
/*class Square extends Util {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
  get area() {
    return this.height * this.width;
  }
  set sideLength(newLength) {
    this.height = newLength;
    this.width = newLength;
  }
}*/
export let u = new Util();
export let $ = jQuery;
export let pa = pagination;
export let pl = placeholder;

