<template>
  <div>
    <el-form :visible.sync="visible" ref="form" :model="form" size="mini" label-width="130px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="Status: ">
            <el-select v-model="form.status" placeholder="select" style="width: 188px">
              <el-option
                v-for="option in statusOptions"
                :key="option.label"
                :value="option.status"
                :label="option.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Shipping Fee: ">
            <el-input v-model="form.shippingFee" style="width: 188px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="Invoice #: ">
            <el-input
              v-model="form.invoiceNo"
              :placeholder="invoicePlaceholder"
              style="width: 188px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Invoice Date: ">
            <el-date-picker
              v-model="form.invoiceDate"
              type="datetime"
              placeholder="Select date and time"
              style="width: 188px"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <span class="warning" v-if="!validInvoice">invalid invoice number</span>

      <el-row>
        <el-col :span="12">
          <el-form-item label="Shipping Via: ">
            <el-input v-model="form.shippingVia" style="width: 188px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Tracking Number: ">
            <el-input v-model="form.trackingNo" style="width: 188px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import VSidebar from '../../common/VSidebar.vue';
import ProductDetailForm from './ProductDetailForm.vue';
import CreateInvoiceForm from './CreateInvoiceForm.vue';
import AccessoryDetailForm from './AccessoryDetailForm.vue';
import ServicePlanForm from './ServicePlanForm.vue';
import OrderDetailsForm from './OrderDetailsForm.vue';
import {
  addOrder,
  editOrder,
  getLastInvoiceNo,
  validInvoiceNo,
  getOrgById
} from '@/api/getData';
import { mapState } from 'vuex';

export default {
  props: {
    value: Boolean,
    form: [Object]
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
      /* RESET THESE */
      validInvoice: false,
      invoicePlaceholder: '',
      statusOptions: []
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
    clearValidate() {
      // this.visible = false;
      // this.sameAsBilling = false;
      // this.tableData = [];
      // this.form = {};
      // this.validInvoice = false;
      // this.getLastOrder();
      this.$refs.form.clearValidate();
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
    }
  },

  watch: {
    'form.invoiceNumber': function() {
      this.checkForOrder();
    },

    'form.type': {
      handler: function(val) {
        if (this.form.type) {
          this.statusOptions = [
            {
              label: 'Delivered',
              status: 2
            },
            {
              label: 'Cancelled',
              status: -1
            },
            {
              label: 'Shipped',
              status: 1
            },
            {
              label: 'Pending',
              status: 3
            }
          ];
        } else {
          this.statusOptions = [
            {
              label: 'VOID',
              status: -1
            },
            {
              label: 'PAID',
              status: 1
            },
            {
              label: 'UNPAID',
              status: 2
            },
            {
              label: 'REFUND',
              status: 3
            },
            {
              label: 'OVERDUE',
              status: 4
            }
          ];
        }
      },
      immediate: true
    }
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

.el-col,
.el-form-item__label,
el-form-item__content {
  margin: 0;
}

.el-form-item {
  margin-bottom: 0 !important;
}

.el-form-item.warning el-form-item__content {
  margin-top: -15px;
}

.warning {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 9pt;
  color: #f56c6c;
  padding-left: 5px;
  display: inline;
  margin-left: 125px;
}
</style>