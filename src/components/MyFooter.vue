<template>
  <footer>
    <div class="footer-wrap">
      <ul class="links">
        <li v-for="(item,index) of links" :key="index">
          <a href="javascript:void(0)" v-text="item.title"></a>
        </li>
      </ul>
      <div class="bottom-wrap">
        <p>我们致力于推动网络正版音乐发展，相关版权合作请联系copyrights@kugou.com</p>
        <p>信息网络传播视听节目许可证 1910564 增值电信业务经营许可证粤B2-20060339 &nbsp;&nbsp;&nbsp;<a hidefocus="true" target="_blank" href="http://beian.miit.gov.cn">粤ICP备09017694号</a><span class="footerIcon"><a target="_blank" href="http://sq.ccm.gov.cn:80/ccnt/sczr/service/business/emark/toDetail/E64D2439A71544C7B995FC0A53D8F965">&nbsp;&nbsp;&nbsp;&nbsp;</a></span></p>
        <p>广播电视节目制作经营许可证（粤）字第01270号&nbsp;&nbsp;&nbsp;&nbsp;营业性演出许可证穗天演440106026&nbsp;&nbsp;&nbsp;<a hidefocus="true" target="_blank" href="https://www.kugou.com/common/images/license.jpg">营业执照</a></p>
        <p>穗公网监备案证第44010650010167&nbsp;&nbsp;&nbsp;&nbsp;互联网药品信息服务资格证编号（粤）-非经营性-2012-0018<a style="" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44010602000141">&nbsp;&nbsp;&nbsp;<span>粤公网安备 44010602000141号</span><img src="//www.kugou.com/common/images/icon_yuewangga1.png" width="16" height="16"></a></p>
        <p style="-moz-user-select: text;-webkit-user-select: text;-ms-user-select: text; user-select:text"><a hidefocus="true" target="_blank" href="https://www.12377.cn">互联网不良信息举报中心：www.12377.cn</a>&nbsp;&nbsp;&nbsp;&nbsp;酷狗不良信息举报邮箱：jubao_music@kugou.net&nbsp;&nbsp;&nbsp;&nbsp;客服邮箱：kefu@kugou.net</p>
        <p>Copyright&nbsp;&nbsp;&copy;&nbsp;&nbsp;2004-2021 KuGou-Inc.All Rights Reserved
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
name: "MyFooter",
  data(){
    return {
      links:[
        {
          title:'关于酷狗',
          href:'#'
        },
        {
          title:'监督举报',
          href:'#'
        },
        {
          title:'商务合作',
          href:'#'
        },
        {
          title:'广告服务',
          href:'#'
        },
        {
          title:'投诉指引',
          href:'#'
        },
        {
          title:'隐私政策',
          href:'#'
        },
        {
          title:'儿童隐私政策',
          href:'#'
        },
        {
          title:'用户服务协议',
          href:'#'
        },
        {
          title:'酷狗音乐人',
          href:'#'
        },
        {
          title:'酷狗直通车',
          href:'#'
        },
        {
          title:'招聘信息',
          href:'#'
        },
        {
          title:'客服中心',
          href:'#'
        },
        {
          title:'用户体验提升计划'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
footer{
  margin-top: 3rem;
  padding: 0 1rem;
  background-color: #2c323b;
  font-size: 0.8rem;
  color: #b1b3b9;
  a{
    display: inline-block;
    padding: 0.7rem;
    color: #b1b3b9;
  }
  ul.links{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-bottom: 1px solid #3d424a;
    li{
      flex: 0 0 8rem;
    }
  }
  .bottom-wrap{
    padding: 2rem 0;
    p{
      text-align: center;
    }
  }
}
footer::after{
  display: block;
  content: "";
  clear: both;
}
@media screen and (min-width: 1200px){
  .footer-wrap{
    padding: 0 4%;
  }
}
</style>