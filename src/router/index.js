import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import PlayList from "../views/PlayList";
//路由懒加载
const User=()=>import('@/views/User')
const Song=()=>import('@/views/Song')
const MyMusic=()=>import('@/views/MyMusic')
const Login=()=>import('@/views/Login')
import test from "@/views/test";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/test',
    component: test
  },
  {
    path: '/song',
    name: 'Song',
    component: Song
  },
  {
    path:'/playlist/:albumId',
    name:'PlayList',
    component: PlayList,
    props:true
  },
  {
    path: '/myMusic',
    name:'MyMusic',
    component: MyMusic,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/login',
    name:'Login',
    component: Login,
  }
]

const router = new VueRouter({
  routes
})

export default router
