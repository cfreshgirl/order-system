<template>
  <div>
    <Top></Top>
      <div class="address">
        <div class="ad">
          <div style="display:inline-block ;margin:15px 100px 15px 10px">{{ address.Name }}</div>
            <div style="display:inline-block;margin:15px 0px 15px 0px">{{ address.phone }}</div>
            <div style="margin:0px 0px 15px 10px">{{ address.Address }}</div>
            </div>
            <div class="ed">
              <el-button type="primary" icon="el-icon-edit" size="mini" :disabled="this.$store.state.orderInf.orderclass==3?false:true" @click="choose" ></el-button>
            </div>
      </div>
      <div class="menu">
        <ul>
          <li v-for="pro in this.$store.state.orderInf.oinf" :key="pro.proname">
            <div class="pic">
              <a href="">
                <img v-bind:src="require('../assets/img/'+ pro.proimg + '.png')" alt="" width="130px" height="90px">
              </a>
            </div>
            <div class="main">
              <div>
                <div class="name" >
                  {{pro.proname}} 
                </div>
                <div class="oprice">
                  ￥{{pro.proprice*pro.pronum}}
                </div>
              </div>
              <div class="price">￥{{pro.proprice}}</div>
              <div class="num">×{{pro.pronum}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="dabaofei" >
        <div>打包费：{{dabaofei}}元</div>
        <div>配送费：{{peisongfei}}元</div>
      </div>
      <div class="end">
        <div class="totalprice">
            <div>合计：</div>
            <div style="color:red;margin-left:30px">￥{{totalprice}}</div>
        </div>
        <el-button class="affirm_btn" @click="submit" type="primary" round :disabled="totalprice==0?true:false">
          付款
        </el-button>
    </div>
  </div>
</template>

<script>
import Top from './public/top'
export default {
  name: 'Affirm',
  components:{
    Top
  },
  data(){
    return{
      address:{
        Name:(this.$store.state.orderInf.addinf.ContactPerson==undefined?'请选择地址':this.$store.state.orderInf.addinf.ContactPerson),
        phone:this.$store.state.orderInf.addinf.phone,
        Address:this.$store.state.orderInf.addinf.Address,
        AddressID:(this.$store.state.orderInf.orderclass==3?this.$store.state.orderInf.addinf.AddressID:null)
      },
      value:'',
      totalprice:this.$store.state.orderInf.totalprice,
      dabaofei:(this.$store.state.orderInf.orderclass==1?0:5),
      peisongfei:(this.$store.state.orderInf.orderclass==3?6:0),
    }
  },
  methods:{
    choose(){
      this.$router.push("/affirm/addresslist")
      this.$store.state.orderInf.chooseadd=1
    },
    transfer(){
      var time=new Date()
      return time.getFullYear().toString()+'-'+(time.getMonth()+1).toString()+'-'+time.getDate().toString()+' '+time.getHours().toString()+':'+time.getMinutes().toString()+':'+time.getSeconds().toString()
    },
    submit(){
      let _this=this
      this.$http.post(this.HOST+'/submit',{userID:document.cookie.split('userid=')[1],OrderPrice:this.totalprice,OrderTime:this.transfer(),OrderState:'not pay',AddressID:this.address.AddressID,OrderClass:this.$store.state.orderInf.orderclass,OrderDetails:this.$store.state.orderInf.oinf},{
          headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
          })          
          .then(function(res){       
            if(res.data==1){
              _this.$message.success('提交订单成功')
              _this.$store.state.orderInf.orderclass=''
              _this.$store.state.orderInf.oinf=[]
              _this.$store.state.orderInf.addinf=''
              _this.$store.state.orderInf.totalprice=0
              setTimeout(function(){
               _this.$router.push("/menu")
              }.bind(this),2000)
            }else{
              _this.$message.error("提交失败")
              setTimeout(function(){
               _this.$router.push("/menu")
              }.bind(this),2000)
            }
            
      })
    }
  }
}
</script>

<style scoped>
.address{
  margin:10px;
  height:100px;
  box-shadow: 0 2px 12px 0 rgba(54, 72, 90, 0.219);
}
.ad{
  vertical-align:middle;
  display:inline-block;
}
.ed{
  vertical-align:middle;
  display: inline-block;
  position: fixed;
  top:70px;
  right:20px;
}
.menu{
  box-shadow: 0 2px 12px 0 rgba(54, 72, 90, 0.219);
  height:400px;
  margin-left:2.5%;
  margin-bottom:10px;
  width: 95%;
  overflow: scroll;
}
.dabaofei{
  box-shadow: 0 2px 12px 0 rgba(54, 72, 90, 0.219);
  height:60px;
  margin:0 10px 10px 10px;
}
.dabaofei div{
  display: inline-block;
  margin:20px 40px 10px 40px;
}
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
    display: inline-block;
    vertical-align:middle;
}
.oprice{
  display: inline-block;
  font-size: 15px;
  margin-left: 55px;
  vertical-align:middle;
}
.price{
    display: inline-block;
    margin-right: 10px;
    vertical-align:bottom;
}
.num{
  display:inline-block;
  color:rgb(3, 103, 143);
  font-family: "楷体";
  font-size:13px;
  vertical-align:bottom;
}
ul,li{
  list-style: none;
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
</style>
