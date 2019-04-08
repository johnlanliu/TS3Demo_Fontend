<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">Anytrek Management System
        <v-version></v-version>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input
            placeholder="username"
            prefix-icon="el-icon-lx-people"
            v-model="ruleForm.username"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            prefix-icon="el-icon-lx-lock"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">Login</el-button>
        </div>
        <div class="forgot-password">
          <el-button type="text" @click="$router.push({path:'/findPwd'})">Forgot Password</el-button>
        </div>
        <!--<p class="login-tips">Tips : </p>-->
      </el-form>
    </div>
    <div class="bgpic">
      <img class="truck1" src="static/img/login/ic_truck.png"/>
      <img class="truck2" src="static/img/login/ic_truck2.png"/>
      <img class="truck3" src="static/img/login/ic_truck3.png"/>
    </div>
  </div>
</template>

<script>
  import {login, authToken} from '@/api/getData';
  import vVersion from '@/components/common/Version.vue';
  import { exceptionUtil } from '@/utils/exceptionUtil.js';
  import {mapMutations, mapState} from 'vuex';

  export default {
    mixins: [exceptionUtil],
    components: {
      vVersion
    },
    data: function(){
      return {
        loading: false,
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [{
            required: true,
            message: 'Please enter your account',
            trigger: 'blur'
          }],
          password: [
            {
              required: true,
              message: 'Please enter your password',
              trigger: 'blur'
            }
          ]
        }
      };
    },
    mounted() {
      this.showLogin = true;
    },

    methods: {
      ...mapMutations([
        'saveLoginData'
      ]),

      submitForm(formName) {
        this.$refs[formName].validate(async valid => {
          // 增加loading状态防止重复提交
          this.loading = true;
          if (valid) {
            this.login(this.ruleForm.username, this.ruleForm.password);
          } else {
            this.$message.error(
              'Invalid user name entered or password is incorrect.'
            );
            this.loading = false;
            return false;
          }
        });
      },
      async login(username, password) {
        const result = await login({user: username, psw: password});
        this.loading = false;
        if (result && !result.errorCode) {
          this.$message.success('Login Success!');
          result.validOrgTypes = result.validOrgTypes ? JSON.parse(result.validOrgTypes) : [];
          result.validUserTypes = result.validUserTypes ? JSON.parse(result.validUserTypes) : [];
          this.saveLoginData(result);
          this.$router.push('/');
        } else {
          // 错误处理
          this.exceptionHandle(result.errorCode);
        }
      }
    }
    // watch: {
    // }
  };
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-repeat: repeat-x;
    /*background-position-y: 300px;*/
    background-color: #2e3c5c;
    background-image: url('../../assets/login/login-bg.jpg');
    background-position: bottom;
    padding-top: 40px;
    overflow: hidden;
  }

  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
  }

  .ms-content {
    padding: 30px 30px;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }

  .login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
  }

  /*背景动画*/
  .bgpic {
    position: fixed;
    bottom: 0px;
    height: 128px;
    width: 100%;
    margin: auto;
    background-repeat: no-repeat;
    background-size: 100%;
  }

  .truck1, .truck2, .truck3 {
    overflow: hidden;
    position: relative;
    display: block;
    margin: 0 auto;
  }

  .truck1 {
    /*background:url('../../assets/login/ic_truck.png');*/
    /*background-repeat:no-repeat;*/
    /*width:86px;*/
    height: 22px;
    margin-top: -15px;
    -webkit-animation: truckmove1 10s infinite linear;
    -webkit-animation-delay: 1s;
    animation: truckmove1 10s infinite linear;
    animation-delay: 1s;
    position: fixed;
    bottom: 45px;
    left: 25%;
  }

  .truck2 {
    height: 32px;
    opacity: 0;
    margin-top: -15px;
    -webkit-animation: truckmove2 12s infinite linear;
    -webkit-animation-delay: 1s;
    animation: truckmove2 12s infinite linear;
    /*animation-delay:1s;*/
    position: fixed;
    bottom: 45px;
    left: 80%;
  }

  .truck3 {
    height: 22px;
    opacity: 0;
    -webkit-animation: truckmove3 12s infinite linear;
    -webkit-animation-delay: 1s;
    animation: truckmove3 12s infinite linear;
    /*animation-delay:1s;*/
    position: fixed;
    bottom: 45px;
    left: 45%;
  }

  @-webkit-keyframes truckmove1 {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      -webkit-transform: translateX(500px);
    }
  }

  @keyframes truckmove1 {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(500px);
    }
  }

  @-webkit-keyframes truckmove2 {
    0% {
      opacity: 0;
      -webkit-transform: translateX(0px);
    }
    5% {
      opacity: 1;
      -webkit-transform: translateX(0px);
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      -webkit-transform: translateX(-600px);
    }
  }

  @keyframes truckmove2 {
    0% {
      opacity: 0;
      transform: translateX(0px);
    }
    5% {
      opacity: 1;
      transform: translateX(0px);
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(-600px);
    }
  }

  @-webkit-keyframes truckmove3 {
    0% {
      opacity: 0;
      -webkit-transform: translateX(0px);
    }
    10% {
      opacity: 1;
      -webkit-transform: translateX(0px);
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      -webkit-transform: translateX(-300px);
    }
  }

  @keyframes truckmove3 {
    0% {
      opacity: 0;
      transform: translateX(0px);
    }
    10% {
      opacity: 1;
      transform: translateX(0px);
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(-300px);
    }
  }

  /*背景动画*/
</style>
