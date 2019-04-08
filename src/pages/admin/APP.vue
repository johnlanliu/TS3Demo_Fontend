<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style lang="scss">
  @import "../../../static/css/color-dark.css"; /*深色主题*/
  /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
  @import "../../../static/css/main.css";
  html,
  body,
  #app {
    margin: 0;
    padding: 0;
    width: 100%;
    min-width: 1200px;
    overflow-x: auto;
  }
</style>
