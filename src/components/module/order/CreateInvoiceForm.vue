<template>
    <el-dialog
            :title="'Invoice'"
            :center="true"
            top="15vh"
            :visible.sync="isOpen"
            :append-to-body="append"
            @closed="resetFields"
            width="55%">
        <el-form ref="form" :model="invoiceForm" size="mini" label-width="150px" style="margin: 0;">
            <div class="invoiceSpacing">
                <el-form-item label="Invoice Type">
                    <el-select v-model="invoiceForm.invoiceType" placeholder="select">
                        <el-option
                                v-for="type in invoiceOptions"
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
                            <el-form-item label="Company Name: ">
                                <el-input v-model="form.billing"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="Company Name: ">
                                <el-input v-model="form.companyName"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="Contact: ">
                                <el-input v-model="form.billingContact"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="Contact: ">
                                <el-input v-model="form.contact"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="Phone Number: ">
                                <el-input v-model="form.billingPhone"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="Phone Number: ">
                                <el-input v-model="form.phone"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="Email: ">
                                <el-input v-model="form.billingEmail"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="Email: ">
                                <el-input v-model="form.email"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="Billing Address: ">
                                <el-input v-model="form.billingAddress"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="Shipping Address: ">
                                <el-input v-model="form.shippingAddress"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <el-form-item label="Payment Term" style="padding-top: 10px">
                    <el-select v-model="form.paymentTerm" placeholder="Select">
                        <el-option
                                v-for="option in paymentOptions"
                                :key="option.value"
                                :label="option.value"
                                :value="option.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-row style="border-spacing: 0px">
                    <el-col :span="12">
                        <el-form-item label="Invoice #" style="border-spacing: 0px">
                            <el-input v-model="customerServiceForm.invoiceNumber" style="width: 150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Invoice Status">
                            <el-select v-model="invoiceForm.status" placeholder="Select" clearable style="width: 150px">
                                <el-option
                                        v-for="item in statusOptions"
                                        :key="item.status"
                                        :value="item.status"
                                        :label="item.label"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="border-spacing: 0px">
                    <el-col :span="12">
                        <el-form-item label="Invoice Date">
                            <el-date-picker
                                    v-model="customerServiceForm.invoiceDate"
                                    type="datetime"
                                    placeholder="Select date and time"
                                    style="width: 150px">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Due Date">
                            <el-date-picker
                                    v-model="invoiceForm.dueDate"
                                    type="datetime"
                                    placeholder="Select date and time"
                                    style="width: 150px">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="border-spacing: 0px">
                    <el-col :span="12">
                        <el-form-item label="Shipping via">
                            <el-input v-model="customerServiceForm.shippingVia" style="width: 150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Tracking Number">
                            <el-input v-model="customerServiceForm.trackingNumber" style="width: 150px"></el-input>
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
                    <el-table-column label="Product" prop="product" width="150"></el-table-column>
                    <el-table-column label="QTY" prop="quantity" width="120"></el-table-column>
                    <el-table-column label="Rate" prop="rate" width="120"></el-table-column>
                    <el-table-column label="Amount" prop="amount" width="120"></el-table-column>
                    <el-table-column label="Tax" prop="tax" width="80"></el-table-column>
                </el-table>
                <el-row style="border-spacing: 0px">
                    <el-col :span="12" :offset="15">
                        <el-form-item label="Tax: ">
                            <p v-model="tax">${{ tax }}</p>
                        </el-form-item>
                        <el-form-item label="Shipping fee: ">
                            <el-input v-model="customerServiceForm.shippingFee" style="width: 100px"></el-input>
                        </el-form-item>
                        <el-form-item label="Total: ">
                            <p v-model="total">${{ total }}</p>
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

