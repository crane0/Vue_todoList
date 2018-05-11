import Vue from 'vue'
/*1.x使用的，非官方vue插件*/
import VueResource from 'vue-resource'
import App from './App'

/*
* 声明使用插件
* vm和其他组件对象会多一个属性 $http，通过它可以发送ajax请求（get,post）
*   关于vm和组件对象
*		vm统一管理组件对象
*		每一个组件，都有自己的组件对象，也就是this
*		在每个组件对象中data,computed中的变量，都会在vm上有
*			因为组件对象中创建的，在vm上也会创建一份。
* */
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App},
  template: '<App />'
})
