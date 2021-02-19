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
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="菜品名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="菜品类别">
                <el-select v-model="form.class" placeholder="请选择菜品类别">
                <el-option label="家常小炒" value="家常小炒" style="margin-left:10px"></el-option>
                <el-option label="爆辣川菜" value="爆辣川菜" style="margin-left:10px"></el-option>
                <el-option label="饱腹主食" value="饱腹主食" style="margin-left:10px"></el-option>
                <el-option label="饭后甜点" value="饭后甜点" style="margin-left:10px"></el-option>
                <el-option label="可口饮品" value="可口饮品" style="margin-left:10px"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜品价格">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="图片地址">
                <el-input v-model="form.imgpath"></el-input>
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
            id:'',
            name: '',
            class: '',
            price: '',
            imgpath:''
        }
      }
    },
    created(){
            this.form.id=this.$store.state.orderInf.managerproinf.ProductID,
            this.form.name=this.$store.state.orderInf.managerproinf.ProductName,
            this.form.class= this.$store.state.orderInf.managerproinf.ProductClass,
            this.form.price= this.$store.state.orderInf.managerproinf.ProductPrice,
            this.form.imgpath=this.$store.state.orderInf.managerproinf.imgpath
    },
    methods: {
        to(path){
          this.$router.push(path)
      },
      onSubmit() {
          var _this=this
        this.$http.post(this.HOST+'/editproduct',{ProductID:this.form.id,ProductName:this.form.name,ProductClass:this.form.class,ProductPrice:this.form.price,imgpath:this.form.imgpath},{
            headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
            }
          })          
          .then(function(res){
              if(res.data==1){
                  _this.$message.success('修改成功')
                  setTimeout(function(){
                    _this.$router.push("/manager/")
                }.bind(this),2000)
              }else{
                  _this.$message.error('修改失败')
              }
          })
      },
      reset(){
          this.form.imgpath='',
          this.form.name='',
          this.form.class='',
          this.form.price=''
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
