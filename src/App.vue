<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!--<TodoHeader :addTodo="addTodo"></TodoHeader>-->
      <!--<TodoHeader @addTodo="addTodo"></TodoHeader>-->
      <TodoHeader ref="header"></TodoHeader>
      <!--<TodoList :todos="todos" :deleteTodo="deleteTodo"></TodoList>-->
      <TodoList :todos="todos"></TodoList>
      <!--<TodoFooter :todos="todos" :deleteCompleteTodos="deleteCompleteTodos" :checkAllTodos="checkAllTodos"></TodoFooter>-->
      <TodoFooter>
        <input type="checkbox" v-model="checkAll" slot="checkAll">
        <span slot="count">已完成{{completeCount}} / 全部{{todos.length}}</span>
        <button class="btn btn-danger" v-show="completeCount" @click="deleteAllComplete" slot="delete1">清除已完成任务</button>
      </TodoFooter>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import TodoHeader from './components/todoHeader'
  import TodoList from './components/todoList'
  import TodoFooter from './components/todoFooter'
  import storageUtils from './utils/storageUtils'


  export default {
    name: 'App',
    data () {
      return {
        // todos: [
        //   {title: 'eat', complete: false},
        //   {title: '吸猫', complete: true},
        //   {title: '养狗', complete: false},
        //   ]
        //将数据存在，localStorage中
        todos: storageUtils.getTodos()
      }
    },
    //从todoFooter中，转移过来
    computed: {
      completeCount () {
        return this.todos.reduce((preTotal, todo) => preTotal + (todo.complete?1:0) ,0)
      },

      checkAll: {
        /*
        * v-model对于checkbox类型的input，代表着checked的值
        *   get方法，其返回值就是checked的值
        *   get方法，一定要return！！！！！
        *
        * this.completeCount>0
        *   是因为如果，列表中已经没有了，就不应该是选中的状态
        * */
        get () {
          return this.todos.length === this.completeCount && this.completeCount>0
        },
        /*
        * v-model对于checkbox类型的input，代表着checked的值
        *   set方法中，传递的参数，就是checked的值
        * */
        set (value) {
          this.checkAllTodos(value)
        }
      }

    },

    //自定义的事件，是异步的，定义在mounted中
    mounted() {
      // this.$on('addTodo', this.addTodo)
      this.$refs.header.$on('addTodo', this.addTodo)

      //订阅消息（这个例子，用于隔代传递数据）
      PubSub.subscribe('deleteTodo', (msg, index) => {
        this.deleteTodo(index)
      })
    },
    methods: {
      addTodo (todo) {
        this.todos.unshift(todo)
      },
      deleteTodo (index) {
        this.todos.splice(index, 1)
      },
      deleteCompleteTodos () {
        //留下没有完成的
        this.todos = this.todos.filter(todo => !todo.complete)
      },
      checkAllTodos (isSelected) {
        this.todos.forEach(todo => todo.complete = isSelected)
      },

      //从todoFooter中转移过来的
      deleteAllComplete () {
        if(confirm('确定要删除所有选中的？')){
          this.deleteCompleteTodos()
        }
      }
    },

    //深度监视！
    watch: {
      todos: {
        deep: true,
        //val就是改变后的todos
        // handler: function (val) {
        //   localStorage.setItem('todos_key', JSON.stringify(val))
        // }

        /*
        * 因为handler对应的，本来就是一个函数，
        *   所以可以直接使用storageUtils对象的方法，也是一个函数
        * */
        handler: storageUtils.setTodos
      }
    },
    components: {
      TodoHeader,
      TodoList,
      TodoFooter
    }
  }
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>

