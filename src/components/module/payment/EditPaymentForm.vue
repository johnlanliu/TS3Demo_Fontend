<template>
  <div>
    <v-sidebar
      v-model="visible"
      title= "Add Payment"
      width="720">
      <el-steps :active="active" align-center>
        <el-step title="Step1" description="Company Information"></el-step>
        <el-step title="Step2" description="Payment Details"></el-step>
        <el-step title="Step3" description="Logistics Information"></el-step>
      </el-steps>
      <div class="form-box">
        <company-info-form :form="form" v-if="companyInfoFormVisible" :isOrder="false" @same-as-billing="handleSameAsBilling"></company-info-form>
        <order-details-form :form="form" v-if="orderDetailsFormVisible" @paymentItems="getPaymentItems"></order-details-form>
        <logistics-info-form :form="form" v-if="logisticsInfoFormVisible"></logistics-info-form>
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
import { mapState } from 'vuex';

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

  created() {},
  mounted: function() {},
  props: {
    value: Boolean,
    form: [Object],
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

    async handleSubmit() {
      this.loading = true;
      // this.handleSameInfo();
      const param = Object.assign({}, this.form, {
        paymentItems: this.paymentItemsTable
      });
      this.loading = false;
      const res = this.form.paymentId ? await editPayment({}, param) : await addPayment({}, param);
      if (res && !res.errorCode) {
        this.visible = false;
        this.$message.success('Submit Success!');
        this.$emit('reload-table');
      }
    },

    handleSaveEdit() {},

    clearValidate() {
      this.visible = false;
      this.sameAsBilling = false;
      // this.tableData = [];
      // this.form = {};
      // this.validInvoice = false;
      // this.getLastOrder();
      this.$refs.form.clearValidate();
    },

    /* HANDLER FUNCTIONS */
    // handleSameInfo() {
    //   if (this.sameAsBilling) {
    //     this.form.shippingCompany = this.form.billingCompany;
    //     this.form.shippingContact = this.form.billingContact;
    //     this.form.shippingPhone = this.form.billingPhone;
    //     this.form.shippingEmail = this.form.billingEmail;
    //     this.form.shippingAddress = this.form.billingAddress;
    //     this.form.shippingCity = this.form.billingCity;
    //     this.form.shippingState = this.form.billingState;
    //     this.form.shippingCountry = this.form.billingCountry;
    //     this.form.shippingZip = this.form.billingZip;
    //   }
    // },
    // handleDeleteOrderItem(row, index) {
    //   this.tableData.splice(index, 1);
    // },
    async handleCreateInvoice() {
      this.getDates();
      this.handleAddOrder();
      this.createInvoiceFormVisible = true;
    },
    // handleAddOrder() {
    //   this.loading = true;
    //   this.handleSameInfo();
    //   const param = Object.assign({}, this.form, {
    //     orderItems: this.tableData
    //   });
    //   this.loading = false;
    //   const res = addOrder({}, param).then(res => {
    //     if (res && !res.errorCode) {
    //       this.visible = false;
    //       this.$message.success('Submit Success!');
    //     }
    //   });
    // },
    // async getLastOrder() {
    //   this.invoicePlaceholder = (await getLastInvoiceNo()) + 1;
    //   if (typeof this.invoicePlaceholder !== 'number') {
    //     this.invoicePlaceholder = '';
    //     return;
    //   }

    //   let valid = await validInvoiceNo({ invoiceNo: this.invoicePlaceholder });
    //   while (!valid) {
    //     this.invoicePlaceholder += 1;
    //     valid = await validInvoiceNo({ invoiceNo: this.invoicePlaceholder });
    //   }
    // },
    async checkForOrder() {
      this.validInvoice = await validInvoiceNo({
        invoiceNo: this.form.invoiceNumber
      });
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

    /* FORMAT INVOICE AND DUE DATES */
    getDates() {
      if (
        this.form.invoiceDate === null ||
        this.form.paymentTerm === null ||
        this.form.invoiceDate === '' ||
        this.form.paymentTerm === '' ||
        typeof this.form.invoiceDate === 'undefined' ||
        typeof this.form.paymentTerm === 'undefined'
      ) {
        this.form.dueDate = null;
        return;
      }
      let invoice = new Date(this.form.invoiceDate);
      let due = new Date(this.form.invoiceDate);

      if (this.form.paymentTerm === 'Net15') {
        due.setDate(this.form.invoiceDate.getDate() + 15);
      } else {
        due.setDate(this.form.invoiceDate.getDate() + 30);
      }

      this.form.invoiceDate =
        invoice.getFullYear() +
        '-' +
        (invoice.getMonth() + 1) +
        '-' +
        invoice.getDate() +
        ' ' +
        invoice.getHours() +
        ':' +
        invoice.getMinutes();
      this.form.dueDate =
        due.getFullYear() +
        '-' +
        (due.getMonth() + 1) +
        '-' +
        due.getDate() +
        ' ' +
        due.getHours() +
        ':' +
        due.getMinutes();
    },

    getPaymentItems(items) {
      this.paymentItemsTable = items.map(v => {
        let obj = {...v};
        obj.tax = Math.floor((obj.amount * 0.0775) * 100) / 100;
        return obj;
      });
    },

  },

  watch: {
    'form.invoiceNumber': function() {
      this.checkForOrder();
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