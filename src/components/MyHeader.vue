<template>
  <div :class="router==='/song'?'hidden':''">
    <div v-show="this.$store.state.isOpenLogin" class="popContainer">
      <div class="login">
        <span class="login_close" @click="login_close()">×</span>
        <div class="login_text">
          <!-- 登录窗口 -->
          <a-form id="components-form-demo-normal-login"
                  :form="form" class="login-form"
                  @submit="loginSubmit"
                  v-if="loginWin">
            <h4>登录酷狗音乐</h4>
            <a-form-item>
              <a-input
                  v-decorator="[ 'logPhone', {rules: [{validator: validatorUser}]}]"
                  placeholder="请输入手机号">
                <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                  v-decorator="['logPassword', {rules: [{validator: validatorPass}]}]"
                  type="password"
                  placeholder="请输入密码">
                <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-checkbox
                  v-decorator="['remember',{valuePropName: 'checked',initialValue: true,}]">
                记住我
              </a-checkbox>
              <a class="login-form-forgot" href="javascript:alert('未开通此功能')"> 忘记密码 </a>
              <a-button type="primary" html-type="submit" class="login-form-button">登录</a-button>
              <a @click="isLoginWin()"> 新用户注册 </a>
            </a-form-item>
          </a-form>
          <!-- 注册窗口 -->
          <a-form id="components-form-demo-normal-login" class="login-form"
                  @submit="registerSubmit" :form="form"
                  v-else>
            <h4>注册用户</h4>
            <a-form-item>
              <a-input
                  v-decorator="[ 'regPhone', {rules: [{validator: validatorUser}]}]"
                  placeholder="请输入手机号">
                <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                  v-decorator="['regPassword', {rules: [{validator: validatorPass}]}]"
                  type="password"
                  placeholder="请输入密码">
                <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                  type="password"
                  v-decorator="[ 'regPasswordRel', {rules: [{validator: validatorNick}]}]"
                  placeholder="请重新输入密码">
                <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" class="login-form-button">注册</a-button>
              <a @click="isRegisterWin()"> 登录</a>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
    <header>
      <a-row type="flex" :gutter="20" class="top_wrap">
        <a-col :xs="18" :md="{ span: 10 }" :xl="{ span: 10, offset: 2 }">
          <router-link class="logo" to="/"></router-link>
          <a-input-search
              class="search"
              placeholder="热门音乐"
              :style="{width: '60%'}"
          />
        </a-col>
        <a-col :xs="0" :md="{ span: 10 }" :xl="{ span: 7 }">
          <ul class="serve_wrap">
            <li><a href="javascript:void(0)">客服中心</a></li>
            <li><a href="javascript:void(0)">招贤纳士</a></li>
            <li><a href="javascript:void(0)">会员中心</a></li>
            <li><a href="javascript:void(0)">商务合作</a></li>
          </ul>
        </a-col>
        <a-col :xs="6" :md="{ span: 4 }" :xl="{ span: 4 }">
          <div class="nav-right">
            <a-button
                v-if="!this.$store.state.isLogin"
                type="primary"
                style="{width: '3rem'}"
                @click="login_open()"
            >
              登录
            </a-button>
            <a-popover v-else placement="bottom">
              <template slot="content">
                <div>
                  <a
                      href="http://localhost:8080/#/user"
                      style="
                    display: block;
                    width: 4.5rem;
                    height: 2rem;
                    color: #777777;
                  "
                  >
                    <a-icon type="setting"/>
                    <span>个人账号</span>
                  </a>
                  <a
                      style="
                    display: block;
                    width: 4.5rem;
                    height: 2rem;
                    color: #777777;
                  "
                      @click="quit"
                  >
                    <a-icon type="poweroff"/>
                    <span>退出登录</span>
                  </a>
                </div>
              </template>
              <div class="avatar">
                <router-link to="/user">
                  <div>
                    <img src="../assets/image/icon/20100101192931478054.jpg"/>
                  </div>
                </router-link>
                <span class="xs-hidden">{{ this.$store.state.username }}</span>
              </div>
            </a-popover>
            <menu-bar></menu-bar>
          </div>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" class="nav_wrap">
        <a-col :xs="24" :md="{ span: 10 }" :xl="{ span: 10, offset: 2 }">
          <div class="nav_left">
            <div class="nav_left_one">
              <router-link class="option" to="/" :class="router==='/'?'active':''"><p>首页</p></router-link>
            </div>
            <div class="nav_left_one">
              <router-link to="/myMusic" :class="router==='/myMusic'?'active':''"><p>我的音乐</p></router-link>
            </div>
            <div class="nav_left_one">
              <router-link to="/"><p>下载客户端</p></router-link>
            </div>
            <div class="nav_left_one">
              <router-link to="/" :class="showMore?'active':''">
                <p>更多</p>
                <i class="arrow"></i>
              </router-link>
              <ul class="more-menu"
                  @mouseenter="showMore=true"
                  @mouseleave="showMore=false"
              >
                <li><a href="javascript:void(0)">电台</a></li>
                <li><a href="javascript:void(0)">MV</a></li>
                <li><a href="javascript:void(0)">歌单</a></li>
                <li><a href="javascript:void(0)">歌手</a></li>
              </ul>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :md="{ span: 14 }" :xl="{ span: 12 }">
          <div class="nav_right">
            <ul>
              <li><a class="icon_nav1" href="javascript:void (0)">直播</a></li>
              <li><a class="icon_nav2" href="javascript:void (0)">商城</a></li>
              <li>
                <a class="icon_nav3" href="javascript:void (0)">音乐人</a>
              </li>
              <li>
                <a class="icon_nav4" href="javascript:void (0)">代理商</a>
              </li>
              <li>
                <a class="icon_nav5" href="javascript:void (0)">主播电台</a>
              </li>
            </ul>
          </div>
        </a-col>
      </a-row>
    </header>
  </div>
