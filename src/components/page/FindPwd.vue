<template>
  <div style="width:60vh margin-top:20vh;">
    <el-form class="form" ref="form" :model="form" label-width="120px" :rules="formRules">
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Verification Code" prop="code">
        <el-input v-model="form.code"></el-input>
        <el-button class="inline" type="primary" @click="changeCode">{{code}}</el-button>
      </el-form-item>
      <el-form-item label style>
        <el-col :span="15">
          <el-button type="primary" :loading="loading" @click="submit('form')">Next</el-button>
        </el-col>
        <el-col :span="4" style>
          <el-button type="text" @click="$router.push('/login');">Back</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { sendResetPwdEmail } from '@/api/getData';
import { exceptionUtil } from '@/utils/exceptionUtil.js';

export default {
  mixins: [exceptionUtil],
  data: function() {
    return {
      code: '',
      loading: false,
      formRules: {
        email: [
          { required: true, message: 'Email can not be null' },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: 'Please enter your correct email'
          }
        ],
        code: [{ required: true, message: 'Verification code can not be null' }]
      },
      form: {}
    };
  },
  created() {
    this.initData();
  },
  methods: {
    changeCode() {
      this.initData();
    },
    initData() {
      let str = '1234567890';
      let str1 = 0;
      for (let i = 0; i < 4; i++) {
        str1 += str.charAt(Math.floor(Math.random() * 10));
      }
      str1 = str1.substring(1);
      this.code = str1;
    },
    submit(formName) {
      this.loading=true;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.loading=false;
          return false;
        } else {
          if (this.form.code === this.code)
            sendResetPwdEmail({ email: this.form.email }).then(result => {
              this.loading=false;
              if (result && !result.errorCode) {
                this.$message.success('Sending email to you now!');
              } else if (result.errorCode) {
                // 错误处理
                this.exceptionHandle(result.errorCode);
              }
            });
          else {
            this.loading=false;
            this.$message.error('Validation code error!');
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.form {
  margin-top: 7vh;
}
.form .el-input {
  width: 50vh;
}
</style>
