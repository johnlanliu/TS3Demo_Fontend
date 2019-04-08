<template>
  <el-dialog :visible.sync="isOpen" title="Update Tracker" :center="true" top="20vh" @close="resetFields">
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="200px" :rules="formRules" size="mini">
          <el-form-item label="Selected Devices">
            <el-input v-model="form.devices" type="textarea" :disabled="true" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="Firmware Version" prop="updateId">
            <el-select
              v-model="form.updateId"
              placeholder="Please select a version"
              @change="optionChange"
              style="width: 300px;"
            >
              <el-option
                v-for="item in options"
                :key="item.updateId"
                :label="item.fileName"
                :value="item.updateId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Description">
            <el-input type="textarea" rows="5" v-model="desc" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')" :loading="loading">Save</el-button>
            <el-button @click="clearValidate('form')">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog :close-on-click-modal="false" :visible.sync="isLogsOpen" title="Update Logs" :center="true" top="15vh" append-to-body>
      <el-table
        :data="logTableData"
        border
        stripe
        height="65vh"
        highlight-current-row
        :row-key="row => row.index"
        style="width: 100%;">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="NO" type="index" width="40"></el-table-column>
        <el-table-column label="Device ID" prop="deviceId" width="160"></el-table-column>
        <el-table-column label="Result" prop="msg">
          <template slot-scope="scope">
            <span v-if="scope.row.msg.toLowerCase().indexOf('failed')>-1" style="color: red;">
              {{ scope.row.msg }}
            </span>
            <span v-else  style="color: green;">
              {{ scope.row.msg }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { batchUpdateDevice } from '@/api/getData';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'EditDeviceUpdateForm',
  mixins: [exceptionUtil],
  props: {
    form: [Object],
    options: [Array]
  },
  computed: {
    ...mapState(['loginInfo'])
  },
  data: function() {
    return {
      loading: false,
      isOpen: false,
      isLogsOpen: false,
      logTableData: [],
      desc: '',
      formRules: {
        updateId: [
          { required: true, message: 'Firmware Version can not be null' }
        ]
      }
    };
  },

  methods: {
    async showDialog() {
      this.isOpen = true;
    },
    // 当选择固件版本时，改变下面文本框描述
    optionChange() {
      for (let i = 0; i < this.options.length; i++) {
        if (this.form.updateId === this.options[i].updateId) {
          this.desc = this.options[i].details;
        }
      }
    },
    initData() {
      this.getFirmeUpdateListByModelId();
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.loading = false;
          return false;
        } else {
          // 增加loading状态防止重复提交
          this.loading = true;
          batchUpdateDevice({ }, this.form).then(
            result => {
              this.loading = false;
              if (result && !result.errorCode) {
                this.logTableData = result;
                this.isOpen = false;
                this.isLogsOpen = true;
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
