<template>
  <main class="song" :style="{height:innerHeight+'px'}">
    <div class="rollBack" @click="back">
      <a-icon type="rollback" style="font-size: 3rem;color: #ccc;"/>
    </div>
    <audio ref="audio" autoplay :src="playingSong.url"></audio>
    <a-row class="song-content" >
      <a-col :xs="24" :md="12" :xl="{span:10,offset:2}">
        <div class="album-img">
          <img :src="playingSong.album_art" alt="" :style="imgStyle">
        </div>
      </a-col>
      <a-col :xs="24" :md="12" :xl="10">
        <div class="song-info">
          <h1 class="songName" v-text="playingSong.sname"></h1>
          <p>
            <span class="songAlbum"><b>专辑&nbsp;&nbsp;:&nbsp;&nbsp;</b>{{playingSong.album_name}}</span>
            <span class="songSinger"><b>歌手&nbsp;&nbsp;:&nbsp;&nbsp;</b>{{playingSong.singerName}}</span>
          </p>
        </div>
        <div class="music-content-lrc" v-html="currentLyric">
        </div>
      </a-col>
    </a-row>
    <div class="song-btns">
      <a-row class="btns-wrap">
        <a-col :xs="24" :md="6" :xl="{span:4,offset:2}">
          <div class="btns-left">
            <a class="btn btn-prev" @click="switchSong(-1)" href="javascript:void(0)"></a>
            <a class="btn btn-play" :class="isPlay?'isPlay':''" @click="play" href="javascript:void(0)"></a>
            <a class="btn btn-next" @click="switchSong(1)" href="javascript:void(0)"></a>
          </div>
        </a-col>
        <a-col :xs="24" :md="18" :xl="16">
          <div class="btns-right">
            <div class="img-wrap">
              <img :src="playingSong.album_art" alt="">
            </div>
            <div class="progress">
              <div class="top">
                <span v-text="playingSong.sname"></span>
                <span class="times">{{cm}}/{{playingSong.duration}}</span>
              </div>
              <div class="bottom">
                <a-slider class="duration"
                          :tip-formatter="null"
                          v-model="range"
                          :min="0" :max="maxtime"
                          @change="drag"
                />
              </div>
            </div>
            <div class="playbar-silence">
              <i class="i-hover"></i>
              <a class="btn btn-volume" href="javascript:void(0)"></a>
              <a-slider vertical
                        class="volume"
                        :min="0" :max="10"
                        :default-value="30"
                        v-model="volume"
                        :tip-formatter="null"
                        @change="changeVolume"></a-slider>
            </div>
            <div class="drawer-content">
              <a-button @click="showDrawer" type="link" size="large">
                <a-icon style="font-size: x-large" type="menu-unfold" />
              </a-button>
              <a-drawer
                  :title="`播放队列/${songList.length}`"
                  placement="right"
                  :visible="visible"
                  :after-visible-change="afterVisibleChange"
                  @close="onClose"
                  width="30rem"
                  :mask="false"
                  getContainer="main"
                  :drawerStyle="{background:'#2f343b',fontSize:'0.85rem',
                  color:'#d3d3d3'
                  }"
              >
                
                <div class="songItem"
                     :class="{'active':index===i+1}"
                     v-for="(item,i) of this.songList"
                     :key="i"
                >
                  <a class="click_cut" href="javascript:void(0)" @click="cutSong(i+1)">
                    <span>{{i+1}}</span>
                    <span>{{item.sname}}</span>
                    <span>{{item.singerName}}</span>
                    <span>{{item.duration}}</span>
                    <span class="icon clear" @click="clear(i)"></span>
                  </a>
                </div>
              </a-drawer>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="blurBg" :style="{backgroundImage:`url(${playingSong.album_art})`}"></div>
  </main>
