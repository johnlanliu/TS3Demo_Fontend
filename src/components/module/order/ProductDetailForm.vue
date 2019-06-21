<template>
    <el-dialog
        :title="'Products'"
        :center="true"
        top="15vh"
        :visible.sync="isOpen"
        append-to-body="append"
        @close="resetFields">
        <div class="product code">
            <el-form ref="form" :model="form3" size="mini" style="text-align: center">
                <el-collapse v-model="form3.activeName" accordion>
                    <el-collapse-item  name="1">
                        <template slot="title">
                            {{ form3.productName }}
                        </template>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button type="primary" style="width: 120px" @click="handleNameClick('4&quot; TrackLight (UT1611)')">4" TrackLight</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button type="primary" style="width: 120px" @click="handleNameClick('6&quot; TrackLight (UT1711)')">6" TrackLight</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button type="primary" style="width: 120px" @click="handleNameClick('In Dash GPS (UT1508)')">In Dash GPS</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button type="primary" style="width: 120px" @click="handleNameClick('5&quot; ThermoTrack (UT1702)')">5" ThermoTrack</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button type="primary" style="width: 120px" @click="handleNameClick('6&quot; ThermoTrack (UT1802)')">6" ThermoTrack</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item  v-if="form3.isTrackLight && form3.namePicked" name="2" disabled="form3.isTrackLight">
                        <template slot="title">
                            {{ form3.network }}
                        </template>
                        <el-row>
                            <el-col :span="2">
                                <el-form-item>
                                    <el-button type="warning" style="width: 50px" @click="handleNetworkClick('3G')">3G</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item>
                                    <el-button type="warning" style="width: 50px" @click="handleNetworkClick('4G')">4G</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item  v-if="form3.isTrackLight && form3.networkPicked" name="3" disabled="form3.isTrackLight" >
                        <template slot="title">
                            {{ form3.color }}
                        </template>
                        <el-row>
                            <el-col :span="3">
                                <el-form-item>
                                    <el-button type="danger" style="width: 70px" @click="handleColorClick('Red')">Red</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item>
                                    <el-button type="warning" style="width: 70px" @click="handleColorClick('Amber')">Amber</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item>
                                    <el-button style="width: 70px" @click="handleColorClick('Clear')">Clear</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="Price" v-if="form3.showPrice" name="4">
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
                                <el-row>
                                    <el-button type="primary" style="float: left" @click="handleAccessories()">+ Add Accessories</el-button>
                                    <el-button type="primary" style="float: right">Add</el-button>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>
            </el-form>
        </div>
        <accessory-detail-form ref="accessoryDetailForm" v-bind:product="this.form3.productName"></accessory-detail-form>
    </el-dialog>
</template>

<script>
import ConfirmationForm from './ConfirmationForm.vue';
import AccessoryDetailForm from './AccessoryDetailForm.vue';

export default {
  name: 'ProductDetailForm',
  productCodeData: [],
  components: {
    ConfirmationForm,
    AccessoryDetailForm,
  },
  data: function() {
    return {
      loading: false,
      isOpen: false,
      append: true,
      tableData: [{
      }],
      form3: {
        productName: 'Type',
        activeName: '1',
        isTrackLight: true,
        namePicked: false,
        networkPicked: false,
        showPrice: false,
        network: 'Network',
        color: 'Color',
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
      this.form3.isTrackLight = true;
      this.form3.productName = 'Type';
      this.form3.QTY = '';
      this.form3.price = '';
      this.form3.servicePlan = '';
      this.form3.network = 'Network';
      this.form3.color = 'Color';
      this.form3.tax = 'Yes';
      this.form3.namePicked = false;
      this.form3.networkPicked = false;
      this.form3.showPrice = false;
      this.$refs.form.resetFields();
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
      if (this.form3.productName === 'Type') {
        this.form3.productName = num;
        if (num !== '4" TrackLight (UT1611)' && num !== '6" TrackLight (UT1711)') {
          this.form3.showPrice = true;
          this.form3.isTrackLight = false;
          this.form3.network = '';
          this.form3.color = '';
          this.handleNext(3);
        } else {
          this.form3.namePicked = true;
          this.form3.isTrackLight = true;
          this.form3.network = 'Network';
          this.form3.color = 'Color';
          this.handleNext(1);
        }
      } else {
        if (this.form3.productName !== '4" TrackLight (UT1611)' && this.form3.productName !== '6" TrackLight (UT1711)') {
          this.resetFields();
          this.form3.productName = num;
          if (num !== '4" TrackLight (UT1611)' && num !== '6" TrackLight (UT1711)') {
            this.form3.showPrice = true;
            this.form3.isTrackLight = false;
            this.handleNext(3);
          } else {
            this.form3.namePicked = true;
            this.form3.isTrackLight = true;
            this.handleNext(1);
          }
        } else {
          if (num !== '4" TrackLight (UT1611)' && num !== '6" TrackLight (UT1711)') {
            this.resetFields();
            this.form3.productName = num;
            this.form3.showPrice = true;
            this.form3.isTrackLight = false;
            this.handleNext(3);
          } else {
            if (this.form3.productName === num) {
              this.handleNext(1);
            } else {
              this.form3.productName = num;
              this.form3.price = '';
              this.form3.QTY = '';
              this.form3.servicePlan = '';
            }
          }
        }
      }
    },
    handleNetworkClick(speed) {
      this.form3.network = speed;
      this.form3.networkPicked = true;
      this.handleNext(1);
    },
    handleColorClick(color) {
      this.form3.color = color;
      this.form3.showPrice = true;
      this.handleNext(1);
    },
    handleAccessories() {
      this.$refs.accessoryDetailForm.showDialog();
    }
  },
};
</script>


<style scoped>

</style>
