<template>
  <el-dialog
    :title="form.userId ? 'Edit Account' : 'Add Account'"
    :center="true"
    top="15vh"
    :visible.sync="isOpen"
    @close="resetFields">
    <div class="form-box">
      <el-form ref="form" :model="form" label-width="200px" :rules="formRules" size="mini">
        <el-form-item label="Organization">
          <el-col :span="15">
            <el-input v-model="form.orgId" v-show="false"></el-input>
            <el-input v-model="form.orgName" disabled></el-input>
          </el-col>
          <el-col :span="5" style="margin-left:15px;">
            <el-button type="primary" @click="showSelectOrgDialog">Modify</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="Account" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label style="margin-bottom:0px !important;">
          <el-checkbox v-model="resetPassword">Reset Password</el-checkbox>
        </el-form-item>
        <el-form-item label="Password" v-if="resetPassword">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item v-show="loginInfo.userId!==form.userId" label="Account Type" prop="roleId">
          <el-select v-model="form.roleId" placeholder="Please select the role">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Mobile">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Activated">
          <el-radio v-model="form.activated" border :label="0">
            <span style="color: red">Unactivated</span>
          </el-radio>
          <el-radio v-model="form.activated" border :label="1">
            <span style="color: green">Activated</span>
          </el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')" :loading="loading">Save</el-button>
          <el-button @click="clearValidate('form');">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
    <select-org-tree ref="selectOrgTree" :appendToBody="true" @change-parent="changeParentHandle"></select-org-tree>
  </el-dialog>
</template>

<script>
import { addUser, editUser } from '@/api/getData';
import SelectOrgTree from '@/components/common/SelectOrgTree.vue';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'EditUserForm',
  mixins: [exceptionUtil],
  components: { SelectOrgTree },
  props: {
    form: [Object],
    resetPassword: Boolean,
    roleList: Array
  },
  computed: {
    ...mapState(['loginInfo'])
  },
  data: function() {
    return {
      loading: false,
      isOpen: false,

      formRules: {
        username: [
          { required: true, message: 'Account can not be null' },
          { min: 1, max: 18, message: 'Please enter 1 to 18 letters' },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: 'Special characters are not allowed to be entered'
          }
        ],
        roleId: [
          { required: true, message: 'Account can not be null' },
        ],
        email: [
          // { required: true, message: 'Email can not be null' },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: 'Please enter the correct format'
          }
        ]
      }
    };
  },
  methods: {
    showDialog() {
      this.isOpen = true;
    },
    showSelectOrgDialog() {
      this.$refs.selectOrgTree.showDialog(this.form.orgId);
    },
    changeParentHandle(item) {
      this.form.orgId = item.orgId;
      this.form.orgName = item.orgName;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.loading = false;
          return false;
        } else {
          // 增加loading状态防止重复提交
          this.loading = true;
          if (this.form.userId) {
            editUser({  }, this.form).then(result => {
              this.loading = false;
              if (result && !result.errorCode) {
                this.$message.success('Save successful!');
                this.isOpen = false;
                this.$emit('reload-table');
              } else {
                // 错误处理
                this.exceptionHandle(result.errorCode);
              }
            });
          } else {
            addUser({ }, this.form).then(result => {
              this.loading = false;
              if (result && !result.errorCode) {
                this.$message.success('Save successful!');
                this.isOpen = false;
                this.$emit('reload-table');
              } else {
                // 错误处理
                this.exceptionHandle(result.errorCode);
              }
            });
          }
        }
      });
    },
    clearValidate(formName) {
      this.isOpen = false;
      this.$refs[formName].clearValidate();
      // 移除校验结果
    },

    // 重置表单
    resetFields() {
      this.$refs.form.resetFields();
    }
  }
};
</script>
