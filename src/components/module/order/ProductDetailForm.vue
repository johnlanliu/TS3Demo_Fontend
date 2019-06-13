<template>
    <el-dialog
        :title="'Products'"
        :center="true"
        top="15vh"
        :visible.sync="isOpen"
        append-to-body="true"
        @close="resetFields">
        <div class="product code">
            <el-form ref="form" :model="form" size="mini">
                <el-form-item label="1. Product Code"></el-form-item>
                <el-form-item style="padding-left: 100px">
                    <el-table
                        ref="productCodeTable"
                        :data="optionsCode"
                        v-loading="loading"
                        border
                        stripe
                        highlight-current-row
                        :height="tableHeight"
                        :row-key="row => row.index"
                        style="width:351px;"
                    >
                        <el-table-column fixed type="selection" width="50" v-model="optionsPickedCode"></el-table-column>
                        <el-table-column fixed label="Product" prop="op" width="300" style="position: center"></el-table-column>
                    </el-table>
                </el-form-item>
                <el-button type="primary" style="margin-left: 100px" @click="handleNext()">Next</el-button>
                <el-form-item label="2. Product Detail"></el-form-item>
                <el-form-item style="padding-left: 100px">
                    <el-table
                        ref="productDetailTable"
                        :data="optionsDetail"
                        v-loading="loading"
                        border
                        stripe
                        highlight-current-row
                        :height="tableHeight"
                        :row-key="row => row.index"
                        style="width:351px"
                    >
                        <el-table-column fixed type="selection" width="50" v-model="optionsPickedDetail"></el-table-column>
                        <el-table-column fixed label="Product" prop="det" width="300" style="position: center"></el-table-column>
                    </el-table>
                </el-form-item>
                <el-button type="primary" style="margin-left: 100px" @click="handleNext()">Next</el-button>
                <confirmation-form ref="confirmationForm"></confirmation-form>
                <el-form-item label="3. QTY, Price"></el-form-item>
                <el-form-item label="QTY" style="margin-left: 100px">
                    <el-input v-model="form3.QTY" style="width: 80px; float: right; margin-right: 380px"></el-input>
                </el-form-item>
                <el-form-item label="Price" style="margin-left: 100px">
                    <el-input v-model="form3.price" style="width: 80px; float: right; margin-right: 380px"></el-input>
                </el-form-item>
                <el-form-item label="Service Fee" style="margin-left: 100px">
                    <el-input v-model="form3.serviceFee" style="width: 80px; float: right; margin-right: 380px"></el-input>
                </el-form-item>
                <el-form-item label="Tax" style="margin-left: 100px">
                    <el-select
                        v-model="tax"
                        filterable
                        default-first-option="true"
                        style="width: 80px; float: right; margin-right: 380px">
                        <el-option
                            v-for="choice in choices"
                            :key="choice.value"
                            :label="choice.label"
                            :value="choice.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" style="margin-left: 100px" @click="handleSave()">Save</el-button>
                <confirmation-form ref="confirmationForm"></confirmation-form>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
  import ConfirmationForm from './ConfirmationForm';

  export default {
    name: 'ProductDetailForm',
    tableHeight: window.innerHeight - 162,
    productCodeData: [],
    components: {
      ConfirmationForm
    },
    data: function() {
      return {
        loading: false,
        isOpen: false,
        optionsPickedCode: [],
        optionsPickedDetail: [],
        tax: '',
        optionsCode: [{
          op: '4" TrackLight (UT1611)'
        }, {
          op: '6" TrackLight (UT1711)'
        }, {
          op: 'Thermotrack (UT1702)'
        }],
        optionsDetail: [{
          det: '3G, Red (R30)'
        }, {
          det: '4G, Red (R40)'
        }, {
          det: '3G, Clear (C30)'
        }, {
          det: '4G, Clear (C40)'
        }, {
          det: '3G, Amber (A30)'
        }, {
          det: '4G, Amber (A40)'
        }],
        choices: [{
          value: 'Yes',
          label: 'Yes'
        }, {
          value: 'No',
          label: 'No'
        }],
        tableData: [{
        }],
        form3: {
          QTY: '',
          price: '',
          serviceFee: '',
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
      handleNext() {
        this.$refs.confirmationForm.showDialog();
      },
      handleSave() {
        this.$refs.confirmationForm.showDialog();
      }
    },
  };
</script>


<style scoped>

</style>
