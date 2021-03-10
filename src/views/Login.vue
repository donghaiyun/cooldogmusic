<template>
  <div class="login-content" :style="{height:innerHeight+'px'}">
    <a-row>
      <a-col :xs="0" :md="{span:12}" :xl="{span:10,offset: 2}">
        <div class="img-wrap">
          <img src="../assets/image/icon/Snoopy.jpg" alt="">
        </div>
      </a-col>
      <a-col :xs="24" :md="{span:12}" :xl="{span:10}">
        <div class="login-wrap">
          <h1>登录酷狗音乐</h1>
          <h2>
            查看并管理你的收藏的音乐<br><br>
            方便地随时随地收听
          </h2>
          <button class="btn-log" @click="login">立即登录</button>
        </div>
      </a-col>
    </a-row>
<!--    <my-footer></my-footer>-->
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      innerHeight:window.innerHeight
    }
  },
  methods:{
    login(){
      this.$store.commit('setIsOpenLogin',true);
    }
  }
}
</script>

<style lang="scss">
.login-content{
  color: #777777;
  .img-wrap>img{
    max-width: 100%;
    height: auto;
  }
  .login-wrap{
    height: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem 1rem;
    h1{
      font-size: 2.3rem;
    }
    h2{
      font-size: 1rem;
      margin-top: 1rem;
      line-height: 0.8rem;
    }
    .btn-log{
      width: 10rem;
      height: 2.5rem;
      background: #009af3;
      color: #fff;
      outline: none;
      border: 0;
      border-radius: 0.3rem;
      margin-top: 2rem;
    }
  }
}
</style>
