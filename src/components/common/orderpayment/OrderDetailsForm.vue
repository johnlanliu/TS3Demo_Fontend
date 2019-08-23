<template>
  <div>
    <el-form :visible.sync="visible" ref="form" :model="form" size="mini">
      <div class="labelBox">
        <el-form-item label="Order Details" style="font-weight: 900" class="odLabel"></el-form-item>
        <div style="position:absolute;left:240px">
            <el-button
            type="primary"
            style="display:inline-block"
            @click="handleAddDevice()"
            >+ Add Device</el-button>
            <el-button
            type="primary"
            style="display:inline-block;margin-left:10px"
            @click="handleAddAccessories()"
            >+ Add Accessories</el-button>
            <el-button
            type="primary"
            style="display:inline-block;margin-left:10px"
            @click="handleAddService()"
            >+ Add Service Plan</el-button>
        </div>
      </div>       
      <el-table
        ref="orderDetailTable"
        :data="tableData"
        v-loading="loading"
        border
        stripe
        highlight-current-row
        height="167"
        :row-key="row => row.index"
        style="width: 100%;margin-bottom: 5px"
      >
        <el-table-column fixed label="Product" prop="product" width="168"></el-table-column>
        <el-table-column fixed label="QTY" prop="quantity" width="96"></el-table-column>
        <el-table-column fixed label="Rate" prop="rate" width="96">
              <template slot-scope="scope">
                <span>${{ Number(scope.row.rate).toFixed(2) }}</span>
              </template>
        </el-table-column>
        <el-table-column fixed label="Amount" prop="amount" width="96">
              <template slot-scope="scope">
                <span>${{ Number(scope.row.amount).toFixed(2) }}</span>
              </template>
        </el-table-column>
        <el-table-column fixed label="Tax" prop="tax" width="96">
        </el-table-column>
        <el-table-column fixed label="Action" width="96">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDeleteOrderItem(scope.row, scope.$index)">Delete</el-button>
              </template>
        </el-table-column>
      </el-table>

      <el-row>
        <el-col :span="18">
              <el-form-item
                label="Note:"
                style="display: block; margin-left: 30px; margin-right: 30px"
                prop="note"
              >
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="notes"
                  v-model="form.note"
                  style="width: 405px"
                ></el-input>
              </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item style="dispaly:inline" label="Tax: " :totalTax="totalTax">${{ totalTax }}</el-form-item>
          <el-form-item label="Total: " prop="total" :totalAmount="totalAmount">${{ totalAmount }}</el-form-item>
          <el-form-item class="plus" label="plus shipping fee"></el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <accessory-detail-form
      :form="form"
      v-model="accessoryDetailFormVisible"
      @accessoryAdded="HandleAccessoryAdded"
    ></accessory-detail-form>
    <product-detail-form
      :form="form"
      v-model="productDetailFormVisible"
      @productAdded="handleProductAdded"
    ></product-detail-form>
    <service-plan-form
      :form="form"
      v-model="servicePlanFormVisible"
      @planAdded="handlePlanAdded"
    ></service-plan-form>
  </div>
</template>

<script>
import ProductDetailForm from './ProductDetailForm.vue';
import AccessoryDetailForm from './AccessoryDetailForm.vue';
import ServicePlanForm from './ServicePlanForm.vue';
import { mapState } from 'vuex';

