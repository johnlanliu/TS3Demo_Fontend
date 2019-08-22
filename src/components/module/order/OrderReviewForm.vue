<template>
  <el-dialog
    width="701px"
    :title="'Order Review'"
    :center="true"
    top="15vh"
    :visible.sync="visible"
    :append-to-body="append"
    @close="resetFields"
  >
    <div class="form-box">
      <el-form ref="form" :label-position="labelPosition" :model="form" size="mini">
        <el-row class="rowHeight">
          <el-col :span="10" :offset="2" class="rowHeight">
            <el-form-item label="BILL TO" style="font-weight: 900"></el-form-item>
          </el-col>
          <el-col :span="10" class="rowHeight">
            <el-form-item label="SHIP TO" style="font-weight: 900"></el-form-item>
          </el-col>
        </el-row>
        <el-row class="rowHeight">
          <el-col :span="10" :offset="2" class="rowHeight">
            <el-form-item label="Company: " style="float: left"></el-form-item>
            <el-form-item>{{ form.billingCompany }}</el-form-item>
          </el-col>
          <el-col :span="10" class="rowHeight">
            <el-form-item label="Company: " style="float: left"></el-form-item>
            <el-form-item>{{ form.shippingCompany}}</el-form-item>
          </el-col>
        </el-row>
        <el-row class="rowHeight">
          <el-col :span="10" :offset="2" class="rowHeight">
            <el-form-item label="Address: " style="float: left"></el-form-item>
            <el-form-item>{{ form.billingAddress }}</el-form-item>
          </el-col>
          <el-col :span="10" class="rowHeight">
            <el-form-item label="Address: " style="float: left"></el-form-item>
            <el-form-item>{{ form.shippingAddress }}</el-form-item>
          </el-col>
        </el-row>
        <el-row class="rowHeight">
          <el-col :span="10" :offset="2" class="rowHeight">
            <el-form-item label="Phone Number: " style="float: left"></el-form-item>
            <el-form-item>{{ form.billingNumber }}</el-form-item>
          </el-col>
          <el-col :span="10" class="rowHeight">
            <el-form-item label="Phone Number: " style="float: left"></el-form-item>
            <el-form-item>{{ form.shippingNumber }}</el-form-item>
          </el-col>
        </el-row>
        <el-row class="rowHeight">
          <el-col :span="10" :offset="2" class="rowHeight">
            <el-form-item label="Email: " style="float: left"></el-form-item>
            <el-form-item>{{ form.billingEmail }}</el-form-item>
          </el-col>
          <el-col :span="10" class="rowHeight">
            <el-form-item label="Email: " style="float: left"></el-form-item>
            <el-form-item>{{ form.shippingEmail }}</el-form-item>
          </el-col>
        </el-row>
        <el-row class="rowHeight">
          <el-col :offset="2" class="rowHeight">
            <el-form-item label="Order Type: " style="font-weight: 900; float: left"></el-form-item>
            <el-form-item>
              <span v-if="form.type===1">Evaluation</span>
              <span v-else-if="form.type===2">Purchase</span>
              <span v-else-if="form.type===3">RMA</span>
              <span v-else>unknown</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="rowHeight">
          <el-col :offset="2" class="rowHeight">
            <el-form-item label="Account Manager: " style="font-weight: 900; float: left"></el-form-item>
            <el-form-item>{{form.sales}}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="Items"
          style="font-weight: 900; padding-left: 50px; border-spacing: 0px"
        ></el-form-item>
        <el-table
          ref="orderDetailTable"
          :data="tableData"
          v-loading="loading"
          border
          stripe
          highlight-current-row
          height="131px"
          :row-key="row => row.index"
          style="width: 170%; margin-left: 50px; margin-bottom: 10px"
        >
          <el-table-column label="Date" width="80">
            <template>
              <span>{{form.invoiceDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="ITEM" prop="product" width="210"></el-table-column>
          <el-table-column label="QTY" prop="quantity" width="80"></el-table-column>
          <el-table-column label="RATE" prop="rate" width="100">
            <template slot-scope="scope">
              <span>${{ Number(scope.row.rate).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="AMOUNT" prop="amount" width="120">
            <template slot-scope="scope">
              <span>${{ Number(scope.row.amount).toFixed(2) }}</span>
            </template>
          </el-table-column>
        </el-table>

        <el-row>
          <el-col :span="2" :offset="18" style="font-weight: 900">
            <el-form-item label="Total: " class="plus"></el-form-item>
          </el-col>
          <el-col :span="2" :offset="2" style="font-weight: 900">
            <el-form-item :total="total" class="plus">${{ total }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="18" style="font-weight: 900">
            <el-form-item label="plus shipping fee" class="plus"></el-form-item>
          </el-col>
        </el-row>

        <div style="margin-left: 547px; margin-top: 5px">
          <el-button type="primary" @click="handleCancelOrder">cancel order</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { cancelOrder } from '@/api/getData';

export default {
  name: 'OrderReviewForm',
  props: {
    value: Boolean,
    form: [Object],
    orderItemTable: Array
  },
  data: function() {
    return {
      loading: false,
      append: true,
      labelPosition: 'left',
      tableData: []
    };
  },

  methods: {
    resetFields() {
      this.$refs.form.resetFields();
    },

    /* HANDLER FUNCTIONS */
    async handleCancelOrder() {
      await cancelOrder({ orderId: this.form.orderId }, {});
      // this.initData();
      this.visible = false;
    },

    clearValidate() {
      this.visible = false;
      this.$refs.form.clearValidate();
    }
  },

  watch: {
    orderItemTable: {
      handler: function(val) {
        if (this.orderItemTable) {
          this.tableData = this.orderItemTable.concat([]);
        } else {
          this.tableData = [];
        }
      },
      immediate: true
    }
  },

  computed: {
    tax: function() {
      let t = 0;
      let et;
      const copy = this.tableData.slice();
      copy.forEach(function(item, index) {
        if (item.tax === 'Y') {
          et = Number(item.amount) * 0.0775;
        } else {
          et = 0;
        }
        t += et;
      });
      return Math.floor(t * 100) / 100;
    },
    total: function() {
      let t = 0;
      const copy = this.tableData.slice();
      copy.forEach(function(item, index) {
        t += item.amount;
      });
      const tot = t + this.tax;
      return Math.floor(tot * 100) / 100;
    },
    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>

<style scoped>
.el-form-item.plus {
  margin-left: 50px;
}

.el-row.rowHeight {
  height: 30px;
}

.el-col.rowHeight {
  height: 100%;
}

td.firstSpacing {
  vertical-align: top;
  padding-left: 50px;
  width: 300px;
}

td.secondSpacing {
  vertical-align: top;
  padding-right: 165px;
}
</style>
