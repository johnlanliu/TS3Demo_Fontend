<template>
  <el-dialog :visible.sync="isOpen" title="Edit Tracker Setting" :center="true" top="3vh" @close="resetFields">
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="200px" :rules="formRules" size="mini" label-suffix=":">
          <!-- 设备IDs -->
          <el-form-item label="Selected Devices">
            <el-input v-model="form.devices" type="textarea" :disabled="true" :rows="2"></el-input>
          </el-form-item>

          <!--  位置包上报服务器 -->
          <el-form-item label="Report Server" prop="reportServer">
            <el-input v-model.trim="form.reportServer"></el-input>
          </el-form-item>

          <!--  working mode 心跳包间隔-->
          <el-form-item label="Working Mode Pulse" prop="workingPulseInterval">
            <el-col :span="10">
              <el-switch :disabled="form.workingPulseEnable===1" v-model="form.workingPulseEnable" :active-value="1" :inactive-value="0" active-text="On" inactive-text="Off"></el-switch>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="5">
              <span>Interval(s): </span>
            </el-col>
            <el-col :span="7">
              <el-input-number v-model.trim="form.workingPulseInterval" :disabled="form.workingPulseEnable===0" :min="15" :max="86400" :controls="false"></el-input-number>
            </el-col>
          </el-form-item>

          <!--  working mode 位置包间隔-->
          <el-form-item label="Working Mode Location" prop="workingReportInterval">
            <el-col :span="10">
              <el-switch :disabled="form.workingReportEnable===1" v-model="form.workingReportEnable" :active-value="1" :inactive-value="0" active-text="On" inactive-text="Off"></el-switch>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="5">
              <span>Interval(s): </span>
            </el-col>
            <el-col :span="7">
              <el-input-number v-model.trim="form.workingReportInterval" :disabled="form.workingReportEnable===0" :min="15" :max="86400" :controls="false"></el-input-number>
            </el-col>
          </el-form-item>

          <!--  battery mode 心跳包间隔-->
          <el-form-item label="Battery Mode Pulse" prop="batteryPulseInterval">
            <el-col :span="10">
              <el-switch :disabled="form.batteryPulseEnable===1" v-model="form.batteryPulseEnable" :active-value="1" :inactive-value="0" active-text="On" inactive-text="Off"></el-switch>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="5">
              <span>Interval(s): </span>
            </el-col>
            <el-col :span="7">
              <el-input-number v-model.trim="form.batteryPulseInterval" :disabled="form.batteryPulseEnable===0" :min="15" :max="86400" :controls="false"></el-input-number>
            </el-col>
          </el-form-item>

          <!--  battery mode 位置包间隔-->
          <el-form-item label="Battery Mode Location" prop="batteryReportInterval">
            <el-col :span="10">
              <el-switch :disabled="form.batteryReportEnable===1" v-model="form.batteryReportEnable" :active-value="1" :inactive-value="0" active-text="On" inactive-text="Off"></el-switch>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="5">
              <span>Interval(s): </span>
            </el-col>
            <el-col :span="7">
              <el-input-number v-model.trim="form.batteryReportInterval" :disabled="form.batteryReportEnable===0" :min="15" :max="86400" :controls="false"></el-input-number>
            </el-col>
          </el-form-item>

          <!-- 移动距离 -->
          <el-form-item label="Distance Offset" prop="distanceOffset">
            <el-input-number v-model.trim="form.distanceOffset" :min="0" :max="300" :controls="false"></el-input-number>
          </el-form-item>

          <!-- GPS定位超时 -->
          <el-form-item label="GPS Weak Timeout" prop="gpsWeakTimeout">
            <el-input-number v-model.trim="form.gpsWeakTimeout" :min="0" :max="300" :controls="false"></el-input-number>
          </el-form-item>

          <!-- 水平分量精度因子的阈值 -->
          <el-form-item label="GPS HDOP Threshold" prop="gpsHdopThreshold">
            <el-input-number v-model.trim="form.gpsHdopThreshold" :min="0" :max="100" :controls="false"></el-input-number>
          </el-form-item>

          <!-- GPS抗漂移延时最大值   单位秒 -->
          <el-form-item label="GPS Anti Drifting" prop="gpsAntiDrifting">
            <el-input-number v-model.trim="form.gpsAntiDrifting" :min="5" :max="120" :controls="false"></el-input-number>
          </el-form-item>

          <!-- Gsensor灵敏度 -->
          <el-form-item label="G-Sensor Sensitivity" prop="gsensorSensitivity">
            <el-input-number v-model.trim="form.gsensorSensitivity" :min="1" :max="128" :controls="false"></el-input-number>
          </el-form-item>

          <!-- 及插件（断油电扽) -->
          <el-form-item label="Relay Out">
            <el-checkbox-group v-model="form.relayOut" @change="alocked">
              <el-checkbox v-for="item in checkBoxOptions" :label="item" :key="item"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')" :loading="loading">Save</el-button>
            <el-button @click="clearValidate('form');">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { batchEditDeviceSetting } from '@/api/getData';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'EditDeviceSettingForm',
  mixins: [exceptionUtil],
  props: {
    form: [Object]
  },
  computed: {
    ...mapState(['loginInfo'])
  },
  data: function() {
    const checkReportInterval = (rule, value, callback) => {
      if (!value || !(value>=15)) {
        return callback(new Error('Interval can not be null and more than 15'));
      }else {
        callback();
      }
    };
    return {
      loading: false,
      isOpen: false,
      options: [],
      checkBoxOptions: ['A', 'B'],
      relayOut: 0,
      formRules: {
        reportServer: [
          { required: true, message: 'Reportserver can not be null' },
          {
            pattern: /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62}|(:[0-9]{1,4}))+\.?/,
            message: 'Please enter the correct format'
          }
        ],
        distanceOffset: [{ required: true}],
        gpsAntiDrifting: [{ required: true}],
        gpsHdopThreshold: [{ required: true}],
        gpsWeakTimeout: [{ required: true}],
        gsensorSensitivity: [{ required: true}],
        workingPulseInterval: [{ required: true, validator: checkReportInterval }],
        workingReportInterval: [{ required: true, validator: checkReportInterval }],
        batteryPulseInterval: [{ required: true, validator: checkReportInterval }],
        batteryReportInterval: [{ required: true, validator: checkReportInterval }],
      }
    };
  },

  methods: {
    // 将多选框结果转化成relayout的整型值
    alocked(val) {
      if (val.length === 0) {
        this.relayOut = 0;
      } else if (val.length === 1) {
        if (val[0] === 'A') {
          this.relayOut = 2;
        } else if (val[0] === 'B') {
          this.relayOut = 1;
        }
      } else if (val.length === 2) {
        this.relayOut = 3;
      }
    },
    showDialog() {
      this.isOpen = true;
    },
    // initData(){
    //         this.getDeviceSettingById();
    // },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        this.loading = true;
        if (!valid) {
          this.loading = false;
          return false;
        } else {
          this.form.relayOut = this.relayOut;
          batchEditDeviceSetting(
            {},
            this.form
          ).then(result => {
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
