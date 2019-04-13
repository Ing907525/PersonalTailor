new Vue({
	el:"#app",
	data:{
		title:"原生js封装banner轮播图"
	},
	methods:{
		start:function () {
			alert('start')
		},
		render:function () {
			alert('renden')
		},
		stop:function () {
			alert('stop')
		}
	}
})