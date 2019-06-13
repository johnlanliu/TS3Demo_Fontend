<template>
    <el-dialog
        :title="'Order Info'"
        :center="true"
        top="15vh"
        :visible.sync="isOpen"
        @close="resetFields">
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="150px" size="mini">
                <el-form-item label="Company Info"></el-form-item>
                <br>
                <el-col span="20" offset="3">
                    <el-form-item label="Billing for Company">
                        <el-input v-model="form.billing"></el-input>
                    </el-form-item>
                </el-col>
                <el-form-item label="Shipping Info"></el-form-item>
                <br>
                <el-col span="20" offset="3">
                    <el-form-item label="Company Name">
                        <el-input v-model="form.companyName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="20" offset="3">
                    <el-form-item label="Contact">
                        <el-input v-model="form.contact"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="20" offset="3">
                    <el-form-item label="Email">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="20" offset="3">
                    <el-form-item label="Shipping Address">
                        <el-input v-model="form.shippingAddress"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="20" offset="3">
                    <el-form-item label="Payment Term">
                        <el-input v-model="form.paymentTerm"></el-input>
                    </el-form-item>
                </el-col>
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
                <el-button type="primary" style="margin-left: 50px" @click="handleAdd()">+ Add</el-button>
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
                <el-form-item label="Tax: ">
                    <p v-model="taxRate">${{ taxRate }}</p>
                </el-form-item>
                <el-form-item label="Total: ">
                    <p v-model="total">${{ total }} plus shipping fee</p>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSave()">Save</el-button>
                </el-form-item>
            </el-form>
        </div>
        <product-detail-form ref="productDetailForm"></product-detail-form>
    </el-dialog>
</template>

<script>
import { addUser, editUser } from '@/api/getData';
import SelectOrgTree from '@/components/common/SelectOrgTree.vue';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { mapActions, mapState } from 'vuex';
import ProductDetailForm from './ProductDetailForm.vue';

export default {
  name: 'AddOrderForm',
  components: {
    ProductDetailForm
  },
  data: function() {
    return {
      loading: false,
      isOpen: false,
        taxRate: 15,
        total: 2515,
      tableData: [{
        product: 'VT1611R30',
        quantity: 10,
        rate: 250,
        amount: 2500,
        tax: 'Y',
      }],
      form: {
        billing: '',
        companyName: '',
        contact: '',
        email: '',
        shippingAddress: '',
        paymentTerm: '',
        note: '',
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
    handleCommand(command) {
      alert('clicked');
    },
    handleAdd() {
      this.$refs.productDetailForm.showDialog();
    },
    handleSave() {
        alert('save');
    }
  },



};
</script>

<style scoped>

</style>
