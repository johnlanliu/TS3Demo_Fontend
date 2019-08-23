<template>
  <div>
    <v-sidebar
      v-model="visible"
      :title="this.form.orderId? 'Edit Order' : 'Add Order'"
      width="720">
      <el-steps :active="active" align-center>
        <el-step title="Step1" description="Company Information"></el-step>
        <el-step title="Step2" description="Order Details"></el-step>
        <el-step title="Step3" description="Logistics Information"></el-step>
      </el-steps>
      <div class="form-box">
        <company-info-form :form="form" v-if="companyInfoFormVisible" :isOrder="true" @same-as-billing="handleSameAsBilling"></company-info-form>
        <order-details-form
          :form="form"
          v-if="orderDetailsFormVisible"
          :itemTable="orderItemTable"
          @setItemTable="setItemTable">
        </order-details-form>
        <logistics-info-form :form="form" v-if="logisticsInfoFormVisible"></logistics-info-form>
      </div>

      <span slot="footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" v-if="prevVisible" @click="handlePrev">Prev</el-button>
        <el-button type="primary" v-if="nextVisible" @click="handleNext">Next</el-button>
        <el-button type="primary" v-if="submitVisible && !this.form.orderId" @click="handleSubmit" :loading="loading">Submit</el-button>
        <el-button type="primary" v-if="editVisible && this.form.orderId" @click="handleSave" :loading="loading">Save</el-button>
      </span>
    </v-sidebar>
  </div>
</template>

<script>
import VSidebar from '../../common/VSidebar.vue';
import CreateInvoiceForm from '@/components/common/orderpayment/CreateInvoiceForm.vue';
import CompanyInfoForm from '@/components/common/orderpayment/CompanyInfoForm.vue';
import OrderDetailsForm from '@/components/common/orderpayment/OrderDetailsForm.vue';
import LogisticsInfoForm from '@/components/common/orderpayment/LogisticsInfoForm.vue';
import {
  addOrder,
  editOrder,
  getLastInvoiceNo,
  validInvoiceNo,
  getOrgById,
  getOrderItem
} from '@/api/getData';
import { mapState } from 'vuex';
import { timestampFormatDate } from '@/utils/time';

export default {
  // name: 'EditOrderForm',

  components: {
    CreateInvoiceForm,
    VSidebar,
    CompanyInfoForm,
    OrderDetailsForm,
    LogisticsInfoForm
  },

  created() {
  },
  mounted: function() {
  },
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
      editVisible: false,
      companyInfoFormVisible: true,
      orderDetailsFormVisible: false,
      logisticsInfoFormVisible: false,
      loading: false,
      createInvoiceFormVisible: false,
      validInvoice: false,
      tableData: [],
      /* DROPDOWN OPTIONS */
      // orderOptions: [
      //   {
      //     label: 'Evaluation',
      //     value: 1
      //   },
      //   {
      //     label: 'Purchase',
      //     value: 2
      //   },
      //   {
      //     label: 'RMA',
      //     value: 3
      //   }
      // ],
      // paymentOptions: [
      //   {
      //     value: 1,
      //     label: 'Net15'
      //   },
      //   {
      //     value: 2,
      //     label: 'Net30'
      //   }
      // ],
      // statusOptions: [
      //   {
      //     label: 'Delivered',
      //     status: 2
      //   },
      //   {
      //     label: 'Cancelled',
      //     status: -1
      //   },
      //   {
      //     label: 'Shipped',
      //     status: 1
      //   },
      //   {
      //     label: 'Pending',
      //     status: 3
      //   }
      // ]

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
        this.submitVisible = false;
        this.editVisible = false;
      }
    },

    orderDetailsFormVisible(val) {
      if(val) {
        this.nextVisible = true;
        this.prevVisible = true;
        this.submitVisible = false;
        this.editVisible = false;
      }
    },

    logisticsInfoFormVisible(val) {
      if(val) {
        this.prevVisible = true;
        this.nextVisible = false;
        this.submitVisible = true;
        this.editVisible = true;
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

    handleSubmit() {  
      this.getDates();
      this.handleAddOrder();
    },

    async handleSave() {
      this.getDates();
      this.handleEditOrder();
    },

    clearValidate() {
      this.active = 1;
      this.tableData = [];
      this.validInvoice = false;
    },

    setItemTable(val) {
      this.tableData = val;
    },

    handleEditOrder() {
      this.loading = true;
      const param = this.form;
      this.loading = false;
      // console.log(param);
      debugger;
      const res = editOrder({}, param);
      if (!res || res.errorCode) return;
      this.visible = false;
      this.$emit('reload-table');
      this.$message.success('Change Success!');
      this.visible = false;
    },

    handleAddOrder() {
      this.loading = true;
      const param = Object.assign({}, this.form, {
        orderItems: this.tableData
      });
      this.loading = false;
      const res = addOrder({}, param);
      if (!res || res.errorCode) return;
      this.visible = false;
      this.$emit('reload-table');
      this.$message.success('Submit Success!');
      this.visible = false;
    },

    async checkForOrder() {
      this.validInvoice = await validInvoiceNo({
        invoiceNo: this.form.invoiceNumber
      });
    },

    /* FORMAT INVOICE AND DUE DATES */
    getDates() {
      if (
        this.form.invoiceDate === null ||
        this.form.paymentTerm === null ||
        this.form.invoiceDate === '' ||
        this.form.paymentTerm === '' ||
        typeof this.form.invoiceDate === 'undefined' ||
        typeof this.form.paymentTerm === 'undefined' ||
        isNaN(this.form.invoiceDate)
      ) {
        this.form.dueDate = null;
        return;
      }

      let due = new Date(this.form.invoiceDate);

      if (this.form.paymentTerm === 1) {
        this.form.dueDate = due.setDate(this.form.invoiceDate.getDate() + 15);
        // due.setDate( Number(this.form.invoiceDate) + 15);
      } else {
        // due.setDate(this.form.invoiceDate.getDate() + 30);
        this.form.dueDate = due.setDate(this.form.invoiceDate.getDate() + 30);
      }
      this.form.invoiceDate = timestampFormatDate(this.form.invoiceDate,'yyyy-MM-dd hh:mm:ss');
      this.form.dueDate = timestampFormatDate(this.form.dueDate,'yyyy-MM-dd hh:mm:ss');
      // this.form.invoiceDate =
      //   invoice.getFullYear() +
      //   '-' +
      //   (invoice.getMonth() + 1) +
      //   '-' +
      //   invoice.getDate() +
      //   ' ' +
      //   invoice.getHours() +
      //   ':' +
      //   invoice.getMinutes();
      // this.form.dueDate =
      //   due.getFullYear() +
      //   '-' +
      //   (due.getMonth() + 1) +
      //   '-' +
      //   due.getDate() +
      //   ' ' +
      //   due.getHours() +
      //   ':' +
      //   due.getMinutes();
    },

    fetchItemTax(value) {
      this.tableData.forEach(item => {
        item.tax = value;
      });
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

.el-form-item.paymentTerm {
  margin-top: 5px;
}
</style>