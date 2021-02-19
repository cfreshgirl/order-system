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
                        <span >用户管理</span>
                    </template>
                     <el-menu-item-group>
                        <el-menu-item index="1-1"><el-button type="text" class="menu" @click="to('/supermanager/finduser')">查找用户</el-button></el-menu-item>
                        <el-menu-item index="1-2"><el-button type="text" class="menu" @click="to('/supermanager/adduser')">添加用户</el-button></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1"><el-button type="text" class="menu" @click="to('/sufindorder')">查看订单</el-button></el-menu-item>
                        <el-menu-item index="1-2"><el-button type="text" class="menu" @click="to('/suaffirmorder')">确认订单</el-button></el-menu-item>
                        <el-menu-item index="1-3"><el-button type="text" class="menu" @click="to('/sufindincome')">查看流水</el-button></el-menu-item>
                        <el-menu-item index="1-4"><el-button type="text" class="menu" @click="to('/sufindpronum')">查看菜品销量</el-button></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-col>
      </el-row>
      <div class="table">
          <el-table
            :data="orderdata"
            border>
            <el-table-column
            prop="OrderID"
            label="订单id"
            width="160">
            </el-table-column>
            <el-table-column
            prop="UserID"
            label="用户ID"
            width="170">
            </el-table-column>
            <el-table-column
            prop="OrderPrice"
            label="订单价格"
            width="170">
            </el-table-column>
            <el-table-column
            prop="OrderTime"
            label="下单时间"
            width="190">
            </el-table-column>
             <el-table-column
            prop="OrderClass"
            label="订单类型"
            width="170">
            </el-table-column>
            <el-table-column
            prop="OrderState"
            label="订单状态"
            width="170">
            </el-table-column>
            <el-table-column
            label="操作"
            width="160">
                <template slot-scope="scope">
                    <el-button @click="affirm(scope.row)" type="text" size="small">完成</el-button>
                    <el-button @click="del(scope.row)" type="text" size="small">取消</el-button>
                </template>
            </el-table-column>
        </el-table>
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
          orderdata:[]
      }
    },
    created(){                                 
        var _this=this
        this.$http.get(this.HOST+'/displayorder')          
          .then(function(res){ 
              _this.orderdata=res.data
              var i=0
              for( i=0;i<_this.orderdata.length;i++){
                  if(_this.orderdata[i].OrderClass==1){
                      _this.orderdata[i].OrderClass='堂食'
                  }else if(_this.orderdata[i].OrderClass==2){
                      _this.orderdata[i].OrderClass='打包'
                  }else if(_this.orderdata[i].OrderClass==3){
                      _this.orderdata[i].OrderClass='外送'
                  }
              }
           })
    },
    methods: {
      to(path){
          this.$router.push(path)
      },
      affirm(inf){
          var _this=this
            if(inf.OrderState=='not pay'){
                _this.$message.error('顾客还未确认，不能支付')
            }else if(inf.OrderState=='pay'){
                this.$http.post(this.HOST+'/orderedstate',{OrderID:inf.OrderID,OrderState:'complete'},{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                })          
                .then(function(res){
                    if(res.data==1){
                        _this.$message.success('确认订单成功')
                    }else{
                        _this.$message.error('确认订单失败')
                    }
                })
            }
      },
      del(inf){
          var _this=this
          this.$http.post(this.HOST+'/orderedstate',{OrderID:inf.OrderID,OrderState:'cancel'},{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                })          
                .then(function(res){
                    if(res.data==1){
                        _this.$message.success('取消订单成功')
                    }else{
                        _this.$message.error('取消订单失败')
                    }
                })
          if(inf.OrderState=='pay'){
                //退钱操作
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
.table{
    display:inline-block;
    width:1200px;
    margin:30px;
    vertical-align:top;
}
</style>
