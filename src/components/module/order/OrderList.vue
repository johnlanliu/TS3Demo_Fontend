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
          <el-form-item label="Invoice No:" label-width="150px">
              <el-input v-model="orderSearchForm.number" @change="search"></el-input>
          </el-form-item>
          <el-form-item label="Status:">
              <el-select v-model="orderSearchForm.status" placeholder="All" clearable @change="search">
                  <el-option
                      v-for="item in statusOptions"
                      :key="item.status"
                      :value="item.status"
                      :label="item.label"
                  ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button class="inline" type="primary" @click="search" style="margin-left:10px;">Search/Update</el-button>
          </el-form-item>
          <el-form-item>
              <el-button class="inline" type="primary" @click="handleConnect()" style="margin-left: 250px">connect</el-button>
          </el-form-item>
          <el-form-item>
              <el-button v-if="permsAdd" class="inline" type="primary" @click="handleAdd()"
              style="margin-left: 324px">+ Add</el-button>
          </el-form-item>
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
          <el-table-column fixed label="Type" prop="type" width="110" >
              <template slot-scope="scope">
                  <span style="color:green;">{{scope.row.type}}</span>
              </template>
          </el-table-column>
          <el-table-column fixed label="Customer" prop="customer" width="130"></el-table-column>
          <el-table-column label="Description" prop="description" width="180">
              <template slot-scope="scope">
                  <ul id="descriptionList">
                      <li v-for="des in scope.row.description">
                          {{ des + '\n' }}
                      </li>
                  </ul>
              </template>
          </el-table-column>
          <el-table-column label="Status" prop="status" width="110">
              <template slot-scope="scope">
                  <span v-if="scope.row.status==='shipped'" style="color:green;">{{scope.row.status}}</span>
                  <span v-else-if="scope.row.status==='delivered'" style="color:green;">{{scope.row.status}}</span>
                  <span v-else-if="scope.row.status==='cancelled'" style="color:red;">{{scope.row.status}}</span>
                  <span v-else>{{scope.row.status}}</span>
              </template>
          </el-table-column>
          <el-table-column label="Invoice No." prop="invoiceNo" width="110"></el-table-column>
          <el-table-column label="Invoice Date" prop="invoiceDate" :formatter="formatDate" width="140"></el-table-column>
          <el-table-column label="Due Date" prop="dueDate" :formatter="formatDate" width="140"></el-table-column>
          <el-table-column label="Tracking No." prop="trackingNo" width="140">
              <template slot-scope="scope">
                  <a href="https://www.anytrek.com/">{{scope.row.trackingNo}}</a>
              </template>
          </el-table-column>
          <el-table-column label="Sales" prop="sales" width="90"></el-table-column>
          <el-table-column label="Create Time" prop="createTime" :formatter="formatDate" width="140"></el-table-column>
          <el-table-column fixed="right" label="Action" width="140" v-if="permsEdit || permsVoid">
              <template slot-scope="scope">
                  <el-dropdown size="mini" type="text" @command="handleCommand($event, scope.row, scope.$index)" trigger="click">
                  <span class="el-dropdown-link">
                  Action<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="view">View</el-dropdown-item>
                          <el-dropdown-item command="edit">Edit</el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>
              </template>
          </el-table-column>
      </el-table>
      <order-review-form ref="orderReviewForm" v-bind:form="orderInfoToView" v-bind:table-data="orderItemTable"
                         v-bind:init-data="initData"></order-review-form>
      <edit-order-form ref="editOrderForm" :editForm="orderInfoToView" v-bind:table-data="orderItemTable" v-bind:init-data="initData"
                       v-bind:same-as-billing="sameAsBilling"></edit-order-form>
      <add-order-form ref="addOrderForm" v-bind:org="orgCopy"></add-order-form>
  </div>
</template>

<script>
import AddOrderForm from './AddOrderForm.vue';
import OrderReviewForm from './OrderReviewForm.vue';
import EditOrderForm from './EditOrderForm.vue';
import { getOrderList, getOrderByOrderId, getOrderItem, getOrgById, connectToQuickBooks } from '@/api/getData';
import { timeFormatUtil } from '@/utils/timeFormatUtil.js';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { mapState } from 'vuex';

export default {
  mixins: [timeFormatUtil, exceptionUtil],

  components: {
    AddOrderForm,
    OrderReviewForm,
    EditOrderForm
  },

  data() {
    return {
      loading: false,

    /* RESET THESE */
      permsAdd: true,
      permsEdit: true,
      permsVoid: true,
      sameAsBilling: false,
      orderInfoToView: {},
      orderItemTable: [],
      form: {},
      orgCopy: {},
      tableData: [],
      userSearchForm: {},
      orderSearchForm: {
        number: '',
        status: ''
      },

    /* DROPDOWN OPTIONS */
      statusOptions: [{
        status: 'delivered',
        label: 'delivered'
      }, {
        status: 'cancelled',
        label: 'cancelled'
      }, {
        status: 'shipped',
        label: 'shipped'
      }, {
        status: 'pending',
        label: 'pending'
      }]
    };
  },

  mounted() {

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
      this.getOrders();
    },
    async initData() {
      this.getOrders();
    },

    /* HANDLER FUNCTIONS */
    handleCommand(command, row, index) {
      this.getOrderInfo(row, index);
      this.getOrderItems(row,index);
      if(command==='view') {
        this.$refs.orderReviewForm.showDialog();
      } else {
        this.$refs.editOrderForm.showDialog();
      }
      this.orderInfoToView = {};
      this.orderItemTable = [];
    },
    async getOrderInfo(row, index) {
      this.orderInfoToView = await getOrderByOrderId({orderId: row.orderId});
      this.sameAsBilling = this.orderInfoToView.sameAsBilling === 1;
    },
    async getOrderItems(row,index) {
      const res = await getOrderItem({orderId: row.orderId});
      if (res) {
        this.orderItemTable = [];
        res.forEach((item, index) => {
          let orderItem = item;
          orderItem.index = index + 1;
          this.orderItemTable.push(orderItem);
        });
      }
    },
    async getOrders() {
      const result = await getOrderList(
        {invoiceNo: this.orderSearchForm.number,
          status: this.orderSearchForm.status});
      if (result) {
        this.tableData = [];
        result.forEach((item, index) => {
          let g = [];
          if(item.description !== null) {
            g = item.description.split(', ');
          }
          let tableData = item;
          tableData.description = g;
          tableData.index = index + 1;
          this.tableData.push(tableData);
        });
      }
    },
    /* HANDLERS FOR SHOWING FORMS */
    async handleAdd() {
      this.orgCopy = JSON.parse(JSON.stringify(this.org));
      this.$refs.addOrderForm.showDialog();
    },
      async handleConnect() {
        await connectToQuickBooks();
      },
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
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>
