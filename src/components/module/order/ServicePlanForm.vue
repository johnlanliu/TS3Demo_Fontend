<template>
  <el-dialog
    :title="'Service Plan'"
    :center="true"
    top="15vh"
    :visible.sync="visible"
    :append-to-body="append"
    @close="clearValidate"
  >
    <el-form ref="form" :model="form" size="mini" style="text-align: center">
      <el-collapse v-model="form.activeName" accordion>
        <el-collapse-item name="1">
          <template slot="title">{{ form.product }}</template>
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
                <el-form-item label="Amount $" prop="rate">
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
                <el-row>
                  <el-col :span="3">
                    <el-form-item v-model="form.amount" label="Total :"></el-form-item>
                  </el-col>
                  <el-col :span="4" :offset="17">
                    <el-form-item :total="total">${{ total }}</el-form-item>
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
      append: true
      /* RESET THESE */
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
    quantity(newValue, oldValue) {
      this.form.quantity = newValue;
    }
  },

  methods: {
    /* HANDLER FUNCTIONS */
    handlePlanPick(duration) {
      this.form.product = duration + ' ' + 'Service Plan';
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
      this.$emit('planAdded', {
        product: this.form.product,
        quantity: this.form.quantity,
        rate: this.form.rate,
        amount: this.total
      });
      this.visible = false;
    },

    clearValidate() {
      this.$refs.form.clearValidate();
    }
  },

  computed: {
    total: function() {
      if (
        this.form.rate === null ||
        this.form.quantity === null ||
        isNaN(this.form.rate) ||
        isNaN(this.form.quantity)
      ) {
        return (0).toFixed(2);
      } else {
        return (Number(this.form.rate) * this.form.quantity).toFixed(2);
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
