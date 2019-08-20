<template>
  <el-dialog
    :title="'Invoice'"
    :center="true"
    top="15vh"
    :visible.sync="visible"
    :append-to-body="append"
    width="720px"
  >
    <el-form ref="form" :model="form" size="mini" style="margin: 0">
      <div style="margin-left:50px;width:612px">
        <el-form-item label="Invoice Type">
          <el-select v-model="form.invoiceType" placeholder="select">
            <el-option
              v-for="type in invoiceOptions"
              :key="type.value"
              :value="type.value"
              :label="type.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="BILLING INFO" style="font-weight: bold"></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SHIPPING INFO" style="font-weight: bold"></el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Company Name: ">
              <el-input v-model="form.orgName" style="width: 275px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Company Name: ">
              <el-input v-model="form.shippingCompany" style="width: 275px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Contact: ">
              <el-input v-model="form.contacts" style="width: 275px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Contact: ">
              <el-input v-model="form.shippingContact" style="width: 275px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Phone Number: ">
              <el-input v-model="form.phone" style="width: 275px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Phone Number: ">
              <el-input v-model="form.shippingPhone" style="width: 275px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Email: ">
              <el-input v-model="form.email" style="width: 275px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Email: ">
              <el-input v-model="form.shippingEmail" style="width: 275px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Address: ">
              <el-input v-model="form.streetAddress" style="width: 275px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Address: ">
              <el-input v-model="form.shippingAddress" style="width: 275px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="City: ">
              <el-input v-model="form.city" style="width: 145px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Zip/Postal Code: ">
              <el-input v-model="form.zip" style="width: 120px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="City: ">
              <el-input v-model="form.shippingCity" style="width: 145px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Zip/Postal Code: ">
              <el-input v-model="form.shippingZip" style="width: 120px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="Country: ">
              <el-input v-model="form.country" style="width: 133px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="State/Province: ">
              <el-input v-model="form.state" style="width: 132px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Country: ">
              <el-input v-model="form.shippingCountry" style="width: 133px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="State/Province: ">
              <el-input v-model="form.shippingState" style="width: 132px"></el-input>
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
      
        <el-row>
          <el-col :span="10">
            <el-form-item label="Invoice #: "></el-form-item>
            <el-input v-model="form.invoiceNumber" style="width: 188px"></el-input>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Invoice Status: "></el-form-item>
            <el-select v-model="form.status" placeholder="Select" clearable style="width: 188px">
              <el-option
                v-for="item in statusOptions"
                :key="item.status"
                :value="item.status"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="Invoice Date: "></el-form-item>
            <el-date-picker
              v-model="form.invoiceDate"
              type="datetime"
              placeholder="Select date and time"
              style="width: 188px"
            ></el-date-picker>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Due Date: "></el-form-item>
            <el-date-picker
              v-model="form.dueDate"
              type="datetime"
              placeholder="Select date and time"
              style="width: 188px"
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="Shipping via: "></el-form-item>
            <el-input v-model="form.shippingVia" style="width: 188px"></el-input>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Tracking Number: "></el-form-item>
            <el-input v-model="form.trackingNumber" style="width: 188px"></el-input>
          </el-col>
        </el-row>
      </div>
      <div style="margin-left:12px;width:680px">
        <el-table
          ref="orderDetailTable"
          :data="tableData"
          v-loading="loading"
          border
          stripe
          highlight-current-row
          :max-height="200"
          :row-key="row => row.index"
          style="width: 93%; margin-left: 25px; margin-top: 5px; margin-bottom: 5px"
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

        <div>
          <el-button
              type="primary"
              style="display:inline-block;margin-left: 251px"
              @click="handleAddDevice()"
            >+ Add Device</el-button>
          <el-button
            type="primary"
            style="display:inline-block"
            @click="handleAddAccessories()"
          >+ Add Accessories</el-button>
          <el-button
            type="primary"
            style="display:inline-block"
            @click="handleAddService()"
          >+ Add Service Plan</el-button>
        </div>

        <el-row style="margin-top:10px">
          <el-col :span="5" :offset="18">
            <el-form-item label="Tax: " :tax="tax">${{ tax }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" :offset="17">
            <el-form-item label="Shipping fee: "></el-form-item>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="form.shippingFee"
              style="width: 75px; padding-left: 5px"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5" :offset="18">
            <el-form-item label="Total: " :total="total">${{ total }}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="Note:"
          style="display: block; margin-left: 30px; margin-right: 30px; border-spacing: 0px"
        >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="notes"
            v-model="form.note"
            style="width: 622px"
          ></el-input>
        </el-form-item>
        <el-button type="primary" style="display: inline; margin-left: 382px;">Pay</el-button>
        <el-button
          type="primary"
          style="display: inline; margin-left: 16px;"
          @click="addPaymentHandle"
        >Save</el-button>
        <el-button type="primary" style="display: inline; margin-left: 16px;">Save and Send</el-button>
      </div>
    </el-form>
    <product-detail-form
      ref="productDetailForm"
      @productAdded="getProductInfo"
      @prodAndAccAdded="getProdAndAccInfo"
      @prodAndPlanAdded="getProdAndPlanInfo"
      @allAdded="getAllInfo"
    ></product-detail-form>
    <accessory-detail-form ref="accessoryDetailForm" @accessoryAdded="getAccessoryInfo"></accessory-detail-form>
    <service-plan-form ref="servicePlanForm" @planAdded="getServicePlanFee"></service-plan-form>
  </el-dialog>
</template>

<script>
import { addPayment } from '@/api/getData';
import ProductDetailForm from './ProductDetailForm.vue';
import ServicePlanForm from './ServicePlanForm.vue';
import AccessoryDetailForm from './AccessoryDetailForm.vue';

export default {
  name: 'CreateInvoiceForm',

  components: {
    ProductDetailForm,
    AccessoryDetailForm,
    ServicePlanForm
  },
  props: {
    value: Boolean,
    form: [Object]
  },
  data: function() {
    return {
      loading: false,
      append: true,
      labelPosition: 'right',
      tableData: [{}],
      productDetailFormVisible: false,
      accessoryDetailFormVisible: false,
      servicePlanFormVisible: false,
      /* RESET THESE */
      invoiceForm: {
        dueDate: '',
        invoiceType: '',
        note: '',
        status: ''
      },
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
        planName: ''
      },

      /* DROPDOWN OPTIONS */
      invoiceOptions: [
        {
          value: 'RMA',
          label: 'RMA'
        },
        {
          value: 'Purchase',
          label: 'Purchase'
        },
        {
          value: 'Evaluation',
          label: 'Evaluation'
        },
        {
          value: 'Service Plan',
          label: 'Service Plan'
        }
      ],
      statusOptions: [
        {
          status: 'refund',
          label: 'refund'
        },
        {
          status: 'void',
          label: 'void'
        },
        {
          status: 'paid',
          label: 'paid'
        },
        {
          status: 'pending',
          label: 'pending'
        },
        {
          status: 'overdue',
          label: 'overdue'
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
      ]

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

  methods: {
    /* AUXILIARY FUNCTIONS */
    // resetFields() {
    //   this.invoiceForm = {};
    //   this.form = {};
    //   this.$refs.form.resetFields();
    // },

    /* HANDLER FUNCTIONS */
    addPaymentHandle() {
      this.getDates();
      addPayment(
        {},
        {
          amount: this.total,
          customer: this.form.orgName,
          dueDate: this.invoiceForm.dueDate,
          status: this.invoiceForm.status,
          sales: 'NULL',
          billingCompany: this.form.orgName,
          billingContact: this.form.contacts,
          billingNumber: this.form.phone,
          billingEmail: this.form.email,
          billingAddress: this.form.streetAddress,
          billingCity: this.form.city,
          billingState: this.form.state,
          billingCountry: this.form.country,
          billingZip: this.form.zip,
          shippingCompany: this.form.shippingCompany,
          shippingContact: this.form.shippingContact,
          shippingNumber: this.form.shippingPhone,
          shippingEmail: this.form.shippingEmail,
          shippingAddress: this.form.shippingAddress,
          shippingCity: this.form.shippingCity,
          shippingState: this.form.shippingState,
          shippingCountry: this.form.shippingCountry,
          shippingZip: this.form.shippingZip,
          note: this.invoiceForm.note,
          paymentTerm: this.form.paymentTerm,
          invoiceType: this.invoiceForm.invoiceType,
          paymentItems: this.tableData
        }
      ).then(result => {
        if (result) {
          this.$message.success('Save successful!');
          this.reloadTable();
          this.visible = false;
        }
      });
    },

    handleAddDevice() {
      //   this.$refs.productDetailForm.showDialog();
      this.productDetailFormVisible = true;
    },
    handleAddAccessories() {
      //   this.$refs.accessoryDetailForm.showDialog();
      this.accessoryDetailFormVisible = true;
    },
    handleAddService() {
      //   this.$refs.servicePlanForm.showDialog();
      this.servicePlanFormVisible = true;
    },
    handleDeleteItem(row, index) {
      this.tableData.splice(index, 1);
    },

    /* FORMAT INVOICE AND DUE DATES */
    getDates() {
      let invoice = new Date(this.form.invoiceDate);
      let due = new Date(this.invoiceForm.dueDate);

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
      this.invoiceForm.dueDate =
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
      this.itemInfo.accName = n;
      this.itemInfo.accPrice = p;
      this.itemInfo.accQty = q;
      this.itemInfo.accTax = r;
      const data = {
        paymentId: '',
        product: this.itemInfo.accName,
        quantity: this.itemInfo.accQty,
        rate: this.itemInfo.accPrice,
        amount: Number(this.itemInfo.accPrice) * Number(this.itemInfo.accQty),
        tax: this.itemInfo.accTax,
        description: this.itemInfo.accQty + ' * ' + this.itemInfo.accName
      };
      this.tableData.push(data);
    },
    getProductInfo(n, p, q, r) {
      this.itemInfo.prodName = n;
      this.itemInfo.prodPrice = p;
      this.itemInfo.prodQty = q;
      this.itemInfo.prodTax = r;
      const data = {
        paymentId: '',
        product: this.itemInfo.prodName,
        quantity: this.itemInfo.prodQty,
        rate: this.itemInfo.prodPrice,
        amount: Number(this.itemInfo.prodPrice) * Number(this.itemInfo.prodQty),
        tax: this.itemInfo.prodTax,
        description: this.itemInfo.prodQty + ' * ' + this.itemInfo.prodName
      };
      this.tableData.push(data);
    },
    getServicePlanFee(q, a, n) {
      this.itemInfo.planQty = q;
      this.itemInfo.planAmt = a;
      this.itemInfo.planName = n;
      const data = {
        paymentId: '',
        product: this.itemInfo.planName,
        quantity: this.itemInfo.planQty,
        rate: this.itemInfo.planAmt,
        amount: Number(this.itemInfo.planAmt) * Number(this.itemInfo.planQty),
        tax: 'N',
        description: this.itemInfo.planQty + ' * ' + this.itemInfo.planName
      };
      this.tableData.push(data);
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
      const data = {
        paymentId: '',
        product: this.itemInfo.prodName,
        quantity: this.itemInfo.prodQty,
        rate: this.itemInfo.prodPrice,
        amount: Number(this.itemInfo.prodPrice) * Number(this.itemInfo.prodQty),
        tax: this.itemInfo.prodTax,
        description: this.itemInfo.prodQty + ' * ' + this.itemInfo.prodName
      };
      this.tableData.push(data);
      const data2 = {
        paymentId: '',
        product: this.itemInfo.accName,
        quantity: this.itemInfo.accQty,
        rate: this.itemInfo.accPrice,
        amount: Number(this.itemInfo.accPrice) * Number(this.itemInfo.accQty),
        tax: this.itemInfo.accTax,
        description: this.itemInfo.accQty + ' * ' + this.itemInfo.accName
      };
      this.tableData.push(data2);
    },
    getProdAndPlanInfo(pn, pp, pq, pt, sq, sa, sn) {
      this.itemInfo.prodName = pn;
      this.itemInfo.prodPrice = pp;
      this.itemInfo.prodQty = pq;
      this.itemInfo.prodTax = pt;
      this.itemInfo.planQty = sq;
      this.itemInfo.planAmt = sa;
      this.itemInfo.planName = sn;
      const data = {
        paymentId: '',
        product: this.itemInfo.prodName,
        quantity: this.itemInfo.prodQty,
        rate: this.itemInfo.prodPrice,
        amount: Number(this.itemInfo.prodPrice) * Number(this.itemInfo.prodQty),
        tax: this.itemInfo.prodTax,
        description: this.itemInfo.prodQty + ' * ' + this.itemInfo.prodName
      };
      this.tableData.push(data);
      const data2 = {
        paymentId: '',
        product: this.itemInfo.planName,
        quantity: this.itemInfo.planQty,
        rate: this.itemInfo.planAmt,
        amount: Number(this.itemInfo.planAmt) * Number(this.itemInfo.planQty),
        tax: 'N',
        description: this.itemInfo.planQty + ' * ' + this.itemInfo.planName
      };
      this.tableData.push(data2);
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
      const data = {
        paymentId: '',
        product: this.itemInfo.prodName,
        quantity: this.itemInfo.prodQty,
        rate: this.itemInfo.prodPrice,
        amount: Number(this.itemInfo.prodPrice) * Number(this.itemInfo.prodQty),
        tax: this.itemInfo.prodTax,
        description: this.itemInfo.prodQty + ' * ' + this.itemInfo.prodName
      };
      this.tableData.push(data);
      const data2 = {
        paymentId: '',
        product: this.itemInfo.accName,
        quantity: this.itemInfo.accQty,
        rate: this.itemInfo.accPrice,
        amount: Number(this.itemInfo.accPrice) * Number(this.itemInfo.accQty),
        tax: this.itemInfo.accTax,
        description: this.itemInfo.accQty + ' * ' + this.itemInfo.accName
      };
      this.tableData.push(data2);
      const data3 = {
        paymentId: '',
        product: this.itemInfo.planName,
        quantity: this.itemInfo.planQty,
        rate: this.itemInfo.planAmt,
        amount: Number(this.itemInfo.planAmt) * Number(this.itemInfo.planQty),
        tax: 'N',
        description: this.itemInfo.planQty + ' * ' + this.itemInfo.planName
      };
      this.tableData.push(data3);
    }
  },

  computed: {
    tax: function() {
      let t = 0;
      let et;
      const copy = this.tableData.slice();
      if (copy.length !== 0) {
        copy.forEach(function(item, index) {
          if (item.tax === 'Y') {
            et = Number(item.amount) * 0.0775;
          } else {
            et = 0;
          }
          t += et;
        });
      }
      return Math.floor(t * 100) / 100;
    },
    total: function() {
      let tot = 0;
      const copy = this.tableData.slice();
      if (copy.length !== 0) {
        copy.forEach(function(item, index) {
          tot += item.amount;
        });
        tot += this.tax;
      }
      if (!isNaN(this.form.shippingFee)) {
        tot += Number(this.form.shippingFee);
      }
      return Math.floor(tot * 100) / 100;
    },
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
