<template>
  <el-dialog
    :title="'Service Plan'"
    :center="true"
    top="15vh"
    :visible.sync="visible"
    :append-to-body="append"
  >
    <el-form ref="form" :model="form" size="mini" style="text-align: center">
      <el-collapse v-model="form.activeName" accordion>
        <el-collapse-item name="1">
          <template slot="title">{{ form.planName }}</template>
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
        <el-collapse-item title="Price" v-if="form.showPrice" name="2">
          <el-row>
            <el-col :span="10" :offset="6">
              <el-form ref="form" :model="form" size="mini" align="right">
                <el-form-item label="Amount $" prop="planRate">
                  <el-input v-model="form.planRate" style="width: 150px; "></el-input>
                </el-form-item>
                <el-form-item label="Quantity">
                  <el-input-number
                    v-model="form.planQuantity"
                    controls-position="right"
                    :min="1"
                    style="width: 150px"
                  ></el-input-number>
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
      form: {
        // activeName: '1',
        // planName: 'Service Plan',
        // showPrice: false,
        // planQuantity: 0,
        // planRate: ''
      }

      // formRules: {
      //   planRate: [
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
      this.form.planQuantity = newValue;
    },
  },

  methods: {
    /* AUXILIARY FUNCTIONS */
    // resetFields() {
    //   this.form.showPrice = false;
    //   this.form.planRate = '';
    //   this.form.planQuantity = this.prodQuantity;
    //   this.form.activeName = '1';
    //   this.form.planName = 'Service Plan';
    //   this.$refs.form.resetFields();
    // },

    /* HANDLER FUNCTIONS */
    handlePlanPick(duration) {
      // if (this.form.planName === 'Service Plan') {
      //   this.form.planName = duration + ' ' + 'Service Plan';
      //   this.form.showPrice = true;
      //   this.handleNext(1);
      // } else {
      //   if (this.form.planName === duration + ' ' + 'Service Plan') {
      //     this.handleNext(1);
      //   } else {
      //     this.resetFields();
      //     this.form.planName = duration + ' ' + 'Service Plan';
      //     this.form.showPrice = true;
      //     this.handleNext(1);
      //   }
      // }
      this.form.planName = duration + ' ' + 'Service Plan';
      this.form.showPrice = true;
      this.handleNext(1);
    },
    handleNext(number) {
      let tempNum = Number(this.form.activeName);
      let nextNum = tempNum + number;
      this.form.activeName = nextNum.toString();
    },
    handleAddPlan(event) {
      this.form.amount = this.total;
      this.$emit(
        'planAdded',
        {
          product: this.form.planName,
          rate: this.form.planRate,
          quantity: this.form.planQuantity,
          amount: this.form.amount
        }
      );
      this.visible = false;
    }
  },

  computed: {
    total: function() {
      if(this.form.planRate !== null && this.form.planQuantity !== null) {
        if(!isNaN(this.form.planRate) && !isNaN(this.form.planQuantity)) {
          return (Number(this.form.planRate) * this.form.planQuantity).toFixed(2);
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
