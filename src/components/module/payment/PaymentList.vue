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
          <el-form-item label="Invoice No:" label-width="150px">
              <el-input v-model="paymentSearchForm.number" @change="search"></el-input>
          </el-form-item>
          <el-form-item label="Status:">
              <el-select v-model="paymentSearchForm.status" placeholder="All" clearable @change="search">
                  <el-option
                      v-for="item in statusOptions"
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
              <el-button class="inline" type="primary" @click="search" style="margin-left:10px;">Search/Update</el-button>
          </el-form-item>
          <el-form-item>
              <el-button class="inline" type="primary" @click="handleAdd()" style="margin-left:120px">+ Add</el-button>
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
          <el-table-column fixed label="Invoice Id" prop="paymentId" width="100"></el-table-column>
          <el-table-column fixed label="Invoice No." prop="invoiceNo" width="150"></el-table-column>
          <el-table-column label="Customer" prop="customer" width="150"></el-table-column>
          <el-table-column label="Invoice Date" prop="invoiceDate" :formatter="formatDate" width="150"></el-table-column>
          <el-table-column label="Due Date" prop="dueDate" :formatter="formatDate" width="150"></el-table-column>
          <el-table-column label="Amount" prop="amount" width="110">
              <template slot-scope="scope">
                  <span>${{ scope.row.amount === null ? ' ' : scope.row.amount.toFixed(2) }}</span>
              </template>
          </el-table-column>
          <el-table-column label="Status" prop="status" width="110">
              <template slot-scope="scope">
                  <span v-if="scope.row.status==='overdue'" style="color:red;">{{scope.row.status}}</span>
                  <span v-else-if="scope.row.status==='refund'" style="color:red;">{{scope.row.status}}</span>
                  <span v-else >{{scope.row.status}}</span>
              </template>
          </el-table-column>
          <el-table-column label="Sales" prop="sales" width="110"></el-table-column>
          <el-table-column fixed="right" label="Action" width="140" v-if="permsEdit || permsVoid">
              <template slot-scope="scope">
                  <el-dropdown size="mini" type="text" @command="handleCommand($event, scope.row, scope.$index)" trigger="click">
                      <span class="el-dropdown-link">
                          Action <i class="el-icon-arrow-down"></i></span>
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="view">View</el-dropdown-item>
                          <el-dropdown-item command="edit">Edit</el-dropdown-item>
                          <el-dropdown-item command="void">Void</el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>
                 </template>
          </el-table-column>
      </el-table>
      <invoice-review-form ref="invoiceReviewForm" v-bind:form="invoiceInfo" v-bind:table-data="orderItemTable" @reload-table="initData"></invoice-review-form>
      <edit-invoice-form ref="editInvoiceForm" v-bind:form="invoiceInfo" v-bind:table-data="orderItemTable" v-bind:reload-table="initData"></edit-invoice-form>
      <create-invoice-form ref="createInvoiceForm" v-bind:reload-table="initData"></create-invoice-form>
  </div>
</template>

<script>
import InvoiceReviewForm from './InvoiceReviewForm.vue';
import CreateInvoiceForm from '../order/CreateInvoiceForm.vue';
import EditInvoiceForm from './EditInvoiceForm';
import { getPaymentList, voidPayment, getPaymentByPaymentId, getOrderItemListByInvoiceNo } from '@/api/getData';
import { timeFormatUtil } from '@/utils/timeFormatUtil.js';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { mapState } from 'vuex';

export default {
  mixins: [timeFormatUtil, exceptionUtil],

  components: {
    EditInvoiceForm,
    InvoiceReviewForm,
    CreateInvoiceForm,
  },

  data() {
    return {
      loading: false,

    /* RESET THESE */
      command: '',
      salesPerson: '',
      permsAdd: true,
      permsEdit: true,
      permsVoid: true,
      invoiceTableData: [],
      tableData: [],
      orderItemTable: [],
      invoiceInfo: {},
      userSearchForm: {},
      paymentSearchForm: {
        number: '',
        status: '',
        customer: '',
      },

    /* DROPDOWN OPTIONS */
      statusOptions: [{
        status: 'refund',
        label: 'refund'
      }, {
        status: 'void',
        label: 'void'
      }, {
        status: 'paid',
        label: 'paid'
      }, {
        status: 'unpaid',
        label: 'unpaid'
      }, {
        status: 'overdue',
        label: 'overdue'
      }]
    };
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.bindResize);
  },

  created() {
    this.initData();
  },

  methods: {
    /* AUXILIARY FUNCTIONS */
    search() {
      this.getPayments();
    },
    initData() {
      this.getPayments();
    },

    /* HANDLER FUNCTIONS */
    async getPayments() {
      const result = await getPaymentList(
        {invoiceNo: this.paymentSearchForm.number,
          status: this.paymentSearchForm.status,
          customer: this.paymentSearchForm.customer});
      if (result) {
        this.tableData = [];
        result.forEach((item, index) => {
          let tableData = item;
          tableData.index = index + 1;
          this.tableData.push(tableData);
        });
      }
    },
    handleCommand(command, row, index) {
      if (command === 'view') {
        this.handleView(index, row);
        this.invoiceInfo = {};
        this.invoiceTableData = [];
      } else if (command === 'edit') {
        this.handleEdit(index, row);
        this.initData();
      } else {
        this.handleVoid(index, row);
      }
    },
    async handleVoid(index, row) {
      await voidPayment({paymentId: row.paymentId},{});
      this.initData();
    },

/* HANDLERS FOR SHOWING FORMS */
    handleAdd() {
      this.$refs.createInvoiceForm.showDialog();
    },
    async handleView(index, row) {
      this.getInvoiceInfo(row, index);
      this.getOrderItems(row, index);
      this.$refs.invoiceReviewForm.showDialog();
    },
    async handleEdit(index, row) {
      this.getInvoiceInfo(row, index);
      this.getOrderItems(row, index);
      this.$refs.editInvoiceForm.showDialog();
    },
    async getInvoiceInfo(row, index) {
      this.invoiceInfo = await getPaymentByPaymentId({paymentId: row.paymentId});
    },
    async getOrderItems(row, index) {
      if(row.invoiceNo === null) {
        this.orderItemTable = [];
      } else {
        const res = await getOrderItemListByInvoiceNo({invoiceNo: row.invoiceNo});
        if (res) {
          this.orderItemTable = [];
          res.forEach((item, index) => {
            let orderItem = item;
            orderItem.index = index + 1;
            this.orderItemTable.push(orderItem);
          });
        }
      }
    },
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

  watch: {

  },
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
