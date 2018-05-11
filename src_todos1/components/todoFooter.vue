<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="checkAll">
    </label>
    <span>已完成{{completeCount}} / 全部{{todos.length}}</span>
    <button class="btn btn-danger" @click="deleteAllComplete">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    props: {
      todos: Array,
      deleteCompleteTodos: Function,
      checkAllTodos: Function
    },

    data () {
      return {
        /*
        * 在全部{{allCount}}中这样使用，也是可以的，不过不会更新。
        *   因为 allCount依赖于this.todos.length
        *   但allCount不是计算属性，所以不会实时更新。
        * */
        // allCount: this.todos.length
      }
    },

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

    methods: {
      deleteAllComplete () {
        if(confirm('确定要删除所有选中的？')){
          this.deleteCompleteTodos()
        }
      }
    }
  }
</script>

<style>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