export default {
  components: {
    ProductDetailForm,
    AccessoryDetailForm,
    ServicePlanForm,
  },

  props: {
    value: Boolean,
    form: [Object],
    tableData: Array,
    orderItemTable: Array
  },

  data: function() {
    return {
      // orderRules: {
      //   paymentTerm: [
      //      { required: true, message: 'Payment term is required', trigger: 'change' },
      //   ],
      //   invoiceDate: [
      //      { required: true, message: 'Invoice date is required' },
      //   ],
      // },
      loading: false,
      accessoryDetailFormVisible: false,
      servicePlanFormVisible: false,
      productDetailFormVisible: false,
      /* FORM RULES */
      // formRules: {
      //   orderType: [
      //           { required: true, message: 'Order type is required', trigger: 'change' },
      //   ],
      //   billing: [
      //           { required: true, message: 'Company name is required' },
      //           { min: 1, message: 'Company name is required'},
      //     {
      //       pattern: /^[A-Za-z0-9]+$/,
      //       message: 'Invalid characters'
      //     }
      //   ],
      //   companyName: [
      //           { required: true, message: 'Company name is required' },
      //           { min: 1, message: 'Company name is required'},
      //     {
      //       pattern: /^[A-Za-z0-9]+$/,
      //       message: 'Invalid characters'
      //     }
      //   ],
      //   billingContact: [
      //           { required: true, message: 'Contact is required' },
      //           { min: 1, message: 'Contact is required'},
      //     {
      //       pattern: /^[A-Za-z0-9]+$/,
      //       message: 'Invalid characters'
      //     }
      //   ],
      //   contact: [
      //           { required: true, message: 'Contact is required' },
      //           { min: 1, message: 'Contact is required'},
      //     {
      //       pattern: /^[A-Za-z0-9]+$/,
      //       message: 'Invalid characters'
      //     }
      //   ],
      //   billingPhone: [
      //           {required: true, message: 'Phone number is required' },
      //     {
      //       pattern: /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/,
      //       message: 'Invalid phone number'
      //     }
      //   ],
      //   phone: [
      //           {required: true, message: 'Phone number is required' },
      //     {
      //       pattern: /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/,
      //       message: 'Invalid phone number'
      //     }
      //   ],
      //   billingEmail: [
      //           { required: true, message: 'Email is required' },
      //     {
      //       pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      //       message: 'Invalid email'
      //     }
      //   ],
      //   email: [
      //           { required: true, message: 'Email is required' },
      //     {
      //       pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      //       message: 'Invalid email'
      //     }
      //   ],
      //   billingAddress: [
      //           { required: true, message: 'Billing address is required' },
      //   ],
      //   shippingAddress: [
      //           { required: true, message: 'Shipping address is required' },
      //   ],
      //   paymentTerm: [
      //           { required: true, message: 'Payment term is required', trigger: 'change' },
      //   ],
      //       // note: [
      //       //     { max: 200, message: 'Maximum character limit: 200' }
      //       // ],
      //   status: [
      //           { required: true, message: 'Status is required', trigger: 'change' },
      //   ],
      //   invoiceNumber: [
      //       { required: true, message: 'Invoice number is required' },
      //   ],
      //   invoiceDate: [
      //       { required: true, message: 'Invoice date is required' },
      //   ],
      //   shippingVia: [
      //       { required: true, message: 'Shipping type is required' },
      //   ],
      //   trackingNumber: [
      //       { required: true, message: 'Tracking number is required' },
      //   ],
      //   shippingFee: [
      //       { required: true, message: 'Shipping fee is required' },
      //     {
      //       pattern: /^\d+(,\d{3})*(\.\d{1,2})?$/,
      //       message: 'Invalid price'
      //     },
      //   ],
      // },
    };
  },

  created() {
  },

  mounted() {
  },

  methods: {
    clearValidate() {
      this.$refs.form.clearValidate();
    },

    handleDeleteOrderItem(row, index) {
      this.tableData.splice(index, 1);
      this.fetchItemTax();
    },

    /* HANDLERS FOR SHOWING PRODUCT FORMS */
    handleAddDevice() {
      this.productDetailFormVisible = true;
    },
    handleAddAccessories() {
      this.accessoryDetailFormVisible = true;
    },
    handleAddService() {
      this.servicePlanFormVisible = true;
    },

    HandleAccessoryAdded(value) {
      this.tableData.push(value);
      this.fetchItemTax();
    },

    handlePlanAdded(value) {
      this.tableData.push(value);
      this.fetchItemTax();
    },

    async handleProductAdded(value) {
      this.tableData.push(value);
      this.fetchItemTax();
    },

    async fetchItemTax() {
    //  this.$emit('itemTax',this.tax);
    },
  },

  watch: {
    orderItemTable: {
      handler: function(val) {
        if(this.form.orderId) {
          this.orderItemTable.forEach(item => {
            this.tableData.push(item);
          })
        }
        this.fetchItemTax();
      },
      immediate: true
    },
  },

  computed: {
    totalTax: function(){
      let sum = 0;
      this.tableData.forEach(item => {
        if(item.tax === null || isNaN(item.tax)){
          return 0
        } else {
          sum += Number(item.tax);
        }
      })
      return sum;
    },
    totalAmount: function() {
      let sum = 0;
      this.tableData.forEach(item => {
        if(item.amount === null || isNaN(item.amount)){
          return 0;
        } else {
          sum += Number(item.amount);
        }
      })
      return sum;
    },
    ...mapState([
      'loginInfo',
      'modelList',
      'currentOrgId',
      'lang',
      'locale',
      'currentOrg'
    ]),

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
.form-box {
  margin-left: 20px;
  width: 650px;
  margin-top: 10px;
  border-top: 1px dashed #000;
  padding-top: 8px;
}

.el-col {
  margin-top: -5px;
}

.el-col,.el-form-item__label,el-form-item__content {
  margin: 0;
}

.el-form-item {
  margin-bottom: 0 !important;
}

.el-form-item.odLabel {
  position: absolute;
  left: 0;
}

.labelBox {
  width: 100%;
  height: 40px;
  position: relative;
  margin-top: 10px;
}
</style>