<template>
  <div>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../assets/logo.png">
    </div>
    <div class="login_form">
      <input type="text"  class="qxs-ic_user qxs-icon"  placeholder="用户ID" v-model="userID">
      <input type="password"  class="qxs-ic_password qxs-icon"  placeholder="密码" v-model="password">
      <!--<button class="login_btn el-button el-button&#45;&#45;primary is-round" type="primary" round>登录</button>-->
      <el-button class="login_btn" @click.native="login" type="primary" round :loading="isBtnLoading">登录</el-button>
      <div style="margin-top: 10px">
        <router-link style="float: left;color: rgb(92, 107, 110);text-decoration:none" to="/Register">注册</router-link><span style="float: right;color: rgb(92, 107, 110)">忘记密码？</span>
      </div>
    </div>
  </div>
</template>
 
 
 
<script>
//  import { userLogin } from '../../api/api';
 
  export default {
    data() {
      return {
        userID: '',
        password: '',
        isBtnLoading: false
      }
    },
    created () {
      if(JSON.parse( localStorage.getItem('user')) && JSON.parse( localStorage.getItem('user')).userID){
        this.userID = JSON.parse( localStorage.getItem('user')).userID;
        this.password = JSON.parse( localStorage.getItem('user')).password;
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      }
    },
    methods: {
      login() {
        if (!this.userID) {
          this.$message.error('请输入用户ID');
          return;
        }
        if (!this.password) {
          this.$message.error('请输入密码');
          return;
        }
        let _this=this
        this.$http.post(this.HOST+'/login',{userID:this.userID,password:this.password},{
            headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
            }
          })          //可以带cookie的认证
          .then(function(res){
            console.log(res)
            /*接口的传值是(-1,该用户不存在)*/
            if(res.data == -1) {
              _this.$message.error('该用户不存在，请重新输入')
              setTimeout(function(){
                _this.$router.go(0)
              }.bind(this),2000)
            }
            else if(res.data == 0){
              _this.$message.error('密码错误，请重新输入')
              setTimeout(function(){
                _this.$router.go(0)
              }.bind(this),2000)
            }
            else if(res.data == 'common-user'){
              _this.$message.success('登录成功')
              setTimeout(function(){
                _this.$router.push("/")
              }.bind(this),2000)
            }
            else if(res.data == 'common-user'){
              _this.$message.success('登录成功')
              setTimeout(function(){
                _this.$router.push("/")
              }.bind(this),2000)
            }else if(res.data == 'manager'){
              _this.$message.success('登录成功')
              setTimeout(function(){
                _this.$router.push("/manager/")
              }.bind(this),2000)
            }else if(res.data == 'super manager'){
              _this.$message.success('登录成功')
              setTimeout(function(){
                _this.$router.push("/supermanager/")
              }.bind(this),2000)
            }
        })
      },
    }
  }
</script>
<style scoped>
  .login_form {
    padding-top: 30%;
    padding-left: 10%;
    padding-right: 10%;
  }
  .qxs-ic_user {
    background: url("../assets/login/icon_userid.png") no-repeat;
    background-size: 23px 23px;
    background-position: 0;
  }
  .qxs-ic_password {
    background: url("../assets/login/icon_password.png") no-repeat;
    background-size: 23px 23px;
    background-position: 0;
    margin-bottom: 20px;
  }
  .login_logo {
    top:50%;
    height: 100%;
  }
  .login_btn {
    width: 95%;
    font-size: 16px;
    background: -webkit-linear-gradient(left, #0e69e0, rgb(41, 143, 211)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #0e69e0, rgb(41, 143, 211)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #0e69e0, rgb(41, 143, 211)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #0e69e0 , rgb(41, 143, 211)); /* 标准的语法 */
    filter: brightness(1.4);
  }
</style>