</template>

<script>
export default {
  name: "MyHeader",
  beforeCreate() {
    this.form = this.$form.createForm(this, {name: "normal_login"});
  },
  data() {
    return {
      router: '/',//路由地址
      loginWin: true,
      showMore: false //控制更多按钮样式
    }
  },
  watch: {
    '$route'(to) {
      /*监视路由跳转*/
      this.router = to.path;
    }
  },
  methods: {
    quit() {
      /*退出登录*/
      this.$store.commit('setIsLogin', false);
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      this.$router.push('/');
    },
    login_open() {
      this.$store.commit('setIsOpenLogin', true);
    },
    login_close() {
      this.$store.commit('setIsOpenLogin', false);
      this.loginWin = true;
    },
    isLoginWin() {
      this.loginWin = false;
    },
    isRegisterWin() {
      this.loginWin = true;
    },
    validatorUser(rules, value, callback) {
      if (!value) {
        callback(new Error('请输入手机号!'))
      } else {
        if (!/^1[3-9]\d{9}$/.test(value)) {
          callback(new Error('手机号格式不正确'))
        } else {
          callback()
        }
      }
    },
    validatorPass(rules, value, callback) {
      if (!value) {
        callback(new Error('请输入密码!'))
      } else {
        if (!/^[0-9a-zA-Z]{6,15}$/.test(value)) {
          callback(new Error('密码格式不正确!(6~15位字母或数字)'))
        } else {
          callback()
        }
      }
    },
    validatorNick(rules, value, callback) {
      if (!value) {
        callback(new Error('请重新输入密码'))
      } else {
        if (!/^[0-9a-zA-Z]{6,15}$/.test(value)) {
          callback(new Error('密码格式不正确!(6~15位字母或数字)'))
        } else {
          callback()
        }
      }
    },
    loginSubmit(e) {//登录判定
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.axios.post('/user/login', {
            phone: values.logPhone,
            password: values.logPassword,
          }).then(result => {
            let results = result.data;
            if (results.code === 200) {
              this.$message.success('登录成功！', 2)
              this.$store.commit('setIsOpenLogin', false);
              this.$store.commit('setIsLogin', true);
              this.$store.commit('setUsername', results.result.username);
              this.$router.push(this.$route.query.redirect || '/');
            } else if (results.code === 401) {
              this.$message.error('用户名或密码错误！');
            }
          })
        }
      });
    },
    registerSubmit(e) {//注册判定
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          let regPhone = values.regPhone;
          let regPassword = values.regPassword;
          let regPasswordRel = values.regPasswordRel;
          if (regPassword === regPasswordRel) {
            console.log(values.regPhone, values.regPassword)
            this.axios.post('/user/register', {
              phone: regPhone,
              password: regPassword
            }).then(result => {
              let results = result.data;
              if (results.code === 200) {
                this.$message.success('注册成功！', 2)
                this.login = true;
                this.loginWin = true;
              } else if (results.code === 401) {
                this.$message.error('注册失败，用户名已存在!', 4);
              } else if (results.code === 403) {
                this.$message.error('注册失败，请重新尝试或联系管理员!', 4);
              }
            });
          } else {
            this.$message.error('两次输入密码不一致！', 4);
          }
        }
      });
    },
  },
};
</script>
<style lang="scss">
.popContainer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;

  .login {
    width: 440px;
    height: 378px;
    position: fixed;
    display: block;
    z-index: 101;
    background-color: rgb(255, 255, 255);
    top: 50%;
    left: 50%;
    margin-left: -220px;
    margin-top: -189px;
    color: #000;
    text-align: center;

    .login_close {
      position: absolute;
      top: -38px;
      left: 418px;
      cursor: pointer;
      font-size: 36px;
      color: #999;
    }

    .login_close:hover {
      color: #fff;
    }

    .login_text {
      margin: 0 20px;
      text-align: left;
    }

    .login_text h4 {
      font-size: 20px;
      color: #333;
      text-align: center;
      line-height: 1;
      padding-top: 50px;
      padding-bottom: 30px;
      font-weight: normal;
    }

    #components-form-demo-normal-login .login-form {
      max-width: 300px;
    }

    #components-form-demo-normal-login .login-form-forgot {
      float: right;
    }

    #components-form-demo-normal-login .login-form-button {
      width: 100%;
    }
  }
}

