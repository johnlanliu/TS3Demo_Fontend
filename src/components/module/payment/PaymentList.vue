<template>
  <div class="fillcontain">
    <el-form class="searchForm" ref="Form" :inline="true" :model="paymentSearchForm" size="mini">
      <el-form-item label="Invoice No:">
        <el-input v-model="paymentSearchForm.invoiceNo" clearable @change="search"></el-input>
      </el-form-item>
      <el-form-item label="Status:">
        <el-select v-model="paymentSearchForm.status" placeholder="All" clearable @change="search">
          <el-option
            v-for="item in statusOption"
            :key="item.status"
            :value="item.status"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Customer:">
        <el-input v-model="paymentSearchForm.customer" clearable @change="search"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left: 10px;" @click="search">Search/Update</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">Add</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="paymentListTable"
      :data="tableData"
      v-loading="loading"
      border
      stripe
      highlight-current-row
      :height="tableHeight"
      :row-key="row => row.index"
      style="width: 100%;"
    >
      <el-table-column fixed label="Invoice No." prop="invoiceNo" min-width="110"></el-table-column>
      <el-table-column label="Customer" prop="customer" min-width="130"></el-table-column>
      <el-table-column
        label="Invoice Date"
        prop="invoiceDate"
        :formatter="formatDate"
        min-width="140"
      ></el-table-column>
      <el-table-column label="Due Date" prop="dueDate" :formatter="formatDate" min-width="140"></el-table-column>
      <el-table-column label="Amount" prop="amount" min-width="109">
        <template slot-scope="scope">
          <span>${{ scope.row.amount === undefined ? ' ' : scope.row.amount.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" prop="status" min-width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 3 || scope.row.status === 4" style="color:red;">{{getStatusOption(scope.row.status)}}</span>
          <span v-else>{{getStatusOption(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Sales" prop="sales" min-width="90"></el-table-column>
      <el-table-column fixed="right" label="Action" min-width="140" v-if="permsEdit || permsVoid">
        <template slot-scope="scope">
          <el-dropdown
            size="mini"
            type="text"
            @command="handleCommand($event, scope.row, scope.$index)"
            trigger="click"
          >
            <span class="el-dropdown-link">
              Action
              <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="view">View</el-dropdown-item>
              <el-dropdown-item command="edit">Edit</el-dropdown-item>
              <el-dropdown-item command="void">Void</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- <invoice-review-form ref="invoiceReviewForm" v-bind:form="invoiceInfo" v-bind:table-data="paymentItemTable" @reload-table="initData"></invoice-review-form>
    <edit-invoice-form ref="editInvoiceForm" v-bind:form="invoiceInfo" v-bind:table-data="paymentItemTable" v-bind:reload-table="initData"></edit-invoice-form>
    <create-invoice-form ref="createInvoiceForm" v-bind:reload-table="initData"></create-invoice-form>-->
    <el-pagination
      :current-page="page"
      :page-sizes="[15, 20, 30, 50, 100]"
      :page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrChange"
    ></el-pagination>
    <payment-review-form
      v-model="reviewFormVisible"
      :form="form"
      :paymentItemTable="paymentItemTable"
    ></payment-review-form>
    <edit-payment-form
      v-model="editFormVisible"
      :form="form"
      :paymentItemTable="paymentItemTable"
      @same-as-billing="handleSameAsBilling"
      @reload-table="handleReloadTable"
    ></edit-payment-form>
  </div>
</template>

<script>
import PaymentReviewForm from './PaymentReviewForm.vue';
import EditPaymentForm from './EditPaymentForm.vue';
import {
  getPaymentList,
  voidPayment,
  getPaymentByPaymentId,
  getPaymentItem
} from '@/api/getData';
import { timeFormatUtil } from '@/utils/timeFormatUtil.js';
import { timestampFormatDate, timestampToDate } from '@/utils/time';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { mapState } from 'vuex';
import { debounce } from '@/config/mUtils';

export default {
  mixins: [timeFormatUtil, exceptionUtil],

  components: {
    // EditInvoiceForm,
    // InvoiceReviewForm,
    // CreateInvoiceForm,
    PaymentReviewForm,
    EditPaymentForm
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
      page: 1,
      pageSize: 20,
      total: 0,
      sort: null,
      invoiceTableData: [],
      tableData: [],
      paymentItemTable: [],
      invoiceInfo: {},
      paymentSearchForm: {
        number: '',
        status: '',
        customer: ''
      },
      reviewFormVisible: false,
      editFormVisible: false,
      form: {},
      tableHeight: window.innerHeight - 165,

      /* DROPDOWN OPTIONS */
      statusOption: [
        {
          label: 'VOID',
          status: -1
        },
        {
          label: 'PAID',
          status: 1
        },
        {
          label: 'UNPAID',
          status: 2
        },
        {
          label: 'REFUND',
          status: 3
        },
        {
          label: 'OVERDUE',
          status: 4
        }
      ]
    };
  },

  created() {
    this.initData();
  },

  watch: {
    visible(val) {
      if (val) {
        this.getPayments();
      } else {
        this.total = 0;
        this.page = 1;
        this.pageSize = 20;
        this.sort = null;
        this.form = {};
      }
    }
  },

  mounted() {
    // 监听窗口大小变化
    window.addEventListener('resize', debounce(this.bindResize, 500));
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.bindResize);
  },

  computed: {
    ...mapState([
      'loginInfo',
      'modelList',
      'currentOrgId',
      'lang',
      'locale',
      'currentOrg'
    ])
  },

  methods: {
    /* AUXILIARY FUNCTIONS */
    search() {
      this.getPayments();
    },
    initData() {
      this.getPayments();
    },

    getStatusOption(status) {
      let index = this.statusOption.findIndex(v => v.status === status);
      if(index > -1) {
        return this.statusOption[index].label;
      }
      return '';
    },

    // resize
    bindResize() {
      this.tableHeight = document.body.clientHeight - 175;
    },

    async handleVoid(paymentId) {
      await voidPayment({ paymentId });
      this.initData();
    },

    /* HANDLERS FOR SHOWING FORMS */
    handleAdd() {
      this.form = {
        billingCompany: this.currentOrg.orgName,
        billingContact: this.currentOrg.contacts,
        billingPhone: this.currentOrg.phone,
        billingEmail: this.currentOrg.email,
        billingAddress: this.currentOrg.streetAddress,
        billingCity: this.currentOrg.city,
        billingState: this.currentOrg.state,
        billingCountry: this.currentOrg.country,
        billingZip: this.currentOrg.zip
      };
      this.paymentItemTable = [];
      this.editFormVisible = true;
    },

    handleSameAsBilling() {
      this.form = Object.assign({}, this.form, {
        shippingCompany: this.form.billingCompany,
        shippingContact: this.form.billingContact,
        shippingPhone: this.form.billingPhone,
        shippingEmail: this.form.billingEmail,
        shippingAddress: this.form.billingAddress,
        shippingCity: this.form.billingCity,
        shippingState: this.form.billingState,
        shippingCountry: this.form.billingCountry,
        shippingZip: this.form.billingZip
      });
    },

    async handleCommand(command, row, index) {
      this.form = Object.assign({}, row, {dueDate: timestampToDate(row.dueDate)});
      if (command === 'edit' || command === 'view') {
        this.paymentItemTable = await getPaymentItem({
          paymentId: row.paymentId
        });
        this.invoiceInfo = await getPaymentByPaymentId({
          paymentId: row.paymentId
        });
        command === 'edit'
          ? (this.editFormVisible = true)
          : (this.reviewFormVisible = true);
      } else {
        this.handleVoid(row.paymentId);
      }
    },

    handleReloadTable() {
      this.getPayments();
    },

    async getInvoiceInfo(row, index) {
      this.invoiceInfo = await getPaymentByPaymentId({
        paymentId: row.paymentId
      });
    },
    // 分页改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPayments();
    },

    // 当前页改变
    handleCurrChange(val) {
      this.page = val;
      this.getPayments();
    },

    // 搜索
    handleSearch() {
      this.page = 1;
      this.getPayments();
    },

    // 排序
    handleSort(param) {
      if (param.payment || param.prop)
        this.sort = (param.order === 'ascending' ? '+' : '-') + param.prop;
      else this.sort = null;
      this.page = 1;
      this.getPayments();
    },

    async getPayments() {
      this.loading = true;
      const params = {
        pageindex: this.page,
        pagesize: this.pageSize,
        sort: this.sort,
        ...this.paymentSearchForm
      };
      const result = await getPaymentList(params);
      this.loading = false;
      if (!result || result.errorCode) return;
      this.tableData = result.list || [];
      this.total = result.totalRows;
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
  color: #409eff;
  font-size: 12px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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

.searchForm .el-input,
.searchForm .el-select {
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
