<template>
  <el-dialog :visible.sync="isOpen" title="Add Tracker" :center="true" top="20vh" @close="resetFields">
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="200px" :rules="formRules" size="mini">
          <el-form-item label="Parent Node">
            <el-col :span="15">
              <el-input v-model="form.orgId" v-show="false"></el-input>
              <el-input v-model="form.orgName" :disabled="true"></el-input>
            </el-col>
            <el-col :span="5" style="margin-left:15px;">
              <el-button type="primary" @click="showSelectOrgDialog">Modify</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="IMEI/MEID/ID" prop="deviceId">
            <el-input v-model.trim="form.deviceId"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model.trim="form.password"></el-input>
          </el-form-item>
          <el-form-item label="Model Name" prop="modelId">
            <model-list-select v-model="form.modelId"></model-list-select>
          </el-form-item>
          <el-form-item label="Hardware Version" prop="hwVer">
            <el-input v-model.trim="form.hwVer"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')" :loading="loading">Save</el-button>
            <el-button @click="clearValidate('form');">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <select-org-tree ref="selectOrgTree" :appendToBody="true" :loading="loading" @change-parent="changeParentHandle"></select-org-tree>
  </el-dialog>
</template>

<script>
import { addDevice } from '@/api/getData';
import SelectOrgTree from '@/components/common/SelectOrgTree.vue';
import ModelListSelect from '@/components/common/ModelListSelect.vue';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AddDeviceForm',
  mixins: [exceptionUtil],
  components: { SelectOrgTree, ModelListSelect },
  props: {
    form: [Object]
  },
  computed: {
    ...mapState(['loginInfo'])
  },
  data: function() {
    return {
      loading: false,
      isOpen: false,
      options: [],
      formRules: {
        deviceId: [
          { required: true, message: 'IMEI/MEID/ID can not be null' },
          { pattern: /^[0-9]{14}$/, message: 'Only numbers' }
        ],
        password: [
          { required: true, message: 'Password can not be null' },
          { pattern: /^[0-9]{6}$/, message: 'Only numbers' }
        ],
        modelId: [{ required: true, message: 'Please select one' }],
        hwVer: [
          { required: true, message: 'Hardware version can not be null' },
          { pattern: /^[0-9]{1,10}$/, message: 'Only numbers' }
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
        // 增加loading状态防止重复提交
        this.loading = true;
        if (!valid) {
          this.loading = false;
          return false;
        } else {
          addDevice({ }, this.form).then(result => {
            this.loading = false;
            if (!result.errorCode) {
              this.$message.success('Save successful!');
              this.isOpen = false;
              this.$emit('reload-table');
            } else {
              // 错误处理
              this.exceptionHandle(result.errorCode);
            }
          });
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
