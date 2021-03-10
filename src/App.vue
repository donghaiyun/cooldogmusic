<template>
  <div id="app">
    <div id="nav">
      <my-header></my-header>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
html,body{
  overflow: hidden;
  overflow-y: auto;
}
p{
  padding: 0 !important;
  margin: 0 !important;
}
a:focus{
  outline: none !important;
}
.hidden{
  display: none !important;
}
</style>
