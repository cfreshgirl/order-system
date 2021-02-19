<template>
  <div>
    <el-page-header @back="goBack" content="我的订单" class='top'>
    </el-page-header>
    <ul>
        <!--遍历从后台传回来的数据，然后输出到菜单页面-->
        <li v-for="ord in order" :key="ord.orderID">
            <div class="ord" >
                <img v-bind:src="require('../assets/img/'+ ord.imgpath + '.png')" alt="" width="130px" style="display:inline-block;margin-right:15px">
                <div class="main">
                    <div>
                        <div class="name" >{{ord.ProductName}}</div>
                        <div class="state">{{ord.OrderState}}</div>
                    </div>
                    <div class="abcd">
                        <div class="price">{{ord.ProductPrice}}    x</div>
                        <div class="num"> {{ord.ProductNum}}份</div>
                        <div class="time">{{ord.OrderTime}}</div>
                    </div>
                    <div class="class">{{ord.OrderClass==1?'堂食':(ord.OrderClass==2?'打包':'外卖')}}</div>
                </div>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'myorder',
  components:{
  },
  data(){
    return{
      order:'',
    }
  },
  created(){
      var _this=this
    this.$http.post(this.HOST+'/orderbyid',{UserID:document.cookie.split('userid=')[1]},{
            headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
            }
          })          
          .then(function(res){
              _this.order=res.data
        })
  },
  methods:{
      goBack() {
         this.$router.go(-1);
      },
  }
}
</script>

<style scoped>
.top{
    background: -webkit-linear-gradient(left, #4587dd, rgb(41, 143, 211));
    margin-bottom:10px;
    height:28px;
}
li{
    list-style: none;
    margin-bottom:10px;
    box-shadow: 0 2px 12px 0 rgba(54, 72, 90, 0.219);
    width:97%;
}
ul{
    padding-left:10px;
    height:550px;
}
.ord{
    border-radius: 5px;
    margin:10px 5px;
    vertical-align:middle;
}
.main{
    display: inline-block;
    vertical-align:middle;
    margin:5px ;
    font-size: 15px;
}
.name{
    display: inline-block;
    vertical-align:middle;
}
.class{
    display: inline-block;
    vertical-align:middle;
    margin-left:30px;
}
.state{
    display: inline-block;
    vertical-align:middle;
    margin-left:50px;
    
    font-size: 15px;
    color:rgb(91, 133, 158);
}
.abcd{
    display: inline-block;
    vertical-align:middle;
}
.price{
    display: inline-block;
    vertical-align:middle;
}
.num{
    display: inline-block;
    vertical-align:middle;
    font-size: 12px;
    color:rgb(31, 98, 138);
    margin-left:10px;
}
.time{
    font-size: 10px;
    width:100px;
    margin-right: 0px;
   
}
img{
    vertical-align:middle;
}
button{
    vertical-align:middle;
}
.edit-btn{
    display:inline-block;
    vertical-align:middle;
}
</style>
