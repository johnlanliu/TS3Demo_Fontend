<template>
    <el-dialog
        :title="'Products'"
        :center="true"
        top="15vh"
        :visible.sync="isOpen"
        :append-to-body="append"
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
                                    <button type="button" class="containerButton" style="width: 180px; height: 120px"
                                            @click="handleNameClick('4&quot; TrackLight (VT1611)', 'VT1611')">
                                        <img src="./pic/Product/VT1611.png" alt="VT1611" class="image"/>
                                        <div class="overlay">4" TrackLight</div>
                                    </button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <button type="button" class="containerButton" style="width: 180px; height: 120px"
                                            @click="handleNameClick('6&quot; TrackLight (VT1711)', 'VT1711')">
                                        <img src="./pic/Product/VT1711.png" alt="VT1711" class="image"/>
                                        <div class="overlay">6" TrackLight</div>
                                    </button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <button type="button" class="containerButton" style="width: 180px; height: 120px"
                                            @click="handleNameClick('In Dash GPS (VT1508)', 'VT1508')">
                                        <img src="./pic/Product/VT1508.png" alt="VT1508" class="image"/>
                                        <div class="overlay">In Dash GPS</div>
                                    </button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <button type="button" class="containerButton" style="width: 180px; height: 120px"
                                            @click="handleNameClick('5&quot; ThermoTrack (VT1702)', 'VT1702')">
                                        <img src="./pic/Product/VT1702.png" alt="VT1702" class="image"/>
                                        <div class="overlay">5" ThermoTrack</div>
                                    </button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <button type="button" class="containerButton" style="width: 180px; height: 120px"
                                            @click="handleNameClick('6&quot; ThermoTrack (VT1802)', 'VT1802')">
                                        <img src="./pic/Product/VT1802.png" alt="VT802" class="image">
                                        <div class="overlay">6" ThermoTrack</div>
                                    </button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item  v-if="form3.isTrackLight && form3.namePicked" name="2" disabled="form3.isTrackLight">
                        <template slot="title">
                            {{ form3.network }}
                        </template>
                        <el-row>
                            <el-col :span="2" style="padding-left: 10px">
                                <el-form-item>
                                    <el-button type="warning" style="width: 50px" @click="handleNetworkClick('3G')">3G</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2" style="padding-left: 19px">
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
                                    <el-form-item label="Tax: ">
                                        <el-select v-model="form3.prodTax" placeholder="" style="width: 150px">
                                            <el-option
                                                v-for="option in taxOptions"
                                                :key="option.value"
                                                :label="option.label"
                                                :value="option.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item v-if="form3.accPicked">
                                        <el-form-item align="center" style="padding-right: 30px" label="Accessory: ">{{ form3.accName }}</el-form-item>
                                        <el-form-item label="Accessory Price: ">
                                            <el-input v-model="form3.accPrice" style="width: 150px;"></el-input>
                                        </el-form-item>
                                        <el-form-item label="Accessory QTY: ">
                                            <el-input-number
                                                    v-model="form3.accQty"
                                                    controls-position="right"
                                                    :min="1"
                                                    style="width: 150px">
                                            </el-input-number>
                                        </el-form-item>
                                        <el-form-item label="Accessory Tax: ">
                                            <el-select v-model="form3.accTax" placeholder="" style="width: 150px">
                                                <el-option
                                                        v-for="option in taxOptions"
                                                        :key="option.value"
                                                        :label="option.label"
                                                        :value="option.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-form-item>
                                    <el-form-item v-if="form3.planPicked">
                                        <el-form-item align="center" label="Service Plan: ">{{ form3.planName }}</el-form-item>
                                        <el-form-item label="Service Plan Price: ">
                                            <el-input v-model="form3.planAmt" style="width: 150px;"></el-input>
                                        </el-form-item>
                                        <el-form-item label="Service Plan QTY: ">
                                            <el-input-number
                                                    v-model="form3.planQty"
                                                    controls-position="right"
                                                    :min="1"
                                                    style="width: 150px">
                                            </el-input-number>
                                        </el-form-item>
                                    </el-form-item>
                                </el-form>
                                <el-row>
                                    <el-button type="primary" style="float: left" @click="handleAccessories">+ Add Accessories</el-button>
                                    <el-button type="primary" style="float: right" @click="handlePlan">+ Add Service Plan</el-button>
                                    <el-button type="primary" style="float: right; margin-top: 10px" @click="handleAddClick">Add</el-button>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>
            </el-form>
        </div>
        <accessory-detail-form ref="accessoryDetailForm" v-bind:product="this.form3.productName" @accessoryAdded="getAccessoryInfo"></accessory-detail-form>
        <service-plan-form ref="servicePlanForm" v-bind:prod-quantity="form3.QTY" @planAdded="getServicePlanFee"></service-plan-form>
    </el-dialog>