export default {
  name: 'CreateInvoiceForm',

  data: function() {
    return {
      isOpen: false,
      loading: false,
      append: true,
      labelPosition: 'right',

    /* RESET THESE */
      invoiceForm: {
        dueDate: '',
        invoiceType: '',
        note: '',
        status: '',
      },

    /* DROPDOWN OPTIONS */
      invoiceOptions: [{
        value: 'RMA',
        label: 'RMA'
      }, {
        value: 'Purchase',
        label: 'Purchase'
      }, {
        value: 'Evaluation',
        label: 'Evaluation'
      }, {
        value: 'Service Plan',
        label: 'Service Plan'
      }],
      statusOptions: [{
        status: 'refund',
        label: 'refund'
      }, {
        status: 'void',
        label: 'void'
      }, {
        status: 'paid',
        label: 'paid'
      }, {
        status: 'pending',
        label: 'pending'
      }, {
        status: 'overdue',
        label: 'overdue'
      }],
      paymentOptions: [{
        value: 'Net15',
        label: 'Net15',
      }, {
        value: 'Net30',
        label: 'Net30',
      }],

    /* FORM RULES */
      // formRules: {
      //   invoiceType: [
      //           { required: true, message: 'Invoice type is required', trigger: 'change' },
      //   ],
      //   billing: [
      //             { required: true, message: 'Company name is required' },
      //             { min: 1, message: 'Company name is required'},
      //     {
      //       pattern: /^[A-Za-z0-9]+$/,
      //       message: 'Invalid characters'
      //     }
      //   ],
      //   companyName: [
      //             { required: true, message: 'Company name is required' },
      //             { min: 1, message: 'Company name is required'},
      //     {
      //       pattern: /^[A-Za-z0-9]+$/,
      //       message: 'Invalid characters'
      //     }
      //   ],
      //   billingContact: [
      //             { required: true, message: 'Contact is required' },
      //             { min: 1, message: 'Contact is required'},
      //     {
      //       pattern: /^[A-Za-z0-9]+$/,
      //       message: 'Invalid characters'
      //     }
      //   ],
      //   contact: [
      //             { required: true, message: 'Contact is required' },
      //             { min: 1, message: 'Contact is required'},
      //     {
      //       pattern: /^[A-Za-z0-9]+$/,
      //       message: 'Invalid characters'
      //     }
      //   ],
      //   billingPhone: [
      //             {required: true, message: 'Phone number is required' },
      //     {
      //       pattern: /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/,
      //       message: 'Phone number is required'
      //     }
      //   ],
      //   phone: [
      //             {required: true, message: 'Phone number is required' },
      //     {
      //       pattern: /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/,
      //       message: 'Phone number is required'
      //     }
      //   ],
      //   billingEmail: [
      //             { required: true, message: 'Email is required' },
      //     {
      //       pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      //       message: 'Invalid email'
      //     }
      //   ],
      //   email: [
      //             { required: true, message: 'Email is required' },
      //     {
      //       pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      //       message: 'Invalid email'
      //     }
      //   ],
      //   billingAddress: [
      //             { required: true, message: 'Billing address is required' },
      //   ],
      //   shippingAddress: [
      //             { required: true, message: 'Shipping address is required' },
      //   ],
      //   paymentTerm: [
      //             { required: true, message: 'Payment term is required', trigger: 'change' },
      //   ],
      //   invoiceNumber: [
      //             { required: true, message: 'Invoice number is required' },
      //   ],
      //   invoiceStatus: [
      //           { required: true, message: 'Invoice status is required', trigger: 'change' },
      //   ],
      //   invoiceDate: [
      //             { required: true, message: 'Invoice date is required' },
      //   ],
      //   dueDate: [
      //             { required: true, message: 'Due date is required' }
      //   ],
      //   shippingVia: [
      //             { required: true, message: 'Shipping type is required' },
      //   ],
      //   trackingNumber: [
      //             { required: true, message: 'Tracking number is required' },
      //   ],
      //   shippingFee: [
      //             { required: true, message: 'Shipping fee is required' },
      //     {
      //       pattern: /^\d+(,\d{3})*(\.\d{1,2})?$/,
      //       message: 'Invalid price'
      //     },
      //   ],
      // },
    };
  },

  props: {
    form: {
      type: Object,
      default: () => ({
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
        paymentTerm: '',
      })
    },
    customerServiceForm: {
      type: Object,
      default: () => ({
        status: '',
        invoiceNumber: '',
        invoiceDate: '',
        shippingVia: '',
        trackingNumber: '',
        shippingFee: '',
      })
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    reloadTable: Function,
  },

  methods: {
    /* AUXILIARY FUNCTIONS */
    showDialog() {
      this.isOpen = true;
    },
    resetFields() {
      this.invoiceForm = {};
      this.form = {};
      this.customerServiceForm = {};
      this.$refs.form.resetFields();
    },

    /* HANDLER FUNCTIONS */
    addPaymentHandle() {
      this.getDates();
      addPayment({},{amount: this.total,
        invoiceNo: this.customerServiceForm.invoiceNumber,
        customer: this.form.billing,
        invoiceDate: this.customerServiceForm.invoiceDate,
        dueDate: this.invoiceForm.dueDate,
        status: this.invoiceForm.status,
        sales: 'NULL',
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
        note: this.invoiceForm.note,
        shippingVia: this.customerServiceForm.shippingVia,
        paymentTerm: this.form.paymentTerm,
        invoiceType: this.invoiceForm.invoiceType,
        shippingFee: this.customerServiceForm.shippingFee,
        trackingNo: this.customerServiceForm.trackingNumber
      }).then(result => {
        if (result) {
          this.$message.success('Save successful!');
          this.reloadTable();
          this.isOpen = false;
        }
      });
    },

    /* FORMAT INVOICE AND DUE DATES */
    getDates() {
      let invoice = new Date(this.customerServiceForm.invoiceDate);
      let due = new Date(this.invoiceForm.dueDate);

      this.customerServiceForm.invoiceDate = invoice.getFullYear()
          + '-' + (invoice.getMonth()+1)
          + '-' + invoice.getDate()
          + ' ' + invoice.getHours()
          + ':' + invoice.getMinutes();
      this.invoiceForm.dueDate = due.getFullYear()
          + '-' + (due.getMonth()+1)
          + '-' + due.getDate()
          + ' ' + due.getHours()
          + ':' + due.getMinutes();
    },
  },

  computed: {
    tax: function() {
      let t = 0;
      let et;
      const copy = this.tableData.slice();
      if(copy.length !== 0) {
        copy.forEach(function(item, index) {
          if ((item.tax === 'Y')) {
            et = Number(item.amount) * .0775;
          } else {
            et = 0;
          }
          t += et;
        });
      }
      return (Math.floor(t * 100) / 100);
    },
    total: function() {
      let tot = 0;
      const copy = this.tableData.slice();
      if(copy.length !== 0) {
        copy.forEach(function(item, index) {
          tot += item.amount;
        });
        tot += this.tax;
      }
      if (!isNaN(this.customerServiceForm.shippingFee)) {
        tot += Number(this.customerServiceForm.shippingFee);
      }
      return (Math.floor(tot * 100) / 100);
    }
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
