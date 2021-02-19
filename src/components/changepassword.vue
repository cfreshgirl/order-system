<template>
  <div >
    <el-page-header @back="goBack" content="修改密码" class='top'>
    </el-page-header>
    <div class="middle">
      <el-form :model="pass"  :label-position="'right'" label-width="80px">
        <el-form-item label="旧密码">
            <el-input type="password" v-model="pass.old"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
            <el-input type="password" v-model="pass.new"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
            <el-input type="password" v-model="pass.check"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-form>
        <el-form-item>
            <el-button type="primary" @click="submit()" style="margin-left:80px;margin-top:50px">提交</el-button>
            <el-button @click="reset()" style="margin-left:60px;margin-top:50px">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Changepassword',
  data() {
      return {
        pass: {
          old:'',
          new: '',
          check: ''
        }
      }
    },
    methods: {
        goBack() {
         this.$router.go(-1);
      },
      submit() {
        var _this=this
        console.log(this.pass.old)
        if(this.pass.old==''){
             _this.$message.error('请输入密码')
             return
        }
        if(this.pass.new!=this.pass.check){
            _this.$message.error('两次密码输入不一致，请重新输入')
        }else{
            this.$http.post(this.HOST+'/passwordchange',{OldPassword:this.pass.old,UserID:document.cookie.split('userid=')[1],Password:this.pass.new},{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })          
            .then(function(res){
               if(res.data=='0'){
                   _this.$message.error('密码不正确')
               }else if(res.data=='1'){
                   _this.$message.success('密码修改成功，请重新登录')
                   var d = new Date();                                                     //删除cookie值
                    d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000));
                    var expires = "expires=" + d.toUTCString();
                    document.cookie = "username" + "=" + ""  + "; " + expires;
                    document.cookie = "userid" + "=" + ""  + "; " + expires;
                   setTimeout(function(){
                        _this.$router.push("/login")
                    }.bind(this),1000)
               }
            })
        }
      },
      reset(formName) {
        this.pass.old='';
        this.pass.new='';
        this.pass.check='';
      }
    }
  }
</script>

<style scoped>
.top{
    background: -webkit-linear-gradient(left, #4587dd, rgb(41, 143, 211));
    height:28px;
    margin-bottom:10px;
}
.middle{
    margin-left:10px;
    margin-right:10px;
    margin-top: 40px;
    box-shadow: 0 2px 12px 0 rgba(54, 72, 90, 0.219);
    padding:10px 0;
}
.el-input{
    width:270px;
}
</style>
