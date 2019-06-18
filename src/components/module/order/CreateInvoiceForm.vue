<template>
    <el-dialog
        :title="'Invoice'"
        :center="true"
        top="15vh"
        :visible.sync="isOpen"
        append-to-body="append"
        @closed="resetFields">
        <el-form ref="form" :model="invoiceForm" size="mini">
            <el-form-item label="Invoice Type">
                <el-select v-model="invoiceForm.invoiceType" placeholder="select">
                    <el-option
                        v-for="type in invoiceTypes"
                        :key="type.value"
                        :value="type.value"
                        :label="type.label">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="Billing Info" style="font-weight: 900;"></el-form-item>
                    <el-form-item label="Company: ">
                        <p v-model="billing">{{ billing }}</p>
                    </el-form-item>
                    <el-form-item label="Contact: ">
                        <p v-model="billingContact">{{ billingContact }}</p>
                    </el-form-item>
                    <el-form-item label="Phone Number: ">
                        <p v-model="billingPhone">{{ billingPhone }}</p>
                    </el-form-item>
                    <el-form-item label="Email: ">
                        <p v-model="billingEmail">{{ billingEmail }}</p>
                    </el-form-item>
                    <el-form-item label="Address: ">
                        <p v-model="billingAddress">{{ billingAddress }}</p>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="Shipping Info" style="font-weight: 900;"></el-form-item>
                    <el-form-item label="Company: ">
                        <p v-model="companyName">{{ companyName }}</p>
                    </el-form-item>
                    <el-form-item label="Contact: ">
                        <p v-model="contact">{{ contact }}</p>
                    </el-form-item>
                    <el-form-item label="Phone Number: ">
                        <p v-model="phone">{{ phone }}</p>
                    </el-form-item>
                    <el-form-item label="Email: ">
                        <p v-model="email">{{ email }}</p>
                    </el-form-item>
                    <el-form-item label="Address: ">
                        <p v-model="shippingAddress">{{ shippingAddress }}</p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="Payment Term">
                <el-select v-model="invoiceForm.paymentTerm" placeholder="Select">
                    <el-option
                        v-for="option in paymentOptions"
                        :key="option.value"
                        :label="option.value"
                        :value="option.label">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Invoice #">
                <el-input v-model="invoiceForm.invoiceNumber" style="width: 150px"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Invoice Date">
                        <el-input v-model="invoiceForm.invoiceDate" style="width: 150px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Due Date">
                        <el-input v-model="invoiceForm.dueDate" style="width: 150px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Shipping via">
                        <el-input v-model="invoiceForm.shippingVia" style="width: 150px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Tracking Number">
                        <el-input v-model="invoiceForm.trackingNo" style="width: 150px"></el-input>
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
            <el-row>
                <el-col :span="12" :offset="15">
                    <el-form-item label="Tax: ">
                        <p v-model="invoiceForm.taxRate">${{ invoiceForm.taxRate }}</p>
                    </el-form-item>
                    <el-form-item label="Shipping fee: ">
                        <el-input v-model="invoiceForm.shippingFee" style="width: 150px"></el-input>
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
            <el-button type="primary" style="display: inline; margin-left: 30px;">Save</el-button>
            <el-button type="primary" style="display: inline; margin-left: 30px;">Save and Send</el-button>
        </el-form>
    </el-dialog>
</template>

<script>
import AddOrderForm from './AddOrderForm.vue';
export default {
  name: 'CreateInvoiceForm',
  components: {
    AddOrderForm
  },
  data: function() {
    return {
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
        trackingNo: '',
        taxRate: '',
        total: '',
        shippingFee: '',
        note: '',
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
    }
  }
};
</script>

<style scoped>

</style>
