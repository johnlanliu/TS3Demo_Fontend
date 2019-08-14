<template>
  <div class="fillcontain">
    <el-form
      class="searchForm"
      ref="Form"
      :inline="true"
      :model="orderSearchForm"
      label-width="80px"
      label-suffix=":"
      size="mini"
    >
      <el-form-item label="Invoice">
        <el-input v-model="orderSearchForm.invoice" clearable @change="handleSearch"></el-input>
      </el-form-item>
      <el-form-item label="Status">
        <el-select v-model="orderSearchForm.status" placeholder="All" clearable @change="handleSearch">
          <el-option
            v-for="item in statusOptions"
            :key="item.label"
            :value="item.status"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          class="inline"
          type="primary"
          @click="handleSearch"
          style="margin-left:10px;"
        >Search/Update</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button
          class="inline"
          type="primary"
          @click="handleAdd()"
        >+ {{ lang.add }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      stripe
      highlight-current-row
      :height="tableHeight"
      tooltip-effect="light	"
      @sort-change="handleSort"
      style="margin-top: 5px"
    >
      <el-table-column label="NO" type="index" width="80" fixed></el-table-column>
      <el-table-column fixed label="Type" prop="type" width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.type===1" style="color:green;">Evaluation</span>
          <span v-else-if="scope.row.type===2" style="color:green;">Purchase</span>
          <span v-else-if="scope.row.type===3" style="color:green;">RMA</span>
          <span v-else>unknown</span>
        </template>
      </el-table-column>
      <el-table-column fixed label="Customer" prop="customer" width="130"></el-table-column>
      <el-table-column label="Description" prop="description" width="180">
      </el-table-column>
      <el-table-column label="Status" prop="status" width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.status===1" style="color:green;">Shipped</span>
          <span v-else-if="scope.row.status===2" style="color:green;">Delivered</span>
          <span v-else-if="scope.row.status===-1" style="color:red;">Cancelled</span>
          <span v-else>unknown</span>
        </template>
      </el-table-column>
      <el-table-column label="Invoice No." prop="invoiceNo" width="110"></el-table-column>
      <el-table-column label="Invoice Date" prop="invoiceDate" :formatter="formatDate" width="140"></el-table-column>
      <el-table-column label="Due Date" prop="dueDate" :formatter="formatDate" width="140"></el-table-column>
      <el-table-column label="Tracking No." prop="deviceId" width="140">
        <template slot-scope="scope">
          <a href="https://www.anytrek.com/" style="color:blue;">{{scope.row.deviceId}}</a>
        </template>
      </el-table-column>
      <el-table-column label="Sales" prop="sales" width="90"></el-table-column>
      <el-table-column label="Create Time" prop="createTime" :formatter="formatDate" width="140"></el-table-column>
      <el-table-column fixed="right" label="Action" width="140" >
        <template slot-scope="scope">
          <el-dropdown
            size="mini"
            type="text"
            @command="handleCommand($event, scope.row, scope.$index)"
            trigger="click"
          >
            <span class="el-dropdown-link">
              Action
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="view">View</el-dropdown-item>
              <el-dropdown-item command="edit">Edit</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
        :current-page="page"
        :page-sizes="[15, 20, 30, 50, 100]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrChange">
      </el-pagination>
    <order-review-form
      v-model="orderReviewFormVisible"
      :form="form"
    ></order-review-form>
    <edit-order-form
      v-model="editFormVisible"
      :form="form"
      @reload-table="handleReloadTable"
    ></edit-order-form>
  </div>
</template>

<script>
import OrderReviewForm from './OrderReviewForm.vue';
import EditOrderForm from './EditOrderForm.vue';
import {
  getOrderList,
  getOrderByOrderId,
  getOrderItem,
  getOrgById,
  connectToQuickBooks
} from '@/api/getData';
import { timeFormatUtil } from '@/utils/timeFormatUtil.js';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { mapState } from 'vuex';
// import { handlePerms } from '@/utils/perms.js';
import { debounce } from '@/config/mUtils';

export default {
  mixins: [timeFormatUtil, exceptionUtil],

  components: {
    OrderReviewForm,
    EditOrderForm
  },

  props: {
    value: Boolean,
    query: Object
  },

  data() {
    return {
      loading: false,
      tableHeight: window.innerHeight - 175,
      page: 1,
      pageSize: 20,
      total: 0,
      sort: null,
      editFormVisible: false,
      orderReviewFormVisible: false,
      /* RESET THESE */
      // permsAdd: false,
      // permsEdit: false,
      // permsVoid: false,
      sameAsBilling: false,
      orderInfoToView: {},
      orderItemTable: [],
      form: {},
      tableData: [{}],
      // userSearchForm: {},
      orderSearchForm: {},

      /* DROPDOWN OPTIONS */
      statusOptions: [
        {
          label: 'Delivered',
          status: 2
        },
        {
          label: 'Cancelled',
          status: -1
        },
        {
          label: 'Shipped',
          status: 1
        },
        {
          label: 'Pending',
          status: 3
        }
      ]
    };
  },

  computed: {
    ...mapState([
      'loginInfo',
      'modelList',
      'currentOrgId',
      'lang',
      'locale',
      'currentOrg'
    ]),
    org: function() {
      return this.currentOrg;
    },

    labelWidth() {
      return this.locale === 'es' ? '122px' : '100px';
    }
  },

  mounted() {
      // let perms = handlePerms('org:order');
      // this.permsAdd = perms.some(v => v === 'add');
      // this.permsEdit = perms.some(v => v === 'edit');
      // this.permsDelete = perms.some(v => v === 'delete');
    // 监听窗口大小变化
    window.addEventListener('resize', debounce(this.bindResize, 500));
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.bindResize);
  },

  created() {
    this.initData();
  },

  watch: {
    visible(val) {
      if(val) {
        this.fetchOrdersList();
      } else {
        this.total = 0;
        this.page = 1;
        this.pageSize = 20;
        this.sort = null;
      }
    }
  },

  methods: {
    // resize
    bindResize() {
      this.tableHeight = document.body.clientHeight - 175;
    },
    /* AUXILIARY FUNCTIONS */
    handleSearch() {
      this.page = 1;
      this.fetchOrdersList();
    },
    async initData() {
      this.fetchOrdersList();
    },

    /* HANDLERS FOR SHOWING FORMS */
    async handleAdd() {
      const org = this.currentOrg;
      this.form = {};
      this.form.billingCompany = this.currentOrg.orgName;
      this.form.billingContact = this.currentOrg.contacts;
      this.form.billingPhone = this.currentOrg.phone;
      this.form.billingEmail = this.currentOrg.email;
      this.form.billingAddress = this.currentOrg.streetAddress;
      this.form.billingCity = this.currentOrg.city;
      this.form.billingState = this.currentOrg.state;
      this.form.billingCountry = this.currentOrg.country;
      this.form.billingZip = this.currentOrg.zip;
      this.editFormVisible = true;
    },

    /* HANDLER FUNCTIONS */
    handleCommand(command, row, index) {
      // this.getOrderInfo(row, index);
      // this.getOrderItems(row, index);
      if (command === 'view') {
        // this.$refs.orderReviewForm.showDialog();
        this.orderReviewFormVisible = true;
      } else {
        // this.$refs.editOrderForm.showDialog();
        this.form = {...row};
        this.editFormVisible = true;
      }
      this.orderInfoToView = {};
      this.orderItemTable = [];
    },
    async getOrderInfo(row, index) {
      this.orderInfoToView = await getOrderByOrderId({ orderId: row.orderId });
    },
    async getOrderItems(row, index) {
      this.loading = true;
      const res = await getOrderItem({ orderId: row.orderId });
      this.loading = false;
      if (res && !res.errorCode) {
        this.orderItemTable = [];
        res.forEach((item, index) => {
          let orderItem = item;
          orderItem.index = index + 1;
          this.orderItemTable.push(orderItem);
        });
      }
    },

// 分页改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchOrdersList();
    },

    // 当前页改变
    handleCurrChange(val) {
      this.page = val;
      this.fetchOrdersList();
    },

    // 搜索
    handleSearch() {
      this.page = 1;
      this.fetchOrdersList();
    },

    // 排序
    handleSort(param) {
      if(param.order || param.prop)
        this.sort = (param.order==='ascending' ? '+' : '-') + param.prop;
      else
        this.sort = null;
      this.page = 1;
      this.fetchOrdersList();
    },

    clearValidate() {
      this.visible = false;
      this.$refs.form.clearValidate();
    },
    handleReloadTable() {
      this.fetchOrdersList();
    },

    // ajax 获取order
    async fetchOrdersList() {
      this.loading = true;
      this.tableData = [{}];
      const param = {
        pageindex: this.page,
        pagesize: this.pageSize,
        sort: this.sort,
        ...this.orderSearchForm
      };
      const result = await getOrderList(param);
      this.loading = false;
      if(!result || result.errorCode) return;
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
.types {
  color: green;
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

.el-description {
  font-size: 12px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
