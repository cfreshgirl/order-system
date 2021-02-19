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
                        <span>菜品管理</span>
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
      <div class="table">
          <el-table
            :data="productdata"
            border>
            <el-table-column
            prop="ProductID"
            label="菜品id"
            width="200">
            </el-table-column>
            <el-table-column
            prop=""
            label="菜品图片"
            width="200">
                <template slot-scope="scope">
                    <img :src="require('../../assets/img/'+scope.row.imgpath+'.png')" alt="" width="175" height="140">
                </template>
            </el-table-column>
            <el-table-column
            prop="ProductName"
            label="菜名"
            width="200">
            </el-table-column>
            <el-table-column
            prop="ProductPrice"
            label="菜品价格  （元/份）"
            width="200">
            </el-table-column>
            <el-table-column
            prop="ProductClass"
            label="菜品种类"
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
          productdata:[]
      }
    },
    created(){
        var _this=this
        this.$http.get(this.HOST+'/displaymenu')          
          .then(function(res){ 
              _this.productdata=res.data
              var i=0
              for( i=0;i<_this.productdata.length;i++){
                  
                  if(_this.productdata[i].imgpath==null){
                      _this.productdata[i].imgpath='logo'
                  }
              }
           })
    },
    methods: {
      to(path){
          this.$router.push(path)
      },
      del(proid){
          var _this=this
          this.$http.post(this.HOST+'/prodel',{ProductID:proid},{
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
.table{
    display:inline-block;
    width:1200px;
    margin:30px;
    vertical-align:top;
}
</style>
