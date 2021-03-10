import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cid:0,
    searchKws:"",
    isOpenLogin:false,  //控制登录窗口是否打开
    username:localStorage.getItem('user')?
      localStorage.getItem('user'):'',
    isLogin:localStorage.getItem('user')?true:false,
    lyric:'',//歌词对象
    songList:localStorage.getItem('songList')?
        JSON.parse(localStorage.getItem('songList')):[] ,//从localStorage获取歌曲列表
    index:1,//正在播放的歌曲
  },
  //修改状态值
  mutations: {
    setUsername(state,username){
      state.username=username;
    },
    setIsLogin(state,isLogin){
      state.isLogin=isLogin;
    },
    cityAlert:(state,cid)=>{
      state.cid=cid;
      localStorage.setItem('cid',cid);
    },
    search(state,searchKws){
      state.searchKws=searchKws;
    },
    setIsOpenLogin(state,isOpen){
      state.isOpenLogin=isOpen;
    },
    //向state和localStorage存入歌曲列表
    setSongList(state,string){
      //将歌曲字符串转为obj对象
      let songObj=JSON.parse(string);
      //从localStorage取出数据
      let list=localStorage.getItem('songList')?
        JSON.parse(localStorage.getItem('songList')):[];
      let length=list.length;
      //将歌曲obj插入到目前播放的下一首
      list.splice(state.index,0,songObj);
      //数组对象去重！！
      //声明对象数组去重方法
      let unique=function(){
        const res = new Map();
        return list.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
      }
      let newList=unique(list); //去重
      state.songList=newList;
      setTimeout(()=>{
        if(length!==newList.length){
          //如果去重后长度发生变化，说明有新增歌曲，将index+1
          localStorage.setItem('songList',JSON.stringify(newList)); //存入数据
          state.lyric=newList[state.index].lynic;
          if(state.index!==1){ //第一次插入歌曲时不执行index自增操作
            state.index++;
          }
        }else{
          //如果去重后数组长度不变，查询出传入歌曲obj的下标，将此下标+1后更新到index，以达到切换歌曲目的。
          let currentIndex = (newList|| []).findIndex((profile) => profile.song_id === songObj .song_id);
          // let  currentIndex = newList.map(item => item.song_id).indexOf(songObj.song_id);
          currentIndex++;
          state.index=currentIndex;
        }
      },200)

    },
    delSong(state,i){
      let list=localStorage.getItem('songList')?
        JSON.parse(localStorage.getItem('songList')):[];
      list.splice(i,1);
      localStorage.setItem('songList',JSON.stringify(list)); //存入数据
      state.songList=list;
    },

    //修改index方法
    setIndex(state,i){
      state.index= state.index+=i;
    },
    setIndexS(state,i){
      state.index= i;
    }
  },
  getters:{
  },
  actions: {
  },
  modules: {
  }
})
