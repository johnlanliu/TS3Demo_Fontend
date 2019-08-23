<template>
  <el-dialog
    :title="'Products'"
    :center="true"
    top="15vh"
    :visible.sync="visible"
    :append-to-body="append"
    @close="clearValidate"
  >
    <div class="product code">
      <el-form ref="form" :model="form" size="mini" style="text-align: center">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item name="1">
            <template slot="title">{{ form.product }}</template>
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
                <el-form-item label="Unit Price $">
                  <el-input v-model="form.rate" style="width: 150px; "></el-input>
                </el-form-item>
                <el-form-item label="Quantity">
                  <el-input-number
                    v-model="form.quantity"
                    controls-position="right"
                    :min="1"
                    style="width: 150px"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="Tax: ">
                  <el-select v-model="form.tax" placeholder style="width: 80px">
                    <el-option
                      v-for="option in taxOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    ></el-option>
                  </el-select>
                  <el-input
                    v-if="form.tax === 'Y'"
                    v-model="taxRate"
                    :min="1"
                    style="width: 120px"
                  ></el-input>{{ form.tax === 'Y' ? '%' : ''}}
                </el-form-item>
                <el-row>
                  <el-col :span="3">
                    <el-form-item v-model="form.amount" label="Total :"></el-form-item>
                  </el-col>
                  <el-col :span="4" :offset="17">
                    <el-form-item :total="total">${{ total }}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col style="margin-top:10px">
                    <el-button type="primary" @click="handleAddClick">Add</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ProductDetailForm',

  components: {},

  props: {
    value: Boolean
  },

  data: function() {
    return {
      // namePicked: false,
      // isTrackLight: true,
      // showPrice: false,
      activeName: '1',
      send: {},
      form: {},
      orderItems: [],
      loading: false,
      append: true,
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
      ],
      taxRate: '7.75'

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

  computed: {
    total: function() {
      if (
        this.form.rate === null ||
        this.form.quantity === null ||
        isNaN(this.form.rate) ||
        isNaN(this.form.quantity)
      ) {
        return 0;
      } else {
        if (this.form.tax === 'Y') {
          return (
            this.form.rate *
            Number(this.form.quantity) *
            (1 + Number(this.taxRate) / 100)
          ).toFixed(2);
        } else {
          return (this.form.rate * Number(this.form.quantity)).toFixed(2);
        }
      }
    },

    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },

  created() {
  },

  methods: {
    /* AUXILIARY FUNCTIONS */
    clearValidate() {
      this.visible = false;
      this.form = {};
      this.$refs.form.clearValidate();
    },
    /* HANDLER FUNCTIONS */
    handleNext(number) {
      let tempNum = Number(this.activeName);
      let nextNum = tempNum + number;
      this.activeName = nextNum.toString();
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
      this.form.product = num;
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
    },

    handleAddClick(event) {
      // this.getTax();
      if(this.form.tax === 'Y') {
        this.form.tax = (this.form.rate * Number(this.form.quantity) * Number(this.taxRate) / 100).toFixed(2);
      }
      this.$emit('productAdded',{
        product: this.form.product,
        quantity: this.form.quantity,
        rate: this.form.rate,
        amount: this.total,
        tax: this.tax
      });
      this.visible = false;
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
