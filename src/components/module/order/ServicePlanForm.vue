<template>
  <el-dialog
    :title="'Service Plan'"
    :center="true"
    top="15vh"
    :visible.sync="visible"
    :append-to-body="append"
  >
    <el-form ref="form" :model="form5" size="mini" style="text-align: center">
      <el-collapse v-model="form5.activeName" accordion>
        <el-collapse-item name="1">
          <template slot="title">{{ form5.product }}</template>
          <el-row>
            <el-col :span="8">
              <el-form-item>
                <el-button
                  type="primary"
                  style="width: 160px"
                  @click="handlePlanPick('One Month')"
                >1 Month</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button
                  type="primary"
                  style="width: 160px"
                  @click="handlePlanPick('Three Months')"
                >3 Month</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button
                  type="primary"
                  style="width: 160px"
                  @click="handlePlanPick('Six Months')"
                >6 Month (3% discount)</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button
                  type="primary"
                  style="width: 160px"
                  @click="handlePlanPick('One Year')"
                >1 Year (6% discount)</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button
                  type="primary"
                  style="width: 160px"
                  @click="handlePlanPick('Installation Fee')"
                >Installation Fee</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="Price" v-if="form5.showPrice" name="2">
          <el-row>
            <el-col :span="10" :offset="6">
              <el-form ref="form" :model="form5" size="mini" align="right">
                <el-form-item label="Amount $" prop="rate">
                  <el-input v-model="form5.rate" style="width: 150px; "></el-input>
                </el-form-item>
                <el-form-item label="Quantity">
                  <el-input-number
                    v-model="form5.quantity"
                    controls-position="right"
                    :min="1"
                    style="width: 150px"
                  ></el-input-number>
                </el-form-item>
                <el-row>
                  <el-col :span="3">
                    <el-form-item v-model="form5.amount" label="Total :"></el-form-item>
                  </el-col>
                  <el-col :span="4" :offset="17">
                    <el-form-item :total="total">${{ total }} </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <el-row>
                <el-button
                  type="primary"
                  style="float: right; margin-top: 10px"
                  @click="handleAddPlan"
                >Add</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'ServicePlanForm',

  data: function() {
    return {
      loading: false,
      append: true,
      /* RESET THESE */
      form5: {
        // activeName: '1',
        // product: 'Service Plan',
        // showPrice: false,
        // quantity: 0,
        // rate: ''
      }

      // formRules: {
      //   rate: [
      //             { required: true, message: 'Amount is required' },
      //     {
      //       pattern: /^\d+(,\d{3})*(\.\d{1,2})?$/,
      //       message: 'Invalid amount'
      //     },
      //   ],
      // },
    };
  },

  props: {
    value: Boolean,
    form: [Object]
  },

  watch: {
    prodQuantity(newValue, oldValue) {
      this.form5.quantity = newValue;
    },

    visible(val) {
      if(val) {
        this.$nextTick(() => this.$refs.form.clearValidate());
      } else {
        this.form5 = {};
      }
    }
  },

  methods: {
    /* AUXILIARY FUNCTIONS */
    // resetFields() {
    //   this.form5.showPrice = false;
    //   this.form5.rate = '';
    //   this.form5.quantity = this.prodQuantity;
    //   this.form5.activeName = '1';
    //   this.form5.product = 'Service Plan';
    //   this.$refs.form.resetFields();
    // },

    /* HANDLER FUNCTIONS */
    handlePlanPick(duration) {
      // if (this.form5.product === 'Service Plan') {
      //   this.form5.product = duration + ' ' + 'Service Plan';
      //   this.form5.showPrice = true;
      //   this.handleNext(1);
      // } else {
      //   if (this.form5.product === duration + ' ' + 'Service Plan') {
      //     this.handleNext(1);
      //   } else {
      //     this.resetFields();
      //     this.form5.product = duration + ' ' + 'Service Plan';
      //     this.form5.showPrice = true;
      //     this.handleNext(1);
      //   }
      // }
      this.form5.product = duration + ' ' + 'Service Plan';
      this.form5.showPrice = true;
      this.handleNext(1);
    },
    handleNext(number) {
      let tempNum = Number(this.form5.activeName);
      let nextNum = tempNum + number;
      this.form5.activeName = nextNum.toString();
    },
    handleAddPlan(event) {
      this.form5.amount = this.total;
      this.$emit(
        'planAdded',
        // this.form5.quantity,
        // this.form5.rate,
        // this.form5.product
        this.form5
      );
      this.visible = false;
    }
  },

  computed: {
    total: function() {
      if(this.form5.rate !== null && this.form5.quantity !== null) {
        if(!isNaN(this.form5.rate) && !isNaN(this.form5.quantity)) {
          return (Number(this.form5.rate) * this.form5.quantity).toFixed(2);
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
</style>
