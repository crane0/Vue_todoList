<template>
  <div>
    <h2 v-show="initView">请输入关键字搜索</h2>
    <h2 v-show="loading">请求中...</h2>
    <h2 v-show="errorMsg">{{errorMsg}}</h2>
    <!--数组的length判断是否显示-->
    <div class="row" v-show="users.length>0">
      <div class="card" v-for="(user, index) in users" :key="index">
        <a :href="user.url" target="_blank">
          <img :src="user.avatarUrl" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.username}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import axios from 'axios'

  export default {

    data () {
      return {
        initView: true,   //初始页面显示
        loading: false,   //请求中
        users: [],    //用户数组
        errorMsg: ''    //错误消息
      }
    },

    mounted () {
      PubSub.subscribe('search', (msg, searchName) => {
        this.initView = false
        this.loading = true
        /*
        * 设置为空，因为当搜索完一次之后，下次点击搜索时，应该从loading开始，
        *   也就是说，原来查询出来的 users应该清空
        * */
        this.users = []
        this.errorMsg = ''

        // 发ajax请求进行搜索
        const url = `https://api.github.com/search/users?q=${searchName}`
        axios.get(url)
          .then(response => {
            //成功了，
            this.loading = false
            //使用map，因为数组的每一个元素中，都只取一部分
            this.users = response.data.items.map(item => ({
              url: item.html_url,
              avatarUrl: item.avatar_url,
              username: item.login
            }))
          })
          .catch(error => {
            this.loading = false
            this.errorMsg = '请求失败!'
          })
      })
    }
  }
</script>

<style>
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }
</style>
