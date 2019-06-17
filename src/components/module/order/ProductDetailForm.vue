<template>
    <el-dialog
        :title="'Products'"
        :center="true"
        top="15vh"
        :visible.sync="isOpen"
        append-to-body=true
        @close="resetFields">
        <div class="product code">
            <el-form ref="form" :model="form" size="mini">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item title="1. Product Code" name="1">
                        <el-checkbox-group v-model="optionsPickedCode" :max="1">
                            <el-checkbox v-for="option in optionsCode" :label="option.op" style="display: block">
                            </el-checkbox>
                            <el-button type="primary" style="margin-left: 100px" @click="handleNext()">Next</el-button>
                        </el-checkbox-group>
                    </el-collapse-item>
                    <el-collapse-item title="2. Product Details" name="2">
                        <el-checkbox-group v-model="optionsPickedDetail" :max="1">
                            <el-checkbox v-for="option in optionsDetail" :label="option.det" style="display: block">
                            </el-checkbox>
                            <el-button type="primary" style="margin-left: 100px" @click="handleNext()">Next</el-button>
                        </el-checkbox-group>
                    </el-collapse-item>
                    <el-collapse-item title="3. QTY, Price" name="3">
                        <el-form ref="form" :model="form3" size="mini">
                            <el-form-item label="QTY">
                                <el-input v-model="form3.QTY" style="width: 80px; float: right; margin-right: 520px"></el-input>
                            </el-form-item>
                            <el-form-item label="Price">
                                <el-input v-model="form3.price" style="width: 80px; float: right; margin-right: 520px"></el-input>
                            </el-form-item>
                            <el-form-item label="Service Fee">
                                <el-input v-model="form3.serviceFee" style="width: 80px; float: right; margin-right: 520px"></el-input>
                            </el-form-item>
                            <el-form-item label="Tax">
                                <el-select v-model="form3.tax" default-first-option=true
                                           style="width: 80px; float: right; margin-right: 520px">
                                    <el-option
                                        v-for="x in form3.choices"
                                        :key="x.value"
                                        :label="x.label"
                                        :value="x.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" style="margin-left: 104px" @click="handleSave()">Save</el-button>
                    </el-collapse-item>
                </el-collapse>
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
        activeName: '1',
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
        tableData: [{
        }],
        form3: {
          QTY: '',
          price: '',
          serviceFee: '',
          choices: [{
            value: 'Yes',
            label: 'Yes'
          }, {
            value: 'No',
            label: 'No'
          }],
          tax: 'Yes',
        },
      };
    },
    methods: {
      showDialog() {
        this.isOpen = true;
      },
      resetFields() {
        this.activeName = '1';
        this.optionsPickedDetail = [];
        this.optionsPickedCode = [];
        this.form3 = {};
        this.form3.tax = 'Yes';
        this.$refs.form.resetFields();
      },
      handleCommand(command) {
        alert('clicked');
      },
      handleNext() {
        let tempNum = Number(this.activeName);
        let nextNum = tempNum + 1;
        this.activeName = nextNum.toString();
      },
      handleSave() {
        this.$refs.confirmationForm.showDialog();
      },
    },
  };
</script>


<style scoped>

</style>
