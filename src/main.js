import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.min.css'
import '/public/css/reset.css'
import axios from './axios';
import MyHeader from "@/components/MyHeader";
import MyFooter from "@/components/MyFooter";
import MenuBar from "@/components/MenuBar";

Vue.config.productionTip = false

Vue.use(axios);//使用封装后的axios文件

//对象数组去重方法
Vue.prototype.unique=(arr)=>{
  const res = new Map();
  return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
}
Vue.use(Antd);
Vue.prototype.moment= moment;//挂载moment
//注册页头页脚,菜单栏按钮为全局组件
Vue.component("MyHeader",MyHeader);
Vue.component("MyFooter",MyFooter);
Vue.component("MenuBar",MenuBar);

// 路由导航守卫
router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth){
    if(store.state.isLogin){
      next();
    }else{
      next({
        path:'/login',
        query:{
          redirect:to.fullPath
        }
      });
    }
  }else{
    next();
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
