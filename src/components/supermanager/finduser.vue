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
      <div class="fform">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="请输入用户id" style="display:inline-block;">
                <el-input v-model="form.id" style="width:130px"></el-input>
            </el-form-item>
            <el-form-item label="请输入用户名" style="display:inline-block;">
                <el-input v-model="form.name" style="width:130px"></el-input>
            </el-form-item>
            <el-form-item style="display:inline-block;">
                <el-button type="primary" plain style="width:100px;height:40px" @click="onSubmit" >查询</el-button>
            </el-form-item>
            </el-form>
      <div class="table">
          <el-table
            :data="resul"
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
                    <el-button @click="del(scope.row.ProductID)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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
          form: {
          name: '',
          id: ''
          },
          resul:[]
      }
    },
    methods: {
        to(path){
          this.$router.push(path)
      },
      onSubmit() {
        var _this=this
        this.$http.post(this.HOST+'/finduser',{UserID:this.form.id,UserName:this.form.name},{
            headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
            }
          })          
          .then(function(res){
              _this.resul=res.data
              var i=0
              for( i=0;i<_this.resul.length;i++){
                  if(_this.resul[i].Role==0){
                      _this.resul[i].Role='普通用户'
                  }else if(_this.resul[i].Role==1){
                      _this.resul[i].Role='管理员'
                  }else if(_this.resul[i].Role==2){
                      _this.resul[i].Role='超级管理员'
                  }
              }
          })
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
      edit(inf){
            this.$store.state.orderInf.managerproinf=inf
            this.$router.push("/manager/editproduct")
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
    width:800px;
    margin:10px;
    vertical-align:top;
}
.el-form-item{
    margin:10px;
}
.table{
    position:fixed;
    width:1200px;
    margin:30px;
    margin-top:10px;
    margin-left:50px;
}
</style>
