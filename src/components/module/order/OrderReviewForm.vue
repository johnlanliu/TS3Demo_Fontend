<template>
  <el-dialog
    :title="'Order Review'"
    :center="true"
    top="15vh"
    :visible.sync="visible"
    :append-to-body="append"
    @close="resetFields"
  >
    <div class="form-box">
      <el-form ref="form" :label-position="labelPosition" :model="form" size="mini">
        <el-row>
          <el-col :span="10" :offset="2">
            <el-form-item label="Bill to" style="font-weight: 900"></el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Ship to" style="font-weight: 900"></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="2">
            <el-form-item label="Company: " style="float: left"></el-form-item>
            <el-form-item v-model="form.billingCompany">{{ form.billingCompany }}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Company: " style="float: left"></el-form-item>
            <el-form-item v-model="form.shippingCompany">{{ form.shippingCompany}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="2">
            <el-form-item label="Address: " style="float: left"></el-form-item>
            <el-form-item v-model="form.billingAddress">{{ form.billingAddress }}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Address: " style="float: left"></el-form-item>
            <el-form-item v-model="form.shippingAddress">{{ form.shippingAddress }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="2">
            <el-form-item label="Phone Number: " style="float: left"></el-form-item>
            <el-form-item v-model="form.billingNumber">{{ form.billingNumber }}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Phone Number: " style="float: left"></el-form-item>
            <el-form-item v-model="form.shippingNumber">{{ form.shippingNumber }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="2">
            <el-form-item label="Email: " style="float: left"></el-form-item>
            <el-form-item v-model="form.billingEmail">{{ form.billingEmail }}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Email: " style="float: left"></el-form-item>
            <el-form-item v-model="form.shippingEmail">{{ form.shippingEmail }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="2">
            <el-form-item label="Order Type: " style="font-weight: 900; float: left"></el-form-item>
            <el-form-item v-model="form.type">{{ form.type }}</el-form-item>
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
          <el-table-column label="Product" prop="product" width="150"></el-table-column>
          <el-table-column label="QTY" prop="quantity" width="120"></el-table-column>
          <el-table-column label="Rate" prop="rate" width="120">
            <template slot-scope="scope">
              <span>${{ Number(scope.row.rate).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Amount" prop="amount" width="120">
            <template slot-scope="scope">
              <span>${{ Number(scope.row.amount).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Tax" prop="tax" width="89"></el-table-column>
        </el-table>

        <el-row>
          <el-col :span="2" :offset="18" style="font-weight: 900">
            <el-form-item label="Tax: " class="plus"></el-form-item>
          </el-col>
          <el-col :span="2" :offset="2" style="font-weight: 900">
            <el-form-item :tax="tax" class="plus">${{ tax }}</el-form-item>
          </el-col>
        </el-row>
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
    form: [Object]
  },
  data: function() {
    return {
      loading: false,
      append: true,
      labelPosition: 'left',
      tableData: [{}]
    };
  },

  //   props: {
  //     form: {
  //       type: Object,
  //       default: () => ({
  //         billingCompany: '',
  //         billingAddress: '',
  //         billingEmail: '',
  //         billingNumber: '',
  //         shippingCompany: '',
  //         shippingAddress: '',
  //         shippingNumber: '',
  //         shippingEmail: '',
  //         type: ''
  //       })
  //     },
  //     tableData: {
  //       type: Array,
  //       default: () => []
  //     },
  //     initData: Function
  //   },

  methods: {
    /* AUXILIARY FUNCTIONS */
    // showDialog() {
    //   this.isOpen = true;
    // },
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
