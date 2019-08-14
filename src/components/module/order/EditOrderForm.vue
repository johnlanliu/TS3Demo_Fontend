<template>
  <el-dialog
    :title="'Order Info'"
    :center="true"
    top="15vh"
    :visible.sync="visible"
    @close="clearValidate"
    width="790px"
  >
    <div class="form-box">
      <el-form ref="form" :model="form" size="mini" style="margin: 0; padding-left: 10px">
        <el-form-item label="Order Type">
          <el-select v-model="form.type" placeholder="Select">
            <el-option
              v-for="option in orderOptions"
              :key="option.label"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-row style="width:590px">
          <el-col :span="12">
            <el-form-item label="BILLING INFO" style="font-weight: bold"></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SHIPPING INFO" style="font-weight: bold"></el-form-item>
          </el-col>
        </el-row>

        <div style="padding-left: 300px; margin-bottom: 10px">
          <el-checkbox
            v-model="sameAsBilling"
            style="display: inline"
            @change="handleSameInfo()"
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
          <el-col :span="12">
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
          <el-col :span="12">
            <el-form-item label="Phone Number: ">
              <el-input v-model="form.shippingPhone" style="width: 275px" :disabled="sameAsBilling"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="Email: ">
              <el-input v-model="form.billingEmail" style="width: 275px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Email: ">
              <el-input v-model="form.shippingEmail" style="width: 275px" :disabled="sameAsBilling"></el-input>
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
          <el-col :span="6">
            <el-form-item label="City: ">
              <el-input v-model="form.billingCity" style="width: 145px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Zip/Postal Code: ">
              <el-input v-model="form.billingZip" style="width: 120px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="City: ">
              <el-input v-model="form.shippingCity" style="width: 145px" :disabled="sameAsBilling"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Zip/Postal Code: ">
              <el-input v-model="form.shippingZip" style="width: 120px" :disabled="sameAsBilling"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="Country: ">
              <el-input v-model="form.billingCountry" style="width: 133px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="State/Province: ">
              <el-input v-model="form.billingState" style="width: 132px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Country: ">
              <el-input
                v-model="form.shippingCountry"
                style="width: 133px"
                :disabled="sameAsBilling"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="State/Province: ">
              <el-input v-model="form.shippingState" style="width: 132px" :disabled="sameAsBilling"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Payment Term">
          <el-select v-model="form.paymentTerm" placeholder="Select">
            <el-option
              v-for="option in paymentOptions"
              :key="option.value"
              :label="option.value"
              :value="option.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Order Details" style="font-weight: 900"></el-form-item>
        <el-table
          ref="orderDetailTable"
          :data="tableData"
          v-loading="loading"
          border
          stripe
          highlight-current-row
          :height="167"
          :row-key="row => row.index"
          style="width: 100%; margin-left: 50px; margin-bottom: 5px"
        >
          <el-table-column fixed label="Product" prop="product" width="162"></el-table-column>
          <el-table-column fixed label="QTY" prop="quantity" width="90"></el-table-column>
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
          <el-table-column fixed label="Tax" prop="tax" width="50"></el-table-column>
          <el-table-column fixed label="Action" width="95">
            <template slot-scope="scope">
              <el-button type="text" @click="handleDeleteOrderItem(scope.row, scope.$index)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-row style="margin-top:10px;width:110%">
          <el-col :span="5" :offset="7">
            <el-button
              type="primary"
              style="display:inline-block;margin-left:38px"
              @click="handleAddDevice()"
            >+ Add Device</el-button>
          </el-col>
          <el-col :span="6">
            <el-button
              type="primary"
              style="display:inline-block;margin-left:20px"
              @click="handleAddAccessories()"
            >+ Add Accessories</el-button>
          </el-col>
          <el-col :span="6">
            <el-button
              type="primary"
              style="display:inline-block"
              @click="handleAddService()"
            >+ Add Service Plan</el-button>
          </el-col>
        </el-row>
        <el-row style="margin-top:10px">
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
          <el-col :span="5" style="margin-left:24px;margin-top:12px">
            <el-form-item style="dispaly:inline" label="Tax: " :tax="tax" prop="tax">${{ tax }}</el-form-item>
            <el-form-item label="Total: " :total="total" prop="total">${{ total }}</el-form-item>
            <el-form-item class="plus" label="plus shipping fee"></el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin-top:10px">
          <el-col :span="11">
            <el-form-item label="Status: " style="float: left"></el-form-item>
            <el-select v-model="form.status" placeholder="select" style="width: 188px">
              <el-option
                v-for="option in statusOptions"
                :key="option.status"
                :value="option.status"
                :label="option.label"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="13">
            <el-form-item label="Shipping Fee: " style="float: left"></el-form-item>
            <el-input v-model="form.shippingFee" style="width: 188px"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top:10px">
          <el-col :span="11">
            <el-form-item label="Invoice #: " style="float: left"></el-form-item>
            <el-input
              v-model="form.invoiceNo"
              :placeholder="invoicePlaceholder"
              style="width: 188px"
            ></el-input>
            <el-form-item class="warning" v-if="!validInvoice">invalid invoice number</el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="Invoice Date: " style="float: left"></el-form-item>
            <el-date-picker
              v-model="form.invoiceDate"
              type="datetime"
              placeholder="Select date and time"
              style="width: 188px"
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row style="margin-top:10px">
          <el-col :span="12">
            <el-form-item label="Shipping Via: " style="float: left"></el-form-item>
            <el-input v-model="form.shippingVia" style="width: 188px"></el-input>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Tracking Number: " style="float: left"></el-form-item>
            <el-input v-model="form.trackingNo" style="width: 188px"></el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top:10px;width:110%">
          <el-col :span="5" :offset="7" :push="2">
            <el-form-item>
              <el-button 
                style="margin-left:18px"
                type="primary"
                @click="clearValidate
                ">Cancel Order</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4" :push="2">
            <el-form-item>
              <el-button
                type="primary"
                @click="handleSaveEdit()"
                v-show="form.orderId != null"
              >Save Change</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="7" :push="2">
            <el-form-item>
              <el-button
                style="margin-left:10px"
                type="primary"
                @click="handleSave"
                :disabled="validInvoice"
              >Submit and Create Invoice</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <create-invoice-form :form="form" v-model="createInvoiceFormVisible"></create-invoice-form>
    <accessory-detail-form :form="form" v-model="accessoryDetailFormVisible"></accessory-detail-form>
    <product-detail-form :form="form" v-model="productDetailFormVisible"></product-detail-form>
    <service-plan-form :form="form" v-model="servicePlanFormVisible"></service-plan-form>
  </el-dialog>
