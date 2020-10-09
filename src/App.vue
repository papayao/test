<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style>
  html,body{
    height: 100%;
  }
  .el-container{
  height: 100%;
}
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #304156;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    color: #333;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }

</style>
