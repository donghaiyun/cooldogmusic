<template>
  <div id="demo" class="carousel" :style="{width:innerWidth+'px'}" @mouseenter="stop" @mouseleave="start">
    <!--轮播图片-->
    <div class="carousel-inner" :class="{hasTrans:hasTrans===true}" :style="ulStyle">
      <div class="carousel-item"
           v-for="(item,index) of images"
           :style="{width:innerWidth+'px'}"
           :key="index">
        <router-link
            :to="item.to"
            :title="item.title"
            :style="{'backgroundImage':'url('+item.src+')',width:'100%'}">
        </router-link>
      </div>
      <div class="carousel-item" :style="{width:innerWidth+'px'}">
        <router-link
            :to="images[0].to"
            :title="images[0].title"
            :style="{'backgroundImage':'url('+images[0].src+')'}">
        </router-link>
      </div>
    </div>
    <!--左右箭头-->
    <a href="javascript:void(0)" class="carousel-control carousel-control-next" @click="move(1)">
      <span class="carousel-control-next-icon"></span>
    </a>
    <a href="javascript:void(0)" class="carousel-control carousel-control-prev" @click="move(-1)">
      <span class="carousel-control-prev-icon"
      >
      </span>
    </a>
    <!--轮播指示图-->
    <ul class="carousel-indicators">
      <li v-for="(item,index) of images" :key="index"@mouseenter="moveTo(index)" @click="moveTo(index)">
        <i :class="{active:i===index}"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  data(){
    return {
      //初始化时，设置默认宽度为当前窗口的宽度
      innerWidth:window.innerWidth,
      i:0,//用来控制当前正在选中第几张图片
      canClick:true,
      hasTrans:true,//控制是否给轮播图添加trans
      timer:null,
      images:[
        {
          src:require('../../assets/image/carousel/carousel_01.jpg'),
          title:'酷狗音乐',
          to:'#'
        },
        {
          src:require('../../assets/image/carousel/carousel_02.png'),
          title:'刘惜君',
          to:'/'
        },
        {
          src:require('../../assets/image/carousel/carousel_03.jpg'),
          title:'秒奇星球',
          to:'#'
        },
        {
          src:require('../../assets/image/carousel/weixinyu.jpg'),
          title:'魏新雨',
          to:'#'
        },
        {
          src:require('../../assets/image/carousel/carousel_05.jpg'),
          title:'春节联欢晚会',
          to:'#'
        }
      ],
    }
  },
  created() {
    window.addEventListener('resize',()=>{
      this.innerWidth=window.innerWidth;
    })
    this.start();

    //解决setInterval在浏览器切换中的问题
    window.addEventListener('onvisibilitychange',()=>{
      //visible 表示当前网页是可见或者是部分可见的,可见时运行setInterval，否则清除
      if(document.visibilityState==="visible"){
        this.start();
      }else{
        clearInterval(this.timer)
      }
    })
  },
  methods: {
    move(i) {
      //如果可以单击
      if (this.canClick) {
        if (i === -1 && this.i === 0) {//如果向左边移动，且正在显示第1张图片，就要骗用户
          this.hasTrans = false;//去掉父级div上的transition样式类
          setTimeout(() => {//等50ms再操作(dom重绘需要时间，延时操作以防止dom操作叠加)
            this.i = this.images.length;//切换到最后一张照片
            setTimeout(() => {
              this.hasTrans = true;//打开transition效果
              this.i += i;//向右移动一次
              setTimeout(() => {//延迟防抖
                this.canClick = true;
              }, 200)
            }, 50)
          }, 50)
        } else if (i === 1 && this.i === this.images.length - 1) {//如果已经到最后一张图片，并且要切换到下一张图片
          this.i += i;//先带这transition效果移动一次
          setTimeout(() => {
            this.hasTrans = false;//去掉transition
            setTimeout(() => {
              this.i = 0;//静默移动到第一张照片
              setTimeout(() => {
                this.hasTrans = true;
                this.canClick = true;
              }, 50)
            }, 50)
          }, 200)
        } else {
          this.i += i; //i加1或减1
          this.canClick = false;//禁止单击
          setTimeout(() => {
            this.canClick = true;
          }, 300)
        }
      }
    },
    moveTo(i) {
      if (this.canClick) {
        this.i = i;//跳转到对应图片
        this.canClick = false;//禁止单击
        setTimeout(() => {
          this.canClick = true;
        }, 400)
      }
    },
    //定时轮播图片函数
    inter(){
      //添加一次性定时器器，防止反复触发mouseenter事件添加多个重复定时器
      if (this.canClick) { //只有当canClick为true时才滚动图片
        this.move(1);
        this.canClick = false;
        setTimeout(() => { //1s后打开轮播开关
          this.canClick = true;
        }, 1000)
      }
    },
    start() {
      clearInterval(this.timer);//每次开头清除定时器，防止定时器叠加
      this.timer = setInterval(this.inter, 3000);
    },
    stop() {
      if (this.innerWidth > 768) { //禁用小屏的mouseenter事件
        clearInterval(this.timer);
      }
    }
  },
  computed:{
    ulStyle(){
      //修饰所有图片的父元素，当网页宽度变化时，则自动计算ul的位置和大小
      let width=this.innerWidth*(this.images.length+1)+'px';
      let marginLeft=-this.i*this.innerWidth+'px';
      return {
        width,marginLeft
      }
    }
  }
}
</script>

<style lang="scss">
.carousel{
  overflow: hidden;
  position: relative;
  height: 25rem;
  .carousel-inner{
    .carousel-item{
      display: block;
      float: left;
      a{
        display: block;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 25rem;
      }
    }
  }
  .carousel-control{
    position: absolute;
    top: 50%;
    width: 4rem;
    height: 8rem;
    background-color: #2c323b;
    background-image: url(../../assets/image/icon/sprite.png);
    transform: translateY(-50%);
    opacity: 0;
  }
  .carousel-control-next{
    right: 1rem;
    background-position: 0 -1130px;
  }
  .carousel-control-prev{
    //left: 0.5rem;
    left:0;
    background-position: 0 -755px;
  }
  .carousel-inner.hasTrans{
    transition: all .5s linear;
  }
  .carousel-indicators{
    position: absolute;
    width: 100px;
    height: 30px;
    bottom:10% ;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    li{
      flex: 0 0 20%;
      cursor: pointer;
      i{
        display: inline-block;
        width: 7px;height: 7px;
        border-radius: 50%;
        background-color: #d3d3d3;
        transition: all .5s linear;
        margin: 0 auto;
      }
      i.active{
        transform: scale(1.5);
        background-color: #fff;
      }
    }
  }
}
.carousel:after{
  content: "";
  display: block;
  clear: both;
}
.carousel:hover .carousel-control{
  opacity: 0.3;
}

@media screen and (max-width:768px){
  .carousel {
    height: 12rem;
    .carousel-inner > .carousel-item a {
      height: 12rem;
    }
    .carousel-control{
      display: none;
    }
    ul{
      bottom: 0 !important;
    }
  }
}

</style>