</template>
<script>
import { mapGetters,mapMutations,mapState } from 'vuex';
export default {
  name: "Song",
  data(){
    return {
      newIndex:this.$store.state.index,
      // songList:[],//歌曲列表
      singId:0,
      visible: false,
      audio:null,
      innerHeight:window.innerHeight,
      cm:0,//moment当前时间
      dm:0,//moment终止时间
      range:0,//进度条
      maxtime:0,//range进度条长度
      isPlay:false,//是否在播放
      maxVolume:0,
      volume:5,
      imgStyle:'',
      deg:0
    }
  },
  methods: {
    back(){
      /*返回上一级路由*/
      this.$router.go(-1);
    },
    play() {
      /*
      *暂停播放函数
      */
      if (this.audio.paused) {
        this.audio.play();
        this.isPlay = true;
      } else {
        this.audio.pause();
        this.isPlay = false;
      }
    },
    switchSong(i) {
      /*
      * 下一首函数
      * */
      setTimeout(()=>{
        if(this.index===this.songList.length &&i===1){//如果当前是最后一首，并且点击下一曲，回到第一首
          this.$store.commit('setIndexS',1)
        }else if(this.index===1 && i===-1){//如果当前是第一首，并且点击上一曲，跳转到最后一首
          this.$store.commit('setIndexS',this.songList.length);
        }else {
          this.$store.commit('setIndex',i);//加减index
        }
        this.range = 0;//重置进度条
        this.deg=0;//重置专辑旋转角度
        this.isPlay=true;
        this.audio.play();//调用播放函数
      },200)
    },
    drag() {
      /*
      * 拖拽进度条事件*/
      this.audio.currentTime = this.range;
    },
    changeVolume() {
      /*音量调整函数*/
      this.audio.volume = this.volume / 10;
    },
    cutSong(i) {
      /*点击列表切歌函数*/
      if(this.index!==i){
        this.$store.commit('setIndexS',parseInt(i));
        this.deg=0;//重置专辑旋转角度
      }
    },
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    //删除歌曲函数
    clear(i){
      this.$store.commit('delSong',i);
      this.songList.splice(i,1);
      if(this.songList.length===0){
        this.$router.push("/");
      }
    }
  },
  watch:{
    // newIndex(old){
    //   console.log('index发生了变化')
    // }
  },
  computed:{
    playingSong(){
      return this.songList[this.index-1];
    },
    currentLyric(){
      /*解析歌词*/
      let currentLyric=this.songList[this.index-1].lynic;
      let lines = currentLyric.split('\n');
      let str=``
      lines.forEach((item, i)=>{
        let content=item.split(/\s*\n*\[.*?\]\s*/).filter(v => !!v)
        content.forEach((item)=>{
          str+=`<p>${item}</p>`;
        })
      })
      return str;
    },
    ...mapState(["index","lyric",'songList']),
  },
  created() {
    //数组对象去重，使用提前封装号的unique函数
  },
  mounted() {
    this.audio=this.$refs.audio;
    window.addEventListener('resize',()=>{
      this.innerHeight=window.innerHeight;
    })
    this.isPlay=true;
    this.audio.addEventListener('timeupdate', ()=>{
      // 更新进度条
      this.maxtime = this.audio.duration;//歌曲时长
      this.range = this.audio.currentTime;
      // 更新时间文本
      let cm = this.moment(this.audio.currentTime*1000);
      this.cm = cm.format('mm:ss');
      if(this.audio.ended){ //判断音乐是否结束，结束播放下一曲
        this.switchSong(1);
      }
    });
    window.setInterval(()=>{
      if(this.isPlay){
        this.imgStyle={transform: `rotate(${this.deg+=0.2}deg)`}
      }
    },30)
  },
}
</script>

