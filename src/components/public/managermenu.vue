<template>
      <div class="top">
          <span class="title">欢迎登陆后台管理系统</span>
           <span class="username">管理员{{username}}，欢迎您</span>
           <el-button type="text" class="exit" @click="exit">退出</el-button>
        </div>
</template>

<script>
export default {
  name: 'managermenu',
  data() {
      return {
          username:document.cookie.split('username=')[1].split(';')[0],
      }
    },
    methods: {
      exit(){
        var _this=this;
        var d = new Date();
        d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = "username" + "=" + ""  + "; " + expires;
        document.cookie = "userid" + "=" + ""  + "; " + expires;
        _this.$message.success('退出成功')
        setTimeout(function(){
           _this.$router.push("/login")
        }.bind(this),2000)
      }
    }
  }
</script>

<style scoped>
*{
    margin:0;
    padding:0;
}
.top{
    height:auto;
    width:100%;
    background-color:#9dafc0;
    padding:10px;
}
.title{
    font-size: 35px;
    font-family: "微软雅黑";
    margin-right:900px;
}
.username{
    margin-right: 30px;
    color: rgb(206, 10, 10);
}
.exit{
    color:rgb(46, 45, 45);
}
</style>
