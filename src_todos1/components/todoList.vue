<template>
    <ul class="todo-main">
      <TodoListItem v-for="(todo, index) in todos" :key="index"
        :todo="todo" :deleteTodo="deleteTodo" :index="index"/>
    </ul>
</template>

<script>

    import TodoListItem from './todoListItem'
    export default {
      //props的类型，自己指定
      props: ['todos', 'deleteTodo'],

      components: {
        TodoListItem
      }
    }
</script>


<style>
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
</style>
