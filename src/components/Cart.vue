<template>
  <div >
    <Top></Top>
    <div class="cart">
        <ul>
            <li v-for="pro in this.$store.state.orderInf.oinf" :key="pro.proname">
                <div class="pic">
                    <a href="">
                        <img v-bind:src="require('../assets/img/'+ pro.proimg + '.png')" alt="" width="130px" height="90px">
                    </a>
                </div>
                <div class="main">
                    <div class="name" >
                      {{pro.proname}} 
                      <button  circle style="padding:0px; border: 0; background-color: transparent; outline: none; margin-left:100px" @click="del(pro.proname)">
                            <img src="../assets/img/delete.png" alt="" width="25px">
                        </button>
                    </div>
                    <div class="price">￥{{pro.proprice}}</div>
                    <!--购物车数量的加减-->
                    <div class="box">            
                      <ul id="num">                         
                        <li>
                          <button v-on:click="pro.pronum<=0?0:pro.pronum-=1;totalprice-=pro.proprice">-</button>
                        </li>                
                        <li>
                          <input type="text" value="0" size="1" v-model="pro.pronum">
                        </li>                
                        <li>
                          <button v-on:click="pro.pronum+=1;totalprice+=pro.proprice">+</button>
                        </li>         
                      </ul>  
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="total">
          <div class="totalprice">
            <div>合计：</div>
            <div style="color:red;margin-left:30px">￥{{totalprice}}</div>
          </div>
          <el-button class="affirm_btn" @click="drawer = true" type="primary" round :disabled="totalprice==0?true:false">
            确认订单
          </el-button>
          <el-drawer
            title="请选择您的就餐方式"
            :visible.sync="drawer"
            :direction="'btt'"
            style="margin-bottom:10px">
            <el-radio v-model="radio" label="1" border style="margin:0 10px 0 10px; padding:5px 10px 0px 10px;height:30px">店内就餐</el-radio>
            <el-radio v-model="radio" label="2" border style="margin:0 10px 0 10px; padding:5px 10px 0px 10px;height:30px">打包带走</el-radio>
            <el-radio v-model="radio" label="3" border style="margin:0 10px 0 10px; padding:5px 10px 0px 10px;height:30px">外卖配送</el-radio>
            <el-button class="submit_btn" @click="submit" type="primary" style="margin: 5px 16px 0 16px; width:350px" round >
              提交订单
            </el-button>
          </el-drawer>
        </div>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Bottom from './public/bottom'
import Top from './public/top'
export default {
  name: 'Cart',
  components:{
    Bottom,
    Top
  },
  data(){
    return{
      drawer: false,
      totalprice:0,
      radio:1
    }
  },
  mounted(){
    this.totalprice=0
    var i=0;
    for(i=0;i<this.$store.state.orderInf.oinf.length;i++){
      this.totalprice+=(this.$store.state.orderInf.oinf[i].proprice*this.$store.state.orderInf.oinf[i].pronum)
    }
    for(i=0;i<this.$store.state.orderInf.oinf.length;i++){
      if (0==this.$store.state.orderInf.oinf[i].pronum){
        this.$store.state.orderInf.oinf.splice(i,1)
      }
    }
  },
  methods:{
    del(name){
      var i=0;
      for(i=0;i<this.$store.state.orderInf.oinf.length;i++){
        if (name==this.$store.state.orderInf.oinf[i].proname){
          this.totalprice-=(this.$store.state.orderInf.oinf[i].proprice*this.$store.state.orderInf.oinf[i].pronum)
          this.$store.state.orderInf.oinf.splice(i,1)
        }
      }
    },
    submit(){
      this.$store.state.orderInf.orderclass=this.radio
      if(this.radio==2){
        this.totalprice+=5;   //加五元打包费
        
      }else if(this.radio==3){
        this.totalprice+=11;        //五元打包费和6元配送费
      }
      this.$router.push("/affirm")
      this.$store.state.orderInf.totalprice=this.totalprice
    }
  }
}
</script>

<style scoped>
.cart{
    height:530px;
    border-top:solid 0.5px #494c4e;
    overflow: scroll;
    padding:0px;
}
ul{
    padding: 0px;
    margin:0px;
}
li{
    margin-top:3px;
    list-style: none;
    border-bottom: solid 0.5px #494c4e;
}
div{
    vertical-align: top;
}
.pic{
    border-radius: 10px;
    display: inline-block;
    margin-right: 10px;
}
.pic a img{
  margin-left:10px;
  border-radius: 5px;
}
.main{
    display: inline-block;
    margin-top: 0px;
}
.name{
    margin-top: 15px;
    margin-bottom:15px;
    color: #4587dd;
    font-weight:bolder;
    font-size: larger;
}
.price{
    display: inline-block;
    margin-right: 35px;
}
ul,li{
  list-style: none;
}
.box{
  display: inline-block;
  margin-left:50px;
}
input{
  text-align: center;
}
#num li{
  float: left;
}
.total{
  position: relative;;
  
}
.totalprice{
  display: inline-block;
  margin-right: 20px;
}
.affirm_btn {
    display:inline-block;
    width: 75%;
    font-size: 16px;
    height:40px;
    background: -webkit-linear-gradient(left, #0e69e0, rgb(41, 143, 211)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #0e69e0, rgb(41, 143, 211)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #0e69e0, rgb(41, 143, 211)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #0e69e0 , rgb(41, 143, 211)); /* 标准的语法 */
    filter: brightness(1.4);
  }
  .el-drawer__header{
    margin-bottom:20px;
  }
</style>
