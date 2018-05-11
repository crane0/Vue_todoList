import Vue from 'vue'
/*1.x使用的，非官方vue插件*/
import VueResource from 'vue-resource'
import App from './App'

/*
* 声明使用插件
* vm和其他组件对象会多一个属性 $http，通过它可以发送ajax请求（get,post）
*   其实vm和组件对象？
* */
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App},
  template: '<App />'
})
