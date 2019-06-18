<template>
  <div class="fillcontain">
    <div ref="searchForm" class="searchForm">

    </div>
      <el-form
          class="searchForm"
          ref="Form"
          :inline="true"
          :model="paymentSearchForm"
          label-width="80px"
          size="mini"
      >
          <el-form-item label="Invoice No:">
              <el-input v-model="paymentSearchForm.number" @change="search"></el-input>
          </el-form-item>
          <el-form-item label="Status:">
              <el-select v-model="paymentSearchForm.status" placeholder="All" clearable @change="search">
                  <el-option
                      v-for="item in statusList"
                      :key="item.status"
                      :value="item.status"
                      :label="item.label"
                  ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="Customer:">
              <el-input v-model="paymentSearchForm.customer" @change="search"></el-input>
          </el-form-item>
          <el-form-item label>
              <el-button class="inline" type="primary" @click="search" style="margin-left:10px;">Search</el-button>
          </el-form-item>
      </el-form>
      <el-table
          ref="paymentListTable"
          :data="tableData"
          v-loading="loading"
          border
          stripe
          highlight-current-row
          height="500px"
          :row-key="row => row.index"
          style="width: 100%;"
      >
          <el-table-column label="Invoice No." prop="invoiceNo" width="150"></el-table-column>
          <el-table-column label="Customer" prop="customer" width="150"></el-table-column>
          <el-table-column label="Invoice Date" prop="invoiceDate" width="150"></el-table-column>
          <el-table-column label="Due Date" prop="dueDate" width="150"></el-table-column>
          <el-table-column label="Amount" prop="amount" width="110"></el-table-column>
          <el-table-column label="Status" prop="status" width="110"></el-table-column>
          <el-table-column label="Sales" prop="sales" width="110"></el-table-column>
          <el-table-column label="Action" width="140" v-if="permsEdit || permsVoid">
              <template slot-scope="scope">
                  <el-dropdown size="mini" type="text" @command="handleCommand">
                  <span class="el-dropdown-link">
                  Print<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="a">View</el-dropdown-item>
                          <el-dropdown-item command="b">Edit</el-dropdown-item>
                          <el-dropdown-item command="c">Void</el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>
                  <invoice-review-form ref="invoiceReviewForm"></invoice-review-form>
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
  import InvoiceReviewForm from './InvoiceReviewForm.vue';

  export default {
    mixins: [exceptionUtil, timeMixins],
    components: {
      InvoiceReviewForm
    },
    data() {
      return {
        userSearchForm: {},
        loading: false,
        command: '',
        permsAdd: true,
        permsEdit: true,
        permsVoid: true,
        tableData: [{
          customer: 'sun express',
          amount: '$70',
          status: 'unpaid',
          invoiceNo: '86368539',
          invoiceDate: 'May 1, 2019',
          dueDate: 'May 15, 2019',
          sales: 'Salvador'
        }, {
          customer: 'BRT',
          amount: '$210',
          status: 'overdue',
          invoiceNo: '86368540',
          invoiceDate: 'May 1, 2019',
          dueDate: 'May 15, 2019',
          sales: 'Salvador'
        }],
        paymentSearchForm: {
          number: '',
          status: '',
          customer: ''
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
        if(command==='a') {
          this.$refs.invoiceReviewForm.showDialog();
        }
      },
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
