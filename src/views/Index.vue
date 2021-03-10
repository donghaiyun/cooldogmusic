<template>
  <div>
    <my-carousel></my-carousel>
    <main class="main">
      <!--精选歌单、热门榜单部分-->
      <a-row :gutter="32" class="album-content">
        <a-col :xs="24" :md="24" :xl="{span:14,offset:2}">
          <div class="title">
            <h1><span>精选</span>专辑</h1>
            <a href="#">更多</a>
          </div>
          <div class="content-front">
            <a-row class="album-wrap" :gutter="[5,5]">
              <a-col :xs="24" :md="12" :xl="12" class="first_album">
                <router-link :to="`/playlist/${firstAlbum.id}`">
                  <div class="album-img-wrap">
                    <img :src="firstAlbum.album_art" alt="">
                    <div class="below-wrap">
                      <p class="title" v-text="firstAlbum.album_name"></p>
                      <p class="author" v-text="firstAlbum.name"></p>
                    </div>
                    <div class="mask"><i class="icon-play"></i></div>
                  </div>
                </router-link>
              </a-col>
              <a-col :xs="24" :md="12" :xl="12">
                <a-row class="album-wraps-mid" :gutter="[5,5]">
                  <a-col :span="6" v-for="(item,index) of othersAlbum" :key="index">
                    <router-link :to="`/playlist/${item.id}`">
                      <div class="album-img-wrap">
                        <div class="img-wrap"><img :src="item.album_art" alt=""></div>
                        <div class="below-wrap">
                          <p class="title" v-text="item.album_name"></p>
                          <p class="author" v-text="item.name"></p>
                        </div>
                        <div class="mask"><i class="icon-play"></i></div>
                      </div>
                    </router-link>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </div>
        </a-col>
        <a-col :xs="24" :md="24" :xl="6">
          <div class="title">
            <h1><span>热门</span>榜单</h1>
            <a href="#">更多</a>
          </div>
          <div class="ranking-list">
            <div class="ranking-list-item" v-for="(item,index) of rankingList" :key="index">
              <div class="img-wrap"><img :src="item.src" alt=""></div>
              <dl class="ranking-wrap">
                <dt class="ranking-title">{{item.title}}</dt>
                <dd class="ranking-item" v-for="(song,index) of item.songs" :key="index">
                  {{`${index+1} . ${song.singer}-${song.name}`}}
                </dd>
              </dl>
            </div>
          </div>
        </a-col>
      </a-row>

      <!--热门歌曲及mv部分-->
      <a-row :gutter="32" class="radio-content newSang-content">
        <a-col :xs="24" :md="24" :xl="{span:14,offset:2}">
          <div class="title">
            <h1><span>热门</span>歌曲</h1>
          </div>
          <ul class="hitSong">
            <li v-for="(val,key) of areaObj" :key="key">
              <a :class="areaActive===key?'active':''"
                 @mouseenter="switchArea(key)"
                 href="javascript:void(0)">{{val}}
              </a>
            </li>
          </ul>
          <div class="newSang-wrap">
            <ul class="newSang-list">
              <li v-for="(item,index) of pagination.pagSongsArr"
                  :key="index"
                  @click="hitSongJump(item,item.song_id)">
                <span class="songName">{{ item.singerName }} - {{ item.sname }}</span>
                <span class="songTime">{{ item.duration }}</span>
                <span class="icon playBtn"></span>
                <span class="icon downLoadBtn"></span>
              </li>
            </ul>
          </div>
          <div class="btn-wrap">
            <a class="arrow left" href="javascript:void(0)" @click="switchPage(-1, pagination.pageNum)"></a>
            <span>{{ pageActive }}/{{ pagination.pageNum }}</span>
            <a class="arrow right" href="javascript:void(0)" @click="switchPage(1, pagination.pageNum)"></a>
          </div>
        </a-col>
        <a-col :xs="24" :md="24" :xl="6">
          <div class="title">
            <h1><span>推荐</span>mv</h1>
          </div>
          <a-row :gutter="[12,12]" class="video-wrap">
            <a-col span="24">
              <div class="img-wrap">
                <img src="../assets/image/video/20210219105828583902.jpg" alt="">
              </div>
            </a-col>
            <a-col span="12" v-for="i of 2">
              <img src="../assets/image/video/20210219105828583902.jpg" alt="">
            </a-col>
          </a-row>
        </a-col>
      </a-row>

      <!--热门电台、热门歌手部分-->
      <a-row :gutter="32" class="radio-content">
        <a-col :xs="24" :md="24" :xl="{span:14,offset:2}">
          <div class="title">
            <h1><span>热门</span>电台</h1>
            <a href="#">更多</a>
          </div>
          <a-row :gutter="[16,24]" class="radio-station-content">
            <a-col class="radio-station-item" :xs="12" :md="6" v-for="(item,index) of audio" :key="index">
              <div class="station-wrap">
                <router-link :to="item.href">
                  <div class="img-wrap">
                    <img :src="item.src" alt="">
                  </div>
                  <h2 class="station_name" v-text="item.title"></h2>
                </router-link>
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :xs="24" :md="24" :xl="6">
          <div class="title">
            <h1><span>热门</span>歌手</h1>
            <ul>
              <li><a href="#">华语</a></li>
              <li><a href="#">欧美</a></li>
              <li><a href="#">日韩</a></li>
              <li><a href="#">更多</a></li>
            </ul>
          </div>
          <a-row class="singers-content" :gutter="[5,5]">
            <a-col span="12" v-for="i of 2">
              <router-link to="/song">
                <div class="singer-wrap">
                  <div class="img-wrap">
                    <img src="../assets/image/singer/20180515002522714.jpg" alt="">
                  </div>
                  <p class="singerName">周杰伦</p>
                </div>
              </router-link>
            </a-col>
            <a-col span="8" v-for="i of 3" :key="i">
              <router-link to="#">
                <div class="singer-wrap">
                  <div class="img-wrap">
                    <img src="../assets/image/singer/20180515002522714.jpg" alt="">
                  </div>
                  <p class="singerName">周杰伦</p>
                </div>
              </router-link>
            </a-col>
          </a-row>
          <ul class="subMenu">
            <li v-for="i of 3"></li>
          </ul>
        </a-col>
      </a-row>
    </main>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyCarousel from "@/components/index/Carousel";
