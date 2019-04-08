<template>
  <el-dialog :visible.sync="isOpen" title="Edit Tracker Info" :center="true" top="12vh" @close="resetFields">
    <div class="container">
      <div class="form-box">
        <el-form
          v-if="isOpen"
          ref="form"
          :model="form"
          label-width="200px"
          :rules="formRules"
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
          <el-form-item label="Model" prop="modelId" v-if="this.form.devices&&this.form.devices.toString().indexOf(',')==-1">
            <model-list-select v-model="form.modelId"></model-list-select>
          </el-form-item>
          <el-form-item label="Password" prop="password"  v-if="this.form.devices&&this.form.devices.toString().indexOf(',')==-1">
            <el-input v-model.trim="form.password"></el-input>
          </el-form-item>
          <el-form-item label="State" prop="state">
            <el-select v-model="form.state" placeholder="Please select the state">
              <el-option
                v-for="item in deviceStateList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Hardware Version" prop="hwVer">
            <el-input v-model.trim="form.hwVer"></el-input>
          </el-form-item>
          <el-form-item label="Language">
            <el-input v-model.trim="form.language"></el-input>
          </el-form-item>
          <el-form-item label="Timezone">
            <el-input v-model.trim="form.timeZone"></el-input>
          </el-form-item>
          <el-form-item label="Trailer ID">
            <el-input v-model.trim="form.trailerId"></el-input>
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
import { batchEditDevice } from '@/api/getData';
import SelectOrgTree from '@/components/common/SelectOrgTree.vue';
import ModelListSelect from '@/components/common/ModelListSelect.vue';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'EditDeviceForm',
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
      deviceStateList: [
        { value: 0, label: 'Recorded' },
        { value: 1, label: 'Tested' },
        { value: 2, label: 'Activated' },
        { value: 3, label: 'Paused' },
        { value: 4, label: 'Scrapped' }
      ],
      formRules: {
        modelId: [{ required: true, message: 'Please select one' }],
        password: [
          { required: true, message: 'Password can not be null' },
          { pattern: /^[0-9]{6}$/, message: 'Only numbers' }
        ],
        state: [{ required: true, message: 'Please select one' }],
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
      this.form = JSON.parse(JSON.stringify(this.form));
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        this.loading = true;
        if (!valid) {
          this.loading = false;
          return false;
        } else {
          if (typeof this.form.state === 'string') {
            for (let i = 0; i < this.deviceStateList.length; i++) {
              let state = this.deviceStateList[i];
              if (state.label === this.form.state) {
                this.form.state = state.value;
                break;
              }
            }
          }
          batchEditDevice({}, this.form).then(
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