header {
  font-size: 0.8rem;

  a {
    color: #777777;
  }

  a:focus {
    outline: none;
  }

  white-space: nowrap;

  .top_wrap {
    height: 4.5rem;
    padding: 0 1rem;

    .ant-col {
      display: flex;
      justify-content: start;
      align-items: center;
    }

    .logo {
      display: inline-block;
      width: 160px;
      height: 37px;
      background: url("../assets/image/icon/logo.png") no-repeat;
    }

    .spea {
      width: 1px;
      height: 2rem;
      background: #7777;
    }

    ul {
      display: flex;
      width: 100%;
      justify-content: start;

      li {
        padding-left: 2rem;
      }
    }

    .nav-right {
      float: right;
      width: 8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      height: 2rem;
      padding-left: 5%;

      img {
        margin-right: 1rem;
        width: 2rem;
        border-radius: 50%;
      }
    }
  }

  .nav_wrap {
    background-color: #2c323b;
    height: 3.2rem;
    line-height: 3.2rem;

    a {
      color: #ddd;
    }

    .nav_left {
      font-size: 1rem;
      //padding: 0 1rem;

      a:not(:first-child) {
        padding-left: 4rem;
      }
    }

    .nav_left_one {
      width: 20%;
      height: 50px;
      float: left;
      position: relative;

      .arrow {
        transition: all .2s linear;
        margin: 0.1rem 0 0 0.5rem;
        width: 0.7rem;
        height: 0.36rem;
        background-image: url("../assets/image/icon/arrowMored.png");
      }

      .active > .arrow {
        //background-image: url("../assets/image/icon/arrowMoreu.png");
        transform: rotate(-180deg);
      }
    }

    .nav_left_one:hover .arrow {
      transform: rotate(-180deg);
    }

    .nav_left_one > a:hover + .more-menu {
      display: block;
    }

    .nav_left_one > ul:hover {
      display: block;
    }

    .nav_left_one > ul {
      z-index: 100;
      display: none;
      background-color: #2c323b;
      position: absolute;
      left: 0;
      width: 100%;
      text-align: center;
      line-height: 2.2rem;

      li {
        cursor: pointer;
      }

      li:hover {
        background-color: #363C52;
      }

      li:hover > a {
        color: #fff;
      }
    }

    .nav_left_one > a {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .nav_left_one > a:hover {
      background-color: #0c8ed9;
      color: #fff;
    }

    .nav_left_one > a.active {
      background-color: #0c8ed9;
      color: #fff;
    }

    .nav_right {
      background-color: #2c323b;

      ul {
        display: flex;
        justify-content: start;
        padding: 0 1rem;

        li > a {
          height: 1rem;
          line-height: 1rem;
          padding: 0 1.2rem;
          background-image: url("../assets/image/icon/sprite.png");
          background-repeat: no-repeat;
        }

        li > a:hover {
          color: #009af3;
        }

        .icon_nav1 {
          background-position: 0 -121px;
        }

        .icon_nav2 {
          background-position: 0 -283px;
        }

        .icon_nav3 {
          background-position: 0 -193px;
        }

        .icon_nav4 {
          background-image: url("../assets/image/icon/icon_05.png");
          background-position: 0 4px;
        }

        .icon_nav5 {
          background-position: 0 -1309px;
        }
      }
    }
  }
}

@media screen and (max-width: 767.999px) {
  .ant-col-xs-0 {
    display: none !important;
  }
  .xs-hidden {
    display: none !important;
  }
  .search {
    width: 10rem !important;
    margin-left: 1rem;
  }
  .nav_wrap {
    display: none;
  }
}

@media screen and (min-width: 768px) and (max-width: 1199.99px) {
  header .top_wrap .logo {
    width: 11.625rem !important;
  }
  .nav-right {
    margin-left: 2rem;
  }
}

@media screen and (min-width: 1200px) {
  header .top_wrap .logo {
    width: 18.75rem !important;
  }
  .nav-right {
    margin-left: 2rem;
  }
}
</style>
