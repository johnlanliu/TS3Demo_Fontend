<template>
    <el-dialog
            :title="'Edit Invoice'"
            :center="true"
            top="15vh"
            :visible.sync="isOpen"
            :append-to-body="append"
            @closed="resetFields"
            width="50%">
        <el-form ref="form" :model="form" size="mini" style="margin: 0; padding-left: 10px">
            <el-form-item label="Invoice Type">
                <el-select v-model="form.invoiceType" placeholder="select">
                    <el-option
                        v-for="type in invoiceOptions"
                        :key="type.value"
                        :value="type.value"
                        :label="type.label">
                    </el-option>
                </el-select>
            </el-form-item>

            <table class="format">
                <tr>
                    <td class="alignTop">
                        <el-form-item label="BILLING INFO" style="font-weight: bold"></el-form-item>
                    </td>
                    <td class="alignTop" style="padding-left: 196px">
                        <el-form-item label="SHIPPING INFO" style="font-weight: bold"></el-form-item>
                    </td>
                </tr>
            </table>

            <table class="format">
                <tr>
                    <td class="alignTop">
                        <el-form-item label="Company Name: ">
                            <el-input v-model="form.billingCompany" style="width: 275px"></el-input>
                        </el-form-item>
                    </td>
                    <td class="alignTop" style="padding-left: 25px">
                        <el-form-item label="Company Name: ">
                            <el-input v-model="form.shippingCompany" style="width: 275px"></el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td class="alignTop">
                        <el-form-item label="Contact: ">
                            <el-input v-model="form.billingContact" style="width: 275px"></el-input>
                        </el-form-item>
                    </td>
                    <td class="alignTop" style="padding-left: 25px">
                        <el-form-item label="Contact: ">
                            <el-input v-model="form.shippingContact" style="width: 275px"></el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td class="alignTop">
                        <el-form-item label="Phone Number: ">
                            <el-input v-model="form.billingNumber" style="width: 275px"></el-input>
                        </el-form-item>
                    </td>
                    <td class="alignTop" style="padding-left: 25px">
                        <el-form-item label="Phone Number: ">
                            <el-input v-model="form.shippingNumber" style="width: 275px"></el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td class="alignTop">
                        <el-form-item label="Email: ">
                            <el-input v-model="form.billingEmail" style="width: 275px"></el-input>
                        </el-form-item>
                    </td>
                    <td class="alignTop" style="padding-left: 25px">
                        <el-form-item label="Email: ">
                            <el-input v-model="form.shippingEmail" style="width: 275px"></el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td class="alignTop">
                        <el-form-item label="Address: ">
                            <el-input v-model="form.billingAddress" style="width: 275px"></el-input>
                        </el-form-item>
                    </td>
                    <td class="alignTop" style="padding-left: 25px">
                        <el-form-item label="Address: ">
                            <el-input v-model="form.shippingAddress" style="width: 275px"></el-input>
                        </el-form-item>
                    </td>
                </tr>
            </table>

            <table class="format">
                <tr>
                    <td class="alignTop">
                        <el-form-item label="City: ">
                            <el-input v-model="form.billingCity" style="width: 145px"></el-input>
                        </el-form-item>
                    </td>
                    <td class="alignTop" style="padding-left: 10px">
                        <el-form-item label="Zip/Postal Code: ">
                            <el-input v-model="form.billingZip" style="width: 120px"></el-input>
                        </el-form-item>
                    </td>
                    <td class="alignTop" style="padding-left: 22px">
                        <el-form-item label="City: ">
                            <el-input v-model="form.shippingCity" style="width: 145px"></el-input>
                        </el-form-item>
                    </td>
                    <td class="alignTop" style="padding-left: 10px">
                        <el-form-item label="Zip/Postal Code: ">
                            <el-input v-model="form.shippingZip" style="width: 120px"></el-input>
                        </el-form-item>
                    </td>
                </tr>
            </table>

            <table class="format">
                <tr>
                    <td class="alignTop">
                        <el-form-item label="Country: ">
                            <el-input v-model="form.billingCountry" style="width: 133px"></el-input>
                        </el-form-item>
                    </td>
                    <td class="alignTop" style="padding-left: 10px">
                        <el-form-item label="State/Province: ">
                            <el-input v-model="form.billingState" style="width: 132px"></el-input>
                        </el-form-item>
                    </td>
                    <td class="alignTop" style="padding-left: 25px">
                        <el-form-item label="Country: ">
                            <el-input v-model="form.shippingCountry" style="width: 133px"></el-input>
                        </el-form-item>
                    </td>
                    <td class="alignTop" style="padding-left: 10px">
                        <el-form-item label="State/Province: ">
                            <el-input v-model="form.shippingState" style="width: 132px"></el-input>
                        </el-form-item>
                    </td>
                </tr>
            </table>

            <el-form-item label="Payment Term">
                <el-select v-model="form.paymentTerm" placeholder="Select">
                    <el-option
                        v-for="option in paymentOptions"
                        :key="option.value"
                        :label="option.value"
                        :value="option.label">
                    </el-option>
                </el-select>
            </el-form-item>

            <table style="text-align: right; border-spacing: 0px 1px">
                <tr>
                    <td class="alignTop" style="padding-left: 22px">
                        <el-form-item label="Invoice #: " style="float: left"></el-form-item>
                        <el-input v-model="form.invoiceNo" style="width: 188px"></el-input>
                    </td>
                    <td class="alignTop" style="padding-left: 41px">
                        <el-form-item label="Invoice Status: " style="float: left"></el-form-item>
                        <el-select v-model="form.status" placeholder="Select" clearable style="width: 188px">
                            <el-option
                                v-for="item in statusOptions"
                                :key="item.status"
                                :value="item.status"
                                :label="item.label"
                            ></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td class="alignTop">
                        <el-form-item label="Invoice Date: " style="float: left"></el-form-item>
                        <el-date-picker
                            v-model="form.invoiceDate"
                            type="datetime"
                            placeholder="Select date and time"
                            style="width: 188px">
                        </el-date-picker>
                    </td>
                    <td class="alignTop" style="padding-left: 71px">
                        <el-form-item label="Due Date: " style="float: left"></el-form-item>
                        <el-date-picker
                            v-model="form.dueDate"
                            type="datetime"
                            placeholder="Select date and time"
                            style="width: 188px">
                        </el-date-picker>
                    </td>
                </tr>
                <tr>
                    <td class="alignTop" style="padding-left: 1px">
                        <el-form-item label="Shipping via: " style="float: left"></el-form-item>
                        <el-input v-model="form.shippingVia" style="width: 188px"></el-input>
                    </td>
                    <td class="alignTop" style="padding-left: 20px">
                        <el-form-item label="Tracking Number: " style="float: left"></el-form-item>
                        <el-input v-model="form.trackingNo" style="width: 188px"></el-input>
                    </td>
                </tr>
            </table>

            <el-table
                ref="orderDetailTable"
                :data="tableData"
                v-loading="loading"
                border
                stripe
                highlight-current-row
                :max-height="200"
                :row-key="row => row.index"
                style="width: 90%; margin-left: 25px; margin-top: 5px; margin-bottom: 5px"
            >
                <el-table-column label="Product" prop="product" width="170"></el-table-column>
                <el-table-column label="QTY" prop="quantity" width="105"></el-table-column>
                <el-table-column label="Rate" prop="rate" width="100">
                    <template slot-scope="scope">
                        <span>${{ Number(scope.row.rate).toFixed(2) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Amount" prop="amount" width="100">
                    <template slot-scope="scope">
                        <span>${{ Number(scope.row.amount).toFixed(2) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Tax" prop="tax" width="54"></el-table-column>
                <el-table-column label="Action" width="95">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleDeleteItem(scope.row, scope.$index)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <table style="width: 100%; text-align: right; padding-right: 42px; margin-bottom: 10px">
                <tr>
                    <td class="alignTop" style="padding-left: 206px">
                        <el-button type="primary" @click="handleAddDevice()">+ Add Device</el-button>
                    </td>
                    <td class="alignTop" style="padding-left: 10px">
                        <el-button type="primary" @click="handleAddAccessories()">+ Add Accessories</el-button>
                    </td>
                    <td class="alignTop" style="padding-left: 8px">
                        <el-button type="primary" @click="handleAddService()">+ Add Service Plan</el-button>
                    </td>
                </tr>
            </table>

            <el-row style="border-spacing: 0px">
                <el-col :span="12" :offset="15">
                    <el-form-item label="Tax: " style="padding-left: 40px">
                        <p v-model="tax" style="text-align: right; margin-right: 130px">${{ tax }}</p>
                    </el-form-item>
                    <el-form-item label="Shipping fee: " style="padding-left: 40px">
                        <el-input v-model="form.shippingFee" style="width: 75px; padding-left: 5px"></el-input>
                    </el-form-item>
                    <el-form-item label="Total: " style="padding-left: 40px">
                        <p v-model="total" style="text-align: right; margin-right: 130px">${{ total }}</p>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="Note:" style="display: block; margin-left: 30px; margin-right: 30px; border-spacing: 0px">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="notes"
                    v-model="form.note"
                    style="width: 622px"
                >
                </el-input>
            </el-form-item>
            <el-button type="primary" style="display: inline; margin-left: 382px;">Pay</el-button>
            <el-button type="primary" style="display: inline; margin-left: 16px;" @click="handleEditPayment">Save</el-button>
            <el-button type="primary" style="display: inline; margin-left: 16px;">Save and Send</el-button>
        </el-form>
        <product-detail-form ref="productDetailForm" @productAdded="getProductInfo" @prodAndAccAdded="getProdAndAccInfo"
        @prodAndPlanAdded="getProdAndPlanInfo" @allAdded="getAllInfo"></product-detail-form>
        <accessory-detail-form ref="accessoryDetailForm" @accessoryAdded="getAccessoryInfo"></accessory-detail-form>
        <service-plan-form ref="servicePlanForm" @planAdded="getServicePlanFee"></service-plan-form>
    </el-dialog>
</template>

<script>
import { editPayment, deletePaymentItem } from '@/api/getData';
import ProductDetailForm from '../order/ProductDetailForm.vue';
import AccessoryDetailForm from '../order/AccessoryDetailForm.vue';
import ServicePlanForm from '../order/ServicePlanForm.vue';
export default {
  name: 'EditInvoiceForm',

  components: {
    ProductDetailForm,
    AccessoryDetailForm,
    ServicePlanForm,
  },
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
        trackingNo: '',
      },
      newData: [],
      toDelete: [],
      itemInfo: {
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
        prodPicked: '',
        accPicked: '',
        planPicked: '',
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
        billingCompany: '',
        billingAddress: '',
        billingCity: '',
        billingState: '',
        billingCountry: '',
        billingZip: '',
        billingEmail: '',
        billingNumber: '',
        billingContact: '',
        shippingCompany: '',
        shippingAddress: '',
        shippingCity: '',
        shippingState: '',
        shippingCountry: '',
        shippingZip: '',
        shippingNumber: '',
        shippingEmail: '',
        shippingContact: '',
        paymentTerm: '',
        status: '',
        invoiceType: '',
        invoiceNo: '',
        invoiceDate: '',
        dueDate: '',
        shippingVia: '',
        note: '',
        shippingFee: '',
        trackingNo: '',
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
      this.newData = [];
      this.toDelete = [];
      this.itemInfo = {};
      this.$refs.form.resetFields();
    },

    /* HANDLER FUNCTIONS */
    handleEditPayment() {
      this.getDates();
      this.toDelete.forEach(function(element) {
        deletePaymentItem({itemId: element});
      });
      const second = {amount: this.total, customer: this.form.billingCompany, shippingFee: this.form.shippingFee, paymentItems: this.newData};
      Object.assign(this.form, second);
      editPayment({  }, this.form).then(result => {
        if (result) {
          this.$message.success('Save successful!');
          this.reloadTable();
          this.isOpen = false;
        }
      });
    },
    handleAddDevice() {
      this.$refs.productDetailForm.showDialog();
    },
    handleAddAccessories() {
      this.$refs.accessoryDetailForm.showDialog();
    },
    handleAddService() {
      this.$refs.servicePlanForm.showDialog();
    },

    handleDeleteItem(row, index) {
      if (row.itemId) {
        this.toDelete.push(row.itemId);
        this.tableData.splice(index, 1);
      } else {
        this.tableData.splice(index, 1);
        const indexToDelete = this.findIndex(row);
        this.newData.splice(indexToDelete, 1);
      }
    },
    findIndex(toFind) {
      const a = this.newData.find(function(value) {
        return value.product === toFind.product
                  && value.quantity === toFind.quantity
                  && value.rate === toFind.rate
                  && value.amount === toFind.amount
                  && value.tax === toFind.tax
                  && value.description === toFind.description
                  && value.paymentId === toFind.paymentId;
      });
      if (a === null) {
        alert('not found');
      } else {
        const b = this.newData.indexOf(a);
        return b;
      }
    },


    /* FORMAT INVOICE AND DUE DATES */
    getDates() {
      if (this.form.paymentTerm === null || this.form.invoiceDate === null) {
        this.form.dueDate = null;
        return;
      }
      let invoice = new Date(this.form.invoiceDate);
      let due = new Date(this.form.dueDate);

      this.form.invoiceDate = invoice.getFullYear()
          + '-' + (invoice.getMonth()+1)
          + '-' + invoice.getDate()
          + ' ' + invoice.getHours()
          + ':' + invoice.getMinutes();
      this.form.dueDate = due.getFullYear()
          + '-' + (due.getMonth()+1)
          + '-' + due.getDate()
          + ' ' + due.getHours()
          + ':' + due.getMinutes();
    },

    /* GET ACCESSORIES, PRODUCTS, AND SERVICE PLANS FOR TABLE */
    getAccessoryInfo(n, p, q, r) {
      this.itemInfo.accName = n;
      this.itemInfo.accPrice = p;
      this.itemInfo.accQty = q;
      this.itemInfo.accTax = r;
      const data = {paymentId: '',
        product: this.itemInfo.accName,
        quantity: this.itemInfo.accQty,
        rate: this.itemInfo.accPrice,
        amount: Number(this.itemInfo.accPrice) * Number(this.itemInfo.accQty),
        tax: this.itemInfo.accTax,
        description: this.itemInfo.accQty + ' * ' + this.itemInfo.accName,
      };
      this.tableData.push(data);
      this.newData.push(data);
    },
    getProductInfo(n, p, q, r) {
      this.itemInfo.prodName = n;
      this.itemInfo.prodPrice = p;
      this.itemInfo.prodQty = q;
      this.itemInfo.prodTax = r;
      const data = {paymentId: '',
        product: this.itemInfo.prodName,
        quantity: this.itemInfo.prodQty,
        rate: this.itemInfo.prodPrice,
        amount: Number(this.itemInfo.prodPrice) * Number(this.itemInfo.prodQty),
        tax: this.itemInfo.prodTax,
        description: this.itemInfo.prodQty + ' * ' + this.itemInfo.prodName,
      };
      this.tableData.push(data);
      this.newData.push(data);
    },
    getServicePlanFee(q, a, n) {
      this.itemInfo.planQty = q;
      this.itemInfo.planAmt = a;
      this.itemInfo.planName = n;
      const data = {paymentId: '',
        product: this.itemInfo.planName,
        quantity: this.itemInfo.planQty,
        rate: this.itemInfo.planAmt,
        amount: Number(this.itemInfo.planAmt) * Number(this.itemInfo.planQty),
        tax: 'N',
        description: this.itemInfo.planQty + ' * ' + this.itemInfo.planName,
      };
      this.tableData.push(data);
      this.newData.push(data);
    },
    getProdAndAccInfo(pn, pp, pq, pt, an, ap, aq, at) {
      this.itemInfo.prodName = pn;
      this.itemInfo.prodPrice = pp;
      this.itemInfo.prodQty = pq;
      this.itemInfo.prodTax = pt;
      this.itemInfo.accName = an;
      this.itemInfo.accPrice = ap;
      this.itemInfo.accQty = aq;
      this.itemInfo.accTax = at;
      const data = {paymentId: '',
        product: this.itemInfo.prodName,
        quantity: this.itemInfo.prodQty,
        rate: this.itemInfo.prodPrice,
        amount: Number(this.itemInfo.prodPrice) * Number(this.itemInfo.prodQty),
        tax: this.itemInfo.prodTax,
        description: this.itemInfo.prodQty + ' * ' + this.itemInfo.prodName,
      };
      this.tableData.push(data);
      this.newData.push(data);
      const data2 = {paymentId: '',
        product: this.itemInfo.accName,
        quantity: this.itemInfo.accQty,
        rate: this.itemInfo.accPrice,
        amount: Number(this.itemInfo.accPrice) * Number(this.itemInfo.accQty),
        tax: this.itemInfo.accTax,
        description: this.itemInfo.accQty + ' * ' + this.itemInfo.accName,
      };
      this.tableData.push(data2);
      this.newData.push(data2);
    },
    getProdAndPlanInfo(pn, pp, pq, pt, sq, sa, sn) {
      this.itemInfo.prodName = pn;
      this.itemInfo.prodPrice = pp;
      this.itemInfo.prodQty = pq;
      this.itemInfo.prodTax = pt;
      this.itemInfo.planQty = sq;
      this.itemInfo.planAmt = sa;
      this.itemInfo.planName = sn;
      const data = {paymentId: '',
        product: this.itemInfo.prodName,
        quantity: this.itemInfo.prodQty,
        rate: this.itemInfo.prodPrice,
        amount: Number(this.itemInfo.prodPrice) * Number(this.itemInfo.prodQty),
        tax: this.itemInfo.prodTax,
        description: this.itemInfo.prodQty + ' * ' + this.itemInfo.prodName,
      };
      this.tableData.push(data);
      this.newData.push(data);
      const data2 = {paymentId: '',
        product: this.itemInfo.planName,
        quantity: this.itemInfo.planQty,
        rate: this.itemInfo.planAmt,
        amount: Number(this.itemInfo.planAmt) * Number(this.itemInfo.planQty),
        tax: 'N',
        description: this.itemInfo.planQty + ' * ' + this.itemInfo.planName,
      };
      this.tableData.push(data2);
      this.newData.push(data2);
    },
    getAllInfo(pn, pp, pq, pt, an, ap, aq, at, sq, sa, sn) {
      this.itemInfo.prodName = pn;
      this.itemInfo.prodPrice = pp;
      this.itemInfo.prodQty = pq;
      this.itemInfo.prodTax = pt;
      this.itemInfo.accName = an;
      this.itemInfo.accPrice = ap;
      this.itemInfo.accQty = aq;
      this.itemInfo.accTax = at;
      this.itemInfo.planQty = sq;
      this.itemInfo.planAmt = sa;
      this.itemInfo.planName = sn;
      const data = {paymentId: '',
        product: this.itemInfo.prodName,
        quantity: this.itemInfo.prodQty,
        rate: this.itemInfo.prodPrice,
        amount: Number(this.itemInfo.prodPrice) * Number(this.itemInfo.prodQty),
        tax: this.itemInfo.prodTax,
        description: this.itemInfo.prodQty + ' * ' + this.itemInfo.prodName,
      };
      this.tableData.push(data);
      this.newData.push(data);
      const data2 = {paymentId: '',
        product: this.itemInfo.accName,
        quantity: this.itemInfo.accQty,
        rate: this.itemInfo.accPrice,
        amount: Number(this.itemInfo.accPrice) * Number(this.itemInfo.accQty),
        tax: this.itemInfo.accTax,
        description: this.itemInfo.accQty + ' * ' + this.itemInfo.accName,
      };
      this.tableData.push(data2);
      this.newData.push(data2);
      const data3 = {paymentId: '',
        product: this.itemInfo.planName,
        quantity: this.itemInfo.planQty,
        rate: this.itemInfo.planAmt,
        amount: Number(this.itemInfo.planAmt) * Number(this.itemInfo.planQty),
        tax: 'N',
        description: this.itemInfo.planQty + ' * ' + this.itemInfo.planName,
      };
      this.tableData.push(data3);
      this.newData.push(data3);
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
      let tot = 0;
      const copy = this.tableData.slice();
      copy.forEach(function(item, index) {
        tot += item.amount;
      });
      tot += this.tax;
      if (!isNaN(this.form.shippingFee)) {
        tot += Number(this.form.shippingFee);
      }
      return (Math.floor(tot * 100) / 100);
    }
  }
};
</script>

<style>
    td.alignTop {
        vertical-align: top;
    }

    table.format {
        text-align: left;
        border-spacing: 0px;
    }
</style>

<style scoped>


</style>
