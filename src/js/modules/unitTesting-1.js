'user strict';
import {u} from './modules.js';
// 测试合并JSON
var obj1 = 'src/js/a.json';
var obj2 = 'src/js/b.json';
var o = u.mergJson(obj1,obj2);
// console.log(o[0].val)

// 测试合并数组
var arr1 = ['张三','李四','王五','赵六'];
var arr2 = [{'Mr Zhang':10,'Mr Li':20,'Mr Wang':30},{'Mr Zhang':40},{'Mr Zhang':50}];
var a = u.mergArray(arr1,arr2)
// console.log(a)
// 测试添加class
var domAdd = document.querySelectorAll('.cl');
u.addClass(domAdd,'clTest')
// 测试删除class
var domRemove = $('.cl');
// u.removeClass(domRemove,'cl1 cl2 clTest')
u.removeClass(domRemove,'cl1 cl2 clTest')
// 判断是否含有某个Class
var domHas= document.querySelector('.cl');
var f = u.hasClass(domHas,'cl2');
// console.log(f)
// 将json形式的css样式文件中连接符命名法改成驼峰命名法
var str1 = {
            backgroundColor: "#ff00ff",
            borderRadius: 2,
            color: "#000000",
            content: "自定义标记点上方的气泡窗口",
            fontSize: 8,
            padding: 4,
            textAlign: "center",
            btnStyle:{
                color:'red'
            }
        }
var str = {
            'background-color': "#ff00ff",
            'border-radius': 2,
            'color': "#000000",
            'content': "自定义标记点上方的气泡窗口",
            'font-size': 8,
            'padding': 4,
            'text-align': "center",
            'abs':0
        }
var st = 'backgroundColor';
var st0 = 'background-image';
// console.log(u.toHyphen(str1))
// console.log(u.toHump(str))
// console.log(u.provingCSS(str))
/*u.imgLoaded('src/img/bg.jpg',function () {
    console.log(this.width)
})*/
// console.log(var newDate = u.crtTimeFtt('YYYY年MM月dd',new Date()))
