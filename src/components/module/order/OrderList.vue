<template>
  <div class="fillcontain">
    <div ref="searchForm" class="searchForm">

    </div>
      <el-form
          class="searchForm"
          ref="Form"
          :inline="true"
          :model="orderSearchForm"
          label-width="80px"
          size="mini"
      >
          <el-form-item label="Invoice No:">
              <el-input v-model="orderSearchForm.number" @change="search"></el-input>
          </el-form-item>
          <el-form-item label="Status:">
              <el-select v-model="orderSearchForm.status" placeholder="All" clearable @change="search">
                  <el-option
                      v-for="item in statusList"
                      :key="item.status"
                      :value="item.status"
                      :label="item.label"
                  ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label>
              <el-button class="inline" type="primary" @click="search" style="margin-left:10px;">Search</el-button>
          </el-form-item>
          <el-form-item label style="float:right;">
              <el-button v-if="permsAdd" class="inline" type="primary" @click="add()">+Add </el-button>
          </el-form-item>
<!--          <el-form-item label style="float:right;">-->
<!--              <el-button v-if="permsAdd" class="inline" type="primary" @click="addUser()">+Add  Account</el-button>-->
<!--          </el-form-item>-->
      </el-form>
      <el-table
          ref="orderListTable"
          :data="tableData"
          v-loading="loading"
          border
          stripe
          highlight-current-row
          height="500px"
          :row-key="row => row.index"
          style="width: 100%;"
      >
          <el-table-column fixed label="Order ID" prop="orderId" width="100"></el-table-column>
          <el-table-column fixed label="Customer" prop="customer" width="160"></el-table-column>
          <el-table-column fixed label="Description" prop="description" width="160"></el-table-column>
          <el-table-column label="Status" prop="status" width="160"></el-table-column>
          <el-table-column label="Invoice No." prop="invoiceNo" width="200"></el-table-column>
          <el-table-column label="Invoice Date" prop="invoiceDate" width="200"></el-table-column>
          <el-table-column label="Due Date" prop="dueDate" width="120"></el-table-column>
          <el-table-column label="Tracking No." prop="trackingNo" width="120"></el-table-column>
          <el-table-column label="Sales" prop="sales" width="120"></el-table-column>
<!--          <el-table-column label="Activated" prop="roleName" width="100">-->
<!--              <template slot-scope="scope">-->
<!--                  <span v-if="scope.row.activated==0" style="color: red;">N</span>-->
<!--                  <span v-else style="color: green;">Y</span>-->
<!--              </template>-->
<!--          </el-table-column>-->
          <el-table-column label="Create Time" prop="createTime" :formatter="formatDate" width="120"></el-table-column>
          <el-table-column fixed="right" label="Action" width="160" v-if="permsEdit || permsVoid">
              <template slot-scope="scope">
                  <el-dropdown size="mini" type="text" @command="handleCommand">
                  <span class="el-dropdown-link">
                  View<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="a">Edit</el-dropdown-item>
                          <el-dropdown-item command="b">Void</el-dropdown-item>

                      </el-dropdown-menu>
                  </el-dropdown>
              </template>
          </el-table-column>
      </el-table>

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

    },
    data() {
      return {
        userSearchForm: {},
        loading: false,
        permsAdd: true,
        permsEdit: true,
        permsVoid: true,
        tableData: [{
          orderId: 1,
          customer: 'sun express',
          description: 'VT1U1*10',
          status: 'shipped',
          invoiceNo: '86368539',
          invoiceDate: 'May 1, 2019',
          dueDate: 'May 15, 2019',
          trackingNo: '86239052930',
          sales: 'Salvador'
        }, {
          orderId: 2,
          customer: 'BRT',
          description: 'VT1711*10',
          status: 'pending',
          invoiceNo: '86368539',
          invoiceDate: 'May 1, 2019',
          dueDate: 'May 15, 2019',
          trackingNo: '86239052930',
          sales: 'Salvador'
        }],
        orderSearchForm: {
          number: '',
          status: ''
        },
        statusList: [{
          status: 'refund',
          label: 'refund'
        }, {
          status: 'void',
          label: 'void'
        }, {
          status: 'shipped',
          label: 'shipped'
        }, {
          status: 'pending',
          label: 'pending'
        }]
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

    },

    beforeDestroy() {
      window.removeEventListener('resize', this.bindResize);
    },

    created() {

    },

    watch: {

    },

    methods: {
      search() {
        alert(1);
      },
      add() {
        alert(2);
      },
      handleCommand(command) {
        alert('clicked');
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
  .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
      font-size: 12px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .el-form-item {
      display: inline-block;
  }
  .el-icon-arrow-down {
      font-size: 12px;
  }
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