export default {
name: "Index",
  components: {MyCarousel},
  data(){
    return {
      firstAlbum: {},//首页第一张专辑对象
      othersAlbum:[],//首页剩余4张专辑数组
      hitSongs:{//按地区分类存放歌曲
        china:[],//中国
        japan:[],//日本
        korea:[],//韩国
        occident:[],//欧美
        others:[]//其他
      },
      areaObj:{china:'华语',occident:'欧美',korea:'韩国',japan:'日本'},//area对象,用于循环生成a标签
      areaActive:'china',//目前选中的热门歌曲地区,默认中国
      pageActive:1,//当前选中的页数
      rankingList:[
        {
          title:'酷狗飙升榜',
          src:require('../assets/image/icon/kg_up.jpg'),
          songs:[//排行榜列表
            {
              name:'告白气球',
              singer:'周杰伦'
            },
            {
              name:'烟花易冷',
              singer: '周杰伦'
            }
          ]
        },
        {
          title:'酷狗TOP500',
          src:require('../assets/image/icon/kg_top500.jpg'),
          songs:[
            {
              name:'告白气球',
              singer:'周杰伦'
            },
            {
              name:'烟花易冷',
              singer: '周杰伦'
            }
          ]
        },
        {
          title:'酷狗红歌榜',
          src:require('../assets/image/icon/kg_popular.jpg'),
          songs:[
            {
              name:'告白气球',
              singer:'周杰伦'
            },
            {
              name:'烟花易冷',
              singer: '周杰伦'
            }
          ]
        }
      ],
      audio:[
        {
          title:'酷狗热歌',
          src:require('../assets/image/icon/radio_3.jpg'),
          href:'#'
        },
        {
          title:'网络红歌',
          src:require('../assets/image/icon/radio_4.jpg'),
          href:'#'
        },
        {
          title:'经典',
          src:require('../assets/image/icon/radio_5.jpg'),
          href:'#'
        },
        {
          title:'老情歌',
          src:require('../assets/image/icon/radio_6.jpg'),
          href:'#'
        },
        {
          title:'新歌',
          src:require('../assets/image/icon/radio_7.jpg'),
          href:'#'
        },
        {
          title:'动漫',
          src:require('../assets/image/icon/radio_8.jpg'),
          href:'#'
        },
        {
          title:'轻音乐',
          src:require('../assets/image/icon/radio_9.jpg'),
          href:'#'
        },
        {
          title:'最爱成名曲',
          src:require('../assets/image/icon/radio_10.jpg'),
          href:'#'
        }
      ]
    }
  },
  methods:{
    switchArea(area){
      /*
      *切换热门歌曲地区函数
      */
      this.pageActive=1;//重置当前选中的页数
      this.areaActive=area.toString();
    },
    switchPage(i,allpage){
      /*
      *切换页数函数
      */
      if(!(i===1&&this.pageActive===allpage)||(i===-1&&this.pageActive===1)){
        this.pageActive+=i;
      }
    },
    hitSongJump(item){
      /*
      * 热门歌曲跳转，将数据存入vuex
      * */
      this.$store.commit('setSongList',JSON.stringify(item));
      //使用params传参，路由需要配置name
      setTimeout(()=>{
        this.$router.push("/song")
      },800);
    }
  },
  computed:{
    pagination(){
      //热门歌曲分页
      let songsArr=this.hitSongs[this.areaActive];//歌曲数组
      let pageSize=8;//每页显示歌曲数量
      let pageNum=Math.ceil(songsArr.length/pageSize);//页数
      let start=(this.pageActive-1)*8 //截取数组的起始位置
      let pagSongsArr=songsArr.slice(start,start+pageSize);//当前选中页面展示的歌曲
      return {
        pageSize:pageSize,
        pageNum:pageNum,
        pagSongsArr:pagSongsArr
      }
    }
  },
  mounted() {
    //axios-查询首页专辑
    this.axios.get("/index/search_album").then(result=>{
      let results=result.data.results;
      results.forEach((item)=>{
        item.album_art=require(`../assets/image/album_art/${item.album_art}`)
      });
      [this.firstAlbum,...this.othersAlbum]=results;
    });

    //axios-查询热门歌曲
    this.axios.get("/index/search_hitSong").then(result=>{
      let results=result.data.results;
      // console.log(results)
      results.forEach((item)=>{
        //使用moment格式化时间
        item.duration=this.moment(item.duration*1000).format('mm:ss');
        //require图片和音乐路径
        item.album_art=require(`../assets/image/album_art/${item.album_art}`);
        item.url=require(`../assets/songs/${item.url}`);
        //删除冗余数据
        delete item.songer_id;
        delete item.area_id;
        delete item.album_id;
        switch (item.area){
          case 'china':
            this.hitSongs.china.push(item);
            break
          case 'japan':
            this.hitSongs.japan.push(item);
            break
          case 'korea':
            this.hitSongs.korea.push(item);
            break
          case 'occident':
            this.hitSongs.occident.push(item);
            break
          default:
            this.hitSongs.others.push(item);
        }
      })
    });
  }
}
</script>

