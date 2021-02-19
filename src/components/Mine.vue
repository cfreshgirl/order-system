<template>
  <div >
    <Top></Top>
    <div class="middle">
      <div class="bjimg">
        <div class="touxiang">
          <img src="../assets/img/touxiang.png" alt="" width="50px" class="tx">
          <div class="info">
            <el-button type="text" :disabled="no==0?false:true" @click="login">{{message}}</el-button>
          </div>
        </div>
        <img src="../assets/img/beijing.png" alt="" width="375px" height="200px">
      </div>
      <ul>
        <li class="list">
          <img src="../assets/img/myorder.png" alt="" width="30px" class="icon">
          <a href="/#/myorder">我 的 订 单</a>
        </li>
        <li class="list">
          <img src="../assets/img/myaddress.png" alt="" width="30px" class="icon">
          <a href="/#/affirm/addresslist/">我 的 地 址</a>
        </li>
        <li class="list">
          <img src="../assets/img/myredpocket.png" alt="" width="30px" class="icon">
          <a href="">我 的 红 包</a>
        </li>
        <li class="list">
          <img src="../assets/img/setting.png" alt="" width="30px" class="icon">
          <a href="/#/changepassword/">修 改 密 码</a>
        </li>
      </ul>
    </div>
    <el-button type="danger" class="exit" @click="exit">退出登录</el-button>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Bottom from './public/bottom'
import Top from './public/top'
export default {
  name: 'Mine',
  data(){
    return{
      massage:"",
      no:0
    }
  },
  components:{
    Bottom,
    Top
  },
  created(){
    if(document.cookie==""){
        this.message='登录'
      }else{
        if(document.cookie.split('username=')[1].split(';')[0] == undefined){
          this.message='登录'
        }else{
          this.message=document.cookie.split('username=')[1].split(';')[0]
          this.no=1
        }
      }
  },
  methods:{
    login(){
      this.$router.push("/login")
    },
    exit(){
        var d = new Date();
        d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = "username" + "=" + ""  + "; " + expires;
        document.cookie = "userid" + "=" + ""  + "; " + expires;
        this.$message.success('退出成功')
        setTimeout(function(){
           this.$router.push("/")
        }.bind(this),1000)
    }
  }
}
</script>

<style scoped>
.bjimg{
  width: 375px;
  border-radius: 5px;
}
.touxiang{
  position:fixed;
  margin-top:60px;
  margin-left:30px;
  z-index: 9999;
}
.tx{
  vertical-align:middle;
  display: inline-block;
}
.info{
  vertical-align:middle;
  display: inline-block;
  margin-left:20px;
}
.el-button{
  font-family: "宋体";
  font-size:30px;
  font-weight: bolder;
}
ul{
  padding-left:10px;
  box-shadow: 0 2px 12px 0 rgba(54, 72, 90, 0.219);
  height:270px;
  margin-left:2.5%;
  margin-bottom:10px;
  width: 92%;
  overflow: scroll;
}
ul li{
  list-style: none;
}
a{
  text-decoration: none;
  color:rgb(80, 82, 82);
  margin-left: 10px;
  vertical-align:middle;
}
.list{
    margin-right: 10px;
    padding-top:13px;
    height:40px;
    text-size-adjust: 20px;
    border-bottom:lightgray 1px solid;
    border-top:lightgray 1px solid;
}
.icon{
  vertical-align:middle;
}
.exit{
  width: 90%;
    margin-left:5%;
    font-size: 16px;
    margin-top:17px;
    margin-bottom: 10px;
}

</style>
