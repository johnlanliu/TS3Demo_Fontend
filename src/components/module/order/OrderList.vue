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
              <el-select v-model="orderSearchForm.status" placeholder="All" clearable @change="search" value="">
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
              <el-button v-if="permsAdd" class="inline" type="primary" @click="handleAdd()">+Add </el-button>
          </el-form-item>
<!--          <el-form-item label style="float:right;">-->
<!--              <el-button v-if="permsAdd" class="inline" type="primary" @click="addUser()">+Add  Account</el-button>-->
<!--          </el-form-item>-->
          <add-order-form ref="addOrderForm" :form="form"></add-order-form>
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
<!--          <el-table-column label="Description" type="expand" width="160">-->
<!--              -->
<!--          </el-table-column>-->
<!--          <el-table-column fixed type="expand">-->
<!--              <template class="el-description" slot-scope="props">-->
<!--                  <p>Description: {{ props.row.description }}</p>-->
<!--              </template>-->
<!--          </el-table-column>-->
          <el-table-column fixed label="Order ID" prop="orderId" width="100"></el-table-column>
          <el-table-column fixed label="Type" prop="type" width="130" >
              <template slot-scope="scope">
                  <span style="color:green;">{{scope.row.type}}</span>
              </template>
          </el-table-column>
          <el-table-column fixed label="Customer" prop="customer" width="160"></el-table-column>
          <el-table-column label="Description" prop="description" width="160"></el-table-column>
          <el-table-column label="Status" prop="status" width="160">
              <template slot-scope="scope">
                  <span v-if="scope.row.status==='shipped'" style="color:green;">{{scope.row.status}}</span>
                  <span v-else-if="scope.row.status==='delivered'" style="color:green;">{{scope.row.status}}</span>
                  <span v-else-if="scope.row.status==='cancelled'" style="color:red;">{{scope.row.status}}</span>
                  <span v-else>{{scope.row.status}}</span>
              </template>
          </el-table-column>
          <el-table-column label="Invoice No." prop="invoiceNo" width="200"></el-table-column>
          <el-table-column label="Invoice Date" prop="invoiceDate" width="200"></el-table-column>
          <el-table-column label="Due Date" prop="dueDate" width="120"></el-table-column>
          <el-table-column label="Tracking No." prop="trackingNo" width="120">
              <template slot-scope="scope">
                  <a href="https://www.anytrek.com/">{{scope.row.trackingNo}}</a>
              </template>
          </el-table-column>
          <el-table-column label="Sales" prop="sales" width="120"></el-table-column>
          <el-table-column label="Create Time" prop="createTime" :formatter="formatDate" width="120"></el-table-column>
          <el-table-column fixed="right" label="Action" width="160" v-if="permsEdit || permsVoid">
              <template slot-scope="scope">
                  <el-dropdown size="mini" type="text" @command="handleCommand">
                  <span class="el-dropdown-link">
                  Action<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="a">View</el-dropdown-item>
                          <el-dropdown-item command="b">Edit</el-dropdown-item>

                      </el-dropdown-menu>
                  </el-dropdown>
                  <order-review-form ref="orderReviewForm"></order-review-form>
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
  import AddOrderForm from './AddOrderForm.vue';
  import OrderReviewForm from './OrderReviewForm.vue';
  import { getOrderList } from '@/api/getData';

  export default {
    mixins: [exceptionUtil, timeMixins],
    components: {
      AddOrderForm,
      OrderReviewForm
    },
    data() {
      return {
        userSearchForm: {},
        dialogVisible: false,
        loading: false,
        permsAdd: true,
        permsEdit: true,
        permsVoid: true,
        form: {},
        tableData: [],
        orderSearchForm: {
          number: '',
          status: ''
        },
        statusList: [{
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
      this.initData();
    },

    watch: {

    },

    methods: {
      search() {
        this.getOrders();
      },
      handleAdd() {
        this.$refs.addOrderForm.showDialog();
      },
      handleCommand(command) {
        if(command==='a') {
          this.$refs.orderReviewForm.showDialog();
        }
      },
      async initData() {
            // const result = await getValidRoleList({});
        this.getOrders();
      },
      async getOrders() {
        const result = await getOrderList(
          {invoiceNo: this.orderSearchForm.number,
            status: this.orderSearchForm.status});
        if (result) { // && !result.errorCode) {
          this.tableData = [];
          result.forEach((item, index) => {
            let tableData = item;
            tableData.index = index + 1;
            this.tableData.push(tableData);
          });
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
