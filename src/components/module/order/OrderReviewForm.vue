<template>
    <el-dialog
        :title="'Order Review'"
        :center="true"
        top="15vh"
        :visible.sync="isOpen"
        :append-to-body="append"
        @close="resetFields"
        >
        <div class="form-box">
            <el-form ref="form":label-position="labelPosition" :model="form" size="mini">
                <el-row style="padding-left: 50px">
                    <el-col :span="12">
                        <el-form-item label="Bill to" style="font-weight: 900"></el-form-item>
                        <el-form-item label="Company: ">
                            <p v-model="form.billingCompany">{{ form.billingCompany }}</p>
                        </el-form-item>
                        <el-form-item label="Address: ">
                            <p v-model="form.billingAddress">{{ form.billingAddress }}</p>
                        </el-form-item>
                        <el-form-item label="Phone Number: ">
                            <p v-model="form.billingNumber">{{ form.billingNumber }}</p>
                        </el-form-item>
                        <el-form-item label="Email: ">
                            <p v-model="form.billingEmail">{{ form.billingEmail }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Ship to" style="font-weight: 900"></el-form-item>
                        <el-form-item label="Company: ">
                            <p v-model="form.shippingCompany">{{ form.shippingCompany}}</p>
                        </el-form-item>
                        <el-form-item label="Address: ">
                            <p v-model="form.shippingAddress">{{ form.shippingAddress }}</p>
                        </el-form-item>
                        <el-form-item label="Phone Number: ">
                            <p v-model="form.shippingNumber">{{ form.shippingNumber }}</p>
                        </el-form-item>
                        <el-form-item label="Email: ">
                            <p v-model="form.shippingEmail">{{ form.shippingEmail }}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="Order Type: " style="font-weight: 900; padding-left: 50px">
                    <p v-model="form.type">{{ form.type }}</p>
                </el-form-item>
                <el-form-item label="Items" style="font-weight: 900; padding-left: 50px"></el-form-item>
                <el-table
                    ref="orderDetailTable"
                    :data="tableData"
                    v-loading="loading"
                    border
                    stripe
                    highlight-current-row
                    height="200px"
                    :row-key="row => row.index"
                    style="width: 170%; margin-left: 50px"
                >
                    <el-table-column label="Product" prop="product" width="150"></el-table-column>
                    <el-table-column label="QTY" prop="quantity" width="120"></el-table-column>
                    <el-table-column label="Rate" prop="rate" width="120"></el-table-column>
                    <el-table-column label="Amount" prop="amount" width="120"></el-table-column>
                    <el-table-column label="Tax" prop="tax" width="89"></el-table-column>
                </el-table>
                <el-row>
                    <el-col :span="10" offset="15">
                        <el-form-item label="Tax: " style="font-weight: 900"> ${{ tax }}</el-form-item>
                        <el-form-item label="Total: " style="font-weight: 900">${{ total }} plus shipping fee</el-form-item>
                        <el-button type="primary" @click="handleCancelOrder">cancel order</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>

    </el-dialog>
</template>

<script>
import { cancelOrder } from '@/api/getData';

export default {
  name: 'OrderReviewForm',

  data: function() {
    return {
      isOpen: false,
      loading: false,
      append: true,
      labelPosition: 'left',
    };
  },

  props: {
    form: {
      type: Object,
      default: () =>({
        billingCompany: '',
        billingAddress: '',
        billingEmail: '',
        billingNumber: '',
        shippingCompany: '',
        shippingAddress: '',
        shippingNumber: '',
        shippingEmail: '',
        type: '',
      })
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    initData: Function,
  },

  methods: {
    /* AUXILIARY FUNCTIONS */
    showDialog() {
      this.isOpen = true;
    },
    resetFields() {
      this.$refs.form.resetFields();
    },

    /* HANDLER FUNCTIONS */
    async handleCancelOrder() {
      await cancelOrder({orderId: this.form.orderId}, {});
      this.initData();
      this.isOpen = false;
    },
  },

  computed: {
    tax: function() {
      let t = 0;
      let et;
      const copy = this.tableData.slice();
      copy.forEach(function(item, index) {
        if ((item.tax === 'Y')) {
          et = Number(item.amount) * .0775;
        } else {
          et = 0;
        }
        t += et;
      });
      return (Math.floor(t * 100) / 100);
    },
    total: function() {
      let t = 0;
      const copy = this.tableData.slice();
      copy.forEach(function(item, index) {
        t += item.amount;
      });
      const tot = t + this.tax;
      return (Math.floor(tot * 100) / 100);
    }
  }
};
</script>

<style scoped>

</style>
