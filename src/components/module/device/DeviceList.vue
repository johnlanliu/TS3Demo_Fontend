<template>
  <div class="fillcontain">
    <div ref="searchForm" class="searchForm">
      <el-form
        ref="form"
        :inline="true"
        :model="deviceSearchForm"
        :label-width="labelWidth"
        size="mini">

        <!-- device id-->
        <el-form-item :label="lang.deviceId + ':'">
          <el-input
           v-model.trim="deviceSearchForm.deviceIdStart"
           clearable
           @change="search"></el-input>
        </el-form-item>

        <!-- iccid -->
        <el-form-item :label="'ICCID:'">
          <el-input
            v-model.trim="deviceSearchForm.iccid"
            clearable
            @change="search"></el-input>
        </el-form-item>

        <!-- hw -->
        <el-form-item label="HW:">
          <el-input
            v-model.trim="deviceSearchForm.hwVer"
            clearable
            @change="search"></el-input>
        </el-form-item>

        <!-- fw -->
        <el-form-item label="FW:">
          <el-input
            v-model.trim="deviceSearchForm.fwVer"
            clearable
            @change="search"></el-input>
        </el-form-item>
      </el-form>

      <el-form
        ref="form"
        :inline="true"
        :model="deviceSearchForm"
        :label-width="labelWidth"
        size="mini">
        <!-- model -->
        <el-form-item :label="lang.model + ':'">
          <model-list-select
            v-model="deviceSearchForm.modelId"
            clearable
            @change="search"
            placeholder="All"
          ></model-list-select>
        </el-form-item>

        <!-- batch -->
        <el-form-item :label="lang.batch + ':'">
          <el-select
            v-model="deviceSearchForm.batchId"
            clearable
            @change="search"
            placeholder="All">
            <el-option
              v-for="item in batchList"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label=" ">
          <el-button type="text" @click="showDeviceDetailSearchDialog" style="color: blue; cursor: pointer;">More</el-button>
        </el-form-item>

        <!-- update Flag -->
        <!--<el-form-item :label="lang.update + ' ' + lang.flag + ':'" :label-width="locale === 'es' ? '200px' : '120px'">
          <el-input
            v-model="deviceSearchForm.updateFlag"
            @change="search"
            clearable></el-input>
        </el-form-item>-->
      </el-form>

      <div class="btns">
        <el-button type="primary" @click="search">{{ lang.search }}/{{ lang.refresh }}</el-button>

        <div class="btn-right">
          <el-button v-if="permsAdd" type="primary" @click="showAddDeviceDialog">+{{ lang.addDevice }}</el-button>
          <el-button v-if="permsMoveTo" type="primary" @click="batchMoveTo">{{ lang.moveDevice }}</el-button>
          <el-button v-if="permsEdit" type="primary" @click="batchEditDevice">{{ lang.editInfo }}</el-button>
          <el-button v-if="permsEditSetting" type="primary" @click="batchEditDeviceSetting">{{ lang.changeSettings }}</el-button>
          <el-button v-if="permsUpdate" type="primary" @click="batchEditDeviceFirmware">ROM {{ lang.update }}</el-button>
        </div>
      </div>

      <!-- device信息分类 -->
      <el-menu
        :default-active="deviceClassify"
        mode="horizontal"
        @select="handleChangeClassify">
        <el-menu-item index="info">{{ lang.info }}</el-menu-item>
        <el-menu-item index="status">{{ lang.status }}</el-menu-item>
        <!--<el-menu-item index="setting">{{ lang.setting }}</el-menu-item>-->
      </el-menu>
    </div>

    <!-- 表格 -->
    <el-table
      v-loading="loading"
      ref="table"
      :height="tableHeight"
      :data="deviceList"
      border
      stripe
      highlight-current-row
      :row-key="row => row.deviceId"
      @selection-change="handleSelect"
      @sort-change="handlerSort">
      <el-table-column fixed type="selection" width="40"></el-table-column>
      <el-table-column fixed type="index" :label="lang.no" width="40"></el-table-column>
      <el-table-column fixed :label="lang.deviceId" width="150" sortable sort-by="deviceId">
        <template slot-scope="scope">
          <div>{{scope.row.deviceId}} <i class="el-icon-location" style="padding-left: 15px;" @click="handleShowMap(scope.row)"></i> </div>
        </template>
      </el-table-column>
      <el-table-column fixed prop="orgName" :label="lang.org" width="120" sortable></el-table-column>
      <el-table-column
        v-for="item in columnData"
        :key="item.deviceId"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :formatter="item.formatter"
        :sortable="isSort(item.prop)"></el-table-column>
      <el-table-column  v-if="permsEditSetting || permsEdit || permsUpdate || permsSmsCommand || permsDel" fixed="right" :label="lang.opt" width="140">
        <template slot-scope="scope">
          <el-button size="mini" v-if="permsEdit" type="text" @click="handleEdit(scope.row)">{{ lang.edit }}</el-button>
          <el-button size="mini" v-if="permsEditSetting" type="text" @click="handleSetting(scope.row)">{{ lang.setting }}</el-button>
          <el-dropdown v-if="permsUpdate || permsSmsCommand || permsDel" @command="handleCommand($event, scope.row, scope.$index)" trigger="click" style="margin-left:10px;">
            <span><i class="el-icon-arrow-down">&nbsp;</i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="permsUpdate" command="update">{{ lang.update}}</el-dropdown-item>
              <el-dropdown-item v-if="permsSmsCommand" command="reset" divided>{{ lang.reset }}</el-dropdown-item>
              <el-dropdown-item v-if="permsSmsCommand" command="wakeup">{{ lang.wakeUp}}</el-dropdown-item>
              <el-dropdown-item v-if="permsDel" command="delete" divided>{{ lang.delete}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next, sizes"
      :page-size="20"
      :page-sizes="[15, 20, 30, 50, 100, 500, 1000, 2000]"
      :current-page="pages.currentPage"
      :total="pages.count"></el-pagination>

    <!-- 复杂的搜索弹出框 -->
    <device-detail-search
      ref="deviceDetailSearch"
      :form="deviceSearchForm"
      @reload-table="initData"></device-detail-search>

    <!-- 添加 device弹出框 -->
    <add-device-form
      ref="addDeviceForm"
      v-if="permsAdd"
      :form="form"
      @reload-table="initData"></add-device-form>

    <!-- 移动device至某个节点弹出框 -->
    <move-device-form
      ref="moveDeviceForm"
      v-if="permsMoveTo"
      :form="form"
      @reload-table="initData"></move-device-form>

    <!-- 修改device info弹出框 -->
    <edit-device-form
      ref="editDeviceForm"
      v-if="permsEdit"
      :form="form"
      @reload-table="initData"></edit-device-form>

    <!-- 修改device setting弹出框 -->
    <edit-device-setting-form
      ref="editDeviceSettingForm"
      v-if="permsEditSetting"
      :form="form"
      @reload-table="initData"></edit-device-setting-form>

    <!-- firmware update弹出框 -->
    <edit-device-update-form
      ref="editDeviceUpdateForm"
      v-if="permsUpdate"
      :form="form"
      :options="firmwareVersionList"
      @reload-table="initData"></edit-device-update-form>

    <!-- map弹出框 -->
    <map-dialog
      ref="mapDialog"
      :device="curDevice"></map-dialog>

  </div>
</template>

<script>
  import {
    getOrgById,
    getDevices,
    deleteDevice,
    getFirmeUpdateListByModelId,
    getDeviceSettingById,
    getBatchSelect,
    wakeup,
    reset
  } from '@/api/getData';
  import DeviceDetailSearch from './DeviceDetailSearch.vue';
  import AddDeviceForm from './AddDeviceForm.vue';
  import EditDeviceForm from './EditDeviceForm.vue';
  import MoveDeviceForm from './MoveDeviceForm.vue';
  import EditDeviceSettingForm from './EditDeviceSettingForm.vue';
  import EditDeviceUpdateForm from './EditDeviceUpdateForm.vue';
  import ModelListSelect from '@/components/common/ModelListSelect.vue';
  import MapDialog from '@/components/common/MapDialog.vue';
  import { timestampFormatDate, timeMixins } from '@/utils/time';
  import { handlePerms } from '@/utils/perms.js';
  import { exceptionUtil } from '@/utils/exceptionUtil.js';
  import { getStore } from '@/config/mUtils';
  import { mapState } from 'vuex';

  export default {
    mixins: [exceptionUtil, timeMixins],
    components: {
      DeviceDetailSearch,
      AddDeviceForm,
      EditDeviceForm,
      MoveDeviceForm,
      EditDeviceSettingForm,
      EditDeviceUpdateForm,
      ModelListSelect,
      MapDialog
    },
    data() {
      return {
        deviceStateList: ['Recorded', 'Tested', 'Activated', 'Paused', 'Scrapped'],
        SynchronizingTypes: ['None', 'Synchronizing'],
        tableHeight: 400,
        batchList: [],
        deviceList: [],
        pages: {
          currentPage: 1,
          offset: 0,
          limit: 20,
          count: 0
        },
        loading: false,
        selectedIndexs: [],
        deviceSearchForm: {
          modelId: null,
          state: null,
          deviceIdStart: null,
          // deviceIdEnd:'',
          batchId: null,
          updateFlag: null,
          hwVer: null,
          fwVer: null
        },
        curDevice: {},
        form: {},
        orgId: 0,
        firmwareVersionList: [],
        deviceClassify: 'info',
        columnData: [],
        sort: null,

        permsAdd: false,
        permsMoveTo: false,
        permsEdit: false,
        permsEditSetting: false,
        permsUpdate: false,
        permsSmsCommand: false,
        permsDel: false
      };
    },
    computed: {
      ...mapState([
        'loginInfo',
        'modelList',
        'currentOrgId',
        'lang',
        'locale'
      ]),

      labelWidth() {
        return this.locale === 'es' ? '122px' : '100px';
      }
    },

    mounted() {
      this.$nextTick(function() {
        this.tableHeight = document.body.clientHeight - this.$refs.table.$el.offsetTop - 121;
      });
      // 监听窗口大小变化
      window.addEventListener('resize', this.bindResize);

      const perms = handlePerms('org:device');
      this.permsAdd = perms.some(v => v === 'add');
      this.permsMoveTo = perms.some(v => v === 'move-to');
      this.permsEdit = perms.some(v => v === 'edit');
      this.permsEditSetting = perms.some(v => v === 'edit-setting');
      this.permsUpdate = perms.some(v => v === 'update');
      this.permsSmsCommand = perms.some(v => v === 'sms-command');
      this.permsDel = perms.some(v => v === 'delete');
    },

    beforeDestroy() {
      window.removeEventListener('resize', this.bindResize);
    },

    created() {
      this.handleChangeClassify(this.deviceClassify);
      this.orgId = this.currentOrgId;
      this.initData();
      this.getBatchList();
    },

    watch: {
      currentOrgId(val) {
        this.orgId = val;
        this.initData();
      }
    },

    methods: {
      formatSpeed(row, column, cellValue, index) {
        return this.convertSpeed(cellValue);
      },
      // resize
      bindResize() {
        this.tableHeight = document.body.clientHeight - this.$refs.table.$el.offsetTop - 121;
      },

      isSort(prop) {
        const custom = ['deviceId', 'hwVer', 'fwVer', 'blVer', 'battery', 'totalMileage', 'expirationDate', 'reportTime', 'pulseTime', 'modifyTime', 'createTime'];
        if(custom.includes(prop))
          return 'custom';
        else
          return false;
      },

      handleShowMap(row) {
        this.curDevice = row;
        this.$refs.mapDialog.showDialog();
      },

      // 排序
      handlerSort(param) {
        if(param.order || param.prop) {
          this.sort = (param.order==='ascending'? '+' : '-') + param.prop;
          this.initData();
        } else {
          this.sort = null;
        }
      },

      // 点击Device分类
      handleChangeClassify(index) {
        switch (index) {
        case 'info':
          this.columnData = [
            {label: this.lang.model, prop: 'modelName', width: 80},
            {label: 'HW', prop: 'hwVer', width: 70},
            {label: 'FW', prop: 'fwVer', width: 70},
            {label: this.lang.state, prop: 'state', width: 100},
            {label: this.lang.batch, prop: 'batchName', width: 80},
            {label: 'ICCID', prop: 'iccid', width: 160},
            {label: this.lang.pw, prop: 'password', width: 100},
            {label: this.lang.trailerId, prop: 'trailerId', width: 120},
            {label: this.lang.mobile, prop: 'mobile', width: 80},
            {label: this.lang.timeZone, prop: 'timezone', width: 100},
            {label: this.lang.lang, prop: 'language', width: 100},
            {label: this.lang.igonoreAcc, prop: 'ignoreAcc', width: 100},
            {label: this.lang.expirationDate, prop: 'expirationDate', formatter: this.formatDate, width: 180},
            {label: this.lang.modifyTime, prop: 'modifyTime', formatter: this.formatDate, width: 150},
            {label: this.lang.createTime, prop: 'createTime', formatter: this.formatDate, width: 150}
          ];
          break;
        case 'status':
          this.columnData = [
            {label: this.lang.model, prop: 'modelName', width: 80},
            {label: 'Synchronizing', prop: 'updateFlag', width: 110},
            {label: 'HW', prop: 'hwVer', width: 70},
            {label: 'BL', prop: 'blVer', width: 70},
            {label: 'FW', prop: 'fwVer', width: 70},
            {label: 'ROM Update', prop: 'fileName', width: 200},
            {label: 'Report Time', prop: 'reportTime', formatter: this.formatDate, width: 130},
            {label: 'Pulse Time', prop: 'pulseTime', formatter: this.formatDate, width: 130},
            {label: 'Lat', prop: 'lat', width: 100},
            {label: 'Lng', prop: 'lng', width: 100},
            {label: 'Heading', prop: 'heading', width: 100},
            {label: 'Speed', prop: 'speed', formatter: this.formatSpeed, width: 80},
            {label: 'Charging', prop: 'charging', width: 100},
            {label: 'Temp', prop: 'temp', width: 100},
            {label: 'Acc', prop: 'acc', width: 80},
            {label: 'ExtIn', prop: 'extIn', width: 100},
            {label: 'Battery', prop: 'battery', width: 90},
            {label: 'Address', prop: 'address', width: 130},
            {label: 'Total Mileage', prop: 'totalMileage', width: 130}
          ];
          break;
        case 'setting':
          this.columnData = [
            // { label: 'Working Pulse Enable'},
            // { label: 'Working Report Enable'},
            // { label: 'Battery Pulse Enable'},
            // { label: 'Battery Report Enable'},
            // { label: 'Working Pulse Interval'},
            // { label: 'Battery Pulse Interval'},
            // { label: 'Working Report Interval'},
            // { label: 'Battery Report Interval'},
            // { label: 'Report Server'},
            // { label: 'Agps Enabled'},
            // { label: 'Gps Weak Timeout'},
            // { label: 'Gsensor Sensitivity'},
            // { label: 'Distance Offset'},
            // { label: 'workingReportEnable'},
            // { label: 'workingReportEnable'},
            // { label: 'workingReportEnable'},
            // { label: 'workingReportEnable'},
            // { label: 'workingReportEnable'},
            // { label: 'workingReportEnable'},
          ];
          break;
        }
      },
      getBatchList() {
        getBatchSelect({}).then(
          result => {
            if (result && !result.errorCode) {
              result.forEach(item=>{
                this.batchList.push({label: item.batchName, value: item.batchId});
              });
            } else {
              // 错误处理
              this.exceptionHandle(result.errorCode);
            }
          }
        );
      },

      _getSelectedIds() {
        let array = '';
        for (var i = 0; i < this.selectedIndexs.length; i++) {
          array += this.selectedIndexs[i].deviceId + ',';
        }
        array = array.substr(0, array.length - 1);
        return array;
      },


      showDeviceDetailSearchDialog() {
        this.$refs.deviceDetailSearch.showDialog();
      },

      showAddDeviceDialog() {
        this.form = {};
        this.form.orgId = this.orgId;
        getOrgById({orgId: this.orgId}).then(
          result => {
            if (result && !result.errorCode) {
              this.form.orgName = result.orgName;
            } else {
              // 错误处理
              this.exceptionHandle(result.errorCode);
            }
            this.form = JSON.parse(JSON.stringify(this.form));
            // 转换下 否则组件Select选择item后不会赋值。
            this.$refs.addDeviceForm.showDialog();
          }
        );
      },

      batchEditDevice() {
        if (this.batchEditFilter()) {
          this.form = {};
          if (this.selectedIndexs.length !== 1) {
            this.form.devices = this._getSelectedIds();
          } else {
            this.form = this.selectedIndexs[0];
            this.form.devices = this.selectedIndexs[0].deviceId;
          }
          this.form = JSON.parse(JSON.stringify(this.form));
          // 转换下 否则组件Select选择item后不会赋值。
          this.$refs.editDeviceForm.showDialog();
        }
      },

      async batchEditDeviceSetting() {
        if (this.selectedIndexs.length > 0) {
          this.form = {
            relayOut: []
          };
          if (this.selectedIndexs.length !== 1) {
            if (!this.batchEditFilter(true)) {
              this.$confirm(
                'Multiple equipment models, Are you sure edit there setting?',
                '',
                {
                  dangerouslyUseHTMLString: true,
                  showClose: false,
                  type: 'warning'
                }
              )
                .then(async () => {
                  this.form.devices = this._getSelectedIds();
                  this.$refs.editDeviceSettingForm.showDialog();
                })
                .catch(() => {
                });
            } else {
              this.form.devices = this._getSelectedIds();
              this.$refs.editDeviceSettingForm.showDialog();
            }
          } else {
            let form = await this.getDeviceSettingById(this.selectedIndexs[0].deviceId);
            if(form) {
              this.$refs.editDeviceSettingForm.showDialog();
            }
          }
        } else {
          this.$message.error('Please select at lease one tracker!');
        }
      },
      batchMoveTo() {
        if (this.selectedIndexs.length > 0) {
          this.form = {};
          if (this.selectedIndexs.length !== 1) {
            this.form.devices = this._getSelectedIds();
          } else {
            this.form.devices = this.selectedIndexs[0].deviceId;
            this.form.orgId = this.selectedIndexs[0].orgId;
            this.form.orgName = this.selectedIndexs[0].orgName;
          }
          this.$refs.moveDeviceForm.showDialog();
        } else {
          this.$message.error('Please select at lease one tracker!');
        }
      },

      batchEditDeviceFirmware() {
        if (this.batchEditFilter()) {
          this.form = {};
          this.form.devices = this._getSelectedIds();
          this.form.modelId = this.selectedIndexs[0].modelId;
          this.form.updateId = this.selectedIndexs[0].updateId;
          this.getFirmeUpdateListByModelId(this.form.modelId, this.form.hwVer);
          this.form = JSON.parse(JSON.stringify(this.form));
          // 转换下 否则组件Select选择item后不会赋值。
          this.$refs.editDeviceUpdateForm.showDialog();
        }
      },


      search() {
        this.initData();
      },

      async initData() {
        try {
          this.getDevices();
        } catch (err) {
          // 通讯异常处理
          this.$message.error('System Error:', err);
        }
      },

      // ajax 获取Device列表
      async getDevices() {
        this.loading = true;
        const params = Object.assign({
          pageindex: this.pages.currentPage,
          pagesize: this.pages.limit,
          orgId: this.orgId,
          sort: this.sort
        }, this.deviceSearchForm);

        const result = await getDevices(params);
        this.loading = false;
        if (result && !result.errorCode) {
          this.deviceList = [];
          this.pages.count = result.totalRows;
          const devices = result.list;

          this.deviceList = devices.map((item, index) => {
            const obj = Object.assign({}, item);
            obj.index = index + 1;
            obj.coordinate = item.lat && item.lng ? item.lat + ',' + item.lng : 'No Location';
            // obj.modifyTime = timestampFormatDate(item.modifyTime, 'yyyy-MM-dd hh:mm');
            // obj.createTime = timestampFormatDate(item.createTime, 'yyyy-MM-dd hh:mm');
            // obj.reportTime = timestampFormatDate(item.reportTime, 'yyyy-MM-dd hh:mm');
            // obj.pulseTime = timestampFormatDate(item.pulseTime, 'yyyy-MM-dd hh:mm');
            obj.state = this.deviceStateList[item.state];
            obj.updateFlag = this.SynchronizingTypes[item.updateFlag];
            return obj;
          });
        } else {
          // 错误处理
          this.deviceList = [];
          this.exceptionHandle(result.errorCode);
        }
      },

      handleSizeChange(val) {
        this.pages.limit = val;
        this.getDevices();
      },

      handleCurrentChange(val) {
        this.pages.currentPage = val;
        this.pages.offset = (val - 1) * this.pages.limit;
        this.getDevices();
      },

      handleCommand(command, row, index) {
        switch(command){
        case 'setting':
          this.handleSetting(row);
          break;
        case 'wakeup':
          this.handleWakeup(row);
          break;
        case 'reset':
          this.handleReset(row);
          break;
        case 'update':
          this.handleUpdate(row);
          break;
        case 'delete':
          this.handleDelete(row, index);
          break;
        }
      },

      handleEdit(row) {
        let obj = JSON.parse(JSON.stringify(row));
        // this.templateData是父组件传递的对象
        delete obj.createTime;
        delete obj.modifyTime;
        this.form = {};
        this.form = obj;
        this.form.devices = obj.deviceId;
        delete this.form.deviceId;
        this.form = JSON.parse(JSON.stringify(this.form));
        // 转换下 否则组件Select选择item后不会赋值。
        this.$refs.editDeviceForm.showDialog();
      },

      async handleSetting(row) {
        let obj = JSON.parse(JSON.stringify(row));
        // this.templateData是父组件传递的对象
        let form = await this.getDeviceSettingById(obj.deviceId);
        if(form) {
          this.form = JSON.parse(JSON.stringify(form));
          this.$refs.editDeviceSettingForm.showDialog();
        }
      },

      handleUpdate(row) {
        // this.templateData是父组件传递的对象
        this.form = {};
        this.form.devices = row.deviceId;
        this.form.updateId = row.updateId;
        this.getFirmeUpdateListByModelId(row.modelId, row.hwVer);
        this.form = JSON.parse(JSON.stringify(this.form));
        // 转换下 否则组件Select选择item后不会赋值。
        this.$refs.editDeviceUpdateForm.showDialog();
        this.initData();
      },

      handleSelect(indexs) {
        this.selectedIndexs = indexs;
      },

      handleReset(row) {
        this.$confirm(
          'Are you sure reset device: <i style=color:red;>' +
          row.deviceId +
          '</i> ?',
          '',
          {
            dangerouslyUseHTMLString: true,
            showClose: false,
            type: 'warning'
          }
        )
          .then(async () => {
            const res = await reset({
              deviceId: row.deviceId
            });
            if (res && !res.errorCode) {
              this.$message.success('Reset device successful!');
            } else {
              // 错误处理
              this.exceptionHandle(res.errorCode);
            }
          })
          .catch(() => {
          });
      },

      handleWakeup(row) {
        this.$confirm(
          'Are you sure wakeup device: <i style=color:red;>' +
          row.deviceId +
          '</i> ?',
          '',
          {
            dangerouslyUseHTMLString: true,
            showClose: false,
            type: 'warning'
          }
        )
          .then(async () => {
            const res = await wakeup({
              deviceId: row.deviceId
            });
            if (res && !res.errorCode) {
              this.$message.success('Wakeup device successful!');
            } else {
              // 错误处理
              this.exceptionHandle(res.errorCode);
            }
          })
          .catch(() => {
          });
      },

      async handleDelete(row, index) {
        this.$confirm(
          'Are you sure delete device: <i style=color:red;>' +
          row.deviceId +
          '</i> ?',
          '',
          {
            dangerouslyUseHTMLString: true,
            showClose: false,
            type: 'warning'
          }
        )
          .then(async () => {
            const res = await deleteDevice({
              deviceId: row.deviceId
            });
            if (res && !res.errorCode) {
              this.$message.success('Delete device successful!');
              this.deviceList.splice(index, 1);
            } else {
              // 错误处理
              this.exceptionHandle(res.errorCode);
            }
          })
          .catch(() => {
          });
      },

      async getFirmeUpdateListByModelId(modelId, hwVer) {
        const result = await getFirmeUpdateListByModelId({
          modelId: modelId,
          hwVer: hwVer
        });
        if(result && !result.errorCode) {
          const firmwareList = result;
          // let firmArray=[];
          let clearObj = {};
          this.firmwareVersionList = [];
          clearObj.updateId = 0;
          clearObj.fileName = 'Clear Update';
          clearObj.details = '';
          this.firmwareVersionList.push(clearObj);
          if (firmwareList.length > 0) {
            for (let i = 0; i < firmwareList.length; i++) {
              let obj = {};
              obj.updateId = firmwareList[i].updateId;
              obj.fileName = firmwareList[i].fileName;
              obj.details = firmwareList[i].details;
              this.firmwareVersionList.push(obj);
            }
          }
        }else {
          // 错误处理
          this.exceptionHandle(result.errorCode);
        }
      },

      async getDeviceSettingById(deviceId) {
        const result = await getDeviceSettingById({
          deviceId: deviceId
        });

        if(result && !result.errorCode) {
          const setting = result;
          this.form = setting;
          this.form.devices = setting.deviceId;
          this.form.relayOut = this.intToBy2(this.form.relayOut);
          delete this.form.deviceId;
          return this.form;
        }else {
          // 错误处理
          this.exceptionHandle(result.errorCode);
        }
      },

      // hideError为true则不会提示错误， 有些操作（批量修改配置）不提示错误，仅提示confirm
      batchEditFilter(hideError) {
        let isValid = true;
        let indexArray = this.selectedIndexs;
        if (indexArray.length === 0) {
          !hideError && this.$message.error('Please select at lease one tracker');
          isValid = false;
        } else if (indexArray.length > 1) {
          // 选中超过两台设备时， 所有的型号必须一致， 否则不允许修改， 因为不同的型号参数一致
          for (let i = 1; i < indexArray.length; i++) {
            if (indexArray[i-1].modelId !== indexArray[i].modelId) {
              !hideError &&
              this.$message.error(
                'Multiple equipment models are inconsistent!'
              );
              isValid = false;
              break;
            }
          }
        }
        return isValid;
      },

      intToBy2(number) {
        let array = [];
        switch (number) {
        case 0:
          break;
        case 1:
          array = ['B'];
          break;
        case 2:
          array = ['A'];
          break;
        case 3:
          array = ['A', 'B'];
          break;
        }
        return array;
      }
    }
  };
</script>

<style>
  .el-menu--horizontal > .el-menu-item {
    height: 40px;
    line-height: 50px;
  }
</style>


<style scoped>
  .fillcontain {
    height: 100%;
    position: relative;
  }

  .searchForm {
    padding: 10px 0;
  }

  .searchForm .el-input, .searchForm .el-select{
    width: 140px !important;
  }

  .device-table {
    position: absolute;
    top: 182px;
    left: 0;
    right: 0;
    bottom: 32px;
  }

  .btn-right {
    float: right;
  }

  .btns {
    padding: 15px 15px 5px;
  }
</style>
