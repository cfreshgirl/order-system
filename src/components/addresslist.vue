<template>
  <div>
    <el-page-header @back="goBack" content="我的收货地址" class='top'>
    </el-page-header>
    <ul>
        <!--遍历从后台传回来的数据，然后输出到菜单页面-->
        <li v-for="add in address" :key="add.AddressID">
            <button style="padding:0px; border: 0; background-color: transparent; outline: none;" @click="selectadd(add.AddressID)" :disabled='chooseadd==0?true:false'>
                <img src="../assets/img/address.png" alt="" width="30px" style="display:inline-block;margin-right:15px">
                <div class="add-box" style="display:inline-block;" >
                    <div style="margin-left:10px;margin-right:80px;display:inline-block">{{ add.ContactPerson }}</div>
                    <div style="display:inline-block">{{ add.phone }}</div>
                    <div style="margin-left:0px">{{ add.Address }}</div>
                </div>
            </button>
            <div class="edit-btn" @click="edit(add.AddressID)" style="position:absolute;right:20px;padding-top:22px">
                <el-button type="primary" icon="el-icon-edit" size="mini" ></el-button>
            </div>
        </li>
    </ul>
    <div class="add">
        <el-button type="primary" style="margin:10px;width:350px" @click="addadd">添加地址</el-button>
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
      },
      value:'',
      chooseadd:this.$store.state.orderInf.chooseadd
    }
  },
  created(){
    if(this.$store.state.orderInf.orderclass==3){
      
    }
    var _this=this
    //从后台获取地址用户接口
    this.$http.post(this.HOST+'/address',{Userid:document.cookie.split('userid=')[1]},{
            headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
            }
          })          
          .then(function(res){
              _this.address=res.data
        })
  },
  methods: {
      goBack() {
         this.$router.push('/mine');
      },
      edit(addid){
          var i=0
          for(i=0;i<this.address.length;i++){
              if(this.address[i].AddressID==addid){
                  this.$store.state.orderInf.addinf=this.address[i];
                  console.log(this.address[i])
              }
          }
          this.$router.push('/addedit')
      },
      selectadd(addid){
          var i=0
          for(i=0;i<this.address.length;i++){
              if(this.address[i].AddressID==addid){
                  this.$store.state.orderInf.addinf=this.address[i];
                  console.log(this.address[i])
            }
          }
          this.$router.push('/affirm')
      },
      addadd(){
          this.$router.push('/addadd')
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
.add-box{
    border-radius: 5px;
    margin:20px 10px;
    vertical-align:middle;
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
