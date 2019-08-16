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
          <el-col :span="12" :push="1">
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
          <el-col :span="12" :push="1">
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
          <el-col :span="12" :push="1">
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
          <el-col :span="12" :push="1">
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
          <el-col :span="12" :push="1">
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
          <el-col :span="12" :push="1">
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
              <el-input v-model="form.billingCity" style="width: 130px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Zip/Postal Code: ">
              <el-input v-model="form.billingZip" style="width: 130px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :push="1">
            <el-form-item label="City: ">
              <el-input v-model="form.shippingCity" style="width: 130px" :disabled="sameAsBilling"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :push="1">
            <el-form-item label="Zip/Postal Code: ">
              <el-input v-model="form.shippingZip" style="width: 130px" :disabled="sameAsBilling"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="Country: ">
              <el-input v-model="form.billingCountry" style="width: 130px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="State/Province: ">
              <el-input v-model="form.billingState" style="width: 130px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :push="1">
            <el-form-item label="Country: ">
              <el-input
                v-model="form.shippingCountry"
                style="width: 133px"
                :disabled="sameAsBilling"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :push="1">
            <el-form-item label="State/Province: ">
              <el-input v-model="form.shippingState" style="width: 130px" :disabled="sameAsBilling"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Payment Term">
          <el-select v-model="form.paymentTerm" placeholder="Select">
            <el-option
              v-for="option in paymentOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
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
          height="167"
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
            <el-form-item style="dispaly:inline" label="Tax: " :tax="tax">${{ tax }}</el-form-item>
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
          <el-col :span="13" :push="1">
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
          <el-col :span="13" :push="1">
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
          <el-col :span="11">
            <el-form-item label="Shipping Via: " style="float: left"></el-form-item>
            <el-input v-model="form.shippingVia" style="width: 175px"></el-input>
          </el-col>
          <el-col :span="13" :push="1">
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
                @click="clearValidate"
                >Cancel Order</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4" :push="2">
            <el-form-item>
              <el-button
                type="primary"
                @click="handleSaveEdit"
                v-if="this.form.oderId"
              >Save Change</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="7" :push="2">
            <el-form-item>
              <el-button
                style="margin-left:10px"
                type="primary"
                @click="handleCreateInvoice"
                :disabled="validInvoice"
              >Submit and Create Invoice</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <create-invoice-form :form="form" v-model="createInvoiceFormVisible"></create-invoice-form>
    <accessory-detail-form :form="form" v-model="accessoryDetailFormVisible" @accessoryAdded="HandleAccessoryAdded"></accessory-detail-form>
    <product-detail-form :form="form" v-model="productDetailFormVisible" @productAdded="handleProductAdded"></product-detail-form>
    <service-plan-form :form="form" v-model="servicePlanFormVisible" @planAdded="handlePlanAdded"></service-plan-form>
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
  },
  mounted: function() {},
  props: {
    value: Boolean,
    form: [Object],
    orderItemTable: Array,
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
    handleSaveEdit() {
    },

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
      // this.getDates();
      this.handleAddOrder();
      // this.formCopy = JSON.parse(JSON.stringify(this.org));
      // this.formCopy.shippingCompany = this.formCopy.orgName;
      // this.formCopy.shippingContact = this.formCopy.contacts;
      // this.formCopy.shippingPhone = this.formCopy.phone;
      // this.formCopy.shippingEmail = this.formCopy.email;
      // this.formCopy.shippingAddress = this.formCopy.streetAddress;
      // this.formCopy.shippingCity = this.formCopy.city;
      // this.formCopy.shippingState = this.formCopy.state;
      // this.formCopy.shippingCountry = this.formCopy.country;
      // this.formCopy.shippingZip = this.formCopy.zip;
      // this.$refs.createInvoiceForm.showDialog();
      this.createInvoiceFormVisible = true;
    },
    handleAddOrder() {
      this.loading = true;
      this.handleSameInfo();
      const param = Object.assign({}, this.form, this.customerServiceForm, {
        orderItems: this.tableData
      });
      this.loading = false;
      const res = addOrder({},param).then(res => {
        if(res && !res.errorCode) {
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
        invoiceNo: this.customerServiceForm.invoiceNumber
      });
    },

    /* HANDLERS FOR SHOWING PRODUCT FORMS */
    handleAddDevice() {
      // this.$refs.productDetailForm.showDialog();
      // this.createInvoiceFormVisible = true;
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
    // getDates() {
    //   if (
    //     this.customerServiceForm.invoiceDate === null ||
    //     this.org.paymentTerm === null ||
    //     this.customerServiceForm.invoiceDate === '' ||
    //     this.org.paymentTerm === '' ||
    //     typeof this.customerServiceForm.invoiceDate === 'undefined' ||
    //     typeof this.org.paymentTerm === 'undefined'
    //   ) {
    //     this.customerServiceForm.dueDate = null;
    //     return;
    //   }
    //   let invoice = new Date(this.customerServiceForm.invoiceDate);
    //   let due = new Date(this.customerServiceForm.invoiceDate);

    //   if (this.org.paymentTerm === 'Net15') {
    //     due.setDate(this.customerServiceForm.invoiceDate.getDate() + 15);
    //   } else {
    //     due.setDate(this.customerServiceForm.invoiceDate.getDate() + 30);
    //   }

    //   this.customerServiceForm.invoiceDate =
    //     invoice.getFullYear() +
    //     '-' +
    //     (invoice.getMonth() + 1) +
    //     '-' +
    //     invoice.getDate() +
    //     ' ' +
    //     invoice.getHours() +
    //     ':' +
    //     invoice.getMinutes();
    //   this.customerServiceForm.dueDate =
    //     due.getFullYear() +
    //     '-' +
    //     (due.getMonth() + 1) +
    //     '-' +
    //     due.getDate() +
    //     ' ' +
    //     due.getHours() +
    //     ':' +
    //     due.getMinutes();
    // },

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
    //     invoiceNo: this.customerServiceForm.invoiceNumber
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
    //     invoiceNo: this.customerServiceForm.invoiceNumber
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
    //     invoiceNo: this.customerServiceForm.invoiceNumber
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
    //     invoiceNo: this.customerServiceForm.invoiceNumber
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
    //     invoiceNo: this.customerServiceForm.invoiceNumber
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
    //     invoiceNo: this.customerServiceForm.invoiceNumber
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
    //     invoiceNo: this.customerServiceForm.invoiceNumber
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
    //     invoiceNo: this.customerServiceForm.invoiceNumber
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
    //     invoiceNo: this.customerServiceForm.invoiceNumber
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
    //     invoiceNo: this.customerServiceForm.invoiceNumber
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
      value.forEach(item=> {
        this.tableData.push(item);
      });
    }
  },

  watch: {
    'customerServiceForm.invoiceNumber': function() {
      this.checkForOrder();
    },

    orderItemTable: {
      handler: function(val) {
        if(this.form.orderId){
          this.tableData = this.orderItemTable.concat([]);
        } else {
          this.tableData = [];
        }
      },
      immediate: true
    },
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