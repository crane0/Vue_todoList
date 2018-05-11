### 1.简单使用vue的脚手架，实现了2个小功能
1. todolist
2. ajax获取GitHub的用户信息，展示

### 2.注意点

#### 2.1.对原脚手架做出的修改

- 目的：为了让eslint进行检查时，不要太嚣张！

1. .eslintrc.js中，
```
//rules中添加了：
rules: {
    'eol-last': 0,
    'indent': 0,
}
```

2. .eslintignore中，
```
*.js
*.vue
```

3. 入口main.js中，
```
//添加了如下注释
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App},
  template: '<App />'
})
```

#### 2.2.index.html的问题
- 其中引入了bootstrap，只是对于ajax的案例使用，
- 其他的案例，有自己的CSS，如果引入了bootstrap，会引起排版错乱


### 3.关于todoList项目
1. 添加数据，是按回车来确认，没有按钮点击。
2. 添加到列表中的数据，存放在了`localStorage`中


### 4.组件间通信

> 如果要对应的文件夹，要将其改名为src
>> 如果更名后还是报错，要在`build/webpack.base.conf.js`第25行，更正为`./src/main.jss`

1. `src_todos1`文件夹，使用的是基础的`props`进行通信

2. `src_自定义事件&PubSub`文件夹，使用了`$emit $on`
    另外还有一种是，`$refs.xxx.$on`的形式,
    还有使用`PubSub`进行通信

3. `src_slot通信`文件夹，使用的是`slot`通信
    注意，与之前的相比，将原本在`todoFooter.vue`中的方法调用，全部转移到了`App.vue`中


### 5.ajax请求demo
1. 对应的是`src`文件夹

2. 发送请求，从GitHub提供的接口中，通过查询条件，获取对应的用户信息，展示一部分
