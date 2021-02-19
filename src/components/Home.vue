<template>
  <div >
    <!--滚动图-->
    <div class="block">
      <el-carousel height="290px">
        <el-carousel-item v-for="(item,index) in advertise_img" :key="index">
          <img :src="advertise_img[index].img" alt="" width="100%">
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-link class='mess' href="/#/login"  :disabled="no==0?false:true" type="danger">{{ message }}</el-link>
    <el-button class="start_btn" @click.native="order" type="primary" >开始点餐</el-button>
    <div class="abc">
      <div class="link">
        <el-link type="primary">我 的 卡 包 <i class="el-icon-arrow-right" ></i> </el-link>
      </div>
      <div class="link">
        <el-link type="primary">礼 品 卡  <i class="el-icon-arrow-right" ></i></el-link>
      </div>
      <div class="link">
        <el-link type="primary">会 员 权 益  <i class="el-icon-arrow-right" ></i></el-link>
      </div>
      <div class="link">
        <el-link type="primary">关 于 我 们    <i class="el-icon-arrow-right" ></i></el-link>
      </div>
  </div>
    
  </div>
</template>

<script>
import Bottom from './public/bottom'
export default {
  name: 'Home',
  components:{
  },
  data(){
    return {
      advertise_img:[
        {img:require('../assets/img/ad1.jpg')},
        {img:require('../assets/img/ad2.jpg')},
        {img:require('../assets/img/ad3.jpg')},
        {img:require('../assets/img/ad4.jpg')}
      ],
      message:'您还没有登录，请点击此处登录',
      no:0                                //判断是否有用户登录
    }
  },
  created(){
      console.log(document.cookie)
      if(document.cookie==""||document.cookie ==="null"){
        this.message='您还没有登录，请点击此处登录'
      }else{
        if(document.cookie.split('username=')[1].split(';')[0] == undefined){
          this.message='您还没有登录，请点击此处登录'
        }else{
          this.message=document.cookie.split('username=')[1].split(';')[0]+'     ,     欢迎您!'
          this.no=1
        }
      }
  },
  methods:{
    order(){
      let _this=this;
      if(document.cookie.split('=')[1]==undefined){
        this.$message.error('您还未登录，请先登录');
        setTimeout(function(){
          _this.$router.push('/login')
        }.bind(this),2000)
      }else{
        _this.$router.push('/menu')
      }
    },
  }

}
</script>

<style>

.el-carousel__item{
  border-radius: 5px;
}

.el-carousel__item:nth-child(2n) {
   background-color: #99a9bf;
}
.abc{
  box-shadow: 0 2px 12px 0 rgba(54, 72, 90, 0.219);
  margin:10px;
  height:250px;
}
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .start_btn {
    width: 90%;
    margin-left:5%;
    font-size: 16px;
    background: -webkit-linear-gradient(left, #4587dd, rgb(41, 143, 211)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #4587dd, rgb(41, 143, 211)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #4587dd, rgb(41, 143, 211)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #4587dd, rgb(41, 143, 211)); /* 标准的语法 */
    margin-top:17px;
    margin-bottom: 10px;
  }
  .mess{
    margin-left: 40%;
    text-emphasis-color: black;
    margin-top:10px;
  }
  .link{
    margin-left: 10px;
    margin-right: 10px;
    padding-top:13px;
    height:40px;
    text-size-adjust: 20px;
    border-bottom:lightgray 1px solid;
    border-top:lightgray 1px solid;
    
  }
</style>
