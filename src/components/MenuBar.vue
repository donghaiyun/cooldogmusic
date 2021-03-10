<template>
  <div class="menubar">
    <a-button @click="showDrawer" type="link" size="large">
      <a-icon style="font-size: x-large;color: #2c323b" type="menu-unfold" />
    </a-button>
    <a-drawer
        title="菜单"
        placement="right"
        :visible="visible"
        @close="onClose"
        width="15rem"
        :mask="true"
        getContainer="main"
        :drawerStyle="{background:'#fff',fontSize:'0.85rem',color:'#2f343b'}"
    >
      <ul class="meun_list">
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/myMusic">我的音乐</router-link></li>
        <li><router-link to="#">下载客户端</router-link></li>
        <li><router-link to="#">更多</router-link></li>
      </ul>
    </a-drawer>
  </div>
</template>

<script>
export default {
  name: "MenuBar",
  data(){
    return {
      visible: false,
      placement: 'left',
    }
  },
  methods:{
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onChange(e) {
      this.placement = e.target.value;
    },
  }
}
</script>

<style lang="scss">
.menubar{
  display: none;
  position: relative;
  z-index: 99;
  button{
    z-index: 999;
  }
}
ul.meun_list{
  line-height: 1.5rem;
  a{
    color: #2c323b;
  }
}
@media screen and (max-width: 767.999px) {
  .menubar{
    display: block;
  }
}
</style>
