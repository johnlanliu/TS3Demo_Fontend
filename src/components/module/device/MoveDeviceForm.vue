<template>
  <el-dialog :visible.sync="isOpen" title="Move To" :center="true" top="12vh" @close="resetFields">
    <div class="container">
      <div class="form-box">
        <el-form
          v-if="isOpen"
          ref="form"
          :model="form"
          label-width="200px"
          size="mini">
          <el-form-item label="Selected Devices">
            <el-input v-model="form.devices" type="textarea" :disabled="true" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="Organization">
            <el-col :span="15">
              <el-input v-model="form.orgId" v-show="false"></el-input>
              <el-input v-model="form.orgName" :disabled="true"></el-input>
            </el-col>
            <el-col :span="5" style="margin-left:15px;">
              <el-button type="primary" @click="showSelectOrgDialog">Modify</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')" :loading="loading">Save</el-button>
            <el-button @click="clearValidate('form');">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <select-org-tree ref="selectOrgTree" :appendToBody="true" @change-parent="changeParentHandle"></select-org-tree>
  </el-dialog>
</template>

<script>
import { batchMoveDevice } from '@/api/getData';
import SelectOrgTree from '@/components/common/SelectOrgTree.vue';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'EditDeviceForm',
  mixins: [exceptionUtil],
  components: { SelectOrgTree },
  props: {
    form: [Object]
  },
  computed: {
  },
  data: function() {
    return {
      loading: false,
      isOpen: false,
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
      this.form = JSON.parse(JSON.stringify(this.form));
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        this.loading = true;
        if (!valid) {
          this.loading = false;
          return false;
        } else {
          batchMoveDevice({}, this.form).then(
            result => {
              this.loading = false;
              if (result && !result.errorCode) {
                this.$message.success('Save successful!');
                this.isOpen = false;
                this.$emit('reload-table');
              } else {
                // 错误处理
                this.exceptionHandle(result.errorCode);
              }
            }
          );
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
