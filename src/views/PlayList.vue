<template>
  <main class="album">
    <a-row class="song-content">
      <!-- 顶部分类路径 -->
      <a-col :xs="24" :md="24" :xl="{ span: 20, offset: 2 }">
        <a-row>
          <div class="top">
            <a-col :xs="24" :md="0" :xl="0">
              <div class="top_div"></div>
            </a-col>
            <a-col :xs="24" :md="24" :xl="24">
              <div class="top_content">
                <p>
                  我的位置>
                  <router-link to="/index" class="content_1 content_2"
                  >首页</router-link
                  >
                  >
                  <router-link to="/index" class="content_1 content_2"
                  >精选辑</router-link
                  >
                  >
                  <span class="content_1">{{ songList[1]["album_name"] }}</span>
                </p>
              </div>
            </a-col>
          </div>
        </a-row>
      </a-col>
      <!-- 内容部分-->
      <a-col :xs="24" :md="4" :xl="{ span: 4, offset: 2 }">
        <a-row :gutter="12">
          <a-col :xs="8" :md="24">
            <div class="img-wrap">
              <img :src="songList[0].album_art" alt="" />
            </div>
          </a-col>
          <a-col :xs="6" :md="24">
            <a class="img-share">
              <i class="p1"></i>
              <span>分享</span>
            </a>
            <!-- 专辑标题 -->
            <div class="content">
              <span class="content_title">名称 ：</span>
              <span class="content_1">{{ songList[0]["album_name"] }}</span>
              <br />
              <span class="content_title">作者 ：</span>
              <span class="content_1">{{ songList[0].singerName }}</span>
            </div>
          </a-col>
        </a-row>

      </a-col>
      <!-- 右边部分 -->
      <a-col :xs="24" :md="20" :xl="16">
        <div class="right">
          <div class="right_title">
            <strong><{{ songList[0]["album_name"] }}>-歌曲列表</strong>
          </div>
          <!-- 全选 -->
          <div class="checkAll">
            <div class="checkAll_imgt">
              <input
                  type="checkbox"
                  :checked="isCheckedAll"
                  @click="checkAll"
              />
              <span class="checkAll_text">全选</span>
            </div>
            <a class="img-play">
              <i class="p2"></i>
              <span>播放</span>
            </a>
          </div>
          <hr />
          <!-- 列表 -->
          <ul>
            <!-- 第一行 -->
            <li v-for="(item, index) of songList" @click="tosong(item)">
              <a class="row_content">
                <input
                    class="content_int"
                    type="checkbox"
                    :checked="isChecked"
                    @click="check"
                />
                <span class="play">
                  <a class="share" title="分享" href=""></a>
                  <a class="begin" title="播放" href=""></a>
                </span>
                <span class="index">{{
                    index + 1 < 10 ? "0" + (index + 1) : index + 1
                  }}</span>
                <span class="content">{{ item.sname }} - {{ item.singerName }}</span>
              </a>
            </li>
          </ul>
        </div>
      </a-col>
    </a-row>
  </main>
</template>

