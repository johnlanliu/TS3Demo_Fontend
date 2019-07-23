<template>
    <el-dialog
        :title="'Order Info'"
        :center="true"
        top="15vh"
        :visible.sync="isOpen"
        @closed="resetFields"
        width="50%"
        :append-to-body="true">
        <div class="form-box">
            <el-form ref="form" :model="editForm" size="mini" style="margin: 0; padding-left: 10px">
                <el-form-item label="Order Type">
                    <el-select v-model="editForm.type" placeholder="Select">
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
                            <el-form-item label="Company Name: ">
                                <el-input v-model="editForm.billingCompany"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="Company Name: ">
                                <el-input v-model="sameAsBilling ? editForm.billingCompany : editForm.shippingCompany" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="Contact: ">
                                <el-input v-model="editForm.billingContact"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="Contact: ">
                                <el-input v-model="sameAsBilling ? editForm.billingContact : editForm.shippingContact" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="Phone Number: ">
                                <el-input v-model="editForm.billingNumber"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="Phone Number: ">
                                <el-input v-model="sameAsBilling ? editForm.billingNumber : editForm.shippingNumber" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="Email: ">
                                <el-input v-model="editForm.billingEmail"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="Email: ">
                                <el-input v-model="sameAsBilling ? editForm.billingEmail : editForm.shippingEmail" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="Billing Address: ">
                                <el-input v-model="editForm.billingAddress"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="Shipping Address: ">
                                <el-input v-model="sameAsBilling ? editForm.billingAddress : editForm.shippingAddress" :disabled="sameAsBilling"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <el-form-item label="Payment Term">
                    <el-select v-model="editForm.paymentTerm" placeholder="Select">
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
                    :height="200"
                    :row-key="row => row.index"
                    style="width: 100%; margin-left: 50px"
                >
                    <el-table-column label="Product" prop="product" width="150"></el-table-column>
                    <el-table-column label="QTY" prop="quantity" width="96"></el-table-column>
                    <el-table-column label="Rate" prop="rate" width="96"></el-table-column>
                    <el-table-column label="Amount" prop="amount" width="96">
                        <template slot-scope="scope">
                            <span v-model="scope.row.amount">${{ scope.row.amount.toFixed(2) }}</span>
                        </template>
                    </el-table-column>
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
                            <el-form-item label="Note:" style="display: block; margin-left: 30px; margin-right: 30px">
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="notes"
                                    v-model="editForm.note"
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
                <el-form ref="form" :model="editForm" size="mini">
                    <table class="secondaryForm" style="width: 100%; text-align: right">
                        <tr>
                            <td>
                                <el-form-item label="Status:">
                                    <el-select v-model="editForm.status" placeholder="select" style="width: 160px">
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
                                <el-form-item label="Shipping Fee">
                                    <el-input v-model="editForm.shippingFee" ></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="Invoice #">
                                    <el-input v-model="editForm.invoiceNo"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="Invoice Date">
                                    <el-date-picker
                                        v-model="editForm.invoiceDate"
                                        type="datetime"
                                        placeholder="Select date and time"
                                        style="width: 160px">
                                    </el-date-picker>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="Shipping Via">
                                    <el-input v-model="editForm.shippingVia"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="Tracking Number">
                                    <el-input v-model="editForm.trackingNo"></el-input>
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
                                    <el-button type="primary" @click="handleSaveEdit()">Save Changes</el-button>
                                </el-form-item>
                            </td>
                        </tr>
                    </table>
                </el-form>
            </el-form>
        </div>
        <product-detail-form ref="productDetailForm"></product-detail-form>
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
import { cancelOrder, deleteOrderItem, editOrder } from '@/api/getData';

