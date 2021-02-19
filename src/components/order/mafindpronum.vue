<template>
  <div >
      <Managermenu></Managermenu>
      <el-row class="tac">
        <el-col :span="12" style="width:220px">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>菜单管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" ><el-button type="text" class="menu" @click="to('/manager/addproduct')">添加菜品</el-button></el-menu-item>
                        <el-menu-item index="1-2"><el-button type="text" class="menu" @click="to('/manager/findproduct')">查询菜品</el-button></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1"><el-button type="text" class="menu" @click="to('/mafindorder')">查看订单</el-button></el-menu-item>
                        <el-menu-item index="1-2"><el-button type="text" class="menu" @click="to('/maaffirmorder')">确认订单</el-button></el-menu-item>
                        <el-menu-item index="1-3"><el-button type="text" class="menu" @click="to('/mafindincome')">查看流水</el-button></el-menu-item>
                    <el-menu-item index="1-4"><el-button type="text" class="menu" @click="to('/mafindpronum')">查看菜品销量</el-button></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-col>
      </el-row>
      <div class="fform">
          <div >
              <el-radio v-model="radio" label="1" style='margin:10px 100px'>按日期查询</el-radio>
            <el-radio v-model="radio" label="2" style='margin:10px 100px'>按月查询</el-radio>
          </div>
            <div class="block" style="display:inline-block;margin-left:50px">
                <span class="demonstration">按日期查询</span>
                <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    :disabled="radio==1?false:true"
                    value-format='yyyy-MM-dd'>
                </el-date-picker>
            </div>
            <div class="block" style="display:inline-block;margin-left:30px">
                <span class="demonstration">按月查询</span>
                <el-date-picker
                v-model="value2"
                type="month"
                placeholder="选择月"
                :disabled="radio==2?false:true"
                value-format='yyyy-MM'>>
                </el-date-picker>
            </div>
            <el-form ref="form" :model="order" label-width="70px" class="elfo" style="display:inline-block">
            <el-form-item label="菜品名称" style="width:200px">
                <el-input v-model="order.name" class="inp"></el-input>
            </el-form-item>
        </el-form>
            <div style="display:inline-block;margin-left:20px">
                <el-button type="primary" plain style="width:100px;height:40px;" @click="onSubmit(radio)" >查询</el-button>
            </div>
        <div class="table" style="height:400px;overflow:scroll">
            <el-table
                :data="resul"
                border>
                <el-table-column
                prop="OrderID"
                label="订单ID"
                width="200">
                </el-table-column>
                <el-table-column
                prop="UserID"
                label="用户ID"
                width="200">
                </el-table-column>
                <el-table-column
                prop="ProductNum"
                label="菜品数量"
                width="200">
                </el-table-column>
                <el-table-column
                prop="OrderTime"
                label="下单时间"
                width="200">
                </el-table-column>
                <el-table-column
                prop="OrderClass"
                label="订单类型"
                width="190">
                </el-table-column>
            </el-table>
        </div>
        <div style="margin-top:450px;margin-left:50px">
            <div class="totalprice" >总销量：{{TotalNum}} 份</div>
        </div>
      </div>
  </div>
</template>

<script>
import Managermenu from '../public/managermenu'
export default {
  name: 'managerhome',
  components:{
    Managermenu
  },
  data() {
      return {
          radio:1,
          value1: '',
          value2: '',
          resul:[],
          TotalNum:'',
          order:{
              name:''
          }
      }
    },
    methods: {
        to(path){
          this.$router.push(path)
      },
      onSubmit(radio) {
        var _this=this
        if(radio==1){
            this.$http.post(this.HOST+'/findproinfbyday',{Date:this.value1,ProductName:this.order.name},{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })          
            .then(function(res){
                _this.resul=res.data
                var i=0
                for(i=0;i<_this.resul.length;i++){
                    if(_this.resul[i].OrderClass==1){
                        _this.resul[i].OrderClass='堂食'
                    }else if(_this.resul[i].OrderClass==2){
                        _this.resul[i].OrderClass='打包'
                    }else if(_this.resul[i].OrderClass==3){
                        _this.resul[i].OrderClass='外卖'
                    }
                }
            })
            this.$http.post(this.HOST+'/findprototalbyday',{Date:this.value1,ProductName:this.order.name},{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })          
            .then(function(res){
                _this.TotalNum=res.data[0].totalnum
            })
        }else if(radio==2){
            this.$http.post(this.HOST+'/findproinfbymon',{Date:this.value2,ProductName:this.order.name},{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })          
            .then(function(res){
                _this.resul=res.data
                var i=0
                for(i=0;i<_this.resul.length;i++){
                    if(_this.resul[i].OrderClass==1){
                        _this.resul[i].OrderClass='堂食'
                    }else if(_this.resul[i].OrderClass==2){
                        _this.resul[i].OrderClass='打包'
                    }else if(_this.resul[i].OrderClass==3){
                        _this.resul[i].OrderClass='外卖'
                    }
                }
            })
            this.$http.post(this.HOST+'/findprototalmon',{Date:this.value2,ProductName:this.order.name},{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })          
            .then(function(res){
                _this.TotalNum=res.data[0].totalnum
            })
        }
      },
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
.menu{
    color:rgb(196, 194, 194);
}
.tac{
    width:220px;
    display: inline-block;
    vertical-align:top;
}
.fform{
    display:inline-block;
    width:1200px;
    margin:10px;
    vertical-align:top;
}
.el-form-item{
    margin:10px;
}
.table{
    position:fixed;
    width:1200px;
    margin-top:10px;
    margin-left:50px;
}
</style>
