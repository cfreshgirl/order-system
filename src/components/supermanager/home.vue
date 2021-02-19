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
            :data="userdata"
            border>
            <el-table-column
            prop="UserID"
            label="用户id"
            width="200">
            </el-table-column>
            <el-table-column
            prop="UserName"
            label="用户名"
            width="200">
            </el-table-column>
            <el-table-column
            prop="Password"
            label="密码"
            width="200">
            </el-table-column>
            <el-table-column
            prop="Role"
            label="用户类型"
            width="190">
            </el-table-column>
            <el-table-column
            label="操作"
            width="200">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="del(scope.row.UserID)" type="text" size="small">删除</el-button>
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
          userdata:[]
      }
    },
    created(){
        var _this=this
        this.$http.get(this.HOST+'/displayuser')          
          .then(function(res){ 
              _this.userdata=res.data
              var i=0
              for( i=0;i<_this.userdata.length;i++){
                  if(_this.userdata[i].Role==0){
                      _this.userdata[i].Role='普通用户'
                  }else if(_this.userdata[i].Role==1){
                      _this.userdata[i].Role='管理员'
                  }else if(_this.userdata[i].Role==2){
                      _this.userdata[i].Role='超级管理员'
                  }
              }
           })
    },
    methods: {
      to(path){
          this.$router.push(path)
      },
      edit(inf){
            this.$store.state.orderInf.supermanageruserinf=inf
            this.$router.push("/supermanager/useredit")
      },
      del(userid){
          var _this=this
          this.$http.post(this.HOST+'/userdel',{UserID:userid},{
            headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
            }
          })          
          .then(function(res){
              if(res.data==1){
                  _this.$message.success('删除成功')
              }else{
                  _this.$message.error('删除失败')
              }
        })
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
