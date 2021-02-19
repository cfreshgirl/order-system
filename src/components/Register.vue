<template>
  <div>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../assets/logo.png">
    </div>
    <div class="register_form">
      <input type="text"  class="qxs-ic_userid qxs-icon"  placeholder="用户ID" v-model="userID">
      <input type="text"  class="qxs-ic_user qxs-icon"  placeholder="用户名" v-model="userName">
      <input type="text"  class="qxs-ic_password qxs-icon"  placeholder="密码" v-model="password">
      <!--<button class="login_btn el-button el-button&#45;&#45;primary is-round" type="primary" round>登录</button>-->
      <el-button class="login_btn" @click.native="Register" type="primary" round :loading="isBtnLoading">注册</el-button>
      <div style="margin-top: 10px">
        <router-link style="text-align:center;color: rgb(92, 107, 110);text-decoration: none;" to="/Login">返回登录</router-link>
      </div>
    </div>
  </div>
</template>
 
 
 
<script>
//  import { userLogin } from '../../api/api';
 
  export default {
    name:'Register',
    data() {
      return {
        userID:'',
        userName: '',
        password: '',
        isBtnLoading: false
      }
    },
    created () {
      if(JSON.parse( localStorage.getItem('user')) && JSON.parse( localStorage.getItem('user')).userName){
        this.userID = JSON.parse( localStorage.getItem('user')).userID;
        this.userName = JSON.parse( localStorage.getItem('user')).userName;
        this.password = JSON.parse( localStorage.getItem('user')).password;
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '注册中...';
        return '注册';
      }
    },
    methods: {
      Register() {
        if (!this.userName) {
          this.$message.error('请输入用户名');
          return;
        }
        if (!this.userID) {
          this.$message.error('请输入用户id');
          return;
        }
        if (!this.password) {
          this.$message.error('请输入密码');
          return;
        }
        let _this=this
        this.$http.post(this.HOST+'/register',{userName:this.userName,userID:this.userID,password:this.password},{
            headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
            }
          })          //可以带cookie的认证
          .then(function(res){
            /*接口的传值是(-1,该用户id已经存在)*/
            if(res.data == -1) {
              _this.$message.error('该用户id已存在，请重新输入')
              setTimeout(function(){
                _this.$router.go(0)
              }.bind(this),2000)
            }
            else if(res.data == 0){
              _this.$message.success('注册成功')
              setTimeout(function(){
                _this.$router.push('/login')
              }.bind(this),2000)
            }
        })
      }
    }
  }
</script>
<style scoped>
  .register_form {
    padding-top: 30%;
    padding-left: 10%;
    padding-right: 10%;
  }
  .qxs-ic_userid {
    background: url("../assets/login/icon_userid.png") no-repeat;
    background-size: 23px 23px;
    background-position: 0;
  }
  .qxs-ic_user {
    background: url("../assets/login/icon_username.png") no-repeat;
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
    top: 50%;
    height: 100%;
  }
  .login_btn {
    width: 100%;
    font-size: 16px;
    background: -webkit-linear-gradient(left, #0e69e0, rgb(41, 143, 211)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #0e69e0, rgb(41, 143, 211)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #0e69e0, rgb(41, 143, 211)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #0e69e0 , rgb(41, 143, 211)); /* 标准的语法 */
    filter: brightness(1.4);
  }
</style>
