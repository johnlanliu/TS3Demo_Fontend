<template>
  <el-dialog
    :title="'Accessories'"
    :center="true"
    top="15vh"
    :visible.sync="visible"
    :append-to-body="append"
  >
    <div class="accessoryCode">
      <el-form ref="form" :model="form" size="mini" style="text-align: center">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item name="1">
            <template slot="title">{{ form.product }}</template>
            <el-row>
              <el-col v-if="shown === 0 || shown === 1" :span="6">
                <el-form-item>
                  <button
                    class="containerButton"
                    style="width: 150px; height: 120px"
                    type="button"
                    @click="handleNameClick('LA17011')"
                  >
                    <img src="./pic/Accessories/LA17011.png" alt="LA17011" class="image">
                    <div class="overlay">TrackLight 3PL Adapter Cable</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col v-if="shown === 0 || shown === 1" :span="6">
                <el-form-item>
                  <button
                    class="containerButton"
                    style="width: 150px; height: 120px"
                    type="button"
                    @click="handleNameClick('LA17021')"
                  >
                    <img src="./pic/Accessories/la17021.png" alt="la17021" class="image">
                    <div class="overlay">TrackLight Grote Adapter Cable</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col v-if="shown === 0 || shown === 1" :span="6">
                <el-form-item>
                  <button
                    class="containerButton"
                    style="width: 150px; height: 120px"
                    type="button"
                    @click="handleNameClick('LA16111')"
                  >
                    <img src="./pic/Accessories/LA16111.png" alt="LA1611" class="image">
                    <div class="overlay">TrackLight Hardshell Pigtail</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col v-if="shown === 0 || shown === 1" :span="6">
                <el-form-item>
                  <button
                    class="containerButton"
                    style="width: 150px; height: 120px"
                    type="button"
                    @click="handleNameClick('LA17031')"
                  >
                    <img src="./pic/Accessories/la17031.png" alt="la17031" class="image">
                    <div class="overlay">Perma-Lok Retaining Ring</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col v-if="shown === 0 || shown === 1" :span="6">
                <el-form-item>
                  <button
                    class="containerButton"
                    style="width: 150px; height: 120px"
                    type="button"
                    @click="handleNameClick('LA17041')"
                  >
                    <img src="./pic/Accessories/LA17041.png" alt="LA17041" class="image">
                    <div class="overlay">Metal Ring for Perma-Lok</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col v-if="shown === 0 || shown === 1" :span="6">
                <el-form-item>
                  <button
                    class="containerButton"
                    style="width: 150px; height: 120px"
                    type="button"
                    @click="handleNameClick('LA17081')"
                  >
                    <img src="./pic/Accessories/LA17081.png" alt="LA17081" class="image">
                    <div class="overlay">Plastic Retaining Flange</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col v-if="shown === 0 || shown === 1" :span="6">
                <el-form-item>
                  <button
                    class="containerButton"
                    style="width: 150px; height: 120px"
                    type="button"
                    @click="handleNameClick('LA17051')"
                  >
                    <img src="./pic/Accessories/LA17051.png" alt="LA17051" class="image">
                    <div class="overlay">Test Cable</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col v-if="shown === 0 || shown === 1" :span="6">
                <el-form-item>
                  <button
                    class="containerButton"
                    style="width: 150px; height: 120px"
                    type="button"
                    @click="handleNameClick('LA16121 R00')"
                  >
                    <img src="./pic/Accessories/LA16121_R00.png" alt="LA16121 R00" class="image">
                    <div class="overlay">Decoy 4" Round Red Lens</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col v-if="shown === 0 || shown === 1" :span="6">
                <el-form-item>
                  <button
                    class="containerButton"
                    style="width: 150px; height: 120px"
                    type="button"
                    @click="handleNameClick('LA16121 C00')"
                  >
                    <img src="./pic/Accessories/LA16121_C00.png" alt="LA16121 C00" class="image">
                    <div class="overlay">Decoy 4" Round Clear Lens</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col v-if="shown === 0 || shown === 1" :span="6">
                <el-form-item>
                  <button
                    class="containerButton"
                    style="width: 150px; height: 120px"
                    type="button"
                    @click="handleNameClick('LA17121 R00')"
                  >
                    <img src="./pic/Accessories/LA17121_R00.png" alt="LA17121 R00" class="image">
                    <div class="overlay">Decoy 6" Oval Red Lens</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col v-if="shown === 0 || shown === 1" :span="6">
                <el-form-item>
                  <button
                    class="containerButton"
                    style="width: 150px; height: 120px"
                    type="button"
                    @click="handleNameClick('LA17121 A00')"
                  >
                    <img src="./pic/Accessories/LA17121_A00.png" alt="LA17121 A00" class="image">
                    <div class="overlay">Decoy 6" Oval Amber Lens</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col v-if="shown === 0 || shown === 1" :span="6">
                <el-form-item>
                  <button
                    class="containerButton"
                    style="width: 150px; height: 120px"
                    type="button"
                    @click="handleNameClick('LA17121 C00')"
                  >
                    <img src="./pic/Accessories/LA17121_C00.png" alt="LA17121 C00" class="image">
                    <div class="overlay">Decoy 6" Oval Clear Lens</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col v-if="shown === 0 || shown === 2" :span="6">
                <el-form-item>
                  <button
                    class="containerButton"
                    style="width: 150px; height: 120px"
                    type="button"
                    @click="handleNameClick('BP17021')"
                  >
                    <img src="./pic/Accessories/BP17021.png" alt="BP17021" class="image">
                    <div class="overlay">Battery Pack 7.2V 6000mAH</div>
                  </button>
                </el-form-item>
              </el-col>
              <el-col v-if="shown === 0 || shown === 2" :span="6">
                <el-form-item>
                  <button
                    class="containerButton"
                    style="width: 150px; height: 120px"
                    type="button"
                    @click="handleNameClick('BP18021')"
                  >
                    <img src="./pic/Accessories/BP18021.png" alt="BP18021" class="image">
                    <div class="overlay">Battery Pack 3.7V 9000mAH</div>
                  </button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="Price" v-if="showPrice" name="2">
            <el-row>
              <el-col :span="10" :offset="6">
                <el-form ref="form" :model="form" :rules="formRules" size="mini" align="right">
                  <el-form-item label="Unit Price $" prop="rate">
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
                    <el-select v-model="form.tax" placeholder style="width: 150px">
                      <el-option
                        v-for="option in taxOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-row>
                    <el-col :span="3">
                      <el-form-item v-model="form.amount" label="Total :"></el-form-item>
                    </el-col>
                    <el-col :span="4" :offset="17">
                      <el-form-item :total="total">${{ total }} </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-row>
                  <el-button type="primary" style="float: right" @click="handleAddClick()">Add</el-button>
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
  name: 'AccessoryDetailForm',

  data: function() {
    return {
      showPrice: false,
      activeName: '1',
      loading: false,
      append: true,

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
      tax1: 0.3,
      formRules: {},
      /* FORM RULES */
      // formRules: {
      //   rate: [
      //         { required: true, message: 'Unit price is required' },
      //     {
      //       pattern: /^\d+(,\d{3})*(\.\d{1,2})?$/,
      //       message: 'Invalid price'
      //     },
      //   ],
      // },
    };
  },

  props: {
    value: Boolean,
    form: [Object],
  },

  methods: {
    /* AUXILIARY FUNCTIONS */

    /* HANDLER FUNCTIONS */
    async handleNext(number) {
        let tempNum = Number(this.activeName);
        let nextNum = tempNum + number;
        this.activeName = nextNum.toString();
    },
    async handleNameClick(num) {
      this.form.product = num;
      this.showPrice = true;
      this.handleNext(1);
    },
    handleAddClick(event) {
      this.$emit(
        'accessoryAdded',
        {
          product: this.form.product,
          quantity: this.form.quantity,
          rate: this.form.rate,
          tax: this.form.tax,
          amount: this.total
        }
      );
      this.visible = false;
    }
  },

  computed: {
    shown: function() {
      if (
        this.product === '4" TrackLight (VT1611)' ||
        this.product === '6" TrackLight (VT1711)'
      ) {
        return 1;
      } else if (
        this.product === 'In Dash GPS (VT1508)' ||
        this.product === '5" ThermoTrack (VT1702)' ||
        this.product === '6" ThermoTrack (VT1802)'
      ) {
        return 2;
      } else {
        return 0;
      }
    },
    total: function() {
      if(this.form.rate !== null && this.form.quantity !== null) {
        if (!isNaN(this.form.rate) && !isNaN(this.form.quantity)) {
          if(this.form.tax === 'Y'){
            return (this.form.rate * Number(this.form.quantity) * (1 + this.tax1)).toFixed(2);
          } else {
            return (this.form.rate * Number(this.form.quantity)).toFixed(2);
          }
        } else {
          return 0;
        }
      } else {
        return 0;
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
  padding-left: 38px;
}

.overlay {
  position: relative;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.5); /* Black see-through */
  color: #f1f1f1;
  width: 59%;
  height: 29%;
  /*transition: .5s ease;*/
  opacity: 1;
  color: white;
  font-size: 10.93px;
  padding: 5px 30px 5px 31px;
  text-align: center;
}

.containerButton:hover .image {
  opacity: 0.75;
}
.containerButton:hover .overlay {
  opacity: 0.75;
}
</style>
