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
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户ID">
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="用户权限">
                <el-select v-model="form.role" placeholder="请选择用户权限">
                <el-option label="普通用户" value="0" style="margin-left:10px"></el-option>
                <el-option label="餐厅管理员" value='1' style="margin-left:10px"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain style="margin-left:100px;width:100px;height:40px" @click="onSubmit" >提交</el-button>
                <el-button  plain style="margin-left:200px;width:100px;height:40px" @click="reset">重置</el-button>
            </el-form-item>
            </el-form>
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
          id: '',
          name: '',
          password: '',
          role:''
        }
      }
    },
    methods: {
        to(path){
          this.$router.push(path)
      },
      onSubmit() {
          var _this=this
        this.$http.post(this.HOST+'/adduser',{UserID:this.form.id,UserName:this.form.name,Password:this.form.password,Role:this.form.role},{
            headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
            }
          })          
          .then(function(res){
              if(res.data==1){
                  _this.$message.success('添加成功')
                  setTimeout(function(){
                    _this.$router.push("/supermanager")
                    }.bind(this),2000)
              }else if(res.data==-1){
                  _this.$message.error('用户ID已存在，请更换')
              }else{
                  _this.$message.error('添加失败')
              }
          })
      },
      reset(){
          this.form.role='',
          this.form.name='',
          this.form.id='',
          this.form.password=''
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
    margin:50px;
    vertical-align:top;
}
.el-form-item{
    margin:50px;
}
.el-button{
    size: 50px;
}
</style>
