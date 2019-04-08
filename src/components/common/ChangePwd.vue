<template>
  <el-dialog
    title="Change password"
    :visible.sync="visible"
    width="600px"
    center>
    <el-form
      v-if="visible"
      :model="form"
      :rules="rules"
      ref="form"
      label-width="150px">
      <el-form-item label="Old password" prop="oldPass">
        <el-input type="password" v-model="form.oldPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Password Comfirm" prop="checkPass" required>
        <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="footer">
      <el-button type="primary" @click="handleSave">Save</el-button>
      <el-button @click="visible = false">cancel</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { editPwd } from '@/api/getData';
import { regPwd } from '@/utils/regex';
export default {
  mixins: [exceptionUtil],

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please enter Password Comfirm'));
      } else if (value !== this.form.pass) {
        callback(new Error('Inconsistent password entered twice'));
      } else {
        callback();
      }
    };
    return {
      rules: {
        oldPass: [
          { required: true, message: 'please enter Old Password' }
        ],
        pass: [
          { required: true, message: 'please enter Password' },
          { pattern: regPwd, message: 'The password can only be composed of numbers or letters of 6 to 32 digits'}
        ],
        checkPass: [
          { validator: validateCheckPass }
        ],
      },
      form: {
        oldPass: '',
        pass: '',
        checkPass: ''
      }
    };
  },

  computed: {
    visible: {
      get() {
        return this.value;
      },

      set(val) {
        this.$emit('input', val);
      }
    }
  },

  watch: {
    visible(val) {
      if(!val) {
        this.form = {
          oldPass: '',
          pass: '',
          checkPass: ''
        };
      }
    }
  },

  methods: {
    // save
    handleSave() {
      this.$refs.form.validate((valid) => {
        if(!valid) return;
        this.fetchEdirPwd();
      });
    },

    // ajax 修改密码
    async fetchEdirPwd() {
      const param = {
        oldPwd: this.form.oldPass,
        newPwd: this.form.checkPass
      };
      const res = await editPwd({}, param);
      if(!res || res.errorCode) {
        this.exceptionHandle(res.errorCode);
        return;
      }
      this.visible=false;
      this.$message.success('Change Password Successful!');
    }
  }
};
</script>
<style scoped>
.el-form {
  margin-bottom: 25px;
}
.el-input {
  width: 400px;
}
</style>
<style>
/* .el-dialog--center .el-dialog__footer {
  padding-left: 150px;
} */
</style>