</template>

<script>
import ProductDetailForm from './ProductDetailForm.vue';
import CreateInvoiceForm from './CreateInvoiceForm.vue';
import AccessoryDetailForm from './AccessoryDetailForm.vue';
import ServicePlanForm from './ServicePlanForm.vue';
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
    ServicePlanForm
  },

  created() {
    // this.getLastOrder();
  },
  mounted: function() {},
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
          value: 'Net15',
          label: 'Net15'
        },
        {
          value: 'Net30',
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
    clearValidate() {
      this.sameAsBilling = false;
      // this.tableData = [];
      // this.form = {};
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
    handleSave() {
      this.loading = true;
      this.$refs.form.validate(valid => {
        if(!valid) {
          this.loading = false;
          return;
        }
      this.getDates();
      this.fetchSaveOrder();
      this.createInvoiceFormVisible = true;
      });
    },
    async fetchSaveOrder() {
      const param = Object.assign({}, this.form, {
        orderItems: this.tableData
      });
      const result = this.form.orderId ? await editOrder({},param) : await addOrder({},param);
    },

    async checkForOrder() {
      this.validInvoice = await validInvoiceNo({
        invoiceNo: this.form.invoiceNumber
      });
    },

    /* HANDLERS FOR SHOWING PRODUCT FORMS */
    handleAddDevice() {
      // this.$refs.productDetailForm.showDialog();
      // this.createInvoiceFormVisible = true;
      this.form = {};
      this.form.activeName = '1';
      this.productDetailFormVisible = true;
    },
    handleAddAccessories() {
      // this.$refs.accessoryDetailForm.showDialog();
      this.accessoryDetailFormVisible = true;
    },
    handleAddService() {
      // this.$refs.servicePlanForm.showDialog();
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

    /* GET ACCESSORIES, PRODUCTS, AND SERVICE PLANS FOR TABLE */
    getAccessoryInfo(n, p, q, r) {
      this.form.accName = n;
      this.form.accPrice = p;
      this.form.accQty = q;
      this.form.accTax = r;
      const data = {
        orderId: '',
        product: this.form.accName,
        quantity: this.form.accQty,
        rate: this.form.accPrice,
        amount: Number(this.form.accPrice) * Number(this.form.accQty),
        tax: this.form.accTax,
        description: this.form.accQty + ' * ' + this.form.accName,
        invoiceNo: this.form.invoiceNumber
      };
      this.tableData.push(data);
    },
    getProductInfo(n, p, q, r) {
      this.form.prodName = n;
      this.form.prodPrice = p;
      this.form.prodQty = q;
      this.form.prodTax = r;
      const data = {
        orderId: '',
        product: this.form.prodName,
        quantity: this.form.prodQty,
        rate: this.form.prodPrice,
        amount: Number(this.form.prodPrice) * Number(this.form.prodQty),
        tax: this.form.prodTax,
        description: this.form.prodQty + ' * ' + this.form.prodName,
        invoiceNo: this.form.invoiceNumber
      };
      this.tableData.push(data);
    },
    getServicePlanFee(q, a, n) {
      this.form.planQty = q;
      this.form.planAmt = a;
      this.form.planName = n;
      const data = {
        orderId: '',
        product: this.form.planName,
        quantity: this.form.planQty,
        rate: this.form.planAmt,
        amount: Number(this.form.planAmt) * Number(this.form.planQty),
        tax: 'N',
        description: this.form.planQty + ' * ' + this.form.planName,
        invoiceNo: this.form.invoiceNumber
      };
      this.tableData.push(data);
    },
    getProdAndAccInfo(pn, pp, pq, pt, an, ap, aq, at) {
      this.form.prodName = pn;
      this.form.prodPrice = pp;
      this.form.prodQty = pq;
      this.form.prodTax = pt;
      this.form.accName = an;
      this.form.accPrice = ap;
      this.form.accQty = aq;
      this.form.accTax = at;
      const data = {
        orderId: '',
        product: this.form.prodName,
        quantity: this.form.prodQty,
        rate: this.form.prodPrice,
        amount: Number(this.form.prodPrice) * Number(this.form.prodQty),
        tax: this.form.prodTax,
        description: this.form.prodQty + ' * ' + this.form.prodName,
        invoiceNo: this.form.invoiceNumber
      };
      this.tableData.push(data);
      const data2 = {
        orderId: '',
        product: this.form.accName,
        quantity: this.form.accQty,
        rate: this.form.accPrice,
        amount: Number(this.form.accPrice) * Number(this.form.accQty),
        tax: this.form.accTax,
        description: this.form.accQty + ' * ' + this.form.accName,
        invoiceNo: this.form.invoiceNumber
      };
      this.tableData.push(data2);
    },
    getProdAndPlanInfo(pn, pp, pq, pt, sq, sa, sn) {
      this.form.prodName = pn;
      this.form.prodPrice = pp;
      this.form.prodQty = pq;
      this.form.prodTax = pt;
      this.form.planQty = sq;
      this.form.planAmt = sa;
      this.form.planName = sn;
      const data = {
        orderId: '',
        product: this.form.prodName,
        quantity: this.form.prodQty,
        rate: this.form.prodPrice,
        amount: Number(this.form.prodPrice) * Number(this.form.prodQty),
        tax: this.form.prodTax,
        description: this.form.prodQty + ' * ' + this.form.prodName,
        invoiceNo: this.form.invoiceNumber
      };
      this.tableData.push(data);
      const data2 = {
        orderId: '',
        product: this.form.planName,
        quantity: this.form.planQty,
        rate: this.form.planAmt,
        amount: Number(this.form.planAmt) * Number(this.form.planQty),
        tax: 'N',
        description: this.form.planQty + ' * ' + this.form.planName,
        invoiceNo: this.form.invoiceNumber
      };
      this.tableData.push(data2);
    },
    getAllInfo(pn, pp, pq, pt, an, ap, aq, at, sq, sa, sn) {
      this.form.prodName = pn;
      this.form.prodPrice = pp;
      this.form.prodQty = pq;
      this.form.prodTax = pt;
      this.form.accName = an;
      this.form.accPrice = ap;
      this.form.accQty = aq;
      this.form.accTax = at;
      this.form.planQty = sq;
      this.form.planAmt = sa;
      this.form.planName = sn;
      const data = {
        orderId: '',
        product: this.form.prodName,
        quantity: this.form.prodQty,
        rate: this.form.prodPrice,
        amount: Number(this.form.prodPrice) * Number(this.form.prodQty),
        tax: this.form.prodTax,
        description: this.form.prodQty + ' * ' + this.form.prodName,
        invoiceNo: this.form.invoiceNumber
      };
      this.tableData.push(data);
      const data2 = {
        orderId: '',
        product: this.form.accName,
        quantity: this.form.accQty,
        rate: this.form.accPrice,
        amount: Number(this.form.accPrice) * Number(this.form.accQty),
        tax: this.form.accTax,
        description: this.form.accQty + ' * ' + this.form.accName,
        invoiceNo: this.form.invoiceNumber
      };
      this.tableData.push(data2);
      const data3 = {
        orderId: '',
        product: this.form.planName,
        quantity: this.form.planQty,
        rate: this.form.planAmt,
        amount: Number(this.form.planAmt) * Number(this.form.planQty),
        tax: 'N',
        description: this.form.planQty + ' * ' + this.form.planName,
        invoiceNo: this.form.invoiceNumber
      };
      this.tableData.push(data3);
    }
  },

  clearValidate() {
    this.visible = false;
    this.$refs.form.clearValidate();
  },
  watch: {
    'form.invoiceNumber': function() {
      this.checkForOrder();
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

table.test {
  line-height: 40px;
}

.el-form-item.plus{
  margin-top:-18px;
}

td.alignTop {
  vertical-align: top;
}

.warning {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 9pt;
  color: #f56c6c;
  position: absolute;
  padding-left: 5px;
}
</style>