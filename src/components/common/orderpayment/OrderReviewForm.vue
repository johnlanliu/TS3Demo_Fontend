<template>
  <el-dialog
    width="701px"
    :title="'Payment Review'"
    :center="true"
    top="15vh"
    :visible.sync="visible"
    :append-to-body="append"
    @close="resetFields">
    <div class="payment-review-wrap">
      <el-form ref="form" :label-position="labelPosition" label-suffix=":" :model="form" size="mini">
        <div class="basic-info">
          <div>
            <p style="font-weight: 900">BILL TO</p>
            <el-form-item label="Company">{{ form.billingCompany }}</el-form-item>
            <el-form-item label="Address">{{ form.billingAddress }}</el-form-item>
            <el-form-item label="Phone Number">{{ form.billingNumber }}</el-form-item>
            <el-form-item label="Email">{{ form.billingEmail }}</el-form-item>
          </div>
          <div>
            <p style="font-weight: 900">SHIP TO</p>
            <el-form-item label="Company">{{ form.shippingCompany }}</el-form-item>
            <el-form-item label="Address">{{ form.shippingAddress }}</el-form-item>
            <el-form-item label="Phone Number">{{ form.shippingNumber }}</el-form-item>
            <el-form-item label="Email">{{ form.shippingEmail }}</el-form-item>
          </div>
        </div>
        <p style="height: 30px">
          <!-- <label style="font-weight: 900;"></label> -->
          <el-form-item label="Account Manager" style="display: inline-block;font-weight: 900;vertical-align: middle"></el-form-item>
          <el-form-item style="display: inline-block; vertical-align: middle">{{form.sales}}</el-form-item>
        </p>
        <el-form-item label="Items" style="font-weight: 900;"></el-form-item>
        <el-table
          ref="orderDetailTable"
          :data="tableData"
          v-loading="loading"
          border
          stripe
          highlight-current-row
          height="131px"
          :row-key="row => row.index"
          style="margin-bottom: 10px">
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
      </el-form>

      <el-form ref="form" label-position="right" label-suffix=":" label-width="160px" :model="form" size="mini" style="height: 60px">
        <div style="max-width: 300px; float: right;">
          <p class="total-sta">
            <el-form-item label="Total">${{ total }}</el-form-item>
          </p>
          <p class="total-sta">
            <el-form-item label="plus shipping fee"></el-form-item>
          </p>
        </div>
       </el-form>
      <div style="text-align: right">
        <el-button type="danger" @click="handleCancelOrder">cancel order</el-button>
      </div>
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
      this.initData();
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

<style>
  .total-sta .el-form-item__label{
    font-weight: 900;
  }
</style>

<style scoped>
.payment-review-wrap {
  width: 600px;
  margin: 0 auto;
  font-size: 14px;
}

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

.basic-info {
  display: flex;
}

.basic-info > div {
  flex: 1;
}

.el-form-item {
  border-spacing: 0;
  margin-bottom: 0 !important;
}
</style>
