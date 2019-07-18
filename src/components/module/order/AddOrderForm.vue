<template>
    <el-dialog
        :title="'Order Info'"
        :center="true"
        top="15vh"
        :visible.sync="isOpen"
        @closed="resetFields"
        width="50%">
        <div class="form-box">
            <el-form ref="form" :model="form" size="mini" :rules="formRules" style="margin: 0; padding-left: 10px">
                <el-form-item label="Order Type" prop="orderType">
                    <el-select v-model="form.orderType" placeholder="Select">
                        <el-option
                            v-for="option in orderOptions"
                            :key="option.value"
                            :label="option.value"
                            :value="option.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <table class="test" style="width: 100%; text-align: right">
                    <tr>
                        <td class="bill"><el-form-item label="BILLING INFO"style="font-weight: bold"></el-form-item></td>
                        <td>
                            <el-form-item label="SHIPPING INFO" style="font-weight: bold">
                                <el-checkbox v-model="sameAsBilling"
                                             style="display: inline"
                                             @change="handleSameInfo()"
                                >the same as billing info
                                </el-checkbox>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="Company Name: " prop="billing">
                                <el-input v-model="form.billing"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="Company Name: " prop="companyName">
                                <el-input v-model="sameAsBilling ? form.billing : form.companyName" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="Contact: " prop="billingContact">
                                <el-input v-model="form.billingContact"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="Contact: " prop="contact">
                                <el-input v-model="sameAsBilling ? form.billingContact : form.contact" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="Phone Number: " prop="billingPhone">
                                <el-input v-model="form.billingPhone"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="Phone Number: " prop="phone">
                                <el-input v-model="sameAsBilling ? form.billingPhone : form.phone" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="Email: " prop="billingEmail">
                                <el-input v-model="form.billingEmail"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="Email: " prop="email">
                                <el-input v-model="sameAsBilling ? form.billingEmail : form.email" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="Billing Address: " prop="billingAddress">
                                <el-input v-model="form.billingAddress"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="Shipping Address: " prop="shippingAddress">
                                <el-input v-model="sameAsBilling ? form.billingAddress : form.shippingAddress" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <el-form-item label="Payment Term" prop="paymentTerm">
                    <el-select v-model="form.paymentTerm" placeholder="Select">
                        <el-option
                            v-for="option in paymentOptions"
                            :key="option.value"
                            :label="option.value"
                            :value="option.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item label="Order Details" style="font-weight: 900"></el-form-item>
                <br>
                <el-table
                    ref="orderDetailTable"
                    :data="tableData"
                    v-loading="loading"
                    border
                    stripe
                    highlight-current-row
                    :height="200"
                    :row-key="row => row.index"
                    style="width: 100%; margin-left: 50px"
                >
                    <el-table-column label="Product" prop="product" width="150"></el-table-column>
                    <el-table-column label="QTY" prop="quantity" width="96">