</template>

<script>
import ConfirmationForm from './ConfirmationForm.vue';
import AccessoryDetailForm from './AccessoryDetailForm.vue';
import ServicePlanForm from './ServicePlanForm.vue';

export default {
  name: 'ProductDetailForm',

  components: {
    ConfirmationForm,
    AccessoryDetailForm,
    ServicePlanForm
  },

  data: function() {
    return {
      loading: false,
      isOpen: false,
      append: true,

    /* RESET THESE */
      form3: {
        productName: 'Type',
        productCode: '',
        activeName: '1',
        isTrackLight: true,
        namePicked: false,
        networkPicked: false,
        showPrice: false,
        network: 'Network',
        color: 'Color',
        QTY: 1,
        price: '',
        accName: '',
        accPrice: '',
        accQty: 1,
        accTax: '',
        accPicked: false,
        planPicked: false,
        planQty: 1,
        planAmt: '',
        planName: '',
        servicePlan: '',
        prodTax: '',
      },
      taxOptions: [
        {
          value: 'Y',
          label: 'Y'
        },
        {
          value: 'N',
          label: 'N'
        }
      ]

    /* FORM RULES */
      // formRules: {
      //   price: [
      //         { required: true, message: 'Unit price is required' },
      //     {
      //       pattern: /^\d+(,\d{3})*(\.\d{1,2})?$/,
      //       message: 'Invalid price'
      //     },
      //   ],
      //   servicePlan: [
      //           { required: true, message: 'Service plan price is required' },
      //     {
      //       pattern: /^\d+(,\d{3})*(\.\d{1,2})?$/,
      //       message: 'Invalid price'
      //     },
      //   ],
      //   accPrice: [
      //           { required: true, message: 'Accessory price is required' },
      //     {
      //       pattern: /^\d+(,\d{3})*(\.\d{1,2})?$/,
      //       message: 'Invalid price'
      //     },
      //   ],
      // },
    };
  },

  methods: {
    /* AUXILIARY FUNCTIONS */
    showDialog() {
      this.isOpen = true;
    },
    resetFields() {
      this.form3.productName = 'Type';
      this.form3.productCode = '';
      this.form3.activeName = '1';
      this.form3.isTrackLight = true;
      this.form3.namePicked = false;
      this.form3.networkPicked = false;
      this.form3.showPrice = false;
      this.form3.network = 'Network';
      this.form3.color = 'Color';
      this.form3.QTY = 1;
      this.form3.price = '';
      this.form3.prodTax = '';
      this.form3.accName = '';
      this.form3.accPrice = '';
      this.form3.accQty = 1;
      this.form3.accTax = '';
      this.form3.accPicked = false;
      this.form3.planPicked = false;
      this.form3.planQty = 1;
      this.form3.planAmt = '';
      this.form3.planName = '';
      this.form3.servicePlan = '';
      this.$refs.form.resetFields();
    },

    /* HANDLER FUNCTIONS */
    handleNext(number) {
      let tempNum = Number(this.form3.activeName);
      let nextNum = tempNum + number;
      this.form3.activeName = nextNum.toString();
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
    handleNameClick(num, code) {
      if (this.form3.productName === 'Type') {
        this.form3.productName = num;
        this.form3.productCode = code;
        if (num !== '4" TrackLight (VT1611)' && num !== '6" TrackLight (VT1711)') {
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
        if (this.form3.productName !== '4" TrackLight (VT1611)' && this.form3.productName !== '6" TrackLight (VT1711)') {
          this.resetFields();
          this.form3.productName = num;
          this.form3.productCode = code;
          if (num !== '4" TrackLight (VT1611)' && num !== '6" TrackLight (VT1711)') {
            this.form3.showPrice = true;
            this.form3.isTrackLight = false;
            this.handleNext(3);
          } else {
            this.form3.namePicked = true;
            this.form3.isTrackLight = true;
            this.handleNext(1);
          }
        } else {
          if (num !== '4" TrackLight (VT1611)' && num !== '6" TrackLight (VT1711)') {
            this.form3.productName = num;
            this.form3.productCode = code;
            this.form3.showPrice = true;
            this.form3.isTrackLight = false;
            this.handleNext(3);
          } else {
            if (this.form3.productName === num) {
              this.handleNext(1);
            } else {
              this.form3.productName = num;
              this.form3.productCode = code;
              this.form3.price = '';
              this.form3.QTY = '';
              this.form3.servicePlan = '';
              this.handleNext(1);
            }
          }
        }
      }
    },
    handleAddClick(event) {
      let state = 0;
      if (this.form3.accPicked === true) {
        state += 1;
      }
      if (this.form3.planPicked === true) {
        state += 2;
      }

      if (state === 0) {
        this.$emit('productAdded', this.fullProductCode, this.form3.price, this.form3.QTY, this.form3.prodTax);
      }      else if (state === 1) {
        this.$emit('prodAndAccAdded', this.fullProductCode, this.form3.price, this.form3.QTY, this.form3.prodTax,
                  this.form3.accName, this.form3.accPrice, this.form3.accQty, this.form3.accTax);
      }      else if (state === 2) {
        this.$emit('prodAndPlanAdded', this.fullProductCode, this.form3.price, this.form3.QTY, this.form3.prodTax,
                  this.form3.planQty, this.form3.planAmt, this.form3.planName);
      }      else {
        this.$emit('allAdded', this.fullProductCode, this.form3.price,
                  this.form3.QTY, this.form3.prodTax, this.form3.accName, this.form3.accPrice, this.form3.accQty,
                  this.form3.accTax, this.form3.planQty, this.form3.planAmt, this.form3.planName);
      }
      this.isOpen = false;
    },

    /* HANDLERS TO SHOW PRODUCT FORMS */
    handleAccessories() {
      this.$refs.accessoryDetailForm.showDialog();
    },
    handlePlan() {
      this.$refs.servicePlanForm.showDialog();
    },

    /* GET ACCESSORIES, PRODUCTS, AND SERVICE PLANS FOR TABLE */
    getAccessoryInfo(n, p, q, r) {
      this.form3.accPicked = true;
      this.form3.accName = n;
      this.form3.accPrice = p;
      this.form3.accQty = q;
      this.form3.accTax = r;
    },
    getServicePlanFee(qty, amt, name) {
      this.form3.planPicked = true;
      this.form3.planQty = qty;
      this.form3.planAmt = amt;
      this.form3.planName = name;
      let price = qty * amt;
      this.form3.servicePlan = price.toString();
    },
  },

  computed: {
    fullProductCode: function() {
      if (this.form3.isTrackLight === true) {
        if (this.form3.showPrice) {
          return this.form3.productCode + ' '
              + this.form3.color.substring(0, 1)
              + this.form3.network.substring(0, 1)
              + '0-00';
        } else {
          return this.form3.productCode;
        }
      } else {
        return this.form3.productCode;
      }
    }
  }
};
</script>

<style scoped>
    .containerButton {
        position: relative;
        width: 50%;
        max-width: 300px;
    }

    .image {
        display: block;
        width: 50%;
        height: auto;
        /*transition: .5s ease;*/
        opacity: 1;
        padding-left: 45px;

    }

    .overlay {
        position: relative;
        bottom: 0;
        background: rgb(0, 0, 0);
        background: rgba(0, 0, 0, 0.5); /* Black see-through */
        color: #f1f1f1;
        width: 66%;
        /*transition: .5s ease;*/
        opacity:1;
        color: white;
        font-size: 15px;
        padding: 5px 30px 6px 31px;
        text-align: center;
    }


    .containerButton:hover .image {
        opacity: 0.75;
    }
    .containerButton:hover .overlay {
        opacity: 0.75;
    }

</style>