<script>
export default {
  name: "PlayList",
  props: ["albumId"],
  data() {
    return {
      songList: [],
      isChecked: true,
      isCheckedAll: true,
      count: 0,
    };
  },
  methods: {
    check(e) {
      if (e.target.checked === true) {
        this.count++;
      } else {
        this.count--;
      }
      if (this.count === this.songList.length) {
        this.isCheckedAll = true;
      } else {
        this.isCheckedAll = false;
      }
    },
    checkAll(e) {
      if (e.target.checked === true) {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
    },
    tosong(item){
      this.$store.commit('setSongList',JSON.stringify(item));
      setTimeout(()=>{
        this.$router.push("/song");
      },800);
    }
  },
  mounted() {
    this.axios
        .get("/playlist/search_album", {
          params: {
            albumId: this.albumId,
          },
        })
        .then((result) => {
          let results = result.data.results;
          results.forEach((item) => {
            item.album_art = require(`../assets/image/album_art/${item.album_art}`);
            item.url=require(`../assets/songs/${item.url}`);
            item.duration=this.moment(item.duration*1000).format('mm:ss');
            this.songList.push(item);
          });
          console.log(results)
        });
  },
};
</script>

<style scoped>
/* 共用字体大小 */
.top,
.img-play > span,
.checkAll_text,
.content_1,
.index,
.content {
  font: 0.8125rem/1.5 \5fae\8f6f\96c5\9ed1, simsun, sans-serif;
}
/* 顶部分类导航路径 */
.top {
  color: #ada8a8;
}
.top_div {
  height: 3.3125rem;
}
.top_content {
  margin: 0.9375rem 0;
}
.content_2:hover {
  text-decoration: underline;
}
/* 专辑图片样式 */
.img-wrap > img {
  width: 9.25rem;
  margin: 0.25rem 0 0 0.3125rem;
}
/* 分享按钮样式 */
.img-share {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #169af3;
  width: 5.25rem;
  height: 1.625rem;
  margin: 1.25rem 0rem 1.0625rem 0.3125rem;
  border-radius: 5%;
}
/* 共用精灵图 */
.p1,
.p2 {
  padding: 0.8rem 0.8rem 0 0.5rem;
  background: url(../assets/image/icon/icon_splice.png) no-repeat;
  display: inline-block;
  overflow: hidden;
  cursor: pointer;
}
.p1 {
  display: block;
  background-position: -18.75rem -5.625rem;
  height: 0.875rem;
}

.img-share > span,
.img-play > span {
  color: #fff;
}
/*专辑标题*/
.content_title,
.checkAll_text {
  color: #7d7d7d;
  line-height: 1.4375rem;
  text-align: left;
}
.content_1 {
  color: #3d3d3d;
}
/* 右边部分 */
.right {
  margin-left: -2.5625rem;
  width: 47.75rem;
  border-left: 0.0625rem solid #dcdcdc;
  padding: 0.625rem 0 0 0.9375rem;
  min-height: 43.75rem;
}
.right_title {
  margin-top: 0.625rem;
  margin-left: -0.625rem;
}
strong {
  color: #323232;
  font-size: 0.875rem;
  font-weight: bold;
  margin-left: 0.625rem;
}
/* 全选行 */
.checkAll {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.0625rem;
  height: 1.5rem;
  margin-left: 0.4375rem;
}
.checkAll_text {
  display: flex;
  margin-top: -1.5625rem;
  margin-left: 1.375rem;
  box-sizing: border-box;
}
.img-play {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -0.625rem;
}
.img-play {
  position: relative;
  background-color: #169af3;
  width: 5rem;
  height: 1.625rem;
  border-radius: 5%;
}
.p2 {
  background-position: -35.625rem -5.625rem;
  padding: 0 0.5rem;
  height: 0.75rem;
}
hr {
  height: 0.0625rem;
  width: 47.375rem;
  border: none;
  border-top: 0.0625rem solid #dcdcdc;
}
/* 音乐列表主体 */
ul {
  margin-left: 0.4375rem;
}
.row_content {
  display: block;
  zoom: 1;
  height: 1.5625rem;
  padding-left: 0.5rem;
  line-height: 1.5625rem;
  font: 0.8125rem/1.5 \5fae\8f6f\96c5\9ed1, simsun, sans-serif;
  margin-left: -0.5rem;
}
/* 悬浮时的效果 */
.row_content:hover {
  background-color: #daf1fb;
}
.row_content:hover > span > .share {
  background: url(../assets/image/icon/other.png) no-repeat 0 -1.25rem;
}
.row_content:hover > span > .begin {
  background: url(../assets/image/icon/other.png) no-repeat -3.6875rem -1.25rem;
}

.share,
.begin {
  width: 1.1875rem;
  height: 1.1875rem;
  display: inline;
  float: right;
  cursor: pointer;
  line-height: 0;
  font-size: 0;
  color: #000;
}
/* 未悬浮时的效果 */
.share {
  background: url(../assets/image/icon/other.png) no-repeat 0 0;
  margin: 0.125rem -0.875rem 0rem 0.625rem;
}
.begin {
  background: url(../assets/image/icon/other.png) no-repeat -1.1875rem 0;
}
.content_int {
  float: left;
  width: 0.8125rem;
  height: 0.9375rem;
  margin-right: 0.9375rem;
  margin-top: 0.25rem;
  vertical-align: middle;
  box-sizing: border-box;
}
.index {
  width: 1.875rem;
  display: inline;
  margin-left: 0.1875rem;
  margin-right: 0.625rem;
  float: left;
  color: #000;
  cursor: pointer;
  line-height: 1.5625rem;
  list-style: none;
}
.content {
  font-style: normal;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  font-size: 100%;
  color: #000;
  line-height: 1.5625rem;
}
@media screen  and (max-width: 767.999px){
  .top_div{
    display: none;
  }
}
@media screen and (min-width: 768px) and (max-width: 1199.99px) {
  .right {
    padding-left: 2rem;
    width: 34.375rem;
    margin-left: 5rem;
  }
  hr {
    width: 33rem;
  }
}
@media screen and (max-width: 1199px) {
  .right {
    padding-left: 2rem;
    width: 34.375rem;
  }
  hr {
    width: 33rem;
  }
}
</style>
