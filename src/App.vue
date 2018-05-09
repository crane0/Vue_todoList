<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader :addTodo="addTodo"></TodoHeader>
      <TodoList :todos="todos" :deleteTodo="deleteTodo"></TodoList>
      <TodoFooter :todos="todos" :deleteCompleteTodos="deleteCompleteTodos" :checkAllTodos="checkAllTodos"></TodoFooter>
    </div>
  </div>
</template>

<script>
  import TodoHeader from './components/todoHeader'
  import TodoList from './components/todoList'
  import TodoFooter from './components/todoFooter'

  export default {
    name: 'App',
    data () {
      return {
        // todos: [
        //   {title: 'eat', complete: false},
        //   {title: '吸猫', complete: true},
        //   {title: '养狗', complete: false},
        //   ]
        todos: JSON.parse(localStorage.getItem('todos_key') || '[]')
      }
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
      }
    },

    //深度监视！
    watch: {
      todos: {
        deep: true,
        //val就是改变后的todos
        handler: function (val) {
          localStorage.setItem('todos_key', JSON.stringify(val))
        }
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

