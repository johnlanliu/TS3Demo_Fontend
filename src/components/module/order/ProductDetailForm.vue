<template>
    <el-dialog
        :title="'Products'"
        :center="true"
        top="15vh"
        :visible.sync="isOpen"
        append-to-body="append"
        @close="resetFields">
        <div class="product code">
            <el-form ref="form" :model="form3" size="mini">
                <el-collapse v-model="form3.activeName" accordion>
                    <el-collapse-item  name="1">
                        <template slot="title">
                            Type<span v-if="form3.productName !== ''" class="productName">: {{ form3.productName }}</span>
                        </template>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button type="primary" @click="handleNameClick('4&quot; TrackLight (UT1611)')">4" TrackLight</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button type="primary" @click="handleNameClick('6&quot; TrackLight (UT1711)')">6" TrackLight</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button type="primary" @click="handleNameClick('In Dash GPS (UT1508)')">In Dash GPS</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button type="primary" @click="handleNameClick('5&quot; ThermoTrack (UT1702)')">5" ThermoTrack</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button type="primary" @click="handleNameClick('6&quot; ThermoTrack (UT1802)')">6" ThermoTrack</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item  name="2" disabled="form3.isTrackLight">
                        <template slot="title">
                            Network<span v-if="form3.network !== ''" class="network">: {{ form3.network }}</span>
                        </template>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button type="warning" @click="handleNetworkClick('3G')">3G</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button type="warning" @click="handleNetworkClick('4G')">4G</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item  name="3" disabled="form3.isTrackLight">
                        <template slot="title">
                            Color<span v-if="form3.color !== ''" class="color">: {{ form3.color }}</span>
                        </template>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button type="danger" @click="handleColorClick('Red')">Red</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button type="warning" @click="handleColorClick('Amber')">Amber</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button @click="handleColorClick('Clear')">Clear</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="Price" name="4">
                        <el-row>
                            <el-col :span="10" :offset="6">
                                <el-form ref="form" :model="form3" size="mini" align="right">
                                    <el-form-item label="Unit Price $">
                                        <el-input v-model="form3.price" style="width: 150px; "></el-input>
                                    </el-form-item>
                                    <el-form-item label="Quantity">
                                        <el-input-number
                                                v-model="form3.QTY"
                                                controls-position="right"
                                                :min="1"
                                                style="width: 150px">
                                        </el-input-number>
                                    </el-form-item>
                                    <el-form-item label="Service Plan $">
                                        <el-input v-model="form3.servicePlan" style="width: 150px"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                        <el-button type="primary" style="float: right">Add</el-button>
                    </el-collapse-item>
                </el-collapse>
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
        append: true,
        tableData: [{
        }],
        form3: {
          productName: '',
          activeName: '1',
          isTrackLight: false,
          network: '',
          color: '',
          QTY: '',
          price: '',
          servicePlan: '',
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
        this.form3.activeName = '1';
        this.form3.isTrackLight = false;
        this.form3.productName = '';
        this.form3.QTY = '';
        this.form3.price = '';
        this.form3.serviceFee = '';
        this.form3.network = '';
        this.form3.tax = 'Yes';
        this.$refs.form.resetFields();
      },
      handleCommand(command) {
        alert('clicked');
      },
      handleNext(number) {
        let tempNum = Number(this.form3.activeName);
        let nextNum = tempNum + number;
        this.form3.activeName = nextNum.toString();
      },
      handleSave() {
        this.$refs.confirmationForm.showDialog();
      },
      handleNameClick(num) {
        this.form3.productName = num;
        if (num !== '4" TrackLight (UT1611)' && num !== '6" TrackLight (UT1711)') {
          this.form3.isTrackLight = true;
          this.form3.network = '';
          this.form3.color = '';
          this.handleNext(3);
        } else {
          this.handleNext(1);
        }
      },
      handleNetworkClick(speed) {
        this.form3.network = speed;
        this.handleNext(1);
      },
      handleColorClick(color) {
        this.form3.color = color;
        this.handleNext(1);
      }
    },
  };
</script>


<style scoped>

</style>