<style lang="scss">
main{
  padding: 0 1rem;
  .album-content{
    line-height: 2rem;
    font-size: 2rem;
    img{
      width: 100%;
    }
    .title{
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
      h1,a{
        color: #999;
      }
      h1>span{
        color: #009af3;
      }
      a{
        font-size: 0.9rem;
      }
    }
    .content-front{
      .album-img-wrap{
        position:relative;
        .below-wrap{
          padding-left: 0.5rem;
          position: absolute;
          width: 100%;
          height: 3rem;
          line-height: 1.5rem;
          bottom: 0;
          background-color: rgba(0,0,0,.5);
          color: #fff;
          font-weight: normal;
          font-size: 0.9rem;
          .title{
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .author{
            color:#cfcfcf
          }
        }
        .mask{
          display: none;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: rgba(0,0,0,0.25);
          .icon-play{
            position: absolute;
            right: 0.5rem;
            bottom: 0.3rem;
            display: block;
            width: 2.3rem;
            height: 2.3rem;
            background-image: url("../assets/image/icon/sprite.png");
            background-repeat: no-repeat;
            background-position:0 -401px;
          }
          .icon-play:hover{
            background-position:0 -360px;
          }
        }
      }
      .album-img-wrap:hover .mask{
        display: block;
      }
    }
    .ranking-list{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .ranking-list-item{
        display: flex;
        background-color: #f6f6f6;
        margin-bottom: 0.8rem;
        .img-wrap{
          flex: 0 1 38%;
          font-size: 0;
          img{
            width: 100%;
          }
        }
        .ranking-wrap{
          font-size: 0.9rem;
          flex: 0 1 52%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-left: 1rem;
          .ranking-title{
            font-weight: bold;
            color:#333;
          }
          .ranking-item{
            font-weight: 400;
            color: #555;
            white-space: nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
          }
        }
      }
    }
  }
  .album-wrap{
    img{
      width: 100%;
    }
    .album-wraps-mid{
      >div{
        width: 50%;
        float: left;
      }
    }
  }
  .newSang-content{
    .title{
      display: inline-block !important;
      a.active{
        color:#009af3;
      }
    }
    .hitSong{
      display: inline-block;
      li{
        margin-left: 2rem;
        float: left;
        font-size: 0.9rem;
        a{
          color: #000000;
        }
        a.active{
          color: #009af3;
        }
      }
    }
    .newSang-wrap{
      height: 18rem;
      ul.newSang-list{
        padding: 0 0.7rem;
        li{
          height: 2rem;
          line-height: 2rem;
          span{
            color: #333;
            font-size: 0.9rem;
          }
          .songTime{
            float: right;
          }
        }
        li:hover{
          background-color: #f5f8fb;
          cursor: pointer;
        }
        li:hover span{
          color: #009af3;
        }
      }
    }
    .btn-wrap{
      font-size: 0.8rem;
      margin-left:45%;
      height: 1rem;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      .arrow{
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        border-top: 0.12rem solid #555;
        border-right: 0.12rem solid #555;
        box-shadow: 0 0 0 lightgray;
      }
      .arrow.left {
        transform: translate3d(0, -50%, 0) rotate(-135deg);
      }
      .arrow.right {
        transform: translate3d(0, -50%, 0) rotate(45deg);
      }
      span{
        padding: 0 1rem 0.5rem 1rem;
      }
    }
    .video-wrap{
      img{
        width: 100%;
      }
    }
  }
  .radio-content{
    .title{
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
      font-size: 2rem;
      font-weight: 300;
      h1,a{
        color: #999;
      }
      a{
        font-size: 0.9rem;
      }
      h1>span{
        color: #009af3;
      }
      ul{
        display: flex;
        flex-basis: 50%;
        justify-content: space-around;
        align-items: center;
        li{
          a{
            font-size: 0.8rem;
            color:#000;
            font-weight: normal;
          }
        }
      }
    }
    .radio-station-content{
      .station-wrap>a{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        img{
          width: 6rem;
        }
        .station_name{
          padding-top: 0.5rem;
        }
      }
    }
    .singers-content{
      .singer-wrap{
        position: relative;
        img{
          width: 100%;
        }
        .singerName{
          position: absolute;
          font-size: 0.9px;
          color: #fff;
          left: 5%;
          bottom: 5%;
        }
      }
    }
    .subMenu{
      width: 3rem;
      display: flex;
      flex:0 0 33.333%;
      justify-content: space-between;
      margin: 0 auto;
      padding: 1rem 0;
      li{
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #777;
      }
   }
  }
}
@media screen and (min-width: 768px) and (max-width: 1199.99px){
  .ranking-list-item {
    .img-wrap {
      flex: 0 1 20% !important;
      img {
        width: 14rem !important;
      }
    }
    .ranking-wrap{
      flex: 0 1 80% !important;
    }
  }
}
@media screen and (min-width: 1200px){
  .first_album .album-img-wrap{
    min-height: 300px;
  }
}

</style>
