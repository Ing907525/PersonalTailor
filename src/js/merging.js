;(function (root, factory) {
	if (typeof exports === 'object') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define('Merging', [],function ($) {
			return (root.Merging = factory($));
		});
	} else {
		root.Merging = factory();
	}
}(this,function () {
	function Merging(opts) {
		this.opts = opts || {};
		this.obj1 = this.opts.obj1;
		this.obj2 = this.opts.obj2;
		if (!(typeof this.opts.done == 'function')) this.opts.done = function() {};
	}
	Merging.fn = Merging.prototype = {
		init:function () {
			var that = this;
			console.log(this.obj1)
			if (this.isArrayFn(this.obj1) && this.isArrayFn(this.obj2)) {
				return this.mergingArray(that.obj1,that.obj2)
			}else{
				return this.mergingObject(that.obj1,that.obj2)
			}
		},
		isArrayFn: function (value) {
			if (typeof Array.isArray === "function") {
				return Array.isArray(value);
			}else{
				return Object.prototype.toString.call(value) === "[object Array]";
			}
		},
		mergingArray:function (obj1,obj2) {
			if (obj1.length>obj2.length) {
				obj1.push.apply(obj1,obj2);
				console.log(obj1)
				return obj1;
			}else{
				obj2.push.apply(arr2,obj1);
				console.log(obj2)
				return obj2;
			}
		},
		mergingObject: function (obj1,obj2) {
			var map = new Array();
    		var m = new Map();
    		$.ajax({url:obj1,async:false,type:'get',dataType:'json',success:function (data) {
			    	$.each(data,function (k,v) {
			    		m.set(k,v)
			    	})
			    }
			});
		    $.ajax({url:obj2,async:false,type:'get',dataType:'json',success:function (data) {
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
	Merging.version = '1.0';
    return Merging;
}));
(function () {
	/*var obj1 = 'src/js/a.json';
	var obj2 = 'src/js/b.json';
	var merging = new Merging({
		obj1: obj1,
		obj2: obj2
	});
	var a = merging.init();
	var b = {
	    "b":{
	        "callout": {
	            "backgroudColor": "#ff00ff",
	            "borderRadius": 2,
	            "color": "#000000",
	            "content": "自定义标记点上方的气泡窗口",
	            "fontSize": 8,
	            "padding": 4,
	            "textAlign": "center"
	        },
	        "height": 30,
	        "iconPath": "../../assets/images/icon/pt1.png"
	    }
	}
	console.log(a[0].val)
	document.write(a[0].val);*/
	var arr = ['w','d','z','g','x']
	var m = new Merging();
	console.log(m.isArrayFn(arr))
})()





/*obj1 = 'src/js/a.json';
obj2 = 'src/js/b.json';
function isArrayFn(value){
	if (typeof Array.isArray === "function") {
		return Array.isArray(value);
	}else{
		return Object.prototype.toString.call(value) === "[object Array]";
	}
}
isArrayFn()
function arr(obj1,obj2) {
	if (isArrayFn(obj1) && isArrayFn(obj2)) {
		if (obj1.length>obj2.length) {
			obj1.push.apply(obj1,obj2);
			console.log(obj1)
			return obj1;
		}else{
			obj2.push.apply(arr2,obj1);
			console.log(obj2)
			return obj2;
		}
	}else{
		var map = new Array();
		var m = new Map();
		$.ajax({url:obj1,async:false,type:'get',dataType:'json',success:function (data) {
		    	$.each(data,function (k,v) {
		    		m.set(k,v)
		    	})
		    }
		});
	    $.ajax({url:obj2,async:false,type:'get',dataType:'json',success:function (data) {
		    	$.each(data,function (k,v) {
		    		m.set(k,v)
		    	})
		    }
		});
	   for (var [key, value] of m) {
		  map.push({key: key, val: value});
		}
	    Array.prototype.del = function (key) {
	        for (var i = 0, m; m = this[i]; i++) {
	            if (m.key == key) {
	                this.splice(i, 1);
	                return;
	            }
	        }
	    };
	    function update(map, key, value) {
	        for (var i = 0, m; m = map[i]; i++) {
	            if (m.key == key) {
	                m.val = value;
	                return;
	            }
	        }
	    }
	    function select(map, key) {
	        for (var i = 0, m; m = map[i]; i++) {
	            if (m.key == key) {
	                return m.val;
	            }
	        }
	    }
	    function check(map) {
	    	for (var i = 0, m; m = map[i]; i++) {
		        console.log(m.val);
		    }
	    }
	    return map;
	}
}
var arr = arr(obj1,obj2)
console.log(arr)*/