export default {
  name: 'EditOrderForm',

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

    /* RESET THESE */
      sameInfo: false,
      sameAsBillingBool: 0,
      itemOffset: this.offset,
      newData: [],
      toDelete: [],
      form: {
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
      //   type: [
      //               { required: true, message: 'Order type is required', trigger: 'change' },
      //   ],
      //   billingCompany: [
      //               { required: true, message: 'Company name is required' },
      //               { min: 1, message: 'Company name is required'},
      //     {
      //       pattern: /^[A-Za-z0-9]+$/,
      //       message: 'Invalid characters'
      //     }
      //   ],
      //   shippingCompany: [
      //               { required: true, message: 'Company name is required' },
      //               { min: 1, message: 'Company name is required'},
      //     {
      //       pattern: /^[A-Za-z0-9]+$/,
      //       message: 'Invalid characters'
      //     }
      //   ],
      //   billingContact: [
      //               { required: true, message: 'Contact is required' },
      //               { min: 1, message: 'Contact is required'},
      //     {
      //       pattern: /^[A-Za-z0-9]+$/,
      //       message: 'Invalid characters'
      //     }
      //   ],
      //   shippingContact: [
      //               { required: true, message: 'Contact is required' },
      //               { min: 1, message: 'Contact is required'},
      //     {
      //       pattern: /^[A-Za-z0-9]+$/,
      //       message: 'Invalid characters'
      //     }
      //   ],
      //   billingNumber: [
      //               {required: true, message: 'Phone number is required' },
      //     {
      //       pattern: /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/,
      //       message: 'Invalid phone number'
      //     }
      //   ],
      //   shippingNumber: [
      //               {required: true, message: 'Phone number is required' },
      //     {
      //       pattern: /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/,
      //       message: 'Invalid phone number'
      //     }
      //   ],
      //   billingEmail: [
      //               { required: true, message: 'Email is required' },
      //     {
      //       pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      //       message: 'Invalid email'
      //     }
      //   ],
      //   shippingEmail: [
      //               { required: true, message: 'Email is required' },
      //     {
      //       pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      //       message: 'Invalid email'
      //     }
      //   ],
      //   billingAddress: [
      //               { required: true, message: 'Billing address is required' },
      //   ],
      //   shippingAddress: [
      //               { required: true, message: 'Shipping address is required' },
      //   ],
      //   paymentTerm: [
      //               { required: true, message: 'Payment term is required', trigger: 'change' },
      //   ],
      //           // note: [
      //           //     { max: 200, message: 'Maximum character limit: 200' }
      //           // ],
      //   status: [
      //               { required: true, message: 'Status is required', trigger: 'change' },
      //   ],
      //   invoiceNo: [
      //               { required: true, message: 'Invoice number is required' },
      //   ],
      //   invoiceDate: [
      //               { required: true, message: 'Invoice date is required' },
      //   ],
      //   shippingVia: [
      //               { required: true, message: 'Shipping type is required' },
      //   ],
      //   trackingNumber: [
      //               { required: true, message: 'Tracking number is required' },
      //   ],
      //   shippingFee: [
      //               { required: true, message: 'Shipping fee is required' },
      //     {
      //       pattern: /^\d+(,\d{3})*(\.\d{1,2})?$/,
      //       message: 'Invalid price'
      //     },
      //   ],
      // },
    };
  },

  props: {
    editForm: {
      type: Object,
      default: () =>({
        orderId: '',
        type: '',
        status: '',
        invoiceNo: '',
        invoiceDate: '',
        trackingNo: '',
        sales: '',
        billingCompany: '',
        billingContact: '',
        billingAddress: '',
        billingEmail: '',
        billingNumber: '',
        shippingCompany: '',
        shippingContact: '',
        shippingAddress: '',
        shippingNumber: '',
        shippingEmail: '',
        paymentTerm: '',
        shippingVia: '',
        shippingFee: '',
        note: '',
      })
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    sameAsBilling: Boolean,
    offset: Number,
    initData: Function,
  },

  methods: {
    /* AUXILIARY FUNCTIONS */
    showDialog() {
      this.isOpen = true;
    },
    resetFields() {
      this.sameInfo = false;
      this.sameAsBillingBool = 0;
      this.itemOffset = this.offset;
      this.newData = [];
      this.toDelete = [];
      this.form = {};
      this.$refs.form.resetFields();
    },

    /* HANDLER FUNCTIONS */
    handleSameInfo() {
      if (this.sameAsBilling) {
        this.sameAsBillingBool = 1;
        this.editForm.shippingCompany = this.editForm.billingCompany;
        this.editForm.shippingContact = this.editForm.billingContact;
        this.editForm.shippingNumber = this.editForm.billingNumber;
        this.editForm.shippingEmail = this.editForm.billingEmail;
        this.editForm.shippingAddress = this.editForm.billingAddress;
      }
    },
    handleDeleteOrderItem(row, index) {
      if (row.itemId) {
        this.toDelete.push(row.itemId);
        alert(this.toDelete);
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
            && value.orderId === toFind.orderId
            && value.invoiceNo === toFind.invoiceNo;
      });
      if (a === null) {
        alert('not found');
      } else {
        const b = this.newData.indexOf(a);
        return b;
      }
    },
    async handleCancel() {
      await cancelOrder({orderId: this.editForm.orderId}, {});
      this.initData();
      this.isOpen = false;
    },
    handleSaveEdit() {
      this.toDelete.forEach(function(element) {
        deleteOrderItem({itemId: element});
      });
      editOrder({}, {
        orderId: this.editForm.orderId,
        type: this.editForm.type,
        customer: this.editForm.billingCompany,
        status: this.editForm.status,
        invoiceNo: this.editForm.invoiceNo,
        invoiceDate: this.editForm.invoiceDate,
        dueDate: this.editForm.dueDate,
        trackingNo: this.editForm.trackingNo,
        sales: this.editForm.sales,
        createTime: 'NULL',
        modifyTime: 'NULL',
        orderItems: this.newData,
        billingCompany: this.editForm.billingCompany,
        billingContact: this.editForm.billingContact,
        billingNumber: this.editForm.billingNumber,
        billingEmail: this.editForm.billingEmail,
        billingAddress: this.editForm.billingAddress,
        shippingCompany: this.editForm.shippingCompany,
        shippingContact: this.editForm.shippingContact,
        shippingNumber: this.editForm.shippingNumber,
        shippingEmail: this.editForm.shippingEmail,
        shippingAddress: this.editForm.shippingAddress,
        note: this.editForm.note,
        shippingVia: this.editForm.shippingVia,
        shippingFee: this.editForm.shippingFee,
        sameAsBilling: this.sameAsBillingBool,
        paymentTerm: this.editForm.paymentTerm,
      });
      this.initData();
      this.tableData = [];
      this.newData = [];
      this.itemOffset = this.offset;
      this.isOpen = false;
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
      let invoice = new Date(this.customerServiceForm.invoiceDate);
      let due = new Date(this.customerServiceForm.invoiceDate);

      if (this.form.paymentTerm === 'Net15') {
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
      this.form.accName = n;
      this.form.accPrice = p;
      this.form.accQty = q;
      this.form.accTax = r;
      const data = {orderId: '',
        product: this.form.accName,
        quantity: this.form.accQty,
        rate: this.form.accPrice,
        amount: Number(this.form.accPrice) * Number(this.form.accQty),
        tax: this.form.accTax,
        description: this.form.accQty + ' * ' + this.form.accName,
        invoiceNo: this.editForm.invoiceNo
      };
      this.tableData.push(data);
      this.newData.push(data);
    },
    getProductInfo(n, p, q, r) {
      this.form.prodName = n;
      this.form.prodPrice = p;
      this.form.prodQty = q;
      this.form.prodTax = r;
      const data = {orderId: '',
        product: this.form.prodName,
        quantity: this.form.prodQty,
        rate: this.form.prodPrice,
        amount: Number(this.form.prodPrice) * Number(this.form.prodQty),
        tax: this.form.prodTax,
        description: this.form.prodQty + ' * ' + this.form.prodName,
        invoiceNo: this.editForm.invoiceNo
      };
      this.tableData.push(data);
      this.newData.push(data);
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
        invoiceNo: this.editForm.invoiceNo
      };
      this.tableData.push(data);
      this.newData.push(data);
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
      const data = {orderId: '',
        product: this.form.prodName,
        quantity: this.form.prodQty,
        rate: this.form.prodPrice,
        amount: Number(this.form.prodPrice) * Number(this.form.prodQty),
        tax: this.form.prodTax,
        description: this.form.prodQty + ' * ' + this.form.prodName,
        invoiceNo: this.editForm.invoiceNo
      };
      this.tableData.push(data);
      this.newData.push(data);
      const data2 = {orderId: '',
        product: this.form.accName,
        quantity: this.form.accQty,
        rate: this.form.accPrice,
        amount: Number(this.form.accPrice) * Number(this.form.accQty),
        tax: this.form.accTax,
        description: this.form.accQty + ' * ' + this.form.accName,
        invoiceNo: this.editForm.invoiceNo
      };
      this.tableData.push(data2);
      this.newData.push(data2);
    },
    getProdAndPlanInfo(pn, pp, pq, pt, sq, sa, sn) {
      this.form.prodName = pn;
      this.form.prodPrice = pp;
      this.form.prodQty = pq;
      this.form.prodTax = pt;
      this.form.planQty = sq;
      this.form.planAmt = sa;
      this.form.planName = sn;
      const data = {orderId: '',
        product: this.form.prodName,
        quantity: this.form.prodQty,
        rate: this.form.prodPrice,
        amount: Number(this.form.prodPrice) * Number(this.form.prodQty),
        tax: this.form.prodTax,
        description: this.form.prodQty + ' * ' + this.form.prodName,
        invoiceNo: this.editForm.invoiceNo
      };
      this.tableData.push(data);
      this.newData.push(data);
      const data2 = {orderId: '',
        product: this.form.planName,
        quantity: this.form.planQty,
        rate: this.form.planAmt,
        amount: Number(this.form.planAmt) * Number(this.form.planQty),
        tax: 'N',
        description: this.form.planQty + ' * ' + this.form.planName,
        invoiceNo: this.editForm.invoiceNo
      };
      this.tableData.push(data2);
      this.newData.push(data2);
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
      const data = {orderId: '',
        product: this.form.prodName,
        quantity: this.form.prodQty,
        rate: this.form.prodPrice,
        amount: Number(this.form.prodPrice) * Number(this.form.prodQty),
        tax: this.form.prodTax,
        description: this.form.prodQty + ' * ' + this.form.prodName,
        invoiceNo: this.editForm.invoiceNo
      };
      this.tableData.push(data);
      this.newData.push(data);
      const data2 = {orderId: '',
        product: this.form.accName,
        quantity: this.form.accQty,
        rate: this.form.accPrice,
        amount: Number(this.form.accPrice) * Number(this.form.accQty),
        tax: this.form.accTax,
        description: this.form.accQty + ' * ' + this.form.accName,
        invoiceNo: this.editForm.invoiceNo
      };
      this.tableData.push(data2);
      this.newData.push(data2);
      const data3 = {orderId: '',
        product: this.form.planName,
        quantity: this.form.planQty,
        rate: this.form.planAmt,
        amount: Number(this.form.planAmt) * Number(this.form.planQty),
        tax: 'N',
        description: this.form.planQty + ' * ' + this.form.planName,
        invoiceNo: this.editForm.invoiceNo
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
