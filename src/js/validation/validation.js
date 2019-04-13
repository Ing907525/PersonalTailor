/**
 * [description]
 * @param  {[Function]} addClass    [dom节点添加class ：el dom节点 val 添加class名称]
 * @param  {[Function]} hasClass 	[dom节点是否含有class ：el dom节点 val 判断是否含有class名称]
 * @param {[Function]} removeClass	[dom节点删除class ：el dom节点 val 删除class名称]
 * @param {[Function]} toHyphen		[字符串命名转化成驼峰命名 ：需要转换成驼峰命名的对象]
 * @param {[Function]} toHump		[驼峰命名转化成字符串命名 ：需要转换成连接符命名的对象]
 * @param {[Function]} getType		[验证数据类型]
 * @param {[Function]} provingCSS	[将css对象转化成css字符串]
 * @param {[Function]} imgLoaded	[图片加载完毕后执行函数]
 * @param {[Function]} crtTimeFtt   [日期格式化：fmt 格式化后的日期格式  date 日期]
 */
;(function (root, factory) {
	if (typeof exports === 'object') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define('Validation', [],function ($) {
			return (root.Validation = factory($));
		});
	} else {
		root.Validation = factory();
	}
}(this,function () {
	function validation(opts) {
		this.opts = opts || {}; //  参数
        if (!(typeof this.opts.done == 'function')) this.opts.done = function() {};
	}
	Validation.fn = Validation.prototype = {
		extend : function (o1,o2) {
			for(var k in o2){
                o1[k] = o2[k];
            }
            return o1;
		},
        addClass : function (el, val) {
        	if (el == null) return;
        	let el_class = el.className,//获取 class 内容.
			blank = (el_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
			added = el_class + blank + val;//组合原来的 class 和需要添加的 class.
			el.className = added;//替换原来的 class.
        },
        hasClass : function (el, val){
        	if (el == null) return;
			let el_class = el.className,//获取 class 内容.
			el_class_lst = el_class.split(/\s+/);//通过split空字符将cls转换成数组.
			x = 0;
			for(x in el_class_lst) {
				if(el_class_lst[x] == val) {//循环数组, 判断是否包含cls
					return true;
				}
			}
			return false;
		},
        removeClass : function (o, val){
        	if (o == null) return;
			let o_class = ' ' + o.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
			o_class = o_class.replace(/(\s+)/gi, ' '),//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
			removed = o_class.replace(' '+ val +' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
			removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
			o.className = removed;//替换原来的 class.
		},
		toHyphen : function (o) {//转换成驼峰命名
			return this.getType().isObj(o) ? JSON.stringify(o).replace(/([A-Z])/g,"-$1").toLowerCase() : false;
		},
		toHump : function (o) {//转化成连接符命名
			return o.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();;
		},
		getType : function (o) {//获取数据类型
			let gettype=Object.prototype.toString;
			return utility={
				isObj:function(o){
				   return gettype.call(o)=="[object Object]";
				},
				isArray:function(o){
				   return gettype.call(o)=="[object Array]";
				},
				isNull:function(o){
				   return gettype.call(o)=="[object Null]";
				},
				isDocument:function(o){
				   return gettype.call(o)=="[object Document]"|| ['object HTMLDocument'];
				},
				isFunction:function (o) {
					return gettype.call(o)=="[object Function]";
				},
				isUndefined:function (o) {
					return gettype.call(o)=="[object Undefined]";
				},
				isBoolean:function (o) {
					return gettype.call(o)=="[object Boolean]";
				},
				isNumber:function (o) {
					return gettype.call(o)=="[object Number]";
				}
			}
		},
		provingCSS : function (o) {//验证输入样式
			const regPos = /^\d+(\.\d+)?$/; //非负浮点数
			const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
			let regDom = document.createElement('div');
			for (let k in o) {
				if (regDom.style[k] == undefined) {
					alert('The stylesheet is error！\n' + k + ' : ' + o[k])
				}
				if (regPos.test(o[k] || regNeg.test(o[k]))) {
					o[k] += 'px';
				}
			}
			let toHyphenStr = this.getType().isObj(o) ? JSON.stringify(o).replace(/([A-Z])/g,"-$1").toLowerCase() : false;
			let toHyphenStrLength = toHyphenStr.length;
			return toHyphenStr.substring(1,toHyphenStrLength-1).replace(/\"/g,"").replace(/,/g,";");
		},
		imgLoaded : (function () {
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
		})(),
		crtTimeFtt : function (fmt,crt) {
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
			if(/(y+)/.test(fmt))
				fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
			for(var k in o)
				if(new RegExp("("+ k +")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
			return fmt;
		},
		separate_url : function (uri,string) {
			if (uri != undefined && string != undefined && uri.indexOf("?")>=0) {
				var re = new RegExp("" + string + "\=([^\&\?]*)", "ig");
		        return ((uri.match(re)) ? (uri.match(re)[0].substr(string.length + 1)) : null);
			} else {
				uri = uri.replace(/^http:\/\/[^/]+/, "");
				var addr = uri.substr(uri.lastIndexOf('=', uri.lastIndexOf('=') - 1) + 1);
				var index = addr.lastIndexOf("\=");
				//js 获取字符串中最后一个斜杠后面的内容
				var addrLast = decodeURI(addr.substring(index + 1, addr.length));
				//js 获取字符串中最后一个斜杠前面的内容
				var str = decodeURI(addr.substring(0, index));
				return addrLast;
			}
		}
    };
    Validation.version = '1.0';
    return Validation;
}))