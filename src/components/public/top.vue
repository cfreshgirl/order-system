<template>
    <el-page-header @back="goBack" content="熙客中国菜" class='top'>
    </el-page-header>
</template>
<script>
  export default {
    name:"top",
    methods: {
      goBack() {
         this.$router.go(-1);
      }
    }
  }
</script>
<style scoped>
    .top{
        background: -webkit-linear-gradient(left, #4587dd, rgb(41, 143, 211));
        margin-bottom:10px;
        height:28px;
    }
</style>