<!--                        <template slot-scope="scope">-->
<!--                            <el-input-number v-model="tableData.quantity" controls-position="right" size="mini"></el-input-number>-->
<!--                        </template>-->
                    </el-table-column>
                    <el-table-column label="Rate" prop="rate" width="96"></el-table-column>
                    <el-table-column label="Amount" prop="amount" width="96"></el-table-column>
                    <el-table-column label="Tax" prop="tax" width="50"></el-table-column>
                    <el-table-column label="Action" width="100">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleDeleteOrderItem(scope.row, scope.$index)">Delete</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <table style="width: 100%; text-align: right; padding-left: 150px; margin-left: 50px">
                    <tr>
                        <td>
                            <el-button type="primary" @click="handleAddDevice()">+ Add Device</el-button>
                        </td>
                        <td>
                            <el-button type="primary" @click="handleAddAccessories()">+ Add Accessories</el-button>
                        </td>
                        <td>
                            <el-button type="primary" @click="handleAddService()">+ Add Service Plan</el-button>
                        </td>
                    </tr>
                </table>
                <table style="width: 100%">
                    <tr>
                        <td>
                            <el-form-item label="Note:" style="display: block; margin-left: 30px; margin-right: 30px" prop="note">
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="notes"
                                        v-model="form.note"
                                >
                                </el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <table style="width: 100%; text-align: right">
                                <tr>
                                    <td>
                                        <el-form-item label="Tax: " style="padding-left: 100px">
                                            <p v-model="tax">${{ tax }}</p>
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <el-form-item label="Total: " style="padding-left: 100px">
                                            <p v-model="total">${{ total }} plus shipping fee</p>
                                        </el-form-item>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <el-form ref="form" :model="customerServiceForm" :rules="formRules" size="mini">
                    <table class="secondaryForm" style="width: 100%; text-align: right">
                        <tr>
                            <td>
                                <el-form-item label="Status:" prop="status">
                                    <el-select v-model="customerServiceForm.status" placeholder="select" style="width: 160px">
                                        <el-option
                                                v-for="option in statusOptions"
                                                :key="option.status"
                                                :value="option.status"
                                                :label="option.label"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="Shipping Fee" prop="shippingFee">
                                    <el-input v-model="customerServiceForm.shippingFee" ></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="Invoice #" prop="invoiceNumber">
                                    <el-input v-model="customerServiceForm.invoiceNumber"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="Invoice Date" prop="invoiceDate">
                                    <el-date-picker
                                            v-model="customerServiceForm.invoiceDate"
                                            type="datetime"
                                            placeholder="Select date and time"
                                            style="width: 160px">
                                    </el-date-picker>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="Shipping Via" prop="shippingVia">
                                    <el-input v-model="customerServiceForm.shippingVia"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="Tracking Number" prop="trackingNumber">
                                    <el-input v-model="customerServiceForm.trackingNumber"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; text-align: right; padding-left: 150px; margin-left: 50px">
                        <tr>
                            <td>
                                <el-form-item>
                                    <el-button type="primary" @click="handleCancel">Cancel Order</el-button>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item>
                                    <el-button type="primary" @click="handleCreateInvoice('form', 'customerServiceForm')">Submit and Create Invoice</el-button>
                                </el-form-item>
                            </td>
                        </tr>
                    </table>
                </el-form>
            </el-form>
        </div>
        <create-invoice-form ref="createInvoiceForm" v-bind:table-data="this.tableData" v-bind:form="this.formCopy"
                             v-bind:customerServiceForm="this.customerServiceFormCopy"></create-invoice-form>
        <product-detail-form ref="productDetailForm"></product-detail-form>
        <accessory-detail-form ref="accessoryDetailForm" @accessoryAdded="getAccessoryInfo"></accessory-detail-form>
        <product-detail-form ref="productDetailForm" @productAdded="getProductInfo" @prodAndAccAdded="getProdAndAccInfo"
        @prodAndPlanAdded="getProdAndPlanInfo" @allAdded="getAllInfo"></product-detail-form>
        <service-plan-form ref="servicePlanForm" @planAdded="getServicePlanFee"></service-plan-form>
    </el-dialog>
</template>

<script>
import { addUser, editUser } from '@/api/getData';
import SelectOrgTree from '@/components/common/SelectOrgTree.vue';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { mapActions, mapState } from 'vuex';
import ProductDetailForm from './ProductDetailForm.vue';
import CreateInvoiceForm from './CreateInvoiceForm.vue';
import AccessoryDetailForm from './AccessoryDetailForm.vue';
import ServicePlanForm from './ServicePlanForm.vue';
import { addOrder, addOrderItem } from '@/api/getData';

