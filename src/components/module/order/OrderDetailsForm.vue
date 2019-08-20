<template>
  <div>
    <el-form ref="form" :model="form" size="mini">
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
        <el-table-column fixed label="Tax" prop="tax" width="96"></el-table-column>
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
          <el-form-item style="dispaly:inline" label="Tax: " :tax="tax">${{ tax }}</el-form-item>
          <el-form-item label="Total: " :total="total" prop="total">${{ total }}</el-form-item>
          <el-form-item class="plus" label="plus shipping fee"></el-form-item>
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
import EditOrderForm from './EditOrderForm.vue';
import LogisticsInfoForm from './LogisticsInfoForm.vue';
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
    EditOrderForm,
    LogisticsInfoForm,
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
      logisticsInfoFormVisible: false,
      editOrderFormVisible: false,
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
      this.editOrderFormVisible = true;
    },
    handleNext() {
      this.visible = false;
      this.logisticsInfoFormVisible = true;
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