<style lang="scss">
main.song{
  background-color: rgba(44,50,59,0.5);
  .rollBack{
    cursor: pointer;
    position: absolute;
    top: 3rem;
    left: 1rem;
    z-index: 99999;
  }
  .song-content{
    .album-img{
      width: 16rem;
      margin: 0 auto;
      padding: 3rem 0;
      img{
        width: 100%;
        border-radius: 50%;
      }
    }
    .song-info{
      padding-bottom: 1rem;
      line-height: 2rem;
      .songName,.songAlbum,.songSinger{
        color: #fff;
      }
      .songName{
        font-size: 1.5rem;
      }
      .songSinger{
        padding-left: 5rem;
      }
      b{
        opacity: .6;
      }
    }
    .music-content-lrc{
      width: 23rem;
      overflow-y: auto;
      line-height: 2rem;
      height: 24rem;
      p{
        font-size: 0.99rem;
        color: #fff;
        opacity: 0.6;
      }
    }
    .music-content-lrc::-webkit-scrollbar{/*滚动条整体样式*/
      width: 0.8rem;
      background-color: rgba(0,0,0,0);
    }
    .music-content-lrc::-webkit-scrollbar-thumb{
      border-radius: 8px;
      background-color: rgba(255,255,255,0.2);
    }
  }
  .song-btns{
    position: fixed;
    width: 100%;
    height: 6rem;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.6);
    box-shadow: 0 -10px 20px #403f3f;
    .btn{
      display: inline-block;
      background-image: url("../assets/image/icon/btn.png");
      background-repeat: no-repeat;
      cursor: pointer;
    }
    .btns-wrap{
      padding: 0 1rem;
      .btns-left{
        margin: 0 auto;
        width: 10rem;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .btn-prev,.btn-next{
          width: 2.25rem;
          height: 2.25rem;
          background-position: 0 -143px;
        }
        .btn-next{
          background-position: -9rem -8.9rem;
        }
        .btn-play{
          width: 3.75rem;
          height: 3.75rem;
        }
        .isPlay{
          background-position: 0 -3.75rem;
        }
        .noPlay{
          background-position: -3.75rem 0;
        }

      }
      .btns-right{
        height: 5rem;
        display: flex;
        justify-content: start;
        align-items: center;
        .img-wrap{
          img{
            height: 3.75rem;
            border: 1px solid #cccccc;
          }
        }
        .progress{
          padding-left: 2rem;
          height: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          color: #fff;
          .top{
            padding: 0 0.3rem;
            color: #c4c3c3;
            font-size: 0.7rem;
          }
          .times{
            float: right;
          }
          .duration{
            width: 25rem;
          }
        }
        .playbar-silence{
          padding-left: 7rem;
          position: relative;
          width: 20rem;
          display: flex;
          justify-content: start;
          .btn-volume{
            width: 1rem;height: 1rem;
            background-position: -64px -195px;
            z-index: 999;
          }
          .btn-volume:hover{
            background-position: -80px -195px;
          }
          .i-hover{
            cursor: pointer;
            z-index: 99;
            position: absolute;
            width: 1.5rem;
            height: 3rem;
            top: -2rem;
          }
          .volume{
            z-index: 99;
            width: 2rem;
            height: 5rem;
            position: absolute;
            left:6.5rem;
            top: -7.4rem;
            display: none;
          }
          .btn-volume:hover+.volume,.i-hover:hover~.volume{
            display: block;
          }
          .volume:hover{
            display: block;
          }
        }
      }
    }
  }
  .ant-drawer-header{
    background: #e3e3e3;
  }
  .ant-drawer-body{
    padding:0.6rem ;
  }
  .songItem{
    z-index: 99;
    padding: 0 0.5rem;
    line-height: 2.43rem;
    border-bottom: 1px solid #42484e;
    cursor: pointer;
    .click_cut{
      width: 100%;
      height: 2.43rem;
      color: #d3d3d3;
      display: flex;
      .clear{
        margin: 0.8rem 0 0 2rem;
        display: inline-block;
        width: 1rem;height: 1rem;
        background-image: url("../assets/image/icon/btn.png");
        background-repeat: no-repeat;
        background-position: -240px -64px;
      }
      .clear:hover{
        background-position: -256px -64px;
      }
    }
    span{
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span:first-child{
      flex: 0 0 10%;
    }
    span:nth-child(2){
      flex: 0 0 30%;
    }
    span:nth-child(3){
      flex: 0 0 35%;
    }
  }
  .songItem:hover{
    background: #40444b;
  }
  .songItem.active{
    background: #40444b;
    color: #19b5f0;
    a{
      color: #19b5f0;
    }
  }
  .blurBg{
    z-index: -999;
    position: absolute;
    top: 0;right: 0;bottom: 0;left: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: .6;
    filter: blur(50px);
  }
}
body{
  overflow-x: hidden;
}
main{
  padding-top:2rem;
}
@media screen and (max-width: 767.999px){
  .music-content-lrc{
    display: none;
  }
}
</style>