export default {
  name: 'AddOrderForm',
  components: {
    ServicePlanForm,
    ProductDetailForm,
    CreateInvoiceForm,
    AccessoryDetailForm
  },
  data: function() {
    return {
      loading: false,
      isOpen: false,
      sameInfo: false,
      sameAsBilling: false,
      sameAsBillingBool: 0,
      tableData: [],
      formCopy: {},
      customerServiceFormCopy: {},
      currentOrderId: '',
      form: {
        billing: '',
        billingContact: '',
        billingPhone: '',
        billingEmail: '',
        billingAddress: '',
        companyName: '',
        contact: '',
        email: '',
        phone: '',
        shippingAddress: '',
        orderType: '',
        paymentTerm: '',
        note: '',
        accName: '',
        accPrice: '',
        accQty: '',
        prodName: '',
        prodPrice: '',
        prodQty: '',
        planQty: '',
        planAmt: '',
        planName: '',
      },
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
      customerServiceForm: {
        status: '',
        invoiceNumber: '',
        invoiceDate: '',
        dueDate: '',
        shippingVia: '',
        trackingNumber: '',
        shippingFee: '',
      },
      formRules: {
        orderType: [
                { required: true, message: 'Order type is required', trigger: 'change' },
        ],
        billing: [
                { required: true, message: 'Company name is required' },
                { min: 1, message: 'Company name is required'},
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: 'Invalid characters'
          }
        ],
        companyName: [
                { required: true, message: 'Company name is required' },
                { min: 1, message: 'Company name is required'},
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: 'Invalid characters'
          }
        ],
        billingContact: [
                { required: true, message: 'Contact is required' },
                { min: 1, message: 'Contact is required'},
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: 'Invalid characters'
          }
        ],
        contact: [
                { required: true, message: 'Contact is required' },
                { min: 1, message: 'Contact is required'},
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: 'Invalid characters'
          }
        ],
        billingPhone: [
                {required: true, message: 'Phone number is required' },
          {
            pattern: /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/,
            message: 'Invalid phone number'
          }
        ],
        phone: [
                {required: true, message: 'Phone number is required' },
          {
            pattern: /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/,
            message: 'Invalid phone number'
          }
        ],
        billingEmail: [
                { required: true, message: 'Email is required' },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: 'Invalid email'
          }
        ],
        email: [
                { required: true, message: 'Email is required' },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: 'Invalid email'
          }
        ],
        billingAddress: [
                { required: true, message: 'Billing address is required' },
        ],
        shippingAddress: [
                { required: true, message: 'Shipping address is required' },
        ],
        paymentTerm: [
                { required: true, message: 'Payment term is required', trigger: 'change' },
        ],
            // note: [
            //     { max: 200, message: 'Maximum character limit: 200' }
            // ],
        status: [
                { required: true, message: 'Status is required', trigger: 'change' },
        ],
        invoiceNumber: [
            { required: true, message: 'Invoice number is required' },
        ],
        invoiceDate: [
            { required: true, message: 'Invoice date is required' },
        ],
        shippingVia: [
            { required: true, message: 'Shipping type is required' },
        ],
        trackingNumber: [
            { required: true, message: 'Tracking number is required' },
        ],
        shippingFee: [
            { required: true, message: 'Shipping fee is required' },
          {
            pattern: /^\d+(,\d{3})*(\.\d{1,2})?$/,
            message: 'Invalid price'
          },
        ],
      },
    };
  },
  methods: {
    showDialog() {
      this.isOpen = true;
    },
    resetFields() {
      this.tableData = [];
      this.form = {};
      this.form.prodPicked = false;
      this.form.accPicked = false;
      this.form.planPicked = false;
      this.customerServiceForm = {};
      this.sameAsBilling = false;
      this.sameInfo = false;
      this.formCopy = {};
      this.customerServiceForm = {};
      this.$refs.form.resetFields();
    },
    handleCommand(command) {
      alert('clicked');
    },
    handleAddDevice() {
      this.$refs.productDetailForm.showDialog();
    },
    handleDeleteOrderItem(row, index) {
      this.tableData.splice(index, 1);
    },
    async handleCreateInvoice(form1, form2) {
      // this.sendTableData();
      this.getDates();
      this.handleAddOrder();
      this.formCopy = JSON.parse(JSON.stringify(this.form));
      this.customerServiceFormCopy = JSON.parse((JSON.stringify(this.customerServiceForm)));
        // fix this shit dumbass
      // this.handleAddOrderItems();
      this.$refs.createInvoiceForm.showDialog();
      // this.$refs[form1].validate((valid1) => {
      //   if (valid1) {
      //     this.$refs[form2].validate((valid2) => {
      //       if (valid2) {
      //         this.$refs.createInvoiceForm.showDialog();
      //       }
      //     });
      //   }
      // });
    },
    // sendTableData(event) {
    //   this.$emit('goToInvoice', this.tableData);
    // },
    handleSameInfo() {
      if (this.sameAsBilling) {
        this.sameAsBillingBool = 1;
        this.form.companyName = this.form.billing;
        this.form.contact = this.form.billingContact;
        this.form.phone = this.form.billingPhone;
        this.form.email = this.form.billingEmail;
        this.form.shippingAddress = this.form.billingAddress;
      } else {
        this.form.companyName = '';
        this.form.contact = '';
        this.form.phone = '';
        this.form.email = '';
        this.form.shippingAddress = '';
      }
    },
    handleAddAccessories() {
      this.$refs.accessoryDetailForm.showDialog();
    },
    handleCancel() {
      this.resetFields();
      this.isOpen = false;
    },
    handleAddService() {
      this.$refs.servicePlanForm.showDialog();
    },
    handleAddOrder() {
      addOrder({},{
        type: this.form.orderType,
        customer: this.form.billing,
        status: this.customerServiceForm.status,
        invoiceNo: this.customerServiceForm.invoiceNumber,
        invoiceDate: this.customerServiceForm.invoiceDate,
        dueDate: this.customerServiceForm.dueDate,
        trackingNo: this.customerServiceForm.trackingNumber,
        sales: 'NULL',
        createTime: 'NULL',
        modifyTime: 'NULL',
        orderItems: this.tableData,
        billingCompany: this.form.billing,
        billingContact: this.form.billingContact,
        billingNumber: this.form.billingPhone,
        billingEmail: this.form.billingEmail,
        billingAddress: this.form.billingAddress,
        shippingCompany: this.form.companyName,
        shippingContact: this.form.contact,
        shippingNumber: this.form.phone,
        shippingEmail: this.form.email,
        shippingAddress: this.form.shippingAddress,
        note: this.form.note,
        shippingVia: this.customerServiceForm.shippingVia,
        shippingFee: this.customerServiceForm.shippingFee,
        sameAsBilling: this.sameAsBillingBool,
        paymentTerm: this.form.paymentTerm,
      });
    },
    getDates() {
      let invoice = new Date(this.customerServiceForm.invoiceDate);
      let due = new Date(this.customerServiceForm.invoiceDate);

      if (this.form.paymentTerm === 'Net15') {
        due.setDate(this.customerServiceForm.invoiceDate.getDate()+15);
      } else {
        due.setDate(this.customerServiceForm.invoiceDate.getDate()+30);
      }

      // this.customerServiceForm.dueDate = due;
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
    getAccessoryInfo(n, p, q) {
      this.form.accName = n;
      this.form.accPrice = p;
      this.form.accQty = q;
      const data = {orderId: '',
        product: this.form.accName,
        quantity: this.form.accQty,
        rate: this.form.accPrice,
        amount: Number(this.form.accPrice) * Number(this.form.accQty),
        tax: 'Y',
        description: this.form.accQty + ' * ' + this.form.accName,
        invoiceNo: this.customerServiceForm.invoiceNumber
      };
      this.tableData.push(data);
    },
    getProductInfo(n, p, q) {
      this.form.prodName = n;
      this.form.prodPrice = p;
      this.form.prodQty = q;
      const data = {orderId: '',
        product: this.form.prodName,
        quantity: this.form.prodQty,
        rate: this.form.prodPrice,
        amount: Number(this.form.prodPrice) * Number(this.form.prodQty),
        tax: 'Y',
        description: this.form.prodQty + ' * ' + this.form.prodName,
        invoiceNo: this.customerServiceForm.invoiceNumber

      };
      this.tableData.push(data);
    },
    getServicePlanFee(q, a, n) {
      this.form.planQty = q;
      this.form.planAmt = a;
      this.form.planName = n;
      const data = {orderId: '',
        product: this.form.planName,
        quantity: this.form.planQty,
        rate: this.form.planAmt,
        amount: Number(this.form.planAmt) * Number(this.form.planQty),
        tax: 'N',
        description: this.form.planQty + ' * ' + this.form.planName,
        invoiceNo: this.customerServiceForm.invoiceNumber

      };
      this.tableData.push(data);
    },
    getProdAndAccInfo(pn, pp, pq, an, ap, aq) {
      this.form.prodName = pn;
      this.form.prodPrice = pp;
      this.form.prodQty = pq;
      this.form.accName = an;
      this.form.accPrice = ap;
      this.form.accQty = aq;
      const data = {orderId: '',
        product: this.form.prodName,
        quantity: this.form.prodQty,
        rate: this.form.prodPrice,
        amount: Number(this.form.prodPrice) * Number(this.form.prodQty),
        tax: 'Y',
        description: this.form.prodQty + ' * ' + this.form.prodName,
        invoiceNo: this.customerServiceForm.invoiceNumber

      };
      this.tableData.push(data);
      const data2 = {orderId: '',
        product: this.form.accName,
        quantity: this.form.accQty,
        rate: this.form.accPrice,
        amount: Number(this.form.accPrice) * Number(this.form.accQty),
        tax: 'Y',
        description: this.form.accQty + ' * ' + this.form.accName,
        invoiceNo: this.customerServiceForm.invoiceNumber

      };
      this.tableData.push(data2);
    },
    getProdAndPlanInfo(pn, pp, pq, sq, sa, sn) {
      this.form.prodName = pn;
      this.form.prodPrice = pp;
      this.form.prodQty = pq;
      this.form.planQty = sq;
      this.form.planAmt = sa;
      this.form.planName = sn;
      const data = {orderId: '',
        product: this.form.prodName,
        quantity: this.form.prodQty,
        rate: this.form.prodPrice,
        amount: Number(this.form.prodPrice) * Number(this.form.prodQty),
        tax: 'Y',
        description: this.form.prodQty + ' * ' + this.form.prodName,
        invoiceNo: this.customerServiceForm.invoiceNumber

      };
      this.tableData.push(data);
      const data2 = {orderId: '',
        product: this.form.planName,
        quantity: this.form.planQty,
        rate: this.form.planAmt,
        amount: Number(this.form.planAmt) * Number(this.form.planQty),
        tax: 'N',
        description: this.form.planQty + ' * ' + this.form.planName,
        invoiceNo: this.customerServiceForm.invoiceNumber

      };
      this.tableData.push(data2);
    },
    getAllInfo(pn, pp, pq, an, ap, aq, sq, sa, sn) {
      this.form.prodName = pn;
      this.form.prodPrice = pp;
      this.form.prodQty = pq;
      this.form.accName = an;
      this.form.accPrice = ap;
      this.form.accQty = aq;
      this.form.planQty = sq;
      this.form.planAmt = sa;
      this.form.planName = sn;
      const data = {orderId: '',
        product: this.form.prodName,
        quantity: this.form.prodQty,
        rate: this.form.prodPrice,
        amount: Number(this.form.prodPrice) * Number(this.form.prodQty),
        tax: 'Y',
        description: this.form.prodQty + ' * ' + this.form.prodName,
        invoiceNo: this.customerServiceForm.invoiceNumber

      };
      this.tableData.push(data);
      const data2 = {orderId: '',
        product: this.form.accName,
        quantity: this.form.accQty,
        rate: this.form.accPrice,
        amount: Number(this.form.accPrice) * Number(this.form.accQty),
        tax: 'Y',
        description: this.form.accQty + ' * ' + this.form.accName,
        invoiceNo: this.customerServiceForm.invoiceNumber

      };
      this.tableData.push(data2);
      const data3 = {orderId: '',
        product: this.form.planName,
        quantity: this.form.planQty,
        rate: this.form.planAmt,
        amount: Number(this.form.planAmt) * Number(this.form.planQty),
        tax: 'N',
        description: this.form.planQty + ' * ' + this.form.planName,
        invoiceNo: this.customerServiceForm.invoiceNumber

      };
      this.tableData.push(data3);
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
    }
  },

};
</script>

<style scoped>
    .bill {
        text-align: left;
    }

    table.secondaryForm {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        padding-right: 50px;
        background: gainsboro;
    }

    table.test{
        line-height: 40px;
    }

</style>
