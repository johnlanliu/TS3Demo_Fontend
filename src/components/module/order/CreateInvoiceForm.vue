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
            <el-form-item label="Billing Info" style="font-weight: 900;"></el-form-item>
            <el-form-item label="Company: ">
                <el-input
                        placeholder="Please input"
                        v-model="input"
                        :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item label="Contact: ">
                <el-input
                        placeholder="Please input"
                        v-model="input"
                        :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item label="Phone Number: ">
                <el-input
                        placeholder="Please input"
                        v-model="input"
                        :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item label="Email: ">
                <el-input
                        placeholder="Please input"
                        v-model="input"
                        :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item label="Address: ">
                <el-input
                        placeholder="Please input"
                        v-model="input"
                        :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item label="Shipping Info" style="font-weight: 900;"></el-form-item>
            <el-form-item label="Company: ">
                <el-input
                        placeholder="Please input"
                        v-model="input"
                        :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item label="Contact: ">
                <el-input
                        placeholder="Please input"
                        v-model="input"
                        :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item label="Phone Number: ">
                <el-input
                        placeholder="Please input"
                        v-model="input"
                        :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item label="Email: ">
                <el-input
                        placeholder="Please input"
                        v-model="input"
                        :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item label="Address: ">
                <el-input
                        placeholder="Please input"
                        v-model="input"
                        :disabled="true">
                </el-input>
            </el-form-item>
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
      },
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
    }
  }
};
</script>

<style scoped>

</style>
