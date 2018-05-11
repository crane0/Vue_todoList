### 简单使用vue的脚手架，实现了一个todolist的小功能

#### 对原脚手架做出的修改

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

#### 关于项目
1. 添加数据，是按回车来确认，没有按钮点击。
2. 添加到列表中的数据，存放在了localStorage中

#### 组件间通信
> 如果要对应的文件夹，要将其改名为src
>> 如果更名后还是报错，要在`build/webpack.base.conf.js`第25行，更正为`./src/main.jss`

1. src_todos1文件夹，使用的是基础的props进行通信

2. src_自定义事件&PubSub，使用了$emit $on
    另外还有一种是，$refs.xxx.$on的形式,
    还有使用PubSub进行通信
