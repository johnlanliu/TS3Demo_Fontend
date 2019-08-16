<template>
  <el-dialog
    :title="'Products'"
    :center="true"
    top="15vh"
    :visible.sync="visible"
    :append-to-body="append"
  >
    <div class="product code">
      <el-form ref="form" :model="form" size="mini" style="text-align: center">
        <el-collapse v-model="form.activeName" accordion>
          <el-collapse-item name="1">
            <template slot="title">{{ form.prodName }}</template>
            <el-row>
              <el-col :span="8">
                <el-form-item>
                  <button
                    type="button"
                    class="containerButton"
                    style="width: 180px; height: 120px"
                    @click="handleNameClick('4&quot; TrackLight (VT1611)', 'VT1611')"
                  >
                    <img src="./pic/Product/VT1611.png" alt="VT1611" class="image">
                    <div class="overlay">4" TrackLight</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <button
                    type="button"
                    class="containerButton"
                    style="width: 180px; height: 120px"
                    @click="handleNameClick('6&quot; TrackLight (VT1711)', 'VT1711')"
                  >
                    <img src="./pic/Product/VT1711.png" alt="VT1711" class="image">
                    <div class="overlay">6" TrackLight</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <button
                    type="button"
                    class="containerButton"
                    style="width: 180px; height: 120px"
                    @click="handleNameClick('In Dash GPS (VT1508)', 'VT1508')"
                  >
                    <img src="./pic/Product/VT1508.png" alt="VT1508" class="image">
                    <div class="overlay">In Dash GPS</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <button
                    type="button"
                    class="containerButton"
                    style="width: 180px; height: 120px"
                    @click="handleNameClick('5&quot; ThermoTrack (VT1702)', 'VT1702')"
                  >
                    <img src="./pic/Product/VT1702.png" alt="VT1702" class="image">
                    <div class="overlay">5" ThermoTrack</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <button
                    type="button"
                    class="containerButton"
                    style="width: 180px; height: 120px"
                    @click="handleNameClick('6&quot; ThermoTrack (VT1802)', 'VT1802')"
                  >
                    <img src="./pic/Product/VT1802.png" alt="VT802" class="image">
                    <div class="overlay">6" ThermoTrack</div>
                  </button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item
            v-if="form.isTrackLight && form.namePicked"
            name="2"
            disabled="form.isTrackLight"
          >
            <template slot="title">{{ form.network }}</template>
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
          <el-collapse-item
            v-if="form.isTrackLight && form.networkPicked"
            name="3"
            disabled="form.isTrackLight"
          >
            <template slot="title">{{ form.color }}</template>
            <el-row>
              <el-col :span="3">
                <el-form-item>
                  <el-button type="danger" style="width: 70px" @click="handleColorClick('Red')">Red</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item>
                  <el-button
                    type="warning"
                    style="width: 70px"
                    @click="handleColorClick('Amber')"
                  >Amber</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item>
                  <el-button style="width: 70px" @click="handleColorClick('Clear')">Clear</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="Price" v-if="form.showPrice" name="4">
            <el-row>
              <el-col :span="10" :offset="6">
                <el-form ref="form" :model="form" size="mini" align="right">
                  <el-form-item label="Unit Price $">
                    <el-input v-model="form.prodRate" style="width: 150px; "></el-input>
                  </el-form-item>
                  <el-form-item label="Quantity">
                    <el-input-number
                      v-model="form.prodQuantity"
                      controls-position="right"
                      :min="1"
                      style="width: 150px"
                    ></el-input-number>
                  </el-form-item>
                  <el-form-item label="Tax: ">
                    <el-select v-model="form.prodTax" placeholder style="width: 150px">
                      <el-option
                        v-for="option in taxOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item v-if="form.accPicked">
                    <el-form-item
                      align="center"
                      style="padding-right: 30px"
                      label="Accessory: "
                    >{{ form.accName }}</el-form-item>
                    <el-form-item label="Accessory Price: ">
                      <el-input v-model="form.acRate" style="width: 150px;"></el-input>
                    </el-form-item>
                    <el-form-item label="Accessory QTY: ">
                      <el-input-number
                        v-model="form.accQuantity"
                        controls-position="right"
                        :min="1"
                        style="width: 150px"
                      ></el-input-number>
                    </el-form-item>
                    <el-form-item label="Accessory Tax: ">
                      <el-select v-model="form.accTax" placeholder style="width: 150px">
                        <el-option
                          v-for="option in taxOptions"
                          :key="option.value"
                          :label="option.label"
                          :value="option.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item v-if="form.planPicked">
                    <el-form-item align="center" label="Service Plan: ">{{ form.planName }}</el-form-item>
                    <el-form-item label="Service Plan Price: ">
                      <el-input v-model="form.planAmt" style="width: 150px;"></el-input>
                    </el-form-item>
                    <el-form-item label="Service Plan QTY: ">
                      <el-input-number
                        v-model="form.planQuantity"
                        controls-position="right"
                        :min="1"
                        style="width: 150px"
                      ></el-input-number>
                    </el-form-item>
                  </el-form-item>
                </el-form>
                <el-row>
                  <el-col :span="9">
                    <el-button
                      type="primary"
                      @click="handleAccessories"
                    >+ Add Accessories</el-button>
                    </el-col>
                  <el-col :span="9" :offset="3" :push="3">
                    <el-button
                      style="margin-left:-14px;"
                      type="primary"
                      @click="handlePlan"
                    >+ Add Service Plan</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col style="margin-top:10px">
                    <el-button
                      type="primary"
                      @click="handleAddClick"
                    >Add</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
    <accessory-detail-form
      ref="accessoryDetailForm"
      v-model="accessoryDetailFormVisible"
      :product="this.form.prodName"
      @accessoryAdded="getAccessoryInfo"
    ></accessory-detail-form>
    <service-plan-form
      ref="servicePlanForm"
      v-model="servicePlanFormVisible"
      :prod-quantity="form.QTY"
      @planAdded="getServicePlanFee"
    ></service-plan-form>
    <comfirmation-form
     :form="form"
     v-model="comfirmationFormVisible">
    </comfirmation-form>
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

  props: {
    value: Boolean,
    form: [Object],
  },

  data: function() {
    return {
      loading: false,
      append: true,
      form: {},
      accessoryDetailFormVisible: false,
      servicePlanFormVisible: false,
      comfirmationFormVisible: false,
      /* RESET THESE */
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
      //   acRate: [
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
    // resetFields() {
    //   this.form.prodName = 'Type';
    //   this.form.productCode = '';
    //   this.form.activeName = '1';
    //   this.form.isTrackLight = true;
    //   this.form.namePicked = false;
    //   this.form.networkPicked = false;
    //   this.form.showPrice = false;
    //   this.form.network = 'Network';
    //   this.form.color = 'Color';
    //   this.form.QTY = 1;
    //   this.form.price = '';
    //   this.form.prodTax = '';
    //   this.form.accName = '';
    //   this.form.acRate = '';
    //   this.form.accQuantity = 1;
    //   this.form.accTax = '';
    //   this.form.accPicked = false;
    //   this.form.planPicked = false;
    //   this.form.planQuantity = 1;
    //   this.form.planAmt = '';
    //   this.form.planName = '';
    //   this.form.servicePlan = '';
    //   this.$refs.form.resetFields();
    // },

    /* HANDLER FUNCTIONS */
    handleNext(number) {
      let tempNum = Number(this.form.activeName);
      let nextNum = tempNum + number;
      this.form.activeName = nextNum.toString();
    },
    handleNetworkClick(speed) {
      this.form.network = speed;
      this.form.networkPicked = true;
      this.handleNext(1);
    },
    handleColorClick(color) {
      this.form.color = color;
      this.form.showPrice = true;
      this.handleNext(1);
    },
    handleNameClick(num, code) {
      if (this.form.prodName === 'Type') {
        this.form.prodName = num;
        this.form.productCode = code;
        if (
          num !== '4" TrackLight (VT1611)' &&
          num !== '6" TrackLight (VT1711)'
        ) {
          this.form.showPrice = true;
          this.form.isTrackLight = false;
          this.form.network = '';
          this.form.color = '';
          this.handleNext(3);
        } else {
          this.form.namePicked = true;
          this.form.isTrackLight = true;
          this.form.network = 'Network';
          this.form.color = 'Color';
          this.handleNext(1);
        }
      } else {
        if (
          this.form.prodName !== '4" TrackLight (VT1611)' &&
          this.form.prodName !== '6" TrackLight (VT1711)'
        ) {
          // this.resetFields();
          this.form.prodName = num;
          this.form.productCode = code;
          if (
            num !== '4" TrackLight (VT1611)' &&
            num !== '6" TrackLight (VT1711)'
          ) {
            this.form.showPrice = true;
            this.form.isTrackLight = false;
            this.handleNext(3);
          } else {
            this.form.namePicked = true;
            this.form.isTrackLight = true;
            this.handleNext(1);
          }
        } else {
          if (
            num !== '4" TrackLight (VT1611)' &&
            num !== '6" TrackLight (VT1711)'
          ) {
            this.form.prodName = num;
            this.form.productCode = code;
            this.form.showPrice = true;
            this.form.isTrackLight = false;
            this.handleNext(3);
          } else {
            if (this.form.prodName === num) {
              this.handleNext(1);
            } else {
              this.form.prodName = num;
              this.form.productCode = code;
              this.form.price = '';
              this.form.QTY = '';
              this.form.servicePlan = '';
              this.handleNext(1);
            }
          }
        }
      }
    },
    handleAddClick(event) {
      const product = [];
      const rate = [];
      const quantity = [];
      const tax = [];
      product.push(this.form.prodName,this.form.accName,this.form.planName);
      rate.push(this.form.prodRate,this.form.accRate);
      quantity.push(this.form.prodQuantity,this.form.accQuantity,this.form.planQuantity);
      tax.push(this.form.prodTax,this.form.accTax);

      this.$emit('productAdded',
      {
        fullProductCode: this.fullProductCode,
        product: product,
        rete: rate,
        quantity: quantity,
        tax: tax,
        planAmt: this.form.planAmt,
        product: this.form.prodName,
        rate: this.form.prodRate,
        quantity: this.form.prodQuantity,
        tax: this.form.prodTax
      }
      )
      
      // let state = 0;
      // if (this.form.accPicked === true) {
      //   state += 1;
      // }
      // if (this.form.planPicked === true) {
      //   state += 2;
      // }

      // if (state === 0) {
      //   this.$emit(
      //     'productAdded',
      //     this.fullProductCode,
      //     this.form.price,
      //     this.form.QTY,
      //     this.form.prodTax
      //   );
      // } else if (state === 1) {
      //   this.$emit(
      //     'prodAndAccAdded',
      //     this.fullProductCode,
      //     this.form.price,
      //     this.form.QTY,
      //     this.form.prodTax,
      //     this.form.accName,
      //     this.form.acRate,
      //     this.form.accQuantity,
      //     this.form.accTax
      //   );
      // } else if (state === 2) {
      //   this.$emit(
      //     'prodAndPlanAdded',
      //     this.fullProductCode,
      //     this.form.price,
      //     this.form.QTY,
      //     this.form.prodTax,
      //     this.form.planQuantity,
      //     this.form.planAmt,
      //     this.form.planName
      //   );
      // } else {
      //   this.$emit(
      //     'allAdded',
      //     this.fullProductCode,
      //     this.form.price,
      //     this.form.QTY,
      //     this.form.prodTax,
      //     this.form.accName,
      //     this.form.acRate,
      //     this.form.accQuantity,
      //     this.form.accTax,
      //     this.form.planQuantity,
      //     this.form.planAmt,
      //     this.form.planName
      //   );
      // }
      this.visible = false;
    },

    /* HANDLERS TO SHOW PRODUCT FORMS */
    handleAccessories() {
      this.accessoryDetailFormVisible = true;
    },
    handlePlan() {
      this.servicePlanFormVisible = true;
    },
    handleComfirmaton() {
      this.comfirmationFormVisible = true;
    },

    /* GET ACCESSORIES, PRODUCTS, AND SERVICE PLANS FOR TABLE */
    getAccessoryInfo(value) {
      this.form = Object.assign({}, this.form, value);
    },
    getServicePlanFee(value) {
      this.form = Object.assign({}, this.form, value);
    }
  },

  computed: {
    fullProductCode: function() {
      if (this.form.isTrackLight === true) {
        if (this.form.showPrice) {
          return (
            this.form.productCode +
            ' ' +
            this.form.color.substring(0, 1) +
            this.form.network.substring(0, 1) +
            '0-00'
          );
        } else {
          return this.form.productCode;
        }
      } else {
        return this.form.productCode;
      }
    },
    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
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
  opacity: 1;
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
