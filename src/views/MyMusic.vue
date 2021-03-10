<template>
  <main class="MyMusic">
    <a-row>
      <a-col :xs="24" :md="6.3" :xl="{ span: 5, offset: 2 }">
        <!-- 左侧折叠目录 -->
        <div class="left">
          <a-menu
              style="width: 256px"
              :default-selected-keys="['1']"
              :open-keys.sync="openKeys"
              mode="inline"
              @click="handleClick"
          >
            <a-sub-menu key="sub1" @titleClick="titleClick">
              <!-- 折叠目录标题 -->
              <span slot="title">
                <img class="love" src="../assets/image/icon/爱心.png" />
                <span class="love_music">我的收藏</span></span
              >
              <!-- 折叠目录分类 -->
              <a-menu-item-group key="g1">
                <a-menu-item key="1">
                  <img
                      src="../assets/image/icon/huayu.jpg"
                      class="img"
                  />我喜欢的音乐
                </a-menu-item>
                <!-- <a-menu-item key="2">
                  <img src="../assets/image/icon/oumei.jpg" class="img" />欧美
                </a-menu-item>
                <a-menu-item key="3">
                  <img src="../assets/image/icon/riyu.jpg" class="img" />日本
                </a-menu-item>
                <a-menu-item key="4">
                  <img src="../assets/image/icon/hanyu.jpg" class="img" />韩国
                </a-menu-item> -->
              </a-menu-item-group>
            </a-sub-menu>
          </a-menu>
        </div>
      </a-col>
      <!-- 右边部分 -->
      <a-col :xs="24" :md="12" :xl="14">
        <div class="right">
          <!-- 右边部分上方 -->
          <div class="right_top">
            <a-row>
              <a-col
                  :xs="24"
                  :md="{ span: 6, offset: 3 }"
                  :xl="{ span: 4, offset: 2 }"
              >
                <!-- 右侧上左方图片 -->
                <div class="right_img">
                  <img src="../assets/image/icon/huayubig.jpg" alt="" />
                  <span class="right_img_border"></span>
                </div>
              </a-col>
              <!-- 右侧上右方部分 -->
              <a-col :xs="24" :md="{ span: 10, offset: 4 }" :xl="8">
                <div class="right_content">
                  <h2>我喜欢的音乐</h2>
                  <div class="avatar">
                    <router-link to="/user">
                      <img
                          src="../assets/image/icon/20100101192931478054.jpg"
                          alt=""
                      />
                      <span>大佬</span>
                    </router-link>
                  </div>

                  <div class="btn">
                    <router-link to="/" class="img-play">
                      <i class="p1"></i>
                      <span>播放</span>
                    </router-link>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
          <!-- 右侧下方歌曲列表 -->
          <div class="list">
            <div class="list_title">
              <h3>
                <span>歌曲列表</span>
              </h3>
            </div>
            <ul class="li_list">
              <!-- 标题 -->
              <li class="li_one">
                <span class="li_title1"></span>
                <span class="li_title2">歌曲标题</span>
                <span class="li_title3">时长</span>
                <span class="li_title4">歌手</span>
                <span class="li_title5">专辑</span>
              </li>
              <!-- 内容 -->
              <li class="li_two" v-for="(item, index) of collectList" :key="index">
                <div class="li_two_content li_title1">
                  <span class=" li_content_id">{{ item.id }}</span>
                  <a class="li_title1_a" href="javascript:;"></a>
                </div>
                <div class="li_title2">
                  <span class="li_two_content">
                    <a class="name_link" href="javascript:;">
                      {{ item.songName }}
                    </a>
                  </span>
                </div>

                <div class="li_title_three_content li_title3" >
                  <span class=" duration">
                    {{ item.duration}}
                  </span>
                  <span class="duration_hover">
                    <a class="icon icon_collect" title="收藏"></a>
                    <a class="icon icon_delete" title="删除"></a>
                  </span>
                </div>
                <div class="li_title4">
                  <span >
                  <a class="name_link" href="javascript:;">
                    {{ item.singerName }}
                  </a>
                </span>
                </div>
                <div class="li_title5">
                  <span >
                  <a class="name_link" href="javascript:;">
                    {{ item.albumName }}
                  </a>
                </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </a-col>
    </a-row>
  </main>
