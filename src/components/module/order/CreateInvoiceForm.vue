<template>
    <el-dialog
            :title="'Invoice'"
            :center="true"
            top="15vh"
            :visible.sync="isOpen"
            append-to-body="append"
            @closed="resetFields"
            width="55%">
        <el-form ref="form" :model="invoiceForm" :rules="formRules" size="mini" label-width="150px" style="margin: 0;">
            <div class="invoiceSpacing">
                <el-form-item label="Invoice Type" prop="invoiceType">
                    <el-select v-model="invoiceForm.invoiceType" placeholder="select">
                        <el-option
                                v-for="type in invoiceTypes"
                                :key="type.value"
                                :value="type.value"
                                :label="type.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <table class="no-padding" style="width: 100%; border-spacing: 0px">
                    <tr>
                        <td class="bill"><el-form-item label="BILLING INFO"style="font-weight: bold"></el-form-item></td>
                        <td>
                            <el-form-item label="SHIPPING INFO" style="font-weight: bold">
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
                            <el-form-item label="Phone Number: " style="" prop="billingPhone">
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
                <el-form-item label="Payment Term" style="padding-top: 10px" prop="paymentTerm">
                    <el-select v-model="invoiceForm.paymentTerm" placeholder="Select">
                        <el-option
                                v-for="option in paymentOptions"
                                :key="option.value"
                                :label="option.value"
                                :value="option.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Invoice #" style="border-spacing: 0px" prop="invoiceNumber">
                    <el-input v-model="invoiceForm.invoiceNumber" style="width: 150px"></el-input>
                </el-form-item>
                <el-row style="border-spacing: 0px">
                    <el-col :span="12">
                        <el-form-item label="Invoice Date" prop="invoiceDate">
                            <el-input v-model="invoiceForm.invoiceDate" style="width: 150px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Due Date" prop="dueDate">
                            <el-input v-model="invoiceForm.dueDate" style="width: 150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="border-spacing: 0px">
                    <el-col :span="12">
                        <el-form-item label="Shipping via" prop="shippingVia">
                            <el-input v-model="invoiceForm.shippingVia" style="width: 150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Tracking Number" prop="trackingNumber">
                            <el-input v-model="invoiceForm.trackingNumber" style="width: 150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-table
                        ref="orderDetailTable"
                        :data="tableData"
                        v-loading="loading"
                        border
                        stripe
                        highlight-current-row
                        max-height="200px"
                        :row-key="row => row.index"
                        style="width: 100%"
                >
                    <el-table-column label="Product" prop="product" width="120"></el-table-column>
                    <el-table-column label="QTY" prop="quantity" width="120"></el-table-column>
                    <el-table-column label="Rate" prop="rate" width="120"></el-table-column>
                    <el-table-column label="Amount" prop="amount" width="120"></el-table-column>
                    <el-table-column label="Tax" prop="tax" width="80"></el-table-column>
                    <el-table-column label="Action">
                        <template slot-scope="scope">
                            <el-dropdown size="mini" type="text" @command="handleCommand">
                  <span class="el-dropdown-link">
                  View<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="a">Edit</el-dropdown-item>
                                    <el-dropdown-item command="b">Delete</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row style="border-spacing: 0px">
                    <el-col :span="12" :offset="15">
                        <el-form-item label="Tax: ">
                            <p v-model="invoiceForm.taxRate">${{ invoiceForm.taxRate }}</p>
                        </el-form-item>
                        <el-form-item label="Shipping fee: " prop="shippingFee">
                            <el-input v-model="invoiceForm.shippingFee" style="width: 100px"></el-input>
                        </el-form-item>
                        <el-form-item label="Total: ">
                            <p v-model="invoiceForm.total">${{ invoiceForm.total }}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="Note:" style="display: block; margin-left: 30px; margin-right: 30px">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="notes"
                            v-model="invoiceForm.note"
                    >
                    </el-input>
                </el-form-item>
                <el-button type="primary" style="display: inline; margin-left: 350px;">Pay</el-button>
                <el-button type="primary" style="display: inline; margin-left: 30px;" @click="addPaymentHandle">Save</el-button>
                <el-button type="primary" style="display: inline; margin-left: 30px;">Save and Send</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script>
    import { addPayment } from '@/api/getData';
import AddOrderForm from './AddOrderForm.vue';
export default {
      name: 'CreateInvoiceForm',
      components: {
        AddOrderForm
      },
      data: function() {
        return {
          labelPosition: 'right',
          isOpen: false,
          loading: false,
          append: true,
          invoiceForm: {
            invoiceType: '',
            paymentTerm: '',
            invoiceNumber: '',
            invoiceDate: '',
            dueDate: '',
            shippingVia: '',
            trackingNumber: '',
            taxRate: '',
            total: '',
            shippingFee: '',
            note: '',
          },
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
          },
          tableData: [{
            product: 'VT1611R30',
            quantity: 10,
            rate: 250,
            amount: 2500,
            tax: 'Y',
          }],
          invoiceTypes: [],
          paymentOptions: [{
            value: 'Net15',
            label: 'Net15',
          }, {
            value: 'Net30',
            label: 'Net30',
          }],
          formRules: {
            invoiceType: [
                { required: true, message: 'Invoice type is required', trigger: 'change' },
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
                message: 'Phone number is required'
              }
            ],
            phone: [
                  {required: true, message: 'Phone number is required' },
              {
                pattern: /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/,
                message: 'Phone number is required'
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
            invoiceNumber: [
                  { required: true, message: 'Invoice number is required' },
            ],
            invoiceDate: [
                  { required: true, message: 'Invoice date is required' },
            ],
            dueDate: [
                  { required: true, message: 'Due date is required' }
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
          this.$refs.form.resetFields();
        },
        handleCommand() {
          alert('clicked');
        },
        addPaymentHandle() {
          addPayment({},{amount: this.invoiceForm.shippingFee}).then(result => {
            alert('ok');
          });
        },
      }
};
</script>

<style>
    .invoiceSpacing > .el-form-item {
        border-spacing: 0px;
    }
    table.no-padding {
        padding: 0;
        text-align: right;
        vertical-align: top;
    }
</style>

<style scoped>


</style>
