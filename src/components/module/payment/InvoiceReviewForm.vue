<template>
        <el-dialog
            :title="'Invoice Review'"
            :center="true"
            top="15vh"
            :visible.sync="isOpen"
            @closed="resetFields">
            <div class="form-box">
                <el-form ref="form":label-position="labelPosition" :model="form" size="mini" style="padding-right: 0">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="Bill to" style="font-weight: 900"></el-form-item>
                            <el-form-item label="Company: ">
                                <p v-model="billing">{{ billing }}</p>
                            </el-form-item>
                            <el-form-item label="Address: ">
                                <p v-model="billingAddress">{{ billingAddress }}</p>
                            </el-form-item>
                            <el-form-item label="Phone Number: ">
                                <p v-model="billingPhone">{{ billingPhone }}</p>
                            </el-form-item>
                            <el-form-item label="Email: ">
                                <p v-model="billingEmail">{{ billingEmail }}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Ship to" style="font-weight: 900"></el-form-item>
                            <el-form-item label="Company: ">
                                <p v-model="companyName">{{ companyName }}</p>
                            </el-form-item>
                            <el-form-item label="Address: ">
                                <p v-model="shippingAddress">{{ shippingAddress }}</p>
                            </el-form-item>
                            <el-form-item label="Phone Number: ">
                                <p v-model="phone">{{ phone }}</p>
                            </el-form-item>
                            <el-form-item label="Email: ">
                                <p v-model="email">{{ email }}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Invoice #: " style="font-weight: 900"></el-form-item>
                            <el-form-item label="Date: " style="font-weight: 900"></el-form-item>
                            <el-form-item label="Due Date: " style="font-weight: 900"></el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="Shipping via" style="font-weight: 900"></el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Shipping number" style="font-weight: 900"></el-form-item>
                        </el-col>
                    </el-row>
                    <el-col :span="8" offset="2">
                        <el-form-item label="Item" style="font-weight: 900"></el-form-item>
                    </el-col>
                    <el-table
                        ref="orderDetailTable"
                        :data="tableData"
                        v-loading="loading"
                        border
                        stripe
                        highlight-current-row
                        height="200px"
                        :row-key="row => row.index"
                        style="width: 170%; margin-left: 50px"
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
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="Note: " style="font-weight: 900"></el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Tax: " style="font-weight: 900"></el-form-item>
                            <el-form-item label="Shipping: "  style="font-weight: 900"></el-form-item>
                            <el-form-item label="Total: " style="font-weight: 900"></el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-dialog>
</template>

<script>
  export default {
    name: 'InvoiceReviewForm',
    components: {

    },
    data: function() {
      return {
        isOpen: false,
        loading: false,
        labelPosition: 'left',
        form:{
          billTo: '',
          shipTo: '',
        }
      };
    },
    methods: {
      showDialog() {
        this.isOpen = true;
      },
      resetFields() {
        this.$refs.form.resetFields();
      },
    },
  };
</script>

<style scoped>

</style>