</template>
<script>
export default {
  name: "MyMusic",
  data() {
    return {
      current: ["mail"],
      openKeys: ["sub1"],
      collectList: [
        {
          id: 1,
          songName: "我们的爱",
          duration: 523,
          singerName: "黄霄云",
          albumName: "歌手·当打之年 第11期",
        },
        {
          id: 2,
          songName: "不说",
          duration: 326,
          singerName: "李荣浩",
          albumName: "不说",
        },
      ],
    };
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  methods: {
    handleClick(e) {
      console.log("click", e);
    },
    titleClick(e) {
      console.log("titleClick", e);
    },
  },
};
</script>
<style scoped>
/* 边框样式 */
.left {
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  height: 556px;
}
.left .ant-menu {
  width: 273px;
}
.right {
  border-right: 1px solid #d3d3d3;
  height: 556px;
}
/* 折叠目录 */
.love_music {
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: -32px;
}
.love {
  width: 17%;
  margin-top: 7px;
  margin-left: 14px;
}
.card {
  border: none;
}
.card-header {
  padding: 0;
  background-color: #fff;
  border-bottom: none;
}
.card-body {
  padding: 0;
}
.img {
  padding-right: 10px;
}
/* 右侧上部分 */
/* 图片 */
.right_img,
.right_img_border {
  position: absolute;
  background: url(../assets/image/icon/coverall.png) no-repeat;
}
.right_img > img {
  width: 200px;
}
.right_img {
  display: inline-block;
  margin-top: 40px;
}
.right_img_border {
  width: 208px;
  height: 208px;
  background-position: 0 -1285px;
  top: -4px;
  left: -4px;
}
/* 文字 */
.right_content {
  margin-top: 40px;
  line-height: 24px;
  font-size: 20px;
  font-weight: normal;
}
/* 头像 */
.avatar {
  margin: 16px 0px;
  position: relative;
  display: block;
}
/* 头像 */
.avatar img {
  float: left;
  width: 35px;
  height: 35px;
  margin-right: 10px;
}
.avatar span {
  font-size: 14px;
  color: #0c73c2;
  display: inline-block;
  margin-top: 5px;
}
/* 昵称 */
.right_content > span {
  float: left;
}
/* 功能按钮 */
/* 共用精灵图 */
.p1,
.p2 {
  padding: 0.8rem 0.8rem 0 0.5rem;
  background: url(../assets/image/icon/icon_splice.png) no-repeat;
  display: inline-block;
}

.btn {
  display: flex;
  margin-top: 40px;
}

.img-play > span {
  font: 0.8125rem/1.5 \5fae\8f6f\96c5\9ed1, simsun, sans-serif;
  color: #fff;
}

.img-play {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -0.625rem;
  background-color: #169af3;
  width: 5rem;
  height: 1.625rem;
  border-radius: 5%;
}

.p1 {
  background-position: -35.625rem -5.625rem;
  padding: 0 0.5rem;
  height: 0.75rem;
}

/* 右侧下半部分列表 */

/* 右侧列表标题 */
.list_title {
  margin-top: 120px;
  margin-left: 50px;
}
.list_title > h3 {
  font-size: 20px;
  line-height: 28px;
}

/* 右侧列表内容 */
.li_one span {
  font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
}

.li_one {
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  margin-top: 10px;
  height: 40px;
}
.li_one{
  display: flex;
  width: 100%;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
}
.li_one span {
  border-top: 2px solid #169af3;
  border-bottom: 1px solid #cccccc;
  height: 40px;
  line-height: 20px;
  padding: 8px 10px;
}
.li_one span:not(:last-child) {
  border-right: 1px solid #cccccc;
}
.li_title1 {
  flex: 0 1 10%;
}
.li_title2 {
  flex: 0 1 30%;
}
.li_title3 {
  flex: 0 1 25%;
}
.li_title4 {
  flex: 0 1 25%;
}
.li_title5 {
  flex: 0 1 30%;
}

/* 列表具体内容 */
.li_two:hover .li_title_three_content>span:nth-child(2){
  z-index: 3;
}

/* 除了第一行标题外的li项 2n+1是单数行，2n+2是双数行 */
/* :nth-child(2n+1) =>单数行 2n+2 =>双数行 */
.li_list>li{
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.li_list>li:nth-child(2n+1){
  background-color: #fff;
}

.li_list>li:nth-child(2n+2){
  background-color: #f7f7f7;
}

.li_two span  a {
  font-size: 12px;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 18px;
  text-align: left;
  padding: 6px 10px;
}
.li_title_three_content{
  position: relative;
}
.li_list>li:nth-child(2n+2)>.li_title_three_content>span{
  background-color: #f8f8f8;
  margin-top: -12px;
  width: 100px;height: 30px;
  display: block;
  position: absolute;
  left: -8px;
}
.li_list>li:nth-child(2n+1)>.li_title_three_content>span{
  background-color: #fff;
  margin-top: -12px;
  width: 100px;height: 30px;
  display: block;
  position: absolute;
  left: -8px;
}
.li_title_three_content>span:nth-child(1){
  z-index: 2;
}

.li_two_content {
  display: flex;
  align-items: center;
}
.li_content_id {
  width: 25px;
  margin-left: -2px;
  margin-right: 13px;
  color: #999;
  font-size: 12px;
}
.li_two span {
  padding: 6px 10px;
}
.li_title1_a,
.icon {
  display: inline-block;
  background: url("../assets/image/icon/table.png") no-repeat 0 9999px;
  background-position: -20px -128px;
  width: 17px;
  height: 17px;
  cursor: pointer;
}
.name_link:hover {
  text-decoration: underline;
}
.duration {
  color: #666;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  padding-left: 20px !important;
}

/* 时长浮动时显示的两个图标 */
.icon {
  float: left;
  width: 18px;
  height: 16px;
  margin: 2px 0 0 4px;
  overflow: hidden;
  text-indent: -999px;
  cursor: pointer;
  color: #666;
}
.icon_collect {
  background-position: 0 -174px;
}
.icon_delete{
  background-position: 0 -217px;
}
</style>