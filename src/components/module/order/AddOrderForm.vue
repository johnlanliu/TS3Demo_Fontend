<template>
    <el-dialog
        :title="'Order Info'"
        :center="true"
        top="15vh"
        :visible.sync="isOpen"
        @closed="resetFields"
        width="50%">
        <div class="form-box">
            <el-form ref="form" :model="org" size="mini" style="margin: 0; padding-left: 10px">
                <el-form-item label="Order Type">
                    <el-select v-model="org.orderType" placeholder="Select">
                        <el-option
                            v-for="option in orderOptions"
                            :key="option.value"
                            :label="option.value"
                            :value="option.label">
                        </el-option>
                    </el-select>
                </el-form-item>

                <table class="test" style="text-align: left; border-spacing: 0px">
                    <tr>
                        <td class="alignTop">
                            <el-form-item label="BILLING INFO"style="font-weight: bold"></el-form-item>
                        </td>
                        <td class="alignTop" style="padding-left: 196px">
                            <el-form-item label="SHIPPING INFO" style="font-weight: bold"></el-form-item>
                        </td>
                    </tr>
                </table>

                <div style="padding-left: 300px; margin-bottom: 10px">
                    <el-checkbox v-model="sameAsBilling"
                                 style="display: inline"
                                 @change="handleSameInfo()"
                    >the same as billing info
                    </el-checkbox>
                </div>

                <table class="test" style="width: 100%; text-align: left; border-spacing: 0px">
                    <tr>
                        <td class="alignTop">
                            <el-form-item label="Company Name: ">
                                <el-input v-model="org.orgName" style="width: 275px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="alignTop" style="padding-left: 14px">
                            <el-form-item label="Company Name: ">
                                <el-input v-model="sameAsBilling ? org.orgName : org.shippingCompany"
                                          style="width: 275px" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="alignTop">
                            <el-form-item label="Contact: ">
                                <el-input v-model="org.contacts" style="width: 275px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="alignTop" style="padding-left: 14px">
                            <el-form-item label="Contact: ">
                                <el-input v-model="sameAsBilling ? org.contacts : org.shippingContact"
                                          style="width: 275px" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="alignTop">
                            <el-form-item label="Phone Number: ">
                                <el-input v-model="org.phone" style="width: 275px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="alignTop" style="padding-left: 14px">
                            <el-form-item label="Phone Number: ">
                                <el-input v-model="sameAsBilling ? org.phone : org.shippingPhone"
                                          style="width: 275px" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="alignTop">
                            <el-form-item label="Email: ">
                                <el-input v-model="org.email" style="width: 275px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="alignTop" style="padding-left: 14px">
                            <el-form-item label="Email: ">
                                <el-input v-model="sameAsBilling ? org.email : org.shippingEmail"
                                          style="width: 275px" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="alignTop">
                            <el-form-item label="Address: ">
                                <el-input v-model="org.streetAddress" style="width: 275px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="alignTop" style="padding-left: 14px">
                            <el-form-item label="Address: ">
                                <el-input v-model="sameAsBilling ? org.streetAddress : org.shippingAddress"
                                          style="width: 275px" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>

                <table class="test" style="text-align: left; border-spacing: 0px">
                    <tr>
                        <td class="alignTop">
                            <el-form-item label="City: ">
                                <el-input v-model="org.city" style="width: 145px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="alignTop" style="padding-left: 10px">
                            <el-form-item label="Zip/Postal Code: ">
                                <el-input v-model="org.zip" style="width: 120px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="alignTop" style="padding-left: 22px">
                            <el-form-item label="City: ">
                                <el-input v-model="sameAsBilling ? org.city : org.shippingCity"
                                          style="width: 145px" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                        <td class="alignTop" style="padding-left: 10px">
                            <el-form-item label="Zip/Postal Code: ">
                                <el-input v-model="sameAsBilling ? org.zip : org.shippingZip"
                                          style="width: 120px" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>

                <table class="test" style="text-align: left; border-spacing: 0px">
                    <tr>
                        <td class="alignTop">
                            <el-form-item label="Country: ">
                                <el-input v-model="org.country" style="width: 133px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="alignTop" style="padding-left: 10px">
                            <el-form-item label="State/Province: ">
                                <el-input v-model="org.state" style="width: 132px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="alignTop" style="padding-left: 25px">
                            <el-form-item label="Country: ">
                                <el-input v-model="sameAsBilling ? org.country : org.shippingCountry"
                                          style="width: 133px" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                        <td class="alignTop" style="padding-left: 10px">
                            <el-form-item label="State/Province: ">
                                <el-input v-model="sameAsBilling ? org.state : org.shippingState"
                                          style="width: 132px" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>

                <el-form-item label="Payment Term">
                    <el-select v-model="org.paymentTerm" placeholder="Select">
                        <el-option
                            v-for="option in paymentOptions"
                            :key="option.value"
                            :label="option.value"
                            :value="option.label">
                        </el-option>
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
                    <el-table-column label="Product" prop="product" width="162"></el-table-column>
                    <el-table-column label="QTY" prop="quantity" width="90"></el-table-column>
                    <el-table-column label="Rate" prop="rate" width="96">
                        <template slot-scope="scope">
                            <span>${{ Number(scope.row.rate).toFixed(2) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Amount" prop="amount" width="96">
                        <template slot-scope="scope">
                            <span>${{ Number(scope.row.amount).toFixed(2) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Tax" prop="tax" width="50"></el-table-column>
                    <el-table-column label="Action" width="95">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleDeleteOrderItem(scope.row, scope.$index)">Delete</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <table style="width: 100%; text-align: right; padding-left: 150px; margin-left: 52px; margin-bottom: 10px">
                    <tr>
                        <td class="alignTop">
                            <el-button type="primary" @click="handleAddDevice()">+ Add Device</el-button>
                        </td>
                        <td class="alignTop" style="padding-left: 5px">
                            <el-button type="primary" @click="handleAddAccessories()">+ Add Accessories</el-button>
                        </td>
                        <td class="alignTop" style="padding-left: 3px">
                            <el-button type="primary" @click="handleAddService()">+ Add Service Plan</el-button>
                        </td>
                    </tr>
                </table>

                <table style="width: 115%; border-spacing: 0px">
                    <tr>
                        <td class="alignTop">
                            <el-form-item label="Note:" style="display: block; margin-left: 30px; margin-right: 30px" prop="note">
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="notes"
                                    v-model="org.note"
                                    style="width: 405px"
                                >
                                </el-input>
                            </el-form-item>
                        </td>
                        <td class="alignTop" style="text-align: right; padding-right: 39px">
                            <el-form-item label="Tax: ">
                                <p v-model="tax">${{ tax }}</p>
                            </el-form-item>
                            <el-form-item label="Total: ">
                                <p v-model="total">${{ total }}</p>
                                <p>plus shipping fee</p>
                            </el-form-item>
                        </td>
                    </tr>
                </table>

                <el-form ref="form" :model="customerServiceForm" size="mini">
                    <table style="width: 110%; text-align: right; border-spacing: 0px 1px">
                        <tr>
                            <td class="alignTop" style="padding-left: 39px">
                                <el-form-item label="Status: " style="float: left"></el-form-item>
                                <el-select v-model="customerServiceForm.status" placeholder="select" style="width: 188px">
                                    <el-option
                                        v-for="option in statusOptions"
                                        :key="option.status"
                                        :value="option.status"
                                        :label="option.label"
                                    ></el-option>
                                </el-select>
                            </td>
                            <td class="alignTop" style="padding-right: 9px; padding-left: 66px">
                                <el-form-item label="Shipping Fee: " style="float: left"></el-form-item>
                                <el-input v-model="customerServiceForm.shippingFee" style="width: 188px"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td class="alignTop" style="padding-left: 23px">
                                <el-form-item label="Invoice #: " style="float: left"></el-form-item>
                                <el-input v-model="customerServiceForm.invoiceNumber"
                                          :placeholder="invoicePlaceholder"
                                          style="width: 188px"></el-input>
                                <p class="warning" v-if="!validInvoice">invalid invoice number</p>
                            </td>
                            <td class="alignTop" style="padding-right: 9px; padding-left: 71px">
                                <el-form-item label="Invoice Date: " style="float: left"></el-form-item>
                                <el-date-picker
                                    v-model="customerServiceForm.invoiceDate"
                                    type="datetime"
                                    placeholder="Select date and time"
                                    style="width: 188px">
                                </el-date-picker>
                            </td>
                        </tr>
                        <tr>
                            <td class="alignTop">
                                <el-form-item label="Shipping Via: " style="float: left"></el-form-item>
                                <el-input v-model="customerServiceForm.shippingVia" style="width: 188px"></el-input>
                            </td>
                            <td class="alignTop" style="padding-right: 9px; padding-left: 39px">
                                <el-form-item label="Tracking Number: " style="float: left"></el-form-item>
                                <el-input v-model="customerServiceForm.trackingNumber" style="width: 188px"></el-input>
                            </td>
                        </tr>
                    </table>

                    <table style="width: 100%; text-align: right; padding-left: 150px; margin-left: 52px">
                        <tr>
                            <td class="alignTop">
                                <el-form-item style="padding-left: 105px">
                                    <el-button type="primary" @click="handleCancel">Cancel Order</el-button>
                                </el-form-item>
                            </td>
                            <td class="alignTop">
                                <el-form-item>
                                    <el-button type="primary" @click="handleCreateInvoice" :disabled="!validInvoice">Submit and Create Invoice</el-button>
                                </el-form-item>
                            </td>
                        </tr>
                    </table>
                </el-form>
            </el-form>
        </div>
        <create-invoice-form ref="createInvoiceForm" v-bind:table-data="this.tableData" v-bind:form="this.formCopy"
                             v-bind:customerServiceForm="this.customerServiceFormCopy"></create-invoice-form>
        <accessory-detail-form ref="accessoryDetailForm" @accessoryAdded="getAccessoryInfo"></accessory-detail-form>
        <product-detail-form ref="productDetailForm" @productAdded="getProductInfo" @prodAndAccAdded="getProdAndAccInfo"
        @prodAndPlanAdded="getProdAndPlanInfo" @allAdded="getAllInfo"></product-detail-form>
        <service-plan-form ref="servicePlanForm" @planAdded="getServicePlanFee"></service-plan-form>
    </el-dialog>
</template>

<script>
import ProductDetailForm from './ProductDetailForm.vue';
import CreateInvoiceForm from './CreateInvoiceForm.vue';
import AccessoryDetailForm from './AccessoryDetailForm.vue';
import ServicePlanForm from './ServicePlanForm.vue';
import { addOrder, getLastOrderId, validInvoiceNo, getOrgById } from '@/api/getData';
import { mapState } from 'vuex';


export default {
  name: 'AddOrderForm',

  components: {
    ProductDetailForm,
    CreateInvoiceForm,
    AccessoryDetailForm,
    ServicePlanForm,
  },

  created() {
    this.getLastOrder();
  },
  mounted: function() {
  },
  props: {
    org: Object,
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
      isOpen: false,

    /* RESET THESE */
      validInvoice: true,
      sameAsBilling: true,
      sameAsBillingBool: 1,
      tableData: [],
      formCopy: {},
      customerServiceFormCopy: {},
      form: {
        shippingCompany: '',
        shippingContact: '',
        shippingEmail: '',
        shippingPhone: '',
        shippingAddress: '',
        shippingCity: '',
        shippingState: '',
        shippingCountry: '',
        shippingZip: '',
        orderType: '',
        paymentTerm: '',
        note: '',
        accName: '',
        accPrice: '',
        accQty: '',
        accTax: '',
        prodName: '',
        prodPrice: '',
        prodQty: '',
        prodTax: '',
        planQty: '',
        planAmt: '',
        planName: '',
      },
      invoicePlaceholder: '',
      customerServiceForm: {
        status: '',
        invoiceDate: '',
        dueDate: '',
        shippingVia: '',
        trackingNumber: '',
        shippingFee: '',
        invoiceNumber: '',
      },

    /* DROPDOWN OPTIONS */
      orderOptions: [{
        value: 'evaluation',
        label: 'evaluation',
      }, {
        value: 'purchase',
        label: 'purchase',
      }, {
        value: 'RMA',
        label: 'RMA',
      }],
      paymentOptions: [{
        value: 'Net15',
        label: 'Net15',
      }, {
        value: 'Net30',
        label: 'Net30',
      }],
      statusOptions: [{
        status: 'delivered',
        label: 'delivered'
      }, {
        status: 'cancelled',
        label: 'cancelled'
      }, {
        status: 'shipped',
        label: 'shipped'
      }, {
        status: 'pending',
        label: 'pending'
      }, {
        status: 'new',
        label: 'new'
      }],

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
    showDialog() {
      Object.assign(this.org, this.form);
      this.getLastOrder();
      this.validInvoice = true;
      this.isOpen = true;
    },
    resetFields() {
      this.sameAsBilling = true;
      this.sameAsBillingBool = 1;
      this.tableData = [];
      this.formCopy = {};
      this.customerServiceFormCopy = {};
      this.form = {};
      this.customerServiceForm = {};
      this.validInvoice = true;
      this.getLastOrder();
      this.$refs.form.resetFields();
    },

    /* HANDLER FUNCTIONS */
    handleSameInfo() {
      if (this.sameAsBilling) {
        this.sameAsBillingBool = 1;
        // this.org.shippingCompany = this.org.orgName;
        // this.org.shippingContact = this.org.contacts;
        // this.org.shippingPhone = this.org.phone;
        // this.org.shippingEmail = this.org.email;
        // this.org.shippingAddress = this.org.streetAddress;
        // this.org.shippingCity = this.org.city;
        // this.org.shippingState = this.org.state;
        // this.org.shippingCountry = this.org.country;
        // this.org.shippingZip = this.org.zip;
      } else {
        this.sameAsBillingBool = 0;
      }
    },
    handleDeleteOrderItem(row, index) {
      this.tableData.splice(index, 1);
    },
    handleCancel() {
      this.resetFields();
      this.isOpen = false;
    },
    async handleCreateInvoice() {

      this.getDates();
      this.handleAddOrder();
      this.formCopy = JSON.parse(JSON.stringify(this.org));
      // this.formCopy.shippingCompany = this.formCopy.orgName;
      // this.formCopy.shippingContact = this.formCopy.contacts;
      // this.formCopy.shippingPhone = this.formCopy.phone;
      // this.formCopy.shippingEmail = this.formCopy.email;
      // this.formCopy.shippingAddress = this.formCopy.streetAddress;
      // this.formCopy.shippingCity = this.formCopy.city;
      // this.formCopy.shippingState = this.formCopy.state;
      // this.formCopy.shippingCountry = this.formCopy.country;
      // this.formCopy.shippingZip = this.formCopy.zip;
      this.customerServiceFormCopy = JSON.parse((JSON.stringify(this.customerServiceForm)));
      this.$refs.createInvoiceForm.showDialog();
    },
    handleAddOrder() {
      this.handleSameInfo();
      addOrder({},{
        type: this.org.orderType,
        customer: this.org.orgName,
        status: this.customerServiceForm.status,
        invoiceNo: this.customerServiceForm.invoiceNumber,
        invoiceDate: this.customerServiceForm.invoiceDate,
        dueDate: this.customerServiceForm.dueDate,
        trackingNo: this.customerServiceForm.trackingNumber,
        sales: 'NULL',
        createTime: 'NULL',
        modifyTime: 'NULL',
        orderItems: this.tableData,
        billingCompany: this.org.orgName,
        billingContact: this.org.contacts,
        billingNumber: this.org.phone,
        billingEmail: this.org.email,
        billingAddress: this.org.streetAddress,
        billingCity: this.org.city,
        billingState: this.org.state,
        billingCountry: this.org.country,
        billingZip: this.org.zip,
        shippingCompany: this.org.shippingCompany,
        shippingContact: this.org.shippingContact,
        shippingNumber: this.org.shippingPhone,
        shippingEmail: this.org.shippingEmail,
        shippingAddress: this.org.shippingAddress,
        shippingCity: this.org.shippingCity,
        shippingState: this.org.shippingState,
        shippingCountry: this.org.shippingCountry,
        shippingZip: this.org.shippingZip,
        note: this.org.note,
        shippingVia: this.customerServiceForm.shippingVia,
        shippingFee: this.customerServiceForm.shippingFee,
        sameAsBilling: this.sameAsBillingBool,
        paymentTerm: this.org.paymentTerm,
      });
    },
    async getLastOrder() {
      this.invoicePlaceholder = await getLastOrderId() + 1;
      let valid = await validInvoiceNo({invoiceNo: this.invoicePlaceholder});
      while (!valid) {
        this.invoicePlaceholder += 1;
        valid = await validInvoiceNo({invoiceNo: this.invoicePlaceholder});
      }
    },
    async checkForOrder() {
      this.validInvoice = await validInvoiceNo({invoiceNo: this.customerServiceForm.invoiceNumber});
    },

    /* HANDLERS FOR SHOWING PRODUCT FORMS */
    handleAddDevice() {
      this.$refs.productDetailForm.showDialog();
    },
    handleAddAccessories() {
      this.$refs.accessoryDetailForm.showDialog();
    },
    handleAddService() {
      this.$refs.servicePlanForm.showDialog();
    },

    /* FORMAT INVOICE AND DUE DATES */
    getDates() {
      if (this.customerServiceForm.invoiceDate === null || this.org.paymentTerm === null
          || this.customerServiceForm.invoiceDate === '' || this.org.paymentTerm === ''
          || typeof this.customerServiceForm.invoiceDate === 'undefined'
          || typeof this.org.paymentTerm === 'undefined') {
        this.customerServiceForm.dueDate = null;
        return;
      }
      let invoice = new Date(this.customerServiceForm.invoiceDate);
      let due = new Date(this.customerServiceForm.invoiceDate);

      if (this.org.paymentTerm === 'Net15') {
        due.setDate(this.customerServiceForm.invoiceDate.getDate()+15);
      } else {
        due.setDate(this.customerServiceForm.invoiceDate.getDate()+30);
      }

      this.customerServiceForm.invoiceDate = invoice.getFullYear()
            + '-' + (invoice.getMonth()+1)
            + '-' + invoice.getDate()
            + ' ' + invoice.getHours()
            + ':' + invoice.getMinutes();
      this.customerServiceForm.dueDate = due.getFullYear()
            + '-' + (due.getMonth()+1)
            + '-' + due.getDate()
            + ' ' + due.getHours()
            + ':' + due.getMinutes();
    },

    /* GET ACCESSORIES, PRODUCTS, AND SERVICE PLANS FOR TABLE */
    getAccessoryInfo(n, p, q, r) {
      this.org.accName = n;
      this.org.accPrice = p;
      this.org.accQty = q;
      this.org.accTax = r;
      const data = {orderId: '',
        product: this.org.accName,
        quantity: this.org.accQty,
        rate: this.org.accPrice,
        amount: Number(this.org.accPrice) * Number(this.org.accQty),
        tax: this.org.accTax,
        description: this.org.accQty + ' * ' + this.org.accName,
        invoiceNo: this.customerServiceForm.invoiceNumber
      };
      this.tableData.push(data);
    },
    getProductInfo(n, p, q, r) {
      this.org.prodName = n;
      this.org.prodPrice = p;
      this.org.prodQty = q;
      this.org.prodTax = r;
      const data = {orderId: '',
        product: this.org.prodName,
        quantity: this.org.prodQty,
        rate: this.org.prodPrice,
        amount: Number(this.org.prodPrice) * Number(this.org.prodQty),
        tax: this.org.prodTax,
        description: this.org.prodQty + ' * ' + this.org.prodName,
        invoiceNo: this.customerServiceForm.invoiceNumber
      };
      this.tableData.push(data);
    },
    getServicePlanFee(q, a, n) {
      this.org.planQty = q;
      this.org.planAmt = a;
      this.org.planName = n;
      const data = {orderId: '',
        product: this.org.planName,
        quantity: this.org.planQty,
        rate: this.org.planAmt,
        amount: Number(this.org.planAmt) * Number(this.org.planQty),
        tax: 'N',
        description: this.org.planQty + ' * ' + this.org.planName,
        invoiceNo: this.customerServiceForm.invoiceNumber
      };
      this.tableData.push(data);
    },
    getProdAndAccInfo(pn, pp, pq, pt, an, ap, aq, at) {
      this.org.prodName = pn;
      this.org.prodPrice = pp;
      this.org.prodQty = pq;
      this.org.prodTax = pt;
      this.org.accName = an;
      this.org.accPrice = ap;
      this.org.accQty = aq;
      this.org.accTax = at;
      const data = {orderId: '',
        product: this.org.prodName,
        quantity: this.org.prodQty,
        rate: this.org.prodPrice,
        amount: Number(this.org.prodPrice) * Number(this.org.prodQty),
        tax: this.org.prodTax,
        description: this.org.prodQty + ' * ' + this.org.prodName,
        invoiceNo: this.customerServiceForm.invoiceNumber
      };
      this.tableData.push(data);
      const data2 = {orderId: '',
        product: this.org.accName,
        quantity: this.org.accQty,
        rate: this.org.accPrice,
        amount: Number(this.org.accPrice) * Number(this.org.accQty),
        tax: this.org.accTax,
        description: this.org.accQty + ' * ' + this.org.accName,
        invoiceNo: this.customerServiceForm.invoiceNumber
      };
      this.tableData.push(data2);
    },
    getProdAndPlanInfo(pn, pp, pq, pt, sq, sa, sn) {
      this.org.prodName = pn;
      this.org.prodPrice = pp;
      this.org.prodQty = pq;
      this.org.prodTax = pt;
      this.org.planQty = sq;
      this.org.planAmt = sa;
      this.org.planName = sn;
      const data = {orderId: '',
        product: this.org.prodName,
        quantity: this.org.prodQty,
        rate: this.org.prodPrice,
        amount: Number(this.org.prodPrice) * Number(this.org.prodQty),
        tax: this.org.prodTax,
        description: this.org.prodQty + ' * ' + this.org.prodName,
        invoiceNo: this.customerServiceForm.invoiceNumber
      };
      this.tableData.push(data);
      const data2 = {orderId: '',
        product: this.org.planName,
        quantity: this.org.planQty,
        rate: this.org.planAmt,
        amount: Number(this.org.planAmt) * Number(this.org.planQty),
        tax: 'N',
        description: this.org.planQty + ' * ' + this.org.planName,
        invoiceNo: this.customerServiceForm.invoiceNumber
      };
      this.tableData.push(data2);
    },
    getAllInfo(pn, pp, pq, pt, an, ap, aq, at, sq, sa, sn) {
      this.org.prodName = pn;
      this.org.prodPrice = pp;
      this.org.prodQty = pq;
      this.org.prodTax = pt;
      this.org.accName = an;
      this.org.accPrice = ap;
      this.org.accQty = aq;
      this.org.accTax = at;
      this.org.planQty = sq;
      this.org.planAmt = sa;
      this.org.planName = sn;
      const data = {orderId: '',
        product: this.org.prodName,
        quantity: this.org.prodQty,
        rate: this.org.prodPrice,
        amount: Number(this.org.prodPrice) * Number(this.org.prodQty),
        tax: this.org.prodTax,
        description: this.org.prodQty + ' * ' + this.org.prodName,
        invoiceNo: this.customerServiceForm.invoiceNumber
      };
      this.tableData.push(data);
      const data2 = {orderId: '',
        product: this.org.accName,
        quantity: this.org.accQty,
        rate: this.org.accPrice,
        amount: Number(this.org.accPrice) * Number(this.org.accQty),
        tax: this.org.accTax,
        description: this.org.accQty + ' * ' + this.org.accName,
        invoiceNo: this.customerServiceForm.invoiceNumber
      };
      this.tableData.push(data2);
      const data3 = {orderId: '',
        product: this.org.planName,
        quantity: this.org.planQty,
        rate: this.org.planAmt,
        amount: Number(this.org.planAmt) * Number(this.org.planQty),
        tax: 'N',
        description: this.org.planQty + ' * ' + this.org.planName,
        invoiceNo: this.customerServiceForm.invoiceNumber
      };
      this.tableData.push(data3);
    },
  },

  watch: {
    'customerServiceForm.invoiceNumber': function() {
      this.checkForOrder();
    },
  },

  computed: {
    tax: function() {
      let t = 0;
      let et;
      const copy = this.tableData.slice();
      copy.forEach(function(item, index) {
        if ((item.tax === 'Y')) {
          et = Number(item.amount) * .0775;
        } else {
          et = 0;
        }
        t += et;
      });
      return (Math.floor(t * 100) / 100);
    },
    total: function() {
      let t = 0;
      const copy = this.tableData.slice();
      copy.forEach(function(item, index) {
        t += item.amount;
      });
      const tot = t + this.tax;
      return (Math.floor(tot * 100) / 100);
    },
    ...mapState([
      'loginInfo',
      'modelList',
      'currentOrgId',
      'lang',
      'locale',
      'currentOrg'
    ]),
  },
};
</script>

<style scoped>
    table.test {
        line-height: 40px;
    }

    td.alignTop {
        vertical-align: top;
    }

    .warning {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-size: 9pt;
        color: #F56C6C;
        position: absolute;
        padding-left: 5px;
    }

</style>
