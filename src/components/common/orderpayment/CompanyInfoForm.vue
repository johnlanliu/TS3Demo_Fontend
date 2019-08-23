<template>
  <div>
    <el-form :visible.sync="visible" ref="form" :model="form" size="mini">
      <el-form-item v-if="isOrder" label="Order Type">
        <el-select v-model="form.type" placeholder="Select" style="width:194px">
          <el-option
            v-for="option in orderOptions"
            :key="option.label"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="BILLING INFO" style="font-weight: bold"></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="SHIPPING INFO" style="font-weight: bold"></el-form-item>
        </el-col>
      </el-row>

      <div style="padding-left: 344px">
        <el-checkbox
          v-model="sameAsBilling"
          style="display: inline"
        >the same as billing info</el-checkbox>
      </div>

      <el-row>
        <el-col :span="12">
          <el-form-item label="Company Name: ">
            <el-input v-model="form.billingCompany" style="width: 275px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Company Name: ">
            <el-input
              v-model="form.shippingCompany"
              style="width: 275px"
              :disabled="sameAsBilling"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" >
          <el-form-item label="Contact: ">
            <el-input v-model="form.billingContact" style="width: 275px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Contact: ">
            <el-input
              v-model="form.shippingContact"
              style="width: 275px"
              :disabled="sameAsBilling"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="Phone Number: ">
            <el-input v-model="form.billingPhone" style="width: 275px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12"  >
          <el-form-item label="Phone Number: ">
            <el-input 
              v-model="form.shippingPhone"
              style="width: 275px"
              :disabled="sameAsBilling"
              ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="Email: ">
            <el-input v-model="form.billingEmail" style="width: 275px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="1">
          <el-form-item label="Email: ">
            <el-input
              v-model="form.shippingEmail"
              style="width: 275px"
              :disabled="sameAsBilling"
              ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="Address: ">
            <el-input v-model="form.billingAddress" style="width: 275px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Address: ">
            <el-input
              v-model="form.shippingAddress"
              style="width: 275px"
              :disabled="sameAsBilling"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5">
          <el-form-item label="City: ">
            <el-input v-model="form.billingCity" style="width: 130px"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="Zip/Postal Code: ">
            <el-input v-model="form.billingZip" style="width: 130px;margin-left:10px"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :push="2">
          <el-form-item label="City: ">
            <el-input
              v-model="form.shippingCity"
              style="width: 130px"
              :disabled="sameAsBilling"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :push="2">
          <el-form-item label="Zip/Postal Code: ">
            <el-input
              v-model="form.shippingZip"
              style="width: 130px;margin-left:10px"
              :disabled="sameAsBilling">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5">
          <el-form-item label="Country: ">
            <el-input v-model="form.billingCountry" style="width: 130px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="State/Province: ">
            <el-input v-model="form.billingState" style="width: 130px;margin-left:10px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :push="2">
          <el-form-item label="Country: ">
            <el-input
              v-model="form.shippingCountry"
              style="width: 133px"
              :disabled="sameAsBilling"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :push="2">
          <el-form-item label="State/Province: ">
            <el-input
              v-model="form.shippingState"
              style="width: 130px;margin-left:10px"
              :disabled="sameAsBilling">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Payment Term" class="paymentTerm">
        <el-select v-model="form.paymentTerm" placeholder="Select" style="width:173px">
          <el-option
            v-for="option in paymentOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>
      </el-form-item>
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
  components: {
    ProductDetailForm,
    CreateInvoiceForm,
    AccessoryDetailForm,
    ServicePlanForm,
    VSidebar,
    OrderDetailsForm
  },

  created() {},
  mounted: function() {},
  props: {
    value: Boolean,
    form: [Object],
    isOrder: {
      type: Boolean,
      default: true
    }
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
      sameAsBilling: false,
      invoicePlaceholder: '',
      /* DROPDOWN OPTIONS */
      orderOptions: [
        {
          label: 'Evaluation',
          value: 1
        },
        {
          label: 'Purchase',
          value: 2
        },
        {
          label: 'RMA',
          value: 3
        }
      ],
      paymentOptions: [
        {
          value: 1,
          label: 'Net15'
        },
        {
          value: 2,
          label: 'Net30'
        }
      ]
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
      this.sameAsBilling = false;
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

    async checkForOrder() {
      this.validInvoice = await validInvoiceNo({
        invoiceNo: this.form.invoiceNumber
      });
    },
  },

  watch: {
    'form.invoiceNumber': function() {
      this.checkForOrder();
    },

    sameAsBilling(val) {
      if(val) {
        this.$emit('same-as-billing');
      }
    },

    // orderItemTable: {
    //   handler: function(val) {
    //     if (this.form.orderId) {
    //       this.tableData = this.orderItemTable.concat([]);
    //     } else {
    //       this.tableData = [];
    //     }
    //   },
    //   immediate: true
    // }
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
    },
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