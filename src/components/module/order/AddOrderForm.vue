<template>
    <el-dialog
        :title="'Order Info'"
        :center="true"
        top="15vh"
        :visible.sync="isOpen"
        @closed="resetFields">
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="150px" size="mini">
                <el-form-item label="Order Type">
                    <el-select v-model="form.orderType" placeholder="Select">
                        <el-option
                            v-for="option in orderOptions"
                            :key="option.value"
                            :label="option.value"
                            :value="option.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Billing Info"></el-form-item>
                <br>
                <el-form-item label="Company" style="">
                <el-input v-model="form.billing" style="float:right; margin-right: 120px"></el-input>
                </el-form-item>
                <el-form-item label="Contact" style="">
                    <el-input v-model="form.billingContact" style="float:right; margin-right: 120px"></el-input>
                </el-form-item>
                <el-form-item label="Phone Number" style="">
                    <el-input v-model="form.billingPhone" style="float:right; margin-right: 120px"></el-input>
                </el-form-item>
                <el-form-item label="Email" style="">
                    <el-input v-model="form.billingEmail" style="float:right; margin-right: 120px"></el-input>
                </el-form-item>
                <el-form-item label="Address" style="">
                    <el-input v-model="form.billingAddress" style="float:right; margin-right: 120px"></el-input>
                </el-form-item>
                <el-form-item label="Shipping Info">
                    <el-checkbox v-model="sameAsBilling"
                                 style="display: inline"
                                 @change="handleSameInfo()"
                    >the same as billing info
                    </el-checkbox>
                </el-form-item>
                <br>
                <el-form-item label="Company Name">
                    <el-input v-model="form.companyName" style="float:right; margin-right: 120px"></el-input>
                </el-form-item>
                <el-form-item label="Contact">
                <el-input v-model="form.contact" style="float:right; margin-right: 120px"></el-input>
                </el-form-item>
                <el-form-item label="Phone Number">
                    <el-input v-model="form.phone" style="float:right; margin-right: 120px"></el-input>
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="form.email" style="float:right; margin-right: 120px"></el-input>
                </el-form-item>
                <el-form-item label="Shipping Address">
                    <el-input v-model="form.shippingAddress" style="float:right; margin-right: 120px"></el-input>
                </el-form-item>
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
                <el-form-item label="Order Details"></el-form-item>
                <br>
                <el-table
                    ref="orderDetailTable"
                    :data="tableData"
                    v-loading="loading"
                    border
                    stripe
                    highlight-current-row
                    height="200px"
                    :row-key="row => row.index"
                    style="width: 100%; margin-left: 50px"
                >
                    <el-table-column label="Product" prop="product" width="120"></el-table-column>
                    <el-table-column label="QTY" prop="quantity" width="100"></el-table-column>
                    <el-table-column label="Rate" prop="rate" width="100"></el-table-column>
                    <el-table-column label="Amount" prop="amount" width="100"></el-table-column>
                    <el-table-column label="Tax" prop="tax" width="50"></el-table-column>
                    <el-table-column label="Action" width="130">
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
                <el-button type="primary" style="margin-left: 50px" @click="handleAddDevice()">+ Add Device</el-button>
                <el-button type="primary" style="margin-left: 50px" @click="handleAddAccessories()">+ Add Accessories</el-button>
                <el-button type="primary" style="margin-left: 50px" @click="handleAddService()">+ Add Service Plan</el-button>
                <el-form-item label="Tax: ">
                    <p v-model="taxRate">${{ taxRate }}</p>
                </el-form-item>
                <el-form-item label="Total: ">
                    <p v-model="total">${{ total }} plus shipping fee</p>
                </el-form-item>
                <br>
                <el-form-item label="Note:">
                    <el-input
                        type="textarea"
                        :rows="2"
                        width="170px"
                        placeholder="notes"
                        v-model="form.note"
                        >
                    </el-input>
                </el-form-item>
                <br>

                <el-form ref="form" :model="customerServiceForm" label-width="150px" size="mini">
                    <el-form-item label="Status:">
                        <el-select v-model="customerServiceForm.status" placeholder="select">
                            <el-option
                                v-for="option in statusOptions"
                                :key="option.status"
                                :value="option.status"
                                :label="option.label"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Invoice #">
                        <el-input v-model="customerServiceForm.invoiceNumber" style="float:right; margin-right: 120px"></el-input>
                    </el-form-item>
                    <el-form-item label="Invoice Date">
                        <el-input v-model="customerServiceForm.invoiceDate" style="float:right; margin-right: 120px"></el-input>
                    </el-form-item>
                    <el-form-item label="Shipping Via">
                        <el-input v-model="customerServiceForm.shippingVia" style="float:right; margin-right: 120px"></el-input>
                    </el-form-item>
                    <el-form-item label="Tracking Number">
                        <el-input v-model="customerServiceForm.trackingNumber" style="float:right; margin-right: 120px"></el-input>
                    </el-form-item>
                    <el-form-item label="Shipping Fee">
                        <el-input v-model="customerServiceForm.shippingFee" style="float:right; margin-right: 120px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" >Cancel Order</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleCreateInvoice()">Submit and Create Invoice</el-button>
                    </el-form-item>
                </el-form>
            </el-form>
        </div>
        <create-invoice-form ref="createInvoiceForm"></create-invoice-form>
        <product-detail-form ref="productDetailForm"></product-detail-form>
    </el-dialog>
</template>

<script>
import { addUser, editUser } from '@/api/getData';
import SelectOrgTree from '@/components/common/SelectOrgTree.vue';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { mapActions, mapState } from 'vuex';
import ProductDetailForm from './ProductDetailForm.vue';
import CreateInvoiceForm from './CreateInvoiceForm.vue';
export default {
  name: 'AddOrderForm',
  components: {
    ProductDetailForm,
    CreateInvoiceForm
  },
  data: function() {
    return {
      loading: false,
      isOpen: false,
      taxRate: '________',
      total: '________',
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
      }
    };
  },
  methods: {
    showDialog() {
      this.isOpen = true;
    },
    resetFields() {
      this.form={};
      this.customerServiceForm={};
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
    handleCreateInvoice() {
      this.$refs.createInvoiceForm.showDialog();
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
    }
  },



};
</script>

<style scoped>

</style>
