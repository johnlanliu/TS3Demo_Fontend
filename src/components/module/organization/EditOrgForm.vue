<template>
  <el-dialog
    :title="title"
    :center="true"
    :visible.sync="isOpen"
    width="735px"
    @close="resetFields">
    <div class="form-box">
      <el-form ref="form" :model="form" label-width="200px" :rules="formRules" size="mini">
        <el-form-item :label="lang.parenNode">
          <el-col :span="15">
            <el-input v-model="form.parentId" v-show="false"></el-input>
            <el-input v-model="form.parentName" :disabled="true"></el-input>
          </el-col>
          <el-col :span="5" style="margin-left:15px;">
            <el-button v-show="loginInfo.orgId!=form.orgId" type="primary" @click="showSelectOrgDialog" >{{ lang.modify }}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item :label="lang.orgName" prop="orgName">
          <el-input v-model="form.orgName" maxlength="36"></el-input>
        </el-form-item>
        <el-form-item v-show="loginInfo.orgId!==form.orgId && this.optType!==0" :label="lang.type" prop="attribute">
          <el-select v-model="form.attribute" placeholder="All" >
            <el-option
              v-for="item in options"
              :key="item.value" :label="item.label" :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="lang.contactPerson" prop="contacts">
          <el-input v-model="form.contacts" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item :label="lang.email" prop="email">
          <el-input v-model.trim="form.email" maxlength="36"></el-input>
        </el-form-item>
        <el-form-item :label="lang.mobile">
          <el-input v-model="form.phone" maxlength="36"></el-input>
        </el-form-item>
        <el-form-item :label="lang.address" prop="address">
          <el-input type="textarea" resize="none" autosize v-model="form.streetAddress" maxlength="128" ></el-input>
        </el-form-item>
        <el-form-item :label="lang.activated">
          <el-radio v-model="form.activated" :label="0" border :disabled="this.optType==0">
            <span style="color: red">{{ lang.unactivated }}</span>
          </el-radio>
          <el-radio v-model="form.activated" :label="1" border :disabled="this.optType==0">
            <span style="color: green">{{ lang.activated}}</span>
          </el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')" :loading="loading">{{ lang.save }}</el-button>
          <el-button @click="clearValidate('form');">{{ lang.cancel }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <select-org-tree ref="selectOrgTree" :appendToBody="true" @change-parent="changeParentHandle"></select-org-tree>
  </el-dialog>
</template>

<script>
import { addPartner, addOrg, editOrg, getOrgList } from '@/api/getData';
import SelectOrgTree from '../../common/SelectOrgTree.vue';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { regEmail } from '@/utils/regex';
import { mapActions, mapState } from 'vuex';

export default {
  mixins: [exceptionUtil],
  props: {
    value: {
      default: false,
      type: Boolean
    },
    optType: Number,
    form: [Object]
  },
  data: function() {
    return {
      loading: false,
      options: [],
      formRules: {
        orgName: [
          { required: true, message: 'Name can not be null' },
          { min: 2, max: 36, message: 'Please enter 2 to 36 letters' },
          {
            pattern: /^[\s\S]+$/,
            message: 'Special characters are not allowed to be entered'
          }
        ],
        attribute: [
          { required: true, message: 'Please select a kind of type ' }
        ],
        contacts: [
          // { required: false, message: 'Name can not be null', trigger: 'blur' },
          { min: 0, max: 50, message: 'Please enter 0 to 50 letters' },
          {
            pattern: /^[\S\s]{0,50}$/,
            message: 'Please enter the correct format'
          }
        ],
        email: [
          // { required: true, message: 'Email can not be null' },
          {
            pattern: regEmail,
            message: 'Please enter the correct format'
          }
        ]
      }
    };
  },
  components: { SelectOrgTree },
  computed: {
    ...mapState([
      'loginInfo',
      'lang'
    ]),

    title() {
      return this.optType === 0 ? this.lang.addPartner : (this.optType === 1 ? this.lang.addSubNode : this.lang.edit);
    },

    isOpen: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },


  created() {
    let typeIds = this.loginInfo.validOrgTypes;
    typeIds.forEach(typeId => {
      let item = window.trkConfig.orgTypes[typeId];
      if(item && item.label) {
        this.options.push({value: typeId, label: item.label});
      }
    });
  },

  methods: {
    ...mapActions(['saveOrgTreeList']),

    showSelectOrgDialog() {
      this.$refs.selectOrgTree.showDialog(this.form.orgId);
    },
    changeParentHandle(item) {
      this.form.parentId = item.orgId;
      this.form.parentName = item.orgName;
    },
    async reloadOrgList() {
      const orgTreeList = await getOrgList({
        orgId: this.loginInfo.orgId
      });
      this.saveOrgTreeList(orgTreeList, true);
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        // 增加loading状态防止重复提交
        this.loading = true;
        if (!valid) {
          this.loading = false;
          return false;
        } else {
          if (this.optType === 2) {
            editOrg({  }, this.form).then(result => {
              this.loading = false;
              if (result && !result.errorCode) {
                this.$message.success('Save successful!');
                this.isOpen = false;
                this.$emit('reload-org', result.orgId);
              } else if (result.errorCode) {
                // 错误处理
                this.exceptionHandle(result.errorCode);
              }
            });
          } else if (this.optType === 0) {
            addPartner({ }, this.form).then(
              result => {
                this.loading = false;
                if (result && !result.errorCode) {
                  this.$message.success('Save successful!');
                  this.isOpen = false;
                  this.$emit('reload-org', result.orgId);
                } else if (result.errorCode) {
                  // 错误处理
                  this.exceptionHandle(result.errorCode);
                }
              }
            );
          } else {
            addOrg({ }, this.form).then(result => {
              if (result && !result.errorCode) {
                this.$message.success('Save successful!');
                this.isOpen = false;
                this.$emit('reload-org', result.orgId);
                this.loading = false;
              } else if (result.errorCode) {
                // 错误处理
                this.loading = false;
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
    },
  }
};
</script>
