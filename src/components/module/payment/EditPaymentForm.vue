<template>
  <div>
    <v-sidebar
      v-model="visible"
      :title="form.paymentId ? 'Edit Payment' : 'Add Payment'"
      width="720">
      <el-steps :active="active" align-center>
        <el-step title="Step1" description="Company Information"></el-step>
        <el-step title="Step2" description="Payment Details"></el-step>
        <el-step title="Step3" description="Logistics Information"></el-step>
      </el-steps>
      <div class="form-box">
        <company-info-form v-if="companyInfoFormVisible" :form="form" :isOrder="false" @same-as-billing="handleSameAsBilling"></company-info-form>
        <order-details-form v-if="orderDetailsFormVisible" :form="form" :itemTable="paymentItemTable" @setItemTable="setPaymentItemTable"></order-details-form>
        <logistics-info-form v-if="logisticsInfoFormVisible" :form="form" :isOrder="false"></logistics-info-form>
      </div>

      <span slot="footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" v-if="prevVisible" @click="handlePrev">Prev</el-button>
        <el-button type="primary" v-if="nextVisible" @click="handleNext">Next</el-button>
        <el-button type="primary" v-if="submitVisible" @click="handleSubmit" :loading="loading">Submit</el-button>
      </span>
    </v-sidebar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VSidebar from '../../common/VSidebar.vue';
import ProductDetailForm from '@/components/common/orderpayment/ProductDetailForm.vue';
import CreateInvoiceForm from '@/components/common/orderpayment/CreateInvoiceForm.vue';
import AccessoryDetailForm from '@/components/common/orderpayment/AccessoryDetailForm.vue';
import ServicePlanForm from '@/components/common/orderpayment/ServicePlanForm.vue';
import CompanyInfoForm from '@/components/common/orderpayment/CompanyInfoForm.vue';
import OrderDetailsForm from '@/components/common/orderpayment/OrderDetailsForm.vue';
import LogisticsInfoForm from '@/components/common/orderpayment/LogisticsInfoForm.vue';
import {
  editPayment,
  addPayment,
  getLastInvoiceNo,
  validInvoiceNo,
  getOrgById
} from '@/api/getData';
import { dateToTimestamp } from '@/utils/time';

export default {
  // name: 'EditOrderForm',

  components: {
    ProductDetailForm,
    CreateInvoiceForm,
    AccessoryDetailForm,
    ServicePlanForm,
    VSidebar,
    CompanyInfoForm,
    OrderDetailsForm,
    LogisticsInfoForm
  },

  props: {
    value: Boolean,
    form: [Object],
    paymentItemTable: Array
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
      active: 1,
      prevVisible: false,
      nextVisible: true,
      submitVisible: false,
      companyInfoFormVisible: true,
      orderDetailsFormVisible: false,
      logisticsInfoFormVisible: false,
      loading: false,
      createInvoiceFormVisible: false,
      // accessoryDetailFormVisible: false,
      // servicePlanFormVisible: false,
      // productDetailFormVisible: false,
      /* RESET THESE */
      // orderForm: {},
      validInvoice: false,
      // sameAsBilling: false,
      // tableData: [],
      paymentItemsTable: [],
      invoicePlaceholder: '',

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

  computed: {
    // tax: function() {
    //   let t = 0;
    //   let et;
    //   const copy = this.tableData || [];
    //   copy.forEach(function(item, index) {
    //     if (item.tax === 'Y') {
    //       et = Number(item.amount) * 0.0775;
    //     } else {
    //       et = 0;
    //     }
    //     t += et;
    //   });
    //   return Math.floor(t * 100) / 100;
    // },
    // total: function() {
    //   let t = 0;
    //   const copy = this.tableData || [];
    //   copy.forEach(function(item, index) {
    //     t += item.amount;
    //   });
    //   const tot = t + this.tax;
    //   return Math.floor(tot * 100) / 100;
    // },
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
  },

  watch: {
    'form.invoiceNumber': function() {
      this.checkForOrder();
    },

    visible(val) {
      if(!val) {
        this.clearValidate();
      }
    },

    companyInfoFormVisible(val) {
      if(val) {
        this.nextVisible = true;
        this.prevVisible = false;
        this.submitVisble = false;
      }
    },

    orderDetailsFormVisible(val) {
      if(val) {
        this.nextVisible = true;
        this.prevVisible = true;
        this.submitVisble = false;
      }
    },

    logisticsInfoFormVisible(val) {
      if(val) {
        this.prevVisible = true;
        this.nextVisible = false;
        this.submitVisible = true;
      }
    },

    active(val) {
      if(val) {
        if(val === 2){
          this.companyInfoFormVisible = false;
          this.orderDetailsFormVisible = true;
          this.logisticsInfoFormVisible = false;
        } else if(val === 3){
          this.companyInfoFormVisible = false;
          this.orderDetailsFormVisible = false;
          this.logisticsInfoFormVisible = true;
        } else {
          this.companyInfoFormVisible = true;
          this.orderDetailsFormVisible = false;
          this.logisticsInfoFormVisible = false;
        }
      }
    }
  },

  methods: {
    /* AUXILIARY FUNCTIONS */
    handlePrev() {
      this.active -= 1;
    },
    handleNext() {
      this.active += 1;
    },

    handleSameAsBilling() {
      this.$emit('same-as-billing');
    },

    handleSaveEdit() {},

    clearValidate() {
      this.active = 1;
      this.paymentItemsTable = [];
      this.$refs.form.clearValidate();
    },

    setPaymentItemTable(val) {
      this.paymentItemsTable = val;
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

    async checkForOrder() {
      this.validInvoice = await validInvoiceNo({
        invoiceNo: this.form.invoiceNumber
      });
    },

    async handleSubmit() {
      this.loading = true;
      const param = this.form.paymentId ? this.form : Object.assign({}, this.form, {
        paymentItems: this.paymentItemsTable
      });
      param.dueDate = dateToTimestamp(param.dueDate);
      this.loading = false;
      const res = this.form.paymentId ? await editPayment({}, param) : await addPayment({}, param);
      if (res && !res.errorCode) {
        this.visible = false;
        this.$message.success('Submit Success!');
        this.$emit('reload-table');
      }
    },
  }
};
</script>

<style scoped>
.form-box {
  margin-left: 20px;
  width: 650px;
  margin-top: 10px;
  /* border-top: 1px dashed #000; */
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

.el-form-item.paymentTerm {
  margin-top: 5px;
}
</style>