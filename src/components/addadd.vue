<template>
  <div>
        <el-page-header @back="goBack" content="新增地址" class='top'>
        </el-page-header>
        <el-form ref="form" :model="address" label-width="70px" class="elfo">
            <el-form-item label="联系人">
                <el-input v-model="address.Name" class="inp"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="address.phone" class="inp"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="address.Address" class="inp"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" plain style="margin-left:80px;width:80px" @click="save">保存</el-button>
        <el-button type="info" plain style="margin-left:50px;width:80px" @click="delet">取消</el-button>
  </div>
</template>

<script>
export default {
  name: 'Addedit',
  components:{
  },
  data(){
    return{
      address:{
        Name: '',
        phone:'',
        Address:''
      }
    }
  },
  methods: {
      goBack() {
         this.$router.go(-1);
      },
      save(){
        var _this=this
        this.$http.post(this.HOST+'/addressadd',{userid:document.cookie.split('userid=')[1],Name:this.address.Name,phone:this.address.phone,Address:this.address.Address},{
            headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
            }
        })          
          .then(function(res){
            if(res.data==1){
              _this.$message.success('添加成功')
              setTimeout(function(){
               _this.$router.push("/affirm/addresslist")
              }.bind(this),2000)
              
            }
        })
      },
      delet(){
          this.$router.push("/affirm/addresslist")
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
.inp{
  height: 40px;  
    width: 90%;  
    margin-right: 5%;  
    border: 0;  
    border-bottom: solid 1px lavender;
}
.elfo{
  margin-top:40px;
  margin-bottom:40px;
  color:rgb(30, 31, 31);
}
</style>
