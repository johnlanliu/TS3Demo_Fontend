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
                <table style="width: 100%; text-align: right">
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
                                <el-input v-model="form.companyName"></el-input>
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
                                <el-input v-model="form.contact"></el-input>
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
                                <el-input v-model="form.phone"></el-input>
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
                                <el-input v-model="form.email"></el-input>
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
                                <el-input v-model="form.shippingAddress"></el-input>
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
                    max-height="200px"
                    :row-key="row => row.index"
                    style="width: 100%; margin-left: 50px"
                >
                    <el-table-column label="Product" prop="product" width="120"></el-table-column>
                    <el-table-column label="QTY" prop="quantity" width="150">
                        <template slot-scope="scope">
                            <el-input-number v-model="tableData.quantity" controls-position="right" size="mini"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="Rate" prop="rate" width="100"></el-table-column>
                    <el-table-column label="Amount" prop="amount" width="100"></el-table-column>
                    <el-table-column label="Tax" prop="tax" width="50"></el-table-column>
                    <el-table-column label="Action" width="130">
                        <template slot-scope="scope">
                            <el-button type="text">Delete</el-button>
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
                                        <el-form-item label="Tax: " style="padding-left: 160px">
                                            <p v-model="taxRate">${{ taxRate }}</p>
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <el-form-item label="Total: " style="padding-left: 160px">
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
                                    <el-input v-model="customerServiceForm.shippingFee"></el-input>
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
                                    <el-input v-model="customerServiceForm.invoiceDate"></el-input>
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
                                    <el-button type="primary" @click="handleCancel()">Cancel Order</el-button>
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
        <create-invoice-form ref="createInvoiceForm"></create-invoice-form>
        <product-detail-form ref="productDetailForm"></product-detail-form>
        <accessory-detail-form ref="accessoryDetailForm"></accessory-detail-form>
        <service-plan-form ref="servicePlanForm"></service-plan-form>
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
      taxRate: '',
      total: '',
      sameInfo: false,
      sameAsBilling: false,
      tableData: [{
        product: 'VT1611R30',
        quantity: 10,
        rate: 250,
        amount: 2500,
        tax: 'Y',
      }],
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
      }],
      customerServiceForm: {
        status: '',
        invoiceNumber: '',
        invoiceDate: '',
        shippingVia: '',
        trackingNumber: '',
        shippingFee: '',
      },
      formRules: {
        orderType: [
                { required: true, message: 'Please select an order type', trigger: 'change' },
        ],
        billing: [
                { required: true, message: 'Please fill in the company name' },
                { min: 1, message: 'Please fill in the company name'},
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: 'Special characters are not allowed'
          }
        ],
        companyName: [
                { required: true, message: 'Please fill in the company name' },
                { min: 1, message: 'Please fill in your company name'},
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: 'Special characters are not allowed'
          }
        ],
        billingContact: [
                { required: true, message: 'Please fill in the contact name' },
                { min: 1, message: 'Please fill in your contact name'},
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: 'Special characters are not allowed'
          }
        ],
        contact: [
                { required: true, message: 'Please fill in the contact name' },
                { min: 1, message: 'Please fill in your contact name'},
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: 'Special characters are not allowed'
          }
        ],
        billingPhone: [
                {required: true, message: 'Please fill in the phone number' },
          {
            pattern: /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/,
            message: 'Must be a valid phone number'
          }
        ],
        phone: [
                {required: true, message: 'Please fill in the phone number' },
          {
            pattern: /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/,
            message: 'Must be a valid phone number'
          }
        ],
        billingEmail: [
                { required: true, message: 'Please fill in the email address' },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: 'Must be a valid email address'
          }
        ],
        email: [
                { required: true, message: 'Please fill in the email address' },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: 'Must be a valid email address'
          }
        ],
        billingAddress: [
                { required: true, message: 'Please fill in the billing address' },
        ],
        shippingAddress: [
                { required: true, message: 'Please fill in the shipping address' },
        ],
        paymentTerm: [
                { required: true, message: 'Please select a payment term', trigger: 'change' },
        ],
            // note: [
            //     { max: 200, message: 'Maximum character limit: 200' }
            // ],
        status: [
                { required: true, message: 'Please select a status', trigger: 'change' },
        ],
        invoiceNumber: [
            { required: true, message: 'Please fill in the invoice number' },
        ],
        invoiceDate: [
            { required: true, message: 'Please fill in the invoice date' },
        ],
        shippingVia: [
            { required: true, message: 'Please fill in the shipping type' },
        ],
        trackingNumber: [
            { required: true, message: 'Please fill in the tracking number' },
        ],
        shippingFee: [
            { required: true, message: 'Please fill in the shipping fee' },
          {
            pattern: /^\d+(,\d{3})*(\.\d{1,2})?$/,
            message: 'Must be a valid price'
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
      // this.form.billing = '';
      // this.form.billingContact = '';
      // this.form.billingPhone = '';
      // this.form.billingEmail = '';
      // this.form.billingAddress = '';
      // this.form.companyName = '';
      // this.form.contact = '';
      // this.form.email = '';
      // this.form.phone = '';
      // this.form.shippingAddress = '';
      // this.form.orderType = '';
      // this.form.paymentTerm = '';
      // this.form.note = '';
      // this.customerServiceForm.invoiceDate = '';
      // this.customerServiceForm.invoiceNumber = '';
      // this.customerServiceForm.shippingFee = '';
      // this.customerServiceForm.shippingVia = '';
      // this.customerServiceForm.status = '';
      // this.customerServiceForm.trackingNumber = '';
      this.form = {};
      this.customerServiceForm = {};
      this.sameAsBilling = false;
      this.sameInfo = false;
      this.$refs.form.resetFields();
    },
    handleCommand(command) {
      alert('clicked');
    },
    handleAddDevice() {
      this.$refs.productDetailForm.showDialog();
    },
    handleCreateInvoice(form1, form2) {
      this.$refs[form1].validate((valid1) => {
        if (valid1) {
          this.$refs[form2].validate((valid2) => {
            if (valid2) {
              this.$refs.createInvoiceForm.showDialog();
            }
          });
        }
      });
    },
    handleSave() {
      alert('save');
    },
    handleSameInfo() {
      if (this.sameAsBilling) {
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
      this.isOpen = false;
    },
    handleAddService() {
      this.$refs.servicePlanForm.showDialog();
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

</style>
