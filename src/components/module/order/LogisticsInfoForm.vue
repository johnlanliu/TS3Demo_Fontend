<template>
  <div>
    <el-form ref="form" :model="form" size="mini" label-width="130px">
      <el-row>
            <el-col :span="12">
              <el-form-item label="Status: ">
                <el-select v-model="form.status" placeholder="select" style="width: 188px">
                    <el-option
                    v-for="option in statusOptions"
                    :key="option.status"
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
  // name: 'EditOrderForm',

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
      orderDetailsFormVisible: false,
      loading: false,
      createInvoiceFormVisible: false,
      accessoryDetailFormVisible: false,
      servicePlanFormVisible: false,
      productDetailFormVisible: false,
      /* RESET THESE */
      validInvoice: false,
      sameAsBilling: false,
      tableData: [],
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
      ],
      statusOptions: [
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
    /* AUXILIARY FUNCTIONS */
    // showDialog() {
    //   Object.assign(this.form);
    //   // this.getLastOrder();
    //   this.validInvoice = true;
    //   this.visible = true;
    // },
    handlePrev() {
      this.visible = false;
      this.orderDetailsFormVisible = true;
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
    handleSameInfo() {
      if (this.sameAsBilling) {
        this.form.shippingCompany = this.form.billingCompany;
        this.form.shippingContact = this.form.billingContact;
        this.form.shippingPhone = this.form.billingPhone;
        this.form.shippingEmail = this.form.billingEmail;
        this.form.shippingAddress = this.form.billingAddress;
        this.form.shippingCity = this.form.billingCity;
        this.form.shippingState = this.form.billingState;
        this.form.shippingCountry = this.form.billingCountry;
        this.form.shippingZip = this.form.billingZip;
      }
    },
    handleDeleteOrderItem(row, index) {
      this.tableData.splice(index, 1);
    },
    async handleCreateInvoice() {
      this.getDates();
      this.handleAddOrder();
      this.createInvoiceFormVisible = true;
    },
    handleAddOrder() {
      this.loading = true;
      this.handleSameInfo();
      const param = Object.assign({}, this.form, {
        orderItems: this.tableData
      });
      this.loading = false;
      const res = addOrder({}, param).then(res => {
        if (res && !res.errorCode) {
          this.visible = false;
          this.$message.success('Submit Success!');
        }
      });
    },
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
        // due.setDate( Number(this.form.invoiceDate) + 15);
      } else {
        due.setDate(this.form.invoiceDate.getDate() + 30);
        // due.setDate( Number(this.form.invoiceDate) + 30);
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

    /* GET ACCESSORIES, PRODUCTS, AND SERVICE PLANS FOR TABLE */
    // getAccessoryInfo(n, p, q, r) {
    //   this.org.accName = n;
    //   this.org.accPrice = p;
    //   this.org.accQty = q;
    //   this.org.accTax = r;
    //   const data = {
    //     orderId: '',
    //     product: this.org.accName,
    //     quantity: this.org.accQty,
    //     rate: this.org.accPrice,
    //     amount: Number(this.org.accPrice) * Number(this.org.accQty),
    //     tax: this.org.accTax,
    //     description: this.org.accQty + ' * ' + this.org.accName,
    //     invoiceNo: this.form.invoiceNumber
    //   };
    //   this.tableData.push(data);
    // },
    // getProductInfo(n, p, q, r) {
    //   this.org.prodName = n;
    //   this.org.prodPrice = p;
    //   this.org.prodQty = q;
    //   this.org.prodTax = r;
    //   const data = {
    //     orderId: '',
    //     product: this.org.prodName,
    //     quantity: this.org.prodQty,
    //     rate: this.org.prodPrice,
    //     amount: Number(this.org.prodPrice) * Number(this.org.prodQty),
    //     tax: this.org.prodTax,
    //     description: this.org.prodQty + ' * ' + this.org.prodName,
    //     invoiceNo: this.form.invoiceNumber
    //   };
    //   this.tableData.push(data);
    // },
    // getServicePlanFee(q, a, n) {
    //   this.org.planQty = q;
    //   this.org.planAmt = a;
    //   this.org.planName = n;
    //   const data = {
    //     orderId: '',
    //     product: this.org.planName,
    //     quantity: this.org.planQty,
    //     rate: this.org.planAmt,
    //     amount: Number(this.org.planAmt) * Number(this.org.planQty),
    //     tax: 'N',
    //     description: this.org.planQty + ' * ' + this.org.planName,
    //     invoiceNo: this.form.invoiceNumber
    //   };
    //   this.tableData.push(data);
    // },
    // getProdAndAccInfo(pn, pp, pq, pt, an, ap, aq, at) {
    //   this.org.prodName = pn;
    //   this.org.prodPrice = pp;
    //   this.org.prodQty = pq;
    //   this.org.prodTax = pt;
    //   this.org.accName = an;
    //   this.org.accPrice = ap;
    //   this.org.accQty = aq;
    //   this.org.accTax = at;
    //   const data = {
    //     orderId: '',
    //     product: this.org.prodName,
    //     quantity: this.org.prodQty,
    //     rate: this.org.prodPrice,
    //     amount: Number(this.org.prodPrice) * Number(this.org.prodQty),
    //     tax: this.org.prodTax,
    //     description: this.org.prodQty + ' * ' + this.org.prodName,
    //     invoiceNo: this.form.invoiceNumber
    //   };
    //   this.tableData.push(data);
    //   const data2 = {
    //     orderId: '',
    //     product: this.org.accName,
    //     quantity: this.org.accQty,
    //     rate: this.org.accPrice,
    //     amount: Number(this.org.accPrice) * Number(this.org.accQty),
    //     tax: this.org.accTax,
    //     description: this.org.accQty + ' * ' + this.org.accName,
    //     invoiceNo: this.form.invoiceNumber
    //   };
    //   this.tableData.push(data2);
    // },
    // getProdAndPlanInfo(pn, pp, pq, pt, sq, sa, sn) {
    //   this.org.prodName = pn;
    //   this.org.prodPrice = pp;
    //   this.org.prodQty = pq;
    //   this.org.prodTax = pt;
    //   this.org.planQty = sq;
    //   this.org.planAmt = sa;
    //   this.org.planName = sn;
    //   const data = {
    //     orderId: '',
    //     product: this.org.prodName,
    //     quantity: this.org.prodQty,
    //     rate: this.org.prodPrice,
    //     amount: Number(this.org.prodPrice) * Number(this.org.prodQty),
    //     tax: this.org.prodTax,
    //     description: this.org.prodQty + ' * ' + this.org.prodName,
    //     invoiceNo: this.form.invoiceNumber
    //   };
    //   this.tableData.push(data);
    //   const data2 = {
    //     orderId: '',
    //     product: this.org.planName,
    //     quantity: this.org.planQty,
    //     rate: this.org.planAmt,
    //     amount: Number(this.org.planAmt) * Number(this.org.planQty),
    //     tax: 'N',
    //     description: this.org.planQty + ' * ' + this.org.planName,
    //     invoiceNo: this.form.invoiceNumber
    //   };
    //   this.tableData.push(data2);
    // },
    // getAllInfo(pn, pp, pq, pt, an, ap, aq, at, sq, sa, sn) {
    //   this.org.prodName = pn;
    //   this.org.prodPrice = pp;
    //   this.org.prodQty = pq;
    //   this.org.prodTax = pt;
    //   this.org.accName = an;
    //   this.org.accPrice = ap;
    //   this.org.accQty = aq;
    //   this.org.accTax = at;
    //   this.org.planQty = sq;
    //   this.org.planAmt = sa;
    //   this.org.planName = sn;
    //   const data = {
    //     orderId: '',
    //     product: this.org.prodName,
    //     quantity: this.org.prodQty,
    //     rate: this.org.prodPrice,
    //     amount: Number(this.org.prodPrice) * Number(this.org.prodQty),
    //     tax: this.org.prodTax,
    //     description: this.org.prodQty + ' * ' + this.org.prodName,
    //     invoiceNo: this.form.invoiceNumber
    //   };
    //   this.tableData.push(data);
    //   const data2 = {
    //     orderId: '',
    //     product: this.org.accName,
    //     quantity: this.org.accQty,
    //     rate: this.org.accPrice,
    //     amount: Number(this.org.accPrice) * Number(this.org.accQty),
    //     tax: this.org.accTax,
    //     description: this.org.accQty + ' * ' + this.org.accName,
    //     invoiceNo: this.form.invoiceNumber
    //   };
    //   this.tableData.push(data2);
    //   const data3 = {
    //     orderId: '',
    //     product: this.org.planName,
    //     quantity: this.org.planQty,
    //     rate: this.org.planAmt,
    //     amount: Number(this.org.planAmt) * Number(this.org.planQty),
    //     tax: 'N',
    //     description: this.org.planQty + ' * ' + this.org.planName,
    //     invoiceNo: this.form.invoiceNumber
    //   };
    //   this.tableData.push(data3);
    // },

    // Accessory
    HandleAccessoryAdded(value) {
      this.tableData.push(value);
    },

    handlePlanAdded(value) {
      this.tableData.push(value);
    },

    handleProductAdded(value) {
      this.tableData.push(value);
    }
  },

  watch: {
    'form.invoiceNumber': function() {
      this.checkForOrder();
    },

    orderItemTable: {
      handler: function(val) {
        if (this.form.orderId) {
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
      const copy = this.tableData || [];
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
      const copy = this.tableData || [];
      copy.forEach(function(item, index) {
        t += item.amount;
      });
      const tot = t + this.tax;
      return Math.floor(tot * 100) / 100;
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

.el-form-item.warning el-form-item__content{
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