<template>
        <el-dialog
            :title="'Invoice Review'"
            :center="true"
            top="15vh"
            :visible.sync="isOpen"
            :append-to-body="true"
            @closed="resetFields">
            <div class="form-box">
                <el-form ref="form" :label-position="labelPosition" :model="form" size="mini" style="padding-right: 0">
<!--                    <table class="test" style="width: 100%; text-align: right">-->
<!--                        <tr>-->
<!--                            <td class="bill"><el-form-item label="BILL TO"style="font-weight: bold"></el-form-item></td>-->
<!--                            <td><el-form-item label="SHIP TO" style="font-weight: bold"></el-form-item></td>-->
<!--                            <td><el-form-item label="Invoice #: " style="font-weight: 900">-->
<!--                                <p v-model="form.invoiceNo">{{ form.invoiceNo }}</p>-->
<!--                            </el-form-item></td>-->
<!--                        </tr>-->
<!--                        <tr>-->
<!--                            <td>-->
<!--                                <el-form-item label="Company: ">-->
<!--                                    <p v-model="form.billingCompany">{{ form.billingCompany }}</p>-->
<!--                                </el-form-item>-->
<!--                            </td>-->
<!--                            <td style="padding-left: 15px">-->
<!--                                <el-form-item label="Company: ">-->
<!--                                    <p v-model="form.shippingCompany">{{ form.shippingCompany }}</p>-->
<!--                                </el-form-item>-->
<!--                            </td>-->
<!--                            <td>-->
<!--                                <el-form-item label="Date: " style="font-weight: 900">-->
<!--                                    <p v-model="form.invoiceDate">{{ form.invoiceDate }}</p>-->
<!--                                </el-form-item>-->
<!--                            </td>-->
<!--                        </tr>-->
<!--                        <tr>-->
<!--                            <td>-->
<!--                                <el-form-item label="Address: ">-->
<!--                                    <p v-model="form.billingAddress">{{ form.billingAddress }}</p>-->
<!--                                </el-form-item>-->
<!--                            </td>-->
<!--                            <td>-->
<!--                                <el-form-item label="Address: ">-->
<!--                                    <p v-model="form.shippingAddress">{{ form.shippingAddress }}</p>-->
<!--                                </el-form-item>-->
<!--                            </td>-->
<!--                            <td>-->
<!--                                <el-form-item label="Due Date: " style="font-weight: 900">-->
<!--                                    <p v-model="form.dueDate">{{ form.dueDate }}</p>-->
<!--                                </el-form-item>-->
<!--                            </td>-->
<!--                        </tr>-->
<!--                        <tr>-->
<!--                            <td>-->
<!--                                <el-form-item label="Phone Number: ">-->
<!--                                    <p v-model="form.billingNumber">{{ form.billingNumber}}</p>-->
<!--                                </el-form-item>-->
<!--                            </td>-->
<!--                            <td>-->
<!--                                <el-form-item label="Phone Number: ">-->
<!--                                    <p v-model="form.shippingNumber">{{ form.shippingNumber}}</p>-->
<!--                                </el-form-item>-->
<!--                            </td>-->
<!--                        </tr>-->
<!--                        <tr>-->
<!--                            <td>-->
<!--                                <el-form-item label="Email: ">-->
<!--                                    <p v-model="form.billingEmail">{{ form.billingEmail }}</p>-->
<!--                                </el-form-item>-->
<!--                            </td>-->
<!--                            <td>-->
<!--                                <el-form-item label="Email: ">-->
<!--                                    <p v-model="form.shippingEmail">{{ form.shippingEmail }}</p>-->
<!--                                </el-form-item>-->
<!--                            </td>-->
<!--                        </tr>-->
<!--                    </table>-->
                    <el-row style="padding-left: 50px">
                        <el-col :span="8">
                            <el-form-item label="Bill to" style="font-weight: 900"></el-form-item>
                            <el-form-item label="Company: ">
                                <p v-model="form.billingCompany">{{ form.billingCompany }}</p>
                            </el-form-item>
                            <el-form-item label="Address: ">
                                <p v-model="form.billingAddress">{{ form.billingAddress }}</p>
                            </el-form-item>
                           <el-form-item label="Phone Number: ">
                                <p v-model="form.billingNumber">{{ form.billingNumber}}</p>
                            </el-form-item>
                            <el-form-item label="Email: ">
                                <p v-model="form.billingEmail">{{ form.billingEmail }}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Ship to" style="font-weight: 900"></el-form-item>
                            <el-form-item label="Company: ">
                                <p v-model="form.shippingCompany">{{ form.shippingCompany }}</p>
                            </el-form-item>
                            <el-form-item label="Address: ">
                                <p v-model="form.shippingAddress">{{ form.shippingAddress }}</p>
                            </el-form-item>
                            <el-form-item label="Phone Number: ">
                                <p v-model="form.shippingNumber">{{ form.shippingNumber }}</p>
                            </el-form-item>
                            <el-form-item label="Email: ">
                                <p v-model="form.shippingEmail">{{ form.shippingEmail }}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Invoice #: " style="font-weight: 900">
                                <p v-model="form.invoiceNo">{{ form.invoiceNo }}</p>
                            </el-form-item>
                            <el-form-item label="Date: " style="font-weight: 900">
                                <p v-model="form.invoiceDate">{{ form.invoiceDate }}</p>
                            </el-form-item>
                            <el-form-item label="Due Date: " style="font-weight: 900">
                                <p v-model="form.dueDate">{{ form.dueDate }}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="padding-left: 50px">
                        <el-col :span="8">
                            <el-form-item label="Shipping Via: " style="font-weight: 900">
                                <p v-model="form.shippingVia">{{ form.shippingVia }}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Tracking Number: " style="font-weight: 900">
                                <p v-model="form.trackingNo">{{ form.trackingNo }}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="Item" style="font-weight: 900; padding-left: 50px"></el-form-item>
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
                        <el-table-column label="Product" prop="product" width="160"></el-table-column>
                        <el-table-column label="QTY" prop="quantity" width="120"></el-table-column>
                        <el-table-column label="Rate" prop="rate" width="120"></el-table-column>
                        <el-table-column label="Amount" prop="amount" width="120"></el-table-column>
                        <el-table-column label="Tax" prop="tax" width="79"></el-table-column>
                    </el-table>
                    <el-row style="padding-left: 50px;">
                        <el-col :span="16">
                            <el-form-item label="Note: " style="font-weight: 900">
                                <p v-model="form.note">{{ form.note }}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Tax: " style="font-weight: 900">
                                <p v-model="tax">${{ tax }}</p>
                            </el-form-item>
                            <el-form-item label="Shipping: "  style="font-weight: 900">
                                <p v-model="form.shippingFee">${{ form.shippingFee }}</p>
                            </el-form-item>
                            <el-form-item label="Total: " style="font-weight: 900">
                                <p v-model="total">${{ total }}</p>
                            </el-form-item>
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
      };
    },
    props: {
      form: {
        type: Object,
        default: () => (
          {billingCompany: '',
            billingAddress: '',
            billingEmail: '',
            billingNumber: '',
            shippingCompany: '',
            shippingAddress: '',
            shippingNumber: '',
            shippingEmail: '',
            type: '',
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
    },
    methods: {
      showDialog() {
        this.isOpen = true;
      },
      resetFields() {
        this.$refs.form.resetFields();
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
        let tot = t + this.tax;
        if (!isNaN(this.form.shippingFee)) {
          tot += Number(this.form.shippingFee);
        }
        return (Math.floor(tot * 100) / 100);
      }
    }
  };
</script>

<style scoped>

</style>
